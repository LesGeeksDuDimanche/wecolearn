Meteor.publish("profil", function () {
  return Profil.find();
});
Meteor.publish("discussions", function () {
  return Discussions.find();
});

Future = Npm.require('fibers/future');






Meteor.methods({

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  'ASyncAjaxRequest': function(APIRequest) {
    var fut = new Future();
    setTimeout(
      Meteor.bindEnvironment(
        function() {
          Meteor.http.post(APIRequest, function(err, result) {
            fut.return(result);
          });
        },
        function(exception) {
          console.log("Exception : ", exception);
          fut.throw(new Error("Async function throw exception"));
        }
      ),
      100
    );
    return fut.wait();
  },

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  'insertIntoProfilDB' : function(userId, pseudo, photo, city, bio, localization ) {
    // var ProfilDB = "profil";
    // var root = Meteor.isServer ? global : window;
    // var collection = root[ProfilDB];
    Profil.insert({
      userId: userId,
      pseudo: pseudo,
      photo: photo,
      city: city,
      Biography: bio,
      localization: 0,
      createdAt: new Date()
    });
  },

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  'updateProfilDB' : function(object_id, category, value) {
    var query = {};
    var key = category;
    query[key] = value;
    Profil.update(
      {_id:object_id},
      {$set:query});
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    'insertIntoTagDB' : function(tags) {
      TagDb.insert({
        tag: tags,
        createdAt: new Date()
      });
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    'updateTagDB' : function() {

    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    'insertIntoProfilTagsDB': function(userId, tag) {
      ProfilTags.insert({
        userId: userId,
        tag: tag
      });
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    'updateProfilTagsDB' : function() {

    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    'removeFromProfilDB' : function(oject_id) {
      ProfilTags.remove({
        _id: object_id
      });
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    'insertIntoDiscussionsDB' : function(userPseudo, user2Pseudo, discussion) {
      Discussions.insert({
        user1: userPseudo,
        user2: user2Pseudo,
        discussion: discussion,
      });
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    'updateDiscussionsDB' : function(object_id, discussion) {
      Discussions.update(
        {
          _id: object_id
        },
        {
          $set: {
            discussion: discussion
          }
        });
      },

      ///////////////////////////////////////////////////////////////////////////////////////////////////////////
      'updateUploadsDB' : function(event) {
        console.log(event);
        FS.Utility.eachFile(event,function(file){
          var fileObj = new FS.File(file);
          Uploads.insert(fileObj,function(err, fileObj){
            console.log(err);
            console.log(fileObj);
            if(err) {
              return err;
            } else {
              return fileObj;
            }
          });
        });
      },
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    });

// Email verification

Meteor.startup(function () {

    Accounts.emailTemplates = {
      from: 'Administrator <samueleyre@wecolearn.com>',
      siteName: 'YourSite',
      verifyEmail: {
        subject: function(user) {
          return 'Verification email from Example.com';
        },
        text: function(user, url) {
          return 'Hi,\n' +
            'Please open the link below to verify your account on Example.com:\n' + url;
        }
      }
    };
  });

  Accounts.onCreateUser(function(options, user) {
    Meteor.setTimeout(function() {
      Accounts.sendVerificationEmail(user._id);
    }, 2 * 1000);
    return user;
  });














      // 'downloadProfilImage' : function(event) {
      //
      // }
      // var photoUrl = Uploads.findOne({ _id: "jNpih98E9zMD7HcPE"});
      // console.log(photoUrl.url());







    // });
    // $.ajax({url: "https://maps.googleapis.com/maps/api/place/autocomplete/json?input="+inputedLetters+"&types=%28cities%29&language=fr&key=AIzaSyDOqNgcJgVCMV_KJpYlWDekJHwDmEtZr_w", success: function(result){
    //   }
    // });
    // Template.ProfilPage.rendered = function() {
    //   var inputedLetters = "Lyo";
    //   $.ajax({url: "https://maps.googleapis.com/maps/api/place/autocomplete/json?input="+inputedLetters+"&types=%28cities%29&language=fr&key=AIzaSyDOqNgcJgVCMV_KJpYlWDekJHwDmEtZr_w", success: function(result){
    //     console.log(result);
    //     }
    //   });
    // };

    // var asyncFunc = function(callback){
    //
    //       setTimeout(function(){
    //
    //         console.log("asyncFunc");
    //             var result = function () {
    //               var inputedLetters = "Lyo";
    //               Meteor.http.post("https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Lyo&types=%28cities%29&language=fr&key=AIzaSyDOqNgcJgVCMV_KJpYlWDekJHwDmEtZr_w", function(err, result) {
    //                 if(!err) {
    //                   return result;
    //                 } else {
    //                   return err;
    //                 }
    //               });
    //             };
    //             console.log("result" + result());
    //
    //             callback(null, result);
    //
    //       },2000);
    //   };
    //   var syncFunc = Meteor.wrapAsync(asyncFunc);

    //
    // var findCityACRequest = function() {
    //           var inputedLetters = "Lyo";
    //           Meteor.http.post("https://maps.googleapis.com/maps/api/place/autocomplete/json?input="+inputedLetters+"&types=%28cities%29&language=fr&key=AIzaSyDOqNgcJgVCMV_KJpYlWDekJHwDmEtZr_w", function(err, result) {
    //             if(!err) {
    //               return result;
    //             } else {
    //               return err;
    //             }
    //           });
    // };
