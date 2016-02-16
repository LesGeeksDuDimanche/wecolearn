Meteor.publish("profil", function () {
  return Profil.find();
});
Meteor.publish("discussions", function () {
  return Discussions.find();
});
