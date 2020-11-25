# Code test for Puntt application

## Test Summary

### The Burroughs Test

Create a small command line utility to help a small ﬁctional company calculate
the dates on which they should pay their sales staff.

Company payroll is handled like so:

-   Sales staff are paid a regular ﬁxed base salary each month, plus a regular
    monthly bonus.
-   Base salaries are paid on the last day of each month, unless that day is a
    Saturday or Sunday (a weekend), in which case they are paid on the Friday
    before the weekend
-   On the 15th of each month, bonuses are paid for the previous month, unless
    that day is a weekend, in which case they are paid on the ﬁrst Wednesday
    after the 15th.

Your utility should calculate the payment dates for the next 12 months,
including the current month, and output to the screen in a CSV format.

## paydaycalc

Utility to print paydays for x amount of months in the future. Prints csv to
STDOUT.

### Install dependencies

To install the script, clone this repository and cd into the directory

`git clone https://github.com/roxxers/punttcodingtest && cd punttcodingtest`

Install all dependencies required to run the script via npm

`npm i` or `npm i --include=dev` if you intend to develop/test this program.

### Run

```text
Usage: paydaycalc [options]

Calculates salary and bonus paydays.

Options:
  -v, --version       output the current version
  -m, --months [num]  Specify how many months in the future to calculate paydays. (default: 12)
  -h, --help          display help for command
```

To run with a clean STDOUT (for piping) run with: `tsc && node index.js [args]`

### Tests

To run tests: `npm run test`

To lint or fix linting errors: `npm run lint` or `npm run fix`
