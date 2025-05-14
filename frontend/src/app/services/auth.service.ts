// filepath: src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://renderproyecto-q494.onrender.com/api/users/login'; // URL del backend en Render

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password });
  }

  getUserRole(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica el token JWT
    return payload.role;
  }

  getUserName(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica el token JWT
    return payload.username; // Devuelve el nombre del usuario
  }

  getToken(): string | null {
    return localStorage.getItem('token'); // O sessionStorage si lo usas
  }
}