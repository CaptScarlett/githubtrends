import InfiniteScroll from "react-infinite-scroll-component";
import { IRepo } from "../../types/Repo";
import { StyledList } from "./styles";

import Card from "../Card";

const CardList = ({
  filteredData,
  loading,
  error,
  fetchRepos,
  updateFav,
}: any): JSX.Element => {
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Sorry something went wrong</h1>;

  return (
    <StyledList>
      <InfiniteScroll
        style={{ width: "100%" }}
        dataLength={filteredData.length}
        next={fetchRepos}
        hasMore={true}
        loader={<h4>LOADING...</h4>}
      >
        {filteredData.map((p: IRepo) => (
          <Card
            key={p.id}
            id={p.id}
            name={p.name}
            description={p.description}
            html_url={p.html_url}
            stargazers_count={p.stargazers_count}
            favorite={p.favorite}
            toggleFav={updateFav}
            language={p.language}
          />
        ))}
      </InfiniteScroll>
    </StyledList>
  );
};

export default CardList;
