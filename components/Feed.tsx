import React from 'react'
import { api } from '../src/utils/api';

function Feed() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div>
        feed
      </div>
      <Posts />
    </div>
  );
}

export default Feed


const Posts: React.FC = () => {
  const { data: post, isLoading } = api.post.getAll.useQuery();

  if (isLoading) {
    return <div>Fetching posts...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {post?.map((entry, index) => (
        <div key={index}>
          <h2>{entry.title}</h2>
          <span>
            <img width='15' src={"" + entry.author.image}></img>
          {entry.author.name}  (<i>{entry.createdAt.toUTCString()}</i>)</span>
        </div>
      ))}
    </div>
  );
};