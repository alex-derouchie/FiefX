import store from "./store";
import * as actions from "./actions";

//Sample of messages collected from embedded system for demonstration mode
const strings = [
  "$GPGLL,0045.4206,N,00075.6789,W*75",
  "$TA|0140",
  "$MP|0.22|0.55|0.27|0.61|9.75|0.34",
  "$GPVTG,054.7,T,034.4,M,005.5,N,010.2,K",
  "$GPGLL,0045.4209,N,00075.6791,W*77",
  "$TA|0120",
  "$GPVTG,054.7,T,034.4,M,005.5,N,009.1,K",
  "$MP|0.80|0.50|0.10|0.30|9.81|0.10",
  "$GPGSA,A,3,19,28,14,18,27,22,31,39,,,,,1.7,1.0,1.3*35",
  "$GPGLL,0045.4212,N,00075.6795,W*77",
  "$GPGSA,A,3,,,,,,16,18,,22,24,,,3.6,2.1,2.2*3C",
  "$GPVTG,054.7,T,034.4,M,005.5,N,008.4,K",
  "$TA|0100",
  "$MP|0.92|0.53|0.16|0.38|9.81|0.04",
  "$GPGLL,0045.4215,N,00075.6797,W*75",
  "$GPVTG,054.7,T,034.4,M,005.5,N,007.5,K",
  "$TA|0090",
  "$GPVTG,054.7,T,034.4,M,005.5,N,006.8,K",
  "$TA|0080",
  "$GPGLL,0045.4218,N,00075.6800,W*77",
  "$TA|0085",
  "$MP|0.37|0.41|0.23|0.45|9.81|0.25",
  "$TA|0090",
  "$GPGLL,0045.4221,N,00075.6802,W*75",
  "$TA|0095",
  "$MP|0.47|0.74|0.52|0.26|9.74|0.76",
  "$TA|0100",
  "$GPGLL,0045.4224,N,00075.6805,W*77",
  "$MP|0.46|0.76|0.50|0.28|9.71|0.79",
  "$GPVTG,054.7,T,034.4,M,005.5,N,008.6,K",
  "$TA|0110",
  "$GPVTG,054.7,T,034.4,M,005.5,N,008.9,K",
  "$TA|0135",
  "$GPGLL,0045.4227,N,00075.6807,W*75",
  "$TA|0130",
  "$GPGSA,A,3,,,,,,16,18,,22,24,,,3.6,2.1,2.2*3C",
  "$MP|0.83|0.52|0.08|0.31|9.80|0.09",
  "$GPGSA,A,3,,,,,,16,18,,22,24,,,3.6,2.1,2.2*3C",
  "$GPGLL,0045.4230,N,00075.6810,W*77",
  "$TA|0133",
  "$GPGSA,A,3,,,,,,16,18,,22,24,,,3.6,2.1,2.2*3C",
  "$GPGSA,A,3,,,,,,16,18,,22,24,,,3.6,2.1,2.2*3C",
  "$GPGLL,0045.4232,N,00075.6811,W*77",
  "$GPVTG,054.7,T,034.4,M,005.5,N,007.2,K",
  "$GPGSA,A,3,,,,,,16,18,,22,24,,,3.6,2.1,2.2*3C",
  "$MP|0.34|0.56|0.38|0.30|9.99|0.02",
  "$GPGLL,0045.4233,N,00075.6812,W*75",
  "$TA|0129",
  "$GPGSA,A,3,,,,,,16,18,,22,24,,,3.6,2.1,2.2*3C",
  "$GPGSA,A,3,,,,,,16,18,,22,24,,,3.6,2.1,2.2*3C",
  "$GPGLL,0045.4234,N,00075.6813,W*77",
  "$MP|0.71|0.67|0.30|0.35|9.84|0.10",
  "$GPGSA,A,3,,,,,,16,18,,22,24,,,3.6,2.1,2.2*3C",
  "$GPGLL,0045.4236,N,00075.6814,W*77",
  "$TA|0114",
  "$GPGSA,A,3,,,,,,16,18,,22,24,,,3.6,2.1,2.2*3C",
  "$GPGSA,A,3,,,,,,16,18,,22,24,,,3.6,2.1,2.2*3C",
  "$GPGLL,0045.4238,N,00075.6816,W*77",
  "$GPVTG,054.7,T,034.4,M,005.5,N,007.7,K",
  "$GPGSA,A,3,,,,,,16,18,,22,24,,,3.6,2.1,2.2*3C",
  "$GPGLL,0045.4239,N,00075.6817,W*75",
  "$TA|0110",
  "$GPGSA,A,3,,,,,,16,18,,22,24,,,3.6,2.1,2.2*3C",
  "$GPGSA,A,3,,,,,,16,18,,22,24,,,3.6,2.1,2.2*3C",
  "$GPGLL,0045.4241,N,00075.6819,W*77",
  "$MP|0.84|0.52|0.17|0.26|9.75|0.21",
  "$GPGSA,A,3,,,,,,16,18,,22,24,,,3.6,2.1,2.2*3C",
  "$GPGLL,0045.4242,N,00075.6820,W*77",
  "$TA|0107",
  "$GPGSA,A,3,,,,,,16,18,,22,24,,,3.6,2.1,2.2*3C",
  "$GPGSA,A,3,,,,,,16,18,,22,24,,,3.6,2.1,2.2*3C",
  "$GPGLL,0045.4244,N,00075.6822,W*77",
  "$GPVTG,054.7,T,034.4,M,005.5,N,008.0,K",
  "$GPGSA,A,3,,,,,,16,18,,22,24,,,3.6,2.1,2.2*3C",
  "$GPGLL,0045.4245,N,00075.6823,W*75",
  "$TA|0100",
  "$GPGSA,A,3,,,,,,16,18,,22,24,,,3.6,2.1,2.2*3C",
  "$GPGSA,A,3,,,,,,16,18,,22,24,,,3.6,2.1,2.2*3C",
  "$GPGLL,0045.4247,N,00075.6824,W*77",
  "$MP|0.64|0.23|0.16|0.35|9.84|0.15",
  "$GPGSA,A,3,,,,,,16,18,,22,24,,,3.6,2.1,2.2*3C",
  "$GPGLL,0045.4248,N,00075.6824,W*77",
  "$TA|0099",
  "$GPGSA,A,3,,,,,,16,18,,22,24,,,3.6,2.1,2.2*3C",
  "$GPGSA,A,3,,,,,,16,18,,22,24,,,3.6,2.1,2.2*3C",
  "$GPGLL,0045.4250,N,00075.6826,W*77",
  "$GPVTG,054.7,T,034.4,M,005.5,N,008.5,K",
  "$GPGSA,A,3,,,,,,16,18,,22,24,,,3.6,2.1,2.2*3C",
  "$GPGLL,0045.4251,N,00075.6827,W*75",
  "$TA|0102",
  "$GPGSA,A,3,,,,,,16,18,,22,24,,,3.6,2.1,2.2*3C",
  "$GPGSA,A,3,,,,,,16,18,,22,24,,,3.6,2.1,2.2*3C",
  "$GPGLL,0045.4252,N,00075.6828,W*77",
  "$MP|0.71|0.46|0.17|0.23|9.80|0.13",
  "$GPGSA,A,3,,,,,,16,18,,22,24,,,3.6,2.1,2.2*3C",
  "$GPGLL,0045.4253,N,00075.6828,W*77",
  "$TA|0095",
  "$GPVTG,054.7,T,034.4,M,005.5,N,008.4,K",
  "$GPGSA,A,3,,,,,,16,18,,22,24,,,3.6,2.1,2.2*3C",
  "$GPGSA,A,3,,,,,,16,18,,22,24,,,3.6,2.1,2.2*3C",
  "$GPGLL,0045.4255,N,00075.6824,W*75",
  "$TA|0096",
  "$GPGSA,A,3,,,,,,16,18,,22,24,,,3.6,2.1,2.2*3C",
  "$MP|0.74|0.55|0.11|0.32|9.76|0.16",
  "$GPGSA,A,3,,,,,,16,18,,22,24,,,3.6,2.1,2.2*3C",
  "$GPGLL,0045.4257,N,00075.6819,W*77",
  "$GPVTG,054.7,T,034.4,M,005.5,N,008.6,K",
  "$TA|0094",
  "$GPGSA,A,3,,,,,,16,18,,22,24,,,3.6,2.1,2.2*3C",
  "$MP|0.78|0.52|0.10|0.33|9.84|0.12",
  "$GPGSA,A,3,,,,,,16,18,,22,24,,,3.6,2.1,2.2*3C",
  "$GPGLL,0045.4258,N,00075.6818,W*75",
  "$TA|0093",
  "$GPGSA,A,3,,,,,,16,18,,22,24,,,3.6,2.1,2.2*3C",
  "$GPVTG,054.7,T,034.4,M,005.5,N,008.7,K",
  "$GPGSA,A,3,,,,,,16,18,,22,24,,,3.6,2.1,2.2*3C",
  "$GPGLL,0045.4260,N,00075.6813,W*77",
  "$TA|0080",
  "$GPGSA,A,3,,,,,,16,18,,22,24,,,3.6,2.1,2.2*3C",
  "$MP|0.81|0.44|0.09|0.32|9.83|0.11",
  "$GPGSA,A,3,,,,,,16,18,,22,24,,,3.6,2.1,2.2*3C",
  "$GPGLL,0045.4261,N,00075.6810,W*75",
  "$GPVTG,054.7,T,034.4,M,005.5,N,008.8,K",
  "$TA|0083",
  "$GPGSA,A,3,,,,,,16,18,,22,24,,,3.6,2.1,2.2*3C",
  "$MP|0.80|0.50|0.10|0.30|9.81|0.10",
  "$GPGSA,A,3,,,,,,16,18,,22,24,,,3.6,2.1,2.2*3C",
  "$GPGLL,0045.4263,N,00075.6806,W*77",
  "$TA|0085",
  "$GPVTG,054.7,T,034.4,M,005.5,N,008.7,K",
  "$GPGSA,A,3,,,,,,16,18,,22,24,,,3.6,2.1,2.2*3C",
  "$-- "
];

