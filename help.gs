function help(params) {
  var helpText = "```\n=============================\n";
  helpText += "/todo [action] [input]\n";
  helpText += "=============================\n";
  helpText += " -> action: list | add | update | delete | help\n";
  helpText += "=============================\n";
  helpText += " -> action: list\n";
  helpText += "   -> input: None\n";
  helpText += "   -> Ex: /todo list\n";
  helpText += "=============================\n";
  helpText += " -> action: add\n";
  helpText += "   -> input: [Task]#[Participants]#[Deadline]#[Note]\n";
  helpText += "   -> Ex: /todo add Viết blog tháng 11#enso, superlinh#2017/12/12#https://goo.gl/MHyYWe\n";
  helpText += "   ->     /todo add Làm benkyokai tháng 11#kyo#2017/12/12 15:30\n";
  helpText += "=============================\n";
  helpText += " -> action: update\n";
  helpText += "   -> input: [Task_ID]#[Active | Done | Cancel]\n";
  helpText += "   -> Ex: /todo update 5#Done\n";
  helpText += "   ->     /todo update 20#Cancel\n";
  helpText += "=============================\n";
  helpText += " -> action: delete\n";
  helpText += "   -> input: [Task_ID]\n";
  helpText += "   -> Ex: /todo delete 20\n";
  helpText += "=============================\n";
  helpText += " -> action: help\n";
  helpText += "   -> input: None\n";
  helpText += "   -> Ex: /todo help\n";
  helpText += "=============================\n```";
  postSimpleMessage(params.channel_name, helpText);
}

