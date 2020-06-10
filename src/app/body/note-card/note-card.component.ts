import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NoteInterface } from 'src/app/core/interfaces/intefaces';
import { NoteService } from 'src/app/core/services/note.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';



@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css']
})
export class NoteCardComponent implements OnInit {

  @Input() noteCards: NoteInterface[] = [];
  @Output() edit = new EventEmitter<any>();

  constructor(private noteService: NoteService) { }

  ngOnInit() {
  }

  deleteNote(id: string) {
    this.noteService.deleteNote(id).subscribe(res => {
      console.log(this.noteCards);
      const index = this.noteCards.findIndex(object => {
        return object._id === id;
    });
      this.noteCards.splice(index, 1);
    });
  }

  editNote(id: string, color, content, image, title) {
    this.edit.emit({id: id, color: color, imagePath: image, content: content, title: title});
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log("NoteCardComponent -> drop -> event", event)
    moveItemInArray(this.noteCards, event.previousIndex, event.currentIndex);
  }

}
