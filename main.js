// select all, then ctrl-k, ctrl-f
// Started project late December 2022.
// look at https://htmldom.dev/drag-and-drop-element-in-a-list/
/**
 * @todo - review airbnb Javascript style guide
 * @todo - define game object, maps
 * @todo - focus on immediate product (combat calc)
 * @todo - how to explain units of themselves do not have properties that affect one another?  Because the property is not inherent.  Interaction is a property of the ruleset.  The ruleset rule has to be defined in an object then imported into functions that use it.  A lot of code has to be refactored.
 * @todo - remember products of multiplication or divison have rounding errors that may create bugs
 * @todo - destructure, destructure.  Review how to destructure; can an array of objects be destructured
 */

/**
 * Returns unit Object.  Tested 22 12 26
 * @todo - add error functionality
 * @param {string} unitType - unit type.
 * @returns {Object} - unit object
 */
function unit(unitType) {
    const unitArray = {
        industrialComplex: {
            type: "industrialComplex",
            name: "Industrial Complex",
            cost: 15,
            attack: "zero",
            defense: "one",
            move: "zero",
            adm: [0, 1, 0]
        },
        infantry: {
            type: "land",
            name: "Infantry",
            cost: 3,
            attack: "one",
            defense: "two",
            move: "one",
            adm: [1, 2, 1]
        },
        artillery: {
            type: "land",
            name: "Artillery",
            cost: 4,
            attack: "two",
            defense: "two",
            move: "one",
            adm: [2, 2, 1]
        },
        tank: {
            type: "land",
            name: "Tank",
            cost: 6,
            attack: "three",
            defense: "three",
            move: "two",
            adm: [3, 3, 2]
        },
        antiaircraftArtillery: {
            type: "land",
            name: "Antiaircraft Artillery",
            cost: 5,
            attack: "zero",
            defense: "one",
            move: "one",
            adm: [0, 1, 1]
        },
      fighter: {
            type: "air",
            name: "Fighter",
            cost: 10,
            attack: "three",
            defense: "four",
            move: "four",
            adm: [3, 4, 4]
        },
        bomber: {
            type: "air",
            name: "Bomber",
            cost: 12,
            attack: "four",
            defense: "one",
            move: "six",
            adm: [4, 1, 6]
        },
        submarine: {
            type: "sea",
            name: "Submarine",
            cost: 6,
            attack: "two",
            defense: "one",
            move: "two",
            adm: [2, 1, 2]
        },
        destroyer: {
            type: "sea",
            name: "Destroyer",
            cost: 8,
            attack: "two",
            defense: "two",
            move: "two",
            adm: [2, 2, 2]
        },
        aircraftCarrier: {
            type: "sea",
            name: "Aircraft Carrier",
            cost: 14,
            attack: "one",
            defense: "two",
            move: "two",
            adm: [1, 2, 2]
        },
        cruiser: {
            type: "sea",
            name: "Cruiser",
            cost: 12,
            attack: "three",
            defense: "three",
            move: "two",
            adm: [3, 3, 2]
        },
        battleship: {
            type: "sea",
            name: "Battleship",
            cost: 20,
            attack: "four",
            defense: "four",
            move: "two",
            adm: [4, 4, 2]
        },
        transport: {
            type: "sea",
            name: "Transport",
            cost: 8,
            attack: "zero",
            defense: "zero",
            move: "two",
            adm: [0, 0, 2]
        }
    }
    return unitArray[unitType];
}
/**
 * Returns map location Object.  Contains map data including initial setup.
 * @param {string} location - location.
 * @returns {Object} - unit object
 */
