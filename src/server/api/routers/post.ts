import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { getSession } from "next-auth/react";

export const postRouter = createTRPCRouter({

    getAll: publicProcedure.query(async ({ ctx }) => {
        try {
            return await ctx.prisma.post.findMany({
                orderBy: {
                    createdAt: "desc"
                },
                include: {
                    author: true,
                    recipe: true,
                    comments: true,
                    

                },
            });
        }
        catch (error) {
            console.log("error", error);
        }

    }),


    create: protectedProcedure
        .input(
            z.object({
                title: z.string(),
                authorId: z.string(),
                description: z.string().optional(),
                images: z.array(z.string()).optional(),
                ingredients: z.array(z.string()).optional(),
                steps: z.array(z.string()).optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            try {
                const post = await ctx.prisma.post.create({
                    data: {
                        title: input.title,
                        authorId: input.authorId,
                        description: input.description,
                        images: input.images,
                        recipe: {
                            create: {
                                ingredients: input.ingredients,
                                steps: input.steps,
                            },
                        },
                    },
                    include: {
                        recipe: true,
                    },
                });

                return post;
            }
            catch (error) {
                console.log(error);
            }
        }),

    addComment: protectedProcedure
        .input(
            z.object({
                comment: z.string(),
                authorId: z.string(),
                postId: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            try {
                const post = await ctx.prisma.postComment.create({
                    data: {
                        comment: input.comment,
                        authorId: input.authorId,
                        postId: input.postId,
                    }
                });

                return post;
            }
            catch (error) {
                console.log(error);
            }
        }),

    getPostById: publicProcedure
        .input(
            z.object({
                id: z.string()
            }))
        .query(async ({ ctx, input }) => {
            try {
                const post = await ctx.prisma.post.findUnique({
                    where: {
                        id: input.id,
                    },
                    include: {
                        author: true,
                    },
                });
                return post;
            } catch (error) {
                console.log("error", error);
            }
        }),

    likePost: protectedProcedure
        .input(
            z.object({
                postId: z.string(),
                userId: z.string()
            })
        )
        .mutation(async ({ ctx, input }) => {
            try {
                const postLike = await ctx.prisma.postLike.create({
                    data: {
                        postId: input.postId,
                        userId: input.userId,
                    },

                });
                return postLike
            }
            catch (error) {
                console.log(error);
            }
        }),


    unlikePost: protectedProcedure
        .input(
            z.object({
                postId: z.string(),
                userId: z.string()
            })
        )
        .mutation(async ({ ctx, input }) => {
            try {
                const deletedPostLike = await ctx.prisma.postLike.deleteMany({
                    where: {
                        postId: input.postId,
                        userId: input.userId,
                    },
                });
                return deletedPostLike;
            }
            catch (error) {
                console.log(error);
            }
        })



})
