import eel
import serial, serial.tools.list_ports
from time import sleep

eel.init(".\\eel version\\python\\app\\web")

ser_main = serial.Serial('COM6', baudrate=115200, bytesize=8, parity='N', stopbits=1)
ser_second = serial.Serial('COM5', baudrate=115200, bytesize=8, parity='N', stopbits=1)

@eel.expose()
def readSerial():
    sleep(4.5)
    response = ser_main.read_all().strip().decode("utf-8")
    eel.sendGcodeFeedback(response)

@eel.expose()
def evalGcode(command):
    if command != None:
        ser_main.write((remove_comment(command)+'\n').encode())

def remove_comment(string):
    if string.find(';') == -1:
        return string
    return string[:string.index(';')]

@eel.expose()
def readData():
    if ser_second.in_waiting:
        l = list(ser_second.read_all())
        out = ""
        for item in l:
            if item != 10:
                out += str(item) + ' '
            else:
                out += '\n'
        return out
    else:
        return ""
    
@eel.expose()
def readGRBL():
    try:
        if ser_main.in_waiting:
            return ser_main.read_all().decode()
    
    except:
        return ""
    
    return ""

    

eel.start('index.html', block=True)