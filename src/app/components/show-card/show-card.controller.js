class ShowCardController{
constructor($scope){
this.$scope=$scope;
//console.log($scope.$parent.show);
this.$scope.showDetails=$scope.$parent.show;
this.init();
}
init(){
    // this.$scope.$watch('$scope.$parent.show',(newValue,oldValue)=>{
    //     this.$scope.pande=newValue;
    // });
}

}

export default ShowCardController;