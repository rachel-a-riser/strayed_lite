import json
from connect import *


class UserDAO():

    def __init__(self, ID, UserType, Email, UserName, Password):
        self.con = connect()
        self.UserType = "Standard"
        self.ID = ID
        self.UserName = UserName
        self.Password = Password
        self.Email = Email

    def selectUser(self, *_args):
        print("user select")
        userobj = UserDAO(0, "", "", "", "")
        cur = userobj.con.makeConnection()
        cur.execute(
            "SELECT * FROM User WHERE UserID=%s", (self.ID,))
        for (ID, UserType, Email, UserName, Password) in cur:
            obj = UserDAO(ID, UserType, Email, UserName, Password)
        return obj