var count = 0;

//main function responsible for ingesting bluetooth data and dispatching actions to update the global Redux State with the new data.
//Currently, the function is reading from demo array, but can easily be switched to BT messages upon package support update.
export function updateBluetooth() {
  var btString = strings[count];

  //Parse strings being recieved from bluetooth to determine command and dispact action accordingly.
  if (btString.substring(1, 3) == "GP") {
    if (btString.substring(3, 6) == "VTG") {
      store.dispatch(
        actions.updateSpeed(parseFloat(btString.substring(31, 36)))
      );
      console.log("VTG");
    } else if (btString.substring(3, 6) == "GSA") {
      console.log("GSA");
    } else if (btString.substring(3, 6) == "GLL") {
      var latVal = 0;
      var longVal = 0;
      if (btString.substring(17, 18) == "S") {
        latVal = -1 * parseFloat(btString.substring(7, 16));
      } else {
        latVal = parseFloat(btString.substring(7, 16));
      }
      if (btString.substring(30, 31) == "W") {
        longVal = -1 * parseFloat(btString.substring(19, 29));
      } else {
        longVal = parseFloat(btString.substring(19, 29));
      }
      store.dispatch(
        actions.updateCoords({
          latitude: latVal,
          longitude: longVal
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
    count = -1; //Reset demo string
  } else {
    console.log("Bluetooth Error 1.");
  }
  count++;
}
