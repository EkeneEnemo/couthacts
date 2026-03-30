import Pusher from "pusher";

let _pusher: Pusher | null = null;

export function getPusher() {
  if (!_pusher) {
    _pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID!,
      key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
      secret: process.env.PUSHER_SECRET!,
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      useTLS: true,
    });
  }
  return _pusher;
}

/**
 * Trigger a real-time event on a user's private channel.
 */
export async function pushToUser(
  userId: string,
  event: string,
  data: Record<string, unknown>
) {
  if (!process.env.PUSHER_APP_ID) return;
  await getPusher().trigger(`private-user-${userId}`, event, data);
}

/**
 * Trigger a real-time event on a posting channel (for live bid updates).
 */
export async function pushToPosting(
  postingId: string,
  event: string,
  data: Record<string, unknown>
) {
  if (!process.env.PUSHER_APP_ID) return;
  await getPusher().trigger(`posting-${postingId}`, event, data);
}
