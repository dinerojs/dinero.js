import { USD } from "@dinero.js/currencies";

import { allocate, dinero, toSnapshot } from "../../..";

describe("allocate", () => {
  it("allocates to percentages", () => {
    const d = dinero({ amount: 1003, currency: USD });
    const shares = allocate(d, [50, 50]);
    const [firstAllocated, secondAllocated] = shares;

    expect(toSnapshot(firstAllocated)).toEqual({
      amount: 502,
      currency: USD,
      scale: 2,
    });
    expect(toSnapshot(secondAllocated)).toEqual({
      amount: 501,
      currency: USD,
      scale: 2,
    });
  });
  it("allocates to ratios", () => {
    const d = dinero({ amount: 100, currency: USD });
    const shares = allocate(d, [1, 3]);
    const [firstAllocated, secondAllocated] = shares;

    expect(toSnapshot(firstAllocated)).toEqual({
      amount: 25,
      currency: USD,
      scale: 2,
    });
    expect(toSnapshot(secondAllocated)).toEqual({
      amount: 75,
      currency: USD,
      scale: 2,
    });
  });
  it("ignores zero ratios", () => {
    const d = dinero({ amount: 1003, currency: USD });
    const shares = allocate(d, [0, 50, 50]);
    const [firstAllocated, secondAllocated, thirdAllocated] = shares;

    expect(toSnapshot(firstAllocated)).toEqual({
      amount: 0,
      currency: USD,
      scale: 2,
    });
    expect(toSnapshot(secondAllocated)).toEqual({
      amount: 502,
      currency: USD,
      scale: 2,
    });
    expect(toSnapshot(thirdAllocated)).toEqual({
      amount: 501,
      currency: USD,
      scale: 2,
    });
  });
  it("converts the allocated amounts to the safest scale", () => {
    const d = dinero({ amount: 100, currency: USD });
    const shares = allocate(d, [505, 495], { scale: 1 });
    const [firstAllocated, secondAllocated] = shares;

    expect(toSnapshot(firstAllocated)).toEqual({
      amount: 505,
      currency: USD,
      scale: 3,
    });
    expect(toSnapshot(secondAllocated)).toEqual({
      amount: 495,
      currency: USD,
      scale: 3,
    });
  });
  it("throws when using empty ratios", () => {
    const d = dinero({ amount: 100, currency: USD });

    expect(() => {
      allocate(d, []);
    }).toThrowErrorMatchingInlineSnapshot(`"Ratios are invalid."`);
  });
  it("throws when using negative ratios", () => {
    const d = dinero({ amount: 100, currency: USD });

    expect(() => {
      allocate(d, [-50, -50]);
    }).toThrowErrorMatchingInlineSnapshot(`"Ratios are invalid."`);
  });
  it("throws when using only zero ratios", () => {
    const d = dinero({ amount: 100, currency: USD });

    expect(() => {
      allocate(d, [0, 0]);
    }).toThrowErrorMatchingInlineSnapshot(`"Ratios are invalid."`);
  });
});
