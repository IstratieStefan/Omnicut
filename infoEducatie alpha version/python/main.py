import eel
import serial, serial.tools.list_ports
from os import getcwd
from time import sleep, time
from threading import Timer

print(getcwd())

eel.init(".\\infoEducatie alpha version\\python\\web")

def update():
    x = ser.readline()
    print(x)
    eel.updateValues(list(x))
    Timer(2, target=update).start()

def startUpdates(port):
    global ser
    ser = serial.Serial(port)
    ser.baudrate = 115200
    ser.bytesize = 8
    ser.parity = 'N'
    ser.stopbits = 1
    update()

COM = ""
while COM == "":
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
                    if message[0] == 111 and message[1] == 99 and message[2] == 115:
                        ser.close()
                        COM = port.name
                        startUpdates(COM)

            ser.close()
        except:
                try:
                    ser.close()
                except:
                    pass
        sleep(0.5)

eel.start('index.html', mode='chrome', size=(720, 405))