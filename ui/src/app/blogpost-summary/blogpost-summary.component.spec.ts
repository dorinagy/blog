import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { race, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserRole } from '../core/user';
import { UserService } from '../core/user.service';

import { BlogPostSummaryComponent } from './blogpost-summary.component';

describe('BlogPostSummaryComponent', () => {
  let component: BlogPostSummaryComponent;
  let fixture: ComponentFixture<BlogPostSummaryComponent>;

beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [BlogPostSummaryComponent],
      providers: [{ provide: UserService, useValue: { isAdmin: true } }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostSummaryComponent);
    component = fixture.componentInstance;

    component.blogpost = {
      title: 'teszt',
      text: 'asdasdasd',
      user: {
        userName: 'Tibi',
        role: UserRole.Admin,
      },
    };
    component.showButtons = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit editBlogPost when clicking on edit blogpost', (done) => {
    race(
      component.editBlogPost.pipe(map(() => true)),
      timer(500).pipe(map(() => false)),
    ).subscribe((result) => {
      expect(result).toBe(true);
      done();
    });

    const editBlogPostButton = fixture.debugElement.query(By.css('#edit-blogpost'));
    editBlogPostButton.triggerEventHandler('click', null);
  });
});
