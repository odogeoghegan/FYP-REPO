import Image from "next/legacy/image";
import React from 'react'

function Header() {
  return (
    <div>

      {/* Left */}
      <div className='flex justify-between max-w-2xl'>
        <div className="hidden lg:inline-grid h-24 w-24 cursor-pointer">
          <Image 
            src="/Munchies-Logo.png"
            layout="fill"
            objectFit="contain"
          />
        </div>

        <div className=" w-10 h-10 lg:hidden flex-shrink-0 cursor-pointer">
          <Image 
            src="/Munchies-Icon.png" 
            layout="fill"
            objectFit="contain"
          />
        </div>

      {/* Middle */}
      <div>
        <input type="text" placeholder="search" />
      </div>

      {/* Right */}
      </div>
    </div>
  )
}

export default Header

