export interface IBlogPost {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}

export interface IBlogs {
  posts: IBlogPost[];
  total: number;
  skip: number;
  limit: number;
}
