import { Controller, Body, Get, Post, Param, HttpException, HttpStatus, ParseIntPipe, Query } from '@nestjs/common';
import { BlogPostsService } from './blogposts.service';
import { BlogPostDto } from './dto/blogpost.dto'
import { BlogPost } from './entities/blogpost'

@Controller('blogposts')
export class BlogPostsController {

    constructor(private _postsService: BlogPostsService) {}

    @Get()
    findAll(@Query() blogPostDto: BlogPostDto): Promise<BlogPostDto[]> {
        return this._postsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<BlogPostDto> {
        const post = await this._postsService.findOne(id);

        if (!post) throw new HttpException('Post not found.', HttpStatus.NOT_FOUND);

        return this.createPostDto(post);
    }

    @Post()
    async create(@Body() postDto: BlogPostDto): Promise<BlogPostDto> {
        const newPost = await this._postsService.create(postDto);

        return this.createPostDto(newPost);
    }

    private createPostDto(post: BlogPost): BlogPostDto {
        const postDto = new BlogPostDto();
        postDto.title = post.title;
        postDto.id = post.id;

        return postDto;
    }

}
