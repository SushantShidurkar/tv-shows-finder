class ShowCardController{
constructor($scope){
this.$scope=$scope;
this.$scope.showDetails=$scope.$parent.show;
}

}

export default ShowCardController;