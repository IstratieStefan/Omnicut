#include <LiquidCrystal.h>
const int rs = 7, en = 8, d4 = 9, d5 = 10, d6 = 11, d7 = 12;
const int button = 2;

bool ok = 1;
int page = 0;


LiquidCrystal lcd(rs, en, d4, d5, d6, d7);
void setup() {
  pinMode(button, INPUT);
  Serial.begin(9600);
  lcd.begin(16, 2);
  lcd.print("InfoTRON-MOISIL");
}
void loop() {
  //lcd.setCursor(0, 1);
  //lcd.print("Nr.secunde:");
  //lcd.setCursor(12, 1);
  //lcd.print(millis() / 1000);
  //delay(1000);
  if (digitalRead(button) == HIGH){
      if (ok){
          ok = 0;
          page = (page+1)%5;
          Serial.println(page);
      }
  } else {
      ok = 1;
  }
}