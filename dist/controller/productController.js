(function(_0x191179,_0x221189){const _0x2f7990=a6_0x38a1,_0x187010=_0x191179();while(!![]){try{const _0x4da2c4=parseInt(_0x2f7990(0x9a))/0x1+-parseInt(_0x2f7990(0xa8))/0x2+-parseInt(_0x2f7990(0x9c))/0x3+-parseInt(_0x2f7990(0xa5))/0x4*(parseInt(_0x2f7990(0xb6))/0x5)+-parseInt(_0x2f7990(0x9d))/0x6*(parseInt(_0x2f7990(0xa6))/0x7)+-parseInt(_0x2f7990(0xb9))/0x8*(-parseInt(_0x2f7990(0xb0))/0x9)+parseInt(_0x2f7990(0xaf))/0xa;if(_0x4da2c4===_0x221189)break;else _0x187010['push'](_0x187010['shift']());}catch(_0x4131d0){_0x187010['push'](_0x187010['shift']());}}}(a6_0x2fd8,0xe93e1));function a6_0x38a1(_0x283306,_0x544933){const _0x2fd810=a6_0x2fd8();return a6_0x38a1=function(_0x38a104,_0xc44c40){_0x38a104=_0x38a104-0x94;let _0x175c04=_0x2fd810[_0x38a104];return _0x175c04;},a6_0x38a1(_0x283306,_0x544933);}import{successResponse}from'../vendor/response.js';import a6_0x40c4a9 from'../model/productModel.js';import a6_0x537604 from'../vendor/validator.js';import a6_0x2a967b from'../vendor/customError.js';import{saveFile,uploadFile}from'../vendor/uploadFile.js';import{deleteFile}from'../vendor/uploadFile.js';export const add=async(_0x31ba7f,_0xad0100)=>{const _0xaf8c1=a6_0x38a1;a6_0x537604(_0x31ba7f[_0xaf8c1(0xb5)],{'name':{'required':!![],'type':String},'price':{'required':!![],'type':Number,'min':0x0},'category':{'required':!![],'type':String},'maxRevision':{'required':!![],'type':Number,'min':0x0},'descryption':{'type':String},'dayWork':{'required':!![],'type':Number,'min':0x0}});let _0xae663d=[];_0x31ba7f[_0xaf8c1(0xaa)]['productFile']&&(Array['isArray'](_0x31ba7f['files'][_0xaf8c1(0xb8)])?_0x31ba7f[_0xaf8c1(0xaa)][_0xaf8c1(0xb8)][_0xaf8c1(0x9b)](_0x16ecff=>{_0xae663d['push'](uploadFile(_0x16ecff));}):_0xae663d[_0xaf8c1(0x9e)](uploadFile(_0x31ba7f['files']['productFile'])));const _0x2ebf1f=await a6_0x40c4a9[_0xaf8c1(0xbb)]({'name':_0x31ba7f[_0xaf8c1(0xb5)]['name'],'price':_0x31ba7f[_0xaf8c1(0xb5)]['price'],'productUrl':_0xae663d[_0xaf8c1(0xa7)](_0x18bf32=>_0x18bf32[_0xaf8c1(0xa0)]),'category':_0x31ba7f[_0xaf8c1(0xb5)][_0xaf8c1(0xac)],'maxRevision':_0x31ba7f[_0xaf8c1(0xb5)][_0xaf8c1(0xb7)],'descryption':_0x31ba7f[_0xaf8c1(0xb5)][_0xaf8c1(0xb4)],'dayWork':_0x31ba7f['body'][_0xaf8c1(0xa1)]});for(const _0x320455 of _0xae663d){saveFile(_0x320455);}_0xad0100[_0xaf8c1(0x96)](successResponse(_0x2ebf1f));};function a6_0x2fd8(){const _0x537b3a=['136pyAstT','paginate','create','query','params','productUrl','json','isArray','product_id','auth','986205boxXZk','forEach','1725942INTCdr','1579560cOIuDV','push','Product\x20deleted','filePath','dayWork','findOne','filter','price','68096wgGmhT','35AAPWFv','map','916432ZzMwRj','name','files','Product\x20not\x20found','category','desc','populate','29445390TggsCi','615159OEcrhs','save','orFail','countDocuments','descryption','body','525qgASKQ','maxRevision','productFile'];a6_0x2fd8=function(){return _0x537b3a;};return a6_0x2fd8();}export const list=async(_0x45860d,_0x13a5ab)=>{const _0xf62550=a6_0x38a1;_0x45860d[_0xf62550(0xbc)]['search']&&(_0x45860d[_0xf62550(0x99)]['filter']={..._0x45860d[_0xf62550(0x99)][_0xf62550(0xa3)],'name':{'$regex':_0x45860d['query']['search'],'$options':'i'}});_0x45860d[_0xf62550(0xbc)][_0xf62550(0xac)]&&(_0x45860d[_0xf62550(0x99)][_0xf62550(0xa3)]={..._0x45860d[_0xf62550(0x99)]['filter'],'category':_0x45860d[_0xf62550(0xbc)]['category']});const _0x6552ae=await a6_0x40c4a9[_0xf62550(0xba)](_0x45860d[_0xf62550(0x99)][_0xf62550(0xa3)],_0x45860d['query'],{'populate':_0xf62550(0xac),'sort':{'createdAt':_0xf62550(0xad)}});_0x13a5ab['json'](successResponse(_0x6552ae));};export const total=async(_0x57806d,_0x1f63a0)=>{const _0x33048b=a6_0x38a1,_0x1b0c06=await a6_0x40c4a9[_0x33048b(0xb3)]();_0x1f63a0[_0x33048b(0x96)](successResponse(_0x1b0c06));};export const detail=async(_0x1aef91,_0x43e276)=>{const _0x195887=a6_0x38a1,_0x1b90d5=await a6_0x40c4a9[_0x195887(0xa2)]({'_id':_0x1aef91[_0x195887(0x94)][_0x195887(0x98)]})[_0x195887(0xae)](_0x195887(0xac))[_0x195887(0xb2)](new a6_0x2a967b(_0x195887(0xab),0x194));_0x43e276[_0x195887(0x96)](successResponse(_0x1b90d5));};export const update=async(_0x6fffda,_0x3c54e3)=>{const _0x120db4=a6_0x38a1;a6_0x537604(_0x6fffda[_0x120db4(0xb5)],{'name':{'required':!![],'type':String},'price':{'required':!![],'type':Number,'min':0x0},'category':{'required':!![],'type':String},'maxRevision':{'required':!![],'type':Number,'min':0x0},'descryption':{'type':String},'dayWork':{'required':!![],'type':Number,'min':0x0}});const _0x130bda=await a6_0x40c4a9[_0x120db4(0xa2)]({'_id':_0x6fffda[_0x120db4(0x94)][_0x120db4(0x98)]})[_0x120db4(0xb2)](new a6_0x2a967b(_0x120db4(0xab),0x194));let _0x36ef04=[];_0x6fffda[_0x120db4(0xaa)]['productFile']&&(Array[_0x120db4(0x97)](_0x6fffda[_0x120db4(0xaa)][_0x120db4(0xb8)])?_0x6fffda['files'][_0x120db4(0xb8)][_0x120db4(0x9b)](_0xaf0df7=>{const _0x5a04bc=_0x120db4;_0x36ef04[_0x5a04bc(0x9e)](uploadFile(_0xaf0df7));}):_0x36ef04[_0x120db4(0x9e)](uploadFile(_0x6fffda[_0x120db4(0xaa)][_0x120db4(0xb8)])));_0x130bda[_0x120db4(0x95)]=_0x36ef04[_0x120db4(0xa7)](_0x7ffc48=>_0x7ffc48[_0x120db4(0xa0)]),_0x130bda['productUrl'][_0x120db4(0x9b)](_0x2e5cac=>{deleteFile(_0x2e5cac);}),_0x130bda[_0x120db4(0xa9)]=_0x6fffda[_0x120db4(0xb5)][_0x120db4(0xa9)],_0x130bda[_0x120db4(0xa4)]=_0x6fffda[_0x120db4(0xb5)]['price'],_0x130bda[_0x120db4(0xac)]=_0x6fffda[_0x120db4(0xb5)]['category'],_0x130bda['maxRevision']=_0x6fffda[_0x120db4(0xb5)][_0x120db4(0xb7)],_0x130bda[_0x120db4(0xb4)]=_0x6fffda['body'][_0x120db4(0xb4)],_0x130bda[_0x120db4(0xa1)]=_0x6fffda[_0x120db4(0xb5)][_0x120db4(0xa1)];const _0x44cb04=await _0x130bda[_0x120db4(0xb1)]();_0x6fffda[_0x120db4(0xaa)]['productFile']&&_0x36ef04[_0x120db4(0x9b)](_0x2d841a=>{saveFile(_0x2d841a);}),_0x3c54e3[_0x120db4(0x96)](successResponse(_0x44cb04,'Product\x20updated'));};export const remove=async(_0x3f5fdd,_0x3ad57e)=>{const _0x46cd5c=a6_0x38a1,_0x446109=await a6_0x40c4a9['softDelete']({'_id':_0x3f5fdd['params']['product_id']});_0x3ad57e['json'](successResponse(_0x446109,_0x46cd5c(0x9f)));};