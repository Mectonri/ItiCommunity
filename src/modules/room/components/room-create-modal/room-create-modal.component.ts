import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RoomType } from '../../room.model';
import { RoomService } from '../../services/room.service';

import { UserQueries } from 'src/modules/user/services/user.queries';
import { Room } from '../../room.model';
/**
 * import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserQueries } from 'src/modules/user/services/user.queries';
import { Room } from '../../room.model';
import { RoomService } from '../../services/room.service';
 */

export class CreateRoomFormModel {
  name: string = "";
  type: RoomType = RoomType.Text;
}

@Component({
  selector: 'app-room-create-modal',
  templateUrl: './room-create-modal.component.html',
  styleUrls: ['./room-create-modal.component.less']
})
export class RoomCreateModalComponent implements OnInit {
  @ViewChild("f")
  form: NgForm;

  isVisible: boolean = false;
  model = new CreateRoomFormModel();

  constructor(private _roomService: RoomService) {
      
  }

  ngOnInit(): void {
  }

  async onOk() {
    if (this.form.form.valid) {
      // TODO invoquer la méthode create du RoomService
      this._roomService.create(this.form.form.get('roomName')!.value, this.form.form.get('type')!.value).then( (room) => {
        if( room ) {
          this._roomService.setShouldFetchRooms( true );
          this.close();
        }
      });
    }
  }



  onCancel() {
    this.close();
  }

  open() {
    this.isVisible = true;
    setTimeout(() => this.form.resetForm(new CreateRoomFormModel()))
  }

  close() {
    this.isVisible = false;
  }
}
