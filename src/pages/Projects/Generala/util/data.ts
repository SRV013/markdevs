import {
  Five,
  Four,
  General,
  Ladder,
  One,
  Poker,
  Six,
  Tow,
  Three,
  GeneralII,
  Full,
} from "./icon";
const jugadas = [
  { id: "1", name: "Uno", options: [0, 1, 2, 3, 4, 5], icon: One },
  { id: "2", name: "Dos", options: [0, 2, 4, 6, 8, 10], icon: Tow },
  { id: "3", name: "Tres", options: [0, 3, 6, 9, 12, 15], icon: Three },
  { id: "4", name: "Cuato", options: [0, 4, 8, 12, 16, 20], icon: Four },
  { id: "5", name: "Cinco", options: [0, 5, 10, 15, 20, 25], icon: Five },
  { id: "6", name: "Seis", options: [0, 6, 12, 18, 24, 30], icon: Six },
  { id: "escalera", name: "Escalera", options: [0, 20, 25], icon: Ladder },
  { id: "full", name: "Full", options: [0, 30, 35], icon: Full },
  { id: "poker", name: "Póker", options: [0, 40, 45], icon: Poker },
  { id: "generala", name: "Generala", options: [0, 50], icon: General },
  {
    id: "generala_doble",
    name: "Generala II",
    options: [0, 100],
    icon: GeneralII,
  },
];
export { jugadas };
