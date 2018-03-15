import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {HttpClientModule} from '@angular/common/http';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSliderModule} from '@angular/material/slider';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import 'hammerjs';

import { AppComponent } from './app.component';
import { PlaceTypeComponent } from './place-type/place-type.component';


@NgModule({
  declarations: [
    AppComponent,
    PlaceTypeComponent
  ],
  imports: [MatListModule,MatSidenavModule,MatIconModule,MatTooltipModule,MatToolbarModule,MatTabsModule,MatProgressBarModule,MatDividerModule,MatSnackBarModule,
    BrowserModule,BrowserAnimationsModule,MatAutocompleteModule,FormsModule,HttpModule,MatInputModule,ReactiveFormsModule,MatButtonModule,HttpClientModule,
    MatExpansionModule,MatSliderModule,MatStepperModule,MatSlideToggleModule,MatProgressSpinnerModule,MatSelectModule,MatRadioModule,Angular2FontawesomeModule,MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
