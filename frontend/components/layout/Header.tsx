"use client"
import Link from "next/link";

import React from "react";

type Props = {};

const Header: React.FC = (props: Props) => {
  // const router = useRouter();
  // console.log(router)
  return (
    <header className="bg-blue-800 flex justify-between items-center px-8 py-3">
      <Link href="/">
      <div className="flex items-center">
        <h1 className="text-white text-3xl font-bold mr-16 cursor-pointer font-jura">CashTrack</h1>
        <a className="text-white text-lg relative cursor-pointer">
            Home
            <span className="absolute left-0 bottom-0 h-0.5 w-full bg-white"></span>
          </a>
      </div>
      </Link>
      <div className="flex">
        <Link href="/login" legacyBehavior>
          <a className="bg-black text-white text-lg px-4 py-2 rounded-lg mr-3">Sign In</a>
        </Link>
        <Link href="/register" legacyBehavior>
          <a className="bg-white text-blue-800 text-lg px-4 py-2 rounded-lg">Sign Up</a>
        </Link>
      </div>
    </header>
  );
};

export default Header;
