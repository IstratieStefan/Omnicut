#include <LiquidCrystal_I2C.h>
#include <dht11.h>

const short DHTPin1 = 4, DHTPin2 = 7;
const short button = 2, vent = 5, buzzer = 3;
const short enc1 = 11, enc2 = 12, encP = 6;
const short enB = 10, in3 = 8, in4 = 9;
short currentTopHumidity, currentBottomHumidity, currentTopTemperature, currentBottomTemperature;
short currentFanSpeed = 0, currentSpindleSpeed = 0;
short currentFanStage = 0;
short aState, aLastState;
int counter = 0;
const short fanLimits[][2] = {{5, 0}, {25, 150}, {35, 200}, {70, 250}, {100, 255}}, limitLength = 5;
char data[] = {'o', 'c', 's', (char)1, (char)1, (char)1, (char)1, (char)1, (char)1};

bool ok = 1, alert = 0, ok2, ok3 = 1, fanMode = 0;
short page = 0, lastPage = 1, progress = 50;

int chk, i;

byte temp1[] = {
  B00000,
  B00001,
  B00010,
  B00100,
  B00100,
  B00100,
  B00100,
  B00111
};

byte temp2[] = {
  B00000,
  B10000,
  B01011,
  B00100,
  B00111,
  B00100,
  B00111,
  B11100
};

byte temp3[] = {
  B00111,
  B00111,
  B00111,
  B01111,
  B11111,
  B11111,
  B01111,
  B00011
};

byte temp4[] = {
  B11111,
  B11100,
  B11100,
  B11110,
  B11111,
  B11111,
  B11110,
  B11000
};

byte hum1[] = {
  B00000,
  B00001,
  B00011,
  B00011,
  B00111,
  B01111,
  B01111,
  B11111
};

byte hum2[] = {
  B00000,
  B10000,
  B11000,
  B11000,
  B11100,
  B11110,
  B11110,
  B11111
};

byte hum3[] = {
  B11111,
  B11111,
  B11111,
  B01111,
  B00111,
  B00000,
  B00000,
  B00000
};

byte hum4[] = {
  B11111,
  B11111,
  B11111,
  B11110,
  B11100,
  B00000,
  B00000,
  B00000
};

byte fan1[] = {
  B00000,
  B00000,
  B00000,
  B00011,
  B00111,
  B00111,
  B00111,
  B00011
};

byte fan2[] = {
  B00000,
  B00000,
  B00000,
  B00000,
  B00000,
  B01110,
  B11111,
  B11111
};

byte fan3[] = {
  B11111,
  B11111,
  B01110,
  B00000,
  B00000,
  B00000,
  B00000,
  B00000
};

byte fan4[] = {
  B11000,
  B11100,
  B11100,
  B11100,
  B11000,
  B00000,
  B00000,
  B00000
};

byte mid[] = {
  B11111,
  B00000,
  B00000,
  B00000,
  B00000,
  B00000,
  B00000,
  B11111
};

byte midFill[] = {
  B11111,
  B00000,
  B11011,
  B11011,
  B11011,
  B11011,
  B00000,
  B11111
};

byte gear1[] = {
  B00000,
  B00000,
  B00000,
  B11001,
  B11111,
  B01111,
  B01100,
  B11100
};

byte gear2[] = {
  B00000,
  B00000,
  B00000,
  B10011,
  B11111,
  B11110,
  B00110,
  B00111
};

byte gear3[] = {
  B11100,
  B01100,
  B01111,
  B11111,
  B11001,
  B00000,
  B00000,
  B00000
};

byte gear4[] = {
  B00111,
  B00110,
  B11110,
  B11111,
  B10011,
  B00000,
  B00000,
  B00000
};

dht11 DHT11;

LiquidCrystal_I2C lcd(0x27, 16, 2);

void icon(){
  lcd.setCursor(0, 0);
  lcd.write(0);
  lcd.setCursor(1, 0);
  lcd.write(1);
  lcd.setCursor(0, 1);
  lcd.write(2);
  lcd.setCursor(1, 1);
  lcd.write(3);
}

void displayHome(){
    lcd.setCursor(4, 0);
    lcd.print("Omnicut");
    lcd.setCursor(2, 1);
    lcd.print("Versiunea 6.4");
}

