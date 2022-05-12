import appModule from './../../app.module';
import ShowDetailsController from './show-details.controller';
import ShowDataService from './../../services/show-data.service';
import { spyOn } from 'jest-mock';
import flushPromises from 'flush-promises';

describe('show-details', () => {
    var scope, $stateParams, controller, service;
    $stateParams = {
        id: "204"
    };
    beforeEach(function () {
        angular.mock.module(appModule);
    });

    beforeEach(inject(($rootScope, $http) => {
        scope = $rootScope.$new();
        service = new ShowDataService($http);
        controller = new ShowDetailsController(scope, scope, $stateParams, service);

    }));

    it('should test controller function', () => {
        expect(typeof controller.init).toBe("function");
    });
    it('should test service calls', () => {
        const showDetailsSpy = spyOn(service, 'showDetails').mockImplementation((id) => { return Promise.resolve([]); });;
        const showCastDetailsSpy = spyOn(service, 'showCastDetails').mockImplementation((id) => { return Promise.resolve([]); });;
        const showEpisodeDetailsSpy = spyOn(service, 'showEpisodeDetails').mockImplementation((id) => { return Promise.resolve([]); });;
        controller.init();
        expect(showDetailsSpy).toHaveBeenCalled();
        expect(showCastDetailsSpy).toHaveBeenCalled();
        expect(showEpisodeDetailsSpy).toHaveBeenCalled();
    });
    it('should test controller functions: showDetails API Fails', async () => {
        const showDetailsSpy = spyOn(service, 'showDetails').mockImplementation((id) => { return Promise.reject([]); });;
        controller.init();
        await flushPromises();
        expect(showDetailsSpy).toHaveBeenCalled();
        expect(controller.$rootScope.error).toBeTruthy();
    });
    it('should test controller functions: showCastDetails API Fails', async () => {
        const showCastDetailsSpy = spyOn(service, 'showCastDetails').mockImplementation((id) => { return Promise.reject([]); });;
        controller.init();
        await flushPromises();
        expect(showCastDetailsSpy).toHaveBeenCalled();
        expect(controller.$rootScope.error).toBeTruthy();
    });
    it('should test controller functions: showEpisodeDetails API Fails', async () => {
        const showEpisodeDetailsSpy = spyOn(service, 'showEpisodeDetails').mockImplementation((id) => { return Promise.reject([]); });;
        controller.init();
        await flushPromises();
        expect(showEpisodeDetailsSpy).toHaveBeenCalled();
        expect(controller.$rootScope.error).toBeTruthy();
    });
})