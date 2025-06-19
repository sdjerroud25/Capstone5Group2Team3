import mqtt from 'mqtt';
import * as fs from 'fs/promises';

const configPath = './tags.json';
let tags: string[] = [];

// Connect to MQTT broker
const mqttClient = mqtt.connect('mqtt://192.168.0.211');

// Load tag topics from config
async function loadTags() {
  try {
    const configData = await fs.readFile(configPath, 'utf-8');
    tags = JSON.parse(configData);
    console.log('Loaded tag topics:', tags);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error loading tags.json:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
    process.exit(1);
  }
}

// Subscribe and listen to tag updates
async function setupMqttSubscriptions() {
  await loadTags();

  mqttClient.on('connect', () => {
    console.log('✅ Connected to MQTT broker');

    for (const topic of tags) {
      mqttClient.subscribe(topic, (err) => {
        if (err) {
          console.error(`❌ Failed to subscribe to topic "${topic}":`, err.message);
        } else {
          console.log(`📡 Subscribed to "${topic}"`);
        }
      });
    }
  });

  mqttClient.on('message', (topic, payload) => {
    try {
      const json = JSON.parse(payload.toString());
      console.log(`\n===== ${topic} =====`);
      console.log(JSON.stringify(json, null, 2));
    } catch (err) {
      console.error(`Error parsing JSON from topic "${topic}":`, err);
    }
  });

  mqttClient.on('error', (err) => {
    console.error('MQTT error:', err);
  });
}

// Start the MQTT tag reader
setupMqttSubscriptions();
