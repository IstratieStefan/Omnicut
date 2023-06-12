import eel
import serial, serial.tools.list_ports
from time import sleep
from io import StringIO
import sys
from os import getcwd, chdir, path
import json

buffer = StringIO()
sys.stdout = sys.stderr = buffer

print(getcwd())

chdir(path.dirname(sys.argv[0]))

ser_main = ""; ser_second = ""

with open("board_config.json") as f: #Opens and reads data from the JSON file
    data = json.loads(f.read())
    eel.init(data["web_path"])

    ser_main = serial.Serial(data["main"]["port"], baudrate=data["main"]["baudrate"], bytesize=data["main"]["bytesize"], parity=data["main"]["parity"], stopbits=data["main"]["stopbits"]) #Initialises main board
    ser_second = serial.Serial(data["second"]["port"], baudrate=data["second"]["baudrate"], bytesize=data["second"]["bytesize"], parity=data["second"]["parity"], stopbits=data["second"]["stopbits"]) #Initialises second board

@eel.expose()
def readSerial(): #see documentation
    sleep(4.5)
    response = ser_main.read_all().strip().decode("utf-8") #waits for response
    eel.sendGcodeFeedback(response)

@eel.expose()
def evalGcode(command): #see documentation
    if command != None:
        ser_main.write((remove_comment(command)+'\n').encode()) #writes command to GRBL

def remove_comment(string): #see documentation
    if string.find(';') == -1:
        return string
    return string[:string.index(';')]

@eel.expose()
def readData(): #see documentation
    if ser_second.in_waiting:
        l = list(ser_second.read_all()) #separate the output in a value list
        out = ""
        for item in l:
            if item != 10: 
                out += str(item) + ' '
            else: # if the char code is 10 (= '\n'), then append '\n'
                out += '\n'
        return out
    else:
        return ""
    
@eel.expose()
def readGRBL(): #see documentation
    try:
        if ser_main.in_waiting:
            return ser_main.read_all().decode() # returns all available bytes
    except:
        return ""
    
    return ""


eel.start('index.html', block=True)