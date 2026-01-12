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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyController = void 0;
const common_1 = require("@nestjs/common");
const currency_service_1 = require("./currency.service");
let CurrencyController = class CurrencyController {
    currencyService;
    constructor(currencyService) {
        this.currencyService = currencyService;
    }
    async getCurrencies() {
        try {
            return await this.currencyService.getCurrencies();
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to fetch currencies', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getLatestRates(baseCurrency, currencies) {
        if (!baseCurrency) {
            throw new common_1.HttpException('Base currency is required', common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            return await this.currencyService.getLatestRates(baseCurrency, currencies);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to fetch latest rates', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getHistoricalRates(baseCurrency, date, currencies) {
        if (!baseCurrency) {
            throw new common_1.HttpException('Base currency is required', common_1.HttpStatus.BAD_REQUEST);
        }
        if (!date) {
            throw new common_1.HttpException('Date is required (format: YYYY-MM-DD)', common_1.HttpStatus.BAD_REQUEST);
        }
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(date)) {
            throw new common_1.HttpException('Invalid date format. Use YYYY-MM-DD', common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            return await this.currencyService.getHistoricalRates(baseCurrency, date, currencies);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Failed to fetch historical rates', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.CurrencyController = CurrencyController;
__decorate([
    (0, common_1.Get)('currencies'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CurrencyController.prototype, "getCurrencies", null);
__decorate([
    (0, common_1.Get)('latest'),
    __param(0, (0, common_1.Query)('base')),
    __param(1, (0, common_1.Query)('currencies')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CurrencyController.prototype, "getLatestRates", null);
__decorate([
    (0, common_1.Get)('historical'),
    __param(0, (0, common_1.Query)('base')),
    __param(1, (0, common_1.Query)('date')),
    __param(2, (0, common_1.Query)('currencies')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], CurrencyController.prototype, "getHistoricalRates", null);
exports.CurrencyController = CurrencyController = __decorate([
    (0, common_1.Controller)('currency'),
    __metadata("design:paramtypes", [currency_service_1.CurrencyService])
], CurrencyController);
//# sourceMappingURL=currency.controller.js.map