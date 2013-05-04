var moment = require('moment');

(function (moment) {
  var iso8601 = '^P(?:([0-9]+W)|([0-9]+Y)?([0-9]+M)?([0-9]+D)?(?:T([0-9]+H)?([0-9]+M)?([0-9]+S)?([0-9]+Z)?)?)$';
  var params = ['weeks', 'years', 'months', 'days', 'hours', 'minutes', 'seconds', 'milliseconds'];

  moment.duration.fromISO = function (text) {
    var matches = text.match(iso8601);
    var values = {};

    matches.slice(1).forEach(function (match, i) {
      if (match !== undefined) {
        values[params[i]] = parseInt(match.slice(0, -1), 10);
      }
    });

    return moment.duration(values);
  };

  moment.duration.toISO = function (duration) {
    function append(number, suffix) {
      return number > 0 ? (number + suffix) : '';
    }

    return 'P' +
        append(duration.weeks(), 'W') +
        append(duration.years(), 'Y') +
        append(duration.months(), 'M') +
        append(duration.days(), 'D') +
        ((duration.hours() + duration.minutes() + duration.seconds() + duration.milliseconds() > 0) ? 'T' : '') +
        append(duration.hours(), 'H') +
        append(duration.minutes(), 'M') +
        append(duration.seconds(), 'S') +
        append(duration.milliseconds(), 'Z');
  };
}(moment));