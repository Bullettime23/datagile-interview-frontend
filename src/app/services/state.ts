import { Injectable } from '@angular/core';
import { Question, TestData } from '../utils/interfaces';
import { BehaviorSubject, Observable, map, scan, takeWhile, timer } from 'rxjs';

export type stubMessage =
  | 'Доступ запрещен: обратитесь к администратору'
  | 'Время вышло!'
  | 'Поздравляем! Вы ответили на все вопросы.';

@Injectable({ providedIn: 'root' })
export class PageState {
  serverData?: TestData;
  questionIndex$ = new BehaviorSubject(0);
  private finalConfig: any = {};
  timer$: Observable<number> = timer(0);
  isLastQuestion$ = new BehaviorSubject(false);
  isFirstQuestion$ = new BehaviorSubject(true);
  stubMessage$ = new BehaviorSubject<stubMessage>(
    'Доступ запрещен: обратитесь к администратору'
  );
  testName$ = new BehaviorSubject('Загрузка тестирования');

  getQuestion(): Observable<Question> {
    return this.questionIndex$.pipe(
      map((ind) => this.serverData!.questions[ind])
    );
  }

  onStart() {
    this.questionIndex$.next(0);
    this.checkQuestionsNumber();
    this.timer$ = timer(0, 1000).pipe(
      scan((acc) => --acc, this.serverData!.time / 1000),
      takeWhile((x) => x >= 0)
    );

    timer(this.serverData!.time);
  }

  private checkQuestionsNumber() {
    this.isFirstQuestion$.next(this.questionIndex$.value == 0);
    this.isLastQuestion$.next(
      this.questionIndex$.value == this.serverData!.questions.length - 1
    );
  }

  setData(serverData: TestData) {
    this.serverData = serverData;
    this.testName$.next(serverData.name);
  }

  addAnswer(question: string, answer: string[]) {
    this.finalConfig[question] = answer;
    this.next();
  }

  previous() {
    let current = this.questionIndex$.value;
    this.questionIndex$.next(--current);
    this.checkQuestionsNumber();
  }

  next() {
    if (this.isLastQuestion$.value) {
      return;
    }
    let current = this.questionIndex$.value;
    this.questionIndex$.next(++current);
    this.checkQuestionsNumber();
  }

  getResult(): any {
    return this.finalConfig;
  }
}
