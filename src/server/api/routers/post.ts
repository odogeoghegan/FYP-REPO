import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const postRouter = createTRPCRouter({

    createPost: protectedProcedure
        .input(
            z.object({
                name: z.string(),
                message: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            try {
                await ctx.prisma.example.create({
                    data: {
                        name: input.name,
                        message: input.message,
                    }
                })
            }
            catch (error) {
                console.log(error);
            }

        }),

    getAll: publicProcedure.query(async ({ ctx }) => {
            try {
                return await ctx.prisma.example.findMany({
                    select: {
                        name: true,
                        message: true,
                    },
                orderBy: {
                        createdAt: "desc",
                    },
                });
            }
            catch (error) {
                console.log("error", error);
            }

        }),


        basicPost: protectedProcedure
        .input(
            z.object({
                images: z.array(z.string()),
                caption: z.string(),
                authorId: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            try {
                await ctx.prisma.post.create({
                    data: {
                        images: input.images,
                        caption: input.caption,
                        authorId: input.authorId
                    }
                })
            }
            catch (error) {
                console.log(error);
            }

        }),  

})
