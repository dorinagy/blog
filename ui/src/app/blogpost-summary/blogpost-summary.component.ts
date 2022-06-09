import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BlogPost } from '../core/blogpost';
import { UserService } from '../core/user.service';

@Component({
  selector: 'app-blogpost-summary',
  templateUrl: './blogpost-summary.component.html',
  styleUrls: ['./blogpost-summary.component.scss'],
})
export class BlogPostSummaryComponent implements OnInit {
  @Input() blogpost!: BlogPost;
  @Input() showButtons: boolean = false;

  @Output() editBlogPost: EventEmitter<void> = new EventEmitter();

  constructor(public userService: UserService) {}

  ngOnInit(): void {}

  edit() {
    this.editBlogPost.emit();
  }
}
