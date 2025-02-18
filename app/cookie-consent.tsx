"use client";

import { Bouton } from "@/components/bouton";
import { cn } from "@/lib/utils/cn";
import { useState, useEffect } from "react";

const CookieConsent = () => {
  const [consent, setConsent] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const savedConsent = localStorage.getItem("cookieConsent");
    if (savedConsent) {
      setConsent(JSON.parse(savedConsent));
    }
    setInitialized(true);
  }, []);

  const handleAccept = () => {
    setConsent(true);
    localStorage.setItem("cookieConsent", JSON.stringify(true));
    // Initialize GA4
    if (window.gtag) {
      window.gtag("consent", "update", {
        ad_storage: "granted",
        analytics_storage: "granted",
      });
    }
  };

  const handleDecline = () => {
    setConsent(false);
    localStorage.setItem("cookieConsent", JSON.stringify(false));
    // Disable GA4
    if (window.gtag) {
      window.gtag("consent", "update", {
        ad_storage: "denied",
        analytics_storage: "denied",
      });
    }
  };

  if (!initialized) {
    return null;
  }

  if (consent) {
    return null;
  }

  return (
    <div
      className={cn(
        "absolute bottom-0 bg-white p-4 w-full text-center flex flex-col justify-center items-center z-50",
        "lg:flex-row lg:gap-x-4"
      )}
    >
      <p>Nous utilisons des cookies pour améliorer votre expérience.</p>
      <div className="flex gap-x-4">
        <Bouton onClick={handleAccept}>
          Accepter
        </Bouton>
        <Bouton onClick={handleDecline}>
          Refuser
        </Bouton>
      </div>
    </div>
  );
};

export default CookieConsent;
