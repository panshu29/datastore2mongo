#!/usr/bin/env node

/*	
      Copyright	(c)	2021 All Rights Reserved. 
      @author: Anshubana Panda	
      Node module: @loopback/cli
      This file is licensed under the Apache License Version 2.0
*/
import { Command } from 'commander';
import * as api from './migration';
var colors = require('colors');
import * as fse from 'fs-extra';

const program = new Command();
program.version('0.0.1', '-v, --vers', 'current version')
      .description(colors.brightGreen('  It migrates the data from GCP Datastore to Mongodb automatically or \n  it prepares a migration script to be executed manually based on the choice given to the tool. \n  This project is in beta phase and please email me any bugs.'))
      .on('--help', function () {
            console.log('Examples:');
            console.log(colors.brightBlue(' To auto migrate single kind: ')+colors.brightYellow('$ npm run datastore2mongo -- -d <namespace> -i <projectId> -h <host> -p <port> -a y'));
            console.log(colors.brightBlue(' To auto migrate all kinds of a namespace: ')+colors.brightYellow('$ npm run datastore2mongo -- -d <namespace> -i <projectId> -c <kind> -h <host> -p <port> -a y '));
            console.log(colors.brightBlue(' To auto migrate all kinds of all namespaces: ')+colors.brightYellow('npm run datastore2mongo -- -d all -i <projectId> -h <host> -p <port> -a y'));
            console.log('');
      })
      .option('-d, --db <db>', 'datastore namespace (choices: "all", "<namespace name>") ')
      .option('-c, --collection <collection>', 'datastore kind (choices: "all", "<kind name>")')
      .option('-h, --host <host>', 'mongodb host name')
      .option('-p, --port <port>', 'mongodb port number')
      .option('-a, --auto <auto>', '[y/n] migration strategy')
      .option('-i, --projectid <projectid>', 'google cloud projectId')
      .action((options) => {
            if (options.db && options.collection && options.host  && options.port  && options.auto  && options.projectid ) {
                  api.exportACollection(options.db, options.collection, options.host, options.port, options.auto, options.projectid);
            } else if (options.db  && options.host  && options.port  && options.auto  && options.collection === 'all' && options.projectid ) {
                  api.exportAllDataOfaNamespace(options.db, options.host, options.port, options.auto, options.projectid);
            } else if (options.host  && options.port  && options.auto && options.db === 'all' && options.projectid) {
                 if(options.auto==='n') {
                       fse.mkdir('migration', { recursive: true }, (err) => {
                        if (err) console.log(err);
                      });
                  }
                  api.exportAllDataOfAllNamespaces(options.host, options.port, options.auto, options.projectid);
            } else {
                  console.log(colors.red("Manditory argument(s) missing!")
                  +colors.brightYellow("\nPlease check help ('npm run datastore2mongo -- --help') or refer https://github.com/anshubana/datastore2mongo#readme for instuctions "));
            }
      })
try {
      program.parse(process.argv);
} catch (err) {
      if (err.code === 'commander.unknownOption') {
            program.outputHelp();
      }
}


