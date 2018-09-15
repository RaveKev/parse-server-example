Parse.Cloud.afterSave("Answer", function(request) {
    console.log(request.object);
    console.log("Try to edit the answers an voters");

  const query = new Parse.Query("Question");
  query.get(request.object.get("question").id)
    .then(function(question) {
        console.log("found a question!");

        question.increment("voters");
        if(request.object.get("answer") == "Y"){
            question.increment("votedYes");
        }
        if(request.object.get("answer") == "N"){
            question.increment("votedNo");
        }
        
      console.log("after incrementing");
      console.log(question);
      return question.save(null, {useMasterKey:true});
    })
    .catch(function(error) {
      console.error("Got an error " + error.code + " : " + error.message);
    });
});