import eel
import serial, serial.tools.list_ports
from time import sleep

eel.init(".\\eel version\\python\\app\\web")

COM_Main = ""; COM_Second = ""; ser_sec = ""; ser_main = serial.Serial('COM6'); req = ""

ser_main.baudrate = 115200
ser_main.bytesize = 8
ser_main.parity = 'N'
ser_main.stopbits = 1

@eel.expose()
def readSerial():
    sleep(4.5)
    response = ser_main.read_all().strip().decode("utf-8")
    #eel.sendGcodeFeedback(response)

@eel.expose()
def evalGcode(commands):
    global advance
    for command in commands:
        command = remove_comment(command)
        print('Executed: ' + command)
        ser_main.write(command.encode() + str.encode('\n'))
        if '$' in command:
            sleep(0.1)
        else:
            sleep(0.02)
        
        advance = False
        #response = ser_main.read_all().strip().decode("utf-8")
        #print(f"Got response {response}")
        #eel.sendGcodeFeedback(response)

def remove_comment(string):
    if string.find(';') == -1:
        return string
    return string[:string.index(';')]

@eel.expose()
def readData():
    if ser_main.in_waiting:
        message = ser_main.read_all().decode()
        return message
    else:
        return ""

eel.start('index.html', block=True)