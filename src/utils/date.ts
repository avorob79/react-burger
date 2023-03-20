export function dateToString(date: Date) {
  let result = date.toLocaleString("ru-RU", { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' });
  var temp = new Date();
  const today = temp.toLocaleString("ru-RU", { year: 'numeric', month: 'numeric', day: 'numeric' });
  temp.setDate(temp.getDate() - 1);
  const yesterday = temp.toLocaleString("ru-RU", { year: 'numeric', month: 'numeric', day: 'numeric' });
  return result.replace(today, 'Сегодня').replace(yesterday, 'Вчера');
}