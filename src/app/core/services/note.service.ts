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
        return this.http.post<{message: string, result: any}>(BACKEND_URL + '/api/v1/add', form);
    }

    getAllNotes(postsPerPage: number, currentPage: number) {
        const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
        return this.http.get<{totalNotes: number, notes: any, message: any}>( BACKEND_URL + '/api/v1/notes' + queryParams);
    }

    deleteNote(id: string) {
        console.log("NoteService -> deleteNote -> id", id)
        return this.http.delete(BACKEND_URL + `/api/v1/remove/${id}`);
    }
}