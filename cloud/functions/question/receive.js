Parse.Cloud.define("receiveQuestionOverviewByUser", function(req, res){
    
    var currentUser = req.user;
    var limit = (req.limit === undefined) ? 5 : req.limit;
    
    var Question = Parse.Object.extend("Question");
    var qQuestion = new Parse.Query(Question);
    qQuestion.limit(limit);
    qQuestion.descending("createdAt");
    qQuestion.equalTo("creator", currentUser);
     qQuestion.find()
    .then((results) => {
      res.success(results);
    })
    .catch(() =>  {
      res.error("Failed to read Questions by User");
    });
});