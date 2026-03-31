import { db } from "@/lib/db";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png"];

/**
 * Validate an image upload.
 * Returns null if valid, or error message if invalid.
 */
export function validateImage(base64: string): string | null {
  if (!base64.startsWith("data:image/")) {
    return "Invalid image format. Please upload a JPG or PNG.";
  }

  const mimeMatch = base64.match(/data:(image\/\w+);/);
  if (!mimeMatch || !ALLOWED_TYPES.includes(mimeMatch[1])) {
    return "Only JPG and PNG images are accepted.";
  }

  // Estimate base64 size (rough: base64 is ~1.37x the binary size)
  const sizeEstimate = (base64.length * 3) / 4;
  if (sizeEstimate > MAX_SIZE * 1.37) {
    return "Image is too large. Maximum size is 5MB.";
  }

  return null;
}

/**
 * Save avatar and update profileComplete status.
 */
export async function saveAvatar(userId: string, imageData: string) {
  const error = validateImage(imageData);
  if (error) throw new Error(error);

  await db.user.update({
    where: { id: userId },
    data: { avatarUrl: imageData, profileComplete: true },
  });

  return imageData;
}

/**
 * Save provider logo.
 */
export async function saveLogo(providerId: string, imageData: string) {
  const error = validateImage(imageData);
  if (error) throw new Error(error);

  await db.provider.update({
    where: { id: providerId },
    data: { logoUrl: imageData },
  });

  return imageData;
}
