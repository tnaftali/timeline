import { MESSAGES } from "../constants";
import { ValidationError } from "../errors/validation-error";

export class PortfolioValidator {
    public validateRequest(params: any) {
        const allocation = params.allocation;
        const assets = allocation.split(";");
        const sum = assets.map((asset: string) => parseFloat(asset.split(":")[1])).reduce((a: number, c: number) => a + c);

        if (sum !== 100) {
            throw new ValidationError(400, MESSAGES.ALLOCATION_ERROR);
        }
    }
}
