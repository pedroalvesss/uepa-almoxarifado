import Image from "next/image";

export function Footer() {
  return (
    <footer className="flex h-15 items-center justify-center border-t bg-gradient-to-r from-[#1b3381] to-[#000823]">
      <div className="flex grow items-center justify-center gap-2">
        <Image
          src="/brasaouepa1.png"
          alt="Logo Defensoria"
          height={30}
          width={30}
        />
        <p className="font-bold text-sm text-white">
          Universidade do Estado do Pará
        </p>
      </div>
    </footer>
  );
}
