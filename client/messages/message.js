Template.MessagesPage.rendered = function() {

  $('.contactContainer').show();
  Meteor.subscribe("profil", function() {
    Session.set("currentUser", Profil.findOne({userId: Meteor.userId()}).pseudo);
    Meteor.subscribe("discussions", function() {
      Meteor.myFunctions.loadMessagePage();
    });
  });
};


Template.MessagesPage.events({

  'submit form': function(event){
    event.preventDefault();
    Meteor.myFunctions.clearSuggestions('.messageDateDiv');
    Meteor.myFunctions.clearSuggestions('.messageDiv');
    var newMessage = $('[name=newMessage]').val();
    $('[name=newMessage]').val("");
    var userPseudo = Profil.findOne({userId: Meteor.userId()}).pseudo;
    var user2Pseudo = Session.get("pseudoValue");
    var discussion = [{user: userPseudo, message: newMessage, date: new Date() }];
    console.log(newMessage + userPseudo + user2Pseudo);
    Meteor.messageFunctions.insertMessageInDBAndLoadDiscussion(userPseudo, user2Pseudo, discussion);
  }
});
