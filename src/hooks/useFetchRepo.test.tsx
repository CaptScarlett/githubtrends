import { renderHook, act } from "@testing-library/react-hooks";
import { useFetchRepos } from "./useFetchRepos";

describe("useFetchRepos", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 200, // Set the status to 200
      json: () =>
        Promise.resolve({
          items: [
            {
              id: 1,
              name: "repo1",
              describe: "Description 1",
              html_url: "https://github.com/repo1",
              stargazers_count: 10,
            },
            {
              id: 2,
              name: "repo2",
              describe: "Description 2",
              html_url: "https://github.com/repo2",
              stargazers_count: 20,
            },
          ],
        }),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    localStorage.clear();
  });

  it("should fetch repositories and update state", async () => {
    const { result } = renderHook(() => useFetchRepos());

    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);

    await act(async () => {
      result.current.fetchRepos();
    });

    expect(result.current.data).toEqual([
      {
        id: 1,
        name: "repo1",
        describe: "Description 1",
        html_url: "https://github.com/repo1",
        stargazers_count: 10,
        favorite: false,
      },
      {
        id: 2,
        name: "repo2",
        describe: "Description 2",
        html_url: "https://github.com/repo2",
        stargazers_count: 20,
        favorite: false,
      },
    ]);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("https://api.github.com/search/repositories?")
    );
  });

  it("should set loading state to true while fetching repositories", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetchRepos());

    expect(result.current.loading).toBe(false);

    act(() => {
      result.current.fetchRepos();
    });

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
  });
});
