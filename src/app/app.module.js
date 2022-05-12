import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularLoadingBar from 'angular-loading-bar';
import ngSanitize from 'angular-sanitize';
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

/* Defining angularjs main module 'app'  */
var app = angular.module('app', [
  uiRouter,
  angularLoadingBar,
  ngSanitize,
])
.component('app', AppComponent);
/* registering controllers,services and directives with app  */
app.controller('ShowListCtrl', ShowListCtrl);
app.controller('ShowCardController', ShowCardController);
app.controller('ShowDetailsController', ShowDetailsController);

app.service('ShowDataService', ShowDataService);

app.directive('showCard', ShowCard.directiveFactory);
/* Injecting required objects,services to the app */
ShowDataService.$inject = ['$http'];
ShowListCtrl.$inject = ['$scope','$rootScope', 'ShowDataService'];
ShowCardController.$inject = ['$scope', '$location'];
ShowDetailsController.$inject = ['$scope','$rootScope','$stateParams', 'ShowDataService'];

/* Initializing rootScope variables */
app.run(function($rootScope) {
  $rootScope.errorMessage='';
  $rootScope.error=false;
});

/* Configured all routes used in the app */
app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('Home', {
      url: '/',
      template: showListTemplate,
      controller: ShowListCtrl,
      controllerAs: "showListCtrl"
    })
    .state('Show', {
      url: '/show/:id',
      template: showDetailsTemplate,
      controller: ShowDetailsController
    })
  $urlRouterProvider.otherwise("/");
});
