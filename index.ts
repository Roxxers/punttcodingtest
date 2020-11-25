///////// TEST /////////

// The Burroughs Test
// Create a small command line utility to help a small ﬁctional company calculate the dates on which they should pay their sales staff.

// Company payroll is handled like so:

// • Sales staff are paid a regular ﬁxed base salary each month, plus a regular monthly bonus.
// • Base salaries are paid on the last day of each month, unless that day is a Saturday or Sunday (a weekend), in which case they are paid on the Friday before the weekend
// • On the 15th of each month, bonuses are paid for the previous month, unless that day is a weekend, in which case they are paid on the ﬁrst Wednesday after the 15th.

// Your utility should calculate the payment dates for the next 12 months, including the current month, and output to the screen in a CSV format.

///////// CODE /////////

import {name, description, version} from "./package.json";
import program from "commander";

import {
    isWeekend,
    getUTCDay,
    newUTCEndOfMonth,
    newUTCMidMonth,
    toUTCDateString,
    Days
} from "./date";

import {writeCSV, PayDayCSVRow} from "./csv";

// Parse command line args
program
    .name(name)
    .description(description)
    .version(version, "-v, --version", "output the current version")
    .option(
        "-m, --months [num]",
        "Specify how many months in the future to calculate paydays.",
        parseInt,
        12
    )
    .parse(process.argv);

/**
 * Checks if the given date is on a weekend and moves it to specified day if so.
 *
 * @param {Date} date Date object representing the date to check
 * @param {Days} day Day of the week we want to move the date to if the date given falls on a weekend
 * @param {boolean} [nextWeek] Optional bool to move the date to next week rather than looking backwards for a viable date
 * @returns {Date} A non weekend date. If date given is a non-weekend day, just returns given date.
 */
export function calculateNonWeekend(date: Date, day: Days, nextWeek?: boolean): Date {
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
 * @returns {PayDayCSVRow[]} List of rows to populate the CSV file
 */
export function calcFuturePayDays(amountOfMonths: number, dateNow: Date): PayDayCSVRow[] {
    const monthNow = dateNow.getUTCMonth();
    const dates: PayDayCSVRow[] = [];

    for (let i = 0; i <= amountOfMonths; ++i) {
        const year = dateNow.getUTCFullYear();
        const monthNo = monthNow + i;
        const endOfMonth: Date = newUTCEndOfMonth(year, monthNo);
        const midOfMonth: Date = newUTCMidMonth(year, monthNo);
        const bonusPayDay: PayDayCSVRow = {
            date: toUTCDateString(calculateNonWeekend(midOfMonth, Days.wednesday, true)),
            type: "bonus"
        };
        const salaryPayDay: PayDayCSVRow = {
            date: toUTCDateString(calculateNonWeekend(endOfMonth, Days.friday)),
            type: "salary"
        };
        dates.push(bonusPayDay, salaryPayDay);
    }
    return dates;
}

if (require.main === module) {
    console.log(writeCSV(calcFuturePayDays(program.months, new Date())));
}
