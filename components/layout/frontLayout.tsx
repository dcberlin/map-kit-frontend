import AuthWidget from "../auth-widget";
import Image from "next/image";
import Link from "next/link";
import React, {PropsWithChildren} from "react";

const FrontLayout = ({children}: PropsWithChildren<{}>) => {
  return (
    <div className="flex flex-col justify-between w-screen min-h-screen bg-gray-200">
      <AuthWidget/>
      <div className="flex flex-col h-2/5 gap-5 p-8 mt-12 items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-bold text-center">Harta Diasporei</h1>
        <h4 className="text-xl md:text-2xl text-center">Kit de dezvoltare pentru harta comunității românești din orașul
          tău</h4>
      </div>
      <div className="flex flex-col w-full items-center justify-center">
        <div
          className={`flex flex-wrap w-2/3 gap-4 p-4 place-content-start drop-shadow-2xl
          rounded-xl bg-white`}
        >

          {children}

        </div>
      </div>
      <div className="w-full mt-12">
        <div className="flex flex-col md:flex-row gap-8 p-12 justify-center">
          <a href="https://diasporacivica.berlin" target="_blank" rel="noreferrer">
            <h3 className="text-gray-800 mb-3">realizat de</h3>
            <Image
              src="/logo-dcb.png"
              alt="Logo rotund abstract al asociaţiei Diaspora Civică Berlin"
              width={150}
              height={65}
            />
          </a>
          <a href="https://dprp.gov.ro/" target="_blank" rel="noreferrer">
            <h3 className="text-gray-800 mb-3">finanţat de</h3>
            <Image
              src="/logo-drp.png"
              alt="Logo al Guvernului României cu textul 'Departamentul pentru românii de pretutindeni' alături"
              width={270}
              height={100}
            />
          </a>
        </div>
      </div>
      <div className="flex justify-center text-xs pb-4 px-12 text-gray-800">
        <p>Conţinutul acestui site nu reprezintă poziţia oficială a Departamentului pentru românii de pretutindeni.</p>
      </div>
      <div className="flex justify-center gap-5 text-xs pb-4 pt-6 px-12 text-blue-800">
        <Link href="/terms-and-conditions" >Nutzungsbedingungen</Link>
        <Link href="/privacy-policy" >Datenschutzerklärung</Link>
        <Link href="/contact" >Kontakt</Link>
      </div>
    </div>
  );
}

export default FrontLayout;
