const a16_0x4afdd0=a16_0x44d0;(function(_0x2f8b36,_0xbdd9fb){const _0x2f61b7=a16_0x44d0,_0x5e8e2d=_0x2f8b36();while(!![]){try{const _0x2999db=-parseInt(_0x2f61b7(0x11e))/0x1+parseInt(_0x2f61b7(0x126))/0x2*(parseInt(_0x2f61b7(0x121))/0x3)+parseInt(_0x2f61b7(0x129))/0x4*(parseInt(_0x2f61b7(0x12a))/0x5)+parseInt(_0x2f61b7(0x122))/0x6*(-parseInt(_0x2f61b7(0x124))/0x7)+-parseInt(_0x2f61b7(0x128))/0x8*(parseInt(_0x2f61b7(0x11b))/0x9)+-parseInt(_0x2f61b7(0x120))/0xa*(parseInt(_0x2f61b7(0x123))/0xb)+parseInt(_0x2f61b7(0x127))/0xc;if(_0x2999db===_0xbdd9fb)break;else _0x5e8e2d['push'](_0x5e8e2d['shift']());}catch(_0x2361b8){_0x5e8e2d['push'](_0x5e8e2d['shift']());}}}(a16_0x4de7,0x5a134));import a16_0x32ed92 from'mongoose';import a16_0x32ae6d from'../vendor/mongoosePlugin/softDelete.js';function a16_0x44d0(_0x428bc7,_0x3d1f29){const _0x4de797=a16_0x4de7();return a16_0x44d0=function(_0x44d049,_0x53e2ae){_0x44d049=_0x44d049-0x11b;let _0x1710c8=_0x4de797[_0x44d049];return _0x1710c8;},a16_0x44d0(_0x428bc7,_0x3d1f29);}function a16_0x4de7(){const _0x269e8=['949764eQNkaH','7249dFTNxb','21hWpmlr','plugin','1042gGdqJT','5355288drrqqK','104wFDksk','4DisDYU','394935eLuAvj','ObjectId','22293KXBKHV','Types','Schema','205823zZxyXq','model','2140QyTGNq','4017fCPklM'];a16_0x4de7=function(){return _0x269e8;};return a16_0x4de7();}import a16_0x18cd53 from'../vendor/mongoosePlugin/pagination.js';import a16_0x346bff from'./productModel.js';const discountSchema=new a16_0x32ed92[(a16_0x4afdd0(0x11d))]({'product':{'type':a16_0x32ed92[a16_0x4afdd0(0x11d)][a16_0x4afdd0(0x11c)][a16_0x4afdd0(0x12b)],'ref':a16_0x346bff,'required':!![]},'name':{'type':String,'required':!![]},'percentage':{'type':Number,'required':!![]},'startAt':{'type':Date,'required':!![]},'expiredAt':{'type':Date,'required':!![]}},{'timestamps':!![]});discountSchema[a16_0x4afdd0(0x125)](a16_0x32ae6d),discountSchema[a16_0x4afdd0(0x125)](a16_0x18cd53);const Discount=a16_0x32ed92[a16_0x4afdd0(0x11f)]('discount',discountSchema);export default Discount;