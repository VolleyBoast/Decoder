const Payloads = {"Standard": 1, "Modbus": 2};

function Decoder(bytes, port, fport) 
{
    var payloadType = fport & 0x03;
    var payloadIndex = (fport >> 2) & 0x3f;
    var decoded = {};
    if (payloadIndex == 0) 
    {
        parseCommonPayloadData(bytes, decoded);
    }
    
    switch (payloadType) 
    {
        case Payloads.Standard:
            parseStandardPayload(bytes, decoded);
            break;
        case Payloads.Modbus:
            parseModbusOnlyPayload(bytes, decoded, payloadIndex);
            break;
        default:
            break;
    }
    return decoded;
}

function parseCommonPayloadData(bytes, decoded)
{
    decoded.DIN1 = bytes[0] & 0x01;      // Discrete digital 1 (1-bit)
    decoded.DIN2 = bytes[0] >> 1 & 0x01; // Discrete digital 2 (1-bit)
    decoded.DIN3 = bytes[0] >> 2 & 0x01; // Discrete digital 3 (1-bit)
    decoded.WKUP = bytes[0] >> 3 & 0x01; // Discrete digital wakeup (1-bit)
    decoded.ADC1 = ((bytes[0] & 0xf0) >> 4) | (bytes[1] << 4); // ADC 1 (12-bit)
    decoded.CRC8 = bytes[10];            // CRC (8-bit)
}

function parseStandardPayload(bytes, decoded)
{
    decoded.ADC2 = (bytes[3] & 0x0f) << 8 | bytes[2];          // ADC 2 (12-bit)
    decoded.ADC3 = ((bytes[3] & 0xf0) >> 4) | (bytes[4] << 4); // ADC 3 (12-bit)
    decoded.batteryLevel = ((bytes[6] & 0x0f) << 8) | bytes[5]; // ADC battery (12-bit)
    decoded.Temperature = ((bytes[6] & 0xf0) >> 4) | (bytes[7] << 4);  // Temperature (12-bit)
    decoded.Modbus = bytes[9] << 8 | bytes[8];                 // Modbus-RS485 (16-bit)
}

function parseModbusOnlyPayload(bytes, decoded, payloadIndex)
{
    if (payloadIndex == 0) 
    {
        decoded.Modbus1 = bytes[3] << 8 | bytes[2]; // Modbus-RS485 (16-bit)
        decoded.Modbus2 = bytes[5] << 8 | bytes[4]; // Modbus-RS485 (16-bit)
        decoded.Modbus3 = bytes[7] << 8 | bytes[6]; // Modbus-RS485 (16-bit)
        decoded.Modbus4 = bytes[9] << 8 | bytes[8]; // Modbus-RS485 (16-bit)
    } 
    else 
    {
        decoded.Modbus1 = bytes[1] << 8 | bytes[0]; // Modbus-RS485 (16-bit)
        decoded.Modbus2 = bytes[3] << 8 | bytes[2]; // Modbus-RS485 (16-bit)
        decoded.Modbus3 = bytes[5] << 8 | bytes[4]; // Modbus-RS485 (16-bit)
        decoded.Modbus4 = bytes[7] << 8 | bytes[6]; // Modbus-RS485 (16-bit)
        decoded.Modbus5 = bytes[9] << 8 | bytes[8]; // Modbus-RS485 (16-bit)
        decoded.CRC8 = bytes[10];                   // CRC (8-bit)
    }
}