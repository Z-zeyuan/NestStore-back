import { Request } from 'express';
//设置允许访问的域名
const allowlist = ['http://localhost:8080'];
const corsOptionsDelegate = (req: Request, callback) => {
    let corsOptions;
    console.log("req.header('Origin')",req.header('Origin'))
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        console.log("req.header('Origin')",req.header('Origin'))
        corsOptions = { origin: req.header('Origin'),credentials : true }; 
    } else {

        corsOptions = { origin: false }; // disable CORS for this request
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
}

export default corsOptionsDelegate