import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { DateTime } from 'luxon';
import { UserQueries } from 'src/modules/user/services/user.queries';
import { Post } from '../../post.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class PostComponent implements OnInit, AfterViewInit {
  @Input()
  post: Post;

  public postDate: string;

  @ViewChild("anchor")
  anchor: ElementRef<HTMLDivElement>;

  constructor(
    private postService: PostService
  ) { }

  async ngOnInit(): Promise<void> {

    if( this.post.createdBy.photoUrl == undefined) 
    {
      this.post.createdBy.photoUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/434px-Unknown_person.jpg";
    } 
    
    this.postDate = DateTime.fromMillis(parseInt(this.post.createdAt)).toLocal().toRelative() as string;
  }

  ngAfterViewInit() {
    this.anchor.nativeElement.scrollIntoView();
  }

  async like() {
    this.postService.like( this.post );
    this.post.liked = !this.post.liked;
  }
}
