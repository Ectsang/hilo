var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var request = require('superagent');

exports.setup = function (User, config) {
  passport.use(new FacebookStrategy({
      clientID: config.facebook.clientID,
      clientSecret: config.facebook.clientSecret,
      callbackURL: config.facebook.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({
        'facebook.id': profile.id
      },
      function(err, user) {
        if (err) {
          return done(err);
        }

        // get profile picture
        // - https://graph.facebook.com/10100534773158263/picture?width=74&height=74&access_token={token}
        var apiCall = 'https://graph.facebook.com/' + profile.id +
                      '/picture?width=74&height=74&access_token=' + accessToken;

        request
        .get(apiCall)
        .end(function(err, res) {

          if (!user) {
            user = new User({
              name: profile.displayName,
              email: (profile.emails && profile.emails[0].value) || 'notprovided@gmail.com',
              role: 'user',
              username: profile.username,
              provider: 'facebook',
              facebook: profile._json,

              profilePicUrl: res.request.url || ''
            });
            user.save(function(err) {
              if (err) return done(err);
              done(err, user);
            });

          } else {

            // upsert profilePicUrl
            user.profilePicUrl = res.request.url || '';
            user.save(function(err) {
              if (err) return done(err);
              done(err, user);
            });

          }

        });

      })
    }
  ));
};
