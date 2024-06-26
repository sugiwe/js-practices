"use strict";

import minimist from "minimist";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
} from "date-fns";

function main() {
  let { year, month } = fixYearMonth();
  displayCalendar(year, month);
}

// コマンドライン引数の有無によって年月を取得・確定
function fixYearMonth() {
  let argv = minimist(process.argv.slice(2));
  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth() + 1;
  let year = argv.y || currentYear;
  let month = argv.m || currentMonth;
  return { year, month };
}

// 指定された年月のカレンダーを表示
function displayCalendar(year, month) {
  displayCalendarHeader(year, month);
  displayDaysOfMonth(year, month);
}

// 指定された年月のカレンダーヘッダー（年・月・曜日の部分）を表示
function displayCalendarHeader(year, month) {
  console.log(format(new Date(year, month - 1), "     M月 yyyy"));
  console.log("日 月 火 水 木 金 土");
}

// 指定された年月のカレンダー（日付部分のみ）を表示
function displayDaysOfMonth(year, month) {
  let date = new Date(year, month - 1);
  let start = startOfMonth(date);
  let end = endOfMonth(date);
  let eachDay = eachDayOfInterval({ start, end });

  let firstDayWeekDay = getDay(start);
  let margin = "   ".repeat(firstDayWeekDay);
  let calendarString = "";

  eachDay.forEach((day) => {
    calendarString += format(day, "d").padStart(2, " ") + " ";
    if (getDay(day) === 6) {
      calendarString += "\n";
    }
  });

  console.log(margin + calendarString);
}

main();
