import {ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {TranslatePageComponent} from './translate-page/translate-page.component';

/**
 * Created by martin on 23.03.2017.
 * Routing informations.
 */

const appRoutes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'translate', component: TranslatePageComponent },
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
