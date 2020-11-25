import {ReadonlyDictionary} from "dictionary-types";
import {recordsToTable} from "@softwareventures/table";
import * as csv from "@softwareventures/csv";

/**
 * Interface that defines the table headers for the csv and what types the rows are
 *
 * @interface payDayCSVRow
 * @extends {ReadonlyDictionary<string>}, this allows object to be converted into a table to be parsed as a csv by the lib
 */
export interface payDayCSVRow extends ReadonlyDictionary<string> {
    date: string;
    type: string;
}

/**
 * Writes a csv string from a string dict
 *
 * @export
 * @param {ReadonlyDictionary<string>[]} rows
 * @returns {string}
 */
export function writeCSV(rows: ReadonlyDictionary<string>[]): string {
    const table = recordsToTable(rows);
    return csv.write(table);
}
