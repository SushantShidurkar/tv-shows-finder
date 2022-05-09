const API_URL='https://api.tvmaze.com';
class ShowDataService{
    
    constructor($http){
        this.http=$http;
    }
    getAllShows(){
        return this.http.get(`${API_URL}/shows`);
        //return this.http.get(API_URL);
    }
    searchShow(searchString){
        return this.http.get(`${API_URL}/search/shows?q=${searchString}`);
    }
    showDetails(showId){
        return this.http.get(`${API_URL}/shows/${showId}`);
    }
    showEpisodeDetails(showId){
        return this.http.get(`${API_URL}/shows/${showId}/cast`);
    }
    showCastDetails(showId){
        return this.http.get(`${API_URL}/shows/${showId}/episodes`);
    }
    
}
export default ShowDataService;