"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Abonnement } from "@/lib/api/resources/newsletter";
import { RECAPTCHA_SITE_KEY } from "@/lib/constants";
import { Bouton } from "@/components/bouton";

export function AbonnementForm() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isVerified, setIsVerified] = useState(false);

  async function handleCaptchaSubmission(token: string | null) {
    try {
      if (token) {
        const estValide = await fetch("/api/captcha", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
        if (estValide.status === 200) {
          setIsVerified(true);
        }
      }
    } catch (e) {
      setIsVerified(false);
    }
  }

  const handleChange = (token: string | null) => {
    handleCaptchaSubmission(token);
  };

  function handleExpired() {
    setIsVerified(false);
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Veuillez renseigner une adresse email valide")
      .required("Veuillez renseigner une adresse email"),
    abonne: Yup.boolean().required(
      "Veuillez cocher cette case pour vous abonner à la newsletter"
    ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      abonne: false,
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: (values, { resetForm }) => {
      const mail: Abonnement = {
        data: values,
      };
      fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify(mail),
      }).then(() => {
        toast.success("Votre abonnement a bien été pris en compte");
        resetForm();
      });
    },
  });

  if (!RECAPTCHA_SITE_KEY) {
    return null;
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col items-center gap-y-[10px] my-[30px]"
    >
      <div className="w-[400px]">
        <FloatLabel className="w-full">
          <InputText
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            invalid={!!formik.errors.email}
            aria-errormessage={formik.errors.email}
            className="w-full py-[5px] px-[10px] border border-gray-300"
          />
          <label htmlFor="email">Email</label>
        </FloatLabel>
        <span id="email-error" className="p-error pl-[5px]">
          {formik.errors.email}
        </span>
      </div>
      <div className="flex align-items-center w-full py-[5px] px-[10px]">
        <Checkbox
          inputId="abonne"
          name="abonne"
          value="true"
          onChange={formik.handleChange}
          checked={formik.values.abonne}
        />
        <label htmlFor="abonne" className="ml-2">
          En cochant cette case vous reconnaissez avoir pris connaissance de
          notre{" "}
          <Link href="/politique-confidentialite" className="text-blue-600 underline">
            politique de confidentialité
          </Link>{" "}
          et donnez votre consentement pour recevoir la newsletter.
        </label>
      </div>
      <ReCAPTCHA
        sitekey={RECAPTCHA_SITE_KEY}
        ref={recaptchaRef}
        onChange={handleChange}
        onExpired={handleExpired}
      />
      <Bouton type="submit" disabled={!isVerified}>
        Envoyer
      </Bouton>
    </form>
  );
}
