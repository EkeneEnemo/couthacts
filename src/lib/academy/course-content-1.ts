/**
 * CouthActs Academy — Course 1: Getting Started as a CouthActs Provider
 * Rich lesson content with markup: headers, callouts, images, lists
 */

export const COURSE_1 = [
  {
    title: "Welcome to CouthActs — How the Platform Works",
    order: 1,
    durationMins: 15,
    content: `## The Global Transportation Infrastructure

![CouthActs connects providers across every transport mode worldwide](https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1200&q=80)

CouthActs is not a freight broker. It is not a ride-hailing app. It is a **global transportation infrastructure platform** that connects customers who need to move people or goods with verified transportation providers — across **18 distinct transport modes** spanning ground, air, maritime, and rail.

The platform operates in **190+ countries** and is built on three foundational principles: every provider is identity-verified, every payment is escrow-protected, and every shipment is tracked in real-time across up to 9 tracking layers.

---

## The 18 Transport Modes

CouthActs covers the full spectrum of transportation needs:

### Ground (6 modes)
- **Taxi & Rideshare** — City-to-city and airport transfers
- **Limousine** — Executive and event transportation
- **Courier & Last Mile** — Same-day package delivery
- **Moving** — Residential and commercial relocations
- **Freight Trucking** — FTL, LTL, flatbed, refrigerated
- **Heavy Haul** — Overweight and oversized loads

### Air (4 modes)
- **Private Jet** — Charter flights for executives and groups
- **Helicopter** — Short-range aerial transport
- **Commercial Airline** — Passenger bookings and group travel
- **Air Cargo** — Express and standard freight forwarding

### Maritime (3 modes)
- **Cargo Ship** — FCL, LCL, bulk, and tanker
- **Yacht Charter** — Leisure and corporate vessel hire
- **Ferry** — Vehicle and passenger crossings

### Rail & Specialty (5 modes)
- **Freight Rail** — Intermodal, bulk, and auto rail
- **Armored Transport** — High-value and secure cargo
- **Medical Transport** — Patient and specimen transfer
- **Hazmat** — Hazardous materials (Class 1-9)
- **Oversized Cargo** — Permit-required loads

![Modern fleet of commercial vehicles ready for dispatch](https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1200&q=80)

---

## How the Platform Cycle Works

Every transaction on CouthActs follows a secure, transparent cycle:

1. **Customer posts a need** — They describe what needs moving, select the transport mode, set a budget, and choose a protection tier. The budget is held in their CouthActs Wallet.
2. **Verified providers bid** — Only identity-verified providers registered for that mode can see and bid on the job. Bids include price, estimated timeline, and a message.
3. **Customer selects a provider** — They compare bids using your CouthActs Score, reviews, on-time rate, and price. The agreed amount is locked in escrow.
4. **Job execution with tracking** — The provider completes the job while the customer monitors via real-time tracking (GPS, flight, AIS, QR/PIN, and more).
5. **Mutual confirmation** — Both parties confirm completion. The escrow releases to the provider's wallet, minus the platform fee.

:::key
Every dollar on CouthActs is accounted for. The customer's budget is secured before any provider touches the cargo. The provider is guaranteed payment upon completion. This escrow system eliminates the #1 problem in transportation: non-payment.
:::

---

## The CouthActs Score

Your **CouthActs Score** is a 0-100 rating that determines your visibility, credibility, and access to platform features. It's calculated from seven factors:

- **Completion Rate** (25 points) — What percentage of accepted jobs do you complete?
- **On-Time Rate** (20 points) — Of completed jobs, what percentage hit their deadline?
- **Review Average** (20 points) — Your average customer rating scaled to 20 points
- **Response Time** (10 points) — How quickly do you respond to job opportunities?
- **Dispute Penalty** (-5 per dispute, max -15) — Unresolved disputes cost points
- **Account Age** (max 10 points) — 1 point per month, up to 10
- **Verification Bonus** (15 points) — Full KYC + KYB adds 15 points

:::important
Your score determines your tier: **Elite (90-100)**, **Trusted (75-89)**, **Established (60-74)**, **Probation (below 60)**. Elite providers get access to CouthActs Advance, priority job matching, and lower escrow fees.
:::

---

## Fee Structure

CouthActs charges transparent, sliding-scale fees:

- **Posting fee** — $2-$50 base + 0.5% of budget (paid by customer, non-refundable)
- **Escrow fee** — 8% under $500, 6% $500-$5K, 4% $5K-$50K, 2% $50K-$500K, 1% above $500K (capped at $10K)
- **Identity verification** — $20 per KYC attempt (non-refundable)
- **No bid fees** — It costs you nothing to bid on a job

![Professional transportation dashboard for managing operations](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80)

The escrow fee is deducted from your payout on completion — you never pay it upfront. Your earnings go directly to your CouthActs Wallet, and you can withdraw to your bank account via Stripe Connect at any time.`,
  },
  {
    title: "Setting Up Your Provider Profile for Maximum Visibility",
    order: 2,
    durationMins: 15,
    content: `## Your Profile Is Your Storefront

![Professional business presentation and brand identity](https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&q=80)

On CouthActs, customers see your profile before they accept your bid. A complete, professional profile can increase your bid acceptance rate by **3-5x** compared to an incomplete one. Think of your profile as your storefront — it needs to immediately communicate competence, reliability, and professionalism.

---

## Business Name and Identity

Your business name is the first thing customers see. Choose wisely:

- **Solopreneurs** (taxi, limo, courier, medical transport): Your business name defaults to your personal name. This is appropriate and expected for individual operators.
- **Business entities** (freight, heavy haul, air cargo, maritime, etc.): Use your registered business name. You'll need documentation to prove it during KYB verification.

:::tip
Your business name should be professional and memorable. "Dallas Express Freight LLC" is better than "Bob's Trucking." If your legal name is complex, consider a DBA (Doing Business As) that's cleaner for customer-facing use.
:::

---

## Selecting Your Transport Modes

This is critical. Only select modes you are **actually equipped and licensed** to serve.

- A freight trucking company should NOT select yacht charter
- A taxi operator should NOT select heavy haul
- An air cargo provider should NOT select medical transport

The platform uses your registered modes to filter which jobs you see. Selecting irrelevant modes wastes your time and can damage your score if you bid on jobs you can't fulfill.

### Mode-Specific Considerations
- **Freight/Heavy Haul**: Ensure your DOT, MC, and FMCSA registrations are current
- **Aviation**: FAA certificates must be active and match your operation type
- **Maritime**: IMO registrations and valid survey certificates required
- **Hazmat**: CDL with HAZMAT endorsement (TSA background check) mandatory
- **Armored**: State-specific security transport licenses required

---

## Crafting Your Bio

Your bio should be **concise, specific, and professional**. Lead with experience and capabilities, not marketing language.

:::warning
Bad example: "We are the best trucking company in Texas! Call us for all your needs!"
:::

:::tip
Good example: "Licensed FMCSA carrier (MC-123456) with 12 years of cross-country freight experience. 48-foot flatbed fleet specializing in construction materials and heavy equipment. 98% on-time rate across 2,000+ deliveries. Hazmat endorsed. 24/7 dispatch."
:::

![Fleet of trucks ready for dispatch from the warehouse](https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&q=80)

---

## Service Areas

Be specific about where you operate:

- "Northeast US (NY, NJ, CT, PA, MA)" is better than "United States"
- "DFW Metroplex and I-35 corridor to Austin/San Antonio" is better than "Texas"
- "West Africa — Nigeria (Lagos, Abuja, Port Harcourt)" is better than "Africa"

Customers search by location. The more precise your service area, the more relevant jobs you'll see and the more trustworthy you appear.

---

## Photos and Certifications

### Fleet Photos
Upload **real photos** of your actual vehicles, not stock images. Customers can tell the difference. Include:
- Exterior shots showing vehicle condition and branding
- Interior shots for passenger modes (taxi, limo)
- Equipment close-ups for specialty modes (flatbed, refrigerated, armored)

### Certifications and Registrations
Every certification you add opens doors to higher-paying jobs:
- DOT/MC numbers for trucking
- HAZMAT endorsement
- TWIC card for port access
- TSA-approved for air cargo
- ISO certifications
- Protection coverage tiers (Basic, Standard, Premium, Elite)

:::key
A fully completed profile with photos, certifications, and a professional bio signals to customers that you take your business seriously. On CouthActs, trust wins jobs — not just price.
:::`,
  },
  {
    title: "Getting Verified — KYC and KYB Explained",
    order: 3,
    durationMins: 15,
    content: `## Identity Verification Is Non-Negotiable

![Secure identity verification process](https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=80)

CouthActs requires every user — customer and provider — to verify their identity before accessing platform features. You **cannot bid on any job** until your identity is verified. This is not optional, and there are no exceptions.

This verification system is what separates CouthActs from platforms that allow anyone to list services without accountability. It protects customers from fraud and protects legitimate providers from unverified competitors.

---

## KYC — Know Your Customer (Personal Identity)

KYC verification uses **Persona**, a government-grade identity verification service trusted by major financial institutions and technology companies.

### The Process
1. Navigate to Settings → Identity Verification
2. Upload a photo of your **government-issued ID** (passport, driver's license, or national ID card)
3. Take a **live selfie** — Persona verifies that the selfie matches the ID photo
4. Persona checks that the ID is authentic, not expired, and not tampered with
5. Results are typically returned within **2-5 minutes**

### Cost
- **$20 per verification attempt** — non-refundable regardless of outcome
- If verification fails, you must pay $20 again to retry

:::warning
**Critical requirement**: The first and last name on your CouthActs account must **exactly match** the name on your government ID. If there's a mismatch — even a middle name discrepancy — verification will be rejected. The $20 fee is NOT refunded. Double-check your account name before submitting.
:::

### What Happens After KYC
- Your profile displays a **"KYC Verified"** badge
- You can now bid on jobs (for solopreneur modes: taxi, limo, courier, medical)
- Your CouthActs Score receives the **verification bonus** (part of the 15-point bonus)
- For business modes, you'll need KYB verification next

---

## KYB — Know Your Business

KYB is required for **non-solopreneur providers** — anyone operating under a business entity for freight, heavy haul, air, maritime, or specialty transport.

### Required Documentation
1. **Business license** — Current and valid in your operating jurisdiction
2. **Protection certificate** — Proof of insurance/protection coverage
3. **Mode-specific registrations**:

- **Trucking**: DOT number, MC number, FMCSA operating authority
- **Maritime**: IMO registration number, valid survey certificates
- **Aviation**: FAA Air Carrier Certificate, pilot certifications
- **Hazmat**: CDL with HAZMAT endorsement, TSA background check clearance
- **Armored**: State-issued security transport license

![Global shipping infrastructure and documentation](https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80)

### Review Process
- The CouthActs compliance team **manually reviews** all business documents
- Review takes **1-3 business days**
- You'll receive an email notification when approved or if additional documentation is needed
- Once approved, your profile shows a **"KYB Verified"** badge

:::important
If you change your name on CouthActs after verification, your KYC resets and you'll need to re-verify ($20 again). This prevents identity fraud. Similarly, if your business name or registration changes, KYB must be re-submitted.
:::

---

## The Verification Bonus

Full verification (KYC + KYB) adds **15 points** to your CouthActs Score. This is the single largest one-time score boost available and can immediately move you from Probation to Established tier.

:::key
Verification is your first investment in your CouthActs career. The $20 KYC fee and 1-3 day KYB review are the foundation of every job you'll ever win on the platform. Do not skip this step. Do not delay it. Complete it on Day 1.
:::`,
  },
  {
    title: "Understanding the CouthActs Score",
    order: 4,
    durationMins: 15,
    content: `## The Most Important Number on Your Profile

![Performance analytics and scoring dashboard](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80)

Your **CouthActs Score** is a 0-100 rating that determines your tier, affects how customers perceive your bids, and gates access to premium features like CouthActs Advance. It is recalculated after every completed booking. Understanding how it works is essential to building a successful provider career.

---

## The Seven Scoring Factors

### 1. Completion Rate — 25 Points (Highest Weight)
What percentage of accepted bookings do you actually complete?

- 100% completion = 25 points
- 90% completion = 22.5 points
- 80% completion = 20 points

:::warning
Every cancellation after accepting a job damages this metric. If you accept a job, **complete it**. If you're unsure about a job, don't bid. A declined bid has zero impact on your score — a cancelled booking has a significant one.
:::

### 2. On-Time Rate — 20 Points
Of jobs with a delivery deadline, what percentage were completed on or before the deadline?

- 100% on-time = 20 points
- 95% on-time = 19 points
- 80% on-time = 16 points

### 3. Review Average — 20 Points
Your average customer rating out of 5 stars, scaled to 20 points.

- 5.0/5 average = 20 points
- 4.5/5 average = 18 points
- 4.0/5 average = 16 points
- 3.0/5 average = 12 points

### 4. Response Time — 10 Points
How quickly do you respond to job opportunities?

- Under 1 hour = 10 points (full)
- 1-6 hours = 7 points
- 6-24 hours = 4 points
- Over 24 hours = 0 points

### 5. Dispute Penalty — Up to -15 Points
Each dispute filed against you in the last 12 months costs **5 points**. Maximum deduction is 15 points (3+ disputes).

- 0 disputes = 0 penalty
- 1 dispute = -5 points
- 2 disputes = -10 points
- 3+ disputes = -15 points (maximum)

### 6. Account Age — Max 10 Points
1 point per month you've been active on the platform, capped at 10 points.

### 7. Verification Bonus — 15 Points
Full verification (KYC + KYB approved) = 15 bonus points. This is the fastest way to boost your score on Day 1.

![Building a five-star reputation through consistent service](https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=1200&q=80)

---

## Tier Thresholds

Your score places you in one of four tiers:

- **Elite (90-100)** — Gold badge. Access to CouthActs Advance, priority job matching, lowest escrow fees. The top tier.
- **Trusted (75-89)** — Silver badge. Strong visibility, customer trust, most features available.
- **Established (60-74)** — Gray badge. Standard visibility and access.
- **Probation (below 60)** — Red badge. Reduced visibility. Requires immediate improvement.

:::key
The difference between a 70-score provider and a 95-score provider is enormous. A customer choosing between a $2,000 bid from a 70-score provider and a $2,200 bid from a 95-score provider will almost always pick the higher score. The 10% price premium is funded entirely by your reputation.
:::

---

## Score Optimization Strategy

The fastest path to a high score:

1. **Get verified immediately** (+15 points on Day 1)
2. **Never cancel an accepted job** (protect your completion rate)
3. **Respond to every opportunity within 1 hour** (10 response points)
4. **Deliver on time, every time** (plan for delays, communicate early)
5. **Ask satisfied customers for reviews** (most won't review unless asked)
6. **Avoid disputes at all costs** (-5 points each is devastating)

:::tip
A brand-new provider who gets verified on Day 1 starts at approximately **25-30 points** (verification bonus + account age). After 5 completed jobs with 5-star reviews, you can be at **65-70** within your first two weeks. The path to Elite is entirely within your control.
:::`,
  },
  {
    title: "How to Find and Bid on Jobs",
    order: 5,
    durationMins: 15,
    content: `## Finding the Right Jobs

![Browse available transport jobs on the CouthActs platform](https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=80)

Jobs on CouthActs come to you through two primary channels: the **Browse Jobs** page (all modes) and the **Load Board** (freight and cargo modes). Understanding how to find, evaluate, and bid on the right jobs is the difference between a struggling provider and a thriving one.

---

## The Browse Jobs Page

Browse Jobs shows all open postings that match your registered transport modes. Key features:

- **Mode filtering** — Only see jobs for modes you're registered for
- **Location filtering** — Filter by origin, destination, or route
- **Budget range** — See the customer's posted budget
- **Urgency indicator** — Urgent jobs are marked with a badge
- **Protection tier** — See what protection level the customer selected

:::important
If you're registered for FREIGHT_TRUCKING and HEAVY_HAUL, you'll only see freight and heavy haul jobs. You won't see taxi requests or yacht charters. This ensures every job in your feed is relevant to your capabilities and equipment.
:::

---

## The Load Board

For freight and cargo providers, the **Load Board** is your primary tool. It's designed specifically for:

- Freight trucking (FTL, LTL, flatbed, refrigerated)
- Heavy haul and oversized
- Hazmat
- Rail freight
- Air cargo
- Ocean freight

### Load Board Features
- Filter by specific transport mode
- Sort by budget, pickup date, or distance
- Toggle hazmat-only jobs
- Filter for jobs posted in the last 24 hours
- View route details and cargo specifications

---

## Evaluating a Job Before Bidding

Before you bid, click into the job details to evaluate:

1. **Route** — Is the origin-to-destination within your service area?
2. **Cargo specifications** — Weight, dimensions, special handling requirements
3. **Dates** — Can you meet the pickup and delivery deadlines?
4. **Budget** — Is the posted budget realistic for this route and cargo type?
5. **Protection tier** — Do you meet the required protection level?
6. **Tracking layers** — What tracking is the customer expecting?

![Logistics professionals reviewing cargo specifications](https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80)

:::warning
Never bid on a job you can't fulfill. Winning a job you can't complete damages your CouthActs Score far more than not bidding at all. A declined bid has zero impact — a cancelled booking deducts from your completion rate.
:::

---

## Crafting a Winning Bid

Your bid consists of three elements: **price**, **estimated timeline**, and **message**.

### Pricing Strategy
- Study the customer's posted budget — bidding significantly over it rarely works
- Price competitively but don't underbid. Cheap bids make customers suspicious
- Factor in your costs: fuel, tolls, driver time, equipment wear, and the **escrow fee** (1-8%)

### Timeline
- Be realistic about pickup and delivery dates
- Build in a buffer for weather, traffic, and mechanical delays
- Under-promise and over-deliver on timeline

### The Bid Message
This is where you differentiate yourself. A great bid message includes:

- Your relevant experience on this specific route or cargo type
- Your on-time rate and completion stats
- Any relevant certifications or equipment
- A confident, professional tone

:::tip
Example of a winning bid message: "Licensed FMCSA carrier with 8 years on the DFW-to-Houston corridor. My 48-foot flatbed is available for pickup Tuesday at 0700. I've completed 200+ runs on this lane with a 98% on-time rate. Hazmat endorsed if needed. Happy to answer any questions."
:::

---

## After You Bid

- Your CouthActs Score is **visible on every bid** you submit
- Customers can see your profile, reviews, and completion history
- Respond quickly if the customer asks follow-up questions — response time affects your score
- If you're outbid, don't lower your price recklessly. Quality providers win on trust, not price

![Professional fleet operations and dispatch management](https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1200&q=80)

:::key
The best providers on CouthActs win 30-40% of the jobs they bid on. They achieve this not by being the cheapest, but by having high scores, professional profiles, and bid messages that demonstrate specific expertise for that exact job.
:::`,
  },
  {
    title: "Instant Jobs — How to Win Real-Time Requests",
    order: 6,
    durationMins: 15,
    content: `## Real-Time Matching for Immediate Needs

![Instant transportation matching for on-demand rides and deliveries](https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?w=1200&q=80)

**CouthActs Instant** is the platform's real-time matching system for transportation needs that can't wait for the standard bidding process. When a customer needs a taxi now, a courier in the next hour, or a limo for tonight — they use Instant.

---

## How Instant Works

### Eligible Modes
Instant is currently available for three modes:
- **Taxi & Rideshare** — Immediate pickup
- **Limousine** — Same-day bookings
- **Courier & Last Mile** — Urgent deliveries

### The 90-Second Window
When a customer posts an Instant request:

1. The request broadcasts to **all online, verified providers** registered for that mode in the service area
2. You have **exactly 90 seconds** to accept
3. The **first verified provider to accept** wins the job
4. The job is immediately booked with escrow locked
5. No bidding, no negotiation — the customer's posted budget is the price

:::important
Instant Jobs are first-come, first-served. Speed matters. The provider who accepts in 5 seconds wins over the provider who accepts in 30 seconds, regardless of score or reviews.
:::

---

## Going Online for Instant Jobs

To receive Instant requests:

1. Navigate to **/instant/provider**
2. Toggle **"Online"** — this activates your availability
3. While online, the page polls for new requests **every 3 seconds**
4. When a job appears, you'll see: mode, pickup location, drop-off location, and budget
5. Click **"Accept"** to win the job

### What You See on an Instant Request
- Transport mode (taxi, limo, or courier)
- Pickup address
- Drop-off address
- Customer's budget (this becomes the agreed price)
- Distance estimate

---

## Winning Strategies for Instant Jobs

### Availability Is Everything
- Stay online during **peak hours** — morning commute (6-9 AM), lunch (11 AM-1 PM), evening (5-8 PM)
- Weekend evenings are prime for limo and rideshare
- Business districts on weekdays are prime for courier

### Speed of Response
- Keep the Instant page open and active — don't minimize it
- Accept within the first 10 seconds whenever possible
- Your phone should be charged and your internet connection stable

### Only Accept What You Can Start NOW
- Instant means **immediately**. Not "in an hour" — now.
- If you're 30 minutes from the pickup location, don't accept
- If you're on another job, don't accept

![Real-time dispatch for on-demand transportation services](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80)

---

## What Happens If No One Accepts?

If no provider accepts within 90 seconds:

1. The Instant request **automatically converts** to a standard posting
2. The customer's budget is refunded to their wallet (posting fee and protection fee are kept)
3. The job enters the regular bidding queue where all registered providers can bid

:::tip
Instant Jobs are excellent for building volume quickly. The jobs tend to be smaller (taxi rides, courier deliveries averaging $15-$100), but the speed means you can complete **3-5 Instant Jobs per day** and rapidly build your CouthActs Score. Five completed Instant Jobs with 5-star reviews in your first week is a powerful foundation.
:::

---

## Instant Jobs and Your Score

Every Instant Job is a full CouthActs booking. It counts toward:
- Your completion rate (complete it = positive)
- Your on-time rate (be there on time = positive)
- Customer reviews (earn 5 stars = positive)
- Your total job count (more jobs = faster score growth)

:::key
Think of Instant Jobs as your accelerator. Standard postings pay more per job, but Instant Jobs let you build volume, reviews, and reputation faster than any other method on the platform. The best new providers use Instant Jobs for their first 10-15 completions, then transition to higher-value standard jobs.
:::`,
  },
  {
    title: "Getting Paid — Escrow, Wallet, and Stripe Connect",
    order: 7,
    durationMins: 15,
    content: `## Understanding How Money Flows on CouthActs

![Secure financial transactions and payment processing](https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80)

The financial infrastructure of CouthActs is designed around one principle: **neither party takes on unnecessary risk**. The customer's money is secured before any provider touches the cargo. The provider is guaranteed payment upon confirmed completion. Understanding this flow is critical for your business.

---

## The Escrow Lifecycle

### Step 1: Budget Hold
When a customer posts a job, their full budget is held in their **CouthActs Wallet**. This means the money is already committed — it's not a promise to pay, it's cash in escrow.

### Step 2: Bid Acceptance
When the customer accepts your bid, an escrow record is created for the **agreed amount** (your bid price). If your bid is lower than the posted budget, the difference is refunded to the customer immediately.

### Step 3: Job Execution
While you perform the job, the funds sit in escrow. They cannot be released, refunded, or moved until both parties confirm completion.

### Step 4: Mutual Confirmation
Both the customer and provider must mark the job as complete. PIN confirmation at delivery can also trigger the provider's completion mark automatically.

### Step 5: Escrow Release
Once both parties confirm, the escrow releases:
- The **platform fee** (1-8%) is deducted
- The **remaining amount** is credited to your CouthActs Wallet

:::key
The escrow system means you will **always get paid** for completed work. The money is locked before you start. No invoicing, no chasing payments, no bad debt. This is the CouthActs guarantee.
:::

---

## The CouthActs Wallet

Your wallet is your central financial hub on CouthActs:

- **Earnings** from completed jobs are credited here
- **Withdrawals** to your bank account are initiated here
- **Transaction history** shows every credit, debit, and escrow event
- **PDF receipts** are available for every transaction

![Digital wallet and financial management dashboard](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80)

---

## Setting Up Stripe Connect

To withdraw money from your CouthActs Wallet to your bank account, you need **Stripe Connect**:

1. Go to **Settings → Payout Account**
2. Click **"Set Up Payout Account"**
3. You're redirected to Stripe's secure onboarding page
4. Stripe asks for: business details, bank account information, and identity verification
5. Once complete, you're redirected back to CouthActs

:::important
Stripe's identity verification is **separate from CouthActs KYC**. Even though you've already verified your identity on CouthActs, Stripe requires its own verification for regulatory compliance. This is a standard requirement for all payment platforms.
:::

### Withdrawal Options
Once Stripe Connect is set up, you can withdraw at any time:

- **Standard withdrawal** — Free. Arrives in 2-5 business days.
- **Instant payout** (if supported by your bank) — 1.5% fee. Arrives within 30 minutes.
- **Minimum withdrawal** — $10

There is **no CouthActs fee** for standard withdrawals. Only Stripe's standard transfer fees apply.

---

## The Escrow Fee Schedule

The escrow fee is deducted from your payout on completion:

- Under $500 → **8%**
- $500 – $5,000 → **6%**
- $5,000 – $50,000 → **4%**
- $50,000 – $500,000 → **2%**
- Above $500,000 → **1%** (capped at $10,000)

:::tip
Always factor the escrow fee into your bid price. On a $1,000 job (6% bracket), the escrow fee is $60, leaving you $940. If your costs are $850, your profit is $90, not $150. Price accordingly.
:::

---

## CouthActs Advance (Preview)

For **Elite providers** (Score 90+, 50+ completed jobs), CouthActs Advance lets you access **70% of the escrow amount** before the job is complete.

- Advance rate: 70% of confirmed escrow
- Advance fee: 2.5% of the advanced amount
- Credited instantly to your CouthActs Wallet
- Fee deducted from final payout on completion

This is a powerful cash-flow tool for providers who need capital to fund operations on active jobs. You'll learn more about qualifying for Advance as you build your CouthActs career.`,
  },
  {
    title: "Your First 30 Days — Building a 5-Star Reputation",
    order: 8,
    durationMins: 15,
    content: `## The 30-Day Playbook

![Professional driver building a successful transportation career](https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&q=80)

Your first 30 days on CouthActs set the trajectory for your entire provider career. The providers who reach Trusted tier (75+) within their first 60 days are the ones who follow a disciplined approach. Here's the exact playbook.

---

## Week 1: Foundation (Days 1-7)

### Days 1-3: Get Verified
- Complete your provider profile (bio, modes, service areas, photos)
- Submit **KYC verification** ($20) — do this on Day 1, not Day 10
- If applicable, submit **KYB business documents** (1-3 day review)
- Set up **Stripe Connect** for payouts
- **Do not bid on anything yet** — get verified first

:::warning
The #1 mistake new providers make is trying to bid before verification. You cannot bid without KYC. Every day you delay verification is a day of lost revenue.
:::

### Days 4-7: First Jobs
- Start with **small, local jobs** in your strongest mode
- Your first 5 jobs should be ones you can **absolutely crush** — on time, great communication, no issues
- For instant-eligible modes (taxi, limo, courier): go online for Instant Jobs during peak hours
- Target: **3-5 completed jobs** by end of Week 1

---

## Week 2: Build Momentum (Days 8-14)

### Increase Volume
- Bid on more jobs — aim for 3-5 bids per day on relevant postings
- Respond to every opportunity within **1 hour** (10 response time points)
- Set up the **availability calendar** so customers can see when you're active

### Communication Standards
At this stage, establish your communication rhythm:
1. **Bid message** — Specific, professional, relevant experience
2. **After acceptance** — Acknowledge within 30 minutes with pickup details
3. **Pre-pickup** — 2-hour advance update with ETA
4. **At pickup** — QR/PIN confirmation + cargo photo
5. **In transit** — Updates at major milestones
6. **At delivery** — QR/PIN confirmation + delivery photo
7. **After completion** — Thank you + review request

![Building customer relationships through professional communication](https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&q=80)

:::tip
After every successful delivery, send this message: "Thank you for choosing CouthActs. If you were satisfied with the service, I'd really appreciate a review — it helps me serve more customers like you." Most satisfied customers will leave a review if asked directly.
:::

---

## Week 3: Optimize (Days 15-21)

### Review Your Score Breakdown
By now you should have 8-12 completed jobs. Check your CouthActs Score and identify weak areas:

- **Low completion rate?** — You're accepting jobs you shouldn't. Be more selective.
- **Low on-time rate?** — You're underestimating transit times. Add buffer.
- **Low reviews?** — You're not asking for them. Start asking after every delivery.
- **Slow response time?** — Set up notifications and check the platform hourly.

### Expand Your Reach
- If you're in an instant-eligible mode, increase your online hours
- Start bidding on jobs slightly outside your core area
- Consider adding adjacent modes if you have the equipment

---

## Week 4: Consolidate (Days 22-30)

### Target Numbers by Day 30
- **10-15 completed jobs** minimum
- **4.5+ average rating** (ask for reviews!)
- **90%+ on-time rate**
- **Under 2-hour average response time**
- **CouthActs Score: 60-70+** (Established tier or better)

### Build Repeat Relationships
- Follow up with customers who gave you 5 stars
- Mention your availability for future jobs
- Be consistent on pricing — repeat customers value predictability

![Successful fleet operation and business growth on CouthActs](https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1200&q=80)

---

## The Communication Rules That Win 5 Stars

These are non-negotiable standards for every CouthActs provider:

1. **Acknowledge every booking within 30 minutes** — "Thank you for selecting me. I'll be at [address] at [time]."
2. **Send a status update before pickup** — "On my way, ETA 20 minutes."
3. **Notify immediately if there's any delay** — Never let the customer discover a delay on their own
4. **At delivery, confirm via PIN** and send a completion message
5. **After completion, politely ask for a review**

:::key
It's not about being the cheapest provider on CouthActs. It's about being the most **reliable**. The providers who reach Elite tier in their first 90 days are the ones who communicate proactively, deliver on time every single time, and never accept jobs they can't fulfill. Your reputation is your most valuable asset — protect it from Day 1.
:::`,
  },
];
