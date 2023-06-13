![Arduino](https://img.shields.io/badge/Arduino-00979D?style=for-the-badge&logo=Arduino&logoColor=white)
![Python](https://img.shields.io/badge/Python-14354C?style=for-the-badge&logo=python&logoColor=white)
![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Html](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Css](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Github](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)

![swag](http://ForTheBadge.com/images/badges/built-with-swag.svg)

<div align="center">
  <h1> Omnicut </h1>
  <p> Omnicut este un sistem CNC Do-It-Yourself (DIY) cu o zonă de lucru spațioasă de 25 cm x 27 cm. Designul modular permite atât funcționalitatea de tăiere sau gravare, cât și de desenare, oferind utilizatorilor multe optiuni a da viață ideilor lor creative. </p>

  ![OMNICUT!](https://github.com/IstratieStefan/Omnicut/blob/main/Renders/Front.PNG)
</div>

# Capitolul I. Utilitate Practica

Omnicut este o mașină cu comandă numerică pe calculator (CNC) ce are capacitatea de a realiza gravuri precise pe laminatul de PCB, pentru a crea circuite și desene, devenind astfel un plotter.

Cu ajutorul programului dedicat, instalat pe calculator, Omnicut transmite cu precizie instrucțiunile G-code către mașina CNC, asigurând astfel executarea desenului sau lucrării de tăiere. Interfața simplă și intuitivă a programului Omnicut facilitează procesul de gravare, oferind o alternativă mult mai simplă și accesibilă față de alte programe CAM, care, adesea, sunt complexe și dificil de utilizat. De asemenea, Omnicut utilizează o sondă Z, cunoscută sub denumirea de z-probe, pentru a asigura o setare ușoară și precisă a poziției axei Z, în contrast cu alte mașini CNC care nu dispun de această funcționalitate.

# Capitolul II. Mecanica

## Secțiunea II.1 Comlpexitate

![Mechanics](https://github.com/IstratieStefan/Omnicut/blob/main/Renders/Top.png)

Omnicut folosește 5 motoare:
 - 4 motoare pas cu pas Nema 17, care permit mișcarea cartesiană a robotului: un motor pentru axa X, doi motoare pentru axa Y și un motor pentru axa Z.
 - Un motor DC 775 in locul unui spindle.

Omnicut funcționează pe baza unui sistem tridimensional cartezian, în care originea este poziționată la o distanță de 1.75mm față de colțul wasteboardului. Această configurare permite mașinii Omnicut să aibă trei grade de libertate, acoperind mișcările pe axele X, Y și Z.

## Secțiunea II.2 Eficiența in construcție

Designul CNC-ului Omnicut a fost conceput astfel încât să utilizeze suruburi trapezoidale de 400 mm pe axele X și Y, eliminând astfel necesitatea de a tăia aceste axe. În plus, componentele CNC-ului sunt realizate prin tehnologia de imprimare 3D, eliminând necesitatea construirii manual a pieselor. Acest aspect contribuie la eficiența și ușurința procesului de asamblare, oferind o soluție completă și convenabilă.

# Capitolul III. Electronica 
![Electronics](https://github.com/IstratieStefan/Omnicut/blob/main/Gallery/Electronics.png)

|Componentă|Cantitate|
|-|-|
|Arduino Uno|2|
|775 DC motor|1|
|Motor pas cu pas Nema 17|4|
|Cnc shield|1|
|Sursă 12V 20A|1|
|i2c LCD|1|
|Encoder rotativ|1|
|Senzor DHT11|2||
|Ventilatoare de 80 de mm|3|
|Buzzer activ|1|

## DHT11

Pentru a monitoriza și controla temperatura și umiditatea în cele două zone importante ale utilajului, respectiv zona de tăiere și zona electronicelor, utilizăm doi senzori DHT11. Acești senzori ne furnizează informații valoroase despre condițiile ambientale, permițându-ne să reglăm temperatura componentelor electronice prin intermediul ventilatoarelor și să detectăm eventuale infiltrări de apă în aparat. Aceste date măsurate și monitorizate ne ajută să menținem condițiile optime de funcționare și să prevenim eventualele probleme legate de temperatură și umiditate.


## Arduino 

Pentru a controla mișcarea uneltei în zona de lucru, utilizăm un Arduino însoțit de un CNC Shield și 4 drivere de motor pas cu pas. Această configurație ne permite să gestionăm în mod precis și eficient deplasarea uneltei în timpul operațiunilor de prelucrare.

De asemenea, Arduino-ul este conectat la un z probe (sondă Z). Această sondă are rolul de a facilita setarea poziției axei Z, oferind informații precise despre nivelul de adâncime sau înălțime a suprafeței de prelucrat. Această conexiune adițională asigură un proces de calibrare simplificat și precis, eliminând erorile potențiale în poziționarea axei Z.

Al doilea Arduino este dedicat monitorizării temperaturii, reglării vitezei ventilatoarelor și spindle-ului, precum și implementării unui sistem de alarmă utilizând un buzzer în cazul în care temperaturile devin ridicate. Acest Arduino este, de asemenea, responsabil de gestionarea meniului LCD.

## 775 Motor

Motorul DC 775 este utilizat în cadrul nostru pentru a realiza operațiuni de gravare și tăiere cu ajutorul unei mandrine ER16 și a unei pensete CNC.

## Nema 17

Motoarele Nema 17 sunt folosite pentru a misca unealta in zona de lucru.

## CNC Shield

CNC shield-ul este folosit pentru a conecta driverele pentru motoarele nema 17 intr-un mod mai simplu.

## Sursa 12V 20A

Noi folosim o sursa de 12V 20A pentru a alimenta cnc-ul.

## LCD i2c

![MENU](https://github.com/IstratieStefan/Omnicut/blob/main/Renders/menu.PNG)
Pentru a oferi o experiență de utilizare ușoară și intuitivă, am integrat în sistemul nostru CNC un ecran LCD în colaborare cu un modul I2C, care permite crearea unui meniu interactiv.

Acest ecran LCD afișează informații importante, precum versiunea firmware-ului, umiditatea și temperatura în ambele părți ale CNC-ului. Utilizatorii pot monitoriza în timp real aceste date pentru a asigura condiții optime de lucru și pentru a identifica eventuale discrepanțe.

În plus, prin intermediul meniului, utilizatorii au posibilitatea de a ajusta vitezele ventilatoarelor și a spindle-ului. 

## Buzzer activ

Buzzer-ul activ este implementat în sistemul nostru pentru a furniza o alertă sonoră în situația în care temperatura aparatului atinge niveluri ridicate.

## Secțiunea III.1 Complexitate

Sistemul nostru mecatronic este un sistem preprogramat care are capacitatea de a rezolva probleme cu date de intrare variabile. Odată ce primește un cod G, sistemul funcționează autonom, fără a necesita intervenția noastră constantă.

Datorită programării prealabile și a capacității de a interpreta și executa codurile G, sistemul nostru mecatronic poate opera independent în procesul de prelucrare. Datele de intrare variabile, precum dimensiunile, vitezele sau traiectoriile, pot fi furnizate prin intermediul codurilor G, iar sistemul va răspunde în consecință.

Această caracteristică oferă un nivel ridicat de automatizare și eficiență în funcționarea sistemului nostru CNC. Operatorul nu trebuie să intervină constant sau să monitorizeze în mod continuu procesul, deoarece sistemul preprogramat gestionează în mod independent sarcinile specifice, în conformitate cu instrucțiunile codului G furnizate.

# Capitolul IV. Software

Omnicut a fost programat într-o varietate de limbaje: C++ (pentru Arduino), HTML, CSS, JavaScript și Python.


Proiectul este alcătuit din 3 componente principale:
<ul>
  <li>Interfața cu utilizatorul - HTML, CSS și JavaScript</li>
  <li>Comunicarea cu plăcile arduino - Python</li>
  <li>Codul de pe arduino - C++</li>
</ul>

## Aplicația

Interfața cu utilizatorul a fost creată folosind HTML, CSS și JavaScript.
Privind aplicația, observăm că aplicația este împărțită în 2 părți principale care apar imediat după ecranul de încărcare. În stânga, avem, începând de sus în jos: o secțiune de poziționare cu 2 subdiviziuni (mișcare relativă și poziția curentă; O zonă de text g-code; Un vizualizator de progres, o zonă z-probe și o consolă. În dreapta, avem un antet cu funcționalitate dublă, cele fiind monitorizarea (monitorizarea stării axului și a ventilatoarelor, precum și vizualizarea temperaturii și umidității curente) și setări de fișiere (deschiderea unui cod g sau a unui fișier SVG, precum și editarea unui Fișier SVG în mai multe moduri); o bară de acțiuni; un vizualizator de cod g și un buton pentru a comuta între funcționalitățile antetului.
Să descriem fiecare parte a proiectului.

### 1. Secțiunea de poziționare

![imagine](https://github.com/IstratieStefan/Omnicut/assets/77077774/fe41300e-3935-4bcd-a98d-3d38d617ec71)

Secțiunea de poziționare este alcătuită din două părți, de vizualizare și de mișcare.
Vizualizarea ne permite să vedem poziția exactă a axului pe cele 3 axe în raport cu punctul de pornire în milimetri (în mod implicit 175 mm din colțul din stânga jos definit atât pe axa X, cât și pe axa Y). Punctul de pornire Z variază în funcție de sarcina care trebuie finalizată, desen sau tăiere). Poziția este determinată prin trimiterea constantă a „?" comanda către GRBL, returnând starea GRBL.
Mișcarea ne permite să mișcăm manual axul în sus, în jos, la stânga, la dreapta, înainte sau înapoi cu un număr de milimetri specificat în caseta de introducere a pasului în raport cu poziția curentă. Valoarea implicită a pasului de intrare este 5 mm. Deplasarea are, de asemenea, un buton de centrare care va trimite mașina la punctul (X:0, Y:0, Z:0) indiferent unde se află. Punctul (X:0, Y:0, Z:0) este punctul de plecare.

### 2. Zona de text G-code

![imagine](https://github.com/IstratieStefan/Omnicut/assets/77077774/fed7584e-f32b-4dfa-8d72-6cee8065a474)

Zona de text g-code este un loc în care codul g dintr-un fișier (sau generat dintr-un SVG) poate fi vizualizat ca text și copiat. Puteți edita direct codul prezent în zona de text pentru a influența comenzile pentru ax, totuși comenzile editate nu vor fi vizibile în vizualizatorul modelului g-code până când apăsați butonul de reîncărcare. Butonul de reîmprospătare nu va funcționa, deoarece acesta relansează modelul svg și îl reconvertește în g-code, astfel încât orice modificare ar fi pierdută. De asemenea, puteți să scrieți sau să lipiți codul g pentru a-l executa.

### 3. Vizualizator de progres

![imagine](https://github.com/IstratieStefan/Omnicut/assets/77077774/95795f19-ecfe-4c32-9e36-7712b859508e)

Vizualizatorul de progres este alcătuit din 2 părți.
Una dintre ele este bara de progres. Acesta numără numărul de comenzi executate din numărul total de comenzi prezente în zona de text după vopsire sau tăiere. Viteza barei de progres nu este constantă, având în vedere că unele comenzi durează mai mult sau mai puțin timp pentru a fi finalizate în comparație cu altele.
A doua parte este un vizualizator de comenzi care ne arată comanda g-code care este în curs de executare/ultima comandă care a fost executată de program.

### 4. Zona sondei Z

![imagine](https://github.com/IstratieStefan/Omnicut/assets/77077774/c572c165-2fab-49d3-9d2f-c92cb79983d3)

Sonda Z este o caracteristică a CNC pentru a se poziționa cu precizie pe axa Z folosind o piesă hardware.
Meniul din aplicație conține o casetă de introducere a vitezei de avans care specifică cât de repede se va mișca axul, precum și un Z maxim sau cât de mult ar trebui să coboare dacă nu este găsită nicio sondă z. După atingerea sondei z, axul se va mișca cu 5 mm în sus și va seta noul sistem de coordonate 0 pe axa Z pe suprafața materialului pe care s-a așezat sonda z.

### 5. Consolă

![imagine](https://github.com/IstratieStefan/Omnicut/assets/77077774/021c07b5-a6c3-46d8-9079-040bd9da700b)

Consola are o zonă de text istoric comenzi, precum și o linie de comandă în care putem scrie o singură linie.
Istoricul comenzilor afișează fiecare comandă executată direct de utilizator, rezultatul comenzilor (cu excepția „ok” implicit returnat de GRBL și cu excepția „sfârșitului” returnat de GRBL după executarea unei comenzi de tip „G”. de „sfârșit” a fost schimbat de noi în codul GRBL) și orice erori/avertismente/mesaje de la GRBL. Comenzile executate de utilizator vor fi afișate cu un „>>>” suplimentar la început.
În linia de comandă, utilizatorul poate scrie comenzi singulare. Comenzile pot fi de natura GRBL, de natura Omnicut sau de natura comenzi g-code suportate GRBL. Comenzile Omnicut încep cu un asterisc.

###### Comenzi de control GRBL
https://github.com/gnea/grbl/blob/master/doc/markdown/commands.md

###### Comenzi de setări GRBL
https://github.com/gnea/grbl/blob/master/doc/markdown/settings.md

###### Comenzi acceptate de GRBL
https://www.cnccookbook.com/g-code-m-code-command-list-cnc-mills/

###### Comenzi Omnicut
|Comandă|Descriere|
|-|-|
|*clear|Șterge istoricul comenzilor|
|*limits|Dezactivează limitarea mișcării CNC|
|*origin|Setează poziția curentă a spindle-ului ca fiind originea sistemului|

### 6. Monitorizare

![imagine](https://github.com/IstratieStefan/Omnicut/assets/77077774/8781b0ec-6889-420e-a66d-dc578eecdf01)

Secțiunea fila Monitorizare este locul unde putem vedea datele despre CNC.
Prima coloană afișează umiditatea și temperatura zonei de lucru.
A doua coloană afișează umiditatea și temperatura zonei componente.
A treia coloană afișează viteza actuală a axului și a celor 3 ventilatoare.

### 7. Setări fișier

![imagine](https://github.com/IstratieStefan/Omnicut/assets/77077774/983db6e3-00b5-4765-9a77-4d8b4627b768)

Secțiunea file setări fișier a fost creată pentru a permite utilizatorului să influențeze modelul încărcat dintr-un SVG. !!! Editorul de modele funcționează doar pentru modelele încărcate din fișiere SVG, nu și pentru fișierele g-code încărcate direct !!!

|Opțiune|Descriere|
|-|-|
|Nivel de creștere|Specifică cât de mult se va ridica axul pentru a se muta într-o altă secțiune a desenului/frezarea fără tăiere. Această valoare este relativă|
|Precizia modelului|Specifică numărul de pixeli din întregul model SVG care va fi utilizat pentru a crea codul g pentru acel SVG. O precizie mai mică va dura mai puțin timp pentru compilare, dar va înrăutăți calitatea desenului|
|Multiplicator de mărime|Un număr care poate crește/scădea dimensiunea unui model|
|Offset X|Specifică cât de mult trebuie să fie deplasat modelul pe axa X (mm)|
|Offset Y|Specifică cât de mult trebuie să fie deplasat modelul pe axa Y (mm)|
|Offset Z|Specifică cât de mult trebuie să fie deplasat modelul pe axa Z (mm)|
|Rata de alimentare|Specifică rata de alimentare pentru un fișier cod-g pe care îl creăm. (viteza de avans recomandată pentru desen = 250; viteza de avans recomandată pentru frezare = 100)|
|Adâncimea treptei|La frezare, specifică cât de mult va coborî axul de fiecare dată când taie modelul (mm)|
|Adancime totala|La frezare, specifica cat trebuie sa taie axul din model (mm)|

Secțiunea de setări de fișier are, de asemenea, o intrare de fișier pentru a încărca un fișier (SVG sau g-code) în model și un buton de reîmprospătare pentru a reîncărca modelul după unele modificări. Tine minte! Orice modificări făcute direct în vizualizatorul text g-code vor fi șterse când apăsați pe reîmprospătare!

### 8. Scrisul

![imagine](https://github.com/IstratieStefan/Omnicut/assets/77077774/dd1db4f5-892f-4708-af11-d3393ef586b1)

Fila de scriere este folosită pentru a adăuga text la modelul dvs. Este alcătuit din mai multe părți:
* **Zona de text** - Acolo scrieți mesajul. „\n” este acceptat
* **Dimensiune** - Specifică dimensiunea textului
* **Font Select** - Selectează un font de utilizat la randarea modelului

O bună practică ar fi să încărcați modelul cu o precizie mai proastă, apoi să îl poziționați și să îl formatați, apoi să îi oferiți în sfârșit o precizie bună pentru a reduce timpul de așteptare.

### 9. Bara de acțiuni

![imagine](https://github.com/IstratieStefan/Omnicut/assets/77077774/9e8dad05-91ea-468d-a3cd-4310c9b009b8)

Bara de acțiuni conține 5 butoane utile care vă vor ajuta să controlați CNC-ul.
Butonul de oprire este folosit pentru a opri complet CNC-ul instantaneu, după ce îl utilizați, poate fi necesar să rulați comanda $X - vedeți comenzi GRBL.
Butonul de pauză este folosit pentru a întrerupe o acțiune/proces în curs de desfășurare.
Butonul de pornire este folosit pentru a relua o acțiune/proces în derulare.
Butonul de desen este folosit pentru a desena modelul curent.
Butonul de frezare este folosit pentru a tăia modelul curent.

Diferența dintre ultimele 2 butoane este că unul dintre ele va parcurge doar o dată prin cod, celălalt va parcurge și va coborî de fiecare dată până când se atinge adâncimea totală.

### 10. Vizualizator de cod G

![imagine](https://github.com/IstratieStefan/Omnicut/assets/77077774/76cf5a01-8785-4d79-9543-a31c1c476f67)

Un vizualizator 3D simplu g-code unde puteți previzualiza modelul. Vă puteți deplasa prin model folosind butoanele mouse-ului.

### 11. Butonul de comutare

![imagine](https://github.com/IstratieStefan/Omnicut/assets/77077774/c94e9adc-2584-4d37-8600-6b91970f861f)

Un buton care comută între modul setări fișiere și modul de monitorizare.

## Utilizarea controlerului

Până în acest moment, doar controlerul Playstation 4 DualShock și controlerul XBOX 360 au fost testate, totuși alte controlere ar trebui să funcționeze bine. Controalele pentru toate controlerele ar trebui să fie cele din imagine.

![image2](https://github.com/IstratieStefan/Omnicut/assets/77077774/fe67cd49-5762-4849-a6b5-c97b2560d69f)

## Control extern

CNC are un sistem de interacțiune cu utilizatorul extern format dintr-un LCD, un encoder și un buton. Este format din 5 pagini

#### 1. Acasă

Afișează titlul proiectului și versiunea

#### 2. Temperatura

Afișează temperatura de sus și de jos a CNC

#### 3. Umiditatea

Afișează umiditatea de sus și de jos a CNC

#### 4. Viteza axului

Afișează viteza actuală a axului. Dacă axul nu se rotește, asigurați-vă că comutatorul de alimentare al axului este pornit.
De asemenea, puteți seta viteza axului în două moduri:
1. Incrementare: Rotiți codificatorul pentru a crește sau a reduce viteza axului
2. Viteză fixă: faceți clic pe butonul codificator pentru a comuta între viteza maximă (100%) și viteza minimă (0%)

#### 5. Ventilatie

Afișează viteza curentă a ventilatoarelor. Dacă ventilatoarele nu se rotesc, asigurați-vă că întrerupătorul general de alimentare este pornit.
Ventilația are două moduri:

##### a) Manual
Vă permite să modificați viteza similară cu axul

##### b) Automat
Se va calcula viteza ventilatoarelor pe baza temperaturii maxime date de cei doi senzori

Puteți comuta între moduri făcând clic pe codificator.

## Programare

Programarea poate fi împărțită în 3 categorii: programare JavaScript (sau principala), programare Python (sau comunicarea cu hardware-ul) și C++ (sau limbajul pe care rulează hardware-ul)

### 1. JavaScript

Există 7 fișiere JavaScript. ``gcode-preview.js`` și ``three.min.js`` sunt folosite pentru a reda modelul 3d și au fost preluate de pe https://gcode-preview.web.app/ . Celelalte 5 sunt un pic mai complicate.

#### `svg2gcode.js`

As the name suggests, this file converts SVG to g-code<br>

`function pyth(x1, y1, x2, y2) -> number`<br>


Returns the distance between two points<br>
`x1 (number)` X of first point<br>
`y1 (number)` Y of first point<br>
`x2 (number)` X of second point<br>
`y2 (number)` Y of second point<br>


`function convert2Gcode(precision, multiplier, feed, offsetX, offsetY, offsetZ) -> string`<br>


Returns a string represented by the g-code obtained from converting the SVG present in `document.getElementById('SVGtransform')`. It is compatible with `SVGPathElement`, `SVGCircleElement`, `SVGRectElement` and `SVGEllipseElement`.<br>
`precision (number)` Specifies the precision of the model<br>
`multiplier (number)` Specifies how much will the model be scaled<br>
`feed (number)` Specifies the movement speed of the spindle<br>
`offsetX (number)` Specifies the offset of the model on the X axis from the origin<br>
`offsetY (number)` Specifies the offset of the model on the Y axis from the origin<br>
`offsetZ (number)` Specifies the offset of the model on the Z axis from the origin<br>


`function raise(direction) -> undefined`<br>


Moves the spindle up or down, based on the input (1 for up, 0 for down)<br>
`direction (boolean)` direction of the action<br>



#### `init-preview.js`

This file initializes and controlls the 3d g-code preview

`function init() -> undefined`<br>


Initializes the 3d preview as the variable `preview`<br>


`function startLoadingProgressive(gcode) -> undefined`<br>


Loads g-code from a string by chunk-size amounts<br>
`gcode (string)` The g-code string that will be loaded<br>

#### `fileInputHandler.js`

This file handles the files given by the user<br>

`function loadModel() -> undefined`<br>

Detects the type of the file (SVG or g-code) and acts accordingly. If the file is g-code type, it will be simply loaded and written in the g-code area. If it is an SVG, it will be converted, the model will be displayed and the text will be written after removing extrusion (since this is a milling CNC)<br>

`function refresh() -> undefined`<br>

Refreshes the model and applies the offsets, scales etc.

`function reload() -> undefined`<br>

Renders exactly the code from the g-code text area<br>

#### `board-readWrite.js`

This file handles the communication with python using `Eel.js`, mainly sending of g-codes.<br>

`function zprobe() -> undefined`<br>

Starts the z-probe

`function readFromSecondBoard() -> undefined`<br>

Reads the data from the secondary arduino board. It waits for a promise. After promise the arrives, the values in the app are updated

`function readFromMainBoard() -> undefined`<br>

Reads the data from GRBL. Evaluates the data based on the type of input. If it is `?` feedback, it updates the position. If it is `ok`, it ignores. If it is `end`, it executes the next command. Otherwise, it prints the output in the command history.

`function ask() -> undefined`<br>

Sends a command to GRBL to fetch the current status<br>

`function draw() -> undefined`<br>

Starts the drawing process<br>

`function cut() -> undefined`<br>

Starts the milling process<br>

`function evalNext() -> undefined`<br>

Evaluates the next command in the command list

`function up() -> undefined`<br>

Moves the spindle up based on the step size<br>

`function down() -> undefined`<br>

Moves the spindle down based on the step size<br>

`function left() -> undefined`<br>

Moves the spindle to the left based on the step size<br>

`function right() -> undefined`<br>

Moves the spindle to the right based on the step size<br>

`function forward() -> undefined`<br>

Moves the spindle forwards based on the step size<br>

`function backward() -> undefined`<br>

Moves the spindle backwards based on the step size<br>

`function center() -> undefined`<br>

Moves the spindle to the start point<br>

`function stopp() -> undefined`<br>

Stops all current processes ASAP and goes in alarm mode<br>

`function pause() -> undefined`<br>

Pauses the current process<br>

`function pause() -> undefined`<br>

Resumes the current process<br>

`function keyUp() -> undefinedundefined`<br>

Checks if the last key is "Enter" and executes the command from the command line<br>

`function sendGcodeFeedback(msg) -> undefined`<br>

Appends a message to the command history<br>

`msg (string)` The message to be appended<br>

`function gamepadconnected(e) -> undefined`<br>

Sets the gamepad index to the index of the recently connected gamepad<br>

`e (event)` Used to get the gamepad index<br>

`function gamepaddisconnected() -> undefined`<br>

Sets the gamepad index to -1, since the gamepad was disconnected

`function readControlls() -> undefined`<br>

Reads what buttons are pressed on the controller and acts accordingly

#### `text2svg.js`

This file is about displaying text on the model

`function text2path(str, x, y, size, font) -> String`<br>

Converts a string to a path using the given parameters

`str (string)` The string to be converted<br>
`x (number)` The X position of the generated text<br>
`y (number)` The Y position of the generated text<br>
`size (number)` The font size of the generated text<br>
`font (font object)` The font that will be used to generate the text<br>

`function loadFont() -> undefined`<br>

Loads a font and saves it for the following renders<br>

`function write() -> undefined`<br>

Converts the text to SVG path using opentype module and loads it in the g-code viewer<br>

### 2. Python

All the python code is contained by the file `main.py`

`(exposed) def readSerial() -> None`<br>

Reads the first message from GRBL, right after it initialises<br>

`(exposed) def evalGcode(command) -> None`<br>

Sends a given command to GRBL<br>

`command (str)` The command to be executed<br>

`def remove_comment(string) -> str`<br>

Removes comments from g-code commands<br>

`string (str)` The command to be cleared from comments<br>

`(exposed) def readData() -> str`<br>

Reads data about temperature, humidity, fan speed and spindle speed<br>

`(exposed) def readGRBL() -> str`<br>

Reads whatever message GRBL might output

_If a function is (exposed), it means that it can be accessed by JavaScript trough Eel_

### 3. C++

The C++ (from Arduino) is made up of two files: `monitoring.ino` and `CNC.ino`

#### `monitoring.ino`

This file contains the code of the secondary board<br>

`void icon()`<br>

Displays the current icon<br>

`void displayHome()`<br>

Displays the home menu<br>

`void displayTemperature()`<br>

Displays the temperature menu<br>

`void displayHumidity()`<br>

Displays the humidity menu<br>

`void displaySpindleSpeed()`<br>

Displays the spindle speed menu<br>

`void displayFanSpeed()`<br>

Displays the fan speed menu<br>

`void setup()`<br>

Sets everything up and initialises pins and the Serial connection<br>

`void loop()`<br>

The loop of the script

#### `CNC.ino`

This file contains the modified GRBL.

We defined a new status as a g-code command end with the message "end" for this status.

You can learn more about GRBL at: https://github.com/grbl/grbl

## Alte

### Eroare index negăsit
![imagine](https://github.com/IstratieStefan/Omnicut/assets/77077774/e71ed4f0-305d-435c-b936-7291ec41ad3a)

Dacă întâmpinați această eroare, înseamnă că calea folderului `web` este incorectă. setați parametrul `web_path` din `board_config.json` la calea folderului `web`.

### Configurarea unui alt dispozitiv

Pentru a configura un alt dispozitiv, trebuie mai întâi să încărcați codul pe cele 2 plăci (rețineți că GRBL-ul folosit în placa principală poate fi găsit în folderul Arduino și nu este GRBL implicit. De asemenea, trebuie să aveți `LiquidCrystal_I2C` și Bibliotecile `dht11` instalate pentru a doua placă)

După aceea, găsiți porturile COM ale celor două plăci și adăugați-le editați în fișierul `board_config.json`.

### Amplasarea axului în poziția de pornire

Poziția de start este considerată a fi la 1,75 cm distanță de ambele axe din colțul negru. Deschideți aplicația, apoi mutați axul în acea poziție. După ce axul este în poziția dorită, redeschideți aplicația și ar trebui să fiți gata! Dacă nu puteți merge la punctul de pornire din cauza limitelor, asigurați-vă că rulați `*limits` pentru a dezactiva limitele. Atenție! După ce rulați comanda `*limits`, CNC-ul nu va împiedica axul să lovească o marjă. Dacă este lovită o marjă, opriți CNC-ul cât mai curând posibil și deconectați USB-urile de la computer, apoi încercați să mutați axul (manual) într-o poziție normală înainte de a reporni aplicația.

# Capitolul V. Design industrial

Piesele au fost modelate in Autodesk Fusion 360 și printate pe o Imprimanta Creality Cr6 se cu PETG pentru o rezistență superioară a pieselor.

Designul nostru a inceput de la [DremelCNC](https://www.instructables.com/DIY-3D-Printed-Dremel-CNC/https://www.instructables.com/DIY-3D-Printed-Dremel-CNC/) si l-am imbunătățit în multe moduri:
- Am înlocuit sistemul de prindere a bazei de la profile de aluminiu cu o placă de lemn. Această schimbare a contribuit la o stabilitate sporită și la o construcție mai solidă a CNC-ului nostru.
- Am ridicat întreaga bază a CNC-ului cu 1 cm.
- Am ajustat diametrele găurilor pentru a se potrivi cu axele noastre mai subțiri. Această modificare ne-a permis să utilizăm componente mai ușoare și mai eficiente, fără a compromite rezistența și stabilitatea generală.
- Am extins lungimea axei Z cu 3 cm pentru a permite prelucrarea materialelor de dimensiuni mai mari și pentru a oferi o gamă mai mare de opțiuni de prelucrare.
- Am creat un suport de unelte modular și ușor de schimbat, ceea ce ne permite să adaptăm CNC-ul nostru la diverse aplicații.
- Am adăugat un compartiment special pentru toate componentele electronice, asigurând astfel o organizare mai bună și o protecție împotriva factorilor externi.
- Am instalat ventilatoare pentru a asigura o bună circulație a aerului și pentru a controla temperatura componentelor în timpul funcționării.
- Am integrat un ecran LCD în designul CNC-ului, oferind un meniu intuitiv și ușor de utilizat pentru a afișa și modifica diferite setări
- Am adăugat un jack de 3.5 mm pentru a conecta un z-probe, permițând o setare mai precisă și ușoară a poziției Z.
- Pentru a asigura curățenia și siguranța utilizatorului, am inclus o carcasă specială pentru CNC, care reduce zgomotul generat de mașină și previne riscul de accidente în cazul proiectilării bucăților de material.

Aceste modificări au contribuit la îmbunătățirea funcționalității, performanței și siguranței CNC-ului nostru, adaptându-l la nevoile specifice și oferind o experiență mai eficientă și mai convenabilă utilizatorilor.

Utilizăm două comutatoare pentru a porni CNC-ul nostru. Unul dintre comutatoare este responsabil pentru alimentarea ventilatoarelor și a motoarelor NEMA17, în timp ce celălalt este dedicat controlului spindle-ului. Am luat această decizie pentru a evita trecerea curentului prin conectorul spindle-ului atunci când acesta nu este utilizat, reducând astfel riscul de electrocutare.

Comutatorul dedicat ventilatoarelor și motoarelor ne permite să activăm sau dezactivăm aceste componente fără a fi nevoie să implicăm conectorul spindle-ului. Aceasta asigură o utilizare sigură a CNC-ului, reducând riscul de accidente sau daune cauzate de curentul electric.

Pe lângă aceasta, comutatorul pentru spindle reprezintă o măsură suplimentară de siguranță în cazul unor situații neașteptate sau defecțiuni. Dacă întâmpinăm probleme în timpul funcționării și trebuie să oprim spindle-ul cât mai rapid posibil, acest comutator ne permite să întrerupem alimentarea imediată, minimizând astfel riscurile și daunele.

Folosirea a două comutatoare separate pentru alimentarea ventilatoarelor și a motoarelor, respectiv pentru spindle, ne ajută să asigurăm un control mai precis și o utilizare mai sigură a CNC-ului, oferindu-ne în același timp posibilitatea de a interveni rapid în situații de urgență.

