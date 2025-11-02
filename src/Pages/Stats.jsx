import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function Stats() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const snapshot = await getDocs(collection(db, "results"));
      const all = [];
      snapshot.forEach((doc) => all.push(doc.data()));
      setData(all);
    }
    fetchData();
  }, []);

  const flat = data.flatMap(r => r.answers);
  const correct = flat.filter(x => x.isCorrect).length;
  const wrong = flat.length - correct;

  // Частые ошибки
  const freq = {};
  flat.forEach(x => {
    const key = `${x.a}×${x.b}`;
    if (!x.isCorrect) freq[key] = (freq[key] || 0) + 1;
  });
  const commonMistakes = Object.entries(freq).sort((a,b) => b[1] - a[1]);

  // Прогресс по дням
  const dailyProgress = data.map(d => ({
    date: new Date(d.createdAt).toLocaleDateString(),
    correct: d.answers.filter(x => x.isCorrect).length
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-300 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-purple-800 drop-shadow-lg">📊 Статистика</h1>

      <div className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-md mb-6">
        <p className="text-xl mb-2">✅ Правильных ответов: <span className="font-bold">{correct}</span></p>
        <p className="text-xl">❌ Ошибок: <span className="font-bold">{wrong}</span></p>
      </div>

      {/* График прогресса */}
      {dailyProgress.length > 0 && (
        <div className="bg-white rounded-3xl shadow-xl p-4 w-full max-w-md mb-6">
          <h2 className="text-xl font-bold mb-2">Прогресс по дням</h2>
          <LineChart width={400} height={200} data={dailyProgress} className="mx-auto">
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Tooltip />
            <Line type="monotone" dataKey="correct" stroke="#82ca9d" strokeWidth={3} />
          </LineChart>
        </div>
      )}

      {/* Частые ошибки */}
      <div className="bg-white rounded-3xl shadow-xl p-4 w-full max-w-md">
        <h2 className="text-xl font-bold mb-2">❗ Частые ошибки</h2>
        <ul className="flex flex-col gap-2 items-center">
          {commonMistakes.length
            ? commonMistakes.map(([k,v]) => (
                <li key={k} className="bg-red-200 px-3 py-1 rounded-xl w-44 text-center font-bold">
                  {k} — {v} раз
                </li>
              ))
            : <li className="text-green-600 font-bold">Ошибок нет 🎉</li>}
        </ul>
      </div>
    </div>
  );
}

