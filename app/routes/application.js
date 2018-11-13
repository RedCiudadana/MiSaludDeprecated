import config from '../config/environment';
import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { inject as service } from '@ember/service';
import { isBlank } from '@ember/utils';
import { Promise } from 'rsvp';

/**
 * Serializa los modelos y obtiene profiles, config, navbarLinks, a traves del servicio: spreadsheets.
 *
 * @class Route.Application
 */
export default Route.extend({

  /**
   * Servicio para obtener datos, ya sea desde 'static-files' o las hojas de datos públicadas.
   *
   * @property spreadsheets
   * @type Service
   */
  spreadsheets: service(),

  /**
   * Obtiene los datos de archivos. Utilizado para obtener las URLs de las hojas de calculo publicadas.
   *
   * @property ajax
   * @type Service
   */
  ajax: service(),

  /**
   * Establecer la 'URL' de los datos y configuraciones en el servicio spreadsheet.
   *
   * @method beforeModel
   */
  beforeModel() {
    const spreadsheetService = this.get('spreadsheets');

    return this.get('ajax')
      // Obtiene dataSpreadsheetSourceUrl de las configuraciones
      .request(config.APP.dataSpreadsheetSourceUrl, { dataType: 'text' })
      .then((response) => {
        // Agrega la url de datos al servicio
        spreadsheetService.set('dataSpreadsheetUrl', response);
        // Utiliza la misma url de datos para configuraciones
        spreadsheetService.set('configSpreadsheetUrl', response);
        // En el caso que un url para configuraciones existe la obtiene y la agrega
        if (!isBlank(config.APP.configSpreadsheetSourceUrl)) {
          return this.get('ajax')
            .request(config.APP.configSpreadsheetSourceUrl, { dataType: 'text' })
            .then((response) => spreadsheetService.set('configSpreadsheetUrl', response));
        }
        return Promise.resolve(this);
      });
  },

  /**
   * Datos principales de la aplicación.
   *
   * @method model
   * @return {Object} hospitals.
   */
  model() {

    return hash({
      hospitals: this.store.findAll('hospital')
    });
  },

  /**
   * Acciones: selectPerfil.
   * @property actions
   * @type {Object}
   */
  actions: {
    // Utilizado para seleccionar un perfil en la caja de busqueda.
    selectPerfil(profile) {
      // Agrega el id del perfil a la transición
      this.transitionTo('perfil', profile.get('id'));
    }
  }

});
