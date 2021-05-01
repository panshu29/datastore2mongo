#!/usr/bin/env node

/*	
      Copyright	(c)	2021 All Rights Reserved. 
      @author Anshubana Panda	
      Node module: @loopback/cli
      This file is licensed under the Apache License Version 2.0
*/
import { Command } from 'commander';
import * as api from './migration';
var colors = require('colors');

const program = new Command();
program.version('0.0.1', '-v, --vers', 'current version')
      .description(colors.brightGreen('  This CLI tool migrates the data from GCP Datastore to Mongodb automatically or \n  it prepares a migration script to be executed manually based on the choice given to the tool. \n  This project is in beta phase and please email me any bugs.'))
      .on('--help', function () {
            console.log('Examples:');
            console.log(colors.yellow(' To auto migrate single kind: ')+colors.brightYellow('$ npm run d2m -- -d <namespace> -i <projectId> -h <host> -p <port> -a y'));
            console.log(colors.yellow(' To auto migrate all kinds of a namespace: ')+colors.brightYellow('$ npm run d2m -- -d <namespace> -i <projectId> -c <kind> -h <host> -p <port> -a y '));
            console.log(colors.yellow(' To auto migrate all kinds of all namespaces: ')+colors.brightYellow('npm run d2m -- -d all -i <projectId> -h <host> -p <port> -a y'));
            console.log('');
      })
      .option('-d, --db <db>', 'namespace (choices: "all", "<namespace name>") ')
      .option('-c, --collection <collection>', 'kind (choices: "all", "<kind name>")')
      .option('-h, --host <host>', 'host name')
      .option('-p, --port <port>', 'port number')
      .option('-a, --auto <auto>', '[y/n] migration strategy')
      .option('-i, --projectid <projectid>', 'google cloud projectId')
      .action((options) => {
            if (options.db && options.collection && options.host  && options.port  && options.auto  && options.projectid ) {
                  api.exportACollection(options.db, options.collection, options.host, options.port, options.auto, options.projectid);
            } else if (options.db  && options.host  && options.port  && options.auto  && options.collection === 'all' && options.projectid ) {
                  api.exportAllDataOfaNamespace(options.db, options.host, options.port, options.auto, options.projectid);
            } else if (options.host  && options.port  && options.auto && options.db === 'all' && options.projectid) {
                  api.exportAllDataOfAllNamespaces(options.host, options.port, options.auto, options.projectid);
            } else {
                  console.log(colors.yellow("The manditory argument(s) missing! Please check help ('npm run d2m -- --help') or refer https://github.com/anshubana/datastore2mongo#readme for instuctions "));
            }
      })
try {
      program.parse(process.argv);
} catch (err) {
      if (err.code === 'commander.unknownOption') {
            program.outputHelp();
      }
}


