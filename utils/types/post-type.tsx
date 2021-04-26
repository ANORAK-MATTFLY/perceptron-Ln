export type Post = {
  id: String;
  authorId: String;
  title: String;
  content: String;
  thumbnail: String;
  viewCount: Number;
  tags: Array<String>;
  releaseDate: String;
};
