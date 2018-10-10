Parse.Cloud.afterSave("Answer", function(request) {
    console.log('*** Cloud afteresave\'s request = ', request);
    var user = request.user;
    console.log(user);

    const query = new Parse.Query("Question");
    query.get(request.object.get("question").id)
        .then(function(question) {
            question.increment("voters", 1);
            if(request.object.get("answer") == "Y"){
                question.increment("votedYes", 1);
            }
            if(request.object.get("answer") == "N"){
                question.increment("votedNo", 1);
            }
          return question.save(null, {useMasterKey:true});
        })
        .catch(function(error) {
          console.error("Got an error " + error.code + " : " + error.message);
        });
});

Parse.Cloud.beforeSave("Answer", function(request, response) {
    console.log('*** Cloud beforesave\'s request = ', request);
    var user = request.user;
    console.log(user);

    var profileTable = Parse.Object.extend("Profile")
    var qProfile = new Parse.Query(profileTable);
    qProfile.select("gender", "birthyear");
    qProfile.equalTo("user", user);

    qProfile.first().then(function(results) {
        console.log("in first: ");
        console.log(results);
        console.log(results.toJSON())
        console.log(Parse.Object.fromJSON(results));
        profileData = Parse.Object.fromJSON(results);
        console.log("ProfileData");
        console.log(profileData);
        /*request.object.set("gender", (profileData.gender ? profileData.gender : "NA"));
        request.object.set("birthyear", (profileData.birthyear ? profileData.birthyear : "NA"));
        request.object.set("marital", (profileData.marital ? profileData.marital : "NA"));
        request.object.set("children", (profileData.children ? profileData.children : "NA"));
        request.object.set("zip", (profileData.zip ? profileData.zip : "NA"));
        request.object.set("branch", (profileData.branch ? profileData.branch : "NA"));
        request.object.set("school", (profileData.school ? profileData.school : "NA"));
        request.object.set("income", (profileData.income ? profileData.income : "NA"));

        console.log(request.object);*/
    });

});
