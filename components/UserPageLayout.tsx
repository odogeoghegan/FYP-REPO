import React, { useEffect, useState} from 'react'
import { Post, User, Follower } from "@prisma/client";
import Header from '../components/Header';
import Link from 'next/link';
import { api } from '../src/utils/api';
import { useSession } from 'next-auth/react';


interface UserPageLayoutProps {
  user: User & { posts: Post[] } & {followers: Follower[]};
}


function UserPageLayout({ user }: UserPageLayoutProps) {
  const { data: session } = useSession();
  const [isFollowing, setIsFollowing] = useState<boolean>(user.followers.some(u => u.followerId === session?.user?.id));
 

  // console.log(user.followers)
  console.log(user.followers.some(u => u.followerId === session?.user?.id))

  /* eslint-disable */
  const utils = api.useContext();
  const follow = api.follows.followUser.useMutation({
    onMutate: async (newFollow) => {
      await utils.post.getAll.cancel();
      console.log("Followed by: " + newFollow.userId);
    },
    onSettled: async () => {
      await utils.post.getAll.invalidate();
    },
  });

  const unfollow = api.follows.unfollowUser.useMutation({
    onMutate: async (deleteFollow) => {
      await utils.post.getAll.cancel();
      console.log("Unfollowed by: " + deleteFollow.userId);
    },
    onSettled: async () => {
      await utils.post.getAll.invalidate();
    },
  });

  const handleFollow = async () => {
    try {
      follow.mutate({ userId: user?.id, followerId: session?.user?.id as string });
      await setIsFollowing(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnfollow = async () => {
    try {
      unfollow.mutate({ userId: user?.id, followerId: session?.user?.id as string });
      await setIsFollowing(false);
    } catch (error) {
      console.error(error);
    }
  };
  /* eslint-enable */

  useEffect(() => {
    setIsFollowing(user.followers.some(u => u.followerId === session?.user?.id));
  }, [user, session]);


  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-20 w-20 rounded-full object-contain border p-1"
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
              <div className="ml-10">

                {/* eslint-disable */!isFollowing && (
                  <button
                    className="bg-orange-500 hover:bg-orange-600 text-black font-bold py-2 px-4 rounded mt-4"
                    onClick={handleFollow}
                  >
                    Follow
                  </button>
                )}
                {isFollowing && (
                  <button
                    className=" bg-orange-200 hover:bg-orange-300 text-black font-bold py-2 px-4 rounded mt-4"
                    onClick={handleUnfollow}
                  >
                    Unfollow
                  </button>
                /* eslint-enable */)}

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