import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ActionsService } from '../../../services/actions.service';
import { UserService } from '../../../services/user.service';
import { ImprovementOpportunityService } from '../../../services/improvementOpportunity.service';
import { Actions } from '../../../models/actions';
import { global } from '../../../services/global';

@Component({
	selector: 'app-action-register',
	templateUrl: './action-register.component.html',
	styleUrls: ['./action-register.component.css'],
	providers: [
		ActionsService,
		UserService,
		ImprovementOpportunityService
	]
})
export class ActionRegisterComponent implements OnInit {
	public page_title1: string;
	public page_title2: string;
	public token: string;
	public identity: any;
	public action: Actions;
	public actionsPreload: any;
	public idOpportunity: number;
	public actionTypeList: any[];
	public responsableList: any[];
	public improvementOpportunity: any;
	public status: string;
	public errorCode: number;
	public errorMessage: string;
	public errorCode2: number;
	public errorMessage2: string;
	public successMessage: string;
	public deleteStatus: string;
	public actualPage: number;
	public itemsPerPage: number;

	constructor(
		private _actionsService: ActionsService,
		private _userService: UserService,
		private _IOService: ImprovementOpportunityService,
		private _router: Router,
		private _route: ActivatedRoute
	) {
		this.page_title1 = "Agregar Acción de la Oportunidad de Mejora:";
		this.page_title2 = "Acciones de Mejora Inscritas";
		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
		this.action = new Actions(1,1,'','','','','','','','','','','','',null,'',null,'',null,'',null,'',null);
		this.actionTypeList = global.actionTypeList;
		this.responsableList = global.checklist;
		this.actualPage = 1;
		this.itemsPerPage = 20;
	}

	ngOnInit() {
		this.getInitialInfo();
	}

	onSubmit(form){
		this.status = null;
		this.errorCode = null;
		this.errorMessage = null;
		this.action.id_oportunidad = this.idOpportunity;
		console.log(this.action);
		this._actionsService.newAction(this.action, this.token).subscribe(
			response => {
				if(response.status == 'success'){
					form.reset();
					this.status = 'success';
					this.successMessage = response.message;
					this.errorCode = undefined;
					this.errorCode2 = undefined;
					this.getInitialInfo();
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

	deleteAction(id){
		this._actionsService.deleteAction(id, this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.deleteStatus = 'success';
					this.successMessage = response.message;
					this.errorCode = undefined;
					this.errorCode2 = undefined;
					this.getInitialInfo();
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

	getInitialInfo(){
		this._route.params.subscribe(
			params => {
				this.idOpportunity = +params['idOpportunity'];
				this._IOService.getIOpportunity(this.idOpportunity, this.token).subscribe(
					response => {
						if(response.status = 'success'){
							this.improvementOpportunity = response.improvementOpportunity;
							this._actionsService.getActionByIdOpportunity(this.idOpportunity, this.token).subscribe(
								response => {
									if(response.status == 'success'){
										this.actionsPreload = response.actions;
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
		);
	}

	pageChange(event){
		this.actualPage = event;
	}
}
