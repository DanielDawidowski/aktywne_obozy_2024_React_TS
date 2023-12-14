import { format, getISOWeek, isSameDay, subDays } from "date-fns";
import { pl } from "date-fns/locale";

export class TimeAgo {
  static transform(value: Date): string {
    const date = typeof value === "string" ? new Date(value) : value;
    return this.timeDifference(new Date(), new Date(date));
  }

  static chatMessageTransform(value: Date): string {
    const date: Date = typeof value === "string" ? new Date(value) : value;
    const yesterday = subDays(new Date(), 1);
    if (isSameDay(date, new Date())) {
      return "Dziś";
    } else if (isSameDay(date, yesterday)) {
      return "Wczoraj";
    } else if (getISOWeek(new Date()) === getISOWeek(date) || getISOWeek(new Date()) - getISOWeek(date) === 1) {
      return format(date, "EEEE", { locale: pl });
    } else {
      return format(date, "d MMMM yyyy", { locale: pl });
    }
  }

  static dayMonthYear(value: Date): string {
    const date: Date = typeof value === "string" ? new Date(value) : value;
    return value && format(date, "d MMMM yyyy", { locale: pl });
  }

  static timeFormat(value: Date | string): string {
    const date: Date = typeof value === "string" ? new Date(value) : value;
    return format(date, "HH:mm a", { locale: pl });
  }

  static timeDifference(current: Date, date: Date): string {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const elapsed = current.valueOf() - date.valueOf();

    if (format(current, "yyyy") === format(date, "yyyy")) {
      if (elapsed < msPerMinute) {
        return this.secondsAgo(elapsed);
      } else if (elapsed < msPerHour) {
        return this.minutesAgo(elapsed, msPerMinute);
      } else if (elapsed < msPerDay) {
        return this.hoursAgo(elapsed, msPerHour);
      } else if (elapsed < msPerMonth) {
        return this.monthsAgo(date, elapsed, msPerDay);
      } else {
        return format(date, "MMM d");
      }
    } else {
      return format(date, "MMM d, yyyy");
    }
  }

  static secondsAgo(elapsed: number): string {
    if (Math.round(elapsed / 1000) <= 1) {
      return "a second ago";
    } else {
      return `${Math.round(elapsed / 1000)} seconds ago`;
    }
  }

  static minutesAgo(elapsed: number, msPerMinute: number): string {
    if (Math.round(elapsed / msPerMinute) <= 1) {
      return "a minute ago";
    } else {
      return `${Math.round(elapsed / msPerMinute)} minutes ago`;
    }
  }

  static hoursAgo(elapsed: number, msPerHour: number): string {
    if (Math.round(elapsed / msPerHour) <= 1) {
      return "an hour ago";
    } else {
      return `${Math.round(elapsed / msPerHour)} hours ago`;
    }
  }

  static monthsAgo(date: Date, elapsed: number, msPerDay: number): string {
    if (Math.round(elapsed / msPerDay) <= 7) {
      return format(date, "eeee");
    } else {
      return format(date, "MMM d");
    }
  }
}
