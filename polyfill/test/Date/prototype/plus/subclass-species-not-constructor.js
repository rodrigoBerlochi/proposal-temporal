// Copyright (C) 2020 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.date.prototype.plus
features: [Symbol.species]
---*/

function check(value, description) {
  const date = Temporal.Date.from({ year: 2000, month: 5, day: 2 });
  date.constructor = {
    [Symbol.species]: value,
  };
  assert.throws(TypeError, () => date.plus({ days: 1 }), description);
}

check(true, "true");
check("test", "string");
check(Symbol(), "Symbol");
check(7, "number");
check(7n, "bigint");
check({}, "plain object");
