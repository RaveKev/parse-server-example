Parse.Cloud.define("receiveQuestionOverviewByUser", function(req, response){
    
    var currentUser = req.user;
    var limit = (req.limit === undefined) ? 8 : req.limit;
    
    var qQuestion = new Parse.Query("Question");
    /*qQuestion.limit(limit);
    qQuestion.descending("createdAt");
    qQuestion.equalTo("creator", currentUser);
    */

qQuestion.find().then(function(results) {
    console.log(results);
    response.success(results);
  }, function(error) {
    response.error(error);
  });

});