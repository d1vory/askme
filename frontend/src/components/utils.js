/**
  fucntion transform date in string format to relative diferrence between given datetime and
  current datetime
  for example given datetime =2020-06-15T06:28:15.677Z
              current datetime =  2020-06-15T08:28:15.677Z
              return 'two hours ago'
 * @param {String} date in string format
 * @returns {String} time in string format
 */
const transformtimestamp = function(date){
    //subtract 3 hours to match timezone
    var timeNow = Date.now() - 10800000;

    var postedDate = new Date(date.replace('T', ' '));

    postedDate = Date.parse(postedDate);
    postedDate = postedDate - 3*3600000;

    var diff = timeNow - postedDate;

    var res = Math.round(diff/(1000*60*60*24));

    var minutes = Math.round(diff/(1000*60));
    if(minutes < 1){
      return "Posted just now"
    } else  if (minutes < 60) {
        return "Posted " + minutes + " minutes ago";
    } else if (res < 1) {
        return "Posted " + Math.round(diff/(1000*60*60)) + " hours ago";
    } else if (res === 1) {
        return "Posted yesterday";
    } else if (1 < res && res < 31) {
        return "Posted " + res + " days ago";
    } else if (res > 32 && res < 365) {
        return "Posted " + Math.round(res/30) + " months ago";
    } else if (res/365 > 1){
        return "Posted " + Math.round(res/365) + " years ago";
    }
}

export default transformtimestamp
