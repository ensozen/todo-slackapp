function getUserList() {
  var token = PropertiesService.getScriptProperties().getProperty('OAUTH_ACCESS_TOKEN');
  var url = "https://slack.com/api/users.list";
  var options = {
    'method': 'post',
    'payload': {'token': token}
  };
  var response = UrlFetchApp.fetch(url,options);
  var result = JSON.parse(response.getContentText());
  if (result.ok == true) {
    return result.members;
  } else {
    return null;
  }
}

function findUserID(members, name) {
  if (members) {
    for (var i = 0; i < members.length; i++) {
      if (members[i].profile.display_name && members[i].profile.display_name == name) return members[i].id;
      if (members[i].real_name == name) return members[i].id;
    }
  }
  return null;
}
