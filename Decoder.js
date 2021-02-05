const Payloads = {"Standard":1, "Modbus":2, "Heartbeat":3}

function Decoder(bytes, port) 
{
    var decoded = {};
    decoded.DIN1 = bytes[0] & 0x01;      // Discrete digital 1 (1-bit)
    decoded.DIN2 = bytes[0] >> 1 & 0x01; // Discrete digital 2 (1-bit)
    decoded.DIN3 = bytes[0] >> 2 & 0x01; // Discrete digital 3 (1-bit)
    decoded.WKUP = bytes[0] >> 3 & 0x01; // Discrete digital wakeup (1-bit)
    decoded.CRC8 = bytes[10];            // CRC (8-bit)

    if (port == Payloads.Standard) 
    {
        decoded.ADC1 = ((bytes[0] & 0xf0) >> 4) | (bytes[1] << 4); // ADC 1 (12-bit)
        decoded.ADC2 = (bytes[3] & 0x0f) << 8 | bytes[2];          // ADC 2 (12-bit)
        decoded.ADC3 = ((bytes[3] & 0xf0) >> 4) | (bytes[4] << 4); // ADC 3 (12-bit)
        decoded.Modbus = bytes[9] << 8 | bytes[8]; // Modbus-RS485 (16-bit)
    } 
    else if (port == Payloads.Modbus) 
    {
        decoded.Modbus1 = bytes[3] << 8 | bytes[2]; // Modbus-RS485 (16-bit)
        decoded.Modbus2 = bytes[5] << 8 | bytes[4]; // Modbus-RS485 (16-bit)
        decoded.Modbus3 = bytes[7] << 8 | bytes[6]; // Modbus-RS485 (16-bit)
        decoded.Modbus4 = bytes[9] << 8 | bytes[8]; // Modbus-RS485 (16-bit)
    } 
    else if (port == Payloads.Heartbeat) 
    {
        decoded.FirmwareVersion = {
            "major": bytes[2] & 0x0f,        // 4-bit
            "minor": (bytes[2] & 0xf0) >> 4, // 4-bit
            "patch": bytes[3]                // 8-bit
        };
        decoded.FlashMemAvailableKB = (bytes[5] << 8) | bytes[4];   // KB, Available flash memory (16-bit)
        decoded.BatteryLevel = (((bytes[7] & 0x0F) << 8) | bytes[6]) * 4; // ADC battery (12-bit)
        decoded.Temperature = (((bytes[8] << 4) | ((bytes[7] & 0xF0) >> 4)) * 0.125 * 9) / 5 + 32; // ADC temperature (12-bit)
    }
    return decoded;
}