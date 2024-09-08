// Define pins for the HC-SR04 sensor
const int trigPin = 12;
const int echoPin = 13;

// Define the distance range (in centimeters) for a "good" measurement
const int minDistance = 10; // Minimum distance in cm
const int maxDistance = 20; // Maximum distance in cm

void setup() {
  // Start serial communication
  Serial.begin(9600);

  // Set the trigger pin as output and echo pin as input
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  // Variables to store duration and distance
  long duration;
  int distance;

  // Clear the trigger pin
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);

  // Set the trigger pin high for 10 microseconds to send the pulse
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  // Read the echo pin
  duration = pulseIn(echoPin, HIGH);

  // Calculate the distance in centimeters
  distance = duration * 0.0344 / 2;

  // Print the distance to the Serial Monitor
  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");

  // Check if the distance is within the "good" range
  if (distance >= minDistance && distance <= maxDistance) {
    Serial.println("Distance is good.");
  } else {
    Serial.println("Distance is not good.");
  }

  // Wait before taking another measurement
  delay(1000);
}
