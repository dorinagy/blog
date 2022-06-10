import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BlogPost } from '../core/blogpost';
import { BlogPostService } from '../core/blogpost.service';
import { UserService } from '../core/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blogpost-details',
  templateUrl: './blogpost-details.component.html',
  styleUrls: ['./blogpost-details.component.scss'],
})
export class BlogPostDetailsComponent implements OnInit {
  blogpost?: BlogPost;

  comment: FormControl = this.fb.control('', Validators.required);

  constructor(
    private blogpostService: BlogPostService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public userService: UserService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const blogpostId = this.route.snapshot.paramMap.get('id');
    if (blogpostId) {
      this.blogpost = await this.blogpostService.getBlogPost(parseInt(blogpostId));
    }
  }

  async addComment(): Promise<void> {
    if (this.comment.invalid) {
      return;
    }
    const createdComment = await this.blogpostService.addComment(
      this.blogpost!,
      this.comment.value
    );
    this.blogpost!.comments!.push(createdComment);
    this.comment.reset('');
  }

  async onDeleteBlogPost() {
    const blogpostId = this.route.snapshot.paramMap.get('id');
    if (blogpostId) {
      await this.blogpostService.removeBlogPost(parseInt(blogpostId));
      this.router.navigateByUrl('/');
    }
  }
}
