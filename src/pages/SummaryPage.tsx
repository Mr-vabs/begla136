import { Question } from "@/types/question"

type Props = {
  questions: Question[]
  answers: Record<number, string>
  onSelect: (index: number) => void
}

export default function SummaryPage({ questions, answers, onSelect }: Props) {
  const grouped = questions.reduce((acc, q, idx) => {
    if (!acc[q.section]) acc[q.section] = []
    acc[q.section].push({ ...q, index: idx })
    return acc
  }, {} as Record<string, (Question & { index: number })[]>)

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold">Summary</h2>
      {Object.entries(grouped).map(([section, qs]) => (
        <div key={section}>
          <h3 className="text-lg font-semibold text-blue-700 mb-2">Section {section}</h3>
          <ul className="space-y-1">
            {qs.map(({ index, question }) => (
              <li
                key={index}
                onClick={() => onSelect(index)}
                className="cursor-pointer hover:underline"
              >
                Q{index + 1} – {answers[index]?.trim() ? "✅" : "⚠️"}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}