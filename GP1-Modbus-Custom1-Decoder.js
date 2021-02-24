//var bytes= [0b00000111, 0b11010010, 0b00000100, 0b11010010, 0b00000100, 0b11010010, 0b00000100, 0b11010010, 0b00000100, 0b00000000, 0b11001010];
function Decoder(bytes, port) {
            var decoded = {};
            decoded.DIN1 = bytes[0] & 0x01; // Discrete digital 1 (1-bit)
            decoded.DIN2 = bytes[0] >> 1 & 0x01; // Discrete digital 2 (1-bit)
            decoded.DIN3 = bytes[0] >> 2 & 0x01; // Discrete digital 3 (1-bit)
            decoded.WKUP = bytes[0] >> 3 & 0x01; // Discrete digital wakeup (1-bit)
	    decoded.BatteryLevel = (((bytes[0] & 0xf0) >> 4) | (bytes[1] << 4)) * 4; // ADC battery (12-bit)
	    decoded.Modbus1 = bytes[3] << 8 | bytes[2]; // Modbus-RS485 (16-bit)
	    decoded.Modbus2 = bytes[5] << 8 | bytes[4]; // Modbus-RS485 (16-bit)
	    decoded.Modbus3 = (bytes[7] << 24 | bytes[6] << 16 | bytes[9] << 8 | bytes[8]) >>> 0; // Modbus-RS485 (32-bit)
            decoded.CRC8 = bytes[10]; // CRC (8-bit)
            return decoded;
}
