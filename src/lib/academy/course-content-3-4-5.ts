/**
 * CouthActs Academy — Courses 3, 4, and 5
 * Rich lesson content with markup: headers, callouts, images, lists
 */

const COURSE_3 = [
  {
    title: "HAZMAT Classification — The 9 Classes",
    order: 1,
    durationMins: 20,
    content: `## Understanding Hazardous Materials Classification

![Hazardous materials storage and handling](https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80)

The United Nations classifies hazardous materials into **9 classes** based on their primary hazard characteristics. Every HAZMAT professional must know these classes cold — they dictate packaging, labeling, placarding, segregation, and emergency response. Misclassification is not a paperwork error; it is a safety failure that can result in catastrophic incidents, criminal liability, and fines exceeding $500,000.

---

## The 9 UN Hazard Classes

### Class 1 — Explosives
Divided into **6 divisions** based on blast and projection risk:
- **1.1** — Mass explosion hazard (dynamite, TNT, detonating cord)
- **1.2** — Projection hazard but not mass explosion (certain ammunition, aerial flares)
- **1.3** — Fire hazard with minor blast or projection (rocket propellant, display fireworks)
- **1.4** — Minor explosion hazard confined to the package (small arms ammunition, practice grenades)
- **1.5** — Very insensitive blasting agents (ammonium nitrate/fuel oil mixtures)
- **1.6** — Extremely insensitive detonating articles (low-vulnerability military munitions)

:::warning
Class 1 materials require specific compatibility group designations (A through S). Two Class 1 materials from incompatible groups must NEVER be loaded together. This is not a guideline — it is federal law under 49 CFR 177.848.
:::

### Class 2 — Gases
- **2.1** — Flammable gases: propane, acetylene, hydrogen, butane
- **2.2** — Non-flammable, non-toxic gases: nitrogen, helium, compressed air, CO2
- **2.3** — Toxic gases: chlorine, ammonia, hydrogen sulfide, phosgene

### Class 3 — Flammable Liquids
Materials with a flash point below **60°C (140°F)**. Examples: gasoline (UN1203), acetone (UN1090), ethanol (UN1170), diesel fuel, aviation fuel. This is the most commonly transported HAZMAT class on CouthActs.

### Class 4 — Flammable Solids
- **4.1** — Flammable solids: matches, sulfur, celluloid, activated carbon
- **4.2** — Spontaneously combustible: white phosphorus, aluminum alkyls, certain metal powders
- **4.3** — Dangerous when wet: sodium, potassium, calcium carbide, lithium

:::important
Class 4.3 materials react violently with water, producing flammable or toxic gases. Never use water-based fire suppression on these materials. Refer to ERG Guide 138 or 139 for proper response.
:::

### Class 5 — Oxidizers and Organic Peroxides
- **5.1** — Oxidizers: hydrogen peroxide (>8%), potassium permanganate, calcium hypochlorite, ammonium nitrate
- **5.2** — Organic peroxides: benzoyl peroxide, methyl ethyl ketone peroxide

### Class 6 — Toxic and Infectious Substances
- **6.1** — Toxic substances: pesticides, cyanide compounds, arsenic, lead compounds
- **6.2** — Infectious substances: Category A (UN2814/UN2900) and Category B (UN3373) — medical waste, diagnostic specimens, viral cultures

### Class 7 — Radioactive Materials
Any material with a specific activity greater than **70 kBq/kg** (2 nCi/g). Transported in Types A, B, or C packages depending on activity level. Requires additional DOT and NRC approvals.

### Class 8 — Corrosives
Substances that cause visible destruction of skin tissue or corrode steel/aluminum at a rate exceeding 6.25 mm/year. Examples: sulfuric acid (UN1830), hydrochloric acid (UN1789), sodium hydroxide (UN1824), battery acid.

### Class 9 — Miscellaneous Dangerous Goods
Hazards not fitting other classes: lithium batteries (UN3480/UN3481), magnetized materials, dry ice (UN1845), environmentally hazardous substances (UN3077/UN3082), elevated-temperature materials.

---

## CouthActs HAZMAT Posting Requirements

![Warehouse with organized cargo storage](https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=80)

On CouthActs, every HAZMAT posting requires the customer to specify:
1. **Hazard class and division** (e.g., Class 3, or Class 2, Division 2.1)
2. **UN/NA identification number** (e.g., UN1203 for gasoline)
3. **Proper shipping name** (from the 49 CFR 172.101 Hazardous Materials Table)
4. **Packing group** (I, II, or III)
5. **Total quantity** (weight, volume, or number of packages)
6. **Emergency contact** (24-hour number)

:::key
Only providers with a verified HAZMAT endorsement on their CDL AND the CouthActs HAZMAT certification badge can view and bid on HAZMAT postings. The platform enforces this automatically — if your credentials are missing, HAZMAT jobs simply do not appear in your feed.
:::

Understanding these 9 classes is not optional knowledge. It is the foundation upon which every other HAZMAT skill is built — packaging, placarding, segregation, emergency response, and CouthActs compliance all flow directly from proper classification.`
  },
  {
    title: "Packaging Requirements per 49 CFR 173",
    order: 2,
    durationMins: 20,
    content: `## Packaging: The First Line of Defense

![Organized warehouse with packaged materials](https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=80)

Proper packaging is what stands between a routine shipment and a catastrophic release. Title 49 CFR Part 173 establishes the federal requirements for packaging hazardous materials in the United States. Every container, drum, box, cylinder, and intermediate bulk container used for HAZMAT transport must meet these standards.

The philosophy behind 49 CFR 173 is **performance-oriented packaging standards (POPS)**. Rather than prescribing exact packaging designs, the regulation defines performance tests that packaging must pass. If your packaging passes the tests, it is authorized — regardless of its specific construction.

---

## Performance-Oriented Packaging Standards

All HAZMAT packaging must pass a series of tests appropriate to the material and packing group:

### Drop Test
- **PG I**: 1.8 meters (5.9 feet) drop onto a rigid, non-resilient surface
- **PG II**: 1.2 meters (3.9 feet) drop
- **PG III**: 0.8 meters (2.6 feet) drop

The package must not leak after the drop. This simulates real-world handling — packages get dropped during loading and unloading.

### Stacking Test
Packages must withstand a stacking load equivalent to the weight of identical packages stacked to a height of **3 meters (9.8 feet)** for a minimum of 24 hours. This simulates warehouse and vehicle stacking conditions.

### Internal Pressure Test
For liquids: the package must withstand internal gauge pressure without leaking. The required pressure varies by packing group but is never less than **20 kPa (2.9 psi)** above vapor pressure at 55°C.

### Vibration Test
Packages must survive vibration testing per ASTM D999 or equivalent, simulating the constant vibration of road transport over long distances.

---

## Packing Groups: Degrees of Danger

:::important
Packing Groups determine how robust the packaging must be. They are assigned based on the degree of danger the material presents:
- **Packing Group I** — Great danger (most stringent packaging requirements)
- **Packing Group II** — Medium danger
- **Packing Group III** — Minor danger

Not all HAZMAT classes use packing groups. Classes 1 (Explosives), 2 (Gases), 5.2 (Organic Peroxides), 6.2 (Infectious), and 7 (Radioactive) have their own packaging criteria.
:::

For Class 3 (Flammable Liquids), packing group assignment is based on flash point and boiling point:
- **PG I**: Boiling point ≤ 35°C (regardless of flash point)
- **PG II**: Flash point < 23°C and boiling point > 35°C
- **PG III**: Flash point ≥ 23°C and ≤ 60°C

---

## UN Specification Markings

Every authorized HAZMAT package bears a **UN specification marking** — a coded stamp that tells you exactly what the packaging is rated for.

Example marking: **UN 4G/Y25/S/USA/2025**

Breaking this down:
- **UN** — United Nations certified
- **4G** — Package type (4 = box, G = fiberboard)
- **Y** — Packing group rating (X = PG I/II/III, Y = PG II/III, Z = PG III only)
- **25** — Maximum gross mass in kilograms
- **S** — Packaging intended for solids
- **USA** — Country of manufacture
- **2025** — Year of manufacture

### Common Package Type Codes
- **1A1/1A2** — Steel drums (non-removable/removable head)
- **1H1/1H2** — Plastic drums
- **4G** — Fiberboard boxes
- **6HA1** — Composite packaging (plastic inner, steel outer)
- **3H1/3H2** — Plastic jerricans

![Safety equipment and compliance materials](https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80)

---

## Inner and Outer Packaging

Many HAZMAT materials require **combination packaging**: inner containers (glass bottles, plastic bottles, metal cans) placed inside outer packaging (fiberboard boxes, wooden crates, steel drums) with cushioning and absorbent material between them.

:::tip
When inspecting HAZMAT packages before transport, verify these four things:
1. The UN specification marking is present and legible
2. The marking matches or exceeds the packing group of the material being shipped
3. There is no visible damage, leaking, or deformation
4. The closure devices (caps, lids, bungs) are properly secured
:::

---

## CouthActs Packaging Compliance

When you accept a HAZMAT job on CouthActs, you are confirming that the packaging meets 49 CFR 173 requirements. At pickup, photograph the UN specification markings on each package and upload them via the **DOCUMENT_POD_AI** tracking layer. This creates a timestamped, geotagged record of packaging compliance that protects you in any subsequent investigation or dispute.

Failure to properly package HAZMAT materials can result in civil penalties exceeding **$500,000 per violation** and criminal prosecution under 49 U.S.C. 5124. Never transport a package that appears damaged, leaking, or improperly marked.`
  },
  {
    title: "Shipping Papers and Documentation",
    order: 3,
    durationMins: 20,
    content: `## The Paper Trail That Saves Lives

![Safety documentation and compliance](https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80)

Shipping papers are the critical communication link between shippers, carriers, and emergency responders. In a HAZMAT incident, the first thing a hazmat team looks for — after placards — is the shipping papers. They tell responders exactly what materials are involved, how much is present, and who to call for technical guidance.

Under **49 CFR 172.200**, no carrier may transport a hazardous material unless the shipper provides properly completed shipping papers. No exceptions. No shortcuts.

---

## Required Information on Shipping Papers

Every HAZMAT shipping paper must include the following information for each hazardous material in the shipment, **in this specific order**:

1. **Proper Shipping Name** — The exact name from the Hazardous Materials Table (49 CFR 172.101). Not a brand name, not a chemical formula, not an abbreviation. Example: "Gasoline" — not "unleaded fuel" or "petrol."

2. **Hazard Class or Division** — The numerical class/division. Example: "3" for flammable liquids, "2.1" for flammable gases.

3. **UN/NA Identification Number** — The four-digit code preceded by "UN" (international) or "NA" (North America only). Example: "UN1203" for gasoline.

4. **Packing Group** — Roman numerals I, II, or III. Example: "PG II" for gasoline.

5. **Total Quantity** — By weight, volume, or activity level (for radioactive). Must include units. Example: "5,000 gallons" or "22,000 lbs."

:::warning
The basic description (items 1-4 above) must appear in sequence with no additional information inserted between them. Additional descriptive information can follow the basic description but cannot break the sequence. Violating this sequence is a citable offense.
:::

### Additional Required Entries
- **Emergency response telephone number** — A 24-hour number answered by a person (not voicemail) who can provide immediate guidance. CHEMTREC (1-800-424-9300) is commonly used.
- **Emergency response information** — Either included on the shipping paper or referenced to the ERG guide number.
- **Shipper's certification** — A signed statement that the material is properly classified, described, packaged, marked, labeled, and in proper condition for transport.

---

## Shipping Paper Placement Rules

:::important
49 CFR 177.817 requires specific placement of shipping papers in the vehicle:
- **While driving**: Within the driver's immediate reach while restrained by the seat belt
- **While not in the vehicle**: On the driver's seat OR in a holder mounted on the inside of the driver's door

These placement rules exist so emergency responders can quickly locate the papers if the driver is incapacitated. This is not a convenience rule — it is a life-safety requirement.
:::

---

## Identifying HAZMAT Entries

When a shipment contains both hazardous and non-hazardous items, the HAZMAT entries must be distinguished from non-hazardous entries by one of these methods:
- Listing them **first** on the shipping paper
- Highlighting or printing them in a **different color**
- Placing an **"X"** in a column titled "HM" before each hazardous entry

![Hazardous materials transport documentation](https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80)

---

## Special Documentation Scenarios

### Residue Shipments
Empty packaging that previously contained HAZMAT (with residue) must still be documented. The proper shipping name is preceded by the word "RESIDUE:" — for example: "Residue: Last Contained UN1203, Gasoline, 3, PG II."

### Reportable Quantities (RQ)
If a material meets the reportable quantity threshold under CERCLA, the letters "RQ" must appear before or after the basic description. This triggers mandatory notification to the National Response Center in case of a release.

### Marine Pollutants
Materials classified as marine pollutants must include the words "Marine Pollutant" on the shipping paper. This is critical for shipments that may travel by vessel.

---

## CouthActs Digital Verification

On CouthActs, HAZMAT booking details include all of the information required on shipping papers — proper shipping name, hazard class, UN number, packing group, quantity, and emergency contact. This digital record serves as a cross-reference, **not a replacement** for physical shipping papers.

:::tip
At pickup, compare the physical shipping papers against the CouthActs booking details. Verify that these match:
1. Proper shipping name
2. UN/NA number
3. Hazard class
4. Packing group
5. Quantity

If there is ANY discrepancy, do not depart. Report the discrepancy immediately through the CouthActs tracking system. Upload a photo of the physical shipping papers via DOCUMENT_POD_AI for the record.
:::

Proper documentation is not bureaucracy — it is the information that saves lives when something goes wrong. Treat every shipping paper as if an emergency responder's life depends on its accuracy, because it very well might.`
  },
  {
    title: "Placarding and Marking Requirements",
    order: 4,
    durationMins: 20,
    content: `## The Visual Language of Hazard Communication

![Safety signage and compliance](https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80)

Placards are the diamond-shaped signs displayed on transport vehicles carrying hazardous materials. They are the first — and sometimes only — information available to emergency responders approaching an incident scene. A firefighter arriving at a highway accident needs to know within seconds whether to approach with water, foam, or not at all. Placards provide that answer.

**49 CFR 172 Subpart F** governs all placarding requirements for highway transport of HAZMAT in the United States.

---

## Placard Specifications

Every HAZMAT placard must meet these minimum specifications:
- **Size**: At least **250mm x 250mm** (approximately 10 inches) on each side, oriented as a diamond (rotated 45 degrees)
- **Visibility**: Readable from a distance of **50 meters** (approximately 165 feet)
- **Placement**: Displayed on **all four sides** of the vehicle or container — front, rear, left side, and right side
- **Condition**: Maintained so that color, symbols, numbers, and text are clearly visible and not obscured by dirt, damage, or ladders/equipment

:::warning
A placard that is faded, damaged, or partially obscured is treated as a missing placard under federal enforcement. Keep placards clean and replace any that show signs of wear. The cost of replacement placards is trivial compared to the $25,000+ fine for a placarding violation.
:::

---

## Table 1 vs. Table 2 Materials

The placarding regulations divide HAZMAT into two tables that determine WHEN placarding is required:

### Table 1 — Always Placarded (Any Quantity)
These materials are so dangerous that even small quantities require full placarding:
- **Explosives 1.1, 1.2, 1.3** — Mass explosion or projection hazard
- **Poison Gas 2.3** — Toxic gas inhalation
- **Dangerous When Wet 4.3** — Violent reaction with water
- **Organic Peroxide Type B 5.2** — Detonation risk
- **Toxic 6.1 (PG I, Inhalation Hazard)** — Lethal on inhalation
- **Radioactive Yellow III 7** — Highest radiation transport category

### Table 2 — Placarded Above 1,001 lbs Aggregate
All other HAZMAT classes require placarding when the **aggregate gross weight** of all Table 2 materials aboard exceeds 1,001 pounds (454 kg):
- Explosives 1.4, 1.5, 1.6
- Flammable Gas 2.1
- Non-Flammable Gas 2.2
- Flammable Liquid 3
- Flammable Solid 4.1
- Spontaneously Combustible 4.2
- Oxidizer 5.1
- Toxic 6.1 (PG II and III)
- Corrosive 8
- Miscellaneous 9

:::key
The 1,001-pound threshold for Table 2 materials is **aggregate** — meaning the total weight of ALL Table 2 materials combined, not each individual material. If you are carrying 600 lbs of Class 3 and 500 lbs of Class 8, you have 1,100 lbs aggregate and must placard for both.
:::

---

## The DANGEROUS Placard

![Warehouse logistics and cargo management](https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=80)

When transporting a mixed load of **two or more Table 2 materials** that require placarding, you have two options:

1. **Individual placards** for each hazard class on all four sides of the vehicle
2. A single **DANGEROUS** placard on all four sides — BUT only if no single Table 2 material exceeds **5,000 lbs**

:::important
The DANGEROUS placard is a convenience, not a loophole. If ANY single Table 2 material exceeds 5,000 lbs, you MUST use that material's specific class placard in addition to or instead of the DANGEROUS placard. Table 1 materials can NEVER be substituted with the DANGEROUS placard — they always require their own specific placard.
:::

### DANGEROUS Placard Rules Summary
- Applies only to Table 2 materials
- Only when no single material exceeds 5,000 lbs
- Replaces individual class placards for the mixed load
- Cannot replace Table 1 material placards under any circumstances

---

## Four-Digit UN Number Display

For loads of **4,000 kg (8,820 lbs) or more** of a single HAZMAT material, the four-digit UN identification number must be displayed:
- On an **orange rectangular panel** (UN number panel) adjacent to the placard, OR
- On the **placard itself** in the center space

This gives responders immediate identification of the specific material without needing to access shipping papers.

---

## Marking Requirements

In addition to placards, individual packages must bear:
- **Proper shipping name** and **UN/NA number**
- **Hazard warning labels** (smaller versions of placards, 100mm minimum)
- **Orientation arrows** (for liquid-containing packages)
- **Overpack marking** ("OVERPACK") if inner packages are inside an outer overpack

---

## CouthActs Placard Documentation

On CouthActs, HAZMAT tracking events should include a **photograph of the vehicle showing placards** on at least two visible sides. Upload this via the DOCUMENT_POD_AI tracking layer at departure.

:::tip
Best practice for CouthActs HAZMAT jobs:
1. Photograph the front and driver-side placards at departure
2. Photograph the rear placards at every fuel/rest stop (confirms they have not fallen off or been obscured)
3. Include the UN number panel in your photos when applicable
4. Upload all photos as DOCUMENT_POD_AI tracking events with descriptive notes

This creates an irrefutable compliance record that protects you in investigations, audits, and CouthActs disputes.
:::`
  },
  {
    title: "Loading, Unloading, and Compatibility",
    order: 5,
    durationMins: 20,
    content: `## Why Compatibility Rules Exist

Improper loading of incompatible hazardous materials has caused some of the worst transportation disasters in history. When an oxidizer contacts a flammable liquid due to a packaging breach, the result can be an uncontrollable fire or explosion. When an acid contacts a base in a confined space, violent exothermic reactions produce toxic fumes. Compatibility rules exist to prevent these scenarios.

**49 CFR 177.848** establishes the Segregation and Separation Chart — the definitive reference for which hazard classes can share the same vehicle and which must be kept apart.

![Warehouse and cargo management](https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=80)

---

## The 49 CFR 177.848 Segregation Chart

The segregation chart uses four levels of separation:

1. **May be loaded together** — No special requirements beyond proper packaging
2. **Must be separated** — Different packages, with non-HAZMAT cargo or a minimum separation distance between them
3. **Must be separated by a full vehicle compartment** — A physical bulkhead or separate trailer/container
4. **Must not be transported on the same vehicle** — Period. No exceptions.

---

## Key Incompatibilities Every HAZMAT Provider Must Know

### Oxidizers (5.1) — The Most Dangerous Mixing Partner
- **NEVER** with flammable liquids (Class 3)
- **NEVER** with flammable solids (Class 4.1)
- **NEVER** with organic peroxides (Class 5.2)
- **NEVER** with spontaneously combustible materials (Class 4.2)

:::warning
Oxidizers provide oxygen to fires. Mixing them with anything flammable creates conditions for a fire that cannot be extinguished by removing the oxygen supply — because the oxidizer IS the oxygen supply. This is how routine shipments become infernos.
:::

### Acids and Bases (Both Class 8)
- Acids (sulfuric acid, hydrochloric acid) must be separated from bases (sodium hydroxide, potassium hydroxide)
- Both are Class 8, but their reaction produces extreme heat and potentially toxic fumes
- When both acids and bases must be shipped on the same vehicle, they must be in separate compartments

### Poisons (6.1) — Food Safety
- Toxic substances (Class 6.1) must be separated from foodstuffs, animal feed, and any material intended for human or animal consumption
- This applies even to empty food containers that will be reused

### Radioactive (Class 7) — Distance Requirements
- Radioactive materials have specific distance separation requirements from all other classes
- Minimum distances are determined by the Transport Index (TI) value on the radioactive label
- Exceeding the allowable TI aggregate in a single vehicle is a federal violation

### Explosives (Class 1) — Compatibility Groups
- Class 1 materials are further subdivided into **compatibility groups** (A through S)
- Only materials from the same compatibility group can be loaded together (with a few specific exceptions)
- Class 1 can never be loaded with Class 5.1 or Class 5.2

---

## Loading Procedures for HAZMAT

![Safety compliance in transportation](https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80)

Follow these procedures for every HAZMAT loading operation:

### Before Loading
1. **Verify compatibility** — Consult the 49 CFR 177.848 segregation chart for every combination of materials being loaded
2. **Inspect the vehicle** — Confirm the cargo area is clean, dry, and free from residue of previous loads
3. **Verify placards** — Ensure correct placards are available and ready for display
4. **Review packaging** — Inspect every package for damage, leaks, or missing markings before loading

### During Loading
1. **Secure all packages** to prevent movement — shifting HAZMAT cargo can rupture packaging during transit
2. **Observe stacking limits** — The UN specification marking on each package indicates its maximum stacking weight. Never exceed it.
3. **Ensure adequate ventilation** — For toxic (6.1) or flammable gases (2.1), the cargo area must have ventilation provisions
4. **Never use hooks or pointed tools** that could puncture packaging, unless the tool is specifically designed for that package type
5. **Load floor-level first** — Heavier packages on the bottom, lighter packages on top, with no unsupported overhangs

:::tip
For mixed HAZMAT loads, load incompatible materials at opposite ends of the trailer with non-HAZMAT cargo between them. This maximizes physical separation within the vehicle. Place the most dangerous materials (Table 1) nearest to the rear door for fastest emergency access.
:::

### After Loading
1. **Photograph the loaded cargo** — Upload via DOCUMENT_POD_AI on CouthActs. Include images showing cargo securement, placard placement, and general load arrangement.
2. **Verify door seals** — If using tamper-evident seals, record the seal number in a tracking note
3. **Complete QR_PIN confirmation** — Execute the CouthActs pickup confirmation to establish chain of custody
4. **Verify shipping papers** — Confirm all materials loaded match the shipping paper descriptions exactly

---

## Unloading Procedures

Unloading requires the same care as loading:
- Never drag, drop, or roll packages unless the packaging is designed for it
- Inspect every package during unloading for damage that may have occurred during transit
- Document the delivery condition with photos via DOCUMENT_POD_AI
- Complete QR_PIN delivery confirmation
- If any package shows signs of damage or leaking, **do not continue unloading** — isolate the area, consult the ERG, and contact emergency services if necessary

:::key
On CouthActs, your loading and unloading documentation via the tracking system is your strongest defense against damage claims. A timestamped photo of cargo in perfect condition at delivery proves that damage did not occur during your transport.
:::`
  },
  {
    title: "Emergency Response Guidebook (ERG)",
    order: 6,
    durationMins: 20,
    content: `## Your First 30 Minutes: The ERG

![Safety and emergency preparedness](https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80)

The **Emergency Response Guidebook (ERG)** is published jointly by the U.S. Department of Transportation (DOT), Transport Canada, and Mexico's Secretariat of Communications and Transport (SCT). It is updated every four years, with the current edition being the 2024 ERG.

The ERG provides **first-responder guidance for the initial 15-30 minutes** of a hazardous materials incident. It is not a comprehensive remediation guide. It is not a substitute for professional HAZMAT response teams. It is a critical tool for making immediate, life-saving decisions before specialists arrive.

:::warning
Federal law requires the ERG to be in every vehicle transporting hazardous materials. Failure to carry a current ERG is a citable violation under 49 CFR 172.602. Keep a physical copy in your cab — digital versions on a phone are helpful but not a legal substitute.
:::

---

## The Four Color-Coded Sections

The ERG is organized into four color-coded sections. Each section serves a specific purpose in the emergency response sequence.

### Yellow-Bordered Pages — Numerical Index by UN/NA Number
- Materials listed in **numerical order** by their 4-digit UN/NA identification number
- Each entry shows: UN/NA number, proper shipping name, guide number, and whether the material has initial isolation distances (highlighted entries)
- **Use this section when you know the UN/NA number** from shipping papers, placards, or package markings

### Blue-Bordered Pages — Alphabetical Index by Material Name
- Materials listed in **alphabetical order** by proper shipping name
- Same information as yellow pages but organized for when you know the material name but not the UN number
- **Use this section when you know the material name** but cannot read the UN number

### Orange-Bordered Pages — Emergency Response Guides
- Numbered guides (Guide 111 through Guide 175) providing specific response information
- Each guide contains three sections:
  1. **POTENTIAL HAZARDS** — Fire/explosion risks, health hazards
  2. **PUBLIC SAFETY** — Protective actions, evacuation distances, protective clothing
  3. **EMERGENCY RESPONSE** — Fire response, spill/leak response, first aid

### Green-Bordered Pages — Initial Isolation and Protective Action Distances
- Tables for materials that produce **toxic-by-inhalation (TIH)** hazards
- Provides specific distances in meters and feet for:
  - **Initial Isolation Zone** — The radius around the spill where all persons should be evacuated immediately
  - **Protective Action Distance** — The downwind distance within which persons should be sheltered-in-place or evacuated

---

## How to Use the ERG: Step-by-Step

![Hazardous materials identification](https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80)

### Step 1: Identify the Material
- **Best source**: Shipping papers (accessible in the cab or on the driver's door)
- **Second source**: UN number on placards or orange panels
- **Third source**: Package labels and markings
- **Last resort**: If no identification is possible, use the placard's hazard class symbol to find the appropriate guide in the Table of Placards inside the front cover

### Step 2: Look Up the Guide Number
- If you have the **UN/NA number**: Go to the yellow-bordered pages, find the number, and note the guide number (three-digit number in the right column)
- If you have the **material name**: Go to the blue-bordered pages, find the name, note the guide number
- If the entry is **highlighted** (green shading in yellow/blue pages): The material has toxic inhalation hazard — check the green-bordered pages immediately after reading the orange guide

### Step 3: Turn to the Guide (Orange Pages)
Read the guide in order:
1. **POTENTIAL HAZARDS** — Understand what could happen
2. **PUBLIC SAFETY** — Establish isolation zone, call 911, identify protective actions
3. **EMERGENCY RESPONSE** — Take appropriate action for fire, spill, or medical exposure

### Step 4: Check Green Pages (If Highlighted)
For highlighted materials, the green-bordered pages provide two distance tables:
- **Small spills** (single package, small container) — distances for day vs. night conditions
- **Large spills** (multiple packages, large container, tanker) — distances for day vs. night conditions

:::important
Night distances are always LARGER than day distances because atmospheric conditions at night trap gases closer to the ground, extending the hazard zone. A daytime isolation distance of 100 meters may become 400 meters at night.
:::

---

## Key Guides to Know

Some guides are encountered more frequently than others on CouthActs HAZMAT jobs:
- **Guide 128** — Flammable Liquids (Class 3): Gasoline, diesel, alcohol, solvents
- **Guide 115** — Flammable Gases (Class 2.1): Propane, butane, acetylene
- **Guide 154** — Toxic Substances (Class 6.1): Pesticides, industrial chemicals
- **Guide 137** — Oxidizers (Class 5.1): Hydrogen peroxide, ammonium nitrate
- **Guide 171** — Radioactive Materials (Class 7): Medical and industrial isotopes

---

## CouthActs Emergency Protocol

:::tip
If you encounter a HAZMAT emergency during a CouthActs job:
1. Ensure personal safety — move upwind and uphill from any spill
2. Call 911
3. Use the **SOS feature** on CouthActs immediately
4. Include in your SOS message: the **UN number** and **Guide Number** from the ERG
5. Call the **National Response Center**: 1-800-424-8802
6. Call **CHEMTREC**: 1-800-424-9300
7. Do NOT attempt to clean up or contain the spill unless you are trained and equipped for that specific material
:::`
  },
  {
    title: "HAZMAT Tracking and IoT on CouthActs",
    order: 7,
    durationMins: 20,
    content: `## Six Layers of HAZMAT Visibility

![Dashboard and technology monitoring](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80)

CouthActs provides a multi-layered tracking system designed specifically for the heightened requirements of hazardous materials transport. While standard freight may use one or two tracking layers, HAZMAT transport activates up to **six simultaneous layers** — creating a comprehensive surveillance envelope around your shipment from origin to destination.

This is not surveillance for surveillance's sake. Regulatory bodies including the DOT, FMCSA, EPA, and NRC increasingly require real-time tracking and condition monitoring for HAZMAT transport. CouthActs builds this compliance into the platform so you do not need separate systems.

---

## Layer 1: MOBILE_GPS — Position Tracking

The foundation layer. Every CouthActs job uses MOBILE_GPS, but for HAZMAT transport, the reporting interval is tightened:
- **Standard freight**: GPS ping every 5 minutes
- **HAZMAT transport**: GPS ping every **60 seconds**

This provides near-real-time position data to the customer and CouthActs operations team. In an emergency, responders know exactly where the HAZMAT shipment is — not where it was 5 minutes ago.

The customer sees this as a live-updating dot on their tracking page, with speed, heading, and ETA calculated from the GPS stream.

---

## Layer 2: IOT_DEVICE — Condition Monitoring

IoT sensors attached to or inside the cargo provide **environmental condition data** in real time:

### Temperature Monitoring
- **Class 1 (Explosives)**: Many explosives have temperature stability limits. Exceeding them can cause decomposition or detonation.
- **Class 5.2 (Organic Peroxides)**: Several organic peroxides require temperature-controlled transport (PGII/PGIII). The control temperature and emergency temperature are specified in 49 CFR 172.102.
- **Class 6.2 (Infectious Substances)**: Biological specimens require cold chain verification. Temperature excursions can render specimens invalid.
- **Class 2 (Refrigerated Gases)**: Cryogenic liquids must be maintained below their boiling points.

### Humidity Monitoring
- **Class 4.3 (Dangerous When Wet)**: Humidity monitoring provides early warning of moisture exposure that could trigger dangerous reactions.

### Shock/Vibration Monitoring
- Accelerometers detect impacts or vibration exceeding safe thresholds. Critical for Class 1 (Explosives) and Class 5.2 (Organic Peroxides).

:::important
When an IoT sensor detects a reading outside the acceptable range, CouthActs generates an **automated alert** to the provider, the customer, and the operations team simultaneously. You will receive an immediate notification with the specific reading and the threshold that was exceeded. Respond immediately — acknowledge the alert and take corrective action.
:::

---

## Layer 3: GEOFENCE — Zone-Based Alerts

![Highway and route monitoring](https://images.unsplash.com/photo-1494412574643-ff11b0a5eb95?w=1200&q=80)

Geofences are virtual boundaries that trigger automated notifications when the HAZMAT shipment enters or exits a defined zone. CouthActs configures geofences for HAZMAT transport at three levels:

### Regulatory Geofences
- Tunnels and bridges that restrict HAZMAT passage (e.g., Holland Tunnel, Eisenhower Tunnel)
- Urban areas with HAZMAT routing restrictions
- Environmental protection zones near waterways and reservoirs

### Customer Geofences
- **Origin zone**: Triggers "approaching pickup" notification to the customer
- **Destination zone**: Triggers "approaching delivery" notification to the receiving party
- **Intermediate zones**: Customer-defined waypoints for multi-stop routes

### Provider Geofences
- State border crossings (triggers documentation verification prompts)
- Fuel/rest stop proximity alerts
- Weigh station approach notifications

:::tip
When a regulatory geofence alert fires, it means you are approaching or entering a HAZMAT-restricted zone. Verify your route permits HAZMAT passage through this area. If your GPS navigation routed you through a restricted tunnel or bridge, reroute immediately. The alert includes the restriction details and alternative route suggestions.
:::

---

## Layer 4: SATELLITE — Coverage Continuity

Standard cellular-based GPS tracking has dead zones — remote highways, mountain passes, desert stretches, and rural areas. HAZMAT transport cannot afford tracking gaps.

The SATELLITE layer provides continuous position reporting via satellite networks (Iridium, Globalstar) when cellular coverage is unavailable. This ensures:
- **Zero tracking gaps** for the customer and CouthActs operations
- **Continuous compliance** with real-time tracking requirements
- **Emergency communication** capability even without cell service

---

## Layer 5: QR_PIN — Chain of Custody

For HAZMAT transport, **chain of custody** documentation is essential. The QR_PIN layer provides cryptographic proof of handoff at every transfer point:

- **Pickup**: QR scan or PIN entry confirms the HAZMAT cargo was received by the carrier
- **Intermediate transfers**: If the shipment changes hands (e.g., intermodal transfer from truck to rail), each transfer requires a new QR_PIN confirmation
- **Delivery**: Final QR_PIN confirmation closes the chain of custody

Each QR_PIN event is timestamped, geotagged, and cryptographically signed. This creates a tamper-proof record that can be used for regulatory compliance, insurance claims, and dispute resolution.

---

## Layer 6: DOCUMENT_POD_AI — Visual Proof

The document and proof-of-delivery layer powered by AI analysis. For HAZMAT transport, use this layer to capture:

1. **Pre-departure**: Photos of placards on all four sides, shipping papers, and cargo securement
2. **En route checkpoints**: Placard condition, cargo area condition (if accessible), temperature display readings
3. **Delivery**: Cargo condition at delivery, delivery location, recipient confirmation

:::key
The DOCUMENT_POD_AI layer uses AI analysis to automatically verify that placards are visible and readable in your photos, that shipping paper images contain the required fields, and that cargo condition photos show no visible damage. If the AI detects an issue, you receive an immediate prompt to correct and re-photograph.
:::

All six layers working together provide complete visibility over your HAZMAT shipment. This is not overhead — it is the standard of care that protects you, your customer, the public, and your CouthActs reputation.`
  },
  {
    title: "HAZMAT Certification and CouthActs Compliance",
    order: 8,
    durationMins: 20,
    content: `## Earning Your CouthActs HAZMAT Badge

![Fleet of trucks and professional transport](https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1200&q=80)

Completing the Hazardous Materials Handling course and passing the certification exam is a milestone in your CouthActs provider career. This certification unlocks an entire category of high-value jobs that most providers cannot access — giving you a significant competitive advantage.

But it is critical to understand what this certification does and does not represent. The CouthActs HAZMAT certification **supplements** your regulatory qualifications. It does not replace them.

---

## What the CouthActs HAZMAT Certification Provides

### 1. HAZMAT Certification Badge
A visible badge appears on your provider profile, on every bid you submit, and on your CouthActs Score card. When a customer posting a HAZMAT job reviews bids, the badge immediately signals that you have completed formal HAZMAT training through CouthActs Academy.

### 2. Access to HAZMAT Job Listings
Without this certification, HAZMAT postings are **invisible** in your job feed and Load Board. The platform filters them out entirely. Earning the badge unlocks these listings so you can view, evaluate, and bid on HAZMAT transport opportunities.

### 3. CouthActs Score Boost
The certification contributes to the **Verification Bonus** category of your CouthActs Score (up to 15 points). Combined with KYC and KYB verification, HAZMAT certification helps push your score toward Elite tier (90-100 points).

### 4. Customer Trust Signal
Customers posting HAZMAT jobs are entrusting you with dangerous materials that pose risks to public safety. The CouthActs HAZMAT badge tells them: "This provider has demonstrated knowledge of classification, packaging, documentation, placarding, loading, emergency response, and platform-specific HAZMAT workflows."

---

## Regulatory Requirements Beyond CouthActs

:::warning
The CouthActs HAZMAT certification is a platform qualification. You MUST also hold these regulatory credentials before transporting HAZMAT:

**CDL with HAZMAT Endorsement (H Endorsement)**
- Required for any driver operating a commercial vehicle transporting HAZMAT in quantities requiring placarding
- Requires passing the HAZMAT knowledge test at your state DMV
- Requires a TSA security threat assessment (background check) — apply at least 60 days before you need the endorsement
- Must be renewed with each CDL renewal (typically every 4-5 years)

**DOT HAZMAT Training per 49 CFR 172.704**
- General awareness/familiarization training
- Function-specific training for your role (driver, loader, etc.)
- Safety training
- Security awareness training
- Must be completed within 90 days of employment and recurrent training every 3 years
- Your employer must maintain training records for the current plus previous 3 years

**Mode-Specific Certifications**
- Air transport: IATA Dangerous Goods Regulations (DGR) training
- Ocean/sea transport: IMDG Code training
- Rail: AAR Circular OT-55 compliance training
:::

---

## CouthActs HAZMAT Job Requirements

![Dashboard monitoring and compliance tools](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80)

On the CouthActs platform, HAZMAT jobs have specific requirements that the system enforces automatically:

### Elite Protection Tier
All HAZMAT postings require the **Elite Protection** tier. This is the highest protection level on CouthActs, providing:
- Maximum cargo coverage limits
- Pollution liability coverage
- Hazardous materials-specific protection provisions
- Higher protection premiums (reflected in the job budget)

### Mandatory IoT Tracking
HAZMAT bookings automatically activate the **IOT_DEVICE** tracking layer in addition to standard GPS. If the cargo requires temperature-controlled transport, the IoT sensor thresholds are configured based on the material's 49 CFR requirements.

### Full Chain-of-Custody Documentation
Every HAZMAT booking requires:
- **QR_PIN confirmation** at pickup and delivery
- **DOCUMENT_POD_AI** photo documentation of placards, shipping papers, and cargo condition
- **Status notes** at departure, major waypoints, and arrival

### Provider Credential Verification
Before you can bid on a HAZMAT job, the platform verifies:
1. Your CouthActs HAZMAT certification badge is active
2. Your CDL HAZMAT endorsement is on file and not expired
3. Your DOT HAZMAT training record is current (within 3 years)
4. Your protection coverage includes the required HAZMAT provisions

If any of these are missing or expired, the bid button is disabled and you see a message explaining which credential needs attention.

---

## Unlocking HAZMAT Jobs: The Complete Checklist

:::key
To see and bid on HAZMAT postings on CouthActs, you need ALL of the following:

1. **CouthActs HAZMAT certification** — Complete this course and pass the exam with 80% or higher
2. **CDL with H endorsement** — Upload a copy of your CDL showing the HAZMAT endorsement
3. **TSA security threat assessment** — Must be current (valid for 5 years)
4. **DOT HAZMAT training certificate** — Upload your 49 CFR 172.704 training record (must be within 3 years)
5. **Elite Protection tier** — Your protection coverage must include HAZMAT provisions
6. **KYC + KYB verified** — Full identity and business verification must be complete
7. **CouthActs Score 75+** — Minimum Trusted tier required for HAZMAT jobs

Missing even one item keeps HAZMAT jobs hidden from your feed. Complete the checklist, and an entirely new category of high-value opportunities opens up.
:::

---

## The Value of HAZMAT Specialization

HAZMAT transport commands premium pricing because of the additional qualifications, equipment, and risk management involved. On CouthActs, HAZMAT job budgets are typically **30-60% higher** than equivalent non-HAZMAT freight jobs.

Providers who specialize in HAZMAT transport and maintain clean safety records build reputations that generate repeat business from industrial customers, chemical manufacturers, and pharmaceutical companies. These are not one-time shippers — they are recurring customers with predictable, high-value shipping needs.

Earning your CouthActs HAZMAT certification is the gateway to this premium tier of the platform. Combined with your regulatory credentials, it positions you as a qualified, trusted, and platform-verified HAZMAT transport professional.`
  }
];

