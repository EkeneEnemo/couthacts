import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/wallet/receipt?id=xxx — Generate a PDF receipt for a wallet transaction.
 */
export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const txId = searchParams.get("id");

  if (!txId) {
    return NextResponse.json({ error: "Transaction ID required" }, { status: 400 });
  }

  const tx = await db.walletTransaction.findUnique({
    where: { id: txId },
    include: { wallet: { include: { user: true } } },
  });

  if (!tx) {
    return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
  }

  if (tx.wallet.userId !== session.user.id) {
    return NextResponse.json({ error: "Not your transaction" }, { status: 403 });
  }

  const user = tx.wallet.user;
  const amount = Number(tx.amountUsd);
  const isCredit = amount > 0;
  const absAmount = Math.abs(amount).toFixed(2);
  const date = new Date(tx.createdAt);
  const dateStr = date.toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
  const timeStr = date.toLocaleTimeString("en-US", {
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  });

  const typeLabels: Record<string, string> = {
    TOPUP: "Wallet Top-Up",
    POSTING_FEE: "Posting Fee",
    ESCROW_HOLD: "Escrow Hold",
    ESCROW_RELEASE: "Escrow Release",
    ESCROW_REFUND: "Escrow Refund",
    PAYOUT: "Provider Payout",
    ADVANCE: "Advance",
    ADVANCE_REPAYMENT: "Advance Repayment",
    REFUND: "Refund",
    ADJUSTMENT: "Adjustment",
  };

  // Build PDF manually using raw PDF syntax (no external dependencies)
  const typeLabel = typeLabels[tx.type] || tx.type;
  const receiptNumber = `CA-${tx.id.slice(0, 8).toUpperCase()}`;

  const pdf = buildPdf({
    receiptNumber,
    date: dateStr,
    time: timeStr,
    userName: `${user.firstName} ${user.lastName}`,
    userEmail: user.email,
    type: typeLabel,
    description: tx.description,
    amount: `${isCredit ? "+" : "-"}$${absAmount} USD`,
    isCredit,
    balanceBefore: `$${Number(tx.balanceBefore).toFixed(2)}`,
    balanceAfter: `$${Number(tx.balanceAfter).toFixed(2)}`,
    reference: tx.reference || undefined,
    stripeId: tx.stripeId || undefined,
    postingId: tx.postingId || undefined,
    bookingId: tx.bookingId || undefined,
    txId: tx.id,
  });

  return new NextResponse(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="CouthActs-Receipt-${receiptNumber}.pdf"`,
    },
  });
}

// ─── Minimal PDF generator (no dependencies) ──────────────────

interface ReceiptData {
  receiptNumber: string;
  date: string;
  time: string;
  userName: string;
  userEmail: string;
  type: string;
  description: string;
  amount: string;
  isCredit: boolean;
  balanceBefore: string;
  balanceAfter: string;
  reference?: string;
  stripeId?: string;
  postingId?: string;
  bookingId?: string;
  txId: string;
}

function buildPdf(data: ReceiptData): Buffer {
  const objects: string[] = [];
  let objectCount = 0;

  function addObject(content: string): number {
    objectCount++;
    objects.push(`${objectCount} 0 obj\n${content}\nendobj`);
    return objectCount;
  }

  // Build receipt text content
  const textLines = [
    { text: "CouthActs™ Incorporated", size: 20, y: 760, bold: true },
    { text: "TRANSACTION RECEIPT", size: 14, y: 735, bold: true },
    { text: `Receipt: ${data.receiptNumber}`, size: 10, y: 710, bold: false },
    { text: `Date: ${data.date}`, size: 10, y: 695, bold: false },
    { text: `Time: ${data.time}`, size: 10, y: 680, bold: false },
    { text: "", size: 10, y: 660, bold: false },
    { text: "ACCOUNT HOLDER", size: 11, y: 645, bold: true },
    { text: `Name: ${data.userName}`, size: 10, y: 628, bold: false },
    { text: `Email: ${data.userEmail}`, size: 10, y: 613, bold: false },
    { text: "", size: 10, y: 595, bold: false },
    { text: "TRANSACTION DETAILS", size: 11, y: 580, bold: true },
    { text: `Type: ${data.type}`, size: 10, y: 563, bold: false },
    { text: `Description: ${data.description}`, size: 10, y: 548, bold: false },
    { text: `Amount: ${data.amount}`, size: 12, y: 528, bold: true },
    { text: "", size: 10, y: 510, bold: false },
    { text: "BALANCE", size: 11, y: 495, bold: true },
    { text: `Before: ${data.balanceBefore}`, size: 10, y: 478, bold: false },
    { text: `After:  ${data.balanceAfter}`, size: 10, y: 463, bold: false },
  ];

  let nextY = 440;

  if (data.reference) {
    textLines.push({ text: "", size: 10, y: nextY, bold: false });
    nextY -= 20;
    textLines.push({ text: "REFERENCES", size: 11, y: nextY, bold: true });
    nextY -= 17;
    textLines.push({ text: `Reference: ${data.reference}`, size: 10, y: nextY, bold: false });
    nextY -= 15;
  }

  if (data.stripeId) {
    if (!data.reference) {
      textLines.push({ text: "", size: 10, y: nextY, bold: false });
      nextY -= 20;
      textLines.push({ text: "REFERENCES", size: 11, y: nextY, bold: true });
      nextY -= 17;
    }
    textLines.push({ text: `Stripe ID: ${data.stripeId}`, size: 10, y: nextY, bold: false });
    nextY -= 15;
  }

  if (data.postingId) {
    textLines.push({ text: `Posting ID: ${data.postingId}`, size: 10, y: nextY, bold: false });
    nextY -= 15;
  }

  if (data.bookingId) {
    textLines.push({ text: `Booking ID: ${data.bookingId}`, size: 10, y: nextY, bold: false });
    nextY -= 15;
  }

  nextY -= 25;
  textLines.push({ text: `Transaction ID: ${data.txId}`, size: 8, y: nextY, bold: false });
  nextY -= 30;

  // Separator line
  textLines.push({ text: "────────────────────────────────────────────────────", size: 8, y: nextY, bold: false });
  nextY -= 15;
  textLines.push({ text: "This receipt was generated by CouthActs™ Incorporated.", size: 8, y: nextY, bold: false });
  nextY -= 12;
  textLines.push({ text: "All top-ups are final and non-refundable. All amounts in USD.", size: 8, y: nextY, bold: false });
  nextY -= 12;
  textLines.push({ text: "Intellectual property of Enemo Consulting Group, Inc.", size: 8, y: nextY, bold: false });
  nextY -= 12;
  textLines.push({ text: "https://couthacts.com", size: 8, y: nextY, bold: false });

  // Build stream content
  let stream = "";
  for (const line of textLines) {
    if (!line.text) continue;
    const font = line.bold ? "/F2" : "/F1";
    // Escape special PDF characters
    const escaped = line.text
      .replace(/\\/g, "\\\\")
      .replace(/\(/g, "\\(")
      .replace(/\)/g, "\\)")
      .replace(/™/g, "(TM)");
    stream += `BT ${font} ${line.size} Tf 50 ${line.y} Td (${escaped}) Tj ET\n`;
  }

  // Catalog
  const catalogId = addObject("<< /Type /Catalog /Pages 2 0 R >>");

  // Pages
  const pagesId = addObject("<< /Type /Pages /Kids [3 0 R] /Count 1 >>");

  // Font (Helvetica + Helvetica-Bold)
  const font1Id = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const font2Id = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");

  // Content stream
  const streamBytes = Buffer.from(stream, "utf-8");
  const streamId = addObject(
    `<< /Length ${streamBytes.length} >>\nstream\n${stream}endstream`
  );

  // Page
  addObject(
    `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 612 792] /Contents ${streamId} 0 R /Resources << /Font << /F1 ${font1Id} 0 R /F2 ${font2Id} 0 R >> >> >>`
  );

  // Build PDF file
  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [];

  for (const obj of objects) {
    offsets.push(Buffer.byteLength(pdf, "utf-8"));
    pdf += obj + "\n";
  }

  const xrefOffset = Buffer.byteLength(pdf, "utf-8");
  pdf += `xref\n0 ${objectCount + 1}\n0000000000 65535 f \n`;
  for (const offset of offsets) {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size ${objectCount + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return Buffer.from(pdf, "utf-8");
}
