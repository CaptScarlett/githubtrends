import { Button } from "@chakra-ui/react";

import {
  StyledCard,
  StyledItem,
  StyledDescription,
  StyledInfo,
  StyledLink,
  StyledRaiting,
} from "./styles";
import { ItemProps } from "./types";

const Card = ({
  id,
  html_url,
  name,
  description,
  stargazers_count,
  favorite,
  toggleFav,
}: ItemProps): JSX.Element => {
  return (
    <StyledItem>
      <StyledCard data-testid="card">
        <div>
          <StyledLink to={html_url}>{name}</StyledLink>
          <StyledDescription>{description}</StyledDescription>
          <StyledRaiting>
            <span>★ </span>
            {stargazers_count}
            {favorite}
          </StyledRaiting>
        </div>
        <StyledInfo>
          <Button
            size="md"
            colorScheme="grey"
            variant={favorite ? "solid" : "outline"}
            onClick={() => toggleFav(id)}
          >
            {favorite ? "♥ unfavorite" : "♡ favorite"}
          </Button>
        </StyledInfo>
      </StyledCard>
    </StyledItem>
  );
};

export default Card;
