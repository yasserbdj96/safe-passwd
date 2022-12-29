import argparse
import eel
from ashar import *
import json


# INPUT ARG
ap = argparse.ArgumentParser()
ap.add_argument('-p', '--password', required=True)
ap.add_argument('-c', '--change', required=False)
args = ap.parse_args()

# login:
filename = 'src/data.json'
with open(filename, 'r+') as f:
    data = json.load(f)
    if data["password"]!="":
        if ashar(args.password,"true",smbls="").encode()==data["password"]:
            global password_key
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
        exit()

# change password:
if args.change!=None:
    new_password=args.change
    old_password=args.password
    filename = 'src/data.json'
    with open(filename, 'r+') as f:
        data = json.load(f)
        data["password"]=ashar(new_password,"true",smbls="").encode()
        for i in range(len(data["data"])):
            my_passwd=ashar(old_password,data["data"][int(i)]["password"],smbls='').decode()
            print(my_passwd)
            data["data"][int(i)]["password"]=ashar(new_password,my_passwd,smbls='').encode()
        f.seek(0)
        json.dump(data, f, indent=4)
        f.truncate()
    print("The password has been changed successfully")
    exit()

#
eel.init('src')

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

    filename = 'src/data.json'
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
    filename = 'src/data.json'
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


eel.start("main.html",host="127.0.0.1",port=80,size=(1050,500))
