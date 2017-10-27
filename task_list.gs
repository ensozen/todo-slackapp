function postTaskList(channel_name) {
  var spreadsheet_id = PropertiesService.getScriptProperties().getProperty('SPREAD_SHEET_ID');
  var dueTimeIcon = PropertiesService.getScriptProperties().getProperty('DUE_TIME_ICON_LINK');
  var sheets = SpreadsheetApp.openById(spreadsheet_id);
  var todoSheet = sheets.getSheetByName('todo');
  var lastRow = todoSheet.getLastRow();
  var a1Notation = 'A2:J' + lastRow.toString();
  var taskRange = todoSheet.getRange(a1Notation);
  var taskLen = taskRange.getNumRows();
  var taskList = [];
  for (var i = 1; i <= taskLen; i++) {
    var status = taskRange.getCell(i,10).getValue();
    if (status != "Active") continue;
    
    var task = {};
    task["fallback"] = "";
    task["color"] = "#36a64f";
    task["mrkdwn_in"] = ["text", "pretext"];
    var id = taskRange.getCell(i,1).getValue();
    var taskContent = taskRange.getCell(i,7).getValue();
    var dueTime = taskRange.getCell(i,3).getValue();
    var participant = taskRange.getCell(i,8).getValue();
    var remainTime = moment(dueTime).diff(moment(), "days");
    var note = taskRange.getCell(i,9).getValue();
    if (taskContent && id) task["pretext"] = ":boom: `" + taskContent + "` [ID: " + id + "] (Còn lại: " + remainTime + " ngày)";
    if (participant) {
      var members = getUserList();
      var re = /\s*,\s*/;
      task["title"] = "Người thực hiện: ";
      var nameList = participant.split(re);
      for (var j = 0; j < nameList.length; j++) {
        var id = findUserID(members, nameList[j]);
        if (id) task["title"] += ("<@" + id + ">");
        else task["title"] += nameList[j];
        if (j < nameList.length - 1) task["title"] += ", ";
      }
    }
    if (note) task["text"] = "_ Note: " + note + " _";
    if (dueTime) {
      var ts = moment(dueTime, "YYYY/MM/DD HH:mm:ss").unix();
      task["footer"] = "Hạn thực hiện";
      task["footer_icon"] = dueTimeIcon;
      task["ts"] = ts;
    }
    taskList.push(task);
  }
   
  if (taskList.length > 0) postMessageWithAttachments(channel_name, taskList);
  else postSimpleMessage(channel_name, ":yum: *May quá, không có task nào cả* :yum:");
}

function postTaskListToChannelTodo() {
  postTaskList("todo");
}
