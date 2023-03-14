import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { PostService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostService) {}
  @Get()
  async getAll(@Param('id') id: string) {
    const posts = await this.postService.getPosts();
    return posts;
  }
  @Post()
  async create(@Body('title') title: string) {
    const id = await this.postService.insertPost(title);
    return { id };
  }
  @Get(':id')
  async getSingle(@Param('id') id: string) {
    const post = await this.postService.getPost(id);
    return post;
  }
  @Patch(':id')
  async update(@Param('id') id: string, @Body('title') title: string) {
    await this.postService.updatePost(id, title);
    return null;
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.postService.deletePost(id);
    return null;
  }
}
