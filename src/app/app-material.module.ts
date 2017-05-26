import {NgModule} from '@angular/core';
import {
  MdButtonModule, MdCardModule, MdCheckboxModule, MdDialogModule, MdIconModule, MdInputModule, MdListModule,
  MdProgressBarModule,
  MdRadioModule, MdSnackBarModule,
  MdToolbarModule, MdTooltipModule, OverlayModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
/**
 * All imports of used material components.
 */
@NgModule({
  declarations: [],
  imports: [
    MdButtonModule,
    MdCardModule,
    MdCheckboxModule,
    MdDialogModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdProgressBarModule,
    MdRadioModule,
    MdSnackBarModule,
    MdToolbarModule,
    MdTooltipModule,
    OverlayModule,
    FlexLayoutModule
  ],
  exports: [
    MdButtonModule,
    MdCardModule,
    MdCheckboxModule,
    MdDialogModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdProgressBarModule,
    MdRadioModule,
    MdSnackBarModule,
    MdToolbarModule,
    MdTooltipModule,
    OverlayModule,
    FlexLayoutModule
  ],
  providers: [],
})
export class AppMaterialModule { }