function mapNode(location) {
    const mapArray = {
        sz01: {
            type: "sea",
            name: "01",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                easternCanada: true,
                sz02: true,
                sz10: true
            },
            contains: {
                none: true
            }
        },
        sz02: {
            type: "sea",
            name: "02",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                greenland: true,
                sz01: true,
                sz03: true,
                sz07: true,
                sz09: true,
                sz10: true
            },
            contains: {
                none: true
            }
        },
        sz03: {
            type: "sea",
            name: "03",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                finland: true,
                iceland: true,
                norway: true,
                sz02: true,
                sz04: true,
                sz06: true,
                sz07: true
            },
            contains: {
                none: true
            }
        },
        sz04: {
            type: "sea",
            name: "04",
            income: 0,
            originalOwner: "none",
            turnStartController: "ussr",
            currentController: "ussr",
            adjacent: {
                archangel: true,
                karelia: true,
                sz03: true
            },
            contains: {
                none: false,
                ussr: [
                    { count: 1, type: unit("submarine") }
                ]
            }
        },
        sz05: {
            type: "sea",
            name: "05",
            income: 0,
            originalOwner: "none",
            turnStartController: "germany",
            currentController: "germany",
            adjacent: {
                balticStates: true,
                finland: true,
                germany: true,
                karelia: true,
                northwesternEurope: true,
                norway: true,
                sz06: true
            },
            contains: {
                none: false,
                germany: [
                    { count: 1, type: unit("cruiser") },
                    { count: 1, type: unit("submarine") },
                    { count: 1, type: unit("transport") }
                ]
            }
        },
        sz06: {
            type: "sea",
            name: "06",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                northwesternEurope: true,
                norway: true,
                unitedKingdom: true,
                sz03: true,
                sz05: true,
                sz07: true,
                sz08: true
            },
            contains: {
                none: true,
            }
        },
        sz07: {
            type: "sea",
            name: "07",
            income: 0,
            originalOwner: "none",
            turnStartController: "unitedKingdom",
            currentController: "unitedKingdom",
            adjacent: {
                unitedKingdom: true,
                sz02: true,
                sz03: true,
                sz06: true,
                sz08: true,
                sz09: true
            },
            contains: {
                none: false,
                unitedKingdom: [
                    { count: 1, type: unit("battleship") },
                    { count: 1, type: unit("destroyer") },
                    { count: 1, type: unit("transport") }
                ]
            }
        },
        sz08: {
            type: "sea",
            name: "08",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                france: true,
                northwesternEurope: true,
                unitedKingdom: true,
                sz06: true,
                sz07: true,
                sz09: true,
                sz13: true
            },
            contains: {
                none: true
            }
        },
        sz09: {
            type: "sea",
            name: "09",
            income: 0,
            originalOwner: "none",
            turnStartController: "germany",
            currentController: "germany",
            adjacent: {
                sz02: true,
                sz07: true,
                sz08: true,
                sz10: true,
                sz12: true,
                sz13: true
            },
            contains: {
                none: false,
                germany: [
                    { count: 2, type: unit("submarine") }
                ]
            }
        },
        sz10: {
            type: "sea",
            name: "10",
            income: 0,
            originalOwner: "none",
            turnStartController: "unitedKingdom",
            currentController: "unitedKingdom",
            adjacent: {
                easternCanada: true,
                sz01: true,
                sz02: true,
                sz09: true,
                sz11: true,
                sz12: true,
            },
            contains: {
                none: false,
                unitedKingdom: [
                    { count: 1, type: unit("destroyer") },
                    { count: 1, type: unit("transport") },
                ]
            }
        },
        sz11: {
            type: "sea",
            name: "11",
            income: 0,
            originalOwner: "none",
            turnStartController: "unitedStates",
            currentController: "unitedStates",
            adjacent: {
                centralUnitedStates: true,
                easternUnitedStates: true,
                eastMexico: true,
                sz10: true,
                sz12: true,
                sz18: true
            },
            contains: {
                none: false,
                unitedStates: [
                    { count: 1, type: unit("destroyer") },
                    { count: 2, type: unit("transport") },
                ]
            }
        },
        sz12: {
            type: "sea",
            name: "12",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                sz09: true,
                sz10: true,
                sz11: true,
                sz13: true,
                sz18: true,
                sz22: true,
                sz23: true
            },
            contains: {
                none: true
            }
        },
        sz13: {
            type: "sea",
            name: "13",
            income: 0,
            originalOwner: "none",
            turnStartController: "unitedKingdom",
            currentController: "unitedKingdom",
            adjacent: {
                gibraltar: true,
                morocco: true,
                sz08: true,
                sz09: true,
                sz12: true,
                sz14: true,
                sz23: true
            },
            contains: {
                none: false,
                unitedKingdom: [
                    { count: 1, type: unit("cruiser") }
                ]
            }
        },
        sz14: {
            type: "sea",
            name: "14",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                algeria: true,
                france: true,
                gibraltar: true,
                morocco: true,
                sz13: true,
                sz15: true
            },
            contains: {
                none: true
            }
        },
        sz15: {
            type: "sea",
            name: "15",
            income: 0,
            originalOwner: "none",
            turnStartController: "germany",
            currentController: "germany",
            adjacent: {
                italy: true,
                libya: true,
                southernEurope: true,
                sz14: true,
                sz16: true,
                sz17: true
            },
            contains: {
                none: false,
                germany: [
                    { count: 1, type: unit("battleship") },
                    { count: 1, type: unit("transport") }
                ]
            }
        },
        sz16: {
            type: "sea",
            name: "16",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                bulgariaRomania: true,
                caucasus: true,
                ukraine: true,
                sz15: true
            },
            contains: {
                none: true
            }
        },
        sz17: {
            type: "sea",
            name: "17",
            income: 0,
            originalOwner: "none",
            turnStartController: "unitedKingdom",
            currentController: "unitedKingdom",
            adjacent: {
                egypt: true,
                transJordan: true,
                sz15: true,
                sz34: true
            },
            contains: {
                none: false,
                unitedKingdom: [
                    { count: 1, type: unit("destroyer") }
                ]
            }
        },
        sz18: {
            type: "sea",
            name: "18",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                centralAmerica: true,
                eastMexico: true,
                westIndies: true,
                sz11: true,
                sz12: true,
                sz19: true,
                sz22: true
            },
            contains: {
                none: true
            }
        },
        sz19: {
            type: "sea",
            name: "19",
            income: 0,
            originalOwner: "none",
            turnStartController: "unitedStates",
            currentController: "unitedStates",
            adjacent: {
                centralAmerica: true,
                eastMexico: true,
                sz18: true,
                sz20: true,
                sz55: true
            },
            contains: {
                none: false,
                unitedStates: [
                    { count: 1, type: unit("cruiser") }
                ]
            }
        },
        sz20: {
            type: "sea",
            name: "20",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                sz19: true,
                sz21: true,
                sz42: true
            },
            contains: {
                none: true
            }
        },
        sz21: {
            type: "sea",
            name: "21",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                sz20: true,
                sz22: true,
                sz25: true,
                sz26: true,
                sz41: true
            },
            contains: {
                none: true
            }
        },
        sz22: {
            type: "sea",
            name: "22",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                brazil: true,
                sz12: true,
                sz18: true,
                sz21: true,
                sz23: true,
                sz25: true
            },
            contains: {
                none: true
            }
        },
        sz23: {
            type: "sea",
            name: "23",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                frenchWestAfrica: true,
                sz12: true,
                sz13: true,
                sz22: true,
                sz24: true,
                sz25: true
            },
            contains: {
                none: true
            }
        },
        sz24: {
            type: "sea",
            name: "24",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                belgianCongo: true,
                frenchEquatorialAfrica: true,
                sz23: true,
                sz25: true,
                sz27: true
            },
            contains: {
                none: true
            }
        },
        sz25: {
            type: "sea",
            name: "25",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                sz21: true,
                sz22: true,
                sz23: true,
                sz24: true,
                sz26: true,
                sz27: true
            },
            contains: {
                none: true
            }
        },
        sz26: {
            type: "sea",
            name: "26",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                sz21: true,
                sz25: true,
                sz27: true
            },
            contains: {
                none: true
            }
        },
        sz27: {
            type: "sea",
            name: "27",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                unionOfSouthAfrica: true,
                sz24: true,
                sz25: true,
                sz26: true,
                sz28: true
            },
            contains: {
                none: true
            }
        },
        sz28: {
            type: "sea",
            name: "28",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                frenchMadagascar: true,
                unionOfSouthAfrica: true,
                sz27: true,
                sz29: true,
                sz33: true
            },
            contains: {
                none: true
            }
        },
        sz29: {
            type: "sea",
            name: "29",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                frenchMadagascar: true,
                sz28: true,
                sz30: true,
                sz31: true,
                sz32: true
            },
            contains: {
                none: true
            }
        },
        sz30: {
            type: "sea",
            name: "30",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                sz29: true,
                sz31: true,
                sz37: true,
                sz38: true
            },
            contains: {
                none: true
            }
        },
        sz31: {
            type: "sea",
            name: "31",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                sz29: true,
                sz30: true,
                sz32: true,
                sz35: true,
                sz37: true
            },
            contains: {
                none: true
            }
        },
        sz32: {
            type: "sea",
            name: "32",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                frenchMadagascar: true,
                sz29: true,
                sz31: true,
                sz33: true,
                sz34: true,
                sz35: true
            },
            contains: {
                none: true
            }
        },
        sz33: {
            type: "sea",
            name: "33",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                frenchMadagascar: true,
                italianEastAfrica: true,
                rhodesia: true,
                sz28: true,
                sz32: true,
                sz34: true
            },
            contains: {
                none: true
            }
        },
        sz34: {
            type: "sea",
            name: "34",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                angloEgyptianSudan: true,
                egypt: true,
                italianEastAfrica: true,
                persia: true,
                transJordan: true,
                sz17: true,
                sz32: true,
                sz33: true,
                sz35: true
            },
            contains: {
                none: true
            }
        },
        sz35: {
            type: "sea",
            name: "35",
            income: 0,
            originalOwner: "none",
            turnStartController: "unitedKingdom",
            currentController: "unitedKingdom",
            adjacent: {
                india: true,
                sz31: true,
                sz32: true,
                sz34: true,
                sz36: true,
                sz37: true
            },
            contains: {
                none: false,
                unitedKingdom: [
                    { count: 1, type: unit("carrier") },
                    { count: 1, type: unit("cruiser") },
                    { count: 1, type: unit("fighter") },
                    { count: 1, type: unit("transport") }
                ]
            }
        },
        sz36: {
            type: "sea",
            name: "36",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                burma: true,
                frenchIndoChinaThailand: true,
                malaya: true,
                sz35: true,
                sz37: true,
                sz47: true,
                sz48: true,
                sz61: true
            },
            contains: {
                none: true
            }
        },
        sz37: {
            type: "sea",
            name: "37",
            income: 0,
            originalOwner: "none",
            turnStartController: "japan",
            currentController: "japan",
            adjacent: {
                eastIndies: true,
                sz30: true,
                sz31: true,
                sz35: true,
                sz36: true,
                sz38: true,
                sz46: true,
                sz47: true
            },
            contains: {
                none: false,
                japan: [
                    { count: 1, type: unit("battleship") },
                    { count: 1, type: unit("carrier") },
                    { count: 2, type: unit("fighter") }
                ]
            }
        },
        sz38: {
            type: "sea",
            name: "38",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                westernAustralia: true,
                sz30: true,
                sz37: true,
                sz39: true,
                sz46: true
            },
            contains: {
                none: true
            }
        },
        sz39: {
            type: "sea",
            name: "39",
            income: 0,
            originalOwner: "none",
            turnStartController: "unitedKingdom",
            currentController: "unitedKingdom",
            adjacent: {
                easternAustralia: true,
                sz38: true,
                sz40: true,
                sz45: true
            },
            contains: {
                none: false,
                unitedKingdom: [
                    { count: 1, type: unit("cruiser") },
                    { count: 1, type: unit("submarine") },
                    { count: 1, type: unit("transport") }
                ]
            }
        },
        sz40: {
            type: "sea",
            name: "40",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                newZealand: true,
                sz39: true,
                sz41: true,
                sz43: true,
                sz44: true,
                sz45: true
            },
            contains: {
                none: true
            }
        },
        sz41: {
            type: "sea",
            name: "41",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                sz21: true,
                sz40: true,
                sz42: true,
                sz43: true
            },
            contains: {
                none: true
            }
        },
        sz42: {
            type: "sea",
            name: "42",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                sz20: true,
                sz41: true,
                sz43: true,
                sz54: true,
                sz55: true
            },
            contains: {
                none: true
            }
        },
        sz43: {
            type: "sea",
            name: "43",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                sz40: true,
                sz41: true,
                sz42: true,
                sz44: true,
                sz53: true,
                sz54: true
            },
            contains: {
                none: true
            }
        },
        sz44: {
            type: "sea",
            name: "44",
            income: 0,
            originalOwner: "none",
            turnStartController: "japan",
            currentController: "japan",
            adjacent: {
                solomonIslands: true,
                sz40: true,
                sz43: true,
                sz45: true,
                sz49: true,
                sz50: true,
                sz52: true,
                sz53: true
            },
            contains: {
                none: false,
                japan: [
                    { count: 1, type: unit("submarine") }
                ]
            }
        },
        sz45: {
            type: "sea",
            name: "45",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                easternAustralia: true,
                sz39: true,
                sz40: true,
                sz44: true,
                sz46: true,
                sz49: true
            },
            contains: {
                none: true
            }
        },
        sz46: {
            type: "sea",
            name: "46",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                westernAustralia: true,
                sz37: true,
                sz38: true,
                sz45: true,
                sz47: true,
                sz49: true
            },
            contains: {
                none: true
            }
        },
        sz47: {
            type: "sea",
            name: "47",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                borneo: true,
                sz36: true,
                sz37: true,
                sz46: true,
                sz48: true,
                sz49: true
            },
            contains: {
                none: true
            }
        },
        sz48: {
            type: "sea",
            name: "48",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                philippineIslands: true,
                sz36: true,
                sz47: true,
                sz49: true,
                sz50: true,
                sz51: true,
                sz60: true,
                sz61: true
            },
            contains: {
                none: true
            }
        },
        sz49: {
            type: "sea",
            name: "49",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                newGuinea: true,
                sz44: true,
                sz45: true,
                sz46: true,
                sz47: true,
                sz48: true,
                sz50: true
            },
            contains: {
                none: true
            }
        },
        sz50: {
            type: "sea",
            name: "50",
            income: 0,
            originalOwner: "none",
            turnStartController: "japan",
            currentController: "japan",
            adjacent: {
                carolineIslands: true,
                sz44: true,
                sz48: true,
                sz49: true,
                sz51: true,
                sz52: true
            },
            contains: {
                none: false,
                japan: [
                    { count: 1, type: unit("carrier") },
                    { count: 1, type: unit("cruiser") },
                    { count: 1, type: unit("fighter") }
                ]
            }
        },
        sz51: {
            type: "sea",
            name: "51",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                okinawa: true,
                sz48: true,
                sz50: true,
                sz52: true,
                sz59: true,
                sz60: true
            },
            contains: {
                none: true
            }
        },
        sz52: {
            type: "sea",
            name: "52",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                wakeIsland: true,
                sz44: true,
                sz50: true,
                sz51: true,
                sz53: true,
                sz57: true,
                sz59: true
            },
            contains: {
                none: true
            }
        },
        sz53: {
            type: "sea",
            name: "53",
            income: 0,
            originalOwner: "none",
            turnStartController: "unitedStates",
            currentController: "unitedStates",
            adjacent: {
                hawaiianIslands: true,
                sz43: true,
                sz44: true,
                sz52: true,
                sz54: true,
                sz56: true,
                sz57: true
            },
            contains: {
                none: false,
                unitedStates: [
                    { count: 1, type: unit("carrier") },
                    { count: 1, type: unit("destroyer") },
                    { count: 1, type: unit("fighter") },
                    { count: 1, type: unit("submarine") },
                ]
            }
        },
        sz54: {
            type: "sea",
            name: "54",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                sz42: true,
                sz43: true,
                sz53: true,
                sz55: true,
                sz56: true
            },
            contains: {
                none: true
            }
        },
        sz55: {
            type: "sea",
            name: "55",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                mexico: true,
                sz19: true,
                sz42: true,
                sz54: true,
                sz56: true
            },
            contains: {
                none: true
            }
        },
        sz56: {
            type: "sea",
            name: "56",
            income: 0,
            originalOwner: "none",
            turnStartController: "unitedStates",
            currentController: "unitedStates",
            adjacent: {
                westernUnitedStates: true,
                sz53: true,
                sz54: true,
                sz55: true,
                sz57: true,
                sz65: true
            },
            contains: {
                none: false,
                unitedStates: [
                    { count: 1, type: unit("battleship") },
                    { count: 1, type: unit("destroyer") },
                    { count: 1, type: unit("transport") }
                ]
            }
        },
        sz57: {
            type: "sea",
            name: "57",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                midway: true,
                sz52: true,
                sz53: true,
                sz56: true,
                sz58: true,
                sz59: true,
                sz64: true,
                sz65: true
            },
            contains: {
                none: true
            }
        },
        sz58: {
            type: "sea",
            name: "58",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                sz57: true,
                sz59: true,
                sz60: true,
                sz63: true,
                sz64: true
            },
            contains: {
                none: true
            }
        },
        sz59: {
            type: "sea",
            name: "59",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                iwoJima: true,
                sz51: true,
                sz52: true,
                sz57: true,
                sz58: true,
                sz60: true
            },
            contains: {
                none: true
            }
        },
        sz60: {
            type: "sea",
            name: "60",
            income: 0,
            originalOwner: "none",
            turnStartController: "japan",
            currentController: "japan",
            adjacent: {
                japan: true,
                sz48: true,
                sz51: true,
                sz58: true,
                sz59: true,
                sz61: true,
                sz62: true,
                sz63: true
            },
            contains: {
                none: false,
                japan: [
                    { count: 1, type: unit("battleship") },
                    { count: 1, type: unit("destroyer") },
                    { count: 1, type: unit("transport") }
                ]
            }
        },
        sz61: {
            type: "sea",
            name: "60",
            income: 0,
            originalOwner: "none",
            turnStartController: "japan",
            currentController: "japan",
            adjacent: {
                formosa: true,
                kiangsu: true,
                kwangtung: true,
                yunnan: true,
                sz36: true,
                sz48: true,
                sz60: true,
                sz62: true
            },
            contains: {
                none: false,
                japan: [
                    { count: 1, type: unit("destroyer") },
                    { count: 1, type: unit("transport") }
                ]
            }
        },
        sz62: {
            type: "sea",
            name: "62",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                buryatia: true,
                japan: true,
                manchuria: true,
                sz60: true,
                sz61: true,
                sz63: true
            },
            contains: {
                none: true
            }
        },
        sz63: {
            type: "sea",
            name: "63",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                buryatia: true,
                sovietFarEast: true,
                sz58: true,
                sz60: true,
                sz62: true,
                sz64: true
            },
            contains: {
                none: true
            }
        },
        sz64: {
            type: "sea",
            name: "64",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                alaska: true,
                sz57: true,
                sz58: true,
                sz63: true,
                sz65: true
            },
            contains: {
                none: true
            }
        },
        sz65: {
            type: "sea",
            name: "65",
            income: 0,
            originalOwner: "none",
            turnStartController: "none",
            currentController: "none",
            adjacent: {
                alaska: true,
                westernCanada: true,
                sz56: true,
                sz57: true,
                sz64: true
            },
            contains: {
                none: true
            }
        },
        alaska: {
            type: "land",
            name: "Alaska",
            income: 2,
            originalOwner: "unitedStates",
            turnStartController: "unitedStates",
            currentController: "unitedStates",
            adjacent: {
                westernCanada: true,
                sz64: true,
                sz65: true
            },
            contains: {
                none: false,
                unitedStates: [
                    { count: 1, type: unit("infantry") }
                ]
            }
        },
        algeria: {
            type: "land",
            name: "Morocco",
            income: 1,
            originalOwner: "germany",
            turnStartController: "germany",
            currentController: "germany",
            adjacent: {
                libya: true,
                morocco: true,
                sz14: true
            },
            contains: {
                none: false,
                germany: [
                    { count: 1, type: unit("artillery") },
                    { count: 1, type: unit("infantry") }
                ]
            }
        },
        angloEgyptianSudan: {
            type: "land",
            name: "Anglo-Egyptian Sudan",
            income: 0,
            originalOwner: "unitedKingdom",
            turnStartController: "unitedKingdom",
            currentController: "unitedKingdom",
            adjacent: {
                belgianCongo: true,
                egypt: true,
                frenchEquatorialAfrica: true,
                italianEastAfrica: true,
                rhodesia: true,
                sz34: true
            },
            contains: {
                none: true
            }
        },
        anhwei: {
            type: "land",
            name: "Anhwei",
            income: 1,
            originalOwner: "unitedStates",
            turnStartController: "unitedStates",
            currentController: "unitedStates",
            adjacent: {
                kiangsu: true,
                kwangtung: true,
                manchuria: true,
                sinkiang: true,
                szechwan: true
            },
            contains: {
                none: false,
                unitedStates: [
                    { count: 2, type: unit("infantry") }
                ] 
            }
        },
        archangel: {
            type: "land",
            name: "Archangel",
            income: 1,
            originalOwner: "ussr",
            turnStartController: "ussr",
            currentController: "ussr",
            adjacent: {
                evenkiNationalOkrug: true,
                karelia: true,
                russia: true,
                vologda: true,
                westRussia: true,
                sz04: true,
            },
            contains: {
                none: false,
                ussr: [
                    { count: 1, type: unit("infantry") },
                    { count: 1, type: unit("tank") }
                ]
            }
        },
        balticStates: {
            type: "land",
            name: "Baltic States",
            income: 2,
            originalOwner: "germany",
            turnStartController: "germany",
            currentController: "germany",
            adjacent: {
                belorussia: true,
                germany: true,
                karelia: true,
                poland: true,
                sz05: true,
            },
            contains: {
                none: false,
                germany: [
                    { count: 1, type: unit("infantry") },
                    { count: 1, type: unit("tank") }
                ]
            }
        },
        belgianCongo: {
            type: "land",
            name: "Belgian Congo",
            income: 1,
            originalOwner: "unitedKingdom",
            turnStartController: "unitedKingdom",
            currentController: "unitedKingdom",
            adjacent: {
                angloEgyptianSudan: true,
                frenchEquatorialAfrica: true,
                rhodesia: true,
                unionOfSouthAfrica: true,
                sz24: true
            },
            contains: {
                none: true
            }
        },
        belorussia: {
            type: "land",
            name: "Belorussia",
            income: 2,
            originalOwner: "germany",
            turnStartController: "germany",
            currentController: "germany",
            adjacent: {
                balticStates: true,
                karelia: true,
                poland: true,
                ukraine: true,
                westRussia: true
            },
            contains: {
                none: false,
                germany: [
                    { count: 3, type: unit("infantry") }
                ]
            }
        },
        borneo: {
            type: "land",
            name: "Borneo",
            income: 4,
            originalOwner: "japan",
            turnStartController: "japan",
            currentController: "japan",
            adjacent: {
                sz47: true
            },
            contains: {
                none: false,
                japan: [
                    { count: 1, type: unit("infantry") }
                ]
            }
        },
        brazil: {
            type: "land",
            name: "Brazil",
            income: 3,
            originalOwner: "unitedStates",
            turnStartController: "unitedStates",
            currentController: "unitedStates",
            adjacent: {
                sz22: true
            },
            contains: {
                none: true
            }
        },
        bulgariaRomania: {
            type: "land",
            name: "Bulgaria Romania",
            income: 2,
            originalOwner: "germany",
            turnStartController: "germany",
            currentController: "germany",
            adjacent: {
                germany: true,
                poland: true,
                southernEurope: true,
                ukraine: true,
                sz16: true,
            },
            contains: {
                none: false,
                germany: [
                    { count: 1, type: unit("fighter") },
                    { count: 2, type: unit("infantry") },
                    { count: 1, type: unit("tank") }
                ]
            }
        },
        burma: {
            type: "land",
            name: "Burma",
            income: 1,
            originalOwner: "unitedKingdom",
            turnStartController: "unitedKingdom",
            currentController: "unitedKingdom",
            adjacent: {
                frenchIndoChinaThailand: true,
                india: true,
                yunnan: true,
                sz36: true
            },
            contains: {
                none: false,
                unitedKingdom: [
                    { count: 1, type: unit("infantry") }
                ]
            }
        },
        buryatia: {
            type: "land",
            name: "Buryatia",
            income: 1,
            originalOwner: "ussr",
            turnStartController: "ussr",
            currentController: "ussr",
            adjacent: {
                manchuria: true,
                sovietFarEast: true,
                yakut: true,
                sz62: true,
                sz63: true
            },
            contains: {
                none: false,
                ussr: [
                    { count: 2, type: unit("infantry") }
                ]
            }
        },
        carolineIslands: {
            type: "land",
            name: "Caroline Islands",
            income: 0,
            originalOwner: "japan",
            turnStartController: "japan",
            currentController: "japan",
            adjacent: {
                sz50: true
            },
            contains: {
                none: false,
                japan: [
                    { count: 1, type: unit("infantry") }
                ]
            }
        },
        caucasus: {
            type: "land",
            name: "Caucasus",
            income: 4,
            originalOwner: "ussr",
            turnStartController: "ussr",
            currentController: "ussr",
            adjacent: {
                kazakh: true,
                persia: true,
                russia: true,
                ukraine: true,
                westRussia: true,
                sz16: true
            },
            contains: {
                none: false,
                ussr: [
                    { count: 1, type: unit("antiaircraftArtillery") },
                    { count: 1, type: unit("artillery") },
                    { count: 1, type: unit("industrialComplex") },
                    { count: 3, type: unit("infantry") },
                    { count: 1, type: unit("tank") }
                ]
            }
        },
        centralAmerica: {
            type: "land",
            name: "Central America",
            income: 1,
            originalOwner: "unitedStates",
            turnStartController: "unitedStates",
            currentController: "unitedStates",
            adjacent: {
                eastMexico: true,
                sz18: true,
                sz19: true
            },
            contains: {
                none: true
            }
        },
        centralUnitedStates: {
            type: "land",
            name: "Central United States",
            income: 6,
            originalOwner: "unitedStates",
            turnStartController: "unitedStates",
            currentController: "unitedStates",
            adjacent: {
                eastMexico: true,
                easternCanada: true,
                easternUnitedStates: true,
                westernUnitedStates: true,
                sz11: true
            },
            contains: {
                none: false,
                unitedKingdom: [
                    { count: 1, type: unit("infantry") }
                ]
            }
        },
        eastIndies: {
            type: "land",
            name: "East Indies",
            income: 4,
            originalOwner: "japan",
            turnStartController: "japan",
            currentController: "japan",
            adjacent: {
                sz37: true
            },
            contains: {
                none: false,
                japan: [
                    { count: 2, type: unit("infantry") }
                ]
            }
        },
        eastMexico: {
            type: "land",
            name: "East Mexico",
            income: 0,
            originalOwner: "unitedStates",
            turnStartController: "unitedStates",
            currentController: "unitedStates",
            adjacent: {
                centralAmerica: true,
                centralUnitedStates: true,
                mexico: true,
                sz11: true,
                sz18: true,
                sz19: true
            },
            contains: {
                none: true
            }
        },
        easternAustralia: {
            type: "land",
            name: "Eastern Australia",
            income: 1,
            originalOwner: "unitedKingdom",
            turnStartController: "unitedKingdom",
            currentController: "unitedKingdom",
            adjacent: {
                westernAustralia: true,
                sz39: true,
                sz45: true
            },
            contains: {
                none: false,
                unitedKingdom: [
                    { count: 2, type: unit("infantry") }
                ]
            }
        },
        easternCanada: {
            type: "land",
            name: "Eastern Canada",
            income: 3,
            originalOwner: "unitedKingdom",
            turnStartController: "unitedKingdom",
            currentController: "unitedKingdom",
            adjacent: {
                centralUnitedStates: true,
                easternUnitedStates: true,
                westernCanada: true,
                sz01: true,
                sz10: true
            },
            contains: {
                none: false,
                unitedKingdom: [
                    { count: 1, type: unit("tank") }
                ]
            }
        },
        easternUnitedStates: {
            type: "land",
            name: "Eastern United States",
            isVictoryCity: "Washington",
            isCapital: true,
            income: 12,
            originalOwner: "unitedStates",
            turnStartController: "unitedStates",
            currentController: "unitedStates",
            adjacent: {
                centralUnitedStates: true,
                easternCanada: true,
                sz11: true
            },
            contains: {
                none: false,
                unitedStates: [
                    { count: 1, type: unit("antiaircraftArtillery") },
                    { count: 1, type: unit("artillery") },
                    { count: 1, type: unit("bomber") },
                    { count: 1, type: unit("fighter") },
                    { count: 1, type: unit("infantry") },
                    { count: 1, type: unit("industrialComplex") },
                    { count: 1, type: unit("tank") }
                ]
            }
        },
        egypt: {
            type: "land",
            name: "Egypt",
            income: 2,
            originalOwner: "unitedKingdom",
            turnStartController: "unitedKingdom",
            currentController: "unitedKingdom",
            adjacent: {
                angloEgyptianSudan: true,
                libya: true,
                transJordan: true,
                sz17: true,
                sz34: true
            },
            contains: {
                none: false,
                unitedKingdom: [
                    { count: 1, type: unit("artillery") },
                    { count: 1, type: unit("fighter") },
                    { count: 1, type: unit("infantry") },
                    { count: 1, type: unit("tank") }
                ]
            }
        },
        evenkiNationalOkrug: {
            type: "land",
            name: "Evenki National Okrug",
            income: 1,
            originalOwner: "ussr",
            turnStartController: "ussr",
            currentController: "ussr",
            adjacent: {
                archangel: true,
                novosibirsk: true,
                sinkiang: true,
                vologda: true,
                yakut: true
            },
            contains: {
                none: false,
                ussr: [
                    { count: 2, type: unit("infantry") }
                ]
            }
        },
        finland: {
            type: "land",
            name: "Finland",
            income: 1,
            originalOwner: "germany",
            turnStartController: "germany",
            currentController: "germany",
            adjacent: {
                karelia: true,
                norway: true,
                sz03: true,
                sz05: true
            },
            contains: {
                none: false,
                germany: [
                    { count: 3, type: unit("infantry") }
                ]
            }
        },
        formosa: {
            type: "land",
            name: "Formosa",
            income: 0,
            originalOwner: "japan",
            turnStartController: "japan",
            currentController: "japan",
            adjacent: {
                sz61: true
            },
            contains: {
                none: true
            }
        },
        france: {
            type: "land",
            name: "France",
            isVictoryCity: "Paris",
            income: 6,
            originalOwner: "germany",
            turnStartController: "germany",
            currentController: "germany",
            adjacent: {
                germany: true,
                italy: true,
                northwesternEurope: true,
                sz08: true,
                sz14: true
            },
            contains: {
                none: false,
                germany: [
                    { count: 1, type: unit("antiaircraftArtillery") },
                    { count: 1, type: unit("infantry") },
                    { count: 2, type: unit("tank") }
                ]
            }
        },
        frenchEquatorialAfrica: {
            type: "land",
            name: "French Equatorial Africa",
            income: 1,
            originalOwner: "unitedKingdom",
            turnStartController: "unitedKingdom",
            currentController: "unitedKingdom",
            adjacent: {
                angloEgyptianSudan: true,
                belgianCongo: true,
                frenchWestAfrica: true,
                sz24: true
            },
            contains: {
                none: true
            }
        },
        frenchIndoChinaThailand: {
            type: "land",
            name: "French Indo-China Thailand",
            income: 2,
            originalOwner: "japan",
            turnStartController: "japan",
            currentController: "japan",
            adjacent: {
                burma: true,
                malaya: true,
                yunnan: true,
                sz36: true
            },
            contains: {
                none: false,
                japan: [
                    { count: 1, type: unit("artillery") },
                    { count: 1, type: unit("fighter") },
                    { count: 2, type: unit("infantry") }
                ]
            }
        },
        frenchMadagascar: {
            type: "land",
            name: "French Madagascar",
            income: 1,
            originalOwner: "unitedKingdom",
            turnStartController: "unitedKingdom",
            currentController: "unitedKingdom",
            adjacent: {
                sz28: true,
                sz29: true,
                sz32: true,
                sz33: true
            },
            contains: {
                none: true
            }
        },
        frenchWestAfrica: {
            type: "land",
            name: "French West Africa",
            income: 1,
            originalOwner: "unitedKingdom",
            turnStartController: "unitedKingdom",
            currentController: "unitedKingdom",
            adjacent: {
                frenchEquatorialAfrica: true,
                sz23: true
            },
            contains: {
                none: true
            }
        },
        germany: {
            type: "land",
            name: "Germany",
            isVictoryCity: "Berlin",
            isCapital: true,
            income: 10,
            originalOwner: "germany",
            turnStartController: "germany",
            currentController: "germany",
            adjacent: {
                balticStates: true,
                bulgariaRomania: true,
                france: true,
                italy: true,
                northwesternEurope: true,
                poland: true,
                southernEurope: true,
                sz05: true
            },
            contains: {
                none: false,
                germany: [
                    { count: 1, type: unit("antiaircraftArtillery") },
                    { count: 1, type: unit("fighter") },
                    { count: 1, type: unit("industrialComplex") },
                    { count: 3, type: unit("infantry") },
                    { count: 2, type: unit("tank") },
                ]
            }
        },
        gibraltar: {
            type: "land",
            name: "Gibraltar",
            income: 0,
            originalOwner: "unitedKingdom",
            turnStartController: "unitedKingdom",
            currentController: "unitedKingdom",
            adjacent: {
                sz13: true,
                sz14: true
            },
            contains: {
                none: true
            }
        },
        greenland: {
            type: "land",
            name: "Greenland",
            income: 0,
            originalOwner: "unitedStates",
            turnStartController: "unitedStates",
            currentController: "unitedStates",
            adjacent: {
                sz02: true
            },
            contains: {
                none: true
            }
        },
        hawaiianIslands: {
            type: "land",
            name: "Hawaiian Islands",
            isVictoryCity: "Honolulu",
            income: 1,
            originalOwner: "unitedStates",
            turnStartController: "unitedStates",
            currentController: "unitedStates",
            adjacent: {
                sz53: true
            },
            contains: {
                none: false,
                unitedStates: [
                    { count: 1, type: unit("fighter") },
                    { count: 1, type: unit("infantry") }
                ]
            }
        },
        iceland: {
            type: "land",
            name: "Iceland",
            income: 0,
            originalOwner: "unitedKingdom",
            turnStartController: "unitedKingdom",
            currentController: "unitedKingdom",
            adjacent: {
                sz03: true
            },
            contains: {
                none: true
            }
        },
        india: {
            type: "land",
            name: "India",
            isVictoryCity: "Calcutta",
            income: 3,
            originalOwner: "unitedKingdom",
            turnStartController: "unitedKingdom",
            currentController: "unitedKingdom",
            adjacent: {
                burma: true,
                persia: true,
                sz35: true
            },
            contains: {
                none: false,
                unitedKingdom: [
                    { count: 1, type: unit("antiaircraftArtillery") },
                    { count: 1, type: unit("industrialComplex") },
                    { count: 5, type: unit("infantry") }
                ]
            }
        },
        italianEastAfrica: {
            type: "land",
            name: "Italian East Africa",
            income: 1,
            originalOwner: "unitedKingdom",
            turnStartController: "unitedKingdom",
            currentController: "unitedKingdom",
            adjacent: {
                angloEgyptianSudan: true,
                rhodesia: true,
                sz33: true,
                sz34: true
            },
            contains: {
                none: true
            }
        },
        italy: {
            type: "land",
            name: "Italy",
            isVictoryCity: "Rome",
            income: 3,
            originalOwner: "germany",
            turnStartController: "germany",
            currentController: "germany",
            adjacent: {
                france: true,
                germany: true,
                southernEurope: true,
                sz15: true,
            },
            contains: {
                none: false,
                germany: [
                    { count: 1, type: unit("antiaircraftArtillery") },
                    { count: 1, type: unit("industrialComplex") },
                    { count: 1, type: unit("infantry") },
                    { count: 1, type: unit("tank") }
                ]
            }
        },
        iwoJima: {
            type: "land",
            name: "Iwo Jima",
            income: 0,
            originalOwner: "japan",
            turnStartController: "japan",
            currentController: "japan",
            adjacent: {
                sz59: true
            },
            contains: {
                none: false,
                japan: [
                    { count: 1, type: unit("infantry") }
                ]
            }
        },
        japan: {
            type: "land",
            name: "Japan",
            isVictoryCity: "Tokyo",
            isCapital: true,
            income: 8,
            originalOwner: "japan",
            turnStartController: "japan",
            currentController: "japan",
            adjacent: {
                sz60: true,
                sz62: true
            },
            contains: {
                none: false,
                japan: [
                    { count: 1, type: unit("antiaircraftArtillery") },
                    { count: 1, type: unit("artillery") },
                    { count: 1, type: unit("bomber") },
                    { count: 1, type: unit("fighter") },
                    { count: 1, type: unit("industrialComplex") },
                    { count: 4, type: unit("infantry") },
                    { count: 1, type: unit("tank") },
                ]
            }
        },
        karelia: {
            type: "land",
            name: "Karelia",
            isVictoryCity: "Leningrad",
            income: 2,
            originalOwner: "ussr",
            turnStartController: "ussr",
            currentController: "ussr",
            adjacent: {
                archangel: true,
                balticStates: true,
                belorussia: true,
                finland: true,
                westRussia: true,
                sz04: true,
                sz05: true
            },
            contains: {
                none: false,
                ussr: [
                    { count: 1, type: unit("artillery") },
                    { count: 1, type: unit("industrialComplex") },
                    { count: 1, type: unit("fighter") },
                    { count: 4, type: unit("infantry") }
                ]
            }
        },
        kazakh: {
            type: "land",
            name: "Kazakh",
            income: 2,
            originalOwner: "ussr",
            turnStartController: "ussr",
            currentController: "ussr",
            adjacent: {
                caucasus: true,
                novosibirsk: true,
                persia: true,
                russia: true,
                sinkiang: true,
                szechwan: true
            },
            contains: {
                none: false,
                ussr: [
                    { count: 1, type: unit("infantry") }
                ]
            }
        },
        kiangsu: {
            type: "land",
            name: "Kiangsu",
            isVictoryCity: "Shanghai",
            income: 2,
            originalOwner: "japan",
            turnStartController: "japan",
            currentController: "japan",
            adjacent: {
                anhwei: true,
                kwangtung: true,
                manchuria: true,
                szechwan: true,
                sz61: true
            },
            contains: {
                none: false,
                japan: [
                    { count: 4, type: unit("infantry") }
                ]
            }
        },
        kwangtung: {
            type: "land",
            name: "Manchuria",
            income: 2,
            originalOwner: "japan",
            turnStartController: "japan",
            currentController: "japan",
            adjacent: {
                anhwei: true,
                kiangsu: true,
                szechwan: true,
                yunnan: true,
                sz61: true
            },
            contains: {
                none: false,
                japan: [
                    { count: 1, type: unit("artillery") },
                    { count: 1, type: unit("infantry") }
                ]
            }
        },
        libya: {
            type: "land",
            name: "Libya",
            income: 1,
            originalOwner: "germany",
            turnStartController: "germany",
            currentController: "germany",
            adjacent: {
                algeria: true,
                egypt: true,
                sz15: true
            },
            contains: {
                none: false,
                germany: [
                    { count: 1, type: unit("infantry") },
                    { count: 1, type: unit("tank") }
                ]
            }
        },
        malaya: {
            type: "land",
            name: "Malaya",
            income: 1,
            originalOwner: "japan",
            turnStartController: "japan",
            currentController: "japan",
            adjacent: {
                frenchIndoChinaThailand: true,
                sz36: true
            },
            contains: {
                none: false,
                japan: [
                    { count: 1, type: unit("infantry") }
                ]
            }
        },
        manchuria: {
            type: "land",
            name: "Manchuria",
            income: 3,
            originalOwner: "japan",
            turnStartController: "japan",
            currentController: "japan",
            adjacent: {
                anhwei: true,
                buryatia: true,
                kiangsu: true,
                sz62: true
            },
            contains: {
                none: false,
                japan: [
                    { count: 1, type: unit("fighter") },
                    { count: 3, type: unit("infantry") }
                ]
            }
        },
        mexico: {
            type: "land",
            name: "Mexico",
            income: 2,
            originalOwner: "unitedStates",
            turnStartController: "unitedStates",
            currentController: "unitedStates",
            adjacent: {
                eastMexico: true,
                westernUnitedStates: true,
                sz55: true
            },
            contains: {
                none: true
            }
        },
        midway: {
            type: "land",
            name: "Midway",
            income: 0,
            originalOwner: "unitedStates",
            turnStartController: "unitedStates",
            currentController: "unitedStates",
            adjacent: {
                sz57: true
            },
            contains: {
                none: false,
                unitedStates: [
                    { count: 1, type: unit("infantry") }
                ]
            }
        },
        morocco: {
            type: "land",
            name: "Morocco",
            income: 1,
            originalOwner: "germany",
            turnStartController: "germany",
            currentController: "germany",
            adjacent: {
                algeria: true,
                sz13: true,
                sz14: true
            },
            contains: {
                none: false,
                germany: [
                    { count: 1, type: unit("infantry") }
                ]
            }
        },
        newGuinea: {
            type: "land",
            name: "New Guinea",
            income: 1,
            originalOwner: "japan",
            turnStartController: "japan",
            currentController: "japan",
            adjacent: {
                sz49: true
            },
            contains: {
                none: false,
                japan: [
                    { count: 1, type: unit("infantry") }
                ]
            }
        },
        newZealand: {
            type: "land",
            name: "New Zealand",
            income: 1,
            originalOwner: "unitedKingdom",
            turnStartController: "unitedKingdom",
            currentController: "unitedKingdom",
            adjacent: {
                sz40: true
            },
            contains: {
                none: false,
                unitedKingdom: [
                    { count: 1, type: unit("infantry") }
                ]
            }
        },
        northwesternEurope: {
            type: "land",
            name: "Northwestern Europe",
            income: 2,
            originalOwner: "germany",
            turnStartController: "germany",
            currentController: "germany",
            adjacent: {
                france: true,
                germany: true,
                sz05: true,
                sz06: true,
                sz08: true
            },
            contains: {
                none: false,
                germany: [
                    { count: 1, type: unit("fighter") },
                    { count: 1, type: unit("infantry") },
                    { count: 1, type: unit("tank") }
                ]
            }
        },
        norway: {
            type: "land",
            name: "Norway",
            income: 2,
            originalOwner: "germany",
            turnStartController: "germany",
            currentController: "germany",
            adjacent: {
                finland: true,
                sz03: true,
                sz05: true,
                sz06: true
            },
            contains: {
                none: false,
                germany: [
                    { count: 2, type: unit("infantry") },
                    { count: 1, type: unit("fighter") }
                ]
            }
        },
        novosibirsk: {
            type: "land",
            name: "Novosibirsk",
            income: 1,
            originalOwner: "ussr",
            turnStartController: "ussr",
            currentController: "ussr",
            adjacent: {
                evenkiNationalOkrug: true,
                kazakh: true,
                russia: true,
                sinkiang: true,
                vologda: true
            },
            contains: {
                none: false,
                ussr: [
                    { count: 1, type: unit("infantry") }
                ]
            }
        },
        okinawa: {
            type: "land",
            name: "Okinawa",
            income: 0,
            originalOwner: "japan",
            turnStartController: "japan",
            currentController: "japan",
            adjacent: {
                sz51: true
            },
            contains: {
                none: false,
                japan: [
                    { count: 1, type: unit("infantry") }
                ]
            }
        },
        persia: {
            type: "land",
            name: "Persia",
            income: 1,
            originalOwner: "unitedKingdom",
            turnStartController: "unitedKingdom",
            currentController: "unitedKingdom",
            adjacent: {
                caucasus: true,
                india: true,
                kazakh: true,
                transJordan: true,
                sz34: true
            },
            contains: {
                none: false,
                unitedKingdom: [
                    { count: 1, type: unit("infantry") }
                ]
            }
        },
        philippineIslands: {
            type: "land",
            name: "Philippine Islands",
            isVictoryCity: "Manila",
            income: 3,
            originalOwner: "japan",
            turnStartController: "japan",
            currentController: "japan",
            adjacent: {
                sz48: true
            },
            contains: {
                none: false,
                japan: [
                    { count: 1, type: unit("artillery") },
                    { count: 1, type: unit("infantry") }
                ]
            }
        },
        poland: {
            type: "land",
            name: "Poland",
            income: 2,
            originalOwner: "germany",
            turnStartController: "germany",
            currentController: "germany",
            adjacent: {
                balticStates: true,
                belorussia: true,
                bulgariaRomania: true,
                germany: true,
                ukraine: true
            },
            contains: {
                none: false,
                germany: [
                    { count: 1, type: unit("fighter") },
                    { count: 2, type: unit("infantry") },
                    { count: 1, type: unit("tank") }
                ]
            }
        },
        rhodesia: {
            type: "land",
            name: "Rhodesia",
            income: 1,
            originalOwner: "unitedKingdom",
            turnStartController: "unitedKingdom",
            currentController: "unitedKingdom",
            adjacent: {
                angloEgyptianSudan: true,
                belgianCongo: true,
                italianEastAfrica: true,
                unionOfSouthAfrica: true,
                sz33: true
            },
            contains: {
                none: true
            }
        },
        russia: {
            type: "land",
            name: "Russia",
            isVictoryCity: "Moscow",
            isCapital: true,
            income: 8,
            originalOwner: "ussr",
            turnStartController: "ussr",
            currentController: "ussr",
            adjacent: {
                archangel: true,
                caucasus: true,
                kazakh: true,
                novosibirsk: true,
                vologda: true,
                westRussia: true
            },
            contains: {
                none: false,
                ussr: [
                    { count: 1, type: unit("antiaircraftArtillery") },
                    { count: 1, type: unit("artillery") },
                    { count: 1, type: unit("fighter") },
                    { count: 1, type: unit("industrialComplex") },
                    { count: 4, type: unit("infantry") },
                    { count: 2, type: unit("tank") },
                ]
            }
        },
        sinkiang: {
            type: "land",
            name: "Sinkiang",
            income: 1,
            originalOwner: "unitedStates",
            turnStartController: "unitedStates",
            currentController: "unitedStates",
            adjacent: {
                anhwei: true,
                evenkiNationalOkrug: true,
                kazakh: true,
                novosibirsk: true,
                szechwan: true
            },
            contains: {
                none: true
            }
        },
        solomonIslands: {
            type: "land",
            name: "Solomon Islands",
            income: 0,
            originalOwner: "japan",
            turnStartController: "japan",
            currentController: "japan",
            adjacent: {
                sz44: true
            },
            contains: {
                none: false,
                japan: [
                    { count: 1, type: unit("infantry") }
                ]
            }
        },
        southernEurope: {
            type: "land",
            name: "Southern Europe",
            income: 2,
            originalOwner: "germany",
            turnStartController: "germany",
            currentController: "germany",
            adjacent: {
                bulgariaRomania: true,
                italy: true,
                germany: true,
                sz15: true,
            },
            contains: {
                none: false,
                germany: [
                    { count: 1, type: unit("artillery") },
                    { count: 1, type: unit("infantry") }
                ]
            }
        },
        sovietFarEast: {
            type: "land",
            name: "Soviet Far East",
            income: 1,
            originalOwner: "ussr",
            turnStartController: "ussr",
            currentController: "ussr",
            adjacent: {
                buryatia: true,
                yakut: true,
                sz63: true
            },
            contains: {
                none: false,
                ussr: [
                    { count: 2, type: unit("infantry") }
                ]
            }
        },
        szechwan: {
            type: "land",
            name: "Szechwan",
            income: 1,
            originalOwner: "unitedStates",
            turnStartController: "unitedStates",
            currentController: "unitedStates",
            adjacent: {
                anhwei: true,
                kazakh: true,
                kiangsu: true,
                kwangtung: true,
                sinkiang: true,
                yunnan: true
            },
            contains: {
                none: false,
                unitedStates: [
                    { count: 1, type: unit("fighter") },
                    { count: 2, type: unit("infantry") }
                ] 
            }
        },
        transJordan: {
            type: "land",
            name: "Trans-Jordan",
            income: 1,
            originalOwner: "unitedKingdom",
            turnStartController: "unitedKingdom",
            currentController: "unitedKingdom",
            adjacent: {
                egypt: true,
                persia: true,
                sz17: true,
                sz34: true
            },
            contains: {
                none: false,
                unitedKingdom: [
                    { count: 1, type: unit("infantry") }
                ]
            }
        },
        ukraine: {
            type: "land",
            name: "Ukraine",
            income: 2,
            originalOwner: "germany",
            turnStartController: "germany",
            currentController: "germany",
            adjacent: {
                belorussia: true,
                bulgariaRomania: true,
                caucasus: true,
                poland: true,
                westRussia: true,
                sz16: true
            },
            contains: {
                none: false,
                germany: [
                    { count: 1, type: unit("artillery") },
                    { count: 1, type: unit("bomber") },
                    { count: 1, type: unit("fighter") },
                    { count: 3, type: unit("infantry") },
                    { count: 1, type: unit("tank") }
                ]
            }
        },
        unionOfSouthAfrica: {
            type: "land",
            name: "Union of South Africa",
            income: 2,
            originalOwner: "unitedKingdom",
            turnStartController: "unitedKingdom",
            currentController: "unitedKingdom",
            adjacent: {
                belgianCongo: true,
                rhodesia: true,
                sz27: true,
                sz28: true
            },
            contains: {
                none: true
            }
        },
        unitedKingdom: {
            type: "land",
            name: "United Kingdom",
            isVictoryCity: "London",
            isCapital: true,
            income: 8,
            originalOwner: "unitedKingdom",
            turnStartController: "unitedKingdom",
            currentController: "unitedKingdom",
            adjacent: {
                sz06: true,
                sz07: true,
                sz08: true
            },
            contains: {
                none: false,
                unitedKingdom: [
                    { count: 1, type: unit("antiaircraftArtillery") },
                    { count: 1, type: unit("artillery") },
                    { count: 1, type: unit("bomber") },
                    { count: 1, type: unit("fighter") },
                    { count: 1, type: unit("industrialComplex") },
                    { count: 2, type: unit("infantry") },
                    { count: 2, type: unit("tank") }
                ]
            }
        },
        vologda: {
            type: "land",
            name: "Vologda",
            income: 2,
            originalOwner: "ussr",
            turnStartController: "ussr",
            currentController: "ussr",
            adjacent: {
                archangel: true,
                evenkiNationalOkrug: true,
                novosibirsk: true,
                russia: true
            },
            contains: {
                none: true
            }
        },
        wakeIsland: {
            type: "land",
            name: "Wake Island",
            income: 0,
            originalOwner: "japan",
            turnStartController: "japan",
            currentController: "japan",
            adjacent: {
                sz52: true
            },
            contains: {
                none: false,
                japan: [
                    { count: 1, type: unit("infantry") }
                ]
            }
        },
        westIndies: {
            type: "land",
            name: "West Indies",
            income: 1,
            originalOwner: "unitedStates",
            turnStartController: "unitedStates",
            currentController: "unitedStates",
            adjacent: {
                sz18: true
            },
            contains: {
                none: true
            }
        },
        westRussia: {
            type: "land",
            name: "West Russia",
            income: 2,
            originalOwner: "germany",
            turnStartController: "germany",
            currentController: "germany",
            adjacent: {
                archangel: true,
                belorussia: true,
                caucasus: true,
                karelia: true,
                russia: true,
                ukraine: true
            },
            contains: {
                none: false,
                germany: [
                    { count: 1, type: unit("artillery") },
                    { count: 3, type: unit("infantry") },
                    { count: 1, type: unit("tank") }
                ]
            }
        },
        westernAustralia: {
            type: "land",
            name: "Western Australia",
            income: 1,
            originalOwner: "unitedKingdom",
            turnStartController: "unitedKingdom",
            currentController: "unitedKingdom",
            adjacent: {
                easternAustralia: true,
                sz38: true,
                sz46: true
            },
            contains: {
                none: false,
                unitedKingdom: [
                    { count: 1, type: unit("infantry") }
                ]
            }
        },
        westernCanada: {
            type: "land",
            name: "Western Canada",
            income: 1,
            originalOwner: "unitedKingdom",
            turnStartController: "unitedKingdom",
            currentController: "unitedKingdom",
            adjacent: {
                alaska: true,
                easternCanada: true,
                westernUnitedStates: true,
                sz65: true
            },
            contains: {
                none: false,
                unitedKingdom: [
                    { count: 1, type: unit("infantry") }
                ]
            }
        },
        westernUnitedStates: {
            type: "land",
            name: "Western United States",
            isVictoryCity: "Los Angeles",
            income: 10,
            originalOwner: "unitedStates",
            turnStartController: "unitedStates",
            currentController: "unitedStates",
            adjacent: {
                centralUnitedStates: true,
                mexico: true,
                westernCanada: true,
                sz56: true
            },
            contains: {
                none: false,
                unitedStates: [
                    { count: 1, type: unit("antiaircraftArtillery") },
                    { count: 1, type: unit("fighter") },
                    { count: 2, type: unit("infantry") },
                    { count: 1, type: unit("industrialComplex") }
                ]
            }
        },
        yakut: {
            type: "land",
            name: "Yakut",
            income: 1,
            originalOwner: "ussr",
            turnStartController: "ussr",
            currentController: "ussr",
            adjacent: {
                buryatia: true,
                evenkiNationalOkrug: true,
                sovietFarEast: true
            },
            contains: {
                none: false,
                ussr: [
                    { count: 1, type: unit("infantry") }
                ]
            }
        },
        yunnan: {
            type: "land",
            name: "Yunnan",
            income: 1,
            originalOwner: "unitedStates",
            turnStartController: "unitedStates",
            currentController: "unitedStates",
            adjacent: {
                burma: true,
                frenchIndoChinaThailand: true,
                kwangtung: true,
                szechwan: true,
                sz61: true
            },
            contains: {
                none: false,
                unitedStates: [
                    { count: 2, type: unit("infantry") }
                ] 
            }
        },
    }
    return mapArray[location];
}
/**
 * Returns boolean true if location is friendly, otherwise false
 * @todo - eventually, have to implement canals, movement, and potential combats through this function.
 * the function is run on the map, and a new map with nodes and edges is generated for "friendly" travel.
 * note that air units have different pathing.
 * @param {string} location - location
 * @param {string} power - e.g. "ussr", "germany", "unitedKingdom", "japan", "unitedStates"
 * @returns boolean - true if friendly, false if not
 */
