import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';
import { OutputComponent } from './output/output.component';
import { FeaturePageComponent } from './feature-page/feature-page.component';


@NgModule({
  declarations: [
    AppComponent,
    FeaturePageComponent,
    CounterComponent,
    OutputComponent,
  ],
  imports: [
    BrowserModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
