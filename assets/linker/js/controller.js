var sputnikApp = angular.module('sputnikApp', []);
 
sputnikApp.controller('IndexController', ['$http', '$scope',
  function($http, $scope) {
    $scope.channels = {};
    $scope.user = {};
    $scope.save_text = [false, 'Save'];

    $scope.login = {
      logged: false,
      loading: false,
      message: [],
      go: function(user) {
        $scope.login.loading = true;
        $http({
          method: 'POST',
          url: '/user/make',
          data: user
        }).success(function(user) {
          $scope.login.message = ['success', 'You\'ve been logged in...'];
          $scope.login.logged = true;
          $scope.user = user;

          for (var i = 0, l = user.subscriptions.length; i < l; i++) {
            $scope.channels[user.subscriptions[i]]['on'] = true;
          }
        }).error(function() {
          $scope.login.message = ['danger', 'Invalid username or password'];
        }).finally(function() {
          $scope.login.loading = false;
        });
      }
    };

    $http.post('/channel').success(function(result) {
      for (var i = 0, l = result.length; i < l; i++) {
        $scope.channels[result[i].id] = result[i];
      }
    });

    $scope.save = function() {
      $scope.user.subscriptions = [];
      $scope.save_text = [true, 'Loading'];

      for (var key in $scope.channels) {
        if ($scope.channels[key]['on']) {
          $scope.user.subscriptions.push(key);
        }
      }

      $http({
        method: 'POST',
        url: '/user/save',
        data: $scope.user
      }).success(function(user) {
        $scope.save_text = [false, 'Saved!'];
      }).error(function() {
        $scope.save_text = [false, 'Error!'];
      });
    };
  }
]);
