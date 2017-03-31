"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var home_page_component_1 = require("./home-page/home-page.component");
var translate_page_component_1 = require("./translate-page/translate-page.component");
var active_project_guard_1 = require("./active-project.guard");
/**
 * Created by martin on 23.03.2017.
 * Routing informations.
 */
var appRoutes = [
    { path: '', component: home_page_component_1.HomePageComponent },
    { path: 'translate', component: translate_page_component_1.TranslatePageComponent, canActivate: [active_project_guard_1.ActiveProjectGuard] },
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes, { useHash: true });
