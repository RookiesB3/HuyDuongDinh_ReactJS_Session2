import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const Post = () => {
    const id = useParams().id;
    const [isLoading, setIsLoading] = useState(true);
    const [post, setPost] = useState({
      title: 'title',
      body: 'bodyTest'
    });
    
    useEffect(() => {
      setIsLoading(true);
      let didCancel = false;
      axios({
        url: `https://jsonplaceholder.typicode.com/posts/${ id }`,
        method: 'GET',
      })
        .then(response => {
          if (!didCancel) {
            setPost({
              title: response.data.title,
              body: response.data.body
            })
            setIsLoading(false);
          }
        })
      return () => {
        didCancel = true;
      }
      
    }, [id]);
    
    const getDetails = () => {
      if (isLoading) return (
        <h2>Loading ...</h2>
      );
      return (
        <div>
          <div>
            Title: { post.title }
          </div>
          <div>
            Body: { post.body }
          </div>
        </div>
      )
    }
    
    return (
      <div>
        <div>
          <div> ID: { id } </div>
        </div>
        { getDetails() }
      </div>
    )
  
};

export default Post;