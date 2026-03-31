/**
 * Re-seeds academy with rich, Fortune 500-grade lesson content.
 * Run: npx tsx scripts/reseed-rich.ts
 */
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import * as dotenv from "dotenv";
dotenv.config();

const cs = (process.env.DATABASE_URL || "")
  .replace(/^["']|["']$/g, "").trim()
  .replace(/[?&]channel_binding=[^&]*/g, "")
  .replace(/\?&/, "?").replace(/\?$/, "");
const db = new PrismaClient({ adapter: new PrismaNeon({ connectionString: cs }) });

// Dynamic imports for the content files
async function loadContent() {
  const { COURSE_1 } = await import("../src/lib/academy/course-content-1");
  const { COURSE_2 } = await import("../src/lib/academy/course-content-2");

  // Course 3-4-5 file uses const, we need to read and eval it
  const fs = await import("fs");
  const path = await import("path");
  const raw = fs.readFileSync(path.join(process.cwd(), "src/lib/academy/course-content-3-4-5.ts"), "utf-8");

  // Extract each array
  function extractArray(name: string): Array<{ title: string; order: number; durationMins: number; content: string }> {
    const start = raw.indexOf(`const ${name} = [`);
    if (start === -1) throw new Error(`Could not find ${name}`);
    let depth = 0;
    let i = raw.indexOf("[", start);
    const begin = i;
    for (; i < raw.length; i++) {
      if (raw[i] === "[") depth++;
      if (raw[i] === "]") { depth--; if (depth === 0) break; }
    }
    const arrayStr = raw.slice(begin, i + 1);
    // Use Function constructor to evaluate (safe - our own code)
    return new Function("return " + arrayStr)();
  }

  const COURSE_3 = extractArray("COURSE_3");
  const COURSE_4 = extractArray("COURSE_4");
  const COURSE_5 = extractArray("COURSE_5");

  return { COURSE_1, COURSE_2, COURSE_3, COURSE_4, COURSE_5 };
}

async function main() {
  console.log("Loading content files...");
  const { COURSE_1, COURSE_2, COURSE_3, COURSE_4, COURSE_5 } = await loadContent();

  // Clear
  await db.lessonProgress.deleteMany({});
  await db.enrollment.deleteMany({});
  await db.examQuestion.deleteMany({});
  await db.lesson.deleteMany({});
  await db.course.deleteMany({});
  console.log("Cleared existing courses.\n");

  const courseDefs = [
    {
      title: "Getting Started as a CouthActs Provider",
      slug: "getting-started-provider",
      description: "Master the CouthActs platform — from profile setup and verification to bidding strategy, escrow payments, and building a 5-star reputation in your first 30 days.",
      whatYouLearn: ["How the 18-mode platform connects providers and customers", "Setting up a profile that wins bids", "KYC and KYB verification process", "The CouthActs Score algorithm and tier system", "Bidding strategy and Instant Jobs", "Escrow payments, wallet, and Stripe Connect"],
      category: "PLATFORM_MASTERY" as const, priceUsd: 49, duration: "2 hours", totalLessons: 8, level: "BEGINNER" as const,
      thumbnailUrl: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=600&q=80",
      lessons: COURSE_1,
      examQuestions: [
        { question: "What is the CouthActs Score range?", optionA: "1-10", optionB: "0-50", optionC: "0-100", optionD: "1-1000", correctAnswer: "C", explanation: "The CouthActs Score is calculated on a 0-100 point scale.", order: 1 },
        { question: "How much does KYC verification cost?", optionA: "$5", optionB: "$10", optionC: "$15", optionD: "$20", correctAnswer: "D", explanation: "KYC verification costs $20 per attempt, non-refundable.", order: 2 },
        { question: "What is the minimum CouthActs Score for Elite tier?", optionA: "80", optionB: "85", optionC: "90", optionD: "95", correctAnswer: "C", explanation: "Elite tier requires a score of 90-100.", order: 3 },
        { question: "How long do providers have to accept an Instant Job?", optionA: "30 seconds", optionB: "60 seconds", optionC: "90 seconds", optionD: "120 seconds", correctAnswer: "C", explanation: "Instant Jobs have a 90-second acceptance window.", order: 4 },
        { question: "What is the escrow fee for a $10,000 job?", optionA: "8%", optionB: "6%", optionC: "4%", optionD: "2%", correctAnswer: "C", explanation: "The $5,000-$50,000 bracket has a 4% escrow fee.", order: 5 },
        { question: "How many transport modes does CouthActs support?", optionA: "12", optionB: "15", optionC: "18", optionD: "20", correctAnswer: "C", explanation: "CouthActs supports 18 transport modes.", order: 6 },
        { question: "What happens to unaccepted Instant Jobs after 90 seconds?", optionA: "Cancelled", optionB: "Auto-converts to standard posting", optionC: "Rebroadcast", optionD: "Budget increased", correctAnswer: "B", explanation: "Unaccepted Instant Jobs automatically become standard postings.", order: 7 },
        { question: "What is the minimum withdrawal amount?", optionA: "$1", optionB: "$5", optionC: "$10", optionD: "$25", correctAnswer: "C", explanation: "Minimum withdrawal from CouthActs Wallet is $10.", order: 8 },
        { question: "How many points does full verification add to your score?", optionA: "5", optionB: "10", optionC: "15", optionD: "20", correctAnswer: "C", explanation: "Full verification (KYC + KYB) adds 15 bonus points.", order: 9 },
        { question: "Which scoring factor has the highest weight?", optionA: "On-time rate", optionB: "Completion rate", optionC: "Review average", optionD: "Response time", correctAnswer: "B", explanation: "Completion rate carries the highest weight at 25 points.", order: 10 },
      ],
    },
    {
      title: "Certified Transport Safety",
      slug: "certified-transport-safety",
      description: "Master safety protocols across all transport modes — DOT, FMCSA, IMO, and FAA compliance. Pre-trip inspections, cargo securement, HOS, emergency response, and safety documentation.",
      whatYouLearn: ["Pre-trip inspection standards (49 CFR 396.13)", "FMCSA Hours of Service compliance", "Cargo securement per FMCSA 393.100", "Defensive driving and the Smith System", "Emergency response procedures", "Maritime (IMO/SOLAS) and aviation (FAA) safety"],
      category: "COMPLIANCE_SAFETY" as const, priceUsd: 79, duration: "4 hours", totalLessons: 12, level: "INTERMEDIATE" as const,
      thumbnailUrl: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80",
      lessons: COURSE_2,
      examQuestions: [
        { question: "What regulation governs pre-trip inspections?", optionA: "49 CFR 396.13", optionB: "49 CFR 172", optionC: "FMCSA 393.100", optionD: "14 CFR Part 91", correctAnswer: "A", explanation: "49 CFR 396.13 requires pre-trip inspections.", order: 1 },
        { question: "Maximum driving hours after 10 hours off duty?", optionA: "8", optionB: "10", optionC: "11", optionD: "14", correctAnswer: "C", explanation: "11-Hour Driving Limit.", order: 2 },
        { question: "Minimum WLL for tiedowns relative to cargo weight?", optionA: "25%", optionB: "50%", optionC: "75%", optionD: "100%", correctAnswer: "B", explanation: "At least 50% of cargo weight.", order: 3 },
        { question: "At what speed can hydroplaning occur?", optionA: "25 mph", optionB: "35 mph", optionC: "45 mph", optionD: "55 mph", correctAnswer: "B", explanation: "As low as 35 mph.", order: 4 },
        { question: "Which tracking layer do maritime bookings use?", optionA: "MOBILE_GPS", optionB: "FLIGHT_TRACKING", optionC: "AIS_MARITIME", optionD: "SATELLITE", correctAnswer: "C", explanation: "AIS_MARITIME for vessels.", order: 5 },
        { question: "Protection tier required for HAZMAT?", optionA: "Basic", optionB: "Standard", optionC: "Premium", optionD: "Elite", correctAnswer: "D", explanation: "Elite Protection mandatory.", order: 6 },
        { question: "How many reflective triangles behind a stopped CMV?", optionA: "1", optionB: "2", optionC: "3", optionD: "4", correctAnswer: "C", explanation: "Three at 10, 100, and 200 feet.", order: 7 },
        { question: "Which layer provides temperature monitoring?", optionA: "MOBILE_GPS", optionB: "IOT_DEVICE", optionC: "SATELLITE", optionD: "BIOMETRIC", correctAnswer: "B", explanation: "IOT_DEVICE for conditions.", order: 8 },
        { question: "What IMO convention governs safety at sea?", optionA: "MARPOL", optionB: "SOLAS", optionC: "STCW", optionD: "ISM", correctAnswer: "B", explanation: "SOLAS is the primary maritime safety treaty.", order: 9 },
        { question: "What CouthActs feature is for critical emergencies?", optionA: "Tracking update", optionB: "Dispute", optionC: "SOS", optionD: "Message", correctAnswer: "C", explanation: "SOS escalates to operations team.", order: 10 },
      ],
    },
    {
      title: "Hazardous Materials Handling",
      slug: "hazardous-materials-handling",
      description: "Comprehensive HAZMAT training — 9 UN classes, packaging per 49 CFR 173, shipping papers, placarding, segregation, ERG, CouthActs HAZMAT tracking, and certification.",
      whatYouLearn: ["All 9 HAZMAT classes and divisions", "Packaging standards (49 CFR 173)", "Shipping paper preparation", "Emergency Response Guidebook", "CouthActs 6-layer HAZMAT tracking", "IoT condition monitoring"],
      category: "COMPLIANCE_SAFETY" as const, priceUsd: 99, duration: "3 hours", totalLessons: 8, level: "ADVANCED" as const,
      thumbnailUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
      lessons: COURSE_3,
      examQuestions: [
        { question: "How many HAZMAT classes under the UN system?", optionA: "6", optionB: "7", optionC: "8", optionD: "9", correctAnswer: "D", explanation: "9 classes.", order: 1 },
        { question: "Which Packing Group indicates greatest danger?", optionA: "PG I", optionB: "PG II", optionC: "PG III", optionD: "PG IV", correctAnswer: "A", explanation: "PG I = greatest danger.", order: 2 },
        { question: "Green-bordered ERG pages are for?", optionA: "Material ID", optionB: "Guides", optionC: "Isolation distances", optionD: "First aid", correctAnswer: "C", explanation: "Initial Isolation and Protective Action Distances.", order: 3 },
        { question: "Which class must never be loaded with flammable liquids?", optionA: "Class 3", optionB: "Class 5.1 Oxidizers", optionC: "Class 8", optionD: "Class 9", correctAnswer: "B", explanation: "Oxidizers + flammable liquids = explosion risk.", order: 4 },
        { question: "Which tracking layer provides temperature monitoring?", optionA: "MOBILE_GPS", optionB: "AIS_MARITIME", optionC: "IOT_DEVICE", optionD: "SATELLITE", correctAnswer: "C", explanation: "IOT_DEVICE for conditions.", order: 5 },
        { question: "Where must shipping papers be when driver is out?", optionA: "Glove box", optionB: "Driver seat/door", optionC: "Trailer", optionD: "Container", correctAnswer: "B", explanation: "On the seat or in a holder on the door.", order: 6 },
        { question: "Minimum size for HAZMAT placards?", optionA: "150mm", optionB: "200mm", optionC: "250mm", optionD: "300mm", correctAnswer: "C", explanation: "250mm x 250mm.", order: 7 },
        { question: "Protection tier required for HAZMAT on CouthActs?", optionA: "Basic", optionB: "Standard", optionC: "Premium", optionD: "Elite", correctAnswer: "D", explanation: "Elite Protection mandatory.", order: 8 },
      ],
    },
    {
      title: "Customer Excellence Program",
      slug: "customer-excellence-program",
      description: "Master the communication, service delivery, and relationship skills that earn 5-star reviews, build repeat business, and maximize your CouthActs Score.",
      whatYouLearn: ["Communication protocols for 5-star reviews", "Proactive tracking as communication", "LAST complaint recovery framework", "Building repeat customers", "CouthActs Score optimization", "Time management for on-time delivery"],
      category: "BUSINESS_OPERATIONS" as const, priceUsd: 39, duration: "2 hours", totalLessons: 6, level: "BEGINNER" as const,
      thumbnailUrl: "https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?w=600&q=80",
      lessons: COURSE_4,
      examQuestions: [
        { question: "How many Score points does Review Average contribute?", optionA: "10", optionB: "15", optionC: "20", optionD: "25", correctAnswer: "C", explanation: "20 points.", order: 1 },
        { question: "How soon after acceptance should you message?", optionA: "1 hour", optionB: "30 minutes", optionC: "2 hours", optionD: "24 hours", correctAnswer: "B", explanation: "Within 30 minutes.", order: 2 },
        { question: "'L' in LAST framework?", optionA: "Lead", optionB: "Listen", optionC: "Learn", optionD: "Log", correctAnswer: "B", explanation: "Listen, Apologize, Solve, Thank.", order: 3 },
        { question: "What happens when a dispute is filed?", optionA: "Provider banned", optionB: "Escrow frozen", optionC: "Payment released", optionD: "Nothing", correctAnswer: "B", explanation: "Escrow frozen immediately.", order: 4 },
        { question: "Score points from On-Time Rate?", optionA: "10", optionB: "15", optionC: "20", optionD: "25", correctAnswer: "C", explanation: "20 points.", order: 5 },
        { question: "Tracking layer for photo documentation?", optionA: "MOBILE_GPS", optionB: "IOT_DEVICE", optionC: "DOCUMENT_POD_AI", optionD: "SATELLITE", correctAnswer: "C", explanation: "DOCUMENT_POD_AI.", order: 6 },
      ],
    },
    {
      title: "Fleet Management Essentials",
      slug: "fleet-management-essentials",
      description: "Scale your transportation business — fleet operations, driver management, route optimization, financial planning, CouthActs API automation, and enterprise features.",
      whatYouLearn: ["Fleet maintenance scheduling and cost control", "Driver recruitment and performance management", "Route optimization and fuel efficiency", "Financial planning for transport businesses", "CouthActs Provider API for fleet automation", "Enterprise features and volume pricing"],
      category: "BUSINESS_OPERATIONS" as const, priceUsd: 69, duration: "3 hours", totalLessons: 8, level: "INTERMEDIATE" as const,
      thumbnailUrl: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=600&q=80",
      lessons: COURSE_5,
      examQuestions: [
        { question: "Recommended Score before scaling?", optionA: "70+", optionB: "75+", optionC: "80+", optionD: "85+", correctAnswer: "D", explanation: "Score 85+.", order: 1 },
        { question: "Benchmark cost per mile for trucks?", optionA: "$0.50-1.00", optionB: "$1.00-1.50", optionC: "$1.50-2.50", optionD: "$3.00-4.00", correctAnswer: "C", explanation: "$1.50-2.50/mile.", order: 2 },
        { question: "API endpoint for fleet tracking?", optionA: "POST /api/v1/jobs", optionB: "POST /api/provider/v1/tracking", optionC: "GET /api/track/{code}", optionD: "POST /api/tracking", correctAnswer: "B", explanation: "Provider API tracking endpoint.", order: 3 },
        { question: "Days of expenses to keep in reserve?", optionA: "30", optionB: "45", optionC: "60", optionD: "90", correctAnswer: "C", explanation: "60 days minimum.", order: 4 },
        { question: "Target utilization for long-haul?", optionA: "60%+", optionB: "70%+", optionC: "80%+", optionD: "90%+", correctAnswer: "C", explanation: "80%+ for long-haul.", order: 5 },
        { question: "Monthly jobs for Enterprise?", optionA: "20+", optionB: "30+", optionC: "40+", optionD: "50+", correctAnswer: "D", explanation: "50+ jobs/month.", order: 6 },
        { question: "Fuel per hour of idling (diesel)?", optionA: "0.3-0.5 gal", optionB: "0.5-0.7 gal", optionC: "0.8-1.0 gal", optionD: "1.2-1.5 gal", correctAnswer: "C", explanation: "0.8-1.0 gallons.", order: 7 },
        { question: "CouthActs live API key prefix?", optionA: "ca_test_", optionB: "ca_live_", optionC: "ca_prod_", optionD: "ca_api_", correctAnswer: "B", explanation: "ca_live_ prefix.", order: 8 },
      ],
    },
  ];

  for (const def of courseDefs) {
    const course = await db.course.create({
      data: {
        title: def.title, slug: def.slug, description: def.description,
        whatYouLearn: def.whatYouLearn, category: def.category,
        priceUsd: def.priceUsd, duration: def.duration,
        totalLessons: def.totalLessons, level: def.level,
        thumbnailUrl: def.thumbnailUrl, isPublished: true,
      },
    });

    for (const lesson of def.lessons) {
      await db.lesson.create({ data: { courseId: course.id, title: lesson.title, order: lesson.order, durationMins: lesson.durationMins, content: lesson.content } });
    }

    for (const q of def.examQuestions) {
      await db.examQuestion.create({ data: { courseId: course.id, ...q } });
    }

    const avgLen = Math.round(def.lessons.reduce((s, l) => s + (l.content?.length || 0), 0) / def.lessons.length);
    console.log(`✓ ${def.title} — ${def.lessons.length} lessons (avg ${avgLen} chars), ${def.examQuestions.length} exam Qs`);
  }

  console.log(`\nDone! ${courseDefs.length} courses seeded with rich content.`);
}

main().then(() => db.$disconnect()).then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
