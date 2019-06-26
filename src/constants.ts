export const WORLD_TRADING_DATA_URL = "https://api.worldtradingdata.com/api/v1/";
export const HISTORY_ENDPOINT = "history";
// export const API_KEY = "oXDnyJnC7zjWvLQLKRI2eqEdF85ORZYqf5zAMAVpWw5Dz2HC7CLgvUzYPsnr";
export const API_KEY = "WfX0AM8MxmjHG5oVAphV7Nir0g7lHQcAOXJ9FjG6VZ3UyvMe0KSMld1x0J4R";
export const DATE_FORMAT = "YYYY-MM-DD";
export const FULL_DATE_FORMAT = "YYYY-MM-DD hh:mm:ss.SSS A";

export const MESSAGES = {
    GET_PORTFOLIO: "GET /portfolio",
    APP_RUNNING: "App running",
    ALLOCATION_ERROR: "Validation failed: allocation should sum 100%",
    MAPPING_REQUEST: "Mapping request",
    ERROR_GETTING_VALUES: "There was an error getting the updated values from WorldTradingData API, please try again",
    BUILDING_REQUESTS: "Building requests for WorldTradingData API",
    MAPPING_RESPONSE: "Mapping response from WorldTradingData",
    BUILDING_RESPONSE: "Building response",
};

export enum Sort {
    OLDEST = "oldest",
    NEWEST = "newest"
}
