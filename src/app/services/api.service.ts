import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { checkId, testData } from '../utils/backend-data.mock';
import { HttpErrorResponse } from '@angular/common/http';
import { TestData } from '../utils/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  getTestData(): Observable<TestData> {
    return of(testData).pipe(delay(1000));
  }

  getTokenById(id: string): Observable<string | HttpErrorResponse> {
    return of(checkId(id)).pipe(delay(3000));
  }

  sendTestInfo(config: any) {
    console.log('Config to send: ', config);
    return of({ status: 200 });
  }
}
