(function () {
    /* nodejs */
    var moment = (typeof require === 'undefined') ? this.moment : require('moment');

    var iso8601 = /^P(?:(\d+(?:[\.,]\d{0,3})?W)|(\d+(?:[\.,]\d{0,3})?Y)?(\d+(?:[\.,]\d{0,3})?M)?(\d+(?:[\.,]\d{0,3})?D)?(?:T(\d+(?:[\.,]\d{0,3})?H)?(\d+(?:[\.,]\d{0,3})?M)?(\d+(?:[\.,]\d{0,3})?S)?)?)$/;

    function isISODuration(text) {
        return iso8601.test(text);
    }

    var durationFn = moment.duration;

    moment.duration = function (text) {
        if (arguments.length > 1 || typeof text !== 'string') {
            return durationFn.apply(moment, arguments);
        }
        var matches = text.match(iso8601);
        if (matches === null) {
            throw '"' + text + '" is an invalid ISO 8601 duration';
        }
        var d = {
            weeks: parseFloat(matches[1], 10),
            years: parseFloat(matches[2], 10),
            months: parseFloat(matches[3], 10),
            days: parseFloat(matches[4], 10),
            hours: parseFloat(matches[5], 10),
            minutes: parseFloat(matches[6], 10),
            seconds: parseFloat(matches[7], 10),
            milliseconds: parseFloat(matches[8], 10)
        }
        return moment.duration(d);
    };

    moment.duration.fn = durationFn.fn;

    moment.duration.fn.toISOString = function () {
        function append(number, suffix) {
            return number > 0 ? (number + '' + suffix) : '';
        }

        return 'P' +
            (this.days() > 0 && this.days() % 7 !== 0 ? '' : append(Math.abs(this.weeks()), 'W')) +
            append(Math.abs(this.years()), 'Y') +
            append(Math.abs(this.months()), 'M') +
            (this.days() > 0 && this.days() % 7 === 0 ? '' : append(Math.abs(this.days()), 'D')) +
            ((Math.abs(this.hours()) + Math.abs(this.minutes()) + Math.abs(this.seconds()) + Math.abs(this.milliseconds()) > 0) ? 'T' : '') +
            append(Math.abs(this.hours()), 'H') +
            append(Math.abs(this.minutes()), 'M') +
            append(Math.abs(this.seconds())+Math.abs(this.milliseconds())/1000, 'S')
    };

    // http://stackoverflow.com/q/1353684/1206952
    function isValidDate(d) {
        if ( Object.prototype.toString.call(d) !== "[object Date]" )
            return false;
        return !isNaN(d.getTime());
    }

    function IntervalException(message, object) {
        this.name = "IntervalException";
        this.message = message;
        this.object = object;
    }
    IntervalException.prototype = new Error();
    IntervalException.prototype.constructor = IntervalException;

    /**
     * Checks if the specified object is an Interval object.
     */
    moment.isInterval = function (interval) {
        return typeof interval.start === 'function'
            && typeof interval.end === 'function'
            && typeof interval.period === 'function'
            && moment.isMoment(interval.start())
            && moment.isMoment(interval.end())
            && moment.isDuration(interval.period());
    };

    /**
     * Creates an Interval object based on the current Moment instance.
     *  moment().interval(String)
     *  moment().interval(Moment)
     *  moment().interval(Duration)
     */
    moment.fn.interval = function (arg) {
        if (typeof arg === 'string') {
            var iso = arg.split('/', 2);

            if (iso[0] === '' && iso[1] === '') {
                throw new IntervalException('No date or period specified in "' + arg + '"');
            }
            if (iso[0] !== '' && iso[1] !== '') {
                throw new IntervalException('In order to create an Interval between this Moment instance and another time, either start or end of the specified interval string needs to be blank', arg);
            }
            if (iso[0] === '') {
                iso[0] = this.format();
            }
            else {
                iso[1] = this.format();
            }
            return moment.interval(iso.join('/'));
        }
        else if (moment.isMoment(arg)) {
            return moment.interval(moment(Math.min(this,arg)), moment(Math.max(this,arg)));
        }
        else if (moment.isDuration(arg)) {
            return moment.interval(arg < 0 ? moment.duration(-arg) : this, arg > 0 ? arg : this);
        }
    };

    /**
     * Creates an Interval object based on the current Duration instance.
     *  moment().duration().since(Moment)
     */
    moment.duration.fn.since = function (value) {
        return moment.interval(value, this);
    };

    /**
     * Creates an Interval object based on the current Duration instance.
     *  moment().duration().until(Moment)
     */
    moment.duration.fn.until = function (value) {
        return moment.interval(this, value);
    };

    /**
     * Creates an Interval object.
     *  moment.interval(String)
     *  moment.interval(Moment, Moment)
     *  moment.interval(Moment, Duration)
     *  moment.interval(Duration, Moment)
     */
    moment.interval = function (arg1, arg2) {
        var start, end, period;

        // moment.interval(String)
        if (!arg2 && typeof arg1 === 'string') {
            var iso = arg1.split('/', 2);

            if (iso[0] === '' && iso[1] === '') {
                throw new IntervalException('Either start or end can be blank, but not both');
            }

            if (isISODuration(iso[0]) && isISODuration(iso[1])) {
                throw new IntervalException('Either start or end can be a Period string, but not both');
            }

            if (isISODuration(iso[0])) {
                period = moment.duration(iso[0]);
            }
            else {
                start = moment(iso[0] || undefined);
            }

            if (isISODuration(iso[1])) {
                period = moment.duration(iso[1]);
                end = moment(start).add(period);
            }
            else {
                end = moment(iso[1] || undefined);
                if (start) {
                    period = moment.duration(end.diff(start));
                }
                else {
                    start = moment(end).subtract(period);
                }
            }
        }
        // moment.interval(Moment|Duration, Moment|Duration)
        else {
            if (moment.isDuration(arg1) && moment.isDuration(arg2)) {
                throw new IntervalException('Either start or end can be a Duration object, but not both');
            }

            period = moment.isDuration(arg1)? moment.duration(arg1) : moment.isDuration(arg2)? moment.duration(arg2) : undefined;
            start = moment.isMoment(arg1)? moment(arg1) : undefined;
            end = moment.isMoment(arg2)? moment(arg2) : undefined;

            if (period) {
                start = start || moment(end).subtract(Math.abs(period));
                end = end || moment(start).add(Math.abs(period));
            }
            else {
                period = moment.duration(end.diff(start));
            }
        }

        return {
            // interval.start([Moment[, keepPeriod]])
            start: function (value, keepPeriod) {
                if (value) {
                    start = moment(value);
                    if (keepPeriod) {
                        end = moment(start).add(Math.abs(period));
                    }
                    else {
                        period = moment.duration(end.diff(start));
                    }
                }
                return start;
            },
            // interval.end([Moment[, keepPeriod]])
            end: function (value, keepPeriod) {
                if (value) {
                    end = moment(value);
                    if (keepPeriod) {
                        start = moment(end).subtract(Math.abs(period));
                    }
                    else {
                        period = moment.duration(end.diff(start));
                    }
                }
                return end;
            },
            // interval.period([Duration])
            period: function (value) {
                if (value) {
                    period = moment.duration(value);
                    end = moment(start).add(period);
                }
                return period;
            },
            // interval.backward([Duration])
            backward: function (duration) {
                duration = Math.abs(duration || period);
                start = moment(start).subtract(duration);
                end = moment(end).subtract(duration);
                return this;
            },
            // interval.forward(Duration)
            forward: function (duration) {
                duration = Math.abs(duration || period);
                start = moment(start).add(duration);
                end = moment(end).add(duration);
                return this;
            },
            // interval.travel(Duration)
            travel: function (duration) {
                if (duration.valueOf() < 0) {
                    this.backward(moment.duration(-duration));
                }
                else {
                    this.forward(duration);
                }
                return this;
            }
        };
    };
}(this));