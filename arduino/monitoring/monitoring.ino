#include <LiquidCrystal_I2C.h>
#include <dht11.h>

const int address = 32; // Adresa pentru I2C
const int dualMotorDriver_ENA = 0, dualMotorDriver_IN1 = 1, dualMotorDriver_IN2 = 2, dualMotorDriver_IN3 = 3, dualMotorDriver_IN4 = 4, dualMotorDriver_ENB = 5; // Pinii de la dual motor driver
const int supTempLim = 40, infTempLim = 40, supHumidLim = 1000, infHumidLim = 1000; // Limitele senzorilor
const int topSensors = A0, bottomSensors = A1; // Pinii analogi ai senzorilor de temperatura & umiditate inferiori si superiori
const int buzzer = 6, button = 7; // Pinul de buzzer si cel de buton
const int fanSpeed = 11; // Trebuie sa aiba ~; control viteza ventilatoare
const int encoderCLK = 8, encoderDT = 9, encoderSW = 10; // Pinii encoderului
int page = 0; // Pagina (de pe LCD: 0 = home, 1 = temperatura, 2 = umiditate, 3 = viteza spindle, 4 = viteza ventilatoare) la care ne aflam
bool ok = 1; // Tine minte daca butonul a fost lasat
float currentBottomTemperature = 0, currentBottomHumidity = 0, currentTopTemperature = 0, currentTopHumidity = 0, currentSpindleSpeed = 0, currentFanSpeed = 0; // Valorile senzorilor/vitezelor
int chk;
int counter = 0, currentStateCLK, lastStateCLK; // Valori pentru encoder

LiquidCrystal_I2C LCD(address, 16, 2);

dht11 DHT11;

byte begin[] = {
  B01111,
  B11000,
  B10000,
  B10000,
  B10000,
  B10000,
  B11000,
  B01111
};

byte end[] = {
  B11110,
  B00011,
  B00001,
  B00001,
  B00001,
  B00001,
  B00011,
  B11110
};

byte endFill[] = {
  B11110,
  B00011,
  B11001,
  B11101,
  B11101,
  B11001,
  B00011,
  B11110
};

byte beginFill[] = {
  B01111,
  B11000,
  B10011,
  B10111,
  B10111,
  B10011,
  B11000,
  B01111
};

byte middle[] = {
  B11111,
  B00000,
  B00000,
  B00000,
  B00000,
  B00000,
  B00000,
  B11111
};

byte middleFill[] = {
  B11111,
  B00000,
  B11011,
  B11011,
  B11011,
  B11011,
  B00000,
  B11111
};

void startAnimation(){
    // Animatia de inceput
}

void updateValues(){
    chk = DHT11.read(topSensors);
    currentTopHumidity = (float)DHT11.humidity;
    currentTopTemperature = (float)DHT11.temperature;
    chk = DHT11.read(bottomSensors);
    currentBottomHumidity = (float)DHT11.humidity;
    currentBottomTemperature = (float)DHT11.temperature;
}

void displayHome(){
    LCD.setCursor(0, 0);
    LCD.print("Omnicut");
    LCD.setCursor(0, 1);
    LCD.print("V: 1.1");
}

void displayTemperature(){
    LCD.setCursor(0, 0);
    LCD.print("Temperatura:");
    LCD.setCursor(0, 1);
    LCD.print(currentTopTemperature);
    LCD.print(" ");
    LCD.print(currentBottomTemperature);
}

void displayHumidity(){
    LCD.setCursor(0, 0);
    LCD.print("Umiditate:");
    LCD.setCursor(0, 1);
    LCD.print(currentTopHumidity);
    LCD.print(" ");
    LCD.print(currentBottomHumidity);
}

void displaySpindleSpeed(){
    LCD.setCursor(0, 0);
    LCD.print("Viteza spindle:");
    LCD.setCursor(0, 1);
    LCD.print(currentSpindleSpeed);
}

void displatFanSpeed(){
    LCD.setCursor(0, 0);
    LCD.print("Viteza ventilatoare:");
    LCD.setCursor(0, 1);
    LCD.print(currentFanSpeed);
}

void setup(){
    pinMode(encoderCLK, INPUT);
	pinMode(encoderDT, INPUT);
	pinMode(encoderSW, INPUT_PULLUP);
    LCD.begin(16, 2);
    displayHome();
    pinMode(button, INPUT);
    startAnimation();
    Serial.begin(115200);
    lastStateCLK = digitalRead(encoderCLK);
}

void loop(){
    if (digitalRead(button) == HIGH){
        if (ok){
            ok = 0;
            page = (page+1)%5;
        }
    } else {
        ok = 1;
    }

    updateValues();

    LCD.clear();

    switch (page){
        case 0:
            displayHome();
            break;
        
        case 1:
            displayTemperature();
            break;

        case 2:
            displayHumidity();
            break;

        case 3:
            displaySpindleSpeed();
            break;
        
        case 4:
            displatFanSpeed();
            break;
    }
    
    Serial.print(""); // Comunicarea cu python
    delay(50);
}