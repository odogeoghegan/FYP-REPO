import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

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
            })
        )
        .mutation(async ({ ctx, input }) => {
            try {
                await ctx.prisma.post.create({
                    data: {
                        title:  input.title,
                        authorId: input.authorId,
                    }
                })
            }
            catch (error) {
                console.log(error);
            }
        }),

})
