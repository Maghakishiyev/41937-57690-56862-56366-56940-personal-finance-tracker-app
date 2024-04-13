"use client"
import Link from "next/link";


const Header: React.FC = () => {
  return (
    <header className="bg-blue-800 flex justify-between items-center px-8 py-3">
      <div className="flex items-center">
        <Link href="/">
          <h1 className="text-white text-3xl font-bold mr-16 cursor-pointer font-jura">CashTrack</h1>
        </Link>
        <Link href="/" legacyBehavior>
          <a className="text-white text-lg relative cursor-pointer">
            Home
            <span className="absolute left-0 bottom-0 h-0.5 w-full bg-white"></span>
          </a>
        </Link>
      </div>
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