function locationIsFriendly(power, location) {
    // If location is controlled by "none", it is friendly.
    // note:  how are ICs handled?
    const alliesFaction = { ussr: true, unitedKingdom: true, unitedStates: true, none: true };
    const axisFaction = { germany: true, japan: true, none: true };
    // if both are true then Allied unit Allied territory is friendly.  If both are false then Axis unit axis territory is friendly.  A ternary expression might run faster though would be more difficult to read.
    if (alliesFaction[power] === alliesFaction[mapNode(location).currentController]) {
        return true;
    } else {
        return false;
    }
}
/**
 * Returns power Object
 * @todo - create a territory tester to output values, test connections, basically check everything!
 * @param {string} location - location
 * @returns {boolean} - true if friendly, false if not
 */
function power(thingy) { }

/**
 * Generates diceroll Object
 * @param {Object[]} unitsArray - array of objects each containing unit count, and unit Object.
 * e.g.
 * [
 *   {count: 4, type: unit("infantry")},
 *   {count: 3, type: unit("artillery")}
 * ]
 * @param {string} attribute - e.g. "attack" or "defense"; key of unit Object
 * @returns {Object} - diceroll object.
 * e.g. {"one": 15, "three": 12} fifteen dice rolls requiring one or less to hit, and twelve dice rolls requiring three or less to hit
 */
