import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredimage}) {

  return (
    <Link to={`/post/${$id}`}>

<div className="w-[300px] rounded-md border p-4">
  <div className='w-full justify-center mb-4'>
  <img
    src={appwriteService.getFilePreview(featuredimage)} alt={title}
    className="h-[250px] w-full rounded-md object-cover"
  />
  </div>
  <div>
    <h1 className="text-lg font-semibold text-neutral-50">{title} </h1>
   
  </div>
</div>
    </Link>
  )
}




export default PostCard