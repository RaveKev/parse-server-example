Parse.Cloud.beforeSave("Question", function(request, response) {
    console.log(request);
    request.object.set("votedNo", 0);
    request.object.set("votedYes", 0);
    request.object.set("voters", 0);
    
    response.success();
});