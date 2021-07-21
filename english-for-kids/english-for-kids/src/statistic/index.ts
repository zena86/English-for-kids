import {
  ASC,
  DESC,
  TABLE_ATTEMPTS,
  TABLE_CATEGORY,
  TABLE_ENGLISH,
  TABLE_PERCENT,
  TABLE_RIGHT,
  TABLE_RUSSIAN,
  TABLE_WRONG,
} from '../../constants';
import { categories } from '../common/categories';
import {
  clearStatistic,
  getStatistic,
  setStatistic,
} from '../common/statisticStore';
import {
  AttemptType,
  StateType,
  StatisticType,
  TableType,
} from '../common/types';
import { dispatchActionStatisticSort } from '../redux/actions';
import { store } from '../redux/store';
import './style.scss';

function sortTable(
  table: TableType[],
  sortColumn: string,
  sortDirection: string,
) {
  return table.sort((a, b) => {
    let left = a;
    let right = b;
    if (sortDirection === DESC) {
      const tmp = left;
      left = right;
      right = tmp;
    }
    if (sortColumn === TABLE_CATEGORY)
      return `${left.category}`.localeCompare(right.category);
    if (sortColumn === TABLE_RUSSIAN)
      return `${left.russian}`.localeCompare(right.russian);
    if (sortColumn === TABLE_ENGLISH)
      return `${left.english}`.localeCompare(right.english);
    if (sortColumn === TABLE_ATTEMPTS) return left.attempts - right.attempts;
    if (sortColumn === TABLE_RIGHT) return left.rightNum - right.rightNum;
    if (sortColumn === TABLE_WRONG) return left.wrong - right.wrong;
    if (sortColumn === TABLE_PERCENT) return left.percent - right.percent;
    return 0;
  });
}

function getRowHtml(row: TableType) {
  return `
    <tr>
      <td>${row.category}</td>
      <td>${row.russian}</td>
      <td>${row.english}</td>
      <td>${row.attempts}</td>
      <td>${row.rightNum}</td>
      <td>${row.wrong}</td>
      <td>${row.percent}</td>
    </tr>
  `;
}

function getRowsHtml(
  statistic: StatisticType[],
  sortColumn: string,
  sortDirection: string,
) {
  const table: TableType[] = [];
  categories().forEach((category) => {
    category.words.forEach((word) => {
      const statisticWord = statistic.find(
        (wordAttempt) => wordAttempt.engWord === word.english,
      );
      table.push({
        category: category.name,
        russian: word.russian,
        english: word.english,
        attempts: statisticWord ? statisticWord.attempts : 0,
        rightNum: statisticWord ? statisticWord.rightNum : 0,
        wrong: statisticWord
          ? statisticWord.attempts - statisticWord.rightNum
          : 0,
        percent: statisticWord
          ? Math.round((statisticWord.rightNum / statisticWord.attempts) * 100)
          : 0,
      });
    });
  });

  const sortedTable = sortTable(table, sortColumn, sortDirection);

  return sortedTable.reduce((acc, row) => `${getRowHtml(row)} ${acc}`, '');
}

function getStatisticHtml(
  statistic: StatisticType[],
  sortColumn: string,
  sortDirection: string,
) {
  const arrowHtml = sortDirection === ASC ? '&uarr;' : '&darr;';
  return `
  <div class="statistic__box">
    <div class="statistic__btns">
      <a href="#/difficult" id="repeat-btn" class="btn btn_left active-btn">Repeat</a>
      <button id="reset-btn" class="btn">Reset</button>
    </div>
    <table class="table">
      <thead>
          <tr>
            <th data-sort="category">Category&nbsp;${
              sortColumn === TABLE_CATEGORY ? arrowHtml : ''
            }</th>
            <th data-sort="russian">Word (rus)&nbsp;${
              sortColumn === TABLE_RUSSIAN ? arrowHtml : ''
            }</th>
            <th data-sort="english">Word (eng)&nbsp;${
              sortColumn === TABLE_ENGLISH ? arrowHtml : ''
            }</th>
            <th data-sort="attempts">Attempts&nbsp;${
              sortColumn === TABLE_ATTEMPTS ? arrowHtml : ''
            }</th>
            <th data-sort="right">Right&nbsp;${
              sortColumn === TABLE_RIGHT ? arrowHtml : ''
            }</th>
            <th data-sort="wrong">Wrong&nbsp;${
              sortColumn === TABLE_WRONG ? arrowHtml : ''
            }</th>
            <th data-sort="percent">%&nbsp;${
              sortColumn === TABLE_PERCENT ? arrowHtml : ''
            }</th>
          </tr>
      </thead>
      <tbody id="tableBody">
        ${getRowsHtml(statistic, sortColumn, sortDirection)}
      </tbody>
    </table>
  </div>
  `;
}

export default function statisticRender(statistic: StatisticType[]): void {
  const boardEl = document.querySelector('.board');
  const state = store().getState().statistic as StateType;
  boardEl.innerHTML = getStatisticHtml(
    statistic,
    state.sortColumn,
    state.sortDirection,
  );
}

function sortStatisticBind() {
  const columnElements = Array.from(document.getElementsByTagName('th'));
  columnElements.forEach((columnEl) => {
    columnEl.addEventListener('click', () => {
      const columnName = columnEl.dataset.sort;
      dispatchActionStatisticSort(columnName);
    });
  });
}

export function statisticBind(): void {
  sortStatisticBind();
  const resetBtn = document.getElementById('reset-btn');
  resetBtn.addEventListener('click', () => {
    clearStatistic();
    statisticRender(getStatistic());
    sortStatisticBind();
  });
}

export function updateStatistic(log: AttemptType[]): void {
  const lastStatistic = log[log.length - 1] as AttemptType;
  const statistic = getStatistic();
  const existRecord = statistic.find(
    (record) => record.engWord === lastStatistic.word,
  );
  if (!existRecord) {
    statistic.push({
      engWord: lastStatistic.word,
      attempts: 1,
      rightNum: +lastStatistic.right,
    });
  } else {
    existRecord.attempts += 1;
    existRecord.rightNum += +lastStatistic.right;
  }
  setStatistic(statistic);
}
