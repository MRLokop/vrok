///  
///  VROK PROJECT
///    Open source ngrok alternative,
///    for self-hosting
///
///    License: MIT
///    Repository: https://github.com/TheMRLokopOff/vrok
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