import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import { BlogPostDto } from './dto/blogpost.dto';
import { BlogPost } from './entities/blogpost'

@Injectable()
export class BlogPostsService {

    constructor(
        @InjectRepository(BlogPost)
        private blogPostRepository: EntityRepository<BlogPost>
    ) {}

    findAll(blogPostDto?: BlogPostDto): Promise<BlogPost[]> {
        return this.blogPostRepository.find(blogPostDto);
    }

    findOne(id: number): Promise<BlogPost> {
        return this.blogPostRepository.findOne({ id });
    }

    async create(postDto: BlogPostDto): Promise<BlogPost> {
        const post = new BlogPost();
        post.title = postDto.title;

        await this.blogPostRepository.persistAndFlush(post);

        return post;
    }

}
