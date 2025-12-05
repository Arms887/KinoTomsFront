"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { PinkButton } from "../ui/pinkButton";
import { X, ArrowLeft } from "lucide-react";
import styles from "./TicketPurchaseModal.module.scss";
import Image from "next/image";
import { CinemaConfig, CinemaSeatPicker } from "../CinemaSchema";

type Step = "seat" | "info" | "payment";

const cinemaConfig: CinemaConfig = {
  name: 'Կինո Պալաս',
  balconies: [
    {
      id: 'amphitheater',
      name: 'Ամֆիթատրոն',
      rows: [
        { row: 1, seats: 6, price: 3500, aisles: [3] },
        { row: 2, seats: 8, price: 3500, aisles: [4] },
        { row: 3, seats: 8, price: 3000, aisles: [4] },
      ],
      disabledSeats: ['1-2'],
      occupiedSeats: ['2-5']
    }
  ],
  rows: [
    { row: 1, seats: 8, price: 2000, aisles: [4] },
    { row: 2, seats: 10, price: 2000, aisles: [5] },
    { row: 3, seats: 12, price: 2500, aisles: [4, 8] },
    { row: 4, seats: 12, price: 2500, aisles: [4, 8] },
    { row: 5, seats: 12, price: 3000, vip: true, aisles: [4, 8] },
    { row: 6, seats: 10, price: 3000, vip: true, aisles: [5] },
  ],
  disabledSeats: ['1-2', '1-8', '2-1'],
  occupiedSeats: ['5-7']
};
interface TicketPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId?: string | number;
}