void displayTemperature(){
    icon();
    lcd.setCursor(3, 0);
    lcd.print("Temperatura:");
    lcd.setCursor(4, 1);
    lcd.print(currentTopTemperature);
    lcd.setCursor(6, 1);
    lcd.print((char)223);
    lcd.setCursor(7, 1);
    lcd.print("C");

    lcd.setCursor(10, 1);
    lcd.print(currentBottomTemperature);
    lcd.setCursor(12, 1);
    lcd.print((char)223);
    lcd.setCursor(13, 1);
    lcd.print("C"); 
}

void displayHumidity(){
    icon();
    lcd.setCursor(3, 0);
    lcd.print("Umiditate:");
    lcd.setCursor(4, 1);
    lcd.print(currentTopHumidity);
    lcd.setCursor(6, 1);
    lcd.print("%");

    lcd.setCursor(10, 1);
    lcd.print(currentBottomHumidity);
    lcd.setCursor(12, 1);
    lcd.print("%");
}

void displaySpindleSpeed(){
    icon();
    lcd.setCursor(3, 0);
    lcd.print("Spindle:");
    lcd.setCursor(10, 0);
    lcd.print(currentSpindleSpeed*100/255);
    lcd.setCursor(12, 0);
    lcd.print("%");
}

void displayFanSpeed(){
    icon();
    lcd.setCursor(3, 0);
    lcd.print("Vent:");
    lcd.setCursor(10, 0);
    lcd.print(currentFanSpeed*100/255);
    lcd.setCursor(12, 0);
    lcd.print("%");
    lcd.setCursor(15, 0);
    lcd.print(fanMode?"M":"A");
}

void displayProgress(){
    lcd.setCursor(0, 0);
    lcd.print("Progres:");
    lcd.setCursor(10, 0);
    lcd.print(progress);
    lcd.setCursor(12, 0);
    lcd.print("%");
}

