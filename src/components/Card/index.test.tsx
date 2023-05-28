import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Card from "./index";

const mockProps = {
  id: 1,
  html_url: "https://example.com",
  name: "Example Card",
  description: "This is a test card",
  stargazers_count: 5,
  favorite: false,
  language: "",
  toggleFav: jest.fn(),
};

test("renders Card component correctly", () => {
  render(
    <Router>
      <Card {...mockProps} />
    </Router>
  );

  // Check if the card element is rendered
  const cardElement = screen.getByTestId("card");
  expect(cardElement).toBeDefined();

  // Check if the card name is rendered
  const cardNameElement = screen.getByText(/Example Card/i);
  expect(cardNameElement).toBeDefined();

  // Check if the card description is rendered
  const cardDescriptionElement = screen.getByText(mockProps.description);
  expect(cardDescriptionElement).toBeDefined();

  // Check if the star count is rendered
  const starCountElement = screen.getByText(
    mockProps.stargazers_count.toString()
  );
  expect(starCountElement).toBeDefined();

  // Check if the favorite button is rendered
  const favoriteButtonElement = screen.getByRole("button", {
    name: mockProps.favorite ? "♥ unfavorite" : "♡ favorite",
  });
  expect(favoriteButtonElement).toBeDefined();

  // Simulate a click on the favorite button
  fireEvent.click(favoriteButtonElement);
  expect(mockProps.toggleFav).toHaveBeenCalledTimes(1);
  expect(mockProps.toggleFav).toHaveBeenCalledWith(mockProps.id);
});
