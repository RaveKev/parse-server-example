Parse.Cloud.afterSave(Parse.User, function(request) {
    console.log("Parse.Cloud.afterSave: ");
    request.log.info("Parse.Cloud.afterSave: "); // For back4app user

    console.log(request.object);
    if (request.object.existed() === false) {
        var Profile = Parse.Object.extend("Profile");
        var qProfile = new Profile();
        qProfile.set("user", request.object.id);
        qProfile.save();
    }
});