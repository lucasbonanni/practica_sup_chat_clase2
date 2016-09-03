angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats, $timeout, $state) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  var messagesRef = new Firebase('https://chatlab-51976.firebaseio.com/');

  $scope.misMensajes=[];
    // agregamos la funcion que funciona de callback que es disparada por cada mensaje de chat.
  messagesRef.on('child_added', function (snapshot) {
    $timeout(function() {
          var message = snapshot.val();
          $scope.misMensajes.push(message);
          console.log(message);
        });
  });

  /*$scope.chats = Chats.all();*/
    $scope.saveMessage = function(){
    var msg = $scope.message;
      messagesRef.push({usuario:'Lucas', mensaje:msg});
      console.log("message save");
      $state.reload();
      $scope.message ="";
    };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, $http) {
  /*$scope.settings = {
    enableFriends: true
  };*/
  $http.get('https://restcountries.eu/rest/v1/region/americas')
  .then(function(respuesta){
      $scope.paises = respuesta.data;
      console.log(respuesta.data);
  },
  function(error){

  });
  

});
