import Link from "next/link";
import { FaDungeon, FaRegCalendarAlt, FaRegEnvelope } from "react-icons/fa";
import { GoMegaphone } from "react-icons/go";
import { LuClock2 } from "react-icons/lu";

export function NavbarMobile() {
  return (
    <div className="relative lg:hidden">
      <div className="fixed flex items-center justify-between bottom-[10px] left-[10px] h-[80px] px-[30px] w-[calc(100vw-20px)] bg-gradient-to-b from-red-200 to-gray-200 from z-20 rounded-full">
        <BoutonMenu
          icone={<FaDungeon className="h-full w-full" />}
          href="/le-donjon"
        />
        <BoutonMenu
          icone={<FaRegCalendarAlt className="h-full w-full" />}
          href="/programmation"
        />
        <BoutonMenu
          icone={<LuClock2 className="h-full w-full" />}
          href="/preparez-votre-visite"
        />
        <BoutonMenu
          icone={<GoMegaphone className="h-full w-full" />}
          href="/actualites"
        />
        <BoutonMenu
          icone={<FaRegEnvelope className="h-full w-full" />}
          href="/contact"
        />
      </div>
    </div>
  );
}

type BoutonProps = {
  icone: React.ReactNode;
  href: string;
};

function BoutonMenu({ icone, href }: BoutonProps) {
  return (
    <Link href={href} className="h-[45px] w-[45px] bg-white rounded-full p-[8px] drop-shadow-lg">
      {icone}
    </Link>
  );
}
