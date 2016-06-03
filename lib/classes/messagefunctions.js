Meteor.messageFunctions = {

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  showProfil: function(pseudo) {
    Session.set('currentProfil',Profil.findOne({pseudo: pseudo}));
    Router.go('contactProfilPage');

    // -------------------------------------------------------------------
    // This doesnt work....
    // $('.contactContainer').hide();
    // $('.contactContainer').css('display', 'none');
    // $('#contact').hide();
    // $('#contact').css('display', 'none !important');
    // -------------------------------------------------------------------

  },

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  insertMessageInDBAndLoadDiscussion: function(userPseudo, user2Pseudo, discussion) {

    if(!Discussions.findOne({$and: [{user1 : userPseudo}, {user2: user2Pseudo}]}) && !Discussions.findOne({$and : [{user1 : user2Pseudo}, {user2: userPseudo}]}) ) {
      Meteor.call("insertIntoDiscussionsDB", userPseudo, user2Pseudo, discussion, function (err, result) {
        if (err) {
          console.log("insertIntoDiscussionsDB", "err", err);
        } else {
          Meteor.myFunctions.loadMessagePage(user2Pseudo);
        }
      });
      Meteor.myFunctions.enterMessage(discussion);
    } else {
      var object;
      var discussionArray;
      if(!Discussions.findOne({$and : [{user1 : user2Pseudo}, {user2: userPseudo}]})) {
        object = Discussions.findOne({$and: [{user1 : userPseudo}, {user2: user2Pseudo}]});
        discussionArray = object.discussion;
        discussionArray.push(discussion[0]);

        Meteor.call("updateDiscussionsDB", object._id, discussionArray, function (err, result) {
          if (err) {
            console.log("updateDiscussionsDB", "err", err);
          } else {
            Meteor.myFunctions.loadMessagePage(user2Pseudo);
          }
        });
      } else {
        object = Discussions.findOne({$and: [{user1 : user2Pseudo}, {user2: userPseudo}]});
        discussionArray = object.discussion;
        discussionArray.push(discussion[0]);
        Meteor.call("updateDiscussionsDB", object._id, discussionArray, function (err, result) {
          if (err) {
            console.log("updateDiscussionsDB", "err", err);
          } else {
            Meteor.myFunctions.loadMessagePage(user2Pseudo);
          }
        });
      }
    }
  }
};
