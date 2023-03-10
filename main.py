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
import argparse
import eel
from ashar import *
import json
import os

# INPUT ARG
ap = argparse.ArgumentParser()
ap.add_argument('-p', '--password', required=True)
ap.add_argument('-c', '--change', required=False)
ap.add_argument('-f', '--file', required=False)
ap.add_argument('-po', '--port', required=False)
ap.add_argument('-a', '--add', required=False)
args = ap.parse_args()

pathx=os.path.dirname(os.path.abspath(__file__))

#
global password_key

# json path:
if args.port==None:
    port = 8080
else:
    port = int(args.port)

# json path:
global filename
if args.file==None:
    filename = pathx+'/src/data.json'
else:
    filename = args.file

# login:
with open(filename, 'r+') as f:
    data = json.load(f)
    if data["password"]!="":
        if ashar(args.password,"true",smbls="").encode()==data["password"]:
            
            password_key=args.password
        else:
            print("The password is wrong")
            exit()
    else:
        # for first time:
        print("No password exist!")
        np=input("Enter your password:")
        data["password"]=ashar(np,"true",smbls="").encode()
        f.seek(0)
        json.dump(data, f, indent=4)
        f.truncate()
        print("The password has been registered successfully")
        password_key=np
        #exit()

# change password:
if args.change!=None:
    new_password=args.change
    old_password=args.password
    with open(filename, 'r+') as f:
        data = json.load(f)
        data["password"]=ashar(new_password,"true",smbls="").encode()
        for i in range(len(data["data"])):
            my_passwd=ashar(old_password,data["data"][int(i)]["password"],smbls='').decode()
            data["data"][int(i)]["password"]=ashar(new_password,my_passwd,smbls='').encode()
        f.seek(0)
        json.dump(data, f, indent=4)
        f.truncate()
    print("The password has been changed successfully")
    password_key=new_password
else:
    pass

# add csv:
if args.add!=None:
    import csv
    with open(args.add, 'r') as file:
        csvreader = csv.reader(file)
        i=0
        for row in csvreader:
            passwd=ashar(password_key,row[3],smbls='').encode()
            entry={"url": f"{row[0]}","username": f"{row[2]}","password": f"{passwd}","backup":""}
            
            with open(filename, 'r+') as f:
                if i!=0:
                    data = json.load(f)
                    data["data"].append(entry)
                    f.seek(0)        # <--- should reset file position to the beginning.
                    json.dump(data, f, indent=4)
                    f.truncate()
            i+=1
        print("Done!")
else:
    pass


#
eel.init(pathx+'/src')

# data_file:
@eel.expose
def data_file():
    with open(filename, 'r') as f:
        data = json.load(f)
    return data

# decode
@eel.expose
def decode(text):
    return ashar(password_key,text,smbls="").decode()
     

# encode
@eel.expose
def encode(text):
    return ashar(password_key,text,smbls="").encode()

# addnew
@eel.expose
def addnew(url,user,passwd,other):
    passwd=ashar(password_key,passwd,smbls='').encode()
    entry={"url": f"{url}","username": f"{user}","password": f"{passwd}","backup": f"{other}"}

    with open(filename, 'r+') as f:
        data = json.load(f)
        data["data"].append(entry)
        f.seek(0)        # <--- should reset file position to the beginning.
        json.dump(data, f, indent=4)
        f.truncate()
    return "Done!"

# addnew
@eel.expose
def edit(url,user,passwd,other,i):
    passwd=ashar(password_key,passwd,smbls='').encode()
    with open(filename, 'r+') as f:
        data = json.load(f)
        data["data"][int(i)]["url"]=url
        data["data"][int(i)]["username"]=user
        data["data"][int(i)]["password"]=passwd
        data["data"][int(i)]["backup"]=other
        f.seek(0)        # <--- should reset file position to the beginning.
        json.dump(data, f, indent=4)
        f.truncate()
    return "Done!"

# delete
@eel.expose
def delt(ix):
    with open(filename, 'r+') as f:
        data = json.load(f)
        del data["data"][ix]
        f.seek(0)        # <--- should reset file position to the beginning.
        json.dump(data, f, indent=4)
        f.truncate()
    return "Done!"

#iswork:
@eel.expose
def iswork():
    return "True"

#eel.start("main.html",host="127.0.0.1",port=80,size=(1050,500))
eel.start("index.html",host="127.0.0.1",port=port,mode='default')
#}END.