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
    
    

})
