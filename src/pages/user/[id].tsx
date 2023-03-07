import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { PrismaClient, Post, User } from '@prisma/client';
import UserPageLayout from '../../../components/UserPageLayout';

// Create a new Prisma client instance
const prisma = new PrismaClient();

// This function generates the dynamic paths for each user page at build time
export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch all users from the database
  const users = await prisma.user.findMany();

  // Generate the paths for each user page
  const paths = users.map((user) => ({
    params: { id: user.id.toString() },
  }));

  // Return the paths and set fallback to blocking so that Next.js generates the page on the server if it hasn't been pre-generated
  return { paths, fallback: "blocking" };
}

// This function fetches the data for a single user at build time
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params!.id;

  // Fetch the user with the matching ID and include the posts relationship
  const user = await prisma.user.findUnique({
    where: { id: id as string },
    include: { 
      posts: {
        include: { author: true },
        orderBy: { createdAt: 'desc' }, 
      } 
    },
  });

  /* eslint-disable */
  // Convert the post.createdAt date object to a formatted string
  const serializedUser: User = JSON.parse(JSON.stringify(user, (_, value: User) => {
    if (value instanceof Date) {
      return value.toISOString();
    }
    return value;
  }));

  // Return the user as props
  return {
    props: {
      user: serializedUser,
    },
    revalidate: 1, // regenerate the page with new data if a request hasn't been made for the page in 1 second
  };
};
/* eslint-enable */

function UserPage({ user }: { user: User & { posts: Post[] } }) {
  // Get the router instance
  const router = useRouter();

  // If the page is still loading, show a loading message
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // Render the user content
  return (
    <>
      <UserPageLayout user={user} />
    </>
  );
}

export default UserPage;