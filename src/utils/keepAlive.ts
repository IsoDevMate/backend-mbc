import cron from 'node-cron';

export function startKeepAlive() {
  const url = process.env.SERVER_URL;
  if (!url) return;

  // Ping every 14 minutes to prevent cold starts
  cron.schedule('*/14 * * * *', async () => {
    try {
      await fetch(`${url}/health`);
      console.log('[keep-alive] pinged successfully');
    } catch (err) {
      console.error('[keep-alive] ping failed:', err);
    }
  });
}
