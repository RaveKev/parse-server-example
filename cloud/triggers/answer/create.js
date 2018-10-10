Parse.Cloud.afterSave("Answer", function(request) {
    console.log(request.object);
    console.log(request);
    console.log("Try to edit the answers an voters");


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

});
