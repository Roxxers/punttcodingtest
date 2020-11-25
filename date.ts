export enum Days {
    monday = 1,
    tuesday = 2,
    wednesday = 3,
    thursday = 4,
    friday = 5,
    saturday = 6,
    sunday = 0
}

// Using UTC versions of calls with the Date object in JS due to very wonky workings with implied time zones which can cause bugs.

/**
 * Wrapper for the toISOString function that removes time info, only leaving the date.
 *
 * @param {Date} date
 * @returns {string}
 */
export function toUTCDateString(date: Date): string {
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
export function getUTCFixedDay(year: number, month: number, ...args: number[]): Date {
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
export function newUTCMidMonth(year: number, month: number): Date {
    return getUTCFixedDay(year, month, 15);
}

/**
 * Creates a UTC date at the end of the given month.
 *
 * @param {number} year
 * @param {number} month
 * @returns {Date}
 */
export function newUTCEndOfMonth(year: number, month: number): Date {
    // +1 So that we go to the beginning of the next month -1, so the end of the current month we are asking for
    return getUTCFixedDay(year, month + 1, 0);
}

/**
 * Checks if given date falls on a weekend.
 * @param date Date to run check against.
 */
export function isWeekend(date: Date): boolean {
    // 0 Sun, 1 Mon...
    if (Days.monday <= date.getUTCDay() && date.getUTCDay() <= Days.friday) {
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
export function getUTCDay(date: Date): number {
    let dayNo = date.getUTCDay();
    if (dayNo <= Days.monday) {
        dayNo = 7;
    }
    return dayNo;
}
