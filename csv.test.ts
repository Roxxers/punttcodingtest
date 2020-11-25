import test from "ava";
import {ReadonlyDictionary} from "dictionary-types";
import {writeCSV} from "./csv";

test("writeCSV creates correct CSV string output", t => {
    const row: ReadonlyDictionary<string> = {
        hello: "world",
        foo: "bar"
    };

    t.is(writeCSV([row, row]), `"hello","foo"\r\n"world","bar"\r\n"world","bar"`);
});
