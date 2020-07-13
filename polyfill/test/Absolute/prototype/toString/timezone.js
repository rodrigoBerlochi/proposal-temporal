// Copyright (C) 2020 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.absolute.prototype.tostring
includes: [compareArray.js]
---*/

const actual = [];
const expected = [
  "get timeZone.getDateTimeFor",
  "call timeZone.getDateTimeFor",
  "get timeZone.toString",
  "call timeZone.toString",
  "get name.toString",
  "call name.toString",
  "get timeZone.getOffsetStringFor",
  "call timeZone.getOffsetStringFor",
  "get offset.toString",
  "call offset.toString",
];

const absolute = Temporal.Absolute.from("1975-02-02T14:25:36.123456Z");
const timeZone = {
  get name() {
    actual.push("get timeZone.name");
    return "Custom/TimeZone";
  },
  get toString() {
    actual.push("get timeZone.toString");
    return function() {
      actual.push("call timeZone.toString");
      return {
        get toString() {
          actual.push("get name.toString");
          return function() {
            actual.push("call name.toString");
            return "Custom/TimeZone";
          };
        }
      };
    };
  },
  get getOffsetStringFor() {
    actual.push("get timeZone.getOffsetStringFor");
    return function() {
      actual.push("call timeZone.getOffsetStringFor");
      return {
        get toString() {
          actual.push("get offset.toString");
          return function() {
            actual.push("call offset.toString");
            return "+02:59";
          };
        }
      };
    };
  },
  get getDateTimeFor() {
    actual.push("get timeZone.getDateTimeFor");
    return function() {
      actual.push("call timeZone.getDateTimeFor");
      return Temporal.DateTime.from("1963-07-02T12:00:00.654321");
    };
  },
};

assert.sameValue(absolute.toString(timeZone), "1963-07-02T12:00:00.654321+02:59[Custom/TimeZone]");
assert.compareArray(actual, expected);