export default function TicketPurchaseModal({
  isOpen,
  onClose,
  productId,
}: TicketPurchaseModalProps) {
  const t = useTranslations("TicketPurchase");
  const [currentStep, setCurrentStep] = useState<Step>("seat");
  const [ticketCount, setTicketCount] = useState(1);

  const [userInfo, setUserInfo] = useState({
    name: "",
    surname: "",
    email: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [promoCode, setPromoCode] = useState("");
  const [showPromoCode, setShowPromoCode] = useState(false);
  const [validationError, setValidationError] = useState<string>("");
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const serviceFee = 0;
  const total = totalPrice + serviceFee;

  if (!isOpen) return null;

  const handleSeatContinue = () => {
    setValidationError("");
    if (selectedSeats.length === 0) {
      setValidationError(t("selectAtLeastOneSeat") || "Խնդրում ենք ընտրեք առնվազն մեկ տեղ");
      return;
    }
    setCurrentStep("info");
  };

  const handleSeatsSelect = (seats: string[], price: number) => {
    setSelectedSeats(seats);
    setTotalPrice(price);
  };

  const handleInfoContinue = () => {
    setValidationError("");

    // Validate name and surname
    if (!userInfo.name || !userInfo.name.trim()) {
      setValidationError(t("fillAllFields") || "Խնդրում ենք լրացրեք բոլոր դաշտերը");
      return;
    }

    if (!userInfo.surname || !userInfo.surname.trim()) {
      setValidationError(t("fillAllFields") || "Խնդրում ենք լրացրեք բոլոր դաշտերը");
      return;
    }

    // Validate email
    if (!userInfo.email || !userInfo.email.trim()) {
      setValidationError(t("fillAllFields") || "Խնդրում ենք լրացրեք բոլոր դաշտերը");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userInfo.email)) {
      setValidationError(t("invalidEmail") || "Խնդրում ենք մուտքագրեք վավեր էլ. հասցե");
      return;
    }

    setCurrentStep("payment");
  };

  const handleBack = () => {
    setValidationError("");
    if (currentStep === "info") {
      setCurrentStep("seat");
    } else if (currentStep === "payment") {
      setCurrentStep("info");
    }
  };

  const handlePayment = () => {

  };

  const handleClose = () => {
    // Reset state when closing
    setCurrentStep("seat");
    setTicketCount(1);
    setUserInfo({ name: "", surname: "", email: "" });
    setPaymentMethod("card");
    setPromoCode("");
    setShowPromoCode(false);
    setSelectedSeats([]);
    setTotalPrice(0);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <Card className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            {currentStep !== "seat" && (
              <button className={styles.backButton} onClick={handleBack} type="button">
                <ArrowLeft className={styles.backIcon} />
              </button>
            )}
            <h2 className={styles.title}>
              {currentStep === "seat" && (t("selectSeats") || "Ընտրեք տեղերը")}
              {currentStep === "info" && (t("purchaseData") || "Գնման համար տվյալներ")}
              {currentStep === "payment" && (t("paymentMethod") || "Վճարման եղանակ")}
            </h2>
          </div>
          <button className={styles.closeButton} onClick={handleClose}>
            <X className={styles.closeIcon} />
          </button>
        </div>

        <div className={styles.content}>
          {/* Step 1: Seat Selection */}
          {currentStep === "seat" && (
            <div className={styles.stepContainer}>
              {validationError && (
                <div className={styles.errorMessage}>
                  {validationError}
                </div>
              )}
              <CinemaSeatPicker
                config={cinemaConfig}
                onSeatsSelect={handleSeatsSelect}
                isModal={true}
              />

              <PinkButton onClick={handleSeatContinue} className={styles.continueButton}>
                <span>{t("continue") || "Շարունակել"}</span>
              </PinkButton>
            </div>
          )}

          {/* Step 2: User Information */}
          {currentStep === "info" && (
            <div className={styles.stepContainer}>
              {validationError && (
                <div className={styles.errorMessage}>
                  {validationError}
                </div>
              )}
              <form
                className={styles.infoForm}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleInfoContinue();
                }}
              >
                <div className={styles.formGroup}>
                  <Input
                    type="text"
                    placeholder={t("name") || "Անուն"}
                    value={userInfo.name}
                    onChange={(e) => {
                      setValidationError("");
                      setUserInfo({ ...userInfo, name: e.target.value });
                    }}
                    required
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <Input
                    type="text"
                    placeholder={t("surname") || "Ազգանուն"}
                    value={userInfo.surname}
                    onChange={(e) => {
                      setValidationError("");
                      setUserInfo({ ...userInfo, surname: e.target.value });
                    }}
                    required
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <Input
                    type="email"
                    placeholder={t("emailAddress") || "Էլ. հասցե"}
                    value={userInfo.email}
                    onChange={(e) => {
                      setValidationError("");
                      setUserInfo({ ...userInfo, email: e.target.value });
                    }}
                    required
                    className={styles.input}
                  />
                </div>

                <PinkButton type="submit" className={styles.continueButton}>
                  <span>{t("continue") || "Շարունակել"}</span>
                </PinkButton>
              </form>
            </div>
          )}

          {/* Step 3: Payment */}
          {currentStep === "payment" && (
            <div className={styles.stepContainer}>
              <div className={styles.paymentHeader}>
                <h3 className={styles.movieTitle}>{t("movieTitle") || "Թանկարժեք տղաները"}</h3>
                <p className={styles.cinemaName}>{t("cinemaName") || "(Լոռի կինոթատրոն)"}</p>
                <p className={styles.showTime}>{t("showTime") || "Չորեքշաբթի, 03 դեկտեմբերի, 18:50"}</p>
              </div>

              <div className={styles.paymentMethods}>
                <h4 className={styles.sectionTitle}>{t("paymentMethod") || "Վճարման եղանակ"}</h4>

                <div className={styles.paymentOption}>
                  <input
                    type="radio"
                    id="card"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="card" className={styles.paymentLabel}>
                    <div className={styles.paymentIcon}>                      <div className={styles.paymentIconImage}>
                      <Image src="/assets/img/atm-card.png" alt="Idram" width={20} height={20} />
                    </div></div>
                    <span>{t("bankCard") || "Բանկային քարտ"}</span>
                  </label>
                </div>

                <div className={styles.paymentOption}>
                  <input
                    type="radio"
                    id="idram"
                    name="payment"
                    value="idram"
                    checked={paymentMethod === "idram"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="idram" className={styles.paymentLabel}>
                    <div className={styles.paymentIcon}>
                      <div className={styles.paymentIconImage}>
                        <Image src="/assets/img/idram.png" alt="Idram" width={20} height={20} />
                      </div>
                    </div>
                    <span>Idram</span>
                  </label>
                </div>

                <div className={styles.paymentOption}>
                  <input
                    type="radio"
                    id="telcell"
                    name="payment"
                    value="telcell"
                    checked={paymentMethod === "telcell"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="telcell" className={styles.paymentLabel}>
                    <div className={styles.paymentIcon}>                      <div className={styles.paymentIconImage}>
                      <Image src="/assets/img/telcell.png" alt="telcell" width={20} height={20} />
                    </div></div>
                    <span>Telcell Wallet</span>
                  </label>
                </div>

                <div className={styles.paymentOption}>
                  <input
                    type="radio"
                    id="easywallet"
                    name="payment"
                    value="easywallet"
                    checked={paymentMethod === "easywallet"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="easywallet" className={styles.paymentLabel}>
                    <div className={styles.paymentIcon}>                      <div className={styles.paymentIconImage}>
                      <Image src="/assets/img/easywallet.png" alt="Idram" width={20} height={20} />
                    </div></div>
                    <span>easywallet</span>
                  </label>
                </div>
              </div>

              <div className={styles.promoCodeSection}>
                <div
                  className={styles.promoCodeHeader}
                  onClick={() => setShowPromoCode(!showPromoCode)}
                >
                  <span>%</span>
                  <span>{t("havePromoCode") || "Ունե՞ք պրոմո կոդ"}</span>
                  <span className={styles.chevron}>{showPromoCode ? "▲" : "▼"}</span>
                </div>
                {showPromoCode && (
                  <Input
                    type="text"
                    placeholder={t("enterPromoCode") || "Մուտքագրեք պրոմո կոդ"}
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className={styles.promoInput}
                  />
                )}
              </div>

              <div className={styles.orderSummary}>
                <div className={styles.summaryRow}>
                  <span>{t("ticketPrice") || "Տոմսերի արժեքը"}</span>
                  <span>{totalPrice} ֏</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>{t("serviceFee") || "Ծառայության վճար"}</span>
                  <span>+{serviceFee} ֏</span>
                </div>
                <div className={styles.summaryRowTotal}>
                  <span>{t("total") || "Ընդհանուր"}</span>
                  <span>{total} ֏</span>
                </div>
              </div>

              <PinkButton onClick={handlePayment} className={styles.payButton}>
                <span>{t("pay") || "ՎՃԱՐԵԼ"}</span>
                <span>{total} ֏</span>
              </PinkButton>

              <p className={styles.terms}>
                {t("termsAndConditions") || "Ընդհանուր դրույթներ և պայմաններ"}
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

