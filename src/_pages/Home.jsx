import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-10 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 p-6">
      <h1 className="text-4xl font-extrabold text-purple-800 drop-shadow-lg mb-6 text-center">
        🧮 Тренировка таблицы умножения
      </h1>

      <div className="flex flex-col gap-6 w-64">
        <Link
          to="/training"
          className="bg-gradient-to-r from-green-400 to-blue-500
                     rounded-3xl px-8 py-6 text-2xl font-bold text-white shadow-lg
                     hover:scale-105 transition-transform duration-200 text-center"
        >
          🚀 Начать тренировку
        </Link>

        <Link
          to="/stats"
          className="bg-gradient-to-r from-pink-400 to-purple-500
                     rounded-3xl px-8 py-6 text-2xl font-bold text-white shadow-lg
                     hover:scale-105 transition-transform duration-200 text-center"
        >
          📊 Статистика
        </Link>
      </div>

      <p className="mt-10 text-xl text-purple-700 font-semibold drop-shadow-sm text-center">
        ✨ Каждый день — лучше, чем вчера! ✨
      </p>
    </div>
  );
}
