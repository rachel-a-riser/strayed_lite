import time
import os
import io
from flask import *
from flask import jsonify
import mariadb
import json
from standarddashboard import *
from mapstuff import *
from DogDAO import *
from UserDAO import *
from SubmissionDAO import *
from MatchesDAO import *
from werkzeug.utils import secure_filename
from flask import Flask, session
from flask_session.__init__ import Session
from flask_mail import Mail, Message
import numpy as np
import PIL
from PIL import Image


app = Flask(__name__)

app.config.from_object(__name__)
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SECRET_KEY'] = "jjlzzfdceycrxjdt"
app.config['MAIL_SERVER'] = "smtp.gmail.com"
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = "uafsstrayed@gmail.com"
app.config['MAIL_PASSWORD'] = "jjlzzfdceycrxjdt"
app.config['TESTING'] = False
app.config['MAIL_SUPRESS_SEND'] = False

mail = Mail(app)
Session(app)

# Check Configuration section for more details

app.config.from_object(__name__)
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)
UPLOAD_FOLDER = 'strayedapp/src/components'
# actually saves to public/postimages
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


class SAPI:
    
    xVar="globalVar"
    

    def __init__(self):
        self.sdash = standarddashboard()
        # sdash contains everything to be rendered on standard user dashboard
        self.map = mapstuff()
        
        # mapstuff contains whats needed to render maps

########################## FOY ROUTES ############################
@app.route('/selfMadeMatches', methods=['GET'])
def selfMadeMatches():
    SAPIobj=SAPI()
    ret=SAPIobj.sdash.matchesSelf(session.get('key'))
    return jsonify(ret)
@app.route('/basic', methods=['GET'])
def basicMethod():
    SAPIobj = SAPI()

    ret = SAPIobj.sdash.databaseMessage()
    print(ret)
    return jsonify(ret)
@app.route('/myDogChoice',methods=['POST'])
def myDogChoice():
    #submissionID, dogID, action
    submissionID=request.form['submissionID']
    dogID=request.form['dogID']
    action=request.form['action']
    print(action)
    print(submissionID)
    SAPIobj=SAPI()
    ret=SAPIobj.sdash.updateMyDog(submissionID,dogID,action)

    Matchobj = MatchesDAO(0, submissionID, dogID)
    Matchobj.insert(Matchobj)
    return jsonify(ret)


@app.route('/accMessage', methods=['GET'])
def accountMessage():
    SAPIobj = SAPI()

    ret = SAPIobj.sdash.accoMessage()
    print(ret)
    return jsonify(ret)
    

    return jsonify(ret)
@app.route('/modelMatch', methods=['GET'])
def sessionPetsMatch():

    if (request.method == 'GET'):
        Dogobj = DogDAO(0,  "", "", "", session.get('key'), "", "")
        ret = Dogobj.SelectSessionDogs(Dogobj)
    # 10 is the userID of the session user

        return jsonify(ret)


@app.route('/match', methods=['POST'])
def match():
    print("/////////////////////////////////////////////////////////match////")
    subid = request.form['id']
    sesid = request.form['sesid']
    print(subid)
    print(sesid)
    #########################################
    Dogobj = DogDAO(sesid,  "", "", "", 0, "", "")
    ownobj = Dogobj.selectOwner(Dogobj)
    Matchobj = MatchesDAO(0, subid, sesid)
    Matchobj.insert(Matchobj)
    return jsonify(0)


@app.route('/Subs')
def subs():

    subobj = SubmissionDAO("", "", "", "", "", "", "", "")
    ret = subobj.SelectAllNoMatches(subobj)

    return jsonify(ret)

@app.route('/shelterSubs')
def subsS():

    subobj = SubmissionDAO("", "", "", "", "", "", "", "")
    ret = subobj.shelter(subobj)

    return jsonify(ret)

@app.route('/fosterSubs')
def subsF():

    subobj = SubmissionDAO("", "", "", "", "", "", "", "")
    ret = subobj.foster(subobj)

    return jsonify(ret)


@app.route('/lost')
def lostDogs():

    Dogobj = DogDAO(0,  "", "Lost", "", 0, "", "")
    ret = Dogobj.SelectLostStatus(Dogobj)

    return jsonify(ret)


@app.route('/ShelterPets')
def subsShelter():

    subobj = SubmissionDAO("", "", "", "shelter", "", "", "", "")
    ret = subobj.SelectAllSheltered(subobj)

    return jsonify(ret)


