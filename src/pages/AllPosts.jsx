import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components/index";
import {getPosts as getPostsSlice} from "../store/postSlice"
import { useSelector ,useDispatch} from "react-redux";

function AllPosts() {
  const dispatch = useDispatch()
const posts = useSelector((state)=>state.posts.posts)
  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        dispatch(getPostsSlice({posts:posts.documents}))
      
      }
    });
  }, []);

  // appwriteService.getPosts([]).then((posts)=>{

  //     if(posts){
  //         setPosts(posts.documents)
  //     }
  // })

  return (
    <div className="w-full py-8">
      <Container>
        {posts.map((post) => (
          <div key={post.$id} className="p-2 w-1/4">
            <PostCard {...post} />
          </div>
        ))}
      </Container>
    </div>
  );
}
export default AllPosts;
