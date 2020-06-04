import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlansService } from '../../../services/plans.service';
import { UserService } from '../../../services/user.service';

@Component({
	selector: 'app-plans-list',
	templateUrl: './plans-list.component.html',
	styleUrls: ['./plans-list.component.css'],
	providers: [
		PlansService,
		UserService
	]
})
export class PlansListComponent implements OnInit {
	public page_title: string;
	public token: string;
	public identity: any[];
	public status: string;
	public errorCode: number;
	public plans: any;
	public actualPage: number;
	public itemsPerPage: number;

	constructor(
		private _plansService: PlansService,
		private _userService: UserService
	) {
		this.page_title = 'Listado de Planes de Mejoramiento';
		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
		this.actualPage = 1;
		this.itemsPerPage = 10;
	}

	ngOnInit() {
		this.list();
	}

	list(){
		this._plansService.list(this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.plans = response.plans;
				} else{
					this.status = 'error';
					this.errorCode = response.code;
				}
			},
			error => {
				this.status = 'error';
				this.errorCode = error.error.code;
				console.log(<any>error);
			}
		);
	}

	deletePlan(id){
		this._plansService.deletePlan(id, this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.status = 'success';
					this.list();
				} else{
					this.status = 'error';
					this.errorCode = response.code;
				}
			},
			error => {
				this.status = 'error';
				this.errorCode = error.error.code;
				console.log(<any>error);
			}
		);
	}

	pageChange(event){
		this.actualPage = event;
	}
}
