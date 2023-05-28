import serial, serial.tools.list_ports
from time import sleep

"""
The mm traveled per revolution of your stepper motor. This is dependent on your belt drive gears or lead screw pitch. ~ 2mm
The full steps per revolution of your steppers (typically 200) ~ 200
The microsteps per step of your controller (typically 1, 2, 4, 8, or 16). Tip: Using high microstep values (e.g., 16) can reduce your stepper motor torque, so use the lowest that gives you the desired axis resolution and comfortable running properties. ~ 16
The steps/mm can then be calculated like this: steps_per_mm = (steps_per_revolution*microsteps)/mm_per_rev ~ 200*16/2 = 1600
"""

print(serial.tools.list_ports.comports())
print([port.name for port in serial.tools.list_ports.comports()])
ser = serial.Serial('COM6')

ser.baudrate = 115200
ser.bytesize = 8
ser.parity = 'N'
ser.stopbits = 1

ser.write(str.encode("\r\n\r\n"))
sleep(2)
ser.flushInput()
print('Sending GCode')

GCODE_FILE = [
     "G0 X0 Y-0.0001", "b", "a"
]

def remove_comment(string):
    if string.find(';') == -1:
        return string
    return string[:string.index(';')]

sleep(4)

ser.write(str.encode('G0X0Y0') + str.encode('\n'))

"""for line in GCODE_FILE:
    cmd_gcode = remove_comment(line)
    cmd_gcode = cmd_gcode.strip()
    if (cmd_gcode.isspace() is False and len(cmd_gcode) > 0):
        print('Sending: ' + cmd_gcode)
        ser.write('$$'.encode() + str.encode('\n'))
        print(555)
        while not ser.in_waiting:
            pass
        grbl_out = ser.readline()
        print(grbl_out.strip().decode("utf-8"))
        grbl_out = ser.readline()
        print(grbl_out.strip().decode("utf-8"))
        grbl_out = ser.readline()
        print(grbl_out.strip().decode("utf-8"))
        grbl_out = ser.readline()
        print(grbl_out.strip().decode("utf-8"))
        grbl_out = ser.readline()
        print(grbl_out.strip().decode("utf-8"))
        grbl_out = ser.readline()
        print(grbl_out.strip().decode("utf-8"))
        grbl_out = ser.readline()
        print(grbl_out.strip().decode("utf-8"))
        grbl_out = ser.readline()
        print(grbl_out.strip().decode("utf-8"))
        grbl_out = ser.readline()
        print(grbl_out.strip().decode("utf-8"))
        grbl_out = ser.readline()
        print(grbl_out.strip().decode("utf-8"))

    #ser.write(str.encode('G0X0Y0Z0') + str.encode('\n'))
"""
ser.close()