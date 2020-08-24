@echo off
setlocal enableDelayedExpansion
set startPath=%cd%

REM cmd handles '=' as an argument separator, 
REM hence each passed-in argument's position is needed to be specified
set host=%1
set username=%3
set password=%5
set dbname=%7
set client=%9

set missingCredentials=false
if "%host%" == "" set missingCredentials=true
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
start cmd.exe /k  "npm run serve"

REM go back to Desktop, open the browser
cd %startPath%
start http://localhost:8080