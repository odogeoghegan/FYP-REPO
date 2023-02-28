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
                    title:  input.title,
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

})
