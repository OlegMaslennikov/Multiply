import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Stats() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "results"));
      const all = [];
      querySnapshot.forEach((doc) => all.push(doc.data()));
      setData(all);
    }
    fetchData();
  }, []);

  const flat = data.flatMap((r) => r.answers);
  const correct = flat.filter((x) => x.isCorrect).length;
  const wrong = flat.length - correct;

  const freq = {};
  flat.forEach((x) => {
    const key = `${x.a}×${x.b}`;
    if (!x.isCorrect) freq[key] = (freq[key] || 0) + 1;
  });
  const commonMistakes = Object.entries(freq).sort((a, b) => b[1] - a[1]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Статистика</h1>
      <p>Правильных ответов: {correct}</p>
      <p>Ошибок: {wrong}</p>

      <h2 className="text-xl mt-6 mb-2">Частые ошибки</h2>
      <ul className="flex flex-col gap-1 items-center">
        {commonMistakes.length
          ? commonMistakes.map(([k, v]) => (
              <li key={k} className="bg-red-100 px-3 py-1 rounded-xl w-40">
                {k} — {v} раз
              </li>
            ))
          : <li>Ошибок нет 🎉</li>}
      </ul>
    </div>
  );
}
