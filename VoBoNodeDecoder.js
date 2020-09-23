function Decoder1(bytes, port) {
            // Decode an uplink message from a buffer
            // (array) of bytes to an object of fields.
            var decoded = {};
            decoded.DIN1 = bytes[0] >> 0 & 1;
            decoded.DIN2 = bytes[0] >> 1 & 1;
            decoded.DIN3 = bytes[0] >> 2 & 1;
            decoded.WKUP = bytes[0] >> 3 & 1;
            decoded.ADC1 = parseInt((bytes[1] + bytes[0].substr(0, 4)), 2);
            decoded.ADC2 = parseInt((bytes[3].substr(4, 8) + bytes[2]), 2);
            decoded.ADC3 = parseInt((bytes[4] + bytes[3].substr(0, 4)), 2);
            decoded.Battery = (parseInt((bytes[6].substr(4, 8) + bytes[5]), 2)) * 4; // ADC4
            decoded.Temperature = ((parseInt((bytes[7].concat(bytes[6].substr(0, 4))), 2)) * 0.125 * 9) / 5 + 32;
            decoded.Modbus = parseInt((bytes[9].concat(bytes[8])), 2);
            decoded.CRC8 = parseInt(bytes[10], 2);

            return decoded;
        }
