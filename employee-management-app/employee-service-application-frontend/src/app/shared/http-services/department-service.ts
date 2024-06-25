import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Department } from '../models';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DepartmentService {
    private endpoint = 'departments';

    constructor(private httpClient: HttpClient) {

    }

    public find(headers?: any) {
        return this.httpClient.get(`${environment.baseUrl}/${this.endpoint}`, {headers})
        .pipe(map((data: Department[]) => data));
    }

    public count(headers?: any) {
        return this.httpClient.get(`${environment.baseUrl}/${this.endpoint}/count`, {headers})
        .pipe(map((data) => data));
    }

    public findById(id: string, headers?: any) {
        return this.httpClient.get(`${environment.baseUrl}/${this.endpoint}/${id}`, {headers})
        .pipe(map((data: Department) => data));
    }

    public patch(id: string, patchData: any, headers?: any) {
        return this.httpClient.patch(`${environment.baseUrl}/${this.endpoint}/${id}`, patchData, {headers})
        .pipe(map((data: Department) => data));
    }

    public create( createdData: any, headers?: any) {
        return this.httpClient.post(`${environment.baseUrl}/${this.endpoint}`, createdData, {headers})
        .pipe(map((data: Department) => data));
    }

    public deleteById(id: string, headers?: any) {
        return this.httpClient.delete(`${environment.baseUrl}/${this.endpoint}/${id}`, {headers})
        .pipe(map(data => data));
    }

}
