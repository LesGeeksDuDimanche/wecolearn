Meteor.profileFunctions = {

    getGeolocalizationFromCity : function (city) {


      var APIRequest = "http://nominatim.openstreetmap.org/search?q="+city+"+fr&format=json";
      Meteor.call('ASyncAjaxRequest', APIRequest, function(err, response){
        console.log("getGeolocalizationFromCity call");
                if (err) {
                  console.log(err);
                } else {
                  console.log(response);
                  var results = {"latitude" : Number(response.data[0].lat),
                                 "longitude" : Number(response.data[0].lon)};
                  // results = JSON.stringify(results);
                  console.log(results);
                  Session.set("geolocationFromCityResults", results);
                  return results;
                }
      });
      setTimeout(function(){
        console.log("getGeolocalizationFromCityTimeOut", Session.get("geolocationFromCityResults"));
        return Meteor.myFunctions.localizationProfilEdit(Session.get("geolocationFromCityResults"));
      }, 800);
    }
};
