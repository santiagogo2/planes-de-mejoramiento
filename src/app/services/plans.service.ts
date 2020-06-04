// Imports necesarios para el funcionamiento del servicio
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plans } from '../models/plans';
import { global } from './global';

@Injectable()
export class PlansService{
	public url: string;
	public token: string;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	list(token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.get(this.url + 'plans', {headers:headers});
	}

	getPlan(id, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.get(this.url + 'plans/' + id, {headers:headers});
	}

	newPlan(plan, token): Observable<any>{
		let json = JSON.stringify(plan);
		let params = "json=" + json;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);
		return this._http.post(this.url + 'plans', params, {headers:headers});
	}

	updatePlan(plan, token): Observable<any>{
		let json = JSON.stringify(plan);
		let params = "json=" + json;
		let id = plan.id;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);
		return this._http.put(this.url + 'plans/' + id, params, {headers:headers});
	}

	deletePlan(id, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.delete(this.url + 'plans/' + id, {headers:headers});
	}
}