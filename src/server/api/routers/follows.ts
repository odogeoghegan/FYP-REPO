import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { getSession } from "next-auth/react";

export const followsRouter = createTRPCRouter({
  followUser: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        followerId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const follow = await ctx.prisma.follower.create({
          data: {
            userId: input.userId,
            followerId: input.followerId,
          },
        });

        return follow;
      }
      catch (error) {
        console.log(error);
      }
    }),

  unfollowUser: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        followerId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const unfollow = await ctx.prisma.follower.deleteMany({
          where: { userId: input.userId, followerId: input.followerId },
        });
        return unfollow;
      }
      catch (error) {
        console.log(error);
      }
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