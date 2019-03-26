import store from "./store";
import * as actions from "./actions";

const strings = [
  "$GPGLL,5133.81,N,00042.25,W*75",
  "$TA|0140",
  "$MP|0.22|0.55|0.27|0.61|9.75|0.34",
  "$GPVTG,054.7,T,034.4,M,005.5,N,010.2,K",
  "$GPGLL,5133.94,N,00042.37,W*77",
  "$TA|0120",
  "$GPVTG,054.7,T,034.4,M,005.5,N,009.1,K",
  "$MP|0.80|0.50|0.10|0.30|9.81|0.10",
  "$GPGSA,A,3,19,28,14,18,27,22,31,39,,,,,1.7,1.0,1.3*35",
  "$GPGLL,5133.89,N,00042.37,W*77",
  "$GPGSA,A,3,,,,,,16,18,,22,24,,,3.6,2.1,2.2*3C",
  "$GPVTG,054.7,T,034.4,M,005.5,N,008.4,K",
  "$TA|0100",
  "$MP|0.92|0.53|0.16|0.38|9.81|0.04",
  "$GPGLL,5134.03,N,00042.27,W*75",
  "$GPVTG,054.7,T,034.4,M,005.5,N,007.5,K",
  "$TA|0090",
  "$GPVTG,054.7,T,034.4,M,005.5,N,006.8,K",
  "$TA|0080",
  "$GPGLL,5134.12,N,00042.21,W*77",
  "$MP|0.37|0.41|0.23|0.45|9.81|0.25",
  "$GPGLL,5134.23,N,00042.16,W*75",
  "$GPGLL,5134.30,N,00042.10,W*77",
  "$MP|0.47|0.74|0.52|0.26|9.74|0.76",
  "$GPVTG,054.7,T,034.4,M,005.5,N,008.6,K",
  "$TA|0110",
  "$GPVTG,054.7,T,034.4,M,005.5,N,010.0,K",
  "$TA|0135",
  "$GPGLL,5134.38,N,00042.05,W*75",
  "$GPGLL,5134.45,N,00042.01,W*77",
  "$MP|0.34|0.56|0.38|0.30|9.99|0.02",
  "$-- "
];

var count = 0;

export function updateBluetooth() {
  var btString = strings[count];
  if (btString.substring(1, 3) == "GP") {
    if (btString.substring(3, 6) == "VTG") {
      store.dispatch(
        actions.updateSpeed(parseFloat(btString.substring(31, 36)))
      );
      console.log("VTG");
    } else if (btString.substring(3, 6) == "GSA") {
      console.log("GSA");
    } else if (btString.substring(3, 6) == "GLL") {
      store.dispatch(
        actions.updateCoords({
          latitude: parseFloat(btString.substring(7, 14)),
          longitude: parseFloat(btString.substring(17, 25))
        })
      );
      console.log("GLL");
    } else {
      console.log("Bluetooth Error 2.");
    }
  } else if (btString.substring(1, 3) == "MP") {
    store.dispatch(
      actions.updateAccel({
        accelX: parseFloat(btString.substring(19, 23)),
        accelY: parseFloat(btString.substring(24, 28)),
        accelZ: parseFloat(btString.substring(29, 33))
      })
    );
    store.dispatch(
      actions.updateGyro({
        gyroX: parseFloat(btString.substring(4, 8)),
        gyroY: parseFloat(btString.substring(9, 13)),
        gyroZ: parseFloat(btString.substring(14, 18))
      })
    );
    console.log("MP");
  } else if (btString.substring(1, 3) == "TA") {
    store.dispatch(actions.updateTach(parseFloat(btString.substring(4, 8))));
    console.log("TA");
  } else if (btString.substring(1, 3) == "--") {
    count = -1;
  } else {
    console.log("Bluetooth Error 1.");
  }
  count++;
}
