type Digital = number | number[];

function closeTo(received: number, expected: number, numDigits: number = 2) {
  return Math.abs(received - expected) < 10 ** -numDigits / 2;
}

export function toBeCloseTo(received: Digital, expected: Digital, numDigits?: number) {
  const isSourceArray = Array.isArray(received);
  const isTargetArray = Array.isArray(expected);

  if (isSourceArray !== isTargetArray) return false;

  if (isSourceArray && isTargetArray) {
    return received.length === expected.length && received.every((n, i) => closeTo(n, expected[i], numDigits));
  }

  if (!isSourceArray && !isTargetArray) {
    return closeTo(received, expected, numDigits);
  }

  return false;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toBeCloseTo(expected: Digital, numDigits?: number): R;
    }
  }
}

expect.extend({
  toBeCloseTo: (received: Digital, expected: Digital, numDigits?: number) => {
    const pass = toBeCloseTo(received, expected, numDigits);
    if (pass) {
      return {
        message: () => `expected ${received} not to be close to ${expected}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be close to ${expected}`,
        pass: false,
      };
    }
  },
});
