import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';

@Component({
	selector: 'app-password-edit',
	templateUrl: './password-edit.component.html',
	styleUrls: ['./password-edit.component.css'],
	providers: [UserService]
})
export class PasswordEditComponent implements OnInit {
	public page_title: string;
	public token: string;
	public user: User;
	public status: string;
	public errorCode: number;
	public errorMessage: string;
	public successMessage: string;
	public passwordConfirmation: string;

	constructor(
		private _userService: UserService,
		private _router: Router,
		private _route: ActivatedRoute
	) {
		this.page_title = 'Cambiar Contraseña de Usuario';
		this.token = this._userService.getToken();
		this.user = new User(1,'','','','','');
		this.passwordConfirmation = '';
	}

	ngOnInit() {
		// Obtener el alias del usuario al que se le va cambiar la contraseña.
		this.getUser();
	}

	onSubmit(form){
		this._userService.updatePassword(this.user.id, this.token, this.user).subscribe(
			response => {
				if(response.status == 'success'){
					this.status = 'success';
					this.successMessage = response.message;
					form.reset();
					this.getUser();
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

	getUser(){
		this._route.params.subscribe(
			params => {
				//Obtener el id que vien el ruta.
				let id = +params['id'];
				
				//Obtener los datos del usuario
				this._userService.getUser(id, this.token).subscribe(
					response => {
						this.user = response.user;
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