const COURSE_4 = [
  {
    title: "Why Customer Excellence Matters on CouthActs",
    order: 1,
    durationMins: 20,
    content: `## The Economics of Reputation

![Five-star customer reviews](https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=1200&q=80)

Your CouthActs Score is a 100-point rating that directly determines your earning potential. Of those 100 points, **Review Average contributes 20 points** — the same weight as On-Time Rate, and nearly as much as Completion Rate (25 points). This means customer satisfaction is not a soft skill; it is a hard metric with measurable financial impact.

Let us put numbers to this. A provider with a perfect 5.0-star review average earns **20 out of 20** review points. A provider with a 3.5-star average earns only **14 points**. That 6-point gap can be the difference between Elite tier (90+) and Established tier (60-74). Elite providers access CouthActs Advance, premium job visibility, and higher bid acceptance rates. Established providers compete on price alone.

---

## Reputation vs. Price

On CouthActs, the best providers are not the cheapest — they are the most trusted. Consider this scenario:

A customer posts a $3,000 freight job. Two providers bid:
- **Provider A**: $2,800 bid, CouthActs Score 72, no certification badges, sparse profile
- **Provider B**: $3,100 bid, CouthActs Score 94, safety and HAZMAT certifications, detailed bid message referencing 50+ completed jobs on the route

Most customers choose Provider B. The $300 premium is roughly 10% — and the customer is buying **certainty**. They know their cargo will arrive on time, undamaged, with proactive communication throughout.

:::key
On CouthActs, trust is worth a 10-20% price premium. Every 5-star review you earn is not just a rating — it is a compounding investment in your ability to charge fair prices and still win jobs.
:::

---

## The Repeat Customer Multiplier

![Professional customer communication](https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&q=80)

Acquiring a new customer on CouthActs requires browsing jobs, writing compelling bids, and competing against other providers. Retaining an existing customer requires only doing excellent work.

The economics of repeat customers:
- **First job**: You compete on price, profile, and score. The customer may accept the lowest bid.
- **Second job**: The customer remembers your communication and reliability. They select you directly or accept your bid faster.
- **Third job+**: The customer now considers you their provider for that route or mode. They may post jobs specifically hoping you will bid. Some will reach out to confirm your availability before posting.

A single excellent customer relationship can generate **$10,000-$100,000+** in annual recurring revenue depending on their shipping frequency and cargo value. One relationship. One customer you treated with excellence on their first $500 job.

---

## What This Course Covers

This course teaches the specific, actionable skills that separate 5-star providers from 3-star providers:

1. **Communication protocols** for every phase of a CouthActs job — from bidding to post-delivery
2. **Proactive tracking** as a communication tool — not just GPS dots, but meaningful status updates
3. **Service recovery** when things go wrong — the LAST framework for turning complaints into loyalty
4. **Repeat customer strategies** — 6 proven approaches to building lasting business relationships
5. **Time management** — the habits that produce 95%+ on-time delivery rates

:::tip
Customer excellence is not about being "nice." It is about being professional, predictable, and proactive. Customers do not want a friendly provider who delivers late. They want a reliable provider who communicates clearly and delivers on time, every time.
:::`
  },
  {
    title: "Communication Protocols for Every Job Phase",
    order: 2,
    durationMins: 20,
    content: `## The 7-Phase Communication Framework

![Professional communication in transit](https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?w=1200&q=80)

Every CouthActs job follows a predictable lifecycle. Top-rated providers have a communication protocol for each phase — they never leave a customer wondering what is happening. The customer should feel informed at every step without having to ask.

---

## Phase 1: Bidding — Your First Impression

Your bid message is the first time the customer interacts with you. Generic bids signal generic service. Specific bids signal professionalism.

**Weak bid**: "I can handle this job. Let me know."

**Strong bid**: "I have a 48-foot flatbed available for pickup at your Dallas warehouse on Tuesday at 8:00 AM. I've completed 47 runs on the DFW-Houston lane this year with a 98% on-time rate and 4.9-star average. I'll deliver to your Houston facility by 4:00 PM the same day. Happy to discuss any specific loading requirements."

:::tip
Your bid message should answer three questions for the customer:
1. **Can you do it?** — State your equipment, availability, and qualifications
2. **Have you done it before?** — Reference relevant experience, especially on the same route or mode
3. **When exactly?** — Provide specific pickup and delivery times, not ranges
:::

---

## Phase 2: After Acceptance — The Confirmation Message

Within **30 minutes** of the customer accepting your bid, send a confirmation:

"Thank you for selecting me for this job. I confirm pickup at [full address] on [date] at [time]. I will deliver to [full address] by [date] at [time]. I will send a tracking update when I depart for pickup. If you have any special instructions for loading or delivery, please let me know. My direct number is [number]."

This message does three things: confirms the details, sets expectations for communication, and provides a direct line of contact.

---

## Phase 3: Pre-Pickup — The Approach Update

**2 hours before the scheduled pickup**, send a status update:

"On schedule for pickup at [time]. Currently at [your location]. ETA [X] minutes. Vehicle inspected and ready."

Upload a pre-trip inspection photo as a **DOCUMENT_POD_AI** tracking event. This demonstrates that you prepare before every job, not just when it is convenient.

---

## Phase 4: Pickup — Documentation and Departure

At pickup, execute the full documentation protocol:
1. Complete **QR_PIN confirmation** to establish chain of custody
2. Photograph the cargo loaded and secured — upload via DOCUMENT_POD_AI
3. Send a departure message: "Cargo loaded and secured at [time]. All [X] pieces accounted for. Departing now. ETA to destination: [time] on [date]."

![Cargo loading and inspection](https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=80)

:::important
The pickup phase is where damage claims originate. If you photograph the cargo in good condition at loading, you have evidence that any damage occurred before your custody. If you do not photograph it, you have no defense against a post-delivery damage claim. Always photograph. No exceptions.
:::

---

## Phase 5: In Transit — Milestone Updates

Send tracking updates at **every major milestone**:
- Departing origin city
- Highway on-ramps and route confirmations
- State line crossings (for long haul)
- Fuel stops and rest breaks (brief note: "Fuel stop in Waco, TX. On schedule. ETA unchanged.")
- Weather or traffic delays — **immediately** with revised ETA

The golden rule of transit communication: **the customer should never discover a delay from the tracking map before hearing it from you.** If your GPS shows you are behind schedule, send the update before the customer notices.

---

## Phase 6: Delivery — Completion Protocol

At delivery:
1. Send a "30 minutes out" notification
2. Complete **QR_PIN delivery confirmation**
3. Upload delivery condition photos via DOCUMENT_POD_AI
4. Send completion message: "Delivered successfully at [time] to [receiving person/dock]. All [X] pieces in good condition. Thank you for choosing CouthActs — it was a pleasure handling this shipment."

---

## Phase 7: Post-Delivery — The Follow-Up

After both parties confirm completion:
- If the customer leaves a **positive review**: "Thank you for the kind review. I'm available anytime you need this route again."
- If the customer leaves a **negative review**: Respond professionally. Acknowledge the issue, explain what you will do differently, and do not argue.
- If the customer leaves **no review**: Wait 24 hours, then send a polite request: "If you were satisfied with the delivery, I would really appreciate a review on CouthActs. It helps me serve more customers like you."

:::key
The 7-phase communication framework takes less than 15 minutes of total effort per job. That 15 minutes is the difference between a 3-star "got the job done" review and a 5-star "outstanding communication and professionalism" review. Over 50 jobs, that difference is worth thousands of dollars in higher-paying bids.
:::`
  },
  {
    title: "Proactive Communication and the Tracking System",
    order: 3,
    durationMins: 20,
    content: `## Tracking as a Communication Channel

![Technology dashboard for monitoring](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80)

Most CouthActs providers treat the tracking system as a passive tool — it sends GPS pings, the customer sees a dot on a map, end of story. Top-rated providers treat the tracking system as an **active communication channel** that tells a story the customer can follow in real time.

The difference is not technological. Both providers use the same platform. The difference is intentional effort — using tracking layers that are free and available to every provider, but leveraged by few.

---

## Beyond the GPS Dot

When a customer opens their CouthActs tracking page, they see a map with your vehicle's position. If all you provide is GPS data, this is what the experience looks like:

- A dot moves slowly across the map
- No context about what is happening
- No photos, no notes, no confidence
- The customer refreshes the page wondering: Is everything okay? Is the cargo secure? Why did the dot stop for 45 minutes?

Now consider what the experience looks like when you use the full tracking toolkit:

- The dot moves across the map with **timestamped notes** at milestones
- Photos of the cargo, the vehicle, and conditions appear in the timeline
- The customer sees: "Passed weigh station in Waco — all clear" at 10:30 AM
- Then: "Fuel stop, 15 minutes. On schedule. ETA 2:15 PM" at 11:45 AM
- Then a photo of clear highway ahead with the note: "I-35 clear, good conditions, running ahead of schedule"
- The customer closes the tracking page with complete confidence and goes about their day

:::tip
A customer who never has to call you to ask "Where is my shipment?" is a customer who leaves a 5-star review. The tracking system eliminates the anxiety that causes complaints. Use it.
:::

---

## DOCUMENT_POD_AI — Your Visual Communication Tool

The DOCUMENT_POD_AI tracking layer accepts photo uploads with notes at any time during a booking. Each upload is **automatically timestamped and geotagged**. Here is how top providers use it:

### At Pickup
- Photo of cargo loaded in the vehicle, showing securement (straps, blocking, bracing)
- Photo of any pre-existing damage noted during inspection (protects against claims)
- Photo of sealed trailer doors with seal number noted

### En Route
- Condition photos at rest stops (especially for temperature-sensitive cargo)
- Photos of weather conditions when relevant ("Heavy rain on I-10 near Beaumont. Reducing speed, adding 30-minute buffer to ETA.")
- Photos of construction zones or road hazards that explain delays

### At Delivery
- Photo of cargo being unloaded, showing condition
- Photo of delivery location (dock number, building sign)
- Photo of signed delivery receipt (if applicable)

![Customer engagement and delivery](https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?w=1200&q=80)

---

## QR_PIN_CONFIRMATION — Proof of Handoff

Beyond pickup and delivery, use QR_PIN confirmation for intermediate events:
- **Border crossings**: Scan confirms you crossed the state or national border at a specific time
- **Intermodal transfers**: When cargo moves from your truck to a rail car or warehouse, QR_PIN confirms the handoff
- **Multi-stop deliveries**: Each stop gets its own QR_PIN confirmation, creating a clear record of partial deliveries

---

## Status Notes: The Unsung Hero

Every tracking event supports a text note. This is the simplest and most underused communication tool on CouthActs. It costs nothing and takes 30 seconds.

### Effective Status Notes
- "Departed Dallas warehouse at 8:05 AM. All 12 pallets loaded. ETA Houston 2:15 PM."
- "Traffic delay on I-45 near Huntsville. Adding 25 minutes. Revised ETA 2:40 PM."
- "Arrived at delivery dock. Waiting for dock door assignment. Will update when unloading begins."

### Ineffective Status Notes
- "On the road" (no context)
- "Delayed" (how long? why? revised ETA?)
- (No note at all — just a GPS ping)

:::key
The formula is simple: **What happened + Why + What it means for the ETA**. Every status note should answer these three questions. "Traffic delay on I-45 [what happened] due to construction [why]. Revised ETA 2:40 PM instead of 2:15 PM [what it means]."
:::

---

## The Compound Effect of Proactive Communication

Providers who consistently use DOCUMENT_POD_AI, QR_PIN, and status notes report:
- **15-25% higher review averages** compared to GPS-only providers
- **Significantly fewer disputes** — visual documentation resolves most disagreements before they escalate
- **Higher repeat customer rates** — customers who feel informed come back
- **Faster escrow release** — documented deliveries give customers confidence to confirm completion quickly

The tracking system is free. The effort is minimal. The return is enormous.`
  },
  {
    title: "Handling Complaints and Service Recovery",
    order: 4,
    durationMins: 20,
    content: `## When Things Go Wrong

![Professional problem resolution](https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&q=80)

Transportation is inherently unpredictable. Weather delays, mechanical failures, cargo damage, scheduling conflicts, and miscommunications are not exceptions — they are inevitable parts of the business. The question is not whether things will go wrong, but how you respond when they do.

On CouthActs, a poorly handled complaint becomes a dispute. A dispute freezes your escrow, costs you 5 points on your CouthActs Score (up to -15 for 3+ disputes), and creates a permanent record on your account. A well-handled complaint, on the other hand, can actually strengthen a customer relationship. Customers who experience a problem that is resolved professionally are often MORE loyal than customers who never had a problem at all. This is called the **service recovery paradox**.

---

## The LAST Framework

LAST is a proven service recovery framework used by Fortune 500 companies. It works because it addresses both the emotional and practical dimensions of a complaint.

### L — Listen

Let the customer explain the full problem before you respond. Do not interrupt. Do not explain. Do not defend. Just listen.

What listening looks like on CouthActs:
- Read the customer's entire complaint message before typing a response
- If they call you, let them finish speaking before you reply
- Take notes on the specific issues they mention — you will address each one

:::warning
The most common mistake in complaint handling is jumping to defense before the customer feels heard. A customer who feels ignored or dismissed escalates. A customer who feels heard de-escalates. Listen first. Always.
:::

### A — Apologize

A sincere, unconditional apology costs nothing and de-escalates immediately.

**Effective apology**: "I sincerely apologize for the delay. You were counting on a 2 PM delivery and I did not meet that commitment. That is not acceptable and I take full responsibility."

**Ineffective apology**: "I'm sorry but the traffic was really bad and there was nothing I could do." (This is not an apology — it is an excuse with the word "sorry" attached.)

The apology is about the **customer's experience**, not your explanation. There will be time for context later.

### S — Solve

Propose a concrete, specific solution. Do not ask the customer "What do you want me to do?" — that puts the burden on them. Propose a solution and let them accept, modify, or counter.

Solutions on CouthActs might include:
- Partial refund through the escrow system (you can request a voluntary reduction)
- Expedited re-delivery for damaged or incorrect shipments
- Discount commitment on their next job
- Additional documentation or proof that the issue was less severe than feared

### T — Thank

Thank the customer for bringing the issue to your attention.

"Thank you for telling me about this. I take these situations seriously and I will make sure this does not happen again."

This reframes the complaint as useful feedback rather than an attack. It closes the interaction on a positive note and signals professionalism.

---

## Dispute Prevention: Documentation Is Your Shield

![Documentation and evidence management](https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80)

Most CouthActs disputes are about one of three things:
1. **Cargo damage** — "The cargo arrived damaged."
2. **Late delivery** — "It arrived after the deadline."
3. **Service quality** — "The provider was unresponsive or unprofessional."

Every one of these can be prevented or resolved with proper documentation:

### For Cargo Damage Claims
- **Pickup photos**: DOCUMENT_POD_AI images showing cargo condition at loading
- **Securement photos**: Images showing proper tie-downs, blocking, bracing
- **Delivery photos**: Images showing cargo condition at delivery
- If the cargo was damaged at pickup, your photos prove the damage was pre-existing

### For Late Delivery Claims
- **Tracking timeline**: Every GPS ping and status note creates a timestamped record
- **Delay communications**: Status notes sent when delays occurred, with revised ETAs
- **Root cause evidence**: Photos of weather conditions, traffic, or mechanical issues that caused the delay

### For Service Quality Claims
- **Communication log**: All messages sent through CouthActs are recorded
- **Tracking activity**: A full timeline of status updates demonstrates active management
- **QR_PIN records**: Proof of on-time pickup and delivery interactions

:::important
If a dispute is filed against you on CouthActs, the support team reviews ALL tracking events, photos, messages, and QR_PIN records associated with the booking. A provider with a complete documentation trail almost always receives a favorable resolution. A provider with a bare GPS-only record has no evidence to present. **Document everything. Every time. No exceptions.**
:::

---

## When You Cannot Resolve It

If a customer files a formal dispute despite your best resolution efforts:
1. Respond to the dispute promptly — within 24 hours
2. Present your evidence clearly: photos, tracking events, communication records
3. Be factual, not emotional. "Here are the timestamped photos showing cargo condition at pickup and delivery" is far more effective than "I always take good care of cargo"
4. Accept the CouthActs team's decision professionally, even if you disagree. One dispute will not end your career, but a pattern of disputes will.`
  },
  {
    title: "Building a Repeat Customer Base",
    order: 5,
    durationMins: 20,
    content: `## The Lifetime Value of One Excellent Relationship

![Five-star reputation building](https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=1200&q=80)

In transportation, the most successful providers are not the ones who bid on the most jobs. They are the ones who turn first-time customers into repeat customers. A repeat customer is the most efficient revenue source in your business: zero acquisition cost, higher trust, less price sensitivity, and predictable scheduling.

Consider the math. A manufacturing company ships freight twice a week at $2,500 per run. That is $260,000 per year from a single customer. If you earn their loyalty through consistent service on one $2,500 job, you have potentially unlocked a quarter-million-dollar annual relationship. This is why customer excellence is not a soft skill — it is the highest-ROI activity in your business.

---

## 6 Strategies for Earning Repeat Business

### Strategy 1: Exceed Expectations on the First Job

The first job sets the standard. Do not just meet the deadline — beat it. Do not just deliver — deliver with a complete set of DOCUMENT_POD_AI photos, proactive status updates, and a professional completion message.

:::tip
The first job is your audition. A customer who posts a $500 courier job to test a new provider is actually evaluating you for the $5,000 freight jobs they ship every week. Treat every first job like a $50,000 contract, because it might become one.
:::

### Strategy 2: Follow Up After Delivery

Within 24 hours of completing a job, send a follow-up message:

"Thank you for the opportunity to handle this shipment. Everything was delivered on time and in good condition. I'm available anytime you need service on this route or any other. Don't hesitate to reach out — I'd love to earn your business again."

This simple message accomplishes three things:
- Reminds the customer of the positive experience
- Signals your availability for future work
- Opens the door for direct communication about future jobs

### Strategy 3: Be Available and Responsive

Set your CouthActs **availability calendar** so repeat customers can see when you are open for new jobs. When a repeat customer posts a job, respond within **30 minutes** — ideally within 15 minutes.

Response time is worth 10 points on your CouthActs Score, but for repeat customers, fast response time means something more: it means you prioritize their business. A customer who posts a job and sees your bid appear within 10 minutes feels valued.

### Strategy 4: Price Fairly and Consistently

![Financial planning and fair pricing](https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80)

Repeat customers value **price consistency** above all else. A customer who paid $2,500 for the same route three times does not want to see a $3,200 bid on the fourth run without explanation.

Guidelines for repeat customer pricing:
- Maintain consistent pricing for the same route, cargo type, and conditions
- If costs have increased (fuel surcharges, seasonal demand), explain the increase in your bid message: "Fuel prices have increased 15% since our last run. My rate reflects this adjustment."
- Never gouge during peak seasons. Short-term profit from price spikes destroys long-term relationships.
- Consider offering a **loyalty rate** — a small discount (5-10%) for customers who have booked 5+ jobs with you. Mention it: "As a returning customer, I'm applying a 5% loyalty rate to this bid."

### Strategy 5: Remember Details

Professional providers remember the details of their repeat customers' operations:
- Dock hours at the delivery warehouse
- The name of the receiving clerk
- Preferred loading sequence
- Special handling requirements

Reference these in your bids: "I know your Houston warehouse receives between 7 AM and 3 PM at Dock 4 — I'll plan arrival for 10 AM to avoid the morning rush. I'll coordinate with Maria at receiving as usual."

This signals that you are not just a provider — you are a partner who understands their operation.

:::key
Remembering details costs nothing but a few notes in your records. Yet it is the single most powerful differentiator between a transactional provider and a strategic partner. Customers will pay a premium to work with someone who already knows their operation.
:::

### Strategy 6: Ask for Reviews — Strategically

After every successful delivery with a repeat customer, ask for a review:

"If you have a moment, I would really appreciate a review on CouthActs. It helps me continue to offer competitive rates and attract new customers. Thank you for your ongoing trust."

Key tactics:
- Ask within 24 hours of delivery (the positive experience is fresh)
- Do not ask after every single delivery — every 3rd or 4th job is appropriate for established relationships
- If they leave a review, thank them specifically
- Never pressure or incentivize reviews — this violates CouthActs Terms of Service

---

## Tracking Your Repeat Customer Metrics

Monitor these indicators in your CouthActs dashboard:
- **Repeat customer rate**: What percentage of your jobs come from customers who have booked with you before? Target: 40%+
- **Customer retention**: Of customers who booked once, how many book again? Target: 30%+
- **Revenue concentration**: How much of your revenue comes from your top 5 customers? Target: no more than 60% (diversification protects against losing a single client)

Building a repeat customer base is a long-term strategy. It compounds over time — each excellent interaction builds trust, each positive review strengthens your profile, and each repeat booking adds predictable revenue to your business.`
  },
  {
    title: "Time Management and On-Time Delivery",
    order: 6,
    durationMins: 20,
    content: `## The 20-Point Metric You Control

![Highway and route planning](https://images.unsplash.com/photo-1494412574643-ff11b0a5eb95?w=1200&q=80)

On-Time Rate contributes **20 points** to your CouthActs Score — tied with Review Average as the second-highest weighted factor after Completion Rate (25 points). A provider with 100% on-time delivery earns all 20 points. A provider at 80% on-time earns 16 points. At 60%, just 12 points.

The difference between 95% on-time and 80% on-time is 3 CouthActs Score points. Three points that could mean the difference between Elite tier (with CouthActs Advance, premium visibility, and higher trust) and Trusted tier. Three points worth thousands of dollars in annual revenue.

And here is the key insight: on-time delivery is almost entirely within your control. It is not about driving faster. It is about planning better.

---

## The Planning Buffer Principle

The number one cause of late deliveries is **insufficient time buffer**. Providers calculate the drive time from Google Maps and commit to a deadline based on that estimate. Then reality intervenes — traffic, weather, loading delays, a flat tire, a 30-minute HOS break they forgot to account for — and the deadline passes.

:::important
The planning buffer rule: **Add 20% to any estimated transit time.** If Google Maps says 6 hours, plan for 7 hours 12 minutes. If the route typically takes 2 days, plan for 2 days and 5 hours. Build the buffer into your bid message and quoted ETA.

A customer who expects delivery at 4:00 PM and receives it at 3:30 PM is delighted. A customer who expects delivery at 2:00 PM and receives it at 2:30 PM is frustrated — even though the second scenario is objectively faster.
:::

---

## 6 Time Management Principles for On-Time Delivery

### 1. Depart Early

The single easiest way to arrive on time is to leave early. If your planned departure is 6:00 AM, be ready to roll at 5:30 AM. Those 30 minutes are free insurance against every unpredictable delay you might encounter.

Early departure does not mean driving faster. It means having a time cushion that absorbs the normal friction of transportation: a slow fuel pump, a line at the weigh station, 10 minutes of unexpected traffic.

### 2. Account for Everything — Not Just Drive Time

Your ETA calculation must include:
- **Drive time** (from routing software, not straight-line estimates)
- **Loading time** at pickup (30-90 minutes depending on cargo)
- **Unloading time** at delivery (30-90 minutes)
- **Fuel stops** (15-30 minutes each, plan locations in advance)
- **HOS-mandated breaks** (30-minute break after 8 hours driving)
- **Weigh station stops** (15-45 minutes if inspected)
- **Weather delays** (check the forecast for every region on your route)
- **Construction zones** (check DOT websites for active construction)

![Professional driver managing time](https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&q=80)

### 3. Communicate ETA Changes Immediately

If your ETA changes — for any reason — update the customer via the CouthActs tracking system **before** the original ETA passes. A proactive delay notification preserves trust. A silent late arrival destroys it.

The customer communication formula for delays:

"[What happened]: Traffic accident on I-35 near Temple, TX. [Impact]: Approximately 45-minute delay. [New ETA]: Revised arrival time is 3:45 PM instead of 3:00 PM. [Action]: I've rerouted to minimize the delay. Will update if the situation changes."

### 4. Do Not Over-Commit

:::warning
Never accept a job with a deadline you cannot meet with a 20% buffer. If the customer needs delivery by Friday at noon and your realistic ETA (with buffer) is Friday at 2:00 PM, do not bid. Winning a job you deliver late damages your score more than not bidding at all.

The math is clear: one late delivery on a $1,000 job costs you on-time rate percentage points that affect your score across ALL future jobs. A 1-point CouthActs Score drop could cost you $10,000+ in lost bids over the following year.
:::

### 5. Track Your Personal On-Time Metrics

After every completed job, check your on-time rate in the CouthActs dashboard. If you are below 90%, investigate:
- Are you underestimating transit times? Add more buffer.
- Are pickup locations causing loading delays? Arrive earlier for loading.
- Are certain routes consistently slow? Identify and avoid bottleneck corridors.
- Are you accepting too many back-to-back jobs without rest time between them?

### 6. Use the CouthActs Tracking System for ETA Precision

The CouthActs tracking system calculates a **real-time ETA** based on your GPS position, speed, and remaining route distance. The customer sees this on their tracking page.

When your real-time ETA is ahead of your quoted ETA, the customer sees you arriving early — which builds confidence. When your real-time ETA falls behind your quoted ETA, the customer sees the delay forming in real time — which is why you must send a proactive status note BEFORE the ETA slips.

---

## The Compound Effect of On-Time Delivery

Providers who maintain 95%+ on-time delivery rates on CouthActs report:
- **Higher bid acceptance rates**: Customers trust that your quoted times are real
- **Premium pricing power**: Reliability commands 10-15% higher rates
- **Fewer disputes**: Late delivery is one of the top three dispute triggers — eliminate it and your dispute rate drops proportionally
- **More repeat customers**: Nothing builds loyalty faster than predictable, on-time performance

:::key
On-time delivery is not about speed. It is about planning, buffering, communicating, and never over-committing. The fastest driver with poor planning delivers late. The average-speed driver with excellent planning delivers early. Be the planner, not the speeder.
:::`
  }
];

