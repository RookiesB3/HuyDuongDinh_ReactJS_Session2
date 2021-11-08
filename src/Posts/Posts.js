import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Posts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [sortByTitle, setSortByTitle] = useState(null);
  
  const postsSearch = posts.filter(post => post.title.toLowerCase().includes(searchText.toLowerCase()));
  
  const getPostsSorted = () => {
    if (sortByTitle === null) return postsSearch;
    return postsSearch.sort((post1, post2) => {
      if (sortByTitle === 'ASC') return post1.title.toLowerCase().localeCompare(post2.title.toLowerCase())
      else return post2.title.toLowerCase().localeCompare(post1.title.toLowerCase())
    });
  }
  
  const postsSorted = getPostsSorted();
  
  useEffect(() => {
    let didCancel = false;
    axios({
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/posts'
    })
      .then(response => {
        if (!didCancel) {
          setIsLoading(false);
          setPosts(response.data);
        }
      })
    return () => {
      didCancel = true
    }
  }, []);
  
  if (isLoading) return <div>Loading ...</div>;
  
  const handleRemove = postId => {
    const index = posts.findIndex(post => post.id === postId);
    const newPosts = [...posts];
    newPosts.splice(index, 1);
    setPosts(newPosts);
  };
  const handleSortList=()=>{
    if (sortByTitle === null) setSortByTitle('ASC');
    if (sortByTitle === 'ASC') setSortByTitle('DES');
    if (sortByTitle === 'DES') setSortByTitle(null);
  }
  return (
    <div>
      <input
        type="text"
        placeholder="Search by title"
        className="searching"
        value={ searchText }
        onChange={ evt => setSearchText(evt.target.value) }
      />
      <table>
        <tr>
          <th>ID</th>
          <th onClick={handleSortList}>Title -- Sort { sortByTitle === null ? '(NONE)' : sortByTitle }
          </th>
          <th>Actions</th>
        </tr>
        {
          postsSorted.map(post => (
            <tr key={ post.id }>
              <td>{ post.id }</td>
              <td>{ post.title }</td>
              <td>
                <Link to={ `posts/${ post.id }` }>
                  Post Details
                </Link>
                <button onClick={ () => handleRemove(post.id) }>Remove</button>
              </td>
            </tr>
          ))
        }
      </table>
    </div>
  );
};

export default Posts;