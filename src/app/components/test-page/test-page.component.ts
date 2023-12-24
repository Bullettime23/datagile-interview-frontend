import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  UntypedFormGroup,
} from '@angular/forms';
import { Observable, map } from 'rxjs';
import { FacadeService } from 'src/app/services/facade.service';
import { Question } from 'src/app/utils/interfaces';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestPageComponent {
  constructor(private facade: FacadeService, private _fb: FormBuilder) {}
  question$: Observable<Question> = this.facade.getCurrentQuestion$();
  timeLeft$: Observable<number> = this.facade.getTimer();
  arrayAsStatic: any;
  isLastQuestion$ = this.facade.isLastQuestion();
  isFirstQuestion$ = this.facade.isFirstQuestion();

  formGroup$: Observable<UntypedFormGroup> = this.question$.pipe(
    map((question) => {
      const formArray = this._fb.array(
        question.answers.map((question) => false)
      );
      this.arrayAsStatic = formArray;
      return this._fb.group({ answers: formArray });
    })
  );

  get cities(): FormArray {
    return this.arrayAsStatic as FormArray;
  }

  onSubmitClick(question: Question, formGroup: FormGroup) {
    this.facade.onSubmit(
      question.question,
      formGroup.controls['answers'].value
        .map((checked: boolean, i: number) =>
          checked ? question.answers[i] : null
        )
        .filter((v: any) => v !== null)
    );
  }

  onFinish(question: Question, formGroup: FormGroup) {
    this.facade.onFinish(
      question.question,
      formGroup.controls['answers'].value
        .map((checked: boolean, i: number) =>
          checked ? question.answers[i] : null
        )
        .filter((v: any) => v !== null)
    );
  }

  onForwardClick() {
    this.facade.onForward();
  }
  onReturnClick() {
    this.facade.onReturn();
  }
}