function generateDicerollObject(unitsArray, attribute) {
    let dicerollObject = {};
    for (let i = 0; i < unitsArray.length; i++) {
        if (!dicerollObject[unitsArray[i].type[attribute]]) {
            dicerollObject[unitsArray[i].type[attribute]] = unitsArray[i].count;
        } else {
            dicerollObject[unitsArray[i].type[attribute]] += unitsArray[i].count;
        }
    }
    return dicerollObject;
}
/**
 * Generates diceroll Object consistent with rules for defending antiaircraft guns.
 * @todo:  Consider changing airUnits from array of unit Objects to array of numbers.  But this would be inconsistent with how data is gathered and used elsewhere.
 * @param {Object} antiaircraftArtilleryUnitsObject - antiaircraftArtillery units Object e.g. {count: 2, type: unit("antiaircraftArtillery")}
 * @param {Object[]} attAirUnitsArray - array of attacking air Objects each containing unit count, and Object.  e.g.
 * [
 *   {count: 4, type: unit("fighter")},
 *   {count: 3, type: unit("bomber")}
 * ]
 * @param {Object} dicerollObject - e.g.
 * {"one": 15, "three": 12}
 * (fifteen dice rolls requiring one or less to hit, and twelve dice rolls requiring three or less to hit)
 * @returns {Object} - modified diceroll object.
 */
