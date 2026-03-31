"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Award, XCircle } from "lucide-react";

interface Question { id: string; question: string; optionA: string; optionB: string; optionC: string; optionD: string; order: number }
interface Result { questionId: string; question: string; userAnswer: string; correctAnswer: string; isCorrect: boolean; explanation: string }

export default function ExamPage() {
  const params = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState<Result[] | null>(null);
  const [score, setScore] = useState(0);
  const [passed, setPassed] = useState(false);
  const [certificateId, setCertificateId] = useState<string | null>(null);
  const [courseId, setCourseId] = useState("");

  useEffect(() => {
    // Get courseId from slug
    fetch(`/api/academy/courses/${params.slug}`).then((r) => r.json()).then((d) => {
      if (d.course) {
        setCourseId(d.course.id);
        fetch(`/api/academy/exam?courseId=${d.course.id}`).then((r) => r.json()).then((e) => {
          if (e.error) { setError(e.error); setLoading(false); return; }
          setQuestions(e.questions || []); setLoading(false);
        });
      } else { setError("Course not found"); setLoading(false); }
    });
  }, [params.slug]);

  async function submitExam() {
    setSubmitting(true);
    const res = await fetch("/api/academy/exam", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId, answers }),
    });
    const data = await res.json();
    setResults(data.results); setScore(data.score); setPassed(data.passed); setCertificateId(data.certificateId);
    setSubmitting(false);
  }

  if (loading) return <div className="min-h-screen bg-cream-50"><Navbar /><div className="mx-auto max-w-2xl px-6 py-20 text-center"><div className="h-8 w-48 mx-auto animate-pulse rounded bg-gray-200" /></div></div>;
  if (error) return <div className="min-h-screen bg-cream-50"><Navbar /><div className="mx-auto max-w-2xl px-6 py-20 text-center"><p className="text-red-500">{error}</p></div></div>;

  const q = questions[current];

  // Results view
  if (results) {
    return (
      <div className="min-h-screen bg-cream-50">
        <Navbar />
        <div className="mx-auto max-w-2xl px-6 py-10">
          <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100 text-center mb-6">
            {passed ? (
              <>
                <Award className="mx-auto h-16 w-16 text-amber-500" />
                <h1 className="mt-4 text-2xl font-display font-bold text-green-800">Congratulations!</h1>
                <p className="mt-2 text-lg text-gray-600">You scored {score}% — Exam passed!</p>
                {certificateId && (
                  <a href={`/academy/certificate/${certificateId}`} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-ocean-600 px-6 py-3 text-sm font-medium text-white hover:bg-ocean-700 transition">
                    <Award className="h-4 w-4" /> View Certificate
                  </a>
                )}
              </>
            ) : (
              <>
                <XCircle className="mx-auto h-16 w-16 text-red-400" />
                <h1 className="mt-4 text-2xl font-display font-bold text-red-800">Not quite</h1>
                <p className="mt-2 text-lg text-gray-600">You scored {score}% — 70% required to pass.</p>
                <p className="mt-1 text-sm text-gray-400">Review the explanations below and try again.</p>
                <button
                  onClick={() => { setResults(null); setCurrent(0); setAnswers({}); }}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-ocean-600 px-6 py-3 text-sm font-medium text-white hover:bg-ocean-700 transition"
                >
                  Retake Exam
                </button>
              </>
            )}
          </div>

          {/* Answer review */}
          <div className="space-y-4">
            {results.map((r, i) => (
              <div key={r.questionId} className={`rounded-xl p-5 border ${r.isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
                <p className="text-sm font-medium text-ocean-800">Q{i + 1}: {r.question}</p>
                <p className="mt-1 text-xs">Your answer: <span className={r.isCorrect ? "text-green-700 font-semibold" : "text-red-700 font-semibold"}>{r.userAnswer || "—"}</span></p>
                {!r.isCorrect && <p className="text-xs text-green-700">Correct: {r.correctAnswer}</p>}
                <p className="mt-2 text-xs text-gray-600 italic">{r.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Question view
  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />
      <div className="mx-auto max-w-2xl px-6 py-10">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Question {current + 1} of {questions.length}</span>
            <span>{Object.keys(answers).length} answered</span>
          </div>
          <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
            <div className="h-full rounded-full bg-ocean-500 transition-all" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
          </div>
        </div>

        {q && (
          <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
            <p className="text-base font-medium text-ocean-900 mb-6">{q.question}</p>
            <div className="space-y-3">
              {[
                { key: "A", text: q.optionA },
                { key: "B", text: q.optionB },
                { key: "C", text: q.optionC },
                { key: "D", text: q.optionD },
              ].map((opt) => (
                <label key={opt.key}
                  className={`flex items-center gap-3 rounded-xl border-2 p-4 cursor-pointer transition ${answers[q.id] === opt.key ? "border-ocean-600 bg-ocean-50" : "border-gray-200 hover:border-gray-300"}`}>
                  <input type="radio" name={`q-${q.id}`} value={opt.key} checked={answers[q.id] === opt.key}
                    onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: opt.key }))}
                    className="accent-ocean-600" />
                  <span className="text-sm text-ocean-800">{opt.key}. {opt.text}</span>
                </label>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <Button variant="ghost" onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0}>
                Previous
              </Button>
              {current < questions.length - 1 ? (
                <Button onClick={() => setCurrent((c) => c + 1)} disabled={!answers[q.id]}>
                  Next
                </Button>
              ) : (
                <Button onClick={submitExam} loading={submitting} disabled={Object.keys(answers).length < questions.length}>
                  Submit Exam
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
