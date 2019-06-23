import moment from "moment";

export abstract class DateUtils {
    public static getOneWeekPeriod(): Date[] {
        return this.getPeriod(1, "weeks");
    }

    public static getOneMonthPeriod(): Date[] {
        return this.getPeriod(1, "months");
    }

    public static getOneYearPeriod(): Date[] {
        return this.getPeriod(1, "years");
    }

    private static getPeriod(subtractCount: any, subtractValue: string): Date[] {
        const pastDate = moment().subtract(subtractCount, subtractValue).toDate();
        pastDate.setUTCHours(0, 0, 0, 0);

        return [pastDate, moment().toDate()];
    }
}
