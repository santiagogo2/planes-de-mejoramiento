import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { PlansService } from '../../../services/plans.service';
import { ImprovementOpportunityService } from '../../../services/improvementOpportunity.service';
import { global } from '../../../services/global';
import { ImprovementOpportunity } from '../../../models/improvementOpportunity';

@Component({
	selector: 'app-io-register',
	templateUrl: './io-register.component.html',
	styleUrls: ['./io-register.component.css'],
	providers: [
		UserService,
		PlansService,
		ImprovementOpportunityService
	]
})
export class IoRegisterComponent implements OnInit {
	public page_title: string;
	public accreditationTableList: any[];
	public managerChecklist: any[];
	public findTypeList: any[];
	public riskTypeList: any[];
	public token: string;
	public identity: any;
	public plans: any;
	public improvementOpportunity: ImprovementOpportunity;
	public errorCode: number;
	public errorCode1: number;
	public errorMessage: string;
	public errorMessage1: string;
	public status: string;
	public successMessage: string;
	public valueBotton: string;
	public oppHomologate: any[];
	public clickEvent: boolean;

	constructor(
		private _plansService: PlansService,
		private _userService: UserService,
		private _improvementOpportunityService: ImprovementOpportunityService,
		private _router: Router
	) {
		this.page_title = "Agregar Oportunidad de Mejora";
		this.accreditationTableList = global.accreditationTableList;
		this.managerChecklist = global.checklist;
		this.findTypeList = global.findTypeList;
		this.riskTypeList = global.riskTypeList;
		this.token = this._userService.getToken();
		this.improvementOpportunity = new ImprovementOpportunity(1,1,'','','','','',null,'','','','',null,null,'','',0,0,0,0,0,0,1);
		this.identity = this._userService.getIdentity();
		this.valueBotton = 'Crear Oportunidad de Mejora';
		this.clickEvent = false;
	}

	ngOnInit() {
		this.plansList();
		if(this.identity.role){
			this.valueBotton = 'Siguiente';
		}
	}

	plansList(){
		this._plansService.list(this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.plans = response.plans;
					console.log(this.plans);
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
				if(error.status && error.status == 500) this.errorCode = 500;
			}
		);
	}

	onSubmit(form){
		if(this.improvementOpportunity.id_homologado) this.improvementOpportunity.estado = 0;
		this._improvementOpportunityService.newImprovementOpportunity(this.improvementOpportunity, this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.status = 'success';
					this.successMessage = response.message;
					form.reset();
					if(this.identity.role){
						this._router.navigate(['/registrar/accion-mejora', response.improvementOpportunity.id]);
					}
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
				if(error.status && error.status == 500) this.errorCode = 500;
			}
		);
	}

	searchOpportunity(){
		this.status = undefined;
		this.errorCode1 = undefined;
		this._improvementOpportunityService.getIOpportunity(this.improvementOpportunity.id_homologado, this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.oppHomologate = response.improvementOpportunity;
				} else{
					this.status = 'error';
					this.errorCode1 = response.code;
					this.errorMessage1 = response.message;
				}
			},
			error => {
				this.status = 'error';
				this.errorCode1 = error.error.code;
				this.errorMessage1 = error.error.message;
				console.log(<any>error);
			}
		);
	}

	changeStatus(){
		this.clickEvent = !this.clickEvent;
		console.log(this.clickEvent);
	}
}
