Profil = new Mongo.Collection("profil");
TagDb = new Mongo.Collection("tagDb");
ProfilTags = new Mongo.Collection("profilTags");
Discussions = new Mongo.Collection("discussions");

Profil.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  }
});
