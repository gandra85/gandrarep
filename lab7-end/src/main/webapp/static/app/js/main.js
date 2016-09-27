var wafepaApp = angular.module('wafepaApp', ['ngRoute']);

wafepaApp.controller('ActivityController', function($scope, $http, $location, $routeParams) {
	
	$scope.getAll = function() {
		$http.get('api/activities')
				.success(function(data) {
					$scope.activities = data;
				})
				.error(function() {
					alert('Error!');
				});
	};
	
	$scope.remove = function(id) {
		$http.delete('api/activities/' + id)
				.success(function() {
					$scope.getAll();
				})
				.error(function() {
					
				});
	};
	
	$scope.init = function() {
		$scope.activity = {};
		
		if ($routeParams.id) {  // edit stranica
			$http.get('api/activities/' + $routeParams.id)
					.success(function(data) {
						$scope.activity = data;
					})
					.error(function() {
						
					});
		}
	};
	
	$scope.save = function() {
		if ($scope.activity.id) { // edit
			$http.put('api/activities/' + $scope.activity.id, $scope.activity)
					.success(function() {
						$location.path('/activities');
					})
					.error(function() {
						
					});
		} else {
			$http.post('api/activities', $scope.activity)
					.success(function() {
						$location.path('/activities');
					})
					.error(function() {
						
					});

		}
	};
});

wafepaApp.controller('UserController', function($scope, $http, $routeParams, $location){
	
	$scope.getUsers = function(){
		$http.get('api/users')
		.success(function(data){
			$scope.users = data;
			$scope.success= true;
		})
		.error(function(){
			
		});
	};
	
	$scope.deleteUsers = function(id){
		$http.delete('api/users/' + id)
		.success(function(){
			$scope.getUsers();
		})
		.error(function(){
			
		});
	};
	
	$scope.initUser = function(){
		$scope.user = {};
		$scope.naslov = 'Add User';
		if($routeParams && $routeParams.id){
			$http.get('api/users/'+ $routeParams.id)
			.success(function(data){
				$scope.user = data;
				$scope.naslov = 'Edit User';
			})
			.error(function(){
				
			});
		}else{
			if($routeParams && $routeParams.email){
				//ovo je edit stranica
				$http.get('api/users/'+ $routeParams.email)
				.success(function(data){     //ubacuje rezultata sa servera-data moze da se zove kako hocete
					$scope.user = data;
					$scope.naslov="View user"
					$scope.skriven = true;
					$scope.nemenja = true;
				})
				.error(function(){
					
				});
			}
		}
	};
	
	$scope.saveUser = function(){
		
		if($scope.user.id){
			//edit stranica
			$http.put('api/users/'+ $scope.user.id, $scope.user)
			.success(function(){
				$location.path('/users')
			})
			.error(function(){
				
			});
			
		}else{
			//add stranica
			$http.post('api/users', $scope.user) //posalji mu activity
			.success(function(){
				$location.path('/users')
			})
			.error(function(){
				
			});
	};
		}
	
});





wafepaApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : '/static/app/html/partial/home.html'
        })
        .when('/activities', {
            templateUrl : '/static/app/html/partial/activities.html',
            controller : 'ActivityController'
        })
        .when('/activities/add', {
            templateUrl : '/static/app/html/partial/addEditActivity.html',
            controller : 'ActivityController'
        })
        .when('/activities/edit/:id', {
            templateUrl : '/static/app/html/partial/addEditActivity.html',
            controller : 'ActivityController'
        })
        .when('/users', {
            templateUrl : '/static/app/html/partial/users.html',
            controller : 'UserController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);