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
    Patch,
    Delete
} from '@nestjs/common';
import { AllowAnonymous } from '../auth/allow-anonymous';
import { Roles } from '../auth/roles';
import { UserParam } from '../auth/user-param.decorator';
import { UserDto } from '../users/dto/user.dto';
import { UserRole } from '../users/entities/user';
import { BlogPostsService } from './blogposts.service';
import { BlogPostDto } from './dto/blogpost.dto'
import { CommentDto } from './dto/comment.dto';

@Controller('blogposts')
export class BlogPostsController {

    constructor(private _postsService: BlogPostsService) {}

    @AllowAnonymous()
    @Get()
    async findAll(
        @Query() blogPostDto: BlogPostDto
    ): Promise<BlogPostDto[]> {
        const posts = await this._postsService.findAll(blogPostDto);
        return posts.map((post) => new BlogPostDto(post));
    }

    @AllowAnonymous()
    @Get(':id')
    async findOne(
        @Param('id', ParseIntPipe) id: number
    ): Promise<BlogPostDto> {
        const post = await this._postsService.findOne(id);

        if (!post) throw new HttpException('Post not found.', HttpStatus.NOT_FOUND);

        return new BlogPostDto(post);
    }

    @Post()
    @Roles(UserRole.Admin)
    async create(
        @Body() postDto: BlogPostDto,
        @UserParam() userDto: UserDto,
    ): Promise<BlogPostDto> {
        const newPost = await this._postsService.create(postDto, userDto);
        return new BlogPostDto(newPost);
    }

    @Delete(':id')
    @Roles(UserRole.Admin)
    async remove(
        @Param('id', ParseIntPipe) id: number,
    ) {
        await this._postsService.remove(id);
    }

    @Patch(':id')
    @Roles(UserRole.Admin)
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() postDto: BlogPostDto,
    ): Promise<BlogPostDto> {
        const newPost = await this._postsService.update(id, postDto);
        return new BlogPostDto(newPost);
    }

    @Post(':id/comments')
    @Roles(UserRole.User, UserRole.Admin)
    async addComment(
        @Param('id', ParseIntPipe) id: number,
        @Body() commentDto: CommentDto,
        @UserParam() userDto: UserDto,
    ): Promise<BlogPostDto> {
        const comment = await this._postsService.addComment(id, commentDto, userDto);
        
        if (!comment) throw new HttpException('BlogPost not found', HttpStatus.NOT_FOUND);

        return new CommentDto(comment);
    }
    
}
