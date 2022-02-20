import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import { Category } from '../categories/entities/category';
import { BlogPostDto } from './dto/blogpost.dto';
import { CommentDto } from './dto/comment.dto';
import { BlogPost } from './entities/blogpost'
import { Comment } from './entities/comment'

@Injectable()
export class BlogPostsService {

    constructor(
        @InjectRepository(BlogPost)
        private blogPostRepository: EntityRepository<BlogPost>,
        @InjectRepository(Category)
        private categoryRepository: EntityRepository<Category>,
    ) {}

    findAll(blogPostDto?: BlogPostDto): Promise<BlogPost[]> {
        return this.blogPostRepository.find(
            { title: { $like: `%${blogPostDto.title || ''}%` } },
            { populate: ['categories'] }
        );
    }

    findOne(id: number): Promise<BlogPost> {
        return this.blogPostRepository.findOne(
            { id },
            { populate: ['categories', 'comments'] }
        );
    }

    async create(postDto: BlogPostDto): Promise<BlogPost> {
        const post = new BlogPost();
        post.title = postDto.title;
        post.text = postDto.text;

        post.categories.set(
            postDto.categories?.map((category) =>
              this.categoryRepository.getReference(category.id),
            ) || [],
          );

        await this.blogPostRepository.persistAndFlush(post);
        await post.categories.init();

        return post;
    }

    async update(id: number, postDto: BlogPostDto) {
        const post = await this.blogPostRepository.findOne({ id });
        post.title = postDto.title || post.title;
        post.text = postDto.text || post.text;
        
        if (postDto.categories) {
          post.categories.set(
            postDto.categories.map((label) =>
              this.categoryRepository.getReference(label.id),
            ),
          );
        }
    
        await this.blogPostRepository.persistAndFlush(post);
        await post.categories.init();
    
        return post;
      }
    
      async addComment(id: number, commentDto: CommentDto) {
        const post = await this.findOne(id);
        if (!post) return;
    
        const comment = new Comment();
        comment.text = commentDto.text;
        comment.blogPost = post;
    
        post.comments.add(comment);
    
        await this.blogPostRepository.flush();
    
        return comment;
      }
}
