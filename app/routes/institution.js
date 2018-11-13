import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
import { A } from '@ember/array';

/**
 * Institution Route
 *
 * @class Route.institution
 */
export default Route.extend({

  /**
   * Spreadsheets Service
   *
   * @property spreadsheets
   * @type Service
   */
  spreadsheets: service(),

  /**
   * Routing Service
   *
   * @property _routing
   * @type Service
   */
  _routing: service('-routing'),



  /**
   * Model hook. Obtiene toda la información de un perfil según el id que obtiene de 'params'.
   *
   * @method model
   * @return {Object} Datos del perfil según el id. Algunos campos son: config, perfil, institucion, currentParty, institutionGeneralInformationConfiguration, institutions, avaibleDocuments, dataTableGradation, totalGraduationScore, institutionFunctions, entre otros.
   */
  model(params) {
    const spreadsheet = this.get('spreadsheets');

    // Obtiene el institution según el id
    const institution = this.store.peekRecord('hospital', params.id);

    let generalInfo = {
      nombre: {
        key: 'Nombre',
        value: institution.nombre
      },
      departamento: {
        key: 'Departamento',
        value: institution.departamento
      },
      municipalidad: {
        key: 'Municipalidad',
        value: institution.municipalidad
      },
      direccion: {
        key: 'Dirección',
        value: institution.direccion
      },
      telefono: {
        key: 'Teléfono',
        value: institution.telefono
      }
    };

    return hash({
      institution: institution,
      generalInfo: generalInfo,
      services: spreadsheet
        .fetch('servicios')
        .then((registros) => {
          return A(registros)
            .filterBy('id', institution.get('id'))
            .filter((e) => e.aspecto !== 'Total');
      }),
      authorities: spreadsheet
        .fetch('autoridades')
        .then((registros) => {
          return A(registros)
            .filterBy('id', institution.get('id'))
      })
    });
  }
});
