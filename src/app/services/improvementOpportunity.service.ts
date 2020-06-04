import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImprovementOpportunity } from '../models/improvementOpportunity';
import { global } from '../services/global';

@Injectable()
export class ImprovementOpportunityService{
	public url: string;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	getIOpportunity(id, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.get(this.url + 'opportunities/' + id, {headers:headers});
	}

	getIOpportunityByPlan(id, status, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.get(this.url + 'opportunities/plans/' + id + '/' + status, {headers:headers});
	}

	getIOpportunityByProcess(responsable, token, status): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.get(this.url + 'opportunities/process/' + responsable + '/' + status, {headers:headers});
	}

	getIOpportunityByWord(word, token, status): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.get(this.url + 'opportunities/word/' + word + '/' + status, {headers:headers});
	}

	newImprovementOpportunity(improvementOpportunity, token): Observable<any>{
		let json = JSON.stringify(improvementOpportunity);
		let params = "json=" + json;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);
		return this._http.post(this.url + 'opportunities', params, {headers:headers});
	}

	updateImprovementOpportunity(improvementOpportunity, token): Observable<any>{
		let json = JSON.stringify(improvementOpportunity);
		let params = "json=" + json;
		let id = improvementOpportunity.id;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);
		return this._http.put(this.url + 'opportunities/' + id, params, {headers:headers});
	}

	updateLines(improvementOpportunity, token): Observable<any>{
		let json = JSON.stringify(improvementOpportunity);
		let params = "json=" + json;
		let id = improvementOpportunity.id;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);
		return this._http.put(this.url + 'opportunities/update-lines/' + id, params, {headers:headers});
	}

	updateEffectivenessIndicator(improvementOpportunity, token): Observable<any>{
		let json = JSON.stringify(improvementOpportunity);
		let params = "json=" + json;
		let id = improvementOpportunity.id;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);
		return this._http.put(this.url + 'opportunities/update-effectiveness-indicator/' + id, params, {headers:headers});
	}

	updateStatus(id, status, token): Observable<any>{
		let params = "json={}";
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.put(this.url + 'opportunities/update-status/' + id + '/' + status, params, {headers:headers});
	}

	updateHomologateOpportunity(improvementOpportunity, token): Observable<any>{
		delete(improvementOpportunity.plans);
		let json = JSON.stringify(improvementOpportunity);
		let params = "json=" + json;
		let id = improvementOpportunity.id;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);
		return this._http.put(this.url + 'opportunities/homologate/' + id, params, {headers:headers});
	}

	deleteOpportunity(id, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.delete(this.url + 'opportunities/' + id, {headers:headers});
	}
}
