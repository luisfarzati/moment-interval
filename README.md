moment-interval
===============
This plugin provides time intervals for [Moment.js][moment]. It also adds support for [ISO 8601][iso8601] duration expressions.


Creating a time interval
------------------------

A time interval is defined by a **start time**, an **end time**, and a **period** representing the amount of time between start and end.

When creating a time interval you can specify the time window in _absolute_ terms, like **start** and **end** time, or using a combination of absolute and _relative_ values, like **start** and **period**, or **period** and **end**.

So, for example, you could create a time interval between _April 2013_ and _May 2013_. The period here would be of _1 month_. Or you could create a time interval starting at _May 1st, 2013_ and ending a _week later_. The end date would be _May 8th, 2013_.

moment-interval adds methods to the `moment` object, as well as `Moment` and `Duration` instances, to let you do this along some other common time handling tasks.

### `Interval` moment.interval(String)

Creates an Interval instance by specifying a string in the form of [ISO 8601 time interval expression][iso8601i]:

`start-date or period/end-date or period`

If you leave a blank date at one of the sides, the current date will be used. You can't have both sides of the interval neither as blank or period.

    // using dates in both ends
    var fromMarchToApril = moment.interval('2013-03-01/2013-04-01');
    
    // using a start date and a period
    var oneYearSinceApril2012 = moment.interval('2012-03-01/P1Y');

    // using a period and an end date
    var twentyEightDaysLater = moment.interval('/P28D')

    // using a period and the current date
    var oneHundredTwentySevenHoursBefore = moment.interval('P127H/')

    // invalid usage
    var voidTime = moment.interval('/');                // invalid!
    var relativitySucks = moment.interval('P1D/PT8H');  // invalid!

### `Interval` moment.interval(Moment, Duration)

Creates an Interval instance starting at _Moment_ and ending at _Moment+Duration_.

    // March 1st, 2013 to March 2nd, 2013
    moment.interval(moment('2013-03-01'), moment.duration(1, 'day'));

### `Interval` moment.interval(Duration, Moment)

Returns an Interval instance starting at _Moment-Duration_ and ending at _Moment_.

    // December 24th, 16:00 to December 25th, 00:00
    moment.interval(moment.duration(8, 'hours'), moment('2013-12-25'));

### `Interval` moment.interval(Moment, Moment)

Returns an Interval instance starting at _Moment_ and ending at _Moment_.

    // December 21st, 2012 to March 3rd, 2013
    moment.interval(moment('2012-12-21'), moment('2013-03-21'));    

### moment().interval(String)

Similar to `moment.interval(String)` but uses the current Moment instance as one end of the interval, so you just need to specify the other end.

    // Now to Tomorrow same time
    moment().interval('/P1D');
    
### `Interval` moment().interval(Moment)

Similar to `moment.interval(Moment, Moment)` but the current Moment instance is used as one end of the interval.

    // January 2010 to June 2015
    moment('2010-01').interval('2015-06');

### `Interval` moment().interval(Duration)

Similar to `moment.interval(Moment, Duration)` or `moment.interval(Duration, Moment)` but the current Moment instance is used as one end of the interval.

    // Sunday to Monday
    moment().startOf('week').interval(moment.duration(-1, 'day'));
    
    // Monday to Tuesday
    moment().startOf('week').interval(moment.duration(1, 'day'));
    
### `Interval` duration().since(Moment)

Creates an Interval instance starting at _Moment_ and ending at _Moment+current Duration_.

    // July 9th, 2011 to July 10th, 2011
    moment.duration(1, 'day').since(moment('2011-07-09'));

### `Interval` duration().until(Moment)

Creates an Interval instance starting at _Moment+current Duration_ and ending at _Moment_.  

    // July 9th, 2011 to July 10th, 2011
    moment.duration(1, 'day').until(moment('2011-07-10'));


Adjusting an interval
----------------------

moment-interval uses overloaded getters and setters in the same way Moment.js does.  Calling these methods without parameters acts as a getter, and calling them with a parameter acts as a setter.

### `Moment` start([moment, [keepPeriod = false]])

Sets or returns a Moment object representing the start time of the interval.

By default, setting a new start time will stretch or shrink the period and the end time will remain intact. 

    var selection = moment.interval('2010-06-01/2010-06-08');
    selection.start();              // Moment object set at 2010-06-01
    selection.period().humanize();  // "7 days" 
    
    selection.start('2010-06-05');
    selection.period().humanize();  // "3 days" 
    
To enforce the period and automatically adjust the end time according to the new start value, add the second argument keepPeriod as true.

    selection.start('2010-06-01', true);
    selection.end();                // Moment object set at 2010-06-04
    
### `Moment` end([Moment, [keepPeriod = false]])

Same as above, but with the end time.

### `Duration` period([Duration])

Sets or returns a Duration object representing the period of the interval. Setting a new period will shrink or stretch the interval keeping the start time intact.

    // a week from today
    var selection = moment.interval('/P1W');
    selection.end();    // Moment object set as (today + 1 week)
    
    selection.period(moment.duration(2, 'weeks'));
    selection.end();    // Moment object set as (today + 2 weeks)

### `Interval` backward([Duration])

Moves the interval backwards in time. You can either specify a period by passing a Duration object, or leave it blank and the interval will move backward by the current period.

    var selection = moment.interval('P1W/2013-05-01');
    
    // previous week
    selection.backward();   // 2013-04-17/2013-04-24
    
    // previous week
    selection.backward();   // 2013-04-10/2013-04-17
    
    // previous year
    selection.backward(moment.duration(1, 'year')); // 2012-04-10/2012-04-17

### `Interval` forward([Duration])

Same as above, but moves the interval forward in time.

    // next month
    selection.forward(moment.duration(1, 'month'))

### `Interval` travel(Duration)

Same as above but the Duration argument is mandatory. This is a generic method for moving backward or forward depending on the duration (if it is negative or positive).

    // previous week
    selection.travel(moment.duration(-1, 'week'));
    
    // next week
    selection.travel(moment.duration(1, 'week'));


Helper methods
--------------

### `boolean` moment.isInterval(Interval)

Checks the specified object and returns true if it's a valid Interval instance, or false otherwise.

### `Duration` moment.duration(String)

moment-interval extends Durations by adding [ISO 8601 duration expressions][iso8601d] support:

`PnYnMnDTnHnMnSnZ` or `PnW`

While `nZ` is not part of the ISO standard, it has been implemented here as a way to specify milliseconds and is completely optional.

    moment.duration('P1W');         // a week
    moment.duration('P1DT2H30M');   // a day and 2 and half hours
    moment.duration('PT500Z');      // half a second

### `String` duration().toISOString()

Returns an ISO 8601 representation of the current Duration instance.

    moment.duration(3, 'weeks').toISOString(); // "P3W"
    moment.duration({days: 9, hours: 18}).toISOString(); // "P9DT18H"


License
=======
moment-interval is freely distributable under the terms of the MIT license.

[moment]: http://momentjs.com/
[iso8601]: http://en.wikipedia.org/wiki/ISO_8601
[iso8601i]: http://en.wikipedia.org/wiki/ISO_8601#Time_intervals
[iso8601d]: http://en.wikipedia.org/wiki/ISO_8601#Durations