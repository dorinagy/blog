import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlogPost } from '../core/blogpost';
import { Category } from '../core/category';
import { CategoryService } from '../core/category.service';


@Component({
  selector: 'app-blogpost-editor',
  templateUrl: './blogpost-editor.component.html',
  styleUrls: ['./blogpost-editor.component.scss'],
})
export class BlogPostEditorComponent implements OnInit {
  blogpostForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    text: ['', Validators.required],
    categories: ['', Validators.required]
  });

  category_options?: Category[];
  blogpost_categories?: Category[];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<BlogPostEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public blogpost: BlogPost,
    private categoriesService: CategoryService
  ) {
    if (this.blogpost) {
      this.blogpostForm.reset(this.blogpost);
    }
  }

  async ngOnInit(): Promise<void> {
    this.category_options = await this.categoriesService.getCategories();
    if (this.blogpost && this.blogpost.categories) {
      this.blogpost_categories = this.category_options.filter(o => this.blogpost?.categories?.map(c => c.id).includes(o.id));
    }
  }

  get title(): FormControl {
    return this.blogpostForm.get('title') as FormControl;
  }

  get categories(): FormControl {
    return this.blogpostForm.get('categories') as FormControl;
  }

  get text(): FormControl {
    return this.blogpostForm.get('text') as FormControl;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave() {
    if (!this.blogpostForm.valid) {
      return;
    }

    this.dialogRef.close(this.blogpostForm.value as BlogPost);
  }
}
