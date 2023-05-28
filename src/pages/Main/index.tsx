import { useEffect, useState } from "react";
import { Switch, Select } from "@chakra-ui/react";

import { StyledContainer, StyledSwitch } from "./styles";
import { IRepo } from "../../types/Repo";

import { useFetchRepos } from "../../hooks/useFetchRepos";

import CardList from "../../components/CardList";
import MainHeader from "../../components/Header";
import NotFound from "../../components/NotFound";

const MainPage = () => {
  const [isFavView, setIsFavView] = useState(false);
  const [filteredLanguage, setFilteredLanguage] = useState<string>("");
  const { data, loading, error, fetchRepos, updateFav } = useFetchRepos();

  useEffect(() => {
    fetchRepos();
  }, []);

  const favRepos = JSON.parse(localStorage.getItem("favRepo") || "[]");
  const renderData = isFavView ? favRepos : data;

  const filteredData =
    filteredLanguage === ""
      ? renderData
      : renderData.filter((repo: IRepo) => repo.language === filteredLanguage);

  const languages: string[] = data
    .map((obj) => obj.language)
    .filter(
      (value, index, self) =>
        value !== undefined &&
        value !== null &&
        value !== "" &&
        self.indexOf(value) === index
    );

  const filters = (
    <StyledContainer>
      <StyledSwitch>
        Favorites
        <Switch
          onChange={() => setIsFavView((prevState) => !prevState)} // toggle isFavView
          isChecked={isFavView}
        />
      </StyledSwitch>

      <Select
        width={"30%"}
        placeholder="Language"
        value={filteredLanguage}
        onChange={(event) => setFilteredLanguage(event.target.value)} // set filteredLanguage
      >
        {Array.from(languages).map((language) => (
          <option value={language} key={language}>
            {language}
          </option>
        ))}
      </Select>
    </StyledContainer>
  );

  return (
    <>
      <MainHeader header="Github Repos" />
      {filters}
      {filteredData.length !== 0 && (
        <CardList
          loading={loading && data.length === 0}
          error={error}
          fetchRepos={fetchRepos}
          updateFav={updateFav}
          filteredData={filteredData}
        />
      )}
      {filteredData.length === 0 && isFavView && <NotFound />}
    </>
  );
};

export default MainPage;
