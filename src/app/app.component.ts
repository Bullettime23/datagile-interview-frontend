import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FacadeService } from './services/facade.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BehaviorSubject, EMPTY, first, iif, switchMap, take, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'Собеседования Datagile';
  testName$ = this.facade.getTestName();
  isLoaded$ = new BehaviorSubject(false);

  constructor(
    private facade: FacadeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.facade.authUser(params.get('id')).pipe(take(1))
        ),
        switchMap((isAuth) =>
          iif(
            () => isAuth,
            this.facade.loadData().pipe(
              first(),
              tap(() => this.isLoaded$.next(true))
            ),
            EMPTY.pipe(tap({ complete: () => this.facade.accessDenied() }))
          )
        )
      )
      .subscribe();
    //Узнать, авторизован ли пользователь. Если нет, запросить авторизацию по id
    // Если нет, на заглушку
    // Если авторизован, запросить дданные тестирования, показать кнопку
  }
}
