class ShowDetailsController {
    constructor($scope,$rootScope, $stateParams, showDataService) {
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.$stateParams = $stateParams;
        this.showDataService = showDataService;
        this.init();
    }
    /* Init method to load all required fields */
    init() {
        var showId = this.$stateParams.id;
        /* method calls to get show,cast and episode details  */
        this.showDataService.showDetails(showId).then(response => {
            this.$scope.showDetail = response.data;
        }, error => {
            this.$rootScope.errorMessage = 'Something went wrong. Please refresh the page.';
            this.$rootScope.error = true;
          });
        this.showDataService.showCastDetails(showId).then(response => {
            this.$scope.showCastDetail = response.data;
        }, error => {
            this.$rootScope.errorMessage = 'Something went wrong. Please refresh the page.';
            this.$rootScope.error = true;
          });
        this.showDataService.showEpisodeDetails(showId).then(response => {
            this.$scope.showEpisodeDetail = response.data;
        }, error => {
            this.$rootScope.errorMessage = 'Something went wrong. Please refresh the page.';
            this.$rootScope.error = true;
          });
    }

}

export default ShowDetailsController;