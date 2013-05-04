moment-interval
============

ISO 8601 duration and time interval support for [Moment.js][moment].

Examples
--------

### Duration

Parsing an ISO 8601 duration string:

``` javascript
var oneWeek = moment.duration.fromISO('P1W');
var twoDaysThreeHours = moment.duration.fromISO('P2DT3H');
var fourSeconds = moment.duration.fromISO('PT4S');
var allMixed = moment.duration.fromISO('P1Y2M3DT4H5M6S');
```

The ISO spec for durations doesn't define a millisecond unit, but I consider it useful so added it anyway under the `Z` unit.

``` javascript
var twentyMilliseconds = moment.duration.fromISO('PT20Z');
```

There's also a `toISO` helper method to export a duration to the proper string.

``` javascript
var duration = moment.duration(100);
var isoString = moment.duration.toISO(duration); // PT100Z
```

### Time intervals

You can also create time intervals using the following formats:

1. date/duration
3. duration/date
4. date/date

If you leave a blank date (e.g. `P1Y/` or `/P1Y`) it will use the current date.

``` javascript
var fromMarchToApril = moment.interval('2013-03-01/2013-04-01');
var oneYearFromApril2013 = moment.interval('2013-03-01/P1Y');
var oneHundredTwentySevenHoursBefore = moment.interval('P127H/')
var twentyEightDaysLater = moment.interval('/P28D')

var goneIn = moment.interval('/PT60S').diff('seconds'); // 60
```

You can also use two arguments for start/end dates:

```
var bonus = moment.interval('2013-03-01', '2014-01-01');
```

License
=======

moment-interval is freely distributable under the terms of the MIT license.

[moment]: http://momentjs.com/