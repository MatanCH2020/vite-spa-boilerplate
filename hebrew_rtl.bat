@echo off
REM Hebrew RTL Support Batch File
REM Double-click this file to enable Hebrew support in Command Prompt

echo Setting up Hebrew RTL support...
chcp 1255

echo.
echo Testing Hebrew text:
echo שלום עולם
echo זה טקסט בעברית

echo.
echo Hebrew code page 1255 is now active.
echo Run this batch file each time you need Hebrew support.
pause