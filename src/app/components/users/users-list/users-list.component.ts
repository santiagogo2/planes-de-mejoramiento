import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
	selector: 'app-users-list',
	templateUrl: './users-list.component.html',
	styleUrls: ['./users-list.component.css'],
	providers: [UserService]
})
export class UsersListComponent implements OnInit {
	public page_title: string;
	public token: string;
	public identity: any;
	public status: string;
	public errorCode: number;
	public errorMessage: string;
	public users: any;

	constructor(
		private _userService: UserService
	) {
		this.page_title = 'Lista de Usuarios del Aplicativo';
		this.token = this._userService.getToken();
	}

	ngOnInit() {
		this.list();
	}

	list(){
		this._userService.list(this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.users = response.users;
				} else{
					this.status = 'error';
					this.errorCode = response.code;
					this.errorMessage = response.message;
				}
			},
			error => {
				this.status = 'error';
				this.errorCode = error.error.code;
				this.errorMessage = error.error.message;
				console.log(<any>error);
			}
		);
	}

	deleteUser(id){
		this._userService.deleteUser(id, this.token).subscribe(
			response => {
				this.list();
			},
			error => {
				this.status = 'error';
				this.errorCode = error.error.code;
				this.errorMessage = error.error.message;
				if(error.status && error.status == 500) this.errorCode = 500;
				console.log(<any>error);
			}
		);
	}

}
