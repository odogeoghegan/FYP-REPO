import React from 'react'
import { api } from '../src/utils/api';
import Posts from './Posts';

function Feed() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto ">
    <section className=' col-span-2'>
    <div>
      <div>
      </div>
      <Posts />
    </div>
    </section>
    </main>
  );
}

export default Feed
