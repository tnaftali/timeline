import moment from "moment";

export abstract class DateUtils {
    public static getTenDaysPeriod(): { from: string, to: string } {
        return this.getPeriod(10, "days");
    }

    private static getPeriod(subtractCount: any, subtractValue: string): { from: string, to: string } {
        const pastDate = moment().subtract(subtractCount, subtractValue).format("YYYY-MM-DD");

        return { from: pastDate, to: moment().format("YYYY-MM-DD") };
    }
}