@app.route("/sendEmail", methods=["POST"])
def send_email():
    print('////////////////////////////////////////////////')
    id = request.form['lostid']
    email = request.form['email']
    contact =request.form['contact']
    print(id)
    print(email)
    # find owner id and email using the dogs id
    Dogobj = DogDAO(id,  "", "", "", 0, "", "")
    obj = Dogobj.selectOwner(Dogobj)
    ownerID = obj.userID

    userobj = UserDAO(ownerID, "", "", "", "")
    obj = userobj.selectUser(userobj)
    con=""
    

    print(obj.Email)
    # Pull in email from session or make SQL call
    emailName = obj.Email
    # msg_title is the subject
    msg_title = "A user may have information on your dog!"
    sender = contact
    msg = Message(msg_title, sender=sender, recipients=[emailName])
    # Example code of how to attach photo :
    # msg.attach('header.gif','image/gif',open(join(mail_blueprint.static_folder, 'header.gif'), 'rb').read(), 'inline', headers=[['Content-ID','<Myimage>'],])
    # Put message msg.body
    msg.body = email+'\n'+"Sender included the following contact information: "+str(contact)
    try:
        mail.send(msg)
        ret = "Email sent..."
        return jsonify(ret)

    except Exception as e:
        print(e)
        ret = f"the email was not sent{e}"
        return jsonify(ret)


@app.route("/sendEmail2", methods=["POST"])
def sendEmailToShelter():
    print('////////////////////////////////////////////////')
    id = request.form['shelterid']
    email = request.form['email']
    print(id)
    print(email)
    # find owner id and email using the dogs id
    Subobj = SubmissionDAO(id, "", "", "", "", "", "", "")
    obj = Subobj.selectOwner(Subobj)
    ownerID = obj.SubmittingUser

    userobj = UserDAO(ownerID, "", "", "", "")
    obj = userobj.selectUser(userobj)
    print(obj.Email)
    # Pull in email from session or make SQL call
    emailName = obj.Email
    # msg_title is the subject
    msg_title = "You have a new notification!"
    sender = "noreply@app.com"
    msg = Message(msg_title, sender=sender, recipients=[emailName])
    # Example code of how to attach photo :
    # msg.attach('header.gif','image/gif',open(join(mail_blueprint.static_folder, 'header.gif'), 'rb').read(), 'inline', headers=[['Content-ID','<Myimage>'],])
    # Put message msg.body
    msg.body = email

    try:
        mail.send(msg)
        ret = "Email sent..."
        return jsonify(ret)

    except Exception as e:
        print(e)
        ret = f"the email was not sent{e}"
        return jsonify(ret)


@app.route('/FosteredPets')
def fosterDogs():

    Dogobj = DogDAO(0,  "", "Foster", "", 0, "", "")
    ret = Dogobj.SelectFosterStatus(Dogobj)

    return jsonify(ret)


##################################### END FOY ROUTES ###############################

########################################## RACHEL ROUTES ############################


@app.route('/singleShelter')
def singleShelter():
    SAPIobj = SAPI()

    ret = SAPIobj.sdash.shelterInfo(session.get('key'))
    print(ret)
    # 10 is the userID of the session user

    return jsonify(ret)


@app.route('/set', methods=['POST'])
def set():
    value = request.form["id"]
    session['key'] = value
    print(session.get('key'))
    return ""


@app.route('/leave', methods=['POST'])
def leave():
    value = request.form["message"]
    session.clear()
    SAPIobj=SAPI()
    SAPIobj.sdash.updateMessage("")
    SAPIobj.sdash.updateMAcc("")

    return ""


@app.route('/sessionUser')
def sessionUser():
    SAPIobj = SAPI()
    ret = SAPIobj.sdash.userInfo(10)
    # 10 is a userID of the session user

    return ret

@app.route("/dismissMatch", methods=['POST'])
def dismiss():
    SAPIobj=SAPI()
    submissionID=request.form['submissionID']
    ret=SAPIobj.sdash.dismissMatch(submissionID,session.get('key'))
    return ret
    
@app.route('/matchDetails', methods=['POST'])
def matchDetails():
    ret2="0"
    
    id = request.form['submissionID']

    print(id)
   
    SAPIobj = SAPI()
    ret = SAPIobj.sdash.matchDetails(id)
    # 10 is the userID of the session user
    print(ret)
    ret2= jsonify(ret)
    return ret2

@app.route('/sessionPets', methods=['POST', 'GET'])
def sessionPets():
    id = 11
    if (request.method == 'POST'):
        id = request.form['id']

        print("Session User ID "+id)
        return ""
    if (request.method == 'GET'):
        SAPIobj = SAPI()
        ret = SAPIobj.sdash.petsInfo(session.get('key'))
    # 10 is the userID of the session user

        return jsonify(ret)
