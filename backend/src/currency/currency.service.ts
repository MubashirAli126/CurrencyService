import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Freecurrencyapi from '@everapi/freecurrencyapi-js';

@Injectable()
export class CurrencyService {
  private readonly freecurrencyapi: Freecurrencyapi;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('CURRENCY_API_KEY') || '';
    
    if (!apiKey) {
      throw new Error('CURRENCY_API_KEY is required in environment variables');
    }
    
    this.freecurrencyapi = new Freecurrencyapi(apiKey);
  }

  /**
   * Get all available currencies
   */
  async getCurrencies() {
    try {
      const response = await this.freecurrencyapi.currencies();
      return response;
    } catch (error: any) {
      throw new HttpException(
        `Failed to fetch currencies: ${error.message || 'Unknown error'}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Get latest exchange rates
   * @param baseCurrency - Base currency code (e.g., 'USD')
   * @param currencies - Comma-separated list of target currencies (e.g., 'EUR,GBP')
   */
  async getLatestRates(baseCurrency: string, currencies?: string) {
    try {
      const params: any = {
        base_currency: baseCurrency,
      };
      
      if (currencies) {
        params.currencies = currencies;
      }

      const response = await this.freecurrencyapi.latest(params);
      return response;
    } catch (error: any) {
      throw new HttpException(
        `Failed to fetch latest rates: ${error.message || 'Unknown error'}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Get historical exchange rates
   * @param baseCurrency - Base currency code (e.g., 'USD')
   * @param currencies - Comma-separated list of target currencies (e.g., 'EUR,GBP')
   * @param date - Date (YYYY-MM-DD) for specific date
   */
  async getHistoricalRates(
    baseCurrency: string,
    date: string,
    currencies?: string,
  ) {
    try {
      const params: any = {
        base_currency: baseCurrency,
        date_from: date,
        date_to: date,
      };
      
      if (currencies) {
        params.currencies = currencies;
      }

      const response = await this.freecurrencyapi.historical(params);
      return response;
    } catch (error: any) {
      throw new HttpException(
        `Failed to fetch historical rates: ${error.message || 'Unknown error'}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
