
import json
from connect import *
import mariadb
import subprocess
import numpy as np
import time
import array as arr
from datetime import date


class standarddashboard:

    def __init__(self):
        self.con = connect()
    def updateMyDog(self, submissionID,dogID,action):
        dogIDstr=str(dogID)
     
        if (str(action)=="map"):
            typeOf="!R"
            query = "UPDATE submission SET Type=CONCAT(Type,?) where SubmissionID=?"
        if (str(action)=="justDog"):
            return
       
        
        
        print(typeOf)
        print(submissionID)
        try:
            conn = mariadb.connect(
                user="root",
                password="password",
                # host="192.168.1.101",
                # 10.95.111.153

                host="192.168.1.155",
                port=3306,
                database="strayed2"
            )
        except mariadb.Error as e:
            print(f"Error connecting to MariaDB Platform: {e}")
            sys.exit(1)
           
        

        
        cur = conn.cursor()
        cur.execute(query,("!R",submissionID))

        conn.commit()
        return ""

  

    def userInfo(self, userID):
        sdObj = standarddashboard()
        curObj = sdObj.con.makeConnection()
        strU = str(userID)
        buildjs = ["UserID", "UserType", "UserEmail", "UserName", "Password"]
        query = "Select * from user where userID="+strU
        curObj.execute(query)
        curList = list(map(list, curObj))

        returnmatrix = []

        for row in curList:
            line = ""

            for item in row:

                line = line+str(item)+","
            line = line[0:-1]

            linearr = line.split(",")

            i = 0
            dict = {}
            while i < len(linearr):

                dict[buildjs[i]] = linearr[i]

                i = i+1

            returnmatrix.append(dict)
        # print(returnmatrix)
        return (returnmatrix)

    def petsInfo(self, userID):
        sdObj = standarddashboard()
        curObj = sdObj.con.makeConnection()
        buildjs = ["DogID", "Name", "Status", "HomeLocation",
                   "User", "ProfileDescription", "ProfileImage"]

        query = "SELECT * FROM dog WHERE user=? AND STATUS=?"
        curObj.execute(query, (userID, "lost"))
        curList = list(map(list, curObj))

        returnmatrix = []

        for row in curList:
            line = ""

            for item in row:

                line = line+str(item)+","
            line = line[0:-1]

            linearr = line.split(",")

            i = 0
            dict = {}
            while i < len(linearr):

                dict[buildjs[i]] = linearr[i]

                i = i+1

            returnmatrix.append(dict)

        return (returnmatrix)
    def homeInfo(self, userID):
        sdObj = standarddashboard()
        curObj = sdObj.con.makeConnection()
        buildjs = ["DogID", "Name", "Status", "HomeLocation",
                   "User", "ProfileDescription", "ProfileImage"]

        query = "SELECT * FROM dog WHERE user=? AND STATUS=?"
        curObj.execute(query, (userID, "home"))
        curList = list(map(list, curObj))

        returnmatrix = []

        for row in curList:
            line = ""

            for item in row:

                line = line+str(item)+","
            line = line[0:-1]

            linearr = line.split(",")

            i = 0
            dict = {}
            while i < len(linearr):

                dict[buildjs[i]] = linearr[i]

                i = i+1

            returnmatrix.append(dict)

        return (returnmatrix)

    def singleDogInfo(self, dogID):
        sdObj = standarddashboard()
        curObj = sdObj.con.makeConnection()
        buildjs = ["DogID", "Name", "Status", "HomeLocation",
                   "User", "ProfileDescription", "ProfileImage"]
        query = "SELECT * FROM dog WHERE DogID="+dogID
        curObj.execute(query)
        curList = list(map(list, curObj))

        returnmatrix = []

        for row in curList:
            line = ""

            for item in row:

                line = line+str(item)+","
            line = line[0:-1]

            linearr = line.split(",")

            i = 0
            dict = {}
            while i < len(linearr):

                dict[buildjs[i]] = linearr[i]

                i = i+1

            returnmatrix.append(dict)
        print(returnmatrix)
        return (dict)

    def shelterInfo(self, userID):
        sdObj = standarddashboard()
        type = "shelter"
        curObj = sdObj.con.makeConnection()
        buildjs = ["SubmissionID", "SubmissionImage", "SubmissionDescription",
                   "Type", "Date", "SubmittingUser", "Location", "Coordinates"]
        query = "SELECT * FROM submission WHERE Type='Shelter'"
        curObj.execute(query)
        curList = list(map(list, curObj))
        returnmatrix = []

        for row in curList:
            line = ""

            for item in row:

                line = line+str(item)+","
            line = line[0:-1]

            linearr = line.split(",")

            i = 0
            dict = {}
            while i < len(linearr):

                dict[buildjs[i]] = linearr[i]

                i = i+1

            returnmatrix.append(dict)

        return (returnmatrix)
    def matchDetails(self, submissionID):
        sdObj=standarddashboard()
        curObj=sdObj.con.makeConnection()

        buildjs=['SubmissionDescription','SubmittingUser','SubmittingUserEmail','Location']
        query="Select submissionDescription, SubmittingUser, user.Email, Location from submission INNER JOIN user on submission.SubmittingUser=user.UserID where submissionID="+submissionID
        curObj.execute(query)
        curList = list(map(list, curObj))
        returnmatrix = []

        for row in curList:
            line = ""

            for item in row:

                line = line+str(item)+","
            line = line[0:-1]

            linearr = line.split(",")

            i = 0
            dict = {}
            while i < len(linearr):

                dict[buildjs[i]] = linearr[i]
                

                i = i+1

            returnmatrix.append(dict)
        print(returnmatrix)

        return (returnmatrix)

    def fostersInfo(self, userID):
        sdObj = standarddashboard()
        curObj = sdObj.con.makeConnection()
        buildjs = ["DogID", "Name", "Status", "HomeLocation",
                   "User", "ProfileDescription", "ProfileImage"]
        query = "SELECT * FROM dog WHERE user=? AND STATUS=?"
        curObj.execute(query, (userID, "foster"))
        curList = list(map(list, curObj))

        returnmatrix = []

        for row in curList:
            line = ""

            for item in row:

                line = line+str(item)+","
            line = line[0:-1]

            linearr = line.split(",")

            i = 0
            dict = {}
            while i < len(linearr):

                dict[buildjs[i]] = linearr[i]

                i = i+1

            returnmatrix.append(dict)

        return (returnmatrix)

    def dogEdit(self, name, status, description, location, id):
        try:
            conn = mariadb.connect(
                user="root",
                password="password",
                # host="192.168.1.101",
                # 10.95.111.153

                host="192.168.1.155",
                port=3306,
                database="strayed2"
            )
        except mariadb.Error as e:
            print(f"Error connecting to MariaDB Platform: {e}")
            sys.exit(1)
           # SET code = CONCAT(code, '_standard')

            # Name Status HomeLocation User ProfileDescription ProfileImage

        query = "UPDATE dog SET NAME=?, Status=?, HomeLocation=?,ProfileDescription=? WHERE dogID=?"
        cur = conn.cursor()

        cur.execute(query, (name, status, location, description, id))
        cur = conn.cursor()

        conn.commit()
        # print("yo")

        return ("hello")

    def addToMap(self, image, description, location, coords):
        sbObj = standarddashboard()
        subprocess.run('python neighbors.py '+str(image), shell=True)
        time.sleep(3)

        try:
            conn = mariadb.connect(
                user="root",
                password="password",
                # host="192.168.1.101",

                # 10.95.111.153

                host="192.168.1.155",
                port=3306,
                database="strayed2"
            )
        except mariadb.Error as e:
            print(f"Error connecting to MariaDB Platform: {e}")
            sys.exit(1)
        today = date.today()
        query2 = f"INSERT INTO submission (SubmissionImage, SubmissionDescription, Type, Date, SubmittingUser, Location, Coordinates) VALUES ('{image}','{description}','spotted_anon','{today}',24,'{location}','{coords}')"

        cur = conn.cursor()
        cur.execute(query2)
        conn.commit()
        
        # print("yo")

        return ""

    def addToShelter(self, image, description, location, coords):
        sbObj = standarddashboard()
        

        try:
            conn = mariadb.connect(
                user="root",
                password="password",
                # host="192.168.1.101",

                # 10.95.111.153

                host="192.168.1.155",
                port=3306,
                database="strayed2"
            )
        except mariadb.Error as e:
            print(f"Error connecting to MariaDB Platform: {e}")
            sys.exit(1)

        today = date.today()
        query2 = f"INSERT INTO submission (SubmissionImage, SubmissionDescription, Type, Date, SubmittingUser, Location, Coordinates) VALUES ('{image}','{description}','Shelter','{today}',55,'{location}','{coords}')"

        cur = conn.cursor()
        cur.execute(query2)
        conn.commit()
        subprocess.run('python neighbors.py '+str(image), shell=True)
        time.sleep(2)
        # print("yo")

        return ""
    def dismissMatch(self,submissionID,user):
        try:
            conn = mariadb.connect(
                user="root",
                password="password",
                # host="192.168.1.101",

                # 10.95.111.153

                host="192.168.1.155",
                port=3306,
                database="strayed2"
            )
        except mariadb.Error as e:
            print(f"Error connecting to MariaDB Platform: {e}")
            sys.exit(1)

        
        query="Delete from matches where SubmissionID=? and dog IN (SELECT dogID FROM dog WHERE user=?)"
        cur = conn.cursor()
        cur.execute(query,(submissionID,user))
        conn.commit()
      
        # print("yo")

        return ""

    def addPet(self, name, url, description, zip, status, user):
        sdObj = standarddashboard()
        try:
            conn = mariadb.connect(
                user="root",
                password="password",
                # host="192.168.1.101",

                # 10.95.111.153

                host="192.168.1.155",
                port=3306,
                database="strayed2"
            )
        except mariadb.Error as e:
            print(f"Error connecting to MariaDB Platform: {e}")
            sys.exit(1)

        zip = str(zip)

        query2 = f"INSERT INTO dog (Name, Status, HomeLocation, User, ProfileDescription, ProfileImage) VALUES ('{name}','{status}','{zip}','{user}','{description}','{url}')"
       # Nam
       #e Status HomeLocation User ProfileDescription ProfileImage
       
        query3 = f"INSERT INTO submission (SubmissionImage, SubmissionDescription, Type, Date, SubmittingUser, Location, Coordinates) VALUES ('{url}','{description}','{status}','2023-05-03','{user}','{''}','{''}')"

        cur = conn.cursor()
        cur.execute(query2)
        
        #conn.commit()
        
        #cur.execute(query3)
        conn.commit()
        subprocess.run('python neighbors.py '+str(url), shell=True)
        print("here is where you send"+str(url)+" to the model")
        
        try:
            conn2 = mariadb.connect(
                user="root",
                password="password",
                # host="192.168.1.101",

                # 10.95.111.153

                host="192.168.1.155",
                port=3306,
                database="strayed2"
            )
        except mariadb.Error as e:
            print(f"Error connecting to MariaDB Platform: {e}")
            sys.exit(1)
        if(status=="foster" or status=="Foster"):
            cur2=conn2.cursor()
            cur2.execute(query3)
            conn2.commit()
        # print("yo")
        #IF STATUS IS FOSTER ADD TO SUBMISSION TABLE TOOOOOOO

        return ""
 


    def lostInfo(self, userID):

        sdObj = standarddashboard()
        curObj = sdObj.con.makeConnection()
        buildjs = ["DogID", "Name", "Status", "HomeLocation",
                   "User", "ProfileDescription", "ProfileImage"]

        query = "SELECT * FROM dog WHERE user=? AND STATUS=?"
        curObj.execute(query, (userID, "lost"))
        curList = list(map(list, curObj))

        returnmatrix = []

        for row in curList:
            line = ""

            for item in row:

                line = line+str(item)+","
            line = line[0:-1]

            linearr = line.split(",")

            i = 0
            dict = {}
            while i < len(linearr):

                dict[buildjs[i]] = linearr[i]

                i = i+1

            returnmatrix.append(dict)
        # print(returnmatrix)
        return (returnmatrix)

    def createAccount(self, email, password):
        sdObj = standarddashboard()
        curObj = sdObj.con.makeConnection()
        buildjs = ["UserID", "Email", "Password"]
        # print("hello")
        query1 = f"SELECT * FROM user where Email ='"+str(email)+"'"
        curObj.execute(query1)
        curList = list(curObj)

        # Checking to see if email exists in database
        if (len(curList) > 0):
            # The email is already in database

            print("this email is in use")
            ret = 999

        else:
            try:
                conn = mariadb.connect(
                    user="root",
                    password="password",
                    # password="UApass123",
                    # host=10.95.111.153
                    host="192.168.1.155",
                    # host="192.168.1.101",
                    # port=3307,
                    port=3306,
                    database="strayed2"
                )
            except mariadb.Error as e:
                print(f"Error connecting to MariaDB Platform: {e}")
                sys.exit(1)

            # print("this email is not in use")
            query2 = f"INSERT INTO User (Email, UserName, Password) VALUES ('{email}','{email}', '{password}' )"
            cur = conn.cursor()
            cur.execute(query2)
            conn.commit()
            query3 = f"SELECT UserId FROM user where Email = '"+email+"'"
            cur.execute(query3)
            ret = str(cur.fetchone()[0])

            ret = ret

        return ret

    def findDog(self, getDogs, description):
        match = []
        if (len(getDogs) == 0):
            print("We could not detect this dog")
        else:
            for x in range(len(getDogs)):
                sdObj = standarddashboard()
                curObj = sdObj.con.makeConnection()
                query1 = f"SELECT dogId FROM DOG where ProfileImage ='" + \
                    str(getDogs[x])+"'"
                curObj.execute(query1)
                if (curObj != ""):
                    curList = list(map(list, curObj))
                    i = 0
                    for row in curList:
                        add = str(row[0])
                        match.append(add)

        if (len(match) == 0):
            print("this dog is not in our database.")

        elif (len(match) > 1):
            print(
                "there is a dog in the database that matches... checking to see if it is lost")

        getLost = []
        getColor = []

        for value in match:
            ret1 = sdObj.checkLost(value)
            if (ret1 != 0):
                getLost.append(ret1)

        for value in getLost:
            ret2 = sdObj.checkColor(description, value)
            if (ret2 != 0):
                getColor.append(ret1)

            # print(len(getColor))
            # print("^ LENGTH OF GET COLOR \n\n\n")
        return getColor

    def checkColor(self, color, match):
        sdObj = standarddashboard()
        curObj = sdObj.con.makeConnection()
        query = f"SELECT ProfileDescription FROM dog where dogID = '"+match+"'"
        curObj.execute(query)
        checkCol = str(curObj.fetchone()[0])
        ccL=len(checkCol)
        cL=len(color)
        longest=""
        shortest=""
        if (ccL>=cL):
            longest=checkCol
            shortest=color
        if (cL>ccL):
            longest=color
            shortest=checkCol
        match=True
        
        shortestArr=shortest.split(" ")
        for i in shortestArr:
            if(i not in longest):
                match=False


        # print(checkCol)
        if (match==True):
            return id
        else:
            print("no color matches")
            return id
        #return 0 for furture match==false

    def getSubmissionID(self, image, description):
        sdObj = standarddashboard()
        curObj = sdObj.con.makeConnection()
        query = f"SELECT submissionId FROM submission where SubmissionImage = '" + \
            image+"' and SubmissionDescription = '"+description+"'"
        curObj.execute(query)
        getID = str(curObj.fetchone()[0])
        if (getID != ""):
            return getID
        else:
            return 0
    def databaseMessage(self):
        sdObj=standarddashboard()
        curObj=sdObj.con.makeConnection()
        id="1"
        query=f"SELECT message FROM credz where ID = '"+id+"'"
        curObj.execute(query)
        check=str(curObj.fetchone()[0])
        print(check)

        return check
    
    def accoMessage(self):
        sdObj=standarddashboard()
        curObj=sdObj.con.makeConnection()
        id="2"
        query=f"SELECT message FROM credz where ID = 2"
        curObj.execute(query)
        check=str(curObj.fetchone()[0])
        print(check)
        return check


    def checkLost(self, id):
        sdObj = standarddashboard()
        curObj = sdObj.con.makeConnection()
        query = f"SELECT status FROM dog where dogID = '"+id+"'"
        curObj.execute(query)
        checkLoss = str(curObj.fetchone()[0])
        print(checkLoss)
        if (checkLoss.lower() == "lost"):
            return id
        else:
            return 0
    def updateMessage(self,update):
        query = "UPDATE credz SET message=? WHERE ID=?"
        update=str(update)
       
        try:
            conn = mariadb.connect(
                user="root",
                password="password",
                # password="UApass123",
                host="192.168.1.155",

                # host="192.168.1.101",
                # port=3307,
                port=3306,
                database="strayed2"
            )
        except mariadb.Error as e:
            print(f"Error connecting to MariaDB Platform: {e}")
            sys.exit(1)
        cur=conn.cursor()
        cur.execute(query, (update,"1"))
        conn.commit()
        return ""
    
    def updateMAcc(self,update):
        query = "UPDATE credz SET message=? WHERE ID=?"
        update=str(update)
       
        try:
            conn = mariadb.connect(
                user="root",
                password="password",
                # password="UApass123",
                host="192.168.1.155",

                # host="192.168.1.101",
                # port=3307,
                port=3306,
                database="strayed2"
            )
        except mariadb.Error as e:
            print(f"Error connecting to MariaDB Platform: {e}")
            sys.exit(1)
        cur=conn.cursor()
        cur.execute(query, (update,"2"))
        conn.commit()
        return ""
    
    
    


    def createNewMatch(self, submissionId, dogId):
        sdObj = standarddashboard()
        query = f"INSERT INTO matches (submissionID, Dog) VALUES ('{submissionId}','{dogId}')"
        
        url = sdObj.getPicture(submissionId)
        if (url == 0):
            url = ""
        try:
            conn = mariadb.connect(
                user="root",
                password="password",
                # password="UApass123",
                host="192.168.1.155",

                # host="192.168.1.101",
                # port=3307,
                port=3306,
                database="strayed2"
            )
        except mariadb.Error as e:
            print(f"Error connecting to MariaDB Platform: {e}")
            sys.exit(1)

        cur = conn.cursor()
        cur.execute(query)

        conn.commit()
        return url

    def getUserEmail(self, dogId):
        sdObj = standarddashboard()
        curObj = sdObj.con.makeConnection()
        query1 = f"SELECT user FROM DOG where dogID ='"+str(dogId)+"'"
        curObj.execute(query1)
        if (curObj != ""):
            userID = str(curObj.fetchone()[0])
            email = sdObj.getEmail(userID)
            if (email != 0):
                return email
            else:
                return 0

    def getPicture(self, submissionID):
        sdObj = standarddashboard()
        curObj = sdObj.con.makeConnection()
        query1 = f"SELECT SubmissionImage FROM Submission where SubmissionID ='" + \
            str(submissionID)+"'"
        curObj.execute(query1)
        url = ""
        match = []
        
        if (curObj != ""):
            curList = list(map(list, curObj))
            i = 0
            for row in curList:
                add = str(row[0])
                url = add
                match.append(add)

            if (url != 0):
                # print(url)
                return url
            else:
                print("no image")
                return 0

    def getEmail(self, userID):
        sdObj = standarddashboard()
        curObj = sdObj.con.makeConnection()
        query1 = f"SELECT email FROM user where userid ='"+str(userID)+"'"
        curObj.execute(query1)
        if (curObj != ""):
            email = str(curObj.fetchone()[0])
        else:
            email = 0

        return email

    def login(self, email, password):
        sdObj = standarddashboard()
        curObj = sdObj.con.makeConnection()
        curObj1 = sdObj.con.makeConnection()
        # print("hello")
        query1 = f"SELECT * FROM user where Email ='"+str(email)+"'"
        curObj.execute(query1)
        curList = list(curObj)

        # Checking to see if email exists in database
        if (len(curList) > 0):
            # This is an acceptable email
            # print("This email is in use")
            query2 = f"SELECT password FROM user where Email = '"+email+"'"
            curObj1.execute(query2)
            checkpass = str(curObj1.fetchone()[0])
            # print(checkpass + " checkpass")
            # print(password + " password")

            # Checking to see if passwords match up
            if (checkpass == password):
                # Passwords match

                print("this email is in use")
                query3 = f"SELECT UserId FROM user where Email = '"+email+"'"
                curObj1.execute(query3)
                ret = str(curObj1.fetchone()[0])
                # print(ret)

            else:
                # Passwords do not match
                print("Passwords do not match")
                ret = 999

        else:
            # This email does not exist
            print("This email does not exist")
            ret = 998
        # print(ret)
        # print("^ return from sdash")
        return (ret)


if __name__ == '__main__':
    sd = standarddashboard()
    sd.userInfo(10)
