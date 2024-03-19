import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Layout from '../pages/Layout';
import Blogs from './Blogs';
import Blog from '../pages/Blog'
import Home from '../pages/Home'
import { createBrowserRouter, RouterProvider  } from "react-router-dom";


const Router =  () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path: "/",
          element: <Home/>
        },
        {
          path:"/blog/:blogId",
          element: <Blog/>
        },
        {
          path:"blog/allBlogs",
          element: <Blogs/>
        }
      ]
    }
  ])
  return <RouterProvider router={router}/>
}

export default Router