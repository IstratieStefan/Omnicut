import eel
import serial, serial.tools.list_ports
from time import sleep, time
from threading import Thread
from easygui import fileopenbox

eel.init(".\\python\\app\\web")

COM_Main = ""; COM_Second = ""; ser_sec = ""; ser_main = ""; req = ""

@eel.expose()
def SVGtoGcode(path):
    pass

@eel.expose()
def selectFile():
    path = fileopenbox()
    with open(path, 'r') as f:
        for line in f:
            if req != "":
                if req == 'stop':
                    pass
            print(line)
            sleep(0.3)

@eel.expose()
def doRequest(msg):
    global req
    req = msg;

def lookForPort(port_name):
    global ser_sec, COM_Second, COM_Main
    portList = serial.tools.list_ports.comports()
    for port in portList:
        if port.name != COM_Second and port.name != COM_Main:
            try:
                ser = serial.Serial(port.name)
                ser.baudrate = 115200
                ser.bytesize = 8
                ser.parity = 'N'
                ser.stopbits = 1
                currentTime = time()+3
                while time() < currentTime:
                    print(333)
                    if ser.in_waiting > 0:
                        message = ser.readline()
                        if port_name == "main" and message[0] == 111 and message[1] == 99 and message[2] == 109:
                            ser.close()
                            COM_Main = port.name
                            eel.mainBoardFound()
                        if port_name == "second" and message[0] == 111 and message[1] == 99 and message[2] == 115:
                            COM_Second = port.name
                            ser.close()
                            ser_sec = ser = serial.Serial(port.name)
                            ser.baudrate = 115200
                            ser.bytesize = 8
                            ser.parity = 'N'
                            ser.stopbits = 1
                            eel.secondBoardFound()
                ser.close()
            except:
                try:
                    ser.close()
                except:
                    pass
        sleep(0.5)

def evalGcode(command):
    ser_main.write(command.encode() + str.encode('\n'))
    eel.sendGcodeFeedback(ser_main.readline().strip().decode("utf-8"))

def remove_comment(string):
    if string.find(';') == -1:
        return string
    return string[:string.index(';')]

def boardCommunication():
    ports = [port.name for port in serial.tools.list_ports.comports()]
    if not COM_Main in ports:
        COM_Second = ''
        Thread(target=lookForPort, args=('mian',)).start()

    if COM_Second in ports:
        if ser_sec.in_waiting > 0:
            eel.updateValues(list(ser_sec.readline()))
    else:
        eel.secondBoardDisconnected()
        COM_Second = ''
        Thread(target=lookForPort, args=('second',)).start()
    
    sleep(0.5)

BCthread = Thread(target=boardCommunication)
BCthread.start()

eel.start('index.html', block=True)