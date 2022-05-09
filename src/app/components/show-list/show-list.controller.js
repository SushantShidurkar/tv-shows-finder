class ShowListController {
  constructor($scope, showDataService) {
    this.$scope = $scope;
    this.showDataService = showDataService;
    this.showList = [];
    this.init();
  }
  init() {
    this.searchedList=[];
    this.$scope.searchSuccess=false;
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
    this.showDataService.getAllShows().then(response => {
      this.showList = response.data;
      this.showList.sort((a, b) => {
        return b.rating.average - a.rating.average;
      });
      this.filterShowsByGenres();
    },error=>{
      console.log(error);
    });
  }

  filterShowsByGenres() {
    for (let i = 0; i < this.differentGenres.length; i++)
      this.differentGenres[i].shows = this.showList.filter((show) =>
        show.genres.includes(this.differentGenres[i].label)
      );
    this.$scope.genreFilteredShows = this.differentGenres;
  }
  startSearch(){
    var searchVal=this.$scope.searchField;
    
    if(searchVal.length >= 3){
      this.showDataService.searchShow(searchVal).then(response => {
        this.searchedList = response.data;
        if(this.searchedList.length){
          console.log(this.searchedList);
          this.$scope.searchList=this.searchedList.map(item=>{
            return item.show;
          });
          this.$scope.searchSuccess=true;
        }else{
          this.$scope.searchSuccess=false;
        }
      },error=>{
        console.log(error);
      });
    }else{
      this.$scope.searchSuccess=false;
    }
  }
}

export default ShowListController;