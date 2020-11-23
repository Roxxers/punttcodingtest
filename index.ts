///////// TEST /////////

// The Burroughs Test
// Create a small command line utility to help a small ﬁctional company calculate the dates on which they should pay their sales staff.

// Company payroll is handled like so:

// • Sales staff are paid a regular ﬁxed base salary each month, plus a regular monthly bonus.
// • Base salaries are paid on the last day of each month, unless that day is a Saturday or Sunday (a weekend), in which case they are paid on the Friday before the weekend
// • On the 15th of each month, bonuses are paid for the previous month, unless that day is a weekend, in which case they are paid on the ﬁrst Wednesday after the 15th.

// Your utility should calculate the payment dates for the next 12 months, including the current month, and output to the screen in a CSV format.

///////// NOTES /////////

// Leaving these comments here to show my flow and how I tackle the issue

// Paid each month, last weekday
// Bonuses each 15th: if weekend, next wednesday
// csv with next 12 months including current, output to stdout

///////// CODE /////////

// Using UTC versions of calls with the Date object in JS due to very wonky workings with implied time zones which can cause bugs.

const currentDate = new Date();


console.log("hello");
