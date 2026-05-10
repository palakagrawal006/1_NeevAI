import React from "react";

function Sidebar({ result }) {
  // const data = result.data || result

  if (
    !result ||
    !result.subTopics ||
    !result.questions ||
    !result.questions.short ||
    !result.questions.long
  ) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-[#16325B] px-4 py-3">
        <p className="text-white font-bold text-sm">📌 Exam at a Glance</p>
        {result.importance && (
          <span className="mt-1 inline-block bg-cyan-400/20 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
          🔥 {result.importance}
        </span>
        )}
      </div>

      <div className="p-4 space-y-4">
        {/* sub topics */}
        <section>
          <p className="text-xs font-bold text-[#16325B] mb-2">
            ⭐ Sub Topics — Priority Wise
          </p>
          {Object.entries(result.subTopics).map(([star, topics]) => (
            <div
              key={star}
              className="mb-2 rounded-xl bg-slate-50 border border-slate-200 p-3"
            >
              <p className="text-xs font-semibold text-amber-600 mb-1">
                {star} Priority
              </p>

              <ul className="list-disc ml-4 text-xs text-slate-600 space-y-1">
                {topics.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* short questions */}
        <section className="rounded-xl bg-blue-50 border border-blue-100 p-3">
          <p className="text-xs font-bold text-[#16325B] mb-2">
            💬 Short Answers
          </p>

          <ul className="list-disc ml-4 text-xs text-slate-600 space-y-1">
            {result.questions.short.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </section>

        {/* Long Questions */}
        <section className="rounded-xl bg-violet-50 border border-violet-100 p-3">
          <p className="text-xs font-bold text-[#16325B] mb-2">
            📝 Long Answers
          </p>
          <ul className="list-disc ml-4 text-xs text-slate-600 space-y-1">
            {result.questions.long.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </section>

        {/* Diagram Question */}
        {result.questions.diagram && (
          <section className="rounded-xl bg-cyan-50 border border-cyan-100 p-3">
            <p className="text-xs font-bold text-[#16325B] mb-2">
              📊 Diagram Question
            </p>
            <ul className="list-disc ml-4 text-xs text-slate-600">
              <li>{result.questions.diagram}</li>
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
