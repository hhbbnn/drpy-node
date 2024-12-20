import {getOriginalJs} from '../libs/drpyS.js';
import {readFileSync, existsSync} from 'fs';
import path from "path";

// 仅仅支持json post 如: {"code":"xxx"}
export default (fastify, options, done) => {
    // 注册 POST 路由
    fastify.post('/decoder', async (request, reply) => {
        const {auth_code, code} = request.body;

        if (!code || !auth_code) {
            return reply.status(400).send({error: 'Missing required parameters: code and auth_code'});
        }
        const authFilePath = path.join(options.rootDir, '.nomedia');

        // 检查文件是否存在
        if (!existsSync(authFilePath)) {
            return reply.status(404).send({error: '.nomedia file not found'});
        }
        const local_auto_code = readFileSync(authFilePath, 'utf-8').trim();
        console.log('local_auto_code:',local_auto_code);
        console.log('auth_code:',auth_code);
        if (auth_code !== local_auto_code) {
            return reply.status(200).send({error: 'your auth_code is not correct'});
        }

        try {
            let result = getOriginalJs(code);
            reply.send({success: true, result});
        } catch (error) {
            reply.status(500).send({error: error.message});
        }
    });
    done();
};
