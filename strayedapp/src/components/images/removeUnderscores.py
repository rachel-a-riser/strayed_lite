import os

print(os.curdir)

for x in os.listdir(os.curdir):
    oldName = x
    newName = oldName.replace("_","")
    os.system("mv "+ oldName + " " + newName)
