import { Post } from "./post-type";

export type Author = {
  id: String;
  authorName: String;
  authorProfilePicture: String;
  posts: Array<Post>;
};
