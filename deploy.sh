#!/bin/bash

path=/var/www/html/muscash
dist=dist.tar.gz
user=musyan
host=ssh.musyan.my.id

cd dist && tar cvzf ../$dist * && cd ..
scp ./$dist $user@$host:$path
ssh $user@$host "cd $path && tar -xvzf $dist && rm -rf $dist"
rm -rf $dist