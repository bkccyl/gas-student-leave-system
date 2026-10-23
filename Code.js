function doGet() {
  const template = HtmlService.createTemplateFromFile('Index');
  const htmlOutput = template.evaluate();
  htmlOutput.setTitle('多梯次學生公假單系統');
  htmlOutput.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  return htmlOutput;
}
