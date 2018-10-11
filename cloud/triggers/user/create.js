/*Parse.Cloud.beforeSave(Parse.User, function(request, response) {
    if (request.object.get("profile") == null) {
        request.object.fetch().then(function(user){
            var Profile = Parse.Object.extend("Profile");
            var profile = new Profile();
            return profile.save();
        }).then(function(profile) {
            request.object.set("profile", profile);
            response.success();
        });
    }
    else {
        response.success();
    }
});
*/
Parse.Cloud.afterSave(Parse.User, function(request) {
    console.log("Parse.Cloud.afterSave: ");
    request.log.info("Parse.Cloud.afterSave: "); // For back4app user
    console.log(request);

    console.log(request.object);

    if (request.object.existed() === false) {
        var Profile = Parse.Object.extend("Profile");
        var qProfile = new Profile();
        qProfile.set("user", request.object);
        qProfile.save();
    }

    var Question = Parse.Object.extend("Question");
    var qQuestion = new Parse.Query(Question);
    qQuestion.limit(200);

    qQuestion.find().then(function (questions) {
        questions.forEach(function(q) {
            q.set("voted0", q.get("votedNo"));
            q.set("voted1", q.get("votedYes"));
            q.set("value0", "Nein");
            q.set("value1", "Ja");
            q.save();
        });
    });

});