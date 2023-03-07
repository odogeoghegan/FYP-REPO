import React from 'react'
import { Post, User, Recipe } from "@prisma/client";
import Header from '../components/Header';

interface PostPageLayoutProps {
  post: Post & { author: User, recipe: Recipe | null };
}

function PostPageLayout({ post }: PostPageLayoutProps) {
  return (
    <>
      <Header />
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <img className="object-cover w-full h-[32rem]  rounded-lg" src={post.images[0] ?? "https://hiwlxpoxqpobizjstptb.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202023-02-22%20at%2000.46.40.jpeg"} alt="" />
        </div>
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2">{post.title}</h1>
          <div className="text-gray-700 text-lg">{post.description}</div>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Author</h2>
          <div>{post.author.name}</div>
        </div>
        {post.recipe && post.recipe.ingredients.length > 1 && post.recipe.steps.length > 1 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Recipe</h2>
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
                <ul className="list-disc pl-4">
                  {post.recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Steps</h3>
                <ol className="list-decimal pl-4">
                  {post.recipe.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default PostPageLayout;