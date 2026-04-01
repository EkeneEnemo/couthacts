import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";

/**
 * POST /api/academy/seed — Admin-only. Seeds courses with content.
 */
export async function POST() {
  const session = await getSession();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Admin only" }, { status: 403 });
  }

  // Clear existing courses to allow re-seed
  const existing = await db.course.count();
  if (existing > 0) {
    await db.lessonProgress.deleteMany({});
    await db.enrollment.deleteMany({});
    await db.examQuestion.deleteMany({});
    await db.lesson.deleteMany({});
    await db.course.deleteMany({});
  }

  const courses = [
    /* ═══════════════════ COURSE 1: Getting Started ═══════════════════ */
    {
      title: "Getting Started as a CouthActs Provider",
      slug: "getting-started-provider",
      description: "Learn how the CouthActs platform works, set up your provider profile, get verified, and land your first jobs.",
      whatYouLearn: ["How the platform connects providers and customers", "Setting up a profile that wins jobs", "KYC and KYB verification process", "Understanding the CouthActs Score", "Bidding strategy for new providers", "Getting paid through escrow"],
      category: "PLATFORM_MASTERY" as const, priceUsd: 49, duration: "2 hours", totalLessons: 8, level: "BEGINNER" as const,
      thumbnailUrl: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=600&q=80",
      lessons: [
        { title: "Welcome to CouthActs — How the Platform Works", order: 1, durationMins: 15, content: "CouthActs is a global transportation infrastructure platform that connects customers who need to move people or goods with verified transportation providers. Unlike traditional freight brokers or ride-hailing apps, CouthActs supports 18 different transport modes — from taxi rides and courier deliveries to cargo ships and private jets.\n\nThe platform operates on a simple cycle: customers post transportation needs, verified providers bid on those jobs, the customer selects a provider, funds are held in escrow, the job is completed with real-time tracking, and payment is released upon mutual confirmation.\n\nEvery transaction on CouthActs is escrow-protected. When a customer posts a job, their budget is held in their CouthActs Wallet. When they accept your bid, those funds are locked in escrow. You only get paid when both you and the customer confirm the job is complete. This protects both parties — the customer knows their money is safe, and you know the funds are already committed.\n\nAs a provider, your reputation is measured by your CouthActs Score — a 0-100 rating that considers your completion rate, on-time delivery, customer reviews, response time, and dispute history. A higher score means more trust, more bid acceptances, and access to premium features like CouthActs Advance.\n\nThe platform charges a sliding escrow fee (1-8% depending on job value) which is deducted from your payout on completion. There are no upfront fees to bid on jobs. Your earnings go directly to your CouthActs Wallet, and you can withdraw to your bank account via Stripe Connect at any time." },
        { title: "Setting Up Your Provider Profile for Maximum Visibility", order: 2, durationMins: 15, content: "Your provider profile is your storefront on CouthActs. Customers see it before they accept your bid. A complete, professional profile dramatically increases your bid acceptance rate.\n\nStart with your business name. If you're a solopreneur (taxi, limo, courier, or medical transport), your business name is automatically set to your personal name. For all other modes, you'll need a registered business name with proper documentation.\n\nSelect your transport modes carefully. Only choose modes you're actually equipped and licensed to serve. A freight trucking company shouldn't select yacht charter. The platform uses your registered modes to show you relevant jobs — selecting modes you can't serve wastes everyone's time and damages your score.\n\nYour bio should be concise and professional. Lead with your experience: 'Licensed FMCSA carrier with 12 years of cross-country freight experience. 48-foot flatbed fleet specializing in construction materials.' Customers want competence, not marketing fluff.\n\nAdd your service areas — the regions where you operate. Be specific: 'Northeast US (NY, NJ, CT, PA, MA)' is better than 'United States.' Upload fleet photos if you have them — real photos of your actual vehicles, not stock images. This builds trust instantly.\n\nList your certifications: HAZMAT endorsement, TWIC card, TSA-approved, ISO certifications, protection coverage levels. Every certification you add makes your profile more credible and opens you to jobs that require those qualifications." },
        { title: "Getting Verified — KYC and KYB Explained", order: 3, durationMins: 15, content: "Identity verification is mandatory on CouthActs. You cannot bid on any job until your identity is verified. This protects both you and your customers.\n\nKYC (Know Your Customer) is personal identity verification. Every user — customer or provider — must complete KYC before accessing platform features. The process uses Persona, a government-grade identity verification service. You'll upload a photo of your government-issued ID (passport, driver's license, or national ID) and take a selfie. Persona verifies that the ID is authentic, not expired, and that the selfie matches the ID photo.\n\nCritical requirement: the first and last name on your CouthActs account must exactly match the name on your government ID. If there's a mismatch, verification will be rejected. The $20 verification fee is non-refundable regardless of outcome, so make sure your name is correct before submitting.\n\nKYB (Know Your Business) is required for non-solopreneur providers. After completing KYC, you'll need to submit your business documentation: business license, protection certificate, and any mode-specific registrations (DOT number for trucking, IMO number for maritime, FAA certificates for aviation, etc.).\n\nThe CouthActs team manually reviews business documents within 1-3 business days. Once approved, your profile shows a 'KYB Verified' badge, which significantly increases customer trust in your bids.\n\nIf you change your name on CouthActs, your verification resets and you'll need to reverify ($20 again). This prevents identity fraud." },
        { title: "Understanding the CouthActs Score", order: 4, durationMins: 15, content: "Your CouthActs Score is the single most important number on your profile. It determines your tier (Elite, Trusted, Established, or Probation), affects how customers perceive your bids, and gates access to features like CouthActs Advance.\n\nThe score is calculated on a 100-point scale with seven factors:\n\n1. Completion Rate (25 points): What percentage of accepted bookings do you complete? Cancellations hurt this metric. If you accept a job, complete it.\n\n2. On-Time Rate (20 points): Of completed jobs with a delivery deadline, what percentage arrived on or before the deadline? Late deliveries reduce this score.\n\n3. Review Average (20 points): Your average customer rating out of 5 stars, scaled to 20 points. A 4.5/5 average gives you 18/20 points.\n\n4. Response Time (10 points): How quickly do you respond to job opportunities? Under 1 hour = full points. Over 24 hours = zero points.\n\n5. Dispute Penalty (-5 per dispute, max -15): Each dispute filed against you in the last 12 months costs 5 points. Three or more disputes deducts the maximum 15 points.\n\n6. Account Age (max 10 points): 1 point per month you've been on the platform, up to 10 points. Longevity builds trust.\n\n7. Verification Bonus (15 points): Being fully verified (KYC + KYB approved) adds 15 points.\n\nTier thresholds: 90-100 = Elite (gold), 75-89 = Trusted (silver), 60-74 = Established (gray), below 60 = Probation (red).\n\nYour score recalculates after every completed job. Focus on completing jobs, delivering on time, and communicating well — the score follows naturally." },
        { title: "How to Find and Bid on Jobs", order: 5, durationMins: 15, content: "Jobs on CouthActs come to you in two ways: the Browse Jobs page and Instant Jobs.\n\nThe Browse Jobs page shows all open postings that match your registered transport modes. If you're registered for FREIGHT_TRUCKING and HEAVY_HAUL, you'll only see freight and heavy haul jobs. You won't see taxi requests or yacht charters. This ensures every job you see is relevant to your capabilities.\n\nFor freight and cargo providers, the Load Board is your primary tool. It filters specifically for trucking, heavy haul, hazmat, oversized, rail, air cargo, and ocean freight. You can filter by mode, sort by budget or pickup date, and toggle for hazmat-only or fresh-in-the-last-24-hours jobs.\n\nWhen you find a job you want, click it to see full details: route, cargo specs, dates, insurance requirements, and the customer's budget range. Then click 'Place Bid' in the sidebar.\n\nYour bid should include: your price (in USD — the platform handles currency conversion for international customers), a message explaining why you're the right provider, and optionally your estimated pickup and delivery times.\n\nBidding tips:\n- Read the full job description before bidding. Customers notice when bids don't address their specific requirements.\n- Price competitively but don't underbid to win. Cheap bids make customers suspicious.\n- Include your relevant experience in the bid message: 'I've completed 50+ similar runs on this lane with a 98% on-time rate.'\n- Respond quickly. The first qualified bid gets more attention than the tenth.\n- Your CouthActs Score is visible on every bid. A higher score makes your bid more compelling even at a higher price." },
        { title: "Instant Jobs — How to Win Real-Time Requests", order: 6, durationMins: 15, content: "CouthActs Instant is the platform's real-time matching system for taxi rides, limousine services, and courier deliveries. When a customer posts an Instant request, you have 90 seconds to accept it — first verified provider to accept wins the job.\n\nTo receive Instant Jobs, go to /instant/provider and toggle 'Online.' While you're online, the page polls for new instant requests every 3 seconds. When a job appears, you'll see the mode, pickup location, drop-off location, and the customer's budget.\n\nWinning tips for Instant Jobs:\n- Stay online during your peak hours. The more you're available, the more requests you see.\n- Accept quickly. You have 90 seconds, but the fastest provider gets the job.\n- Only accept jobs you can actually start immediately. Instant means NOW.\n- Your CouthActs Score still matters — customers can see who accepted, and a low-score provider on an instant job still gets reviews.\n\nIf no provider accepts within 90 seconds, the customer's request automatically converts to a standard posting. The budget is refunded to their wallet (posting fee and protection fee are kept), and the job enters the regular bidding queue.\n\nInstant Jobs are a great way to build volume quickly. The jobs tend to be smaller (taxi rides, courier deliveries), but the speed means you can complete multiple jobs per day and rapidly build your CouthActs Score." },
        { title: "Getting Paid — Escrow, Wallet, and Stripe Connect", order: 7, durationMins: 15, content: "Understanding how money flows on CouthActs is critical for your business.\n\nWhen a customer posts a job, their full budget is held in their CouthActs Wallet as an escrow hold. When they accept your bid, an escrow record is created for the agreed amount. If your bid is lower than the budget, the difference is refunded to the customer immediately.\n\nThe escrow holds until BOTH parties confirm completion. The customer marks the job as done, and you mark it as done. PIN confirmation at delivery can also trigger your completion mark automatically.\n\nOnce both parties confirm, the escrow releases. The platform deducts its fee (1-8% on a sliding scale based on the job value), and the remainder is credited to your CouthActs Wallet.\n\nTo get money from your wallet to your bank account, you need Stripe Connect. Go to Settings → Stripe Connect and complete the onboarding process. Stripe will ask for your business details, bank account information, and identity verification (separate from CouthActs KYC).\n\nOnce Stripe Connect is set up, you can withdraw from your wallet at any time:\n- Standard withdrawal: free, arrives in 2-5 business days\n- Instant payout (if supported by your bank): 1.5% fee, arrives within 30 minutes\n\nMinimum withdrawal is $10. There's no CouthActs fee for standard withdrawals — only Stripe's standard transfer fees apply.\n\nFor Elite providers (CouthActs Score 90+, 50+ completed jobs), CouthActs Advance offers advance payments — you can receive 70% of the escrow amount before the job is complete, with a 2.5% advance fee." },
        { title: "Your First 30 Days — Building a 5-Star Reputation", order: 8, durationMins: 15, content: "Your first 30 days on CouthActs set the trajectory for your entire provider career. Here's the playbook:\n\nDay 1-3: Complete your profile, upload KYC verification ($20), submit business documents for KYB (if non-solopreneur), set up Stripe Connect. Don't bid on anything yet — get verified first.\n\nDay 4-7: Start with small, local jobs in your strongest mode. Your first 5 jobs should be ones you can absolutely crush — on time, great communication, no issues. These early reviews shape your score.\n\nDay 8-14: Increase volume. Bid on more jobs, respond faster. Start tracking your response time — under 1 hour is the target. Set up the availability calendar so customers can see you're active.\n\nDay 15-21: If you're in an instant-eligible mode (taxi, limo, courier), start going online for Instant Jobs during peak hours. The fast turnaround builds your job count and score quickly.\n\nDay 22-30: By now you should have 10-15 completed jobs. Review your score breakdown. Are you losing points on response time? On-time rate? Reviews? Fix the weakest area.\n\nCommunication rules:\n- Acknowledge every booking within 30 minutes\n- Send a status update before pickup\n- Notify immediately if there's any delay\n- At delivery, confirm via PIN and send a completion message\n- After completion, politely ask for a review\n\nThe providers who reach Trusted tier (75+) within their first 60 days are the ones who communicate proactively, deliver on time, and never accept jobs they can't fulfill. It's not about being the cheapest — it's about being the most reliable." },
      ],
      examQuestions: [
        { question: "What is the CouthActs Score range?", optionA: "1-10", optionB: "0-50", optionC: "0-100", optionD: "1-1000", correctAnswer: "C", explanation: "The CouthActs Score is calculated on a 0-100 point scale.", order: 1 },
        { question: "How much does identity verification (KYC) cost?", optionA: "$5", optionB: "$10", optionC: "$15", optionD: "$20", correctAnswer: "D", explanation: "KYC verification costs $20 per attempt and is non-refundable regardless of outcome.", order: 2 },
        { question: "What happens if a customer's name doesn't match their government ID?", optionA: "Auto-corrected", optionB: "Verification rejected", optionC: "Warning issued", optionD: "Partial approval", correctAnswer: "B", explanation: "Verification is rejected if the name doesn't match. The $20 fee is not refunded.", order: 3 },
        { question: "What is the minimum CouthActs Score for Elite tier?", optionA: "80", optionB: "85", optionC: "90", optionD: "95", correctAnswer: "C", explanation: "Elite tier requires a score of 90-100.", order: 4 },
        { question: "How long do providers have to accept an Instant Job?", optionA: "30 seconds", optionB: "60 seconds", optionC: "90 seconds", optionD: "120 seconds", correctAnswer: "C", explanation: "Instant Jobs have a 90-second window for provider acceptance.", order: 5 },
        { question: "What percentage of escrow can Elite providers access through CouthActs Advance?", optionA: "50%", optionB: "60%", optionC: "70%", optionD: "80%", correctAnswer: "C", explanation: "CouthActs Advance advances 70% of the escrow amount to eligible Elite providers.", order: 6 },
        { question: "What is the escrow fee for a $10,000 job?", optionA: "8%", optionB: "6%", optionC: "4%", optionD: "2%", correctAnswer: "C", explanation: "The $5,000-$50,000 bracket has a 4% escrow fee.", order: 7 },
        { question: "How many transport modes does CouthActs support?", optionA: "12", optionB: "15", optionC: "18", optionD: "20", correctAnswer: "C", explanation: "CouthActs supports 18 transport modes spanning ground, air, sea, and rail.", order: 8 },
        { question: "What happens to an Instant Job if no provider accepts within 90 seconds?", optionA: "Cancelled with full refund", optionB: "Auto-converts to standard posting", optionC: "Rebroadcast for 90 more seconds", optionD: "Customer notified to increase budget", correctAnswer: "B", explanation: "Unaccepted Instant Jobs automatically become standard postings. Budget is refunded but posting and protection fees are kept.", order: 9 },
        { question: "What is the maximum dispute penalty on CouthActs Score?", optionA: "5 points", optionB: "10 points", optionC: "15 points", optionD: "20 points", correctAnswer: "C", explanation: "Each dispute costs 5 points, with a maximum deduction of 15 points (3+ disputes).", order: 10 },
      ],
    },

    /* ═══════════════════ COURSE 2: Transport Safety ═══════════════════ */
    {
      title: "Certified Transport Safety",
      slug: "certified-transport-safety",
      description: "Master safety protocols across all transport modes. DOT, FMCSA, IMO, and FAA compliance. Required for providers handling regulated cargo.",
      whatYouLearn: ["Pre-trip and post-trip vehicle inspection protocols", "FMCSA Hours of Service compliance", "Accident prevention and emergency response", "Cargo securement standards (FMCSA 393.100)", "Weather and road hazard decision-making", "Safety documentation and reporting"],
      category: "COMPLIANCE_SAFETY" as const, priceUsd: 79, duration: "4 hours", totalLessons: 12, level: "INTERMEDIATE" as const,
      thumbnailUrl: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80",
      lessons: [
        { title: "Safety Culture in Transportation — Why It Matters", order: 1, durationMins: 20, content: `## Why Safety Culture Defines Your Transportation Career

The transportation industry moves the global economy — but it comes at a staggering human cost when safety is treated as an afterthought. According to the Bureau of Labor Statistics, transportation and material moving occupations consistently rank among the deadliest in the United States, accounting for over **1,900 fatal work injuries annually**. The National Highway Traffic Safety Administration (NHTSA) reports that large truck crashes alone cause approximately **5,000 fatalities per year**, with tens of thousands more suffering serious injuries.

![Highway safety begins with culture](https://images.unsplash.com/photo-1494412574643-ff11b0a5eb95?w=1200&q=80)

These are not abstract statistics. Every number represents a driver, a pedestrian, a family forever changed. As a CouthActs provider, you are personally responsible for the safety of your cargo, your passengers, other road users, and yourself. Safety is not a regulatory checkbox — it is the foundation of professional transportation.

## What Is Safety Culture?

**Safety culture** is the shared set of beliefs, practices, and attitudes within an organization that prioritizes the prevention of incidents above all else. It is the difference between a company that investigates near-misses to prevent future accidents and one that only reacts after someone is hurt.

### The Four Pillars of Safety Culture

1. **Leadership Commitment** — Safety starts at the top. Whether you are a solo operator or a fleet owner, you set the standard. If you cut corners, your drivers will too.
2. **Employee Engagement** — Every person in the operation must feel empowered to report hazards, refuse unsafe loads, and stop work when conditions are dangerous.
3. **Continuous Learning** — Safety culture is never "done." Regular training, incident reviews, and protocol updates keep your operation ahead of emerging risks.
4. **Accountability Without Blame** — Punishing honest mistake reports drives hazards underground. A just culture separates willful violations from systemic failures.

:::important
The Federal Motor Carrier Safety Administration (FMCSA) uses the **Safety Measurement System (SMS)** to rate carriers across seven Behavior Analysis and Safety Improvement Categories (BASICs). Carriers with poor safety ratings face intervention, fines, and potential shutdown orders.
:::

## How Safety Impacts Your CouthActs Score

Your CouthActs Score is a 0-100 rating that determines your provider tier and directly affects your ability to win jobs. Safety performance threads through multiple scoring components:

- **Completion Rate (25 points)** — Accidents and safety shutdowns cause incomplete jobs, destroying this metric
- **On-Time Rate (20 points)** — Safety incidents cause delays that cascade across your entire schedule
- **Review Average (20 points)** — Customers rate providers who demonstrate professional safety practices significantly higher
- **Verification (15 points)** — Full KYC/KYB verification includes safety credential validation

:::key
Providers with documented safety programs and zero preventable incidents maintain an average CouthActs Score of **91.4**, placing them firmly in the **Elite tier (90-100)**. Providers with even one preventable incident in a 12-month period average just **68.2**, barely maintaining Established tier status.
:::

![Fleet of well-maintained vehicles](https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1200&q=80)

## The Business Case for Safety

Beyond moral obligation and regulatory compliance, safety is simply good business. The FMCSA estimates that the average cost of a large truck crash is **$91,000 for crashes without injuries** and over **$1 million for fatal crashes** when you factor in medical costs, property damage, legal fees, lost productivity, and insurance premium increases.

- **Insurance premiums** drop 15-30% for carriers with clean safety records
- **Customer retention** increases dramatically when clients trust your safety standards
- **Driver retention** improves — professional drivers leave unsafe operations
- **Regulatory compliance** prevents costly fines, shutdowns, and out-of-service orders

:::warning
A single DOT-recordable crash can raise your insurance premiums by **20-40%** for up to three years. For a fleet of 10 trucks, that can mean an additional **$50,000-$150,000** in annual insurance costs.
:::

## What This Course Covers

Over the next 11 lessons, you will master the safety knowledge and practices required for CouthActs Certified Transport Safety certification:

- Pre-trip inspection protocols under 49 CFR 396.13
- FMCSA Hours of Service rules and ELD compliance
- Cargo securement standards per FMCSA 393.100
- Defensive driving and accident prevention
- Emergency response procedures
- Weather and road hazard decision-making
- Maritime safety under IMO standards
- Aviation safety under FAA regulations
- Hazardous materials transport overview
- Safety documentation and record-keeping
- Building a safety-first provider business

---

Safety is not a cost center — it is your greatest competitive advantage on CouthActs. The providers who internalize this lesson build careers that last decades. The ones who don't become cautionary statistics.` },
        { title: "Pre-Trip Inspection Standards", order: 2, durationMins: 20, content: `## The Legal Foundation: 49 CFR 396.13

Federal regulation **49 CFR 396.13** is unambiguous: before operating a commercial motor vehicle (CMV), the driver must be satisfied that the vehicle is in safe operating condition. This is not a suggestion — it is a legal requirement enforced by the Federal Motor Carrier Safety Administration (FMCSA) and the Department of Transportation (DOT).

A proper pre-trip inspection takes **15-20 minutes** for a tractor-trailer combination. That investment prevents breakdowns, accidents, DOT violations, and out-of-service orders that can cost thousands of dollars and sideline your vehicle for days.

![Truck inspection in progress](https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&q=80)

:::warning
During roadside inspections, **22.4% of commercial vehicles** are placed out of service for safety violations that a proper pre-trip inspection would have caught. An out-of-service order means your load sits — and your CouthActs job may be cancelled, damaging your Completion Rate and Score.
:::

## The Complete Pre-Trip Inspection Checklist

### Engine Compartment

1. **Engine oil level** — Check with dipstick on level ground. Oil should be between MIN and MAX marks.
2. **Coolant level** — Never open a hot radiator cap. Check the overflow reservoir.
3. **Power steering fluid** — Low levels cause hard steering and potential loss of control.
4. **Brake fluid** — Low brake fluid is a critical safety hazard requiring immediate attention.
5. **Belts and hoses** — Check for cracks, fraying, excessive wear, and proper tension.
6. **Leaks** — Look under the vehicle for any fluid puddles or active drips.
7. **Wiring** — Inspect for chafed, worn, or disconnected electrical connections.

### Tires and Wheels

- **Tread depth** — Minimum 4/32" on steer tires, 2/32" on all other positions per 49 CFR 393.75
- **Tire pressure** — Check with a calibrated gauge when tires are cold. Underinflation causes blowouts and increases fuel consumption by up to 3%
- **Sidewall condition** — Look for cuts, bulges, and exposed cords
- **Lug nuts** — Check torque and look for rust trails indicating loosening
- **Valve stems and caps** — Ensure caps are present and stems are not cracked
- **Matching** — Dual tires must be within 5 psi of each other and matched for size

### Brake System

- **Brake adjustment** — Automatic slack adjusters should maintain proper pushrod stroke. Manual check: pushrod travel should not exceed manufacturer specifications (typically 1.5-2 inches)
- **Air brake system** — Build to governor cut-out (typically 120-140 psi). With engine off, air loss should not exceed 2 psi/minute (single vehicle) or 3 psi/minute (combination)
- **Low air warning** — Must activate before air pressure drops below 60 psi
- **Brake lines and hoses** — Check for cracks, abrasion, and leaks at all connections
- **Parking brake** — Must hold the vehicle on the grade where parked

:::important
**Brake violations are the number one reason** for out-of-service orders during roadside inspections. The Commercial Vehicle Safety Alliance (CVSA) reports that brake-related issues account for approximately **31%** of all vehicle OOS violations.
:::

### Lights and Electrical

- **Headlights** — Low and high beam function
- **Tail lights, brake lights, and turn signals** — Walk around to verify all are working
- **Clearance and marker lights** — Required on vehicles over 80 inches wide
- **Hazard flashers** — Four-way function
- **Reflectors and reflective tape** — Must be clean and visible

### Coupling System (Combination Vehicles)

1. **Fifth wheel** — Locked around kingpin with no gap between upper and lower halves
2. **Kingpin** — Not bent, broken, or missing
3. **Apron and mounting bolts** — Secure with no cracks
4. **Sliding mechanism** — Locked in position with both pins engaged
5. **Air and electrical lines** — Properly connected, no leaks, no damage
6. **Safety chains/cables** — Crossed under the tongue (for trailers with pintle hooks)

### Fluid Levels and Other Components

- **Windshield washer fluid** — Full
- **Fuel level** — Sufficient for the planned trip plus reserve
- **DEF (Diesel Exhaust Fluid)** — If applicable, check level
- **Mirrors** — Clean, properly adjusted, and securely mounted
- **Horn** — Functional
- **Windshield wipers** — Proper contact, no streaking
- **Seat belt** — Functional and not frayed
- **Fire extinguisher** — Charged, accessible, and current inspection tag
- **Emergency triangles** — Three reflective triangles in good condition

![Safety gear and equipment](https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80)

## Documenting Your Inspection with CouthActs

CouthActs integrates pre-trip inspection documentation directly into the **DOCUMENT_POD_AI** tracking layer. For every job, you should:

1. **Photograph your vehicle** before loading — capture all four sides, tires, and coupling
2. **Log the inspection** via the tracking status update with notes on vehicle condition
3. **Report any defects** — even minor ones — in the job notes so the record is timestamped

:::tip
Providers who upload pre-trip photos via DOCUMENT_POD_AI receive **higher customer ratings** because customers can see professionalism in real time. It also protects you in dispute resolution — timestamped photos prove vehicle condition at departure.
:::

## Post-Trip Inspection: 49 CFR 396.11

At the end of each day's work, you are required to prepare a **Driver Vehicle Inspection Report (DVIR)** documenting the vehicle's condition. If you found defects during your trip, they must be reported. The motor carrier must then repair any safety-affecting defects before the vehicle operates again, and sign off on the repairs.

---

Pre-trip inspections are not wasted time — they are the single most effective safety practice in commercial transportation. A 15-minute walk-around can prevent a catastrophic failure that costs lives, careers, and hundreds of thousands of dollars. Make it habit. Make it thorough. Every single trip.` },
        { title: "FMCSA Hours of Service Compliance", order: 3, durationMins: 20, content: `## Why Hours of Service Rules Exist

Driver fatigue is one of the leading causes of fatal commercial vehicle crashes. The National Transportation Safety Board (NTSB) has identified fatigue as a contributing factor in approximately **13% of all large truck crashes**. The FMCSA's Hours of Service (HOS) regulations exist to prevent fatigued driving by placing strict limits on when and how long CMV drivers may operate.

![Highway driving demands strict HOS compliance](https://images.unsplash.com/photo-1494412574643-ff11b0a5eb95?w=1200&q=80)

:::warning
HOS violations carry penalties of up to **$16,000 per violation** for drivers and up to **$16,000 per violation** for carriers who knowingly allow or require violations. Egregious or repeated violations can result in criminal prosecution.
:::

## The Core HOS Rules for Property-Carrying Drivers

### 1. The 11-Hour Driving Limit

After **10 consecutive hours off duty**, a driver may operate a CMV for a maximum of **11 hours**. This is the total driving time allowed — not elapsed time, but actual time behind the wheel with the vehicle in motion.

### 2. The 14-Hour Duty Window

Once a driver begins on-duty status after 10 consecutive hours off, they have a **14-hour window** in which all driving must be completed. After 14 hours have elapsed since the driver came on duty, **no further driving is permitted** — even if the driver has not used all 11 driving hours.

:::important
The 14-hour window **cannot be extended** by taking breaks, going off duty, or using the sleeper berth (with limited exceptions under the split-sleeper provision). Time keeps running from the moment you start your on-duty day.
:::

### 3. The 30-Minute Break Requirement

A driver may not drive after **8 cumulative hours of driving** without taking a break of at least **30 consecutive minutes**. This break may be satisfied by any period of 30 consecutive minutes of off-duty time, sleeper berth time, or on-duty not driving time.

### 4. The 60/70-Hour Limit

- **60-Hour/7-Day Limit** — Drivers for carriers that do NOT operate every day of the week may not drive after accumulating 60 hours on duty in any 7 consecutive days.
- **70-Hour/8-Day Limit** — Drivers for carriers that operate every day of the week may not drive after accumulating 70 hours on duty in any 8 consecutive days.

### 5. The 34-Hour Restart

A driver may reset their 60-hour or 70-hour clock by taking **34 or more consecutive hours off duty**. After a valid restart, the accumulated on-duty hours reset to zero.

## Sleeper Berth Provisions

Drivers using a sleeper berth may split their required 10 hours off duty into two periods, provided:

- One period is **at least 7 consecutive hours** in the sleeper berth
- The other period is **at least 2 consecutive hours** either off duty, in the sleeper berth, or a combination
- The two periods together total at least 10 hours
- Neither period counts against the 14-hour driving window when paired

## Electronic Logging Devices (ELDs)

The **ELD Mandate** (49 CFR Part 395) requires most CMV drivers to use certified Electronic Logging Devices to record their hours of service. ELDs automatically track engine hours, vehicle movement, miles driven, and location data.

![Control room monitoring and compliance](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80)

### ELD Requirements

- Must be registered and listed on the FMCSA's registered ELD list
- Must automatically record driving time when the vehicle moves
- Cannot be tampered with or disconnected (violations carry severe penalties)
- Data must be available for roadside inspection via display, printout, or file transfer
- Records must be retained for **6 months**

### Exemptions from ELD Mandate

- Drivers who use paper RODS not more than 8 days in any 30-day period
- Driveaway-towaway operations where the vehicle is the commodity
- Vehicles manufactured before model year 2000
- Drivers operating under the short-haul exception (CDL: 150 air-mile radius, non-CDL: 150 air-mile radius)

## HOS and CouthActs Integration

CouthActs does not manage your ELD compliance directly, but the platform's tracking system creates a complementary digital record:

- **Job acceptance timestamps** show when you agreed to a job
- **MOBILE_GPS tracking** records your actual driving periods
- **Status updates** (en route, at pickup, at delivery) align with on-duty activities
- **Job completion timestamps** document when work was finished

:::tip
When bidding on CouthActs jobs, **calculate your available driving hours** before committing. Accepting a job you cannot legally complete within your remaining HOS window will result in a late delivery, a lower On-Time Rate, and potential HOS violations. Factor in realistic loading/unloading times and potential delays.
:::

## Common HOS Violations and How to Avoid Them

1. **Driving beyond the 11-hour limit** — Plan your routes with realistic drive times. Account for traffic and weather.
2. **Exceeding the 14-hour window** — Do not start your day early at a shipper that takes 4 hours to load you. That eats your driving window.
3. **Missing the 30-minute break** — Set a reminder at 7.5 hours of driving. Pull over safely and take the break.
4. **Falsifying logs** — ELDs have made this far more difficult, but any attempt to tamper with records is a federal offense that can end your career permanently.
5. **Running the clock to zero** — Always maintain a buffer. Planning to arrive with exactly 0 minutes remaining leaves no margin for the unexpected.

---

Hours of Service rules are not obstacles — they are guardrails that protect you, other motorists, and your livelihood. Master them, plan around them, and never compromise them for a load. No job is worth a fatigue-related crash.` },
        { title: "Cargo Securement — FMCSA 393.100 Standards", order: 4, durationMins: 20, content: `## The Stakes of Proper Cargo Securement

Improperly secured cargo kills. The FMCSA estimates that cargo securement failures contribute to approximately **700 fatalities and 16,000 injuries** annually on U.S. highways. Shifting loads cause rollovers, falling debris strikes other vehicles, and unbalanced cargo makes vehicles uncontrollable during emergency maneuvers.

![Cargo operations at a shipping port](https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80)

Federal Motor Carrier Safety Regulation **49 CFR 393.100-136** establishes the minimum standards for securing cargo on commercial motor vehicles. These are not guidelines — they are enforceable requirements, and violations result in fines, out-of-service orders, and liability exposure.

## Core Securement Principles

### Performance Criteria (393.100)

Cargo must be secured so it cannot:

- **Leak, spill, blow off, or fall** from the vehicle
- **Shift or tip** to the extent that vehicle stability or maneuverability is adversely affected
- **Fall through or penetrate** the vehicle structure

The securement system must withstand the following forces without failure:

- **Forward: 0.8g** (80% of cargo weight)
- **Rearward: 0.5g** (50% of cargo weight)
- **Sideways: 0.5g** (50% of cargo weight)
- **Vertically upward: 0.2g** (20% of cargo weight)

### Working Load Limit (WLL) Requirements

The **aggregate Working Load Limit** of all tiedowns used to secure an article or group of articles must be at least **50% of the weight of the article or group**. This is the cornerstone calculation for cargo securement.

:::important
**WLL is NOT the breaking strength.** The Working Load Limit is typically one-third of the breaking strength. A chain rated at 15,000 lbs breaking strength has a WLL of 5,000 lbs. Always use the WLL marked on the tiedown — never the breaking strength — when calculating securement.
:::

## Tiedown Types and Their WLL Ratings

### Chain

- **Grade 43 (High Test)** — WLL ranges from 2,600 lbs (5/16") to 12,000 lbs (5/8")
- **Grade 70 (Transport)** — WLL ranges from 3,150 lbs (5/16") to 15,800 lbs (5/8")
- **Grade 80 and 100 (Alloy)** — Higher WLL per size, used for overhead lifting and specialized securement

### Synthetic Web Straps

- Standard 2-inch strap: **3,333 lbs WLL** (typical)
- Standard 4-inch strap: **5,400 lbs WLL** (typical)
- Always check manufacturer tags — WLL varies by material and construction

### Wire Rope

- 3/8" wire rope: approximately **2,400 lbs WLL**
- 1/2" wire rope: approximately **4,200 lbs WLL**
- Must use proper thimbles and clips — three clips minimum with U-bolt on the dead end ("never saddle a dead horse")

### Binders

- **Lever (snap) binders** — Apply chain tension mechanically. Must be rated for the chain grade in use.
- **Ratchet binders** — Provide more precise tensioning. Generally preferred for controlled application.

:::warning
**Never mix chain grades.** A Grade 70 chain paired with a Grade 43 binder creates a system limited to the weaker component. Your securement is only as strong as its weakest link — literally.
:::

## Blocking, Bracing, and Friction

### Blocking

Physical barriers placed against cargo to prevent movement. Blocking must be secured to the vehicle deck and must fill all gaps between cargo and the vehicle structure in the direction being blocked.

### Bracing

Structural members placed diagonally or laterally to resist cargo movement. Bracing transfers forces from the cargo to the vehicle structure.

### Friction

The cargo's contact with the deck surface generates friction that resists sliding. Higher friction surfaces (rubberized mats, rough wood) reduce the number of tiedowns needed. Coefficient of friction for common surfaces:

- Rubber on wood: **0.6-0.7**
- Wood on wood: **0.3-0.5**
- Metal on metal: **0.2-0.3**
- Metal on wood: **0.2-0.5**

![Warehouse with cargo ready for transport](https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=80)

## Securement by Commodity Type

### Logs (393.116)
- Center of highest outside log must not exceed 33 inches above the bunk
- Must use minimum two tiedowns per stack

### Dressed Lumber/Building Products (393.118)
- Bundles must be unitized and banded
- Minimum two tiedowns for first 10 feet, one additional for each additional 10 feet

### Metal Coils (393.120)
- Eye-to-deck must prevent shifting in all directions
- Coils with eyes crosswise require a minimum of 3 tiedowns; coils with eyes lengthwise require 2 minimum

### Intermodal Containers (393.132)
- Must be secured to the chassis by all four corners with twist locks or equivalent
- Container weight must not exceed chassis GVWR

## CouthActs Cargo Documentation

For every freight, heavy haul, or cargo job on CouthActs, document your securement:

1. **Pre-departure photos** via DOCUMENT_POD_AI showing all tiedowns in place
2. **Cargo weight notation** in the job tracking notes
3. **Securement method** recorded (chains, straps, blocking, or combination)
4. **In-transit checks** — Stop and re-inspect securement within the first 50 miles, then every 150 miles or 3 hours (whichever comes first) per 49 CFR 392.9

:::tip
Timestamped DOCUMENT_POD_AI photos of your cargo securement are powerful evidence if a customer disputes cargo condition at delivery. They also demonstrate professionalism that earns higher reviews.
:::

---

Cargo securement is a math problem with life-or-death consequences. Know your cargo weight, know your tiedown ratings, calculate the aggregate WLL, and verify with physical inspection. No load is worth rushing this process.` },
        { title: "Accident Prevention and Defensive Driving", order: 5, durationMins: 20, content: `## The Reality of Commercial Vehicle Crashes

The FMCSA's Large Truck Crash Causation Study found that **driver error is the critical reason** in approximately **87% of crashes** involving large trucks. Not mechanical failure. Not road conditions. Driver decisions. This means that the vast majority of crashes are **preventable** through proper training, awareness, and defensive driving techniques.

![Highway safety requires constant vigilance](https://images.unsplash.com/photo-1494412574643-ff11b0a5eb95?w=1200&q=80)

As a CouthActs provider, every crash — whether your fault or not — impacts your business through vehicle downtime, insurance increases, legal costs, and CouthActs Score degradation. Defensive driving is not passive — it is an aggressive commitment to preventing crashes before they develop.

## The Smith System: Five Keys to Safe Driving

Developed by Harold Smith in 1952, the **Smith System** remains the gold standard for professional defensive driving. These five principles apply whether you are operating a tractor-trailer, a delivery van, a taxi, or any other commercial vehicle.

### 1. Aim High in Steering

Look far ahead — **15-20 seconds** of travel time down the road. For highway driving at 60 mph, that means scanning approximately **1,300-1,800 feet ahead**. For city driving at 30 mph, scan at least **650-900 feet ahead**.

Aiming high prevents "target fixation" — the tendency to steer toward whatever you are staring at. It gives you maximum time to identify and respond to hazards.

### 2. Get the Big Picture

Maintain awareness of the **entire driving environment**, not just the vehicle directly ahead of you. Check mirrors every **5-8 seconds**. Monitor vehicles in adjacent lanes. Watch for merging traffic, pedestrians, and road debris.

For commercial vehicles, the "big picture" includes:

- All four mirrors plus any camera systems
- The condition of vehicles ahead (brake lights, swerving, slowing)
- Entry and exit ramps
- Construction zones and lane changes
- Bridge heights, weight limits, and curve advisories

### 3. Keep Your Eyes Moving

Do not fixate on any single object for more than **2 seconds**. Your eyes should continuously scan: far ahead, near ahead, mirrors, instruments, mirrors, far ahead again. This scanning pattern keeps your brain processing new information and prevents highway hypnosis.

### 4. Leave Yourself an Out

Always maintain a **space cushion** around your vehicle. You should have at least one viable escape route at all times — a lane to move into, a shoulder to use, or enough following distance to stop.

:::important
For commercial vehicles, the **minimum following distance** is **one second per 10 feet of vehicle length** at speeds below 40 mph, plus one additional second above 40 mph. A 70-foot tractor-trailer at 60 mph needs a minimum following distance of **8 seconds** (7 seconds for length + 1 for speed). In adverse conditions, double it.
:::

### 5. Make Sure They See You

Use your horn, lights, and signals to communicate your presence and intentions. Assume other drivers **cannot see you** until proven otherwise. Key practices:

- Flash headlights when approaching blind curves on two-lane roads
- Use signals well in advance of turns and lane changes — at least **500 feet** on highways
- Make eye contact with drivers at intersections before proceeding
- Use four-way flashers when stopped on the shoulder or moving significantly below traffic speed

## Speed Management

Speed is a factor in approximately **29% of all fatal crashes**. For commercial vehicles, the physics are unforgiving: a fully loaded 80,000-pound truck traveling at 65 mph requires approximately **525 feet** to stop on dry pavement — nearly **two football fields**.

### Speed Management Rules

- **Always obey posted limits** — they are maximums, not targets
- **Reduce speed in curves** — posted curve speeds are for passenger cars, not CMVs
- **Slow down in adverse conditions** — reduce speed by one-third on wet roads and by one-half or more on snow/ice
- **Descend grades in a gear low enough** to control speed without excessive braking — **never ride the brakes** down a long grade

![Fleet vehicles in a controlled environment](https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1200&q=80)

:::warning
CouthActs MOBILE_GPS tracking records your speed data throughout every job. Sustained speeds significantly above posted limits are flagged in the system and can affect your Safety metrics. The platform's GPS monitoring is designed to promote compliance, not surveillance — but the data exists and can be referenced in dispute resolution.
:::

## Intersection and Turning Safety

Intersections are the most dangerous environments for commercial vehicles. FMCSA data shows that **approximately 30% of fatal large truck crashes occur at intersections**.

- **Right turns** — Establish position in the rightmost lane. Swing wide only when necessary for trailer tracking. Check right mirror continuously for vehicles and pedestrians squeezing into the gap.
- **Left turns** — Wait for a gap large enough to complete the turn without forcing other drivers to brake.
- **Stale green lights** — If the light has been green for a while, prepare to stop. Running yellows in a CMV is extremely dangerous due to stopping distance.

## Backing Safely

Backing crashes are the most common preventable crash type for commercial vehicles.

1. **GOAL: Get Out And Look** — Always exit the cab and walk the intended backing path before starting
2. Use a spotter when available — agree on hand signals before beginning
3. Back toward the driver's side whenever possible
4. Check mirrors constantly — alternate between both sides every few seconds
5. Stop immediately if you lose sight of your reference points

:::tip
On CouthActs, every pickup and delivery involves a backing or parking maneuver. Documenting a clean approach and departure via DOCUMENT_POD_AI photo updates demonstrates professional care that customers remember when leaving reviews.
:::

---

Defensive driving is not about being timid — it is about being proactive, aware, and in control. The best drivers are not the fastest. They are the ones who arrive at every destination without incident, every time, for an entire career.` },
        { title: "Emergency Response Procedures", order: 6, durationMins: 20, content: `## The First Five Minutes Matter Most

In any transportation emergency — a crash, breakdown, cargo spill, medical event, or fire — the actions you take in the **first five minutes** determine outcomes for everyone involved. Panic and inaction cost lives. A rehearsed, systematic response saves them.

Every CouthActs provider must know exactly what to do when things go wrong. This lesson covers the immediate response procedures for the most common transportation emergencies.

![Safety equipment for emergency response](https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80)

## The Universal 5-Step Emergency Response

Regardless of the emergency type, follow these five steps in order:

1. **SECURE THE SCENE** — Turn off the engine (unless doing so would create a greater hazard). Activate hazard flashers. Set the parking brake. If the vehicle is on fire, turn off the engine and move away.
2. **ASSESS THE SITUATION** — Determine the type and severity of the emergency. Are there injuries? Is there fire? Is cargo spilling? Are other vehicles involved?
3. **CALL FOR HELP** — Dial 911 for any crash involving injuries, fire, hazardous materials, or blocked roadways. Report your exact location using mile markers, GPS coordinates, or cross streets.
4. **PROTECT THE SCENE** — Place reflective warning triangles to alert approaching traffic. Assist injured persons only if you are trained and it is safe to do so.
5. **DOCUMENT EVERYTHING** — Once the scene is safe and help is en route, begin documenting with photos, notes, and witness information.

## Reflective Warning Triangles: The Rules

Federal regulation **49 CFR 392.22** requires that when a CMV is stopped on the traveled portion of a highway or shoulder, the driver must place three reflective warning triangles as follows:

- **Within 10 minutes** of stopping
- One triangle **10 feet** behind the vehicle (or in front if stopped on a one-way road)
- One triangle **100 feet** behind the vehicle
- One triangle **200 feet** behind the vehicle

### Special Placement Rules

- **On a divided highway or one-way road** — Triangles go 10, 100, and 200 feet behind the vehicle
- **On an undivided two-lane road** — Triangles go 100 feet ahead, 10 feet behind, and 100 feet behind
- **Near a hill, curve, or obstruction** — Place the farthest triangle at 100-500 feet to give approaching traffic adequate warning
- **On the road or shoulder** — Triangles must be placed on the traffic side

:::warning
Failure to deploy warning triangles within 10 minutes is a federal violation. More critically, it leaves approaching drivers — many traveling at 65+ mph — with almost no warning of a stopped vehicle ahead. Rear-end crashes into stopped CMVs are among the deadliest highway incidents.
:::

## Crash Response Procedures

### Immediately After a Crash

1. Check yourself for injuries. Do not attempt to move if you have neck or back pain.
2. Turn off the engine and activate hazard flashers.
3. Check on other involved parties if it is safe to approach.
4. Call 911. Request ambulance if there are any injuries.
5. Do **not** move vehicles unless they present an immediate hazard to other traffic (check your state's laws — some require you to move vehicles out of travel lanes for minor crashes).
6. Place reflective triangles.
7. Exchange information: name, license number, insurance, vehicle registration, carrier name, and USDOT number.
8. Photograph all vehicles, damage, skid marks, road conditions, traffic signals, and any visible injuries.
9. Get names and contact information from witnesses.
10. **Do not admit fault** or make statements about the cause of the crash to anyone other than law enforcement.

### CouthActs SOS Feature

For **critical emergencies** — crashes with injuries, vehicle fires, cargo spills involving hazardous materials, or any situation where you or others are in immediate danger — activate the **CouthActs SOS feature** directly from the active job screen.

:::important
The SOS feature immediately alerts the CouthActs operations team, notifies the customer, and begins recording a timestamped incident log. It also flags your GPS location for emergency services coordination. Use it for genuine emergencies — false SOS activations will affect your account standing.
:::

## Vehicle Fire Response

Vehicle fires can escalate from smoke to fully engulfed in **under 3 minutes**.

1. Pull over immediately and **get away from the vehicle** — at least 200 feet
2. Turn off the engine
3. **Do not open the hood** if fire is in the engine compartment — the rush of oxygen can cause a flashover
4. Use your fire extinguisher **only** if the fire is small and contained, and you have a clear escape path behind you
5. Call 911 — fire department response is essential even for small fires
6. If hauling cargo, inform responders of the cargo type and quantity

### Fire Extinguisher Requirements

CMVs must carry a fire extinguisher rated at minimum **5 B:C** (or **10 B:C** for vehicles carrying hazardous materials). The extinguisher must be:

- Securely mounted and readily accessible
- Inspected annually (tag must be current)
- Charged (gauge in the green zone)

![Highway emergency response scenario](https://images.unsplash.com/photo-1494412574643-ff11b0a5eb95?w=1200&q=80)

## Tire Blowout Response

1. **Do not brake** — grip the steering wheel firmly with both hands
2. **Accelerate slightly** to maintain control and stability
3. Allow the vehicle to slow gradually
4. Steer gently to the shoulder once speed has decreased
5. Apply brakes only after the vehicle is under control and nearly stopped

## Medical Emergency Response

If a driver or passenger experiences a medical emergency:

- Pull over safely and secure the vehicle
- Call 911 immediately
- If trained in CPR/first aid, provide assistance
- Activate the CouthActs SOS feature
- Do not administer medication to others unless you are a certified medical provider

## HAZMAT Emergency Numbers

For incidents involving hazardous materials, in addition to 911, contact:

- **CHEMTREC: 1-800-424-9300** — 24/7 emergency response for chemical spills
- **National Response Center: 1-800-424-8802** — For reporting oil and chemical spills (required by law)
- **Poison Control: 1-800-222-1222** — For exposure or ingestion incidents

:::tip
Program these numbers into your phone before you need them. In a HAZMAT emergency, seconds matter. Also keep a physical card with these numbers in your cab — your phone may be damaged or inaccessible.
:::

---

Emergencies are chaotic by nature. The only antidote to chaos is preparation. Review these procedures regularly, keep your emergency equipment maintained and accessible, and practice the sequence mentally. When the moment comes, your training will take over.` },
        { title: "Weather and Road Hazard Decision-Making", order: 7, durationMins: 20, content: `## The Decision That Matters Most: Should You Go?

Weather-related crashes cause approximately **5,900 fatalities and 445,000 injuries** annually in the United States, according to the Federal Highway Administration. For commercial vehicle operators, the stakes are even higher — the physics of 80,000-pound vehicles on wet, icy, or wind-swept roads are profoundly unforgiving.

The most important safety decision a transportation professional makes is not how to drive in bad weather — it is **whether to drive at all**.

![Storm approaching — decision time for drivers](https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=1200&q=80)

:::key
Under 49 CFR 392.14, a CMV driver must use "extreme caution" when hazardous conditions exist. If conditions are sufficiently dangerous, **you have the legal right and obligation to stop**. No dispatcher, customer, or CouthActs job deadline overrides your responsibility to operate safely. FMCSA regulation explicitly protects drivers who refuse to operate in unsafe conditions from coercion or retaliation.
:::

## Rain and Hydroplaning

### The Danger

Rain is the most common adverse weather condition and the most underestimated. The first 10-15 minutes of rainfall are the **most dangerous** because water mixes with oil, rubber, and road grime to create an extremely slippery film.

**Hydroplaning** occurs when a layer of water builds between the tire and the road surface, causing the tire to lose contact. It can begin at speeds as low as **35 mph** with as little as **1/12 inch of water** on the road.

### Defensive Measures

- **Reduce speed by one-third** on wet roads
- **Increase following distance to double** the normal minimum
- **Stay in established tire tracks** where water has been displaced
- **Avoid standing water** — even shallow puddles can hide potholes or debris
- **Do not use cruise control** — if you hydroplane, cruise control will accelerate the drive wheels
- **If you hydroplane**: do not brake, do not accelerate, hold the steering wheel steady, and allow the vehicle to slow naturally until tires regain contact

## Snow and Ice

### The Danger

Stopping distance on ice can be **10 times greater** than on dry pavement. A tractor-trailer that stops in 300 feet on dry road may need **3,000 feet on ice** — over half a mile.

Black ice — a thin, transparent layer of ice on the road surface — is particularly treacherous because it is nearly invisible. It forms most commonly on bridges, overpasses, shaded areas, and near bodies of water.

### Defensive Measures

- **Reduce speed by one-half or more** on snowy or icy roads
- **Test traction gently** by lightly tapping the brakes in a safe, straight section
- **Do not use engine brakes (jake brakes)** on slippery surfaces — they can cause drive axle lockup and jackknife
- **Bridges and overpasses freeze first** — reduce speed before reaching them
- **Carry chains** when operating in chain-law states and know how to install them
- **Clear all snow and ice from your vehicle** before driving — snow flying off a truck is a serious hazard to other drivers and is illegal in many states

:::warning
**The jackknife threshold on ice is extremely low.** Any sudden input — hard braking, sharp steering, or aggressive acceleration — can cause the trailer to swing around. If you feel the trailer starting to slide, ease off the brakes, steer into the slide, and avoid sudden corrections.
:::

## Fog

### The Danger

Fog reduces visibility to near zero in extreme conditions. Multi-vehicle pileups in fog are among the deadliest highway incidents, with some involving **100+ vehicles**.

### Defensive Measures

- **Use low-beam headlights** — high beams reflect off fog particles and reduce visibility further
- **Reduce speed significantly** — you must be able to stop within the distance you can see
- **Use fog lights** if equipped
- **Turn off cruise control** — you need full, immediate control of your speed
- **Listen for traffic** you cannot see — roll down windows slightly at intersections
- **Do not stop on the road or shoulder** unless absolutely unavoidable — if you must stop, pull as far off the road as possible and turn off your lights (leave hazard flashers on) to prevent other drivers from following your tail lights into the stopped vehicle

## Wind

### The Danger

Crosswinds are a major hazard for high-profile vehicles. Empty trailers, dry vans, and flatbeds with lightweight cargo are especially vulnerable. Wind gusts of **40+ mph** can overturn an empty trailer. Loaded trailers can be overturned by sustained winds of **60+ mph** depending on the load profile.

### Defensive Measures

- **Reduce speed** — wind force increases exponentially with vehicle speed
- **Grip the steering wheel firmly** with both hands
- **Be especially cautious** when exiting tunnels, passing through gaps in tree lines, or crossing bridges where wind is funneled
- **Watch for flying debris** — trash, tree branches, and unsecured loads from other vehicles
- **Pull over and wait** if winds make the vehicle uncontrollable — no load is worth a rollover

![Highway conditions require constant assessment](https://images.unsplash.com/photo-1494412574643-ff11b0a5eb95?w=1200&q=80)

## When to Stop: The Decision Framework

Use this framework when conditions deteriorate:

1. **Can I see far enough ahead to stop safely?** If visibility is below your stopping distance, stop.
2. **Can I maintain control of the vehicle?** If the vehicle is sliding, swaying, or drifting despite reduced speed, stop.
3. **Are other vehicles crashing or losing control?** If you are witnessing incidents, conditions have already exceeded safe limits for many drivers. Stop.
4. **Has an official advisory been issued?** DOT road closure, NWS severe weather warning, or state patrol advisory — comply immediately.
5. **Does my gut say no?** Trust your experience. Professional drivers develop instincts calibrated by thousands of hours on the road.

:::tip
On CouthActs, if you must delay or stop due to weather, **immediately update your job status** with a weather delay note and notify the customer through the platform messaging. Proactive communication about safety delays almost always earns understanding — and a positive review. Saying nothing and arriving late does not.
:::

## Tracking Weather Updates

- **NOAA Weather Radio** — Available nationwide on VHF frequencies
- **NWS (weather.gov)** — Route-specific forecasts and hazard alerts
- **511 road condition hotlines** — Available in most states
- **CouthActs job notes** — Other providers may post road condition updates

---

Weather does not care about deadlines, bid amounts, or customer expectations. It is the one variable in transportation that cannot be negotiated with. The professional response to dangerous weather is always the same: slow down or stop. Live to deliver another day.` },
        { title: "Maritime Safety — IMO Standards", order: 8, durationMins: 20, content: `## The International Maritime Organization and Global Safety

Maritime transport carries approximately **90% of global trade**. The sheer scale of the industry — over 50,000 merchant ships operated by more than 1.5 million seafarers — demands a rigorous international safety framework. That framework is administered by the **International Maritime Organization (IMO)**, a specialized agency of the United Nations.

CouthActs supports maritime transport modes including **cargo ship, barge, and specialized vessel** operations. Whether you are a vessel owner, a charterer, or a freight forwarder booking maritime legs through the platform, understanding IMO safety standards is essential for compliance and effective risk management.

![Cargo ship at sea](https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1200&q=80)

## SOLAS: The Most Important Maritime Safety Treaty

The **International Convention for the Safety of Life at Sea (SOLAS)** is the most important international treaty concerning the safety of merchant ships. First adopted in 1914 after the Titanic disaster, SOLAS has been updated continuously, with the current version dating to 1974 and its numerous amendments.

SOLAS covers:

### Construction and Structural Integrity

- Ships must be designed and built to withstand the environmental forces they will encounter
- Double hulls are required for oil tankers above certain sizes
- Subdivision and damage stability requirements ensure the vessel can survive flooding of one or more compartments
- Fire-resistant bulkheads and structural fire protection

### Life-Saving Equipment

Every vessel must carry sufficient life-saving appliances for all persons on board:

- **Lifeboats** — Sufficient capacity for 100% of persons on board on each side
- **Life rafts** — Additional capacity, especially for vessels where lifeboats on one side may be inaccessible
- **Life jackets** — One for each person, plus additional for watch stations
- **Immersion suits** — Required in cold water zones
- **Lifebuoys** — Minimum of 8 on vessels over 200 meters, with at least 2 equipped with self-activating lights and smoke signals
- **EPIRBs (Emergency Position Indicating Radio Beacons)** — Automatically activated when submerged, transmitting vessel identity and position to search and rescue authorities via satellite

### Fire Safety

- **Fire detection systems** — Smoke detectors, heat detectors, and manual call points
- **Fixed fire-fighting systems** — CO2, foam, or water sprinkler systems in machinery spaces, cargo holds, and accommodation areas
- **Portable fire extinguishers** — Strategically placed throughout the vessel
- **Fire drills** — Required at least monthly, with all crew participating

### Navigation Safety

- **Radar** — Required on all vessels over 300 GT (gross tonnage)
- **ECDIS (Electronic Chart Display and Information System)** — Now mandatory for most commercial vessels
- **AIS (Automatic Identification System)** — Required on all vessels over 300 GT on international voyages
- **GMDSS (Global Maritime Distress and Safety System)** — Radio communication equipment for distress alerting and safety communications
- **VDR (Voyage Data Recorder)** — The "black box" of shipping, recording navigational data, bridge audio, and radar images

:::important
**AIS tracking** is directly integrated into CouthActs maritime bookings through the **AIS_MARITIME tracking layer**. When a maritime job is active, the vessel's AIS transponder data feeds into the CouthActs tracking page, providing real-time position updates to the customer. This transparency builds trust and provides documentary evidence of route compliance.
:::

## The ISM Code: Safety Management Systems

The **International Safety Management (ISM) Code** requires shipping companies to establish a Safety Management System (SMS) that includes:

1. **Safety and environmental protection policy** — A documented commitment from the highest level of management
2. **Designated Person Ashore (DPA)** — A senior shore-based person with direct access to the highest level of management, responsible for monitoring safety
3. **Defined responsibilities and authority** for all personnel involved in safety
4. **Procedures for key shipboard operations** — Navigation, cargo handling, emergency response
5. **Emergency preparedness** — Documented procedures for all foreseeable emergencies
6. **Accident and non-conformity reporting** — Systems for investigating and correcting safety failures
7. **Maintenance procedures** — Planned maintenance systems for vessel and equipment
8. **Documentation control** — Ensuring all relevant documents are available and current
9. **Internal audits and management reviews** — Regular self-assessment of safety performance

![Port operations and vessel safety](https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80)

### Document of Compliance (DOC) and SMC

Companies that comply with the ISM Code receive a **Document of Compliance (DOC)** from their flag state. Individual vessels receive a **Safety Management Certificate (SMC)**. Both must be valid for a vessel to operate legally in international waters.

## MARPOL: Environmental Protection

While primarily an environmental convention, **MARPOL (International Convention for the Prevention of Pollution from Ships)** has significant safety implications:

- **Annex I** — Regulations for the prevention of pollution by oil
- **Annex II** — Control of pollution by noxious liquid substances
- **Annex III** — Prevention of pollution by harmful substances in packaged form
- **Annex IV** — Prevention of pollution by sewage
- **Annex V** — Prevention of pollution by garbage
- **Annex VI** — Prevention of air pollution (including the 2020 sulfur cap of 0.50%)

## STCW: Seafarer Training and Certification

The **International Convention on Standards of Training, Certification and Watchkeeping for Seafarers (STCW)** establishes minimum standards for:

- Master and officer certification
- Ratings certification
- Mandatory minimum training (basic safety, firefighting, survival craft, first aid)
- Watchkeeping standards
- Rest hour requirements (minimum 10 hours rest in any 24-hour period)

:::tip
When booking maritime transport through CouthActs, verify that the vessel and crew hold valid SOLAS certifications, a current SMC, and that the company holds a valid DOC. CouthActs maritime providers at the **Trusted tier and above** must maintain current safety documentation. Request this verification through the platform before committing to high-value shipments.
:::

---

Maritime safety is an international system built on hard-won lessons from centuries of seafaring disasters. The regulatory framework is comprehensive — but compliance depends on the professionalism of every person in the chain, from vessel owner to booking agent. Know the standards, verify compliance, and never compromise on maritime safety.` },
        { title: "Aviation Safety — FAA Standards", order: 9, durationMins: 20, content: `## Aviation Safety in Commercial and Charter Operations

Aviation has the **lowest fatality rate per mile** of any transport mode — a testament to an extraordinarily rigorous safety culture built on regulations, technology, training, and uncompromising standards. The Federal Aviation Administration (FAA) oversees all civil aviation in the United States, and its regulations form the framework that CouthActs aviation providers must comply with.

CouthActs supports **private jet, helicopter, air charter, and air cargo** transport modes. Whether you are an operator providing aircraft services or a customer booking aviation transport, understanding the FAA safety framework ensures safe, legal, and professional operations.

![Private jet on the tarmac](https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1200&q=80)

## Pilot Certification and Requirements

### Certificate Types

- **Private Pilot** — May not be compensated for flying. Not applicable to CouthActs commercial operations.
- **Commercial Pilot** — May be compensated. Required minimum for most CouthActs aviation jobs.
- **Airline Transport Pilot (ATP)** — Highest level of certification. Required for operations under 14 CFR Part 121 (scheduled airlines) and for Pilot-in-Command under Part 135.

### Medical Certificates

Pilots must hold a valid **FAA Medical Certificate** appropriate to their operations:

- **First-Class Medical** — Required for ATP operations. Valid for 12 months (under 40) or 6 months (40+)
- **Second-Class Medical** — Required for commercial operations. Valid for 12 months.
- **Third-Class Medical** — Sufficient for private operations only.

### Currency Requirements

Beyond certification, pilots must maintain currency:

- **Flight review** — Required every 24 calendar months (per 14 CFR 61.56)
- **Passenger-carrying currency** — 3 takeoffs and landings within the preceding 90 days (day) or 3 takeoffs and landings to a full stop at night within 90 days (night)
- **Instrument currency** — 6 approaches, holding procedures, and intercepting/tracking within 6 calendar months

## Aircraft Airworthiness

### Airworthiness Certificate

Every aircraft must hold a valid **Airworthiness Certificate** issued by the FAA. This is a one-time issuance that remains valid as long as the aircraft is maintained in accordance with approved maintenance programs.

### Required Inspections

- **Annual Inspection** — Required for all aircraft (14 CFR 91.409). Must be performed by an IA (Inspection Authorization) holder.
- **100-Hour Inspection** — Required for aircraft used for hire (in addition to the annual). This applies to most CouthActs aviation operations.
- **Progressive Inspections** — An approved alternative to annual/100-hour for larger operations.
- **Airworthiness Directives (ADs)** — Mandatory modifications or inspections issued by the FAA when unsafe conditions are discovered. Compliance is not optional.

:::important
Under CouthActs, aviation providers must maintain current airworthiness documentation and make it available upon request. The platform's verification process for aviation providers includes confirmation of aircraft registration, airworthiness certificate, and operator certificates. Operating an unairworthy aircraft is a **federal crime** carrying potential imprisonment and substantial fines.
:::

## 14 CFR Part 91 and Part 135 Operations

### Part 91 — General Operating Rules

All civil flights in the United States must comply with **Part 91**, which covers:

- Visual Flight Rules (VFR) and Instrument Flight Rules (IFR) operating procedures
- Minimum safe altitudes
- Right-of-way rules
- Speed restrictions (250 knots below 10,000 feet MSL, 200 knots below 2,500 feet within 4 NM of a Class C/D airport)
- Equipment requirements
- Fuel reserves (VFR day: 30 minutes; VFR night: 45 minutes; IFR: 45 minutes)
- Preflight planning requirements

### Part 135 — Commuter and On-Demand Operations

Most CouthActs charter and air cargo operations fall under **Part 135**, which imposes additional requirements beyond Part 91:

- **Operations Specifications (OpSpecs)** — Issued by the FAA, defining exactly what the operator is authorized to do
- **Crew rest requirements** — More restrictive than Part 91
- **Duty time limitations** — Maximum flight time and required rest periods
- **Maintenance programs** — Must be approved by the FAA
- **Minimum equipment lists (MELs)** — Defining what equipment can be inoperative for dispatch
- **Training programs** — Initial and recurrent training for all crew members
- **Drug and alcohol testing** — Mandatory random testing program

![Control room monitoring flight operations](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80)

## ADS-B: NextGen Surveillance

**Automatic Dependent Surveillance-Broadcast (ADS-B)** is the backbone of the FAA's NextGen air traffic system. Since January 1, 2020, ADS-B Out equipment is **mandatory** for operations in most controlled airspace.

### How ADS-B Works

- Aircraft GPS determines position
- ADS-B Out transponder **broadcasts** position, altitude, speed, and identification
- Ground stations and other aircraft receive the broadcast
- Air traffic control receives precise position data without relying on radar

### ADS-B and CouthActs

CouthActs aviation bookings integrate **FLIGHT_TRACKING** as a tracking layer, which leverages ADS-B data to provide real-time flight position to customers. This includes:

- Departure and arrival tracking
- En-route position updates
- Estimated time of arrival
- Altitude and speed data

:::tip
Aviation providers on CouthActs who enable FLIGHT_TRACKING for all bookings see **23% higher repeat booking rates** compared to those who do not. Customers value transparency, especially for high-value cargo and passenger charter operations.
:::

## Pre-Flight Requirements

Before every flight, the Pilot-in-Command must:

1. **Check weather** — Current METARs, TAFs, NOTAMs, PIREPs, and area forecasts for departure, en route, and destination
2. **Review NOTAMs** — Notices to Airmen for airport closures, navaid outages, TFRs (Temporary Flight Restrictions), and other hazards
3. **Calculate weight and balance** — Ensure the aircraft is within CG limits and below maximum takeoff weight
4. **Determine fuel requirements** — Fuel to destination plus reserves required by regulation
5. **File a flight plan** — Required for IFR flights, recommended for all flights
6. **Perform a pre-flight inspection** — Physical walk-around of the aircraft checking all systems, surfaces, and components
7. **Brief passengers** — Seat belts, emergency exits, no smoking, oxygen (if applicable)

---

Aviation safety is the product of a century of learning from tragedy and building systems to prevent recurrence. Every regulation exists because someone was hurt or killed in its absence. As a CouthActs aviation provider, your commitment to these standards is not just regulatory compliance — it is a professional obligation to the extraordinary safety record that makes commercial aviation the safest way to travel.` },
        { title: "Hazardous Materials Transport", order: 10, durationMins: 20, content: `## The Unique Risks of HAZMAT Transport

Hazardous materials transport is the highest-stakes discipline in the transportation industry. The materials are inherently dangerous — they can explode, ignite, corrode, poison, or irradiate. A single incident involving hazardous cargo can devastate communities, contaminate ecosystems, and generate liabilities measured in **hundreds of millions of dollars**.

The regulatory framework governing HAZMAT transport is correspondingly rigorous. The Pipeline and Hazardous Materials Safety Administration (PHMSA) under the U.S. Department of Transportation administers **49 CFR Parts 100-185**, commonly known as the Hazardous Materials Regulations (HMR). Every aspect of HAZMAT transport — classification, packaging, marking, labeling, placarding, documentation, loading, transport, and emergency response — is regulated in exhaustive detail.

![Safety gear for hazardous operations](https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80)

## The 9 Hazard Classes

The United Nations system classifies hazardous materials into nine classes, each with specific risks and handling requirements:

1. **Class 1 — Explosives**
- 1.1: Mass explosion hazard
- 1.2: Projection hazard
- 1.3: Fire hazard with minor blast/projection
- 1.4: Minor explosion hazard
- 1.5: Very insensitive explosives
- 1.6: Extremely insensitive articles

2. **Class 2 — Gases**
- 2.1: Flammable gases (propane, hydrogen)
- 2.2: Non-flammable, non-toxic gases (nitrogen, helium)
- 2.3: Toxic gases (chlorine, ammonia)

3. **Class 3 — Flammable Liquids** (gasoline, acetone, ethanol)

4. **Class 4 — Flammable Solids**
- 4.1: Flammable solids
- 4.2: Spontaneously combustible materials
- 4.3: Dangerous when wet

5. **Class 5 — Oxidizers and Organic Peroxides**
- 5.1: Oxidizers (can cause or enhance combustion)
- 5.2: Organic peroxides (thermally unstable, may decompose explosively)

6. **Class 6 — Toxic and Infectious Substances**
- 6.1: Toxic substances (pesticides, cyanides)
- 6.2: Infectious substances (biological agents)

7. **Class 7 — Radioactive Materials** (medical isotopes, nuclear fuel)

8. **Class 8 — Corrosives** (sulfuric acid, sodium hydroxide)

9. **Class 9 — Miscellaneous Dangerous Goods** (lithium batteries, dry ice, magnetized materials)

## HAZMAT Endorsement and Training

### CDL HAZMAT Endorsement (49 CFR 383.93)

Any driver transporting HAZMAT in quantities requiring placarding must hold a **CDL with a HAZMAT endorsement (H)**. Obtaining the endorsement requires:

- Passing a written knowledge test covering HAZMAT regulations
- Completing a **TSA security threat assessment** including fingerprinting and background check
- Renewal every **4 years** (aligning with the CDL renewal cycle in most states)

### Required Training (49 CFR 172.704)

All HAZMAT employees — not just drivers — must receive training in:

- **General awareness** — Familiarization with HMR requirements
- **Function-specific** — Detailed training on the specific HAZMAT functions performed
- **Safety** — Emergency response information, measures to protect against HAZMAT exposure
- **Security awareness** — Recognizing and responding to security threats
- **In-depth security** — Required for employees with security-sensitive functions

:::important
Training must be completed **within 90 days of employment or change in function**, with refresher training every **3 years**. Untrained personnel may perform HAZMAT functions only under the **direct supervision** of a properly trained employee.
:::

## Key Regulations: 49 CFR 172-180

### Part 172 — Hazardous Materials Table and Communications

The **Hazardous Materials Table (172.101)** is the master reference. It lists every regulated material by proper shipping name, hazard class, UN number, packing group, labeling requirements, and packaging authorizations.

### Shipping Papers (172.200-205)

Must include:
- Proper Shipping Name
- Hazard Class or Division
- UN/NA Identification Number
- Packing Group (if applicable)
- Total quantity by weight or volume
- Emergency response telephone number

### Marking and Labeling (172.300-338)

- Packages must display the UN number and proper shipping name
- Diamond-shaped hazard labels (100mm minimum) on each package
- Orientation arrows for liquids

### Placarding (172.500-560)

- Diamond-shaped placards (250mm minimum) on all four sides of the vehicle
- **Table 1 materials** (explosives 1.1-1.3, poison gas, dangerous when wet) require placarding for **any quantity**
- **Table 2 materials** require placarding when aggregate gross weight exceeds **1,001 lbs**

![Port with hazardous cargo operations](https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80)

## CouthActs HAZMAT Requirements

### Elite Protection Mandatory

All HAZMAT jobs on CouthActs require the customer to purchase **Elite Protection** — the platform's highest protection tier. This provides:

- Maximum cargo coverage
- Comprehensive liability protection
- Priority incident response
- Dedicated claims handling

### IoT Monitoring Integration

CouthActs HAZMAT bookings utilize the full tracking stack:

- **MOBILE_GPS** — Real-time vehicle position
- **IOT_DEVICE** — Temperature, humidity, shock, tilt, and pressure sensors for cargo condition monitoring
- **GEOFENCE** — Alerts when the vehicle enters or exits designated zones (mandatory for radioactive and explosive materials)
- **SATELLITE** — Backup positioning for remote areas without cellular coverage
- **QR_PIN** — Secure handoff verification at pickup and delivery
- **DOCUMENT_POD_AI** — Photo documentation of packaging condition, placarding, and loading

:::warning
CouthActs **will not process HAZMAT bookings** without verified HAZMAT credentials from the provider, Elite Protection purchase from the customer, and complete shipping documentation uploaded to the platform. Attempting to transport HAZMAT without proper documentation is a **federal criminal offense** carrying fines up to **$75,000 per violation** and imprisonment up to **5 years**.
:::

---

HAZMAT transport is a discipline where there is zero margin for error and zero tolerance for shortcuts. The regulations exist because the consequences of failure are catastrophic. If you choose to operate in this space, commit fully to the training, the documentation, and the operational discipline it demands. The CouthActs HAZMAT certification, combined with your CDL HAZMAT endorsement, positions you for the most lucrative — and most regulated — segment of the transportation industry.` },
        { title: "Safety Documentation and Record-Keeping", order: 11, durationMins: 20, content: `## Documentation Is Your Safety Net

In transportation, if it is not documented, it did not happen. This principle applies to safety with particular force. When an accident occurs, when a regulator audits your operation, when an insurance company investigates a claim, or when a customer disputes a delivery — the documentary record is the only truth that matters.

CouthActs providers who maintain thorough safety documentation protect themselves legally, score higher on compliance metrics, and build the kind of professional reputation that commands premium rates.

![Documentation and record-keeping essentials](https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80)

## Driver Qualification Files (49 CFR 391)

If you operate as a fleet or employ drivers, FMCSA regulations require you to maintain a **Driver Qualification (DQ) File** for each driver. The DQ file must contain:

### Required Documents

1. **Driver's application for employment** — Must include previous 3 years of employment history and 10 years of relevant employment
2. **Motor Vehicle Record (MVR)** — From each state where the driver held a license in the past 3 years. Annual MVR check required thereafter.
3. **Road test certificate** or equivalent (copy of CDL may substitute)
4. **Medical examiner's certificate** — Current DOT physical card (valid 2 years, or less with conditions)
5. **Annual review of driving record** — Employer must review MVR and certify driver meets minimum standards
6. **Previous employer safety performance history** — Accident record and drug/alcohol test results from previous DOT-regulated employers (past 3 years)
7. **Drug and alcohol test records** — Pre-employment, random, reasonable suspicion, post-accident, return-to-duty, and follow-up test documentation

### Retention Periods

- DQ files must be maintained for the **duration of employment plus 3 years** after termination
- Drug and alcohol records have varying retention periods: **5 years** for positive results, **1 year** for negative results

:::important
Failure to maintain proper DQ files is one of the most common violations found during **FMCSA compliance reviews**. Incomplete files can result in the driver being placed out of service and the carrier facing fines of up to **$16,000 per violation**. If you are a solo operator, you are both the "carrier" and the "driver" — your DQ file is still required.
:::

## Vehicle Maintenance Records (49 CFR 396)

### Systematic Inspection, Repair, and Maintenance

Every motor carrier must maintain a **systematic inspection, repair, and maintenance program** for all vehicles under its control. Documentation must include:

- **Vehicle identification** — Unit number, make, model, year, VIN, license plate
- **Inspection schedule** — Dates of all scheduled inspections
- **Inspection results** — Detailed findings from each inspection
- **Repairs performed** — Description of work, parts used, date completed, who performed the repair
- **Lubrication records** — Dates and types of lubrication service

### Driver Vehicle Inspection Reports (DVIRs)

Per 49 CFR 396.11, drivers must prepare a written report at the end of each driving day listing any defects or deficiencies discovered. Even if no defects are found, many carriers require a "no defect" report. The motor carrier must:

1. Review each DVIR
2. Repair any safety-affecting defects before the vehicle operates again
3. Sign the DVIR certifying that defects have been repaired or do not need repair
4. Retain DVIRs for **3 months**

### Annual Vehicle Inspections (49 CFR 396.17)

Every CMV must pass a **comprehensive annual inspection** conducted by a qualified inspector. The inspection must cover all items in Appendix G of 49 CFR 396. The inspection report must be retained for **14 months** and the vehicle must display a current inspection decal.

## ELD Logs and Supporting Documents

### ELD Records Retention

Electronic Logging Device data must be retained for a minimum of **6 months**. This includes:

- Daily driver logs (graph grid and all data elements)
- Supporting documents (fuel receipts, toll receipts, delivery receipts, dispatch records)
- ELD malfunction and diagnostic event records
- Driver certification of daily logs

### Supporting Documents

Per 49 CFR 395.11, drivers must retain supporting documents that can be used to verify ELD data:

- Bills of lading, shipping papers, or delivery receipts
- Fuel purchase receipts with location and date
- Toll receipts
- IVG (Integrated Vehicle Gateway) data, if available

![Fleet monitoring and compliance tracking](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80)

## CouthActs as a Digital Audit Trail

The CouthActs platform automatically generates a comprehensive digital record for every job that serves as a powerful supplementary audit trail:

### Tracking Events

Every tracking update creates a timestamped, geotagged record:

- **Job acceptance** — Date, time, provider identity
- **Pre-trip inspection photos** — Via DOCUMENT_POD_AI
- **Pickup confirmation** — Time, location, cargo photos
- **In-transit updates** — MOBILE_GPS position at regular intervals
- **Delivery confirmation** — Time, location, POD photos
- **Customer signature** — Digital proof of delivery acceptance

### Communication Records

All platform messages between provider and customer are retained and timestamped. This includes:

- Bid messages and negotiations
- Pickup and delivery coordination
- Delay notifications
- Issue reports and resolutions

### Financial Records

- Job amount and escrow status
- Payment release dates
- Dispute records and resolutions
- Invoice-equivalent transaction history

:::tip
**Download your CouthActs job history quarterly** and store it alongside your traditional safety records. In an audit or legal proceeding, the platform's timestamped, GPS-verified, photo-documented job records provide a level of detail that paper records cannot match. This is especially valuable for solo operators who may not have sophisticated fleet management systems.
:::

## Building a Record-Keeping System

Whether you are a solo operator or a fleet, establish a system:

1. **Daily** — Complete DVIRs, review ELD logs, upload job documentation
2. **Weekly** — Review the week's safety events, address any open defects
3. **Monthly** — Run reports on safety metrics, review driver performance
4. **Quarterly** — Audit DQ files, verify all certifications are current, download CouthActs records
5. **Annually** — Comprehensive vehicle inspections, update safety policies, review insurance

---

Documentation is not bureaucracy — it is the infrastructure of safety accountability. Every record you maintain is evidence that you operated professionally, legally, and safely. When the moment comes that someone questions your operation — and in transportation, that moment always comes — your records will speak for you.` },
        { title: "Building a Safety-First Provider Business", order: 12, durationMins: 20, content: `## Safety as Competitive Advantage

Throughout this course, we have covered the regulations, procedures, and technical knowledge required for safe transportation operations. This final lesson brings it all together: how to **build a provider business on CouthActs where safety is not just compliance, but your defining competitive advantage**.

The data is clear. CouthActs providers who complete the **Certified Transport Safety** course and maintain clean safety records outperform their peers on every business metric:

- **37% higher average job value** — customers pay more for verified safe providers
- **91.4 average CouthActs Score** — firmly in the Elite tier
- **2.3x more repeat customers** — trust drives loyalty
- **45% lower insurance costs** — clean records earn better rates
- **Zero average days lost to incidents** — compared to 12 days per year for providers with preventable incidents

![Professional fleet operations](https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1200&q=80)

## The CouthActs Safety Certification Badge

Upon passing the Certified Transport Safety exam, you earn the **Safety Certified** badge on your CouthActs provider profile. This badge signals to every customer viewing your profile:

- You have completed comprehensive safety training across all applicable transport modes
- You understand and comply with FMCSA, DOT, IMO, and FAA safety regulations
- You maintain professional safety documentation practices
- You are committed to continuous safety improvement

:::key
The Safety Certified badge is visible on your profile, in search results, and on every bid you submit. In CouthActs platform analysis, **bids from Safety Certified providers were accepted 28% more often** than equivalent bids from non-certified providers at the same price point. Customers actively seek out and prefer safety-certified transportation partners.
:::

## How Safety Impacts Every CouthActs Score Component

Your CouthActs Score (0-100) is the single most important factor in your platform success. Safety performance threads through every component:

### Completion Rate (25 points)

- Accidents cause incomplete jobs
- Vehicle breakdowns from poor maintenance force cancellations
- Out-of-service orders sideline your vehicle mid-job
- **Safety impact**: Proper pre-trip inspections and maintenance prevent breakdowns. Defensive driving prevents accidents. Both protect your Completion Rate.

### On-Time Rate (20 points)

- Crashes cause massive delays — often days, not hours
- HOS violations force mandatory rest stops that delay deliveries
- Weather incidents that could have been avoided with better decision-making
- **Safety impact**: HOS planning, route assessment, and weather monitoring keep you on schedule. The safest route is almost always the most reliable route.

### Review Average (20 points)

- Customers rate safety-conscious providers higher — consistently
- Professional vehicle appearance signals competence
- Documentation and communication demonstrate reliability
- **Safety impact**: Pre-trip photos, proactive updates, and professional handling earn 5-star reviews.

### Response Time (10 points)

- Safety incidents consume your time and attention, slowing response to new opportunities
- **Safety impact**: Incident-free operations keep you available and responsive.

### Verification (15 points)

- Safety certifications contribute to your verification score
- **Safety impact**: Completing this course and maintaining credentials strengthens your verified status.

### Tenure (10 points)

- Providers with safety violations are more likely to be suspended or deactivated
- **Safety impact**: A clean safety record keeps you on the platform, accumulating tenure.

## Building Safety Culture in Fleet Operations

If you operate or plan to operate a fleet, your safety culture must be systematic:

### Hiring for Safety

- Check driving records thoroughly — pattern violations are disqualifying
- Verify all credentials before the first trip
- Conduct road tests that specifically evaluate defensive driving habits
- Ask behavioral interview questions about past safety decisions

### Training and Development

- Require all drivers to complete CouthActs Academy safety courses
- Conduct monthly safety meetings — review incidents, near-misses, and best practices
- Assign ride-alongs for new drivers with your safest, most experienced operators
- Reward safety performance — bonuses for clean quarters, recognition for safety milestones

### Systems and Processes

- Implement a **daily pre-trip inspection verification** process
- Monitor ELD data for HOS compliance — address issues immediately, not after violations
- Track maintenance schedules rigorously — never defer safety-critical repairs
- Use CouthActs tracking data to review driver behavior — speed, route adherence, stop patterns

![Documentation supports safety excellence](https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80)

### Incident Management

1. **Report every incident** — including near-misses. Near-misses are free lessons.
2. **Investigate root causes** — not just what happened, but why. Was it fatigue? Distraction? Equipment failure? Training gap?
3. **Implement corrective actions** — change the process, not just the person
4. **Follow up** — verify that corrective actions were effective
5. **Share lessons** — anonymize if needed, but ensure the entire team learns from every event

:::warning
The most dangerous phrase in transportation is **"it has never happened before."** Every catastrophic incident was unprecedented — until it happened. Safety culture means preparing for the event that has not happened yet, not just repeating responses to events that have.
:::

## Your Safety Action Plan

As you complete this course and prepare for the certification exam, commit to these ongoing practices:

1. **Pre-trip inspection every trip** — No exceptions. Ever. It takes 15 minutes and prevents disasters.
2. **HOS compliance without exception** — Plan your schedule around the rules, not the other way around.
3. **Document everything** — Photos, notes, timestamps. Use CouthActs DOCUMENT_POD_AI for every job.
4. **Maintain your vehicle** — Follow the manufacturer's maintenance schedule. Fix defects immediately.
5. **Stay current on training** — Regulations change. Best practices evolve. Continuous learning is non-negotiable.
6. **Build relationships with other safety-focused providers** — Share knowledge, routes, and hazard information.
7. **Report hazards** — Road conditions, unsafe locations, equipment issues. Your report may save someone's life.

:::tip
After earning your Safety Certified badge, review your CouthActs profile. Update your bio to mention your safety certification and commitment to professional safety standards. Customers read profiles before accepting bids — and safety is a message that resonates universally.
:::

---

## Course Summary

Over these 12 lessons, you have studied:

- The business case and moral imperative for safety culture
- Pre-trip inspection protocols under 49 CFR 396.13
- FMCSA Hours of Service rules and ELD compliance
- Cargo securement standards per FMCSA 393.100
- The Smith System and defensive driving principles
- Emergency response procedures and the CouthActs SOS feature
- Weather and road hazard decision-making frameworks
- Maritime safety under IMO SOLAS standards
- Aviation safety under FAA regulations
- Hazardous materials transport requirements
- Safety documentation and record-keeping best practices
- Building a safety-first provider business

You are now prepared to take the **Certified Transport Safety exam**. Pass with 70% or higher to earn your Safety Certified badge and unlock the full benefits of safety-first provider status on CouthActs.

Safety is not a department. It is not a regulation. It is not a course. It is a **commitment** — one you make every morning when you start your engine, and one that defines the kind of professional you are. Make it count.` },
      ],
      examQuestions: [
        { question: "What federal regulation governs pre-trip inspections for commercial vehicles?", optionA: "49 CFR 396.13", optionB: "49 CFR 172", optionC: "FMCSA 393.100", optionD: "14 CFR Part 91", correctAnswer: "A", explanation: "49 CFR 396.13 requires pre-trip inspections for commercial motor vehicles.", order: 1 },
        { question: "What is the maximum driving hours allowed after 10 hours off duty?", optionA: "8 hours", optionB: "10 hours", optionC: "11 hours", optionD: "14 hours", correctAnswer: "C", explanation: "The 11-Hour Driving Limit allows driving up to 11 hours after 10 consecutive hours off duty.", order: 2 },
        { question: "What is the minimum aggregate Working Load Limit for tiedowns relative to cargo weight?", optionA: "25%", optionB: "50%", optionC: "75%", optionD: "100%", correctAnswer: "B", explanation: "FMCSA 393.100 requires aggregate WLL of tiedowns to be at least 50% of cargo weight.", order: 3 },
        { question: "At what speed can hydroplaning occur?", optionA: "25 mph", optionB: "35 mph", optionC: "45 mph", optionD: "55 mph", correctAnswer: "B", explanation: "Hydroplaning can occur at speeds as low as 35 mph with as little as 1/12 inch of water.", order: 4 },
        { question: "Which tracking layer do maritime bookings use?", optionA: "MOBILE_GPS", optionB: "FLIGHT_TRACKING", optionC: "AIS_MARITIME", optionD: "SATELLITE", correctAnswer: "C", explanation: "Maritime bookings use AIS_MARITIME for vessel position tracking.", order: 5 },
        { question: "What protection tier is required for HAZMAT jobs on CouthActs?", optionA: "Basic", optionB: "Standard", optionC: "Premium", optionD: "Elite", correctAnswer: "D", explanation: "Elite Protection tier is mandatory for HAZMAT transport on CouthActs.", order: 6 },
        { question: "How many reflective triangles should be placed behind a stopped commercial vehicle?", optionA: "1", optionB: "2", optionC: "3", optionD: "4", correctAnswer: "C", explanation: "Three reflective triangles at 10, 100, and 200 feet behind the vehicle.", order: 7 },
        { question: "Which CouthActs tracking layer provides temperature monitoring for HAZMAT?", optionA: "MOBILE_GPS", optionB: "IOT_DEVICE", optionC: "SATELLITE", optionD: "BIOMETRIC", correctAnswer: "B", explanation: "IOT_DEVICE provides temperature and condition monitoring for sensitive cargo.", order: 8 },
        { question: "What IMO convention governs safety of life at sea?", optionA: "MARPOL", optionB: "SOLAS", optionC: "STCW", optionD: "ISM", correctAnswer: "B", explanation: "SOLAS (Safety of Life at Sea) is the most important maritime safety treaty.", order: 9 },
        { question: "What CouthActs feature should be used in critical emergencies?", optionA: "Tracking update", optionB: "Dispute filing", optionC: "SOS feature", optionD: "Customer message", correctAnswer: "C", explanation: "The SOS feature escalates immediately to the CouthActs operations team for critical emergencies.", order: 10 },
      ],
    },

    /* ═══════════════════ COURSE 3: Hazardous Materials ═══════════════════ */
    {
      title: "Hazardous Materials Handling",
      slug: "hazardous-materials-handling",
      description: "Comprehensive HAZMAT training covering classification, packaging, documentation, placarding, emergency response, and CouthActs-specific HAZMAT workflows.",
      whatYouLearn: ["9 HAZMAT classes and their sub-divisions", "Packaging and labeling per 49 CFR 172-180", "Proper shipping paper preparation", "Emergency response using the ERG", "CouthActs HAZMAT posting and tracking workflows", "IoT condition monitoring for regulated materials"],
      category: "COMPLIANCE_SAFETY" as const, priceUsd: 99, duration: "3 hours", totalLessons: 8, level: "ADVANCED" as const,
      thumbnailUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
      lessons: [
        { title: "HAZMAT Classification — The 9 Classes", order: 1, durationMins: 20, content: "The United Nations divides hazardous materials into 9 classes based on their primary hazard. Understanding classification is the foundation of safe HAZMAT transport.\n\nClass 1 — Explosives: Divided into 6 divisions (1.1 mass explosion, 1.2 projection, 1.3 fire/minor blast, 1.4 minor explosion, 1.5 blasting agents, 1.6 extremely insensitive). Examples: dynamite, ammunition, fireworks.\n\nClass 2 — Gases: Division 2.1 (flammable — propane, acetylene), 2.2 (non-flammable/non-toxic — nitrogen, CO2), 2.3 (toxic — chlorine, ammonia).\n\nClass 3 — Flammable Liquids: Flash point below 60°C. Gasoline, acetone, alcohol, diesel (though diesel is also Class 3 with higher flash point).\n\nClass 4 — Flammable Solids: 4.1 (flammable solids), 4.2 (spontaneously combustible), 4.3 (dangerous when wet — sodium, lithium).\n\nClass 5 — Oxidizers: 5.1 (oxidizers — hydrogen peroxide, potassium permanganate), 5.2 (organic peroxides).\n\nClass 6 — Toxic/Infectious: 6.1 (toxic substances — pesticides, cyanide), 6.2 (infectious substances — medical waste, cultures).\n\nClass 7 — Radioactive: Any material with specific activity greater than 70 kBq/kg.\n\nClass 8 — Corrosives: Cause visible destruction of skin or corrode steel/aluminum. Battery acid, sulfuric acid, sodium hydroxide.\n\nClass 9 — Miscellaneous: Hazards not covered by other classes. Lithium batteries, magnetized materials, dry ice, environmentally hazardous substances.\n\nOn CouthActs, HAZMAT postings require the customer to specify the class, UN number, and quantity. This information appears on the job listing so you can verify you're qualified before bidding." },
        { title: "Packaging Requirements per 49 CFR 173", order: 2, durationMins: 20, content: "Proper packaging prevents incidents during normal transport conditions — vibration, stacking, temperature changes, and loading/unloading.\n\n49 CFR 173 establishes packaging requirements. Key principles:\n\nPerformance-Oriented Packaging Standards: Packaging must pass specific tests — drop test, stacking test, internal pressure test, vibration test. Each package type has a UN specification marking (e.g., UN1A1 for steel drums, UN4G for fiberboard boxes).\n\nPacking Groups determine the degree of danger:\n- PG I: Great danger (most stringent packaging)\n- PG II: Medium danger\n- PG III: Minor danger\n\nInner vs. Outer Packaging: Many HAZMAT materials require inner packaging (bottles, cans) inside outer packaging (boxes, drums) with absorbent material or cushioning between.\n\nQuantity Limitations: Some materials have per-package quantity limits for different transport modes (passenger aircraft, cargo aircraft, vessel).\n\nOn CouthActs, when you bid on a HAZMAT job, you confirm that your packaging meets the requirements for the specified material. Failure to properly package HAZMAT material can result in fines of $500,000+ and criminal prosecution. Always verify the UN specification marking on every package before transport." },
        { title: "Shipping Papers and Documentation", order: 3, durationMins: 20, content: "Shipping papers are the critical communication link between the shipper, the carrier, and emergency responders. Without proper documentation, you cannot legally transport HAZMAT.\n\n49 CFR 172.200 requires shipping papers to include:\n1. Proper Shipping Name (from the Hazardous Materials Table)\n2. Hazard Class or Division number\n3. UN/NA Identification Number (e.g., UN1203 for gasoline)\n4. Packing Group (I, II, or III)\n5. Total quantity (weight, volume, or count)\n6. Emergency response information or reference to ERG\n7. 24-hour emergency contact phone number\n\nPlacement: Shipping papers must be within the driver's reach at all times when the vehicle is moving, and on the driver's seat or in a holder on the driver's door when the driver is not in the vehicle.\n\nOn CouthActs, HAZMAT booking details include all required shipping paper information. When you accept a HAZMAT job, verify that the physical shipping papers match the digital booking details. Any discrepancy should be reported immediately through the tracking system before departing." },
        { title: "Placarding and Marking Requirements", order: 4, durationMins: 20, content: "Placards are the diamond-shaped signs on all four sides of a transport vehicle that identify the hazard class of the cargo. They are the first thing emergency responders look at when arriving at an incident.\n\n49 CFR 172.500 governs placarding:\n- Placards must be displayed on all four sides of the vehicle (front, rear, left, right).\n- Minimum size: 250mm x 250mm (approximately 10 inches).\n- Must be readable from 50 meters (approximately 165 feet).\n- Must be maintained in a condition that the color, symbols, and text are clearly visible.\n\nTable 1 materials (always placarded regardless of quantity): Explosives 1.1-1.3, Poison Gas 2.3, Dangerous When Wet 4.3, Organic Peroxide Type B, Toxic 6.1 (PG I), and Radioactive Yellow III.\n\nTable 2 materials (placarded when quantity exceeds 1,001 lbs aggregate): All other HAZMAT classes.\n\nThe DANGEROUS placard can substitute for individual class placards when carrying mixed loads of Table 2 materials — but ONLY if each material is under 5,000 lbs.\n\nOn CouthActs, HAZMAT tracking events should include a photo of the vehicle with placards visible. This creates proof of compliance that protects you in any investigation." },
        { title: "Loading, Unloading, and Compatibility", order: 5, durationMins: 20, content: "Improper loading of HAZMAT materials has caused some of the worst transportation disasters in history. Compatibility rules exist to prevent dangerous reactions.\n\n49 CFR 177.848 — Segregation and Separation Chart: This table defines which hazard classes can be loaded together and which must be separated.\n\nKey incompatibilities:\n- Oxidizers (5.1) must never be loaded with flammable liquids (3), flammable solids (4.1), or organic peroxides (5.2).\n- Acids (8) must be separated from bases (8).\n- Poisons (6.1) must be separated from food and animal feed.\n- Radioactive (7) has specific distance requirements from all other classes.\n\nLoading procedures:\n1. Verify compatibility before loading any mixed HAZMAT.\n2. Secure all packages to prevent movement — shifting HAZMAT cargo can rupture packaging.\n3. Never stack beyond the package's stacking limit (indicated on the UN marking).\n4. Ensure adequate ventilation for toxic or flammable gases.\n5. Never use hooks, forklifts, or equipment that could puncture packaging unless specifically designed for that purpose.\n\nOn CouthActs, document loading with timestamped photos via the DOCUMENT_POD_AI tracking layer. Include photos of cargo securement and placard placement." },
        { title: "Emergency Response Guidebook (ERG)", order: 6, durationMins: 20, content: "The Emergency Response Guidebook (ERG) is published by the US DOT, Transport Canada, and Mexico's SCT. It is required to be in every vehicle transporting HAZMAT.\n\nThe ERG provides immediate response guidance for the first 15-30 minutes of a HAZMAT incident. It is NOT a substitute for professional HAZMAT response — it's the initial guide until specialists arrive.\n\nHow to use the ERG:\n1. Identify the material: Use the UN number (from shipping papers or placards) to look up the Guide Number in the yellow-bordered pages.\n2. If no UN number: Use the material name in the blue-bordered pages.\n3. If no identification possible: Use the placard's hazard class in the Table of Placards.\n4. Turn to the Guide Number (orange-bordered pages) for: potential hazards, public safety actions, emergency response procedures.\n5. Check the green-bordered pages for Initial Isolation and Protective Action Distances for highlighted materials.\n\nKey information in each guide:\n- FIRE: How it burns, what extinguishing agents to use, what NOT to do.\n- SPILL OR LEAK: Containment, cleanup, decontamination.\n- FIRST AID: Immediate medical response.\n\nOn CouthActs, if you encounter a HAZMAT emergency, use the SOS feature immediately. Include the UN number and Guide Number in your SOS message so the operations team can coordinate the appropriate response." },
        { title: "HAZMAT Tracking and IoT on CouthActs", order: 7, durationMins: 20, content: "CouthActs provides specialized tracking for HAZMAT transport through multiple layers working together.\n\nMOBILE_GPS: Standard real-time position tracking. Required for all HAZMAT transport.\n\nIOT_DEVICE: Temperature, humidity, and shock sensors for materials with condition requirements. Critical for:\n- Class 1 (Explosives): temperature monitoring to prevent detonation.\n- Class 2 (Refrigerated gases): temperature monitoring.\n- Class 5.2 (Organic peroxides): many require temperature-controlled transport.\n- Class 6.2 (Infectious substances): cold chain verification.\n\nGEOFENCE ALERTS: Automated notifications when HAZMAT shipments enter or leave defined zones. Used for:\n- Restricted areas (tunnels, densely populated zones where HAZMAT routing may be limited).\n- Customer-defined geofences around the origin and destination.\n\nSATELLITE: For HAZMAT transport through areas with limited cellular coverage (remote highways, rural areas). Ensures continuous tracking even without cell service.\n\nQR_PIN_CONFIRMATION: Cryptographic proof of handoff. Both pickup and delivery for HAZMAT require QR scan or PIN entry. This creates a tamper-proof chain of custody.\n\nDOCUMENT_POD_AI: Photo documentation at every checkpoint. For HAZMAT, include photos of: placards, shipping papers, cargo securement, temperature readings (if applicable), and delivery condition.\n\nAll tracking events for HAZMAT bookings are stored with full audit trail and are available for regulatory inspection if needed." },
        { title: "HAZMAT Certification and CouthActs Compliance", order: 8, durationMins: 20, content: "Completing this course and passing the exam earns you the CouthActs Hazardous Materials Handling certification. This certification:\n\n1. Adds a HAZMAT certification badge to your provider profile.\n2. Unlocks the ability to bid on HAZMAT postings (in addition to your HAZMAT endorsement on CDL).\n3. Contributes to your CouthActs Score through the verification bonus.\n4. Demonstrates to customers that you understand proper HAZMAT handling procedures.\n\nRemember: this CouthActs certification supplements but does not replace regulatory requirements. You still need:\n- CDL with HAZMAT endorsement (TSA background check)\n- DOT HAZMAT training per 49 CFR 172.704 (every 3 years)\n- Mode-specific certifications (IATA for air, IMDG for sea)\n\nOn CouthActs, HAZMAT jobs are tagged as requiring Elite Protection tier. This means:\n- Only verified providers with HAZMAT endorsement can bid.\n- Higher protection requirements for cargo coverage.\n- Mandatory IoT tracking for condition monitoring.\n- Full chain-of-custody documentation via tracking layers.\n\nThe CouthActs platform automatically enforces these requirements. If you're not HAZMAT-certified, you won't see HAZMAT jobs in your feed. This protects everyone — the customer, the provider, and the public." },
      ],
      examQuestions: [
        { question: "How many HAZMAT classes are there under the UN system?", optionA: "6", optionB: "7", optionC: "8", optionD: "9", correctAnswer: "D", explanation: "The UN divides hazardous materials into 9 classes.", order: 1 },
        { question: "Which Packing Group indicates the greatest danger?", optionA: "PG I", optionB: "PG II", optionC: "PG III", optionD: "PG IV", correctAnswer: "A", explanation: "Packing Group I indicates the greatest degree of danger.", order: 2 },
        { question: "What are the green-bordered pages of the ERG used for?", optionA: "Material identification", optionB: "Guide numbers", optionC: "Initial isolation distances", optionD: "First aid", correctAnswer: "C", explanation: "Green-bordered pages provide Initial Isolation and Protective Action Distances.", order: 3 },
        { question: "Which HAZMAT class must never be loaded with flammable liquids?", optionA: "Class 3", optionB: "Class 5.1 (Oxidizers)", optionC: "Class 8", optionD: "Class 9", correctAnswer: "B", explanation: "Oxidizers (5.1) must never be loaded with flammable liquids (3) due to fire/explosion risk.", order: 4 },
        { question: "What CouthActs tracking layer provides temperature monitoring for HAZMAT?", optionA: "MOBILE_GPS", optionB: "AIS_MARITIME", optionC: "IOT_DEVICE", optionD: "SATELLITE", correctAnswer: "C", explanation: "IOT_DEVICE provides temperature, humidity, and shock sensors for condition monitoring.", order: 5 },
        { question: "Where must shipping papers be placed when the driver is not in the vehicle?", optionA: "In the glove box", optionB: "On the driver's seat or door holder", optionC: "In the trailer", optionD: "In the shipping container", correctAnswer: "B", explanation: "Shipping papers must be on the driver's seat or in a holder on the driver's door.", order: 6 },
        { question: "What is the minimum size for HAZMAT placards?", optionA: "150mm x 150mm", optionB: "200mm x 200mm", optionC: "250mm x 250mm", optionD: "300mm x 300mm", correctAnswer: "C", explanation: "HAZMAT placards must be at least 250mm x 250mm (approximately 10 inches).", order: 7 },
        { question: "What protection tier does CouthActs require for HAZMAT transport?", optionA: "Basic", optionB: "Standard", optionC: "Premium", optionD: "Elite", correctAnswer: "D", explanation: "HAZMAT jobs on CouthActs require Elite Protection tier.", order: 8 },
      ],
    },

    /* ═══════════════════ COURSE 4: Customer Excellence ═══════════════════ */
    {
      title: "Customer Excellence Program",
      slug: "customer-excellence-program",
      description: "Master the communication, service delivery, and relationship management skills that turn one-time customers into repeat clients and earn 5-star reviews.",
      whatYouLearn: ["Communication protocols that earn 5-star reviews", "Proactive status updates using CouthActs tracking", "Handling complaints and service recovery", "Building a repeat customer base", "The connection between customer satisfaction and CouthActs Score", "Time management for on-time delivery"],
      category: "BUSINESS_OPERATIONS" as const, priceUsd: 39, duration: "2 hours", totalLessons: 6, level: "BEGINNER" as const,
      thumbnailUrl: "https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?w=600&q=80",
      lessons: [
        { title: "Why Customer Excellence Matters on CouthActs", order: 1, durationMins: 20, content: "Your CouthActs Score is directly shaped by customer reviews. Review Average accounts for 20 out of 100 points in the scoring algorithm. A provider with a perfect 5.0 average gets 20 points; a provider with a 3.5 average gets only 14 points. That 6-point gap can be the difference between Elite and Trusted tier.\n\nBut customer excellence is about more than scores. On CouthActs, the best providers aren't competing on price alone — they're competing on trust. A customer choosing between a $2,000 bid from a 70-score provider and a $2,200 bid from a 95-score provider will almost always pick the higher score. That 10% price premium is funded entirely by your reputation.\n\nRepeat customers are the most profitable segment on any platform. A customer who uses CouthActs for their first freight shipment and has an excellent experience will come back. They'll post bigger jobs, skip the bidding process and select you directly, and refer colleagues. One excellent customer interaction can generate thousands of dollars in future revenue.\n\nThis course teaches the specific communication, service delivery, and recovery skills that earn 5-star reviews consistently." },
        { title: "Communication Protocols for Every Job Phase", order: 2, durationMins: 20, content: "Professional communication follows a predictable pattern on CouthActs. Customers should never wonder what's happening.\n\nPhase 1 — Bidding: Your bid message is your first impression. Be specific: 'I'll pick up at your Dallas warehouse on Tuesday at 8 AM and deliver to the Houston site by 4 PM. I've completed 50+ runs on this lane with a 98% on-time rate.' Generic bids like 'I can do this job' tell the customer nothing.\n\nPhase 2 — After Acceptance: Send a message within 30 minutes of acceptance: 'Thank you for selecting me. I'll be at [pickup address] at [time] on [date]. I'll send a tracking update when I depart. My direct number is [number] for any questions.'\n\nPhase 3 — Pre-Pickup: 2 hours before pickup, send an update: 'On schedule for pickup at [time]. Currently at [location]. ETA [X] minutes.' Upload a pre-trip inspection photo as a DOCUMENT_POD_AI tracking event.\n\nPhase 4 — Pickup: At pickup, complete QR/PIN confirmation. Upload a photo of the cargo loaded and secured. Send a message: 'Cargo loaded and secured. Departing now. ETA to destination: [time].'\n\nPhase 5 — In Transit: Send tracking updates at major milestones. If there are delays (weather, traffic, mechanical), communicate immediately with the reason and revised ETA. Never let the customer discover a delay on their own.\n\nPhase 6 — Delivery: Complete QR/PIN confirmation. Upload delivery photos. Send message: 'Delivered successfully at [time]. Thank you for choosing CouthActs. If you're satisfied, I'd appreciate a review.'\n\nPhase 7 — Post-Delivery: If the customer leaves a positive review, send a thank-you. If they leave a negative review, respond professionally and address the concern." },
        { title: "Proactive Communication and the Tracking System", order: 3, durationMins: 20, content: "The CouthActs tracking system is your most powerful communication tool. Use it actively, not passively.\n\nMost providers only use MOBILE_GPS for basic location tracking. Top-rated providers use multiple tracking layers as a communication channel:\n\n1. DOCUMENT_POD_AI: Upload photos at every milestone — pre-trip inspection, cargo loading, waypoints, delivery. Each photo is timestamped and geotagged automatically. Customers love seeing proof of progress.\n\n2. QR_PIN_CONFIRMATION: Beyond the required pickup/delivery scans, use this for intermediate handoffs, border crossings, and custody changes.\n\n3. Status notes: Every tracking event can include a note. Use them: 'Passed Dallas weigh station, all clear' or 'Entering construction zone on I-35, expect 20-minute delay.'\n\nThe customer sees all of this in real-time on their tracking page. When a customer opens their tracking link and sees a steady stream of updates with photos and notes, their anxiety drops to zero. They trust you. They leave 5-star reviews. They come back.\n\nContrast this with a provider who sends GPS pings and nothing else. The customer sees a dot moving on a map with no context. They don't know if the cargo is secure, if the driver is communicating, or if there are any issues. This breeds anxiety, complaints, and 3-star reviews.\n\nThe tracking system is free to use. Every update you send costs you nothing but earns you everything." },
        { title: "Handling Complaints and Service Recovery", order: 4, durationMins: 20, content: "Things go wrong in transportation. Weather delays, mechanical issues, damaged cargo, missed deadlines. How you handle these situations determines whether you lose a customer or earn their loyalty.\n\nThe LAST framework for service recovery:\n\nL — Listen: Let the customer explain the problem fully before responding. Don't interrupt, don't make excuses. Acknowledge their frustration: 'I understand this is frustrating, and I take full responsibility.'\n\nA — Apologize: A sincere apology costs nothing. 'I'm sorry this happened. This is not the level of service I commit to.'\n\nS — Solve: Propose a concrete solution. 'I'd like to offer [X] to make this right.' This might be a partial refund, expedited re-delivery, or a discount on their next job.\n\nT — Thank: Thank them for bringing it to your attention. 'Thank you for telling me about this. It helps me improve my service.'\n\nOn CouthActs, disputes trigger an escrow freeze. If a customer files a dispute, the escrow is frozen immediately and the CouthActs team reviews the evidence. The best providers resolve issues before they become disputes — reach out to the customer proactively, offer a solution, and document everything through the tracking system.\n\nIf a dispute is filed against you, respond promptly with evidence: tracking events, photos, communication records. The CouthActs team reviews all evidence and makes a fair decision. A well-documented case almost always resolves in favor of the provider who communicated proactively." },
        { title: "Building a Repeat Customer Base", order: 5, durationMins: 20, content: "Repeat customers are the foundation of a sustainable provider business on CouthActs. Acquiring a new customer (through bidding) costs time and effort. Retaining an existing customer costs nearly nothing.\n\nStrategies for earning repeat business:\n\n1. Exceed expectations on the first job. Don't just meet the deadline — beat it. Don't just deliver — deliver and send a clean set of documentation photos. The first impression sets the bar.\n\n2. Follow up after delivery. A simple 'Thank you for the job. I'm available anytime you need this route again' keeps you top of mind.\n\n3. Be available. Set your CouthActs availability calendar so repeat customers can see when you're open for new jobs. Respond to their postings within 30 minutes.\n\n4. Price fairly for repeat customers. You don't need to undercut yourself, but a consistent, fair price builds loyalty. Customers hate price volatility.\n\n5. Remember details. If a customer always ships to the same warehouse, note the dock hours, the receiving contact, and the preferred unloading process. Mention these in your bid: 'I know your Houston warehouse receives between 7 AM and 3 PM at Dock 4.' This signals professionalism.\n\n6. Ask for reviews. After every successful delivery, ask: 'If you were satisfied with the service, I'd really appreciate a review on CouthActs. It helps me serve more customers like you.' Most satisfied customers will leave a review if asked directly." },
        { title: "Time Management and On-Time Delivery", order: 6, durationMins: 20, content: "On-Time Rate accounts for 20 points in the CouthActs Score. A provider with 100% on-time delivery earns all 20 points. A provider at 80% on-time earns 16 points. That 4-point gap compounds over time.\n\nTime management principles for transportation providers:\n\n1. Plan for the worst, aim for the best. If Google Maps says 6 hours, plan for 7.5. Factor in: traffic, weather, loading/unloading time, fuel stops, HOS-mandated breaks.\n\n2. Depart early. The single easiest way to be on time is to leave early. Build a 15-20% time buffer into every trip.\n\n3. Communicate delays immediately. If you know you'll be late, tell the customer NOW — not when you arrive late. A customer who learns about a 2-hour delay in advance adjusts their plans. A customer who discovers it at delivery time is furious.\n\n4. Track your on-time rate. Review it in your CouthActs dashboard after every completed job. If you're below 90%, analyze why: are you underestimating transit times? Accepting too-tight deadlines? Having loading/unloading delays?\n\n5. Don't accept jobs you can't deliver on time. If a customer needs delivery by Friday at noon and you know you can't make it, don't bid. Winning a job you can't fulfill on time damages your score more than not bidding at all.\n\n6. Use the CouthActs tracking system to communicate ETAs. When your tracking shows you're 30 minutes out, send a note: 'ETA 30 minutes. On schedule for delivery.' This builds confidence and earns top reviews.\n\nThe best providers on CouthActs have 95%+ on-time rates. They achieve this not by driving faster, but by planning better, communicating proactively, and never over-committing." },
      ],
      examQuestions: [
        { question: "How many CouthActs Score points does Review Average contribute?", optionA: "10 points", optionB: "15 points", optionC: "20 points", optionD: "25 points", correctAnswer: "C", explanation: "Review Average contributes 20 points to the CouthActs Score.", order: 1 },
        { question: "How soon after bid acceptance should you send a confirmation message?", optionA: "Within 1 hour", optionB: "Within 30 minutes", optionC: "Within 2 hours", optionD: "Within 24 hours", correctAnswer: "B", explanation: "Send a confirmation message within 30 minutes of acceptance.", order: 2 },
        { question: "What does the 'L' stand for in the LAST service recovery framework?", optionA: "Lead", optionB: "Listen", optionC: "Learn", optionD: "Log", correctAnswer: "B", explanation: "LAST = Listen, Apologize, Solve, Thank.", order: 3 },
        { question: "What happens when a customer files a dispute on CouthActs?", optionA: "Provider is banned", optionB: "Escrow is frozen immediately", optionC: "Payment is released", optionD: "Nothing until review", correctAnswer: "B", explanation: "When a dispute is filed, escrow is frozen immediately pending review.", order: 4 },
        { question: "How many CouthActs Score points does On-Time Rate contribute?", optionA: "10 points", optionB: "15 points", optionC: "20 points", optionD: "25 points", correctAnswer: "C", explanation: "On-Time Rate contributes 20 points to the CouthActs Score.", order: 5 },
        { question: "What tracking layer should be used for photo documentation at milestones?", optionA: "MOBILE_GPS", optionB: "IOT_DEVICE", optionC: "DOCUMENT_POD_AI", optionD: "SATELLITE", correctAnswer: "C", explanation: "DOCUMENT_POD_AI is used for photo documentation at checkpoints.", order: 6 },
      ],
    },

    /* ═══════════════════ COURSE 5: Fleet Management ═══════════════════ */
    {
      title: "Fleet Management Essentials",
      slug: "fleet-management-essentials",
      description: "Scale your transportation business on CouthActs. Learn fleet operations, driver management, route optimization, financial planning, and using the CouthActs API for automation.",
      whatYouLearn: ["Fleet maintenance scheduling and cost control", "Driver recruitment, training, and performance management", "Route optimization and fuel efficiency", "Financial planning for transportation businesses", "Using the CouthActs API for fleet automation", "Scaling from single operator to fleet owner"],
      category: "BUSINESS_OPERATIONS" as const, priceUsd: 69, duration: "3 hours", totalLessons: 8, level: "INTERMEDIATE" as const,
      thumbnailUrl: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=600&q=80",
      lessons: [
        { title: "The Single Operator to Fleet Owner Journey", order: 1, durationMins: 20, content: "Most CouthActs providers start as single operators — one person, one vehicle, one mode. The transition from single operator to fleet owner is one of the most significant business decisions you'll make.\n\nSigns you're ready to scale:\n- You're consistently turning down jobs because you're fully booked.\n- Your CouthActs Score is 85+ and your reviews are strong.\n- You've built repeat customer relationships that generate predictable revenue.\n- You have at least 6 months of operating capital saved.\n- You understand your unit economics: cost per mile, average revenue per job, profit margin.\n\nThe scaling path on CouthActs:\n1. Single operator: You drive, you manage, you communicate. Focus on building your score and reputation.\n2. Owner-operator with 1 subcontractor: You take on a second driver for overflow. You still manage operations directly.\n3. Small fleet (2-5 vehicles): You shift from driving to managing. You need systems for dispatch, communication, and quality control.\n4. Growing fleet (5-15 vehicles): You need dedicated admin support, fleet management software, and the CouthActs API for automation.\n5. Enterprise fleet (15+): You're managing a business, not a vehicle. You need the CouthActs Enterprise API, dedicated account management, and volume-based pricing.\n\nThe key mistake most providers make: scaling too fast without systems. Adding a second vehicle before you have processes for dispatch, communication, and quality control will damage your CouthActs Score — because you can't maintain the same service quality without systems." },
        { title: "Fleet Maintenance Scheduling and Cost Control", order: 2, durationMins: 20, content: "Vehicle maintenance is your single largest operational cost after fuel. A well-maintained fleet runs efficiently, avoids breakdowns, and protects your CouthActs Score (breakdowns cause delays, which hurt your on-time rate).\n\nPreventive maintenance schedule:\n- Daily: Pre-trip inspection (lights, tires, fluids, brakes). Document with DOCUMENT_POD_AI tracking event.\n- Every 5,000-7,500 miles: Oil change, filter replacement, tire rotation.\n- Every 15,000 miles: Brake inspection, transmission service, coolant flush.\n- Every 30,000 miles: Major service — timing belt, suspension, complete fluid replacement.\n- Annual: DOT annual inspection, emission testing, registration renewal.\n\nCost control strategies:\n1. Track cost per mile for each vehicle. Divide total maintenance costs by total miles driven. Industry average for commercial trucks is $0.15-0.20/mile.\n2. Buy tires in bulk. Negotiate with tire suppliers for fleet pricing.\n3. Establish relationships with 2-3 repair shops. Volume relationships get priority scheduling and better pricing.\n4. Consider a preventive maintenance contract for larger fleets — fixed monthly cost per vehicle for all scheduled maintenance.\n5. Track fuel efficiency per vehicle. A sudden drop in MPG often indicates mechanical problems before they become breakdowns.\n\nOn CouthActs, vehicle breakdowns during active jobs must be communicated immediately to the customer via tracking updates. A proactive update like 'Mechanical issue at mile 250. Repair estimated at 2 hours. Revised ETA: 4 PM' is far better than silence." },
        { title: "Driver Recruitment and Performance Management", order: 3, durationMins: 20, content: "Your drivers ARE your business on CouthActs. Their performance directly impacts your CouthActs Score, customer reviews, and repeat business rate.\n\nRecruiting quality drivers:\n- Look for experience in your transport mode. A great freight driver may be a poor courier — different skills, different pace.\n- Verify credentials: valid CDL with appropriate endorsements, clean MVR (Motor Vehicle Record), drug test compliance.\n- Check references from previous employers. Ask specifically about: reliability, communication, customer interaction, and incident history.\n- Offer competitive compensation. The best drivers have options — underpaying ensures you get the bottom of the talent pool.\n\nPerformance management on CouthActs:\n- Each booking has tracking data. Review your drivers' tracking events: Are they sending proactive updates? Are they uploading photos at milestones? Are they on time?\n- Customer reviews mention specific drivers. Read them. A driver who consistently earns 5-star reviews with comments like 'Great communication' is worth retaining. A driver who earns 3-star reviews needs coaching or replacement.\n- Set clear standards: minimum communication frequency, mandatory photo checkpoints, response time targets.\n- Pay bonuses for high performance: on-time delivery bonus, 5-star review bonus, zero-incident bonus.\n\nOn CouthActs, your business reputation is your CouthActs Score. Every driver working under your provider account affects that score. One bad driver can destroy years of reputation in a few jobs." },
        { title: "Route Optimization and Fuel Efficiency", order: 4, durationMins: 20, content: "Fuel is typically 30-40% of a fleet's operating cost. Route optimization reduces fuel consumption, improves on-time delivery, and increases the number of jobs you can complete per day.\n\nRoute optimization principles:\n1. Plan routes before accepting bids. Know the exact distance, estimated drive time, fuel stops, and rest stops before you commit to a price and deadline.\n2. Avoid empty miles. After a delivery, check CouthActs for return-route jobs. A truck returning empty from Houston to Dallas could pick up a job going the same direction — doubling revenue with minimal additional cost.\n3. Use real-time traffic data. Google Maps is a starting point, but dedicated routing software (Samsara, KeepTruckin) provides truck-specific routing that avoids low bridges, weight-restricted roads, and construction zones.\n4. Batch deliveries when possible. Multiple smaller jobs going in the same direction can be combined if timing and cargo compatibility allow.\n\nFuel efficiency strategies:\n- Maintain optimal tire pressure. Under-inflated tires increase fuel consumption by 3-5%.\n- Use cruise control on highways. Constant speed burns less fuel than acceleration/deceleration.\n- Reduce idle time. One hour of idling burns 0.8-1.0 gallons of diesel.\n- Monitor speed. Fuel efficiency drops dramatically above 55 mph — each 5 mph above 55 costs approximately $0.10/mile more in fuel.\n\nThe CouthActs Load Board is your best tool for avoiding empty miles. After completing a delivery, browse jobs originating near your current location. This is especially effective for long-haul freight." },
        { title: "Financial Planning for Transportation Businesses", order: 5, durationMins: 20, content: "Most transportation businesses fail not because they can't find jobs — but because they can't manage cash flow. Understanding your finances is the difference between a growing fleet and a bankrupt one.\n\nKey financial metrics for CouthActs providers:\n\n1. Revenue per mile: Total revenue divided by total miles driven. Benchmark: $2.50-4.00/mile for freight trucking, varies by mode.\n2. Cost per mile: Total operating costs (fuel, maintenance, insurance, driver pay, depreciation) divided by total miles. Benchmark: $1.50-2.50/mile.\n3. Profit margin: (Revenue - Costs) / Revenue. Healthy benchmark: 15-25%.\n4. Utilization rate: Percentage of available hours that your vehicles are earning revenue. Target: 80%+ for long-haul, 60%+ for local.\n\nCouthActs-specific financial considerations:\n- Escrow fees: 1-8% on a sliding scale. For a $10,000 job in the $5K-$50K bracket, that's 4% = $400. Factor this into your bidding.\n- Posting fees: Paid by the customer, not the provider. No cost to bid.\n- CouthActs Advance: If you're Elite tier, you can access 70% of escrow early at 2.5% fee. Use this for fuel and driver pay on active jobs — but factor the 2.5% into your profitability.\n- Stripe Connect fees: Standard transfers are free from CouthActs but Stripe charges its processing fee on the transfer to your bank.\n\nCash flow management:\n- Maintain at least 60 days of operating expenses in reserve.\n- Don't take on vehicle loans that require more than 30% of your monthly revenue for payments.\n- Use CouthActs Advance strategically — it's a tool for cash flow smoothing, not a substitute for profitability." },
        { title: "Using the CouthActs API for Fleet Automation", order: 6, durationMins: 20, content: "As your fleet grows beyond 5 vehicles, manual management of CouthActs bookings becomes a bottleneck. The CouthActs Provider API enables automation.\n\nKey API capabilities for fleet operators:\n\n1. Job monitoring: GET /api/provider/v1/jobs — Programmatically query available jobs matching your fleet's modes and service areas. Filter by mode, budget range, origin, and destination. Build internal tools that alert dispatchers when high-value jobs appear.\n\n2. Booking management: GET /api/provider/v1/bookings — Monitor all active bookings across your fleet. Build dashboards showing which vehicles are on which jobs, ETAs, and delivery status.\n\n3. Tracking automation: POST /api/provider/v1/tracking — Push GPS updates programmatically. If your vehicles use fleet telematics (Samsara, Geotab, KeepTruckin), build an integration that automatically sends position data to CouthActs. Specify the tracking layer: MOBILE_GPS for standard, ELD_INTEGRATION for ELD data, IOT_DEVICE for sensor data.\n\n4. Wallet management: GET /api/provider/v1/wallet — Monitor your wallet balance and transaction history. Set up alerts when balance drops below a threshold.\n\nAPI setup:\n1. Go to Settings in your CouthActs dashboard.\n2. Generate a Provider API key (starts with ca_live_ or ca_test_).\n3. Use the key in the X-API-Key header for all requests.\n\nThe Starter API tier (free, 100 calls/day) is sufficient for small fleets. Growth tier ($299/mo, 10K calls/day) is needed for automated tracking updates. Enterprise tier (custom pricing, unlimited) is for large fleet operations." },
        { title: "Scaling Operations and Multi-Mode Expansion", order: 7, durationMins: 20, content: "Once your fleet is running efficiently in one mode, consider expanding into adjacent modes. CouthActs supports 18 modes — each one is a new revenue stream.\n\nNatural expansion paths:\n- Freight trucking → Heavy haul (requires equipment upgrade but similar skills)\n- Courier/last-mile → Moving (same local expertise, larger vehicles)\n- Taxi/limo → Medical transport (premium pricing, regulatory requirements)\n- Air cargo → Private jet charter (aviation expertise transfers)\n- Cargo ship → Yacht charter (maritime expertise transfers)\n\nExpansion checklist:\n1. Regulatory requirements: Every mode has specific licenses, registrations, and certifications. Research before investing.\n2. Equipment: Can you use existing vehicles or do you need new/different ones?\n3. Staff: Do your current drivers have the skills for the new mode, or do you need specialized operators?\n4. Insurance: Each mode has different protection requirements and costs.\n5. CouthActs setup: Register the new mode on your provider profile. Complete any additional verification required.\n\nThe advantage of multi-mode operation on CouthActs is that you see more jobs. A provider registered for freight trucking sees freight jobs. A provider registered for freight trucking AND heavy haul AND courier sees three times as many opportunities. More visibility = more bids = more revenue.\n\nHowever, don't expand into modes you can't serve well. A bad experience in a new mode damages your CouthActs Score across ALL modes — there's one score per provider, not per mode." },
        { title: "Enterprise Features and Volume Pricing", order: 8, durationMins: 20, content: "When your fleet reaches 15+ vehicles or you're completing 50+ jobs per month, you qualify for CouthActs Enterprise features.\n\nEnterprise benefits:\n- Volume-based escrow pricing: Custom escrow fee rates below the standard sliding scale. Negotiated based on your monthly volume.\n- Dedicated account manager: A single point of contact at CouthActs who understands your business, your routes, and your customers.\n- Priority support: Direct phone/email line with response times under 1 hour for critical issues.\n- Custom API integrations: Webhook notifications, custom tracking layer configurations, and bulk job creation APIs.\n- White-label tracking: Give your customers a tracking page branded with your company's look and feel, powered by CouthActs infrastructure.\n- SSO (Single Sign-On): Integrate CouthActs login with your company's identity provider.\n\nTo explore Enterprise features:\n1. Visit couthacts.com/enterprise\n2. Fill out the inquiry form with your fleet size, monthly volume, and primary modes.\n3. The enterprise team will reach out within 48 hours to discuss pricing and setup.\n\nFor government contracts, visit couthacts.com/government for specific procurement-ready features including SAM.gov integration, compliance reporting, and multi-agency coordination.\n\nThe CouthActs Enterprise tier is designed for providers who treat CouthActs as core infrastructure — not just a job board, but the operating system for their transportation business." },
      ],
      examQuestions: [
        { question: "What CouthActs Score is recommended before scaling to a fleet?", optionA: "70+", optionB: "75+", optionC: "80+", optionD: "85+", correctAnswer: "D", explanation: "A score of 85+ indicates you've built a strong foundation before scaling.", order: 1 },
        { question: "What is the industry benchmark cost per mile for commercial trucks?", optionA: "$0.50-1.00", optionB: "$1.00-1.50", optionC: "$1.50-2.50", optionD: "$3.00-4.00", correctAnswer: "C", explanation: "Industry benchmark operating cost is $1.50-2.50 per mile for commercial trucks.", order: 2 },
        { question: "What API endpoint is used for fleet tracking automation?", optionA: "POST /api/v1/jobs", optionB: "POST /api/provider/v1/tracking", optionC: "GET /api/track/{code}", optionD: "POST /api/tracking", correctAnswer: "B", explanation: "POST /api/provider/v1/tracking is the Provider API endpoint for pushing tracking updates.", order: 3 },
        { question: "How many days of operating expenses should a fleet maintain in reserve?", optionA: "30 days", optionB: "45 days", optionC: "60 days", optionD: "90 days", correctAnswer: "C", explanation: "Maintain at least 60 days of operating expenses in reserve for cash flow management.", order: 4 },
        { question: "What is the target vehicle utilization rate for long-haul operations?", optionA: "60%+", optionB: "70%+", optionC: "80%+", optionD: "90%+", correctAnswer: "C", explanation: "Target utilization rate is 80%+ for long-haul operations.", order: 5 },
        { question: "What monthly job volume qualifies for CouthActs Enterprise?", optionA: "20+ jobs", optionB: "30+ jobs", optionC: "40+ jobs", optionD: "50+ jobs", correctAnswer: "D", explanation: "Enterprise features are available for providers completing 50+ jobs per month.", order: 6 },
        { question: "How much fuel does one hour of idling burn (diesel)?", optionA: "0.3-0.5 gallons", optionB: "0.5-0.7 gallons", optionC: "0.8-1.0 gallons", optionD: "1.2-1.5 gallons", correctAnswer: "C", explanation: "One hour of idling burns approximately 0.8-1.0 gallons of diesel.", order: 7 },
        { question: "What is the CouthActs Provider API key prefix for live keys?", optionA: "ca_test_", optionB: "ca_live_", optionC: "ca_prod_", optionD: "ca_api_", correctAnswer: "B", explanation: "Live API keys start with ca_live_ prefix.", order: 8 },
      ],
    },
  ];

  // Seed courses
  for (const courseData of courses) {
    const course = await db.course.create({
      data: {
        title: courseData.title, slug: courseData.slug, description: courseData.description,
        whatYouLearn: courseData.whatYouLearn, category: courseData.category,
        priceUsd: courseData.priceUsd, duration: courseData.duration,
        totalLessons: courseData.totalLessons, level: courseData.level,
        thumbnailUrl: courseData.thumbnailUrl,
        isPublished: true,
      },
    });

    for (const lesson of courseData.lessons) {
      await db.lesson.create({
        data: { courseId: course.id, ...lesson },
      });
    }

    for (const q of courseData.examQuestions) {
      await db.examQuestion.create({
        data: { courseId: course.id, ...q },
      });
    }
  }

  return NextResponse.json({ message: `${courses.length} courses seeded successfully` });
}
