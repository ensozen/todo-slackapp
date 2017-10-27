function createTimeDrivenTriggers() {
  // Trigger 07:00 -> 08:00.
  ScriptApp.newTrigger('postTaskListToChannelTodo')
      .timeBased()
      .everyDays(1)
      .inTimezone("Asia/Ho_Chi_Minh")
      .atHour(7)
      .create();
  
  // Trigger 16:00 -> 17:00.
  ScriptApp.newTrigger('postTaskListToChannelTodo')
      .timeBased()
      .everyDays(1)
      .inTimezone("Asia/Ho_Chi_Minh")
      .atHour(16)
      .create();
}
