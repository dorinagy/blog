import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/sqlite';
import { Injectable } from '@nestjs/common';
import { Category } from '../categories/entities/category';
import { BlogPostDto } from './dto/blogpost.dto';
import { CommentDto } from './dto/comment.dto';
import { BlogPost } from './entities/blogpost';
import { Comment } from './entities/comment';
import { UserDto } from '../users/dto/user.dto';
import { User } from '../users/entities/user';

@Injectable()
export class BlogPostsService {

    constructor(
        @InjectRepository(BlogPost)
        private blogPostRepository: EntityRepository<BlogPost>,
        @InjectRepository(Category)
        private categoryRepository: EntityRepository<Category>,
        @InjectRepository(User)
        private userRepository: EntityRepository<User>,
    ) {}

    findAll(blogPostDto?: BlogPostDto): Promise<BlogPost[]> {
      return this.blogPostRepository.find(
          { title: { $like: `%${blogPostDto.title || ''}%` } },
          { populate: ['categories', 'user'] }
      );
    }

    findOne(id: number): Promise<BlogPost> {
      return this.blogPostRepository.findOne(
          { id },
          { populate: ['categories', 'comments', 'user', 'comments.user'] }
      );
    }

    async create(postDto: BlogPostDto, userDto: UserDto): Promise<BlogPost> {
      const post = new BlogPost();
      post.title = postDto.title;
      post.text = postDto.text;

      post.user = this.userRepository.getReference(userDto.id);

      post.categories.set(
          postDto.categories?.map((category) =>
            this.categoryRepository.getReference(category.id),
          ) || [],
        );

      await this.blogPostRepository.persistAndFlush(post);
      await this.blogPostRepository.populate(post, ['categories', 'user']);

      return post;
    }

    async update(id: number, postDto: BlogPostDto) {
      const post = await this.blogPostRepository.findOne({ id });
      post.title = postDto.title || post.title;
      post.text = postDto.text || post.text;
      
      if (postDto.categories) {
        post.categories.set(
          postDto.categories.map(c =>
            this.categoryRepository.getReference(c.id),
          ),
        );
      }
  
      await this.blogPostRepository.persistAndFlush(post);
      await this.blogPostRepository.populate(post, ['categories', 'user']);
  
      return post;
    }
    
    async remove(id: number) {
      const post = await this.blogPostRepository.findOne({ id });

      this.blogPostRepository.remove(post);
    }

    async removeComment(id: number, commentDto: CommentDto) {
      const post = await this.findOne(id);

      //post.comments.map(c => c.id === commentDto.id)
    }

    async addComment(id: number, commentDto: CommentDto, userDto: UserDto) {
      const post = await this.findOne(id);
      if (!post) return;
  
      const comment = new Comment();
      comment.text = commentDto.text;
      comment.blogPost = post;

      comment.user = this.userRepository.getReference(userDto.id);

      post.comments.add(comment);
  
      await this.blogPostRepository.flush();
  
      return comment;
    }
}
