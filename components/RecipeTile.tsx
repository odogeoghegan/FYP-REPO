
import React from 'react'

type Props = {
  title: string;
  author: string;
};

function RecipeTile(p: Props) {
  return (
    <div>
      This recipe is for: { p.title } by <i>{ p.author }</i>
    </div>

  );
}

export default RecipeTile

