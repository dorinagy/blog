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

@Component({
  selector: 'app-blogpost-editor',
  templateUrl: './blogpost-editor.component.html',
  styleUrls: ['./blogpost-editor.component.scss'],
})
export class BlogPostEditorComponent implements OnInit {
  blogpostForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    place: ['', Validators.required],
    description: ['', Validators.required],
  });

  get title(): FormControl {
    return this.blogpostForm.get('title') as FormControl;
  }

  get place(): FormControl {
    return this.blogpostForm.get('place') as FormControl;
  }

  get description(): FormControl {
    return this.blogpostForm.get('description') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<BlogPostEditorComponent>,
    @Inject(MAT_DIALOG_DATA) private blogpost: BlogPost
  ) {
    if (this.blogpost) {
      this.blogpostForm.reset(this.blogpost);
    }
  }

  ngOnInit(): void {}

  submit() {
    if (!this.blogpostForm.valid) {
      return;
    }

    this.dialogRef.close(this.blogpostForm.value as BlogPost);
  }
}
