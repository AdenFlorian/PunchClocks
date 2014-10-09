/*
 The MIT License (MIT)

 Copyright (c) 2014 David Valachovic

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */

function PunchClock() {
    "use strict";
    this.isRunning = false;
    this.lastTime = 0;
    this.startTime = 0;
    this.time = 0;
    this.element = null;
    this.timeElement = 0;
    this.intervalID = 0;
    this.Reset = function () {
        this.Stop();
        this.lastTime = 0;
        this.time = 0;
        this.startTime = 0;
        this.timeElement.text("00:00:00.000");
    };
    this.Start = function () {
        if (!this.isRunning) {
            this.startTime = Date.now();
            this.isRunning = true;
            this.intervalID = setInterval(this.Update.bind(this), 1);
        }
    };
    this.Update = function () {
        if (this.isRunning) {
            var curTime = Date.now();
            this.time = curTime - this.startTime + this.lastTime;
            var date = new Date(this.time), hours = date.getUTCHours(),
                minutes = date.getUTCMinutes(),
                seconds = date.getUTCSeconds(),
                millis = date.getUTCMilliseconds();
            var hourStr = hours > 9 ? hours : '0' + hours,
                minsStr = minutes > 9 ? minutes : '0' + minutes,
                secsStr = seconds > 9 ? seconds : '0' + seconds,
                milsStr;
            if (millis > 99) {
                milsStr = millis;
            } else if (millis > 9) {
                milsStr = '0' + millis;
            } else {
                milsStr = '00' + millis;
            }
            this.timeElement.text(hourStr + ':' + minsStr + ':' + secsStr + '.' + milsStr);
        }
    };
    this.Stop = function () {
        clearInterval(this.intervalID);
        this.isRunning = false;
        this.lastTime = this.time;
    };
    this.Delete = function () {
        this.Stop();
        this.element.remove();
    };
}

$(function () {
    "use strict";
    var nextClockID = 0,
        clockTemplate = $('#clock-template'),
        clocksContainer = $('#clocks');
    $('#clock-add').click(function () {
        // Copy clock-template and append to clocksContainer
        var newClockElem = clockTemplate.clone().appendTo(clocksContainer);
        // Change its clock id
        newClockElem.attr("id", "clock-" + (++nextClockID));
        // Change clock name
        newClockElem.find('.clock-name').text = "Clock " + nextClockID;
        // Unhide it
        newClockElem.show();
        // Create new Clock obj
        var ClockObj = new PunchClock();
        ClockObj.timeElement = newClockElem.find('.clock-time');
        ClockObj.Reset();
        newClockElem.find('.clock-start').click($.proxy(ClockObj.Start, ClockObj));
        newClockElem.find('.clock-stop').click($.proxy(ClockObj.Stop, ClockObj));
        newClockElem.find('.clock-reset').click($.proxy(ClockObj.Reset, ClockObj));
        newClockElem.find('.clock-delete').click($.proxy(ClockObj.Delete, ClockObj));
        ClockObj.element = newClockElem;
    });
});
