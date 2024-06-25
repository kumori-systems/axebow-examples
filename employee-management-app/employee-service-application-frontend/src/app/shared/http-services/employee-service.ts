

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Employee } from '../models';

@Injectable({providedIn: 'root'})
export class EmployeeService {
    private endpoint = 'employees';

    constructor(private httpClient: HttpClient) {

    }

    public find(headers?: any) {
        return this.httpClient.get(`${environment.baseUrl}/${this.endpoint}`, {headers})
        .pipe(map((data: Employee[]) => data));
    }

    public count(headers?: any) {
        return this.httpClient.get(`${environment.baseUrl}/${this.endpoint}/count`, {headers})
        .pipe(map((data) => data));
    }

    public findById(id: string, headers?: any) {
        return this.httpClient.get(`${environment.baseUrl}/${this.endpoint}/${id}`, {headers})
        .pipe(map((data: Employee) => data));
    }

    public patch(id: string, patchData: any, headers?: any) {
        return this.httpClient.patch(`${environment.baseUrl}/${this.endpoint}/${id}`, patchData, {headers})
        .pipe(map((data: Employee) => data));
    }

    public create( createdData: any, headers?: any) {
        return this.httpClient.post(`${environment.baseUrl}/${this.endpoint}`, createdData, {headers})
        .pipe(map((data: Employee) => data));
    }

    public deleteById(id: string, headers?: any) {
        return this.httpClient.delete(`${environment.baseUrl}/${this.endpoint}/${id}`, {headers})
        .pipe(map(data => data));
    }
}
