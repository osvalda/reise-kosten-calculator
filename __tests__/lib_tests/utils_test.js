import '@testing-library/jest-dom'
import { formatCurrency } from '../../app/lib/utils'

describe('formatCurrency', () => {
  it('format even number', () => {
    expect(formatCurrency(100)).toBe('$100.00');
  }),
  it('format uneven number', () => {
    expect(formatCurrency(100.12)).toBe('$100.12');
  }),
  it('format negative number', () => {
    expect(formatCurrency(-100.12)).toBe('-$100.12');
  }),
  it('format zero', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  })
})
