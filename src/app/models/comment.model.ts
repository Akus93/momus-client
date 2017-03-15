import {UserProfile} from "./user-profile.model";
import {Post} from "./post.model";


export class Comment {
  id: number;
  author: UserProfile;
  post: Post;
  parent: number;
  rate: number;
  text: string;
  create_date: Date;
}
