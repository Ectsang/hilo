'use strict';

angular.module('hiloApp')
  .controller('CreateCtrl', function ($scope, $location, $state, $http, $rootScope, $modalInstance, Auth) {

    var N = 4;

    /**
     * returns a random string of n chars
     */
    function randomStr(n) {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      for (var i = 0; i < n; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
    }

    /**
     * returns a NEW shortcode to identify the link
     */
    function getShortCode() {

      var newShortCode = randomStr(N);
      var promise;

      // check if shortcode already exists
      (function fetchUniqueCode(shortCode) {

        promise = $http.get('/api/srcsettings/checkShortcode/' + shortCode)
          .success(function (result) {
            // console.log('sc', result);
            return result.shortCode;
          })
          .error(function (err) {
            if (err && err.code === 404) {
              var anotherShortCode = randomStr(N);
              // console.log('found', shortCode,' trying ', anotherShortCode);
              fetchUniqueCode(anotherShortCode);
            }
          });

      })(newShortCode);

      return promise;
    }

    /**
     * returns the destUrl's html title
     */
    function getTitle(result) {
      var promise = $http.get('/api/srcsettings/fetchTitleOf/' + encodeURIComponent($scope.link.url))
      promise.success(function(res) {
        result.data.htmlTitle = res.htmlTitle;
        return result;
      });
      promise.error(function (err) {
        result.data.htmlTitle = 'Campaign Title';
        return result;
      });
      return promise;
    }

    /**
     * Submits the form and create the srcsetting
     */
    $scope.ok = function (form) {
      $scope.errors = {};

      var user = Auth.getCurrentUser(), username, profileUrl;

      if (user.provider === 'facebook') {
        username = user.facebook.id;
        profileUrl = 'https://www.facebook.com/' + username;
      } else if (user.provider === 'twitter') {
        username = user.twitter.screen_name;
        profileUrl = 'https://www.twitter.com/' + username;
      }

      if (form.$valid) {

        var today = new Date();

        getShortCode()
        .then(function(result) {
          getTitle(result).then(function() {

            var newLink = {
              owner: user._id,
              createdDate: today,
              modifiedDate: today,
              shortCode: result.data.shortCode,
              delay: 0,
              author: Auth.getCurrentUser().name,
              theMessage: 'Attract your audience with a clear offer. Keep it short (under 100 characters)',
              actionBtnText: 'Next >',
              ctaText: 'Get your free ebook now',
              inputPlaceholder: 'Your email',
              submitBtnText: 'Submit',
              destUrl: $scope.link.url,
              title: result.data.htmlTitle,
              mailchimp: {
                listId: '', // fetch from attached mailchimp object
                apiKey: ''
              },
              show: {
                twitterProfilePicUrl: Auth.getCurrentUser().provider === 'twitter',
                facebookProfilePicUrl: Auth.getCurrentUser().provider === 'facebook'
              }
            };

            if (user.provider === 'facebook') {

              _.merge(newLink, {
                facebook: {
                  username: username,
                  profileUrl: profileUrl,
                  share: {
                    text: 'Attract your audience with a clear offer. Keep it short (under 100 characters)',
                    url: $location.protocol() + '://' + $location.host() + '/s/' + result.data.shortCode
                  }
                }
              });

            } else if (user.provider === 'twitter') {

              _.merge(newLink, {
                twitter: {
                  username: username,
                  profileUrl: profileUrl,
                  share: {
                    text: 'Attract your audience with a clear offer. Keep it short (under 100 characters)',
                    url: $location.protocol() + '://' + $location.host() + '/s/' + result.data.shortCode,
                    hashtags: ['getHilo'],
                    via: user.twitter.screen_name
                  },
                }
              });

            }

            // console.log('link', newLink);

            $http.post('/api/srcsettings', newLink, {})
              .success(function(dataFromServer, status, headers, config) {
                console.log(status);
                console.log(config);

                $rootScope.$emit('rootScope:newLink', 'Create new link - Successful');

                $modalInstance.close($scope.link);

              })
              .catch(function(err) {
                if (err) {
                  $scope.errors = {};

                  angular.forEach(err.data.errors, function (error, field) {

                    form[field].$setValidity('mongoose', false);
                    // $scope.errors[field] = error.message;
                    console.log($scope.errors);
                  });

                } else {
                  $modalInstance.close($scope.link);
                }
            });
          });
        })


      } else {
        console.log('whoops');
      }

    };

    /**
     * Dismiss modal
     */
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  });
