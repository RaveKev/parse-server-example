Parse.Cloud.define("subscribeToChannel", function(request, response) {
  var channelName = request.params.channel;
  var userId = request.user.id;

  console.log("*** SubscribeToChannel ***")
  console.log("channelName: ", channelName);
  console.log("userId: ", userId);

  if (!channelName) {
    response.error("Missing parameter: channel")
    return;
  }

  if (!userId) {
    response.error("Missing parameter: userId")
    return;
  }

  // Create a Pointer to this user based on their object id
  var user = new Parse.User();
  user.id = userId;

  // A user might have more than one Installation
  var query = new Parse.Query(Parse.Installation);
  query.equalTo("user", user); // Match Installations with a pointer to this User
  query.find({ 
    useMasterKey: true,
    success: function(installations) {
      for (var i = 0; i < installations.length; ++i) {
        // Add the channel to all the installations for this user
        installations[i].addUnique("channels", channel);
      }

      // Save all the installations
      Parse.Object.saveAll(installations, { 
        useMasterKey: true,
        success: function(installations) {
          // All the installations were saved.
          response.success("All the installations were updated with this channel.");
        },
        error: function(error) {
          // An error occurred while saving one of the objects.
          console.error(error);
          response.error("An error occurred while updating this user's installations.")
        },
      });
    },
    error: function(error) {
      console.error(error);
      response.error("An error occurred while looking up this user's installations.")
    }
  });
});