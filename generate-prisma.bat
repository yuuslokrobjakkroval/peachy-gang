@echo off
echo Attempting to generate Prisma client...

REM Kill any running Node processes that might be locking the file
taskkill /F /IM node.exe 2>nul
taskkill /F /IM npx.exe 2>nul

REM Wait a moment for processes to fully terminate
timeout /t 2 /nobreak >nul

REM Try to generate the client
npx prisma generate

echo Done!
pause