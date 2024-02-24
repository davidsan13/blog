import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Home from '../pages/Home';
import Blogs from './Blogs';
import Blog from '../pages/Blog'
import { createBrowserRouter, RouterProvider  } from "react-router-dom";


const Router =  () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
      children: [
        {
          path: "/",
          element: <Blogs/>
        },
        {
          path:"/blog/:id",
          element: <Blog/>
        }
      ]

    }
  ])
  return <RouterProvider router={router}/>
}

export default Router