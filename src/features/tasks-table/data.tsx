import {DangerCircleSvg} from "./danger-circle";
import {DefaultCircleSvg} from "./default-circle";
import {SuccessCircleSvg} from "./success-circle";
import {WarningCircleSvg} from "./warning-circle";

export const statusOptions = [
  {name: "Active", uid: "active"},
  {name: "Inactive", uid: "inactive"},
  {name: "Paused", uid: "paused"},
  {name: "Vacation", uid: "vacation"},
] as const;

export type StatusOptions = (typeof statusOptions)[number]["name"];

export const statusColorMap: Record<StatusOptions, JSX.Element> = {
  Active: SuccessCircleSvg,
  Inactive: DefaultCircleSvg,
  Paused: DangerCircleSvg,
  Vacation: WarningCircleSvg,
};

export type Task = {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
};

export type ColumnsKey =
  | "id"
  | "name"
  | "startDate"
  | "endDate"
  | "actions";

export const INITIAL_VISIBLE_COLUMNS: ColumnsKey[] = [
  "id",
  "name",
  "startDate",
  "endDate",
  "actions",
];

export const columns = [
  {name: "ID", uid: "id"},
  {name: "Название", uid: "name"},
  {name: "Начало", uid: "startDate", info: "Дата открытия задания к выполнению."},
  {name: "Конец", uid: "endDate", info: "Дата закрытия возможности выполнить задание."},
  {name: "Действия", uid: "actions"},
];

const names = [
  "Лабораторная работа по поиску кратчайшего пути",
  "Исследование свойств графа",
  "Построение дерева с минимальной стоимостью",
  "Матричное представление графа",
  "Циклы в графе",
  "Проверка связности графа",
  "Алгоритм Дейкстры",
  "Алгоритм Флойда-Уоршалла",
  "Алгоритм Беллмана-Форда",
  "Алгоритм Крускала",
  "Алгоритм Прима",
  "Алгоритм Борувки",
  "Обход графа в глубину",
  "Обход графа в ширину",
  "Построение минимального остовного дерева",
  "Выделение сильно связанных компонент",
  "Выделение слабо связанных компонент",
  "Построение матрицы смежности",
  "Построение матрицы инцидентности",
  "Проверка на эйлеровость",
  "Проверка на гамильтоновость",
  "Проверка на планарность",
  "Проверка на изоморфность",
  "Проверка на изометричность",
  "Проверка на гомеоморфность",
  "Проверка на ориентированность",
  "Проверка на неориентированность",
  "Выделение клик",
  "Выделение звезд",
  "Выделение простых циклов",
  "Выделение сложных циклов",
  "Выделение деревьев",
  "Выделение лесов",
  "Выделение кратчайших путей",
  "Выделение наибольших полносвязных подграфов",
  "Выделение наименьших полносвязных подграфов",
  "Выделение наибольших клик",
  "Выделение наименьших клик",
  "Выделение звезд",
  "Выделение простых звезд",
  "Выделение сложных звезд",
];



const generateMockUserData = (count: number): Task[] => {
  const mockData: Task[] = [];

  for (let i = 0; i < count; i++) {
    const selectedName = names[Math.floor(Math.random() * names.length)];

    const user: Task = {
      id: i,
      name: selectedName,
      startDate: new Date(new Date().getTime() - Math.random() * (24 * 60 * 60 * 1000 * 40)),
      endDate: new Date(new Date().getTime() - Math.random() * (24 * 60 * 60 * 1000 * 40)),
    };

    mockData.push(user);
  }

  return mockData;
};

export const tasks: Task[] = generateMockUserData(100);
