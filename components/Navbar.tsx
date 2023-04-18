import React from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between mt-4 mb-10">
      <Link href="/">
        <div className="flex items-center cursor-pointer">
          <Image
            src="/logo_final.png"
            alt="logo of website"
            height={35}
            width={300}
          />
          {/* <span className="font-bold ml-2 text-primary">
                        CodeCrush's BLog
                    </span> */}
        </div>
      </Link>

      <ul className="flex items-center">
        <li className="mr-6 font-medium text-gray-600">
          <Link href={"/"}>Products</Link>
        </li>
        <li className="mr-6 font-medium text-gray-600">
          <Link href={"/"}>Pricing</Link>
        </li>
        <li className="mr-6 font-medium text-gray-600">
          <Link href={"/"}>Docs</Link>
        </li>
        <li className="mr-6 font-medium text-gray-600">
          <Link href={"/"}>Company</Link>
        </li>
      </ul>

      <ul className="flex items-center">
        <li className="mr-6 font-medium text-gray-600 text-center hover:text-black shadow-Ambidient p-3 rounded-[10px]">
            <Link href={"#"}>Log in</Link>
        </li>
        <li className="font-medium text-center text-white shadow-Ambidient bg-primary p-3 rounded-[15px]  hover:bg-primary-dark transition-all">
            <Link href={"#"}>Sign up</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
