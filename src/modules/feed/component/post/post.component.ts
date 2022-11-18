import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { DateTime } from 'luxon';
import { UserQueries } from 'src/modules/user/services/user.queries';
import { Post } from '../../post.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.less']
})
export class PostComponent implements OnInit, AfterViewInit {
  @Input()
  post: Post;

  public profilePicture: string | undefined;
  public postDate: string;

  @ViewChild("anchor")
  anchor: ElementRef<HTMLDivElement>;

  constructor(
    private postService: PostService,
    private userQueries: UserQueries
  ) { }

  async ngOnInit(): Promise<void> {
    const userPicture = (await this.userQueries.search(this.post.createdBy.username))[0].photoUrl;
    if( userPicture== undefined) 
    {
      this.profilePicture = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/434px-Unknown_person.jpg";
    } 
    else 
    {
      this.profilePicture = userPicture;
    }
    
    this.postDate = DateTime.fromMillis(parseInt(this.post.createdAt)).toLocal().toRelative() as string;
  }

  ngAfterViewInit() {
    this.anchor.nativeElement.scrollIntoView();
  }

  async like() {
    // TODO like du post
  }
}
