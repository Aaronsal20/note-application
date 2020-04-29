import { Component, OnInit, Input } from '@angular/core';
import { NoteInterface } from 'src/app/core/interfaces/intefaces';
import { NoteService } from 'src/app/core/services/note.service';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css']
})
export class NoteCardComponent implements OnInit {

  @Input() noteCards: NoteInterface[] = [];

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

}
