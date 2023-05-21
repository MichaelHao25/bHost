

websocket Api：https://www.okx.com/docs-v5/zh/#websocket-api-connect
他们自己使用的接口：wss://wspri.okx.com:8443/ws/v5/ipublic
文档接口：wss://ws.okx.com:8443/ws/v5/public
订阅发送：{"op": "subscribe","args":[{"channel":"trades"}]}
取消订阅发送：{"op": "unsubscribe","args":[{"channel":"trades","instId":"BTC-USDT"}]}



 卖
 {
 "arg": {
 "channel": "trades",
 "instId": "BTC-USDT"
 },
 "data": [
 {
 "instId": "BTC-USDT",
 "tradeId": "910158784",
 "px": "1803.1",
 "sz": "18",
 "side": "sell",
 "ts": "1684061419260"
 }
 ]
 }

 t.data?.[0].side==='sell'

 买
 {
 "arg": {
 "channel": "trades",
 "instId": "BTC-USDT"
 },
 "data": [
 {
 "instId": "BTC-USDT",
 "tradeId": "910159091",
 "px": "1802.51",
 "sz": "1",
 "side": "buy",
 "ts": "1684061682573"
 }
 ]
 }
