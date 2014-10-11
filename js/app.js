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

$(function () {
    "use strict";
    var clockTemplate = $('#clock-template'),
        clocksContainer = $('#clocks'),
        addButton = $('#clock-add');

    // Setup keybinds
    $(document).keydown(function (event) {
        switch (event.which) {
            case 65:    // A
                addButton.click();
                break;
            default:
                break;
        }
        // Stop letter from being typed into new input box if applicable
        event.preventDefault();
    });

    // When the add button is clicked...
    addButton.click(function () {
        // Copy clock-template and append to clocksContainer
        var newClockElem = clockTemplate.clone().appendTo(clocksContainer);
        // Unhide it
        newClockElem.show();
        // Create new Clock obj with new clock element
        var ClockObj = new PunchClock(newClockElem);
        ClockObj.addElement = addButton;
        console.log(ClockObj);
    });
    addButton.click();
});
