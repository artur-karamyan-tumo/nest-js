import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Post } from './post.model';

@Injectable()
export class PostService {
  private posts: Post[] = [];

  constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}

  async insertPost(title: string) {
    const post = new this.postModel({ title });
    const result = await post.save();

    return result.id as string;
  }

  async getPosts() {
    const posts = await this.postModel.find().exec();
    return posts as Post[];
  }

  async getPost(id: string) {
    const post = await this.findPost(id);
    return post;
  }

  async updatePost(id: string, title: string) {
    const updatedPost = await this.findPost(id);
    if (title) {
      updatedPost.title = title;
    }
    await updatedPost.save();
  }

  async deletePost(id: string) {
    const result = await this.postModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find post.');
    }
  }

  private async findPost(id: string): Promise<Post> {
    const post = await this.postModel.findById(id);
    if (!post) {
      throw new NotFoundException('Could not find post.');
    }
    return post;
  }
}
