"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyEmailApi } from "@/lib/api/auth/verify-email";
import styles from "./VerifyEmailPage.module.scss";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (!searchParams) {
      setStatus("error");
      setMessage("Վավերացման հղումը սխալ է կամ բացակայում է");
      return;
    }

    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Վավերացման հղումը սխալ է կամ բացակայում է");
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await verifyEmailApi.verifyEmail(token);
        
        if (response.data) {
          setStatus("success");
          setMessage(response.data.message || "Ձեր էլ. փոստը հաջողությամբ հաստատվել է");
          
          // Redirect to home page after 2 seconds
          setTimeout(() => {
            router.push("/");
          }, 2000);
        } else {
          setStatus("error");
          setMessage(response.error || "Վավերացումը ձախողվեց");
        }
      } catch (error: any) {
        setStatus("error");
        setMessage(error?.response?.data?.message || "Տեղի ունեցավ սխալ. Խնդրում ենք փորձել կրկին");
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  return (
    <div className="container">
      <div className={styles.content}>
        {status === "loading" && (
          <>
            <div className={styles.spinner}></div>
            <h1 className={styles.title}>Վավերացում էլ. փոստի...</h1>
            <p className={styles.description}>Խնդրում ենք սպասել</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className={styles.successIcon}>✓</div>
            <h1 className={styles.title}>Հաջողությամբ հաստատված է</h1>
            <p className={styles.description}>{message}</p>
            <p className={styles.redirectMessage}>
              Ձեզ կուղղորդենք գլխավոր էջ 2 վայրկյանում...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <div className={styles.errorIcon}>✗</div>
            <h1 className={styles.title}>Վավերացումը ձախողվեց</h1>
            <p className={styles.description}>{message}</p>
            <button
              className={styles.button}
              onClick={() => router.push("/")}
            >
              Գնալ գլխավոր էջ
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="container">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Բեռնվում է...</p>
        </div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}

