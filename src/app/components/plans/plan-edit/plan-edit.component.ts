import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Plans } from '../../../models/plans';
import { UserService } from '../../../services/user.service';
import { PlansService } from '../../../services/plans.service';
import { global } from '../../../services/global';

@Component({
	selector: 'app-plan-edit',
	templateUrl: './plan-edit.component.html',
	styleUrls: ['./plan-edit.component.css'],
	providers: [
		UserService,
		PlansService
	]
})
export class PlanEditComponent implements OnInit {
	public page_title: string;
	public plan: Plans;
	public id: number;
	public token: string;
	public errorCode: number;
	public status: string;
	public errorMessage: string;
	public successMessage: string;
	public responsable: boolean;
	public selectedAll: boolean;
	public checklist: any;
	public optionList: any;

	constructor(
		private _userService: UserService,
		private _plansService: PlansService,
		private _route: ActivatedRoute
	) {
		this.page_title = 'Actualizar Plan de Mejoramiento';
		this.token = this._userService.getToken();
		this.responsable = false;
		this.checklist = global.checklist;
		this.optionList = global.optionList;
		this.changeStatus(false);
	}

	ngOnInit() {
		this.getPlan();
	}

	getPlan(){
		this._route.params.subscribe(
			params => {
				//Obtener el id de la url
				this.id = +params['id'];
				//Obtener los datos del plan
				this._plansService.getPlan(this.id, this.token).subscribe(
					response => {
						if(response.status == 'success'){
							this.plan = response.plan;
							this.getCheckboxesValues();
						} else{
							this.status = 'error';
							this.errorCode = response.errorCode;
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

	onSubmit(form){
		this.plan.responsable = this.getResponsablesValues();
		this._plansService.updatePlan(this.plan, this.token).subscribe(
			response =>{
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
				this.errorMessage = error.error.message;
				if(error.status && error.status == 500) this.errorCode = 500;
				console.log(<any>error);
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

	//Funciones para obtener los datos de los checkbox
	getCheckboxesValues(){
		let nuevaCadena = this.plan.responsable;

		nuevaCadena = nuevaCadena.replace(/, /g, ",");
		this.splitElements(nuevaCadena, ',');
	}

	splitElements(str, separator){
		let cont = 0;
		let element = str.split(separator);
		for(let i=0; i<element.length; i++){
			if(element[i] != ""){
				this.checkElements(element[i]);
				cont++;
			}
		}
		if(cont == this.checklist.length){
			this.selectedAll = true;
		}		
	}

	checkElements(finalElement){
		let checkboxes = this.checklist;
		let checkboxesLength = checkboxes.length;
		
		for(let i=0; i < checkboxesLength; i++){
			if(checkboxes[i].value == finalElement){
				checkboxes[i].isSelected = true;
				this.responsable = true;
			}			
		}
	}

}
