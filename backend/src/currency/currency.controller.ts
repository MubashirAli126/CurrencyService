import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { CurrencyService } from './currency.service';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  /**
   * Get all available currencies
   * GET /currency/currencies
   */
  @Get('currencies')
  async getCurrencies() {
    try {
      return await this.currencyService.getCurrencies();
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch currencies',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Get latest exchange rates
   * GET /currency/latest?base=USD&currencies=EUR,GBP
   */
  @Get('latest')
  async getLatestRates(
    @Query('base') baseCurrency: string,
    @Query('currencies') currencies?: string,
  ) {
    if (!baseCurrency) {
      throw new HttpException(
        'Base currency is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      return await this.currencyService.getLatestRates(baseCurrency, currencies);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch latest rates',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Get historical exchange rates
   * GET /currency/historical?base=USD&date=2024-01-01&currencies=EUR,GBP
   */
  @Get('historical')
  async getHistoricalRates(
    @Query('base') baseCurrency: string,
    @Query('date') date: string,
    @Query('currencies') currencies?: string,
  ) {
    if (!baseCurrency) {
      throw new HttpException(
        'Base currency is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!date) {
      throw new HttpException(
        'Date is required (format: YYYY-MM-DD)',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      throw new HttpException(
        'Invalid date format. Use YYYY-MM-DD',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      return await this.currencyService.getHistoricalRates(
        baseCurrency,
        date,
        currencies,
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch historical rates',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
