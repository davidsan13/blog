import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Layout from '../pages/Layout';
import Blog from '../pages/Blog'
import Home from '../pages/Home'
import AllBlogs from '../pages/AllBlogs'
import CreateBlog from "../pages/CreateBlog";
import Login from "../pages/Login";

import { createBrowserRouter, RouterProvider  } from "react-router-dom";


const Router =  ({blogs}) => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path: "/",
          element: <Home blogs={blogs}/>
        },
        {
          path:"/blog/:blogId",
          element: <Blog/>
        },
        {
          path:"/blog/allBlogs",
          element: <AllBlogs blogs={blogs}/>
        },
        {
          path:"/blog/createblog",
          element: <CreateBlog/>
        },
        {
          path:"/blog/login",
          element: <Login/>
        },
      ]
    }
  ])
  return <RouterProvider router={router}/>
}

export default Router