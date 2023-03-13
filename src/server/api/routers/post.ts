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
                    author: true, // Return all related author fields
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
                                ingredients: input.ingredients || [],
                                steps: input.steps || [],
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
        .input(z.object({ postId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const session = await getSession();
            const userId = session?.user?.id;
            if (!userId) {
                throw new Error("Not authenticated");
            }

            const like = await ctx.prisma.postLike.findFirst({
                where: { postId: input.postId, userId },
            });

            if (like) {
                await ctx.prisma.postLike.delete({ where: { id: like.id } });
                return { success: true, message: "Post unliked" };
            } else {
                await ctx.prisma.postLike.create({
                    data: {
                        postId: input.postId,
                        userId,
                    },
                });
                return { success: true, message: "Post liked" };
            }
        }),

    unlikePost: protectedProcedure
        .input(z.object({ postId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const session = await getSession();
            const userId = session?.user?.id;
            if (!userId) {
                throw new Error("Not authenticated");
            }

            const like = await ctx.prisma.postLike.findFirst({
                where: { postId: input.postId, userId },
            });

            if (!like) {
                throw new Error("Post not liked");
            }

            await ctx.prisma.postLike.delete({ where: { id: like.id } });
            return { success: true, message: "Post unliked" };
        }),




})
