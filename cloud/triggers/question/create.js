Parse.Cloud.beforeSave("Question", function(request, response) {
    console.log("beforeSave");
    console.log(request);
    if (request.object.existed() === false){
        request.object.set("votedNo", 0);
        request.object.set("votedYes", 0);
        request.object.set("voters", 0);
    } 
});