void setup() {
  Serial.begin(9600);
  pinMode(vent, OUTPUT);
  pinMode(buzzer, OUTPUT);
  pinMode(button, INPUT);
  pinMode (enc1, INPUT);
  pinMode (enc2, INPUT);
  pinMode (encP, INPUT_PULLUP);
  pinMode(enB, OUTPUT);
  pinMode(in3, OUTPUT);
  pinMode(in4, OUTPUT);
  aLastState = digitalRead(enc1);
  digitalWrite(in3, HIGH);
  digitalWrite(in4, LOW);
  lcd.init();
  lcd.clear();         
  lcd.backlight(); 
  lcd.createChar(4, mid);
  lcd.createChar(5, midFill);
}
void loop() {
  aState = digitalRead(enc1);
  
  ++counter;
  
  //Serial.println(counter);
  if (counter == 50000){
    Serial.println("ct");
    counter = 0;
    chk = DHT11.read(DHTPin1);
    currentTopHumidity = round((float)DHT11.humidity);
    currentTopTemperature = round((float)DHT11.temperature);
    
    chk = DHT11.read(DHTPin2);
    currentBottomHumidity = round((float)DHT11.humidity);
    currentBottomTemperature = round((float)DHT11.temperature);
    
    if (!fanMode){
      if (!(currentTopTemperature <= fanLimits[currentFanStage][0] && currentBottomTemperature <= fanLimits[currentFanStage][0] && (currentTopTemperature > fanLimits[currentFanStage-1][0] && currentBottomTemperature > fanLimits[currentFanStage-1][0]))){
        for (i = 0, ok2 = 1; i < limitLength && ok2; ++i){
          if (currentTopTemperature <= fanLimits[i][0] && currentBottomTemperature <= fanLimits[i][0]) {
            ok2 = 0;
            currentFanSpeed = fanLimits[i][1];
            currentFanStage = i;
          }
        }
        analogWrite(vent, currentFanSpeed);
        if (currentFanSpeed == 255){
          digitalWrite(buzzer, HIGH);
          alert = 1;  
        } else if (alert){
          alert = 0;
          digitalWrite(buzzer, LOW);
        }
        if (page == 4){
          for (i = currentFanSpeed*13/255+2; i > 2; i--){
            lcd.setCursor(i, 1);
            lcd.write(5); 
          }
          for (i = currentFanSpeed*13/255+3; i < 16; i++){
            lcd.setCursor(i, 1);
            lcd.write(4); 
          } 
        }
      }
    }
  }
  
  if (digitalRead(button) == HIGH){
      if (ok){
        ok = 0;
        page = (page+1)%6;
      }
  } else {
    ok = 1;
  }
  
  if (lastPage != page){
    lcd.clear();
     lastPage = page;
     switch (page){
      case 0:
        displayHome();
        break;
      
      case 1:
        lcd.createChar(0, temp1);
        lcd.createChar(1, temp2);
        lcd.createChar(2, temp3);
        lcd.createChar(3, temp4);
        displayTemperature();
        break;

      case 2:
        lcd.createChar(0, hum1);
        lcd.createChar(1, hum2);
        lcd.createChar(2, hum3);
        lcd.createChar(3, hum4);
        displayHumidity();
        break;

      case 3:
        lcd.createChar(0, gear1);
        lcd.createChar(1, gear2);
        lcd.createChar(2, gear3);
        lcd.createChar(3, gear4);
        displaySpindleSpeed();
        break;
      
      case 4:
        lcd.createChar(0, fan1);
        lcd.createChar(1, fan2);
        lcd.createChar(2, fan3);
        lcd.createChar(3, fan4);
        displayFanSpeed();
        break;
          
      case 5:
        displayProgress();
        break;
    }
  }
  switch (page){
    case 1:
      lcd.setCursor(4, 1);
      lcd.print(currentTopTemperature);
      lcd.setCursor(10, 1);
      lcd.print(currentBottomTemperature);
      break;

    case 2:
      lcd.setCursor(4, 1);
      lcd.print(currentTopHumidity);
      lcd.setCursor(4, 1);
      lcd.print(currentBottomHumidity);
      break;
        
    case 5:
      for (i = progress*16/100-1; i >= 0; i--){
        lcd.setCursor(i, 1);
        lcd.write(5); 
      }
      for (i = progress*16/100; i < 16; i++){
        lcd.setCursor(i, 1);
        lcd.write(4); 
      }
      break;
  }
  
  if (aState != aLastState){
    if (page == 4 && fanMode){
      if (digitalRead(enc2) != aState) {
        currentFanSpeed += 13;
        if (currentFanSpeed > 255){
          currentFanSpeed = 255;
        }
      } else {
        currentFanSpeed -= 13;
        if (currentFanSpeed < 0){
          currentFanSpeed = 0;
        }
      }
      if (currentFanSpeed > 80){
         analogWrite(vent, currentFanSpeed);
      }
      for (i = currentFanSpeed*13/255+2; i > 2; i--){
        lcd.setCursor(i, 1);
        lcd.write(5); 
      }
      for (i = currentFanSpeed*13/255+3; i < 16; i++){
        lcd.setCursor(i, 1);
        lcd.write(4); 
      }
    } else if (page == 3){
      if (digitalRead(enc2) != aState) {
        currentSpindleSpeed += 13;
        if (currentSpindleSpeed > 255){
          currentSpindleSpeed = 255;
        }
      } else {
        currentSpindleSpeed -= 13;
        if (currentSpindleSpeed < 0){
          currentSpindleSpeed = 0;
        }
      }
      analogWrite(enB, currentSpindleSpeed);
      for (i = currentSpindleSpeed*13/255+2; i > 2; i--){
        lcd.setCursor(i, 1);
        lcd.write(5); 
      }
      for (i = currentSpindleSpeed*13/255+3; i < 16; i++){
        lcd.setCursor(i, 1);
        lcd.write(4); 
      }
    }
  } 
  aLastState = aState;

  if (digitalRead(encP) == HIGH){
    if (ok3){
      ok3 = 0;
      if (page == 4){
        fanMode = !fanMode;
        currentFanStage = -1;
        currentFanSpeed = 0;
        lcd.setCursor(15, 0);
        lcd.print(fanMode?"M":"A");
        analogWrite(vent, 0);
        for (i = currentFanSpeed*13/255+2; i > 2; i--){
        lcd.setCursor(i, 1);
        lcd.write(5); 
        }
        for (i = currentFanSpeed*13/255+3; i < 16; i++){
          lcd.setCursor(i, 1);
          lcd.write(4); 
        }
      }
    }
  } else {
    ok3 = 1;
  }
  /*
  data[3] = currentTopTemperature+1;
  data[4] = currentBottomTemperature+1;
  data[5] = currentTopHumidity+1;
  data[6] = currentBottomHumidity+1;
  data[7] = currentFanSpeed+1;
  data[8] = currentSpindleSpeed+1;
  //Serial.println(data);*/
}