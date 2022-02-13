import { Injectable } from '@nestjs/common';
import { BlogPostDto } from './dto/blogpost.dto';
import { BlogPost } from './entities/blogpost'

@Injectable()
export class BlogPostsService {

    private _posts: BlogPost[];
    private _nextId = 1;

    findAll(): BlogPost[] {
        return this._posts;
    }

    findOne(id: number): BlogPost {
        return this._posts.find((post) => post.id === id);
    }

    create(postDto: BlogPostDto): BlogPost {
        const post = new BlogPost();
        post.id = this._nextId;
        this._nextId += 1;
        post.title = postDto.title;

        this._posts.push(post);

        return post;
    }

}
