// Copyright (C) 2020 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.absolute.prototype.todatetime
includes: [compareArray.js]
---*/

const actual = [];
const expected = [
  "get timeZone.getDateTimeFor",
  "call timeZone.getDateTimeFor",
];

const absolute = Temporal.Absolute.from("1975-02-02T14:25:36.123456789Z");
const timeZone = new Proxy({
  getDateTimeFor() {
    actual.push("call timeZone.getDateTimeFor");
    return Temporal.DateTime.from("1963-07-02T12:00:00.987654321");
  },
}, {
  has(target, property) {
    actual.push(`has timeZone.${property}`);
  },
  get(target, property) {
    actual.push(`get timeZone.${property}`);
    return target[property];
  },
});

const dateTime = absolute.toDateTime(timeZone);
assert.sameValue(dateTime.year, 1963);
assert.sameValue(dateTime.month, 7);
assert.sameValue(dateTime.day, 2);
assert.sameValue(dateTime.hour, 12);
assert.sameValue(dateTime.minute, 0);
assert.sameValue(dateTime.second, 0);
assert.sameValue(dateTime.millisecond, 987);
assert.sameValue(dateTime.microsecond, 654);
assert.sameValue(dateTime.nanosecond, 321);
assert.sameValue(dateTime.toString(), "1963-07-02T12:00:00.987654321");

assert.compareArray(actual, expected);
