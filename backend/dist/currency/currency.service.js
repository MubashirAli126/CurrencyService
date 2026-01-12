"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const freecurrencyapi_js_1 = __importDefault(require("@everapi/freecurrencyapi-js"));
let CurrencyService = class CurrencyService {
    configService;
    freecurrencyapi;
    constructor(configService) {
        this.configService = configService;
        const apiKey = this.configService.get('CURRENCY_API_KEY') || '';
        if (!apiKey) {
            throw new Error('CURRENCY_API_KEY is required in environment variables');
        }
        this.freecurrencyapi = new freecurrencyapi_js_1.default(apiKey);
    }
    async getCurrencies() {
        try {
            const response = await this.freecurrencyapi.currencies();
            return response;
        }
        catch (error) {
            throw new common_1.HttpException(`Failed to fetch currencies: ${error.message || 'Unknown error'}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getLatestRates(baseCurrency, currencies) {
        try {
            const params = {
                base_currency: baseCurrency,
            };
            if (currencies) {
                params.currencies = currencies;
            }
            const response = await this.freecurrencyapi.latest(params);
            return response;
        }
        catch (error) {
            throw new common_1.HttpException(`Failed to fetch latest rates: ${error.message || 'Unknown error'}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getHistoricalRates(baseCurrency, date, currencies) {
        try {
            const params = {
                base_currency: baseCurrency,
                date_from: date,
                date_to: date,
            };
            if (currencies) {
                params.currencies = currencies;
            }
            const response = await this.freecurrencyapi.historical(params);
            return response;
        }
        catch (error) {
            throw new common_1.HttpException(`Failed to fetch historical rates: ${error.message || 'Unknown error'}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.CurrencyService = CurrencyService;
exports.CurrencyService = CurrencyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], CurrencyService);
//# sourceMappingURL=currency.service.js.map