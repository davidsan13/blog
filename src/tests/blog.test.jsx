import { render, screen } from "@testing-library/react";
import Blog from "../src/pages/Blog";

describe("Blog component", () => {
  it("renders all blogs", () => {
    render(<Blog/>);
    expect(screen.getByRole("heading").textContent).toMatch(/All Blogs/)
  })
})