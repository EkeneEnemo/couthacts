/**
 * Re-seeds academy courses with full lesson content.
 * Run with: npx tsx scripts/reseed-academy.ts
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

async function main() {
  // Clear
  await db.lessonProgress.deleteMany({});
  await db.enrollment.deleteMany({});
  await db.examQuestion.deleteMany({});
  await db.lesson.deleteMany({});
  await db.course.deleteMany({});
  console.log("Cleared existing courses.");

  // Use dynamic import to load the seed data from the API route module
  // We can't import the route directly, so we inline the full course data here
  // by reading from the file system
  const fs = await import("fs");
  const path = await import("path");
  const seedFile = fs.readFileSync(
    path.join(process.cwd(), "src/app/api/academy/seed/route.ts"),
    "utf-8"
  );

  // Extract the courses array from the seed file
  const coursesStart = seedFile.indexOf("const courses = [");
  const coursesEnd = seedFile.indexOf("];\n\n  // Seed courses");
  if (coursesStart === -1 || coursesEnd === -1) {
    throw new Error("Could not find courses array in seed file");
  }
  const coursesCode = seedFile.slice(coursesStart, coursesEnd + 2);

  // Evaluate the courses array (safe - it's our own code)
  const evalCode = coursesCode
    .replace(/as const/g, "")
    .replace(/^const courses = /, "return ");
  const coursesFn = new Function(evalCode);
  const courses = coursesFn();

  console.log(`Found ${courses.length} courses to seed.\n`);

  for (const courseData of courses) {
    const course = await db.course.create({
      data: {
        title: courseData.title,
        slug: courseData.slug,
        description: courseData.description,
        whatYouLearn: courseData.whatYouLearn,
        category: courseData.category,
        priceUsd: courseData.priceUsd,
        duration: courseData.duration,
        totalLessons: courseData.totalLessons,
        level: courseData.level,
        thumbnailUrl: courseData.thumbnailUrl,
        isPublished: true,
      },
    });

    for (const lesson of courseData.lessons) {
      await db.lesson.create({ data: { courseId: course.id, ...lesson } });
    }

    for (const q of courseData.examQuestions) {
      await db.examQuestion.create({ data: { courseId: course.id, ...q } });
    }

    const avgContentLen = Math.round(
      courseData.lessons.reduce((sum: number, l: { content: string }) => sum + (l.content?.length || 0), 0) / courseData.lessons.length
    );
    console.log(
      `✓ ${courseData.title} — ${courseData.lessons.length} lessons (avg ${avgContentLen} chars), ${courseData.examQuestions.length} exam questions`
    );
  }

  console.log(`\nDone! ${courses.length} courses seeded with full content.`);
}

main()
  .then(() => db.$disconnect())
  .then(() => process.exit(0))
  .catch((e) => { console.error(e); process.exit(1); });
