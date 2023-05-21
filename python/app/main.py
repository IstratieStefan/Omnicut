import eel
import serial, serial.tools.list_ports
from time import sleep, time
from os import getcwd
from sys import exit

print(getcwd())

eel.init(".\\python\\app\\web")

@eel.expose
def connectBoards(main, second):
    COM_Main = main
    COM_Second = second
    while COM_Main == "" or COM_Second == "":
        portList = serial.tools.list_ports.comports()
        for port in portList:
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
                        print(message, 555, time())
                        if COM_Main == "" and message[0] == 111 and message[1] == 99 and message[2] == 109:
                            return (port.name, "main")
                        if COM_Second == "" and message[0] == 111 and message[1] == 99 and message[2] == 115:
                            return (port.name, "second")
                ser.close()
            except:
                try:
                    ser.close()
                except:
                    pass

#connectBoards("", "")
           

eel.start('index.html')