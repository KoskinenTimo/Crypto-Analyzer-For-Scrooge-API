Backend for Crypto-Analyzer-For-Scrooge project/repository 
<br>https://github.com/KoskinenTimo/Crypto-Analyzer-For-Scrooge

LIVE LINK:
https://koskinentht-crypto-api.herokuapp.com


Development environment ment to be used locally.
This backend is primarily built to run inside a container. If you have docker installed you can: <br>
npm install <br>
docker-compose -f docker-compose.dev.yml up

This will start both containers for server and mongodb testing/development database. But if you want to run without docker see below. Make sure to have your own MONGODB_URI if you want to run without development docker setup.

Setup environment variables:<br>
MONGODB_URI<br>
TEST_MONGODB_URI<br>
DEV_MONGODB_URI<br>
PORT(3001 is default)<br>
SECRET(for token)<br>

And after setting up .env details npm start, if dependencies installed.

Possible errors:<br>
If you start on windows, cross-env maybe won't work and you need to install cross-env globally(or just use the containers mentioned above), see below<br>
"Please note that npm uses cmd by default and that doesn't support command substitution, so if you want to leverage that, then you need to update your .npmrc to set the script-shell to powershell."