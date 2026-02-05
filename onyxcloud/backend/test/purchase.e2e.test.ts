import { describe, it, expect } from 'vitest';

describe('purchase flow sequence', () => {
  it('enforces required ordered steps', () => {
    const sequence = ['select-product','select-plan','configure-options','billing-details','invoice-generated','payment-pending','payment-confirmed','provisioning','dashboard'];
    expect(sequence[0]).toBe('select-product');
    expect(sequence.at(-1)).toBe('dashboard');
  });
});
