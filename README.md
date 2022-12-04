## Datastore2Mongo

### What is it?
   It's a simple CLI tool to migrate the dataset from the Google Cloud Datastore to MongoDB. It can work either on auto mode or manual mode based on the choice given to the tool.In manual mode, it generates a migration script that needs to be executed manually. You might need to change the script to support authentication with mongodb. Current release of the app does not support any authentication mechanism in Auto mode. This tool can be intergarted in your DevOps pipeline.
   
### Features
 - Data migration for single Kind of a namespace of the GCP Datastore to Mongodb
 - Data migration for all Kinds of a namespace of the GCP Datastore to Mongodb
 - Data migration for all Kinds of all namespaces of the GCP Datastore to Mongodb 

### Installation
 ``` 
 npm i datastore2mongo -g
 ```
### Prerequisites
- Set the enviornment varible "GOOGLE_APPLICATION_CREDENTIALS" with the path to service account credential file
- download mongoimport tool from below link and add the location to the PATH enviornment variable of the system 
  https://www.mongodb.com/try/download/database-tools
### Screenshot
```
datastore2mongo --help
```
![Alt text](https://github.com/anshubana/datastore2mongo/blob/main/screenshots/screenshot1.PNG?raw=true "Title")



