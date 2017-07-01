import {ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {TranslatePageComponent} from './translate-page/translate-page.component';
import {ActiveProjectGuard} from './active-project.guard';
import {CreateProjectPageComponent} from './create-project-page/create-project-page.component';
import {EditProjectPageComponent} from './edit-project-page/edit-project-page.component';
import {ConfigureAutoTranslatePageComponent} from './configure-auto-translate-page/configure-auto-translate-page.component';

/**
 * Created by martin on 23.03.2017.
 * Routing informations.
 */

const appRoutes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'createproject', component: CreateProjectPageComponent },
  { path: 'editproject', component: EditProjectPageComponent, canActivate: [ActiveProjectGuard] },
  { path: 'translate', component: TranslatePageComponent, canActivate: [ActiveProjectGuard] },
  { path: 'configureautotranslate', component: ConfigureAutoTranslatePageComponent},
  { path: '', component: HomePageComponent}
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
