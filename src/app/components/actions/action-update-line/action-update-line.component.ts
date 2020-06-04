import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { PlansService } from '../../../services/plans.service';
import { ImprovementOpportunityService } from '../../../services/improvementOpportunity.service';
import { ActionsService } from '../../../services/actions.service';
import { global } from '../../../services/global';

@Component({
	selector: 'app-action-update-line',
	templateUrl: './action-update-line.component.html',
	styleUrls: ['./action-update-line.component.css'],
	providers: [
		UserService,
		PlansService,
		ImprovementOpportunityService,
		ActionsService
	]
})
export class ActionUpdateLineComponent implements OnInit {
	public page_title: string;
	public token: string;
	public identity: any;
	public idAction: number;
	public line: number;
	public action: any;
	public opportunity: any;
	public status: string;
	public errorCode: number;
	public errorMessage: string;
	public successMessage: string;
	public fullfilmentTypeList: any;
	public soportName: string;
	public actualLine: string;
	public file0Status: boolean;
	public file1Status: boolean;
	public file2Status: boolean;
	public file3Status: boolean;
	public file4Status: boolean;
	public afuConfig = {
	    multiple: false,
	    maxSize: "70",
	    uploadAPI:  {
			url: global.url + 'actions/first-line/upload-file',
			headers: {
	    		"Authorization" : this._userService.getToken()
			}
	    },
	    theme: "attachPin",
	    hideProgressBar: false,
	    hideResetBtn: true,
	    hideSelectBtn: false,
	    attachPinText: 'Seleccionar Archivo'
	};
	public urlFile: string;

	constructor(
		private _router: Router,
		private _route: ActivatedRoute,
		private _userService: UserService,
		private _plansService: PlansService,
		private _IOService: ImprovementOpportunityService,
		private _actionsService: ActionsService
	){
		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
		this.fullfilmentTypeList = global.fullfilmentTypeList;
		this.urlFile = global.urlFile;
	}

	ngOnInit() {
		this.getAction();
	}

