"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "../ui/mainBtn/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { X } from "lucide-react";
import { loginApi, registerApi, forgotPasswordApi } from "@/lib/api/auth";
import { tokenManager } from "@/lib/api/token";
import { useUser } from "@/contexts/UserContext";
import styles from "./AuthModal.module.scss";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "login" | "register" | "forgot";
}

export default function AuthModal({ isOpen, onClose, defaultTab = "login" }: AuthModalProps) {
  const t = useTranslations("Auth");
  const { fetchUser } = useUser();
  const [activeTab, setActiveTab] = useState<"login" | "register" | "forgot">(defaultTab);
  const [isLoading, setIsLoading] = useState(false);
  
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    remember: true,
  });

  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    surname: "",
    phone: "",
  });

  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [registerSuccessMessage, setRegisterSuccessMessage] = useState<string>("");

  // Password validation regex - matches backend pattern
  const PASSWORD_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!?@#$%^&*()-_+=,./])(?=.{8,})/;

  const validatePassword = (password: string): string => {
    if (!password) {
      return "";
    }
    if (!PASSWORD_REGEXP.test(password)) {
      return t("passwordInvalid");
    }
    return "";
  };

  const validateConfirmPassword = (password: string, confirmPassword: string): string => {
    if (!confirmPassword) {
      return "";
    }
    if (password !== confirmPassword) {
      return t("passwordsDoNotMatch");
    }
    return "";
  };

  const [forgotData, setForgotData] = useState({
    email: "",
  });

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await loginApi.login(loginData);

      if (response.data && response.data.access_token) {
        tokenManager.setTokens(response.data.access_token, response.data.refresh_token);
        await fetchUser();
        onClose();
      } else {
        alert(response.error || response.message || t("loginError"));
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(t("loginError"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate password
    const passwordErr = validatePassword(registerData.password);
    const confirmPasswordErr = validateConfirmPassword(registerData.password, registerData.confirmPassword);
    
    setPasswordError(passwordErr);
    setConfirmPasswordError(confirmPasswordErr);
    
    if (passwordErr || confirmPasswordErr) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await registerApi.register(registerData);

      if (response.data) {
        // Show success message
        setRegisterSuccessMessage(t("checkYourEmail") || "Խնդրում ենք ստուգեք ձեր էլ. փոստը");
        // Reset form
        setRegisterData({
          email: "",
          password: "",
          confirmPassword: "",
          name: "",
          surname: "",
          phone: "",
        });
        setPasswordError("");
        setConfirmPasswordError("");
      } else {
        // Handle validation errors from backend
        let errorMessage = response.error || response.message || t("registerError");
        
        // If it's a validation error (422), try to extract password error
        if (response.statusCode === 422 && response.message) {
          if (Array.isArray(response.message)) {
            const passwordError = response.message.find((err: any) => err.instancePath === "/password");
            if (passwordError) {
              errorMessage = t("passwordInvalid");
              setPasswordError(t("passwordInvalid"));
            } else {
              errorMessage = response.message.map((err: any) => err.message || err.keyword).join(", ");
            }
          } else if (typeof response.message === "string") {
            errorMessage = response.message;
          }
        }
        
        alert(errorMessage);
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      // Check if it's a validation error
      if (error?.response?.status === 422) {
        const errorData = error.response?.data;
        if (errorData?.message) {
          if (Array.isArray(errorData.message)) {
            const passwordError = errorData.message.find((err: any) => err.instancePath === "/password");
            if (passwordError) {
              setPasswordError(t("passwordInvalid"));
              alert(t("passwordInvalid"));
            } else {
              alert(errorData.message.map((err: any) => err.message || err.keyword).join(", "));
            }
          } else {
            alert(errorData.message);
          }
        } else {
          alert(t("registerError"));
        }
      } else {
        alert(t("registerError"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await forgotPasswordApi.forgotPassword(forgotData);

      if (response.data) {
        alert(t("forgotPasswordSuccess"));
        setActiveTab("login");
        setForgotData({ email: "" });
      } else {
        alert(response.error || response.message || t("forgotPasswordError"));
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      alert(t("forgotPasswordError"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <Card className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t("auth")}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X className={styles.closeIcon} />
          </button>
        </div>

        {registerSuccessMessage && (
          <div style={{ 
            color: "#27ae60", 
            fontSize: "0.875rem", 
            padding: "0.75rem 1rem",
            backgroundColor: "#d4edda",
            borderRadius: "4px",
            border: "1px solid #c3e6cb",
            margin: "0 1rem 1rem 1rem",
            textAlign: "center"
          }}>
            {registerSuccessMessage}
          </div>
        )}

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "register" | "forgot")} className={styles.tabs}>
          <TabsList className={styles.tabsList}>
            <TabsTrigger value="login">{t("login")}</TabsTrigger>
            <TabsTrigger value="register">{t("register")}</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className={styles.tabContent}>
            <form onSubmit={handleLogin} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="login-email">{t("email")}</label>
                <Input
                  id="login-email"
                  name="email"
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                  placeholder={t("emailPlaceholder")}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="login-password">{t("password")}</label>
                <Input
                  id="login-password"
                  name="password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                  placeholder={t("passwordPlaceholder")}
                />
              </div>

              <button
                type="button"
                onClick={() => setActiveTab("forgot")}
                className={styles.forgotLink}
              >
                {t("forgotPassword")}
              </button>

              <Button type="submit" disabled={isLoading} className={styles.submitButton}>
                {isLoading ? t("loading") : t("login")}
              </Button>

              <div className={styles.switchLink}>
                {t("noAccount")}{" "}
                <button
                  type="button"
                  onClick={() => setActiveTab("register")}
                  className={styles.linkButton}
                >
                  {t("register")}
                </button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="register" className={styles.tabContent}>
            <form onSubmit={handleRegister} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="register-email">{t("email")}</label>
                <Input
                  id="register-email"
                  name="email"
                  type="email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  required
                  placeholder={t("emailPlaceholder")}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="register-name">{t("name")}</label>
                <Input
                  id="register-name"
                  name="name"
                  type="text"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                  required
                  placeholder={t("namePlaceholder")}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="register-surname">{t("surname")}</label>
                <Input
                  id="register-surname"
                  name="surname"
                  type="text"
                  value={registerData.surname}
                  onChange={(e) => setRegisterData({ ...registerData, surname: e.target.value })}
                  required
                  placeholder={t("surnamePlaceholder")}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="register-phone">{t("phone")}</label>
                <Input
                  id="register-phone"
                  name="phone"
                  type="tel"
                  value={registerData.phone}
                  onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                  required
                  placeholder={t("phonePlaceholder")}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="register-password">{t("password")}</label>
                <Input
                  id="register-password"
                  name="password"
                  type="password"
                  value={registerData.password}
                  onChange={(e) => {
                    const newPassword = e.target.value;
                    setRegisterData({ ...registerData, password: newPassword });
                    setPasswordError(validatePassword(newPassword));
                    // Re-validate confirm password if it's already filled
                    if (registerData.confirmPassword) {
                      setConfirmPasswordError(validateConfirmPassword(newPassword, registerData.confirmPassword));
                    }
                  }}
                  required
                  minLength={8}
                  placeholder={t("passwordPlaceholder")}
                />
                {passwordError && (
                  <div className={styles.errorMessage} style={{ color: "red", fontSize: "0.875rem", marginTop: "0.25rem" }}>
                    {passwordError}
                  </div>
                )}
                <div className={styles.helpText} style={{ fontSize: "0.75rem", color: "#666", marginTop: "0.25rem" }}>
                  {t("passwordRequirements")}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="register-confirmPassword">{t("confirmPassword")}</label>
                <Input
                  id="register-confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={registerData.confirmPassword}
                  onChange={(e) => {
                    const newConfirmPassword = e.target.value;
                    setRegisterData({ ...registerData, confirmPassword: newConfirmPassword });
                    setConfirmPasswordError(validateConfirmPassword(registerData.password, newConfirmPassword));
                  }}
                  required
                  minLength={8}
                  placeholder={t("confirmPasswordPlaceholder")}
                />
                {confirmPasswordError && (
                  <div className={styles.errorMessage} style={{ color: "red", fontSize: "0.875rem", marginTop: "0.25rem" }}>
                    {confirmPasswordError}
                  </div>
                )}
              </div>

              <Button type="submit" disabled={isLoading} className={styles.submitButton}>
                {isLoading ? t("loading") : t("register")}
              </Button>

              <div className={styles.switchLink}>
                {t("hasAccount")}{" "}
                <button
                  type="button"
                  onClick={() => setActiveTab("login")}
                  className={styles.linkButton}
                >
                  {t("login")}
                </button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="forgot" className={styles.tabContent}>
            <form onSubmit={handleForgotPassword} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="forgot-email">{t("email")}</label>
                <Input
                  id="forgot-email"
                  name="email"
                  type="email"
                  value={forgotData.email}
                  onChange={(e) => setForgotData({ email: e.target.value })}
                  required
                  placeholder={t("emailPlaceholder")}
                />
              </div>

              <p className={styles.forgotDescription}>{t("forgotPasswordDescription")}</p>

              <Button type="submit" disabled={isLoading} className={styles.submitButton}>
                {isLoading ? t("loading") : t("sendResetLink")}
              </Button>

              <div className={styles.switchLink}>
                <button
                  type="button"
                  onClick={() => setActiveTab("login")}
                  className={styles.linkButton}
                >
                  {t("backToLogin")}
                </button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

