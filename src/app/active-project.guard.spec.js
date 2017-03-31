"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by martin on 31.03.2017.
 */
var testing_1 = require("@angular/core/testing");
var active_project_guard_1 = require("./active-project.guard");
describe('ActiveProjectGuard', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [active_project_guard_1.ActiveProjectGuard]
        });
    });
    it('should ...', testing_1.inject([active_project_guard_1.ActiveProjectGuard], function (guard) {
        expect(guard).toBeTruthy();
    }));
});
