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
  @Get(':id?')
  get(@Param('id') id: string): any {
    if (id) {
      return this.postService.getPost(id);
    }
    return this.postService.getPosts();
  }
  @Post()
  create(@Body('title') title: string): any {
    const id = this.postService.insertPost(title);
    return { id };
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body('title') title: string): void {
    this.postService.updatePost(id, title);
    return null;
  }
  @Delete(':id')
  delete(@Param('id') id: string): any {
    this.postService.deletePost(id);
    return null;
  }
}
