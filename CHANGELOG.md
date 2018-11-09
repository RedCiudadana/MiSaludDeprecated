# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- Added slider and ambulance image in index.hbs.
- Added animation to ambulance image.

## [0.4.3-merge] 2018-11-9 Merge of MiGuatemala
### Added
- Added comments in config/enviroment.js.

### Changed
- Changed documentation/CONFIG.md adding new info.
- Changed spanish code to english.

## [0.4.3] 2018-10-31
### Added
- Added main initializer.
- Added ember's addons ember-metrics, ember-router-scroll.
- Added YUIDoc at spreadsheet service.
- Added components red-footer, red-navbar, profile-functionalities, disqus-panel.
- Added route:partidos.

## Changed
- Actions in index controller.
- In handlebars change ' to " .
- Changed styles for perfil templates and subtemplates.
- Changed config in yuidoc.json.
- Changed output folder of yuidoc documentation in public/docs for publish in gh-pages.

## Removed
- Flash-message helper, for now is broken.
- Remove all bower dependecies.
- Overdata in application route.

## Fixed
- Fix 'fotoPerfil' of profile model.
- Fix 'partido' model.

## [0.4.2] 2018-09-26
### Added
- Added meta tags in index.html.
- Added ember's addons ember-cli-favicon, ember-cli-deploy ember-cli-deploy-build, ember-cli-deploy-git.

### Changed
- Update README.md.
- Update portfolio in perfiles.hbs.

## [0.4.1] - 2018-09-23
### Added
- Added ember's addons ember-link-to-wrapper, ember-social-share, ember-page-title, ember-one-way-select, ember-cli-string-helpers.

### Changed
- Update perfil.hbs, perfil.index.hbs, perfil.frente-a-frente.hbs.

## [0.4.0] - 2018-09-23
### Added
- Added ember's addons ember-bootstrap, ember-font-awesome, ember-cli-sass.
- Added node-sass to implement with ember-cli-sass.
- Added SASS file mi-guatemala.scss.
- SASS lighten and darken to calculate hover colors.
- Add tabletop to package.json.
- Add front-portfolio component.

### Changed
- In application.hbs, the footer and the header are now added with "partial".
- Change test data to 'Congreso' data

### Removed
- Older images.
- Weid css files.


## [0.3.1] - 2018-09-23
### Changed
- Rename adapter diputado-comision to comission-deputies.
- Rename adapter perfil to magistrate.
- Rename serializer perfil to magistrate.

## [0.3.0] - 2018-09-22
### Added
- Routes application, index, institucion, perfil, resultados to YUIDoc.

### Removed
- Namespace tag in models. Instead, use DOT in class.

## [0.2.1] - 2018-09-22
### Added
- Addon ember-cli-yuidoc

### Changed
- All models to YUIDoc

## [0.2.0] - 2018-09-18
### Added
- Profile, magistrate and commission-deputie models.
- [DockYard Styles](https://github.com/DockYard/styleguides/tree/master/engineering) and [ESDocs](https://esdoc.org/manual/tags.html)  in models.

### Removed
- Removed perfil and diputado-comision models.

### Fixed
- Sematinc versioning

## [0.1.0] - 2018-09-17
### Added
- This CHANGELOG.

### Changed
- Ember 2.16 to 3.3.0.
- Change syntax ember 2.16 to 3.3.
- Comment broken code, sorry about this.
