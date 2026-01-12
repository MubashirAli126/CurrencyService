import { ConfigService } from '@nestjs/config';
export declare class CurrencyService {
    private configService;
    private readonly freecurrencyapi;
    constructor(configService: ConfigService);
    getCurrencies(): Promise<any>;
    getLatestRates(baseCurrency: string, currencies?: string): Promise<any>;
    getHistoricalRates(baseCurrency: string, date: string, currencies?: string): Promise<any>;
}
