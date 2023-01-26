import Image from "next/image";
import React from 'react';
import _app from "../src/pages";

import {
  BiCookie, BiSearch, BiUser, BiSend, BiShare, BiPaperPlane, BiMessage, BiMenu, BiGroup,BiHome,BiPlusCircle
} from "react-icons/bi";

function Header() {
  return (
    <div>
      <div className='flex justify-between max-w-6xl mx-5 lg:mx-auto'>

        {/* Left */}
        <div className="relative hidden justify-start lg:inline-grid w-52 cursor-pointer">
          <Image
            alt="logo"
            src="/Munchies-Logo.png"
            fill
            style={{
              objectFit: "contain"
            }} />
        </div>

        <div className="relative w-10 lg:hidden flex-shrink-0 cursor-pointer">
          <Image
            alt="logo"
            src="/Munchies-Icon.png"
            fill
            style={{
              objectFit: "contain"
            }} />
        </div>

        {/* Middle */}
        <div className="max-w-xs">
          <div className="relative mt-1 p-3 rounded-md">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <BiSearch className="h-5 w-5 text-gray-500" />
            </div>
            <input className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black"
              type="text"
              placeholder="search" />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center justify-end space-x-4">
          <BiMenu className="h-10 md:hidden cursor-pointer" size="30"/>
          <BiHome className="navBtn" size="30"/>
          <BiPaperPlane className="navBtn" size="30"/>
          <BiPlusCircle className="navBtn" size="30"/>
          <BiGroup className="navBtn" size="30"/>
          <BiCookie className="navBtn" size="30"/>


          
        </div>
      </div>
    </div>

  );
}

export default Header

