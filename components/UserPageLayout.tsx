import React from 'react'
import { Post, User, Recipe } from "@prisma/client";
import Header from '../components/Header';
import Link from 'next/link';

interface UserPageLayoutProps {
  user: User & { posts: Post[] };
}

function UserPageLayout({ user }: UserPageLayoutProps) {
  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-20 w-20 rounded-full"
                  src={user.image ?? ""}
                  alt=""
                />
              </div>
              <div className="ml-4">
                <h1 className="text-3xl font-bold text-gray-900">
                  {user.name}
                </h1>
                <p className="text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto">
          <div className="col-span-2 grid grid-cols-3 gap-6 p-6">
            {user.posts.map((post) => (
              <div key={post.id} className="bg-gray-100 p-4">
                <Link href={`/post/${post.id}`}>
                <img
                  className="w-full h-40 object-cover"
                  src={post.images[0] ?? "https://hiwlxpoxqpobizjstptb.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202023-02-22%20at%2000.46.40.jpeg"}
                  alt=""
                />
                </Link>
                <h2 className="mt-2 text-lg font-bold">{post.title}</h2>
                <p className="mt-2 text-gray-500">{post.description}</p>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserPageLayout;