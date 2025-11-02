import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

function generateQuestion() {
  const a = Math.ceil(Math.random() * 10);
  const b = Math.ceil(Math.random() * 10);
  return { a, b, correct: a * b };
}

export default function Training() {
  const [question, setQuestion] = useState(generateQuestion());
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [count, setCount] = useState(0);
  const [results, setResults] = useState([]);

  const submitAnswer = async () => {
    const isCorrect = parseInt(answer) === question.correct;
    setFeedback(isCorrect ? "✅ Правильно!" : `❌ Неправильно (${question.correct})`);

    const newResults = [...results, { ...question, answer, isCorrect }];
    setResults(newResults);
    setAnswer("");
    setQuestion(generateQuestion());
    setCount(count + 1);

    if (count >= 9) { // 10 вопросов
      await addDoc(collection(db, "results"), {
        createdAt: new Date().toISOString(),
        answers: newResults,
      });
      alert("Тренировка завершена! Результаты сохранены.");
      setCount(0);
      setResults([]);
    }
  };

  const buttons = [
    ["7", "8", "9"],
    ["4", "5", "6"],
    ["1", "2", "3"],
    ["0"]
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-6 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-4">{question.a} × {question.b} = ?</h2>

        <div className="text-2xl font-semibold mb-4">{answer}</div>

        {/* Сетка как на калькуляторе */}
        <div className="grid grid-cols-3 gap-4">
          {buttons.flat().map((n) => (
            <button
              key={n}
              onClick={() => setAnswer(answer + n)}
              className="bg-gradient-to-r from-purple-400 to-pink-400
                         rounded-full p-6 text-xl font-bold text-white shadow-lg
                         hover:scale-105 transition-transform duration-200"
            >
              {n}
            </button>
          ))}
        </div>

        <div className="flex gap-4 mt-6 justify-center">
          <button
            onClick={submitAnswer}
            className="bg-green-500 rounded-2xl px-8 py-3 font-bold text-white shadow hover:bg-green-600 transition-colors"
          >
            Проверить
          </button>
          <button
            onClick={() => setAnswer("")}
            className="bg-red-400 rounded-2xl px-8 py-3 font-bold text-white shadow hover:bg-red-500 transition-colors"
          >
            Стереть
          </button>
        </div>

        {/* Прогресс-бар */}
        <div className="w-full h-4 bg-gray-300 rounded-full mt-6">
          <div
            className="h-4 bg-green-400 rounded-full transition-all duration-500"
            style={{ width: `${(count / 10) * 100}%` }}
          ></div>
        </div>

        {/* Анимация обратной связи */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              key={feedback}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className={`text-lg font-bold mt-4 ${feedback.includes("✅") ? "text-green-500" : "text-red-500"}`}
            >
              {feedback}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
