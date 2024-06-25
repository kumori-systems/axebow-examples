import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {catchError, filter, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) {
  }

  async load() {
    console.log('Loading config');
    const config = await this.http.get<typeof environment>('/config.json').toPromise();


      if (Boolean(Object.keys(config))) {
        Object.assign(environment, config);
      }
      console.log('ENVIRONMENT APP', {environment});
  }
}
