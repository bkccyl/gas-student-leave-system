function doGet() {
  // 網頁秒開，不再預先載入龐大資料
  const template = HtmlService.createTemplateFromFile('Index');
  const htmlOutput = template.evaluate();
  htmlOutput.setTitle('學生公假單系統');
  htmlOutput.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  return htmlOutput;
}

// 根據輸入的字串 (3碼或5碼) 進行後端快速搜尋
function searchStudent(keyword) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("學生資料");
  if (!sheet) return { error: "找不到「學生資料」工作表" };
  
  const data = sheet.getDataRange().getValues();
  const results = [];
  
  // keyword 可能是 "101" (找全班) 或 "10101" (找單人)
  const isClassSearch = keyword.length === 3;
  const cNum = isClassSearch ? keyword : keyword.substring(0, 3);
  const sNum = isClassSearch ? null : parseInt(keyword.substring(3, 5), 10).toString();
  
  for (let i = 1; i < data.length; i++) {
    const rowClass = data[i][0] ? data[i][0].toString() : "";
    const rowSeat = data[i][1] ? data[i][1].toString() : "";
    const rowName = data[i][2] ? data[i][2].toString() : "";
    
    if (isClassSearch) {
      if (rowClass === cNum) {
        results.push({ classNum: rowClass, seatNum: rowSeat, name: rowName });
      }
    } else {
      if (rowClass === cNum && rowSeat === sNum) {
        results.push({ classNum: rowClass, seatNum: rowSeat, name: rowName });
        break; // 找到單人就提早結束迴圈，加速回傳
      }
    }
  }
  
  return { data: results, isClassSearch: isClassSearch, keyword: keyword };
}