	onSubmit(form){
		this.status = null;
		if(this.action.improvement_opportunities){
			delete(this.action.improvement_opportunities);
		}
		if(this.line == 1){
			if(this.file0Status) this.deleteFile(0);
			if(this.file1Status) this.deleteFile(1);
			if(this.file2Status) this.deleteFile(2);
			if(this.file3Status) this.deleteFile(3);
			if(this.file4Status) this.deleteFile(4);
			this._actionsService.updateFirstLine(this.action, this.idAction, this.token).subscribe(
				response => {
					if(response.status == 'success'){
						this.status = 'success';
						this.successMessage = response.message
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
					if(error.statusText && error.statusText == 'Unknown Error') {
						this.errorCode = 503;
						this.errorMessage = 'Ha ocurrido un problema con el servidor. Porfavor pongase en contacto con el administrador o intentelo mas tarde.'
					}
					console.log(<any>error);
				}
			);
		}
		if(this.line == 2){
			this._actionsService.updateSecondLine(this.action, this.idAction, this.token).subscribe(
				response => {
					if(response.status == 'success'){
						this.status = 'success';
						this.successMessage = response.message;
					} else{
						this.status = 'error';
						this.errorCode = response.code;
						this.errorMessage = response.message
					}
				},
				error => {
					this.status = 'error';
					this.errorCode = error.error.code;
					this.errorMessage = error.error.message;
					if(error.status && error.status == 500) this.errorCode = 500;
					if(error.statusText && error.statusText == 'Unknown Error') {
						this.errorCode = 503;
						this.errorMessage = 'Ha ocurrido un problema con el servidor. Porfavor pongase en contacto con el administrador o intentelo mas tarde.'
					}
					console.log(<any>error);
				}
			);
		}

		if(this.line == 3){
			this._actionsService.updateThirdLine(this.action, this.idAction, this.token).subscribe(
				response => {
					if(response.status == 'success'){
						this.status = 'success';
						this.successMessage = response.message;
					} else{
						this.status = 'error';
						this.errorCode = response.code;
						this.errorMessage = response.message
					}
				},
				error => {
					this.status = 'error';
					this.errorCode = error.error.code;
					this.errorMessage = error.error.message;
					if(error.status && error.status == 500) this.errorCode = 500;
					if(error.statusText && error.statusText == 'Unknown Error') {
						this.errorCode = 503;
						this.errorMessage = 'Ha ocurrido un problema con el servidor. Porfavor pongase en contacto con el administrador o intentelo mas tarde.'
					}
					console.log(<any>error);
				}
			);
		}
	}

	getAction(){
		this._route.params.subscribe(
			params => {
				this.idAction = +params['id'];
				this.line = +params['linea'];
				if(this.line == 1 || this.line == 2 || this.line == 3){
					this._actionsService.getAction(this.idAction, this.token).subscribe(
						response => {
							if(response.status == 'success'){
								this.action = response.action;
								if(this.action.soporte && this.action.soporte.indexOf('../sop_mejoramientoo/')==0){
									this.action.soporte = this.getFileName(this.action.soporte);
								}
								if(this.action.soporte2 && this.action.soporte2.indexOf('../sop_mejoramientoo/')==0){
									this.action.soporte2 = this.getFileName(this.action.soporte2);
								}
								if(this.action.soporte3 && this.action.soporte3.indexOf('../sop_mejoramientoo/')==0){
									this.action.soporte3 = this.getFileName(this.action.soporte3);
								}
								if(this.action.soporte4 && this.action.soporte4.indexOf('../sop_mejoramientoo/')==0){
									this.action.soporte4 = this.getFileName(this.action.soporte4);
								}
								if(this.action.soporte5 && this.action.soporte5.indexOf('../sop_mejoramientoo/')==0){
									this.action.soporte5 = this.getFileName(this.action.soporte5);
								}
								this.opportunity = this.action.improvement_opportunities;
								if(this.line == 1){
									this.actualLine = "Primera Linea de Defensa";
								} else if(this.line == 2){
									this.actualLine = "Segunda Linea de Defensa";
								} else{
									this.actualLine = "Tercera Linea de Defensa";
								}
								this.page_title = "Acción de Mejora " + this.action.id + " OM " + this.opportunity.id + " " + this.actualLine;
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
							if(error.statusText && error.statusText == 'Unknown Error') {
								this.errorCode = 503;
								this.errorMessage = 'Ha ocurrido un problema con el servidor. Porfavor pongase en contacto con el administrador o intentelo mas tarde.'
							}
							console.log(<any>error);
						}
					);
				} else{
					this.status = 'error';
					this.errorCode = 404;
					this._router.navigate(['/oportunidad-mejora/seguimiento-planes/acciones/'+this.idAction]);
				}					
			}
		);
	}

	getFileName(soport){
		soport = soport.substring(20);
		if(soport.charAt(0) == ' '){
			return soport.substring(1);
		}
		console.log();
		return soport;
	}

	fileUpload(data, soport){
		let inputSelected = $('.afu-attach-pin')[soport];
		let response = JSON.parse(data.response);
		inputSelected.classList.remove('correct');
		inputSelected.classList.remove('incorrect');

		if(response.status == 'success'){
			inputSelected.classList.add('correct');
			if(soport == 0){
				this.action.soporte = response.file;
				this.action.usuario_soporte1 = this.identity.user_alias;
			}
			if(soport == 1){
				this.action.soporte2 = response.file;
				this.action.usuario_soporte2 = this.identity.user_alias;
			}
			if(soport == 2){
				this.action.soporte3 = response.file;
				this.action.usuario_soporte3 = this.identity.user_alias;
			}
			if(soport == 3){
				this.action.soporte4 = response.file;
				this.action.usuario_soporte4 = this.identity.user_alias;
			}
			if(soport == 4){
				this.action.soporte5 = response.file;
				this.action.usuario_soporte5 = this.identity.user_alias;
			}
		} else {
			inputSelected.classList.add('incorrect');
		}
	}

	deleteFile(soport){
		let filename = '';
		if(soport == 0){
			filename = this.action.soporte;
			this.action.soporte = null;
			this.action.usuario_soporte1 = null;
		} else if(soport == 1){
			filename = this.action.soporte2;
			this.action.soporte2 = null;
			this.action.usuario_soporte2 = null;
		} else if(soport == 2){
			filename = this.action.soporte3;
			this.action.soporte3 = null;
			this.action.usuario_soporte3 = null;
		} else if(soport == 3){
			filename = this.action.soporte4;
			this.action.soporte4 = null;
			this.action.usuario_soporte4 = null;
		} else if(soport == 4){
			filename = this.action.soporte5;
			this.action.soporte5 = null;
			this.action.usuario_soporte5 = null;
		}
		this._actionsService.deleteFile(filename, this.token).subscribe(
			response => {
				console.log(response);
			},
			error => {
				console.log(<any>error);
			}
		);
	}
}
