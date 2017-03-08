import {UserService} from "../services/user/user.service";


export class Post {
  author: UserService;
  title: string;
  slug: string;
  image: string;
  rate: number;
  tags: string[];
  isPending: boolean;
}
