"use client";

import { useRef, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import ReCAPTCHA from "react-google-recaptcha";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { FloatLabel } from "primereact/floatlabel";
import { SendMail } from "@/lib/api/resources/contact";
import { RECAPTCHA_SITE_KEY } from "@/lib/constants";
import { toast } from "react-toastify";
import { Bouton } from "@/components/bouton";

export function ContactForm() {
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
    objet: Yup.string().required("Veuillez renseigner un objet"),
    message: Yup.string().required("Veuillez renseigner un message"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      objet: "",
      message: "",
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: (values, { resetForm }) => {
      const mail: SendMail = {
        data: values,
      };
      fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(mail),
      }).then(() => {
        toast.success("Votre message a bien été envoyé");
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
      className="flex flex-col items-center w-[400px] gap-y-[20px] my-[30px]"
    >
      <div className="w-full">
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
      <div className="w-full">
        <FloatLabel>
          <InputText
            name="objet"
            value={formik.values.objet}
            onChange={formik.handleChange}
            invalid={!!formik.errors.objet}
            aria-errormessage={formik.errors.objet}
            className="w-full py-[5px] px-[10px] border border-gray-300"
          />
          <label htmlFor="objet">Objet</label>
        </FloatLabel>
        <span id="objet-error" className="p-error pl-[5px]">
          {formik.errors.objet}
        </span>
      </div>
      <FloatLabel className="w-full">
        <InputTextarea
          name="message"
          value={formik.values.message}
          onChange={formik.handleChange}
          invalid={!!formik.errors.message}
          aria-errormessage={formik.errors.message}
          rows={5}
          className="w-full py-[5px] px-[10px] border border-gray-300"
        />
        <label htmlFor="message">Message</label>
        <span id="message-error" className="p-error pl-[5px]">
          {formik.errors.message}
        </span>
      </FloatLabel>
      <ReCAPTCHA
        sitekey={RECAPTCHA_SITE_KEY}
        ref={recaptchaRef}
        onChange={handleChange}
        onExpired={handleExpired}
      />
      <Bouton type="submit" disabled={!isVerified} >
        Envoyer
      </Bouton>
    </form>
  );
}
