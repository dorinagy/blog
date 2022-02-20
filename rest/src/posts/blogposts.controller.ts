import { 
    Controller, 
    Body, 
    Get, 
    Post, 
    Param, 
    HttpException, 
    HttpStatus, 
    ParseIntPipe, 
    Query, 
    Patch
} from '@nestjs/common';
import { BlogPostsService } from './blogposts.service';
import { BlogPostDto } from './dto/blogpost.dto'
import { CommentDto } from './dto/comment.dto';

@Controller('blogposts')
export class BlogPostsController {

    constructor(private _postsService: BlogPostsService) {}

    @Get()
    async findAll(@Query() blogPostDto: BlogPostDto): Promise<BlogPostDto[]> {
        const posts = await this._postsService.findAll(blogPostDto);
        return posts.map((post) => new BlogPostDto(post));
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<BlogPostDto> {
        const post = await this._postsService.findOne(id);

        if (!post) throw new HttpException('Post not found.', HttpStatus.NOT_FOUND);

        return new BlogPostDto(post);
    }

    @Post()
    async create(@Body() postDto: BlogPostDto): Promise<BlogPostDto> {
        const newPost = await this._postsService.create(postDto);
        return new BlogPostDto(newPost);
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() postDto: BlogPostDto,
    ): Promise<BlogPostDto> {
        const newPost = await this._postsService.update(id, postDto);
        return new BlogPostDto(newPost);
    }

    @Post(':id/comments')
    async addComment(
        @Param('id', ParseIntPipe) id: number,
        @Body() commentDto: CommentDto,
    ): Promise<BlogPostDto> {
        const comment = await this._postsService.addComment(id, commentDto);
        
        if (!comment) throw new HttpException('BlogPost not found', HttpStatus.NOT_FOUND);

        return new CommentDto(comment);
    }
    
}
