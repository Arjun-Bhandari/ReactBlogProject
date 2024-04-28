import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import authService from "../appwrite/auth";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;
  
  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
         else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredimage);
        navigate("/");
      }
    });
  };

  let formattedDate = "";
  if (post && post.$createdAt) {
    const createdAt = new Date(post.$createdAt);
    const weekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const weekday = weekDays[createdAt.getDay()];
    const month = months[createdAt.getMonth()];
    const day = createdAt.getDay();
    const year = createdAt.getFullYear();
    formattedDate = `${weekday}, ${month} ${day}, ${year}`;
  }
  return post ? (
    <div className="py-8">
      <Container>
        <div className="flex justify-center">
          <div className=" w-1/2">
            <p className="text-neutral-50 px-3">
              <b>By:</b>&nbsp;{post.authorName}
            </p>

            <p className="text-neutral-50 px-3">&nbsp;{`${formattedDate}`}</p>
          </div>
        </div>

        <div className="w-full flex justify-center mb-4 relative  rounded-xl p-2">
          <img
            src={appwriteService.getFilePreview(post.featuredimage)}
            alt={post.title}
            className="rounded-xl h-3/4 w-1/2"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="flex justify-center">
          <div className="border rounded w-1/2">
            <div className=" mb-6 px-3">
              <h1 className="text-2xl font-bold text-neutral-50">
                {post.title}
              </h1>
            </div>
            <div className="browser-css text-neutral-50 px-3 mb-6">
              {parse(post.content)}
            </div>
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}
