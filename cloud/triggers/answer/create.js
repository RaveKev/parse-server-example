Parse.Cloud.afterSave("Answer", function(request) {
  const query = new Parse.Query("Question");
  query.get(request.object.get("question").id)
    .then(function(question) {
        question.increment("voters");
        if(request.object.get("answer") == "Y"){
            question.increment("votedYes");
        }
        if(request.object.get("answer") == "N"){
            question.increment("votedNo");
        }
      
      return question.save(null, {useMasterKey:true});
    })
    .catch(function(error) {
      console.error("Got an error " + error.code + " : " + error.message);
    });
});