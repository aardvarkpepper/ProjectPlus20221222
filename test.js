//tested OK 2022 12 26
function test_unit() {
    const testData = [
        "infantry",
        "artillery",
        "tank",
        "antiaircraftArtillery",
        "fighter",
        "bomber",
        "submarine",
        "destroyer",
        "cruiser",
        "aircraftCarrier",
        "battleship",
        "transport",
        "industrialComplex",
    ]
    for (i = 0; i < testData.length; i++) {
        console.log(
            unit(testData[i]).type,
            unit(testData[i]).name,
            unit(testData[i]).cost,
            unit(testData[i]).attack,
            unit(testData[i]).defense,
            unit(testData[i]).move,
            unit(testData[i]).adm
        );
    }
}

// tested ok 22 12 27
function test_mapNode() {
    const testData = [
      "sz01",
      "sz02",
      "sz03",
      "sz04",
      "sz05",
      "sz06",
      "sz07",
      "sz08",
      "sz09",
      "sz10",
      "sz11",
      "sz12",
      "sz13",
      "sz14",
      "sz15",
      "sz16",
      "sz17",
      "sz18",
      "sz19",
      "sz20",
      "sz21",
      "sz22",
      "sz23",
      "sz24",
      "sz25",
      "sz26",
      "sz27",
      "sz28",
      "sz29",
      "sz30",
      "sz31",
      "sz32",
      "sz33",
      "sz34",
      "sz35",
      "sz36",
      "sz37",
      "sz38",
      "sz39",
      "sz40",
      "sz41",
      "sz42",
      "sz43",
      "sz44",
      "sz45",
      "sz46",
      "sz47",
      "sz48",
      "sz49",
      "sz50",
      "sz51",
      "sz52",
      "sz53",
      "sz54",
      "sz55",
      "sz56",
      "sz57",
      "sz58",
      "sz59",
      "sz60",
      "sz61",
      "sz62",
      "sz63",
      "sz64",
      "sz65",
      "alaska",
      "algeria",
      "angloEgyptianSudan",
      "anhwei",
      "archangel",
      "balticStates",
      "belgianCongo",
      "belorussia",
      "borneo",
      "brazil",
      "bulgariaRomania",
      "burma",
      "buryatia",
      "carolineIslands",
      "caucasus",
      "centralAmerica",
      "centralUnitedStates",
      "eastIndies",
      "eastMexico",
      "easternAustralia",
      "easternCanada",
      "easternUnitedStates",
      "egypt",
      "evenkiNationalOkrug",
      "finland",
      "formosa",
      "france",
      "frenchEquatorialAfrica",
      "frenchIndoChinaThailand",
      "frenchMadagascar",
      "frenchWestAfrica",
      "germany",
      "gibraltar",
      "greenland",
      "hawaiianIslands",
      "iceland",
      "india",
      "italianEastAfrica",
      "italy",
      "iwoJima",
      "japan",
      "karelia",
      "kazakh",
      "kiangsu",
      "kwangtung",
      "libya",
      "malaya",
      "manchuria",
      "mexico",
      "midway",
      "morocco",
      "newGuinea",
      "newZealand",
      "northwesternEurope",
      "norway",
      "novosibirsk",
      "okinawa",
      "persia",
      "philippineIslands",
      "poland",
      "rhodesia",
      "russia",
      "sinkiang",
      "solomonIslands",
      "southernEurope",
      "sovietFarEast",
      "szechwan",
      "transJordan",
      "ukraine",
      "unionOfSouthAfrica",
      "unitedKingdom",
      "vologda",
      "wakeIsland",
      "westIndies",
      "westRussia",
      "westernAustralia",
      "westernCanada",
      "westernUnitedStates",
      "yakut",
      "yunnan"
    ];
    let ussrTotal = 0;
    let germanyTotal = 0;
    let unitedKingdomTotal = 0;
    let japanTotal = 0;
    let unitedStatesTotal = 0;
    console.log(testData.length); // 65 sea territories, 80 territories, total 145
    for (let i = 0; i < testData.length; i++) {
      // tests connectivity
      let tempString = "";
      for (let connectedLocation in mapNode(testData[i]).adjacent) {
        if (!mapNode(connectedLocation).adjacent[testData[i]]) {
        console.log(`${testData[i]} core ${connectedLocation}`);
        }
      }
      // totals incomes
      mapNode(testData[i]).originalOwner
      switch(mapNode(testData[i]).originalOwner) {
        case "none":
          break;
        case "ussr":
          ussrTotal += mapNode(testData[i]).income;
          break;
        case "germany":
          germanyTotal += mapNode(testData[i]).income;
          break;
        case "unitedKingdom":
          unitedKingdomTotal += mapNode(testData[i]).income;
          //this, or similar, may be used to print out all territories of particular country.
  //        console.log(testData[i], mapNode(testData[i]).income);
          break;
        case "japan":
          japanTotal += mapNode(testData[i]).income;
          break;
        case "unitedStates":
          unitedStatesTotal += mapNode(testData[i]).income;
          break;
        default:
      //    console.log("break error");
      }
    } // end of i loop
    console.log (`ussr: ${ussrTotal}`);
    console.log (`germany: ${germanyTotal}`);
    console.log (`united kingdom: ${unitedKingdomTotal}`);
    console.log (`japan: ${japanTotal}`);
    console.log (`united states: ${unitedStatesTotal}`);
  }
