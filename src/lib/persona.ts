/**
 * Persona Identity Verification client.
 * Uses Persona's REST API to create inquiries and check results.
 */

const PERSONA_API_URL = "https://withpersona.com/api/v1";

function getApiKey(): string {
  const key = (process.env.PERSONA_API_KEY || "").replace(/^["']|["']$/g, "").trim();
  if (!key) throw new Error("PERSONA_API_KEY is not set");
  return key;
}

function headers() {
  return {
    Authorization: `Bearer ${getApiKey()}`,
    "Persona-Version": "2023-01-05",
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

/**
 * Create a Persona inquiry for government ID verification.
 * Returns the inquiry ID and the hosted URL where the user completes verification.
 */
export async function createPersonaInquiry({
  userId,
  firstName,
  lastName,
  email,
}: {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
}): Promise<{ inquiryId: string; url: string }> {
  const templateId = process.env.PERSONA_TEMPLATE_ID || "itmpl_Ygs16MKTkA6obnF5jEqEVFfp";

  const res = await fetch(`${PERSONA_API_URL}/inquiries`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      data: {
        attributes: {
          "inquiry-template-id": templateId,
          "reference-id": userId,
          "name-first": firstName,
          "name-last": lastName,
          "email-address": email,
        },
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Persona inquiry creation failed: ${err}`);
  }

  const data = await res.json();
  const inquiryId = data.data?.id;

  // Build the hosted flow URL
  const url = `https://withpersona.com/verify?inquiry-id=${inquiryId}`;

  return { inquiryId, url };
}

/**
 * Retrieve a Persona inquiry to check its status and extracted name.
 */
export async function getPersonaInquiry(inquiryId: string): Promise<{
  status: string;
  firstName: string | null;
  lastName: string | null;
}> {
  const res = await fetch(`${PERSONA_API_URL}/inquiries/${inquiryId}`, {
    method: "GET",
    headers: headers(),
  });

  if (!res.ok) {
    throw new Error("Failed to retrieve Persona inquiry");
  }

  const data = await res.json();
  const attrs = data.data?.attributes;

  return {
    status: attrs?.status || "unknown", // "completed", "approved", "declined", "needs_review", etc.
    firstName: attrs?.["name-first"] || null,
    lastName: attrs?.["name-last"] || null,
  };
}
