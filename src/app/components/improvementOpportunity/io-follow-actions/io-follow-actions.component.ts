import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { PlansService } from '../../../services/plans.service';
import { ActionsService } from '../../../services/actions.service';
import { ImprovementOpportunityService } from '../../../services/improvementOpportunity.service';

@Component({
	selector: 'app-io-follow-actions',
	templateUrl: './io-follow-actions.component.html',
	styleUrls: ['./io-follow-actions.component.css'],
	providers: [
		UserService,
		ActionsService, 
		ImprovementOpportunityService
	]
})
export class IoFollowActionsComponent implements OnInit {
	public page_title1: string;
	public page_title2: string;
	public page_title3: string;	
	public page_title4: string;
	public token: string;
	public identity: any;
	public idOpportunity : number;
	public idPlan: number;
	public plan: any;
	public opportunity: any;
	public actions: any;
	public status: string;
	public status2: string;
	public errorCode: number;
	public errorMessage: string;
	public errorCode1: number;
	public errorMessage1: string;
	public errorCode2: number;
	public errorMessage2: string;
	public successMessage1: string;
	public indicatorFirstLine: number;
	public actualPage: number;
	public itemsPerPage: number;
	public idHomologate: number;
	public oppHomologate: string;

	constructor(
		private _userService: UserService,
		private _actionsService: ActionsService,
		private _IOService: ImprovementOpportunityService,
		private _router: Router,
		private _route: ActivatedRoute
	) {
		this.page_title1 = "Datos Oportunidad de Mejoramiento ";
		this.page_title2 = "Indicadores de Seguimiento";
		this.page_title3 = "Homologar Oportunidad de Mejoramiento";
		this.page_title4 = "Acciones de Mejora Inscritas";
		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
		this.actualPage = 1;
		this.itemsPerPage = 20;
	}

	ngOnInit() {
		this.getPlan();
	}

	getPlan(){
		this.errorCode = undefined;
		this.errorCode2 = undefined;
		this._route.params.subscribe(
			params => {
				this.idOpportunity = +params['id'];
				this._IOService.getIOpportunity(this.idOpportunity, this.token).subscribe(
					response => {
						if(response.status == 'success'){
							this.opportunity = response.improvementOpportunity;
							if(this.opportunity.id_homologado){
								this.idHomologate = this.opportunity.id_homologado;
								this.searchOpportunity();
							}
							this.plan = this.opportunity.plans;
							this.getActions();
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

	searchOpportunity(){
		this.errorCode1 = undefined;
		this._IOService.getIOpportunity(this.idHomologate, this.token).subscribe(
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
				if(error.status && error.status == 500) this.errorCode1 = 500;
				console.log(<any>error);
			}
		);
	}

	homologateOpportunity(){
		this.opportunity.id_homologado = +this.idHomologate;
		this._IOService.updateHomologateOpportunity(this.opportunity, this.token).subscribe(
			response => {
				if(response.status == 'success'){
					if(this.actions){
						for(let i=0; i<this.actions.length; i++){
							this.actions[i].estado = 'HOMOLOGADA';
							this.actions[i].estado_seg_linea = 'HOMOLOGADA';
							this.actions[i].estado_ter_linea = 'HOMOLOGADA';
							this._actionsService.updateAllLines(this.actions[i], this.actions[i].id, this.token).subscribe(
								response => {
									if(response.status == 'success'){									
										if(this.successMessage1){ 
											this.successMessage1 = this.successMessage1 + ' ' + response.message;
										} else{
											this.successMessage1 = response.message;
										}
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
									console.log(<any>error);
								}
							);
							this.updateLinesIndicator();
						}
						} else{															
							this.status = 'success';
							this.successMessage1 = 'No existen Acciones de Mejora inscritas para homologar. Se ha homologado la Oportunidad de Mejora correctamente.';
						}								
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
				console.log(<any>error);
			}
		);
	}

	getActions(){
		this.status2 = null;
		this.errorCode2 = null;
		this.errorMessage2 = null;	
		this._actionsService.getActionByIdOpportunity(this.idOpportunity, this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.actions = response.actions;
					this.updateLinesIndicator();
				} else{
					this.status2 = 'error';
					this.errorCode2 = response.code;
					this.errorMessage2 = response.message;					
				}
			},
			error => {
				this.status2 = 'error';
				this.errorCode2 = error.error.code;
				this.errorMessage2 = error.error.message;
				if(error.status && error.status == 500) this.errorCode2 = 500;
				console.log(<any>error);
			}
		);
	}

	updateLinesIndicator(){
		let line1 = 0;
		let line2 = 0;
		let line3 = 0;
		this.actions.forEach(function(element){
			if(element.estado && element.estado != 'PENDIENTE') line1 = line1+1; 
			if(element.estado_seg_linea && element.estado_seg_linea != 'PENDIENTE') line2 = line2+1;
			if(element.estado_ter_linea && element.estado_ter_linea != 'PENDIENTE') line3 = line3+1;
		});
		this.opportunity.cum_pri_linea = Math.round(this.calculatePercentage(line1)).toString();
		this.opportunity.cum_seg_linea = Math.round(this.calculatePercentage(line2)).toString();		
		this.opportunity.cum_ter_linea = Math.round(this.calculatePercentage(line3)).toString();
		if(this.opportunity.plans) delete(this.opportunity.plans);
		this._IOService.updateLines(this.opportunity, this.token).subscribe(
			response => {
			},
			error => {
				console.log(<any>error);
			}
		);
	}

	calculatePercentage(info){
		let result = 0;
		result = info/this.actions.length*100;
		return result;
	}

	pageChange(event){
		this.actualPage = event;
	}
}