function generateDicerollObjectDefAntiaircraftArtillery(antiaircraftArtilleryUnitsObject, attAirUnitsArray) {
    let airCount = 0;
    let dicerollObject = {};
    for (const airUnits of attAirUnitsArray) {
        airCount += airUnits.count;
    }
    dicerollObject[antiaircraftArtilleryUnitsObject.type.defense] = Math.min(antiaircraftArtilleryUnitsObject.count * 3, airCount);
    return dicerollObject;
}
/**
 * Modifies diceroll Object consistent with rules for attacking infantry and artillery.
 * @param {number} attInfantryCount - number of attacking infantry
 * @param {number} attArtilleryCount - number of attacking artillery
 * @param {Object} dicerollObject - e.g.
 * {"one": 15, "three": 12}
 * (fifteen dice rolls requiring one or less to hit, and twelve dice rolls requiring three or less to hit)
 * @returns {Object} - modified diceroll object.
 */
function modDicerollObjectAttLandMods(attInfantryCount, attArtilleryCount, dicerollObject) {
    const boostCount = Math.min(attInfantryCount, attArtilleryCount);
    dicerollObject.one -= boostCount;
    dicerollObject.two += boostCount;
    return dicerollObject;
}
/**
 * Internal check function to test if all probabilities in a probability array sum to 1.  Currently only evaluates total, does not compare.
 * @todo - implement to check for approximate equality to 1, and throw errors.  There will be rounding errors.  Look at epsilon function.
 * @param {number[]} arrayToCheck - array of numbers that should sum to 1.
 * @returns {number} - currently, evaluates total of array probabilities.
 */
