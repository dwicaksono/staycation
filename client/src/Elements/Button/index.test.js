import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import Button from "./index";

test("should must not allowed click button if isDisabled active", () => {
  const { container } = render(<Button isDisabled></Button>);
  expect(container.querySelector("span.disabled")).toBeInTheDocument();
});

test("should render <a> tag", () => {
  const { container } = render(<Button type="link" isExternal></Button>);
  expect(container.querySelector("a")).toBeInTheDocument();
});

test("should render <Link> Component", () => {
  const { container } = render(
    <Router>
      <Button href="" type="link"></Button>
    </Router>
  );
  expect(container.querySelector("a")).toBeInTheDocument();
});
