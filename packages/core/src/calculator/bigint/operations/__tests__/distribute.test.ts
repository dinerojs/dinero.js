import distribute from '../distribute';

describe('distribute', () => {
  it('distributes to percentages', () => {
    expect(distribute(1003n, [50n, 50n])).toEqual([502n, 501n]);
  });
  it('distributes to ratios', () => {
    expect(distribute(100n, [1n, 3n])).toEqual([25n, 75n]);
  });
  it('distributes while ignoring zero ratios', () => {
    expect(distribute(1003n, [0n, 50n, 50n])).toEqual([0n, 502n, 501n]);
  });
  it('distributes to zero ratios', () => {
    expect(distribute(1003n, [0n, 0n])).toEqual([0n, 0n]);
  });
  it('distributes to negative ratios', () => {
    expect(distribute(1003n, [-50n, -50n])).toEqual([502n, 501n]);
  });
  it('distributes to empty ratios', () => {
    expect(distribute(1003n, [])).toEqual([]);
  });
});
