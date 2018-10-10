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
    var userQuery = new Parse.Query(Parse.User);
    userQuery.select("gender", "branch", "birthyear", "zip", "school", "marital", "children");
    userQuery.equalTo("objectId", user.id);

    userQuery.first().then(function(results) {
        // each of results will only have the selected fields available.
        console.log("userQuery: ");
        console.log(results);
    });

});
