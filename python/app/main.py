import eel
import serial, serial.tools.list_ports
from time import sleep, time
from os import getcwd
from sys import exit
from threading import Timer

print(getcwd())

eel.init(".\\python\\app\\web")

@eel.expose
def connectBoards(main, second):
    COM_Main = main
    COM_Second = second
    while COM_Main == "" or COM_Second == "":
        portList = serial.tools.list_ports.comports()
        for port in portList:
            print(port.name, COM_Main=="", COM_Second=="")
            if port.name != COM_Main and port.name != COM_Second:
                try:
                    ser = serial.Serial(port.name)
                    ser.baudrate = 115200
                    ser.bytesize = 8
                    ser.parity = 'N'
                    ser.stopbits = 1
                    currentTime = time()+3
                    while time() < currentTime:
                        if ser.in_waiting > 0:
                            message = ser.readline()
                            print(list(message))
                            if COM_Main == "" and message[0] == 111 and message[1] == 99 and message[2] == 109:
                                ser.close()
                                return (port.name, "main")
                            if COM_Second == "" and message[0] == 111 and message[1] == 99 and message[2] == 115:
                                ser.close()
                                startUpdates(port.name)
                                return (port.name, "second")
                    ser.close()
                except:
                    try:
                        ser.close()
                    except:
                        pass
            sleep(0.5)

@eel.expose
def wr(text):
    print(text[0])
    f = open("test.gc", 'w')
    f.write(text)
    f.close()

def startUpdates(port):
    global sec
    sec = serial.Serial(port)
    sec.baudrate = 115200
    sec.bytesize = 8
    sec.parity = 'N'
    sec.stopbits = 1
    updates()

def startCNC(port):
    global cnc
    cnc = serial.Serial(port)
    cnc.baudrate = 115200
    cnc.bytesize = 8
    cnc.parity = 'N'
    cnc.stopbits = 1

@eel.expose
def sendGcode(command):
    cnc.write(command + str.encode('\n'));

def updates():
    if sec.in_waiting > 0:
        message = sec.readline()
        eel.updateValues(list(message))
        print(message[4])
    Timer(1.0, updates).start()

#connectBoards("", "")
           

eel.start('index.html', block=True)