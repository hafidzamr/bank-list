import { currencyFormatter } from '@/utils';

describe('currencyFormatter', () => {
  test('should return a string', () => {
    expect(typeof currencyFormatter(1, 'en-EN', 'USD')).toBe('string');
  });

  test('should return a string with the correct format', () => {
    expect(currencyFormatter(1, 'en-EN', 'USD')).toBe('$1.00');
  });
});
