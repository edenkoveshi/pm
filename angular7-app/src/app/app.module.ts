import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PmTableComponent } from './pm-table/pm-table.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SelectComponent } from './select/select.component';
import { ModalComponent } from './modal/modal.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { DataService } from './data.service'
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  MatIconModule, MatInputModule,
  MatAutocompleteModule, MatChipsModule,
  MatFormFieldModule,
} from '@angular/material';

import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    PmTableComponent,
    NavbarComponent,
    SelectComponent,
    ModalComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatFormFieldModule,
    HttpClientModule,
    MatDialogModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule { }
