import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ImprovementOpportunityService } from '../../../services/improvementOpportunity.service';

@Component({
	selector: 'app-io-update-effectiveness-indicator',
	templateUrl: './io-update-effectiveness-indicator.component.html',
	styleUrls: ['./io-update-effectiveness-indicator.component.css'],
	providers: [
		UserService,
		ImprovementOpportunityService
	]
})
export class IoUpdateEffectivenessIndicatorComponent implements OnInit {
	public page_title: string;
	public token: string;
	public identity: string;
	public idOpportunity: number;
	public status: string;
	public errorCode: number;
	public errorMessage: string;
	public successMessage: string;
	public opportunity: any;
	public goal: number;

	constructor(
		private _router: Router,
		private _route: ActivatedRoute,
		private _userService: UserService,
		private _IOService: ImprovementOpportunityService
	) {
		this.page_title = "Actualizar Indicador de Efectividad Oportunidad de Mejora: ";
		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
	}

	ngOnInit() {
		this.getOpportunity();
	}

	onSubmit(){
		this.goal = this.opportunity.numerador/this.opportunity.denominador*100;
		this.opportunity.cum_indicador = this.goal;
		this._IOService.updateEffectivenessIndicator(this.opportunity, this.token).subscribe(
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
				this.status = 'error';
				this.errorCode = error.error.code;
				this.errorMessage = error.error.errorMessage;
				if(error.status && error.status == 500) this.errorCode = 500;
			}
		);
	}

	getOpportunity(){
		this._route.params.subscribe(
			params => {
				this.idOpportunity = +params['id'];
				this._IOService.getIOpportunity(this.idOpportunity, this.token).subscribe(
					response => {
						if(response.status == 'success'){
							this.opportunity = response.improvementOpportunity;
							delete(this.opportunity.plans);
							if(!this.goal) this.goal = 0;
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

}
