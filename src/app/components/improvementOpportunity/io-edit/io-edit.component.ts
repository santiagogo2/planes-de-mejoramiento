import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { PlansService } from '../../../services/plans.service';
import { ImprovementOpportunityService } from '../../../services/improvementOpportunity.service';
import { global } from '../../../services/global';

@Component({
	selector: 'app-io-edit',
	templateUrl: './io-edit.component.html',
	styleUrls: ['./io-edit.component.css'],
	providers: [
		UserService,
		PlansService,
		ImprovementOpportunityService
	]
})
export class IoEditComponent implements OnInit {
	public page_title: string;
	public token: string;
	public plans: any;
	public idPlanPreload: number;
	public improvementOpportunity: any;
	public status: string;
	public errorCode: number;
	public errorMessage: string;
	public successMessage: string;
	public accreditationTableList: any;
	public managerChecklist: any[];
	public findTypeList: any[];
	public riskTypeList: any[];

	constructor(
		private _userService: UserService,
		private _plansService: PlansService,
		private _IOService: ImprovementOpportunityService,
		private _router: Router,
		private _route: ActivatedRoute
	) {
		this.page_title = "Editar Oportunidad de Mejora";
		this.token = this._userService.getToken();
		this.accreditationTableList = global.accreditationTableList;
		this.managerChecklist = global.checklist;
		this.findTypeList = global.findTypeList;
		this.riskTypeList = global.riskTypeList;
	}

	ngOnInit() {
		this.plansList();
	}

	onSubmit(form){
		if(this.improvementOpportunity.plans){
			delete(this.improvementOpportunity.plans);
		}
		this._IOService.updateImprovementOpportunity(this.improvementOpportunity, this.token).subscribe(
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
				console.log(<any>error);
				this.status = 'error';
				this.errorCode = error.error.code;
				this.errorMessage = error.error.message;
				if(error.status && error.status == 500) this.errorCode = 500;
			}
		);
	}

	plansList(){
		this._plansService.list(this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.plans = response.plans;
					this.getOpportunity();
				} else{
					this.status = 'error';
					this.errorCode = response.code;
					this.errorMessage = response.message;
				}
			},
			error => {
				console.log(<any>error);
				this.status = 'error';
				this.errorCode = error.error.code;
				this.errorMessage = error.error.message;
			}
		);
	}

	getOpportunity(){
		this._route.params.subscribe(
			params => {
				// Obtener el id de la url
				let id = +params['id'];
				// Llamar el servicio de interes
				this._IOService.getIOpportunity(id, this.token).subscribe(
					response => {
						if(response.status == 'success'){
							this.improvementOpportunity = response.improvementOpportunity;
							this.idPlanPreload = this.improvementOpportunity.plans.id;
						} else{
							this.status = 'error';
							this.errorCode = response.code;
							this.errorMessage = response.message;
						}
					}, 
					error => {
						console.log(<any>error);
						this.status = 'error';
						this.errorCode = error.error.code;
						this.errorMessage = error.error.message;
					}
				);
			}
		);
	}
}
