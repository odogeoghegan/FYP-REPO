import React, { useEffect, useState } from 'react'
import { User, Follower } from "@prisma/client";
import { api } from '../src/utils/api';
import { profile } from 'console';
import Link from 'next/link';
import { useSession } from 'next-auth/react';


interface userSuggestion {
  user: User & { followers: Follower[] } & { followings: Follower[] };
}

function MiniFeed() {
  const [suggestions, setSuggestions] = useState<userSuggestion[]>([]);
  const { data: users, isLoading } = api.follows.getAllUser.useQuery();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (users) {
      const shuffledUsers = users.sort(() => 0.5 - Math.random());
      const randomUsers = shuffledUsers.slice(0, 5);
      const suggestions = randomUsers.map((user) => ({
        user: user,
      }));
      setSuggestions(suggestions);
    }
  }, [users]);


  return (
    <div className='mt-4 ml-10'>
      {session ? (
        <>
          <div className='flex justify-between text-sm mb-5'>
            <h3 className='text-sm font-bold text-gray-400'>Suggestions for you</h3>
            <button className='yext-gray-600 font-semibold'>See All</button>
          </div>

          {suggestions?.map((suggestion) => (
            <div key={suggestion.user.id} className='flex items-center justify-between mt-3'>
              <Link href={`/user/${suggestion.user.id}`}>
                <img
                  className='w-10 h-10 rounded-full border p-[2px] cursor-pointer'
                  src={suggestion.user?.image ?? ""}
                  alt={suggestion.user?.name ?? ""}
                />
              </Link>
              <div className='flex-1 ml-4'>
                <Link href={`/user/${suggestion.user.id}`}>
                  <h2 className='font-semibold text-sm cursor-pointer'>{suggestion.user.name}</h2>
                </Link>
                <h3 className='text-gray-400 text-xs'>Munchies member since: {suggestion.user.signupDate.toString().slice(0, -40)}</h3>
              </div>
              <button className='text-orange-500'>Follow</button>
            </div>
          ))}
        </>
      ) : (
        null
      )}
    </div>
  )
}

export default MiniFeed