Parse.Cloud.beforeSave("Question", function(request, response) {
    console.log("beforeSave");
    console.log(request);
    if (request.object.existed() === false){
        request.object.set("voted0", 0);
        request.object.set("voted1", 0);
        request.object.set("voters", 0);
        request.object.set("value0", "Nein");
        request.object.set("value1", "Ja");
    }
});