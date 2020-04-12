@echo off
setlocal enableDelayedExpansion

set dllPath=%1
set dictionaryInputPath=%2
set dictionaryOutputPath=%3
set shouldUseMILADictionary=""
if [%dllPath%] == [] (
    echo Please pass the path for ProcessLexicon.dll
    goto :EOF
)
REM if %dictionaryInputPath% is empty, use MILA lexicon
REM else, use the dictionary in the given %dictionaryInputPath%
if [%dictionaryInputPath%] == [] (
  REM extract MILA lexicon .sql file
  echo This may take a few seconds...
  set shouldUseMILADictionary=true
  set zipPath='.\mitzlolLexicon\lexicon.zip'
  for %%A in (%dllPath%) do (
    set dllFolder=%%~dpA
    set dllName=%%~nxA
  )
  powershell.exe "Add-Type -A 'System.IO.Compression.FileSystem'; [IO.Compression.ZipFile]::ExtractToDirectory(!zipPath!, '!dllFolder!');"
  set dictionaryInputPath=!dllFolder!\inflections_20141204.sql
  set dictionaryOutputPath=.\mitzlolLexicon\mitzlolLexicon.sql
) else (
  set shouldUseMILADictionary=false
  if [%dictionaryOutputPath%] == [] (
     Please pass your lexicon output path.
  )
)
REM prepare lexicon file
dotnet %dllPath% %dictionaryInputPath% %dictionaryOutputPath% %shouldUseMILADictionary%