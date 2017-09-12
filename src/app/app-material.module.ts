import {NgModule} from '@angular/core';
import {
  MdButtonModule, MdCardModule, MdCheckboxModule, MdDialogModule, MdIconModule, MdInputModule, MdListModule,
  MdMenuModule,
  MdProgressSpinnerModule,
  MdRadioModule, MdSlideToggleModule, MdSnackBarModule,
  MdToolbarModule, MdTooltipModule
} from '@angular/material';
import {OverlayModule} from '@angular/cdk/overlay';
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
    MdMenuModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdSlideToggleModule,
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
    MdMenuModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdToolbarModule,
    MdTooltipModule,
    OverlayModule,
    FlexLayoutModule
  ],
  providers: [],
})
export class AppMaterialModule { }
