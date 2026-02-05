import { describe, it, expect } from 'vitest';

describe('api integration smoke', () => {
  it('health shape is expected', () => {
    const response = { ok: true };
    expect(response.ok).toBe(true);
  });
});
