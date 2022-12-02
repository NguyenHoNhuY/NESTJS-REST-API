import { Injectable } from '@nestjs/common';
import { Post } from './interfaces/post.interface';

@Injectable()
export class PostService {
  private lastPostId = 0;
  private posts: Post[] = [];

  getAllPosts = (): Post[] => {
    return this.posts;
  };
}
