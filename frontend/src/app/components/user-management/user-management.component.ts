import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-user-management',
    templateUrl: './user-management.component.html',
    styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
    users: any[] = [];
    userForm: any = { username: '', role: '' };
    isEditMode: boolean = false;
    editingUserId: string | null = null;

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.loadUsers();
    }

    // Cargar usuarios desde el backend
    loadUsers(): void {
        this.userService.getUsers().subscribe(
            (data) => {
                this.users = data;
            },
            (error) => {
                console.error('Error al cargar usuarios:', error);
            }
        );
    }

    // Registrar un nuevo usuario
    registerUser(): void {
        this.userService.registerUser(this.userForm).subscribe(
            (response) => {
                console.log('Usuario registrado:', response);
                this.loadUsers(); // Recargar la lista de usuarios
                this.userForm = { username: '', role: '' }; // Limpiar el formulario
            },
            (error) => {
                console.error('Error al registrar usuario:', error);
            }
        );
    }

    // Actualizar un usuario existente
    updateUser(): void {
        if (this.editingUserId) {
            this.userService.updateUser(this.editingUserId, this.userForm).subscribe(
                (response) => {
                    console.log('Usuario actualizado:', response);
                    this.loadUsers(); // Recargar la lista de usuarios
                    this.cancelEdit(); // Salir del modo edición
                },
                (error) => {
                    console.error('Error al actualizar usuario:', error);
                }
            );
        }
    }

    // Cancelar la edición
    cancelEdit(): void {
        this.isEditMode = false;
        this.editingUserId = null;
        this.userForm = { username: '', role: '' };
    }
}