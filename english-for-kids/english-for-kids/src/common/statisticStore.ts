import { STATISTIC_KEY } from '../../constants';
import { StatisticType } from './types';

export function getStatistic(): StatisticType[] {
  const statisticStr = window.localStorage.getItem(STATISTIC_KEY);
  if (!statisticStr) return [];
  return JSON.parse(statisticStr);
}

export function setStatistic(statistic: StatisticType[]): void {
  const statisticValue = JSON.stringify(statistic);
  window.localStorage.setItem(STATISTIC_KEY, statisticValue);
}

export function clearStatistic(): void {
  const statisticValue = JSON.stringify([]);
  window.localStorage.setItem(STATISTIC_KEY, statisticValue);
}
