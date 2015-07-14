#define pLED1 13
#define pLED2 12
#define pLED3 11

void read_serial(){
	char s = Serial.read();
	if(s == 'a')
		turn_function(pLED1);
	if(s == 'b')
		turn_function(pLED2);
	if(s == 'c')
		turn_function(pLED3);
        if(s == 'z'){
	        digitalWrite(13, LOW);
                digitalWrite(12, LOW);
                digitalWrite(11, LOW);
                
        }
        if(s == 'x'
        ){
		digitalWrite(13, HIGH);
                digitalWrite(12, HIGH);
                digitalWrite(11, HIGH);
	        Serial.print(s);
        }
}

void turn_function(int pin){
	digitalWrite(pin, !digitalRead(pin));
}

void setup(){
	Serial.begin(9600);
	pinMode(pLED1, OUTPUT);
	pinMode(pLED2, OUTPUT);
        pinMode(pLED3, OUTPUT);
}

void loop(){
	read_serial();
	delay(300);
}



