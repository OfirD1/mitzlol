@echo off
setlocal enableDelayedExpansion
set startPath=%cd%

REM cmd handles '=' as an argument separator, 
REM hence each passed-in argument's position is needed to be specified
set hostname=%2
set username=%4
set password=%6
set dbname=%8
set client=%9

set missingCredentials=false
if "%hostname%" == "" set missingCredentials=true
if "%username%" == "" set missingCredentials=true
if "%password%" == "" set missingCredentials=true

if %missingCredentials% == true (
    echo Please pass credentials for MySql
    goto :EOF
)
if "%dbname%" == "" (
    echo Please pass the database name
    goto :EOF
)
if "%client%" == "" (
    echo Please pass a desired client [react or vue]
    goto :EOF
)


REM start mysql80 service, if not already running
:start_mysql80_service
net start | find /i "mysql80" > nul
if !errorlevel! == 1 (
  echo The mysql80 service is not running, starting it now
  set issuccess=false
  net start mysql80
  if !errorlevel! == 0 set issuccess=true
  if !errorlevel! == 1 set issuccess=true
  if !issuccess! == true (
     goto :start_server_and_client
  ) else (
     goto :EOF
  )
)

:start_server_and_client
REM install the server, if not already installed
cd %startPath%\mitzlolServer
if not exist node_modules (
   REM use the CALL command to return control to parent process
   echo installing server's node_modules
   call npm install
)
REM run the server (argv holds the passed-in MySql credentials)
echo Firing up the server...
set argv=%*
start cmd.exe /k "node index.js %argv%"

REM install the client, if not already installed
cd %startPath%\mitzlolClient\%client%-client
if not exist node_modules (
   REM use the CALL command to return control to parent process
   echo installing client's node_modules
   call npm install
)
REM run the client
echo Firing up the client...
set command=""
if "%client%" == "vue" set command="npm run serve"
if "%client%" == "react" set command="npm start"
start cmd.exe /k %command% 

REM go back to %startPath%, open the browser
cd %startPath%
start http://localhost:8080
