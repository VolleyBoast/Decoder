//var bytes= [0b11110011, 0b00110000, 0b00111111, 0b00010011, 0b00000000, 0b01001010, 0b00100011, 0b00001011, 0b11010010, 0b00000100, 0b01011111];
function Decoder(bytes, port) {
            var decoded = {};
            decoded.DIN1 = bytes[0] & 0x01; // Discrete digital 1 (1-bit)
            decoded.DIN2 = bytes[0] >> 1 & 0x01; // Discrete digital 2 (1-bit)
            decoded.DIN3 = bytes[0] >> 2 & 0x01; // Discrete digital 3 (1-bit)
            decoded.WKUP = bytes[0] >> 3 & 0x01; // Discrete digital wakeup (1-bit)
            decoded.ADC1 = ((bytes[0] & 0xf0) >> 4) | (bytes[1] << 4); // ADC 1 (12-bit)
            decoded.ADC2 = (bytes[3] & 0x0f) << 8 | bytes[2]; // ADC 2 (12-bit)
            decoded.ADC3 = ((bytes[3] & 0xf0) >> 4) | (bytes[4] << 4); // ADC 3 (12-bit)
            decoded.Battery = ((bytes[6] & 0x0f) << 8 | bytes[5]) * 4; // ADC battery (12-bit)
            decoded.Temperature = ((((bytes[6] & 0xf0) >> 4) | (bytes[7] << 4)) * 0.125 * 9) / 5 + 32; // ADC temperature (12-bit)
            decoded.Modbus = bytes[9] << 8 | bytes[8]; // Modbus-RS485 (16-bit)
            decoded.CRC8 = bytes[10]; // CRC (8-bit)
            return decoded;
        }
