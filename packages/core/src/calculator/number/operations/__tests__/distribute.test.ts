import distribute from '../distribute';

describe('distribute', () => {
  it('distributes to percentages', () => {
    expect(distribute(1003, [50, 50])).toEqual([502, 501]);
  });
  it('distributes to ratios', () => {
    expect(distribute(100, [1, 3])).toEqual([25, 75]);
  });
  it("distributes while ignoring zero ratios", () => {
    expect(distribute(1003, [0, 50, 50])).toEqual([0, 502, 501]);
  });
  it("distributes to zero ratios", () => {
    expect(distribute(1003, [0, 0])).toEqual([0, 0]);
  });
  it("distributes to negative ratios", () => {
    expect(distribute(1003, [-50, -50])).toEqual([502, 501]);
  });
  it("distributes to empty ratios", () => {
    expect(distribute(1003, [])).toEqual([]);
  });
});
