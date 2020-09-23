function Decoder(bytes, port) {
  // Decode an uplink message from a buffer
  // (array) of bytes to an object of fields.

  var decoded = {};

  decoded.DIN1 = bytes[0] >> 0 & 1;
  decoded.DIN2 = bytes[0] >> 1 & 1;
  decoded.DIN3 = bytes[0] >> 2 & 1;
  decoded.WKUP = bytes[0] >> 3 & 1;
  decoded.ADC1 = parseInt(("00000000".substr(bytes[1].toString(2).length) + bytes[1].toString(2)+("00000000".substr(bytes[0].toString(2).length) + bytes[0].toString(2)).substr(0,4)),2);
  decoded.ADC2 = parseInt(("00000000".substr(bytes[3].toString(2).length) + bytes[3].toString(2)).substr(4,8)+("00000000".substr(bytes[2].toString(2) .length) + bytes[2].toString(2)),2);
  decoded.ADC3 = parseInt(("00000000".substr(bytes[4].toString(2).length) + bytes[4].toString(2)+("00000000".substr(bytes[3].toString(2).length) + bytes[3].toString(2)).substr(0,4)),2);
  decoded.Battery = (parseInt(("00000000".substr(bytes[6].toString(2).length) + bytes[6].toString(2)).substr(4,8)+("00000000".substr(bytes[5].toString(2) .length) + bytes[5].toString(2)),2)) * 4;
  decoded.Temperature = ((parseInt(("00000000".substr(bytes[7].toString(2).length) + bytes[7].toString(2)+("00000000".substr(bytes[6].toString(2).length) + bytes[6].toString(2)).substr(0,4)),2)) * 0.125 *9)/5+32;
  decoded.Modbus = parseInt(("00000000".substr(bytes[9].toString(2).length) + bytes[9].toString(2))+("00000000".substr(bytes[8].toString(2).length) + bytes[8].toString(2)),2);
  decoded.CRC8 = parseInt(("00000000".substr(bytes[10].toString(2).length) + bytes[10].toString(2)),2);

  return decoded;
}