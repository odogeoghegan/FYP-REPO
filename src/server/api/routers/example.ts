import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),


  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  createTest: protectedProcedure
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

    getAllTest: publicProcedure.query(async ({ ctx }) => {
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
});