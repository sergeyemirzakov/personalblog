export interface Post {
  date: string;
  id: string;
  title: string;
  img?: string;
  tags?: string;
  shortDescription: string;
}

export interface PostsData {
  posts: Post[];
}
