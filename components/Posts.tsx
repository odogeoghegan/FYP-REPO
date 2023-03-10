import React from 'react'
import { api } from '../src/utils/api';
import Link from 'next/link';

import {
    BiDotsHorizontalRounded, BiHeart, BiCommentDots, BiPaperPlane, BiBookmark, BiHappy
} from "react-icons/bi";

function Posts() {
    return (
        <Post />
    )
}

export default Posts

const Post: React.FC = () => {
    const { data: post, isLoading } = api.post.getAll.useQuery();

    if (isLoading) {
        return <div>Fetching posts...</div>;
    }

    return (
        <div>
            {post?.map((entry, index) => (
                <div key={index}>
                    {/* Post */}
                    <div className='bg-white my-7 border rounded-md'>
                        {/* header */}
                        <div className='flex items-center p-5'>
                            <Link href={`/user/${entry.author.id}`}>
                                <img src={entry.author.image ?? ""} className='rounded-full h-12 w-12 object-contain border p-1 mr-3 cursor-pointer' alt="" />
                            </Link>
                            <Link className='flex-1 font-bold cursor-pointer' href={`/user/${entry.author.id}`}>{entry.author.name}</Link>
                            <BiDotsHorizontalRounded className='h-5 w-5' />
                        </div>

                        {/* image */}
                        <Link href={`/post/${entry.id}`}>
                            <img
                                src="https://hiwlxpoxqpobizjstptb.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202023-02-22%20at%2000.46.40.jpeg"
                                className="object-cover w-full h-[32rem] cursor-pointer"
                                alt="postImage"
                            />
                        </Link>

                        {/* Buttons */}
                        <div className='flex justify-between px-3 pt-3'>
                            <div className="flex space-x-4">
                                <BiHeart className='btn' size="25" />
                                <BiCommentDots className='btn' size="25" />
                                <BiPaperPlane className='btn' size="25" />
                            </div>
                            <BiBookmark className='btn' size="20" />
                        </div>

                        {/* caption */}
                        <p className='p-3 truncate'>
                            <span className='font-bold mr-1 cursor-pointer'>{entry.author.name} </span>
                            {entry.title}
                        </p>
                        <div className='pb-1 flex items-center justify-center'>
                            <p>{entry.createdAt.toUTCString()}</p>
                        </div>

                        {/* Comments */}

                        {/* Comment Input */}
                        <form className="flex items-center p-3">
                            <BiHappy className='h-6 w-6 cursor-pointer' />
                            <input type={'text'} placeholder='Add a comment...'
                                className='flex-1 border-none bg-gray-100 rounded-lg mx-1 focus:ring-0 outline-none' />
                            <button className='bg-orange-500 hover:bg-orange-600 text-black font-semibold py-2 px-4 rounded'>Post</button>
                        </form>

                    </div>
                </div>
            ))}
        </div>

    );
};