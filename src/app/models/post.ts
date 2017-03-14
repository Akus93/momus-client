import {UserService} from "../services/user/user.service";


class Post {
  author: UserService;
  title: string;
  slug: string;
  image: string;
  rate: number;
  tags: string[];
  isPending: boolean;
}

export class PostResponse {
  count: number;
  next: string;
  previous: string;
  results: Post[];
}
