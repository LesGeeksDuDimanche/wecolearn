

Template.MessagesPage.rendered = function() {

  Meteor.subscribe("profil", function() {
  Meteor.subscribe("discussions", function() {

    Meteor.myFunctions.loadMessagePage();

  } );
  });
};


Template.MessagesPage.events({
    'submit form': function(event){
      event.preventDefault();
      Meteor.myFunctions.clearTagSuggestions('.messageDateDiv');
      Meteor.myFunctions.clearTagSuggestions('.messageDiv');
      var newMessage = $('[name=newMessage]').val();
      var userPseudo = Profil.findOne({userId: Meteor.userId()}).pseudo;
      var user2Pseudo = Session.get("pseudoValue");
      var discussion = [{user: userPseudo, message: newMessage, date: new Date() }];
      console.log(newMessage + userPseudo + user2Pseudo);
      if(!Discussions.findOne({$and: [{user1 : userPseudo}, {user2: user2Pseudo}]}) && !Discussions.findOne({$and : [{user1 : user2Pseudo}, {user2: userPseudo}]}) ) {
        Discussions.insert({
            user1: userPseudo,
            user2: user2Pseudo,
            discussion: discussion,
        });
      Meteor.myFunctions.enterMessage(discussion);
      } else {
        if(!Discussions.findOne({$and : [{user1 : user2Pseudo}, {user2: userPseudo}]})) {
          var object = Discussions.findOne({$and: [{user1 : userPseudo}, {user2: user2Pseudo}]});
          var discussionArray = object.discussion;
          discussionArray.push(discussion[0]);
          Discussions.update(
            {
              _id: object._id
            },
            {
              $set: {
              discussion: discussionArray
              }
            }
          );
          // Meteor.myFunctions.enterMessage((Discussions.findOne({$and: [{user1 : userPseudo}, {user2: user2Pseudo}]})).discussion);

        } else {
          var object = Discussions.findOne({$and: [{user1 : user2Pseudo}, {user2: userPseudo}]});
          var discussionArray = object.discussion;
          discussionArray.push(discussion[0]);
          Discussions.update(
            {
              _id: object._id
            },
            {
              $set: {
              discussion: discussionArray
              }
            }
          );
        // Meteor.myFunctions.enterMessage((Discussions.findOne({$and: [{user1 : user2Pseudo}, {user2: userPseudo}]})).discussion);
        }
      }
        Meteor.myFunctions.loadMessagePage(user2Pseudo);
     }
});
