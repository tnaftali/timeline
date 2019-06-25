import moment from "moment";

export abstract class DateUtils {
    public static getTenDaysPeriod(): { from: string, to: string } {
        return this.getPeriod(10, "days");
    }

    public static sumDays(from: Date): { from: string, to: string } {
        from.setUTCHours(12, 0, 0, 0);
        const parsedFrom = moment(from).format("YYYY-MM-DD");
        const to = moment(from).add(10, "days").format("YYYY-MM-DD");

        return { from: parsedFrom, to };
    }

    private static getPeriod(subtractCount: any, subtractValue: string): { from: string, to: string } {
        const pastDate = moment().subtract(subtractCount, subtractValue).format("YYYY-MM-DD");

        return { from: pastDate, to: moment().format("YYYY-MM-DD") };
    }
}
