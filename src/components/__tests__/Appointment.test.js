// Import External Resources
import React from "react";
import { render, cleanup } from "@testing-library/react";
import Appointment from "components/Appointment";
afterEach(cleanup);

// Appointment component test
describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
});