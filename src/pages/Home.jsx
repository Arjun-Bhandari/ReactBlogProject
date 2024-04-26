import { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getPosts as getPostsSlice } from "../store/postSlice";

function Home() {
  const dispatch = useDispatch();

  const userAuth = useSelector((state) => state.auth);
  const posts = useSelector((state) => state.posts.posts);
  const navigate = useNavigate();

  useEffect(() => {
    if (userAuth.status === true) {
      appwriteService.getPosts([]).then((posts) => {
        if (posts) {
          dispatch(getPostsSlice({ posts: posts.documents }));
        }
      });
    } else navigate("/");

    return () => {
      // console.clear()
      console.log("unmounted from Home.jsx");
    };
  }, []);

  if (posts.length === 0 && userAuth.status === true) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500 text-neutral-50">
                Welcome to Dashboard. Create a Post to get started
                <p>
                  <Link to={"/add-post"}>Create Your own Post</Link>
                </p>
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  if (posts.length === 0 && userAuth.status === false) {
    return (
      <div className="w-full text-center">
        <Container>
          <div className="relative">
            <div>
              <img
                src="/hero-background.png"
                alt="Preview img"
                className=" w-full"
              />
            
                <div className="absolute top-12 w-1/2 mt-5 ml-2">
                  <h2 className="text-orange-500 text-2xl font['poppins']">
                    Share your Experiences with the World,
                  </h2>
                  <div className="text-neutral-100 text-7xl font-bold mt-5 font-['Volkhov']">
                    Travel, enjoy and live a new and full life
                  </div>
                  <div className="text-neutral-100 text-xl mt-5">
                    Embrace the unknown and let the world be your playground.
                    Every journey is an opportunity to create lifelong memories
                    and discover the beauty that lies beyond your comfort zone.
                  </div>
                  <div className="my-20">
                  <Link to={"/login"} className="text-white rounded py-3 px-3 bg-orange-600"> Welcome, Login To Read Blog</Link>
                  </div>
                </div>
                
            
            </div>
          </div>

        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
