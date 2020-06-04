import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	providers: [UserService]
})
export class LoginComponent implements OnInit {
	public page_title: string;
	public user: User;
	public status: string;
	public token: string;
	public identity: any;
	public submitFlag: boolean;

	constructor(
		private _userService: UserService,
		private _router: Router,
		private _route: ActivatedRoute
	) {
		this.page_title = "Identificate";
		this.user = new User(1,'','','','','');
		this.submitFlag = false;
	}

	ngOnInit() {
		// Se ejecuta siempre que se inicia el componente pero unicamente cierra sesión cuando le llega el parametro por el url
		this.logout();
	}

	onSubmit(form){
		this.submitFlag = true;
		this.status = undefined;
		this._userService.signup(this.user).subscribe(
			response => {
				if(response.status != 'error'){
					this.status = 'success';
					this.token = response;
					//Datos del usuario
					this._userService.signup(this.user, true).subscribe(
						response  => {
							if(response != 'error'){
								this.submitFlag = false;
								this.identity = response;

								//Persistir los datos del usuario identificado
								localStorage.setItem('token', this.token);
								localStorage.setItem('identity', JSON.stringify(this.identity));
								let expirationTime = (24*60*60*1000) + new Date().getTime();
								localStorage.setItem('expiration', expirationTime.toString());

								//Redirigir al inicio
								this._router.navigate(['inicio']);
							} else{
								form.reset();
								this.submitFlag = false;
								this.status = 'error';
							}								
						},
						error => {
							form.reset();
							this.submitFlag = false;
							this.status = 'error';
							console.log(<any> error);
						}
					);						
				} else{
					form.reset();
					this.submitFlag = false;
					this.status = 'error';
				}
			},
			error => {
				form.reset();
				this.submitFlag = false;
				this.status = 'error';
				console.log(<any>error);
			}
		);
	}

	logout(){
		this._route.params.subscribe(params => {
			let logout = +params['sure'];

			if(logout == 1){
				localStorage.removeItem('token');
				localStorage.removeItem('identity');
				localStorage.removeItem('expiration');

				//Eliminar las variables token e identity
				this.token = null;
				this.identity = null;

				//Redirección al inicio
				this._router.navigate(['inicio']);
			}
		});
	}
}
