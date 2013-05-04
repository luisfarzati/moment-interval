(function () {
  var moment = (typeof require === 'undefined') ? this.moment : require('moment');
  if (typeof require !== 'undefined') {
    require('./moment-duration');
  }

  var iso8601 = '^P(?:([0-9]+W)|([0-9]+Y)?([0-9]+M)?([0-9]+D)?(?:T([0-9]+H)?([0-9]+M)?([0-9]+S)?([0-9]+Z)?)?)$';
  var params = ['weeks', 'years', 'months', 'days', 'hours', 'minutes', 'seconds', 'milliseconds'];

  moment.interval = function (first, second) {
    if (second === undefined) {
      // treat as a single duration string
      var isoString = first.split('/');
      if (isoString.length < 2) {
        throw new Error('Not an ISO 8601 interval string: "' + isoString + '"');
      }

      var start = isoString[0].match(iso8601) ? moment.duration.fromISO(isoString[0]) : moment(isoString[0] || undefined);
      var end = isoString[1].match(iso8601) ? moment.duration.fromISO(isoString[1]) : moment(isoString[1] || undefined);

      if (moment.isDuration(start) && moment.isDuration(end)) {
        throw new Error('Invalid format; both interval parts are durations: "' + isoString + '"');
      }

      return {
        start: function () {
          return moment.isDuration(start) ? moment(end).subtract(start) : start;
        },
        end: function () {
          return moment.isDuration(end) ? moment(start).add(end) : end;
        },
        diff: function () {
          [].unshift.call(arguments, this.end());
          return this.start().diff.apply(this.start(), arguments);
        }
      };
    }
    else {
      return {
        start: function () {
          return moment(first);
        },
        end: function () {
          return moment(second);
        },
        diff: function () {
          [].unshift.call(arguments, this.end());
          return this.start().diff.apply(this.start(), arguments);
        }
      };
    }
  };
}(this));