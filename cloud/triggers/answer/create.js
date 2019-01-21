Parse.Cloud.afterSave("Answer", function(request) {
    console.log('*** Cloud afteresave\'s request = ', request);
    var user = request.user;
    console.log(user);

    const query = new Parse.Query("Question");
    query.get(request.object.get("question").id)
        .then(function(question) {
            question.increment("voters", 1);
            if(request.object.get("answer") == "1"){
                question.increment("voted1", 1);
            }
            if(request.object.get("answer") == "0"){
                question.increment("voted0", 1);
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

    Parse.Push.send({
        channels: ['wudju-team'],
        data: {
            alert: 'Neue Antwort',
            badge: 1,
            sound: 'default'
        }
    }, {useMasterKey: true}).then(() => {
        console.log('Push ok');
    }, (e) =>{
        console.log('Push error: ', e);
    });

    var profileTable = Parse.Object.extend("Profile")
    var qProfile = new Parse.Query(profileTable);
    qProfile.select("gender", "birthyear", "marital", "children", "zip", "branch", "school", "income");
    qProfile.equalTo("user", user);

    qProfile.first().then(function(results) {
        profileDataJson = results.toJSON();

        console.log(profileDataJson);
        console.log(profileDataJson['gender']);

        request.object.set("gender", (profileDataJson['gender'] ? profileDataJson['gender'] : "NA"));
        request.object.set("birthyear", (profileDataJson['birthyear'] ? profileDataJson['birthyear'] : "NA"));
        request.object.set("marital", (profileDataJson['marital'] ? profileDataJson['marital'] : "NA"));
        request.object.set("children", (profileDataJson['children'] ? profileDataJson['children'] : "NA"));
        request.object.set("zip", (profileDataJson['zip'] ? profileDataJson['zip'] : "NA"));
        request.object.set("branch", (profileDataJson['branch'] ? profileDataJson['branch'] : "NA"));
        request.object.set("school", (profileDataJson['school'] ? profileDataJson['school'] : "NA"));
        request.object.set("income", (profileDataJson['income'] ? profileDataJson['income'] : "NA"));

        console.log(request.object);
    });

});
