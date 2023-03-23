import { signOut, useSession } from 'next-auth/react';
import React from 'react'


function MiniProfile() {

    const { data: session} = useSession();

  return (
    <div className='flex items-center justify-between mt-14 ml-10'>
        <img className='w-16 h-16 mr-2 rounded-full border p-[2px]'
        src={session?.user?.image ?? ""}
        alt=""
        />
        <div>
            <h2 className='font-bold'>{session?.user?.name}</h2>
            <h3 className='text-sm text-gray-400'>Welcome to Munchies</h3>
        </div>
        <button className='text-orange-500 text-sm pl-4 font-semibold' onClick={() => void signOut()}>Sign Out</button>
    </div>
  )
}

export default MiniProfile