import { useState } from "react";
import { IRepo } from "../types/Repo";
import { z } from "zod";

export const useFetchRepos = () => {
  const [data, setData] = useState<IRepo[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  // Fetch Repos from Github API
  const fetchRepos = () => {
    setLoading(true);
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 7); // 7 days ago
    const formattedDate = currentDate.toISOString().split("T")[0];
    const url = `https://api.github.com/search/repositories?q=created:%3E${formattedDate}&sort=stars&order=desc&page=${page}`;

    fetch(url)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw new Error("Something went wrong");
      })
      .then((resJson) => {
        // Validate response with zod
        const schema = z.object({
          items: z.array(
            z.object({
              id: z.number(),
              name: z.string(),
              describe: z.string(),
              html_url: z.string(),
              stargazers_count: z.number(),
            })
          ),
        });
        schema.safeParse(resJson); // could be more thorough here

        // Decorate data with favorite property
        const storedFavRepos = JSON.parse(
          localStorage.getItem("favRepo") || "[]"
        );
        const decoratedData = resJson.items.map((repo: IRepo) => ({
          ...repo,
          favorite: storedFavRepos.some(
            (matchObj: IRepo) => matchObj.id === repo.id
          ),
        }));

        // Update page with next page for infante scroll
        setPage((prevState) => prevState + 1);
        setData((prevState) => [...prevState, ...decoratedData]);
      })

      .catch((err) => {
        setError(err);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  };

  // Update favorite property in state and local storage
  const updateFav = (id: number) => {
    // Update favorite property in state
    setData((prevState) =>
      prevState.map((repo: IRepo) =>
        repo.id === id ? { ...repo, favorite: !repo.favorite } : repo
      )
    );

    const storedFavRepos = JSON.parse(localStorage.getItem("favRepo") || "[]");
    const isFavRepo = storedFavRepos.some((obj: IRepo) => obj.id === id);

    if (isFavRepo) {
      // Remove repo entry from local storage
      const updatedFavArray = storedFavRepos.filter(
        (obj: IRepo) => obj.id !== id
      );
      localStorage.setItem("favRepo", JSON.stringify(updatedFavArray));
    } else {
      // Add repo entry to local storage
      const repoToAdd = data.find((obj: IRepo) => obj.id === id);
      const updatedFavArray = [
        ...storedFavRepos,
        { ...repoToAdd, favorite: true },
      ];
      localStorage.setItem("favRepo", JSON.stringify(updatedFavArray));
    }
  };

  return { data, error, loading, fetchRepos, updateFav };
};
