import appModule from '../../app.module';
import ShowDataService from '../../services/show-data.service';
import ShowListController from './show-list.controller';
import allShows from './../../stubs/allShows.json';
import searchShows from './../../stubs/searchShows.json';
import { spyOn } from 'jest-mock';
import flushPromises from 'flush-promises';
describe('show-list', () => {
  var scope, service, controller, $rootScope, http;
  beforeEach(function () {
    angular.mock.module(appModule);
  });

  beforeEach(inject((_$rootScope_, $http) => {
    $rootScope = _$rootScope_;
    scope = _$rootScope_.$new();
    http = $http;
    service = new ShowDataService($http);
    controller = new ShowListController(scope,scope, service);

  }));
  it('should test controller functions', () => {
    expect(typeof controller.init).toBe("function");
  });
  it('should test controller functions', async () => {
    const allShowDetailsSpy=spyOn(service,'getAllShows').mockImplementation(()=>{return Promise.resolve({"data":allShows});});
    controller.init();
    await flushPromises();
    expect(allShowDetailsSpy).toHaveBeenCalled();
    const data= controller.showList;
    expect(data).toEqual(expect.arrayContaining(allShows));
  });
  it('should test controller functions: getAllShows API Fails', async () => {
    const allShowDetailsSpy=spyOn(service,'getAllShows').mockImplementation(()=>{return Promise.reject({});});
    controller.init();
    await flushPromises();
    expect(allShowDetailsSpy).toHaveBeenCalled();
    expect(controller.$rootScope.error).toBeTruthy();
  });
  it('should test controller functions search', async () => {
    const showSeachSpy=spyOn(service,'searchShow').mockImplementation(()=>{return Promise.resolve({"data":searchShows});});
    const startSearchSpy=spyOn(controller,'startSearch');
    controller.init();
    controller.$scope.searchField="game";
    controller.startSearch();
    await flushPromises();
    const data= controller.searchedList;
    expect(startSearchSpy).toHaveBeenCalled();
    expect(showSeachSpy).toHaveBeenCalled();
    expect(data).toEqual(expect.arrayContaining(searchShows));
  });
  
  it('should test controller functions search Not found', async () => {
    const showSeachSpy=spyOn(service,'searchShow').mockImplementation(()=>{return Promise.resolve({"data":[]});});
    const startSearchSpy=spyOn(controller,'startSearch');
    controller.init();
    controller.$scope.searchField="fsgfs";
    controller.startSearch();
    await flushPromises();
    const data= controller.searchedList;
    expect(startSearchSpy).toHaveBeenCalled();
    expect(showSeachSpy).toHaveBeenCalled();
    expect(data).toEqual([]);
    expect(controller.$scope.searchSuccess).toBeFalsy();
  });
  it('should test controller functions search no data', async () => {
    const startSearchSpy=spyOn(controller,'startSearch');
    controller.init();
    controller.$scope.searchField="ga";
    controller.startSearch();
    expect(controller.$scope.searchSuccess).toBeFalsy();
  });
  it('should test controller functions: searchShow API Fails', async () => {
    const showSeachSpy=spyOn(service,'searchShow').mockImplementation(()=>{return Promise.reject({});});
    controller.init();
    controller.$scope.searchField="fsgfs";
    controller.startSearch();
    await flushPromises();
    expect(showSeachSpy).toHaveBeenCalled();
    expect(controller.$rootScope.error).toBeTruthy();
  });
})




