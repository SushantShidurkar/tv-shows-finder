class ShowListController {
  constructor($scope, $rootScope, showDataService) {
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.showDataService = showDataService;
    this.showList = [];
    this.init();
  }
  /* Init method to load all required fields */
  init() {
    this.$scope.appTitle = 'TV Shows Finder';
    this.$scope.searchedShowsLabel = 'Searched Shows';
    this.$scope.searchPlaceholder = 'Search Shows (provide 3 characters atleast)';
    this.searchedList = [];
    this.$scope.searchSuccess = false;
    this.differentGenres = [
      { label: "Adventure", shows: [] },
      { label: "Action", shows: [] },
      { label: "War", shows: [] },
      { label: "Comedy", shows: [] },
      { label: "Thriller", shows: [] },
      { label: "Horror", shows: [] },
      { label: "Supernatural", shows: [] },
      { label: "Science-Fiction", shows: [] },
      { label: "Drama", shows: [] },
      { label: "Family", shows: [] },
      { label: "Romance", shows: [] },
      { label: "Fantasy", shows: [] },
      { label: "Crime", shows: [] },
      { label: "Legal", shows: [] },
      { label: "Medical", shows: [] },

    ];
    /* method call to get all shows */
    this.showDataService.getAllShows().then(response => {
      this.showList = response.data;
      /* sorting list to get highest rated show first */
      this.showList.sort((a, b) => {
        return b.rating.average - a.rating.average;
      });
      this.filterShowsByGenres();
    }, error => {
      this.$rootScope.errorMessage = 'Something went wrong. Please refresh the page.';
      this.$rootScope.error = true;
    });
  }
  /* method to divide full show list into genre specific list */
  filterShowsByGenres() {
    for (let i = 0; i < this.differentGenres.length; i++)
      this.differentGenres[i].shows = this.showList.filter((show) =>
        show.genres.includes(this.differentGenres[i].label)
      );
    this.$scope.genreFilteredShows = this.differentGenres;
  }
  /* method call for searching shows */
  startSearch() {
    var searchVal = this.$scope.searchField;

    if (searchVal.length >= 3) {
      this.showDataService.searchShow(searchVal).then(response => {
        this.searchedList = response.data;
        if (this.searchedList.length) {
          this.$scope.searchList = this.searchedList.map(item => {
            return item.show;
          });
          this.$scope.searchSuccess = true;
        } else {
          this.$scope.searchSuccess = false;
        }
      }, error => {
        this.$rootScope.errorMessage = 'Something went wrong. Please try search after refreshing the page.';
        this.$rootScope.error = true;
      });
    } else {
      this.$scope.searchSuccess = false;
    }
  }
}

export default ShowListController;