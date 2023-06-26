import path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

export async function checkRegex(messageValidityCheck: string, messageContent: string) {
    
    const phoneRegexp = new RegExp(process.env.PHONE_CHECK);
    const phonecheck = phoneRegexp.test(messageValidityCheck)
    
    let flag:string;
    phonecheck ? flag = messageValidityCheck.slice(-2) : null;
    let reg: string;
    phonecheck ? reg = messageValidityCheck.slice(0,-2) : reg = messageValidityCheck;
    reg = reg.slice(1,-1);

    const regexpCheck = (reg).replaceAll(' ',process.env.BACKSLASH);
    let regexp: RegExp;
    flag ? regexp = new RegExp(regexpCheck, flag) : regexp = new RegExp(regexpCheck);

    const isValid = !messageValidityCheck || regexp.test(messageContent)
    return isValid
}