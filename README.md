# Datastore 2 Mongodb

##  Info: This tool converts the data from GCP Datastore format to Mongodb format.
   - Enviorment variable "GOOGLE_APPLICATION_CREDENTIALS" must be set with the path to the service account.
   - If database name(Namespace) is only passed , then it will create a JSON file for each table(Kind) in database.
   - If database name and collection name are both passed , then it will create a JSON file for the table in the database.
   - Use mongoimport cli tool to import the data to Mongodb. Ref: https://docs.mongodb.com/database-tools/mongoimport/ 

