import { H1 } from "@/components/titles";
import { ContactForm } from "./_components/contact-form";
import { getPageContact } from "@/lib/api/resources/contact";
import { RichTextStrapi } from "@/components/richTextStrapi";

export default async function PageContact() {
  const data = await getPageContact();

  return (
    <section className="min-h-screen lg:mt-[-200px] lg:pt-[200px]">
      <H1 className="my-[50px] text-center">Contact</H1>
      <div className="px-[20px] mb-[130px] lg:px-[20vw] lg:mb-[50px]">
        {data !== null && <RichTextStrapi content={data.contenu} />}
        <div className="flex justify-center">
          <ContactForm />
        </div>
        <div className="flex justify-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2628.612101249101!2d1.5964294769643046!3d48.78929527132294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6a5d609cf9549%3A0x3c88abdc7d96c8ce!2sDonjon%20de%20Houdan!5e0!3m2!1sfr!2sfr!4v1728171462763!5m2!1sfr!2sfr"
            width="600"
            height="450"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
