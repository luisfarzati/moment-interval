var moment = require("moment");
require("../../src/moment-interval");

exports.duration = {
    "moment.duration(String)" : function (test) {
        test.expect(8);
        test.equal(+moment.duration('P1D'), +moment.duration(1, 'day'), "P1D");
        test.equal(+moment.duration('P1W'), +moment.duration(1, 'week'), "P1W");
        test.equal(+moment.duration('P1M'), +moment.duration(1, 'month'), "P1M");
        test.equal(+moment.duration('P1Y'), +moment.duration(1, 'year'), "P1Y");
        test.equal(+moment.duration('PT1S'), +moment.duration(1, 'second'), "PT1S");
        test.equal(+moment.duration('PT1M'), +moment.duration(1, 'minute'), "PT1M");
        test.equal(+moment.duration('PT1H'), +moment.duration(1, 'hour'), "PT1H");
        test.equal(+moment.duration('P1Y1M1DT1H1M1.001S'), +moment.duration({days:1,months:1,years:1,hours:1,minutes:1,seconds:1,milliseconds:1}), "PT1S");
        test.done();
    },

    "duration.toISOString()" : function (test) {
        test.expect(9);
        test.equal(moment.duration(1, 'day').toISOString(), "P1D", "1 day to ISO string");
        test.equal(moment.duration(1, 'week').toISOString(), "P1W", "1 week to ISO string");
        test.equal(moment.duration(1, 'month').toISOString(), "P1M", "1 month to ISO string");
        test.equal(moment.duration(1, 'year').toISOString(), "P1Y", "1 year to ISO string");
        test.equal(moment.duration(1, 'millisecond').toISOString(), "PT0.001S", "1 millisecond to ISO string");
        test.equal(moment.duration(1, 'second').toISOString(), "PT1S", "1 second to ISO string");
        test.equal(moment.duration(1, 'minute').toISOString(), "PT1M", "1 minute to ISO string");
        test.equal(moment.duration(1, 'hour').toISOString(), "PT1H", "1 hour to ISO string");
        test.equal(moment.duration({days:1,months:1,years:1,hours:1,minutes:1,seconds:1,milliseconds:1}).toISOString(), "P1Y1M1DT1H1M1.001S", "all together now");
        test.done();
    }
};

