import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActionsService } from '../../../services/actions.service';
import { ImprovementOpportunityService } from '../../../services/improvementOpportunity.service';

@Component({
	selector: 'app-action-search',
	templateUrl: './action-search.component.html',
	styleUrls: ['./action-search.component.css'],
	providers: [
		UserService,
		ActionsService,
		ImprovementOpportunityService
	]
})
export class ActionSearchComponent implements OnInit {
	public page_title1: string;
	public page_title2: string;
	public token: string;
	public searchBy: string;
	public inputPlan: any;
	public status: string;
	public successMessage: string;
	public errorCode: number;
	public errorMessage: string;
	public opportunity: any;
	public searchType: number;
	public actualPage: number;
	public itemsPerPage: number;

	constructor(
		private _userService: UserService,
		private _actionsService: ActionsService,
		private _IOService: ImprovementOpportunityService
	) {
		this.page_title1 = 'Agregar Acción de Mejora';
		this.page_title2 = 'Listado Oportunidades de Mejora';
		this.token = this._userService.getToken();
		this.actualPage = 1;
		this.itemsPerPage = 20;
	}

	ngOnInit() {
	}

	onSubmit(){
		if(this.searchBy == 'id'){
			this.searchType = undefined;
			this._IOService.getIOpportunity(this.inputPlan, this.token).subscribe(
				response => {
					if(response.status == 'success'){
						this.opportunity = response.improvementOpportunity;
						this.searchType = 1;
						this.errorCode = undefined;
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

		if(this.searchBy == 'word'){
			this.searchType = undefined;
			this._IOService.getIOpportunityByWord(this.inputPlan, this.token, -1).subscribe( // El -1 retorna del backend todas las entradas de la base de datos
				response => {
					if(response.status == 'success'){
						this.opportunity = response.improvementOpportunities;
						this.searchType = 2;
						this.errorCode = undefined;
						if(this.opportunity.length == 0){
							this.status = 'error';
							this.errorCode = 404;
							this.errorMessage = "No hay ninguna Oportunidad de Mejora que contenga la palabra: " + this.inputPlan;
						}
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
	}
	pageChange(event){
		this.actualPage = event;
	}
}
