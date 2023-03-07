import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from "next/router";
import { PrismaClient, Post, Recipe, User } from "@prisma/client";
import Header from '../../../components/Header';
import PostPageLayout from "../../../components/PostPageLayout";

// Create a new Prisma client instance
const prisma = new PrismaClient();

// This function generates the dynamic paths for each post page at build time
export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch all posts from the database
  const posts = await prisma.post.findMany();

  // Generate the paths for each post page
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  // Return the paths and set fallback to false so that 404 is returned for invalid paths
  return { paths, fallback: false };
}

// This function fetches the data for a single post at build time
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params!.id;

  // Fetch the post with the matching ID and include the author relationship
  const post = await prisma.post.findUnique({
    where: { id: id as string },
    include: { author: true, recipe: true },
  });

  // Convert the post.createdAt date object to a string
  const serializedPost = JSON.parse(JSON.stringify(post, (_, value) => {
    if (value instanceof Date) {
      return value.toISOString();
    }
    return value as Post & { author: User, recipe: Recipe };
  }));

  // Return the post as props
  return {
    props: {
      post: serializedPost,
    },
  };
}

function PostPage({ post }: { post: Post & { author: User, recipe: Recipe } }) {
  // Get the router instance
  const router = useRouter();

  // If the page is still loading, show a loading message
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // Render the post content
  return (
    <PostPageLayout post={post} />
  );
}

export default PostPage;