import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import CardList from "./index";

describe("CardList", () => {
  test("renders loading state", () => {
    render(
      <MemoryRouter>
        <CardList loading={true} />
      </MemoryRouter>
    );
    const loadingElement = screen.getByText(/loading.../i);
    expect(loadingElement).toBeInTheDocument();
  });

  test("renders error state", () => {
    render(
      <MemoryRouter>
        <CardList error={true} />
      </MemoryRouter>
    );
    const errorElement = screen.getByText(/sorry something went wrong/i);
    expect(errorElement).toBeInTheDocument();
  });

  test("renders list of cards", () => {
    const mockData = [
      { id: 1, name: "Repo 1", description: "Description 1" },
      { id: 2, name: "Repo 2", description: "Description 2" },
    ];

    render(
      <MemoryRouter>
        <CardList filteredData={mockData} loading={false} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Repo 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Description 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Repo 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Description 2/i)).toBeInTheDocument();
  });
});
