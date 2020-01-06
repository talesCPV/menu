#!/bin/sh
HOST='108.179.253.234'
USER='menu@flexibus.com.br'
PASS='Xspider0'
HDIR="/"
LDIR='/opt/lampp/htdocs/menu/'

dir_atual=$(pwd)

ncftpput -R -v -u $USER -p $PASS $HOST $HDIR $LDIR