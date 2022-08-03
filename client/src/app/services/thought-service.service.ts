import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Thought } from '../Thought';
import { User } from '../User';
import { Comment } from '../Comment';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root'
})
export class ThoughtServiceService {

  private apiUrl = 'http://localhost:3001/api/thought';

  constructor(private http: HttpClient) {}

  getThoughts(): Observable<Thought[]> {
    return this.http.get<Thought[]>(this.apiUrl);
  }
  getSingleThought(id: string): Observable<Thought> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Thought>(url);
  }
  removeThought(id: string): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<User>(url);
  }
  addComment(comment: Comment,thoughtId:string): Observable<Thought> {
    const url = `${this.apiUrl}/${thoughtId}/comment`;
    return this.http.post<Thought>(url, comment, httpOptions);
  }
  removeComment(thoughtId: string,commentId:string): Observable<Thought> {
    const url = `${this.apiUrl}/${thoughtId}/comment/${commentId}`;
    return this.http.delete<Thought>(url);
  }
  addThought(thought: Thought): Observable<User> {
    return this.http.post<User>(this.apiUrl, thought, httpOptions);
  }
}
