## Datastore2Mongo tool

###  It is a data conversion and migration cli tool.It converts the data from GCP Datastore format to Mongodb format.
   - Enviorment variable "GOOGLE_APPLICATION_CREDENTIALS" must be set with the path to the service account.
   - If database name(Namespace) is only passed , then it will create a JSON file for each table(Kind) in the database.
   - If database name and collection name are both passed , then it will create a JSON file for that table in the database.
   - Use mongoimport cli tool to import the data to Mongodb. Ref: https://docs.mongodb.com/database-tools/mongoimport/ 
   
 ### Please see below screenshot for the usage instructions   

![Alt text](https://github.com/anshubana/datastore2mongo/blob/main/screenshots/screenshot1.PNG?raw=true "Title")



