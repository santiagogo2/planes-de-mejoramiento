import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
const EXCEL_EXT = '.xlsx';

@Injectable()
export class ExportService {

	constructor() {}

	exportToExcelPlans(json: any[], excelFileName: string): void{
		const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json, {header:[
			'id_plan',
			'nom_plan',
			'no_oportunidad',
			'oportunidad',
			'hallazgo',
			'analisis',
			'riesgo',
			'mesa',
			'proceso',
			'nom_indicador',
			'for_indicador'
			]});
		worksheet.A1.v = "ID PLAN";
		worksheet.B1.v = "NOMBRE DEL PLAN";
		worksheet.C1.v = "ID OPORTUNIDAD";
		worksheet.D1.v = "NOMBRE OPORTUNIDAD";
		worksheet.E1.v = "HALLAZGO";
		worksheet.F1.v = "ANÁLISIS";
		worksheet.G1.v = "RIESGO";
		worksheet.H1.v = "MESA";
		worksheet.I1.v = "PROCESO";
		worksheet.J1.v = "NOMBRE INDICADOR";
		worksheet.K1.v = "FORMULA INDICADOR";
		worksheet.L1.v = "ID ACCIÓN";
		worksheet.M1.v = "TIPO ACCIÓN";
		worksheet.N1.v = "ACCIÓN";
		worksheet.O1.v = "FECHA INICIO";
		worksheet.P1.v = "FECHA FIN";
		worksheet.Q1.v = "ESTADO PRIMERA LINEA";
		worksheet.R1.v = "ESTADO SEGUNDA LINEA";
		worksheet.S1.v = "ESTADO TERCERA LINEA";
		worksheet.T1.v = "ID HOMOLOGADO";
		const workbook: XLSX.WorkBook = { 
			Sheets: {'data': worksheet},
			SheetNames: ['data']
		}
		const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});

		// Llamar al metodo que guarda el fichero
		this.saveExcel(excelBuffer, excelFileName);
	}

	private saveExcel(buffer: any, fileName: string): void{
		const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
		FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXT);
	}
}