function arrayCheck(arrayToCheck) {
    let returnValue = 0;
    for (let i = 0; i < arrayToCheck.length; i++) {
        returnValue += arrayToCheck[i];
    }
    return returnValue;
}
/**
 * Calculates factorial n!
 * @todo test iteration speed against recursion speed.  If using recursion, use tail-end recursion to prevent stack overflow.
 * @param {number} n - number to be factorial'ed
 * @returns {number} - factorial of n
 */
function factorialCalc(n) {
    let returnValue = 1;
    if (n === 0 || n === 1) {
        return 1;
    } else {
        for (let i = 2; i <= n; i++) {
            returnValue *= i;
        }
        return returnValue;
    }
}
/**
 * Calculates n-element k-combinations, the "binomial coefficient" nCr, n >= k >= 0
 * n! /  (k! (n-k)! )
 * @todo:  Check for faster method e.g. not running full factorial.
 * @param {number} n - out of n units
 * @param {number} k - taken k at a time
 * @returns {number} - nCr (or nCk, as it were.)
 */
function combinationCalc(n, k) {
    return factorialCalc(n) / (factorialCalc(k) * factorialCalc(n - k));
}
/**
 * Generates array of hit probabilities from a group of dice that all require same number or less to hit.
 * E.g. if hit = hit probability and (1-hit) = miss probability, with 5 dice rolled:
 * probability of 0 hits: (hit)^0 * (1-hit)^5 * 5C0 (5C0 as in nCr, or perhaps nCk, calculated from combinationCalc(n, k).  So here, combinationCalc(5,0))
 * probability of 1 hits: (hit)^1 * (1-hit)^4 * 5C1
 * probability of 2 hits: (hit)^2 * (1-hit)^3 * 5C2
 * probability of 3 hits: (hit)^3 * (1-hit)^2 * 5C3
 * probability of 4 hits: (hit)^4 * (1-hit)^1 * 5C4
 * probability of 5 hits: (hit)^5 * (1-hit)^0 * 5C5
 * @todo - test to see if oneSixth etc. save time if entered as fraction, decimal, or if eliminated altogether.  Theoretically may save computation time?
 * @todo - rewrite code to utilize dice other than d6, as specified by user.
 * @param {string} diceToHit - string of the number, e.g. "two", or less required to hit on each six-sided dice
 * @param {number} numberOfDiceRolled - number of dice rolled
 * @returns {number[]} - array of probabilities that sum to approximately 1 (should be 1 exactly, but rounding errors)
 */
