import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { getSession } from "next-auth/react";

export const followsRouter = createTRPCRouter({
  followUser: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const session = await getSession();
      const followerId = session?.user?.id;
      if (!followerId) {
        throw new Error("Not authenticated");
      }

      const { userId } = input;

      await ctx.prisma.follower.create({
        data: {
          userId,
          followerId,
        },
      });

      return { success: true, message: "User followed" };
    }),

  unfollowUser: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const session = await getSession();
      const followerId = session?.user?.id;
      if (!followerId) {
        throw new Error("Not authenticated");
      }

      const { userId } = input;

      await ctx.prisma.follower.deleteMany({
        where: { userId, followerId },
      });

      return { success: true, message: "User unfollowed" };
    }),

  getFollowers: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId } = input;

      const followers = await ctx.prisma.follower.findMany({
        where: { userId },
        include: {
          follower: true,
        },
      });

      return followers.map((follow) => follow.follower);
    }),

  getFollowing: publicProcedure
    .input(
      z.object({
        followerId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { followerId } = input;

      const following = await ctx.prisma.follower.findMany({
        where: { followerId },
        include: {
          user: true,
        },
      });

      return following.map((follow) => follow.user);
    }),
});