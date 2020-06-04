import { Component, OnInit } from '@angular/core';
import { ExportService } from '../../../services/export.service';
import { PlansService } from '../../../services/plans.service';
import { UserService } from '../../../services/user.service';
import { ActionsService } from '../../../services/actions.service';
import { global } from '../../../services/global';

@Component({
	selector: 'app-new-report',
	templateUrl: './new-report.component.html',
	styleUrls: ['./new-report.component.css'],
	providers: [
		ExportService,
		PlansService,
		UserService,
		ActionsService
	]
})
export class NewReportComponent implements OnInit {
	public page_title: string;
	public token: string;
	public infoToExport: any[];
	public status: string;
	public errorCode: number;
	public errorMessage: string;
	public successMessage: string;
	public plans: any[];
	public reportType: number;
	public planSelected: number;
	public flag: number;
	public processes: any[];
	public processSelected: string;

	constructor(
		private _exportService: ExportService,
		private _plansService: PlansService,
		private _userService: UserService,
		private _actionsService: ActionsService
	) {
		this.page_title = 'Generar Informes Planes de Mejoramiento';
		this.token = this._userService.getToken();
		this.processes = global.checklist;
	}

	ngOnInit() {
		this.getPlans();
	}

	onSubmit(){
		this.flag = 1;
		this._actionsService.getInfoToExport(this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.infoToExport = response.actions;
					if(this.reportType == 0){
						this.exportAsXLSX(this.infoToExport, 'General');
						this.flag = 2;
					} else if(this.reportType == 1){
						this.filterInfoPlans(this.infoToExport, this.planSelected);
						this.flag = 2;
					} else if(this.reportType == 2){
						this.filterInfoProcess(this.infoToExport, this.processSelected);
						this.flag = 2;
					}
				} else {
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

	filterInfoPlans(info, idPlan){
		let i = 0;
		let j = 0;
		let newInfo = new Object();
		info.forEach(function(action){
			if(action.id_plan == idPlan){
				newInfo[j] = action;
				j++;
			}
			i++;
		});
		let newInfoArray = Object.values(newInfo);
		if (newInfoArray.length != 0){
			this.exportAsXLSX(newInfoArray, newInfoArray[0].nom_plan);
			this.status = 'success';
			this.successMessage = "Informe generado con éxito. Revise su bandeja de descargas."
		} else {
			this.status = 'error';
			this.errorCode = 404;
			this.errorMessage = "No se puede generar el informe. No se han encontrado registro del Plan seleccionado."
		}
	}

	filterInfoProcess(info, value){
		let i = 0;
		let j = 0;
		let newInfo = new Object();
		info.forEach(function(action){
			if(action.proceso == value){
				newInfo[j] = action;
				j++;
			}
			i++;
		});
		let newInfoArray = Object.values(newInfo);
		if (newInfoArray.length != 0){
			this.exportAsXLSX(newInfoArray, newInfoArray[0].proceso);
			this.status = 'success';
			this.successMessage = "Informe generado con éxito. Revise su bandeja de descargas."
		} else {
			this.status = 'error';
			this.errorCode = 404;
			this.errorMessage = "No se puede generar el informe. No se han encontrado registro del proceso: "+value+"."
		}		
	}

	getPlans(){
		this._plansService.list(this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.plans = response.plans;
				} else {
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

	exportAsXLSX(infoToExcelExport, name){
		this._exportService.exportToExcelPlans(infoToExcelExport, 'Planes de Mejoramiento_'+name);
	}

}
