import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BlogPost } from '../core/blogpost';
import { BlogPostService } from '../core/blogpost.service';
import { BlogPostEditorComponent } from '../blogpost-editor/blogpost-editor.component';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.scss'],
})
export class BlogPostListComponent implements OnInit {
  blogposts?: BlogPost[];

  constructor(private blogpostService: BlogPostService, private dialog: MatDialog) {}

  async ngOnInit(): Promise<void> {
    this.blogposts = await this.blogpostService.getBlogPosts();
  }

  async onEditBlogPost(blogpost: BlogPost) {
    const dialogRef = this.dialog.open(BlogPostEditorComponent, {
      width: '500px',
      data: blogpost,
    });

    const result: BlogPost = await dialogRef.afterClosed().toPromise();
    const editedBlogPost = await this.blogpostService.editBlogPost(blogpost.id!, result);

    this.blogposts?.splice(this.blogposts.indexOf(blogpost), 1, editedBlogPost);
  }

  async onCreateBlogPost() {
    const dialogRef = this.dialog.open(BlogPostEditorComponent, {
      width: '500px',
    });

    const result: BlogPost = await dialogRef.afterClosed().toPromise();
    const createdBlogPost = await this.blogpostService.createBlogPost(result);

    this.blogposts!.push(createdBlogPost);
  }
}
