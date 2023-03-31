import React, { useEffect, useState } from 'react'
import { api } from '../src/utils/api';
import Link from 'next/link';
import {
    BiDotsHorizontalRounded, BiHeart, BiCommentDots, BiPaperPlane, BiBookmark, BiHappy
} from "react-icons/bi";
import {
    FaHeart
} from "react-icons/fa"
import { useSession } from 'next-auth/react';

function Posts() {
    return (
        <Post />
    )
}

export default Posts

const Post: React.FC = () => {
    const { data: post, isLoading } = api.post.getAll.useQuery();
    const { data: session } = useSession();

    const [liked, setLiked] = useState<{ [key: string]: boolean }>({});

    const [comment, setComment] = useState("");


    const utils = api.useContext();
    const uploadComment = api.post.addComment.useMutation({
        onMutate: async (newComment) => {
            await utils.post.getAll.cancel();
            console.log("Added new comment: " + newComment.comment + " by " + newComment.authorId);
        },
        onSettled: async () => {
            await utils.post.getAll.invalidate();
        },
    });

    const like = api.post.likePost.useMutation({
        onMutate: async (newlike) => {
            await utils.post.getAll.cancel();
            console.log("Added new like by: " + newlike.userId);
        },
        onSettled: async () => {
            await utils.post.getAll.invalidate();
        },
    });

    const unlike = api.post.unlikePost.useMutation({
        onMutate: async (deletelike) => {
            await utils.post.getAll.cancel();
            console.log("Removed like by: " + deletelike.userId);
        },
        onSettled: async () => {
            await utils.post.getAll.invalidate();
        },
    });



    const handleComment = (postId: string, e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        /* eslint-disable */
        try {
            uploadComment.mutate({
                comment,
                postId,
                authorId: session?.user?.id as string,
            });
            setComment("");
        }

        catch (error) {
            console.error("Error submitting form:", error);
        }
        /* eslint-enable */
    };

    const handleLike = (postId: string) => {
        try {
            like.mutate({
                postId,
                userId: session?.user?.id as string
            });
            setLiked((prevLikes) => ({ ...prevLikes, [postId]: true }));
        } catch (error) {
            console.error(error);
        }
    };

    const handleUnlike = (postId: string) => {
        try {
            unlike.mutate({
                postId: postId,
                userId: session?.user?.id as string
            });
            setLiked((prevLikes) => ({ ...prevLikes, [postId]: false }));
        } catch (error) {
            console.error(error);
        }
    };

    // useEffect(() => {
    //     if (post?.likes && session?.user) {
    //       const isLiked = post.likes.some((like) => like.userId === session.user.id);
    //       setLiked(isLiked);
    //     }
    //   }, [post, session]);



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
                        {session ? (
                            <>
                                <div className='flex items-center p-5'>
                                    <Link href={`/user/${entry.author.id}`}>
                                        <img src={entry.author.image ?? ""} className='rounded-full h-12 w-12 object-contain border p-1 mr-3 cursor-pointer' alt="" />
                                    </Link>
                                    <Link className='flex-1 font-bold cursor-pointer' href={`/user/${entry.author.id}`}>{entry.author.name}</Link>
                                    <BiDotsHorizontalRounded className='h-5 w-5' />
                                </div>

                                {entry.recipe && entry.recipe.ingredients.every(ingredient => ingredient.length >= 2) && entry.recipe.steps.every(step => step.length >= 2) && (
                                    <Link href={`/post/${entry.id}`}>
                                        <div className='flex items-center font-bold justify-center p-3 bg-orange-500'>
                                            <p>Click to view Recipe</p>
                                        </div>
                                    </Link>
                                )}

                                {/* image */}
                                <Link href={`/post/${entry.id}`}>
                                    <img
                                        src={entry.images[0]}
                                        className="object-cover w-full h-[32rem] cursor-pointer"
                                        alt="postImage"
                                    />
                                </Link>
                            </>
                        ) : (
                            <>
                                <div className='flex items-center p-5'>
                                    <img src={entry.author.image ?? ""} className='rounded-full h-12 w-12 object-contain border p-1 mr-3 cursor-pointer' alt="" />
                                    <div className='flex-1 font-bold cursor-pointer' >{entry.author.name}</div>
                                    <BiDotsHorizontalRounded className='h-5 w-5' />
                                </div>

                                {entry.recipe && entry.recipe.ingredients.every(ingredient => ingredient.length >= 2) && entry.recipe.steps.every(step => step.length >= 2) && (
                                    <div className='flex items-center font-bold justify-center p-3 bg-orange-500'>
                                        <p>Sign in to view Recipe</p>
                                    </div>
                                )}

                                {/* image */}

                                <img
                                    src={entry.images[0]}
                                    className="object-cover w-full h-[32rem] cursor-pointer"
                                    alt="postImage"
                                />
                            </>
                        )}


                        {/* Buttons */}
                        {session ? (
                            <>
                                <div className='flex justify-between px-3 pt-3'>
                                    <div className="flex space-x-4">

                                        {liked[entry.id] ? (
                                            /* eslint-disable */
                                            <FaHeart className='btn text-orange-500' size="25" onClick={() => handleUnlike(entry.id)} />
                                        ) : (
                                            <BiHeart className='btn' size="25" onClick={() => handleLike(entry.id)} />
                                            /* eslint-enable */
                                        )}


                                        <BiCommentDots className='btn' size="25" />
                                        <BiPaperPlane className='btn' size="25" />
                                    </div>
                                    <BiBookmark className='btn' size="20" />
                                </div>
                            </>) : (null)}
                        {/* caption */}
                        <p className='p-3 truncate'>
                            <span className='font-bold mr-1 cursor-pointer'>{entry.author.name} </span>
                            {entry.title}
                        </p>
                        <div className='pb-1 flex items-center justify-center'>
                            <p>{entry.createdAt.toUTCString()}</p>
                        </div>

                        {session ? (
                            <>
                                {/* Comments */}
                                {entry.comments.length > 0 && (
                                    <div className="ml 10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
                                        {entry.comments.map(comment => (
                                            <div key={comment.id} className="flex items-center mb-2">
                                                <img
                                                    src={comment.author.image ?? ""}
                                                    className="rounded-full h-8 w-8 object-contain border p-1 mr-3 cursor-pointer"
                                                    alt=""
                                                />
                                                <div>
                                                    <Link className="font-bold cursor-pointer" href={`/user/${comment.authorId}`}>
                                                        {comment.author.name}
                                                    </Link>
                                                    <p>{comment.comment}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Comment Input */}

                                <form /* eslint-disable */ className="flex items-center p-3" onSubmit={(e) => handleComment(entry.id, e)} /* eslint-enable */>
                                    <BiHappy className='h-6 w-6 cursor-pointer' />
                                    <input type="text" value={comment}
                                        onChange={e => setComment(e.target.value)}
                                        placeholder='Add a comment...'
                                        className='flex-1 border-none bg-gray-100 rounded-lg mx-1 focus:ring-0 outline-none'
                                    />
                                    <button type='submit' disabled={!comment.trim()} className='bg-orange-500 hover:bg-orange-600 text-black font-semibold py-2 px-4 rounded'>Post</button>
                                </form >
                            </>
                        ) : (null)}
                    </div>
                </div>
            ))}
        </div>

    );
};