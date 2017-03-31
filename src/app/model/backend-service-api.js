"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Interface of BackendService.
 * A BackendService and store and retrieve translation projects.
 *
 */
var BackendServiceAPI = (function () {
    function BackendServiceAPI() {
    }
    /**
     * Store a project.
     */
    BackendServiceAPI.prototype.store = function (project) {
    };
    /**
     * Get all stored projects.
     */
    BackendServiceAPI.prototype.projects = function () {
        return [];
    };
    return BackendServiceAPI;
}());
exports.BackendServiceAPI = BackendServiceAPI;
