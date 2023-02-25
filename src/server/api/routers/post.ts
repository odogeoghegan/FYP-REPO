import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const postRouter = createTRPCRouter({

    getAll: publicProcedure.query(async ({ ctx }) => {
        try {
            return await ctx.prisma.post.findMany({
                select: {
                    authorId: true,
                    caption: true,
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


    create: protectedProcedure
        .input(
            z.object({
                caption: z.string(),
                authorId: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            try {
                await ctx.prisma.post.create({
                    data: {
                        caption:  input.caption,
                        authorId: input.authorId
                    }
                })
            }
            catch (error) {
                console.log(error);
            }
        }),

})
