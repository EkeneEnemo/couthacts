import * as Sentry from "@sentry/nextjs";

/**
 * Thin tracing abstraction over Sentry's OpenTelemetry-compatible API.
 *
 * Sentry v10+ ships with OpenTelemetry under the hood; spans created here
 * are OTel-compatible and exported via the OTLP bridge if an OTLP endpoint
 * is configured on the collector side. If/when we swap to a standalone
 * OTel SDK (e.g. Honeycomb, Tempo, Datadog), only this file changes —
 * call sites use `withSpan` and remain identical.
 *
 * Conventions for span names:
 *   - `lib.<module>.<operation>`        — e.g. `lib.escrow.release`
 *   - `api.<resource>.<method>`          — e.g. `api.bookings.POST`
 *   - `payment.<provider>.<call>`        — e.g. `payment.stripe.transfers.create`
 *
 * Attributes (`attrs`) appear as span tags in Sentry. Keep them low
 * cardinality — no user IDs, no raw emails.
 */
export async function withSpan<T>(
  name: string,
  attrs: Record<string, string | number | boolean | undefined>,
  fn: () => Promise<T>,
): Promise<T> {
  return Sentry.startSpan({ name, attributes: cleanAttrs(attrs) }, fn);
}

function cleanAttrs(
  attrs: Record<string, string | number | boolean | undefined>,
): Record<string, string | number | boolean> {
  const out: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(attrs)) {
    if (v !== undefined) out[k] = v;
  }
  return out;
}

/**
 * Synchronous variant. Use only when the work is truly sync (computation,
 * formatting). I/O should use `withSpan`.
 */
export function withSpanSync<T>(
  name: string,
  attrs: Record<string, string | number | boolean | undefined>,
  fn: () => T,
): T {
  return Sentry.startSpan({ name, attributes: cleanAttrs(attrs) }, fn);
}

/**
 * Attach a key/value attribute to the currently active span. No-op if
 * there is no active span.
 */
export function setSpanAttribute(key: string, value: string | number | boolean): void {
  const span = Sentry.getActiveSpan();
  if (span) span.setAttribute(key, value);
}

/**
 * Mark the current span's status. Default status in Sentry is "ok"; call
 * this with "error" to short-circuit a span's success state while still
 * letting it close.
 */
export function markSpanError(err: unknown): void {
  const span = Sentry.getActiveSpan();
  if (!span) return;
  span.setStatus({ code: 2, message: err instanceof Error ? err.message : String(err) });
}
