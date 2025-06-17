import { OPCUAClient, MessageSecurityMode, SecurityPolicy } from "node-opcua";

async function main() {
  const endpointUrl = "opc.tcp://192.168.0.212:26543";

  const client = OPCUAClient.create({
    securityMode: MessageSecurityMode.None,
    securityPolicy: SecurityPolicy.None,
    endpointMustExist: false,
  });

  try {
    await client.connect(endpointUrl);
    console.log("Connected to OPC UA Server!");

    const session = await client.createSession();
    console.log("Session created!");

    await session.close();
    await client.disconnect();
    console.log("Disconnected");
  } catch (err) {
    console.error("Error:", err);
  }
}

main();
