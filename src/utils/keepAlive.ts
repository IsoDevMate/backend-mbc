import cron from 'node-cron';

export function startKeepAlive() {
  const url = process.env.SERVER_URL;
  if (!url) {
    console.log('[keep-alive] SERVER_URL not set, skipping');
    return;
  }

  // Prevent cold starts - ping every 14 minutes
  cron.schedule('*/14 * * * *', async () => {
    try {
      const response = await fetch(`${url}/health`, { 
        method: 'GET',
        timeout: 10000 
      });
      if (response.ok) {
        console.log(`[keep-alive] ✓ pinged at ${new Date().toISOString()}`);
      } else {
        console.warn(`[keep-alive] ⚠ ping returned ${response.status}`);
      }
    } catch (err) {
      console.error('[keep-alive] ✗ ping failed:', err instanceof Error ? err.message : err);
    }
  });

  // Health check - runs every hour during business hours
  cron.schedule('0 9-17 * * 1-5', async () => {
    try {
      const response = await fetch(`${url}/health`);
      console.log(`[health-check] Status: ${response.status} at ${new Date().toISOString()}`);
    } catch (err) {
      console.error('[health-check] Failed:', err instanceof Error ? err.message : err);
    }
  });

  console.log('[cron] Keep-alive jobs started');
}
