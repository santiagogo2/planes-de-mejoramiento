import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { global } from '../../../services/global';

@Component({
	selector: 'app-user-register',
	templateUrl: './user-register.component.html',
	styleUrls: ['./user-register.component.css'],
	providers: [UserService]
})
export class UserRegisterComponent implements OnInit {
	public page_title: string;
	public user: User;
	public token: string;
	public status: string;
	public errorCode: number;
	public errorMessage: string;
	public sucessMessage: string;
	public passwordConfirmation: string;
	public permissionsList: any[];

	constructor(
		private _userService: UserService
	) {
		this.page_title = 'Registrar un Nuevo Usuario';
		this.user = new User(1,'','','','','');
		this.token = this._userService.getToken();
		this.passwordConfirmation = '';
		this.permissionsList = global.permissionsList;
	}

	ngOnInit() {
	}

	onSubmit(form){
		this._userService.newUser(this.user, this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.status = 'success';
					this.sucessMessage = response.message;
					form.reset();
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
				if(error.error.errors.user_alias) this.errorMessage = this.errorMessage + ' El alias de usuario ya se encuentra registrado.'
				if(error.status && error.status == 500) this.errorCode = 500;
				console.log(<any>error);
			}
		);
	}
}
