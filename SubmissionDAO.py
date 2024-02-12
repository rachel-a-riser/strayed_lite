import json
from connect import *


class SubmissionDAO():

    def __init__(self, SubmissionID, SubmissionImage, SubmissionDescription, Type, Date, SubmittingUser, Location, Coordinates):
        self.con = connect()
        self.submissionID = SubmissionID
        self.SubmissionImage = SubmissionImage
        self.SubmissionDescription = SubmissionDescription
        self.Type = Type
        self.Date = Date
        self.SubmittingUser = SubmittingUser
        self.Location = Location
        self.Coordinates = Coordinates

    def SelectAllNoMatches(self, *_args):
        dobj = SubmissionDAO("", "", "", "", "", "", "", "")
        cur = dobj.con.makeConnection()
        print("Select all submissions with no matches")

        cur.execute(
            "select * from submission where Type LIKE 'spotted_anon%' ")
        returnmatrix = []
        for row in cur:
            line = ""
            for item in row:

                line = line+str(item)+","
            line = line[0:-1]
            print(line)
            linearr = line.split(",")

            i = 0
            buildjs = ["SubmissionID", "SubmissionImage", "SubmissionDescription", "Type",
                       "Date", "SubmittingUser", "Location", "Coordinates"]

            dict = {}
            while i < len(linearr):

                dict[buildjs[i]] = linearr[i]
                i = i+1
            returnmatrix.append(dict)

        return (returnmatrix)
    
    def shelter(self, *_args):
        dobj = SubmissionDAO("", "", "", "", "", "", "", "")
        cur = dobj.con.makeConnection()
        print("Select all submissions with no matches")

        cur.execute(
            "select * from submission where Type LIKE 'shelter%' ")
        returnmatrix = []
        for row in cur:
            line = ""
            for item in row:

                line = line+str(item)+","
            line = line[0:-1]
            print(line)
            linearr = line.split(",")

            i = 0
            buildjs = ["SubmissionID", "SubmissionImage", "SubmissionDescription", "Type",
                       "Date", "SubmittingUser", "Location", "Coordinates"]

            dict = {}
            while i < len(linearr):

                dict[buildjs[i]] = linearr[i]
                i = i+1
            returnmatrix.append(dict)

        return (returnmatrix)
    def foster(self, *_args):
        dobj = SubmissionDAO("", "", "", "", "", "", "", "")
        cur = dobj.con.makeConnection()
        print("Select all submissions with no matches")

        cur.execute(
            "select * from submission where Type LIKE 'foster%' ")
        returnmatrix = []
        for row in cur:
            line = ""
            for item in row:

                line = line+str(item)+","
            line = line[0:-1]
            print(line)
            linearr = line.split(",")

            i = 0
            buildjs = ["SubmissionID", "SubmissionImage", "SubmissionDescription", "Type",
                       "Date", "SubmittingUser", "Location", "Coordinates"]

            dict = {}
            while i < len(linearr):

                dict[buildjs[i]] = linearr[i]
                i = i+1
            returnmatrix.append(dict)

        return (returnmatrix)

    def SelectAllSheltered(self, *_args):
        dobj = SubmissionDAO("", "", "", "Shelter", "", "", "", "")
        cur = dobj.con.makeConnection()
        print("Select all sheltered")

        cur.execute(
            "select * from submission where Type =%s", (self.Type,))
        returnmatrix = []
        for row in cur:
            line = ""
            for item in row:

                line = line+str(item)+","
            line = line[0:-1]
            print(line)
            linearr = line.split(",")

            i = 0
            buildjs = ["SubmissionID", "SubmissionImage", "SubmissionDescription", "Type",
                       "Date", "SubmittingUser", "Location", "Coordinates"]

            dict = {}
            while i < len(linearr):

                dict[buildjs[i]] = linearr[i]
                i = i+1
            returnmatrix.append(dict)

        return (returnmatrix)
    

    def selectOwner(self, *_args):
        subobj = SubmissionDAO("", "", "", "", "", "", "", "")
        cur = subobj.con.makeConnection()
        cur.execute(
            "SELECT * FROM Submission WHERE SubmissionID=%s", (self.submissionID,))
        for (SubmissionID, SubmissionImage, SubmissionDescription, Type, Date, SubmittingUser, Location, Coordinates) in cur:
            obj = SubmissionDAO(SubmissionID, SubmissionImage, SubmissionDescription,
                                Type, Date, SubmittingUser, Location, Coordinates)
        return obj
