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
          <p>{entry.caption}</p>
          <span>- {entry.authorId}</span>
        </div>
      ))}
    </div>
  );
};