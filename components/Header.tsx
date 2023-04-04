import Image from "next/image";
import React, { useState, useEffect } from 'react';
import _app from "../src/pages";
import { useRecoilState } from "recoil";
import { createPostModalAtom } from "../atoms/createPostModalAtom";
import { recipeGeneratorModalAtom } from '../atoms/recipeGeneratorModalAtom';
import { signIn, signOut, useSession } from "next-auth/react";
import CreatePostModal from "../components/CreatePostModal";
import RecipeGeneratorModal from "../components/RecipeGeneratorModal";
import {
  BiCookie, BiHeart, BiSearch, BiUser, BiSend, BiShare, BiPaperPlane, BiMessage, BiMenu, BiGroup, BiHome, BiPlusCircle, BiBookHeart
} from "react-icons/bi";
import Link from "next/link";



function Header() {
  const [openCreatePost, setOpenCreatePost] = useRecoilState(createPostModalAtom);
  const [openRecipeGenerator, setOpenRecipeGenerator] = useRecoilState(recipeGeneratorModalAtom);
  const [smallHeader, setSmallHeader] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) { // set the breakpoint here
        setSmallHeader(false); // reset the state if the screen size goes above the breakpoint
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <>
      <div className="shadow-sm border-b bg-white sticky top-0 z-50">
        <div className='flex justify-between max-w-6xl mx-5 lg:mx-auto'>

          {/* Left */}
          <div className="relative hidden justify-start lg:inline-grid w-52 cursor-pointer hover:scale-110 transition-all duration-150 ease-out">
            <Link href="/">
              <Image
                alt="logo"
                src="/Munchies-Logo-New.png"
                fill
                style={{
                  objectFit: "contain"
                }} />
            </Link>
          </div>

          <div className="relative w-10 lg:hidden flex-shrink-0 cursor-pointer hover:scale-125 transition-all duration-150 ease-out">
            <Link href="/">
              <Image
                alt="logo"
                src="/Munchies-Icon-New.png"
                fill
                style={{
                  objectFit: "contain"
                }} />
            </Link>
          </div>

          {/* Middle */}
          <div className="max-w-xs">
            {smallHeader ? null : (
              <div className="relative mt-1 p-3 rounded-md">
                <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                  <BiSearch className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black"
                  type="text"
                  placeholder="search"
                />
              </div>
            )}
          </div>

          {/* Right */}
          <div className="flex items-center justify-end space-x-4">
              {smallHeader ? (
                <>
                  <Link href="/">
                    <BiHome
                      className="navBtnSH"
                      aria-label="home page button"
                      aria-describedby="default home page with post feed"
                      size="30"
                    />
                  </Link>
                  {session ? (
                    <>
                      <BiBookHeart
                        onClick={() => setOpenRecipeGenerator(true)}
                        className="navBtnSH"
                        size="30"
                      />
                      <BiPlusCircle
                        onClick={() => setOpenCreatePost(true)}
                        className="navBtnSH"
                        size="30"
                      />
                      <BiGroup className="navBtnSH" size="30" />
                      <BiHeart className="navBtnSH" size="30" />
                    </>
                  ) : (
                    null
                  )}
                </>
              ) : null}
            <BiMenu
              className="h-10 md:hidden cursor-pointer hover:scale-150 transition-all duration-150 ease-out"
              size="30"
              onClick={() => setSmallHeader((prevState) => !prevState)}
            />
            <Link href="/">
              <BiHome className="navBtn" aria-label="home page button" aria-describedby="default home page with post feed" size="30" />
            </Link>
            {session ? (
              <>
                <BiBookHeart onClick={() => setOpenRecipeGenerator(true)} className="navBtn" size="30" />
                <BiPlusCircle onClick={() => setOpenCreatePost(true)} className="navBtn" size="30" />
                <BiGroup className="navBtn" size="30" />
                <BiHeart className="navBtn" size="30" />
                <Link href="/"><img onClick={() => void signOut()} src={session?.user?.image ?? ""} alt="profile picture" className="h-12 w-12 rounded-full object-contain border p-1 cursor-pointer" /></Link>
              </>
            ) : (
              <button onClick={() => void signIn()}>Sign In</button>
            )}

          </div>
        </div>
      </div>
      <CreatePostModal />
      <RecipeGeneratorModal />
    </>
  );
}

export default Header