const COURSE_5 = [
  {
    title: "The Single Operator to Fleet Owner Journey",
    order: 1,
    durationMins: 20,
    content: `## Recognizing When You Are Ready to Scale

![Fleet of professional transport trucks](https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1200&q=80)

Most CouthActs providers start as single operators — one person, one vehicle, one transport mode. You drive, you manage, you communicate, you invoice. The transition from single operator to fleet owner is one of the most significant business decisions in your career, and the providers who get it right build generational wealth. The providers who get it wrong lose everything.

The key to a successful transition is knowing **when** to scale and, equally important, knowing what systems must be in place **before** you add a single vehicle.

---

## 5 Signs You Are Ready to Scale

1. **You are consistently turning down jobs.** If you are declining 3-5 qualified job opportunities per week because you are already booked, there is unserved demand that a second vehicle could capture.

2. **Your CouthActs Score is 85+.** A high score means your operational quality is excellent. Scaling from a weak foundation (score below 80) will dilute your quality further and collapse your reputation.

3. **You have repeat customer relationships.** Repeat customers provide predictable revenue that justifies the fixed costs of additional vehicles and drivers. If your income is 100% from one-time bids, scaling is premature.

4. **You have 6+ months of operating capital saved.** A new vehicle costs $30,000-$150,000+ depending on mode. Monthly fixed costs (insurance, payment, maintenance) run $3,000-$8,000 per vehicle. You need runway to survive the ramp-up period before the new vehicle is consistently profitable.

5. **You understand your unit economics.** You know your cost per mile, average revenue per job, profit margin per route, and utilization rate. If you cannot recite these numbers, you are not ready to multiply them.

:::warning
The most common scaling failure: adding vehicles before adding systems. A second truck without a dispatch process, communication protocol, and quality control framework will deliver inconsistent service. Inconsistent service damages your CouthActs Score — which affects every vehicle on your account, not just the new one.
:::

---

## The 5-Stage Growth Path on CouthActs

![Dashboard and business analytics](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80)

### Stage 1: Single Operator (1 vehicle)
- You do everything: drive, bid, communicate, document, manage finances
- **Focus**: Build your CouthActs Score, earn certifications, develop repeat customers
- **Revenue target**: Enough to cover all personal and business expenses plus savings
- **Duration**: 6-18 months before considering Stage 2

### Stage 2: Owner-Operator with 1 Subcontractor (2 vehicles)
- You take on a second driver for overflow jobs or simultaneous bookings
- You still drive but begin splitting time between driving and managing
- **Focus**: Develop dispatch and communication processes. Your driver must meet your quality standards.
- **Key risk**: The subcontractor's performance directly affects YOUR CouthActs Score
- **Systems needed**: Written communication protocol, daily check-in process, photo documentation requirements

### Stage 3: Small Fleet (3-5 vehicles)
- You transition from driver to **full-time operations manager**
- Driving income is replaced by management margin on multiple vehicles
- **Focus**: Standardize operations. Every driver follows the same process.
- **Systems needed**: Dispatch software, maintenance scheduling, driver performance tracking, financial reporting
- **CouthActs tools**: Provider API (Starter tier) for job monitoring and booking management

### Stage 4: Growing Fleet (6-15 vehicles)
- You need dedicated administrative support (dispatcher, bookkeeper, mechanic/maintenance coordinator)
- **Focus**: Scale processes, not just vehicles. Every additional vehicle should increase margin, not just revenue.
- **Systems needed**: Fleet management software (Samsara, Geotab), CouthActs API (Growth tier), dedicated maintenance facility or contract
- **CouthActs tools**: Growth API tier for automated tracking, webhook notifications

### Stage 5: Enterprise Fleet (16+ vehicles)
- You are managing a business, not a fleet. Strategy, finance, compliance, and customer relationships are your primary functions.
- **Focus**: Volume pricing, enterprise customer contracts, multi-mode expansion
- **Systems needed**: CouthActs Enterprise API, ERP integration, HR/payroll systems, compliance management
- **CouthActs tools**: Enterprise API tier, dedicated account manager, custom escrow terms

:::key
The critical principle at every stage: **systems before vehicles.** Build the process first, test it with your current capacity, then add a vehicle into the process. Never add a vehicle and figure out the process afterward.
:::`
  },
  {
    title: "Fleet Maintenance Scheduling and Cost Control",
    order: 2,
    durationMins: 20,
    content: `## Maintenance: Your Largest Controllable Cost

![Fleet trucks requiring maintenance](https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1200&q=80)

Vehicle maintenance is your single largest operational cost after fuel. For a commercial truck fleet, maintenance costs typically range from **$0.15 to $0.20 per mile** — meaning a truck running 100,000 miles per year costs $15,000-$20,000 annually in maintenance alone.

But here is the critical insight: **preventive maintenance is 3-5x cheaper than reactive maintenance.** A $200 scheduled brake inspection that catches worn pads costs far less than a $2,000 emergency brake repair on the roadside — plus the lost revenue from a missed delivery, the tow truck fee, and the CouthActs Score damage from a late job.

Well-maintained vehicles do not break down during active jobs. They do not cause delays. They do not generate disputes. They protect your CouthActs Score.

---

## The Preventive Maintenance Schedule

### Daily — Pre-Trip Inspection (Every Vehicle, Every Day)
- Tires: visual inspection for damage, pressure check, tread depth
- Lights: headlights, taillights, turn signals, hazard lights, marker lights
- Fluids: engine oil level, coolant level, windshield washer
- Brakes: air pressure gauge (for air brakes), visual check of brake lines
- Mirrors: clean, properly adjusted, undamaged
- Coupling: fifth wheel, king pin, safety chains (for trailers)

:::tip
Require every driver to upload a DOCUMENT_POD_AI photo of their pre-trip inspection form to CouthActs before departing on any job. This creates a compliance record and ensures inspections actually happen — not just get checked off.
:::

### Every 5,000-7,500 Miles
- Engine oil and filter change
- Tire rotation
- Air filter inspection
- Belt inspection
- Battery terminals cleaning and testing

### Every 15,000 Miles
- Brake pad/shoe inspection and measurement
- Transmission fluid service
- Coolant system flush
- Power steering fluid check and top-off
- Wheel bearing inspection
- Exhaust system inspection

### Every 30,000 Miles
- Major service interval: timing belt (if applicable), complete fluid replacement
- Suspension inspection (shocks, springs, bushings)
- Fuel system cleaning
- Complete electrical system check
- Clutch inspection (manual transmission vehicles)
- Air compressor service (air brake systems)

### Annual
- **DOT annual inspection** (mandatory for commercial vehicles)
- Emission testing (state-dependent)
- Registration renewal
- Insurance policy review
- Fire extinguisher inspection and certification

![Dashboard for fleet management and monitoring](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80)

---

## Cost Control Strategies

### 1. Track Cost Per Mile Per Vehicle
Divide total maintenance costs by total miles driven for each vehicle individually. Industry benchmark: **$0.15-$0.20/mile** for well-maintained commercial trucks. If a specific vehicle consistently exceeds $0.25/mile, it may be approaching the end of its economically useful life.

### 2. Bulk Purchasing
- **Tires**: Negotiate fleet pricing with a tire distributor. A fleet buying 20+ tires per year can typically save 15-25% versus retail pricing.
- **Oil and filters**: Buy in bulk from a parts distributor. Monthly deliveries at wholesale pricing.
- **DEF (Diesel Exhaust Fluid)**: Buy in 275-gallon totes instead of 2.5-gallon jugs. The per-gallon cost drops by 40-60%.

### 3. Repair Shop Relationships
Establish standing relationships with 2-3 repair shops:
- **Primary shop**: Handles all scheduled maintenance, negotiated labor rate
- **Emergency shop**: Available 24/7 for roadside breakdowns, pre-authorized for repairs under $1,000
- **Specialty shop**: For transmission, electrical, or hydraulic work that requires specialized equipment

:::important
Never let a driver authorize a repair over $500 without dispatcher approval. Roadside repair shops frequently up-sell unnecessary work to stranded drivers. Establish a clear authorization process: driver calls dispatch, dispatch evaluates the repair scope, dispatch authorizes or finds an alternative.
:::

### 4. Preventive Maintenance Contracts
For fleets of 10+ vehicles, consider a fixed-cost preventive maintenance contract with a national chain (e.g., Ryder, Penske, or a local fleet maintenance provider). These contracts provide:
- Fixed monthly cost per vehicle for all scheduled maintenance
- Predictable budgeting
- Guaranteed turnaround times
- National coverage for breakdowns away from home base

### 5. Fuel Efficiency Monitoring
Track MPG per vehicle weekly. A sudden drop in fuel efficiency (more than 10% below the vehicle's baseline) often indicates:
- Under-inflated tires
- Dirty air filter
- Fuel system issue
- Engine misfire
- Dragging brakes

Catching these issues through fuel efficiency monitoring often identifies maintenance needs before they cause a breakdown.`
  },
  {
    title: "Driver Recruitment and Performance Management",
    order: 3,
    durationMins: 20,
    content: `## Your Drivers Are Your Business

![Professional driver operating vehicle](https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&q=80)

On CouthActs, your CouthActs Score is a single number attached to your provider account. Every driver operating under your account directly impacts that score — their on-time rate, their communication quality, their customer reviews, their incident record. One excellent driver can build your reputation. One poor driver can destroy it.

Driver recruitment and performance management are not HR functions — they are the core operational functions that determine whether your fleet business succeeds or fails on CouthActs.

---

## Recruiting Quality Drivers

### Credential Requirements (Non-Negotiable)
Before any interview or trial period, verify these credentials:
- **Valid CDL** with appropriate endorsements for your transport modes
- **Current medical certificate** (DOT physical card)
- **Clean MVR (Motor Vehicle Record)** — pull this yourself, do not rely on the driver's word. Look for: DUI/DWI (automatic disqualification), excessive moving violations (3+ in 3 years is a red flag), accident history
- **Drug and alcohol testing compliance** — pre-employment test plus enrollment in a random testing program (required by FMCSA for CDL holders)
- **HAZMAT endorsement** (if your fleet handles HAZMAT)
- **TWIC card** (if accessing port facilities)

### Reference Checks
Contact previous employers (at least 3 years of history, per FMCSA requirement). Ask specifically about:
- Reliability and attendance
- Communication habits
- Customer interaction quality
- Incident and damage history
- Reason for separation

:::warning
A driver who left their previous employer due to a safety incident or customer complaint may not volunteer this information. Previous employer verification is not optional — it is your due diligence obligation and a CouthActs best practice.
:::

### The Trial Period
Before giving a new driver full access to your CouthActs bookings:
1. **Ride along** for at least 2 jobs. Observe their driving, communication, and documentation habits.
2. **Assign supervised solo jobs** — small, low-stakes bookings where you monitor their tracking activity in real time.
3. **Review customer feedback** from their first 5 jobs. Any review below 4 stars warrants an immediate coaching conversation.

---

## Performance Management Standards

![Meeting and team management](https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&q=80)

### Setting Clear Standards
Every driver should receive a written performance guide covering:
- **On-time rate target**: 95%+ (matching CouthActs Score optimization)
- **Communication protocol**: Status updates at departure, major waypoints, delays, and arrival. DOCUMENT_POD_AI photos at pickup and delivery — mandatory, not optional.
- **Response time**: Acknowledge new booking assignments within 30 minutes
- **Documentation**: Pre-trip inspection uploaded daily, cargo photos at loading and unloading
- **Conduct**: Professional appearance, courteous interaction with customers and receiving staff, no personal phone use while driving

### Measuring Performance
CouthActs tracking data provides objective performance metrics for each booking:
- **GPS timeline**: Were there unexplained stops or route deviations?
- **Tracking event frequency**: Did the driver send status updates at milestones?
- **DOCUMENT_POD_AI activity**: Were photos uploaded at pickup and delivery?
- **QR_PIN completion**: Were pickup and delivery confirmations completed promptly?
- **Customer reviews**: What specific feedback did customers provide?

Review these metrics weekly for each driver. A monthly sit-down review (in person or video call) keeps performance visible and accountable.

### Performance-Based Compensation

:::key
The most effective fleet operators on CouthActs tie compensation directly to performance metrics:
- **Base pay**: Competitive per-mile or per-job rate (at or above market to attract quality drivers)
- **On-time bonus**: $25-$50 per job delivered on time (costs you little but reinforces the right behavior)
- **5-star review bonus**: $25 per 5-star review (drivers who earn this consistently are worth their weight in gold)
- **Zero-incident quarterly bonus**: $500 for a full quarter with no incidents, no disputes, and no complaints
- **Referral bonus**: $500-$1,000 for referring a driver who passes the trial period

Bonus structures cost 5-10% of driver compensation but produce 20-30% improvement in score-affecting metrics. The ROI is overwhelming.
:::

### When a Driver Is Not Working Out
If coaching does not improve performance within 30 days:
- Document the specific performance deficiencies and coaching provided
- Give a clear final warning with measurable targets and a deadline
- If targets are not met, separate immediately. A poor-performing driver damages your CouthActs Score with every job they complete — the longer they stay, the deeper the damage.

The CouthActs Score represents your entire fleet. Protecting it means holding every driver to the standard, every time.`
  },
  {
    title: "Route Optimization and Fuel Efficiency",
    order: 4,
    durationMins: 20,
    content: `## Turning Miles Into Margin

![Highway route optimization](https://images.unsplash.com/photo-1494412574643-ff11b0a5eb95?w=1200&q=80)

Fuel is typically **30-40% of a fleet's total operating cost**. For a truck burning 6 MPG at $4.00/gallon, that is $0.67 per mile in fuel alone. On a 1,000-mile run, fuel costs $670. Over 100,000 miles per year per truck, that is $67,000 annually — per vehicle.

Route optimization and fuel efficiency are not about small savings. They are about whether your fleet is profitable or losing money. A 10% improvement in fuel efficiency across a 10-truck fleet saves **$67,000 per year**. That is the equivalent of adding another vehicle's revenue without adding another vehicle's cost.

---

## The Empty Miles Problem

The most expensive mile is the one you drive without revenue. An **empty mile** — deadheading back to your home base or to the next pickup location — costs the same in fuel, wear, and driver time as a revenue mile but generates zero income.

Industry average empty mile percentage for freight trucking: **25-35%**. The best fleet operators keep it below 15%.

### Strategies to Reduce Empty Miles

1. **Use the CouthActs Load Board after every delivery.** Before departing the delivery location, search for jobs originating near your current position. A truck that just delivered in Houston can pick up a load going back toward Dallas — converting empty miles into revenue miles.

2. **Plan round-trip routes when bidding.** If you bid on a Dallas-to-Houston run, simultaneously search for Houston-to-Dallas jobs with compatible timing. Bid on both as a planned pair.

3. **Build lane relationships.** If you regularly run Dallas-Houston, build repeat customer relationships on both ends of the lane. Your Dallas customers ship to Houston; your Houston customers ship to Dallas. Match them.

4. **Consider triangular routing.** Instead of A-to-B and empty back to A, plan A-to-B, B-to-C, C-to-A. Three revenue legs instead of one.

:::tip
The CouthActs Load Board has a "Near Me" filter. After completing a delivery, toggle this filter to see all available jobs within 50 miles of your current location. Sort by departure date to find jobs leaving today or tomorrow — minimizing your wait time.
:::

---

## Real-Time Routing and Navigation

Google Maps provides basic routing, but professional fleet operations require **truck-specific routing** that accounts for:
- Vehicle height, weight, and length restrictions
- Low bridge clearances
- Weight-restricted roads and bridges
- Construction zones with lane width restrictions
- HAZMAT routing restrictions (if applicable)
- Weigh station locations and PrePass eligibility

![Fleet management dashboard](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80)

Dedicated fleet routing solutions (Samsara, KeepTruckin/Motive, CoPilot Truck, Trucker Path) provide this truck-specific routing. The investment ($20-50/month per vehicle) pays for itself the first time a driver avoids a low bridge that Google Maps did not flag.

---

## Fuel Efficiency Strategies

### Tire Pressure Management
Under-inflated tires increase fuel consumption by **3-5%**. For a truck burning $67,000/year in fuel, that is $2,000-$3,350 in wasted fuel per vehicle. Check tire pressure at every pre-trip inspection with a calibrated gauge — not a visual check.

### Speed Management
Aerodynamic drag increases exponentially with speed. Fuel efficiency data from major fleet studies:
- **55 mph**: Baseline fuel consumption
- **60 mph**: 7% more fuel than 55 mph
- **65 mph**: 14% more fuel than 55 mph
- **70 mph**: 22% more fuel than 55 mph
- **75 mph**: 30% more fuel than 55 mph

:::important
Each 5 mph above 55 mph costs approximately **$0.10 per mile** in additional fuel. On a 500-mile run, driving 70 mph instead of 60 mph saves about 75 minutes but costs an additional $35-50 in fuel. For most deliveries, the time savings do not justify the fuel cost — especially when your ETA already includes a 20% buffer.
:::

### Idle Time Reduction
One hour of idling burns **0.8-1.0 gallons** of diesel. Common idle scenarios:
- Waiting at dock for loading/unloading (use auxiliary power unit or shore power)
- Running engine for cab climate control during rest periods (use APU or battery-powered systems)
- Warming up the engine (modern diesels need only 3-5 minutes, not 30)

Target: less than 20% idle time as a percentage of total engine hours.

### Cruise Control Utilization
Constant speed consumes less fuel than repeated acceleration and deceleration. Use cruise control on all highway segments where traffic conditions permit.

### Driver Training
The single largest variable in fuel efficiency is **driver behavior**. Two drivers in identical trucks on the same route can differ by 15-20% in fuel consumption based on:
- Acceleration habits (gradual vs. aggressive)
- Speed discipline
- Anticipatory braking (coast vs. hard brake)
- Idle time

Monitor fuel efficiency per driver (telematics systems report this). Drivers consistently below fleet average need targeted coaching.

---

## The CouthActs Load Board as a Revenue Tool

The Load Board is not just a job-finding tool — it is a **route optimization tool**. Use it to:
- Find backhaul loads to eliminate empty return trips
- Identify high-frequency lanes where you can build repeat customer relationships
- Compare job budgets across similar routes to optimize your bidding strategy
- Plan multi-day trip sequences that maximize revenue miles and minimize dead miles

Fuel efficiency and route optimization are not one-time decisions. They are daily disciplines that compound into significant profit margin over the course of a year.`
  },
  {
    title: "Financial Planning for Transportation Businesses",
    order: 5,
    durationMins: 20,
    content: `## The Numbers That Matter

![Financial planning and business analysis](https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80)

Most transportation businesses fail not because they cannot find jobs — but because they cannot manage cash flow. Revenue does not equal profit. A fleet doing $500,000 per year in revenue with $480,000 in costs is a $20,000 business that cannot survive one bad month.

Understanding your financial metrics, managing cash flow, and planning for growth are the skills that separate fleet owners from former fleet owners.

---

## Key Financial Metrics

### Revenue Per Mile
Total revenue divided by total miles driven across all vehicles.

**Benchmarks by mode:**
- Freight trucking: $2.50-$4.00/mile (varies dramatically by lane, cargo type, and season)
- Heavy haul/oversized: $4.00-$8.00/mile (specialized equipment premium)
- Courier/last-mile: $1.50-$3.00/mile (shorter distances, higher stops-per-mile)
- Moving: $2.00-$3.50/mile (labor-intensive)

### Cost Per Mile
Total operating costs divided by total miles driven. This includes:
- **Fuel**: $0.50-$0.80/mile (the largest variable cost)
- **Driver compensation**: $0.40-$0.60/mile (wages, benefits, taxes)
- **Maintenance**: $0.15-$0.20/mile (preventive and reactive combined)
- **Insurance/protection**: $0.08-$0.15/mile
- **Vehicle depreciation/payment**: $0.10-$0.25/mile
- **Administrative overhead**: $0.05-$0.10/mile (dispatch, accounting, compliance)

**Benchmark total cost per mile**: $1.50-$2.50 for commercial trucking

### Profit Margin
(Revenue - Costs) / Revenue, expressed as a percentage.

:::key
Healthy profit margin benchmarks for transportation businesses:
- **Excellent**: 20-25% (efficient fleet with strong pricing power)
- **Good**: 15-20% (well-managed operations)
- **Marginal**: 10-15% (operational, but one bad quarter away from problems)
- **Dangerous**: Below 10% (insufficient margin to absorb unexpected costs)

If your margin is below 15%, focus on cost reduction before adding vehicles. Scaling a low-margin operation amplifies losses, not profits.
:::

### Utilization Rate
Percentage of available hours that your vehicles are generating revenue.
- **Long-haul target**: 80%+ utilization
- **Local/regional target**: 60%+ utilization

![Dashboard with fleet financial metrics](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80)

---

## CouthActs-Specific Financial Considerations

### Escrow Fees
CouthActs charges a sliding escrow fee deducted from your payout:
- Under $500: 8%
- $500-$4,999: 6%
- $5,000-$49,999: 4%
- $50,000+: 2%

**Always factor the escrow fee into your bid.** If your cost to complete a job is $2,000 and you want a 20% margin, your target revenue is $2,500. In the $500-$4,999 bracket, the 6% escrow fee means you need to bid $2,660 to net $2,500 after fees ($2,660 - $160 fee = $2,500).

### CouthActs Advance
Elite providers (Score 90+, 50+ completed jobs) can access **70% of the escrow amount** before job completion, at a **2.5% advance fee**.

Use CouthActs Advance strategically:
- Fund fuel and driver pay for active long-haul jobs
- Bridge cash flow gaps when escrow release is delayed by customer confirmation
- Do NOT use it as routine operating capital — the 2.5% fee compounds into a significant annual cost if used on every job

### Stripe Connect Withdrawal Fees
- Standard withdrawal: Free from CouthActs (Stripe's standard processing applies)
- Instant payout: 1.5% fee, arrives in 30 minutes
- Minimum withdrawal: $10

---

## Cash Flow Management

### The 60-Day Rule
Maintain at least **60 days of operating expenses** in your reserve account at all times. For a fleet with $30,000/month in operating costs, that means $60,000 in reserve.

This reserve protects against:
- Delayed escrow releases (customer does not confirm promptly)
- Unexpected vehicle repairs (a blown transmission costs $5,000-$12,000)
- Seasonal volume drops (January-February is historically slow for freight)
- Customer disputes that freeze escrow

### Vehicle Financing Discipline
Never take on vehicle loan payments exceeding **30% of that vehicle's monthly revenue**. If a truck generates $12,000/month in revenue, the maximum loan payment should be $3,600/month.

:::warning
Overleveraging on vehicle loans is the number one cause of fleet business failure. A truck that costs $2,500/month in loan payments needs to generate at least $8,333/month in revenue just to cover the payment — before fuel, insurance, maintenance, driver pay, and your profit margin. Be conservative with financing.
:::

### Revenue Concentration Risk
Monitor how much of your total revenue comes from your top 3-5 customers:
- **Below 40%**: Healthy diversification
- **40-60%**: Moderate concentration — actively pursue new customers
- **Above 60%**: Dangerous — losing one major customer could collapse your cash flow

---

## Tax Planning Basics

Transportation businesses have significant tax deductions available:
- Vehicle depreciation (Section 179 and bonus depreciation)
- Fuel expenses
- Maintenance and repair costs
- Insurance premiums
- Driver wages and benefits
- Per diem for overnight trips
- Tolls and parking

Consult a transportation-specialized CPA. The depreciation strategies alone can save $10,000-$50,000+ in taxes per vehicle in the first year of ownership.`
  },
  {
    title: "Using the CouthActs API for Fleet Automation",
    order: 6,
    durationMins: 20,
    content: `## Automating Your Fleet Operations

![Technology dashboard for fleet management](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80)

As your fleet grows beyond 5 vehicles, manual management of CouthActs bookings becomes a bottleneck. You cannot have a dispatcher manually checking the Load Board, updating tracking for 10 vehicles, monitoring wallet balances, and managing booking status — all from a web browser. You need automation.

The **CouthActs Provider API** enables programmatic interaction with every aspect of your CouthActs operations: job monitoring, booking management, tracking automation, wallet management, and webhook notifications.

---

## API Setup

### Step 1: Generate Your API Key
1. Log into your CouthActs account and navigate to **Settings**
2. Select the **API** tab
3. Click **Generate Provider API Key**
4. Your key will start with \`ca_live_\` (production) or \`ca_test_\` (sandbox)
5. Store this key securely — it provides full access to your provider account

:::warning
Your API key is as sensitive as your password. Never commit it to source code, share it in messages, or expose it in client-side applications. Use environment variables or a secrets manager. If you suspect your key has been compromised, rotate it immediately from Settings.
:::

### Step 2: Choose Your API Tier

| Tier | Monthly Cost | Daily Call Limit | Best For |
|------|-------------|-----------------|----------|
| Starter | Free | 100 calls/day | Small fleets (1-5 vehicles), monitoring only |
| Growth | $299/mo | 10,000 calls/day | Mid-size fleets (5-20 vehicles), automated tracking |
| Enterprise | Custom | Unlimited | Large fleets (20+), full automation, webhooks |

---

## Core API Endpoints

### Job Monitoring
**GET /api/provider/v1/jobs** — Query available jobs matching your fleet's registered modes and service areas.

Key query parameters:
- \`mode\`: Filter by transport mode (FREIGHT_TRUCKING, HEAVY_HAUL, etc.)
- \`origin_lat\`, \`origin_lng\`, \`origin_radius_miles\`: Jobs originating near a location
- \`min_budget\`, \`max_budget\`: Budget range filter
- \`hazmat\`: Boolean filter for HAZMAT-only jobs
- \`sort\`: Sort by budget_desc, pickup_date_asc, created_at_desc

**Use case**: Build an internal dispatch dashboard that polls for new jobs every 5 minutes and alerts your dispatcher when high-value jobs appear near your vehicles' current locations.

### Booking Management
**GET /api/provider/v1/bookings** — List all active, upcoming, and completed bookings across your fleet.

Key response fields:
- Booking ID, status, customer name
- Pickup/delivery addresses and deadlines
- Assigned vehicle and driver (from your internal assignment)
- Current tracking status
- Escrow amount and fee

**Use case**: Build a fleet-wide operations dashboard showing all active bookings, their statuses, and ETAs on a single screen.

### Tracking Automation
**POST /api/provider/v1/tracking** — Push GPS coordinates and tracking events programmatically.

![Highway fleet monitoring](https://images.unsplash.com/photo-1494412574643-ff11b0a5eb95?w=1200&q=80)

Request body:
- \`booking_id\`: The CouthActs booking ID
- \`latitude\`, \`longitude\`: Current position
- \`speed_mph\`: Current speed (optional)
- \`heading\`: Direction in degrees (optional)
- \`layer\`: Tracking layer — MOBILE_GPS, ELD_INTEGRATION, IOT_DEVICE, or SATELLITE
- \`note\`: Status note text (optional)
- \`photo_url\`: URL for DOCUMENT_POD_AI photos (optional)

:::key
This is the most valuable endpoint for fleet automation. If your vehicles use fleet telematics (Samsara, Geotab, KeepTruckin/Motive), build an integration that:
1. Receives GPS data from your telematics provider (via their webhook or API)
2. Transforms it into the CouthActs tracking format
3. POSTs it to the CouthActs tracking endpoint automatically

This eliminates the need for drivers to manually update their position on the CouthActs app — the telematics system handles it seamlessly, with updates every 60 seconds for active bookings.
:::

### Wallet Management
**GET /api/provider/v1/wallet** — Query your wallet balance and transaction history.

**Use case**: Set up automated alerts when your wallet balance drops below a threshold (e.g., below $5,000) or when a large escrow release is received.

---

## Telematics Integration Architecture

The most common fleet automation pattern on CouthActs:

1. **Telematics provider** (Samsara, Geotab, Motive) collects GPS, speed, engine data, and ELD logs from each vehicle
2. **Your integration server** receives this data via the telematics provider's API or webhook
3. **Mapping logic** associates each vehicle with its current CouthActs booking (from your dispatch system)
4. **CouthActs API call** pushes the position data to POST /api/provider/v1/tracking with the correct booking_id and layer

This architecture provides:
- Automated GPS tracking for every active booking without driver intervention
- ELD data integration via the ELD_INTEGRATION layer
- IoT sensor data (temperature, humidity) via the IOT_DEVICE layer for HAZMAT shipments
- Complete audit trail for compliance and dispute resolution

:::tip
Start with the Starter API tier (free, 100 calls/day) to build and test your integration. Once you verify it works correctly, upgrade to Growth tier ($299/mo) for the 10,000 calls/day needed for real-time tracking across multiple vehicles. The $299/month pays for itself by reducing dispatcher workload and improving tracking consistency.
:::

---

## Webhook Notifications (Enterprise Tier)

Enterprise API customers can register **webhooks** — URLs that CouthActs calls when specific events occur:
- New job posted matching your modes and service areas
- Bid accepted by customer
- Escrow released
- Dispute filed
- Customer review submitted

Webhooks enable **real-time reactive automation** — your systems respond to events as they happen, rather than polling for changes.`
  },
  {
    title: "Scaling Operations and Multi-Mode Expansion",
    order: 7,
    durationMins: 20,
    content: `## Growing Beyond Your First Mode

![Multiple transport modes including rail](https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1200&q=80)

Once your fleet is running efficiently in one transport mode, CouthActs offers a unique opportunity: expansion into **adjacent modes** that leverage your existing expertise, infrastructure, and customer relationships. The platform supports 18 transport modes, and each one represents a new revenue stream that your competitors in single-mode operations cannot access.

Multi-mode expansion is the fleet equivalent of diversification in an investment portfolio. When freight volumes dip seasonally, your courier division may be peaking. When local moving slows in winter, your long-haul freight may be at its busiest. Multiple modes smooth revenue fluctuations and reduce business risk.

---

## Natural Expansion Paths

Not all mode transitions are equal. Some build naturally on existing skills, equipment, and certifications. Others require entirely new capabilities. Focus on transitions that share the most overlap with your current operations.

### Ground Transport Expansion
- **Freight Trucking → Heavy Haul**: Requires larger equipment (multi-axle trailers, permit vehicles) but leverages the same CDL drivers, route knowledge, and customer relationships. Heavy haul commands **50-100% higher per-mile rates** than standard freight.
- **Freight Trucking → HAZMAT**: Requires CDL HAZMAT endorsement, CouthActs HAZMAT certification, and Elite Protection tier. Premium pricing of **30-60% above standard freight**.
- **Courier/Last-Mile → Moving Services**: Same local market expertise, expanded to larger vehicles and labor crews. Higher revenue per job but also higher labor costs.
- **Taxi/Limousine → Medical Transport**: Requires additional certifications (CPR, HIPAA compliance, wheelchair accessibility) but commands premium pricing with consistent demand from healthcare facilities.

### Cross-Modal Expansion
- **Air Cargo → Private Jet Charter**: Aviation expertise transfers directly. Requires Part 135 certification but leverages existing pilot relationships, FBO contacts, and aviation insurance.
- **Cargo Ship → Yacht Charter**: Maritime expertise transfers. Different vessel types but same regulatory framework (USCG, IMO).
- **Freight Trucking → Rail Freight**: Intermodal expertise. Many freight customers need both truck and rail for different legs of the same supply chain.

---

## The Multi-Mode Expansion Checklist

Before adding a new mode to your CouthActs profile, complete this checklist:

### 1. Regulatory Requirements
- What licenses and permits does the new mode require?
- Are there federal, state, or local certifications needed?
- How long does the licensing process take?
- What is the cost of initial compliance?

### 2. Equipment Assessment
- Can you use existing vehicles or do you need new/different equipment?
- If new equipment is needed, what is the capital cost?
- Can you lease or rent initially to test demand before purchasing?

### 3. Staffing Requirements
- Do your current drivers have the skills and certifications for the new mode?
- If you need specialized operators (pilots, captains, heavy equipment operators), what is the hiring timeline and cost?
- Can existing dispatch and administrative staff manage the new mode, or do you need additional support?

![Cargo ship for multi-mode expansion](https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1200&q=80)

### 4. Insurance and Protection
- What protection coverage does the new mode require?
- Are your existing insurance policies expandable or do you need separate policies?
- What is the additional annual premium?

### 5. CouthActs Platform Setup
- Register the new mode on your provider profile
- Complete any additional verification required for the mode
- Update your bio and service areas to reflect multi-mode capability
- Obtain mode-specific certifications from CouthActs Academy (if available)

:::important
On CouthActs, there is ONE CouthActs Score per provider account — not one per mode. A bad experience in a new mode damages your score across ALL modes. If you expand into moving services and a customer leaves a 1-star review because your labor crew was unprofessional, that review affects your freight trucking bid acceptance rate too. Only expand into modes you can serve at the same quality level as your primary mode.
:::

---

## Multi-Mode Advantages on CouthActs

### Increased Job Visibility
A provider registered for 1 mode sees jobs in that mode. A provider registered for 3 modes sees jobs in all 3 modes. More visibility means more bidding opportunities, more revenue potential, and faster score growth.

### Cross-Selling to Existing Customers
A freight customer who also needs courier service for urgent parts deliveries is a natural cross-sell. Mention your multi-mode capability in bid messages: "In addition to freight, we also offer same-day courier service in the Dallas-Fort Worth metro if you ever need urgent small-parcel delivery."

### Intermodal Coordination
Some customers need multi-mode transport for a single shipment — truck to port, ocean to destination port, truck to final delivery. A multi-mode provider can bid on the entire chain, offering the customer a single point of contact and eliminating handoff risks.

:::key
The most successful fleet operators on CouthActs view multi-mode expansion not as adding separate businesses, but as building a **transportation solution** that serves the customer's complete logistics needs. The more problems you can solve for a customer, the more indispensable you become.
:::`
  },
  {
    title: "Enterprise Features and Volume Pricing",
    order: 8,
    durationMins: 20,
    content: `## The Enterprise Tier: CouthActs as Core Infrastructure

![Fleet operations at enterprise scale](https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1200&q=80)

When your fleet reaches **15+ vehicles** or you are completing **50+ jobs per month**, you have outgrown the standard CouthActs experience. At this scale, the platform is no longer just a job board where you find occasional work — it is the operating system for your transportation business. The CouthActs Enterprise tier is designed for providers who operate at this level.

Enterprise features are accessed through a relationship with a dedicated CouthActs account team. This is not a self-serve upgrade — it is a negotiated partnership built around your fleet's specific volume, modes, routes, and growth trajectory.

---

## Enterprise Benefits

### Custom Escrow Pricing
Standard escrow fees on CouthActs follow the published sliding scale (8% under $500, down to 2% above $50,000). Enterprise providers negotiate **custom escrow fee rates** below the standard scale, based on monthly job volume.

The savings are significant at scale. A fleet completing 100 jobs/month at an average of $3,000/job generates $300,000 in monthly revenue. At the standard 6% rate ($500-$4,999 bracket), that is $18,000/month in escrow fees. A negotiated enterprise rate of 3.5% reduces fees to $10,500/month — saving **$7,500 per month ($90,000 annually)**.

:::key
Enterprise escrow pricing alone can fund an additional vehicle's operating costs. If your fleet is completing 50+ jobs per month at the standard rate, the enterprise conversation should be your top priority.
:::

### Dedicated Account Manager
A single point of contact at CouthActs who:
- Understands your fleet's operations, routes, and customer base
- Resolves issues with a phone call instead of a support ticket
- Proactively identifies opportunities (new customers, new routes, platform features)
- Advocates internally for features and improvements that benefit your operations
- Coordinates with the CouthActs operations team during critical shipments

### Priority Support
- **Direct phone line**: Not a call center — a direct number to your account manager and the enterprise support team
- **Response time SLA**: Under 1 hour for critical issues, under 4 hours for standard inquiries
- **Escalation path**: Issues that affect active shipments are escalated immediately to the operations team

![Business meeting and enterprise partnership](https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&q=80)

---

## Enterprise API and Technical Features

### Unlimited API Access
Enterprise API tier provides:
- **Unlimited daily API calls** — no throttling or rate limits
- **Webhook subscriptions** for real-time event notifications
- **Bulk operations** — create multiple bookings, push tracking for multiple vehicles, and manage fleet-wide settings through single API calls
- **Custom tracking layer configurations** — define custom geofence zones, alert thresholds, and reporting intervals

### White-Label Tracking
Give your customers a tracking page branded with **your company's look and feel** — your logo, your colors, your domain — powered by CouthActs infrastructure.

This is particularly valuable for providers who serve enterprise customers directly. Your customer sees your brand on the tracking page, not CouthActs. The underlying tracking technology (GPS, IoT, geofence, QR_PIN, DOCUMENT_POD_AI) is still CouthActs, but the presentation is yours.

### SSO (Single Sign-On)
Integrate CouthActs login with your company's identity provider (Okta, Azure AD, Google Workspace). Your drivers and dispatchers log into CouthActs using the same credentials they use for everything else. This simplifies onboarding and improves security through centralized access management.

### Custom Reporting
Enterprise-grade reporting including:
- Fleet-wide performance dashboards (on-time rate, utilization, revenue per mile by vehicle)
- Customer satisfaction analytics (review trends, repeat customer metrics)
- Financial summaries (escrow fees paid, advance usage, wallet activity)
- Compliance reports (HOS, HAZMAT documentation completeness, inspection records)

---

## Volume Pricing Tiers

:::important
CouthActs Enterprise pricing is negotiated based on volume. While exact rates are custom, the general framework is:

**Volume Tier 1: 50-99 jobs/month**
- Reduced escrow rates (typically 1-2% below standard)
- Dedicated account manager (shared with other Tier 1 providers)
- Growth API tier included

**Volume Tier 2: 100-249 jobs/month**
- Significantly reduced escrow rates
- Dedicated account manager (exclusive)
- Enterprise API tier included
- White-label tracking available

**Volume Tier 3: 250+ jobs/month**
- Custom escrow rates (best available)
- Senior dedicated account manager
- All Enterprise features included
- Custom development support for integrations
- Quarterly business review with CouthActs leadership
:::

---

## Government and Enterprise Customer Access

For providers pursuing government contracts:
- **couthacts.com/government** provides procurement-ready features
- **SAM.gov integration** for federal contract visibility
- Compliance reporting formatted for government audit requirements
- Multi-agency coordination for complex logistics operations

For providers serving Fortune 500 enterprise customers:
- White-label tracking eliminates platform branding concerns
- Custom SLA enforcement through the API
- Dedicated compliance documentation for enterprise vendor onboarding

---

## Getting Started with Enterprise

1. Visit **couthacts.com/enterprise** and complete the inquiry form
2. Provide: fleet size, average monthly job volume, primary transport modes, and current monthly CouthActs revenue
3. The enterprise team will contact you within **48 hours** to discuss pricing and setup
4. Typical onboarding time: 2-4 weeks from agreement to full enterprise activation

:::tip
Before reaching out to the enterprise team, prepare your data:
- Average monthly jobs completed on CouthActs (last 6 months)
- Total monthly revenue through the platform
- Current escrow fees paid monthly
- Number of active vehicles and drivers
- Growth plans for the next 12 months

The more data you bring to the conversation, the better the enterprise team can structure a pricing package that rewards your volume and supports your growth.
:::

The CouthActs Enterprise tier is designed for providers who have built successful fleet operations and are ready to scale with platform support. It transforms CouthActs from a marketplace into a strategic infrastructure partner for your transportation business.`
  }
];

export { COURSE_3, COURSE_4, COURSE_5 };
