import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { StubPageComponent } from './components/stub-page/stub-page.component';
import { TestPageComponent } from './components/test-page/test-page.component';

const routes: Routes = [
  { path: 'main-page', component: MainPageComponent },
  { path: 'stub-page', component: StubPageComponent },
  { path: 'test-page', component: TestPageComponent },
  { path: '**', component: StubPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
