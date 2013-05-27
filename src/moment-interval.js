(function () {
  var moment = (typeof require === 'undefined') ? this.moment : require('moment');
  if (typeof require !== 'undefined') {
    require('moment-duration');
  }

  var iso8601 = /^P(?:([0-9]+W)|([0-9]+Y)?([0-9]+M)?([0-9]+D)?(?:T([0-9]+H)?([0-9]+M)?([0-9]+S)?([0-9]+Z)?)?)$/;

  moment.interval = function (first, second) {
    if (second === undefined) {
      // treat as a single duration string
      var isoString = first.split('/');
      if (isoString.length < 2) {
        throw new Error('Not an ISO 8601 interval string: "' + isoString + '"');
      }

      var start = iso8601.test(isoString[0]) ? moment.isoDuration(isoString[0]) : moment(isoString[0] || undefined);
      var end = iso8601.test(isoString[1]) ? moment.isoDuration(isoString[1]) : moment(isoString[1] || undefined);

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
        period: function() {
          return moment.duration(this.end().diff(this.start()));
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
        }
      };
    }
  };
}(this));