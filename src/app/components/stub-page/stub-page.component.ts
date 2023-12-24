import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FacadeService } from 'src/app/services/facade.service';

@Component({
  selector: 'app-stub-page',
  templateUrl: './stub-page.component.html',
  styleUrls: ['./stub-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StubPageComponent {
  message$ = this.facade.getStubMessage();
  constructor(private facade: FacadeService) {}
}
