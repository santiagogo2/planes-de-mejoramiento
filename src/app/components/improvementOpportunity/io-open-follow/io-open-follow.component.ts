import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { PlansService } from '../../../services/plans.service';
import { ImprovementOpportunityService } from '../../../services/improvementOpportunity.service';
import { global } from '../../../services/global';

@Component({
	selector: 'app-io-open-follow',
	templateUrl: './io-open-follow.component.html',
	styleUrls: ['./io-open-follow.component.css'],
	providers: [
		UserService,
		PlansService,
		ImprovementOpportunityService
	]
})
export class IoOpenFollowComponent implements OnInit {
	public page_title1: string;
	public page_title2: string;
	public token: string;
	public estado: string;
	public inputPlan: number;
	public inputWordPlan: string;
	public inputProcess: string;
	public searchBy: string;
	public plans: any;
	public status: string;
	public errorCode: number;
	public errorMessage: string;
	public opportunity: any;
	public planName: string;
	public managerChecklist: any;
	public opportunityStatus: string;
	public panelShow: number;
	public actualPage: number;
	public itemsPerPage: number;

	constructor(
		private _router: Router,
		private _route: ActivatedRoute,
		private _userService: UserService,
		private _plansService: PlansService,
		private _iOpportunityService: ImprovementOpportunityService
	) {
		this.page_title1 = "Seguimiento Planes de Mejora Abiertos";
		this.page_title2 = "Seguimiento Planes de Mejora Cerrados";
		this.token = this._userService.getToken();
		this.managerChecklist = global.checklist;
		this.panelShow = 0;
		this.actualPage = 1;
		this.itemsPerPage = 20;
	}

	ngOnInit() {
		this.planList();
	}

	onSubmit(form){
		if(this.searchBy == 'id'){
			this.panelShow = 1;
			this._iOpportunityService.getIOpportunity(this.inputPlan, this.token).subscribe(
				response => {
					if(response.status == 'success'){
						this.status = 'success';
						this.errorCode = undefined;
						this.opportunityStatus = undefined;
						this.opportunity = response.improvementOpportunity;
						if(this.opportunity.estado != '1' && this.estado == 'abiertos'){
							this.opportunityStatus = this.opportunity.estado;
						} else if (this.opportunity.estado == '1' && this.estado == 'cerrados'){
							this.opportunityStatus = this.opportunity.estado;
						}
						this.plans = undefined;
					} else{
						this.errorCode = response.code;
						this.errorMessage = response.message;
						this.status = 'error';
					}
				},
				error => {
					this.errorCode = error.error.code;
					this.errorMessage = error.error.message;
					this.status = 'error';
					if(error.status && error.status == 500) this.errorCode = 500;
					console.log(<any>error);
				}
			);
		}
		if(this.searchBy == 'word' && this.estado == 'abiertos'){
			this.getIOpportunityByWord(1);
		}
		if(this.searchBy == 'word' && this.estado == 'cerrados'){
			this.getIOpportunityByWord(2);
		}
		if(this.searchBy == 'process' && this.estado == 'abiertos'){
			this.getIOpportunityByProcess(1)
		}		
		if(this.searchBy == 'process' && this.estado == 'cerrados'){
			this.getIOpportunityByProcess(2)
		}
		if(this.searchBy == 'todos'){
			this.panelShow = 0;
			this.opportunityStatus = undefined;
			this.errorCode = undefined;
			this.opportunity = undefined;
			this.planList();
		}
	}

	getIOpportunityByWord(status){
		this.panelShow = 2;
		this._iOpportunityService.getIOpportunityByWord(this.inputWordPlan, this.token, status).subscribe( // 1: Oportunidades de Mejora Abiertas
			response => {
				if(response.status == 'success'){
					this.status = 'success';
					this.errorCode = undefined;
					this.opportunityStatus = undefined;
					this.plans = undefined;
					this.opportunity = response.improvementOpportunities;
					if(this.opportunity.length == 0){
						this.status = 'error';
						this.errorCode = 404;
						this.errorMessage = "No hay ninguna Oportunidad de Mejora que contenga la palabra: " + this.inputWordPlan;
					}
				} else{
					this.errorCode = response.code;
					this.errorMessage = response.message;
					this.status = 'error';
				}
			}, 
			error => {
				this.errorCode = error.error.code;
				this.errorMessage = error.error.message;
				this.status = 'error';
				if(error.status && error.status == 500) this.errorCode = 500;
				console.log(<any>error);
			}
		);
	}

	getIOpportunityByProcess(status){
		this.panelShow = 2;
		this._iOpportunityService.getIOpportunityByProcess(this.inputProcess, this.token, status).subscribe(
			response => {
				if(response.status == 'success'){
					this.status = 'success';
					this.errorCode = undefined;
					this.opportunityStatus = undefined;
					this.plans = undefined;
					this.opportunity = response.improvementOpportunities;
				} else{
					this.errorCode = response.code;
					this.errorMessage = response.message;
					this.status = 'error';
				}
			},
			error => {
				this.errorCode = error.error.code;
				this.errorMessage = error.error.message;
				this.status = 'error';
				if(error.status && error.status == 500) this.errorCode = 500;
				console.log(<any>error);
			}
		);
	}

	planList(){
		this._route.params.subscribe(
			params => {
				this.estado = params['estado'];
				if (this.estado == 'abiertos' || this.estado == 'cerrados'){
					
					this._plansService.list(this.token).subscribe(
						response => {
							if(response.status == 'success'){
								this.plans = response.plans;
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
				} else{
					this._router.navigate(['/inicio']);
				}
			}
		);		
	}

	pageChange(event){
		this.actualPage = event;
	}

}
