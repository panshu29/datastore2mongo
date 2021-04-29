#!/usr/bin/env node

import { Command } from 'commander';
import * as api from './migration';
var colors = require('colors');

const program = new Command();
program.version("0.0.1")
      .on('--help', function () {
            console.log(colors.brightYellow('Info:'));
            console.log('   This tool converts the data from GCP Datastore format to Mongodb JSON format and then data will be migrated to Mongodb automcally');
            console.log('   if the auto flag is set y else it prepare a migration script which needs to be executed manually.Please follow below instuctions!');
            console.log('');
            console.log('    1. Enviorment variable "GOOGLE_APPLICATION_CREDENTIALS" must be set with the path to the service account.');
            console.log('    2. mongoimport cli tool must be in classpath to enable auto data migration. Ref: https://docs.mongodb.com/database-tools/mongoimport/');
            console.log('    3. If database name(Namespace) is only passed as a argument , then it will create a JSON file for each table(Kind / collection) in database.');
            console.log('    4. If database name and collection name are both passed as arguments , then it will create a JSON file for that collection in the database.');
            console.log(colors.brightYellow('Examples:'));
            console.log('');
            console.log('   $ npm run app -- -d <namespace> -h <host> -p <port>');
            console.log('   $ npm run app -- -d <namespace> -c <kind> -h <host> -p <port>');
            console.log('   $ npm run app -- --help');
            console.log('   $ mongoimport --host localhost --port 27017 --jsonArray --db <namespace> --collection <kind>  --file <file.json> ');
            console.log('');
      })
      .option('-d, --db <db>', '[all/database name]')
      .option('-c, --collection <collection>', '[all/collection name]')
      .option('-h, --host <host>', 'host name')
      .option('-p, --port <port>', 'port')
      .option('-a, --auto <auto>', '[y/n] migration strategy')
      .option('-f, --full <full>', '[y/n] migration for all namespaces')
      .action((options) => {
            if (options.db != null && options.collection != null && options.host != null && options.port != null && options.auto != null) {
                  api.exportACollection(options.db, options.collection, options.host, options.port, options.auto);
            } else if (options.db != null && options.host != null && options.port != null && options.auto != null) {
                  api.exportDataOfNamespace(options.db, options.host, options.port, options.auto);
            } else if( options.host != null && options.port != null && options.auto != null && options.full != null) {
                  api.exportDataOfALLNamespaces(options.host, options.port, options.auto);
            }else{
                  console.log(colors.red("The manditory args. like (<db>/<host>/<port>/<auto>) is/are missing ! Please check help ('npm run d2m -- --help') for the info/examples."));
            }
      })
program.parse(process.argv);


