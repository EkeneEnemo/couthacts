import { db } from "@/lib/db";
import { pushToUser } from "@/lib/pusher-server";

export async function createNotification({
  userId,
  title,
  body,
  type,
  link,
}: {
  userId: string;
  title: string;
  body: string;
  type: string;
  link?: string;
}) {
  const notification = await db.notification.create({
    data: { userId, title, body, type, link },
  });

  // Push real-time notification
  pushToUser(userId, "notification", { id: notification.id, title, body, type, link }).catch(() => {});

  return notification;
}

export async function notifyNewBid(postingId: string, providerName: string) {
  const posting = await db.posting.findUniqueOrThrow({
    where: { id: postingId },
  });
  await createNotification({
    userId: posting.customerId,
    title: "New bid received",
    body: `${providerName} placed a bid on "${posting.title}"`,
    type: "BID",
    link: `/postings/${postingId}`,
  });
}

export async function notifyBidAccepted(
  providerId: string,
  providerUserId: string,
  postingTitle: string,
  bookingId: string
) {
  await createNotification({
    userId: providerUserId,
    title: "Bid accepted!",
    body: `Your bid on "${postingTitle}" was accepted`,
    type: "BOOKING",
    link: `/bookings/${bookingId}`,
  });
}

export async function notifyBookingComplete(
  userId: string,
  postingTitle: string,
  bookingId: string
) {
  await createNotification({
    userId,
    title: "Booking completed",
    body: `"${postingTitle}" has been completed`,
    type: "COMPLETION",
    link: `/bookings/${bookingId}`,
  });
}

export async function notifyEscrowReleased(
  providerUserId: string,
  amount: number,
  bookingId: string
) {
  await createNotification({
    userId: providerUserId,
    title: "Payment received",
    body: `$${amount.toLocaleString()} has been released to your wallet`,
    type: "PAYMENT",
    link: `/bookings/${bookingId}`,
  });
}

export async function notifyDisputeFiled(
  userId: string,
  postingTitle: string,
  bookingId: string
) {
  await createNotification({
    userId,
    title: "Dispute filed",
    body: `A dispute was filed on "${postingTitle}"`,
    type: "DISPUTE",
    link: `/bookings/${bookingId}`,
  });
}
