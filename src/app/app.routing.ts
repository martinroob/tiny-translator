import {ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {TranslatePageComponent} from './translate-page/translate-page.component';
import {ActiveProjectGuard} from './active-project.guard';

/**
 * Created by martin on 23.03.2017.
 * Routing informations.
 */

const appRoutes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'translate', component: TranslatePageComponent, canActivate: [ActiveProjectGuard] },
  { path: '', component: HomePageComponent}
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
