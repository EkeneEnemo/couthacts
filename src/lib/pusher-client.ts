import PusherClient from "pusher-js";

let _pusherClient: PusherClient | null = null;

export function getPusherClient() {
  if (!_pusherClient && typeof window !== "undefined") {
    const key = process.env.NEXT_PUBLIC_PUSHER_KEY;
    const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;
    if (!key || !cluster) return null;

    _pusherClient = new PusherClient(key, {
      cluster,
    });
  }
  return _pusherClient;
}
