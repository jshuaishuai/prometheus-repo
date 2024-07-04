import { UserButton } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "@/components/global/mode-toggle";

interface NavigationProps {
    user?: null | User
}

const Navigation = (props: NavigationProps) => {
  return (
    <div className="p-4 flex items-center justify-between relative">
      <aside className="flex items-center gap-2">
        <Image src="./assets/plura-logo.svg" width={40} height={40} alt="plura-logo" />
        <span className="text-xl font-bold">Plura.</span>
      </aside>
      <nav className="hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
        <ul className="flex items-center justify-center gap-8">
            <Link href="/agency/sign-in">Pricing</Link>
            <Link href="/agency/sign-in">Aboout</Link>
            <Link href="/agency/sign-in">Documenttation</Link>
            <Link href="/agency/sign-in">Features</Link>
        </ul>
      </nav>
      <aside className="flex gap-2 items-center">
        <Link href={props.user ? "/site" : "/agency/sign-in"} className="bg-primary text-white p-2 px-4 rounded-md hover:bg-primary/80">Login</Link>
        <UserButton />
        <ModeToggle />
      </aside>
    </div>
  );
};

export default Navigation;
