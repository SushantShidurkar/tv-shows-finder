import ShowDataService from './show-data.service';
import { spyOn } from 'jest-mock';
import flushPromises from 'flush-promises';
import allShows from './../../app/stubs/allShows.json';
import searchShows from './../../app/stubs/allShows.json';
import show from './../../app/stubs/show.json';
import cast from './../../app/stubs/showCast.json';
import episodes from './../../app/stubs/showEpisodes.json';
describe('show-data', () => {
  var service, http;

  beforeEach(inject(($http) => {
    http = $http;
    service = new ShowDataService(http);
  }));
  it('should check function call',()=>{
    const allShowDetailsSpy = spyOn(service, 'getAllShows');
    service.getAllShows();
    expect(allShowDetailsSpy).toHaveBeenCalled();
  })
  it('should test getAllShows', async () => {
    const allShowDetailsSpy = spyOn(service, 'getAllShows').mockImplementation(() => { return Promise.resolve({ "data": allShows }); });
    let data;
    var check=service.getAllShows();
    check.then(response => {
         data = response.data;
       }, error => { });
    service.getAllShows().then(response => {
      data = response.data;
    }, error => { });
    await flushPromises();
    expect(allShowDetailsSpy).toHaveBeenCalled();
    expect(data).toEqual(expect.arrayContaining(allShows));
  });
  it('should check searchShow function call',()=>{
    const searchShowSpy = spyOn(service, 'searchShow');
    service.searchShow('game');
    expect(searchShowSpy).toHaveBeenCalled();
  })
  it('should test searchShow', async () => {
    const searchShowSpy = spyOn(service, 'searchShow').mockImplementation(() => { return Promise.resolve({ "data": searchShows }); });
    let data;
    service.searchShow('game').then(response => {
      data = response.data;
    }, error => { });
    await flushPromises();
    expect(searchShowSpy).toHaveBeenCalled();
    expect(data).toEqual(expect.arrayContaining(searchShows));
  });
  it('should check showDetails function call',()=>{
    const showDetailsSpy = spyOn(service, 'showDetails');
    service.showDetails(82);
    expect(showDetailsSpy).toHaveBeenCalled();
  })
  it('should test showDetails', async () => {
    const showDetailsSpy = spyOn(service, 'showDetails').mockImplementation(() => { return Promise.resolve({ "data": show }); });
    let data;
    service.showDetails(82).then(response => {
      data = response.data;
    }, error => { });
    await flushPromises();
    expect(showDetailsSpy).toHaveBeenCalled();
    expect(data).toEqual(show);
  });
  it('should check showCastDetails call',()=>{
    const showCastDetailsSpy = spyOn(service, 'showCastDetails');
    service.showCastDetails(82);
    expect(showCastDetailsSpy).toHaveBeenCalled();
  })
  it('should test showCastDetails', async () => {
    const showCastDetailsSpy = spyOn(service, 'showCastDetails').mockImplementation(() => { return Promise.resolve({ "data": cast }); });
    let data;
    service.showCastDetails(82).then(response => {
      data = response.data;
    }, error => { });
    await flushPromises();
    expect(showCastDetailsSpy).toHaveBeenCalled();
    expect(data).toEqual(expect.arrayContaining(cast));
  });
  it('should check showEpisodeDetails function call',()=>{
    const showEpisodeDetailsSpy = spyOn(service, 'showEpisodeDetails');
    service.showEpisodeDetails(82);
    expect(showEpisodeDetailsSpy).toHaveBeenCalled();
  })
  it('should test showEpisodeDetails', async () => {
    const showEpisodeDetailsSpy = spyOn(service, 'showEpisodeDetails').mockImplementation(() => { return Promise.resolve({ "data": episodes }); });
    let data;
    service.showEpisodeDetails(82).then(response => {
      data = response.data;
    }, error => { });
    await flushPromises();
    expect(showEpisodeDetailsSpy).toHaveBeenCalled();
    expect(data).toEqual(expect.arrayContaining(episodes));
  });
})