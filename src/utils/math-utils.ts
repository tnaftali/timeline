export abstract class MathUtils {

    public static getEarningsPercentage(newPrice: number, oldPrice: number) {
        return (newPrice / oldPrice) - 1;
    }

    public static getFinalBalance(initialBalance: number, earningsPercentage: number): number {
        return initialBalance + (initialBalance * earningsPercentage);
    }
}
