const API_URL='https://api.tvmaze.com';
class ShowDataService{
    
    constructor($http){
        this.http=$http;
    }

    /* http service calls to get data from TVMAZE API */
    getAllShows(){
        return this.http.get(`${API_URL}/shows`);
    }
    searchShow(searchString){
        return this.http.get(`${API_URL}/search/shows?q=${searchString}`);
    }
    showDetails(showId){
        return this.http.get(`${API_URL}/shows/${showId}`);
    }
    showCastDetails(showId){
        return this.http.get(`${API_URL}/shows/${showId}/cast`);
    }
    showEpisodeDetails(showId){
        return this.http.get(`${API_URL}/shows/${showId}/episodes`);
    }
}
export default ShowDataService;