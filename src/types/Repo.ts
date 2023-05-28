export interface IRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  favorite: boolean;
  language: string;
}
