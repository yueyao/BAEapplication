/**
 * Created by DFH on 14-1-21.
 */
var app = angular.module('todos',[]);

app.controller('todo',['$scope',function($scope){
    var todos = [
        'example'
    ];
    $scope.new='';
    $scope.errshow=true;
    $scope.succshow=true;
    $scope.todos = todos;
    $scope.add=function(){
        if($scope.new){
            for(var i =0;i<$scope.todos.length;i++){
                if($scope.todos[i]==$scope.new){
                    alert('重复任务')
                    $scope.new='';
                    return;
                }
            }
            $scope.todos.push($scope.new);
            $scope.succshow=false;
            $scope.new='';
        }else {
            $scope.errshow=false;
        }
    }
    $scope.remove = function(n){
        $scope.todos.splice(n,1);
    }

}])
