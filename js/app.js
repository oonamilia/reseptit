var app = angular.module("app", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "./templates/etusivu.html",
		controller: "indexCtrl"
    })
	.when("/etusivu", {
        templateUrl : "./templates/etusivu.html",
		controller: "indexCtrl"
    })
	.when("/uusi", {
        templateUrl : "./templates/uusi.html",
		controller: "newCtrl"
    })
	.when("/kaikki", {
        templateUrl : "./templates/kaikki.html",
		controller: "allCtrl"
    })
	.when("/lihapullat", {
        templateUrl : "./templates/reseptit/lihapullat.html",
		controller: "recipeCtrl"
    })
	.when('/:name*', {
        templateUrl: function(urlattr){
             return './templates/reseptit/' + urlattr.name + '.html';
        },
        controller: 'recipeCtrl'
    })
	.otherwise({
        template : "<h1>404 Tyhjää</h1><p>Tyhjää täynnä</p>"
    });
});


app.controller('indexCtrl', function($scope) {
	
$scope.greeting= "Tervetuloa!";
$scope.lastName= "J";
	
});

app.controller('allCtrl', function($scope) {
	
$scope.doSearch = function(){
	var input, filter, ul, li, a, i;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("rcpUl");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
};
	
});

app.controller('recipeCtrl', function($scope) {
	
$scope.greeting= "Tervetuloa!";
$scope.lastName= "J";
	
});

app.controller('newCtrl', function($scope, $http) {
	
$scope.amntName=0;
$scope.ingrs=0;
$scope.rowAmount=1;

$scope.addFields = function(){
	$scope.ingrName="ingr";
	$scope.ingrs=$scope.ingrs+1;
	$scope.amntName=$scope.amntName+1;
	$scope.ingrName=$scope.ingrName+$scope.ingrs;
	console.log($scope.ingrName);
	console.log("toimii");
	
	var newRow = '<p>Määrä: <input type="text" name="'+$scope.amntName+'"> Ainesosa: <input type="text" name="'+$scope.ingrName+'"></p>';
	document.getElementById('ingr').innerHTML += newRow;  

	$scope.rowAmount=$scope.rowAmount+1;

};

	
});


