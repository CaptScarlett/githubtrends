import { IRepo } from "../../types/Repo";

export interface ItemProps extends IRepo {
  toggleFav: (id: number) => void;
}
