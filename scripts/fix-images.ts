/**
 * Replace duplicate Unsplash images with unique ones across all course content files.
 * Run: npx tsx scripts/fix-images.ts
 */
import * as fs from "fs";
import * as path from "path";

// 90 unique, relevant Unsplash photo IDs for transportation/business/safety
const UNIQUE_IDS = [
  // Trucks & ground transport
  "photo-1578575437130-527eed3abbec", // logistics
  "photo-1580674684081-7617fbf3d745", // truck loading
  "photo-1562920618-5d03a67a0dfc", // truck highway
  "photo-1557862921-37829c790f19", // freight truck
  "photo-1586191583817-a53cfc1cce9c", // white truck
  "photo-1544620347-c4fd4a3d5957", // bus transport
  "photo-1616432043562-3671ea2e5242", // delivery van
  "photo-1530685932526-5b62f9de90f6", // cargo loading
  // Shipping & maritime
  "photo-1559136555-9303baea8ebd", // container port
  "photo-1567899378494-47b22a2ae96a", // sailing
  "photo-1524522173746-f628baad3644", // cargo containers
  "photo-1565793298595-6a879b1d9492", // port cranes
  "photo-1570168007204-dfb528c6958f", // shipping
  "photo-1548266652-99cf27701ced", // ocean vessel
  "photo-1536697246787-1f7ae568d89a", // maritime
  "photo-1569263979104-865ab7cd8d13", // port
  // Aviation
  "photo-1556388158-158ea5ccacbd", // cockpit
  "photo-1529074163764-98f8cbaa37b6", // aircraft
  "photo-1583168813785-73428817ebb1", // air cargo
  "photo-1517479149777-5f3b1511d5ad", // airplane wing
  "photo-1436491865332-7a61a109db05", // helicopter
  "photo-1488085061387-422e29b40080", // airport
  // Business & office
  "photo-1573164713619-24c711fe7878", // handshake
  "photo-1556761175-4b46a572b786", // team meeting
  "photo-1531973576160-7125cd663d86", // presentation
  "photo-1542744094-3a31f272c490", // office
  "photo-1559136555-9303baea8ebd", // workspace
  "photo-1521737604893-d14cc237f11d", // collaboration
  "photo-1553484771-047a44eee27b", // laptop work
  "photo-1590402494610-2c378a9114c6", // business docs
  // Safety & compliance
  "photo-1587293852726-70cdb56c2866", // warehouse safety
  "photo-1503376780353-7e6692767b70", // vehicle
  "photo-1485575636961-2250e3a2510e", // caution
  "photo-1547036967-23d11aacaee0", // hard hat
  "photo-1582719188393-bb71ca45dbb9", // construction safety
  "photo-1533042514-1d3e0c2d54f1", // safety vest
  // Finance & money
  "photo-1563986768494-4dee2763ff3f", // calculator
  "photo-1579621970563-ebec7560ff3e", // dollar
  "photo-1565514020179-026b92b84bb6", // credit card
  "photo-1559526324-4b87b5e36e44", // wallet
  "photo-1526304640581-d334cdbbf45e", // banking
  "photo-1554224155-1d9c4fc58ce7", // money chart
  // Dashboard & tech
  "photo-1581091226825-a6a2a5aee158", // tech screen
  "photo-1550751827-4bd374c3f58b", // laptop code
  "photo-1555949963-ff9fe0c870eb", // server
  "photo-1498050108023-c5249f4df085", // code screen
  "photo-1460925895917-afdab827c52f", // dashboard
  "photo-1551288049-bebda4e38f71", // analytics
  // Drivers & people
  "photo-1484399172022-72a90b12e3c1", // driver cab
  "photo-1522202176988-66273c2fd55f", // learning
  "photo-1521791136064-7986c2920216", // thumbs up
  "photo-1589939705384-5185137a7f0f", // worker
  "photo-1557804506-669a67965ba0", // woman professional
  "photo-1600880292089-90a7e086ee0c", // team
  // Roads & infrastructure
  "photo-1508672019048-805c876b67e2", // highway aerial
  "photo-1518611012118-696072aa579a", // night highway
  "photo-1531266752426-aad472b7bbf4", // road
  "photo-1548345680-f5475ea5b093", // bridge
  "photo-1506748686214-e9df14d4d9d0", // city traffic
  "photo-1515622097508-5f0a3e3d3be4", // sunrise road
  // Training & education
  "photo-1524178232363-1fb2b075b655", // classroom
  "photo-1503676260728-1c00da094a0b", // study
  "photo-1509062522246-3755977927d7", // teaching
  "photo-1517245386747-bb6e05f89c3a", // exam
  "photo-1516321318423-f06f85e504b3", // computer learning
  "photo-1434030216411-0b793f4b4173", // notebook
  // Weather & hazards
  "photo-1527482797697-8795b05a13fe", // storm
  "photo-1541002037-f66d10fd093c", // snow road
  "photo-1501299716263-0d946e851f46", // fog
  "photo-1513002749550-c59d786b8e6c", // rain
  "photo-1527766833261-b09c3163a791", // ice road
  // Warehouse & logistics
  "photo-1553413077-190dd305871c", // warehouse
  "photo-1586528116311-ad8dd3c8310d", // container yard
  "photo-1533413077-190dd305871c", // distribution
  "photo-1581668854178-b58c74a7b0f7", // packages
  // Customer & service
  "photo-1560472354-b33ff0c44a43", // customer
  "photo-1522071820081-009f0129c71c", // team collab
  "photo-1517245386747-bb6e05f89c3a", // review
  "photo-1552664730-d307ca884978", // meeting
  // Stars & success
  "photo-1533750516457-a7f992034fec", // stars
  "photo-1504805572947-34fad45aed93", // success
  "photo-1485217988980-11786ced9454", // medal
  "photo-1504384308090-c894fdcc538d", // trophy
  // Fleet & vehicles
  "photo-1519003722824-194d4455a60c", // fleet
  "photo-1474487548417-781cb71495f3", // train
  "photo-1605745341112-85968b19335b", // cargo ship
  "photo-1540962351504-03099e0a754b", // jet
];

function getUniqueUrl(index: number): string {
  const id = UNIQUE_IDS[index % UNIQUE_IDS.length];
  return `https://images.unsplash.com/${id}?w=1200&q=80`;
}

const contentDir = path.join(process.cwd(), "src/lib/academy");
const files = fs.readdirSync(contentDir).filter(f => f.startsWith("course-content"));

let globalIndex = 0;

for (const file of files) {
  const filePath = path.join(contentDir, file);
  let content = fs.readFileSync(filePath, "utf-8");

  // Replace each image URL with a unique one
  content = content.replace(
    /https:\/\/images\.unsplash\.com\/[^?)]+\?w=1200&q=80/g,
    () => {
      const url = getUniqueUrl(globalIndex);
      globalIndex++;
      return url;
    }
  );

  fs.writeFileSync(filePath, content);
  console.log(`${file}: replaced images (used IDs ${globalIndex - content.split("unsplash").length + 1} to ${globalIndex})`);
}

console.log(`\nTotal unique images assigned: ${globalIndex}`);
