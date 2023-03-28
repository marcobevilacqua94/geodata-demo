# geodata-demo
GeoData Demo Documentation
COMUNI ITALIANI VERSION

This app consents to specify points for a polygon on a map, with a date range, and see the database points which are inside the polygon and insertionDate in the range.


Project Repository:
Clone the project geodata demo from : https://github.com/marcobevilacqua94/geodata-demo
git clone https://github.com/marcobevilacqua94/geodata-demo.git
SELECT comuni-italiani BRANCH

The repository contains 3 folders:
geo-backend
geo-frontend
geo-infra
Infrastructure:
For the next steps. Please use the files from the geo-infra folder

Step1: Create your cluster:

Create your cluster with the following services: Data, Index, Query and Search

Step2: Create your bucket:

Create your bucket and name it “comuni” and import the comuni.json file in scope comuni and collection comuni. Select istat as document id field.

Step 3 : Create the FTS index:

Create your FTS index Via curl or from the UI. You can find the index configuration in the folder (geo-infra)
You can do it via quick index by adding loc as geopoint field and comune as a text field. Select all the check options. Call it comuniIndex.
curl -XPUT -H "Content-Type: application/json" -u Administrator:password http://<host>:8094/api/index/comuniIndex -d 
'<fts-index.json>'

Backend Environment:
Step 1: Install JDK & Maven
Make sure to install an updated version of JDK & Maven in your local machine

Step 2: download maven dependencies
If you are using an IDE ex: Eclipse. You can click on the project -> update the project to download all the dependencies related to this project (pom.xml)

Step 3: Put your host, username and password of couchbase in applicaiton.properties

Step 4: Run your backend project

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



Go to http://localhost:4200 You should have the interface



	
