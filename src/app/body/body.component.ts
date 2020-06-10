import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NoteService } from '../core/services/note.service';
import { NoteInterface } from '../core/interfaces/intefaces';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  constructor(public noteService: NoteService, private router: Router) { }
  color: string;
  imagePreview: any;
  form: FormGroup;
  editMode = false;
  allNotes: any = [];
  editId: string;
  totalNotes;
  notesPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  ngOnInit() {
    this.form = new FormGroup({
      'title': new FormControl(null),
      'content': new FormControl(null),
      image: new FormControl(null)
    });
    this.getAllNoteCards();
  }

  onAddNote() {
    const formData = new FormData();
    formData.append('image', this.form.get('image').value);
    formData.append('title', this.form.get('title').value);
    formData.append('content', this.form.get('content').value);
    formData.append('color', this.color);

    if(this.editMode) {
      this.noteService.updateNote(this.editId, this.form.value.title, this.form.value.content, this.form.value.image, this.color).subscribe(res => {
        console.log(res);
        // this.allNotes.push(res.result);
        // this.router.navigate(['/'])
      });
    } else {
      this.noteService.addNote(formData).subscribe(res => {
        console.log(res.result);
        this.allNotes.push(res.result);
        // this.router.navigate(['/'])
      })
    }
    
  }

  onChangePage(pageData: PageEvent) {
    console.log("BodyComponent -> onChangePage -> pageData", pageData)
    this.currentPage = pageData.pageIndex + 1;
    this.notesPerPage = pageData.pageSize;
    this.noteService.getAllNotes(this.notesPerPage, this.currentPage).subscribe((response) => {
      console.log("BodyComponent -> getAllNoteCards -> res", response);
        this.allNotes = response.notes;
        console.log("BodyComponent -> getAllNoteCards -> this.notes", this.allNotes);
        
      })
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  editNote(data) {
    console.log(data); 
    this.editMode = true;
    this.form.patchValue({
      title: data.title,
      content: data.content,
      image: data.imagePath
    });
    this.imagePreview = data.imagePath;
    this.color = data.color;
    this.editId = data.id;
  }

  // updateNote(id: string) {
  //   const formData = new FormData();
  //   formData.append('image', this.form.get('image').value);
  //   formData.append('title', this.form.get('title').value);
  //   formData.append('content', this.form.get('content').value);
  //   formData.append('color', this.color);
  
  // }

  getAllNoteCards() {
    this.noteService.getAllNotes(this.notesPerPage, this.currentPage).subscribe((response) => {
      this.allNotes = response.notes;
      this.totalNotes = response.totalNotes;
    })
  }

  reset() {
    this.form.reset();
    this.imagePreview = '';
    this.color = '';
    this.editMode = false;
  }

}
