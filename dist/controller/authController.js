(function(_0x2e405b,_0x4bafc8){const _0xf4fe15=a2_0x8ba2,_0x1f13bc=_0x2e405b();while(!![]){try{const _0x26dca5=parseInt(_0xf4fe15(0x1f6))/0x1*(-parseInt(_0xf4fe15(0x201))/0x2)+parseInt(_0xf4fe15(0x20e))/0x3+-parseInt(_0xf4fe15(0x1ee))/0x4*(parseInt(_0xf4fe15(0x1e7))/0x5)+parseInt(_0xf4fe15(0x1e9))/0x6*(parseInt(_0xf4fe15(0x213))/0x7)+-parseInt(_0xf4fe15(0x1f3))/0x8*(parseInt(_0xf4fe15(0x1e3))/0x9)+parseInt(_0xf4fe15(0x1ff))/0xa+parseInt(_0xf4fe15(0x1e1))/0xb;if(_0x26dca5===_0x4bafc8)break;else _0x1f13bc['push'](_0x1f13bc['shift']());}catch(_0x75ac38){_0x1f13bc['push'](_0x1f13bc['shift']());}}}(a2_0x24f9,0x39eff));import a2_0x5f3961 from'../service/nodeMailler.js';import{successResponse}from'../vendor/response.js';function a2_0x8ba2(_0x20e51c,_0x59b46e){const _0x24f929=a2_0x24f9();return a2_0x8ba2=function(_0x8ba2c6,_0x9186c8){_0x8ba2c6=_0x8ba2c6-0x1e1;let _0x3fb591=_0x24f929[_0x8ba2c6];return _0x3fb591;},a2_0x8ba2(_0x20e51c,_0x59b46e);}import{decodeRefreshToken,decodeToken,generateRefreshToken,generateToken}from'../service/jwtToken.js';import a2_0x574600 from'../model/userModel.js';function a2_0x24f9(){const _0xfc0649=['remove','orFail','145088bTnGGL','confirmNewPassword','user\x20not\x20found','user\x20already\x20register','email\x20not\x20found','16SmQtCv','url','type','6836kiIDLx','create','register','login','refreshToken','password','otp.html','password\x20not\x20match','you\x20enter\x20an\x20invalid\x20otp\x203\x20times','2331300zYrcPA','invalid\x20token','52dDKNtj','otp\x20not\x20match!\x20please\x20try\x20again','forgetPassword.html','body','email','save','account\x20is\x20not\x20active\x20please\x20activate\x20your\x20account','json','account\x20not\x20found','email\x20sended','Activate\x20Your\x20Account','status','newPassword','1311972skXNXI','10m','_id','validator','token','301462oPyvnn','findOne','1764345JRZGiR','Forget\x20Your\x20Password','1636380ZywWLZ','username','reset\x20password','isActive','25ILthNy','Invalid\x20username\x20or\x20password','18dvQKSN','30s','otp'];a2_0x24f9=function(){return _0xfc0649;};return a2_0x24f9();}import a2_0x1bc890 from'../vendor/validator.js';import a2_0x2ff072 from'../vendor/customError.js';import a2_0x33455a from'../vendor/generateOTP.js';export const register=async(_0x327b87,_0x42786e)=>{const _0x567c9f=a2_0x8ba2;a2_0x1bc890(_0x327b87[_0x567c9f(0x204)],{'email':{'required':!![],'isEmail':!![],'type':String},'username':{'required':!![],'type':String},'password':{'required':!![],'type':String,'min':0x8,'max':0xc},'confirmPassword':{'required':!![],'type':String,'min':0x8,'max':0xc}});const _0x3053a0=a2_0x33455a();if(_0x327b87[_0x567c9f(0x204)][_0x567c9f(0x1fb)]!=_0x327b87[_0x567c9f(0x204)]['confirmPassword'])throw new a2_0x2ff072(_0x567c9f(0x1fd),0x1a6);const _0x352559=await a2_0x574600['findOne']({'email':_0x327b87[_0x567c9f(0x204)][_0x567c9f(0x205)]});if(_0x352559?.['isActive']==!![])throw new a2_0x2ff072(_0x567c9f(0x1f1),0x190);_0x352559?.[_0x567c9f(0x1e6)]==![]&&await _0x352559[_0x567c9f(0x1ec)]();const _0x527649=await a2_0x574600[_0x567c9f(0x1f7)]({'otp':_0x3053a0,'username':_0x327b87[_0x567c9f(0x204)][_0x567c9f(0x1e4)],'email':_0x327b87['body'][_0x567c9f(0x205)],'password':_0x327b87[_0x567c9f(0x204)]['password']}),_0x331074=generateToken({'id':_0x527649['id'],'type':_0x567c9f(0x1f8)},'10m'),_0x5ea1c5={'to':_0x527649[_0x567c9f(0x205)],'subject':_0x567c9f(0x20b),'html':{'otp':_0x3053a0}};a2_0x5f3961(_0x5ea1c5,_0x567c9f(0x1fc)),_0x42786e[_0x567c9f(0x208)](successResponse({'token':_0x331074})),setTimeout(async()=>{const _0x15bb87=_0x567c9f,_0x1b3d2c=await a2_0x574600[_0x15bb87(0x214)]({'_id':_0x527649['id']});_0x1b3d2c?.['isActive']==![]&&_0x1b3d2c[_0x15bb87(0x1ec)]();},0x927c0);};export const resendOtp=async(_0x5428cd,_0x10e410)=>{const _0x3d68eb=a2_0x8ba2,_0x16f740=a2_0x33455a(),_0x190023=decodeToken(_0x5428cd['params'][_0x3d68eb(0x212)]);if(_0x190023[_0x3d68eb(0x1f5)]!='register')throw new a2_0x2ff072(_0x3d68eb(0x200),0x1a6);const _0x3c4f14=await a2_0x574600[_0x3d68eb(0x214)]({'_id':_0x190023['id']})['orFail'](new a2_0x2ff072(_0x3d68eb(0x1f0),0x194));if(_0x3c4f14?.[_0x3d68eb(0x1e6)]==!![])throw new a2_0x2ff072(_0x3d68eb(0x1f1),0x190);_0x3c4f14[_0x3d68eb(0x1eb)]=_0x16f740,_0x3c4f14[_0x3d68eb(0x206)]();const _0x2cb5f8=generateToken({'id':_0x3c4f14['id'],'type':_0x3d68eb(0x1f8)},'10m'),_0x6ae791={'to':_0x3c4f14[_0x3d68eb(0x205)],'subject':_0x3d68eb(0x20b),'html':{'otp':_0x16f740}};a2_0x5f3961(_0x6ae791,_0x3d68eb(0x1fc)),_0x10e410[_0x3d68eb(0x208)](successResponse({'token':_0x2cb5f8})),setTimeout(async()=>{const _0x5983a6=_0x3d68eb,_0x201051=await a2_0x574600[_0x5983a6(0x214)]({'_id':_0x3c4f14['id']});_0x201051?.[_0x5983a6(0x1e6)]==![]&&_0x201051['remove']();},0x927c0);};export const updateStatus=async(_0x3875df,_0xe84345)=>{const _0x43be80=a2_0x8ba2;a2_0x1bc890(_0x3875df[_0x43be80(0x204)],{'otp':{'required':!![],'type':String}});const _0x2feb26=decodeToken(_0x3875df['params']['token']);if(_0x2feb26['type']!=_0x43be80(0x1f8))throw new a2_0x2ff072(_0x43be80(0x200),0x1a6);const _0x3888fb=await a2_0x574600[_0x43be80(0x214)]({'_id':_0x2feb26['id']})[_0x43be80(0x1ed)](new a2_0x2ff072(_0x43be80(0x209),0x194));if(_0x3888fb['isActive']==!![])throw new a2_0x2ff072('account\x20already\x20verifid',0x190);if(_0x3888fb[_0x43be80(0x1eb)]!=_0x3875df[_0x43be80(0x204)][_0x43be80(0x1eb)]){_0x3888fb['validator']++;if(_0x3888fb[_0x43be80(0x211)]>=0x3){_0x3888fb[_0x43be80(0x1ec)]();throw new a2_0x2ff072(_0x43be80(0x1fe),0x190);}await _0x3888fb[_0x43be80(0x206)]();throw new a2_0x2ff072(_0x43be80(0x202),0x190);}_0x3888fb[_0x43be80(0x1e6)]=!![],_0x3888fb[_0x43be80(0x1eb)]=undefined,_0x3888fb['validator']=undefined,await _0x3888fb[_0x43be80(0x206)]();const _0x5e6f19=generateToken({'id':_0x3888fb[_0x43be80(0x210)],'status':_0x3888fb[_0x43be80(0x20c)],'type':_0x43be80(0x1f9)},_0x43be80(0x1ea)),_0x243779=generateRefreshToken({'id':_0x3888fb[_0x43be80(0x210)],'status':_0x3888fb[_0x43be80(0x20c)],'type':_0x43be80(0x1f9)},'7d');_0xe84345[_0x43be80(0x208)](successResponse({'accessToken':_0x5e6f19,'refreshToken':_0x243779},'account\x20sucsses\x20to\x20verifid'));};export const login=async(_0x507a38,_0x229433)=>{const _0x378778=a2_0x8ba2;a2_0x1bc890(_0x507a38['body'],{'username':{'required':!![],'type':String},'password':{'required':!![],'type':String}});const _0xb702f3=await a2_0x574600[_0x378778(0x214)]({'username':_0x507a38['body'][_0x378778(0x1e4)]})['orFail'](new a2_0x2ff072('Invalid\x20username\x20or\x20password',0x1a6));if(_0xb702f3['isActive']==![])throw new a2_0x2ff072('account\x20is\x20not\x20active',0x191);if(_0xb702f3['matchPassword'](_0x507a38[_0x378778(0x204)][_0x378778(0x1fb)])==![])throw new a2_0x2ff072(_0x378778(0x1e8),0x1a6);const _0x210e9a=generateToken({'id':_0xb702f3[_0x378778(0x210)],'status':_0xb702f3[_0x378778(0x20c)],'type':_0x378778(0x1f9)},_0x378778(0x1ea)),_0x4b2653=generateRefreshToken({'id':_0xb702f3[_0x378778(0x210)],'status':_0xb702f3['status'],'type':_0x378778(0x1f9)},'7d');_0x229433[_0x378778(0x208)](successResponse({'accessToken':_0x210e9a,'refreshToken':_0x4b2653}));};export const forgetPassword=async(_0x11f648,_0x311be8)=>{const _0x11d6f5=a2_0x8ba2;a2_0x1bc890(_0x11f648[_0x11d6f5(0x204)],{'email':{'required':!![],'type':String,'isEmail':!![]},'url':{'required':!![],'type':String}});const _0x100b3a=await a2_0x574600[_0x11d6f5(0x214)]({'email':_0x11f648[_0x11d6f5(0x204)][_0x11d6f5(0x205)]})[_0x11d6f5(0x1ed)](new a2_0x2ff072(_0x11d6f5(0x1f2),0x194));if(_0x100b3a[_0x11d6f5(0x1e6)]==![])throw new a2_0x2ff072(_0x11d6f5(0x207),0x190);const _0x576b2b=generateToken({'id':_0x100b3a['id'],'type':'reset\x20password'},_0x11d6f5(0x20f)),_0x408f59={'to':_0x100b3a[_0x11d6f5(0x205)],'subject':_0x11d6f5(0x1e2),'html':{'url':_0x11f648[_0x11d6f5(0x204)][_0x11d6f5(0x1f4)],'token':_0x576b2b}};a2_0x5f3961(_0x408f59,_0x11d6f5(0x203)),await _0x100b3a['save'](),_0x311be8[_0x11d6f5(0x208)](successResponse({},_0x11d6f5(0x20a)));};export const resetPassword=async(_0x1fbfd7,_0x2f3a3e)=>{const _0x49b2e8=a2_0x8ba2;a2_0x1bc890(_0x1fbfd7[_0x49b2e8(0x204)],{'newPassword':{'required':!![],'type':String},'confirmNewPassword':{'required':!![],'type':String}});if(_0x1fbfd7[_0x49b2e8(0x204)][_0x49b2e8(0x20d)]!=_0x1fbfd7[_0x49b2e8(0x204)][_0x49b2e8(0x1ef)])throw new a2_0x2ff072(_0x49b2e8(0x1fd),0x1a6);const _0x139a64=decodeToken(_0x1fbfd7['params']['token']);if(_0x139a64['type']!=_0x49b2e8(0x1e5))throw new a2_0x2ff072(_0x49b2e8(0x200),0x191);const _0x4d5314=await a2_0x574600['findOne']({'_id':_0x139a64['id']})[_0x49b2e8(0x1ed)](new a2_0x2ff072(_0x49b2e8(0x209),0x194));if(_0x4d5314[_0x49b2e8(0x1e6)]==![])throw new a2_0x2ff072(_0x49b2e8(0x207),0x190);_0x4d5314['password']=_0x1fbfd7[_0x49b2e8(0x204)][_0x49b2e8(0x20d)],await _0x4d5314[_0x49b2e8(0x206)]();const _0x5611a2=generateToken({'id':_0x4d5314[_0x49b2e8(0x210)],'status':_0x4d5314['status'],'type':'login'},_0x49b2e8(0x1ea)),_0x24284b=generateRefreshToken({'id':_0x4d5314[_0x49b2e8(0x210)],'status':_0x4d5314[_0x49b2e8(0x20c)],'type':_0x49b2e8(0x1f9)},'7d');_0x2f3a3e[_0x49b2e8(0x208)](successResponse({'accessToken':_0x5611a2,'refreshToken':_0x24284b},'password\x20has\x20ben\x20updated'));};export const refreshToken=async(_0x4a7075,_0x5a6077)=>{const _0x9349e2=a2_0x8ba2;a2_0x1bc890(_0x4a7075[_0x9349e2(0x204)],{'refreshToken':{'required':!![],'type':String}});const _0x9cf008=decodeRefreshToken(_0x4a7075['body'][_0x9349e2(0x1fa)]);if(_0x9cf008[_0x9349e2(0x1f5)]!=_0x9349e2(0x1f9))throw new a2_0x2ff072(_0x9349e2(0x200),0x191);const _0x4cfe6f=await a2_0x574600[_0x9349e2(0x214)]({'_id':_0x9cf008['id']})['orFail'](new a2_0x2ff072(_0x9349e2(0x1f0),0x194)),_0x65822e=generateToken({'id':_0x4cfe6f['id'],'status':_0x4cfe6f[_0x9349e2(0x20c)],'type':_0x9349e2(0x1f9)},_0x9349e2(0x1ea)),_0x182b85=generateRefreshToken({'id':_0x4cfe6f['id'],'status':_0x4cfe6f[_0x9349e2(0x20c)],'type':_0x9349e2(0x1f9)},'7d');_0x5a6077['json'](successResponse({'accessToken':_0x65822e,'refreshToken':_0x182b85}));};