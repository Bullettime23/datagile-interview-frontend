import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestPageComponent } from './components/test-page/test-page.component';
import { StubPageComponent } from './components/stub-page/stub-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { TimePipe } from './components/pipes/time.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TestPageComponent,
    StubPageComponent,
    MainPageComponent,
    TimePipe,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
