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
	this.isRunning = false;
	this.lastTime = 0;
	this.startTime = 0;
	this.time = 0;
	this.element = 0;
	this.timeElement = 0;
	this.intervalID = 0;
	this.Start = function () {
		if (!this.isRunning) {
			this.startTime = Date.now();
			this.isRunning = true;
			this.intervalID = setInterval($.proxy(this.Update, this), 1);
		} else {
			console.log('Clock is already running!');
		}
	};
	this.Stop = function () {
		clearInterval(this.intervalID);
		this.isRunning = false;
		this.lastTime = this.time;
		console.log('stopped');
	};
	this.Update = function () {
		if (this.isRunning) {
			var curTime = Date.now();
			this.time = curTime - this.startTime + this.lastTime;
			var date = new Date(this.time),
				hours = date.getUTCHours(),
				minutes = date.getUTCMinutes(),
				seconds = date.getUTCSeconds(),
				millis = date.getUTCMilliseconds();
			var hoursStr = hours > 9 ? hours : '0' + hours,
				minutesStr = minutes > 9 ? minutes : '0' + minutes,
				secondsStr = seconds > 9 ? seconds : '0' + seconds,
				millisStr = millis > 99 ? millis : millis > 9 ? '0' + millis : '00' + millis;
			this.timeElement.text(hoursStr + ':' +
			                      minutesStr + ':' +
			                      secondsStr + '.' +
			                      millisStr);
		}
	};
	this.Reset = function () {
		this.Stop();
		this.lastTime = 0;
		this.time = 0;
		this.startTime = 0;
		this.timeElement.text("00:00:00.000");
	};
}

$(function () {
	var nextClockID = 0;
	var clockTemplate = $('#clock-template');
	var clocksContainer = $('#clocks');
	$('#clock-add').click(function () {
		// Copy clock-template
		var newClockElement = clockTemplate.clone().appendTo(clocksContainer).hide();
		// Change its clock id
		newClockElement.attr("id", "clock-" + ++nextClockID);
		// Unhide it
		newClockElement.show();
		// Create new Clock obj
		var ClockObj = new PunchClock();
		ClockObj.element = newClockElement;
		ClockObj.timeElement = newClockElement.find('.clock-time');
		ClockObj.Reset();
		ClockObj.element.find('.clock-start').click($.proxy(ClockObj.Start, ClockObj));
		ClockObj.element.find('.clock-stop').click($.proxy(ClockObj.Stop, ClockObj));
		ClockObj.element.find('.clock-reset').click($.proxy(ClockObj.Reset, ClockObj));
	});
});
