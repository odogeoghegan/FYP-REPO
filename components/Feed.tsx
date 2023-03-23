import React from 'react'
import { api } from '../src/utils/api';
import MiniFeed from './MiniFeed';
import MiniProfile from './MiniProfile';
import Posts from './Posts';

function Feed() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto ">
      <section className=' col-span-2'>
        <Posts />
      </section>
      <section className='hidden xl:inline-grid md:col-span-1'>
        <div className='fixed top-20'>
          <MiniProfile />
          <MiniFeed />
        </div>
      </section>
    </main>
  );
}

export default Feed
