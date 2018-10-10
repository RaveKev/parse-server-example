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
    qProfile.select("gender", "birthyear", "marital", "children", "zip", "branch", "school", "income");
    qProfile.equalTo("user", user);

    qProfile.first().then(function(results) {
        profileData = Parse.Object.fromJSON(results);
        request.object.set("gender", profileData.gender);
        request.object.set("birthyear", profileData.birthyear);
        request.object.set("marital", profileData.marital);
        request.object.set("children", profileData.children);
        request.object.set("zip", profileData.zip);
        request.object.set("branch", profileData.branch);
        request.object.set("school", profileData.school);
        request.object.set("income", profileData.income);
    });

});
