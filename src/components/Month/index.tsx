import React from 'react';
import { View } from 'react-native';
import { DayType, MonthProps } from '../../types';
import { getDayNames } from '../../utils/date';
import { getMonthDays, areEqual } from '../utils';
import WeekDays from '../WeekDays';
import Day from '../Day';

export default React.memo<MonthProps>((props: MonthProps) => {
  const {
    month,
    year,
    onPress,
    locale = 'en',
    dayNames,
    showWeekdays,
    disabledDays = {},
    disableRange = false,
    disableOffsetDays = false,
    firstDayMonday = true,
    startDate,
    endDate,
    minDate,
    maxDate,
    theme = {},
    renderDayContent,
  } = props;

  const DAY_NAMES =
    Array.isArray(dayNames) && dayNames.length === 7
      ? dayNames
      : getDayNames(locale, firstDayMonday);

  const days = getMonthDays(
    month,
    year,
    firstDayMonday,
    disableRange,
    disabledDays,
    disableOffsetDays,
    startDate,
    endDate,
    minDate,
    maxDate
  );

  const weeks = [];

  while (days.length) {
    weeks.push(days.splice(0, 7));
  }

  return (
    <>
      {showWeekdays && <WeekDays days={DAY_NAMES} theme={theme} />}
      {weeks.map((week: DayType[], index: number) => (
        <View key={String(index)} style={{ flexDirection: 'row' }}>
          {week.map((day: DayType) => (
            <Day
              key={day.id}
              item={day}
              onPress={onPress}
              theme={theme}
              renderDayContent={renderDayContent}
            />
          ))}
        </View>
      ))}
    </>
  );
}, areEqual);