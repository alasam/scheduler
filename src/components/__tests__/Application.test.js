// Import External Resources
import React from "react";
import { render, cleanup } from "@testing-library/react";
import Application from "components/Application";
afterEach(cleanup);

// Application Test
it("renders without crashing", () => {
  render(<Application />);
});
