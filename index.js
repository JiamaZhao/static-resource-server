#!/usr/bin/env node

const yargs = require('yargs');
const defaultConfig = require('./config/defaultConfig');
const Server = require('./app');

const argv = yargs
    .usage('静态服务器命令描述')
    .option('p', {
        alias: 'port',
        describe: '端口号',
        default: defaultConfig.port,
    })
    .option('h', {
        alias: 'hostname',
        describe: '主机名',
        host: defaultConfig.hostname,
    })
    .version()
    .alias('v', 'version')
    .help()
    .argv;

const server = new Server(argv);
server.start();