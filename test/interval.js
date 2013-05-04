var moment = require('moment');

exports.interval = {
  'duration/date': function (test) {
    var testStartDate = '2013-05-01T00:00:00.000';
    var testEndDate = '2014-07-04T01:02:03.004';
    var m = moment.interval(testStartDate + '/P1Y2M3DT1H2M3S4Z');
    test.equal(m.start().valueOf(), moment(testStartDate).valueOf());
    test.equal(m.end().valueOf(), moment(testEndDate).valueOf());
    test.done();
  },

  'date/duration': function (test) {
    var testStartDate = '2013-05-01T00:00:00.000';
    var testEndDate = '2014-07-04T01:02:03.004';
    var m = moment.interval('P1Y2M3DT1H2M3S4Z/' + testEndDate);
    test.equal(m.start().valueOf(), moment(testStartDate).valueOf());
    test.equal(m.end().valueOf(), moment(testEndDate).valueOf());
    test.done();
  },

  'date/date': function (test) {
    var testStartDate = '2013-05-01T00:00:00.000';
    var testEndDate = '2014-07-04T01:02:03.004';
    var m = moment.interval(testStartDate + '/' + testEndDate);
    test.equal(m.start().valueOf(), moment(testStartDate).valueOf());
    test.equal(m.end().valueOf(), moment(testEndDate).valueOf());
    test.done();
  }

};