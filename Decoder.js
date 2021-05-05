function Decoder(bytes, port, fport) {
    if (fport == 1) {
        return parseStandardPayload(bytes);
    } 
    if (fport > 1) {
        return parseModbusOnlyPayload(bytes);
    } 
}

function parseStandardPayload(bytes)
{
    var decoded = {};
    decoded.DIN1 = bytes[0] & 0x01;      // Discrete digital 1 (1-bit)
    decoded.DIN2 = bytes[0] >> 1 & 0x01; // Discrete digital 2 (1-bit)
    decoded.DIN3 = bytes[0] >> 2 & 0x01; // Discrete digital 3 (1-bit)
    decoded.WKUP = bytes[0] >> 3 & 0x01; // Discrete digital wakeup (1-bit)
    decoded.ADC1 = ((bytes[0] & 0xf0) >> 4) | (bytes[1] << 4); // ADC 1 (12-bit)
    decoded.ADC2 = (bytes[3] & 0x0f) << 8 | bytes[2];          // ADC 2 (12-bit)
    decoded.ADC3 = ((bytes[3] & 0xf0) >> 4) | (bytes[4] << 4); // ADC 3 (12-bit)
    decoded.Battery = ((bytes[6] & 0x0f) << 8 | bytes[5]) * 4; // ADC battery (12-bit)
    if ((bytes[7] >> 7 & 0x01) == 0) {
        decoded.Temperature = (((bytes[6] & 0xf0) >> 4) | (bytes[7] << 4)) * 0.125; // ADC temperature (12-bit) above 0 degrees C
    } else {
        decoded.Temperature = (4096 - (((bytes[6] & 0xf0) >> 4) | (bytes[7] << 4))) * 0.125 * (-1); // ADC temperature (12-bit) below 0 degrees C
    }
    decoded.Modbus = bytes[9] << 8 | bytes[8]; // Modbus-RS485 (16-bit)
    return decoded;
}

function parseModbusOnlyPayload(bytes, decoded)
{
    var decoded = {};
    decoded.Modbus1 = bytes[1] << 8 | bytes[0]; // Modbus-RS485 (16-bit)
    decoded.Modbus2 = bytes[3] << 8 | bytes[2]; // Modbus-RS485 (16-bit)
    decoded.Modbus3 = bytes[5] << 8 | bytes[4]; // Modbus-RS485 (16-bit)
    decoded.Modbus4 = bytes[7] << 8 | bytes[6]; // Modbus-RS485 (16-bit)
    decoded.Modbus5 = bytes[9] << 8 | bytes[8]; // Modbus-RS485 (16-bit)
    return decoded;
}