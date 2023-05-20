import eel
import serial, serial.tools.list_ports
from time import sleep

eel.init("C:\\Users\\Matei\\Desktop\\test\\web")

@eel.expose
def connectMainBoard():
    found = False
    while not found:
        portList = serial.tools.list_ports.comports()
        for port in portList:
            ser = serial.Serial(port.device)
            ser.baudrate = 115200
            ser.bytesize = 8
            ser.parity = 'N'
            ser.stopbits = 1
            if ser.in_waiting:
                if ser.readline().decode() == "omnicut-B1":
                    found = True
        sleep(0.5)
    

connectMainBoard()
           

eel.start('index.html')