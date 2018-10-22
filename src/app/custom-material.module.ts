import { NgModule } from '@angular/core';
import { 
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatCardModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatChipsModule,
  MatMenuModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const MODULES = [ MatButtonModule, MatCheckboxModule, BrowserAnimationsModule,
                  MatFormFieldModule, MatIconModule, MatInputModule, MatCardModule, 
                  MatTooltipModule, MatSnackBarModule, MatChipsModule, MatMenuModule];

@NgModule({
  imports: [
    ...MODULES
  ],
  exports: [
    ...MODULES
  ],
  declarations: []
})
export class CustomMaterialModule { }

