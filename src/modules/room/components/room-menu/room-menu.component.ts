import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FeedStore } from 'src/modules/feed/feed.store';
import { Room } from '../../room.model';
import { RoomStore } from '../../room.store';
import { RoomQueries } from '../../services/room.queries';
import { RoomService } from '../../services/room.service';
import { RoomSocketService } from '../../services/room.socket.service';
import { RoomCreateModalComponent } from '../room-create-modal/room-create-modal.component';
@Component({
  selector: 'app-room-menu',
  templateUrl: './room-menu.component.html',
  styleUrls: ['./room-menu.component.less']
})
export class RoomMenuComponent implements OnInit {
  roomId$: Observable<string | undefined>;
  rooms: Room[];
  
  @ViewChild("modal")
  roomCreateModalComponent: RoomCreateModalComponent;

  constructor(
    private feedStore: FeedStore,
    private queries: RoomQueries, 
    private roomSocketService: RoomSocketService,
    private router: Router)
  {
    this.roomId$ = feedStore.roomId$;
    this.rooms = [];
  }

  async ngOnInit() {
    await this.retrieveRooms();

    this.roomSocketService.onNewRoom( ( room ) => {
      this.retrieveRooms();
    });
  }

  goToRoom(room: Room) {
    this.router.navigate([`/app/${room.id}`]);
  }

  openCreateRoom(){
    this.roomCreateModalComponent.open();
  }

  async retrieveRooms() {
    this.rooms = await this.queries.getAll();
  }
}
