/**
  fucntion transform date in string format to relative diferrence between given datetime and
  current datetime
  for example given datetime =2020-06-15T06:28:15.677Z
              current datetime =  2020-06-15T08:28:15.677Z
              return 'two hours ago'
 * @param {String} date in string format
 * @returns {String} time in string format
 */
var transformtimestamp = function(date){

    var timeNow = Date.now();

    var postedDate = new Date(date.replace('T', ' '));

    postedDate = Date.parse(postedDate);

    var diff = timeNow - postedDate;

    var res = Math.round(diff/(1000*60*60*24));

    console.log(res)

    if (res < 1) {
        return "Posted today";
    } else if (res == 1) {
        return "Posted yesterday";
    } else if (1 < res && res < 31) {
        return "Posted " + res + " days ago";
    } else if (res > 32) {
        return "Posted " + Math.round(res/30) + " months ago";
    }

}

var date = '2020-6-15T06:28:15.677Z';

var res = transformtimestamp(date);
console.log(transformtimestamp(date))

