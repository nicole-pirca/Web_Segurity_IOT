var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { NgModule, Component, ElementRef, OnDestroy, OnInit, Input, Output, EventEmitter, forwardRef, Renderer2, ViewChild, ChangeDetectorRef, TemplateRef, ContentChildren, QueryList, NgZone } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DomHandler } from 'primeng/dom';
import { SharedModule, PrimeTemplate } from 'primeng/api';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var CALENDAR_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return Calendar; }),
    multi: true
};
var Calendar = /** @class */ (function () {
    function Calendar(el, renderer, cd, zone) {
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.zone = zone;
        this.dateFormat = 'mm/dd/yy';
        this.multipleSeparator = ',';
        this.rangeSeparator = '-';
        this.inline = false;
        this.showOtherMonths = true;
        this.icon = 'pi pi-calendar';
        this.shortYearCutoff = '+10';
        this.hourFormat = '24';
        this.stepHour = 1;
        this.stepMinute = 1;
        this.stepSecond = 1;
        this.showSeconds = false;
        this.showOnFocus = true;
        this.showWeek = false;
        this.dataType = 'date';
        this.selectionMode = 'single';
        this.todayButtonStyleClass = 'ui-button-secondary';
        this.clearButtonStyleClass = 'ui-button-secondary';
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.keepInvalid = false;
        this.hideOnDateTimeSelect = false;
        this.numberOfMonths = 1;
        this.view = 'date';
        this.timeSeparator = ":";
        this.showTransitionOptions = '225ms ease-out';
        this.hideTransitionOptions = '195ms ease-in';
        this.onFocus = new EventEmitter();
        this.onBlur = new EventEmitter();
        this.onClose = new EventEmitter();
        this.onSelect = new EventEmitter();
        this.onInput = new EventEmitter();
        this.onTodayClick = new EventEmitter();
        this.onClearClick = new EventEmitter();
        this.onMonthChange = new EventEmitter();
        this.onYearChange = new EventEmitter();
        this._locale = {
            firstDayOfWeek: 0,
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            today: 'Today',
            clear: 'Clear',
            dateFormat: 'mm/dd/yy',
            weekHeader: 'Wk'
        };
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this.inputFieldValue = null;
    }
    Object.defineProperty(Calendar.prototype, "minDate", {
        get: function () {
            return this._minDate;
        },
        set: function (date) {
            this._minDate = date;
            if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
                this.createMonths(this.currentMonth, this.currentYear);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "maxDate", {
        get: function () {
            return this._maxDate;
        },
        set: function (date) {
            this._maxDate = date;
            if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
                this.createMonths(this.currentMonth, this.currentYear);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "disabledDates", {
        get: function () {
            return this._disabledDates;
        },
        set: function (disabledDates) {
            this._disabledDates = disabledDates;
            if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
                this.createMonths(this.currentMonth, this.currentYear);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "disabledDays", {
        get: function () {
            return this._disabledDays;
        },
        set: function (disabledDays) {
            this._disabledDays = disabledDays;
            if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
                this.createMonths(this.currentMonth, this.currentYear);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "yearRange", {
        get: function () {
            return this._yearRange;
        },
        set: function (yearRange) {
            this._yearRange = yearRange;
            if (yearRange) {
                var years = yearRange.split(':');
                var yearStart = parseInt(years[0]);
                var yearEnd = parseInt(years[1]);
                this.populateYearOptions(yearStart, yearEnd);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "showTime", {
        get: function () {
            return this._showTime;
        },
        set: function (showTime) {
            this._showTime = showTime;
            if (this.currentHour === undefined) {
                this.initTime(this.value || new Date());
            }
            this.updateInputfield();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Calendar.prototype, "locale", {
        get: function () {
            return this._locale;
        },
        set: function (newLocale) {
            this._locale = newLocale;
            if (this.view === 'date') {
                this.createWeekDays();
                this.createMonths(this.currentMonth, this.currentYear);
            }
            else if (this.view === 'month') {
                this.createMonthPickerValues();
            }
        },
        enumerable: true,
        configurable: true
    });
    Calendar.prototype.ngOnInit = function () {
        var date = this.defaultDate || new Date();
        this.currentMonth = date.getMonth();
        this.currentYear = date.getFullYear();
        if (this.view === 'date') {
            this.createWeekDays();
            this.initTime(date);
            this.createMonths(this.currentMonth, this.currentYear);
            this.ticksTo1970 = (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000);
        }
        else if (this.view === 'month') {
            this.createMonthPickerValues();
        }
    };
    Calendar.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'date':
                    _this.dateTemplate = item.template;
                    break;
                default:
                    _this.dateTemplate = item.template;
                    break;
            }
        });
    };
    Calendar.prototype.populateYearOptions = function (start, end) {
        this.yearOptions = [];
        for (var i = start; i <= end; i++) {
            this.yearOptions.push(i);
        }
    };
    Calendar.prototype.createWeekDays = function () {
        this.weekDays = [];
        var dayIndex = this.locale.firstDayOfWeek;
        for (var i = 0; i < 7; i++) {
            this.weekDays.push(this.locale.dayNamesMin[dayIndex]);
            dayIndex = (dayIndex == 6) ? 0 : ++dayIndex;
        }
    };
    Calendar.prototype.createMonthPickerValues = function () {
        this.monthPickerValues = [];
        for (var i = 0; i <= 11; i++) {
            this.monthPickerValues.push(this.locale.monthNamesShort[i]);
        }
    };
    Calendar.prototype.createMonths = function (month, year) {
        this.months = this.months = [];
        for (var i = 0; i < this.numberOfMonths; i++) {
            var m = month + i;
            var y = year;
            if (m > 11) {
                m = m % 11 - 1;
                y = year + 1;
            }
            this.months.push(this.createMonth(m, y));
        }
    };
    Calendar.prototype.getWeekNumber = function (date) {
        var checkDate = new Date(date.getTime());
        checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
        var time = checkDate.getTime();
        checkDate.setMonth(0);
        checkDate.setDate(1);
        return Math.floor(Math.round((time - checkDate.getTime()) / 86400000) / 7) + 1;
    };
    Calendar.prototype.createMonth = function (month, year) {
        var dates = [];
        var firstDay = this.getFirstDayOfMonthIndex(month, year);
        var daysLength = this.getDaysCountInMonth(month, year);
        var prevMonthDaysLength = this.getDaysCountInPrevMonth(month, year);
        var dayNo = 1;
        var today = new Date();
        var weekNumbers = [];
        var monthRows = Math.ceil((daysLength + firstDay) / 7);
        for (var i = 0; i < monthRows; i++) {
            var week = [];
            if (i == 0) {
                for (var j = (prevMonthDaysLength - firstDay + 1); j <= prevMonthDaysLength; j++) {
                    var prev = this.getPreviousMonthAndYear(month, year);
                    week.push({ day: j, month: prev.month, year: prev.year, otherMonth: true,
                        today: this.isToday(today, j, prev.month, prev.year), selectable: this.isSelectable(j, prev.month, prev.year, true) });
                }
                var remainingDaysLength = 7 - week.length;
                for (var j = 0; j < remainingDaysLength; j++) {
                    week.push({ day: dayNo, month: month, year: year, today: this.isToday(today, dayNo, month, year),
                        selectable: this.isSelectable(dayNo, month, year, false) });
                    dayNo++;
                }
            }
            else {
                for (var j = 0; j < 7; j++) {
                    if (dayNo > daysLength) {
                        var next = this.getNextMonthAndYear(month, year);
                        week.push({ day: dayNo - daysLength, month: next.month, year: next.year, otherMonth: true,
                            today: this.isToday(today, dayNo - daysLength, next.month, next.year),
                            selectable: this.isSelectable((dayNo - daysLength), next.month, next.year, true) });
                    }
                    else {
                        week.push({ day: dayNo, month: month, year: year, today: this.isToday(today, dayNo, month, year),
                            selectable: this.isSelectable(dayNo, month, year, false) });
                    }
                    dayNo++;
                }
            }
            if (this.showWeek) {
                weekNumbers.push(this.getWeekNumber(new Date(week[0].year, week[0].month, week[0].day)));
            }
            dates.push(week);
        }
        return {
            month: month,
            year: year,
            dates: dates,
            weekNumbers: weekNumbers
        };
    };
    Calendar.prototype.initTime = function (date) {
        this.pm = date.getHours() > 11;
        if (this.showTime) {
            this.currentMinute = date.getMinutes();
            this.currentSecond = date.getSeconds();
            if (this.hourFormat == '12')
                this.currentHour = date.getHours() == 0 ? 12 : date.getHours() % 12;
            else
                this.currentHour = date.getHours();
        }
        else if (this.timeOnly) {
            this.currentMinute = 0;
            this.currentHour = 0;
            this.currentSecond = 0;
        }
    };
    Calendar.prototype.navBackward = function (event) {
        event.stopPropagation();
        if (this.disabled) {
            event.preventDefault();
            return;
        }
        if (this.view === 'month') {
            this.decrementYear();
        }
        else {
            if (this.currentMonth === 0) {
                this.currentMonth = 11;
                this.decrementYear();
            }
            else {
                this.currentMonth--;
            }
            this.onMonthChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
            this.createMonths(this.currentMonth, this.currentYear);
        }
    };
    Calendar.prototype.navForward = function (event) {
        event.stopPropagation();
        if (this.disabled) {
            event.preventDefault();
            return;
        }
        if (this.view === 'month') {
            this.incrementYear();
        }
        else {
            if (this.currentMonth === 11) {
                this.currentMonth = 0;
                this.incrementYear();
            }
            else {
                this.currentMonth++;
            }
            this.onMonthChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
            this.createMonths(this.currentMonth, this.currentYear);
        }
    };
    Calendar.prototype.decrementYear = function () {
        this.currentYear--;
        if (this.yearNavigator && this.currentYear < this.yearOptions[0]) {
            var difference = this.yearOptions[this.yearOptions.length - 1] - this.yearOptions[0];
            this.populateYearOptions(this.yearOptions[0] - difference, this.yearOptions[this.yearOptions.length - 1] - difference);
        }
    };
    Calendar.prototype.incrementYear = function () {
        this.currentYear++;
        if (this.yearNavigator && this.currentYear > this.yearOptions[this.yearOptions.length - 1]) {
            var difference = this.yearOptions[this.yearOptions.length - 1] - this.yearOptions[0];
            this.populateYearOptions(this.yearOptions[0] + difference, this.yearOptions[this.yearOptions.length - 1] + difference);
        }
    };
    Calendar.prototype.onDateSelect = function (event, dateMeta) {
        var _this = this;
        if (this.disabled || !dateMeta.selectable) {
            event.preventDefault();
            return;
        }
        if (this.isMultipleSelection() && this.isSelected(dateMeta)) {
            this.value = this.value.filter(function (date, i) {
                return !_this.isDateEquals(date, dateMeta);
            });
            this.updateModel(this.value);
        }
        else {
            if (this.shouldSelectDate(dateMeta)) {
                if (dateMeta.otherMonth) {
                    this.currentMonth = dateMeta.month;
                    this.currentYear = dateMeta.year;
                    this.createMonths(this.currentMonth, this.currentYear);
                    this.selectDate(dateMeta);
                }
                else {
                    this.selectDate(dateMeta);
                }
            }
        }
        if (this.isSingleSelection() && (!this.showTime || this.hideOnDateTimeSelect)) {
            setTimeout(function () {
                event.preventDefault();
                _this.hideOverlay();
                if (_this.mask) {
                    _this.disableModality();
                }
                _this.cd.markForCheck();
            }, 150);
        }
        this.updateInputfield();
        event.preventDefault();
    };
    Calendar.prototype.shouldSelectDate = function (dateMeta) {
        if (this.isMultipleSelection())
            return this.maxDateCount != null ? this.maxDateCount > (this.value ? this.value.length : 0) : true;
        else
            return true;
    };
    Calendar.prototype.onMonthSelect = function (event, index) {
        this.onDateSelect(event, { year: this.currentYear, month: index, day: 1, selectable: true });
    };
    Calendar.prototype.updateInputfield = function () {
        var formattedValue = '';
        if (this.value) {
            if (this.isSingleSelection()) {
                formattedValue = this.formatDateTime(this.value);
            }
            else if (this.isMultipleSelection()) {
                for (var i = 0; i < this.value.length; i++) {
                    var dateAsString = this.formatDateTime(this.value[i]);
                    formattedValue += dateAsString;
                    if (i !== (this.value.length - 1)) {
                        formattedValue += this.multipleSeparator + ' ';
                    }
                }
            }
            else if (this.isRangeSelection()) {
                if (this.value && this.value.length) {
                    var startDate = this.value[0];
                    var endDate = this.value[1];
                    formattedValue = this.formatDateTime(startDate);
                    if (endDate) {
                        formattedValue += ' ' + this.rangeSeparator + ' ' + this.formatDateTime(endDate);
                    }
                }
            }
        }
        this.inputFieldValue = formattedValue;
        this.updateFilledState();
        if (this.inputfieldViewChild && this.inputfieldViewChild.nativeElement) {
            this.inputfieldViewChild.nativeElement.value = this.inputFieldValue;
        }
    };
    Calendar.prototype.formatDateTime = function (date) {
        var formattedValue = null;
        if (date) {
            if (this.timeOnly) {
                formattedValue = this.formatTime(date);
            }
            else {
                formattedValue = this.formatDate(date, this.getDateFormat());
                if (this.showTime) {
                    formattedValue += ' ' + this.formatTime(date);
                }
            }
        }
        return formattedValue;
    };
    Calendar.prototype.selectDate = function (dateMeta) {
        var date = new Date(dateMeta.year, dateMeta.month, dateMeta.day);
        if (this.showTime) {
            if (this.hourFormat == '12') {
                if (this.currentHour === 12)
                    date.setHours(this.pm ? 12 : 0);
                else
                    date.setHours(this.pm ? this.currentHour + 12 : this.currentHour);
            }
            else {
                date.setHours(this.currentHour);
            }
            date.setMinutes(this.currentMinute);
            date.setSeconds(this.currentSecond);
        }
        if (this.minDate && this.minDate > date) {
            date = this.minDate;
            this.currentHour = date.getHours();
            this.currentMinute = date.getMinutes();
            this.currentSecond = date.getSeconds();
        }
        if (this.maxDate && this.maxDate < date) {
            date = this.maxDate;
            this.currentHour = date.getHours();
            this.currentMinute = date.getMinutes();
            this.currentSecond = date.getSeconds();
        }
        if (this.isSingleSelection()) {
            this.updateModel(date);
        }
        else if (this.isMultipleSelection()) {
            this.updateModel(this.value ? __spread(this.value, [date]) : [date]);
        }
        else if (this.isRangeSelection()) {
            if (this.value && this.value.length) {
                var startDate = this.value[0];
                var endDate = this.value[1];
                if (!endDate && date.getTime() >= startDate.getTime()) {
                    endDate = date;
                }
                else {
                    startDate = date;
                    endDate = null;
                }
                this.updateModel([startDate, endDate]);
            }
            else {
                this.updateModel([date, null]);
            }
        }
        this.onSelect.emit(date);
    };
    Calendar.prototype.updateModel = function (value) {
        var _this = this;
        this.value = value;
        if (this.dataType == 'date') {
            this.onModelChange(this.value);
        }
        else if (this.dataType == 'string') {
            if (this.isSingleSelection()) {
                this.onModelChange(this.formatDateTime(this.value));
            }
            else {
                var stringArrValue = null;
                if (this.value) {
                    stringArrValue = this.value.map(function (date) { return _this.formatDateTime(date); });
                }
                this.onModelChange(stringArrValue);
            }
        }
    };
    Calendar.prototype.getFirstDayOfMonthIndex = function (month, year) {
        var day = new Date();
        day.setDate(1);
        day.setMonth(month);
        day.setFullYear(year);
        var dayIndex = day.getDay() + this.getSundayIndex();
        return dayIndex >= 7 ? dayIndex - 7 : dayIndex;
    };
    Calendar.prototype.getDaysCountInMonth = function (month, year) {
        return 32 - this.daylightSavingAdjust(new Date(year, month, 32)).getDate();
    };
    Calendar.prototype.getDaysCountInPrevMonth = function (month, year) {
        var prev = this.getPreviousMonthAndYear(month, year);
        return this.getDaysCountInMonth(prev.month, prev.year);
    };
    Calendar.prototype.getPreviousMonthAndYear = function (month, year) {
        var m, y;
        if (month === 0) {
            m = 11;
            y = year - 1;
        }
        else {
            m = month - 1;
            y = year;
        }
        return { 'month': m, 'year': y };
    };
    Calendar.prototype.getNextMonthAndYear = function (month, year) {
        var m, y;
        if (month === 11) {
            m = 0;
            y = year + 1;
        }
        else {
            m = month + 1;
            y = year;
        }
        return { 'month': m, 'year': y };
    };
    Calendar.prototype.getSundayIndex = function () {
        return this.locale.firstDayOfWeek > 0 ? 7 - this.locale.firstDayOfWeek : 0;
    };
    Calendar.prototype.isSelected = function (dateMeta) {
        var e_1, _a;
        if (this.value) {
            if (this.isSingleSelection()) {
                return this.isDateEquals(this.value, dateMeta);
            }
            else if (this.isMultipleSelection()) {
                var selected = false;
                try {
                    for (var _b = __values(this.value), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var date = _c.value;
                        selected = this.isDateEquals(date, dateMeta);
                        if (selected) {
                            break;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return selected;
            }
            else if (this.isRangeSelection()) {
                if (this.value[1])
                    return this.isDateEquals(this.value[0], dateMeta) || this.isDateEquals(this.value[1], dateMeta) || this.isDateBetween(this.value[0], this.value[1], dateMeta);
                else
                    return this.isDateEquals(this.value[0], dateMeta);
            }
        }
        else {
            return false;
        }
    };
    Calendar.prototype.isMonthSelected = function (month) {
        var day = this.value ? (Array.isArray(this.value) ? this.value[0].getDate() : this.value.getDate()) : 1;
        return this.isSelected({ year: this.currentYear, month: month, day: day, selectable: true });
    };
    Calendar.prototype.isDateEquals = function (value, dateMeta) {
        if (value)
            return value.getDate() === dateMeta.day && value.getMonth() === dateMeta.month && value.getFullYear() === dateMeta.year;
        else
            return false;
    };
    Calendar.prototype.isDateBetween = function (start, end, dateMeta) {
        var between = false;
        if (start && end) {
            var date = new Date(dateMeta.year, dateMeta.month, dateMeta.day);
            return start.getTime() <= date.getTime() && end.getTime() >= date.getTime();
        }
        return between;
    };
    Calendar.prototype.isSingleSelection = function () {
        return this.selectionMode === 'single';
    };
    Calendar.prototype.isRangeSelection = function () {
        return this.selectionMode === 'range';
    };
    Calendar.prototype.isMultipleSelection = function () {
        return this.selectionMode === 'multiple';
    };
    Calendar.prototype.isToday = function (today, day, month, year) {
        return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
    };
    Calendar.prototype.isSelectable = function (day, month, year, otherMonth) {
        var validMin = true;
        var validMax = true;
        var validDate = true;
        var validDay = true;
        if (otherMonth && !this.selectOtherMonths) {
            return false;
        }
        if (this.minDate) {
            if (this.minDate.getFullYear() > year) {
                validMin = false;
            }
            else if (this.minDate.getFullYear() === year) {
                if (this.minDate.getMonth() > month) {
                    validMin = false;
                }
                else if (this.minDate.getMonth() === month) {
                    if (this.minDate.getDate() > day) {
                        validMin = false;
                    }
                }
            }
        }
        if (this.maxDate) {
            if (this.maxDate.getFullYear() < year) {
                validMax = false;
            }
            else if (this.maxDate.getFullYear() === year) {
                if (this.maxDate.getMonth() < month) {
                    validMax = false;
                }
                else if (this.maxDate.getMonth() === month) {
                    if (this.maxDate.getDate() < day) {
                        validMax = false;
                    }
                }
            }
        }
        if (this.disabledDates) {
            validDate = !this.isDateDisabled(day, month, year);
        }
        if (this.disabledDays) {
            validDay = !this.isDayDisabled(day, month, year);
        }
        return validMin && validMax && validDate && validDay;
    };
    Calendar.prototype.isDateDisabled = function (day, month, year) {
        var e_2, _a;
        if (this.disabledDates) {
            try {
                for (var _b = __values(this.disabledDates), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var disabledDate = _c.value;
                    if (disabledDate.getFullYear() === year && disabledDate.getMonth() === month && disabledDate.getDate() === day) {
                        return true;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        return false;
    };
    Calendar.prototype.isDayDisabled = function (day, month, year) {
        if (this.disabledDays) {
            var weekday = new Date(year, month, day);
            var weekdayNumber = weekday.getDay();
            return this.disabledDays.indexOf(weekdayNumber) !== -1;
        }
        return false;
    };
    Calendar.prototype.onInputFocus = function (event) {
        this.focus = true;
        if (this.showOnFocus) {
            this.showOverlay();
        }
        this.onFocus.emit(event);
    };
    Calendar.prototype.onInputClick = function (event) {
        if (this.overlay && this.autoZIndex) {
            this.overlay.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
        }
        if (this.showOnFocus && !this.overlayVisible) {
            this.showOverlay();
        }
    };
    Calendar.prototype.onInputBlur = function (event) {
        this.focus = false;
        this.onBlur.emit(event);
        if (!this.keepInvalid) {
            this.updateInputfield();
        }
        this.onModelTouched();
    };
    Calendar.prototype.onButtonClick = function (event, inputfield) {
        if (!this.overlayVisible) {
            inputfield.focus();
            this.showOverlay();
        }
        else {
            this.hideOverlay();
        }
    };
    Calendar.prototype.onInputKeydown = function (event) {
        this.isKeydown = true;
        if (event.keyCode === 9) {
            this.hideOverlay();
        }
    };
    Calendar.prototype.onMonthDropdownChange = function (m) {
        this.currentMonth = parseInt(m);
        this.onMonthChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
        this.createMonths(this.currentMonth, this.currentYear);
    };
    Calendar.prototype.onYearDropdownChange = function (y) {
        this.currentYear = parseInt(y);
        this.onYearChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
        this.createMonths(this.currentMonth, this.currentYear);
    };
    Calendar.prototype.incrementHour = function (event) {
        var prevHour = this.currentHour;
        var newHour = this.currentHour + this.stepHour;
        if (this.validateHour(newHour)) {
            if (this.hourFormat == '24')
                this.currentHour = (newHour >= 24) ? (newHour - 24) : newHour;
            else if (this.hourFormat == '12') {
                // Before the AM/PM break, now after
                if (prevHour < 12 && newHour > 11) {
                    this.pm = !this.pm;
                }
                this.currentHour = (newHour >= 13) ? (newHour - 12) : newHour;
            }
        }
        event.preventDefault();
    };
    Calendar.prototype.onTimePickerElementMouseDown = function (event, type, direction) {
        if (!this.disabled) {
            this.repeat(event, null, type, direction);
            event.preventDefault();
        }
    };
    Calendar.prototype.onTimePickerElementMouseUp = function (event) {
        if (!this.disabled) {
            this.clearTimePickerTimer();
            this.updateTime();
        }
    };
    Calendar.prototype.onTimePickerElementMouseOut = function (event) {
        if (!this.disabled) {
            this.clearTimePickerTimer();
            this.updateTime();
        }
    };
    Calendar.prototype.repeat = function (event, interval, type, direction) {
        var _this = this;
        var i = interval || 500;
        this.clearTimePickerTimer();
        this.timePickerTimer = setTimeout(function () {
            _this.repeat(event, 100, type, direction);
        }, i);
        switch (type) {
            case 0:
                if (direction === 1)
                    this.incrementHour(event);
                else
                    this.decrementHour(event);
                break;
            case 1:
                if (direction === 1)
                    this.incrementMinute(event);
                else
                    this.decrementMinute(event);
                break;
            case 2:
                if (direction === 1)
                    this.incrementSecond(event);
                else
                    this.decrementSecond(event);
                break;
        }
        this.updateInputfield();
    };
    Calendar.prototype.clearTimePickerTimer = function () {
        if (this.timePickerTimer) {
            clearInterval(this.timePickerTimer);
        }
    };
    Calendar.prototype.decrementHour = function (event) {
        var newHour = this.currentHour - this.stepHour;
        if (this.validateHour(newHour)) {
            if (this.hourFormat == '24')
                this.currentHour = (newHour < 0) ? (24 + newHour) : newHour;
            else if (this.hourFormat == '12') {
                // If we were at noon/midnight, then switch
                if (this.currentHour === 12) {
                    this.pm = !this.pm;
                }
                this.currentHour = (newHour <= 0) ? (12 + newHour) : newHour;
            }
        }
        event.preventDefault();
    };
    Calendar.prototype.validateHour = function (hour) {
        var valid = true;
        var value = this.value;
        if (this.isRangeSelection()) {
            value = this.value[1] || this.value[0];
        }
        if (this.isMultipleSelection()) {
            value = this.value[this.value.length - 1];
        }
        var valueDateString = value ? value.toDateString() : null;
        if (this.minDate && valueDateString && this.minDate.toDateString() === valueDateString) {
            if (this.minDate.getHours() > hour) {
                valid = false;
            }
        }
        if (this.maxDate && valueDateString && this.maxDate.toDateString() === valueDateString) {
            if (this.maxDate.getHours() < hour) {
                valid = false;
            }
        }
        return valid;
    };
    Calendar.prototype.incrementMinute = function (event) {
        var newMinute = this.currentMinute + this.stepMinute;
        if (this.validateMinute(newMinute)) {
            this.currentMinute = (newMinute > 59) ? newMinute - 60 : newMinute;
        }
        event.preventDefault();
    };
    Calendar.prototype.decrementMinute = function (event) {
        var newMinute = this.currentMinute - this.stepMinute;
        newMinute = (newMinute < 0) ? 60 + newMinute : newMinute;
        if (this.validateMinute(newMinute)) {
            this.currentMinute = newMinute;
        }
        event.preventDefault();
    };
    Calendar.prototype.validateMinute = function (minute) {
        var valid = true;
        var value = this.value;
        if (this.isRangeSelection()) {
            value = this.value[1] || this.value[0];
        }
        if (this.isMultipleSelection()) {
            value = this.value[this.value.length - 1];
        }
        var valueDateString = value ? value.toDateString() : null;
        if (this.minDate && valueDateString && this.minDate.toDateString() === valueDateString) {
            if (value.getHours() == this.minDate.getHours()) {
                if (this.minDate.getMinutes() > minute) {
                    valid = false;
                }
            }
        }
        if (this.maxDate && valueDateString && this.maxDate.toDateString() === valueDateString) {
            if (value.getHours() == this.maxDate.getHours()) {
                if (this.maxDate.getMinutes() < minute) {
                    valid = false;
                }
            }
        }
        return valid;
    };
    Calendar.prototype.incrementSecond = function (event) {
        var newSecond = this.currentSecond + this.stepSecond;
        if (this.validateSecond(newSecond)) {
            this.currentSecond = (newSecond > 59) ? newSecond - 60 : newSecond;
        }
        event.preventDefault();
    };
    Calendar.prototype.decrementSecond = function (event) {
        var newSecond = this.currentSecond - this.stepSecond;
        newSecond = (newSecond < 0) ? 60 + newSecond : newSecond;
        if (this.validateSecond(newSecond)) {
            this.currentSecond = newSecond;
        }
        event.preventDefault();
    };
    Calendar.prototype.validateSecond = function (second) {
        var valid = true;
        var value = this.value;
        if (this.isRangeSelection()) {
            value = this.value[1] || this.value[0];
        }
        if (this.isMultipleSelection()) {
            value = this.value[this.value.length - 1];
        }
        var valueDateString = value ? value.toDateString() : null;
        if (this.minDate && valueDateString && this.minDate.toDateString() === valueDateString) {
            if (this.minDate.getSeconds() > second) {
                valid = false;
            }
        }
        if (this.maxDate && valueDateString && this.maxDate.toDateString() === valueDateString) {
            if (this.maxDate.getSeconds() < second) {
                valid = false;
            }
        }
        return valid;
    };
    Calendar.prototype.updateTime = function () {
        var value = this.value;
        if (this.isRangeSelection()) {
            value = this.value[1] || this.value[0];
        }
        if (this.isMultipleSelection()) {
            value = this.value[this.value.length - 1];
        }
        value = value ? new Date(value.getTime()) : new Date();
        if (this.hourFormat == '12') {
            if (this.currentHour === 12)
                value.setHours(this.pm ? 12 : 0);
            else
                value.setHours(this.pm ? this.currentHour + 12 : this.currentHour);
        }
        else {
            value.setHours(this.currentHour);
        }
        value.setMinutes(this.currentMinute);
        value.setSeconds(this.currentSecond);
        if (this.isRangeSelection()) {
            if (this.value[1])
                value = [this.value[0], value];
            else
                value = [value, null];
        }
        if (this.isMultipleSelection()) {
            value = __spread(this.value.slice(0, -1), [value]);
        }
        this.updateModel(value);
        this.onSelect.emit(value);
        this.updateInputfield();
    };
    Calendar.prototype.toggleAMPM = function (event) {
        this.pm = !this.pm;
        this.updateTime();
        event.preventDefault();
    };
    Calendar.prototype.onUserInput = function (event) {
        // IE 11 Workaround for input placeholder : https://github.com/primefaces/primeng/issues/2026
        if (!this.isKeydown) {
            return;
        }
        this.isKeydown = false;
        var val = event.target.value;
        try {
            var value = this.parseValueFromString(val);
            if (this.isValidSelection(value)) {
                this.updateModel(value);
                this.updateUI();
            }
        }
        catch (err) {
            //invalid date
            this.updateModel(null);
        }
        this.filled = val != null && val.length;
        this.onInput.emit(event);
    };
    Calendar.prototype.isValidSelection = function (value) {
        var _this = this;
        var isValid = true;
        if (this.isSingleSelection()) {
            if (!this.isSelectable(value.getDate(), value.getMonth(), value.getFullYear(), false)) {
                isValid = false;
            }
        }
        else if (value.every(function (v) { return _this.isSelectable(v.getDate(), v.getMonth(), v.getFullYear(), false); })) {
            if (this.isRangeSelection()) {
                isValid = value.length > 1 && value[1] > value[0] ? true : false;
            }
        }
        return isValid;
    };
    Calendar.prototype.parseValueFromString = function (text) {
        var e_3, _a;
        if (!text || text.trim().length === 0) {
            return null;
        }
        var value;
        if (this.isSingleSelection()) {
            value = this.parseDateTime(text);
        }
        else if (this.isMultipleSelection()) {
            var tokens = text.split(this.multipleSeparator);
            value = [];
            try {
                for (var tokens_1 = __values(tokens), tokens_1_1 = tokens_1.next(); !tokens_1_1.done; tokens_1_1 = tokens_1.next()) {
                    var token = tokens_1_1.value;
                    value.push(this.parseDateTime(token.trim()));
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (tokens_1_1 && !tokens_1_1.done && (_a = tokens_1.return)) _a.call(tokens_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        else if (this.isRangeSelection()) {
            var tokens = text.split(' ' + this.rangeSeparator + ' ');
            value = [];
            for (var i = 0; i < tokens.length; i++) {
                value[i] = this.parseDateTime(tokens[i].trim());
            }
        }
        return value;
    };
    Calendar.prototype.parseDateTime = function (text) {
        var date;
        var parts = text.split(' ');
        if (this.timeOnly) {
            date = new Date();
            this.populateTime(date, parts[0], parts[1]);
        }
        else {
            var dateFormat = this.getDateFormat();
            if (this.showTime) {
                var ampm = this.hourFormat == '12' ? parts.pop() : null;
                var timeString = parts.pop();
                date = this.parseDate(parts.join(' '), dateFormat);
                this.populateTime(date, timeString, ampm);
            }
            else {
                date = this.parseDate(text, dateFormat);
            }
        }
        return date;
    };
    Calendar.prototype.populateTime = function (value, timeString, ampm) {
        if (this.hourFormat == '12' && !ampm) {
            throw 'Invalid Time';
        }
        this.pm = (ampm === 'PM' || ampm === 'pm');
        var time = this.parseTime(timeString);
        value.setHours(time.hour);
        value.setMinutes(time.minute);
        value.setSeconds(time.second);
    };
    Calendar.prototype.updateUI = function () {
        var val = this.value || this.defaultDate || new Date();
        if (Array.isArray(val)) {
            val = val[0];
        }
        this.currentMonth = val.getMonth();
        this.currentYear = val.getFullYear();
        this.createMonths(this.currentMonth, this.currentYear);
        if (this.showTime || this.timeOnly) {
            var hours = val.getHours();
            if (this.hourFormat == '12') {
                this.pm = hours > 11;
                if (hours >= 12) {
                    this.currentHour = (hours == 12) ? 12 : hours - 12;
                }
                else {
                    this.currentHour = (hours == 0) ? 12 : hours;
                }
            }
            else {
                this.currentHour = val.getHours();
            }
            this.currentMinute = val.getMinutes();
            this.currentSecond = val.getSeconds();
        }
    };
    Calendar.prototype.showOverlay = function () {
        if (!this.overlayVisible) {
            this.updateUI();
            this.overlayVisible = true;
        }
    };
    Calendar.prototype.hideOverlay = function () {
        this.overlayVisible = false;
        this.clearTimePickerTimer();
        if (this.touchUI) {
            this.disableModality();
        }
    };
    Calendar.prototype.toggle = function () {
        if (!this.inline) {
            if (!this.overlayVisible) {
                this.showOverlay();
                this.inputfieldViewChild.nativeElement.focus();
            }
            else {
                this.hideOverlay();
            }
        }
    };
    Calendar.prototype.onOverlayAnimationStart = function (event) {
        switch (event.toState) {
            case 'visible':
            case 'visibleTouchUI':
                if (!this.inline) {
                    this.overlay = event.element;
                    this.appendOverlay();
                    if (this.autoZIndex) {
                        this.overlay.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
                    }
                    this.alignOverlay();
                }
                break;
            case 'void':
                this.onOverlayHide();
                this.onClose.emit(event);
                break;
        }
    };
    Calendar.prototype.onOverlayAnimationDone = function (event) {
        switch (event.toState) {
            case 'visible':
            case 'visibleTouchUI':
                if (!this.inline) {
                    this.bindDocumentClickListener();
                    this.bindDocumentResizeListener();
                }
                break;
        }
    };
    Calendar.prototype.appendOverlay = function () {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.overlay);
            else
                DomHandler.appendChild(this.overlay, this.appendTo);
        }
    };
    Calendar.prototype.restoreOverlayAppend = function () {
        if (this.overlay && this.appendTo) {
            this.el.nativeElement.appendChild(this.overlay);
        }
    };
    Calendar.prototype.alignOverlay = function () {
        if (this.touchUI) {
            this.enableModality(this.overlay);
        }
        else {
            if (this.appendTo)
                DomHandler.absolutePosition(this.overlay, this.inputfieldViewChild.nativeElement);
            else
                DomHandler.relativePosition(this.overlay, this.inputfieldViewChild.nativeElement);
        }
    };
    Calendar.prototype.enableModality = function (element) {
        var _this = this;
        if (!this.mask) {
            this.mask = document.createElement('div');
            this.mask.style.zIndex = String(parseInt(element.style.zIndex) - 1);
            var maskStyleClass = 'ui-widget-overlay ui-datepicker-mask ui-datepicker-mask-scrollblocker';
            DomHandler.addMultipleClasses(this.mask, maskStyleClass);
            this.maskClickListener = this.renderer.listen(this.mask, 'click', function (event) {
                _this.disableModality();
            });
            document.body.appendChild(this.mask);
            DomHandler.addClass(document.body, 'ui-overflow-hidden');
        }
    };
    Calendar.prototype.disableModality = function () {
        if (this.mask) {
            document.body.removeChild(this.mask);
            var bodyChildren = document.body.children;
            var hasBlockerMasks = void 0;
            for (var i = 0; i < bodyChildren.length; i++) {
                var bodyChild = bodyChildren[i];
                if (DomHandler.hasClass(bodyChild, 'ui-datepicker-mask-scrollblocker')) {
                    hasBlockerMasks = true;
                    break;
                }
            }
            if (!hasBlockerMasks) {
                DomHandler.removeClass(document.body, 'ui-overflow-hidden');
            }
            this.unbindMaskClickListener();
            this.mask = null;
        }
    };
    Calendar.prototype.unbindMaskClickListener = function () {
        if (this.maskClickListener) {
            this.maskClickListener();
            this.maskClickListener = null;
        }
    };
    Calendar.prototype.writeValue = function (value) {
        this.value = value;
        if (this.value && typeof this.value === 'string') {
            this.value = this.parseValueFromString(this.value);
        }
        this.updateInputfield();
        this.updateUI();
    };
    Calendar.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    Calendar.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    Calendar.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    Calendar.prototype.getDateFormat = function () {
        return this.dateFormat || this.locale.dateFormat;
    };
    // Ported from jquery-ui datepicker formatDate
    Calendar.prototype.formatDate = function (date, format) {
        if (!date) {
            return '';
        }
        var iFormat;
        var lookAhead = function (match) {
            var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
            if (matches) {
                iFormat++;
            }
            return matches;
        }, formatNumber = function (match, value, len) {
            var num = '' + value;
            if (lookAhead(match)) {
                while (num.length < len) {
                    num = '0' + num;
                }
            }
            return num;
        }, formatName = function (match, value, shortNames, longNames) {
            return (lookAhead(match) ? longNames[value] : shortNames[value]);
        };
        var output = '';
        var literal = false;
        if (date) {
            for (iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal) {
                    if (format.charAt(iFormat) === '\'' && !lookAhead('\'')) {
                        literal = false;
                    }
                    else {
                        output += format.charAt(iFormat);
                    }
                }
                else {
                    switch (format.charAt(iFormat)) {
                        case 'd':
                            output += formatNumber('d', date.getDate(), 2);
                            break;
                        case 'D':
                            output += formatName('D', date.getDay(), this.locale.dayNamesShort, this.locale.dayNames);
                            break;
                        case 'o':
                            output += formatNumber('o', Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() -
                                new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
                            break;
                        case 'm':
                            output += formatNumber('m', date.getMonth() + 1, 2);
                            break;
                        case 'M':
                            output += formatName('M', date.getMonth(), this.locale.monthNamesShort, this.locale.monthNames);
                            break;
                        case 'y':
                            output += lookAhead('y') ? date.getFullYear() : (date.getFullYear() % 100 < 10 ? '0' : '') + (date.getFullYear() % 100);
                            break;
                        case '@':
                            output += date.getTime();
                            break;
                        case '!':
                            output += date.getTime() * 10000 + this.ticksTo1970;
                            break;
                        case '\'':
                            if (lookAhead('\'')) {
                                output += '\'';
                            }
                            else {
                                literal = true;
                            }
                            break;
                        default:
                            output += format.charAt(iFormat);
                    }
                }
            }
        }
        return output;
    };
    Calendar.prototype.formatTime = function (date) {
        if (!date) {
            return '';
        }
        var output = '';
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        if (this.hourFormat == '12' && hours > 11 && hours != 12) {
            hours -= 12;
        }
        if (this.hourFormat == '12') {
            output += hours === 0 ? 12 : (hours < 10) ? '0' + hours : hours;
        }
        else {
            output += (hours < 10) ? '0' + hours : hours;
        }
        output += ':';
        output += (minutes < 10) ? '0' + minutes : minutes;
        if (this.showSeconds) {
            output += ':';
            output += (seconds < 10) ? '0' + seconds : seconds;
        }
        if (this.hourFormat == '12') {
            output += date.getHours() > 11 ? ' PM' : ' AM';
        }
        return output;
    };
    Calendar.prototype.parseTime = function (value) {
        var tokens = value.split(':');
        var validTokenLength = this.showSeconds ? 3 : 2;
        if (tokens.length !== validTokenLength) {
            throw "Invalid time";
        }
        var h = parseInt(tokens[0]);
        var m = parseInt(tokens[1]);
        var s = this.showSeconds ? parseInt(tokens[2]) : null;
        if (isNaN(h) || isNaN(m) || h > 23 || m > 59 || (this.hourFormat == '12' && h > 12) || (this.showSeconds && (isNaN(s) || s > 59))) {
            throw "Invalid time";
        }
        else {
            if (this.hourFormat == '12') {
                if (h !== 12 && this.pm) {
                    h += 12;
                }
                else if (!this.pm && h === 12) {
                    h -= 12;
                }
            }
            return { hour: h, minute: m, second: s };
        }
    };
    // Ported from jquery-ui datepicker parseDate
    Calendar.prototype.parseDate = function (value, format) {
        if (format == null || value == null) {
            throw "Invalid arguments";
        }
        value = (typeof value === "object" ? value.toString() : value + "");
        if (value === "") {
            return null;
        }
        var iFormat, dim, extra, iValue = 0, shortYearCutoff = (typeof this.shortYearCutoff !== "string" ? this.shortYearCutoff : new Date().getFullYear() % 100 + parseInt(this.shortYearCutoff, 10)), year = -1, month = -1, day = -1, doy = -1, literal = false, date, lookAhead = function (match) {
            var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
            if (matches) {
                iFormat++;
            }
            return matches;
        }, getNumber = function (match) {
            var isDoubled = lookAhead(match), size = (match === "@" ? 14 : (match === "!" ? 20 :
                (match === "y" && isDoubled ? 4 : (match === "o" ? 3 : 2)))), minSize = (match === "y" ? size : 1), digits = new RegExp("^\\d{" + minSize + "," + size + "}"), num = value.substring(iValue).match(digits);
            if (!num) {
                throw "Missing number at position " + iValue;
            }
            iValue += num[0].length;
            return parseInt(num[0], 10);
        }, getName = function (match, shortNames, longNames) {
            var index = -1;
            var arr = lookAhead(match) ? longNames : shortNames;
            var names = [];
            for (var i = 0; i < arr.length; i++) {
                names.push([i, arr[i]]);
            }
            names.sort(function (a, b) {
                return -(a[1].length - b[1].length);
            });
            for (var i = 0; i < names.length; i++) {
                var name_1 = names[i][1];
                if (value.substr(iValue, name_1.length).toLowerCase() === name_1.toLowerCase()) {
                    index = names[i][0];
                    iValue += name_1.length;
                    break;
                }
            }
            if (index !== -1) {
                return index + 1;
            }
            else {
                throw "Unknown name at position " + iValue;
            }
        }, checkLiteral = function () {
            if (value.charAt(iValue) !== format.charAt(iFormat)) {
                throw "Unexpected literal at position " + iValue;
            }
            iValue++;
        };
        if (this.view === 'month') {
            day = 1;
        }
        for (iFormat = 0; iFormat < format.length; iFormat++) {
            if (literal) {
                if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
                    literal = false;
                }
                else {
                    checkLiteral();
                }
            }
            else {
                switch (format.charAt(iFormat)) {
                    case "d":
                        day = getNumber("d");
                        break;
                    case "D":
                        getName("D", this.locale.dayNamesShort, this.locale.dayNames);
                        break;
                    case "o":
                        doy = getNumber("o");
                        break;
                    case "m":
                        month = getNumber("m");
                        break;
                    case "M":
                        month = getName("M", this.locale.monthNamesShort, this.locale.monthNames);
                        break;
                    case "y":
                        year = getNumber("y");
                        break;
                    case "@":
                        date = new Date(getNumber("@"));
                        year = date.getFullYear();
                        month = date.getMonth() + 1;
                        day = date.getDate();
                        break;
                    case "!":
                        date = new Date((getNumber("!") - this.ticksTo1970) / 10000);
                        year = date.getFullYear();
                        month = date.getMonth() + 1;
                        day = date.getDate();
                        break;
                    case "'":
                        if (lookAhead("'")) {
                            checkLiteral();
                        }
                        else {
                            literal = true;
                        }
                        break;
                    default:
                        checkLiteral();
                }
            }
        }
        if (iValue < value.length) {
            extra = value.substr(iValue);
            if (!/^\s+/.test(extra)) {
                throw "Extra/unparsed characters found in date: " + extra;
            }
        }
        if (year === -1) {
            year = new Date().getFullYear();
        }
        else if (year < 100) {
            year += new Date().getFullYear() - new Date().getFullYear() % 100 +
                (year <= shortYearCutoff ? 0 : -100);
        }
        if (doy > -1) {
            month = 1;
            day = doy;
            do {
                dim = this.getDaysCountInMonth(year, month - 1);
                if (day <= dim) {
                    break;
                }
                month++;
                day -= dim;
            } while (true);
        }
        date = this.daylightSavingAdjust(new Date(year, month - 1, day));
        if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
            throw "Invalid date"; // E.g. 31/02/00
        }
        return date;
    };
    Calendar.prototype.daylightSavingAdjust = function (date) {
        if (!date) {
            return null;
        }
        date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
        return date;
    };
    Calendar.prototype.updateFilledState = function () {
        this.filled = this.inputFieldValue && this.inputFieldValue != '';
    };
    Calendar.prototype.onTodayButtonClick = function (event) {
        var date = new Date();
        var dateMeta = { day: date.getDate(), month: date.getMonth(), year: date.getFullYear(), otherMonth: date.getMonth() !== this.currentMonth || date.getFullYear() !== this.currentYear, today: true, selectable: true };
        this.onDateSelect(event, dateMeta);
        this.onTodayClick.emit(event);
    };
    Calendar.prototype.onClearButtonClick = function (event) {
        this.updateModel(null);
        this.updateInputfield();
        this.hideOverlay();
        this.onClearClick.emit(event);
    };
    Calendar.prototype.bindDocumentClickListener = function () {
        var _this = this;
        if (!this.documentClickListener) {
            this.zone.runOutsideAngular(function () {
                _this.documentClickListener = _this.renderer.listen('document', 'click', function (event) {
                    if (_this.isOutsideClicked(event) && _this.overlayVisible) {
                        _this.zone.run(function () {
                            _this.hideOverlay();
                            _this.cd.markForCheck();
                        });
                    }
                });
            });
        }
    };
    Calendar.prototype.unbindDocumentClickListener = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    };
    Calendar.prototype.bindDocumentResizeListener = function () {
        if (!this.documentResizeListener && !this.touchUI) {
            this.documentResizeListener = this.onWindowResize.bind(this);
            window.addEventListener('resize', this.documentResizeListener);
        }
    };
    Calendar.prototype.unbindDocumentResizeListener = function () {
        if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    };
    Calendar.prototype.isOutsideClicked = function (event) {
        return !(this.el.nativeElement.isSameNode(event.target) || this.isNavIconClicked(event) ||
            this.el.nativeElement.contains(event.target) || (this.overlay && this.overlay.contains(event.target)));
    };
    Calendar.prototype.isNavIconClicked = function (event) {
        return (DomHandler.hasClass(event.target, 'ui-datepicker-prev') || DomHandler.hasClass(event.target, 'ui-datepicker-prev-icon')
            || DomHandler.hasClass(event.target, 'ui-datepicker-next') || DomHandler.hasClass(event.target, 'ui-datepicker-next-icon'));
    };
    Calendar.prototype.onWindowResize = function () {
        if (this.overlayVisible && !DomHandler.isAndroid()) {
            this.hideOverlay();
        }
    };
    Calendar.prototype.onOverlayHide = function () {
        this.unbindDocumentClickListener();
        this.unbindMaskClickListener();
        this.unbindDocumentResizeListener();
        this.overlay = null;
        this.disableModality();
    };
    Calendar.prototype.ngOnDestroy = function () {
        this.clearTimePickerTimer();
        this.restoreOverlayAppend();
        this.onOverlayHide();
    };
    Calendar.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: ChangeDetectorRef },
        { type: NgZone }
    ]; };
    __decorate([
        Input()
    ], Calendar.prototype, "defaultDate", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "style", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "inputStyle", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "inputId", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "name", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "inputStyleClass", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "placeholder", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "dateFormat", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "multipleSeparator", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "rangeSeparator", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "inline", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "showOtherMonths", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "selectOtherMonths", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "showIcon", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "icon", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "appendTo", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "readonlyInput", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "shortYearCutoff", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "monthNavigator", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "yearNavigator", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "hourFormat", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "timeOnly", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "stepHour", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "stepMinute", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "stepSecond", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "showSeconds", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "required", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "showOnFocus", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "showWeek", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "dataType", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "selectionMode", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "maxDateCount", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "showButtonBar", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "todayButtonStyleClass", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "clearButtonStyleClass", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "autoZIndex", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "baseZIndex", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "panelStyleClass", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "panelStyle", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "keepInvalid", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "hideOnDateTimeSelect", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "numberOfMonths", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "view", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "touchUI", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "timeSeparator", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "showTransitionOptions", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "hideTransitionOptions", void 0);
    __decorate([
        Output()
    ], Calendar.prototype, "onFocus", void 0);
    __decorate([
        Output()
    ], Calendar.prototype, "onBlur", void 0);
    __decorate([
        Output()
    ], Calendar.prototype, "onClose", void 0);
    __decorate([
        Output()
    ], Calendar.prototype, "onSelect", void 0);
    __decorate([
        Output()
    ], Calendar.prototype, "onInput", void 0);
    __decorate([
        Output()
    ], Calendar.prototype, "onTodayClick", void 0);
    __decorate([
        Output()
    ], Calendar.prototype, "onClearClick", void 0);
    __decorate([
        Output()
    ], Calendar.prototype, "onMonthChange", void 0);
    __decorate([
        Output()
    ], Calendar.prototype, "onYearChange", void 0);
    __decorate([
        ContentChildren(PrimeTemplate)
    ], Calendar.prototype, "templates", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "tabindex", void 0);
    __decorate([
        ViewChild('inputfield', { static: false })
    ], Calendar.prototype, "inputfieldViewChild", void 0);
    __decorate([
        Input()
    ], Calendar.prototype, "minDate", null);
    __decorate([
        Input()
    ], Calendar.prototype, "maxDate", null);
    __decorate([
        Input()
    ], Calendar.prototype, "disabledDates", null);
    __decorate([
        Input()
    ], Calendar.prototype, "disabledDays", null);
    __decorate([
        Input()
    ], Calendar.prototype, "yearRange", null);
    __decorate([
        Input()
    ], Calendar.prototype, "showTime", null);
    __decorate([
        Input()
    ], Calendar.prototype, "locale", null);
    Calendar = __decorate([
        Component({
            selector: 'p-calendar',
            template: "\n        <span [ngClass]=\"{'ui-calendar':true, 'ui-calendar-w-btn': showIcon, 'ui-calendar-timeonly': timeOnly}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <ng-template [ngIf]=\"!inline\">\n                <input #inputfield type=\"text\" [attr.id]=\"inputId\" [attr.name]=\"name\" [attr.required]=\"required\" [attr.aria-required]=\"required\" [value]=\"inputFieldValue\" (focus)=\"onInputFocus($event)\" (keydown)=\"onInputKeydown($event)\" (click)=\"onInputClick($event)\" (blur)=\"onInputBlur($event)\"\n                    [readonly]=\"readonlyInput\" (input)=\"onUserInput($event)\" [ngStyle]=\"inputStyle\" [class]=\"inputStyleClass\" [placeholder]=\"placeholder||''\" [disabled]=\"disabled\" [attr.tabindex]=\"tabindex\"\n                    [ngClass]=\"'ui-inputtext ui-widget ui-state-default ui-corner-all'\" autocomplete=\"off\"\n                    ><button type=\"button\" [icon]=\"icon\" pButton *ngIf=\"showIcon\" (click)=\"onButtonClick($event,inputfield)\" class=\"ui-datepicker-trigger ui-calendar-button\"\n                    [ngClass]=\"{'ui-state-disabled':disabled}\" [disabled]=\"disabled\" tabindex=\"-1\"></button>\n            </ng-template>\n            <div [class]=\"panelStyleClass\" [ngStyle]=\"panelStyle\" [ngClass]=\"{'ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all': true, 'ui-datepicker-inline':inline,'ui-shadow':!inline,\n                'ui-state-disabled':disabled,'ui-datepicker-timeonly':timeOnly,'ui-datepicker-multiple-month': this.numberOfMonths > 1, 'ui-datepicker-monthpicker': (view === 'month'), 'ui-datepicker-touch-ui': touchUI}\"\n                [@overlayAnimation]=\"touchUI ? {value: 'visibleTouchUI', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}: \n                                            {value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\" \n                                            [@.disabled]=\"inline === true\" (@overlayAnimation.start)=\"onOverlayAnimationStart($event)\" (@overlayAnimation.done)=\"onOverlayAnimationDone($event)\" *ngIf=\"inline || overlayVisible\">\n                <ng-content select=\"p-header\"></ng-content>\n                <ng-container *ngIf=\"!timeOnly\">\n                    <div class=\"ui-datepicker-group ui-widget-content\" *ngFor=\"let month of months; let i = index;\">\n                        <div class=\"ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all\">\n                            <a class=\"ui-datepicker-prev ui-corner-all\" (click)=\"navBackward($event)\" *ngIf=\"i === 0\">\n                                <span class=\"ui-datepicker-prev-icon pi pi-chevron-left\"></span>\n                            </a>\n                            <a class=\"ui-datepicker-next ui-corner-all\" (click)=\"navForward($event)\" *ngIf=\"numberOfMonths === 1 ? true : (i === numberOfMonths -1)\">\n                                <span class=\"ui-datepicker-next-icon pi pi-chevron-right\"></span>\n                            </a>\n                            <div class=\"ui-datepicker-title\">\n                                <span class=\"ui-datepicker-month\" *ngIf=\"!monthNavigator && (view !== 'month')\">{{locale.monthNames[month.month]}}</span>\n                                <select tabindex=\"-1\" class=\"ui-datepicker-month\" *ngIf=\"monthNavigator && (view !== 'month') && numberOfMonths === 1\" (change)=\"onMonthDropdownChange($event.target.value)\">\n                                    <option [value]=\"i\" *ngFor=\"let monthName of locale.monthNames;let i = index\" [selected]=\"i === month.month\">{{monthName}}</option>\n                                </select>\n                                <select tabindex=\"-1\" class=\"ui-datepicker-year\" *ngIf=\"yearNavigator && numberOfMonths === 1\" (change)=\"onYearDropdownChange($event.target.value)\">\n                                    <option [value]=\"year\" *ngFor=\"let year of yearOptions\" [selected]=\"year === currentYear\">{{year}}</option>\n                                </select>\n                                <span class=\"ui-datepicker-year\" *ngIf=\"!yearNavigator\">{{view === 'month' ? currentYear : month.year}}</span>\n                            </div>\n                        </div>\n                        <div class=\"ui-datepicker-calendar-container\" *ngIf=\"view ==='date'\">\n                            <table class=\"ui-datepicker-calendar\">\n                                <thead>\n                                    <tr>\n                                        <th *ngIf=\"showWeek\" class=\"ui-datepicker-weekheader\">\n                                            <span>{{locale['weekHeader']}}</span>\n                                        </th>\n                                        <th scope=\"col\" *ngFor=\"let weekDay of weekDays;let begin = first; let end = last\">\n                                            <span>{{weekDay}}</span>\n                                        </th>\n                                    </tr>\n                                </thead>\n                                <tbody>\n                                    <tr *ngFor=\"let week of month.dates; let i = index;\">\n                                        <td *ngIf=\"showWeek\" class=\"ui-datepicker-weeknumber ui-state-disabled\">\n                                            <span>\n                                                {{month.weekNumbers[i]}}\n                                            </span>\n                                        </td>\n                                        <td *ngFor=\"let date of week\" [ngClass]=\"{'ui-datepicker-other-month': date.otherMonth,\n                                            'ui-datepicker-current-day':isSelected(date),'ui-datepicker-today':date.today}\">\n                                            <ng-container *ngIf=\"date.otherMonth ? showOtherMonths : true\">\n                                                <a class=\"ui-state-default\" *ngIf=\"date.selectable\" [ngClass]=\"{'ui-state-active':isSelected(date), 'ui-state-highlight':date.today}\"\n                                                    (click)=\"onDateSelect($event,date)\" draggable=\"false\">\n                                                    <ng-container *ngIf=\"!dateTemplate\">{{date.day}}</ng-container>\n                                                    <ng-container *ngTemplateOutlet=\"dateTemplate; context: {$implicit: date}\"></ng-container>\n                                                </a>\n                                                <span class=\"ui-state-default ui-state-disabled\" [ngClass]=\"{'ui-state-active':isSelected(date), 'ui-state-highlight':date.today}\" *ngIf=\"!date.selectable\">\n                                                    {{date.day}}\n                                                </span>\n                                            </ng-container>\n                                        </td>\n                                    </tr>\n                                </tbody>\n                            </table>\n                        </div>\n                    </div>\n                    <div class=\"ui-monthpicker\" *ngIf=\"view === 'month'\">\n                        <a  *ngFor=\"let m of monthPickerValues; let i = index\" (click)=\"onMonthSelect($event, i)\" class=\"ui-monthpicker-month\" [ngClass]=\"{'ui-state-active': isMonthSelected(i)}\">\n                            {{m}}\n                        </a>\n                    </div>\n                </ng-container>\n                <div class=\"ui-timepicker ui-widget-header ui-corner-all\" *ngIf=\"showTime||timeOnly\">\n                    <div class=\"ui-hour-picker\">\n                        <a  (mousedown)=\"onTimePickerElementMouseDown($event, 0, 1)\" (mouseup)=\"onTimePickerElementMouseUp($event)\" (mouseout)=\"onTimePickerElementMouseOut($event)\">\n                            <span class=\"pi pi-chevron-up\"></span>\n                        </a>\n                        <span [ngStyle]=\"{'display': currentHour < 10 ? 'inline': 'none'}\">0</span><span>{{currentHour}}</span>\n                        <a  (mousedown)=\"onTimePickerElementMouseDown($event, 0, -1)\" (mouseup)=\"onTimePickerElementMouseUp($event)\" (mouseout)=\"onTimePickerElementMouseOut($event)\">\n                            <span class=\"pi pi-chevron-down\"></span>\n                        </a>\n                    </div>\n                    <div class=\"ui-separator\">\n                        <a >\n                            <span class=\"pi pi-chevron-up\"></span>\n                        </a>\n                        <span>{{timeSeparator}}</span>\n                        <a >\n                            <span class=\"pi pi-chevron-down\"></span>\n                        </a>\n                    </div>\n                    <div class=\"ui-minute-picker\">\n                        <a  (mousedown)=\"onTimePickerElementMouseDown($event, 1, 1)\" (mouseup)=\"onTimePickerElementMouseUp($event)\" (mouseout)=\"onTimePickerElementMouseOut($event)\">\n                            <span class=\"pi pi-chevron-up\"></span>\n                        </a>\n                        <span [ngStyle]=\"{'display': currentMinute < 10 ? 'inline': 'none'}\">0</span><span>{{currentMinute}}</span>\n                        <a  (mousedown)=\"onTimePickerElementMouseDown($event, 1, -1)\" (mouseup)=\"onTimePickerElementMouseUp($event)\" (mouseout)=\"onTimePickerElementMouseOut($event)\">\n                            <span class=\"pi pi-chevron-down\"></span>\n                        </a>\n                    </div>\n                    <div class=\"ui-separator\" *ngIf=\"showSeconds\">\n                        <a >\n                            <span class=\"pi pi-chevron-up\"></span>\n                        </a>\n                        <span>{{timeSeparator}}</span>\n                        <a >\n                            <span class=\"pi pi-chevron-down\"></span>\n                        </a>\n                    </div>\n                    <div class=\"ui-second-picker\" *ngIf=\"showSeconds\">\n                        <a  (mousedown)=\"onTimePickerElementMouseDown($event, 2, 1)\" (mouseup)=\"onTimePickerElementMouseUp($event)\" (mouseout)=\"onTimePickerElementMouseOut($event)\">\n                            <span class=\"pi pi-chevron-up\"></span>\n                        </a>\n                        <span [ngStyle]=\"{'display': currentSecond < 10 ? 'inline': 'none'}\">0</span><span>{{currentSecond}}</span>\n                        <a  (mousedown)=\"onTimePickerElementMouseDown($event, 2, -1)\" (mouseup)=\"onTimePickerElementMouseUp($event)\" (mouseout)=\"onTimePickerElementMouseOut($event)\">\n                            <span class=\"pi pi-chevron-down\"></span>\n                        </a>\n                    </div>\n                    <div class=\"ui-ampm-picker\" *ngIf=\"hourFormat=='12'\">\n                        <a  (click)=\"toggleAMPM($event)\">\n                            <span class=\"pi pi-chevron-up\"></span>\n                        </a>\n                        <span>{{pm ? 'PM' : 'AM'}}</span>\n                        <a  (click)=\"toggleAMPM($event)\">\n                            <span class=\"pi pi-chevron-down\"></span>\n                        </a>\n                    </div>\n                </div>\n                <div class=\"ui-datepicker-buttonbar ui-widget-header\" *ngIf=\"showButtonBar\">\n                    <div class=\"ui-g\">\n                        <div class=\"ui-g-6\">\n                            <button type=\"button\" tabindex=\"-1\" [label]=\"_locale.today\" (click)=\"onTodayButtonClick($event)\" pButton [ngClass]=\"[todayButtonStyleClass]\"></button>\n                        </div>\n                        <div class=\"ui-g-6\">\n                            <button type=\"button\" tabindex=\"-1\" [label]=\"_locale.clear\" (click)=\"onClearButtonClick($event)\" pButton [ngClass]=\"[clearButtonStyleClass]\"></button>\n                        </div>\n                    </div>\n                </div>\n                <ng-content select=\"p-footer\"></ng-content>\n            </div>\n        </span>\n    ",
            animations: [
                trigger('overlayAnimation', [
                    state('visible', style({
                        transform: 'translateY(0)',
                        opacity: 1
                    })),
                    state('visibleTouchUI', style({
                        transform: 'translate(-50%,-50%)',
                        opacity: 1
                    })),
                    transition('void => visible', [
                        style({ transform: 'translateY(5%)', opacity: 0 }),
                        animate('{{showTransitionParams}}')
                    ]),
                    transition('visible => void', [
                        animate(('{{hideTransitionParams}}'), style({
                            opacity: 0,
                            transform: 'translateY(5%)'
                        }))
                    ]),
                    transition('void => visibleTouchUI', [
                        style({ opacity: 0, transform: 'translate3d(-50%, -40%, 0) scale(0.9)' }),
                        animate('{{showTransitionParams}}')
                    ]),
                    transition('visibleTouchUI => void', [
                        animate(('{{hideTransitionParams}}'), style({
                            opacity: 0,
                            transform: 'translate3d(-50%, -40%, 0) scale(0.9)'
                        }))
                    ])
                ])
            ],
            host: {
                '[class.ui-inputwrapper-filled]': 'filled',
                '[class.ui-inputwrapper-focus]': 'focus'
            },
            providers: [CALENDAR_VALUE_ACCESSOR]
        })
    ], Calendar);
    return Calendar;
}());
export { Calendar };
var CalendarModule = /** @class */ (function () {
    function CalendarModule() {
    }
    CalendarModule = __decorate([
        NgModule({
            imports: [CommonModule, ButtonModule, SharedModule],
            exports: [Calendar, ButtonModule, SharedModule],
            declarations: [Calendar]
        })
    ], CalendarModule);
    return CalendarModule;
}());
export { CalendarModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2NhbGVuZGFyLyIsInNvdXJjZXMiOlsiY2FsZW5kYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLFVBQVUsRUFBQyxTQUFTLEVBQzdGLFNBQVMsRUFBQyxpQkFBaUIsRUFBQyxXQUFXLEVBQUMsZUFBZSxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEcsT0FBTyxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQWdCLE1BQU0scUJBQXFCLENBQUM7QUFDMUYsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxZQUFZLEVBQUMsYUFBYSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3ZELE9BQU8sRUFBQyxpQkFBaUIsRUFBdUIsTUFBTSxnQkFBZ0IsQ0FBQztBQUV2RSxNQUFNLENBQUMsSUFBTSx1QkFBdUIsR0FBUTtJQUN4QyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLFFBQVEsRUFBUixDQUFRLENBQUM7SUFDdkMsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDO0FBNk1GO0lBbVRJLGtCQUFtQixFQUFjLEVBQVMsUUFBbUIsRUFBUyxFQUFxQixFQUFVLElBQVk7UUFBOUYsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBUyxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUFVLFNBQUksR0FBSixJQUFJLENBQVE7UUEvUnhHLGVBQVUsR0FBVyxVQUFVLENBQUM7UUFFaEMsc0JBQWlCLEdBQVcsR0FBRyxDQUFDO1FBRWhDLG1CQUFjLEdBQVcsR0FBRyxDQUFDO1FBRTdCLFdBQU0sR0FBWSxLQUFLLENBQUM7UUFFeEIsb0JBQWUsR0FBWSxJQUFJLENBQUM7UUFNaEMsU0FBSSxHQUFXLGdCQUFnQixDQUFDO1FBTWhDLG9CQUFlLEdBQVEsS0FBSyxDQUFDO1FBTTdCLGVBQVUsR0FBVyxJQUFJLENBQUM7UUFJMUIsYUFBUSxHQUFXLENBQUMsQ0FBQztRQUVyQixlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBRXZCLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFFdkIsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFJN0IsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFFNUIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUUxQixhQUFRLEdBQVcsTUFBTSxDQUFDO1FBRTFCLGtCQUFhLEdBQVcsUUFBUSxDQUFDO1FBTWpDLDBCQUFxQixHQUFXLHFCQUFxQixDQUFDO1FBRXRELDBCQUFxQixHQUFXLHFCQUFxQixDQUFDO1FBRXRELGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFM0IsZUFBVSxHQUFXLENBQUMsQ0FBQztRQU12QixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUU3Qix5QkFBb0IsR0FBWSxLQUFLLENBQUM7UUFFdEMsbUJBQWMsR0FBVyxDQUFDLENBQUM7UUFFM0IsU0FBSSxHQUFXLE1BQU0sQ0FBQztRQUl0QixrQkFBYSxHQUFXLEdBQUcsQ0FBQztRQUU1QiwwQkFBcUIsR0FBVyxnQkFBZ0IsQ0FBQztRQUVqRCwwQkFBcUIsR0FBVyxlQUFlLENBQUM7UUFFL0MsWUFBTyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWhELFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUUvQyxZQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFaEQsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWpELFlBQU8sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVoRCxpQkFBWSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXJELGlCQUFZLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFckQsa0JBQWEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV0RCxpQkFBWSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBSS9ELFlBQU8sR0FBbUI7WUFDdEIsY0FBYyxFQUFFLENBQUM7WUFDakIsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDO1lBQ3hGLGFBQWEsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztZQUNoRSxXQUFXLEVBQUUsQ0FBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLENBQUM7WUFDakQsVUFBVSxFQUFFLENBQUUsU0FBUyxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxXQUFXLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxVQUFVLENBQUU7WUFDN0gsZUFBZSxFQUFFLENBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUU7WUFDdEcsS0FBSyxFQUFFLE9BQU87WUFDZCxLQUFLLEVBQUUsT0FBTztZQUNkLFVBQVUsRUFBRSxVQUFVO1lBQ3RCLFVBQVUsRUFBRSxJQUFJO1NBQ25CLENBQUM7UUFvQ0Ysa0JBQWEsR0FBYSxjQUFPLENBQUMsQ0FBQztRQUVuQyxtQkFBYyxHQUFhLGNBQU8sQ0FBQyxDQUFDO1FBa0JwQyxvQkFBZSxHQUFXLElBQUksQ0FBQztJQXdIcUYsQ0FBQztJQTlGNUcsc0JBQUksNkJBQU87YUFBWDtZQUNMLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN6QixDQUFDO2FBRUQsVUFBWSxJQUFVO1lBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBRXJCLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDakYsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUMxRDtRQUNMLENBQUM7OztPQVJBO0lBVVEsc0JBQUksNkJBQU87YUFBWDtZQUNMLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN6QixDQUFDO2FBRUQsVUFBWSxJQUFVO1lBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBRXJCLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLElBQUssSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDbEYsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUMxRDtRQUNMLENBQUM7OztPQVJBO0lBVVEsc0JBQUksbUNBQWE7YUFBakI7WUFDTCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDL0IsQ0FBQzthQUVELFVBQWtCLGFBQXFCO1lBQ25DLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1lBQ3BDLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLElBQUssSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFFbEYsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUMxRDtRQUNMLENBQUM7OztPQVJBO0lBVVEsc0JBQUksa0NBQVk7YUFBaEI7WUFDTCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDOUIsQ0FBQzthQUVELFVBQWlCLFlBQXNCO1lBQ25DLElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFDO1lBRWxDLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLElBQUssSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDbEYsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUMxRDtRQUNMLENBQUM7OztPQVJBO0lBVVEsc0JBQUksK0JBQVM7YUFBYjtZQUNMLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMzQixDQUFDO2FBRUQsVUFBYyxTQUFpQjtZQUMzQixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztZQUU1QixJQUFJLFNBQVMsRUFBRTtnQkFDWCxJQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNuQyxJQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLElBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFbkMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQzthQUNoRDtRQUNMLENBQUM7OztPQVpBO0lBY1Esc0JBQUksOEJBQVE7YUFBWjtZQUNMLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMxQixDQUFDO2FBRUQsVUFBYSxRQUFpQjtZQUMxQixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztZQUUxQixJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssU0FBUyxFQUFFO2dCQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2FBQ3pDO1lBQ0QsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDNUIsQ0FBQzs7O09BVEE7SUFXRCxzQkFBSSw0QkFBTTthQUFWO1lBQ0csT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3ZCLENBQUM7YUFHRCxVQUFXLFNBQXlCO1lBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1lBRXhCLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUMzRDtpQkFDSSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO2dCQUMzQixJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQzthQUNuQztRQUNKLENBQUM7OztPQWJBO0lBaUJELDJCQUFRLEdBQVI7UUFDSSxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFFLElBQUksSUFBSSxFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFdEMsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtZQUN0QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLFFBQVEsQ0FBQyxDQUFDO1NBQzlJO2FBQ0ksSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtZQUM1QixJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztTQUNsQztJQUNMLENBQUM7SUFFRCxxQ0FBa0IsR0FBbEI7UUFBQSxpQkFZQztRQVhHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSTtZQUN4QixRQUFRLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDcEIsS0FBSyxNQUFNO29CQUNQLEtBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDdEMsTUFBTTtnQkFFTjtvQkFDSSxLQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ3RDLE1BQU07YUFDVDtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHNDQUFtQixHQUFuQixVQUFvQixLQUFLLEVBQUUsR0FBRztRQUMxQixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUV0QixLQUFLLElBQUksQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQy9CLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzVCO0lBQ0wsQ0FBQztJQUVELGlDQUFjLEdBQWQ7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQztRQUMxQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDdEQsUUFBUSxHQUFHLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDO1NBQy9DO0lBQ0wsQ0FBQztJQUVELDBDQUF1QixHQUF2QjtRQUNJLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFDNUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMxQixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDL0Q7SUFDTCxDQUFDO0lBRUQsK0JBQVksR0FBWixVQUFhLEtBQWEsRUFBRSxJQUFZO1FBQ3BDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDL0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDM0MsSUFBSSxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDYixJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ1IsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNmLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDO2FBQ2hCO1lBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM1QztJQUNMLENBQUM7SUFFRCxnQ0FBYSxHQUFiLFVBQWMsSUFBVTtRQUNwQixJQUFJLFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUMvQyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBRSxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFFLENBQUMsQ0FBQztRQUN6RSxJQUFJLElBQUksR0FBRyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDL0IsU0FBUyxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUUsQ0FBQztRQUN4QixTQUFTLENBQUMsT0FBTyxDQUFFLENBQUMsQ0FBRSxDQUFDO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBRSxHQUFHLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRUQsOEJBQVcsR0FBWCxVQUFZLEtBQWEsRUFBRSxJQUFZO1FBQ25DLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNmLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDekQsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN2RCxJQUFJLG1CQUFtQixHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEUsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsSUFBSSxLQUFLLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUV2RCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2hDLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUVkLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDUixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEdBQUcsUUFBUSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxtQkFBbUIsRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDOUUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDckQsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUk7d0JBQy9ELEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBQyxDQUFDLENBQUM7aUJBQ2pJO2dCQUVELElBQUksbUJBQW1CLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7Z0JBQzFDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxtQkFBbUIsRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQzt3QkFDdkYsVUFBVSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUMsQ0FBQyxDQUFDO29CQUNuRSxLQUFLLEVBQUUsQ0FBQztpQkFDWDthQUNKO2lCQUNJO2dCQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ3hCLElBQUksS0FBSyxHQUFHLFVBQVUsRUFBRTt3QkFDcEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQzt3QkFDakQsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLEdBQUcsRUFBRSxLQUFLLEdBQUcsVUFBVSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxJQUFJOzRCQUM1RSxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxHQUFHLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUM7NEJBQ3JFLFVBQVUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBQyxDQUFDLENBQUM7cUJBQ2xHO3lCQUNJO3dCQUNELElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUM7NEJBQzNGLFVBQVUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFDLENBQUMsQ0FBQztxQkFDbEU7b0JBRUQsS0FBSyxFQUFFLENBQUM7aUJBQ1g7YUFDSjtZQUVELElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDZixXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDNUY7WUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3BCO1FBRUQsT0FBTztZQUNILEtBQUssRUFBRSxLQUFLO1lBQ1osSUFBSSxFQUFFLElBQUk7WUFDVixLQUFLLEVBQUUsS0FBSztZQUNaLFdBQVcsRUFBRSxXQUFXO1NBQzNCLENBQUM7SUFDTixDQUFDO0lBRUQsMkJBQVEsR0FBUixVQUFTLElBQVU7UUFDZixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFFL0IsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDdkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFFdkMsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUk7Z0JBQ3ZCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDOztnQkFFcEUsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDMUM7YUFDSSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDcEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7U0FDMUI7SUFDTCxDQUFDO0lBRUQsOEJBQVcsR0FBWCxVQUFZLEtBQUs7UUFDYixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFeEIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLE9BQU87U0FDVjtRQUVELElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO2FBQ0k7WUFDRCxJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssQ0FBQyxFQUFFO2dCQUN6QixJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2FBQ3hCO2lCQUNJO2dCQUNELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUN2QjtZQUVELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztZQUNsRixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQzFEO0lBQ0wsQ0FBQztJQUVELDZCQUFVLEdBQVYsVUFBVyxLQUFLO1FBQ1osS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXhCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixPQUFPO1NBQ1Y7UUFFRCxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4QjthQUNJO1lBQ0QsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLEVBQUUsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUN4QjtpQkFDSTtnQkFDRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDdkI7WUFFRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBQyxDQUFDLENBQUM7WUFDaEYsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUMxRDtJQUNMLENBQUM7SUFFRCxnQ0FBYSxHQUFiO1FBQ0ksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRW5CLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDOUQsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JGLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDO1NBQzFIO0lBQ0wsQ0FBQztJQUVELGdDQUFhLEdBQWI7UUFDSSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFbkIsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRTtZQUN4RixJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckYsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUM7U0FDMUg7SUFDTCxDQUFDO0lBRUQsK0JBQVksR0FBWixVQUFhLEtBQUssRUFBRSxRQUFRO1FBQTVCLGlCQXlDQztRQXhDRyxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFO1lBQ3ZDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixPQUFPO1NBQ1Y7UUFFRCxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDekQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFDLElBQUksRUFBRSxDQUFDO2dCQUNuQyxPQUFPLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDOUMsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNoQzthQUNJO1lBQ0QsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ2pDLElBQUksUUFBUSxDQUFDLFVBQVUsRUFBRTtvQkFDckIsSUFBSSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDO29CQUNuQyxJQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7b0JBQ2pDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ3ZELElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQzdCO3FCQUNJO29CQUNBLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQzlCO2FBQ0o7U0FDSjtRQUVELElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLG9CQUFvQixDQUFDLEVBQUU7WUFDM0UsVUFBVSxDQUFDO2dCQUNQLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUVuQixJQUFJLEtBQUksQ0FBQyxJQUFJLEVBQUU7b0JBQ1gsS0FBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2lCQUMxQjtnQkFFRCxLQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQzNCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNYO1FBRUQsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxtQ0FBZ0IsR0FBaEIsVUFBaUIsUUFBUTtRQUNyQixJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtZQUMxQixPQUFPLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7O1lBRW5HLE9BQU8sSUFBSSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxnQ0FBYSxHQUFiLFVBQWMsS0FBSyxFQUFFLEtBQUs7UUFDdEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7SUFDL0YsQ0FBQztJQUVELG1DQUFnQixHQUFoQjtRQUNJLElBQUksY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUV4QixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWixJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFO2dCQUMxQixjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDcEQ7aUJBQ0ksSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBRTtnQkFDakMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUN4QyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdEQsY0FBYyxJQUFJLFlBQVksQ0FBQztvQkFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRTt3QkFDL0IsY0FBYyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsR0FBQyxHQUFHLENBQUM7cUJBQ2hEO2lCQUNKO2FBQ0o7aUJBQ0ksSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBRTtnQkFDOUIsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO29CQUNqQyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM5QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUU1QixjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDaEQsSUFBSSxPQUFPLEVBQUU7d0JBQ1QsY0FBYyxJQUFJLEdBQUcsR0FBQyxJQUFJLENBQUMsY0FBYyxHQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3FCQUNqRjtpQkFDSjthQUNKO1NBQ0o7UUFFRCxJQUFJLENBQUMsZUFBZSxHQUFHLGNBQWMsQ0FBQztRQUN0QyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6QixJQUFJLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxJQUFJLENBQUMsbUJBQW1CLENBQUMsYUFBYSxFQUFFO1lBQ3BFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7U0FDdkU7SUFDTCxDQUFDO0lBRUQsaUNBQWMsR0FBZCxVQUFlLElBQUk7UUFDZixJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDMUIsSUFBSSxJQUFJLEVBQUU7WUFDTixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2YsY0FBYyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDMUM7aUJBQ0k7Z0JBQ0QsY0FBYyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO2dCQUM3RCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7b0JBQ2YsY0FBYyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNqRDthQUNKO1NBQ0o7UUFFRCxPQUFPLGNBQWMsQ0FBQztJQUMxQixDQUFDO0lBRUQsNkJBQVUsR0FBVixVQUFXLFFBQVE7UUFDZixJQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWpFLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLEVBQUU7Z0JBQ3pCLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxFQUFFO29CQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O29CQUVoQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDekU7aUJBQ0k7Z0JBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDbkM7WUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUN2QztRQUVELElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksRUFBRTtZQUNyQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNwQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUN2QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUMxQztRQUVELElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksRUFBRTtZQUNyQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNwQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUN2QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUMxQztRQUVELElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMxQjthQUNJLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFLEVBQUU7WUFDakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBSyxJQUFJLENBQUMsS0FBSyxHQUFFLElBQUksR0FBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ2pFO2FBQ0ksSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBRTtZQUM5QixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7Z0JBQ2pDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRTVCLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLFNBQVMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtvQkFDbkQsT0FBTyxHQUFHLElBQUksQ0FBQztpQkFDbEI7cUJBQ0k7b0JBQ0QsU0FBUyxHQUFHLElBQUksQ0FBQztvQkFDakIsT0FBTyxHQUFHLElBQUksQ0FBQztpQkFDbEI7Z0JBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO2FBQzFDO2lCQUNJO2dCQUNELElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUNsQztTQUNKO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELDhCQUFXLEdBQVgsVUFBWSxLQUFLO1FBQWpCLGlCQWtCQztRQWpCRyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUVuQixJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksTUFBTSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2xDO2FBQ0ksSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsRUFBRTtZQUNoQyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFO2dCQUMxQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDdkQ7aUJBQ0k7Z0JBQ0QsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDO2dCQUMxQixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1osY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBekIsQ0FBeUIsQ0FBQyxDQUFDO2lCQUN0RTtnQkFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQ3RDO1NBQ0o7SUFDTCxDQUFDO0lBRUQsMENBQXVCLEdBQXZCLFVBQXdCLEtBQWEsRUFBRSxJQUFZO1FBQy9DLElBQUksR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDckIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNmLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV0QixJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3BELE9BQU8sUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO0lBQ25ELENBQUM7SUFFRCxzQ0FBbUIsR0FBbkIsVUFBb0IsS0FBYSxFQUFFLElBQVk7UUFDM0MsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUMvRSxDQUFDO0lBRUQsMENBQXVCLEdBQXZCLFVBQXdCLEtBQWEsRUFBRSxJQUFZO1FBQy9DLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckQsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELDBDQUF1QixHQUF2QixVQUF3QixLQUFhLEVBQUUsSUFBWTtRQUMvQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFVCxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7WUFDYixDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ1AsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUM7U0FDaEI7YUFDSTtZQUNELENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2QsQ0FBQyxHQUFHLElBQUksQ0FBQztTQUNaO1FBRUQsT0FBTyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLENBQUMsRUFBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxzQ0FBbUIsR0FBbkIsVUFBb0IsS0FBYSxFQUFFLElBQVk7UUFDM0MsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRVQsSUFBSSxLQUFLLEtBQUssRUFBRSxFQUFFO1lBQ2QsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNOLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1NBQ2hCO2FBQ0k7WUFDRCxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNkLENBQUMsR0FBRyxJQUFJLENBQUM7U0FDWjtRQUVELE9BQU8sRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsaUNBQWMsR0FBZDtRQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBRUQsNkJBQVUsR0FBVixVQUFXLFFBQVE7O1FBQ2YsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1osSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsRUFBRTtnQkFDMUIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDbEQ7aUJBQ0ksSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBRTtnQkFDakMsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDOztvQkFDckIsS0FBaUIsSUFBQSxLQUFBLFNBQUEsSUFBSSxDQUFDLEtBQUssQ0FBQSxnQkFBQSw0QkFBRTt3QkFBeEIsSUFBSSxJQUFJLFdBQUE7d0JBQ1QsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO3dCQUM3QyxJQUFJLFFBQVEsRUFBRTs0QkFDVixNQUFNO3lCQUNUO3FCQUNKOzs7Ozs7Ozs7Z0JBRUQsT0FBTyxRQUFRLENBQUM7YUFDbkI7aUJBQ0ksSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBRTtnQkFDOUIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDYixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7O29CQUU5SixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQTthQUN4RDtTQUNKO2FBQ0k7WUFDRCxPQUFPLEtBQUssQ0FBQztTQUNoQjtJQUNMLENBQUM7SUFFRCxrQ0FBZSxHQUFmLFVBQWdCLEtBQWE7UUFDekIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEcsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0lBQy9GLENBQUM7SUFFRCwrQkFBWSxHQUFaLFVBQWEsS0FBSyxFQUFFLFFBQVE7UUFDeEIsSUFBSSxLQUFLO1lBQ0wsT0FBTyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssUUFBUSxDQUFDLEdBQUcsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssUUFBUSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssUUFBUSxDQUFDLElBQUksQ0FBQzs7WUFFeEgsT0FBTyxLQUFLLENBQUM7SUFDckIsQ0FBQztJQUVELGdDQUFhLEdBQWIsVUFBYyxLQUFLLEVBQUUsR0FBRyxFQUFFLFFBQVE7UUFDOUIsSUFBSSxPQUFPLEdBQWEsS0FBSyxDQUFDO1FBQzlCLElBQUksS0FBSyxJQUFJLEdBQUcsRUFBRTtZQUNkLElBQUksSUFBSSxHQUFTLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkUsT0FBTyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDL0U7UUFFRCxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRUQsb0NBQWlCLEdBQWpCO1FBQ0ksT0FBTyxJQUFJLENBQUMsYUFBYSxLQUFLLFFBQVEsQ0FBQztJQUMzQyxDQUFDO0lBRUQsbUNBQWdCLEdBQWhCO1FBQ0ksT0FBTyxJQUFJLENBQUMsYUFBYSxLQUFLLE9BQU8sQ0FBQztJQUMxQyxDQUFDO0lBRUQsc0NBQW1CLEdBQW5CO1FBQ0ksT0FBTyxJQUFJLENBQUMsYUFBYSxLQUFLLFVBQVUsQ0FBQztJQUM3QyxDQUFDO0lBRUQsMEJBQU8sR0FBUCxVQUFRLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUk7UUFDM0IsT0FBTyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsS0FBSyxLQUFLLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLElBQUksQ0FBQztJQUNqRyxDQUFDO0lBRUQsK0JBQVksR0FBWixVQUFhLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFVBQVU7UUFDckMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBRXBCLElBQUksVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQ3ZDLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2IsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxHQUFHLElBQUksRUFBRTtnQkFDbkMsUUFBUSxHQUFHLEtBQUssQ0FBQzthQUNwQjtpQkFDSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEtBQUssSUFBSSxFQUFFO2dCQUMxQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsS0FBSyxFQUFFO29CQUNqQyxRQUFRLEdBQUcsS0FBSyxDQUFDO2lCQUNwQjtxQkFDSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEtBQUssS0FBSyxFQUFFO29CQUN4QyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsR0FBRyxFQUFFO3dCQUM5QixRQUFRLEdBQUcsS0FBSyxDQUFDO3FCQUNwQjtpQkFDSjthQUNKO1NBQ0w7UUFFRCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDYixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEdBQUcsSUFBSSxFQUFFO2dCQUNuQyxRQUFRLEdBQUcsS0FBSyxDQUFDO2FBQ3BCO2lCQUNJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsS0FBSyxJQUFJLEVBQUU7Z0JBQzFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsR0FBRyxLQUFLLEVBQUU7b0JBQ2pDLFFBQVEsR0FBRyxLQUFLLENBQUM7aUJBQ3BCO3FCQUNJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsS0FBSyxLQUFLLEVBQUU7b0JBQ3hDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxHQUFHLEVBQUU7d0JBQzlCLFFBQVEsR0FBRyxLQUFLLENBQUM7cUJBQ3BCO2lCQUNKO2FBQ0o7U0FDTDtRQUVELElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNyQixTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsSUFBSSxDQUFDLENBQUM7U0FDbkQ7UUFFRCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDcEIsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLElBQUksQ0FBQyxDQUFBO1NBQ2hEO1FBRUQsT0FBTyxRQUFRLElBQUksUUFBUSxJQUFJLFNBQVMsSUFBSSxRQUFRLENBQUM7SUFDekQsQ0FBQztJQUVELGlDQUFjLEdBQWQsVUFBZSxHQUFVLEVBQUUsS0FBWSxFQUFFLElBQVc7O1FBQ2hELElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTs7Z0JBQ3BCLEtBQXlCLElBQUEsS0FBQSxTQUFBLElBQUksQ0FBQyxhQUFhLENBQUEsZ0JBQUEsNEJBQUU7b0JBQXhDLElBQUksWUFBWSxXQUFBO29CQUNqQixJQUFJLFlBQVksQ0FBQyxXQUFXLEVBQUUsS0FBSyxJQUFJLElBQUksWUFBWSxDQUFDLFFBQVEsRUFBRSxLQUFLLEtBQUssSUFBSSxZQUFZLENBQUMsT0FBTyxFQUFFLEtBQUssR0FBRyxFQUFFO3dCQUM1RyxPQUFPLElBQUksQ0FBQztxQkFDZjtpQkFDSjs7Ozs7Ozs7O1NBQ0o7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsZ0NBQWEsR0FBYixVQUFjLEdBQVUsRUFBRSxLQUFZLEVBQUUsSUFBVztRQUMvQyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDbkIsSUFBSSxPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN6QyxJQUFJLGFBQWEsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDckMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUMxRDtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCwrQkFBWSxHQUFaLFVBQWEsS0FBWTtRQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3RCO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELCtCQUFZLEdBQVosVUFBYSxLQUFZO1FBQ3JCLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDL0U7UUFDRCxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQzFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0QjtJQUNMLENBQUM7SUFFRCw4QkFBVyxHQUFYLFVBQVksS0FBWTtRQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNuQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztTQUMzQjtRQUNELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsZ0NBQWEsR0FBYixVQUFjLEtBQUssRUFBRSxVQUFVO1FBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3RCLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdEI7YUFDSTtZQUNELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0QjtJQUNMLENBQUM7SUFFRCxpQ0FBYyxHQUFkLFVBQWUsS0FBSztRQUNoQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssQ0FBQyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0QjtJQUNMLENBQUM7SUFFRCx3Q0FBcUIsR0FBckIsVUFBc0IsQ0FBUztRQUMzQixJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDbEYsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsdUNBQW9CLEdBQXBCLFVBQXFCLENBQVM7UUFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ2pGLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELGdDQUFhLEdBQWIsVUFBYyxLQUFLO1FBQ2YsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNsQyxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFFakQsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzVCLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJO2dCQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO2lCQUM3RCxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxFQUFFO2dCQUM5QixvQ0FBb0M7Z0JBQ3BDLElBQUksUUFBUSxHQUFHLEVBQUUsSUFBSSxPQUFPLEdBQUcsRUFBRSxFQUFFO29CQUMvQixJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztpQkFDdEI7Z0JBRUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQzthQUNqRTtTQUNKO1FBQ0QsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCwrQ0FBNEIsR0FBNUIsVUFBNkIsS0FBWSxFQUFFLElBQVksRUFBRSxTQUFpQjtRQUN0RSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQzFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUMxQjtJQUNMLENBQUM7SUFFRCw2Q0FBMEIsR0FBMUIsVUFBMkIsS0FBWTtRQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoQixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDckI7SUFDTCxDQUFDO0lBRUQsOENBQTJCLEdBQTNCLFVBQTRCLEtBQVk7UUFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3JCO0lBQ0wsQ0FBQztJQUVELHlCQUFNLEdBQU4sVUFBTyxLQUFZLEVBQUUsUUFBZ0IsRUFBRSxJQUFZLEVBQUUsU0FBaUI7UUFBdEUsaUJBZ0NDO1FBL0JHLElBQUksQ0FBQyxHQUFHLFFBQVEsSUFBRSxHQUFHLENBQUM7UUFFdEIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxVQUFVLENBQUM7WUFDOUIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUM3QyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFTixRQUFPLElBQUksRUFBRTtZQUNULEtBQUssQ0FBQztnQkFDRixJQUFJLFNBQVMsS0FBSyxDQUFDO29CQUNmLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7O29CQUUxQixJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNsQyxNQUFNO1lBRU4sS0FBSyxDQUFDO2dCQUNGLElBQUksU0FBUyxLQUFLLENBQUM7b0JBQ2YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7b0JBRTVCLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3BDLE1BQU07WUFFTixLQUFLLENBQUM7Z0JBQ0YsSUFBSSxTQUFTLEtBQUssQ0FBQztvQkFDZixJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDOztvQkFFNUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDcEMsTUFBTTtTQUNUO1FBRUQsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELHVDQUFvQixHQUFwQjtRQUNJLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN0QixhQUFhLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1NBQ3ZDO0lBQ0wsQ0FBQztJQUVELGdDQUFhLEdBQWIsVUFBYyxLQUFLO1FBQ2YsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBRWpELElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM1QixJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSTtnQkFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztpQkFDM0QsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksRUFBRTtnQkFDOUIsMkNBQTJDO2dCQUMzQyxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssRUFBRSxFQUFFO29CQUN6QixJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztpQkFDdEI7Z0JBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQzthQUNoRTtTQUNKO1FBRUQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCwrQkFBWSxHQUFaLFVBQWEsSUFBSTtRQUNiLElBQUksS0FBSyxHQUFZLElBQUksQ0FBQztRQUMxQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3ZCLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUU7WUFDekIsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMxQztRQUNELElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFLEVBQUU7WUFDNUIsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDN0M7UUFDRCxJQUFJLGVBQWUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBRTFELElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxlQUFlLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsS0FBSyxlQUFlLEVBQUU7WUFDcEYsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksRUFBRTtnQkFDaEMsS0FBSyxHQUFHLEtBQUssQ0FBQzthQUNqQjtTQUNKO1FBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLGVBQWUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxLQUFLLGVBQWUsRUFBRTtZQUNwRixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsSUFBSSxFQUFFO2dCQUNoQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2FBQ2pCO1NBQ0o7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsa0NBQWUsR0FBZixVQUFnQixLQUFLO1FBQ2pCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUNyRCxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDaEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1NBQ3RFO1FBRUQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxrQ0FBZSxHQUFmLFVBQWdCLEtBQUs7UUFDakIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3JELFNBQVMsR0FBRyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ3pELElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNoQyxJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztTQUNsQztRQUVELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsaUNBQWMsR0FBZCxVQUFlLE1BQU07UUFDakIsSUFBSSxLQUFLLEdBQVksSUFBSSxDQUFDO1FBQzFCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdkIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBRTtZQUN6QixLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzFDO1FBQ0QsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBRTtZQUM1QixLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztTQUM3QztRQUNELElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDMUQsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLGVBQWUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxLQUFLLGVBQWUsRUFBRTtZQUNwRixJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFDO2dCQUM1QyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEdBQUcsTUFBTSxFQUFFO29CQUNwQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2lCQUNqQjthQUNKO1NBQ0o7UUFFRCxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksZUFBZSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEtBQUssZUFBZSxFQUFFO1lBQ3BGLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUM7Z0JBQzVDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsR0FBRyxNQUFNLEVBQUU7b0JBQ3BDLEtBQUssR0FBRyxLQUFLLENBQUM7aUJBQ2pCO2FBQ0o7U0FDSjtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxrQ0FBZSxHQUFmLFVBQWdCLEtBQUs7UUFDakIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3JELElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNoQyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7U0FDdEU7UUFFRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELGtDQUFlLEdBQWYsVUFBZ0IsS0FBSztRQUNqQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDckQsU0FBUyxHQUFHLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDekQsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO1NBQ2xDO1FBRUQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxpQ0FBYyxHQUFkLFVBQWUsTUFBTTtRQUNqQixJQUFJLEtBQUssR0FBWSxJQUFJLENBQUM7UUFDMUIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN2QixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFO1lBQ3pCLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDMUM7UUFDRCxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFFO1lBQzVCLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQzdDO1FBQ0QsSUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUUxRCxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksZUFBZSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEtBQUssZUFBZSxFQUFFO1lBQ3BGLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsR0FBRyxNQUFNLEVBQUU7Z0JBQ3BDLEtBQUssR0FBRyxLQUFLLENBQUM7YUFDakI7U0FDSjtRQUVELElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxlQUFlLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsS0FBSyxlQUFlLEVBQUU7WUFDcEYsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxHQUFHLE1BQU0sRUFBRTtnQkFDcEMsS0FBSyxHQUFHLEtBQUssQ0FBQzthQUNqQjtTQUNKO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELDZCQUFVLEdBQVY7UUFDSSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3ZCLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUU7WUFDekIsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMxQztRQUNELElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFLEVBQUU7WUFDNUIsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDN0M7UUFDRCxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUV2RCxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxFQUFFO1lBQ3pCLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxFQUFFO2dCQUN2QixLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O2dCQUVqQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDMUU7YUFDSTtZQUNELEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ3BDO1FBRUQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDckMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDckMsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBRTtZQUN6QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNiLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7O2dCQUUvQixLQUFLLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDN0I7UUFFRCxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFDO1lBQzNCLEtBQUssWUFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRSxLQUFLLEVBQUMsQ0FBQztTQUMvQztRQUVELElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELDZCQUFVLEdBQVYsVUFBVyxLQUFLO1FBQ1osSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsOEJBQVcsR0FBWCxVQUFZLEtBQUs7UUFDYiw2RkFBNkY7UUFDN0YsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDakIsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFFdkIsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDN0IsSUFBSTtZQUNBLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzQyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ25CO1NBQ0o7UUFDRCxPQUFNLEdBQUcsRUFBRTtZQUNQLGNBQWM7WUFDZCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzFCO1FBRUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDeEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELG1DQUFnQixHQUFoQixVQUFpQixLQUFLO1FBQXRCLGlCQVlDO1FBWEcsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUU7WUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLENBQUMsV0FBVyxFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQ25GLE9BQU8sR0FBRyxLQUFLLENBQUM7YUFDbkI7U0FDSjthQUFNLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQXBFLENBQW9FLENBQUMsRUFBRTtZQUMvRixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFO2dCQUN6QixPQUFPLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7YUFDcEU7U0FDSjtRQUNELE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFRCx1Q0FBb0IsR0FBcEIsVUFBcUIsSUFBWTs7UUFDN0IsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNuQyxPQUFPLElBQUksQ0FBQztTQUNmO1FBRUQsSUFBSSxLQUFVLENBQUM7UUFFZixJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFO1lBQzFCLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3BDO2FBQ0ksSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBRTtZQUNqQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ2hELEtBQUssR0FBRyxFQUFFLENBQUM7O2dCQUNYLEtBQWtCLElBQUEsV0FBQSxTQUFBLE1BQU0sQ0FBQSw4QkFBQSxrREFBRTtvQkFBckIsSUFBSSxLQUFLLG1CQUFBO29CQUNWLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUNoRDs7Ozs7Ozs7O1NBQ0o7YUFDSSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFO1lBQzlCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFDLElBQUksQ0FBQyxjQUFjLEdBQUUsR0FBRyxDQUFDLENBQUM7WUFDdEQsS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUNYLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNwQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQzthQUNuRDtTQUNKO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELGdDQUFhLEdBQWIsVUFBYyxJQUFJO1FBQ2QsSUFBSSxJQUFVLENBQUM7UUFDZixJQUFJLEtBQUssR0FBYSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXRDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMvQzthQUNJO1lBQ0QsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3hDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDZixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ3hELElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFFN0IsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDbkQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzdDO2lCQUNJO2dCQUNBLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQzthQUM1QztTQUNKO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELCtCQUFZLEdBQVosVUFBYSxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUk7UUFDaEMsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNsQyxNQUFNLGNBQWMsQ0FBQztTQUN4QjtRQUVELElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQztRQUMzQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3RDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFCLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlCLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCwyQkFBUSxHQUFSO1FBQ0ksSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBRSxJQUFJLENBQUMsV0FBVyxJQUFFLElBQUksSUFBSSxFQUFFLENBQUM7UUFDbkQsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFDO1lBQ25CLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDaEI7UUFFRCxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXZELElBQUksSUFBSSxDQUFDLFFBQVEsSUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQzlCLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUUzQixJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxFQUFFO2dCQUN6QixJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssR0FBRyxFQUFFLENBQUM7Z0JBRXJCLElBQUksS0FBSyxJQUFJLEVBQUUsRUFBRTtvQkFDYixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7aUJBQ3REO3FCQUNJO29CQUNELElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO2lCQUNoRDthQUNKO2lCQUNJO2dCQUNELElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ3JDO1lBRUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDdEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDekM7SUFDTCxDQUFDO0lBRUQsOEJBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNoQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztTQUM5QjtJQUNMLENBQUM7SUFFRCw4QkFBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFFNUIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2QsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQzFCO0lBQ0wsQ0FBQztJQUVELHlCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQztZQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUN0QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDbEQ7aUJBQ0k7Z0JBQ0QsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ3RCO1NBQ0o7SUFDTCxDQUFDO0lBRUQsMENBQXVCLEdBQXZCLFVBQXdCLEtBQXFCO1FBQ3pDLFFBQVEsS0FBSyxDQUFDLE9BQU8sRUFBRTtZQUNuQixLQUFLLFNBQVMsQ0FBQztZQUNmLEtBQUssZ0JBQWdCO2dCQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDZCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7b0JBQzdCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO3dCQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3FCQUMvRTtvQkFDRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7aUJBRXZCO2dCQUNMLE1BQU07WUFFTixLQUFLLE1BQU07Z0JBQ1AsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDN0IsTUFBTTtTQUNUO0lBQ0wsQ0FBQztJQUVELHlDQUFzQixHQUF0QixVQUF1QixLQUFxQjtRQUN4QyxRQUFRLEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDbkIsS0FBSyxTQUFTLENBQUM7WUFDZixLQUFLLGdCQUFnQjtnQkFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQ2QsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7b0JBQ2pDLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO2lCQUNyQztnQkFDTCxNQUFNO1NBQ1Q7SUFDTCxDQUFDO0lBRUQsZ0NBQWEsR0FBYjtRQUNJLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxNQUFNO2dCQUN4QixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7O2dCQUV4QyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzNEO0lBQ0wsQ0FBQztJQUVELHVDQUFvQixHQUFwQjtRQUNJLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQy9CLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDbkQ7SUFDTCxDQUFDO0lBRUQsK0JBQVksR0FBWjtRQUNJLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3JDO2FBQ0k7WUFDRCxJQUFJLElBQUksQ0FBQyxRQUFRO2dCQUNiLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsQ0FBQzs7Z0JBRWxGLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUN6RjtJQUNMLENBQUM7SUFFRCxpQ0FBYyxHQUFkLFVBQWUsT0FBTztRQUF0QixpQkFhQztRQVpHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1osSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDcEUsSUFBSSxjQUFjLEdBQUcsdUVBQXVFLENBQUM7WUFDN0YsVUFBVSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFFbEUsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLFVBQUMsS0FBVTtnQkFDaEUsS0FBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQzNCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JDLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1NBQzVEO0lBQ0wsQ0FBQztJQUVELGtDQUFlLEdBQWY7UUFDSSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckMsSUFBSSxZQUFZLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDMUMsSUFBSSxlQUFlLFNBQVMsQ0FBQztZQUM3QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDMUMsSUFBSSxTQUFTLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLFVBQVUsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLGtDQUFrQyxDQUFDLEVBQUU7b0JBQ3BFLGVBQWUsR0FBRyxJQUFJLENBQUM7b0JBQ3ZCLE1BQU07aUJBQ1Q7YUFDSjtZQUVELElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQ2xCLFVBQVUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO2FBQy9EO1lBRUQsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7WUFFL0IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7U0FDcEI7SUFDTCxDQUFDO0lBRUQsMENBQXVCLEdBQXZCO1FBQ0ksSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDekIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztTQUN2QztJQUNDLENBQUM7SUFFRCw2QkFBVSxHQUFWLFVBQVcsS0FBVTtRQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUM5QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdEQ7UUFFRCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELG1DQUFnQixHQUFoQixVQUFpQixFQUFZO1FBQ3pCLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxvQ0FBaUIsR0FBakIsVUFBa0IsRUFBWTtRQUMxQixJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsbUNBQWdCLEdBQWhCLFVBQWlCLEdBQVk7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7SUFDeEIsQ0FBQztJQUVELGdDQUFhLEdBQWI7UUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7SUFDckQsQ0FBQztJQUVELDhDQUE4QztJQUM5Qyw2QkFBVSxHQUFWLFVBQVcsSUFBSSxFQUFFLE1BQU07UUFDbkIsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNQLE9BQU8sRUFBRSxDQUFDO1NBQ2I7UUFFRCxJQUFJLE9BQU8sQ0FBQztRQUNaLElBQU0sU0FBUyxHQUFHLFVBQUMsS0FBSztZQUNwQixJQUFNLE9BQU8sR0FBRyxDQUFDLE9BQU8sR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQztZQUN0RixJQUFJLE9BQU8sRUFBRTtnQkFDVCxPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsT0FBTyxPQUFPLENBQUM7UUFDbkIsQ0FBQyxFQUNHLFlBQVksR0FBRyxVQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRztZQUM3QixJQUFJLEdBQUcsR0FBRyxFQUFFLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNsQixPQUFPLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFO29CQUNyQixHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztpQkFDbkI7YUFDSjtZQUNELE9BQU8sR0FBRyxDQUFDO1FBQ2YsQ0FBQyxFQUNELFVBQVUsR0FBRyxVQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFNBQVM7WUFDN0MsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNyRSxDQUFDLENBQUM7UUFDTixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEIsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBRXBCLElBQUksSUFBSSxFQUFFO1lBQ04sS0FBSyxPQUFPLEdBQUcsQ0FBQyxFQUFFLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFO2dCQUNsRCxJQUFJLE9BQU8sRUFBRTtvQkFDVCxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO3dCQUNyRCxPQUFPLEdBQUcsS0FBSyxDQUFDO3FCQUNuQjt5QkFBTTt3QkFDSCxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztxQkFDcEM7aUJBQ0o7cUJBQU07b0JBQ0gsUUFBUSxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFO3dCQUM1QixLQUFLLEdBQUc7NEJBQ0osTUFBTSxJQUFJLFlBQVksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDOzRCQUMvQyxNQUFNO3dCQUNWLEtBQUssR0FBRzs0QkFDSixNQUFNLElBQUksVUFBVSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQzs0QkFDMUYsTUFBTTt3QkFDVixLQUFLLEdBQUc7NEJBQ0osTUFBTSxJQUFJLFlBQVksQ0FBQyxHQUFHLEVBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FDUCxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRTtnQ0FDdkUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOzRCQUNsRSxNQUFNO3dCQUNWLEtBQUssR0FBRzs0QkFDSixNQUFNLElBQUksWUFBWSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOzRCQUNwRCxNQUFNO3dCQUNWLEtBQUssR0FBRzs0QkFDSixNQUFNLElBQUksVUFBVSxDQUFDLEdBQUcsRUFBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQzs0QkFDL0YsTUFBTTt3QkFDVixLQUFLLEdBQUc7NEJBQ0osTUFBTSxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDOzRCQUN4SCxNQUFNO3dCQUNWLEtBQUssR0FBRzs0QkFDSixNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDOzRCQUN6QixNQUFNO3dCQUNWLEtBQUssR0FBRzs0QkFDSixNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDOzRCQUNwRCxNQUFNO3dCQUNWLEtBQUssSUFBSTs0QkFDTCxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQ0FDakIsTUFBTSxJQUFJLElBQUksQ0FBQzs2QkFDbEI7aUNBQU07Z0NBQ0gsT0FBTyxHQUFHLElBQUksQ0FBQzs2QkFDbEI7NEJBQ0QsTUFBTTt3QkFDVjs0QkFDSSxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztxQkFDeEM7aUJBQ0o7YUFDSjtTQUNKO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVELDZCQUFVLEdBQVYsVUFBVyxJQUFJO1FBQ1gsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNQLE9BQU8sRUFBRSxDQUFDO1NBQ2I7UUFFRCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNoQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFFaEMsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksSUFBSSxLQUFLLEdBQUcsRUFBRSxJQUFJLEtBQUssSUFBSSxFQUFFLEVBQUU7WUFDdEQsS0FBSyxJQUFFLEVBQUUsQ0FBQztTQUNiO1FBRUQsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksRUFBRTtZQUN6QixNQUFNLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1NBQ25FO2FBQU07WUFDSCxNQUFNLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztTQUNoRDtRQUNELE1BQU0sSUFBSSxHQUFHLENBQUM7UUFDZCxNQUFNLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUVuRCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbEIsTUFBTSxJQUFJLEdBQUcsQ0FBQztZQUNkLE1BQU0sSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1NBQ3REO1FBRUQsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksRUFBRTtZQUN6QixNQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7U0FDbEQ7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQsNEJBQVMsR0FBVCxVQUFVLEtBQUs7UUFDWCxJQUFJLE1BQU0sR0FBYSxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFaEQsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLGdCQUFnQixFQUFFO1lBQ3BDLE1BQU0sY0FBYyxDQUFDO1NBQ3hCO1FBRUQsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUV0RCxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRTtZQUMvSCxNQUFNLGNBQWMsQ0FBQztTQUN4QjthQUNJO1lBQ0QsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksRUFBRTtnQkFDekIsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUU7b0JBQ3JCLENBQUMsSUFBSSxFQUFFLENBQUM7aUJBQ1g7cUJBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRTtvQkFDM0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztpQkFDWDthQUNKO1lBRUQsT0FBTyxFQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFDLENBQUM7U0FDMUM7SUFDTCxDQUFDO0lBRUQsNkNBQTZDO0lBQzdDLDRCQUFTLEdBQVQsVUFBVSxLQUFLLEVBQUUsTUFBTTtRQUNuQixJQUFJLE1BQU0sSUFBSSxJQUFJLElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtZQUNqQyxNQUFNLG1CQUFtQixDQUFDO1NBQzdCO1FBRUQsS0FBSyxHQUFHLENBQUMsT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNwRSxJQUFJLEtBQUssS0FBSyxFQUFFLEVBQUU7WUFDZCxPQUFPLElBQUksQ0FBQztTQUNmO1FBRUQsSUFBSSxPQUFPLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFDdkIsTUFBTSxHQUFHLENBQUMsRUFDVixlQUFlLEdBQUcsQ0FBQyxPQUFPLElBQUksQ0FBQyxlQUFlLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUN6SixJQUFJLEdBQUcsQ0FBQyxDQUFDLEVBQ1QsS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUNWLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFDUixHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQ1IsT0FBTyxHQUFHLEtBQUssRUFDZixJQUFJLEVBQ0osU0FBUyxHQUFHLFVBQUMsS0FBSztZQUNkLElBQUksT0FBTyxHQUFHLENBQUMsT0FBTyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDO1lBQ3BGLElBQUksT0FBTyxFQUFFO2dCQUNULE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxPQUFPLE9BQU8sQ0FBQztRQUNuQixDQUFDLEVBQ0QsU0FBUyxHQUFHLFVBQUMsS0FBSztZQUNkLElBQUksU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFDNUIsSUFBSSxHQUFHLENBQUMsS0FBSyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNsRCxDQUFDLEtBQUssS0FBSyxHQUFHLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDNUQsT0FBTyxHQUFHLENBQUMsS0FBSyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDcEMsTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxHQUFHLENBQUMsRUFDekQsR0FBRyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ04sTUFBTSw2QkFBNkIsR0FBRyxNQUFNLENBQUM7YUFDaEQ7WUFDRCxNQUFNLElBQUksR0FBRyxDQUFFLENBQUMsQ0FBRSxDQUFDLE1BQU0sQ0FBQztZQUMxQixPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUUsQ0FBQyxDQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbEMsQ0FBQyxFQUNELE9BQU8sR0FBRyxVQUFDLEtBQUssRUFBRSxVQUFVLEVBQUUsU0FBUztZQUNuQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksR0FBRyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7WUFDcEQsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBRWYsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2pDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMxQjtZQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFDLEVBQUMsQ0FBQztnQkFDWCxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBQyxDQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM1QyxDQUFDLENBQUMsQ0FBQztZQUVILEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNuQyxJQUFJLE1BQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsRUFBRSxLQUFLLE1BQUksQ0FBQyxXQUFXLEVBQUUsRUFBRTtvQkFDeEUsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDcEIsTUFBTSxJQUFJLE1BQUksQ0FBQyxNQUFNLENBQUM7b0JBQ3RCLE1BQU07aUJBQ1Q7YUFDSjtZQUVELElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUNkLE9BQU8sS0FBSyxHQUFHLENBQUMsQ0FBQzthQUNwQjtpQkFBTTtnQkFDSCxNQUFNLDJCQUEyQixHQUFHLE1BQU0sQ0FBQzthQUM5QztRQUNMLENBQUMsRUFDRCxZQUFZLEdBQUc7WUFDWCxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDakQsTUFBTSxpQ0FBaUMsR0FBRyxNQUFNLENBQUM7YUFDcEQ7WUFDRCxNQUFNLEVBQUUsQ0FBQztRQUNiLENBQUMsQ0FBQztRQUVGLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7WUFDdkIsR0FBRyxHQUFHLENBQUMsQ0FBQztTQUNYO1FBRUQsS0FBSyxPQUFPLEdBQUcsQ0FBQyxFQUFFLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFO1lBQ2xELElBQUksT0FBTyxFQUFFO2dCQUNULElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ25ELE9BQU8sR0FBRyxLQUFLLENBQUM7aUJBQ25CO3FCQUFNO29CQUNILFlBQVksRUFBRSxDQUFDO2lCQUNsQjthQUNKO2lCQUFNO2dCQUNILFFBQVEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDNUIsS0FBSyxHQUFHO3dCQUNKLEdBQUcsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ3JCLE1BQU07b0JBQ1YsS0FBSyxHQUFHO3dCQUNKLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDOUQsTUFBTTtvQkFDVixLQUFLLEdBQUc7d0JBQ0osR0FBRyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDckIsTUFBTTtvQkFDVixLQUFLLEdBQUc7d0JBQ0osS0FBSyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDdkIsTUFBTTtvQkFDVixLQUFLLEdBQUc7d0JBQ0osS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQzt3QkFDMUUsTUFBTTtvQkFDVixLQUFLLEdBQUc7d0JBQ0osSUFBSSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDdEIsTUFBTTtvQkFDVixLQUFLLEdBQUc7d0JBQ0osSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUNoQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO3dCQUMxQixLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQzt3QkFDNUIsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzt3QkFDckIsTUFBTTtvQkFDVixLQUFLLEdBQUc7d0JBQ0osSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQzt3QkFDN0QsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQzt3QkFDMUIsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7d0JBQzVCLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQ3JCLE1BQU07b0JBQ1YsS0FBSyxHQUFHO3dCQUNKLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFOzRCQUNoQixZQUFZLEVBQUUsQ0FBQzt5QkFDbEI7NkJBQU07NEJBQ0gsT0FBTyxHQUFHLElBQUksQ0FBQzt5QkFDbEI7d0JBQ0QsTUFBTTtvQkFDVjt3QkFDSSxZQUFZLEVBQUUsQ0FBQztpQkFDdEI7YUFDSjtTQUNKO1FBRUQsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUN2QixLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDckIsTUFBTSwyQ0FBMkMsR0FBRyxLQUFLLENBQUM7YUFDN0Q7U0FDSjtRQUVELElBQUksSUFBSSxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2IsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDbkM7YUFBTSxJQUFJLElBQUksR0FBRyxHQUFHLEVBQUU7WUFDbkIsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHO2dCQUM3RCxDQUFDLElBQUksSUFBSSxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM1QztRQUVELElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ1YsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNWLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDVixHQUFHO2dCQUNDLEdBQUcsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDaEQsSUFBSSxHQUFHLElBQUksR0FBRyxFQUFFO29CQUNaLE1BQU07aUJBQ1Q7Z0JBQ0QsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsR0FBRyxJQUFJLEdBQUcsQ0FBQzthQUNkLFFBQVEsSUFBSSxFQUFFO1NBQ2xCO1FBRUQsSUFBSSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3pELElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssR0FBRyxFQUFFO1lBQ3hGLE1BQU0sY0FBYyxDQUFDLENBQUMsZ0JBQWdCO1NBQ3pDO1FBRVQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELHVDQUFvQixHQUFwQixVQUFxQixJQUFJO1FBQ3JCLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDUCxPQUFPLElBQUksQ0FBQztTQUNmO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU5RCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsb0NBQWlCLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxlQUFlLElBQUksRUFBRSxDQUFDO0lBQ3JFLENBQUM7SUFFRCxxQ0FBa0IsR0FBbEIsVUFBbUIsS0FBSztRQUNwQixJQUFJLElBQUksR0FBUyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQzVCLElBQUksUUFBUSxHQUFHLEVBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBQyxDQUFDO1FBRXBOLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxxQ0FBa0IsR0FBbEIsVUFBbUIsS0FBSztRQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsNENBQXlCLEdBQXpCO1FBQUEsaUJBZUM7UUFkRyxJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFO1lBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7Z0JBQ3hCLEtBQUksQ0FBQyxxQkFBcUIsR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLFVBQUMsS0FBSztvQkFDekUsSUFBSSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSSxDQUFDLGNBQWMsRUFBRTt3QkFDckQsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7NEJBQ1YsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDOzRCQUVuQixLQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO3dCQUMzQixDQUFDLENBQUMsQ0FBQztxQkFDTjtnQkFFTCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBRUQsOENBQTJCLEdBQTNCO1FBQ0ksSUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDNUIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDN0IsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQztTQUNyQztJQUNMLENBQUM7SUFFRCw2Q0FBMEIsR0FBMUI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUMvQyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0QsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztTQUNsRTtJQUNMLENBQUM7SUFFRCwrQ0FBNEIsR0FBNUI7UUFDSSxJQUFJLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtZQUM3QixNQUFNLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQ2xFLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUM7U0FDdEM7SUFDTCxDQUFDO0lBRUQsbUNBQWdCLEdBQWhCLFVBQWlCLEtBQVk7UUFDekIsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDO1lBQy9FLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFRLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUgsQ0FBQztJQUVELG1DQUFnQixHQUFoQixVQUFpQixLQUFZO1FBQ3pCLE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsb0JBQW9CLENBQUMsSUFBSSxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUseUJBQXlCLENBQUM7ZUFDcEgsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLG9CQUFvQixDQUFDLElBQUksVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLHlCQUF5QixDQUFDLENBQUMsQ0FBQztJQUN4SSxDQUFDO0lBRUQsaUNBQWMsR0FBZDtRQUNJLElBQUksSUFBSSxDQUFDLGNBQWMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUNoRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdEI7SUFDTCxDQUFDO0lBRUQsZ0NBQWEsR0FBYjtRQUNJLElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsOEJBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN6QixDQUFDOztnQkF0bERzQixVQUFVO2dCQUFtQixTQUFTO2dCQUFhLGlCQUFpQjtnQkFBZ0IsTUFBTTs7SUFqVHhHO1FBQVIsS0FBSyxFQUFFO2lEQUFtQjtJQUVsQjtRQUFSLEtBQUssRUFBRTsyQ0FBWTtJQUVYO1FBQVIsS0FBSyxFQUFFO2dEQUFvQjtJQUVuQjtRQUFSLEtBQUssRUFBRTtnREFBaUI7SUFFaEI7UUFBUixLQUFLLEVBQUU7NkNBQWlCO0lBRWhCO1FBQVIsS0FBSyxFQUFFOzBDQUFjO0lBRWI7UUFBUixLQUFLLEVBQUU7cURBQXlCO0lBRXhCO1FBQVIsS0FBSyxFQUFFO2lEQUFxQjtJQUVwQjtRQUFSLEtBQUssRUFBRTs4Q0FBZTtJQUVkO1FBQVIsS0FBSyxFQUFFO2dEQUFpQztJQUVoQztRQUFSLEtBQUssRUFBRTt1REFBaUM7SUFFaEM7UUFBUixLQUFLLEVBQUU7b0RBQThCO0lBRTdCO1FBQVIsS0FBSyxFQUFFOzRDQUF5QjtJQUV4QjtRQUFSLEtBQUssRUFBRTtxREFBaUM7SUFFaEM7UUFBUixLQUFLLEVBQUU7dURBQTRCO0lBRTNCO1FBQVIsS0FBSyxFQUFFOzhDQUFtQjtJQUVsQjtRQUFSLEtBQUssRUFBRTswQ0FBaUM7SUFFaEM7UUFBUixLQUFLLEVBQUU7OENBQWU7SUFFZDtRQUFSLEtBQUssRUFBRTttREFBd0I7SUFFdkI7UUFBUixLQUFLLEVBQUU7cURBQThCO0lBRTdCO1FBQVIsS0FBSyxFQUFFO29EQUF5QjtJQUV4QjtRQUFSLEtBQUssRUFBRTttREFBd0I7SUFFdkI7UUFBUixLQUFLLEVBQUU7Z0RBQTJCO0lBRTFCO1FBQVIsS0FBSyxFQUFFOzhDQUFtQjtJQUVsQjtRQUFSLEtBQUssRUFBRTs4Q0FBc0I7SUFFckI7UUFBUixLQUFLLEVBQUU7Z0RBQXdCO0lBRXZCO1FBQVIsS0FBSyxFQUFFO2dEQUF3QjtJQUV2QjtRQUFSLEtBQUssRUFBRTtpREFBOEI7SUFFN0I7UUFBUixLQUFLLEVBQUU7OENBQW1CO0lBRWxCO1FBQVIsS0FBSyxFQUFFO2lEQUE2QjtJQUU1QjtRQUFSLEtBQUssRUFBRTs4Q0FBMkI7SUFFMUI7UUFBUixLQUFLLEVBQUU7OENBQTJCO0lBRTFCO1FBQVIsS0FBSyxFQUFFO21EQUFrQztJQUVqQztRQUFSLEtBQUssRUFBRTtrREFBc0I7SUFFckI7UUFBUixLQUFLLEVBQUU7bURBQXdCO0lBRXZCO1FBQVIsS0FBSyxFQUFFOzJEQUF1RDtJQUV0RDtRQUFSLEtBQUssRUFBRTsyREFBdUQ7SUFFdEQ7UUFBUixLQUFLLEVBQUU7Z0RBQTRCO0lBRTNCO1FBQVIsS0FBSyxFQUFFO2dEQUF3QjtJQUV2QjtRQUFSLEtBQUssRUFBRTtxREFBeUI7SUFFeEI7UUFBUixLQUFLLEVBQUU7Z0RBQWlCO0lBRWhCO1FBQVIsS0FBSyxFQUFFO2lEQUE4QjtJQUU3QjtRQUFSLEtBQUssRUFBRTswREFBdUM7SUFFdEM7UUFBUixLQUFLLEVBQUU7b0RBQTRCO0lBRTNCO1FBQVIsS0FBSyxFQUFFOzBDQUF1QjtJQUV0QjtRQUFSLEtBQUssRUFBRTs2Q0FBa0I7SUFFakI7UUFBUixLQUFLLEVBQUU7bURBQTZCO0lBRTVCO1FBQVIsS0FBSyxFQUFFOzJEQUFrRDtJQUVqRDtRQUFSLEtBQUssRUFBRTsyREFBaUQ7SUFFL0M7UUFBVCxNQUFNLEVBQUU7NkNBQWlEO0lBRWhEO1FBQVQsTUFBTSxFQUFFOzRDQUFnRDtJQUUvQztRQUFULE1BQU0sRUFBRTs2Q0FBaUQ7SUFFaEQ7UUFBVCxNQUFNLEVBQUU7OENBQWtEO0lBRWpEO1FBQVQsTUFBTSxFQUFFOzZDQUFpRDtJQUVoRDtRQUFULE1BQU0sRUFBRTtrREFBc0Q7SUFFckQ7UUFBVCxNQUFNLEVBQUU7a0RBQXNEO0lBRXJEO1FBQVQsTUFBTSxFQUFFO21EQUF1RDtJQUV0RDtRQUFULE1BQU0sRUFBRTtrREFBc0Q7SUFFL0I7UUFBL0IsZUFBZSxDQUFDLGFBQWEsQ0FBQzsrQ0FBMkI7SUFlakQ7UUFBUixLQUFLLEVBQUU7OENBQWtCO0lBRWtCO1FBQTNDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUM7eURBQWlDO0lBOEVuRTtRQUFSLEtBQUssRUFBRTsyQ0FFUDtJQVVRO1FBQVIsS0FBSyxFQUFFOzJDQUVQO0lBVVE7UUFBUixLQUFLLEVBQUU7aURBRVA7SUFVUTtRQUFSLEtBQUssRUFBRTtnREFFUDtJQVVRO1FBQVIsS0FBSyxFQUFFOzZDQUVQO0lBY1E7UUFBUixLQUFLLEVBQUU7NENBRVA7SUFnQkQ7UUFEQyxLQUFLLEVBQUU7MENBV1A7SUFqVFEsUUFBUTtRQTlMcEIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFlBQVk7WUFDdEIsUUFBUSxFQUFHLGdtWUFtSlY7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsT0FBTyxDQUFDLGtCQUFrQixFQUFFO29CQUN4QixLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQzt3QkFDbkIsU0FBUyxFQUFFLGVBQWU7d0JBQzFCLE9BQU8sRUFBRSxDQUFDO3FCQUNiLENBQUMsQ0FBQztvQkFDSCxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDO3dCQUMxQixTQUFTLEVBQUUsc0JBQXNCO3dCQUNqQyxPQUFPLEVBQUUsQ0FBQztxQkFDYixDQUFDLENBQUM7b0JBQ0gsVUFBVSxDQUFDLGlCQUFpQixFQUFFO3dCQUMxQixLQUFLLENBQUMsRUFBQyxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDO3dCQUNoRCxPQUFPLENBQUMsMEJBQTBCLENBQUM7cUJBQ3RDLENBQUM7b0JBQ0YsVUFBVSxDQUFDLGlCQUFpQixFQUFFO3dCQUMxQixPQUFPLENBQUMsQ0FBQywwQkFBMEIsQ0FBQyxFQUNwQyxLQUFLLENBQUM7NEJBQ0YsT0FBTyxFQUFFLENBQUM7NEJBQ1YsU0FBUyxFQUFFLGdCQUFnQjt5QkFDOUIsQ0FBQyxDQUFDO3FCQUNOLENBQUM7b0JBQ0YsVUFBVSxDQUFDLHdCQUF3QixFQUFFO3dCQUNqQyxLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSx1Q0FBdUMsRUFBQyxDQUFDO3dCQUN2RSxPQUFPLENBQUMsMEJBQTBCLENBQUM7cUJBQ3RDLENBQUM7b0JBQ0YsVUFBVSxDQUFDLHdCQUF3QixFQUFFO3dCQUNqQyxPQUFPLENBQUMsQ0FBQywwQkFBMEIsQ0FBQyxFQUNwQyxLQUFLLENBQUM7NEJBQ0YsT0FBTyxFQUFFLENBQUM7NEJBQ1YsU0FBUyxFQUFFLHVDQUF1Qzt5QkFDckQsQ0FBQyxDQUFDO3FCQUNOLENBQUM7aUJBQ0wsQ0FBQzthQUNMO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLGdDQUFnQyxFQUFFLFFBQVE7Z0JBQzFDLCtCQUErQixFQUFFLE9BQU87YUFDM0M7WUFDRCxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztTQUN2QyxDQUFDO09BQ1csUUFBUSxDQTA0RHBCO0lBQUQsZUFBQztDQUFBLEFBMTRERCxJQTA0REM7U0ExNERZLFFBQVE7QUFpNURyQjtJQUFBO0lBQThCLENBQUM7SUFBbEIsY0FBYztRQUwxQixRQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUMsWUFBWSxFQUFDLFlBQVksQ0FBQztZQUNqRCxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUMsWUFBWSxFQUFDLFlBQVksQ0FBQztZQUM3QyxZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUM7U0FDM0IsQ0FBQztPQUNXLGNBQWMsQ0FBSTtJQUFELHFCQUFDO0NBQUEsQUFBL0IsSUFBK0I7U0FBbEIsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LEVsZW1lbnRSZWYsT25EZXN0cm95LE9uSW5pdCxJbnB1dCxPdXRwdXQsRXZlbnRFbWl0dGVyLGZvcndhcmRSZWYsUmVuZGVyZXIyLFxuICAgICAgICBWaWV3Q2hpbGQsQ2hhbmdlRGV0ZWN0b3JSZWYsVGVtcGxhdGVSZWYsQ29udGVudENoaWxkcmVuLFF1ZXJ5TGlzdCwgTmdab25lfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7dHJpZ2dlcixzdGF0ZSxzdHlsZSx0cmFuc2l0aW9uLGFuaW1hdGUsQW5pbWF0aW9uRXZlbnR9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0J1dHRvbk1vZHVsZX0gZnJvbSAncHJpbWVuZy9idXR0b24nO1xuaW1wb3J0IHtEb21IYW5kbGVyfSBmcm9tICdwcmltZW5nL2RvbSc7XG5pbXBvcnQge1NoYXJlZE1vZHVsZSxQcmltZVRlbXBsYXRlfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQge05HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5leHBvcnQgY29uc3QgQ0FMRU5EQVJfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBDYWxlbmRhciksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9jYWxlU2V0dGluZ3Mge1xuICAgIGZpcnN0RGF5T2ZXZWVrPzogbnVtYmVyO1xuICAgIGRheU5hbWVzOiBzdHJpbmdbXTtcbiAgICBkYXlOYW1lc1Nob3J0OiBzdHJpbmdbXTtcbiAgICBkYXlOYW1lc01pbjogc3RyaW5nW107XG4gICAgbW9udGhOYW1lczogc3RyaW5nW107XG4gICAgbW9udGhOYW1lc1Nob3J0OiBzdHJpbmdbXTtcbiAgICB0b2RheTogc3RyaW5nO1xuICAgIGNsZWFyOiBzdHJpbmc7XG4gICAgZGF0ZUZvcm1hdD86IHN0cmluZztcbiAgICB3ZWVrSGVhZGVyPzogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtY2FsZW5kYXInLFxuICAgIHRlbXBsYXRlOiAgYFxuICAgICAgICA8c3BhbiBbbmdDbGFzc109XCJ7J3VpLWNhbGVuZGFyJzp0cnVlLCAndWktY2FsZW5kYXItdy1idG4nOiBzaG93SWNvbiwgJ3VpLWNhbGVuZGFyLXRpbWVvbmx5JzogdGltZU9ubHl9XCIgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cIiFpbmxpbmVcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgI2lucHV0ZmllbGQgdHlwZT1cInRleHRcIiBbYXR0ci5pZF09XCJpbnB1dElkXCIgW2F0dHIubmFtZV09XCJuYW1lXCIgW2F0dHIucmVxdWlyZWRdPVwicmVxdWlyZWRcIiBbYXR0ci5hcmlhLXJlcXVpcmVkXT1cInJlcXVpcmVkXCIgW3ZhbHVlXT1cImlucHV0RmllbGRWYWx1ZVwiIChmb2N1cyk9XCJvbklucHV0Rm9jdXMoJGV2ZW50KVwiIChrZXlkb3duKT1cIm9uSW5wdXRLZXlkb3duKCRldmVudClcIiAoY2xpY2spPVwib25JbnB1dENsaWNrKCRldmVudClcIiAoYmx1cik9XCJvbklucHV0Qmx1cigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgW3JlYWRvbmx5XT1cInJlYWRvbmx5SW5wdXRcIiAoaW5wdXQpPVwib25Vc2VySW5wdXQoJGV2ZW50KVwiIFtuZ1N0eWxlXT1cImlucHV0U3R5bGVcIiBbY2xhc3NdPVwiaW5wdXRTdHlsZUNsYXNzXCIgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyfHwnJ1wiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIFthdHRyLnRhYmluZGV4XT1cInRhYmluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiJ3VpLWlucHV0dGV4dCB1aS13aWRnZXQgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItYWxsJ1wiIGF1dG9jb21wbGV0ZT1cIm9mZlwiXG4gICAgICAgICAgICAgICAgICAgID48YnV0dG9uIHR5cGU9XCJidXR0b25cIiBbaWNvbl09XCJpY29uXCIgcEJ1dHRvbiAqbmdJZj1cInNob3dJY29uXCIgKGNsaWNrKT1cIm9uQnV0dG9uQ2xpY2soJGV2ZW50LGlucHV0ZmllbGQpXCIgY2xhc3M9XCJ1aS1kYXRlcGlja2VyLXRyaWdnZXIgdWktY2FsZW5kYXItYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1kaXNhYmxlZCc6ZGlzYWJsZWR9XCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgdGFiaW5kZXg9XCItMVwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDxkaXYgW2NsYXNzXT1cInBhbmVsU3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cInBhbmVsU3R5bGVcIiBbbmdDbGFzc109XCJ7J3VpLWRhdGVwaWNrZXIgdWktd2lkZ2V0IHVpLXdpZGdldC1jb250ZW50IHVpLWhlbHBlci1jbGVhcmZpeCB1aS1jb3JuZXItYWxsJzogdHJ1ZSwgJ3VpLWRhdGVwaWNrZXItaW5saW5lJzppbmxpbmUsJ3VpLXNoYWRvdyc6IWlubGluZSxcbiAgICAgICAgICAgICAgICAndWktc3RhdGUtZGlzYWJsZWQnOmRpc2FibGVkLCd1aS1kYXRlcGlja2VyLXRpbWVvbmx5Jzp0aW1lT25seSwndWktZGF0ZXBpY2tlci1tdWx0aXBsZS1tb250aCc6IHRoaXMubnVtYmVyT2ZNb250aHMgPiAxLCAndWktZGF0ZXBpY2tlci1tb250aHBpY2tlcic6ICh2aWV3ID09PSAnbW9udGgnKSwgJ3VpLWRhdGVwaWNrZXItdG91Y2gtdWknOiB0b3VjaFVJfVwiXG4gICAgICAgICAgICAgICAgW0BvdmVybGF5QW5pbWF0aW9uXT1cInRvdWNoVUkgPyB7dmFsdWU6ICd2aXNpYmxlVG91Y2hVSScsIHBhcmFtczoge3Nob3dUcmFuc2l0aW9uUGFyYW1zOiBzaG93VHJhbnNpdGlvbk9wdGlvbnMsIGhpZGVUcmFuc2l0aW9uUGFyYW1zOiBoaWRlVHJhbnNpdGlvbk9wdGlvbnN9fTogXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt2YWx1ZTogJ3Zpc2libGUnLCBwYXJhbXM6IHtzaG93VHJhbnNpdGlvblBhcmFtczogc2hvd1RyYW5zaXRpb25PcHRpb25zLCBoaWRlVHJhbnNpdGlvblBhcmFtczogaGlkZVRyYW5zaXRpb25PcHRpb25zfX1cIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW0AuZGlzYWJsZWRdPVwiaW5saW5lID09PSB0cnVlXCIgKEBvdmVybGF5QW5pbWF0aW9uLnN0YXJ0KT1cIm9uT3ZlcmxheUFuaW1hdGlvblN0YXJ0KCRldmVudClcIiAoQG92ZXJsYXlBbmltYXRpb24uZG9uZSk9XCJvbk92ZXJsYXlBbmltYXRpb25Eb25lKCRldmVudClcIiAqbmdJZj1cImlubGluZSB8fCBvdmVybGF5VmlzaWJsZVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInAtaGVhZGVyXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhdGltZU9ubHlcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWRhdGVwaWNrZXItZ3JvdXAgdWktd2lkZ2V0LWNvbnRlbnRcIiAqbmdGb3I9XCJsZXQgbW9udGggb2YgbW9udGhzOyBsZXQgaSA9IGluZGV4O1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWRhdGVwaWNrZXItaGVhZGVyIHVpLXdpZGdldC1oZWFkZXIgdWktaGVscGVyLWNsZWFyZml4IHVpLWNvcm5lci1hbGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cInVpLWRhdGVwaWNrZXItcHJldiB1aS1jb3JuZXItYWxsXCIgKGNsaWNrKT1cIm5hdkJhY2t3YXJkKCRldmVudClcIiAqbmdJZj1cImkgPT09IDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1kYXRlcGlja2VyLXByZXYtaWNvbiBwaSBwaS1jaGV2cm9uLWxlZnRcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwidWktZGF0ZXBpY2tlci1uZXh0IHVpLWNvcm5lci1hbGxcIiAoY2xpY2spPVwibmF2Rm9yd2FyZCgkZXZlbnQpXCIgKm5nSWY9XCJudW1iZXJPZk1vbnRocyA9PT0gMSA/IHRydWUgOiAoaSA9PT0gbnVtYmVyT2ZNb250aHMgLTEpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktZGF0ZXBpY2tlci1uZXh0LWljb24gcGkgcGktY2hldnJvbi1yaWdodFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWRhdGVwaWNrZXItdGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1kYXRlcGlja2VyLW1vbnRoXCIgKm5nSWY9XCIhbW9udGhOYXZpZ2F0b3IgJiYgKHZpZXcgIT09ICdtb250aCcpXCI+e3tsb2NhbGUubW9udGhOYW1lc1ttb250aC5tb250aF19fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCB0YWJpbmRleD1cIi0xXCIgY2xhc3M9XCJ1aS1kYXRlcGlja2VyLW1vbnRoXCIgKm5nSWY9XCJtb250aE5hdmlnYXRvciAmJiAodmlldyAhPT0gJ21vbnRoJykgJiYgbnVtYmVyT2ZNb250aHMgPT09IDFcIiAoY2hhbmdlKT1cIm9uTW9udGhEcm9wZG93bkNoYW5nZSgkZXZlbnQudGFyZ2V0LnZhbHVlKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiBbdmFsdWVdPVwiaVwiICpuZ0Zvcj1cImxldCBtb250aE5hbWUgb2YgbG9jYWxlLm1vbnRoTmFtZXM7bGV0IGkgPSBpbmRleFwiIFtzZWxlY3RlZF09XCJpID09PSBtb250aC5tb250aFwiPnt7bW9udGhOYW1lfX08L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgdGFiaW5kZXg9XCItMVwiIGNsYXNzPVwidWktZGF0ZXBpY2tlci15ZWFyXCIgKm5nSWY9XCJ5ZWFyTmF2aWdhdG9yICYmIG51bWJlck9mTW9udGhzID09PSAxXCIgKGNoYW5nZSk9XCJvblllYXJEcm9wZG93bkNoYW5nZSgkZXZlbnQudGFyZ2V0LnZhbHVlKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiBbdmFsdWVdPVwieWVhclwiICpuZ0Zvcj1cImxldCB5ZWFyIG9mIHllYXJPcHRpb25zXCIgW3NlbGVjdGVkXT1cInllYXIgPT09IGN1cnJlbnRZZWFyXCI+e3t5ZWFyfX08L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktZGF0ZXBpY2tlci15ZWFyXCIgKm5nSWY9XCIheWVhck5hdmlnYXRvclwiPnt7dmlldyA9PT0gJ21vbnRoJyA/IGN1cnJlbnRZZWFyIDogbW9udGgueWVhcn19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktZGF0ZXBpY2tlci1jYWxlbmRhci1jb250YWluZXJcIiAqbmdJZj1cInZpZXcgPT09J2RhdGUnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzPVwidWktZGF0ZXBpY2tlci1jYWxlbmRhclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoICpuZ0lmPVwic2hvd1dlZWtcIiBjbGFzcz1cInVpLWRhdGVwaWNrZXItd2Vla2hlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57e2xvY2FsZVsnd2Vla0hlYWRlciddfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggc2NvcGU9XCJjb2xcIiAqbmdGb3I9XCJsZXQgd2Vla0RheSBvZiB3ZWVrRGF5cztsZXQgYmVnaW4gPSBmaXJzdDsgbGV0IGVuZCA9IGxhc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3t3ZWVrRGF5fX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ciAqbmdGb3I9XCJsZXQgd2VlayBvZiBtb250aC5kYXRlczsgbGV0IGkgPSBpbmRleDtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgKm5nSWY9XCJzaG93V2Vla1wiIGNsYXNzPVwidWktZGF0ZXBpY2tlci13ZWVrbnVtYmVyIHVpLXN0YXRlLWRpc2FibGVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3ttb250aC53ZWVrTnVtYmVyc1tpXX19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCAqbmdGb3I9XCJsZXQgZGF0ZSBvZiB3ZWVrXCIgW25nQ2xhc3NdPVwieyd1aS1kYXRlcGlja2VyLW90aGVyLW1vbnRoJzogZGF0ZS5vdGhlck1vbnRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndWktZGF0ZXBpY2tlci1jdXJyZW50LWRheSc6aXNTZWxlY3RlZChkYXRlKSwndWktZGF0ZXBpY2tlci10b2RheSc6ZGF0ZS50b2RheX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImRhdGUub3RoZXJNb250aCA/IHNob3dPdGhlck1vbnRocyA6IHRydWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwidWktc3RhdGUtZGVmYXVsdFwiICpuZ0lmPVwiZGF0ZS5zZWxlY3RhYmxlXCIgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1hY3RpdmUnOmlzU2VsZWN0ZWQoZGF0ZSksICd1aS1zdGF0ZS1oaWdobGlnaHQnOmRhdGUudG9kYXl9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25EYXRlU2VsZWN0KCRldmVudCxkYXRlKVwiIGRyYWdnYWJsZT1cImZhbHNlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFkYXRlVGVtcGxhdGVcIj57e2RhdGUuZGF5fX08L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZGF0ZVRlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiBkYXRlfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1zdGF0ZS1kZWZhdWx0IHVpLXN0YXRlLWRpc2FibGVkXCIgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1hY3RpdmUnOmlzU2VsZWN0ZWQoZGF0ZSksICd1aS1zdGF0ZS1oaWdobGlnaHQnOmRhdGUudG9kYXl9XCIgKm5nSWY9XCIhZGF0ZS5zZWxlY3RhYmxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3tkYXRlLmRheX19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1tb250aHBpY2tlclwiICpuZ0lmPVwidmlldyA9PT0gJ21vbnRoJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgICpuZ0Zvcj1cImxldCBtIG9mIG1vbnRoUGlja2VyVmFsdWVzOyBsZXQgaSA9IGluZGV4XCIgKGNsaWNrKT1cIm9uTW9udGhTZWxlY3QoJGV2ZW50LCBpKVwiIGNsYXNzPVwidWktbW9udGhwaWNrZXItbW9udGhcIiBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWFjdGl2ZSc6IGlzTW9udGhTZWxlY3RlZChpKX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e219fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktdGltZXBpY2tlciB1aS13aWRnZXQtaGVhZGVyIHVpLWNvcm5lci1hbGxcIiAqbmdJZj1cInNob3dUaW1lfHx0aW1lT25seVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktaG91ci1waWNrZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhICAobW91c2Vkb3duKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZURvd24oJGV2ZW50LCAwLCAxKVwiIChtb3VzZXVwKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZVVwKCRldmVudClcIiAobW91c2VvdXQpPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlT3V0KCRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInBpIHBpLWNoZXZyb24tdXBcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBbbmdTdHlsZV09XCJ7J2Rpc3BsYXknOiBjdXJyZW50SG91ciA8IDEwID8gJ2lubGluZSc6ICdub25lJ31cIj4wPC9zcGFuPjxzcGFuPnt7Y3VycmVudEhvdXJ9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhICAobW91c2Vkb3duKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZURvd24oJGV2ZW50LCAwLCAtMSlcIiAobW91c2V1cCk9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VVcCgkZXZlbnQpXCIgKG1vdXNlb3V0KT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZU91dCgkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwaSBwaS1jaGV2cm9uLWRvd25cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktc2VwYXJhdG9yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YSA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwaSBwaS1jaGV2cm9uLXVwXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3t0aW1lU2VwYXJhdG9yfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YSA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwaSBwaS1jaGV2cm9uLWRvd25cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktbWludXRlLXBpY2tlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgIChtb3VzZWRvd24pPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlRG93bigkZXZlbnQsIDEsIDEpXCIgKG1vdXNldXApPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlVXAoJGV2ZW50KVwiIChtb3VzZW91dCk9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VPdXQoJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicGkgcGktY2hldnJvbi11cFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIFtuZ1N0eWxlXT1cInsnZGlzcGxheSc6IGN1cnJlbnRNaW51dGUgPCAxMCA/ICdpbmxpbmUnOiAnbm9uZSd9XCI+MDwvc3Bhbj48c3Bhbj57e2N1cnJlbnRNaW51dGV9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhICAobW91c2Vkb3duKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZURvd24oJGV2ZW50LCAxLCAtMSlcIiAobW91c2V1cCk9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VVcCgkZXZlbnQpXCIgKG1vdXNlb3V0KT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZU91dCgkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwaSBwaS1jaGV2cm9uLWRvd25cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktc2VwYXJhdG9yXCIgKm5nSWY9XCJzaG93U2Vjb25kc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicGkgcGktY2hldnJvbi11cFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7dGltZVNlcGFyYXRvcn19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicGkgcGktY2hldnJvbi1kb3duXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLXNlY29uZC1waWNrZXJcIiAqbmdJZj1cInNob3dTZWNvbmRzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YSAgKG1vdXNlZG93bik9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VEb3duKCRldmVudCwgMiwgMSlcIiAobW91c2V1cCk9XCJvblRpbWVQaWNrZXJFbGVtZW50TW91c2VVcCgkZXZlbnQpXCIgKG1vdXNlb3V0KT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZU91dCgkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwaSBwaS1jaGV2cm9uLXVwXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gW25nU3R5bGVdPVwieydkaXNwbGF5JzogY3VycmVudFNlY29uZCA8IDEwID8gJ2lubGluZSc6ICdub25lJ31cIj4wPC9zcGFuPjxzcGFuPnt7Y3VycmVudFNlY29uZH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgIChtb3VzZWRvd24pPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlRG93bigkZXZlbnQsIDIsIC0xKVwiIChtb3VzZXVwKT1cIm9uVGltZVBpY2tlckVsZW1lbnRNb3VzZVVwKCRldmVudClcIiAobW91c2VvdXQpPVwib25UaW1lUGlja2VyRWxlbWVudE1vdXNlT3V0KCRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInBpIHBpLWNoZXZyb24tZG93blwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1hbXBtLXBpY2tlclwiICpuZ0lmPVwiaG91ckZvcm1hdD09JzEyJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgIChjbGljayk9XCJ0b2dnbGVBTVBNKCRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInBpIHBpLWNoZXZyb24tdXBcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57e3BtID8gJ1BNJyA6ICdBTSd9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhICAoY2xpY2spPVwidG9nZ2xlQU1QTSgkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwaSBwaS1jaGV2cm9uLWRvd25cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1kYXRlcGlja2VyLWJ1dHRvbmJhciB1aS13aWRnZXQtaGVhZGVyXCIgKm5nSWY9XCJzaG93QnV0dG9uQmFyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1nXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktZy02XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgdGFiaW5kZXg9XCItMVwiIFtsYWJlbF09XCJfbG9jYWxlLnRvZGF5XCIgKGNsaWNrKT1cIm9uVG9kYXlCdXR0b25DbGljaygkZXZlbnQpXCIgcEJ1dHRvbiBbbmdDbGFzc109XCJbdG9kYXlCdXR0b25TdHlsZUNsYXNzXVwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktZy02XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgdGFiaW5kZXg9XCItMVwiIFtsYWJlbF09XCJfbG9jYWxlLmNsZWFyXCIgKGNsaWNrKT1cIm9uQ2xlYXJCdXR0b25DbGljaygkZXZlbnQpXCIgcEJ1dHRvbiBbbmdDbGFzc109XCJbY2xlYXJCdXR0b25TdHlsZUNsYXNzXVwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInAtZm9vdGVyXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvc3Bhbj5cbiAgICBgLFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgdHJpZ2dlcignb3ZlcmxheUFuaW1hdGlvbicsIFtcbiAgICAgICAgICAgIHN0YXRlKCd2aXNpYmxlJywgc3R5bGUoe1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMCknLFxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgIHN0YXRlKCd2aXNpYmxlVG91Y2hVSScsIHN0eWxlKHtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoLTUwJSwtNTAlKScsXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiB2aXNpYmxlJywgW1xuICAgICAgICAgICAgICAgIHN0eWxlKHt0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDUlKScsIG9wYWNpdHk6IDB9KSxcbiAgICAgICAgICAgICAgICBhbmltYXRlKCd7e3Nob3dUcmFuc2l0aW9uUGFyYW1zfX0nKVxuICAgICAgICAgICAgXSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2aXNpYmxlID0+IHZvaWQnLCBbXG4gICAgICAgICAgICAgICAgYW5pbWF0ZSgoJ3t7aGlkZVRyYW5zaXRpb25QYXJhbXN9fScpLCBcbiAgICAgICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoNSUpJ1xuICAgICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgXSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IHZpc2libGVUb3VjaFVJJywgW1xuICAgICAgICAgICAgICAgIHN0eWxlKHtvcGFjaXR5OiAwLCB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgtNTAlLCAtNDAlLCAwKSBzY2FsZSgwLjkpJ30pLFxuICAgICAgICAgICAgICAgIGFuaW1hdGUoJ3t7c2hvd1RyYW5zaXRpb25QYXJhbXN9fScpXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3Zpc2libGVUb3VjaFVJID0+IHZvaWQnLCBbXG4gICAgICAgICAgICAgICAgYW5pbWF0ZSgoJ3t7aGlkZVRyYW5zaXRpb25QYXJhbXN9fScpLCBcbiAgICAgICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKC01MCUsIC00MCUsIDApIHNjYWxlKDAuOSknXG4gICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgIF0sXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLnVpLWlucHV0d3JhcHBlci1maWxsZWRdJzogJ2ZpbGxlZCcsXG4gICAgICAgICdbY2xhc3MudWktaW5wdXR3cmFwcGVyLWZvY3VzXSc6ICdmb2N1cydcbiAgICB9LFxuICAgIHByb3ZpZGVyczogW0NBTEVOREFSX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhciBpbXBsZW1lbnRzIE9uSW5pdCxPbkRlc3Ryb3ksQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICAgIFxuICAgIEBJbnB1dCgpIGRlZmF1bHREYXRlOiBEYXRlO1xuICAgIFxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG4gICAgXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuICAgIFxuICAgIEBJbnB1dCgpIGlucHV0U3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIGlucHV0SWQ6IHN0cmluZztcbiAgICBcbiAgICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XG4gICAgXG4gICAgQElucHV0KCkgaW5wdXRTdHlsZUNsYXNzOiBzdHJpbmc7XG4gICAgXG4gICAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgICBcbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYW55O1xuICAgIFxuICAgIEBJbnB1dCgpIGRhdGVGb3JtYXQ6IHN0cmluZyA9ICdtbS9kZC95eSc7XG5cbiAgICBASW5wdXQoKSBtdWx0aXBsZVNlcGFyYXRvcjogc3RyaW5nID0gJywnO1xuXG4gICAgQElucHV0KCkgcmFuZ2VTZXBhcmF0b3I6IHN0cmluZyA9ICctJztcbiAgICBcbiAgICBASW5wdXQoKSBpbmxpbmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBcbiAgICBASW5wdXQoKSBzaG93T3RoZXJNb250aHM6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgc2VsZWN0T3RoZXJNb250aHM6IGJvb2xlYW47XG4gICAgXG4gICAgQElucHV0KCkgc2hvd0ljb246IGJvb2xlYW47XG4gICAgXG4gICAgQElucHV0KCkgaWNvbjogc3RyaW5nID0gJ3BpIHBpLWNhbGVuZGFyJztcbiAgICBcbiAgICBASW5wdXQoKSBhcHBlbmRUbzogYW55O1xuICAgIFxuICAgIEBJbnB1dCgpIHJlYWRvbmx5SW5wdXQ6IGJvb2xlYW47XG4gICAgXG4gICAgQElucHV0KCkgc2hvcnRZZWFyQ3V0b2ZmOiBhbnkgPSAnKzEwJztcbiAgICBcbiAgICBASW5wdXQoKSBtb250aE5hdmlnYXRvcjogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHllYXJOYXZpZ2F0b3I6IGJvb2xlYW47XG4gICAgXG4gICAgQElucHV0KCkgaG91ckZvcm1hdDogc3RyaW5nID0gJzI0JztcbiAgICBcbiAgICBASW5wdXQoKSB0aW1lT25seTogYm9vbGVhbjtcbiAgICBcbiAgICBASW5wdXQoKSBzdGVwSG91cjogbnVtYmVyID0gMTtcbiAgICBcbiAgICBASW5wdXQoKSBzdGVwTWludXRlOiBudW1iZXIgPSAxO1xuICAgIFxuICAgIEBJbnB1dCgpIHN0ZXBTZWNvbmQ6IG51bWJlciA9IDE7XG4gICAgXG4gICAgQElucHV0KCkgc2hvd1NlY29uZHM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgc2hvd09uRm9jdXM6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgc2hvd1dlZWs6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBcbiAgICBASW5wdXQoKSBkYXRhVHlwZTogc3RyaW5nID0gJ2RhdGUnO1xuICAgIFxuICAgIEBJbnB1dCgpIHNlbGVjdGlvbk1vZGU6IHN0cmluZyA9ICdzaW5nbGUnO1xuICAgIFxuICAgIEBJbnB1dCgpIG1heERhdGVDb3VudDogbnVtYmVyO1xuICAgIFxuICAgIEBJbnB1dCgpIHNob3dCdXR0b25CYXI6IGJvb2xlYW47XG4gICAgXG4gICAgQElucHV0KCkgdG9kYXlCdXR0b25TdHlsZUNsYXNzOiBzdHJpbmcgPSAndWktYnV0dG9uLXNlY29uZGFyeSc7XG4gICAgXG4gICAgQElucHV0KCkgY2xlYXJCdXR0b25TdHlsZUNsYXNzOiBzdHJpbmcgPSAndWktYnV0dG9uLXNlY29uZGFyeSc7XG4gICAgXG4gICAgQElucHV0KCkgYXV0b1pJbmRleDogYm9vbGVhbiA9IHRydWU7XG4gICAgXG4gICAgQElucHV0KCkgYmFzZVpJbmRleDogbnVtYmVyID0gMDtcblxuICAgIEBJbnB1dCgpIHBhbmVsU3R5bGVDbGFzczogc3RyaW5nO1xuICAgIFxuICAgIEBJbnB1dCgpIHBhbmVsU3R5bGU6IGFueTtcbiAgXG4gICAgQElucHV0KCkga2VlcEludmFsaWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIGhpZGVPbkRhdGVUaW1lU2VsZWN0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBudW1iZXJPZk1vbnRoczogbnVtYmVyID0gMTtcbiAgICBcbiAgICBASW5wdXQoKSB2aWV3OiBzdHJpbmcgPSAnZGF0ZSc7XG5cbiAgICBASW5wdXQoKSB0b3VjaFVJOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgdGltZVNlcGFyYXRvcjogc3RyaW5nID0gXCI6XCI7XG5cbiAgICBASW5wdXQoKSBzaG93VHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyA9ICcyMjVtcyBlYXNlLW91dCc7XG5cbiAgICBASW5wdXQoKSBoaWRlVHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyA9ICcxOTVtcyBlYXNlLWluJztcbiAgICBcbiAgICBAT3V0cHV0KCkgb25Gb2N1czogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgQE91dHB1dCgpIG9uQmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgQE91dHB1dCgpIG9uQ2xvc2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIFxuICAgIEBPdXRwdXQoKSBvblNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgQE91dHB1dCgpIG9uSW5wdXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIFxuICAgIEBPdXRwdXQoKSBvblRvZGF5Q2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIFxuICAgIEBPdXRwdXQoKSBvbkNsZWFyQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIFxuICAgIEBPdXRwdXQoKSBvbk1vbnRoQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBcbiAgICBAT3V0cHV0KCkgb25ZZWFyQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBcbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlczogUXVlcnlMaXN0PGFueT47XG4gICAgXG4gICAgX2xvY2FsZTogTG9jYWxlU2V0dGluZ3MgPSB7XG4gICAgICAgIGZpcnN0RGF5T2ZXZWVrOiAwLFxuICAgICAgICBkYXlOYW1lczogW1wiU3VuZGF5XCIsIFwiTW9uZGF5XCIsIFwiVHVlc2RheVwiLCBcIldlZG5lc2RheVwiLCBcIlRodXJzZGF5XCIsIFwiRnJpZGF5XCIsIFwiU2F0dXJkYXlcIl0sXG4gICAgICAgIGRheU5hbWVzU2hvcnQ6IFtcIlN1blwiLCBcIk1vblwiLCBcIlR1ZVwiLCBcIldlZFwiLCBcIlRodVwiLCBcIkZyaVwiLCBcIlNhdFwiXSxcbiAgICAgICAgZGF5TmFtZXNNaW46IFtcIlN1XCIsXCJNb1wiLFwiVHVcIixcIldlXCIsXCJUaFwiLFwiRnJcIixcIlNhXCJdLFxuICAgICAgICBtb250aE5hbWVzOiBbIFwiSmFudWFyeVwiLFwiRmVicnVhcnlcIixcIk1hcmNoXCIsXCJBcHJpbFwiLFwiTWF5XCIsXCJKdW5lXCIsXCJKdWx5XCIsXCJBdWd1c3RcIixcIlNlcHRlbWJlclwiLFwiT2N0b2JlclwiLFwiTm92ZW1iZXJcIixcIkRlY2VtYmVyXCIgXSxcbiAgICAgICAgbW9udGhOYW1lc1Nob3J0OiBbIFwiSmFuXCIsIFwiRmViXCIsIFwiTWFyXCIsIFwiQXByXCIsIFwiTWF5XCIsIFwiSnVuXCIsXCJKdWxcIiwgXCJBdWdcIiwgXCJTZXBcIiwgXCJPY3RcIiwgXCJOb3ZcIiwgXCJEZWNcIiBdLFxuICAgICAgICB0b2RheTogJ1RvZGF5JyxcbiAgICAgICAgY2xlYXI6ICdDbGVhcicsXG4gICAgICAgIGRhdGVGb3JtYXQ6ICdtbS9kZC95eScsXG4gICAgICAgIHdlZWtIZWFkZXI6ICdXaydcbiAgICB9O1xuICAgIFxuICAgIEBJbnB1dCgpIHRhYmluZGV4OiBudW1iZXI7XG5cbiAgICBAVmlld0NoaWxkKCdpbnB1dGZpZWxkJywgeyBzdGF0aWM6IGZhbHNlIH0pIGlucHV0ZmllbGRWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG4gICAgICAgICAgICBcbiAgICB2YWx1ZTogYW55O1xuICAgIFxuICAgIGRhdGVzOiBhbnlbXTtcblxuICAgIG1vbnRoczogYW55W107XG5cbiAgICBtb250aFBpY2tlclZhbHVlczogYW55W107XG4gICAgXG4gICAgd2Vla0RheXM6IHN0cmluZ1tdO1xuICAgIFxuICAgIGN1cnJlbnRNb250aDogbnVtYmVyO1xuICAgIFxuICAgIGN1cnJlbnRZZWFyOiBudW1iZXI7XG4gICAgXG4gICAgY3VycmVudEhvdXI6IG51bWJlcjtcbiAgICBcbiAgICBjdXJyZW50TWludXRlOiBudW1iZXI7XG4gICAgXG4gICAgY3VycmVudFNlY29uZDogbnVtYmVyO1xuICAgIFxuICAgIHBtOiBib29sZWFuO1xuXG4gICAgbWFzazogSFRNTERpdkVsZW1lbnQ7XG5cbiAgICBtYXNrQ2xpY2tMaXN0ZW5lcjogRnVuY3Rpb247XG4gICAgXG4gICAgb3ZlcmxheTogSFRNTERpdkVsZW1lbnQ7XG4gICAgXG4gICAgb3ZlcmxheVZpc2libGU6IGJvb2xlYW47XG4gICAgICAgICAgICBcbiAgICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuICAgIFxuICAgIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuICAgIFxuICAgIGNhbGVuZGFyRWxlbWVudDogYW55O1xuICAgIFxuICAgIHRpbWVQaWNrZXJUaW1lcjphbnk7XG4gICAgXG4gICAgZG9jdW1lbnRDbGlja0xpc3RlbmVyOiBhbnk7XG4gICAgXG4gICAgdGlja3NUbzE5NzA6IG51bWJlcjtcbiAgICBcbiAgICB5ZWFyT3B0aW9uczogbnVtYmVyW107XG4gICAgXG4gICAgZm9jdXM6IGJvb2xlYW47XG4gICAgXG4gICAgaXNLZXlkb3duOiBib29sZWFuO1xuICAgIFxuICAgIGZpbGxlZDogYm9vbGVhbjtcblxuICAgIGlucHV0RmllbGRWYWx1ZTogc3RyaW5nID0gbnVsbDtcbiAgICBcbiAgICBfbWluRGF0ZTogRGF0ZTtcbiAgICBcbiAgICBfbWF4RGF0ZTogRGF0ZTtcbiAgICBcbiAgICBfc2hvd1RpbWU6IGJvb2xlYW47XG5cbiAgICBfeWVhclJhbmdlOiBzdHJpbmc7XG4gICAgXG4gICAgcHJldmVudERvY3VtZW50TGlzdGVuZXI6IGJvb2xlYW47XG4gICAgXG4gICAgZGF0ZVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgIFxuICAgIF9kaXNhYmxlZERhdGVzOiBBcnJheTxEYXRlPjtcbiAgICBcbiAgICBfZGlzYWJsZWREYXlzOiBBcnJheTxudW1iZXI+O1xuICAgIFxuICAgIHNlbGVjdEVsZW1lbnQ6IGFueTtcbiAgICBcbiAgICB0b2RheUVsZW1lbnQ6IGFueTtcbiAgICBcbiAgICBmb2N1c0VsZW1lbnQ6IGFueTtcblxuICAgIGRvY3VtZW50UmVzaXplTGlzdGVuZXI6IGFueTtcblxuICAgIEBJbnB1dCgpIGdldCBtaW5EYXRlKCk6IERhdGUge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWluRGF0ZTtcbiAgICB9XG4gICAgXG4gICAgc2V0IG1pbkRhdGUoZGF0ZTogRGF0ZSkge1xuICAgICAgICB0aGlzLl9taW5EYXRlID0gZGF0ZTtcblxuICAgICAgICBpZiAodGhpcy5jdXJyZW50TW9udGggIT0gdW5kZWZpbmVkICYmIHRoaXMuY3VycmVudE1vbnRoICE9IG51bGwgJiYgdGhpcy5jdXJyZW50WWVhcikge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVNb250aHModGhpcy5jdXJyZW50TW9udGgsIHRoaXMuY3VycmVudFllYXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIEBJbnB1dCgpIGdldCBtYXhEYXRlKCk6IERhdGUge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWF4RGF0ZTtcbiAgICB9XG4gICAgXG4gICAgc2V0IG1heERhdGUoZGF0ZTogRGF0ZSkge1xuICAgICAgICB0aGlzLl9tYXhEYXRlID0gZGF0ZTtcbiAgICAgIFxuICAgICAgICBpZiAodGhpcy5jdXJyZW50TW9udGggIT0gdW5kZWZpbmVkICYmIHRoaXMuY3VycmVudE1vbnRoICE9IG51bGwgICYmIHRoaXMuY3VycmVudFllYXIpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTW9udGhzKHRoaXMuY3VycmVudE1vbnRoLCB0aGlzLmN1cnJlbnRZZWFyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBASW5wdXQoKSBnZXQgZGlzYWJsZWREYXRlcygpOiBEYXRlW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWREYXRlcztcbiAgICB9XG4gICAgXG4gICAgc2V0IGRpc2FibGVkRGF0ZXMoZGlzYWJsZWREYXRlczogRGF0ZVtdKSB7XG4gICAgICAgIHRoaXMuX2Rpc2FibGVkRGF0ZXMgPSBkaXNhYmxlZERhdGVzO1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50TW9udGggIT0gdW5kZWZpbmVkICYmIHRoaXMuY3VycmVudE1vbnRoICE9IG51bGwgICYmIHRoaXMuY3VycmVudFllYXIpIHtcblxuICAgICAgICAgICAgdGhpcy5jcmVhdGVNb250aHModGhpcy5jdXJyZW50TW9udGgsIHRoaXMuY3VycmVudFllYXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIEBJbnB1dCgpIGdldCBkaXNhYmxlZERheXMoKTogbnVtYmVyW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWREYXlzO1xuICAgIH1cbiAgICBcbiAgICBzZXQgZGlzYWJsZWREYXlzKGRpc2FibGVkRGF5czogbnVtYmVyW10pIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWREYXlzID0gZGlzYWJsZWREYXlzO1xuXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRNb250aCAhPSB1bmRlZmluZWQgJiYgdGhpcy5jdXJyZW50TW9udGggIT0gbnVsbCAgJiYgdGhpcy5jdXJyZW50WWVhcikge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVNb250aHModGhpcy5jdXJyZW50TW9udGgsIHRoaXMuY3VycmVudFllYXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIEBJbnB1dCgpIGdldCB5ZWFyUmFuZ2UoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3llYXJSYW5nZTtcbiAgICB9XG5cbiAgICBzZXQgeWVhclJhbmdlKHllYXJSYW5nZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX3llYXJSYW5nZSA9IHllYXJSYW5nZTtcbiAgICAgICAgXG4gICAgICAgIGlmICh5ZWFyUmFuZ2UpIHtcbiAgICAgICAgICAgIGNvbnN0IHllYXJzID0geWVhclJhbmdlLnNwbGl0KCc6Jyk7XG4gICAgICAgICAgICBjb25zdCB5ZWFyU3RhcnQgPSBwYXJzZUludCh5ZWFyc1swXSk7XG4gICAgICAgICAgICBjb25zdCB5ZWFyRW5kID0gcGFyc2VJbnQoeWVhcnNbMV0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLnBvcHVsYXRlWWVhck9wdGlvbnMoeWVhclN0YXJ0LCB5ZWFyRW5kKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dCgpIGdldCBzaG93VGltZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nob3dUaW1lO1xuICAgIH1cbiAgICBcbiAgICBzZXQgc2hvd1RpbWUoc2hvd1RpbWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fc2hvd1RpbWUgPSBzaG93VGltZTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRIb3VyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdFRpbWUodGhpcy52YWx1ZXx8bmV3IERhdGUoKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVJbnB1dGZpZWxkKCk7XG4gICAgfVxuICAgIFxuICAgIGdldCBsb2NhbGUoKSB7XG4gICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsZTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBsb2NhbGUobmV3TG9jYWxlOiBMb2NhbGVTZXR0aW5ncykge1xuICAgICAgIHRoaXMuX2xvY2FsZSA9IG5ld0xvY2FsZTtcblxuICAgICAgICBpZiAodGhpcy52aWV3ID09PSAnZGF0ZScpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlV2Vla0RheXMoKTtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTW9udGhzKHRoaXMuY3VycmVudE1vbnRoLCB0aGlzLmN1cnJlbnRZZWFyKTtcbiAgICAgICB9XG4gICAgICAgZWxzZSBpZiAodGhpcy52aWV3ID09PSAnbW9udGgnKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1vbnRoUGlja2VyVmFsdWVzKCk7XG4gICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgem9uZTogTmdab25lKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGNvbnN0IGRhdGUgPSB0aGlzLmRlZmF1bHREYXRlfHxuZXcgRGF0ZSgpO1xuICAgICAgICB0aGlzLmN1cnJlbnRNb250aCA9IGRhdGUuZ2V0TW9udGgoKTtcbiAgICAgICAgdGhpcy5jdXJyZW50WWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcblxuICAgICAgICBpZiAodGhpcy52aWV3ID09PSAnZGF0ZScpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlV2Vla0RheXMoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdFRpbWUoZGF0ZSk7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1vbnRocyh0aGlzLmN1cnJlbnRNb250aCwgdGhpcy5jdXJyZW50WWVhcik7XG4gICAgICAgICAgICB0aGlzLnRpY2tzVG8xOTcwID0gKCgoMTk3MCAtIDEpICogMzY1ICsgTWF0aC5mbG9vcigxOTcwIC8gNCkgLSBNYXRoLmZsb29yKDE5NzAgLyAxMDApICsgTWF0aC5mbG9vcigxOTcwIC8gNDAwKSkgKiAyNCAqIDYwICogNjAgKiAxMDAwMDAwMCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy52aWV3ID09PSAnbW9udGgnKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1vbnRoUGlja2VyVmFsdWVzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcG9wdWxhdGVZZWFyT3B0aW9ucyhzdGFydCwgZW5kKSB7XG4gICAgICAgIHRoaXMueWVhck9wdGlvbnMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPD0gZW5kOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMueWVhck9wdGlvbnMucHVzaChpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZVdlZWtEYXlzKCkge1xuICAgICAgICB0aGlzLndlZWtEYXlzID0gW107XG4gICAgICAgIGxldCBkYXlJbmRleCA9IHRoaXMubG9jYWxlLmZpcnN0RGF5T2ZXZWVrO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgICAgICAgdGhpcy53ZWVrRGF5cy5wdXNoKHRoaXMubG9jYWxlLmRheU5hbWVzTWluW2RheUluZGV4XSk7XG4gICAgICAgICAgICBkYXlJbmRleCA9IChkYXlJbmRleCA9PSA2KSA/IDAgOiArK2RheUluZGV4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlTW9udGhQaWNrZXJWYWx1ZXMoKSB7XG4gICAgICAgIHRoaXMubW9udGhQaWNrZXJWYWx1ZXMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gMTE7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5tb250aFBpY2tlclZhbHVlcy5wdXNoKHRoaXMubG9jYWxlLm1vbnRoTmFtZXNTaG9ydFtpXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjcmVhdGVNb250aHMobW9udGg6IG51bWJlciwgeWVhcjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMubW9udGhzID0gdGhpcy5tb250aHMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAgOyBpIDwgdGhpcy5udW1iZXJPZk1vbnRoczsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbSA9IG1vbnRoICsgaTtcbiAgICAgICAgICAgIGxldCB5ID0geWVhcjtcbiAgICAgICAgICAgIGlmIChtID4gMTEpIHtcbiAgICAgICAgICAgICAgICBtID0gbSAlIDExIC0gMTtcbiAgICAgICAgICAgICAgICB5ID0geWVhciArIDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMubW9udGhzLnB1c2godGhpcy5jcmVhdGVNb250aChtLCB5KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRXZWVrTnVtYmVyKGRhdGU6IERhdGUpIHtcbiAgICAgICAgbGV0IGNoZWNrRGF0ZSA9IG5ldyBEYXRlKGRhdGUuZ2V0VGltZSgpKTtcblx0XHRjaGVja0RhdGUuc2V0RGF0ZShjaGVja0RhdGUuZ2V0RGF0ZSgpICsgNCAtICggY2hlY2tEYXRlLmdldERheSgpIHx8IDcgKSk7XG5cdFx0bGV0IHRpbWUgPSBjaGVja0RhdGUuZ2V0VGltZSgpO1xuXHRcdGNoZWNrRGF0ZS5zZXRNb250aCggMCApO1xuXHRcdGNoZWNrRGF0ZS5zZXREYXRlKCAxICk7XG5cdFx0cmV0dXJuIE1hdGguZmxvb3IoIE1hdGgucm91bmQoKHRpbWUgLSBjaGVja0RhdGUuZ2V0VGltZSgpKSAvIDg2NDAwMDAwICkgLyA3ICkgKyAxO1xuICAgIH1cbiAgICBcbiAgICBjcmVhdGVNb250aChtb250aDogbnVtYmVyLCB5ZWFyOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGRhdGVzID0gW107XG4gICAgICAgIGxldCBmaXJzdERheSA9IHRoaXMuZ2V0Rmlyc3REYXlPZk1vbnRoSW5kZXgobW9udGgsIHllYXIpO1xuICAgICAgICBsZXQgZGF5c0xlbmd0aCA9IHRoaXMuZ2V0RGF5c0NvdW50SW5Nb250aChtb250aCwgeWVhcik7XG4gICAgICAgIGxldCBwcmV2TW9udGhEYXlzTGVuZ3RoID0gdGhpcy5nZXREYXlzQ291bnRJblByZXZNb250aChtb250aCwgeWVhcik7XG4gICAgICAgIGxldCBkYXlObyA9IDE7XG4gICAgICAgIGxldCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGxldCB3ZWVrTnVtYmVycyA9IFtdO1xuICAgICAgICBsZXQgbW9udGhSb3dzID0gTWF0aC5jZWlsKChkYXlzTGVuZ3RoICsgZmlyc3REYXkpIC8gNyk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb250aFJvd3M7IGkrKykge1xuICAgICAgICAgICAgbGV0IHdlZWsgPSBbXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGkgPT0gMCkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAocHJldk1vbnRoRGF5c0xlbmd0aCAtIGZpcnN0RGF5ICsgMSk7IGogPD0gcHJldk1vbnRoRGF5c0xlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwcmV2ID0gdGhpcy5nZXRQcmV2aW91c01vbnRoQW5kWWVhcihtb250aCwgeWVhcik7XG4gICAgICAgICAgICAgICAgICAgIHdlZWsucHVzaCh7ZGF5OiBqLCBtb250aDogcHJldi5tb250aCwgeWVhcjogcHJldi55ZWFyLCBvdGhlck1vbnRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZGF5OiB0aGlzLmlzVG9kYXkodG9kYXksIGosIHByZXYubW9udGgsIHByZXYueWVhciksIHNlbGVjdGFibGU6IHRoaXMuaXNTZWxlY3RhYmxlKGosIHByZXYubW9udGgsIHByZXYueWVhciwgdHJ1ZSl9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGV0IHJlbWFpbmluZ0RheXNMZW5ndGggPSA3IC0gd2Vlay5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByZW1haW5pbmdEYXlzTGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgd2Vlay5wdXNoKHtkYXk6IGRheU5vLCBtb250aDogbW9udGgsIHllYXI6IHllYXIsIHRvZGF5OiB0aGlzLmlzVG9kYXkodG9kYXksIGRheU5vLCBtb250aCwgeWVhciksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0YWJsZTogdGhpcy5pc1NlbGVjdGFibGUoZGF5Tm8sIG1vbnRoLCB5ZWFyLCBmYWxzZSl9KTtcbiAgICAgICAgICAgICAgICAgICAgZGF5Tm8rKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDc7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF5Tm8gPiBkYXlzTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV4dCA9IHRoaXMuZ2V0TmV4dE1vbnRoQW5kWWVhcihtb250aCwgeWVhcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWVrLnB1c2goe2RheTogZGF5Tm8gLSBkYXlzTGVuZ3RoLCBtb250aDogbmV4dC5tb250aCwgeWVhcjogbmV4dC55ZWFyLCBvdGhlck1vbnRoOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9kYXk6IHRoaXMuaXNUb2RheSh0b2RheSwgZGF5Tm8gLSBkYXlzTGVuZ3RoLCBuZXh0Lm1vbnRoLCBuZXh0LnllYXIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0YWJsZTogdGhpcy5pc1NlbGVjdGFibGUoKGRheU5vIC0gZGF5c0xlbmd0aCksIG5leHQubW9udGgsIG5leHQueWVhciwgdHJ1ZSl9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlZWsucHVzaCh7ZGF5OiBkYXlObywgbW9udGg6IG1vbnRoLCB5ZWFyOiB5ZWFyLCB0b2RheTogdGhpcy5pc1RvZGF5KHRvZGF5LCBkYXlObywgbW9udGgsIHllYXIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGFibGU6IHRoaXMuaXNTZWxlY3RhYmxlKGRheU5vLCBtb250aCwgeWVhciwgZmFsc2UpfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGRheU5vKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAodGhpcy5zaG93V2Vlaykge1xuICAgICAgICAgICAgICAgIHdlZWtOdW1iZXJzLnB1c2godGhpcy5nZXRXZWVrTnVtYmVyKG5ldyBEYXRlKHdlZWtbMF0ueWVhciwgd2Vla1swXS5tb250aCwgd2Vla1swXS5kYXkpKSk7IFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkYXRlcy5wdXNoKHdlZWspO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG1vbnRoOiBtb250aCxcbiAgICAgICAgICAgIHllYXI6IHllYXIsXG4gICAgICAgICAgICBkYXRlczogZGF0ZXMsXG4gICAgICAgICAgICB3ZWVrTnVtYmVyczogd2Vla051bWJlcnNcbiAgICAgICAgfTtcbiAgICB9XG4gICAgXG4gICAgaW5pdFRpbWUoZGF0ZTogRGF0ZSkge1xuICAgICAgICB0aGlzLnBtID0gZGF0ZS5nZXRIb3VycygpID4gMTE7XG5cbiAgICAgICAgaWYgKHRoaXMuc2hvd1RpbWUpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE1pbnV0ZSA9IGRhdGUuZ2V0TWludXRlcygpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2Vjb25kID0gZGF0ZS5nZXRTZWNvbmRzKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICh0aGlzLmhvdXJGb3JtYXQgPT0gJzEyJylcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRIb3VyID0gZGF0ZS5nZXRIb3VycygpID09IDAgPyAxMiA6IGRhdGUuZ2V0SG91cnMoKSAlIDEyO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEhvdXIgPSBkYXRlLmdldEhvdXJzKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy50aW1lT25seSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50TWludXRlID0gMDtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEhvdXIgPSAwO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2Vjb25kID0gMDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBuYXZCYWNrd2FyZChldmVudCkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudmlldyA9PT0gJ21vbnRoJykge1xuICAgICAgICAgICAgdGhpcy5kZWNyZW1lbnRZZWFyKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50TW9udGggPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRNb250aCA9IDExO1xuICAgICAgICAgICAgICAgIHRoaXMuZGVjcmVtZW50WWVhcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50TW9udGgtLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5vbk1vbnRoQ2hhbmdlLmVtaXQoeyBtb250aDogdGhpcy5jdXJyZW50TW9udGggKyAxLCB5ZWFyOiB0aGlzLmN1cnJlbnRZZWFyIH0pO1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVNb250aHModGhpcy5jdXJyZW50TW9udGgsIHRoaXMuY3VycmVudFllYXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIG5hdkZvcndhcmQoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy52aWV3ID09PSAnbW9udGgnKSB7XG4gICAgICAgICAgICB0aGlzLmluY3JlbWVudFllYXIoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRNb250aCA9PT0gMTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRNb250aCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmNyZW1lbnRZZWFyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRNb250aCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLm9uTW9udGhDaGFuZ2UuZW1pdCh7bW9udGg6IHRoaXMuY3VycmVudE1vbnRoICsgMSwgeWVhcjogdGhpcy5jdXJyZW50WWVhcn0pO1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVNb250aHModGhpcy5jdXJyZW50TW9udGgsIHRoaXMuY3VycmVudFllYXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVjcmVtZW50WWVhcigpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50WWVhci0tO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMueWVhck5hdmlnYXRvciAmJiB0aGlzLmN1cnJlbnRZZWFyIDwgdGhpcy55ZWFyT3B0aW9uc1swXSkge1xuICAgICAgICAgICAgbGV0IGRpZmZlcmVuY2UgPSB0aGlzLnllYXJPcHRpb25zW3RoaXMueWVhck9wdGlvbnMubGVuZ3RoIC0gMV0gLSB0aGlzLnllYXJPcHRpb25zWzBdO1xuICAgICAgICAgICAgdGhpcy5wb3B1bGF0ZVllYXJPcHRpb25zKHRoaXMueWVhck9wdGlvbnNbMF0gLSBkaWZmZXJlbmNlLCB0aGlzLnllYXJPcHRpb25zW3RoaXMueWVhck9wdGlvbnMubGVuZ3RoIC0gMV0gLSBkaWZmZXJlbmNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluY3JlbWVudFllYXIoKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFllYXIrKztcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnllYXJOYXZpZ2F0b3IgJiYgdGhpcy5jdXJyZW50WWVhciA+IHRoaXMueWVhck9wdGlvbnNbdGhpcy55ZWFyT3B0aW9ucy5sZW5ndGggLSAxXSkge1xuICAgICAgICAgICAgbGV0IGRpZmZlcmVuY2UgPSB0aGlzLnllYXJPcHRpb25zW3RoaXMueWVhck9wdGlvbnMubGVuZ3RoIC0gMV0gLSB0aGlzLnllYXJPcHRpb25zWzBdO1xuICAgICAgICAgICAgdGhpcy5wb3B1bGF0ZVllYXJPcHRpb25zKHRoaXMueWVhck9wdGlvbnNbMF0gKyBkaWZmZXJlbmNlLCB0aGlzLnllYXJPcHRpb25zW3RoaXMueWVhck9wdGlvbnMubGVuZ3RoIC0gMV0gKyBkaWZmZXJlbmNlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBvbkRhdGVTZWxlY3QoZXZlbnQsIGRhdGVNZXRhKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8ICFkYXRlTWV0YS5zZWxlY3RhYmxlKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5pc011bHRpcGxlU2VsZWN0aW9uKCkgJiYgdGhpcy5pc1NlbGVjdGVkKGRhdGVNZXRhKSkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudmFsdWUuZmlsdGVyKChkYXRlLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICF0aGlzLmlzRGF0ZUVxdWFscyhkYXRlLCBkYXRlTWV0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWwodGhpcy52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zaG91bGRTZWxlY3REYXRlKGRhdGVNZXRhKSkge1xuICAgICAgICAgICAgICAgIGlmIChkYXRlTWV0YS5vdGhlck1vbnRoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudE1vbnRoID0gZGF0ZU1ldGEubW9udGg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFllYXIgPSBkYXRlTWV0YS55ZWFyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU1vbnRocyh0aGlzLmN1cnJlbnRNb250aCwgdGhpcy5jdXJyZW50WWVhcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0RGF0ZShkYXRlTWV0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3REYXRlKGRhdGVNZXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLmlzU2luZ2xlU2VsZWN0aW9uKCkgJiYgKCF0aGlzLnNob3dUaW1lIHx8IHRoaXMuaGlkZU9uRGF0ZVRpbWVTZWxlY3QpKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZU92ZXJsYXkoKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hc2spIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNhYmxlTW9kYWxpdHkoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfSwgMTUwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlSW5wdXRmaWVsZCgpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBcbiAgICBzaG91bGRTZWxlY3REYXRlKGRhdGVNZXRhKSB7XG4gICAgICAgIGlmICh0aGlzLmlzTXVsdGlwbGVTZWxlY3Rpb24oKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1heERhdGVDb3VudCAhPSBudWxsID/CoHRoaXMubWF4RGF0ZUNvdW50ID4gKHRoaXMudmFsdWUgPyB0aGlzLnZhbHVlLmxlbmd0aCA6IDApIDogdHJ1ZTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgb25Nb250aFNlbGVjdChldmVudCwgaW5kZXgpIHtcbiAgICAgICAgdGhpcy5vbkRhdGVTZWxlY3QoZXZlbnQsIHt5ZWFyOiB0aGlzLmN1cnJlbnRZZWFyLCBtb250aDogaW5kZXgsIGRheTogMSwgc2VsZWN0YWJsZTogdHJ1ZX0pO1xuICAgIH1cbiAgICBcbiAgICB1cGRhdGVJbnB1dGZpZWxkKCkge1xuICAgICAgICBsZXQgZm9ybWF0dGVkVmFsdWUgPSAnJztcblxuICAgICAgICBpZiAodGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNTaW5nbGVTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgICAgIGZvcm1hdHRlZFZhbHVlID0gdGhpcy5mb3JtYXREYXRlVGltZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaXNNdWx0aXBsZVNlbGVjdGlvbigpKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRlQXNTdHJpbmcgPSB0aGlzLmZvcm1hdERhdGVUaW1lKHRoaXMudmFsdWVbaV0pO1xuICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZWRWYWx1ZSArPSBkYXRlQXNTdHJpbmc7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpICE9PSAodGhpcy52YWx1ZS5sZW5ndGggLSAxKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVkVmFsdWUgKz0gdGhpcy5tdWx0aXBsZVNlcGFyYXRvcisnICc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmlzUmFuZ2VTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlICYmIHRoaXMudmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzdGFydERhdGUgPSB0aGlzLnZhbHVlWzBdO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZW5kRGF0ZSA9IHRoaXMudmFsdWVbMV07XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZWRWYWx1ZSA9IHRoaXMuZm9ybWF0RGF0ZVRpbWUoc3RhcnREYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVuZERhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlZFZhbHVlICs9ICcgJyt0aGlzLnJhbmdlU2VwYXJhdG9yICsnICcgKyB0aGlzLmZvcm1hdERhdGVUaW1lKGVuZERhdGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmlucHV0RmllbGRWYWx1ZSA9IGZvcm1hdHRlZFZhbHVlO1xuICAgICAgICB0aGlzLnVwZGF0ZUZpbGxlZFN0YXRlKCk7XG4gICAgICAgIGlmICh0aGlzLmlucHV0ZmllbGRWaWV3Q2hpbGQgJiYgdGhpcy5pbnB1dGZpZWxkVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRmaWVsZFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5pbnB1dEZpZWxkVmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZm9ybWF0RGF0ZVRpbWUoZGF0ZSkge1xuICAgICAgICBsZXQgZm9ybWF0dGVkVmFsdWUgPSBudWxsO1xuICAgICAgICBpZiAoZGF0ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMudGltZU9ubHkpIHtcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZWRWYWx1ZSA9IHRoaXMuZm9ybWF0VGltZShkYXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvcm1hdHRlZFZhbHVlID0gdGhpcy5mb3JtYXREYXRlKGRhdGUsIHRoaXMuZ2V0RGF0ZUZvcm1hdCgpKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zaG93VGltZSkge1xuICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZWRWYWx1ZSArPSAnICcgKyB0aGlzLmZvcm1hdFRpbWUoZGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZm9ybWF0dGVkVmFsdWU7XG4gICAgfVxuICAgIFxuICAgIHNlbGVjdERhdGUoZGF0ZU1ldGEpIHtcbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShkYXRlTWV0YS55ZWFyLCBkYXRlTWV0YS5tb250aCwgZGF0ZU1ldGEuZGF5KTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnNob3dUaW1lKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5ob3VyRm9ybWF0ID09ICcxMicpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50SG91ciA9PT0gMTIpXG4gICAgICAgICAgICAgICAgICAgIGRhdGUuc2V0SG91cnModGhpcy5wbSA/IDEyIDogMCk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBkYXRlLnNldEhvdXJzKHRoaXMucG0gPyB0aGlzLmN1cnJlbnRIb3VyICsgMTIgOiB0aGlzLmN1cnJlbnRIb3VyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGRhdGUuc2V0SG91cnModGhpcy5jdXJyZW50SG91cik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRhdGUuc2V0TWludXRlcyh0aGlzLmN1cnJlbnRNaW51dGUpO1xuICAgICAgICAgICAgZGF0ZS5zZXRTZWNvbmRzKHRoaXMuY3VycmVudFNlY29uZCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLm1pbkRhdGUgJiYgdGhpcy5taW5EYXRlID4gZGF0ZSkge1xuICAgICAgICAgICAgZGF0ZSA9IHRoaXMubWluRGF0ZTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEhvdXIgPSBkYXRlLmdldEhvdXJzKCk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRNaW51dGUgPSBkYXRlLmdldE1pbnV0ZXMoKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNlY29uZCA9IGRhdGUuZ2V0U2Vjb25kcygpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5tYXhEYXRlICYmIHRoaXMubWF4RGF0ZSA8IGRhdGUpIHtcbiAgICAgICAgICAgIGRhdGUgPSB0aGlzLm1heERhdGU7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRIb3VyID0gZGF0ZS5nZXRIb3VycygpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50TWludXRlID0gZGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTZWNvbmQgPSBkYXRlLmdldFNlY29uZHMoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuaXNTaW5nbGVTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVNb2RlbChkYXRlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmlzTXVsdGlwbGVTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVNb2RlbCh0aGlzLnZhbHVlID8gWy4uLnRoaXMudmFsdWUsIGRhdGVdIDogW2RhdGVdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmlzUmFuZ2VTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMudmFsdWUgJiYgdGhpcy52YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnREYXRlID0gdGhpcy52YWx1ZVswXTtcbiAgICAgICAgICAgICAgICBsZXQgZW5kRGF0ZSA9IHRoaXMudmFsdWVbMV07XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKCFlbmREYXRlICYmIGRhdGUuZ2V0VGltZSgpID49IHN0YXJ0RGF0ZS5nZXRUaW1lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZW5kRGF0ZSA9IGRhdGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdGFydERhdGUgPSBkYXRlO1xuICAgICAgICAgICAgICAgICAgICBlbmREYXRlID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVNb2RlbChbc3RhcnREYXRlLCBlbmREYXRlXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKFtkYXRlLCBudWxsXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMub25TZWxlY3QuZW1pdChkYXRlKTtcbiAgICB9XG4gICAgXG4gICAgdXBkYXRlTW9kZWwodmFsdWUpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuZGF0YVR5cGUgPT0gJ2RhdGUnKSB7XG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5kYXRhVHlwZSA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNTaW5nbGVTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLmZvcm1hdERhdGVUaW1lKHRoaXMudmFsdWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBzdHJpbmdBcnJWYWx1ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nQXJyVmFsdWUgPSB0aGlzLnZhbHVlLm1hcChkYXRlID0+IHRoaXMuZm9ybWF0RGF0ZVRpbWUoZGF0ZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2Uoc3RyaW5nQXJyVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGdldEZpcnN0RGF5T2ZNb250aEluZGV4KG1vbnRoOiBudW1iZXIsIHllYXI6IG51bWJlcikge1xuICAgICAgICBsZXQgZGF5ID0gbmV3IERhdGUoKTtcbiAgICAgICAgZGF5LnNldERhdGUoMSk7XG4gICAgICAgIGRheS5zZXRNb250aChtb250aCk7XG4gICAgICAgIGRheS5zZXRGdWxsWWVhcih5ZWFyKTtcbiAgICAgICAgXG4gICAgICAgIGxldCBkYXlJbmRleCA9IGRheS5nZXREYXkoKSArIHRoaXMuZ2V0U3VuZGF5SW5kZXgoKTtcbiAgICAgICAgcmV0dXJuIGRheUluZGV4ID49IDcgPyBkYXlJbmRleCAtIDcgOiBkYXlJbmRleDtcbiAgICB9XG4gICAgXG4gICAgZ2V0RGF5c0NvdW50SW5Nb250aChtb250aDogbnVtYmVyLCB5ZWFyOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIDMyIC0gdGhpcy5kYXlsaWdodFNhdmluZ0FkanVzdChuZXcgRGF0ZSh5ZWFyLCBtb250aCwgMzIpKS5nZXREYXRlKCk7XG4gICAgfVxuICAgIFxuICAgIGdldERheXNDb3VudEluUHJldk1vbnRoKG1vbnRoOiBudW1iZXIsIHllYXI6IG51bWJlcikge1xuICAgICAgICBsZXQgcHJldiA9IHRoaXMuZ2V0UHJldmlvdXNNb250aEFuZFllYXIobW9udGgsIHllYXIpO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREYXlzQ291bnRJbk1vbnRoKHByZXYubW9udGgsIHByZXYueWVhcik7XG4gICAgfVxuICAgIFxuICAgIGdldFByZXZpb3VzTW9udGhBbmRZZWFyKG1vbnRoOiBudW1iZXIsIHllYXI6IG51bWJlcikge1xuICAgICAgICBsZXQgbSwgeTtcbiAgICAgICAgXG4gICAgICAgIGlmIChtb250aCA9PT0gMCkge1xuICAgICAgICAgICAgbSA9IDExO1xuICAgICAgICAgICAgeSA9IHllYXIgLSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbSA9IG1vbnRoIC0gMTtcbiAgICAgICAgICAgIHkgPSB5ZWFyO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4geydtb250aCc6bSwneWVhcic6eX07XG4gICAgfVxuICAgIFxuICAgIGdldE5leHRNb250aEFuZFllYXIobW9udGg6IG51bWJlciwgeWVhcjogbnVtYmVyKSB7XG4gICAgICAgIGxldCBtLCB5O1xuICAgICAgICBcbiAgICAgICAgaWYgKG1vbnRoID09PSAxMSkge1xuICAgICAgICAgICAgbSA9IDA7XG4gICAgICAgICAgICB5ID0geWVhciArIDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBtID0gbW9udGggKyAxO1xuICAgICAgICAgICAgeSA9IHllYXI7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiB7J21vbnRoJzptLCd5ZWFyJzp5fTtcbiAgICB9XG4gICAgXG4gICAgZ2V0U3VuZGF5SW5kZXgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZS5maXJzdERheU9mV2VlayA+IDAgPyA3IC0gdGhpcy5sb2NhbGUuZmlyc3REYXlPZldlZWsgOiAwO1xuICAgIH1cbiAgICBcbiAgICBpc1NlbGVjdGVkKGRhdGVNZXRhKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1NpbmdsZVNlbGVjdGlvbigpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNEYXRlRXF1YWxzKHRoaXMudmFsdWUsIGRhdGVNZXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaXNNdWx0aXBsZVNlbGVjdGlvbigpKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZGF0ZSBvZiB0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gdGhpcy5pc0RhdGVFcXVhbHMoZGF0ZSwgZGF0ZU1ldGEpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaXNSYW5nZVNlbGVjdGlvbigpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmFsdWVbMV0pXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzRGF0ZUVxdWFscyh0aGlzLnZhbHVlWzBdLCBkYXRlTWV0YSkgfHwgdGhpcy5pc0RhdGVFcXVhbHModGhpcy52YWx1ZVsxXSwgZGF0ZU1ldGEpIHx8IHRoaXMuaXNEYXRlQmV0d2Vlbih0aGlzLnZhbHVlWzBdLCB0aGlzLnZhbHVlWzFdLCBkYXRlTWV0YSk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc0RhdGVFcXVhbHModGhpcy52YWx1ZVswXSwgZGF0ZU1ldGEpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc01vbnRoU2VsZWN0ZWQobW9udGg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgZGF5ID0gdGhpcy52YWx1ZSA/IChBcnJheS5pc0FycmF5KHRoaXMudmFsdWUpID8gdGhpcy52YWx1ZVswXS5nZXREYXRlKCkgOiB0aGlzLnZhbHVlLmdldERhdGUoKSkgOiAxOyBcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNTZWxlY3RlZCh7eWVhcjogdGhpcy5jdXJyZW50WWVhciwgbW9udGg6IG1vbnRoLCBkYXk6IGRheSwgc2VsZWN0YWJsZTogdHJ1ZX0pO1xuICAgIH1cbiAgICBcbiAgICBpc0RhdGVFcXVhbHModmFsdWUsIGRhdGVNZXRhKSB7XG4gICAgICAgIGlmICh2YWx1ZSlcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5nZXREYXRlKCkgPT09IGRhdGVNZXRhLmRheSAmJiB2YWx1ZS5nZXRNb250aCgpID09PSBkYXRlTWV0YS5tb250aCAmJiB2YWx1ZS5nZXRGdWxsWWVhcigpID09PSBkYXRlTWV0YS55ZWFyO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIFxuICAgIGlzRGF0ZUJldHdlZW4oc3RhcnQsIGVuZCwgZGF0ZU1ldGEpIHtcbiAgICAgICAgbGV0IGJldHdlZW4gOiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgIGlmIChzdGFydCAmJiBlbmQpIHtcbiAgICAgICAgICAgIGxldCBkYXRlOiBEYXRlID0gbmV3IERhdGUoZGF0ZU1ldGEueWVhciwgZGF0ZU1ldGEubW9udGgsIGRhdGVNZXRhLmRheSk7XG4gICAgICAgICAgICByZXR1cm4gc3RhcnQuZ2V0VGltZSgpIDw9IGRhdGUuZ2V0VGltZSgpICYmIGVuZC5nZXRUaW1lKCkgPj0gZGF0ZS5nZXRUaW1lKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBiZXR3ZWVuO1xuICAgIH1cbiAgICBcbiAgICBpc1NpbmdsZVNlbGVjdGlvbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gJ3NpbmdsZSc7XG4gICAgfVxuICAgIFxuICAgIGlzUmFuZ2VTZWxlY3Rpb24oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbk1vZGUgPT09ICdyYW5nZSc7XG4gICAgfVxuICAgIFxuICAgIGlzTXVsdGlwbGVTZWxlY3Rpb24oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbk1vZGUgPT09ICdtdWx0aXBsZSc7XG4gICAgfVxuICAgIFxuICAgIGlzVG9kYXkodG9kYXksIGRheSwgbW9udGgsIHllYXIpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRvZGF5LmdldERhdGUoKSA9PT0gZGF5ICYmIHRvZGF5LmdldE1vbnRoKCkgPT09IG1vbnRoICYmIHRvZGF5LmdldEZ1bGxZZWFyKCkgPT09IHllYXI7XG4gICAgfVxuICAgIFxuICAgIGlzU2VsZWN0YWJsZShkYXksIG1vbnRoLCB5ZWFyLCBvdGhlck1vbnRoKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCB2YWxpZE1pbiA9IHRydWU7XG4gICAgICAgIGxldCB2YWxpZE1heCA9IHRydWU7XG4gICAgICAgIGxldCB2YWxpZERhdGUgPSB0cnVlO1xuICAgICAgICBsZXQgdmFsaWREYXkgPSB0cnVlO1xuXG4gICAgICAgIGlmIChvdGhlck1vbnRoICYmICF0aGlzLnNlbGVjdE90aGVyTW9udGhzKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLm1pbkRhdGUpIHtcbiAgICAgICAgICAgICBpZiAodGhpcy5taW5EYXRlLmdldEZ1bGxZZWFyKCkgPiB5ZWFyKSB7XG4gICAgICAgICAgICAgICAgIHZhbGlkTWluID0gZmFsc2U7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMubWluRGF0ZS5nZXRGdWxsWWVhcigpID09PSB5ZWFyKSB7XG4gICAgICAgICAgICAgICAgIGlmICh0aGlzLm1pbkRhdGUuZ2V0TW9udGgoKSA+IG1vbnRoKSB7XG4gICAgICAgICAgICAgICAgICAgICB2YWxpZE1pbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMubWluRGF0ZS5nZXRNb250aCgpID09PSBtb250aCkge1xuICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubWluRGF0ZS5nZXREYXRlKCkgPiBkYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZE1pbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5tYXhEYXRlKSB7XG4gICAgICAgICAgICAgaWYgKHRoaXMubWF4RGF0ZS5nZXRGdWxsWWVhcigpIDwgeWVhcikge1xuICAgICAgICAgICAgICAgICB2YWxpZE1heCA9IGZhbHNlO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLm1heERhdGUuZ2V0RnVsbFllYXIoKSA9PT0geWVhcikge1xuICAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXhEYXRlLmdldE1vbnRoKCkgPCBtb250aCkge1xuICAgICAgICAgICAgICAgICAgICAgdmFsaWRNYXggPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLm1heERhdGUuZ2V0TW9udGgoKSA9PT0gbW9udGgpIHtcbiAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1heERhdGUuZ2V0RGF0ZSgpIDwgZGF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRNYXggPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWREYXRlcykge1xuICAgICAgICAgICB2YWxpZERhdGUgPSAhdGhpcy5pc0RhdGVEaXNhYmxlZChkYXksbW9udGgseWVhcik7XG4gICAgICAgIH1cbiAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWREYXlzKSB7XG4gICAgICAgICAgIHZhbGlkRGF5ID0gIXRoaXMuaXNEYXlEaXNhYmxlZChkYXksbW9udGgseWVhcilcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHZhbGlkTWluICYmIHZhbGlkTWF4ICYmIHZhbGlkRGF0ZSAmJiB2YWxpZERheTtcbiAgICB9XG4gICAgXG4gICAgaXNEYXRlRGlzYWJsZWQoZGF5Om51bWJlciwgbW9udGg6bnVtYmVyLCB5ZWFyOm51bWJlcik6Ym9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkRGF0ZXMpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGRpc2FibGVkRGF0ZSBvZiB0aGlzLmRpc2FibGVkRGF0ZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGlzYWJsZWREYXRlLmdldEZ1bGxZZWFyKCkgPT09IHllYXIgJiYgZGlzYWJsZWREYXRlLmdldE1vbnRoKCkgPT09IG1vbnRoICYmIGRpc2FibGVkRGF0ZS5nZXREYXRlKCkgPT09IGRheSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgXG4gICAgaXNEYXlEaXNhYmxlZChkYXk6bnVtYmVyLCBtb250aDpudW1iZXIsIHllYXI6bnVtYmVyKTpib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWREYXlzKSB7XG4gICAgICAgICAgICBsZXQgd2Vla2RheSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoLCBkYXkpO1xuICAgICAgICAgICAgbGV0IHdlZWtkYXlOdW1iZXIgPSB3ZWVrZGF5LmdldERheSgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWREYXlzLmluZGV4T2Yod2Vla2RheU51bWJlcikgIT09IC0xO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgXG4gICAgb25JbnB1dEZvY3VzKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLmZvY3VzID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuc2hvd09uRm9jdXMpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd092ZXJsYXkoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9uRm9jdXMuZW1pdChldmVudCk7XG4gICAgfVxuICAgIFxuICAgIG9uSW5wdXRDbGljayhldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheSAmJiB0aGlzLmF1dG9aSW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheS5zdHlsZS56SW5kZXggPSBTdHJpbmcodGhpcy5iYXNlWkluZGV4ICsgKCsrRG9tSGFuZGxlci56aW5kZXgpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zaG93T25Gb2N1cyAmJiAhdGhpcy5vdmVybGF5VmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5zaG93T3ZlcmxheSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIG9uSW5wdXRCbHVyKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLmZvY3VzID0gZmFsc2U7XG4gICAgICAgIHRoaXMub25CbHVyLmVtaXQoZXZlbnQpO1xuICAgICAgICBpZiAoIXRoaXMua2VlcEludmFsaWQpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSW5wdXRmaWVsZCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcbiAgICB9XG4gICAgXG4gICAgb25CdXR0b25DbGljayhldmVudCwgaW5wdXRmaWVsZCkge1xuICAgICAgICBpZiAoIXRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAgIGlucHV0ZmllbGQuZm9jdXMoKTtcbiAgICAgICAgICAgIHRoaXMuc2hvd092ZXJsYXkoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZU92ZXJsYXkoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBvbklucHV0S2V5ZG93bihldmVudCkge1xuICAgICAgICB0aGlzLmlzS2V5ZG93biA9IHRydWU7XG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSA5KSB7XG4gICAgICAgICAgICB0aGlzLmhpZGVPdmVybGF5KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgb25Nb250aERyb3Bkb3duQ2hhbmdlKG06IHN0cmluZykge1xuICAgICAgICB0aGlzLmN1cnJlbnRNb250aCA9IHBhcnNlSW50KG0pO1xuICAgICAgICB0aGlzLm9uTW9udGhDaGFuZ2UuZW1pdCh7IG1vbnRoOiB0aGlzLmN1cnJlbnRNb250aCArIDEsIHllYXI6IHRoaXMuY3VycmVudFllYXIgfSk7XG4gICAgICAgIHRoaXMuY3JlYXRlTW9udGhzKHRoaXMuY3VycmVudE1vbnRoLCB0aGlzLmN1cnJlbnRZZWFyKTtcbiAgICB9XG4gICAgXG4gICAgb25ZZWFyRHJvcGRvd25DaGFuZ2UoeTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFllYXIgPSBwYXJzZUludCh5KTtcbiAgICAgICAgdGhpcy5vblllYXJDaGFuZ2UuZW1pdCh7IG1vbnRoOiB0aGlzLmN1cnJlbnRNb250aCArIDEsIHllYXI6IHRoaXMuY3VycmVudFllYXIgfSk7XG4gICAgICAgIHRoaXMuY3JlYXRlTW9udGhzKHRoaXMuY3VycmVudE1vbnRoLCB0aGlzLmN1cnJlbnRZZWFyKTtcbiAgICB9XG4gICAgXG4gICAgaW5jcmVtZW50SG91cihldmVudCkge1xuICAgICAgICBjb25zdCBwcmV2SG91ciA9IHRoaXMuY3VycmVudEhvdXI7XG4gICAgICAgIGNvbnN0IG5ld0hvdXIgPSB0aGlzLmN1cnJlbnRIb3VyICsgdGhpcy5zdGVwSG91cjtcblxuICAgICAgICBpZiAodGhpcy52YWxpZGF0ZUhvdXIobmV3SG91cikpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhvdXJGb3JtYXQgPT0gJzI0JylcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRIb3VyID0gKG5ld0hvdXIgPj0gMjQpID8gKG5ld0hvdXIgLSAyNCkgOiBuZXdIb3VyO1xuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5ob3VyRm9ybWF0ID09ICcxMicpIHtcbiAgICAgICAgICAgICAgICAvLyBCZWZvcmUgdGhlIEFNL1BNIGJyZWFrLCBub3cgYWZ0ZXJcbiAgICAgICAgICAgICAgICBpZiAocHJldkhvdXIgPCAxMiAmJiBuZXdIb3VyID4gMTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbSA9ICF0aGlzLnBtO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEhvdXIgPSAobmV3SG91ciA+PSAxMykgPyAobmV3SG91ciAtIDEyKSA6IG5ld0hvdXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvblRpbWVQaWNrZXJFbGVtZW50TW91c2VEb3duKGV2ZW50OiBFdmVudCwgdHlwZTogbnVtYmVyLCBkaXJlY3Rpb246IG51bWJlcikge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMucmVwZWF0KGV2ZW50LCBudWxsLCB0eXBlLCBkaXJlY3Rpb24pO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uVGltZVBpY2tlckVsZW1lbnRNb3VzZVVwKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lUGlja2VyVGltZXIoKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVGltZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25UaW1lUGlja2VyRWxlbWVudE1vdXNlT3V0KGV2ZW50OiBFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lUGlja2VyVGltZXIoKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVGltZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVwZWF0KGV2ZW50OiBFdmVudCwgaW50ZXJ2YWw6IG51bWJlciwgdHlwZTogbnVtYmVyLCBkaXJlY3Rpb246IG51bWJlcikge1xuICAgICAgICBsZXQgaSA9IGludGVydmFsfHw1MDA7XG5cbiAgICAgICAgdGhpcy5jbGVhclRpbWVQaWNrZXJUaW1lcigpO1xuICAgICAgICB0aGlzLnRpbWVQaWNrZXJUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXBlYXQoZXZlbnQsIDEwMCwgdHlwZSwgZGlyZWN0aW9uKTtcbiAgICAgICAgfSwgaSk7XG5cbiAgICAgICAgc3dpdGNoKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAxKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluY3JlbWVudEhvdXIoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWNyZW1lbnRIb3VyKGV2ZW50KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gMSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmNyZW1lbnRNaW51dGUoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWNyZW1lbnRNaW51dGUoZXZlbnQpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAxKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluY3JlbWVudFNlY29uZChldmVudCk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlY3JlbWVudFNlY29uZChldmVudCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlSW5wdXRmaWVsZCgpO1xuICAgIH1cblxuICAgIGNsZWFyVGltZVBpY2tlclRpbWVyKCkge1xuICAgICAgICBpZiAodGhpcy50aW1lUGlja2VyVGltZXIpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lUGlja2VyVGltZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGRlY3JlbWVudEhvdXIoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgbmV3SG91ciA9IHRoaXMuY3VycmVudEhvdXIgLSB0aGlzLnN0ZXBIb3VyO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMudmFsaWRhdGVIb3VyKG5ld0hvdXIpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5ob3VyRm9ybWF0ID09ICcyNCcpXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50SG91ciA9IChuZXdIb3VyIDwgMCkgPyAoMjQgKyBuZXdIb3VyKSA6IG5ld0hvdXI7XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmhvdXJGb3JtYXQgPT0gJzEyJykge1xuICAgICAgICAgICAgICAgIC8vIElmIHdlIHdlcmUgYXQgbm9vbi9taWRuaWdodCwgdGhlbiBzd2l0Y2hcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50SG91ciA9PT0gMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbSA9ICF0aGlzLnBtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRIb3VyID0gKG5ld0hvdXIgPD0gMCkgPyAoMTIgKyBuZXdIb3VyKSA6IG5ld0hvdXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBcbiAgICB2YWxpZGF0ZUhvdXIoaG91cik6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgdmFsaWQ6IGJvb2xlYW4gPSB0cnVlO1xuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgICBpZiAodGhpcy5pc1JhbmdlU2VsZWN0aW9uKCkpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy52YWx1ZVsxXSB8fCB0aGlzLnZhbHVlWzBdO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmlzTXVsdGlwbGVTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnZhbHVlW3RoaXMudmFsdWUubGVuZ3RoIC0gMV07XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHZhbHVlRGF0ZVN0cmluZyA9IHZhbHVlID8gdmFsdWUudG9EYXRlU3RyaW5nKCkgOiBudWxsO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMubWluRGF0ZSAmJiB2YWx1ZURhdGVTdHJpbmcgJiYgdGhpcy5taW5EYXRlLnRvRGF0ZVN0cmluZygpID09PSB2YWx1ZURhdGVTdHJpbmcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1pbkRhdGUuZ2V0SG91cnMoKSA+IGhvdXIpIHtcbiAgICAgICAgICAgICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5tYXhEYXRlICYmIHZhbHVlRGF0ZVN0cmluZyAmJiB0aGlzLm1heERhdGUudG9EYXRlU3RyaW5nKCkgPT09IHZhbHVlRGF0ZVN0cmluZykge1xuICAgICAgICAgICAgaWYgKHRoaXMubWF4RGF0ZS5nZXRIb3VycygpIDwgaG91cikge1xuICAgICAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiB2YWxpZDtcbiAgICB9XG4gICAgXG4gICAgaW5jcmVtZW50TWludXRlKGV2ZW50KSB7XG4gICAgICAgIGxldCBuZXdNaW51dGUgPSB0aGlzLmN1cnJlbnRNaW51dGUgKyB0aGlzLnN0ZXBNaW51dGU7XG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRlTWludXRlKG5ld01pbnV0ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE1pbnV0ZSA9IChuZXdNaW51dGUgPiA1OSkgPyBuZXdNaW51dGUgLSA2MCA6IG5ld01pbnV0ZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgXG4gICAgZGVjcmVtZW50TWludXRlKGV2ZW50KSB7XG4gICAgICAgIGxldCBuZXdNaW51dGUgPSB0aGlzLmN1cnJlbnRNaW51dGUgLSB0aGlzLnN0ZXBNaW51dGU7XG4gICAgICAgIG5ld01pbnV0ZSA9IChuZXdNaW51dGUgPCAwKSA/IDYwICsgbmV3TWludXRlIDogbmV3TWludXRlO1xuICAgICAgICBpZiAodGhpcy52YWxpZGF0ZU1pbnV0ZShuZXdNaW51dGUpKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRNaW51dGUgPSBuZXdNaW51dGU7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIFxuICAgIHZhbGlkYXRlTWludXRlKG1pbnV0ZSk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgdmFsaWQ6IGJvb2xlYW4gPSB0cnVlO1xuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgICBpZiAodGhpcy5pc1JhbmdlU2VsZWN0aW9uKCkpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy52YWx1ZVsxXSB8fCB0aGlzLnZhbHVlWzBdO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmlzTXVsdGlwbGVTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnZhbHVlW3RoaXMudmFsdWUubGVuZ3RoIC0gMV07XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHZhbHVlRGF0ZVN0cmluZyA9IHZhbHVlID8gdmFsdWUudG9EYXRlU3RyaW5nKCkgOiBudWxsO1xuICAgICAgICBpZiAodGhpcy5taW5EYXRlICYmIHZhbHVlRGF0ZVN0cmluZyAmJiB0aGlzLm1pbkRhdGUudG9EYXRlU3RyaW5nKCkgPT09IHZhbHVlRGF0ZVN0cmluZykge1xuICAgICAgICAgICAgaWYgKHZhbHVlLmdldEhvdXJzKCkgPT0gdGhpcy5taW5EYXRlLmdldEhvdXJzKCkpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1pbkRhdGUuZ2V0TWludXRlcygpID4gbWludXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5tYXhEYXRlICYmIHZhbHVlRGF0ZVN0cmluZyAmJiB0aGlzLm1heERhdGUudG9EYXRlU3RyaW5nKCkgPT09IHZhbHVlRGF0ZVN0cmluZykge1xuICAgICAgICAgICAgaWYgKHZhbHVlLmdldEhvdXJzKCkgPT0gdGhpcy5tYXhEYXRlLmdldEhvdXJzKCkpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1heERhdGUuZ2V0TWludXRlcygpIDwgbWludXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdmFsaWQ7XG4gICAgfVxuICAgIFxuICAgIGluY3JlbWVudFNlY29uZChldmVudCkge1xuICAgICAgICBsZXQgbmV3U2Vjb25kID0gdGhpcy5jdXJyZW50U2Vjb25kICsgdGhpcy5zdGVwU2Vjb25kO1xuICAgICAgICBpZiAodGhpcy52YWxpZGF0ZVNlY29uZChuZXdTZWNvbmQpKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTZWNvbmQgPSAobmV3U2Vjb25kID4gNTkpID8gbmV3U2Vjb25kIC0gNjAgOiBuZXdTZWNvbmQ7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgXG4gICAgZGVjcmVtZW50U2Vjb25kKGV2ZW50KSB7XG4gICAgICAgIGxldCBuZXdTZWNvbmQgPSB0aGlzLmN1cnJlbnRTZWNvbmQgLSB0aGlzLnN0ZXBTZWNvbmQ7XG4gICAgICAgIG5ld1NlY29uZCA9IChuZXdTZWNvbmQgPCAwKSA/IDYwICsgbmV3U2Vjb25kIDogbmV3U2Vjb25kO1xuICAgICAgICBpZiAodGhpcy52YWxpZGF0ZVNlY29uZChuZXdTZWNvbmQpKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTZWNvbmQgPSBuZXdTZWNvbmQ7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIFxuICAgIHZhbGlkYXRlU2Vjb25kKHNlY29uZCk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgdmFsaWQ6IGJvb2xlYW4gPSB0cnVlO1xuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgICBpZiAodGhpcy5pc1JhbmdlU2VsZWN0aW9uKCkpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy52YWx1ZVsxXSB8fCB0aGlzLnZhbHVlWzBdO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmlzTXVsdGlwbGVTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnZhbHVlW3RoaXMudmFsdWUubGVuZ3RoIC0gMV07XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHZhbHVlRGF0ZVN0cmluZyA9IHZhbHVlID8gdmFsdWUudG9EYXRlU3RyaW5nKCkgOiBudWxsO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMubWluRGF0ZSAmJiB2YWx1ZURhdGVTdHJpbmcgJiYgdGhpcy5taW5EYXRlLnRvRGF0ZVN0cmluZygpID09PSB2YWx1ZURhdGVTdHJpbmcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1pbkRhdGUuZ2V0U2Vjb25kcygpID4gc2Vjb25kKSB7XG4gICAgICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMubWF4RGF0ZSAmJiB2YWx1ZURhdGVTdHJpbmcgJiYgdGhpcy5tYXhEYXRlLnRvRGF0ZVN0cmluZygpID09PSB2YWx1ZURhdGVTdHJpbmcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1heERhdGUuZ2V0U2Vjb25kcygpIDwgc2Vjb25kKSB7XG4gICAgICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHZhbGlkO1xuICAgIH1cbiAgICBcbiAgICB1cGRhdGVUaW1lKCkge1xuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgICBpZiAodGhpcy5pc1JhbmdlU2VsZWN0aW9uKCkpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy52YWx1ZVsxXSB8fCB0aGlzLnZhbHVlWzBdO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmlzTXVsdGlwbGVTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnZhbHVlW3RoaXMudmFsdWUubGVuZ3RoIC0gMV07XG4gICAgICAgIH1cbiAgICAgICAgdmFsdWUgPSB2YWx1ZSA/IG5ldyBEYXRlKHZhbHVlLmdldFRpbWUoKSkgOiBuZXcgRGF0ZSgpO1xuXG4gICAgICAgIGlmICh0aGlzLmhvdXJGb3JtYXQgPT0gJzEyJykge1xuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudEhvdXIgPT09IDEyKVxuICAgICAgICAgICAgICAgIHZhbHVlLnNldEhvdXJzKHRoaXMucG0gPyAxMiA6IDApO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHZhbHVlLnNldEhvdXJzKHRoaXMucG0gPyB0aGlzLmN1cnJlbnRIb3VyICsgMTIgOiB0aGlzLmN1cnJlbnRIb3VyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhbHVlLnNldEhvdXJzKHRoaXMuY3VycmVudEhvdXIpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB2YWx1ZS5zZXRNaW51dGVzKHRoaXMuY3VycmVudE1pbnV0ZSk7XG4gICAgICAgIHZhbHVlLnNldFNlY29uZHModGhpcy5jdXJyZW50U2Vjb25kKTtcbiAgICAgICAgaWYgKHRoaXMuaXNSYW5nZVNlbGVjdGlvbigpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy52YWx1ZVsxXSlcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IFt0aGlzLnZhbHVlWzBdLCB2YWx1ZV07XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBbdmFsdWUsIG51bGxdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNNdWx0aXBsZVNlbGVjdGlvbigpKXtcbiAgICAgICAgICAgIHZhbHVlID0gWy4uLnRoaXMudmFsdWUuc2xpY2UoMCwgLTEpLCB2YWx1ZV07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKHZhbHVlKTtcbiAgICAgICAgdGhpcy5vblNlbGVjdC5lbWl0KHZhbHVlKTtcbiAgICAgICAgdGhpcy51cGRhdGVJbnB1dGZpZWxkKCk7XG4gICAgfVxuICAgIFxuICAgIHRvZ2dsZUFNUE0oZXZlbnQpIHtcbiAgICAgICAgdGhpcy5wbSA9ICF0aGlzLnBtO1xuICAgICAgICB0aGlzLnVwZGF0ZVRpbWUoKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvblVzZXJJbnB1dChldmVudCkge1xuICAgICAgICAvLyBJRSAxMSBXb3JrYXJvdW5kIGZvciBpbnB1dCBwbGFjZWhvbGRlciA6IGh0dHBzOi8vZ2l0aHViLmNvbS9wcmltZWZhY2VzL3ByaW1lbmcvaXNzdWVzLzIwMjZcbiAgICAgICAgaWYgKCF0aGlzLmlzS2V5ZG93bikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNLZXlkb3duID0gZmFsc2U7XG4gICAgICAgIFxuICAgICAgICBsZXQgdmFsID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5wYXJzZVZhbHVlRnJvbVN0cmluZyh2YWwpO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNWYWxpZFNlbGVjdGlvbih2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVVJKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICAvL2ludmFsaWQgZGF0ZVxuICAgICAgICAgICAgdGhpcy51cGRhdGVNb2RlbChudWxsKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5maWxsZWQgPSB2YWwgIT0gbnVsbCAmJiB2YWwubGVuZ3RoO1xuICAgICAgICB0aGlzLm9uSW5wdXQuZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgaXNWYWxpZFNlbGVjdGlvbih2YWx1ZSk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgaXNWYWxpZCA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLmlzU2luZ2xlU2VsZWN0aW9uKCkpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc1NlbGVjdGFibGUodmFsdWUuZ2V0RGF0ZSgpLCB2YWx1ZS5nZXRNb250aCgpLCB2YWx1ZS5nZXRGdWxsWWVhcigpLCBmYWxzZSkpIHtcbiAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUuZXZlcnkodiA9PiB0aGlzLmlzU2VsZWN0YWJsZSh2LmdldERhdGUoKSwgdi5nZXRNb250aCgpLCB2LmdldEZ1bGxZZWFyKCksIGZhbHNlKSkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzUmFuZ2VTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgICAgIGlzVmFsaWQgPSB2YWx1ZS5sZW5ndGggPiAxICYmIHZhbHVlWzFdID4gdmFsdWVbMF0gPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlzVmFsaWQ7XG4gICAgfVxuICAgIFxuICAgIHBhcnNlVmFsdWVGcm9tU3RyaW5nKHRleHQ6IHN0cmluZyk6IERhdGUgfCBEYXRlW117XG4gICAgICAgIGlmICghdGV4dCB8fCB0ZXh0LnRyaW0oKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgdmFsdWU6IGFueTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLmlzU2luZ2xlU2VsZWN0aW9uKCkpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy5wYXJzZURhdGVUaW1lKHRleHQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuaXNNdWx0aXBsZVNlbGVjdGlvbigpKSB7XG4gICAgICAgICAgICBsZXQgdG9rZW5zID0gdGV4dC5zcGxpdCh0aGlzLm11bHRpcGxlU2VwYXJhdG9yKTtcbiAgICAgICAgICAgIHZhbHVlID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCB0b2tlbiBvZiB0b2tlbnMpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZS5wdXNoKHRoaXMucGFyc2VEYXRlVGltZSh0b2tlbi50cmltKCkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmlzUmFuZ2VTZWxlY3Rpb24oKSkge1xuICAgICAgICAgICAgbGV0IHRva2VucyA9IHRleHQuc3BsaXQoJyAnK3RoaXMucmFuZ2VTZXBhcmF0b3IgKycgJyk7XG4gICAgICAgICAgICB2YWx1ZSA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YWx1ZVtpXSA9IHRoaXMucGFyc2VEYXRlVGltZSh0b2tlbnNbaV0udHJpbSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBcbiAgICBwYXJzZURhdGVUaW1lKHRleHQpOiBEYXRlIHtcbiAgICAgICAgbGV0IGRhdGU6IERhdGU7XG4gICAgICAgIGxldCBwYXJ0czogc3RyaW5nW10gPSB0ZXh0LnNwbGl0KCcgJyk7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy50aW1lT25seSkge1xuICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICB0aGlzLnBvcHVsYXRlVGltZShkYXRlLCBwYXJ0c1swXSwgcGFydHNbMV0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZGF0ZUZvcm1hdCA9IHRoaXMuZ2V0RGF0ZUZvcm1hdCgpO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2hvd1RpbWUpIHtcbiAgICAgICAgICAgICAgICBsZXQgYW1wbSA9IHRoaXMuaG91ckZvcm1hdCA9PSAnMTInID8gcGFydHMucG9wKCkgOiBudWxsO1xuICAgICAgICAgICAgICAgIGxldCB0aW1lU3RyaW5nID0gcGFydHMucG9wKCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZGF0ZSA9IHRoaXMucGFyc2VEYXRlKHBhcnRzLmpvaW4oJyAnKSwgZGF0ZUZvcm1hdCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3B1bGF0ZVRpbWUoZGF0ZSwgdGltZVN0cmluZywgYW1wbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgZGF0ZSA9IHRoaXMucGFyc2VEYXRlKHRleHQsIGRhdGVGb3JtYXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG4gICAgXG4gICAgcG9wdWxhdGVUaW1lKHZhbHVlLCB0aW1lU3RyaW5nLCBhbXBtKSB7XG4gICAgICAgIGlmICh0aGlzLmhvdXJGb3JtYXQgPT0gJzEyJyAmJiAhYW1wbSkge1xuICAgICAgICAgICAgdGhyb3cgJ0ludmFsaWQgVGltZSc7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMucG0gPSAoYW1wbSA9PT0gJ1BNJyB8fCBhbXBtID09PSAncG0nKTtcbiAgICAgICAgbGV0IHRpbWUgPSB0aGlzLnBhcnNlVGltZSh0aW1lU3RyaW5nKTtcbiAgICAgICAgdmFsdWUuc2V0SG91cnModGltZS5ob3VyKTtcbiAgICAgICAgdmFsdWUuc2V0TWludXRlcyh0aW1lLm1pbnV0ZSk7XG4gICAgICAgIHZhbHVlLnNldFNlY29uZHModGltZS5zZWNvbmQpO1xuICAgIH1cbiAgICBcbiAgICB1cGRhdGVVSSgpIHtcbiAgICAgICAgbGV0IHZhbCA9IHRoaXMudmFsdWV8fHRoaXMuZGVmYXVsdERhdGV8fG5ldyBEYXRlKCk7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkpe1xuICAgICAgICAgICAgdmFsID0gdmFsWzBdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jdXJyZW50TW9udGggPSB2YWwuZ2V0TW9udGgoKTtcbiAgICAgICAgdGhpcy5jdXJyZW50WWVhciA9IHZhbC5nZXRGdWxsWWVhcigpO1xuICAgICAgICB0aGlzLmNyZWF0ZU1vbnRocyh0aGlzLmN1cnJlbnRNb250aCwgdGhpcy5jdXJyZW50WWVhcik7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5zaG93VGltZXx8dGhpcy50aW1lT25seSkge1xuICAgICAgICAgICAgbGV0IGhvdXJzID0gdmFsLmdldEhvdXJzKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICh0aGlzLmhvdXJGb3JtYXQgPT0gJzEyJykge1xuICAgICAgICAgICAgICAgIHRoaXMucG0gPSBob3VycyA+IDExO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChob3VycyA+PSAxMikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRIb3VyID0gKGhvdXJzID09IDEyKSA/IDEyIDogaG91cnMgLSAxMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEhvdXIgPSAoaG91cnMgPT0gMCkgPyAxMiA6IGhvdXJzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEhvdXIgPSB2YWwuZ2V0SG91cnMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5jdXJyZW50TWludXRlID0gdmFsLmdldE1pbnV0ZXMoKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNlY29uZCA9IHZhbC5nZXRTZWNvbmRzKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgICAgIFxuICAgIHNob3dPdmVybGF5KCkge1xuICAgICAgICBpZiAoIXRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVUkoKTtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGlkZU92ZXJsYXkoKSB7XG4gICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jbGVhclRpbWVQaWNrZXJUaW1lcigpO1xuXG4gICAgICAgIGlmICh0aGlzLnRvdWNoVUkpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZU1vZGFsaXR5KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b2dnbGUoKSB7XG4gICAgICAgIGlmICghdGhpcy5pbmxpbmUpe1xuICAgICAgICAgICAgaWYgKCF0aGlzLm92ZXJsYXlWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93T3ZlcmxheSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRmaWVsZFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVPdmVybGF5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk92ZXJsYXlBbmltYXRpb25TdGFydChldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC50b1N0YXRlKSB7XG4gICAgICAgICAgICBjYXNlICd2aXNpYmxlJzpcbiAgICAgICAgICAgIGNhc2UgJ3Zpc2libGVUb3VjaFVJJzpcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaW5saW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheSA9IGV2ZW50LmVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kT3ZlcmxheSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hdXRvWkluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXkuc3R5bGUuekluZGV4ID0gU3RyaW5nKHRoaXMuYmFzZVpJbmRleCArICgrK0RvbUhhbmRsZXIuemluZGV4KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGlnbk92ZXJsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ3ZvaWQnOlxuICAgICAgICAgICAgICAgIHRoaXMub25PdmVybGF5SGlkZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMub25DbG9zZS5lbWl0KGV2ZW50KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25PdmVybGF5QW5pbWF0aW9uRG9uZShldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC50b1N0YXRlKSB7XG4gICAgICAgICAgICBjYXNlICd2aXNpYmxlJzpcbiAgICAgICAgICAgIGNhc2UgJ3Zpc2libGVUb3VjaFVJJzpcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaW5saW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhcHBlbmRPdmVybGF5KCkge1xuICAgICAgICBpZiAodGhpcy5hcHBlbmRUbykge1xuICAgICAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG8gPT09ICdib2R5JylcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMub3ZlcmxheSk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hcHBlbmRDaGlsZCh0aGlzLm92ZXJsYXksIHRoaXMuYXBwZW5kVG8pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzdG9yZU92ZXJsYXlBcHBlbmQoKSB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXkgJiYgdGhpcy5hcHBlbmRUbykge1xuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMub3ZlcmxheSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgYWxpZ25PdmVybGF5KCkge1xuICAgICAgICBpZiAodGhpcy50b3VjaFVJKSB7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZU1vZGFsaXR5KHRoaXMub3ZlcmxheSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hcHBlbmRUbylcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFic29sdXRlUG9zaXRpb24odGhpcy5vdmVybGF5LCB0aGlzLmlucHV0ZmllbGRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5yZWxhdGl2ZVBvc2l0aW9uKHRoaXMub3ZlcmxheSwgdGhpcy5pbnB1dGZpZWxkVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZW5hYmxlTW9kYWxpdHkoZWxlbWVudCkge1xuICAgICAgICBpZiAoIXRoaXMubWFzaykge1xuICAgICAgICAgICAgdGhpcy5tYXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLm1hc2suc3R5bGUuekluZGV4ID0gU3RyaW5nKHBhcnNlSW50KGVsZW1lbnQuc3R5bGUuekluZGV4KSAtIDEpO1xuICAgICAgICAgICAgbGV0IG1hc2tTdHlsZUNsYXNzID0gJ3VpLXdpZGdldC1vdmVybGF5IHVpLWRhdGVwaWNrZXItbWFzayB1aS1kYXRlcGlja2VyLW1hc2stc2Nyb2xsYmxvY2tlcic7XG4gICAgICAgICAgICBEb21IYW5kbGVyLmFkZE11bHRpcGxlQ2xhc3Nlcyh0aGlzLm1hc2ssIG1hc2tTdHlsZUNsYXNzKTtcbiAgICAgICAgICAgIFxuXHRcdFx0dGhpcy5tYXNrQ2xpY2tMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMubWFzaywgJ2NsaWNrJywgKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc2FibGVNb2RhbGl0eSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMubWFzayk7XG4gICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKGRvY3VtZW50LmJvZHksICd1aS1vdmVyZmxvdy1oaWRkZW4nKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBkaXNhYmxlTW9kYWxpdHkoKSB7XG4gICAgICAgIGlmICh0aGlzLm1hc2spIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5tYXNrKTtcbiAgICAgICAgICAgIGxldCBib2R5Q2hpbGRyZW4gPSBkb2N1bWVudC5ib2R5LmNoaWxkcmVuO1xuICAgICAgICAgICAgbGV0IGhhc0Jsb2NrZXJNYXNrczogYm9vbGVhbjtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm9keUNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGJvZHlDaGlsZCA9IGJvZHlDaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICBpZiAoRG9tSGFuZGxlci5oYXNDbGFzcyhib2R5Q2hpbGQsICd1aS1kYXRlcGlja2VyLW1hc2stc2Nyb2xsYmxvY2tlcicpKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhc0Jsb2NrZXJNYXNrcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKCFoYXNCbG9ja2VyTWFza3MpIHtcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKGRvY3VtZW50LmJvZHksICd1aS1vdmVyZmxvdy1oaWRkZW4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy51bmJpbmRNYXNrQ2xpY2tMaXN0ZW5lcigpO1xuXG4gICAgICAgICAgICB0aGlzLm1hc2sgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5iaW5kTWFza0NsaWNrTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLm1hc2tDbGlja0xpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLm1hc2tDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLm1hc2tDbGlja0xpc3RlbmVyID0gbnVsbDtcblx0XHR9XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSA6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlICYmIHR5cGVvZiB0aGlzLnZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMucGFyc2VWYWx1ZUZyb21TdHJpbmcodGhpcy52YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVwZGF0ZUlucHV0ZmllbGQoKTtcbiAgICAgICAgdGhpcy51cGRhdGVVSSgpO1xuICAgIH1cbiAgICBcbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICAgIH1cbiAgICBcbiAgICBzZXREaXNhYmxlZFN0YXRlKHZhbDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gdmFsO1xuICAgIH1cblxuICAgIGdldERhdGVGb3JtYXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVGb3JtYXQgfHwgdGhpcy5sb2NhbGUuZGF0ZUZvcm1hdDtcbiAgICB9XG4gICAgXG4gICAgLy8gUG9ydGVkIGZyb20ganF1ZXJ5LXVpIGRhdGVwaWNrZXIgZm9ybWF0RGF0ZVxuICAgIGZvcm1hdERhdGUoZGF0ZSwgZm9ybWF0KSB7XG4gICAgICAgIGlmICghZGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGlGb3JtYXQ7XG4gICAgICAgIGNvbnN0IGxvb2tBaGVhZCA9IChtYXRjaCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hlcyA9IChpRm9ybWF0ICsgMSA8IGZvcm1hdC5sZW5ndGggJiYgZm9ybWF0LmNoYXJBdChpRm9ybWF0ICsgMSkgPT09IG1hdGNoKTtcbiAgICAgICAgICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgaUZvcm1hdCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXM7XG4gICAgICAgIH0sXG4gICAgICAgICAgICBmb3JtYXROdW1iZXIgPSAobWF0Y2gsIHZhbHVlLCBsZW4pID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgbnVtID0gJycgKyB2YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAobG9va0FoZWFkKG1hdGNoKSkge1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAobnVtLmxlbmd0aCA8IGxlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbnVtID0gJzAnICsgbnVtO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBudW07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZm9ybWF0TmFtZSA9IChtYXRjaCwgdmFsdWUsIHNob3J0TmFtZXMsIGxvbmdOYW1lcykgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAobG9va0FoZWFkKG1hdGNoKSA/IGxvbmdOYW1lc1t2YWx1ZV0gOiBzaG9ydE5hbWVzW3ZhbHVlXSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICBsZXQgb3V0cHV0ID0gJyc7XG4gICAgICAgIGxldCBsaXRlcmFsID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKGRhdGUpIHtcbiAgICAgICAgICAgIGZvciAoaUZvcm1hdCA9IDA7IGlGb3JtYXQgPCBmb3JtYXQubGVuZ3RoOyBpRm9ybWF0KyspIHtcbiAgICAgICAgICAgICAgICBpZiAobGl0ZXJhbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZm9ybWF0LmNoYXJBdChpRm9ybWF0KSA9PT0gJ1xcJycgJiYgIWxvb2tBaGVhZCgnXFwnJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpdGVyYWwgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBmb3JtYXQuY2hhckF0KGlGb3JtYXQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChmb3JtYXQuY2hhckF0KGlGb3JtYXQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdkJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gZm9ybWF0TnVtYmVyKCdkJywgZGF0ZS5nZXREYXRlKCksIDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnRCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGZvcm1hdE5hbWUoJ0QnLCBkYXRlLmdldERheSgpLCB0aGlzLmxvY2FsZS5kYXlOYW1lc1Nob3J0LCB0aGlzLmxvY2FsZS5kYXlOYW1lcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdvJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gZm9ybWF0TnVtYmVyKCdvJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnJvdW5kKChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpKS5nZXRUaW1lKCkgLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIDAsIDApLmdldFRpbWUoKSkgLyA4NjQwMDAwMCksIDMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGZvcm1hdE51bWJlcignbScsIGRhdGUuZ2V0TW9udGgoKSArIDEsIDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnTSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGZvcm1hdE5hbWUoJ00nLGRhdGUuZ2V0TW9udGgoKSwgdGhpcy5sb2NhbGUubW9udGhOYW1lc1Nob3J0LCB0aGlzLmxvY2FsZS5tb250aE5hbWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3knOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBsb29rQWhlYWQoJ3knKSA/IGRhdGUuZ2V0RnVsbFllYXIoKSA6IChkYXRlLmdldEZ1bGxZZWFyKCkgJSAxMDAgPCAxMCA/ICcwJyA6ICcnKSArIChkYXRlLmdldEZ1bGxZZWFyKCkgJSAxMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnQCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGRhdGUuZ2V0VGltZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnISc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGRhdGUuZ2V0VGltZSgpICogMTAwMDAgKyB0aGlzLnRpY2tzVG8xOTcwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnXFwnJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9va0FoZWFkKCdcXCcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gJ1xcJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGl0ZXJhbCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gZm9ybWF0LmNoYXJBdChpRm9ybWF0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH1cbiAgICBcbiAgICBmb3JtYXRUaW1lKGRhdGUpIHtcbiAgICAgICAgaWYgKCFkYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBvdXRwdXQgPSAnJztcbiAgICAgICAgbGV0IGhvdXJzID0gZGF0ZS5nZXRIb3VycygpO1xuICAgICAgICBsZXQgbWludXRlcyA9IGRhdGUuZ2V0TWludXRlcygpO1xuICAgICAgICBsZXQgc2Vjb25kcyA9IGRhdGUuZ2V0U2Vjb25kcygpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuaG91ckZvcm1hdCA9PSAnMTInICYmIGhvdXJzID4gMTEgJiYgaG91cnMgIT0gMTIpIHtcbiAgICAgICAgICAgIGhvdXJzLT0xMjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuaG91ckZvcm1hdCA9PSAnMTInKSB7XG4gICAgICAgICAgICBvdXRwdXQgKz0gaG91cnMgPT09IDAgPyAxMiA6IChob3VycyA8IDEwKSA/ICcwJyArIGhvdXJzIDogaG91cnM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvdXRwdXQgKz0gKGhvdXJzIDwgMTApID8gJzAnICsgaG91cnMgOiBob3VycztcbiAgICAgICAgfVxuICAgICAgICBvdXRwdXQgKz0gJzonO1xuICAgICAgICBvdXRwdXQgKz0gKG1pbnV0ZXMgPCAxMCkgPyAnMCcgKyBtaW51dGVzIDogbWludXRlcztcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnNob3dTZWNvbmRzKSB7XG4gICAgICAgICAgICBvdXRwdXQgKz0gJzonO1xuICAgICAgICAgICAgb3V0cHV0ICs9IChzZWNvbmRzIDwgMTApID8gJzAnICsgc2Vjb25kcyA6IHNlY29uZHM7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLmhvdXJGb3JtYXQgPT0gJzEyJykge1xuICAgICAgICAgICAgb3V0cHV0ICs9IGRhdGUuZ2V0SG91cnMoKSA+IDExID8gJyBQTScgOiAnIEFNJztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG4gICAgXG4gICAgcGFyc2VUaW1lKHZhbHVlKSB7XG4gICAgICAgIGxldCB0b2tlbnM6IHN0cmluZ1tdID0gdmFsdWUuc3BsaXQoJzonKTtcbiAgICAgICAgbGV0IHZhbGlkVG9rZW5MZW5ndGggPSB0aGlzLnNob3dTZWNvbmRzID8gMyA6IDI7XG4gICAgICAgIFxuICAgICAgICBpZiAodG9rZW5zLmxlbmd0aCAhPT0gdmFsaWRUb2tlbkxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgXCJJbnZhbGlkIHRpbWVcIjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGggPSBwYXJzZUludCh0b2tlbnNbMF0pO1xuICAgICAgICBsZXQgbSA9IHBhcnNlSW50KHRva2Vuc1sxXSk7XG4gICAgICAgIGxldCBzID0gdGhpcy5zaG93U2Vjb25kcyA/IHBhcnNlSW50KHRva2Vuc1syXSkgOiBudWxsO1xuICAgICAgICBcbiAgICAgICAgaWYgKGlzTmFOKGgpIHx8IGlzTmFOKG0pIHx8IGggPiAyMyB8fCBtID4gNTkgfHwgKHRoaXMuaG91ckZvcm1hdCA9PSAnMTInICYmIGggPiAxMikgfHwgKHRoaXMuc2hvd1NlY29uZHMgJiYgKGlzTmFOKHMpIHx8IHMgPiA1OSkpKSB7XG4gICAgICAgICAgICB0aHJvdyBcIkludmFsaWQgdGltZVwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuaG91ckZvcm1hdCA9PSAnMTInKSB7XG4gICAgICAgICAgICAgICAgaWYgKGggIT09IDEyICYmIHRoaXMucG0pIHtcbiAgICAgICAgICAgICAgICAgICAgaCArPSAxMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoIXRoaXMucG0gJiYgaCA9PT0gMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgaCAtPSAxMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiB7aG91cjogaCwgbWludXRlOiBtLCBzZWNvbmQ6IHN9O1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vIFBvcnRlZCBmcm9tIGpxdWVyeS11aSBkYXRlcGlja2VyIHBhcnNlRGF0ZVxuICAgIHBhcnNlRGF0ZSh2YWx1ZSwgZm9ybWF0KSB7XG4gICAgICAgIGlmIChmb3JtYXQgPT0gbnVsbCB8fCB2YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBcIkludmFsaWQgYXJndW1lbnRzXCI7XG4gICAgICAgIH1cblxuICAgICAgICB2YWx1ZSA9ICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgPyB2YWx1ZS50b1N0cmluZygpIDogdmFsdWUgKyBcIlwiKTtcbiAgICAgICAgaWYgKHZhbHVlID09PSBcIlwiKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpRm9ybWF0LCBkaW0sIGV4dHJhLFxuICAgICAgICBpVmFsdWUgPSAwLFxuICAgICAgICBzaG9ydFllYXJDdXRvZmYgPSAodHlwZW9mIHRoaXMuc2hvcnRZZWFyQ3V0b2ZmICE9PSBcInN0cmluZ1wiID8gdGhpcy5zaG9ydFllYXJDdXRvZmYgOiBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkgJSAxMDAgKyBwYXJzZUludCh0aGlzLnNob3J0WWVhckN1dG9mZiwgMTApKSxcbiAgICAgICAgeWVhciA9IC0xLFxuICAgICAgICBtb250aCA9IC0xLFxuICAgICAgICBkYXkgPSAtMSxcbiAgICAgICAgZG95ID0gLTEsXG4gICAgICAgIGxpdGVyYWwgPSBmYWxzZSxcbiAgICAgICAgZGF0ZSxcbiAgICAgICAgbG9va0FoZWFkID0gKG1hdGNoKSA9PiB7XG4gICAgICAgICAgICBsZXQgbWF0Y2hlcyA9IChpRm9ybWF0ICsgMSA8IGZvcm1hdC5sZW5ndGggJiYgZm9ybWF0LmNoYXJBdChpRm9ybWF0ICsgMSkgPT09IG1hdGNoKTtcbiAgICAgICAgICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgaUZvcm1hdCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXM7XG4gICAgICAgIH0sXG4gICAgICAgIGdldE51bWJlciA9IChtYXRjaCkgPT4ge1xuICAgICAgICAgICAgbGV0IGlzRG91YmxlZCA9IGxvb2tBaGVhZChtYXRjaCksXG4gICAgICAgICAgICAgICAgc2l6ZSA9IChtYXRjaCA9PT0gXCJAXCIgPyAxNCA6IChtYXRjaCA9PT0gXCIhXCIgPyAyMCA6XG4gICAgICAgICAgICAgICAgKG1hdGNoID09PSBcInlcIiAmJiBpc0RvdWJsZWQgPyA0IDogKG1hdGNoID09PSBcIm9cIiA/IDMgOiAyKSkpKSxcbiAgICAgICAgICAgICAgICBtaW5TaXplID0gKG1hdGNoID09PSBcInlcIiA/IHNpemUgOiAxKSxcbiAgICAgICAgICAgICAgICBkaWdpdHMgPSBuZXcgUmVnRXhwKFwiXlxcXFxke1wiICsgbWluU2l6ZSArIFwiLFwiICsgc2l6ZSArIFwifVwiKSxcbiAgICAgICAgICAgICAgICBudW0gPSB2YWx1ZS5zdWJzdHJpbmcoaVZhbHVlKS5tYXRjaChkaWdpdHMpO1xuICAgICAgICAgICAgaWYgKCFudW0pIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBcIk1pc3NpbmcgbnVtYmVyIGF0IHBvc2l0aW9uIFwiICsgaVZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaVZhbHVlICs9IG51bVsgMCBdLmxlbmd0aDtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUludChudW1bIDAgXSwgMTApO1xuICAgICAgICB9LFxuICAgICAgICBnZXROYW1lID0gKG1hdGNoLCBzaG9ydE5hbWVzLCBsb25nTmFtZXMpID0+IHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IC0xO1xuICAgICAgICAgICAgbGV0IGFyciA9IGxvb2tBaGVhZChtYXRjaCkgPyBsb25nTmFtZXMgOiBzaG9ydE5hbWVzO1xuICAgICAgICAgICAgbGV0IG5hbWVzID0gW107XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbmFtZXMucHVzaChbaSxhcnJbaV1dKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5hbWVzLnNvcnQoKGEsYikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAtKGFbIDEgXS5sZW5ndGggLSBiWyAxIF0ubGVuZ3RoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5hbWUgPSBuYW1lc1tpXVsxXTtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUuc3Vic3RyKGlWYWx1ZSwgbmFtZS5sZW5ndGgpLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IG5hbWVzW2ldWzBdO1xuICAgICAgICAgICAgICAgICAgICBpVmFsdWUgKz0gbmFtZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpbmRleCArIDE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IFwiVW5rbm93biBuYW1lIGF0IHBvc2l0aW9uIFwiICsgaVZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjaGVja0xpdGVyYWwgPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsdWUuY2hhckF0KGlWYWx1ZSkgIT09IGZvcm1hdC5jaGFyQXQoaUZvcm1hdCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBcIlVuZXhwZWN0ZWQgbGl0ZXJhbCBhdCBwb3NpdGlvbiBcIiArIGlWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlWYWx1ZSsrO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0aGlzLnZpZXcgPT09ICdtb250aCcpIHtcbiAgICAgICAgICAgIGRheSA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGZvciAoaUZvcm1hdCA9IDA7IGlGb3JtYXQgPCBmb3JtYXQubGVuZ3RoOyBpRm9ybWF0KyspIHtcbiAgICAgICAgICAgIGlmIChsaXRlcmFsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZvcm1hdC5jaGFyQXQoaUZvcm1hdCkgPT09IFwiJ1wiICYmICFsb29rQWhlYWQoXCInXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpdGVyYWwgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjaGVja0xpdGVyYWwoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoZm9ybWF0LmNoYXJBdChpRm9ybWF0KSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgZGF5ID0gZ2V0TnVtYmVyKFwiZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiRFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0TmFtZShcIkRcIiwgdGhpcy5sb2NhbGUuZGF5TmFtZXNTaG9ydCwgdGhpcy5sb2NhbGUuZGF5TmFtZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJvXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBkb3kgPSBnZXROdW1iZXIoXCJvXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJtXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aCA9IGdldE51bWJlcihcIm1cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIk1cIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnRoID0gZ2V0TmFtZShcIk1cIiwgdGhpcy5sb2NhbGUubW9udGhOYW1lc1Nob3J0LCB0aGlzLmxvY2FsZS5tb250aE5hbWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwieVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgeWVhciA9IGdldE51bWJlcihcInlcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIkBcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZShnZXROdW1iZXIoXCJAXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXkgPSBkYXRlLmdldERhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiIVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKChnZXROdW1iZXIoXCIhXCIpIC0gdGhpcy50aWNrc1RvMTk3MCkgLyAxMDAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9udGggPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF5ID0gZGF0ZS5nZXREYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIidcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb29rQWhlYWQoXCInXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tMaXRlcmFsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpdGVyYWwgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja0xpdGVyYWwoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaVZhbHVlIDwgdmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICBleHRyYSA9IHZhbHVlLnN1YnN0cihpVmFsdWUpO1xuICAgICAgICAgICAgaWYgKCEvXlxccysvLnRlc3QoZXh0cmEpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgXCJFeHRyYS91bnBhcnNlZCBjaGFyYWN0ZXJzIGZvdW5kIGluIGRhdGU6IFwiICsgZXh0cmE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoeWVhciA9PT0gLTEpIHtcbiAgICAgICAgICAgIHllYXIgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoeWVhciA8IDEwMCkge1xuICAgICAgICAgICAgeWVhciArPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkgLSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkgJSAxMDAgK1xuICAgICAgICAgICAgICAgICh5ZWFyIDw9IHNob3J0WWVhckN1dG9mZiA/IDAgOiAtMTAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkb3kgPiAtMSkge1xuICAgICAgICAgICAgbW9udGggPSAxO1xuICAgICAgICAgICAgZGF5ID0gZG95O1xuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgIGRpbSA9IHRoaXMuZ2V0RGF5c0NvdW50SW5Nb250aCh5ZWFyLCBtb250aCAtIDEpO1xuICAgICAgICAgICAgICAgIGlmIChkYXkgPD0gZGltKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBtb250aCsrO1xuICAgICAgICAgICAgICAgIGRheSAtPSBkaW07XG4gICAgICAgICAgICB9IHdoaWxlICh0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGUgPSB0aGlzLmRheWxpZ2h0U2F2aW5nQWRqdXN0KG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgZGF5KSk7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGUuZ2V0RnVsbFllYXIoKSAhPT0geWVhciB8fCBkYXRlLmdldE1vbnRoKCkgKyAxICE9PSBtb250aCB8fCBkYXRlLmdldERhdGUoKSAhPT0gZGF5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IFwiSW52YWxpZCBkYXRlXCI7IC8vIEUuZy4gMzEvMDIvMDBcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxuICAgIFxuICAgIGRheWxpZ2h0U2F2aW5nQWRqdXN0KGRhdGUpIHtcbiAgICAgICAgaWYgKCFkYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGUuc2V0SG91cnMoZGF0ZS5nZXRIb3VycygpID4gMTIgPyBkYXRlLmdldEhvdXJzKCkgKyAyIDogMCk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG4gICAgXG4gICAgdXBkYXRlRmlsbGVkU3RhdGUoKSB7XG4gICAgICAgIHRoaXMuZmlsbGVkID0gdGhpcy5pbnB1dEZpZWxkVmFsdWUgJiYgdGhpcy5pbnB1dEZpZWxkVmFsdWUgIT0gJyc7XG4gICAgfVxuICAgIFxuICAgIG9uVG9kYXlCdXR0b25DbGljayhldmVudCkge1xuICAgICAgICBsZXQgZGF0ZTogRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGxldCBkYXRlTWV0YSA9IHtkYXk6IGRhdGUuZ2V0RGF0ZSgpLCBtb250aDogZGF0ZS5nZXRNb250aCgpLCB5ZWFyOiBkYXRlLmdldEZ1bGxZZWFyKCksIG90aGVyTW9udGg6IGRhdGUuZ2V0TW9udGgoKSAhPT0gdGhpcy5jdXJyZW50TW9udGggfHwgZGF0ZS5nZXRGdWxsWWVhcigpICE9PSB0aGlzLmN1cnJlbnRZZWFyLCB0b2RheTogdHJ1ZSwgc2VsZWN0YWJsZTogdHJ1ZX07XG4gICAgICAgIFxuICAgICAgICB0aGlzLm9uRGF0ZVNlbGVjdChldmVudCwgZGF0ZU1ldGEpO1xuICAgICAgICB0aGlzLm9uVG9kYXlDbGljay5lbWl0KGV2ZW50KTtcbiAgICB9XG4gICAgXG4gICAgb25DbGVhckJ1dHRvbkNsaWNrKGV2ZW50KSB7XG4gICAgICAgIHRoaXMudXBkYXRlTW9kZWwobnVsbCk7XG4gICAgICAgIHRoaXMudXBkYXRlSW5wdXRmaWVsZCgpO1xuICAgICAgICB0aGlzLmhpZGVPdmVybGF5KCk7XG4gICAgICAgIHRoaXMub25DbGVhckNsaWNrLmVtaXQoZXZlbnQpO1xuICAgIH1cbiAgICBcbiAgICBiaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzT3V0c2lkZUNsaWNrZWQoZXZlbnQpICYmIHRoaXMub3ZlcmxheVZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZU92ZXJsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICB1bmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lciAmJiAhdGhpcy50b3VjaFVJKSB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIgPSB0aGlzLm9uV2luZG93UmVzaXplLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICB1bmJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyKTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc091dHNpZGVDbGlja2VkKGV2ZW50OiBFdmVudCkge1xuICAgICAgICByZXR1cm4gISh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuaXNTYW1lTm9kZShldmVudC50YXJnZXQpIHx8IHRoaXMuaXNOYXZJY29uQ2xpY2tlZChldmVudCkgfHzCoFxuICAgICAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpIHx8ICh0aGlzLm92ZXJsYXkgJiYgdGhpcy5vdmVybGF5LmNvbnRhaW5zKDxOb2RlPiBldmVudC50YXJnZXQpKSk7XG4gICAgfVxuICAgIFxuICAgIGlzTmF2SWNvbkNsaWNrZWQoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHJldHVybiAoRG9tSGFuZGxlci5oYXNDbGFzcyhldmVudC50YXJnZXQsICd1aS1kYXRlcGlja2VyLXByZXYnKSB8fCBEb21IYW5kbGVyLmhhc0NsYXNzKGV2ZW50LnRhcmdldCwgJ3VpLWRhdGVwaWNrZXItcHJldi1pY29uJylcbiAgICAgICAgICAgICAgICB8fCBEb21IYW5kbGVyLmhhc0NsYXNzKGV2ZW50LnRhcmdldCwgJ3VpLWRhdGVwaWNrZXItbmV4dCcpIHx8IERvbUhhbmRsZXIuaGFzQ2xhc3MoZXZlbnQudGFyZ2V0LCAndWktZGF0ZXBpY2tlci1uZXh0LWljb24nKSk7XG4gICAgfVxuXG4gICAgb25XaW5kb3dSZXNpemUoKSB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlWaXNpYmxlICYmICFEb21IYW5kbGVyLmlzQW5kcm9pZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGVPdmVybGF5KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk92ZXJsYXlIaWRlKCkge1xuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLnVuYmluZE1hc2tDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLm92ZXJsYXkgPSBudWxsO1xuICAgICAgICB0aGlzLmRpc2FibGVNb2RhbGl0eSgpO1xuICAgIH1cbiAgICBcbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5jbGVhclRpbWVQaWNrZXJUaW1lcigpO1xuICAgICAgICB0aGlzLnJlc3RvcmVPdmVybGF5QXBwZW5kKCk7XG4gICAgICAgIHRoaXMub25PdmVybGF5SGlkZSgpO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLEJ1dHRvbk1vZHVsZSxTaGFyZWRNb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtDYWxlbmRhcixCdXR0b25Nb2R1bGUsU2hhcmVkTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtDYWxlbmRhcl1cbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJNb2R1bGUgeyB9XG4iXX0=