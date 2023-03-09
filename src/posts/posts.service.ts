import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './post.model';

@Injectable()
export class PostService {
  posts: Post[] = [];

  insertPost(title: string) {
    const id = Math.random().toString();
    const post = new Post(id, title);
    this.posts.push(post);

    return id;
  }

  getPosts() {
    return [...this.posts];
  }

  getPost(id: string) {
    const [post] = this.findPost(id);
    return { ...post };
  }

  updatePost(id: string, title: string) {
    const [post, index] = this.findPost(id);
    const updatedPost = { ...post };
    if (title) {
      updatedPost.title = title;
    }
    this.posts[index] = updatedPost;
  }

  deletePost(id: string) {
    const index = this.findPost(id)[1];
    this.posts.splice(index, 1);
  }

  private findPost(id: string): [Post, number] {
    const postIndex = this.posts.findIndex((el) => el.id === id);
    const post = this.posts[postIndex];
    if (!post) {
      throw new NotFoundException('Could not find post.');
    }

    return [post, postIndex];
  }
}
