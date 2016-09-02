/*
All persistant storage should happen through this wrapper.

This includes localStorage and WebSQL and all that fun stuff.

Watch out becuase localStorage can't accept more than like 5MB or something.
*/

angular.module('ngOpenBadge.services')

.factory('OBSStorage', function() {
  var StorageService = {};
  var projectKey = "projectKey";
  var hubKey = "hubKey";
  var lastMemberUpdateKey = "lastMemberUpdateKey";
  var toUploadKey = "toUploadKey";
  var storage = window.localStorage;


  // PROJECT
  StorageService.cacheProject = function(data) {
    storage.setItem(projectKey, JSON.stringify(data));
  };

  StorageService.retrieveProject = function() {
    return JSON.parse(storage.getItem(projectKey));
  };

  // HUB
  StorageService.cacheHub = function(data) {
    storage.setItem(hubKey, JSON.stringify(data));
  };

  StorageService.retrieveHub = function() {
    return JSON.parse(storage.getItem(hubKey));
  };

  // LAST MEMBER UPDATE
  StorageService.cacheMemberUpdate = function(data) {
    storage.setItem(lastMemberUpdateKey, JSON.stringify(data));
  };

  StorageService.retrieveMemberUpdate = function() {
    return JSON.parse(storage.getItem(lastMemberUpdateKey));
  };


  // store chunks to memory. right now this just puts them in
  //  local storage, in the future should store to WebSQL or something
  StorageService.saveChunks = function (chunks, meetingUUID) {
    var previous = storage.getItem(meetingUUID);
    previous = previous || '[]';
    previous = JSON.parse(previous);

    newChunksToUpload = previous.concat(chunks);
    storage.setItem(meetingUUID, JSON.stringify(newChunksToUpload));


    var toUpload = storage.getItem(toUploadKey);
    toUpload = toUpload || '{}';
    toUpload = JSON.parse(toUpload);

    toUpload[meetingUUID] = true;

    storage.setItem(toUploadKey, JSON.stringify(toUpload));
  };

  return StorageService;
});