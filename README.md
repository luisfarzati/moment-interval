moment-interval
===============

ISO 8601 time interval support for [Moment.js][moment].

Examples
--------

You can create time intervals using the following formats:

1. date/duration
3. duration/date
4. date/date

``` javascript
var fromMarchToApril = moment.interval('2013-03-01/2013-04-01');
var oneYearFromApril2013 = moment.interval('2013-03-01/P1Y');
```

If you leave a blank date (e.g. `P1Y/` or `/P1Y`) it will use the current date.

``` javascript
var twentyEightDaysLater = moment.interval('/P28D')
var oneHundredTwentySevenHoursBefore = moment.interval('P127H/')
```

The returned interval object has `start` and `end` getters.

``` javascript
var worldWarII = moment.interval('1939-09-01/1945-09-02');
var whenItBegan = worldWarII.start(); // Moment object
var whenItEnded = worldWarII.end(); // Moment object
```

You can also use two arguments for start/end dates:

``` javascript
var bonus = moment.interval('2013-03-01', '2014-01-01');
```

License
=======

moment-interval is freely distributable under the terms of the MIT license.

[moment]: http://momentjs.com/