function simpleProbabilityArray(diceToHit, numberOfDiceRolled) {
    const diceProbability = { one: 1 / 6, two: 2 / 6, three: 3 / 6, four: 4 / 6, five: 5 / 6 }
    let returnArray = [];
    for (let i = 0; i <= numberOfDiceRolled; i++) {
        returnArray[i] = diceProbability[diceToHit] ** i * (1 - diceProbability[diceToHit]) ** (numberOfDiceRolled - i) * combinationCalc(numberOfDiceRolled, i)
    }
    return returnArray;
}
/**
 * Generates array of hit probabilities from two probability arrays.  Each probability array's elements should sum to 1.  Uses rest parameter syntax.
 * Error handling is not performed, as this function should only be called with exactly two arguments, from functoin combineProbabilityArrays
 * @param {number[]} array1 - a probability array
 * @param {number[]} array2 - a probability array
 * @returns {number[]} - combined probability array.
 */
function combineTwoProbabilityArrays(array1, array2) {
    let returnArray = [];
    for (let i = 0; i < array1.length; i++) {
        for (let j = 0; j < array2.length; j++) {
            if (!returnArray[i + j]) {
                returnArray[i + j] = array1[i] * array2[j];
            } else {
                returnArray[i + j] += array1[i] * array2[j];
            }
        }
    }
    return returnArray;
}
/**
 * Generates array of hit probabilities from two or more probability arrays.  Each probability array's elements should sum to 1.  Uses rest parameter syntax.
 * @param {number[]} ...args, functionally an array of probability arrays.
 * @returns {number[]} - combined probability array.
 */
