import Image from "next/image";

export default function Loading() {
  return (
    <section className="flex flex-col items-center justify-center h-[100vh] gap-y-[20px]">
      <div>Chargement...</div>
      <Image
        src="/logo-donjon.png"
        alt="Logo Donjon de Houdan"
        width={150}
        height={150}
        className="h-[70px] w-[70px] bg-white rounded-full"
      />
    </section>
  );
}
