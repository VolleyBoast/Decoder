//var bytes= [0b11110011, 0b00110000, 0b00111111, 0b00010011, 0b00000000, 0b01001010, 0b00100011, 0b00001011, 0b11010010, 0b00000100, 0b01011111];
function Decoder(bytes, port) {
            var decoded = {};
            decoded.DIN1 = bytes[0] & 0x01;
            decoded.DIN2 = bytes[0] >> 1 & 0x01;
            decoded.DIN3 = bytes[0] >> 2 & 0x01;
            decoded.WKUP = bytes[0] >> 3 & 0x01;
            decoded.ADC1 = ((bytes[0] & 0xf0) >> 4) | (bytes[1] << 4);
            decoded.ADC2 = (bytes[3] & 0x0f) << 8 | bytes[2];
            decoded.ADC3 = ((bytes[3] & 0xf0) >> 4) | (bytes[4] << 4);
            decoded.Battery = ((bytes[6] & 0x0f) << 8 | bytes[5]) * 4; // ADC4
            decoded.Temperature = ((((bytes[6] & 0xf0) >> 4) | (bytes[7] << 4)) * 0.125 * 9) / 5 + 32;
            decoded.Modbus = bytes[9] << 8 | bytes[8];
            decoded.CRC8 = bytes[10];
            return decoded;
        }