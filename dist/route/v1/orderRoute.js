const a24_0x34d75c=a24_0x1f99;(function(_0x49fc47,_0x5e71e1){const _0x59d9a6=a24_0x1f99,_0x189f1d=_0x49fc47();while(!![]){try{const _0x224d05=-parseInt(_0x59d9a6(0x1ac))/0x1+parseInt(_0x59d9a6(0x1a2))/0x2*(-parseInt(_0x59d9a6(0x1ad))/0x3)+parseInt(_0x59d9a6(0x1ab))/0x4*(parseInt(_0x59d9a6(0x1a8))/0x5)+-parseInt(_0x59d9a6(0x1ae))/0x6+parseInt(_0x59d9a6(0x1a6))/0x7*(-parseInt(_0x59d9a6(0x19d))/0x8)+-parseInt(_0x59d9a6(0x1a5))/0x9+-parseInt(_0x59d9a6(0x198))/0xa*(-parseInt(_0x59d9a6(0x1a0))/0xb);if(_0x224d05===_0x5e71e1)break;else _0x189f1d['push'](_0x189f1d['shift']());}catch(_0x308be5){_0x189f1d['push'](_0x189f1d['shift']());}}}(a24_0x28e4,0x59359));function a24_0x28e4(){const _0x3e0205=['/detail/:order_id','/update/accept/:order_id','/create-report','24tDySfc','/update/done/:order_id','Router','5665528wOZJeh','post','889418WUqOkX','/total','get','1821924OyOGAo','892073UXayJC','/update/revision/:order_id','5XNzENF','/update/progress/:order_id','/update/preview/:order_id','1649712WIfeGm','684809PylZis','3LnjLWU','2357688iIJFtk','put','/list','/add','40WDKvth','/list/permonth'];a24_0x28e4=function(){return _0x3e0205;};return a24_0x28e4();}import a24_0x39a509 from'express';function a24_0x1f99(_0x3ebae3,_0x3b49ae){const _0x28e462=a24_0x28e4();return a24_0x1f99=function(_0x1f996f,_0x3e8566){_0x1f996f=_0x1f996f-0x195;let _0x513f55=_0x28e462[_0x1f996f];return _0x513f55;},a24_0x1f99(_0x3ebae3,_0x3b49ae);}import'express-async-errors';import{add,list,detail,updatePreview,listPerMonth,listPerYear,createReport,total,paymentCallback,updateRevision,updateAccept,updateDone,updateProgress}from'../../controller/orderController.js';import{isAdmin,protect}from'../../middleware/authMiddleware.js';const router=a24_0x39a509[a24_0x34d75c(0x19f)]();router[a24_0x34d75c(0x1a1)](a24_0x34d75c(0x197),protect,add),router[a24_0x34d75c(0x1a4)](a24_0x34d75c(0x196),protect,list),router['get'](a24_0x34d75c(0x199),isAdmin,listPerMonth),router['get']('/list/peryear',isAdmin,listPerYear),router[a24_0x34d75c(0x1a4)](a24_0x34d75c(0x1a3),total),router['get'](a24_0x34d75c(0x19a),protect,detail),router['post'](a24_0x34d75c(0x19c),isAdmin,createReport),router['put'](a24_0x34d75c(0x1a9),isAdmin,updateProgress),router['put'](a24_0x34d75c(0x1a7),protect,updateRevision),router[a24_0x34d75c(0x195)](a24_0x34d75c(0x1aa),isAdmin,updatePreview),router[a24_0x34d75c(0x195)](a24_0x34d75c(0x19b),protect,updateAccept),router[a24_0x34d75c(0x195)](a24_0x34d75c(0x19e),isAdmin,updateDone),router['post']('/paymentcallback',paymentCallback);export default router;