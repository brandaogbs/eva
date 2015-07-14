#define pRELAY1 12
#define pRELAY2 11
#define pRELAY3 10
#define pRELAY4 9


void read_serial(){
	char s = Serial.read();
	if(s == 'a')
		 digitalWrite(pRELAY1, HIGH);
	if(s == 'b')
		 digitalWrite(pRELAY2, HIGH);
	if(s == 'c')
		 digitalWrite(pRELAY3, HIGH);
	if(s == 'd')
		 digitalWrite(pRELAY4, HIGH);
        if(s == 'A')
		 digitalWrite(pRELAY1, LOW);
	if(s == 'B')
		 digitalWrite(pRELAY2, LOW);
	if(s == 'C')
		 digitalWrite(pRELAY3, LOW);
	if(s == 'D')
		 digitalWrite(pRELAY4, LOW);
        if(s == 'X'){
	        digitalWrite(pRELAY1, LOW);
                digitalWrite(pRELAY2, LOW); 
                digitalWrite(pRELAY3, LOW);
                digitalWrite(pRELAY4, LOW);   
        }
        if(s == 'x'){
	        digitalWrite(pRELAY1, HIGH);
                digitalWrite(pRELAY2, HIGH);
                digitalWrite(pRELAY3, HIGH);
                digitalWrite(pRELAY4, HIGH);
	        Serial.print(s);
        }
}

void setup(){
	Serial.begin(9600);
	pinMode(pRELAY1, OUTPUT);
	pinMode(pRELAY2, OUTPUT);
	pinMode(pRELAY3, OUTPUT);
	pinMode(pRELAY4, OUTPUT);
}

void loop(){
	read_serial();
	delay(300);
}




