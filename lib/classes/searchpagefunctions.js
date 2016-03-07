Meteor.searchPageFunctions = {

   distance : function (lon1, lat1, lon2, lat2) {

      var R = 6371; // Radius of the earth in km
      var dLat = (lat2-lat1)* Math.PI / 180;  // Javascript functions in radians
      var dLon = (lon2-lon1)* Math.PI / 180;
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1* Math.PI / 180) * Math.cos(lat2* Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c; // Distance in km
      return d;

    },

    setDistance: function() {

      console.log("setDistance",Session.get("currentProfil"));
      var localizationProfil = Session.get("currentProfil").localization.localization;
      console.log(localizationProfil);
      var lon1 = localizationProfil.longitude;
      var lat1 = localizationProfil.latitude;
      // var User = Session.get("currentUser");
      // console.log(User);
      var localizationUser = Profil.findOne({userId: Meteor.userId()}).localization.localization;
      console.log(localizationUser);
      var lon2 = localizationUser.longitude;
      var lat2 = localizationUser.latitude;
      Session.set("distance",this.distance(lon1, lat1, lon2, lat2).toFixed(0));
    }









};
