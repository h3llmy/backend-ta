const a29_0x2d1941=a29_0x4f7b;function a29_0x4f7b(_0x56b3c4,_0x55069a){const _0x15cf24=a29_0x15cf();return a29_0x4f7b=function(_0x4f7bda,_0x422b5f){_0x4f7bda=_0x4f7bda-0x98;let _0xed90a4=_0x15cf24[_0x4f7bda];return _0xed90a4;},a29_0x4f7b(_0x56b3c4,_0x55069a);}(function(_0x3f7ab8,_0x5e82f4){const _0x232c39=a29_0x4f7b,_0x19d30b=_0x3f7ab8();while(!![]){try{const _0x57eb0b=-parseInt(_0x232c39(0xac))/0x1*(-parseInt(_0x232c39(0xa5))/0x2)+parseInt(_0x232c39(0xae))/0x3+parseInt(_0x232c39(0xa1))/0x4*(parseInt(_0x232c39(0x99))/0x5)+-parseInt(_0x232c39(0xa4))/0x6+parseInt(_0x232c39(0x9b))/0x7*(-parseInt(_0x232c39(0x9a))/0x8)+parseInt(_0x232c39(0xa7))/0x9*(parseInt(_0x232c39(0xa6))/0xa)+-parseInt(_0x232c39(0x9c))/0xb;if(_0x57eb0b===_0x5e82f4)break;else _0x19d30b['push'](_0x19d30b['shift']());}catch(_0x19c637){_0x19d30b['push'](_0x19d30b['shift']());}}}(a29_0x15cf,0x66591));import a29_0x468a4d from'nodemailer';import a29_0x41c714 from'dotenv';import a29_0x3265f6 from'fs';a29_0x41c714[a29_0x2d1941(0xaf)]();function a29_0x15cf(){const _0x20186b=['MAILLER_PORT','createTransport','231388RpwBTp','email\x20not\x20sended','object','837456wbkAiM','2mwVANA','3203190vTDQpl','9POzYPI','readFile','MAILLER_HOST','MAILLER_USERNAME','promises','332289BTNkqz','env','1573587oUYRMQ','config','./vendor/emailTemplate/','forEach','45AxzKYF','4351472WVYHsF','7hbYBsX','6545363ZiJLXb','from','html'];a29_0x15cf=function(){return _0x20186b;};return a29_0x15cf();}export default async(_0xa30689,_0x5338d8)=>{const _0x5ddb56=a29_0x2d1941;try{const _0xd7f8cd=a29_0x468a4d[_0x5ddb56(0xa0)]({'host':process['env'][_0x5ddb56(0xa9)],'service':process['env']['MAILLER_SERVICE'],'port':process[_0x5ddb56(0xad)][_0x5ddb56(0x9f)],'secure':!![],'requireTLS':!![],'auth':{'user':process[_0x5ddb56(0xad)][_0x5ddb56(0xaa)],'pass':process[_0x5ddb56(0xad)]['MAILLER_PASSWORD']}});_0xa30689[_0x5ddb56(0x9d)]=process[_0x5ddb56(0xad)]['MAILLER_FROM_ADDRES'];if(_0x5338d8&&typeof _0xa30689[_0x5ddb56(0x9e)]==_0x5ddb56(0xa3)){let _0x3f65d5=await a29_0x3265f6[_0x5ddb56(0xab)][_0x5ddb56(0xa8)](_0x5ddb56(0xb0)+_0x5338d8,'utf-8');Object['entries'](_0xa30689[_0x5ddb56(0x9e)])[_0x5ddb56(0x98)](([_0x435c4c,_0x26ec34])=>{let _0x2abc4d=new RegExp('{{'+_0x435c4c+'}}','g');_0x3f65d5=_0x3f65d5['replace'](_0x2abc4d,_0x26ec34);}),_0xa30689[_0x5ddb56(0x9e)]=_0x3f65d5;}const _0x9270c7=await _0xd7f8cd['sendMail'](_0xa30689);if(!_0x9270c7)return new Error(_0x5ddb56(0xa2));return _0x9270c7;}catch(_0x11e023){throw new Error(_0x11e023);}};