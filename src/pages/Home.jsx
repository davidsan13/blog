import React from 'react'
import { Outlet } from "react-router-dom";

import Footer from '../components/Footer'
import Navbar from '../components/NavBar'

const Home = () => {
  return (
    <>
      <Navbar/>
      <main>
        <Outlet />
      </main>
      <Footer/>
    </>
  )
}

export default Home