import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'


function MiniProfile() {

  const { data: session } = useSession();

  return (
    <div className='flex items-center justify-between mt-14 ml-10'>
      <Link href={`/user/${session?.user?.id}`}>
        <img className='w-16 h-16 mr-2 rounded-full border p-[2px]'
          src={session?.user?.image ?? ""}
          alt=""
        />
      </Link>
      <div>
        <Link href={`/user/${session?.user?.id}`}>
          <h2 className='font-bold cursor-pointer'>{session?.user?.name}</h2>
        </Link>
        <h3 className='text-sm text-gray-400'>Welcome to Munchies</h3>
      </div>
      <button className='text-orange-500 text-sm pl-4 font-semibold' onClick={() => void signOut()}>Sign Out</button>
    </div>
  )
}

export default MiniProfile