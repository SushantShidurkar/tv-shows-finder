class ShowDetailsController{
    constructor($scope,$stateParams,showDataService){
    this.$scope=$scope;
    this.$stateParams=$stateParams;
    this.showDataService=showDataService;
    this.init();
    }
    init(){
        var showId=this.$stateParams.id;
        this.showDataService.showDetails(showId).then(response=>{
            console.log(response.data);
            this.$scope.showDetail=response.data;
        });
        this.showDataService.showCastDetails(showId).then(response=>{
            console.log(response.data);
            this.$scope.showCastDetail=response.data;
        });
        this.showDataService.showEpisodeDetails(showId).then(response=>{
            console.log(response.data);
            this.$scope.showEpisodeDetail=response.data;
        });
    }
    
    }
    
    export default ShowDetailsController;