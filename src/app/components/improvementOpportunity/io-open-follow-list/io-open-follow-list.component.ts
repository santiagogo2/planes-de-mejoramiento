import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ImprovementOpportunityService } from '../../../services/improvementOpportunity.service';
import { PlansService } from '../../../services/plans.service';
import { ActionsService } from '../../../services/actions.service';

@Component({
	selector: 'app-io-open-follow-list',
	templateUrl: './io-open-follow-list.component.html',
	styleUrls: ['./io-open-follow-list.component.css'],
	providers: [
		UserService,
		ImprovementOpportunityService,
		PlansService,
		ActionsService
	]
})
export class IoOpenFollowListComponent implements OnInit {
	public page_title1: string;
	public page_title2: string;
	public token: string;
	public identity: any[];
	public idOpportunity: number;
	public status: string;
	public statusIndicator: boolean;
	public errorCode1: number;
	public errorCode2: number;
	public errorMessage1: string;
	public errorMessage2: string;
	public opportunities: any;
	public plan: any;
	public idPlan: number;
	public actions: any;
	public actualPage: number;
	public itemsPerPage: number;
	public opportunityStatus: number;
	public wideCompliance1: number;
	public estado: string;

	constructor(
		private _userService: UserService,
		private _router: Router,
		private _route: ActivatedRoute,
		private _iOpportunityService: ImprovementOpportunityService,
		private _plansService: PlansService,
		private _actionsService: ActionsService
	) {
		this.page_title1 = 'Datos Plan de Mejoramiento';
		this.page_title2 = 'Oportunidades de Mejora Inscritas';
		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
		this.actualPage = 1;
		this.itemsPerPage = 20;
		this.wideCompliance1 = 100;
	}

	ngOnInit() {
		this.opportunityList();
	}

	opportunityList(){
		this._route.params.subscribe(
			params => {
				this.idPlan = +params['id'];
				this.estado = params['estado'];
				this._plansService.getPlan(this.idPlan, this.token).subscribe(
					response => {
						if(response.status = 'success'){
							this.plan = response.plan;
							if(this.estado == 'abiertos') this.getIOpportunityByPlan(1);
							if(this.estado == 'cerrados') this.getIOpportunityByPlan(2);
						} else{
							this.status = 'error';
							this.errorCode2 = response.code;
							this.errorMessage2 = response.message;
						}
					},
					error => {
						console.log(<any>error);
						this.status = 'error';
						this.errorCode2 = error.error.code;
						this.errorMessage2 = error.error.message;
						if(error.status && error.status == 500) this.errorCode2 = 500;
					}
				);				
			}
		);
	}

	getIOpportunityByPlan(status){
		this._iOpportunityService.getIOpportunityByPlan(this.idPlan, status, this.token).subscribe( // El estado de los abiertos es 1
			response => {
				if(response.status = 'success'){
					this.status = 'success';
					this.opportunities = response.improvementOpportunities;
				} else{
					this.status = 'error';
					this.errorCode1 = response.code;
					this.errorMessage1 = response.message;
				}
			},
			error => {
				console.log(<any>error);
				this.status = 'error';
				this.errorCode1 = error.error.code;
				this.errorMessage1 = error.error.message;
				if(error.status && error.status == 500) this.errorCode1 = 500;
			}
		);
	}

	calculateIndicator(id){
		this._actionsService.getActionByIdOpportunity(id, this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.actions = response.actions;
				}
			},
			error => {
				console.log(<any>error);
				this.statusIndicator = true;			
			}
		);
	}

	deleteOpportunity(id){
		this._iOpportunityService.deleteOpportunity(id, this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.opportunityList();
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
				if(error.status && error.status == 500) this.errorCode1 = 500;
			}
		);
	}

	chageToCloseStatus(id){
		this._iOpportunityService.updateStatus(id, 2, this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.opportunityList();
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
				if(error.status && error.status == 500) this.errorCode1 = 500;
			}
		);
	}

	chageToOpenStatus(id){
		this._iOpportunityService.updateStatus(id, 1, this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.opportunityList();
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
				if(error.status && error.status == 500) this.errorCode1 = 500;
			}
		);
	}

	pageChange(event){
		this.actualPage = event;
	}
}
