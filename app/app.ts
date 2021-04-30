#!/usr/bin/env node

import { Command } from 'commander';
import * as api from './migration';
var colors = require('colors');

const program = new Command();
program.version("0.0.1")
      .on('--help', function () {
            console.log(colors.brightYellow('Info:'));
            console.log('   This tool converts the data from GCP Datastore format to Mongodb format and then data will be migrated to Mongodb automcally');
            console.log('   based on the auto flag with set as "y" else it prepare a migration script which needs to be executed manually.');
            console.log(colors.brightRed('   This project is in beta phase with version 0.0.1. This tool should be used cautiously!'));
            console.log(colors.brightYellow('Instuctions:'));
            console.log('    a. Enviorment variable "GOOGLE_APPLICATION_CREDENTIALS" must be set with the path to the service account credential file.');
            console.log('    b. Mongoimport tool must be in classpath to enable auto data migration. Ref: https://docs.mongodb.com/database-tools/mongoimport/.');
            console.log('    c. If namespace is only provided as a argument then it will migrate all Kinds (collections) to mongodb');
            console.log('    d. If namespace and kind are both passed as arguments then it will migrate given kind to mongodb.');
            console.log(colors.brightYellow('Examples:'));
            console.log('   $ npm run app -- -d <namespace> -h <host> -p <port>');
            console.log('   $ npm run app -- -d <namespace> -c <kind> -h <host> -p <port>');
            console.log('   $ npm run app -- --help');
            console.log('   $ mongoimport --host localhost --port 27017 --jsonArray --db <namespace> --collection <kind>  --file <file.json> ');
            console.log('');
      })
      .option('-d, --db <db>', 'namespace name [all/<database>]')
      .option('-c, --collection <collection>', 'kind name[all/<collection>]')
      .option('-h, --host <host>', 'host name')
      .option('-p, --port <port>', 'port number')
      .option('-a, --auto <auto>', '[y/n] migration strategy')
      .option('-i, --projectid <projectid>', 'google cloud projectId')
      .action((options) => {
            if (options.db != null && options.collection != null && options.host != null && options.port != null && options.auto != null && options.projectid != null) {
                  api.exportACollection(options.db, options.collection, options.host, options.port, options.auto,options.projectid);
            } else if (options.db != null && options.host != null && options.port != null && options.auto != null && options.collection === 'all' && options.projectid != null) {
                  api.exportAllDataOfaNamespace(options.db, options.host, options.port, options.auto,options.projectid);
            } else if( options.host != null && options.port != null && options.auto != null && options.db === 'all' && options.projectid != null ) {
                  api.exportAllDataOfAllNamespaces(options.host, options.port, options.auto,options.projectid);
            }else{
                  console.log(colors.yellow("The manditory args. is/are missing! Please check help ('npm run d2m -- --help') for the info/examples."));
            }
      })
program.parse(process.argv);


