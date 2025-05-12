import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api/users'; // Cambia esta URL si es necesario

  constructor(private http: HttpClient) {}

  // Obtener usuarios
  getUsers(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  // Registrar un nuevo usuario
  registerUser(userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(this.apiUrl, userData, { headers });
  }

  // Actualizar un usuario existente
  updateUser(userId: string, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}`, userData);
  }

  // Actualizar el rol de un usuario
  updateUserRole(userId: string, role: string): Observable<any> {
    const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Agrega el token al encabezado
    });

    return this.http.put(`${this.apiUrl}/${userId}/role`, { role }, { headers });
  }

  // Eliminar un usuario
  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:5000/api/users/${userId}`);
  }


}
