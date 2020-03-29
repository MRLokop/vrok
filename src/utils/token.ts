///  
///  VROK PROJECT
///    Open source ngrok alternative,
///    for self-hosting
///  
///    >> File: src/utils/token.ts
///  
///    License: MIT
///    Repository: https://github.com/TheMRLokopOff/vrok
///  
///    >> Created: 26.03.2020, 07:52:46
///  
///    (c) 2020 «Venity» and «MFSoftware»
///  


import * as jwt from 'jsonwebtoken';
import { $secrets } from '../launcher';

export function create(data: Object): String {
    return jwt.sign(data, $secrets.jwt, { expiresIn: '30d' });
}

export function verify(token: String): Object {
    return jwt.verify(token, $secrets.jwt);
}