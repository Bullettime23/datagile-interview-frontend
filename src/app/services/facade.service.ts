import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { Observable, of, take, tap } from 'rxjs';
import { Question } from '../utils/interfaces';
import { PageState } from './state';

@Injectable({
  providedIn: 'root',
})
export class FacadeService {
  constructor(
    private auth: AuthService,
    private api: ApiService,
    private router: Router,
    private state: PageState
  ) {}

  getTestName() {
    return this.state.testName$.asObservable();
  }

  getTimer(): Observable<number> {
    return this.state.timer$.pipe(
      tap((time) => {
        if (time == 0) {
          this.state.stubMessage$.next('Время вышло!');
          this.router.navigate(['stub-page']);
        }
      })
    );
  }

  getCurrentQuestion$(): Observable<Question> {
    return this.state.getQuestion();
  }

  loadData() {
    return this.api.getTestData().pipe(tap((data) => this.state.setData(data)));
  }
  authUser(id: string | null): Observable<boolean> {
    return this.auth.loginById(id);
  }

  isUserAuth(id?: string): Observable<boolean> {
    return of(this.auth.isUserLoggedIn);
  }

  accessDenied(): void {
    console.log('Access denied');
    this.state.stubMessage$.next(
      'Доступ запрещен: обратитесь к администратору'
    );
    this.router.navigate(['stub-page']);
  }

  onStart() {
    this.router.navigate(['test-page']);
    this.state.onStart();
  }

  onSubmit(question: string, value: string[]) {
    this.state.addAnswer(question, value);
  }

  onFinish(question: string, value: string[]) {
    this.state.addAnswer(question, value);
    this.api.sendTestInfo(this.state.getResult()).pipe(take(1)).subscribe();
    this.state.stubMessage$.next('Поздравляем! Вы ответили на все вопросы.');
    this.router.navigate(['stub-page']);
  }

  onReturn() {
    this.state.previous();
  }

  onForward() {
    this.state.next();
  }

  isLastQuestion() {
    return this.state.isLastQuestion$.asObservable();
  }

  isFirstQuestion() {
    return this.state.isFirstQuestion$.asObservable();
  }

  getStubMessage() {
    return this.state.stubMessage$.asObservable();
  }
}
