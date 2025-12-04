"use client";

import { useState, useEffect } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { Globe, LogIn, User, LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { ModeToggle } from "../ModeToggle";
import AuthModal from "../AuthModal/AuthModal";
import { Button } from "../ui/mainBtn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useUser } from "@/contexts/UserContext";
import { logoutApi } from "@/lib/api/auth";
import styles from "./Header.module.scss";
import Image from "next/image";
import LoginIcon from "../../../public/svg/loginIcon";
import { Drawer } from "antd";
import { HamburgerIcon } from "../../../public/svg/hamburger";

export default function Header() {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const { user, clearUser } = useUser();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "register" | "forgot">("login");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when screen size increases
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutApi.logout();
      clearUser();
    } catch (error) {
      console.error("Logout error:", error);
      clearUser(); // Clear user even if API call fails
    } finally {
      setIsLoggingOut(false);
    }
  };

  const getUserDisplayName = () => {
    if (user?.name && user?.surname) {
      return `${user.name} ${user.surname}`;
    }
    if (user?.name) {
      return user.name;
    }
    if (user?.email) {
      return user.email;
    }
    return "User";
  };

  return (
    <>

      <header className={styles.header}>
        <div className={"container"}>
          <div className={`${styles.content} ${pathname !== "/" ? styles.contentProduct : ""}`}>
            <Link href="/" className={styles.logo} aria-label="Home">
              <Image src="/assets/img/mainLogo.png" alt="KinoToms" width={98} height={58} />
            </Link>
            <div className={styles.headerLeft}>
              <nav className={styles.nav}>
                <div className={styles.navLinks}>
                  <Link href="/about" className={styles.navLink}>
                    {t("about")}
                  </Link>
                  <Link href="/contact" className={styles.navLink}>
                    {t("contact")}
                  </Link>
                </div>
                <div className={styles.navActions}>
                  {!user ? (
                    <Button
                      width={100}
                      height={50}
                      onClick={() => setIsAuthModalOpen(true)}
                      className={styles.loginButton}
                    >
                      <LoginIcon />
                      <p>{t("login")}</p>
                    </Button>
                  ) : (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          className={styles.userButton}
                          aria-label="User menu"
                        >
                          <User className={styles.userIcon} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className={styles.userMenu}>
                        <DropdownMenuLabel className={styles.userName}>
                          {getUserDisplayName()}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={handleLogout}
                          disabled={isLoggingOut}
                          className={styles.logoutItem}
                        >
                          <LogOut className={styles.logoutIcon} />
                          {isLoggingOut ? t("loggingOut") || "Logging out..." : t("logout") || "Logout"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                  {/* <ModeToggle /> */}
                </div>
              </nav>
              <div className={styles.headerRight}>
                <div className={styles.languageSwitcherWrapper}>
                  <LanguageSwitcher />
                </div>
                <div className={styles.hamburgerButton} onClick={() => setIsMobileMenuOpen(true)}>
                  <HamburgerIcon />
              </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Drawer
        title={null}
        placement="right"
        onClose={() => setIsMobileMenuOpen(false)}
        open={isMobileMenuOpen}
        className={styles.mobileDrawer}
        width={320}
        styles={{
          body: {
            padding: 0,
          },
          content: {
            background: "hsl(var(--background))",
          },
        }}
      >
        <div className={styles.mobileMenuContent}>
          <Link href="/" className={styles.mobileLogo} aria-label="Home" onClick={() => setIsMobileMenuOpen(false)}>
            <Image src="/assets/img/mainLogo.png" alt="KinoToms" width={98} height={58} />
          </Link>
          <div className={styles.mobileNavLinks}>
            <Link
              href="/about"
              className={styles.mobileNavLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("about")}
            </Link>
            <Link
              href="/contact"
              className={styles.mobileNavLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("contact")}
            </Link>
          </div>
          <div className={styles.mobileNavActions}>
            {!user ? (
              <Button
                width={100}
                height={50}
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className={styles.mobileLoginButton}
              >
                <LoginIcon />
                <p>{t("login")}</p>
              </Button>
            ) : (
              <div className={styles.mobileUserSection}>
                <div className={styles.mobileUserName}>
                  {getUserDisplayName()}
                </div>
                <Button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  disabled={isLoggingOut}
                  className={styles.mobileLogoutButton}
                >
                  <LogOut className={styles.logoutIcon} />
                  {isLoggingOut ? t("loggingOut") || "Logging out..." : t("logout") || "Logout"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </Drawer>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authModalTab}
      />
    </>
  );
}

