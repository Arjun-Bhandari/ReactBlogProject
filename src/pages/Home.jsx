// import React, { useEffect, useState } from "react";
// import appwriteService from "../appwrite/config";
// import { Container, PostCard } from "../components";
// function Home() {
//   const [posts, setPosts] = useState([]);
  
//   useEffect(() => {
//     appwriteService.getPosts().then((posts) => {
//       console.log(posts)
//       if (posts) {
//         setPosts(posts.documents);
//       }
//     });
//   }, []);

//   if (posts.length === 0) {
//     return (
//       <div className="w-full py-8 mt-4 text-center">
//         <Container>
//           <div className="flex flex-wrap">
//             <div className="p-2 w-full">
//               <h1 className="text-2xl font-blod hover:text-gray-500">
//                 Login to read posts
//               </h1>
//             </div>
//           </div>
//         </Container>
//       </div>
//     );
//   }else{
//     return (
//       <div className="w-full py-8">
  
//       <Container>
//           <div className="flex flex-wrap">
//           {posts.map((post)=>(
//               <div key= {post.$id} className="p-2 w-1/4">
//                   <PostCard {...post}/>
//               </div>
//           ))}
//           </div>
//       </Container>
  
//       </div>
//     )
//   }
  
 
// }

// export default Home;

import { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Home() {
    const [posts, setPosts] = useState([])

    const userAuth = useSelector((state) => state.auth)
    // console.log('userAuth: (in /pages/Home.jsx) ', userAuth)
    const navigate = useNavigate()

    useEffect(() => {
        if (userAuth.status === true) {
            // console.log('executed')
            appwriteService.getPosts([]).then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            })
        } else navigate('/')

        return () => {
            // console.clear()
            console.log('unmounted from Home.jsx')
        }
    }, [])

    if (posts.length === 0 && userAuth.status === true) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Welcome to Dashboard. Create a Post to get started
                              <p><Link to ={"/add-post"} >Create Your own Post</Link></p>
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    if (posts.length === 0 && userAuth.status === false) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Welcome. Login to get started
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home