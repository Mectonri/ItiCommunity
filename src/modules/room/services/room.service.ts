import { Injectable } from '@angular/core';
import { Room, RoomType } from '../room.model';
import { RoomStore } from '../room.store';
import { RoomCommands } from './room.commands';
import { RoomQueries } from './room.queries';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class RoomService {
    private shouldFetchRooms: BehaviorSubject<boolean>;

    constructor(private commands: RoomCommands, private queries: RoomQueries, private store: RoomStore) {
        this.shouldFetchRooms = new BehaviorSubject<boolean>(false);
    }

    async create(name: string, type: RoomType): Promise<Room> {
        const room = await this.commands.create(name, type);
        this.store.mutate( s => {
            return {
                ...s,
                rooms: [...s.rooms, room]
            }
        })
        return room;
    }

    async fetch(): Promise<void> {
        const rooms = await this.queries.getAll();
        this.store.mutate(s => {
            return {
                ...s,
                rooms
            }
        });
    }

        setShouldFetchRooms( bool: boolean ) {
        this.shouldFetchRooms.next( bool );
    }
}