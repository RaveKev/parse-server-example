Parse.Cloud.define("receiveQuestionOverviewByUser", function(req, res){
    
    var currentUser = req.user;
    var limit = (req.limit === undefined) ? 5 : req.limit;
    
    var qQuestion = new Parse.Query("Question");
    /*qQuestion.limit(limit);
    qQuestion.descending("createdAt");
    qQuestion.equalTo("creator", currentUser);
    */

qQuestion.find().then(function(results) {
    res.success(results);
  }, function(error) {
    res.error(error);
  });

});