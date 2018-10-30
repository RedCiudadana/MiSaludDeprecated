import config from '../config/environment';
import EmberObject from '@ember/object';
import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { A } from '@ember/array';
import { hash } from 'rsvp';
import { inject as service } from '@ember/service';
import { isBlank } from '@ember/utils';
import { Promise } from 'rsvp';

/**
 * Serializa los modelos y obtiene perfiles, config, navbarLinks, a traves del servicio: spreadsheets.
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
   * Servicio de rutas. Utilizado para comprobar que existan ciertas rutas que son indicadas en la configuración (navbarLinks).
   *
   * @property _routing
   * @type Service
   */
  _routing: service('-routing'),

  /**
   * Obtiene los datos de archivos. Utilizado para obtener las URLs de las hojas de calculo publicadas.
   *
   * @property ajax
   * @type Service
   */
  ajax: service(),

  /**
   * Establecer la 'URL' de los datos y configuraciones en el servicio spreadsheet. Además procesar los campos de serialización y serializar.
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
      })

      // Obtiene datos de configuraciones para serializar
      .then(() => RSVP.all([

        /**
         * Setear la información general del perfil mediante la parametrización
         * proveniente de la configuración
         */
        spreadsheetService
          .fetchConfig('perfil-informacion-general-configuracion')
          .then((configuracionData) => {
            let perfilDataArray = A([]);

            A(configuracionData).forEach((item) => {
              perfilDataArray.pushObject({
                field: item.field,
                label: item.label
              });
            });

            let prefilSerializer = this.store.serializerFor('magistrate');

            prefilSerializer.set('informacionGeneralFields', perfilDataArray);
          }),

        /**
         * Setear la información de recuadros del perfil mediante la parametrización
         * proveniente de la configuración
         */
        spreadsheetService
          .fetchConfig('perfil-recuadros-configuracion')
          .then((configuracionData) => {
            let perfilRecuadrosDataArray = A([]);

            A(configuracionData).forEach((item) => {
              perfilRecuadrosDataArray.pushObject({
                field: item.field,
                label: item.label
              });
            });

            let prefilSerializer = this.store.serializerFor('magistrate');

            prefilSerializer.set('recuadrosFields', perfilRecuadrosDataArray);
          }),

        /**
         * Setear los campos a utilizar en la funcionalidad de frente-a-frente
         */
        spreadsheetService
          .fetchConfig('perfil-frente-a-frente-configuracion')
          .then((configuracionData) => {
            let perfilFrenteAFrenteDataArray = A([]);

            A(configuracionData).forEach((item) => {
              perfilFrenteAFrenteDataArray.pushObject({
                field: item.field,
                label: item.label,
                section: item.section
              });
            });

            let prefilSerializer = this.store.serializerFor('magistrate');

            prefilSerializer.set('frenteAFrenteFields', perfilFrenteAFrenteDataArray);
          }),

        /**
         * Setear la información general del perfil:comission-deputies mediante la parametrización
         * proveniente de la configuración
         */
        spreadsheetService
          .fetchConfig('diputado-informacion-general-configuracion')
          .then((configuracionData) => {
            let perfilDataArray = A([]);

            A(configuracionData).forEach((item) => {
              perfilDataArray.pushObject({
                field: item.field,
                label: item.label
              });
            });

            let prefilSerializer = this.store.serializerFor('commission-deputie');

            prefilSerializer.set('informacionGeneralFields', perfilDataArray);
          })
      ]));
  },

  /**
   * Datos principales de la aplicación.
   *
   * @method model
   * @return {Object} Perfiles, config, navbarLinks.
   */
  model() {
    const spreadsheet = this.get('spreadsheets');
    const _routing = this.get('_routing');

    return hash({
      partidos: this.store.findAll('partido', { include: 'partido'}),
      perfiles: this.store.findAll('magistrate'),
      diputados: this.store.findAll('commission-deputie'),
      config: spreadsheet.fetchConfig('configuracion')
        .then((configuracion) => {
          let configObject = EmberObject.create();

          A(configuracion).forEach((item) => {
            configObject.set(item.key, item.value);
          });

          return configObject;
        }),
      navbarLinks: spreadsheet.fetchConfig('navbar-links')
        .then((links) => {
          return A(links).filter((link) => {
            return _routing.hasRoute(link.route);
          });
        })
    });
  },

  /**
   * Acciones: selectPerfil.
   * @property actions
   * @type {Object}
   */
  actions: {
    // Utilizado para seleccionar un perfil en la caja de busqueda.
    selectPerfil(candidato) {
      this.transitionTo('perfil', candidato.get('id'));
    }
  }

});
