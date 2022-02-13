import { Controller, Get, Post, Param, HttpException, HttpStatus } from '@nestjs/common';
import { BlogPostsService } from './blogposts.service';
import { BlogPostDto } from './dto/blogpost.dto'
import { BlogPost } from './entities/blogpost'

@Controller('blogposts')
export class BlogPostsController {

    constructor(private _postsService: BlogPostsService) {}

    @Get()
    findAll(): BlogPostDto[] {
        return this._postsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): BlogPostDto {
        const post = this._postsService.findOne(id);

        if (!post) throw new HttpException('Post not found.', HttpStatus.NOT_FOUND);

        return this.createPostDto(post);
    }

    @Post()
    create(postDto: BlogPostDto): BlogPostDto {
        const newPost = this._postsService.create(postDto);

        return this.createPostDto(newPost);
    }

    private createPostDto(post: BlogPost): BlogPostDto {
        const postDto = new BlogPostDto();
        postDto.title = post.title;
        postDto.id = post.id;

        return postDto;
    }

}
