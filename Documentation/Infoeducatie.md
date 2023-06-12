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

