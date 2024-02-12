#!/usr/bin/python 
import mariadb
import sys

class connect:
    def __init__(self):
        ""
    
 
        

        
    def makeConnection(self):

        try:
            conn = mariadb.connect(
                user="root",
                password="password",
                host="192.168.1.155",
                #10.95.111.153
                
                #host="10.95.111.153",
                port=3306,
                database="strayed2"
            )
            print("success")
        except mariadb.Error as e:
            print(f"Error connecting to MariaDB Platform: {e}")
            sys.exit(1)
       
        cur = conn.cursor()
        print("connected")
       
        
        return cur
    
    def setCon(con):
        con=con
        return con
def main():
    c=connect()
    c.makeConnection()
if __name__=="__main__":
    main()

    