function combineProbabilityArrays(...args) {
    if (args.length === 0) {
        return [1]; // array[0] indicates 0 hits, has 100% probability
    } else if (args.length === 1) {
        return args[0];
    }
    let returnArray = combineTwoProbabilityArrays(args[0], args[1]);
    for (let i = 2; i < args.length; i++) {
        returnArray = combineTwoProbabilityArrays(returnArray, args[i]);
    }
    return returnArray;
}
/**
 * Generates array of order of loss.  Takes in parameters and makes changes to OOL as specified by user and ruleset, including
 * Include GENERAL rules, SPECIFIC rules, and CONTINGENT rules.
 * General always applies first.
 * Specific triggers under less-usual but still common occurrences (like US fighters destroyed before USSR fighters, but US infantry destroyed after USSR infantry)
 * More specific triggers may be contingent on board situation.  e.g. OOL based on strength only is capital defense situation, or if enemy attacker has certain win percentage.  Lone submarines submerge, submarine-only defenders submerge.
 * Contingent depends on specific board situation and require a TERRITORY input and optional ROUND and optional SUBROUND input.  e.g. lone subs at one location fight, lone subs at another location submerge.  Or USSR submarine submerges round 1 Germany turn during the second subround of combat.
 * 
 * A.  Generic order of loss (infantry before tanks), user chooses between IPC cost or "strength", which is offense if attacking of defense if defending.
 * B.  Contingent order of loss (take fighters before carriers if safe landing zones and/or probability of defense high)
 * C.  Cyclical order of loss (remove infantry, then artillery, then single infantry and single tanks, e.g. when want to fill a transport on upcoming turn)
 * D.  Controlling nationality
 * E.  Controlling nationality by type (e.g. US fighters lost before USSR fighters, but USSR infantry lost before US infantry)
 * 
 * Control:  Input numbers of each unit.  Select IPC or strength, to generate OOL.  But can SPLIT and create a NEW unit of the same type.
 * Assigns unique group IDs (fighter/carriers), generates temporary units ()
 * @todo - Import ruleset from game object, after creating game object.
 * @param {Object[]} unitsArray - array of objects each containing unit count, and unit Object.
 * e.g.
 * [
 *   {count: 4, type: unit("infantry")},
 *   {count: 3, type: unit("artillery")}
 * ]
 * @returns {Object[]} - array of objects
 * e.g. {"one": 15, "three": 12} fifteen dice rolls requiring one or less to hit, and twelve dice rolls requiring three or less to hit
 */
function orderOfLoss() {

}


/*
Now we have dicerollObject.  We use this to reference a lookup; if the lookup does not exist, we create it.
First, two dimensional array, simple.  (only one "type" of dice).  Then two-dimensional array, complex (combines "simple" arrays).
{ one: 5, three: 4}
 
*/


// battleships two hits
// ools - automated.  like, uk/us air, take losses so forces even BUT leave USSR fighters alone.  Ease of use AND good control.
// or, hold a territory against max calculated counterattack, display probability.
// Also, OOL should allow for RETREAT POSSIBILITY under certain parameters.  Which will decrease the win percentage!

// carriers, carry fighters, splashdown after if can't land.  They KNOW if they can land or not beforehand.
// submerge in place of surprise strike.  attacker then defender.
// amphib assault units separate for retreats
// controlling power
// attacker fires all, then all attacker hits allocated.  defender fires all, then all defender hits allocated.
// can't hit air (submarines)
// can't BE hit BY air (unless eneemy destroyer)
// must max casualties

// each piece carries instructions to the combat handler
// first all pieces loaded in, then combat rules checked
// e.g. 6 battleships and 5 offloaded troops first, then attempts to
// create 6 support shots but only creates 5 because of 5 offloaded.
// mustLandOn
// initAlter
// transport (different sorts - 2 inf or 1 tank, 1 inf and 1 other, 
// industrialComplex
// indestructible
// can be captured
// stratbomb
// support shot:  type, and number
// navalbombardment - technically the unit has multiple attacks?
// allow for multiple attacks.
// landson carriers or NOT
// lands on controlled since beginning of turn OR NOT
// CANNOT hit air (subs)

// ools
// keep infantry alive
// keep 1 destroyer alive (conditions)
//
/*
tech:  jet power:  fighter defend 5
rockets:  1 AA gun within 3 spaces of IC fires one dice
super subs:  attack at 3
long range aircraft:  fighter 6, bombers 8
industrial technology:  cost -1
heavy bombers:  roll 3 dice.  or 2.
*/

/*
territory:  originalowner
currentowner
what happens if capital captured?  think about it.
controlled since beginning of turn?  affects IC produc and new IC place.
canals
*/



const BASE_URL = "https://opentdb.com/api.php?amount=10";
// https://opentdb.com/api.php?amount=10

const buttonPress = document.querySelector("button");
// const giphyInput = document.querySelector("input");

buttonPress.addEventListener("click", async (event) => {
    // telling async that this block is asynchronous.  We're going to add a wait.
    // let giphy = giphyInput.value;
    event.preventDefault();
    /* added event.preventDefault(); and async (event) two lines of code upper instructor Hernandez.  This particular API has some sort of functionality that has the default behavior creating issues.  So event.preventDefault prevents that default behavior.
    */
    await fetch(
        `${BASE_URL}`
    ).then((res) => res.json())
        .then((response) => {
            // console.log(response)
            // because we want to see what's in it
            let dataArray = response.results;
            for (let i = 0; i < dataArray.length; i++) {
                let questionCategory = dataArray[i].category;
                let questionType = dataArray[i].type;
                let questionDifficulty = dataArray[i].difficulty;
                let questionQuestion = dataArray[i].question;
                let questionCorrectAnswer = dataArray[i].correct_answer;
                let questionIncorrectAnswers = dataArray[i].incorrect_answers;
                // console.log(giphyObj);
                let newArticle = document.createElement("article");
                newArticle.classList.add("card");
                let newH2 = document.createElement("h2");
                newH2.textContent = questionCategory;
                newArticle.append(newH2);
                let newP = document.createElement("p");
                newP.textContent = questionQuestion;
                newArticle.append(newP);
                let newButton = document.createElement("button");
                newButton.innerText = "Show Answer";
                newArticle.append(newButton);
                let newPHidden = document.createElement("p");
                newPHidden.classList.add("hidden");
                newPHidden.textContent = questionCorrectAnswer;
                newArticle.append(newPHidden);

                document.querySelector("main").append(newArticle);


                // newImg.setAttribute("src", giphyObj)
                // document.querySelector("div").appendChild(newImg);

                /*
                    <article class="card">
          <h2>CATEGORY</h2>
          <p>QUESTION</p>
          <button>Show Answer</button>
          <p class="hidden">CORRECT ANSWER</p>
        </article>
                */
            }
        })
        // await for the data to get there.
        // limit = 25 means limit to 25 gifs
        // uses "response" because giphy uses "data" a lot.  So we don't want to use same-names.
        .catch((error) => {
            console.log(error);
        })
})


/*
chatbot advice
There is no surefire formula for creating a successful story, as different types of stories appeal to different audiences. However, there are some elements that are commonly found in stories that sell well:

    Strong characters: Engaging, well-developed characters are often essential to a successful story. They should have unique personalities, motivations, and flaws that readers can relate to.

    Compelling plot: A compelling plot is essential to keep readers engaged. This might involve introducing interesting conflicts, twists, and plot points that keep readers guessing and invested in the story.

    Unique setting: A unique or unusual setting can help to set a story apart and make it more memorable.

    Good pacing: Good pacing involves balancing action, dialogue, and description to keep the story moving forward and prevent it from becoming bogged down or overly predictable.

    Emotional depth: Stories that resonate with readers often have emotional depth, meaning that they explore complex emotions and relationships in a meaningful way.

    Strong writing: Good writing is essential to any successful story. This might involve using descriptive language, varied sentence structure, and effective dialogue to bring the story to life.

Ultimately, the key to creating a successful story is to find a unique angle and tell a compelling, engaging tale that resonates with readers.

There are several prerequisites that can be helpful for students to have a strong foundation in before learning machine learning. These include:

    Programming skills: It is typically helpful to have a strong understanding of at least one programming language, such as Python or Java, in order to implement machine learning algorithms and work with data.

    Statistics: A basic understanding of statistical concepts, such as probability, mean, median, and standard deviation, can be helpful for understanding how machine learning algorithms work and interpreting the results of your models.

    Linear algebra: Many machine learning algorithms involve linear algebra operations, such as matrix multiplication and singular value decomposition. A basic understanding of these concepts can be helpful for understanding how these algorithms work and implementing them in code.

    Calculus: Some machine learning algorithms, such as gradient descent, involve derivatives and integrals. A basic understanding of calculus can be helpful for understanding these concepts and how they are used in machine learning.

 In addition to these technical prerequisites, it can also be helpful to have strong problem-solving and critical thinking skills, as well as a strong curiosity about how machine learning can be applied to solve real-world problems.
*/