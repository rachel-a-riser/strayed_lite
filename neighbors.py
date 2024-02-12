from tensorflow.keras.applications.inception_v3 import InceptionV3
from tensorflow.keras.applications.inception_v3 import preprocess_input
from tensorflow.keras.preprocessing import image
from tensorflow.keras.preprocessing.image import img_to_array
from sklearn.cluster import KMeans
from sklearn.neighbors import NearestNeighbors
import pandas as pd
import numpy as np
from tqdm import tqdm
import os
import sys
import shutil
from PIL import Image
from matplotlib import pyplot as plt
from matplotlib import image as mpimg
import subprocess
import time

filename='./strayedapp/src/components/images/'+str(sys.argv[1])
args='python ./detect/yolov7-object-cropping/detect_and_crop.py --weights ./detect/yolov7-object-cropping/yolov7.pt --source='+filename+' --no-trace'
subprocess.call(args, shell=True)
#shutil.copy(filename,'./detect/yolov7-object-cropping/crop/'+str(sys.argv[1]))



with open('names.txt', 'r') as file:
    contents1 = file.read()
    names = contents1.split('\n')
    print(len(names))


    #for x in range(len(names)):
        #print(names[x])
file.close()


#img_features=np.array(img_features, dtype=float)
#np.save('out.npy',img_features)
nbz=[]

features=np.load('out.npy')
print(features.shape)
model = InceptionV3(weights='imagenet', include_top=True)
this=os.path.join('.detect/crop/', str(sys.argv[1]))
imgTest=image.load_img(os.path.join('./detect/yolov7-object-cropping/crop', str(sys.argv[1])),target_size=(299,299))
xTest=img_to_array(imgTest)
xTest=np.expand_dims(xTest,axis=0)
xTest=preprocess_input(xTest)
featTest=model.predict(xTest)
featTest=featTest.flatten()
print(featTest.shape)

neigh = NearestNeighbors(n_neighbors=10, radius=0.2)
neigh.fit(features)
fname=sys.argv[1][0:-4]
fname=fname+'matches.npy'
count=0

matches=neigh.kneighbors([featTest], 10, return_distance=True)
for i in matches[1][0]:
  
  dis=matches[0][0][count]
  
  print(str(dis)+",")
	
  #img = Image.open('.detect/yolov7-object-cropping/crop/'+str(names[i]))
  print(str(names[i]))
  #f = open(os.path.join('./strayedapp/src/components/images', str(sys.argv[1])), "a")
  if (dis<=.303761):
    nbz.append(str(names[i]))


  #img.show()
  count=count+1
with open('names.txt', 'a') as file:
  file.write(str(sys.argv[1])+'\n')

print(nbz)
result = np.vstack((features, featTest))
np.save('out.npy',result)
nbz=np.array(nbz,dtype=str)
np.save(fname,nbz)
    #for x in range(len(names)):
        #print(names[x])
file.close()


