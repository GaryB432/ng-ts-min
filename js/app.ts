module Dto {
    export interface ITodo {
        text: string;
        done: boolean;
    }
    export interface IAccount {
        AccountName: string;
        AccountNumber: string;
        AccountType: string;
        IsMaster: boolean;
        IsTradable: boolean;
        Classification: string;
        BuyingPower: number;
        FmtBuyingPower: string;
        TotMktVal: number;
        TotCashVal: number;
        FmtTotCashVal: string;
        FundsAvailable: number;
        FmtFundsAvailable: string;
        TotCashValPct: number;
        FmtTotCashValPct: string;
        FmtTotMktVal: string;
        TotAccVal: number;
        FmtTotAccVal: string;
        TotAccValChgAmt: number;
        FmtTotAccValChgAmt: string;
        TotAccValChgPct: number;
        FmtTotAccValChgPct: string;
        ReinvestmentBalance: number;
        FmtReinvestmentBalance: string;
        Qty: number;
        FmtQty: string;
        LastPrice: number;
        FmtLastPrice: string;
        MktVal: number;
        FmtMktVal: string;
        EndOfMonthVal: number;
        FmtEndOfMonthVal: string;
        DollarChg: number;
        FmtDollarChg: string;
        PercentChg: number;
        FmtPercentChg: string;
        FmtGainLoss: string;
        FmtPercentageGainLoss: string;
        UporDown: string;
        IsSelectable: boolean;
    }
    export interface IPosition {
        Symbol: string;
        DisplayableSymbol: string;
        Desc: string;
        AccountType: string;
        AccCount: number;
        Qty: number;
        FmtQty: string;
        LastPrice: number;
        FmtLastPrice: string;
        MktVal: number;
        FmtMktVal: string;
        DollarChg: number;
        FmtDollarChg: string;
        PercentChg: number;
        FmtPercentChg: string;
        AccValPercent: any;
        FmtAccValPercent: string;
        GainLoss: number;
        FmtGainLoss: string;
        PercentageGainLoss: number;
        FmtPercentageGainLoss: string;
        AvgPrice: any;
        FmtAvgPrice: string;
        SecType: string;
        FmtSecType: string;
        AssetType: string;
        Cusip: string;
        MaturityDateIso: string;
        FmtMaturityDate: string;
        Accounts: IAccount[];
        IsSelectable: boolean;
    }
}

angular.module('app', ['ngRoute', 'app.services', 'app.controllers'])
    .config(['$routeProvider', ($routeProvider: ng.route.IRouteProvider) => {
        $routeProvider
            .when('/', { templateUrl: 'templates/main.html', controller: 'TodoCtrl' })
            .when('/about', { templateUrl: 'templates/about.html' })
            .otherwise({ redirectTo: '/' });
    }]);
