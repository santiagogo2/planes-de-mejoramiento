import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { global } from '../../../services/global';

@Component({
	selector: 'app-user-edit',
	templateUrl: './user-edit.component.html',
	styleUrls: ['./user-edit.component.css'],
	providers: [UserService]
})
export class UserEditComponent implements OnInit {
	public page_title: string;
	public token: string;
	public status: string;
	public errorCode: number;
	public errorMessage: string;
	public successMessage: string;
	public user: User;
	public permissionsList: any[];

	constructor(
		private _userService: UserService,
		private _router: Router,
		private _route: ActivatedRoute
	) {
		this.page_title = 'Editar Usuario';
		this.token = this._userService.getToken();
		this.user = new User(1,'','','','','');
		this.permissionsList = global.permissionsList;
	}

	ngOnInit() {
		// Se obtiene el usuario que se desea editar para ubicarlo en el formulario
		this.getUser();
	}

	onSubmit(form){
		this._userService.updateUser(this.user, this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.status = 'success';
					this.successMessage = response.message;
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
				if(error.status && error.status == 500) this.errorCode = 500;
				console.log(<any> error);
			}
		);
	}

	getUser(){
		this._route.params.subscribe(
			params => {
				// Obtener el id de la url
				let id = +params['id'];

				// Obtener los datos del usuario
				this._userService.getUser(id, this.token).subscribe(
					response => {
						if(response.status == 'success'){
							this.user = response.user;
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
						if(error.status && error.status == 500) this.errorCode = 500;
						console.log(<any>error);
					}
				);
			}
		);
	}

}
