Profil = new Mongo.Collection("profil");
TagDb = new Mongo.Collection("tagDb");
ProfilTags = new Mongo.Collection("profilTags");
Discussions = new Mongo.Collection("discussions");
Uploads = new FS.Collection('uploads',{
 stores:[new FS.Store.FileSystem('uploads')]
});

// if local
// Uploads = new FS.Collection('uploads',{
//  stores:[new FS.Store.FileSystem('uploads',{path:'~/Documents/MeteorApp/WeColearn.mapped/WeColearn/projectUploads'})]
// });



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

Uploads.allow({
  insert: function () {
    // add custom authentication code here
    return true;
  },
  update: function () {
         // add custom authentication code here
  return true;
  },
  download: function() {
  return true;
  }
});
