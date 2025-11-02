import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Тренировка таблицы умножения</h1>
      <Link to="/training" className="bg-blue-500 text-white px-4 py-2 rounded-xl">
        Начать тренировку
      </Link>
      <Link to="/stats" className="bg-green-500 text-white px-4 py-2 rounded-xl">
        Статистика
      </Link>
    </div>
  );
}