exports.create = {
    "moment.interval(String)" : function (test) {
        var start = '2010-01-14T15:25:50+00:00',
            end = '2010-01-21T15:25:50+00:00',
            mstart = moment(start),
            mend = moment(end),
            period = moment.duration(mend.diff(mstart));

        test.expect(9);

        var startEnd = start + '/' + end;
        test.equal(+moment.interval(startEnd).start(), +mstart, "start() moment with start/end");
        test.equal(+moment.interval(startEnd).end(), +mend, "end() moment with start/end");
        test.equal(+moment.interval(startEnd).period(), +period, "period() duration with start/end");

        var startPeriod = start + '/P1W';
        test.equal(+moment.interval(startPeriod).start(), +mstart, "start() moment with start/period");
        test.equal(+moment.interval(startPeriod).end(), +mend, "end() moment with start/period");
        test.equal(+moment.interval(startPeriod).period(), +period, "period() duration with start/period");

        var periodEnd = 'P1W/' + end;
        test.equal(+moment.interval(periodEnd).start(), +mstart, "start() moment with period/end");
        test.equal(+moment.interval(periodEnd).end(), +mend, "end() moment with period/end");
        test.equal(+moment.interval(periodEnd).period(), +period, "period() duration with period/end");

        test.done();
    },

    "moment.interval(Moment, Moment)" : function (test) {
        var start = '2010-01-14T15:25:50+00:00',
            end = '2010-01-21T15:25:50+00:00',
            mstart = moment(start),
            mend = moment(end),
            period = moment.duration(mend.diff(mstart));

        test.expect(3);
        test.equal(+moment.interval(mstart, mend).start(), +mstart, "start() moment with moment/moment");
        test.equal(+moment.interval(mstart, mend).end(), +mend, "end() moment with moment/moment");
        test.equal(+moment.interval(mstart, mend).period(), +period, "period() duration with moment/moment");
        test.done();
    },

    "moment.interval(Moment, Duration)" : function (test) {
        var start = '2010-01-14T15:25:50+00:00',
            end = '2010-01-21T15:25:50+00:00',
            mstart = moment(start),
            mend = moment(end),
            period = moment.duration(mend.diff(mstart));

        test.expect(3);
        test.equal(+moment.interval(mstart, period).start(), +mstart, "start() moment with moment/duration");
        test.equal(+moment.interval(mstart, period).end(), +mend, "end() moment with moment/duration");
        test.equal(+moment.interval(mstart, period).period(), +period, "period() duration with moment/duration");
        test.done();
    },

    "moment.interval(Duration, Moment)" : function (test) {
        var start = '2010-01-14T15:25:50+00:00',
            end = '2010-01-21T15:25:50+00:00',
            mstart = moment(start),
            mend = moment(end),
            period = moment.duration(mend.diff(mstart));

        test.expect(3);
        test.equal(+moment.interval(period, mend).start(), +mstart, "start() moment with duration/moment");
        test.equal(+moment.interval(period, mend).end(), +mend, "end() moment with duration/moment");
        test.equal(+moment.interval(period, mend).period(), +period, "period() duration with duration/moment");
        test.done();
    },

    "moment().interval(String)" : function (test) {
        var start = '2010-01-14T15:25:50+00:00',
            end = '2010-01-21T15:25:50+00:00',
            mstart = moment(start),
            mend = moment(end),
            period = moment.duration(mend.diff(mstart));

        test.expect(12);
        test.equal(+mstart.interval('/'+end).start(), +mstart, "start() moment with moment()/moment");
        test.equal(+mstart.interval('/'+end).end(), +mend, "end() moment with moment()/moment");
        test.equal(+mstart.interval('/'+end).period(), +period, "period() duration with moment()/moment");
        test.equal(+mstart.interval('/P1W').start(), +mstart, "start() moment with moment()/period");
        test.equal(+mstart.interval('/P1W').end(), +mend, "end() moment with moment()/period");
        test.equal(+mstart.interval('/P1W').period(), +period, "period() duration with moment()/period");
        test.equal(+mend.interval(start+'/').start(), +mstart, "start() moment with moment/moment()");
        test.equal(+mend.interval(start+'/').end(), +mend, "end() moment with moment/moment()");
        test.equal(+mend.interval(start+'/').period(), +period, "period() duration with moment/moment()");
        test.equal(+mend.interval('P1W/').start(), +mstart, "start() moment with period/moment()");
        test.equal(+mend.interval('P1W/').end(), +mend, "end() moment with period/moment()");
        test.equal(+mend.interval('P1W/').period(), +period, "period() duration with period/moment()");
        test.done();
    },

    "moment().interval(Moment)" : function (test) {
        var start = '2010-01-14T15:25:50+00:00',
            end = '2010-01-21T15:25:50+00:00',
            mstart = moment(start),
            mend = moment(end),
            period = moment.duration(mend.diff(mstart));

        test.expect(6);
        test.equal(+mstart.interval(mend).start(), +mstart);
        test.equal(+mstart.interval(mend).end(), +mend);
        test.equal(+mstart.interval(mend).period(), +period);
        test.equal(+mend.interval(mstart).start(), +mstart);
        test.equal(+mend.interval(mstart).end(), +mend);
        test.equal(+mend.interval(mstart).period(), +period);
        test.done();
    },

    "moment().interval(Duration)" : function (test) {
        var start = '2010-01-14T15:25:50+00:00',
            end = '2010-01-21T15:25:50+00:00',
            mstart = moment(start),
            mend = moment(end),
            period = moment.duration(mend.diff(mstart));

        test.expect(6);
        test.equal(+mstart.interval(period).start(), +mstart);
        test.equal(+mstart.interval(period).end(), +mend);
        test.equal(+mstart.interval(period).period(), +period);
        test.equal(+mend.interval(moment.duration(-period)).start(), +mstart);
        test.equal(+mend.interval(moment.duration(-period)).end(), +mend);
        test.equal(+mend.interval(moment.duration(-period)).period(), +period);
        test.done();
    },

    "duration().since(Moment)" : function (test) {
        var start = '2010-01-14T15:25:50+00:00',
            end = '2010-01-21T15:25:50+00:00',
            mstart = moment(start),
            mend = moment(end),
            period = moment.duration(mend.diff(mstart));

        test.expect(3);
        test.equal(+period.since(mstart).start(), +mstart);
        test.equal(+period.since(mstart).end(), +mend);
        test.equal(+period.since(mstart).period(), +period);
        test.done();
    },

    "duration().until(Moment)" : function (test) {
        var start = '2010-01-14T15:25:50+00:00',
            end = '2010-01-21T15:25:50+00:00',
            mstart = moment(start),
            mend = moment(end),
            period = moment.duration(mend.diff(mstart));

        test.expect(3);
        test.equal(+period.until(mend).start(), +mstart);
        test.equal(+period.until(mend).end(), +mend);
        test.equal(+period.until(mend).period(), +period);
        test.done();
    }
};