@app.route('/notLost', methods=['POST', 'GET'])
def sessionHomies():
    id = 11
    if (request.method == 'POST'):
        id = request.form['id']

        print("Session User ID "+id)
        return ""
    if (request.method == 'GET'):
        SAPIobj = SAPI()
        ret = SAPIobj.sdash.homeInfo(session.get('key'))
    # 10 is the userID of the session user

        return jsonify(ret)


@app.route('/homepets', methods=['POST', 'GET'])
def sessionPets2():
    id = 11
    if (request.method == 'POST'):
        id = request.form['id']

        print("Session User ID "+id)
        return ""
    if (request.method == 'GET'):
        SAPIobj = SAPI()
        ret = SAPIobj.sdash.petsInfo2(session.get('key'))
    # 10 is the userID of the session user

        return jsonify(ret)


@app.route('/sessionFosters', methods=['POST', 'GET'])
def sessionFosters():
    id = 11
    if (request.method == 'POST'):
        id = request.form['id']
        return ""
        print("Session User ID "+id)
    if (request.method == 'GET'):
        SAPIobj = SAPI()
        ret = SAPIobj.sdash.fostersInfo(session.get('key'))
    # 10 is the userID of the session user

        return jsonify(ret)


@app.route('/communityMap')
def communityMap():
    SAPIobj = SAPI()
    ret = SAPIobj.map.looseSpotted(00)
    return jsonify(ret)
    # arbitrarily putting in 00 for a date parameter


@app.route("/picUpload", methods=['POST'])
def user_upload():
    try:
        SAPIobj = SAPI()
        d = {}

        target = os.path.join(UPLOAD_FOLDER, 'images')
        if not os.path.isdir(target):
            os.mkdir(target)
        file = request.files['file_from_react']

        mywidth = 300
        myh = 200
        filename = secure_filename(file.filename)
        filename = filename.lower()
        destination = "/".join([target, filename])
        # file.save(destination)

        img = Image.open(file, mode='r')
        hpercent = (myh/float(img.size[1]))
        wsize = int((float(img.size[0])*float(hpercent)))
        img = img.resize((wsize, myh), PIL.Image.ANTIALIAS)
        img.save(destination)

        filename = secure_filename(file.filename)
        filename = filename.lower()

        print(f"Uploading file {filename}")

        d['status'] = 1

        destination = "/".join([target, filename])
        # file.save(destination)

    except Exception as e:
        print(f"Couldn't upload file {e}")
        d['status'] = 0

    return ""


@app.route("/petForm", methods=['POST'])
def petForm():

    name = request.form['name']
    id = session.get("key")
    print(id)
    print(name)
    status = request.form['status']
    url = request.form['arr']
    i = 0
    strU = json.dumps(url)
    print("JSON DUMP "+strU)
    print(url)
    # JSON DUMP "[\"doggo.png\",\"doggo2.png\"]"
    dict = strU.split(",")
    print(dict[0])
    i = 0
    photos = ""
    for i in dict:
        photo = ""
        for charac in i:
            if charac.isalpha() or charac == '.' or charac.isnumeric():
                photo = photo+charac

         # this line??
        photos = photos+""+photo

    print("PHOTOS "+photos)
    # photos = photos[1:]
    photos = photos
    description = request.form['description']
    print(description)
    zip = request.form['zip']

    print(zip)
    SAPIobj = SAPI()
    SAPIobj.sdash.addPet(name, photos, description, zip,
                         status, session.get("key"))
    
    time.sleep(2)
    #######################################
    getDogs = []
    newImage = photo[0:-4]
    getDogs = np.load(newImage+'matches.npy')
    ret = SAPIobj.sdash.findDog(getDogs, description)
    #############################################
    # Create match if there is one
    if (len(ret) == 0):
        print("there are no matches right now. ")
    else:
        # Get submission ID
        id = SAPIobj.sdash.getSubmissionID(photo, description)
        if (id != 0):
            # Create new match
            for x in range(len(ret)):
                
                url = SAPIobj.sdash.createNewMatch(id, ret[x])
                sendMatchEmail(ret[x], url)
        else:
            print("there is no submission creatd for this image")
                         
    
    
    
  
    return jsonify(2)


@app.route("/singlePet", methods=['GET', 'POST'])
def singleDog():
    ID = request.form['ID']
    print(ID)
    SAPIobj = SAPI()
    ret = SAPIobj.sdash.singleDogInfo(ID)
    return ret


