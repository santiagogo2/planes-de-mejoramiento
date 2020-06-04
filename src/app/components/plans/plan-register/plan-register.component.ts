import { Component, OnInit } from '@angular/core';
import { Plans } from '../../../models/plans';
import { UserService } from '../../../services/user.service';
import { PlansService } from '../../../services/plans.service';
import { global } from '../../../services/global';

@Component({
	selector: 'app-plan-register',
	templateUrl: './plan-register.component.html',
	styleUrls: ['./plan-register.component.css'],
	providers: [
		UserService,
		PlansService
	]
})
export class PlanRegisterComponent implements OnInit {
	public page_title: string;
	public plan: Plans;
	public token: string;
	public errorCode: number;
	public selectedAll: boolean;
	public responsable: boolean;
	public status: string;
	public errorMessage: string;
	public successMessage: string;
	public checklist: any;
	public optionList: any;

	constructor(
		private _userService: UserService,
		private _plansService: PlansService
	) {
		this.page_title = 'Agregar Plan de Mejoramiento';
		this.plan = new Plans(1, '', '', '', '', '');
		this.token = this._userService.getToken();
		this.selectedAll = false;
		this.responsable = false;
		this.checklist = global.checklist;
		this.optionList = global.optionList;
		this.changeStatus(false);
	}

	ngOnInit() {
	}	

	onSubmit(form){
		this.plan.responsable = this.getResponsablesValues();
		this._plansService.newPlan(this.plan, this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.status = 'success';
					this.successMessage = response.message;
					form.reset();
					this.changeStatus(false);
					this.responsable = false;
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

	// Unir los datos para guardarlos en los responsables
	getResponsablesValues(){
		let text = '';
		let arrayLength = this.checklist.length;
		let arrayValues = this.checklist;

		for(let i=0; i<arrayLength; i++){
			if (arrayValues[i].isSelected){
				text = text + arrayValues[i].value + ', ';
			}
		}

		text = text.slice(0, -2);
		return text
	}

	// Seleccionar o quitar todos los checkbox
	checkUncheckAll(){
		if(this.selectedAll){
			this.changeStatus(true);
			this.responsable = true;
		} else{
			this.changeStatus(false);
			this.responsable = false;
		}
	}

	getSelectedPlan(){
		let cont = 0;
		this.selectedAll = true;
		this.responsable = true;
		for(let i=0; i<this.checklist.length; i++){
			if(!(this.checklist[i].isSelected)){
				this.selectedAll = false;
				cont++;
			}
		}

		if(cont == this.checklist.length){
			this.responsable = false;
		}
	}

	changeStatus(status){
		this.checklist.forEach(function(element) {
			element.isSelected = status;
		});
	}
}
