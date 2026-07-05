export interface AnalyticsProvider { capture(event: string, payload?: Record<string, unknown>): void }

export const analytics: AnalyticsProvider = {
  capture(event, payload) {
    if (process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER) {
      console.info(JSON.stringify({ event, payload }));
    }
  }
};
