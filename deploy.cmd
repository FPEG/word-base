ssh-agent bash
ssh-add %HOMEPATH%/.ssh/mykey.pem
xcopy ".\build" ".\WordBase" /E /I /Y
scp -r WordBase root@47.100.40.176:/opt/nginx/www
rd /S /Q ".\WordBase"