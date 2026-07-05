import { describe, expect, it } from 'vitest';
import { GET } from '../../apps/web/app/api/health/route';

describe('/api/health', () => {
  it('returns ok', async () => {
    const res = await GET();
    const body = await res.json();
    expect(body.status).toBe('ok');
  });
});
