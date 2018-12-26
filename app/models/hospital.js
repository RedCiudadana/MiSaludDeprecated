import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { computed } from '@ember/object';
import { dasherize } from '@ember/string';

/**
 * Modelos para hospitales.
 *
 * @class  Model.Hospital
 */
export default Model.extend({
  // Attributes

  /**
   * nombre
   * 
   * @property nombre
   * @type String
   */
  nombre: attr('string'),

  /**
   * Tipo: Hospital o Centro de salud
   * 
   * @property tipo
   * @type String
   */
  tipo: attr('string'),

  /**
   * departamento
   * 
   * @property departamento
   * @type String
   */
  departamento: attr('string'),

  /**
   * municipalidad
   * 
   * @property municipalidad
   * @type String
   */
  municipalidad: attr('string'),

  /**
   * descripcion
   * 
   * @property descripcion
   * @type String
   */
  descripcion: attr('string'),

  /**
   * horarioVisita
   * 
   * @property horarioVisita
   * @type String
   */
  horarioVisita: attr('string'),

  /**
   * urlHospital
   * 
   * @property urlHospital
   * @type String
   */
  urlHospital: attr('string'),

  /**
   * direccion
   * 
   * @property direccion
   * @type String
   */
  direccion: attr('string'),

  /**
   * telefono
   * 
   * @property telefono
   * @type String
   */
  telefono: attr('string'),

  /**
   * correo
   * 
   * @property correo
   * @type String
   */
  correo: attr('string'),

  /**
   * paginaweb
   * 
   * @property paginaweb
   * @type String
   */
  paginaweb: attr('string'),

  /**
   * twitter
   * 
   * @property twitter
   * @type String
   */
  twitter: attr('string'),

  /**
   * facebook
   * 
   * @property facebook
   * @type String
   */
  facebook: attr('string'),

  /**
   * solicitudAIP
   * 
   * @property solicitudAIP
   * @type String
   */
  solicitudAIP: attr('string'),

  /**
   * informacionpublica
   * 
   * @property informacionpublica
   * @type String
   */
  informacionpublica: attr('string'),

  // Computed

  /**
   * Un string de etiquetas para se utilizada por Isotope y poder filtrar este objeto.
   * Este string va en la clase (CSS) del objeto contenedor (HTML) de estos datos.
   * Por ejemplo en un portafolio de perfiles podemos filtrar perfiles
   * según algún atributo que este en nuestras etiquetas.
   *
   * @property String labels
   * @param String departamento
   * @return String etiquetas
   */
  labels: computed('departamento', 'tipo', function() {
    let returnValue = '';

    // Departamento
    returnValue += ' ' + dasherize(this.get('departamento'));

    // Departamento
    returnValue += ' ' + dasherize(this.get('tipo'));

    return returnValue;
  })

});
