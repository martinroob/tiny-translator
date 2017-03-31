import {TranslationProject} from './translation-project';
import {InjectionToken} from '@angular/core';

/**
 * Interface of BackendService.
 * A BackendService and store and retrieve translation projects.
 *
 */
export class BackendServiceAPI {

  /**
   * Store a project.
   */
  store(project: TranslationProject) {

  }

  /**
   * Get all stored projects.
   */
  projects(): TranslationProject[] {
    return [];
  }

  /**
   * Delete a project from store.
   * @param project
   */
  delete(project: TranslationProject) {

  }

  /**
   * Helper function to generate a unique ID.
   * (from http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript)
   * @return {string}
   */
  static generateUUID(): string {
    // Public Domain/MIT
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
      d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }
}
