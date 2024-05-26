import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailVerificationService {

  private apiUrl = 'http://localhost:3000/'; // Your backend endpoint

  constructor(private http: HttpClient) { }

  verifyEmail(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}verify-email`, { email });
  }

  verifyListOfEmails(formData: any){
    return this.http.post<any>(`${this.apiUrl}verify-list-of-email`, formData);
  }
}
