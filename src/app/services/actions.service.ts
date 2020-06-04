import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actions } from '../models/actions';
import { global } from './global';

@Injectable()
export class ActionsService{
	public url: string;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	getAction(id, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.get(this.url + 'actions/' + id, {headers:headers});
	}

	getActionByIdOpportunity(id, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.get(this.url + 'actions/show/opportunity/' + id, {headers:headers});
	}

	getInfoToExport(token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.get(this.url + 'actions/export/all', {headers:headers});
	}

	newAction(action, token): Observable<any>{
		let json = JSON.stringify(action);
		let params = "json=" + json;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);
		return this._http.post(this.url + 'actions', params, {headers:headers});
	}

	updateAction(action, id, token): Observable<any>{
		let json = JSON.stringify(action);
		let params = "json=" + json;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);
		return this._http.put(this.url + 'actions/' + id, params, {headers:headers});
	}

	updateFirstLine(action, id, token): Observable<any>{
		let json = JSON.stringify(action);
		let params = "json=" + json;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);
		return this._http.put(this.url + 'actions/update/first-line/' + id, params, {headers:headers});
	}

	updateSecondLine(action, id, token): Observable<any>{
		let json = JSON.stringify(action);
		let params = "json=" + json;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);
		return this._http.put(this.url + 'actions/update/second-line/' + id, params, {headers:headers});
	}

	updateThirdLine(action, id, token): Observable<any>{
		let json = JSON.stringify(action);
		let params = "json=" + json;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);
		return this._http.put(this.url + 'actions/update/third-line/' + id, params, {headers:headers});
	}

	updateAllLines(action, id, token): Observable<any>{
		let json = JSON.stringify(action);
		let params = "json=" + json;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);
		return this._http.put(this.url + 'actions/update/all-lines/' + id, params, {headers:headers});
	}

	deleteFile(filename, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.delete(this.url + 'actions/first-line/delete-file/' + filename, {headers:headers});
	}

	deleteAction(id, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.delete(this.url + 'actions/' + id, {headers:headers});
	}
}