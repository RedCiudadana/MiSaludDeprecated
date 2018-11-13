import EmberRouter from '@ember/routing/router';
import RouterScroll from 'ember-router-scroll';
import config from './config/environment';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';

const Router = EmberRouter.extend(RouterScroll, {
  location: config.locationType,
  // Servicio para Google Analytics (ember-metrics)
  metrics: service(),

  // Llamar a '_trackPage' en cada transición
  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },

  // Registra la página visitada con el servicio 'metrics'
  _trackPage() {
    scheduleOnce('afterRender', this, () => {
      const page = this.get('url');
      const title = this.getWithDefault('currentRouteName', 'unknown');
      get(this, 'metrics').trackPage({ page, title });
    });
  }
});

Router.map(function() {
  this.route('perfil', { path: '/perfil/:id'}, function() {
    this.route('frente-a-frente');
    this.route('fact-checking');
  });

  this.route('perfiles');

  this.route('metodologia');
  this.route('partidos', function() {
    this.route('partido', { path: '/partido/:id'});
  });

  this.route('institution', { path: '/institution/:id'}, function() {
    
  });
});

export default Router;
