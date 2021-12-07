Backend for Crypto-Analyzer-For-Scrooge project/repository (GitHub: KoskinenTimo/Crypto-Analyzer-For-Scrooge)

Only development environment built at the moment, which is ment to be used locally.<br>
This backend is primarily built to run inside a container. If you have docker installed you can: <br>
npm install
docker-compose -f docker-compose.dev.yml up

This will start a development version, containers for server and mongodb testing/development database. But if you want to run without docker see below.

Setup environment variables:<br>
MONGODB_URI<br>
TEST_MONGODB_URI<br>
DEV_MONGODB_URI<br>
PORT(3001 is default)<br>

Possible errors:<br>
If you start on windows, cross-env won't work and you need to install cross-env globally(or just use the containers mentioned above), see below<br>
"Please note that npm uses cmd by default and that doesn't support command substitution, so if you want to leverage that, then you need to update your .npmrc to set the script-shell to powershell."