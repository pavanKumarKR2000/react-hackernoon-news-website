import React from 'react';
import { useGlobalContext } from './Context';

const Stories = () => {

  const { hits,isLoading,removePost } = useGlobalContext();

  return (
    isLoading?<h1 className='loading'>Loading...</h1>:
    <div className='stories-div'>
      {
          hits.map(currentItem => {
            const { title, author, objectID, url, num_comments } = currentItem;
            
            return (
              <div className="card" key={objectID}>
                <h2>{title}</h2>
                <p>By <span>{author}</span> | <span>{num_comments}</span> comments</p>
                <div className="card-button">
                  <a href={url} target="_blank">Read more</a>
                  <a href="#" onClick={()=>removePost(objectID)}>Remove</a>
                </div>
              </div>
            );
          })
      }
    </div>
  )
}

export default Stories;