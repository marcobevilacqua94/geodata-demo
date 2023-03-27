# geodata-demo
GeoData Demo Documentation

This apps consents to specify points for a polygon on a map, with a date range, and see the database points which are inside the polygon and insertionDate in the range.


GeoData Demo	1
Project Repository:	1
Infrastructure:	1
Backend Environment:	4
Frontend Environment:	4


Project Repository:
Clone the project geodata demo from : https://github.com/marcobevilacqua94/geodata-demo 

git clone https://github.com/marcobevilacqua94/geodata-demo.git

The repository contains 3 folders:
geo-backend
geo-frontend
geo-infra
Infrastructure:
For the next steps. Please use the files from the geo-infra folder

Step1: Create your cluster:

Create your cluster with the following services: Data, Index, Query and Search

Step2: Create your bucket:

Create your bucket and name it “elm” and import the data.csv file in scope IoT and collection ReadingHistory

Step : Create the eventing function

Create the eventing function from the unify-records.json file in the geo-infra folder. It is useful to create loc object with coordinates.

Step 4 : Create the FTS index:

Create your FTS index Via curl or from the UI. You can find the index configuration in the folder ( geo-infra)

curl -XPUT -H "Content-Type: application/json" -u Administrator:password http://<host>:8094/api/index/idxGeoLoc -d 
'{
   "type": "fulltext-index",
   "name": "idxGeoLoc",
   "sourceType": "gocbcore",
   "sourceName": "elm",
   "planParams": {
     "maxPartitionsPerPIndex": 1024,
     "indexPartitions": 1
   },
   "params": {
     "doc_config": {
       "docid_prefix_delim": "",
       "docid_regexp": "",
       "mode": "scope.collection.type_field",
       "type_field": "type"
     },
     "mapping": {
       "analysis": {},
       "default_analyzer": "standard",
       "default_datetime_parser": "dateTimeOptional",
       "default_field": "_all",
       "default_mapping": {
         "dynamic": false,
         "enabled": false
       },
       "default_type": "_default",
       "docvalues_dynamic": false,
       "index_dynamic": false,
       "store_dynamic": false,
       "type_field": "_type",
       "types": {
         "IoT.ReadingHistory": {
           "dynamic": false,
           "enabled": true,
           "properties": {
             "insertionTime": {
               "dynamic": false,
               "enabled": true,
               "fields": [
                 {
                   "docvalues": true,
                   "include_in_all": true,
                   "index": true,
                   "name": "insertionTime",
                   "type": "datetime"
                 }
               ]
             },
             "loc": {
               "dynamic": false,
               "enabled": true,
               "fields": [
                 {
                   "docvalues": true,
                   "include_in_all": true,
                   "index": true,
                   "name": "loc",
                   "store": true,
                   "type": "geopoint"
                 }
               ]
             }
           }
         }
       }
     },
     "store": {
       "indexType": "scorch",
       "segmentVersion": 15
     }
   },
   "sourceParams": {}
 }'
 



Backend Environment:
Step 1: Install JDK & Maven
Make sure to install an updated version of JDK & Maven in your local machine

Step 2: download maven dependencies
If you are using an IDE ex: Eclipse. You can click on the project -> update the project to download all the dependencies related to this project ( pom.xml)

Step 3: Run your backend project

Frontend Environment:

Step 1: Install Node Js

Install NodeJs( https://nodejs.org/en/download/). Once you have it installed, write in your terminal node –-version to make sure that node js is well installed


Step 2: Install Angular Js

In your terminal, execute the following command to install globally the angular cli:

npm install -g @angular/cli

Step 3: Download the project dependencies

In your Front end repository, execute the following command to download all the necessary dependencies of the deodata project:

 npm install 

Step 4: Run the application

You can run the application using the following command: ng serve The frontend is by default deployed on port 4200



Go to http://localhost:4200 You should have a similar interface



	
