import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularLoadingBar from 'angular-loading-bar'
import Common from './common/common.module';
import Components from './components/components.module';
import AppComponent from './app.component';
import showListTemplate from './components/show-list/show-list.html';
import ShowListCtrl from './components/show-list/show-list.controller';
import ShowDataService from './services/show-data.service';
import ShowCard from './components/show-card/show-card.directive';
import ShowCardController from './components/show-card/show-card.controller';
import showDetailsTemplate from './components/show-details/show-details.html';
import ShowDetailsController from './components/show-details/show-details.controller';
import './appStyles.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'angular-loading-bar/build/loading-bar.css';
import ngSanitize from 'angular-sanitize';
var app = angular.module('app', [
  uiRouter,
  angularLoadingBar,
  ngSanitize,
  Common.name,
  Components.name
])

  .component('app', AppComponent)
  .constant('API_URL', 'http://private-12625-tinatest.apiary-mock.com');
//.constant('API_URL', 'https://api.tvmaze.com/shows');
app.controller('ShowListCtrl', ShowListCtrl);
app.service('ShowDataService', ShowDataService);
app.directive('showCard', ShowCard.directiveFactory);
app.controller('ShowCardController', ShowCardController);
app.controller('ShowDetailsController', ShowDetailsController);
ShowListCtrl.$inject = ['$scope', 'ShowDataService'];
ShowDataService.$inject = ['$http'];
ShowCardController.$inject = ['$scope','$location'];
ShowDetailsController.$inject = ['$scope','$stateParams','ShowDataService'];
app.config(function ($stateProvider, $locationProvider, $urlRouterProvider) {
  $stateProvider
    .state('Home', {
      url: '/home',
      template: showListTemplate,
      controller: ShowListCtrl,
      controllerAs:"showListCtrl"
    })
    .state('Show', {
      url: '/show/:id',
      template: showDetailsTemplate,
      controller: ShowDetailsController
    })
});