import { CurrencyService } from './currency.service';
export declare class CurrencyController {
    private readonly currencyService;
    constructor(currencyService: CurrencyService);
    getCurrencies(): Promise<any>;
    getLatestRates(baseCurrency: string, currencies?: string): Promise<any>;
    getHistoricalRates(baseCurrency: string, date: string, currencies?: string): Promise<any>;
}
