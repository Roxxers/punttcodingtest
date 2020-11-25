import test from "ava";
import {calculateNonWeekend, calcFuturePayDays} from "./index";
import {Days} from "./date";

test("calculateNonWeekend correctly moves the date from a weekend to a viable new provided date", t => {
    t.deepEqual(
        calculateNonWeekend(new Date(1604707200000), Days.thursday, false), // Sat 7th Nov 2020
        new Date(1604534400000) // Thurs 5th Nov 2020
    );

    t.deepEqual(
        calculateNonWeekend(new Date(1604880000000), Days.monday, true), // Sat 7th Nov 2020
        new Date(1604880000000) // Mon 9th Nov 2020
    );
});

test("calcFuturePayDays correctly outputs number of paydays based on month arg", t => {
    t.is(
        calcFuturePayDays(2, new Date()).length,
        6 // Because it includes the current month + 2 months
    );
});

test("calcFuturePayDays outputs correct csv table", t => {
    t.deepEqual(
        calcFuturePayDays(6, new Date(1580515200000)), // 1st Feb 2020
        [
            {
                date: "2020-02-05",
                type: "bonus"
            },
            {
                date: "2020-02-28",
                type: "salary"
            },
            {
                date: "2020-03-04",
                type: "bonus"
            },
            {
                date: "2020-03-31",
                type: "salary"
            },
            {
                date: "2020-04-15",
                type: "bonus"
            },
            {
                date: "2020-04-30",
                type: "salary"
            },
            {
                date: "2020-05-15",
                type: "bonus"
            },
            {
                date: "2020-05-29",
                type: "salary"
            },
            {
                date: "2020-06-15",
                type: "bonus"
            },
            {
                date: "2020-06-30",
                type: "salary"
            },
            {
                date: "2020-07-15",
                type: "bonus"
            },
            {
                date: "2020-07-31",
                type: "salary"
            },
            {
                date: "2020-08-05",
                type: "bonus"
            },
            {
                date: "2020-08-31",
                type: "salary"
            }
        ]
    );
});
