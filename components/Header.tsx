import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <div>
        <div className='flex justify-between max-w-6xl'>
            {/* Left */}
            <div className="relative hidden lg:inline-grid h-24 w-24 cursor-pointer">
              <Image src="/Munchies-Logo.png" alt="logo" layout="fill" objectFit="contain"/>
            </div>
            <div className="relative h-10 w-10 lg:hidden flex-shrink-0 cursor-pointer">
              <Image src="/Munchies-Icon.png" alt="logo" layout="fill" objectFit="contain"/>
            </div>
            {/* Middle */}

            {/* Right */}
        </div>
    </div>
  )
}

export default Header

