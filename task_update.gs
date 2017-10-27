function updateTask(channel_name, user_name, input) {
  var parts = input.split("#");
  if (parts.length == 2) {
    var spreadsheet_id = PropertiesService.getScriptProperties().getProperty('SPREAD_SHEET_ID');
    var sheets = SpreadsheetApp.openById(spreadsheet_id);
    var todoSheet = sheets.getSheetByName('todo');
    var lastRow = todoSheet.getLastRow();
    var a1Notation = 'A2:J' + lastRow.toString();
    var taskRange = todoSheet.getRange(a1Notation);
    var taskLen = taskRange.getNumRows();
    
    if (!isNaN(parts[0])) {
      var inputId = parseInt(parts[0]);
      var i;
      for (i = 1; i <= taskLen; i++) {
        var id = parseInt(taskRange.getCell(i,1).getValue());
        if (id == inputId) break;
      }
      if (i <= taskLen) {
        var status = ["Active", "Done", "Cancel"];
        if (status.indexOf(parts[1]) != -1) {
          var currentTime = moment().format("YYYY/MM/DD HH:mm:ss");
          taskRange.getCell(i,5).setValue(user_name);
          taskRange.getCell(i,6).setValue(currentTime);
          taskRange.getCell(i,10).setValue(parts[1]);
          postSimpleMessage(channel_name, ":tada: *Đã cập nhật trạng thái của task thành công* :tada:");
        } else {
          postSimpleMessage(channel_name, ":rage: *Trạng thái đã nhập không hợp lệ*\n _Gõ [ /todo help ] để xem hướng dẫn._");
        }
      }
      else {
        postSimpleMessage(channel_name, ":rage: *ID đã nhập không tồn tại*\n _Gõ [ /todo help ] để xem hướng dẫn._");
      }
    } else {
      postSimpleMessage(channel_name, ":rage: *ID đã nhập không phải số*\n _Gõ [ /todo help ] để xem hướng dẫn._");
    }
  }
  else {
    postSimpleMessage(channel_name, ":rage: *Cú pháp câu lệnh không hợp lệ*\n _Gõ [ /todo help ] để xem hướng dẫn._");
  }
}
