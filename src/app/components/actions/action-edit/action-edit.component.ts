import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ActionsService } from '../../../services/actions.service';
import { global } from '../../../services/global';

@Component({
	selector: 'app-action-edit',
	templateUrl: './action-edit.component.html',
	styleUrls: ['./action-edit.component.css'],
	providers: [
		UserService,
		ActionsService
	]
})
export class ActionEditComponent implements OnInit {
	public page_title: string;
	public token: string;
	public action: any;
	public idAction: number;
	public opportunityName: string;
	public actionTypeList: any[];
	public responsableList: any[];
	public status: string;
	public errorCode: number;
	public errorMessage: string;
	public errorCode2: number;
	public successMessage: string;

	constructor(
		private _userService: UserService,
		private _actionsService: ActionsService,
		private _router: Router,
		private _route: ActivatedRoute
	) {
		this.page_title = "Actualizar Acción de Mejora: ";
		this.token = this._userService.getToken();
		this.actionTypeList = global.actionTypeList;
		this.responsableList = global.checklist;
	}

	ngOnInit() {
		this.getAction();
	}

	onSubmit(form){
		this.status = null;
		this.errorCode2 = null;
		this.errorMessage = null;
		if(this.action.improvement_opportunities){
			delete(this.action.improvement_opportunities);
		}
		this._actionsService.updateAction(this.action, this.idAction, this.token).subscribe(
			response => {
				this.status = 'success';
				this.successMessage = response.message;
			},
			error => {
				console.log(<any>error);
				this.status = 'error';
				this.errorCode2 = error.error.code;
				this.errorMessage = error.error.message;
				if(error.status && error.status == 500) this.errorCode2 = 500;
			}
		);
	}

	getAction(){
		this.status = null;
		this.errorCode = null;
		this.errorMessage = null;
		this._route.params.subscribe(
			params => {
				this.idAction = +params['id'];
				this._actionsService.getAction(this.idAction, this.token).subscribe(
					response => {
						if(response.status == 'success'){
							this.action = response.action;
							this.opportunityName = this.action.improvement_opportunities.oportunidad_mejora;
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
}
