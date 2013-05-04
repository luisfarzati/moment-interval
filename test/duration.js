var moment = require('moment');

function assertDuration(test, duration, params) {
  var m = moment.duration(params);
  test.equal(duration.asMilliseconds(), m.asMilliseconds());
  test.equal(duration.asSeconds(), m.asSeconds());
  test.equal(duration.asMinutes(), m.asMinutes());
  test.equal(duration.asHours(), m.asHours());
  test.equal(duration.asDays(), m.asDays());
  test.equal(duration.asWeeks(), m.asWeeks());
  test.equal(duration.asMonths(), m.asMonths());
  test.equal(duration.asYears(), m.asYears());
}

exports.duration = {
  'parse years': function (test) {
    assertDuration(test, moment.duration.fromISO('P1Y'), {years: 1});
    assertDuration(test, moment.duration.fromISO('P2Y'), {years: 2});
    test.done();
  },

  'parse months': function (test) {
    assertDuration(test, moment.duration.fromISO('P1M'), {months: 1});
    assertDuration(test, moment.duration.fromISO('P12M'), {months: 12});
    assertDuration(test, moment.duration.fromISO('P36M'), {months: 36});
    test.done();
  },

  'parse weeks': function (test) {
    assertDuration(test, moment.duration.fromISO('P1W'), {weeks: 1});
    assertDuration(test, moment.duration.fromISO('P4W'), {weeks: 4});
    assertDuration(test, moment.duration.fromISO('P8W'), {weeks: 8});
    test.done();
  },

  'parse days': function (test) {
    assertDuration(test, moment.duration.fromISO('P1D'), {days: 1});
    assertDuration(test, moment.duration.fromISO('P31D'), {days: 31});
    assertDuration(test, moment.duration.fromISO('P50D'), {days: 50});
    test.done();
  },

  'parse hours': function (test) {
    assertDuration(test, moment.duration.fromISO('PT1H'), {hours: 1});
    assertDuration(test, moment.duration.fromISO('PT24H'), {hours: 24});
    assertDuration(test, moment.duration.fromISO('PT36H'), {hours: 36});
    test.done();
  },

  'parse minutes': function (test) {
    assertDuration(test, moment.duration.fromISO('PT1M'), {minutes: 1});
    assertDuration(test, moment.duration.fromISO('PT60M'), {minutes: 60});
    assertDuration(test, moment.duration.fromISO('PT90M'), {minutes: 90});
    test.done();
  },

  'parse seconds': function (test) {
    assertDuration(test, moment.duration.fromISO('PT1S'), {seconds: 1});
    assertDuration(test, moment.duration.fromISO('PT60S'), {seconds: 60});
    assertDuration(test, moment.duration.fromISO('PT90S'), {seconds: 90});
    test.done();
  },

  'parse milliseconds': function (test) {
    assertDuration(test, moment.duration.fromISO('PT1Z'), {milliseconds: 1});
    assertDuration(test, moment.duration.fromISO('PT1000Z'), {milliseconds: 1000});
    assertDuration(test, moment.duration.fromISO('PT2000Z'), {milliseconds: 2000});
    test.done();
  },

  'parse combined dates': function (test) {
    assertDuration(test, moment.duration.fromISO('P1Y2M'), {years: 1, months: 2});
    assertDuration(test, moment.duration.fromISO('P2M3D'), {months: 2, days: 3});
    assertDuration(test, moment.duration.fromISO('P1Y3D'), {years: 1, days: 3});
    test.done();
  },

  'parse combined times': function (test) {
    assertDuration(test, moment.duration.fromISO('PT1H2M'), {hours: 1, minutes: 2});
    assertDuration(test, moment.duration.fromISO('PT1H3S'), {hours: 1, seconds: 3});
    assertDuration(test, moment.duration.fromISO('PT1H4Z'), {hours: 1, milliseconds: 4});
    assertDuration(test, moment.duration.fromISO('PT2M3S'), {minutes: 2, seconds: 3});
    assertDuration(test, moment.duration.fromISO('PT3S4Z'), {seconds: 3, milliseconds: 4});
    assertDuration(test, moment.duration.fromISO('PT1H2M3S4Z'), {hours: 1, minutes: 2, seconds: 3, milliseconds: 4});
    test.done();
  },

  'parse combined date-time': function (test) {
    assertDuration(test, moment.duration.fromISO('P1Y2M3DT4H5M6S7Z'), {years: 1, months: 2, days: 3, hours: 4, minutes: 5, seconds: 6, milliseconds: 7});
    test.done();
  },

  'to iso 8601 string': function (test) {
    test.equal(moment.duration.toISO(moment.duration({years: 1})), 'P1Y');
    test.equal(moment.duration.toISO(moment.duration({months: 1})), 'P1M');
    test.equal(moment.duration.toISO(moment.duration({days: 1})), 'P1D');
    test.equal(moment.duration.toISO(moment.duration({hours: 1})), 'PT1H');
    test.equal(moment.duration.toISO(moment.duration({minutes: 1})), 'PT1M');
    test.equal(moment.duration.toISO(moment.duration({seconds: 1})), 'PT1S');
    test.equal(moment.duration.toISO(moment.duration({milliseconds: 1})), 'PT1Z');
    test.done();
  }
};