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

var PunchClock = function (newElement) {
    "use strict";
    // Public fields
    this.isRunning = false;
    this.lastTime = 0;
    this.startTime = 0;
    this.time = 0;
    this.intervalID = 0;

    // Set element references
    this.clockElement = newElement;
    this.timeElement = this.clockElement.find('.clock-time');
    this.nameElement = this.clockElement.find('.clock-name');
    this.nameInputElement = this.clockElement.find('.clock-name-input');
    //this.clockButtonsElement = this.clockElement.find('.clock-buttons');
    this.startElement = this.clockElement.find('.clock-start');
    this.stopElement = this.clockElement.find('.clock-stop');
    this.resetElement = this.clockElement.find('.clock-reset');
    this.deleteElement = this.clockElement.find('.clock-delete');

    // Change its clock id
    this.clockElement.attr("id", "clock-" + (++PunchClock.nextID));

    // Change clock name
    this.Name("Clock " + PunchClock.nextID);
    // Hide name
    this.nameElement.hide();
    // Focus input
    this.nameInputElement.val(this.nameElement.text());
    this.nameInputElement.focus();
    this.nameInputElement.select();

    // Assign button click handlers
    this.startElement.click($.proxy(this.Start, this));
    this.stopElement.click($.proxy(this.Stop, this));
    this.resetElement.click($.proxy(this.Reset, this));
    this.deleteElement.click($.proxy(this.Delete, this));

    // Other handlers
    this.nameInputElement.keydown(
        $.proxy(this.NameInputKeydown, this)
    );
    this.nameInputElement.focusout(
        $.proxy(this.NameInputFocusout, this)
    );
    this.nameElement.click(
        $.proxy(this.NameClick, this)
    );

    this.Reset();
};

PunchClock.nextID = 0;

PunchClock.prototype.Start = function () {
    "use strict";
    if (!this.isRunning) {
        this.startTime = Date.now();
        this.isRunning = true;
        this.intervalID = setInterval(this.Update.bind(this), 1);
    }
};

PunchClock.prototype.NameInputKeydown = function (event) {
    "use strict";
    // If user pressed enter
    if (event.which === 13) {
        // Change clock name
        this.Name(this.nameInputElement.val());
        // Hide input
        this.nameInputElement.hide();
        // Show name
        this.nameElement.show();
    }
    // So user can type stuff without activateing a keybind/hotkey/shortcut
    event.stopPropagation();
};

PunchClock.prototype.NameInputFocusout = function () {
    "use strict";
    // Hide input
    this.nameInputElement.hide();
    // Show name
    this.nameElement.show();
};

PunchClock.prototype.NameClick = function () {
    "use strict";
    // Show input
    this.nameInputElement.show();
    // Hide name
    this.nameElement.hide();
    this.nameInputElement.val(this.nameElement.text());
    this.nameInputElement.focus();
    this.nameInputElement.select();
};

PunchClock.prototype.Update = function () {
    "use strict";
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
        this.timeElement.text(
            hourStr + ':' +
            minsStr + ':' +
            secsStr + '.' +
            milsStr
        );
    }
};

PunchClock.prototype.Delete = function () {
    "use strict";
    this.Stop();
    this.clockElement.remove();
};

PunchClock.prototype.Stop = function () {
    "use strict";
    clearInterval(this.intervalID);
    this.isRunning = false;
    this.lastTime = this.time;
};

PunchClock.prototype.Reset = function () {
    "use strict";
    this.Stop();
    this.lastTime = 0;
    this.time = 0;
    this.startTime = 0;
    this.timeElement.text("00:00:00.000");
};

PunchClock.prototype.Name = function (newName) {
    "use strict";
    this.nameElement.text(newName);
};
