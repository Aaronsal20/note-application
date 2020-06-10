import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const BACKEND_URL =  environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class NoteService {

    constructor(private http: HttpClient) {}

    addNote(form: FormData) {
        console.log("NoteService -> addNote -> payload", form)
        return this.http.post<{message: string, result: any}>('add', form);
    }

    getAllNotes(postsPerPage: number, currentPage: number) {
        console.log("NoteService -> getAllNotes -> postsPerPage", postsPerPage)
        const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
        return this.http.get<{totalNotes: number, notes: any, message: any}>('notes' + queryParams);
    }

    deleteNote(id: string) {
        console.log("NoteService -> deleteNote -> id", id);
        return this.http.delete(`remove/${id}`);
    }

    updateNote(id: string, title: string, content: string, image: File | string, color: string) {
        console.log("NoteService -> updateNote -> id", id)
        let postData;
        if (typeof(image) === 'object') {
            console.log("NoteService -> updateNote -> image", image)
            const postData = new FormData();
            postData.append("id", id);
            postData.append("title", title);
            postData.append("content", content);
            postData.append("image", image, title);
            postData.append("color", color);
          }else {
            postData = {
             id: id,
             title: title,
             content: content,
             imagePath: image,
             creator: null,
             color: color,
           }
         }
      
        return this.http.put(`update/${id}`, postData);
    }
}