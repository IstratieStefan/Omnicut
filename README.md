![Arduino](https://img.shields.io/badge/Arduino-00979D?style=for-the-badge&logo=Arduino&logoColor=white)
![Python](https://img.shields.io/badge/Python-14354C?style=for-the-badge&logo=python&logoColor=white)
![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Html](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Css](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Github](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
![swag](http://ForTheBadge.com/images/badges/built-with-swag.svg)

# Table of Contents

<div align = "center">
  <h1> Omnicut </h1>
  <p> Omnicut is a DIY CNC with a 25 cm by 27 cm work area and a modular design that can cut and draw </p>

  ![OMNICUT!](https://github.com/IstratieStefan/Omnicut/blob/main/Renders/Front.PNG)
</div>

# Components
|Component|Quantity|
|-|-|
|Arduino Uno|2|
|775 motor|1|
|Nema 17 stepper motor|4|
|A4988 stepper controller|4|
|L298N DC motor controller|1|
|Cnc shield|1|
|220v AC led|1|
|12v DC led|1|
|12V 20A power supply|1|
|i2c LCD|1|
|Rotary encoder|1|
|Dth11 sensor|2|
|10 mm Linear rods| |
|LM10UU linear ball bearing|6|
|400mm t8 Leadscrews|3|
|200mm t8 Leadscrews (will need to be cut) |1|
|t8 nuts|4|
|6mm Button|1|
|IEC connector|1|
|80 mm fans|3|
|Flex coupling|4|
|Pasive Buzzer|1|

# CAD

F360 files are provided

# I. Usage

# II. Mechanics

# III. Electronics

# IV. Software

Omnicut was programmed in a variety of languages: C++ (for the Arduino), HTML, CSS, JavaScript and Python.

The project is made up of 3 main components:
<ul>
  <li>The user interface - HTML, CSS and JavaScript</li>
  <li>The comunication with the arduino boards - Python</li>
  <li>The code on the arduino - C++</li>
</ul>

Let's describe each part of the project.
## The application

The user interface was created using HTML, CSS and JavaScript.
Looking at the app, we notice that the app is split into 2 main parts that apear right after the loading screen. On the left, we have, starting from top to bottom: a positioning section with 2 subdivisions (relative movement and current position; A g-code text area; A progress viewer and a console. On the right, we have a header with double functionality, those being monitoring (monitoring the state of the spindle and fans, as well as seeing the current temperature and humidity) and file settings (opening a  g-code or an SVG file, as well as editing an SVG file in multiple ways); an action bar; a g-code viewer and a button to toggle between the functionalities of the header.

### 1. Positioning section

The positioning section is made up of two parts, viewing and moving.
The viewing allows us to view the exact position of the spindle on the 3 axis relative to the starting point in millimeters (by default 175mm from the defined bottom-left corner in both X and Y axis). The Z starting point varries based on the task that must be completed, drawing or cuting). The position is determined by constantly sending the "?" command to GRBL, returning the status of GRBL.
The moving allows us to manually move the spindle up, down, left, right, frowards or backwards by a number of millimeters specified in the step input box relative to the current position. The default value of the step input is 5mm. Moving also has a centering button that will send the machine to the point (X:0, Y:0, Z:0) no matter where it is. The (X:0, Y:0, Z:0) point is the starting point.

### 2. G-code text area

The g-code text area is a place where the g-code from a file (or generated from an SVG) can be viewed as text and copied. You can directly edit the code present in the text area to influence the commands for the spindle, however the edited commands won't be visible in the g-code model viewer until you press the reload button. The refresh button won't work, since this one relaods the svg model and reconverts it into g-code, so any modifications would be lost. You may also directy write or paste g-code to execute it.

### 3. Progress viewer

The progress viewer is made up of 2 parts.
One of them is the progress bar. It counts the number of commands executed out of the total number of commands present in the text area after painting or cuting. The speed of the progress bar is not constant, given that some commands take more or less time to complete compared to others.
The second part is a command viewer that shows us the g-code command that is currently being executed/the last command that was executed by the program.

### 4. Console

The console has a command history text area as well as a command line where we can write a single line.
The command history displays each and every command executed directly by the user, the output of the commands (except the default "ok" returned by the GRBL and except the "end" returned by GRBL after executing a "G" type command. The return of "end" was changed by us in the GRBL code) and any errors/warnings/messages from GRBL. The commands executed by the user will be displayed with an extra ">>> " at the start.
In the command line, the user can write singular commands. The commands can be of GRBL nature, of Omnicut nature or of GRBL supported g-code commands nature. The Omnicut commands start with an asterisk.

###### GRBL control commands
https://github.com/gnea/grbl/blob/master/doc/markdown/commands.md

###### GRBL settings commands
https://github.com/gnea/grbl/blob/master/doc/markdown/settings.md

###### GRBL supported commands
https://www.cnccookbook.com/g-code-m-code-command-list-cnc-mills/

###### Omnicut commands
|Command|Description|
|-|-|
|*clear|Clears the command history|
|*limits|Disables the movement limiting of the CNC|

### 5. Monitoring

The monitoring tab section is where we can see the data about the CNC.
The first column displays the humidity and temperature of the working zone.
The second column displays the humidity and temperature of the components zone.
The third column displays the current speed of the spindle and the 3 fans.

### 6. File settings

The file settings tab section was made to allow the user to influence the model loaded from an SVG. !!! The model editor only works for models loaded from SVG files, not for directly loaded g-code files !!!

|Option|Description|
|-|-|
|Rise level|Specifies how much will the spindle rise to move to another section of the drawing/milling without cutting. This value is relative|
|Model precision|Specifies the number of pixels out of the entire SVG model that will be used to create the g-code for that SVG. A lower precision will take less time to compile, but will make the quality of the drawing worse|
|Size multiplier|A number that can increase/decrease the size of a model|
|Offset X|Specifies how much the model needs to be shifted on the X axis (mm)|
|Offset Y|Specifies how much the model needs to be shifted on the Y axis (mm)|
|Offset Z|Specifies how much the model needs to be shifted on the Z axis (mm)|
|Feed rate|Specifies the feed rate for a g-code file we create. (recommended drawing feed rate = 250; recommended milling feed rate = 100)|
|Step depth|When milling, specifies how much will the spindle go lower each time it cuts the model (mm)|
|Total depth|When milling, specifies how much does the spindle needs to cut out of the model (mm)|

The file settings section also has a file input to load a file (SVG or g-code) into the model and a refresh button to reload the model after some modifications. Remember! Any modifications directly made in the text g-code viewer will be deleted when you hit refresh!

### 7. Action bar

The action bar contains 5 useful buttons that will help you control the CNC.
The stop button is used to completely stop the CNC instantly, after you use it, you might need to run the $X command - see GRBL commands.
The pause button is used to pause a running action/process.
The start button is used to resume a running action/process.
The drawing button is used to draw the current model.
The milling button is used to cut the current model.

The difference between the last 2 buttons is that one of them will only cycle once trough the code, the other one will cycle and lower every time until the total depth is reached.

### 8. G-code viewer

A simple g-code 3d viewer where you can preview the model. You can move around the model using the mouse buttons.

### 9. Toggle button

A button that toggles between the file settings mode and the monitoriong mode.


## Controller usage

Up to this point in time, only Playstation 4 DualShock controller and XBOX 360 controller have been tested, however other controllers should work just fine. The controlls for all controllers should be the ones from the image.

![image2](https://github.com/IstratieStefan/Omnicut/assets/77077774/fe67cd49-5762-4849-a6b5-c97b2560d69f)

## Programming

You can find the programming documentation in the Documentation folder.