@app.route("/dogEdit", methods=['GET', 'POST'])
def dogEdit():

    name = request.form['name']
    print(name)
    id = request.form['ID']
    url = request.form['arr']
    status = request.form['status']
    i = 0
    strU = json.dumps(url)
    print("JSON DUMP "+strU)
    # JSON DUMP "[\"doggo.png\",\"doggo2.png\"]"
    dict = strU.split(",")
    print(dict[0])
    i = 0

    description = request.form['description']
    print(description)
    location = request.form['location']

    print(location)
    SAPIobj = SAPI()
    SAPIobj.sdash.dogEdit(name, status, description, location, id)

    return ""

####################################### END RACHEL ROUTES ###########################

 ################################## WILL ROUTES ###################################


@app.route("/login", methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['pswd']
    SAPIobj = SAPI()
    ret = SAPIobj.sdash.login(email, password)
    print(ret)
    if (ret == 999):
        ret = 1
        #change database message
        SAPIobj.sdash.updateMessage("The credentials for the most recent login attempt(s) do not match our records. Please try again.")
       
    elif (ret == 998):
        ret = 2
        SAPIobj.sdash.updateMessage("The credentials for the most recent login attempt(s) do not match our records. Please try again.")
        
        #change database message
    else:
        #change database message
        SAPIobj.sdash.updateMessage("")
        ret = ret

    return jsonify(ret)


@app.route("/createAcc", methods=['POST'])
def createAcc():
    email = request.form['email']
    password = request.form['pswd']
    SAPIobj = SAPI()
    ret = SAPIobj.sdash.createAccount(email, password)
    print(ret)
    print("ret^")
    if (ret == 999):
        ret = ret
        SAPIobj.sdash.updateMAcc("Last attempt(s) included an email that is already in use. Please try another email.")
    elif (ret == 1):
        ret = ret
        SAPIobj.sdash.updateMAcc("")
    return jsonify(ret)


@app.route('/mapAdd', methods=['POST'])
def mapAdd():
    coords = request.form['coords']
    image = request.form['image']
    image = image.lower()
    description = request.form['description']
    location = request.form['location']
    print(coords+""+image+""+description+""+location+"")
    SAPIobj = SAPI()
    SAPIobj.sdash.addToMap(image, description, location, coords)
    time.sleep(10)
    #######################################
    getDogs = []
    newImage = image[0:-4]
    getDogs = np.load(newImage+'matches.npy')
    ret = SAPIobj.sdash.findDog(getDogs, description)
    #############################################
    # Create match if there is one
    if (len(ret) == 0):
        print("there are no matches right now. ")
    else:
        # Get submission ID
        id = SAPIobj.sdash.getSubmissionID(image, description)
        if (id != 0):
            # Create new match
            for x in range(len(ret)):
                
                url = SAPIobj.sdash.createNewMatch(id, ret[x])
                sendMatchEmail(ret[x], url)
        else:
            print("there is no submission creatd for this image")

    return jsonify("")


@app.route('/shelterAdd', methods=['POST'])
def shelterAdd():
    coords = request.form['coords']
    image = request.form['image']
    image = image.lower()
    description = request.form['description']
    location = request.form['location']
    print(coords+""+image+""+description+""+location+"")
    SAPIobj = SAPI()
    SAPIobj.sdash.addToShelter(image, description, location, coords)
    time.sleep(10)
    #######################################
    getDogs = []
    newImage = image[0:-4]
    getDogs = np.load(newImage+'matches.npy')
    
    ret = SAPIobj.sdash.findDog(getDogs, description)
    #############################################
    # Create match if there is one
    if (len(ret) == 0):
        print("there are no matches right now. ")
    else:
        # Get submission ID
        id = SAPIobj.sdash.getSubmissionID(image, description)
        if (id != 0):
            # Create new match
            for x in range(len(ret)):
                url = SAPIobj.sdash.createNewMatch(id, ret[x])
                sendMatchEmail(ret[x], url)
        else:
            print("there is no submission creatd for this image")

    return jsonify("")


def sendMatchEmail(dogId, url):
    SAPIobj = SAPI()
    # getting the email from the dogID
    email = SAPIobj.sdash.getUserEmail(dogId)
    url = "./strayedapp/src/components/images/"+url
    print(url)
    if (email == 0):
        print("error getting email")
    else:
        # msg_title is the subject
        msg_title = "We found a potential match!"
        sender = "noreply@app.com"
        msg = Message(msg_title, sender=sender, recipients=[email])
        msg.body = "Hello, we are pleased to inform you we have found a potential match for your lost pet, check your account now to see!"
        with app.open_resource(url) as fp:
            msg.attach(url, "image/png", fp.read())
        try:
            mail.send(msg)
            return "Email sent..."
        except Exception as e:
            print(e)
            return f"the email was not sent{e}"


# END WILL ROUTES ####################################3

# /singleDog
# /lost dogs
# /community map
# /user's map (all)
# /user's map (1 dog)
