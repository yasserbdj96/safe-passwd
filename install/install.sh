#!/bin/bash
#   |                                                          |
# --+----------------------------------------------------------+--
#   |   Code by : yasserbdj96                                  |
#   |   Email   : yasser.bdj96@gmail.com                       |
#   |   Github  : https://github.com/yasserbdj96               |
#   |   BTC     : bc1q2dks8w8uurca5xmfwv4jwl7upehyjjakr3xga9   |
# --+----------------------------------------------------------+--  
#   |        all posts #yasserbdj96 ,all views my own.         |
# --+----------------------------------------------------------+--
#   |                                                          |

#START{
# app name:
appname="safe-passwd"

install() {
    #chmod +x "../$appname"
    chmod +x "$appname.sh";
    #chmod +x "install.sh"
    sudo mkdir "/usr/share/$appname";
    #sudo cp -r "../$appname/." "/usr/share/$appname/$appname";
    sudo cp -r "../src/." "/usr/share/$appname/src";
    sudo cp "../main.py" "/usr/share/$appname/$appname.py";
    sudo cp "$appname.png" "/usr/share/$appname/$appname.png";
    sudo cp "$appname.desktop" "/usr/share/applications/$appname.desktop";
    sudo cp "$appname.sh" "/usr/local/bin/$appname";
    #chmod +x "/usr/share/$appname";
    pip install -r "../requirements.txt";
    #sudo cp -r "../src/." "/usr/share/$appname/src";

    # run:
    safe-passwd
}

uninstall() {
    sudo rm -r "/usr/share/$appname";
    sudo rm "/usr/share/applications/$appname.desktop";
    sudo rm "/usr/local/bin/$appname";
}

# install:
if [ "$1" == "-i" ] ; then
    install

# uninstall:
elif [ "$1" == "-u" ] ; then
    uninstall

# update:
elif [ "$1" == "-up" ] ; then
    uninstall
    install
# usage:
else
    echo "Usage: bash $0 [OPTION]";
    echo "       -i   | # for install.";
    echo "       -u   | # for uninstall.";
    echo "       -up  | # for update.";
fi
#}END.
