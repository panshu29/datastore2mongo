import { Datastore } from "@google-cloud/datastore";
import * as fse from 'fs-extra';
const nodeCmd = require('node-cmd');
var colors = require('colors');

var scriptWriter = fse.createWriteStream('script.sh', {
  flags: 'a'
})

export async function exportACollection(dbname: string, collectionName: string, host: string, port: string, auto: string) {
  let list: any = [];
  const datastore = new Datastore();
  const query = datastore.createQuery(dbname, collectionName);
  return new Promise<[]>((resolve, reject) => {
    query.run((err, entities, info) => {
      entities.forEach(entity => {
        let mongoPart1 = {
          "name": entity[datastore.KEY].name
        }
        let mongoEntity = Object.assign(mongoPart1, entity);
        list.push(mongoEntity);
      })
      resolve(list);
    });
  }).then(data => {
    let filepath: string = dbname + "/" + collectionName + ".json";
    let jdata = JSON.stringify(data);
    fse.outputFileSync(filepath, jdata);
    let script: string = ' mongoimport --host ' + host + ' --port ' + port + ' --jsonArray --db ' + dbname + ' --collection ' + collectionName + ' --file ' + filepath;
    if (auto === 'y') {
      nodeCmd.runSync(script);
      console.log(colors.brightGreen("Migration is completed for the Kind: " )+ colors.brightYellow(collectionName));
    } else if (auto === 'n') {
      scriptWriter.write(script + ' && \n');
      console.log(" a script is writen for the Kind: " + colors.brightGreen(collectionName));
    }
  })
}
export async function exportAllCollections(dbname: string, host: string, port: string, auto: string) {
  const datastore = new Datastore();
  const query = datastore.createQuery(dbname, '__kind__').select('__key__');
  const [entities] = await datastore.runQuery(query);
  const kinds = entities.map(entity => entity[datastore.KEY].name);
  if (auto === 'y') {
    console.log(colors.yellow("Auto migration is on !"))
  }
  else {
    console.log(colors.yellow("Auto migration is off ! Use generated script 'migration-script.sh' to migrate manually !"));
    scriptWriter.write('#!/bin/bash');
    scriptWriter.write('');
  }
  console.log(colors.brightYellow("Namespace: "+dbname));
  console.log(colors.brightRed("Started....."));
  kinds.forEach(kind => {
    if (!kind.startsWith("__")) {
      exportACollection(dbname, kind, host, port, auto);
    }
  });

}



