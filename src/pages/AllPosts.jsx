import React,{useState, useEffect}from 'react'
import appwriteService from "../appwrite/config"
import {Container, PostCard} from "../components/index"

 function AllPosts() {
    const [posts , setPosts] = useState ([])

    useEffect(()=>{},[])

    appwriteService.getPosts([]).then((posts)=>{
        if(posts){
            setPosts(posts.documents)
        }
    })

    return (
        <div className='w-full py-8'>

<Container>
    {posts.map((post)=>(
        <div key={post.$id} className='p-2 w-1/4'>
            <PostCard/>
        </div>
    ))}
</Container>
        </div>
    )
}
export default AllPosts;