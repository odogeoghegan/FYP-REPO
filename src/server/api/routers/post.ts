import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
    createPost: publicProcedure
        .input(
            z.object({
                caption: z.string(),
                image: z.string(),
            })
        )
        .mutation(async ({ ctx, input })=>{
            
        }
        
        )


})
