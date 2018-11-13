import $ from 'jquery';
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { dasherize } from '@ember/string';

const departments =
  ['Todos los departamentos', 'Alta Verapaz', 'Baja Verapaz', 'Chimaltenango',
  'Chiquimula', 'Petén', 'El Progreso', 'Quiché',
  'Escuintla', 'Guatemala', 'Huehuetenango', 'Izabal',
  'Jalapa', 'Jutiapa', 'Quetzaltenango', 'Retalhuleu',
  'Sacatepéquez', 'San Marcos', 'Santa Rosa', 'Sololá',
  'Suchitepéquez', 'Totonicapán', 'Zacapa'];

const types =
  ['Todos los tipos', 'Hospital', 'Centro de Salud'];

export default Controller.extend({

  departments,

  types,

  selectedDepartment: departments[0],

  selectedType: types[0],

  currentSelector: computed(
    'selectedDepartment',
    'selectedType',
    function() {
      if (this.get('selectedDepartment') === 'Todos los departamentos' && this.get('selectedType') === 'Todos los tipos') {
        return '*';
      }

      let labels = [];

      // Filtra departamento
      labels.push(' .' + dasherize(this.get('selectedDepartment')));

      // Filtra tipo
      labels.push(' .' + dasherize(this.get('selectedType')));

      return labels.join(', ');
    }
  ),

  _applyFilter() {

    var $container = $('#portfolio');

    $container.isotope({transitionDuration: '0.65s'});

    $container.isotope({filter: this.get('currentSelector')});

    // if(this.get('currentSelector') == '*') {
    //   this.set('selectorBadges', '');
    // } else {
    //   this.set('selectorBadges', this.get('currentSelector').replace(/\./g , '').split(', '));
    // }

    return false;
  },

  actions: {
    applyFilter() {
      return this._applyFilter();
    },

    selectProfile(hospital) {
      console.log('El id es: ' + hospital.id);
    }
  }
});
