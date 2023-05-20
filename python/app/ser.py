"""import serial, serial.tools.list_ports
from time import sleep

print(serial.tools.list_ports.comports()[0])

ser = serial.Serial('COM3')

ser.baudrate = 115200
ser.bytesize = 8
ser.parity = 'N'
ser.stopbits = 1

while True:
    ser.write(input('baga date: ').encode())
"""