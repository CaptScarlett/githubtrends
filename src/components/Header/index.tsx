import { Link } from "react-router-dom";
import { Header } from "./styles";
import { MainHeaderProps } from "./types";

const MainHeader = ({ header }: MainHeaderProps): JSX.Element => {
  return (
    <Header>
      <Link to={`/`} style={{ textDecoration: "none" }}>
        {header}
      </Link>
    </Header>
  );
};

export default MainHeader;
