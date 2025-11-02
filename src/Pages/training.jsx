import { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

export default function Training() {
  const [question, setQuestion] = useState(generateQuestion());
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [count, setCount] = useState(0);
  const [results, setResults] = useState([]);

  function generateQuestion() {
    const a = Math.ceil(Math.random() * 10);
    const b = Math.ceil(Math.random() * 10);
    return { a, b, correct: a * b };
  }

  async function submitAnswer() {
    const isCorrect = parseInt(answer) === question.correct;
    setResults((prev) => [...prev, { ...question, answer, isCorrect }]);
    setFeedback(isCorrect ? "✅ Правильно!" : `❌ Неправильно (${question.correct})`);
    setCount(count + 1);
    setAnswer("");
    setQuestion(generateQuestion());

    if (count >= 9) { // 10 вопросов
      await saveResults([...results, { ...question, answer, isCorrect }]);
      alert("Тренировка завершена! Результаты сохранены.");
      setCount(0);
      setResults([]);
    }
  }

  async function saveResults(res) {
    await addDoc(collection(db, "results"), {
      createdAt: new Date().toISOString(),
      answers: res,
    });
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h2 className="text-2xl font-bold">
        {question.a} × {question.b} = ?
      </h2>

      <div className="text-xl">Ответ: {answer}</div>

      <div className="grid grid-cols-3 gap-2 w-48">
        {[1,2,3,4,5,6,7,8,9,0].map((n) => (
          <button
            key={n}
            className="bg-gray-300 p-3 rounded-xl text-lg"
            onClick={() => setAnswer(answer + n)}
          >
            {n}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <button onClick={submitAnswer} className="bg-blue-500 text-white px-4 py-2 rounded-xl">
          Проверить
        </button>
        <button onClick={() => setAnswer("")} className="bg-red-400 text-white px-4 py-2 rounded-xl">
          Стереть
        </button>
      </div>

      {feedback && <div className="text-lg">{feedback}</div>}
    </div>
  );
}
