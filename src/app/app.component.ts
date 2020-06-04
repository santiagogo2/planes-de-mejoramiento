import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [UserService]
})
export class AppComponent {
	public title: string;
	public token: string;
	public identity: any;

	constructor(
		private _userService: UserService,
		private _router: Router,
		private _route: ActivatedRoute
	){
		this.title = 'planes-mejoramiento';
		this.loadUser();
	}

	ngOnInit(){}

	ngDoCheck(){
		this.loadUser();
	}

	loadUser(){
		let actualDate = new Date().getTime();
		let expiresDate = +localStorage.getItem('expiration');
		if( expiresDate && actualDate >= expiresDate ){
			console.log('in');
			localStorage.removeItem('token');
			localStorage.removeItem('identity');
			localStorage.removeItem('expiration');

			this.token = null;
			this.identity = null;

			this._router.navigate(['login']);
		} else{
			this.token = this._userService.getToken();
			this.identity = this._userService.getIdentity();
		}
	}
}
