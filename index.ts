///////// TEST /////////

// The Burroughs Test
// Create a small command line utility to help a small ﬁctional company calculate the dates on which they should pay their sales staff.

// Company payroll is handled like so:

// • Sales staff are paid a regular ﬁxed base salary each month, plus a regular monthly bonus.
// • Base salaries are paid on the last day of each month, unless that day is a Saturday or Sunday (a weekend), in which case they are paid on the Friday before the weekend
// • On the 15th of each month, bonuses are paid for the previous month, unless that day is a weekend, in which case they are paid on the ﬁrst Wednesday after the 15th.

// Your utility should calculate the payment dates for the next 12 months, including the current month, and output to the screen in a CSV format.

///////// CODE /////////

import * as csv from "@softwareventures/csv";
import {recordsToTable} from "@softwareventures/table";
import {ReadonlyDictionary} from "dictionary-types";

// Using UTC versions of calls with the Date object in JS due to very wonky workings with implied time zones which can cause bugs.

/**
 * interface for an enum for weekdays
 */
interface weekEnum {
    monday: number;
    tuesday: number;
    wednesday: number;
    thursday: number;
    friday: number;
    saturday: number;
    sunday: number;
}

/**
 * Interface that defines the table headers for the csv and what types the rows are
 *
 * @interface payDayCSVRow
 * @extends {ReadonlyDictionary<string>}, this allows object to be converted into a table to be parsed as a csv by the lib
 */
interface payDayCSVRow extends ReadonlyDictionary<string> {
    date: string;
    type: string;
}

const days: weekEnum = {
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
    sunday: 0
};

/**
 * Wrapper for the toISOString function that removes time info, only leaving the date.
 *
 * @param {Date} date
 * @returns {string}
 */
function toUTCDateString(date: Date): string {
    return date.toISOString().substring(0, 10);
}

/**
 * Creates a UTC Date object to be timezone safe as that is a massive source of potential bugs.
 *
 * @param {number} year
 * @param {number} month
 * @param {...number[]} args
 * @returns {Date}
 */
function newUTCDate(year: number, month: number, ...args: number[]): Date {
    const UTC = Date.UTC(year, month, ...args);
    return new Date(UTC);
}

/**
 * Creates a UTC date in the middle of the given month.
 *
 * @param {number} year
 * @param {number} month
 * @returns {Date}
 */
function newUTCMidMonth(year: number, month: number): Date {
    return newUTCDate(year, month, 15);
}

/**
 * Creates a UTC date at the end of the given month.
 *
 * @param {number} year
 * @param {number} month
 * @returns {Date}
 */
function newUTCEndOfMonth(year: number, month: number): Date {
    // +1 So that we go to the beginning of the next month -1, so the end of the current month we are asking for
    return newUTCDate(year, month + 1, 0);
}

/**
 * Checks if given date falls on a weekend.
 * @param date Date to run check against.
 */
function isWeekend(date: Date): boolean {
    // 0 Sun, 1 Mon...
    if (days.monday <= date.getUTCDay() && date.getUTCDay() <= days.friday) {
        return false;
    }
    return true;
}

/**
 * Gets the UTC day of the given date. "Corrects" default behaviour from the object to make Sunday the last day of the week.
 * This allows for much easier comparisons and easy ways to find the difference between a Sunday and where the required day is.
 *
 * @param {Date} date
 * @returns {number} Day number, 1 is Mon, 2 is Tues...
 */
function getUTCDay(date: Date): number {
    let dayNo = date.getUTCDay();
    if (dayNo <= days.monday) {
        dayNo = 7;
    }
    return dayNo;
}

/**
 * Checks if the given date is on a weekend and moves it to specified day if so.
 *
 * @param {Date} date Date object representing the date to check
 * @param {number} day Day of the week we want to move the date to if the date given falls on a weekend
 * @param {boolean} [nextWeek] Optional bool to move the date to next week rather than looking backwards for a viable date
 * @returns {Date} A non weekend date. If date given is a non-weekend day, just returns given date.
 */
function calculateNonWeekend(date: Date, day: number, nextWeek?: boolean): Date {
    if (isWeekend(date)) {
        let dayNo = getUTCDay(date);
        if (nextWeek === true) {
            dayNo += 7; // Move dayNo up one whole week to make it a positive in the maths
        }
        const diff = day - dayNo;
        date.setUTCDate(date.getUTCDate() + diff);
        return date;
    }
    return date;
}

/**
 * Creates a set of CSV rows of future paydays for the given amount of months.
 * This is done for salary and bonus paydays.
 *
 * @param {number} amountOfMonths
 * @returns {payDayCSVRow[]} List of rows to populate the CSV file
 */
function calcFuturePayDays(amountOfMonths: number): payDayCSVRow[] {
    const dateNow = newUTCEndOfMonth(2020, 5);
    const monthNow = dateNow.getUTCMonth();
    const dates: payDayCSVRow[] = [];

    for (let i = 0; i <= amountOfMonths; ++i) {
        const year = dateNow.getUTCFullYear();
        const monthNo = monthNow + i;
        const endOfMonth: Date = newUTCEndOfMonth(year, monthNo);
        const midOfMonth: Date = newUTCMidMonth(year, monthNo);
        const bonusPayDay: payDayCSVRow = {
            date: toUTCDateString(calculateNonWeekend(midOfMonth, days.wednesday, true)),
            type: "bonus"
        };
        const salaryPayDay: payDayCSVRow = {
            date: toUTCDateString(calculateNonWeekend(endOfMonth, days.friday)),
            type: "salary"
        };
        dates.push(bonusPayDay, salaryPayDay);
    }
    return dates;
}

const payDays = calcFuturePayDays(12);
console.log(csv.write(recordsToTable(payDays)));
