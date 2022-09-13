import { dateFormatter } from '@/utils';

describe('dateFormatter', () => {
  test('should return a string', () => {
    expect(typeof dateFormatter(new Date(), 'dd-MMM-yyyy')).toBe('string');
  });

  test('should return a string with the correct format', () => {
    const now = new Date();
    const day = now.toLocaleDateString('default', { day: '2-digit' });
    const month = now.toLocaleDateString('default', { month: 'short' });
    const year = now.toLocaleDateString('default', { year: 'numeric' });
    expect(dateFormatter(now, 'dd-MMM-yyyy')).toBe(`${day}-${month}-${year}`);
  });
});
