
class DateFormatter {

  static getFormattedDate(date: Date) {
    if (date) {
      var year = date.getFullYear();
    
      var month = (1 + date.getMonth()).toString();
      month = month.length > 1 ? month : '0' + month;
    
      var day = date.getDate().toString();
      day = day.length > 1 ? day : '0' + day;
      
      return day + '/' + month + '/' + year;
    }
    return '';
  }

  static getFormattedDateInput(date: Date) {
    if (date) {
      var year = date.getFullYear();
    
      var month = (1 + date.getMonth()).toString();
      month = month.length > 1 ? month : '0' + month;
    
      var day = date.getDate().toString();
      day = day.length > 1 ? day : '0' + day;
      
      return `${year}-${month}-${day}`;
    }
    return '';
  }
}
export default DateFormatter;