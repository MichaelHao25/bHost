const r = {
  pub: {
    instruments: 'instruments',
    tickers: 'tickers',
    indexTickers: 'index-tickers',
    books: 'optimized-books',
    booksGroup: 'books-grouped',
    trades: 'trades',
    candle5m: 'candle5m',
    candle1H: 'candle1H',
    candle4H: 'candle4H',
    candle12H: 'candle12H',
    candle1D: 'candle1D',
    candle1W: 'candle1W',
    candle1M: 'candle1M',
    candle3M: 'candle3M',
    candle6M: 'candle6M',
    indexCandle5m: 'index-candle5m',
    indexCandle1H: 'index-candle1H',
    indexCandle4H: 'index-candle4H',
    indexCandle12H: 'index-candle12H',
    indexCandle1D: 'index-candle1D',
    indexCandle1W: 'index-candle1W',
    indexCandle1M: 'index-candle1M',
    indexCandle3M: 'index-candle3M',
    indexCandle6M: 'index-candle6M',
    markPriceCandle5m: 'mark-price-candle5m',
    markPriceCandle1H: 'mark-price-candle1H',
    markPriceCandle4H: 'mark-price-candle4H',
    markPriceCandle12H: 'mark-price-candle12H',
    markPriceCandle1D: 'mark-price-candle1D',
    markPriceCandle1W: 'mark-price-candle1W',
    markPriceCandle1M: 'mark-price-candle1M',
    markPriceCandle3M: 'mark-price-candle3M',
    markPriceCandle6M: 'mark-price-candle6M',
    markPrice: 'mark-price',
    instFamilyMarkPrice: 'instrument-family-mark-price',
    fitter: 'fitter',
    fundingRate: 'funding-rate',
    optSummary: 'opt-summary',
    optSummaryInstId: 'opt-summary-instId',
    estimatedPrice: 'estimated-price',
    openInterest: 'open-interest',
    instFamilyOpenInterest: 'instrument-family-open-interest',
    priceRange: 'price-limit',
    candle: 'candle',
    indexCandle: 'index-candle',
    markPriceCandle: 'mark-price-candle',
    status: 'itn-status'
  },
  pri: {
    account: 'account',
    position: 'positions',
    orders: 'orders',
    ordersAlgo: 'orders-algo',
    opOrder: 'order',
    privateSummary: 'private-summary',
    virtualPriSummary: 'virtual-account-private-summary',
    algoTradeOrder: 'algo-trade-order',
    algoContractTradeOrder: 'grid-sub-orders',
    algoGrid: 'algo-grid',
    algoTradePosition: 'algo-trade-position',
    algoGridPosition: 'grid-positions',
    algoDcaPosition: 'dca-positions',
    algoSpotGrid: 'grid-orders-spot-priv',
    algoContractGrid: 'grid-orders-contract-priv',
    algoMoonGrid: 'grid-orders-moon',
    algoSpotDca: 'algo-spot-dca',
    algoContractDca: 'algo-contract-dca',
    algoArbitrage: 'algo-arbitrage',
    algoAdvance: 'algo-advance',
    algoRecurring: 'algo-recurring',
    algoSmartPortfolio: 'algo-smart-portfolio',
    algoPrivateSummary: 'algo-private-summary',
    accountGreeks: 'account-greeks'
  },
  inPri: {
    algoInfiniteGrid: 'grid-orders-infinite',
    lvfOrderCount: 'lvf-positions-count',
    lvfOrders: 'lvf-positions'
  },
  inPub: {
    notableMarketChanges: 'notable-market-changes',
    slowTickers: 'tickers-3s',
    slowMarkTickers: 'mp-tickers-3s',
    usdTickers: 'cup-tickers-3s',
    btTickers: 'bt-tickers',
    instFamilyTrades: 'instrument-family-trades',
    instFamilyVolume24h: 'instrument-family-volume24h',
    inverseFundingRate: 'inverse-funding-rate-arbitrage',
    linearFundingRate: 'linear-funding-rate-arbitrage',
    linearMarginFundingRate: 'linear-margined-funding-rate-arbitrage',
    linearFuturesSpot: 'linear-futures-spot-arbitrage',
    linearMarginFuturesSpot: 'linear-margined-futures-spot-arbitrage',
    inverseFuturesSpot: 'inverse-futures-spot-arbitrage',
    linearFuturesFutures: 'linear-futures-futures-arbitrage',
    linearMarginFuturesFutures: 'linear-margined-futures-futures-arbitrage',
    inverseFuturesFutures: 'inverse-futures-futures-arbitrage'
  }
}

// https://static.okx.com/cdn/assets/okfe/socket/2.0.1/main.js
// 30026 === Number(t.errorCode)

//
// 卖
// {
// "arg": {
// "channel": "trades",
// "instId": "ETH-USDT-SWAP"
// },
// "data": [
// {
// "instId": "ETH-USDT-SWAP",
// "tradeId": "910158784",
// "px": "1803.1",
// "sz": "18",
// "side": "sell",
// "ts": "1684061419260"
// }
// ]
// }
//
// t.data?.[0].side==='sell'
//
// 买
// {
// "arg": {
// "channel": "trades",
// "instId": "ETH-USDT-SWAP"
// },
// "data": [
// {
// "instId": "ETH-USDT-SWAP",
// "tradeId": "910159091",
// "px": "1802.51",
// "sz": "1",
// "side": "buy",
// "ts": "1684061682573"
// }
// ]
// }

const a = {
  op: 'subscribe',
  args: [
    { channel: 'tickers', instId: 'ETH-USDT-SWAP' },
    {
      channel: 'mark-price',
      instId: 'ETH-USDT-SWAP'
    },
    { channel: 'index-tickers', instId: 'ETH-USDT' },
    {
      channel: 'funding-rate',
      instId: 'ETH-USDT-SWAP'
    },
    { channel: 'estimated-price', instType: 'SWAP', instFamily: 'ETH-USDT' },
    {
      channel: 'open-interest',
      instId: 'ETH-USDT-SWAP'
    }
  ]
}

const a = {
  op: 'subscribe',
  args: [{ channel: 'trades', instId: 'ETH-USDT' }]
}
/**
 * 获取ETH-USDT价格
 */
// {"op":"subscribe","args":[{"channel":"trades","instId":"ETH-USDT"}]}
// wss://wspri.okx.com:8443/ws/v5/ipublic
// wss://ws.okx.com:8443/ws/v5/public
