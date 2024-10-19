import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen lg:mt-[-200px] lg:pt-[200px] gap-y-[20px]">
      <div>La page que vous demandez n&#39;éxiste pas</div>
      <Link href="/" className="flex flex-col items-center justify-content gap-y-[20px]">
        <Image
          src="/logo-donjon.png"
          alt="Logo Donjon de Houdan"
          width={150}
          height={150}
          className="h-[70px] w-[70px] bg-white rounded-full"
        />
        <div>Retour à l&#39;accueil</div>
      </Link>
    </section>
  );
}
