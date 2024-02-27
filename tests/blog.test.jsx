import { render, screen } from "@testing-library/react";
import Blogs from "../src/components/Blogs";

import {Routes, MemoryRouter, Links} from 'react-router-dom'

const blogs = [
  {
    'id': 1,
    'title':'This is my first blog post',
    'content': `Welcome to my blog page, This first post will be an introdution 
    about my pages `, 
    'published': true,
  },
  {
    'id': 2,
    'title':'Second blog post',
    'content': `My second blog post, and I am going to be talking about HRV `, 
    'published': true,
  }
]

describe("Blog component", () => {
  it("renders Heading", () => {
    render(<MemoryRouter><Blogs/></MemoryRouter>);

    expect(screen.getByRole("heading").textContent).toBe('All Blogs');
  })

  it("renders All Blogs", () => {
    render(<MemoryRouter><Blogs/></MemoryRouter>);
    
    expect(screen.getByRole("a").textContent).toBe(blogs[0].title)
  })
})