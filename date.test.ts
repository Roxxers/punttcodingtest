import test from "ava";
import {
    toUTCDateString,
    getUTCFixedDay,
    newUTCMidMonth,
    newUTCEndOfMonth,
    isWeekend,
    getUTCDay
} from "./date";

// All tests should be normalised with UTC or they fail

test("getUTCFixedDay creates UTC time object", t => {
    // This falls under day light savings in the UK so this should check for UTC even in GMT timezones
    t.is(
        getUTCFixedDay(2020, 5, 3, 15, 28, 19).getTime(),
        1591198099000 // Unix epoch in milliseconds for my birthday (3rd June)
    );
});

test("toUTCDateString creates accurate date string", t => {
    t.is(toUTCDateString(getUTCFixedDay(2019, 11, 25)), "2019-12-25");
});

test("toUTCMidMonth creates accurate date object", t => {
    t.is(
        newUTCMidMonth(2020, 10).getTime(),
        1605398400000 // Unix epoch in milliseconds for mid November (15th) 2020
    );
});

test("toUTCEndOfMonth creates accurate date object", t => {
    t.is(
        newUTCEndOfMonth(2020, 0).getTime(),
        1580428800000 // Unix epoch in milliseconds for end of Jan (31th) 2020
    );
});

test("isWeekend accurately identifies a weekend day", t => {
    // Testing bounds of the range bool check
    t.true(isWeekend(new Date(1604707200000))); // Sat 7th Nov 2020
    t.true(isWeekend(new Date(1605398400000))); // Sun 15th Nov 2020
    t.false(isWeekend(new Date(1604275200000))); // Monday 2nd Nov 2020
    t.false(isWeekend(new Date(1604448000000))); // Wednesday 4th Nov 2020
    t.false(isWeekend(new Date(1604620800000))); // Friday 6th Nov 2020
});

test("getUTCDay correctly gets the day number, correctly adjusting Sunday to 7", t => {
    // Testing bounds of the range bool check
    t.is(
        getUTCDay(new Date(1605398400000)), // Sunday
        7
    );
    t.is(
        getUTCDay(new Date(1604448000000)), // Wednesday
        3
    );
});
