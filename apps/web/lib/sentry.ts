export function captureException(error: unknown) {
  if (process.env.SENTRY_DSN) console.error('Sentry capture', error);
}
