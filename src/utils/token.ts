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
import * as fs from 'fs';

// TODO:

export function create(data: Object): String {
    return jwt.sign(data, 'secret', { expiresIn: '30d' });
}