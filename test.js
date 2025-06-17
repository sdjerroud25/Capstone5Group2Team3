import pkg from 'node-opcua';
const {
    OPCUAClient,
    MessageSecurityMode,
    SecurityPolicy,
} = pkg;

async function browseRecursive(session, nodeId, indent = "") {
    try {
        const browseResult = await session.browse(nodeId);
        for (const ref of browseResult.references || []) {
            console.log(`${indent}- ${ref.browseName.name} (${ref.nodeId.toString()})`);
            // Recurse into each child node
            await browseRecursive(session, ref.nodeId, indent + "  ");
        }
    } catch (err) {
        console.error("Browse error at", nodeId.toString(), ":", err.message);
    }
}

async function main() {
    const endpointUrl = "opc.tcp://192.168.0.212:26543";

    const client = OPCUAClient.create({
        securityMode: MessageSecurityMode.None,
        securityPolicy: SecurityPolicy.None,
        endpointMustExist: false,
    });

    try {
        await client.connect(endpointUrl);
        console.log(" Connected to OPC UA Server!");

        const session = await client.createSession();
        console.log(" Session created!");

        const objectsFolder = "ns=0;i=85"; // Standard Objects folder
        console.log("Browsing starting from Objects folder...\n");

        await browseRecursive(session, objectsFolder);

        await session.close();
        console.log("\n Session closed.");
        await client.disconnect();
        console.log(" Disconnected.");
    } catch (err) {
        console.error(" Error:", err.message);
    }
}

main();
