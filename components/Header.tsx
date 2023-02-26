import Image from "next/image";
import React from 'react';
import _app from "../src/pages";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { signIn, signOut, useSession } from "next-auth/react";

import {
  BiCookie, BiSearch, BiUser, BiSend, BiShare, BiPaperPlane, BiMessage, BiMenu, BiGroup,BiHome,BiPlusCircle
} from "react-icons/bi";



function Header() {
  const [open, setOpen] = useRecoilState(modalState);
  const { data: session, status } = useSession();


  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      <div className='flex justify-between max-w-6xl mx-5 lg:mx-auto'>

        {/* Left */}
        <div className="relative hidden justify-start lg:inline-grid w-52 cursor-pointer hover:scale-110 transition-all duration-150 ease-out">
          <Image
            alt="logo"
            src="/Munchies-Logo-New.png"
            fill
            style={{
              objectFit: "contain"
            }} />
        </div>

        <div className="relative w-10 lg:hidden flex-shrink-0 cursor-pointer hover:scale-125 transition-all duration-150 ease-out">
          <Image
            alt="logo"
            src="/Munchies-Icon-New.png"
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
          <BiMenu className="h-10 md:hidden cursor-pointer hover:scale-150 transition-all duration-150 ease-out" size="30"/>
          <BiHome className="navBtn" size="30"/>
          {session ? (
          <>
          <BiPaperPlane className="navBtn" size="30"/>
          <BiPlusCircle onClick={() => setOpen(true)} className="navBtn" size="30"/>
          <BiGroup className="navBtn" size="30"/>
          <BiCookie className="navBtn" size="30"/>
          <img onClick={() => void signOut()} src={session?.user?.image ?? "" } alt="profile picture" className="h-10 w-10 rounded-full cursor-pointer" />
          </>
          ) : (
            <button onClick={() => void signIn()}>Sign In</button>
          )}
          </div>
      </div>
    </div>

  );
}

export default Header

