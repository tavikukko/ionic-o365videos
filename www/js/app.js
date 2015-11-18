// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'AdalAngular'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'adalAuthenticationServiceProvider',
function($stateProvider, $urlRouterProvider, $httpProvider, adalProvider) {

adalProvider.init({
  tenant: "tavikukko365.onmicrosoft.com",
  //clientId: "0af04a97-af85-4db0-bac6-ba8fca0516bf",
  clientId: "b7f9b131-4d58-455f-a230-4c6fe381d200",
  cacheLocation: "localStorage",
  redirectUri: "http://ionic365videosnative",
  endpoints: {
    'https://tavikukko365.sharepoint.com/_api/':
    'https://tavikukko365.sharepoint.com',
    'https://tavikukko365.sharepoint.com/portals/hub/_api/':
    'https://tavikukko365.sharepoint.com',
    'https://tavikukko365-my.sharepoint.com/_api/v1.0/me':
    'https://tavikukko365-my.sharepoint.com' }
  }, $httpProvider);

  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlist/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })

  .state('app.videos', {
    url: '/videos',
    requireADLogin: true,
    views: {
      'menuContent': {
        templateUrl: 'templates/videos.html',
        controller: 'VideosCtrl'
      }
    }
  })

  .state('app.video', {
    url: '/video/:videoId',
    views: {
      'menuContent': {
        templateUrl: 'templates/video.html',
        controller: 'VideoCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
}]);
