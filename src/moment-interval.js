var moment = require('moment');
require('./moment-duration');

(function (moment) {
  var iso8601 = '^P(?:([0-9]+W)|([0-9]+Y)?([0-9]+M)?([0-9]+D)?(?:T([0-9]+H)?([0-9]+M)?([0-9]+S)?([0-9]+Z)?)?)$';
  var params = ['weeks', 'years', 'months', 'days', 'hours', 'minutes', 'seconds', 'milliseconds'];

  moment.interval = function (first, second) {
    if (second === undefined) {
      // treat as a single duration string
      var isoString = first.split('/');
      if (isoString.length < 2) {
        throw Error('Not an ISO 8601 interval string: "' + isoString + '"');
      }

      var start = isoString[0].match(iso8601) ? moment.duration.fromISO(isoString[0]) : moment(isoString[0]);
      var end = isoString[1].match(iso8601) ? moment.duration.fromISO(isoString[1]) : moment(isoString[1]);

      if (moment.isDuration(start) && moment.isDuration(end)) {
        throw Error('Invalid format; both interval parts are durations: "' + isoString + '"');
      }

      return {
        start: function () {
          return moment.isDuration(start) ? moment(end).subtract(start) : start;
        },
        end: function () {
          return moment.isDuration(end) ? moment(start).add(end) : end;
        },
        diff: function () {
          return this.start().diff.apply(this.start(), arguments.unshift(this.end));
        }
      };
    }
    else {
      return {
        start: function () {
          return moment(start);
        },
        end: function () {
          return moment(end);
        },
        diff: function () {
          return this.start().diff.apply(this.start(), arguments.unshift(this.end));
        }
      }
    }
  };
}(moment));