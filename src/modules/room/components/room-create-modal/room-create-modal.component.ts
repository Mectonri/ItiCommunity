import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { RoomType } from '../../room.model';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-room-create-modal',
  templateUrl: './room-create-modal.component.html',
  styleUrls: ['./room-create-modal.component.less']
})
export class RoomCreateModalComponent implements OnInit {

  createRoomForm: FormGroup;

  isVisible: boolean = false;

  constructor(
    private roomService: RoomService,
    private formBuilder: FormBuilder
    ) { }


  ngOnInit(): void {
    this.createRoomForm = this.formBuilder.group({
      type: ['', [Validators.required]],
      name: ['', [Validators.required]]
    });
  }

  async onOk() {
    if (this.createRoomForm.valid) {
      this.roomService.create(this.createRoomForm.get("name")!.value, this.createRoomForm.get("type")!.value);
      this.close();
    }
  }

  onCancel() {
    this.close();
  }

  open() {
    this.isVisible = true;
    this.createRoomForm.reset({ type: 'text', name: '' });
  }


  close() {
    this.isVisible = false;
  }
}
