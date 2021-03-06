/*  
    !WHAT IS THIS?!
    This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
    Import this file using the "Add Extra Materials" bookmark.

    !KEEP IN MIND!
    It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making my character with it).
*/

/*  
    !INFORMATION!
    Subject:    Class
    Effect:     This script adds a class called the "Alternate Artificer" and will add its 7 subclasses once completed.

                This class has been made by /u/KibblesTasty on the subreddit r/UnearthedArcana
                It can be found here: http://redd.it/e8rbvz
                This code is based on v2.0.2 of /u/KibblesTasty's work (2019-12-10)

                This script was based upon most of MPMB's scripts.

    Code by:    Mechana
    Date:       2020-02-07 (sheet v13)
*/

/*  
    !IMPORTANT!
	The class' name is "artificer" and will therefor conflict with the Artificer from Unearthed Arcana or other Artificers.
	If you include both this script and the UA:A/other source, you will notice that the classes conflict with each other, using whichever one is newer.
    It is recommended to have either this source or the UA:A/other source included, but never both, as they might interfere with each other.
    
    This class also has a lot of information to cover. Some of the features are very shortened versions of the full feature.
    Make sure you read the full description from the source. Also, I used a lot of different methods to fit the info, some of them are a little weird
*/

/** 
 * TODO: Changes for the update to v13 of sheet
 * | Use getFeatureChoice to check for chosen features
 * | Make a lot of the features/upgrades into magic items
 * | Add automation for ability score changes 
 * | Add automation for spell DC/attack changes
 */
/**
 * TODO: Changes and automation
 * | Rewrite the Cannonsmith subclass to be closer to MPMB's standards, fix bugs, and update to 2.0.2 of the class and v13 of the sheet
 * | Rewrite the Gadgetsmith subclass to be closer to MPMB's standards, fix bugs, and update to 2.0.2 of the class and v13 of the sheet
 * | Rewrite the Warsmith subclass to be closer to MPMB's standards, fix bugs, and update to 2.0.2 of the class and v13 of the sheet
 * | (Undo this) Move Specialization Upgrade to each subclass rather then having It in the main class
 * | Automate the Gadgetsmith's Mechanical Familiar upgrade
 * | Write the code for Golemsmith
 * | Write the code for Infustionsmith
 * | Write the code for Potionsmith
 * | Write the code for Wandsmith
 */

var iFileName = "Kibbles Alternate Artificer v2.0.2 [KibblesTasty's work, transcribed by Mechana].js";
RequiredSheetVersion(13);

SourceList["KT:AA"] = {
    name : "/u/KibblesTasty: Alternate Artificer (v2.0.2)",
    abbreviation : "KT:AA",
    group : "Reddit/r/UnearthedArcana",
    url : "http://redd.it/e8rbvz",
    date : "2019/12/10"
};

//first make the sheet know which spells are artificer spells
[
    // 1st level
    "alarm",
    "arcane ablation",
    "arcane weapon",
    "bond item",
    "catapult",
    "comprehend languages",
    "cure wounds",
    "detect magic",
    "disguise self",
    "expeditious retreat",
    "fall",
    "false life",
    "feather fall",
    "grease",
    "identify",
    "illusory script",
    "jump",
    "longstrider",
    "sanctuary",
    "seeking projectile",
    "snare",
    "unburden",
    "unseen servant",
    "tenser's floating disk",
    // 2nd level
    "aid",
    "alter self",
    "arcane lock",
    "blur",
    "cloud of daggers",
    "darkvision",
    "earthbind",
    "enhance ability",
    "enlarge/reduce",
    "find traps",
    "heat metal",
    "hold person",
    "imbue luck",
    "invisibility",
    "knock",
    "lightning charged",
    "locate object",
    "magic weapon",
    "magic mouth",
    "nystul's magic aura",
    "protection from poison",
    "see invisibility",
    "spider climb",
    "thunderburst mine",
    // 3rd level
    "dispel magic",
    "dispel construct",
    "elemental weapon",
    "feign death",
    "flame arrows",
    "fireburst mine",
    "gaseous form",
    "glyph of warding",
    "life transference",
    "lightning arrow",
    "magic circle",
    "nondetection",
    "protection from energy",
    "sending",
    "tiny servant",
    "wall of sand",
    "water breathing",
    "water walk",
    "wind wall",
    // 4th level
    "arcane eye",
    "death ward",
    "fabricate",
    "fire shield",
    "freedom of movement",
    "greater invisibility",
    "leomund's secret chest",
    "otiluke's resilient sphere",
    "repair",
    "stone shape",
    "stoneskin",
    "sickening radiance",
    // 5th level
    "animate objects",
    "creation",
    "hold monster",
    "legend lore",
    "mislead",
    "passwall",
    "skill empowerment",
    "telekinesis",
    "teleportation circle",
    "transmute rock",
    "vorpal weapon",
    "wall of stone"
].forEach( function (s) {
    if(SpellsList[s] && SpellsList[s].classes && SpellsList[s].classes.indexOf("alternate artificer") === -1) SpellsList[s].classes.push("alternate artificer");
});

//*****************************************************-Class-********************************************************\\

ClassList["alternate artificer"] = {
    regExpSearch : /^(?=.*artificer)(?!.*wizard).*$/i,
    name : "Alternate Artificer",
    source : ["KT:AA", 1],
    primaryAbility : "\n \u2022 Artificer: Thunder/Gadget: Dexterity\n\t Golem/Infusion/Potion: Intelligence\n\t War/Flesh: Strength",
    abilitySave : 4,
    prereqs : "Intelligence 13",
    improvements :  [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
    die : 8,
    saves : ["Con", "Int"],
    skillstxt : {
		primary : "Choose three from Arcana, Deception, History, Investigation, Medicine, Nature, Religion, and Sleight of Hand",
        secondary : "You get Arcana"
    },
    toolProfs : { 
        primary : [["Thieves' Tools"], ["Any tool", 1]]
    },
    armorProfs : [
        [true, true, false, false],
        [true, false, false, false]
    ],
    weaponsProfs : [
        [true, false, ["hand crossbow", "heavy crossbow"]]
    ],
    equipment : "Artificer starting equipment:" + 
        "\n \u2022 A light crossbow and 20 bolts -or- any two simple weapons;" + 
        "\n \u2022 Scale mail -or- leather armor -or- chain mail;" + 
        "\n \u2022 Thieves' tools and a dungeoneer's pack." + 
        "\n\nAlternatively, choose 5d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
    subclasses : ["Artificer Specialization", [
        "alternate artificer-thundersmith",
        ////"alternate artificer-gadgetsmith",
        ////"alternate artificer-golemsmith",
        ////"alternate artificer-infusionsmith",
        ////"alternate artificer-potionsmith",
        ////"alternate artificer-warsmith",
        ////"alternate artificer-fleshsmith"
    ]],
    attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    spellcastingFactor : 2,
    spellcastingKnown : {
        spells : [0, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12]
    },
    features : {
        "subclassfeature1" : {
            name : "Artificer Specialization",
            source : ["KT:AA", 3],
            minlevel : 1,
            description : desc([
                "Choose the Specialization you focus your craft on and put it in the \"Class\" field"
            ])
        },
        "magic item analysis" : {
            name : "Magic Item Analysis",
            source : ["KT:AA", 3],
            minlevel : 1,
            description : desc([
                "I can cast Detect Magic and Identify as rituals without material components"
            ]),
            spellcastingBonus : [{
                name :  "Magic Item Analysis",
                spells : ["detect magic"],
                selection : ["detect magic"],
                firstCol : "",
            }, {
                name : "Magic Item Analysis",
                spells : ["identify"],
                selection : ["identify"],
                firstCol : ""
            }],
            changeeval : function(lvl) {
                if (lvl[1] >= 11) {
                    ClassList["alternate artificer"].features["magic item analysis"].spellcastingBonus[0].firstCol = "atwill";
                    ClassList["alternate artificer"].features["magic item analysis"].spellcastingBonus[1].firstCol = "atwill";
                }
            },
        },
        "tool expertise" : {
            name : "Tool Expertise",
            source : ["KT:AA", 3],
            minlevel : 2,
            description : " [Double proficiency with any tools from this class]",
            skillstxt : "I get double proficiency with any tool proficiencies I gain from the artificer class."
        },
        "spellcasting" : {
            name : "Spellcasting",
            source : ["KT:AA", 3],
            minlevel : 2,
            description : desc([
                "I can cast artificer spells that I know, using Intelligence as my spellcasting ability",
                "I can use an arcane focus as a spellcasting focus"
            ]),
            additional : levels.map(function (n, idx) {
                return n < 2 ? "" : [0, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12][idx] + " spells known";
            })
        },
        "arcane reconstruction" : {
            name : "Arcane Reconstruction",
            source : ["KT:AA", 4],
            minlevel : 6,
            description : desc([
                "I learn Mending and Cure Wounds (which can also heal constructs) as artificer spells",
                "If I already know Cure Wounds I can take another spell from the Artificer list"
            ]),
            spellcastingBonus : [{
                name : "Arcane Reconstruction",
                spells : ["mending"],
                selection : ["mending"]
            }, {
                name : "Arcane Reconstruction",
                spells : ["cure wounds"],
                selection : ["cure wounds"],
            }]
        },
        "cross disciplinary knowledge" : {
            name : "Cross Disciplinary Knowledge",
            source : ["KT:AA", 4],
            minlevel : 6,
            description : desc([
                "Use the \"Choose Features\" button to add a feature from another subclass"
            ]),
            choices: ["Stormforged Weapon", "Infused Armament", "Alchemical Reagents Pouch", "Gadgetsmith Upgrade"],
            "stormforged weapon" : {
                name : "Stormforged Weapon",
                description : desc([
                    "I get a Thundersmith's Stormforged Weapon, I get prof and how to make the ammo"
                ]),
                source : ["KT:AA", 4]
                //TODO: Add automation
            },
            "infused armament" : {
                name : "Infused Armament",
                description : desc([
                    "I get an Infusionsmith's Animated Weapon, Blasting Rod, or infused weapon"
                ]),
                source : ["KT:AA", 4]
                //TODO: Add automation
            },
            "alchemical reagents pouch" : {
                name : "Alchemical Reagents Pouch",
                description : desc([
                    "I get a Potionsmith's Alchemical Reagents Pouch and Alchemical Fire or Acid"
                ]),
                source : ["KT:AA", 4]
                //TODO: Add automation
            },
            "gadgetsmith upgrade" : {
                name : "Gadgetsmith Upgrade",
                description : desc([
                    "I get an unrestricted Gadgetsmith Upgrade"
                ]),
                source : ["KT:AA", 4]
                //TODO: Add automation
            }
        },
        "wondrous items proficiency" : {
            name : "Wondrous Items Proficiency",
            source : ["KT:AA", 4],
            minlevel : 7,
            description : desc([
                "I can attune to 4 and, ignore class based restrictions on, magical items"
            ]),
        },
        "improved magical crafting" : {
            name : "Improved Magical Crafting",
            source : ["KT:AA", 4],
            minlevel : 10,
            description : desc([
                "I can make a magic item in half the normal time. I can use 1 hr of a LR to:",
                "Make progress toward crafting a magic item, scroll, or potion"
            ])
        },
        "wondrous item recharge" : {
            name : "Wondrous Item Recharge",
            source : ["KT:AA", 4],
            minlevel : 10,
            description : desc([
                "I can refill a magic item's charges needed to use it once, if they are used to cast spells",
                "I spend 1 min and a spell slot grater then or equal to the level of the spell the item casts"
            ])
        },
        "study of magic" : {
            name : "Study of Magic",
            source : ["KT:AA", 4],
            minlevel : 11,
            description : " [Detect Magic and Identify at will]" + desc([
                "I have adv on all Int(Arcana) checks about magical traps, effects, or runes"
            ]),
            skillstxt : "adv on Int(Arcana) checks about magical traps, effects, or runes"
        },
        "wondrous item mastery" : {
            name : "Wondrous Item Mastery",
            source : ["KT:AA", 4],
            minlevel : 18,
            description : desc([
                "I can activate a magic item that would normally take an action as a bonus action"
            ])
        },
        "peerless inventor" : {
            name : "Peerless Inventor",
            source : ["KT:AA", 4],
            minlevel : 20,
            description : desc([
                "After every short rest I can select one extra 11th or lower upgrade from my subclass"
            ])
        },
    }
};

//***************************************************-Subclasses-*****************************************************\\

upgradeAdditionalMaker = function(n) {
    return !n ? "" : n + " upgrade" + (n > 1 ? "s" : "") + " known";
}

ClassSubList["alternate artificer-thundersmith"] = {
    regExpSearch : /thundersmith/i,
    subname : "Thundersmith",
    source : ["KT:AA", 22],
    features : {
        "subclassfeature1" : {
            name : "Bonus Proficiency",
            source : ["KT:AA", 22],
            minlevel : 1,
            description : " [tinker's tools, smith's tools]" + desc([
                "I can create up to 50 rounds of ammunition during a LR (1gp per 10 rounds)"
            ]),
            toolProfs : ["Smith's Tools", "Tinker's Tools"]
        },
        "subclassfeature1.1" : {
            name : "Stormforged Weapon",
            source : ["KT:AA", 22],
            minlevel : 1,
            description : " [create more: 3 days + 200 gp]" + desc([
                "I forge a Stormforged Weapon, a wondrous weapon that only I can attune to",
            ]),
            eval : function(lvl, chc) {
                AddMagicItem("Stormforged Weapon");
            },
            removeeval : function(lvl, chc) {
                RemoveMagicItem("Stormforged Weapon");
            }
        },
        "subclassfeature3" : {
            name : "Thundermonger",
            source : ["KT:AA", 6],
            minlevel : 3,
            description : desc([
                "Once per turn, I can deal an extra 1d6 thunder dmg to a creature shoot", 
                "This extra damage increases by 1d6 when I reach certain levels in this class"
            ]),
            additional : levels.map(function (n, idx) {
                return n < 3 ? "" : [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9][idx] + "d6"; 
            }),//TODO: Automate this Nd6 with it's own function
            usages : 1,
            recovery : "turn"
        },
        "subclassfeature3.1" : {
            name : "Upgrades, Basic",
            source : ["KT:AA", 4],
            minlevel : 3,
            description : desc([
                "Use the \"Choose Features\" button to add Upgrades to the third page (See notes page)"
            ]),
            additional : [0,0,1,1].map(upgradeAdditionalMaker),
            extraTimes : [0,0,1,1],
            extraname : "Unrestricted Upgrade",
            extrachoices : [],
            toNotesPage : [{
                name : "Specialization Upgrade",
                note : [
                    "You select an additional Upgrade at ",
                    "5th, 7th, 9th, 11th, 13th, 15th, 17th, and 19th level.",
                    "You cannot select an Upgrade more than once,",
                    "unless the Upgrade's description says otherwise.",
                    "Whenever you level up, you can exchange one of your existing upgrades for",
                    "another upgrade of the same level requirement as the replaced upgrade.",
                    "   In any case that a specialization allows an Upgrade to be swapped out,",
                    "Upgrades must always be selected as if the Artificer is",
                    "the level they were when they got that Upgrade slot. For example,",
                    "if you replace your Stormforged Weapon and",
                    "reselect all of your upgrades as a 5th level Artificer,",
                    "you could select one 3rd level upgrade and one 5th level upgrade,",
                    "or two 3rd level upgrades, but you would not be able to select two 5th level upgrades."
                ],
                source : ["KT:AA", 4]
            }]
        },
        "subclassfeature5" : {
            name : "Devastating Blasts",
            source : ["KT:AA", 23],
            minlevel : 5,
            description : desc([
                "When I miss an attack, I can still apply Thundermonger damage, but it only deals half"
            ])
        },
        "subclassfeature5.1" : {
            name : "Upgrades, Level 5",
            source : ["KT:AA", 4],
            minlevel : 5,
            description : "",
            additional : [0,0,0,0,1,1,2,2].map(upgradeAdditionalMaker),
            extraTimes : [0,0,0,0,1,1,2,2],
            extraname : "Level 5 Upgrade",
            extrachoices : []
        },
        "subclassfeature9" : {
            name : "Upgrades, Level 9",
            source : ["KT:AA", 4],
            minlevel : 9,
            description : "",
            additional : [0,0,0,0,0,0,0,0,1,1].map(upgradeAdditionalMaker),
            extraTimes : [0,0,0,0,0,0,0,0,1,1],
            extraname : "Level 9 Upgrade",
            extrachoices : []
        },
        "subclassfeature11" : {
            name : "Upgrades, Level 11",
            source : ["KT:AA", 4],
            minlevel : 11,
            description : "",
            additional : [0,0,0,0,0,0,0,0,0,0,1,1,2,2].map(upgradeAdditionalMaker),
            extraTimes : [0,0,0,0,0,0,0,0,0,0,1,1,2,2],
            extraname : "Level 11 Upgrade",
            extrachoices : []
        },
        "subclassfeature14" : {
            name : "Unleashed Power",
            source : ["KT:AA", 23],
            minlevel : 14,
            description : desc([
                "When rolling dmg for Thundermonger, I can use a spell slot to reroll up to my Int mod",
                "worth of dice and maximize a number equal to to the level of the spell slot used"
            ])
        },
        "subclassfeature15" : {
			name : "Upgrades, Level 15",
			source : ["KT:AA", 4],
			minlevel : 15,
			description : "",
			additional : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,2,3,3].map(upgradeAdditionalMaker),
			extraTimes : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,2,3,3],
			extraname : "Level 15 Upgrade",
			extrachoices : []
		}
    }
};
//Unrestricted Upgrades

            // "echoing boom (prereq: incompatible with silencer)" : {
            //     name : "Echoing Boom",
            //     description : desc([
            //         "I pack extra power into my Thundermonger, increasing the damage it deals by 1d6"
            //     ]),
            //     source : ["KT:AA", 6],
            //     prereqeval : function(v) { 
            //         return GetFeatureChoice("class", "alternate artificer", "subclassfeature3", true).indexOf("silencer (prereq: incompatible with echoing boom)") == -1;
            //     }
            //     //TODO: Find out how to add full automation of this upgrade
            // },
            // "extended barrel" : {
            //     name : "Extended Barrel",
            //     description : desc([
            //         "The range of my Thunder Cannon increases by 30/90 feet",
            //         "I can take this upgrade 1 more time"
            //     ]),
            //     source : ["KT:AA", 6],
            //     calcChanges : {
            //         atkAdd : [
            //             function (fields, v) {
            //                 if (v.theWea.artThundercannon) {
            //                     fields.Range = "90/270 ft";
            //                 }
            //             },
            //             "Range increased by 30/90 ft"
            //         ]
            //     }
            // },
            // "extended barrel lv2 (prereq: extended barrel)" : {
            //     name : "Extended Barrel Lv2",
            //     description : desc([
            //         "The range of my Thunder Cannon increases by another 30/90 feet",
            //         "If I have the Bayonet upgrade, it gains the Reach property",
            //     ]),
            //     source : ["KT:AA", 6],
            //     prereqeval : function(v) {
            //         return GetFeatureChoice("class", "alternate artificer", "subclassfeature3", true).indexOf("extended barrel") != -1;
            //     },
            //     calcChanges : {
            //         atkAdd : [
            //             function (fields, v) {
            //                 if (v.theWea.artThundercannon) {
            //                     fields.Range = "120/360 ft";
            //                 }
            //                 if (v.theWea.artLightningBayonet) {
            //                     fields.Description += ", reach";
            //                 }
            //             },
            //             "Range increased by another 30/90 ft and added reach to the Lightning Bayonet"
            //         ]
            //     }
            // },
            // "lightning burst" : {
            //     name : "Lightning Burst",
            //     description : desc([
            //         "As an action, I can fire the cannon; without using ammo, in a 5ft wide, 60ft long line",
            //         "Creatures hit make a Dex save, and take Thundermonger's damage as Lightning damage",
            //         "They take half on a successful save. This action uses Thundermonger for the turn"
            //     ]),
            //     source : ["KT:AA", 6],
            //     action : ["action", ""]
            // },
            // "lightning charged bayonet" : {
            //     name : "Lightning Charged Bayonet",
            //     description : desc([
            //         "I add a finesse weapon melee weapon that I am proficient with to the end of my cannon,",
            //         "It deals 1d6 Piercing damage and I can use Thundermonger with it,",
            //         "but the damage type is lightning and counts as using it for the turn"
            //     ]),
            //     source : ["KT:AA", 6],
            //     weaponOptions : {
            //         regExpSearch : /^(?=.*lightning)(?=.*bayonet).*$/i,
            //         name : "Lightning Bayonet",
            //         source : ["KT:AA", 6],
            //         list : "alternate artificer",
            //         ability : 2,
            //         type : "Artificer Weapon",
            //         damage : [1, 6, "piercing"],
            //         range : "Melee",
            //         description : "Finesse",
            //         abilitytodamage : true,
            //         artLightningBayonet : true
            //     },
            //     weaponsAdd : ["Lightning Bayonet"],
            //     calcChanges : {
            //         atkAdd : [
            //             function (fields, v) {
            //                 if (v.theWea.artLightningBayonet) fields.Proficiency = true;
            //             },
            //             ""
            //         ]
            //     }
            // },
            // "silencer (prereq: incompatible with echoing boom)" : {
            //     name : "Silencer",
            //     description : desc([
            //         "My Thunder Cannon loses the Loud property",
            //         "I can use a 2nd lvl spell slot to overcharge the silencer, casting silence"
            //     ]),
            //     source : ["KT:AA", 6],
            //     prereqeval : function(v) { 
            //         return GetFeatureChoice("class", "alternate artificer", "subclassfeature3", true).indexOf("echoing boom (prereq: incompatible with silencer)") == -1;
            //     },
            //     calcChanges : {
			// 		atkAdd : [
			// 			function (fields, v) {
			// 				if (v.theWea.artThundercannon) {
			// 					fields.Description = fields.Description.replace(" Loud,", "");
			// 				}
			// 			},
			// 			"My Thunder Cannon loses the Loud property."
			// 		]
			// 	},
            // },
            // "shock absorber" : {
            //     name : "Shock Absorber",
            //     description : desc([
            //         "If I take Lightning/Thunder Damage, I can cast Absorb Elements without using a spell slot",
            //         "I can apply this damage to my next Thundercannon attack even if its a ranged attack."
            //     ]),
            //     source : ["KT:AA", 6],
            //     action : ["reaction", "[Lightning/Thunder Dmg]"]
            // },

            // //5th Level Upgrades

            // "autoloading magazine (prereq: level 5 artificer)" : {
            //     name : "Autoloading Magazine",
            //     description : desc([
            //         "I automatically reload, I no longer require my bonus action"
            //     ]),
            //     source : ["KT:AA", 6],
            //     calcChanges : {
            //         atkAdd : [
            //             function (fields, v) {
            //             if (v.theWea.artThundercannon) {
            //                 fields.Description = fields.Description.replace("Reload(1)", "Auto-Reload");
            //             }
            //         },
            //             "My Thunder Cannon now auto-reloads"
            //         ]
            //     },
            //     prereqeval : function(v) {return classes.known["alternate artificer"].level >= 5;}
            // },
            // "cannon improvement (prereq: level 5 artificer)" : {
            //     name : "Cannon Improvement",
            //     description : desc([
            //         "My Thunder Cannon gains a +1 to Attack and Damage, It now counts as magical",
            //         "I can take this upgrade 2 more times"
            //     ]),
            //     source : ["KT:AA", 6],
            //     prereqeval : function(v) {return classes.known["alternate artificer"].level >= 5;},
            //     calcChanges : {
            //         atkAdd : [
            //             function (fields, v) {
            //                 if (v.theWea.artThundercannon) {
            //                     fields.Description += "; Counts as magical";
            //                 }
            //             },
            //             "My Thunder Cannon attacks count as magical for overcoming resistances and damage reduction."
            //         ],
            //         atkCalc : [
            //             function (fields, v) {
            //                 if (v.theWea.artThundercannon) {
            //                     output.extraDmg += 1; output.extraHit += 1;
            //                 }
            //             },
            //             "The Thunder Cannon gains a +1 to Attack and Damage"
            //         ]
            //     }
            // },
            // "cannon improvement lv2 (prereq: cannon improvement)" : {
            //     name : "Cannon Improvement Lv2",
            //     description : desc([
            //         "My Thunder Cannon gains another +1 to Attack and Damage",
            //         "I can take this upgrade 1 more time"
            //     ]),
            //     source : ["KT:AA", 6],
            //     prereqeval : function(v) { 
            //         return GetFeatureChoice("class", "alternate artificer", "subclassfeature3", true).indexOf("cannon improvement (prereq: level 5 artificer)") != -1;
            //     },
            //     calcChanges : {
            //         atkCalc : [
            //             function (fields, v) {
            //                 if (v.theWea.artThundercannon) {
            //                     output.extraDmg += 1; output.extraHit += 1;
            //                 }
            //             },
            //             "The Thunder Cannon gains another +1 to Attack and Damage"
            //         ]
            //     }
            // },
            // "cannon improvement lv3 (prereq: cannon improvement lv2)" : {
            //     name : "Cannon Improvement Lv3",
            //     description : desc([
            //         "My Thunder Cannon gains another +1 to Attack and Damage"
            //     ]),
            //     source : ["KT:AA", 6],
            //     prereqeval : function(v) { 
            //         return GetFeatureChoice("class", "alternate artificer", "subclassfeature3", true).indexOf("cannon improvement lv2 (prereq: cannon improvement)") != -1;
            //     },
            //     calcChanges : {
            //         atkCalc : [
            //             function (fields, v) {
            //                 if (v.theWea.artThundercannon) {
            //                     output.extraDmg += 1; output.extraHit += 1;
            //                 }
            //             },
            //             "The Thunder Cannon gains another +1 to Attack and Damage"
            //         ]
            //     }
            // },
            // "divination scope (prereq: level 5 artificer)" : {
            //     name : "Divination Scope",
            //     description : desc([
            //         "The scope has 3 charges, As a bonus action I can use 1 charge to cast Hunter's Mark,",
            //         "as an action I can use 2 to cast See Invisibility, or 3 to cast Clairvoyance"
            //     ]),
            //     source : ["KT:AA", 7],
            //     prereqeval : function(v) {return classes.known["alternate artificer"].level >= 5;},
            //     usages : 3,
            //     recovery : "long rest",
            //     eval : function(lvl, chc) {
            //         changeSpellsOnMagicItem(true, "thunder cannon", "Divination Scope", ["hunter's mark", "see invisibility", "clairvoyance"], ["1","2","3"], [{},{},{time : "1 a", changes : "I can cast clairvoyance as an action instead of over 10 minutes."}]);
            //     },
            //     removeeval : function(lvl, chc) {
            //         changeSpellsOnMagicItem(false, "thunder cannon", "Divination Scope", ["hunter's mark", "see invisibility", "clairvoyance"], ["1","2","3"]);
            //     }
            // },
            // "harpoon reel (prereq: level 5 artificer)" : {
            //     name : "Harpoon Reel",
            //     description : "See Notes sheet for info on how this works",
            //     source : ["KT:AA", 7],
            //     action : ["bonus action", " [Reel]"],
            //     prereqeval : function(v) {return classes.known["alternate artificer"].level >= 5;},
            //     weaponOptions : {
            //         regExpSearch : /^(?=.*harpoon)(?=.*reel).*$/i,
            //         name : "Harpoon Reel",
            //         source : ["KT:AA", 7],
            //         list : "alternate artificer",
            //         ability : 2,
            //         type : "Artificer Weapon",
            //         damage : [1, 6, "piercing"],
            //         range : "30/60 ft",
            //         description : "60 ft cord, Must be Reeled in, See notes sheet",
            //         abilitytodamage : true
            //     },
            //     weaponsAdd : ["Harpoon Reel"],
            //     toNotesPage : [{
            //         name : "Upgrade-Harpoon Reel",
            //         note : [
            //             "I can attack a surface, object, or creature with a harpoon",
            //             "It has a range of 30/60 feet, and deals 1d6 piercing dmg",
            //             "I must Reel it in before I can use it again.",
            //             "It impales the target hit, connecting us with a 60ft cord", 
            //             "Dragging the person connected causes the one moving to move at half speed",
            //             "Unless they are a size larger As an action it can remove it, but it takes 1d6 dmg",
            //             "If the target is medium or larger; using my bonus action, I can pull myself to it",
            //             "If the target is Small or smaller I pull it to me. I can also just disconnect the cord"
            //         ],
            //         source : ["KT:AA", 7]
            //     }]
            // },
            // "terrifying thunder (prereq: echoing boom)" : {
            //     name : "Terrifying Thunder",
            //     description : desc([
            //         "The first time I hit a target, it is deaf until the end of it's next turn",
            //         "It must also make a Wis save against my spell save DC or become frightened for 1 minute",
            //         "It can repeat the save at the end it's turn; on success, it is immune to the effects for 24hrs"
            //     ]),
            //     source : ["KT:AA", 7],
            //     prereqeval : function(v) { 
            //         return GetFeatureChoice("class", "alternate artificer", "subclassfeature3", true).indexOf("echoing boom (prereq: incompatible with silencer)") != -1;
            //     }
            // },
            // "storm blast (prereq: level 5 artificer)" : {
            //     name : "Storm Blast",
            //     description : desc([
            //         "I upgrade my cannon to fire in a 30-foot cone. Each creature hit must make a Str save,",
            //         "or take 1d6 plus half the damage of Thundermonger and they're knocked prone",
            //         "Using this counts as applying Thundermonger damage. Does not consume ammo."
            //     ]),
            //     source : ["KT:AA", 7],
            //     prereqeval :  function(v) {return classes.known["alternate artificer"].level >= 5;},
            //     action : ["action", " (1d6 + 1/2 Thundermonger)"]
            // },

            // //9th Level Upgrades

            // "shock harpoon (prereq: level 9 artificer, harpoon reel)" : {
            //     name : "Shock Harpoon",
            //     description : desc([
            //         "As a bonus action, If the Harpoon is in a target, and I have not used Thundermonger yet",
            //         "I can do it's damage as lightning damage to the target and it is stunned unless:",
            //         "It succeeds on a Con save against my spell save DC. To use this again, I have to reel it in"
            //     ]),
            //     source : ["KT:AA", 7],
            //     action : ["bonus action", "[Harpoon Reel]"],
            //     prereqeval : function(v) { 
            //         return GetFeatureChoice("class", "alternate artificer", "subclassfeature3", true).indexOf("harpoon reel (prereq: level 5 artificer)") != -1 && classes.known["alternate artificer"].level >= 9;
            //     }
            // },
            // "synaptic feedback (prereq: level 9 artificer)" : {
            //     name : "Synaptic Feedback",
            //     description : desc([
            //         "When I deal lightning damage with my cannon, my walking speed increases by 10ft",
            //         "and I can take the Dash or Disengage actions as a bonus action.",
            //         "This boost lasts until the start of my next turn."
            //     ]),
            //     action : [
            //         ["bonus action", "Dash (Synaptic Feedback)"],
            //         ["bonus action", "Disengage (Synaptic Feedback)"]
            //     ],
            //     source : ["KT:AA", 7],
            //     prereqeval : function(v) {return classes.known["alternate artificer"].level >= 9;}
            // },
            // "thunder jump (prereq: level 9 artificer)" : {
            //     name : "Thunder Jump",
            //     description : desc([
            //         "As an action I can cast Thunder Step. This counts as applying my Thundermonger damage",
            //         "I cannot use this ability again until I complete a short or long rest."
            //     ]),
            //     source : ["KT:AA", 7],
            //     prereqeval : function(v) {return classes.known["alternate artificer"].level >= 9;},
            //     usages : 1,
            //     recovery : "short rest",
            //     eval : function(lvl, chc) {
            //         changeSpellsOnMagicItem(true, "thunder cannon", "Thunder Jump", ["thunder step"], ["oncesr"]);
            //     },
            //     removeeval : function(lvl, chc) {
            //         changeSpellsOnMagicItem(false, "thunder cannon", "Thunder Jump", ["thunder step"], ["oncesr"]);
            //     }
            // },

            // //11th Level Upgrades

            // "blast radius (prereq: level 11 artificer)" : {
            //     name : "Blast Radius",
            //     description : desc([
            //         "My Devastating Blast now deals half my weapon damage + half Thundermonger damage",
            //         "When the target is within 30 ft of me"
            //     ]),
            //     source : ["KT:AA", 7],
            //     prereqeval : function(v) {return classes.known["alternate artificer"].level >= 11;}
            // },
            // "stabilization (prereq: level 11 artificer)" : {
            //     name : "Stabilization",
            //     description : desc([
            //         "Being prone doesn't cause disadvantage when using my Thunder Cannon",
            //         "If me or my target hasn't moved sense my last attack, I get advantage"
            //     ]),
            //     source : ["KT:AA", 7],
            //     prereqeval : function(v) {return classes.known["alternate artificer"].level >= 11;}
            // },

            // //15th Level Upgrades

            // "mortar shells (prereq: level 15 artificer)" : {
            //     name : "Mortar Shells",
            //     description : desc([
            //         "Pick a point within range, and make an attack roll against all creatures in a 5ft radius",
            //         "Creatures hit take weapon damage plus half of Thundermonger's damage (using it)",
            //         "Creatures do not benefit from cover against this unless they have overhead cover as well"
            //     ]),
            //     source : ["KT:AA", 7],
            //     prereqeval : function(v) {return classes.known["alternate artificer"].level >= 15;},
            //     action : ["action", ""]
            // }
// [{}].forEach(function (aObj) {
//     var upgName = aObj.listname ? aObj.listname : aObj.name;
//     var upgNameLC = upgName.toLowerCase();
//     var upgLevel = aObj.listlevel ? aObj.listlevel : 1;
//     if (!aObj.prereqeval && upgLevel === 3) {
//         aObj.prereqeval = function () {
//             return classes.known["artificer-ua3"].level >= 3 && ClassList["artificer-ua3"].chosenUpgrades().indexOf(upgNameLC) == -1;
//         }
//         upgLevel = 1; // so that it's still added to the first list of upgrades
//     } else if (!aObj.prereqeval && upgLevel < 15) {
//         aObj.prereqeval = function () {
//             return ClassList["artificer-ua3"].chosenUpgrades().indexOf(upgNameLC) == -1;
//         }
//     }
//     for (var aFea in ClassSubList[warsmithSubname].features) {
//         var feaObj = ClassSubList[warsmithSubname].features[aFea];
//         if (!(/upgrade/i).test(feaObj.name) || !feaObj.extrachoices || feaObj.minlevel < upgLevel) continue;
//         feaObj.extrachoices.push(upgName);
//         feaObj[upgNameLC] = aObj;
//     }
// });

//#region
/*
ClassSubList["alternate artificer-gadgetsmith"] = {

    regExpSearch : /gadgetsmith/i,
    subname : "Gadgetsmith",
    source : ["KT:AA", 8],
    attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    features : {
        "subclassfeature1" : {
            name : "Gadgetsmith's Proficiency",
            source : ["KT:AA", 8],
            minlevel : 1,
            description : desc([
                "I gain proficiency with nets, rapiers, whips, and tinker's tools."
            ]),
            weaponProfs : [true, false, ["net", "rapier", "whip"]],
            toolProfs : ["Tinker's Tools"]
        },
        "subclassfeature1.1" : {
            name : "Essential Tools: Grappling Hook/Smoke Bomb",
            source : ["KT:AA", 8],
            minlevel : 1,
            description : "\n   See Notes page for info on how these work",
            toNotesPage : [{
                name : "Essential Tools: Grappling Hook",
                note : [
                    "I can attack a surface, object, or creature within 20 feet and hook on to it",
                    "If the it is small or smaller, I can make a Grapple check to pull it to me, grappling it",
                    "If the target is medium or larger, I can choose to be pulled to it, not grappling it"
                ],
                source : ["KT:AA", 8]
            },{
                name : "Essential Tools: Smoke Bomb",
                note : [
                    "I can use my action to cast Fog Cloud without using a spell slot",
                    "It does not require concentration and lasts my Intelligence modifier in rounds"
                ],
                source : ["KT:AA", 8]
            }]
        }, 
        "subclassfeature1.2" : {
            name : "Essential Tools: Gadgetsmith Weapon",
            source : ["KT:AA", 8],
            minlevel : 1,
            description : desc([
                "Gadgetsmith Weapon: Use the \"Choose Features\" button to add a Gadgetsmith Weapon"
            ]),
            choices : ["Essential Tools: Boomerang of Hitting","Essential Tools: Impact Gauntlet","Essential Tools: Repeating Hand Crossbow","Essential Tools: Shock Generator","Essential Tools: Lightning Baton"],
            "essential tools: boomerang of hitting" : {
                name : "Essential Tools: Boomerang of Hitting",
                description : desc([
                    "I get a magical boomerang, at Lv. 5 it gets a +1 to atk & dmg, +2 at Lv. 14; Special:",
                    "When Thrown, I can make separate attacks at 2 creatures within 10 ft of each other"
                ]),
                source : ["KT:AA", 8],
                weaponsAdd : ["Boomerang of Hitting"],
                calcChanges : {
                    atkCalc : [
                        function (fields, v, output) {
                            if (v.theWea.artBoomerang && classes.known["alternate artificer"].level >= 5 && classes.known["alternate artificer"].level < 14) {
                                output.extraDmg += 1; 
                                output.extraHit += 1;
                            } else if (v.theWea.artBoomerang && classes.known["alternate artificer"].level >= 14) {
                                output.extraDmg += 2; 
                                output.extraHit += 2;
                            }
                        },
                        "The Boomerang of Hitting gains a +1 to Attack and Damage at level 5, a +2 at level 14"
                    ],
                    atkAdd : [
                        function (fields, v) {
                            if (v.theWea.artBoomerang) fields.Proficiency = true;
                        },
                        ""
                    ]
                }
            },
            "essential tools: impact gauntlet" : {
                name : "Essential Tools: Impact Gauntlet",
                description : desc([
                    "I get a magical gauntlet, at Lv. 5 it gets a +1 to atk & dmg, +2 at Lv. 14; Special:",
                    "Before I attack, I can forgo my Prof mod for the attack, but If it hits I get double"
                ]),
                source : ["KT:AA", 9],
                weaponsAdd : ["Impact Gauntlet"],
                calcChanges : {
                    atkCalc : [
                        function (fields, v, output) {
                            if (v.theWea.artGauntlet && classes.known["alternate artificer"].level >= 5 && classes.known["alternate artificer"].level < 14) {
                                output.extraDmg += 1; 
                                output.extraHit += 1;
                            } else if (v.theWea.artGauntlet && classes.known["alternate artificer"].level >= 14) {
                                output.extraDmg += 2; 
                                output.extraHit += 2;
                            }
                        },
                        "The Impact Gauntlet gains a +1 to Attack and Damage at level 5, a +2 at level 14"
                    ],
                    atkAdd : [
                        function (fields, v) {
                            if (v.theWea.artGauntlet) fields.Proficiency = true;
                        },
                        ""
                    ]
                }
            },
            "essential tools: repeating hand crossbow" : {
                name : "Essential Tools: Repeating Hand Crossbow",
                description : desc([
                    "I get a magical hand crossbow, at Lv. 5 it gets a +1 to atk & dmg, +2 at Lv. 14; Special:",
                    "If I have Adv, once per turn I can forgo it on an attack to make an additional attack"
                ]),
                source : ["KT:AA", 9],
                weaponsAdd : ["Repeating Hand Crossbow"],
                calcChanges : {
                    atkCalc : [
                        function (fields, v, output) {
                            if (v.theWea.artRepeatCrossbow && classes.known["alternate artificer"].level >= 5 && classes.known["alternate artificer"].level < 14) {
                                output.extraDmg += 1; 
                                output.extraHit += 1;
                            } else if (v.theWea.artRepeatCrossbow && classes.known["alternate artificer"].level >= 14) {
                                output.extraDmg += 2; 
                                output.extraHit += 2;
                            }
                        },
                        "The Repeating Hand Crossbow gains a +1 to Attack and Damage at level 5, a +2 at level 14"
                    ],
                    atkAdd : [
                        function (fields, v) {
                            if (v.theWea.artRepeatCrossbow) fields.Proficiency = true;
                        },
                        ""
                    ]
                }
            },
            "essential tools: shock generator" : {
                name : "Essential Tools: Shock Generator",
                description : desc([
                    "I get a device that lets me cast Shocking Grasp",
                    "I can add my Dex or Int mod (sheet automatically chooses the highest) to the attack"
                ]),
                source : ["KT:AA", 9],
                weaponsAdd : ["Shocking Grasp"],
                calcChanges : {
                    atkCalc : [
                        function (fields, v, output) {
                            if (v.WeaponTextName == "Shocking Grasp") {
                                if (What("Int Mod") >= What("Dex Mod")) {
                                    output.extraHit += What("Int Mod");
                                } else {
                                    output.extraHit += What("Dex Mod");
                                }
                            }
                        },
                        "I can add my Dexterity or Intelligence modifier to Shocking Grasp's attack roll (Sheet uses the highest)"
                    ]
                },
                eval : function(lvl, chc) {
                    changeSpellsOnMagicItem(true, "gadgetsmith's gadgets", "Shock Generator", ["shocking grasp"], [""], [{description : "Spell attack+dex/int, adv. if metal armor, 1d8 Lightning dmg, no rea 1 turn; +1d8 at CL 5, 11, and 17", descriptionCantripDie : "Spell attack+dex/int, adv. if metal armor, `CD`d8 Lightning dmg, no rea 1 turn", changes : "I can add my Dexterity or Intelligence modifier to Shocking Grasp's attack roll"}]);
                },
                removeeval : function(lvl, chc) {
                    changeSpellsOnMagicItem(false, "gadgetsmith's gadgets", "Shock Generator", ["shocking grasp"], [""]);
                }
            },
            "essential tools: lightning baton" : {
                name : "Essential Tools: Lightning Baton",
                description : desc([
                    "I get a lightning baton, at Lv. 5 it gets a +1 to atk & dmg, +2 at Lv. 14"
                ]),
                source : ["KT:AA", 9],
                weaponsAdd : ["Lightning Baton"],
                calcChanges : {
                    atkCalc : [
                        function (fields, v, output) {
                            if (v.theWea.artBaton && classes.known["alternate artificer"].level >= 5 && classes.known["alternate artificer"].level < 14) {
                                output.extraDmg += 1; 
                                output.extraHit += 1;
                            } else if (v.theWea.artBaton && classes.known["alternate artificer"].level >= 14) {
                                output.extraDmg += 2; 
                                output.extraHit += 2;
                            }
                        },
                        "The Lightning Baton gains a +1 to Attack and Damage at level 5, a +2 at level 14"
                    ],
                    atkAdd : [
                        function (fields, v) {
                            if (v.theWea.artBaton) fields.Proficiency = true;
                        },
                        ""
                    ]
                }
            }
        },
        "subclassfeature3" : {
            name : "Additional Upgrade",
            minlevel : 3,
            description : desc([
                "As a Gadgetsmith I get one extra upgrade for my class, two at Lv. 5"
            ]),
            source : ["KT:AA", 8],
            additional : levels.map(function (n, idx) {
                    return n < 3 ? "" : [0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2][idx] + " extra upgrades";
            }),
            eval : function(lvl, chc) {
                AddMagicItem("Gadgetsmith's Gadgets");
            },
            removeeval : function(lvl, chc) {
                RemoveMagicItem("Gadgetsmith's Gadgets");
            },
            extraname : "Gadgetsmith Upgrades",
            extrachoices : [
                //Unrestricted Upgrades
                "Airburst Mine",
                "Boomerang of Hitting (Incompatible with Essential Tools: Boomerang of Hitting)",
                "Belt of Adjusting Size",
                "Gravity Switch",
                "Element Eater",
                "Enhanced Grappling Hook",
                "Fire Spitter",
                "Flashbang",
                "Impact Gauntlet (Incompatible with Essential Tools: Impact Gauntlet)",
                "Impact Gauntlet No.2 (prereq: Any Impact Gauntlet)",
                "Lightning Baton (Incompatible with Essential Tools: Lightning Baton)",
                "Lightning Baton No.2 (prereq: Any Lightning Baton)",
                "Mechanical Arm",
                "Mechanical Familiar",
                "Jumping Boots",
                "Repeating Hand Crossbow (Incompatible with Essential Tools: Repeating Hand Crossbow)",
                "Shock Generator (Incompatible with Essential Tools: Shock Generator)",
                "Shocking Hook (prereq: Shock Generator)",
                "Sight Lenses",
                "Smoke Cloak",
                "Striding Boots",
                //5th Level Upgrades
                "Autonomous Crossbow (prereq: level 5 Artificer)",
                "Binding Rope (prereq: level 5 Artificer)",
                //9th Level Upgrades
                "Arcane Nullifier (prereq: level 9 Artificer)",
                "Phase Trinket (prereq: level 9 Artificer)",
                "Stinking Gas (prereq: level 9 Artificer)",
                "Stopwatch Trinket (prereq: level 9 Artificer)",
                //11th Level Upgrades
                "Bracers of Empowerment (prereq: level 11 Artificer)",
                "Lightning Generator (prereq: level 11 Artificer, Any Shock Generator)",
                "Gripping Gloves (prereq: level 11 Artificer, Incompatible with Nimble Gloves)",
                "Deployable Wings (prereq: level 11 Artificer)",
                "Nimble Gloves (prereq: level 11 Artificer, Incompatible with Gripping Gloves)",
                "Truesight Lenses (prereq: level 11 Artificer, Sight Lenses)",
                "Useful Universal Key (prereq: level 11 Artificer)",
                //15th Level Upgrades
                "Disintegration Ray (prereq: level 15 Artificer)",
                "Bee Swarm Rockets (prereq: level 15 Artificer)",
            ],
            extraTimes : levels.map(function (n) {
                return n < 3 ? 0 : n < 5 ? 2 : n < 7 ? 4 : n < 9 ? 5 : n < 11 ? 6 : n < 13 ? 7 : n < 15 ? 8 : n < 17 ? 9 : n < 19 ? 10 : 11;
            }),

            //Unrestricted Upgrades

            "airburst mine" : {
                name : "Airburst Mine",
                description : desc([
                    "I can use this device to cast shatter without using a spell slot or I can place it",
                    "To be triggered by my reaction within 1 min; I cannot use it again until after a SR"
                ]),
                source : ["KT:AA", 8],
                eval : function(lvl, chc) {
                    changeSpellsOnMagicItem(true, "gadgetsmith's gadgets", "Airburst Mine", ["shatter"], ["oncesr"]);
                },
                removeeval : function(lvl, chc) {
                    changeSpellsOnMagicItem(false, "gadgetsmith's gadgets", "Airburst Mine", ["shatter"], ["oncesr"]);
                }
            },
            "boomerang of hitting (incompatible with essential tools: boomerang of hitting)" : {
                name : "Boomerang of Hitting",
                description : desc([
                    "I get a magical boomerang, at Lv. 5 it gets a +1 to atk & dmg, +2 at Lv. 14; Special:",
                    "When Thrown, I can make separate attacks at 2 creatures within 10 ft of each other"
                ]),
                source : ["KT:AA", 8],
                weaponsAdd : ["Boomerang of Hitting"],
                calcChanges : {
                    atkCalc : [
                        function (fields, v, output) {
                            if (v.theWea.artBoomerang && classes.known["alternate artificer"].level >= 5 && classes.known["alternate artificer"].level < 14) {
                                output.extraDmg += 1; 
                                output.extraHit += 1;
                            } else if (v.theWea.artBoomerang && classes.known["alternate artificer"].level >= 14) {
                                output.extraDmg += 2; 
                                output.extraHit += 2;
                            }
                        },
                        "The Boomerang of Hitting gains a +1 to Attack and Damage at level 5, a +2 at level 14"
                    ],
                    atkAdd : [
                        function (fields, v) {
                            if (v.theWea.artBoomerang) fields.Proficiency = true;
                        },
                        ""
                    ]
                },
                prereqeval : function (v) { 
                    return GetFeatureChoice("class", "alternate artificer", "subclassfeature1.2", true).indexOf("essential tools: boomerang of hitting") == -1;
                }
            },
            "belt of adjusting size" : {
                name : "Belt of Adjusting Size",
                description : desc([
                    "While wearing the belt, I can use an action to cast Enlarge/Reduce on myself",
                    "I cannot use it again until I complete a short or long rest"
                ]),
                source : ["KT:AA", 8],
                eval : function(lvl, chc) {
                    changeSpellsOnMagicItem(true, "gadgetsmith's gadgets", "Belt of Adjusting Size", ["enlarge/reduce"], ["oncesr"]);
                },
                removeeval : function(lvl, chc) {
                    changeSpellsOnMagicItem(false, "gadgetsmith's gadgets", "Belt of Adjusting Size", ["enlarge/reduce"], ["oncesr"]);
                }
            },
            "gravity switch" : {
                name : "Gravity Switch",
                description : desc([
                    "I can use this device to cast fall without using a spell slot, as an action",
                    "I cannot use it again until I complete a short or long rest"
                ]),
                source : ["KT:AA", 8],
                eval : function(lvl, chc) {
                    changeSpellsOnMagicItem(true, "gadgetsmith's gadgets", "Gravity Switch", ["fall"], ["oncesr"]);
                },
                removeeval : function(lvl, chc) {
                    changeSpellsOnMagicItem(false, "gadgetsmith's gadgets", "Gravity Switch", ["fall"], ["oncesr"]);
                }
            },
            "element eater" : {
                name : "Element Eater",
                description : desc([
                    "As a reaction to taking elemental damage, I can cast Absorb Elements",
                    "Without using a spell slot. I cannot use it again until I complete a short or long rest"
                ]),
                source : ["KT:AA", 9],
                eval : function(lvl, chc) {
                    changeSpellsOnMagicItem(true, "gadgetsmith's gadgets", "Element Eater", ["absorb elements"], ["oncesr"]);
                },
                removeeval : function(lvl, chc) {
                    changeSpellsOnMagicItem(false, "gadgetsmith's gadgets", "Element Eater", ["absorb elements"], ["oncesr"]);
                }
            },
            "enhanced grappling hook" : {
                name : "Enhanced Grappling Hook",
                description : desc([
                    "I enhance my grappling hook, increasing its range to 40 feet",
                    "And lets me drag something with me when pulling myself to something"
                ]),
                source : ["KT:AA", 8],
                additional : "See Notes sheet",
                toNotesPage : [{
                    name : "Enhanced Grappling Hook",
                    note : [
                        "I can attack a surface, object, or creature within 40 feet and hook on to it",
                        "If the it is small or smaller, I can make a Grapple check to pull it to me, grappling it",
                        "If the target is medium or larger, I can choose to be pulled to it, not grappling it",
                        "While pulling myself, I can drag a medium or smaller",
                        "willing/grappled creature within 5 ft of me with me"
                    ],
                    source : ["KT:AA", 9]
                }]
            },
            "fire spitter" : {
                name : "Fire Spitter",
                description : desc([
                    "As an action, I can cast Aganazzar's Scorcher without using a spell slot",
                    "I cannot use it again until I complete a short or long rest"
                ]),
                source : ["KT:AA", 9],
                eval : function(lvl, chc) {
                    changeSpellsOnMagicItem(true, "gadgetsmith's gadgets", "Fire Spitter", ["aganazzar's scorcher"], ["oncesr"]);
                },
                removeeval : function(lvl, chc) {
                    changeSpellsOnMagicItem(false, "gadgetsmith's gadgets", "Fire Spitter", ["aganazzar's scorcher"], ["oncesr"]);
                }
            },
            "flashbang" : {
                name : "Flashbang",
                description : desc([
                    "As an action, you can target a point in 30 ft. Any creature within a 20 ft radius makes:",
                    "A dex save or is blinded until the end of its next turn, It cannot used again until after a SR"
                ]),
                source : ["KT:AA", 9],
                usages : 1,
                recovery : "short rest",
                action : ["action", ""],
            },
            "impact gauntlet (incompatible with essential tools: impact gauntlet)" : {
                name : "Impact Gauntlet",
                description : desc([
                    "I get a magical gauntlet, at Lv. 5 it gets a +1 to atk & dmg, +2 at Lv. 14; Special:",
                    "Before I attack, I can forgo my Prof mod for the attack, but If it hits I get double"
                ]),
                source : ["KT:AA", 9],
                weaponsAdd : ["Impact Gauntlet"],
                calcChanges : {
                    atkCalc : [
                        function (fields, v, output) {
                            if (v.theWea.artGauntlet && classes.known["alternate artificer"].level >= 5 && classes.known["alternate artificer"].level < 14) {
                                output.extraDmg += 1; 
                                output.extraHit += 1;
                            } else if (v.theWea.artGauntlet && classes.known["alternate artificer"].level >= 14) {
                                output.extraDmg += 2; 
                                output.extraHit += 2;
                            }
                        },
                        "The Impact Gauntlet gains a +1 to Attack and Damage at level 5, a +2 at level 14"
                    ],
                    atkAdd : [
                        function (fields, v) {
                            if (v.theWea.artGauntlet) fields.Proficiency = true;
                        },
                        ""
                    ]
                },
                prereqeval : function (v) { 
                    return GetFeatureChoice("class", "alternate artificer", "subclassfeature1.2", true).indexOf("essential tools: impact gauntlet") == -1;
                }
            },
            "impact gauntlet no.2 (prereq: any impact gauntlet)" : {
                name : "Impact Gauntlet No.2",
                description : desc([
                    "I get another magical gauntlet, letting me dual weld them"
                ]),
                source : ["KT:AA", 9],
                prereqeval : function (v) {
                    return GetFeatureChoice("class", "alternate artificer", "subclassfeature1.2", true).indexOf("essential tools: impact gauntlet") != -1 || GetFeatureChoice("class", "alternate artificer", "subclassfeature3", true).indexOf("impact gauntlet (incompatible with essential tools: impact gauntlet)") != -1;
                }
            },
            "lightning baton (incompatible with essential tools: lightning baton)" : {
                name : "Lightning Baton",
                description : desc([
                    "I get a lightning baton, at Lv. 5 it gets a +1 to atk & dmg, +2 at Lv. 14"
                ]),
                source : ["KT:AA", 9],
                weaponsAdd : ["Lightning Baton"],
                calcChanges : {
                    atkCalc : [
                        function (fields, v, output) {
                            if (v.theWea.artBaton && classes.known["alternate artificer"].level >= 5 && classes.known["alternate artificer"].level < 14) {
                                output.extraDmg += 1; 
                                output.extraHit += 1;
                            } else if (v.theWea.artBaton && classes.known["alternate artificer"].level >= 14) {
                                output.extraDmg += 2; 
                                output.extraHit += 2;
                            }
                        },
                        "The Lightning Baton gains a +1 to Attack and Damage at level 5, a +2 at level 14"
                    ],
                    atkAdd : [
                        function (fields, v) {
                            if (v.theWea.artBaton) fields.Proficiency = true;
                        },
                        ""
                    ]
                },
                prereqeval : function (v) { 
                    return GetFeatureChoice("class", "alternate artificer", "subclassfeature1.2", true).indexOf("essential tools: lightning baton") == -1;
                }
            },
            "lightning baton no.2 (prereq: any lightning baton)" : {
                name : "Lightning Baton No.2",
                description : desc([
                    "I get another lightning baton, letting me dual weld them)"
                ]),
                source : ["KT:AA", 9],
                prereqeval : function (v) {
                    return GetFeatureChoice("class", "alternate artificer", "subclassfeature1.2", true).indexOf("essential tools: lightning baton") != -1 || GetFeatureChoice("class", "alternate artificer", "subclassfeature3", true).indexOf("lightning baton (incompatible with essential tools: lightning baton)") != -1;
                }
            },
            "mechanical arm" : {
                name : "Mechanical Arm",
                description : desc([
                    "The arm only works while it is mounted to my gear, but can be controlled mentally",
                    "It can do anything a normal hand could, but does not give you additional actions"
                ]),
                source : ["KT:AA", 9],
            },
            "mechanical familiar" : {
                name : "Mechanical Familiar",
                description : desc([
                    "At the end of a long rest, I can cast Find Familiar with the following modifications:",
                    "Type: Construct, cannot fly, stays active until deactivated/destroyed, reactivated after LR"
                ]),
                source : ["KT:AA", 9],
                //TODO: I'm sure this is automatable, but i'll come back to it later...
                //| Probably after I do the Golemsmith (which I'm sure is going be a BITCH to do...)
            },
            "jumping boots" : {
                name : "Jumping Boots",
                description : desc([
                    "While wearing these boots, I am under the effects of the Jump spell"
                ])
            },
            "shock generator (incompatible with essential tools: shock generator)" : {
                name : "Shock Generator",
                description : desc([
                    "I get a device that lets me cast Shocking Grasp",
                    "I can add my Dex or Int mod (sheet automatically chooses the highest) to the attack"
                ]),
                source : ["KT:AA", 9],
                weaponsAdd : ["Shocking Grasp"],
                calcChanges : {
                    atkCalc : [
                        function (fields, v, output) {
                            if (v.WeaponTextName == "Shocking Grasp") {
                                if (What("Int Mod") >= What("Dex Mod")) {
                                    output.extraHit += What("Int Mod");
                                } else {
                                    output.extraHit += What("Dex Mod");
                                }
                            }
                        },
                        "I can add my Dexterity or Intelligence modifier to Shocking Grasp's attack roll (Sheet uses the highest)"
                    ]
                },
                eval : function(lvl, chc) {
                    changeSpellsOnMagicItem(true, "gadgetsmith's gadgets", "Shock Generator", ["shocking grasp"], [""], [{description : "Spell attack+dex/int, adv. if metal armor, 1d8 Lightning dmg, no rea 1 turn; +1d8 at CL 5, 11, and 17", descriptionCantripDie : "Spell attack+dex/int, adv. if metal armor, `CD`d8 Lightning dmg, no rea 1 turn", changes : "I can add my Dexterity or Intelligence modifier to Shocking Grasp's attack roll"}]);
                },
                removeeval : function(lvl, chc) {
                    changeSpellsOnMagicItem(false, "gadgetsmith's gadgets", "Shock Generator", ["shocking grasp"], [""]);
                },
                prereqeval : function (v) {
                    return GetFeatureChoice("class", "alternate artificer", "subclassfeature1.2", true).indexOf("essential tools: shock generator") != -1;
                }
            },
            "repeating hand crossbow (incompatible with essential tools: repeating hand crossbow)" : {
                name : "Repeating Hand Crossbow",
                description : desc([
                    "I get a magical hand crossbow, at Lv. 5 it gets a +1 to atk & dmg, +2 at Lv. 14; Special:",
                    "If I have Adv, once per turn I can forgo it on an attack to make an additional attack"
                ]),
                source : ["KT:AA", 9],
                weaponsAdd : ["Repeating Hand Crossbow"],
                calcChanges : {
                    atkCalc : [
                        function (fields, v, output) {
                            if (v.theWea.artRepeatCrossbow && classes.known["alternate artificer"].level >= 5 && classes.known["alternate artificer"].level < 14) {
                                output.extraDmg += 1; 
                                output.extraHit += 1;
                            } else if (v.theWea.artRepeatCrossbow && classes.known["alternate artificer"].level >= 14) {
                                output.extraDmg += 2; 
                                output.extraHit += 2;
                            }
                        },
                        "The Repeating Hand Crossbow gains a +1 to Attack and Damage at level 5, a +2 at level 14"
                    ],
                    atkAdd : [
                        function (fields, v) {
                            if (v.theWea.artRepeatCrossbow) fields.Proficiency = true;
                        },
                        ""
                    ]
                },
                prereqeval : function (v) {
                    return GetFeatureChoice("class", "alternate artificer", "subclassfeature1.2", true).indexOf("essential tools: repeating hand crossbow") != -1;
                }
            },
            "shocking hook (prereq: shock generator)" : {
                name : "Shocking Hook",
                description : desc([
                    "If the target of my Grappling Hook is a creature, I can cast Shocking Grasp on it",
                    "As a bonus action when pulling it to me or being pulled to it"
                ]),
                source : ["KT:AA", 9],
                prereqeval : function (v) {
                    return GetFeatureChoice("class", "alternate artificer", "subclassfeature1.2", true).indexOf("essential tools: shock generator") != -1 || GetFeatureChoice("class", "alternate artificer", "subclassfeature3", true).indexOf("shock generator (incompatible with essential tools: shock generator)") != -1;
                }
            },
            "sight lenses" : {
                name : "Sight Lenses",
                description : desc([
                    "I can see through fog, mist, smoke, clouds, and non-magical darkness, up to 15 ft"
                ]),
                source : ["KT:AA", 9],
                vision : ["Sight Lenses", 15]
            },
            "smoke cloak" : {
                name : "Smoke Cloak",
                description : desc([
                    "When I start my turn lightly or heavily obscured by smoke, I am invisible until:",
                    "My turn ends, I cast a spell, make an attack, or damage an enemy"
                ]),
                source : ["KT:AA", 9]
            },
            "striding boots" : {
                name : "Striding Boots",
                description : desc([
                    "While earing these boots, I am under the effects of the Longstrider spell"
                ]),
                source : ["KT:AA", 9],
                speed : { 
                    allModes : "+10"
                }
            },

            //5th Level Upgrades

            "autonomous crossbow (prereq: level 5 artificer)" : {
                name : "Autonomous Crossbow",
                description : desc([
                    "As an action once per short rest, I can deploy a construct and can fire it as a bonus action",
                    "Make a spell attack, if 1d6 + Int mod. It become inactive after 10 min or fired 10 times"
                ]),
                source : ["KT:AA", 9]
            },
            "binding rope (prereq: level 5 artificer)" : {
                name : "Binding Rope",
                description : desc([
                    "As an action, I restrain a creature (30 ft, dex save vs. spell DC) till the end of my next turn",
                    "Disadvantage If I'm already grappling it. I can only restrain one target a time"
                ]),
                source : ["KT:AA", 10],
                action : ["action","[30 ft, dex save vs. spell DC]"],
                prereqeval : function(v) {return classes.known["alternate artificer"].level >= 5;}
            },

            //9th Level Upgrades

            "arcane nullifier (prereq: level 9 artificer)" : {
                name : "Arcane Nullifier ",
                description : desc([
                    "As an action, I can use this device to cast dispel magic",
                    "I cannot use it again until I complete a short or long rest"
                ]),
                source : ["KT:AA", 10],
                eval : function(lvl, chc) {
                    changeSpellsOnMagicItem(true, "gadgetsmith's gadgets", "Arcane Nullifier", ["dispel magic"], ["oncesr"]);
                },
                removeeval : function(lvl, chc) {
                    changeSpellsOnMagicItem(false, "gadgetsmith's gadgets", "Arcane Nullifier", ["dispel magic"], ["oncesr"]);
                },
                prereqeval : function(v) {return classes.known["alternate artificer"].level >= 9;}
            },
            "phase trinket (prereq: level 9 artificer)" : {
                name : "Phase Trinket",
                description : desc([
                    "As an action, I can cast Blink or Dimension Door without using a Spell Slot",
                    "I cannot use it again until I complete a long rest"
                ]),
                source : ["KT:AA", 10],
                eval : function(lvl, chc) {
                    changeSpellsOnMagicItem(true, "gadgetsmith's gadgets", "Phase Trinket", ["blink", "dimension door"], ["oncesr", "oncesr"]);
                },
                removeeval : function(lvl, chc) {
                    changeSpellsOnMagicItem(false, "gadgetsmith's gadgets", "Phase Trinket", ["blink", "dimension door"], ["oncesr", "oncesr"]);
                },
                prereqeval : function(v) {return classes.known["alternate artificer"].level >= 9;}
            },
            "stinking gas (prereq: level 9 artificer)" : {
                name : "Stinking Gas",
                description : desc([
                    "When I use a smoke bomb, I can also choose to cast Stinking Cloud (follows the same rules)"
                ]),
                source : ["KT:AA", 10],
                prereqeval : function(v) {return classes.known["alternate artificer"].level >= 9;}
            },
            "stopwatch trinket (prereq: level 9 artificer)" : {
                name : "Stopwatch Trinket",
                description : desc([
                    "As an action, I can cast Haste or Slow without expending a Spell Slot",
                    "I cannot use it again until I complete a long rest"
                ]),
                source : ["KT:AA", 10],
                eval : function(lvl, chc) {
                    changeSpellsOnMagicItem(true, "gadgetsmith's gadgets", "Phase Trinket", ["haste", "slow"], ["oncelr", "oncelr"]);
                },
                removeeval : function(lvl, chc) {
                    changeSpellsOnMagicItem(false, "gadgetsmith's gadgets", "Phase Trinket", ["haste", "slow"], ["oncelr", "oncelr"]);
                },
                prereqeval : function(v) {return classes.known["alternate artificer"].level >= 9;}
            },

            //11th Level Upgrades

            "bracers of empowerment (prereq: level 11 artificer)" : {
                name : "Bracers of Empowerment",
                description : desc([
                    "I can use these to cast Tenser's Transformation without using a spell slot.",
                    "I cannot use it again until I complete a long rest"
                ]),
                source : ["KT:AA", 10],
                eval : function(lvl, chc) {
                    changeSpellsOnMagicItem(true, "gadgetsmith's gadgets", "Bracers of Empowerment", ["tenser's transformation"], ["oncelr"]);
                },
                removeeval : function(lvl, chc) {
                    changeSpellsOnMagicItem(false, "gadgetsmith's gadgets", "Bracers of Empowerment", ["tenser's transformation"], ["oncelr"]);
                },
                prereqeval : function(v) {return classes.known["alternate artificer"].level >= 11;}
            },
            "lightning generator (prereq: level 11 artificer, any shock generator)" : {
                name : "Lightning Generator",
                description : desc([
                    "I can cast lightning lure at-will using it and can overload it to cast lightning bolt",
                    "Once overloaded, I cannot use lightning bolt again until I complete a short or long rest"
                ]),
                source : ["KT:AA", 10],
                eval : function(lvl, chc) {
                    changeSpellsOnMagicItem(true, "gadgetsmith's gadgets", "Lightning Generator", ["lightning lure", "lightning bolt"], ["atwill", "oncelr"]);
                },
                removeeval : function(lvl, chc) {
                    changeSpellsOnMagicItem(false, "gadgetsmith's gadgets", "Lightning Generator", ["lightning lure", "lightning bolt"], ["atwill", "oncelr"]);
                },
                prereqeval : function(v) { 
                    return classes.known["alternate artificer"].level >= 11 && (GetFeatureChoice("class", "alternate artificer", "subclassfeature1.2", true).indexOf("essential tools: shock generator") != -1 || GetFeatureChoice("class", "alternate artificer", "subclassfeature3", true).indexOf("shock generator (incompatible with essential tools: shock generator)") != -1);
                }
            },
            "gripping gloves (prereq: level 11 artificer, incompatible with nimble gloves)" : {
                name : "Gripping Gloves",
                description : desc([
                    "While wearing the gloves, My min and max Str increases by 2",
                    "And I gain Adv on Athletics checks involving manipulating things with my hands"
                ]),
                source : ["KT:AA", 10],
                scores : [2, 0, 0, 0, 0, 0],
                scoresMaximum : [22, 0, 0, 0, 0, 0],
                advantages : ["Athletics", true],
                prereqeval : function(v) {
                    return classes.known["alternate artificer"].level >= 11 && GetFeatureChoice("class", "alternate artificer", "subclassfeature3", true).indexOf("nimble gloves (prereq: level 11 artificer, incompatible with gripping gloves)") == -1;
                }
            },
            "deployable wings (prereq: level 11 artificer)" : {
                name : "Deployable Wings",
                description : desc([
                    "I can deploy wings as a bonus action/reaction to falling, I get a flying speed of 30 ft"
                ]),
                source : ["KT:AA", 10],
                action : [
                    ["bonus action", ""], 
                    ["reaction", " (falling)"]
                ], 
                speed : { 
                    fly : { spd : 30, enc : 20 }
                },
                prereqeval : function(v) {return classes.known["alternate artificer"].level >= 11;}
            },
            "nimble gloves (prereq: level 11 artificer, incompatible with gripping gloves)" : {
                name : "Nimble Gloves",
                description : desc([
                    "While wearing the gloves, My Dex and maximum Dex increases by 2", //TODO(v13): add automation for this
                    "And I gain Adv on Slight of Hand checks involving manipulating things with my hands"
                ]),
                source : ["KT:AA", 10],
                scores : [0, 2, 0, 0, 0, 0],
                scoresMaximum : [0, 22, 0, 0, 0, 0],
                prereqeval : function(v) {
                    return classes.known["alternate artificer"].level >= 11 && GetFeatureChoice("class", "alternate artificer", "subclassfeature3", true).indexOf("gripping gloves (prereq: level 11 artificer, incompatible with nimble gloves)") == -1;
                }
            },
            "truesight lenses (prereq: level 11 artificer, sight lenses)" : {
                name : "Truesight Lenses",
                description : desc([
                    "I get Truesight up to 30 feet"
                ]),
                source : ["KT:AA", 10],
                vision : ["Truesight", 30],
                prereqeval : function(v) {
                    return classes.known["alternate artificer"].level >= 11 && GetFeatureChoice("class", "alternate artificer", "subclassfeature3", true).indexOf("sight lenses") != -1;
                }
            },
            "useful universal key (prereq: level 11 artificer)" : {
                name : "Useful Universal Key",
                description : desc([
                    "As an action, I can  cast passwall without expending a spell slot",
                    "I cannot use it again until I complete a long rest"
                ]),
                source : ["KT:AA", 10],
                eval : function(lvl, chc) {
                    changeSpellsOnMagicItem(true, "gadgetsmith's gadgets", "Useful Universal Key", ["passwall"], ["oncelr"]);
                },
                removeeval : function(lvl, chc) {
                    changeSpellsOnMagicItem(false, "gadgetsmith's gadgets", "Useful Universal Key", ["passwall"], ["oncelr"]);
                },
                prereqeval : function(v) {return classes.known["alternate artificer"].level >= 11;}
            },

            //15th Level Upgrades
            
            "disintegration ray (prereq: level 15 artificer)" : {
                name : "Disintegration Ray",
                description : desc([
                    "I can use this to cast Disintegration without expending a Spell Slot.",
                    "I cannot use it again until I complete a long rest"
                ]),
                source : ["KT:AA", 11],
                eval : function(lvl, chc) {
                    changeSpellsOnMagicItem(true, "gadgetsmith's gadgets", "Disintegration Ray", ["disintegration"], ["oncelr"]);
                },
                removeeval : function(lvl, chc) {
                    changeSpellsOnMagicItem(false, "gadgetsmith's gadgets", "Disintegration Ray", ["disintegration"], ["oncelr"]);
                },
                prereqeval : function(v) {return classes.known["alternate artificer"].level >= 15;}
            },
            "bee swarm rockets (prereq: level 15 artificer)" : {
                name : "Bee Swarm Rockets",
                description : desc([
                    "I have my Artificer level in rockets. I can fire up to my remaining rockets as an action",
                    "Each targets a point I can see in 40 ft creatures in 10 ft of the point make a dex save",
                    "On fail take 2d6 fire damage per rocket, half on success. I refill my stock during a LR"
                ]),
                source : ["KT:AA", 11],
                usages : "Artificer level per ",
                usagescalc : "event.value = What('Character Level');",
                recovery : "long rest",
                prereqeval : function(v) {return classes.known["alternate artificer"].level >= 15;}
            }
        },
        "subclassfeature3.1" : {
            name : "Recycle Gadgets",
            source : ["KT:AA", 8],
            minlevel : 3,
            description : desc([
                "During a long rest and taking effect when I complete it",
                "I can swap any of my upgrades with a new one"
            ])
        },
        "subclassfeature5" : {
            name : "Extra Attack",
            source : ["KT:AA", 8],
            minlevel : 5,
            description : desc([
                "I can attack twice whenever I take the Attack action on my turn"
            ])
        },
        "subclassfeature14" : {
            name : "Combat Gadgets",
            source : ["KT:AA", 8],
            minlevel : 14,
            description : desc([
                "If I make an attack, I can replace an attack with a gadget that needs an action to use",
            ]),
            action : ["action"," [atk with gadget]"]
        }
    }
};

// ClassSubList["alternate artificer-golemsmith"] = {
//     regExpSearch : /golemsmith/i,
//     subname : "Golemsmith",
//     features : {

//     }
// };

// ClassSubList["alternate artificer-infusionsmith"] = {
//     regExpSearch : /infusionsmith/i,
//     subname : "Infusionsmith",
//     features : {

//     }
// };

ClassSubList["alternate artificer-potionsmith"] = {
    regExpSearch : /potionsmith/i,
    subname : "Potionsmith",
    source : ["KT:AA", 16],
    features : {
        "subclassfeature1" : {
            name : "Potionsmith's Proficiency",
            minlevel : 1,
            description : desc([
                "I gain proficiency with blowguns, alchemist’s supplies and herbalism kit",
                "Creating a potion through crafting takes half the normal time and cost"
            ]),
            source : ["KT:AA", 16],
            weapons : [true, false, ["blowgun"]],
            toolProfs : [["Alchemist's Supplies", "Dex"],["Herbalism Kit", "Dex"]]
        },
        "subclassfeature1.1" : {
            name : "Alchemical Reagents Pouch",
            minlevel : 1,
            description : desc([
                "I have a pouch of basic reagents and can retrieve things from it if an ability needs them",
                "It counts as alchemy supplies and if lost, I can spend 50g or 1 hr gathering to remake it"
            ]),
            source : ["KT:AA", 16],
        },
        "subclassfeature1.2" : {
            name : "Instant Reactions",
            minlevel : 1,
            description : desc([
                "I get the Instant Reactions Feat"
            ]),
            source : ["KT:AA", 16],
            eval : "PickDropdown('Feat Name 5', 'Instant Reactions');",
            removeeval : "PickDropdown('Feat Name 5', '');"
        },
        "subclassfeature3" : {
            name : "Alchemical Infusions",
            minlevel : 3,
            description : desc([
                ""
            ]),
            source : ["KT:AA", 17],
        },
        "subclassfeature3.1" : {
            name : "Alchemist Upgrades",
            minlevel : 3,
            description : desc([
                "Use the \"Choose Features\" button to add a Specialization Upgrade to the third page",
                "(Make sure to see the notes sheet for more info on choosing and swapping upgrades)"
            ]),
            source : ["KT:AA", 2],
            additional : levels.map(function (n, idx) {
                    return n < 3 ? "" : [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9][idx] + " upgrades";
            }),
            noteDesc : desc([
                "I apply an additional upgrade to my Specialization's Wondrous Item at",
                "5th, 7th, 9th, 11th, 13th, 15th, 17th, and 19th level",
                "I cannot apply an upgrade more than once, unless the upgrade's description says otherwise",
                "Upgrades cannot be replaced or changed, besides as described in the specialization",
                "Only the Artificer selecting the upgrade can use the upgrade unless otherwise specified",
                "In any case that Specialization allows the upgrade to be swapped out",
                "Upgrades must always be selected as if I was level I was when they got that Upgrade slot",
                "Ex. if I replace my Thundercannon and reselect all my upgrades at as a 5th level Artificer,",
                "I could select 1 3rd level upgrade and 1 5th level upgrade,",
                "I would not be able to select two upgrades that had a prerequisite of 5th level artificer."
            ]),
            eval : "notesPage('Alchemist Upgrades', ['Specialization Upgrade', 'KT:AA', 2], ClassSubList['alternate artificer-potionsmith'].features['subclassfeature3.1'].noteDesc);",
            removeeval : "notesPage('Alchemist Upgrades', ['Specialization Upgrade', 'KT:AA', 2], ClassList['alternate artificer-potionsmith'].features['subclassfeature3.1'].noteDesc, true);",
            extraname : "Alchemist Upgrades",
            extrachoices : [
                "Alchemical Acid",
                "Adrenaline Serum (prereq: level 9 Artificer)",
                "Aroma Therapies (prereq: level 9 Artificer)",
                "Auto Injector",
                "Delivery Mechanism",
                "Elixir of Life (prereq: Philosopher's Stone)",
                "Explosive Reaction",
                "Fortifying Fumes Reaction",
                "Frostbloom Reaction",
                "Greater Adrenaline Shot (prereq: Adrenaline Serum)",
                "Inoculations",
                "Infusion Stone (prereq: level 9 Artificer)",
                "Mana Potion (prereq: level 9 Artificer)",
                "Philosopher Stone (prereq: level 15 Artificer)",
                "Persistent Reactions",
                "Potent Reactions (prereq: level 9 Artificer)",
                "Poisoner's Proficiency",
                "Secrets of Enhancement",
                "Secrets of Fire",
                "Secrets of Frost",
                "Weapon Coating"
            ],
            "alchemical acid" : {
                name : "Alchemical Acid",
                description : desc([
                    "See the Instant Reactions section on your spell sheet"
                ]),
                source : ["KT:AA", 17]
            },
            "adrenaline serum (prereq: level 9 artificer)" : {
                name : "Adrenaline Serum",
                description : desc([
                    "I have my Con mod(min 1) in serums. As an action I can take one",
                    "gaining haste and heroism for Int mod(min 1) rounds, I still get the effects of haste ending",
                    "Another can take this, but must pass a Con save vs. my spell DC, poisoned on a fail"
                ]),
                source : ["KT:AA", 17]
            },
            "" : {
                name : "",
                description : desc([
                    ""
                ]),
                source : ["KT:AA", 17]
            }//,
            // "" : {
            //     name : "",
            //     description : desc([
            //         ""
            //     ]),
            //     source : ["KT:AA", 17]
            // }
        },
        "subclassfeature5" : {
            name : "",
            minlevel : 5,
            description : desc([
                ""
            ]),
            source : ["KT:AA", 17],
        },
        "subclassfeature14" : {
            name : "",
            minlevel : 14,
            description : desc([
                ""
            ]),
            source : ["KT:AA", 17],
        },
    }
};

ClassSubList["alternate artificer-warsmith"] = {
    regExpSearch : /warsmith/i,
    subname : "Warsmith",
    source : ["KT:AA", 20],
    attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    features : {
        "subclassfeature1" : {
            name : "Warsmith's Proficiency",
            minlevel : 1,
            description : desc([
                "I gain proficiency with Heavy Armor and Smith's Tools"
            ]),
            source : ["KT:AA", 20],
            toolProfs : [["Smith's Tools", "Dex"]]
        },
        "subclassfeature1.1" : {
            name : "Mechplate Gauntlet",
            minlevel : 1,
            description : desc([
                "If I lose it, I can remake it during a long rest with 25 gold worth of materials",
                "I can find the materials and forge it over 2 days of work (8 hr/day) without the expense"
            ]), //TODO(v13): Make this a magic item
            source : ["KT:AA", 20],
            weapons : [true, true],
            eval : "AddWeapon('mechplate gauntlet'); AddWeapon('shocking grasp');",
            removeeval : "RemoveWeapon('mechplate gauntlet'); RemoveWeapon('shocking grasp');",
            spellcastingBonus : {
                name : "Mechplate Gauntlet",
                spells : ["shocking grasp"],
                selection : ["shocking grasp"],
                atwill : true
            }
        },
        "subclassfeature3" : {
            name : "Mechplate",
            minlevel : 3,
            description : "",
            source : ["KT:AA", 20],
            additional : "See Notes sheet",
            noteDesc : desc([
                "I create a set of Mechplate from standard heavy armor using resources I've gathered",
                "It takes 8 hrs, a place to forge, and incorporates my Mechplate Gauntlet",
                "I can create a new set by forging it. It takes 1000 gold, 8 hrs, and a set of Platemail",
                "I can only be attuned to one set at a time and I can only change during a LR",
                "For each set, I can apply Upgrades equal to the value on the class table",
                "While wearing the Mechplate my Str score and Str max are increased by 2",
                "I count as 1 size larger when determining the weight I can move",
                "If I'm a small creature, my size is now medium"
            ]), //TODO(v13): Make this a magic item
            armor : [true, true, true, false],
            eval : "AddArmor('Mechplate'); notesPage('Mechplate', ['Mechplate', 'KT:AA', 20], ClassSubList['alternate artificer-warsmith'].features['subclassfeature3'].noteDesc);",
            removeeval : "RemoveArmor('Mechplate'); notesPage('Mechplate', ['Mechplate', 'KT:AA', 20], ClassSubList['alternate artificer-warsmith'].features['subclassfeature3'].noteDesc, true);",
        },
        "subclassfeature3.1" : {
            name : "Warsmith Upgrades",
            minlevel : 3,
            description : desc([
                "Use the \"Choose Features\" button to add a Specialization Upgrade to the third page",
                "(Make sure to see the notes sheet for more info on choosing and swapping upgrades)"
            ]),
            source : ["KT:AA", 2],
            additional : levels.map(function (n, idx) {
                    return n < 3 ? "" : [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 8, 9, 9, 10, 10, 11, 11][idx] + " upgrades";
            }),
            noteDesc : desc([
                "I apply an additional upgrade to my Specialization's Wondrous Item at",
                "5th, 7th, 9th, 11th, 13th, 15th, 17th, and 19th level",
                "I cannot apply an upgrade more than once, unless the upgrade's description says otherwise",
                "Upgrades cannot be replaced or changed, besides as described in the specialization",
                "Only the Artificer selecting the upgrade can use the upgrade unless otherwise specified",
                "In any case that Specialization allows the upgrade to be swapped out",
                "Upgrades must always be selected as if I was level I was when they got that Upgrade slot",
                "Ex. if I replace my Thundercannon and reselect all my upgrades at as a 5th level Artificer,",
                "I could select 1 3rd level upgrade and 1 5th level upgrade,",
                "I would not be able to select two upgrades that had a prerequisite of 5th level artificer."
            ]),
            eval : "notesPage('Warsmith Upgrades', ['Specialization Upgrade', 'KT:AA', 2], ClassSubList['alternate artificer-warsmith'].features['subclassfeature3.1'].noteDesc);",
            removeeval : "notesPage('Warsmith Upgrades', ['Specialization Upgrade', 'KT:AA', 2], ClassList['alternate artificer-warsmith'].features['subclassfeature3.1'].noteDesc, true);",
            extraname : "Mechplate Upgrades",
            extrachoices : [
                "Accelerated Movement",
                "Accelerated Movement Lv2 (prereq: Accelerated Movement)",
                "Active Camouflage (prereq: level 5 Artificer)",
                "Arcane Visor (prereq: level 11 Artificer, Darkvision Visor)",
                "Armor Class",
                "Armor Class Lv2 (prereq: Armor Class)",
                "Armor Class Lv3 (prereq: Armor Class Lv2)",
                "Cloaking Device (prereq: Active Camouflage)",
                "Darkvision Visor",
                "Collapsible (prereq: level 5 Artificer, Incompatible with Piloted Golem)",
                "Energy Surge",
                "Flame Projector (prereq: level 9 Artificer, Incompatible with Lightning Projector)",
                "Flash Freeze Capacitor (prereq: level 11 Artificer, Incompatible with Power Slam Capacitor)",
                "Flight (prereq: level 11 Artificer, Incompatible with Piloted Golem)",
                "Force Blast",
                "Grappling Reel",
                "Integrated Attack (prereq: level 11 Artificer)",
                "Lightning Projector (prereq: level 9 Artificer, Incompatible with Flame Projector)",
                "Mechsuit (Incompatible with Piloted Golem and Sealed Suit)",
                "Piloted Golem (prereq: Powered Limbs Lv2, Incompatible with Collapsible)",
                "Powered Limbs (prereq: level 5 Artificer)",
                "Powered Limbs Lv2 (prereq: Powered Limbs)",
                "Power Slam Capacitor (prereq: level 11 Artificer, Incompatible with Flash Freeze Capacitor)",
                "Power Fist",
                "Power Fist No.2 (prereq: Power Fist)",
                "Reactive Plating (prereq: level 15 Artificer)",
                "Recall (prereq: level 15 Artificer)",
                "Resistance",
                "Relocation Matrix (prereq: level 11 Artificer)",
                "Sealed Suit (prereq: level 5 Artificer)",
                "Sentient Armor",
                "Sentient Armor Lv2 (prereq: Sentient Armor)",
                "Sun Cannon (prereq: level 15 Artificer)",
                "Virtual Wizard (prereq: level 15 Artificer, Sentient Armor Lv2)"
            ],
            "accelerated movement": {
                name : "Accelerated Movement",
                description : desc([
                    "The Mechplate's weight is reduced by 15 lbs, while wearing it all speeds increase by 10 ft",
                    "I can apply this upgrade 1 more time"
                ]),
                source : ["KT:AA", 21],
                speed : { allModes : "+10" } 
            },
            "accelerated movement lv2 (prereq: accelerated movement)": {
                name : "Accelerated Movement Lv2",
                description : desc([
                    "The Mechplate's weight is reduced by 15 lbs, while wearing it all speeds increase by 10 ft"
                ]),
                source : ["KT:AA", 21],
                speed : { allModes : "+10" }, 
                prereqeval : "What('Extra.Notes').toLowerCase().indexOf('accelerated movement') != -1" //TODO(v13): Do this with getFeatureChoice
            },
            "active camouflage (prereq: level 5 artificer)": {
                name : "Active Camouflage",
                description : desc([
                    "As an action, I can activate this, lasts until deactivated, I'm lightly obscured",
                    "Can hide even if something can see me, and Disadvantage on Wis(Perc) checks to find me"
                ]),
                source : ["KT:AA", 21],
                action : ["action", ""],
                prereqeval : "classes.known['alternate artificer'].level >= 5"
            },
            "arcane visor (prereq: level 11 artificer, darkvision visor)": {
                name : "Arcane Visor",
                description : desc([
                    "The Visor has 6 Charges. As an action, I can use 1 or more charges to cast the spells:",
                    "See Invisibility (2) or True Seeing (4), it regains all charges on a LR"
                ]),
                source : ["KT:AA", 21],
                usages : 6,
                recovery : "long rest",
                action : ["action", ""],
                spellcastingBonus : {
                    name : "Arcane Visor",
                    spells : ["see invisibility", "true seeing"],
                    selection : ["see invisibility", "true seeing"],
                    firstCol: "AV",
                    times : 2
                },
                prereqeval : "classes.known['alternate artificer'].level >= 11 && What('Extra.Notes').toLowerCase().indexOf('darkvision visor') != -1" //TODO(v13): Do this with getFeatureChoice
            },
            "armor class": {
                name : "Armor Class",
                description : desc([
                    "My Mechplate's Armor Class (AC) increases by 1",
                    "I can apply this upgrade 2 more times"
                ]),
                source : ["KT:AA", 21],
                eval : "if (CurrentArmour.field == 'mechplate') {ArmourList.mechplate.ac += 1; ArmourList.mechsuit.ac += 1; ApplyArmor('Mechplate');} else if (CurrentArmour.field == 'mechsuit') {ArmourList.mechsuit.ac += 1; ArmourList.mechplate.ac += 1; ApplyArmor('Mechsuit');};",
                removeeval : "if (CurrentArmour.field == 'mechplate') {ArmourList.mechplate.ac += -1; ArmourList.mechsuit.ac += -1; ApplyArmor('Mechplate');} else if (CurrentArmour.field == 'mechsuit') {ArmourList.mechsuit.ac += -1; ArmourList.mechplate.ac += -1; ApplyArmor('Mechsuit');};"
            },
            "armor class lv2 (prereq: armor class)": {
                name : "Armor Class Lv2",
                description : desc([
                    "My Mechplate's Armor Class (AC) increases by another 1",
                    "I can apply this upgrade 1 more time"
                ]),
                source : ["KT:AA", 21],
                eval : "if (CurrentArmour.field == 'mechplate') {ArmourList.mechplate.ac += 1; ArmourList.mechsuit.ac += 1; ApplyArmor('Mechplate');} else if (CurrentArmour.field == 'mechsuit') {ArmourList.mechsuit.ac += 1; ArmourList.mechplate.ac += 1; ApplyArmor('Mechsuit');};",
                removeeval : "if (CurrentArmour.field == 'mechplate') {ArmourList.mechplate.ac += -1; ArmourList.mechsuit.ac += -1; ApplyArmor('Mechplate');} else if (CurrentArmour.field == 'mechsuit') {ArmourList.mechsuit.ac += -1; ArmourList.mechplate.ac += -1; ApplyArmor('Mechsuit');};",
                prereqeval : "What('Extra.Notes').toLowerCase().indexOf('armor class') != -1" //TODO(v13): Do this with getFeatureChoice
            },
            "armor class lv3 (prereq: armor class lv2)": {
                name : "Armor Class Lv3",
                description : desc([
                    "My Mechplate's Armor Class (AC) increases by another 1"
                ]),
                source : ["KT:AA", 21],
                eval : "if (CurrentArmour.field == 'mechplate') {ArmourList.mechplate.ac += 1; ArmourList.mechsuit.ac += 1; ApplyArmor('Mechplate');} else if (CurrentArmour.field == 'mechsuit') {ArmourList.mechsuit.ac += 1; ArmourList.mechplate.ac += -1; ApplyArmor('Mechsuit');};",
                removeeval : "if (CurrentArmour.field == 'mechplate') {ArmourList.mechplate.ac += -1; ArmourList.mechsuit.ac += -1; ApplyArmor('Mechplate');} else if (CurrentArmour.field == 'mechsuit') {ArmourList.mechsuit.ac += -1; ArmourList.mechplate.ac += -1; ApplyArmor('Mechsuit');};",
                prereqeval : "What('Extra.Notes').toLowerCase().indexOf('armor class lv2') != -1" //TODO(v13): Do this with getFeatureChoice
            },
            "cloaking device (prereq: active camouflage)": {
                name : "Cloaking Device",
                description : desc([
                    "This device has 4 Charges. As an action, I can use 1 or more charges to cast the spells:",
                    "Invisibility (2), Greater Invisibility (4), it regains all charges on a LR"
                ]),
                source : ["KT:AA", 21],
                usages : 4,
                recovery : "long rest",
                action : ["action", ""],
                spellcastingBonus : {
                    name : "Cloaking Device",
                    spells : ["invisibility", "greater invisibility"],
                    selection : ["invisibility", "greater invisibility"],
                    firstCol : "CD",
                    times : 2
                },
                prereqeval : "What('Extra.Notes').toLowerCase().indexOf('active camouflage') != -1" //TODO(v13): Do this with getFeatureChoice
            },
            "darkvision visor": {
                name : "Darkvision Visor",
                description : desc([
                    "While wearing my Mechplate, I have an additional 60 ft of darkvision"
                ]),
                source : ["KT:AA", 21],
                vision : [["Darkvision", "+60"]]
            },
            "collapsible (prereq: level 5 artificer, incompatible with piloted golem)": {
                name : "Collapsible",
                description : desc([
                    "As an action, I can don/doff the armor, letting it compact into a case 1/3 it's weight"
                ]),
                source : ["KT:AA", 21],
                action : ["action", " (don/doff Mechplate)"],
                prereqeval : "classes.known['alternate artificer'].level >= 5 && What('Extra.Notes').toLowerCase().indexOf('piloted golem') == -1" //TODO(v13): Do this with getFeatureChoice
            },
            "energy surge": {
                name : "Energy Surge",
                description : desc([
                    "As a bonus action, the next shocking grasp or force blast I hit",
                    "Deals +1d8 lightning damage and knocks a Large or smaller target 10 ft away from me"
                ]),
                source : ["KT:AA", 21],
                usages : "Intelligence mod per ",
                usagescalc : "event.value = Math.max(1, What('Int Mod'));",
                recovery : "long rest",
                action : ["bonus action", " (1d8 lightning)"]
            },
            "flame projector (prereq: level 9 artificer, incompatible with lightning projector)": {
                name : "Flame Projector",
                description : desc([
                    "The Projector has 6 Charges. As an action, I can use 1 or more charges to cast the spells:",
                    "Burning Hands (1)/Fireball (3)/Wall of Fire (4), it regains all charges on a LR"
                ]),
                source : ["KT:AA", 21],
                usages : 6,
                recovery : "long rest",
                action : ["action", ""],
                spellcastingBonus : {
                    name : "Flame Projector",
                    spells : ["burning hands", "fireball", "wall of fire"],
                    selection : ["burning hands", "fireball", "wall of fire"],
                    firstCol : "FP",
                    times : 3
                },
                prereqeval : "classes.known['alternate artificer'].level >= 9 && What('Extra.Notes').toLowerCase().indexOf('lightning projector') == -1" //TODO(v13): Do this with getFeatureChoice
            },
            "flash freeze capacitor (prereq: level 11 artificer, incompatible with power slam capacitor)": {
                name : "Flash Freeze Capacitor",
                description : desc([
                    "As an action, I can cast Cone of Cold, and the area effected becomes",
                    "Difficult terrain until my next turn. I cannot use it again until I complete a LR"
                ]),
                source : ["KT:AA", 21],
                usages : 1,
                recovery : "long rest",
                action : ["action", ""],
                spellcastingBonus : {
                    name : "Flash Freeze Capacitor",
                    spells : ["cone of cold"],
                    selection : ["cone of cold"],
                    oncelr : true
                },
                prereqeval : "classes.known['alternate artificer'].level >= 11 && What('Extra.Notes').toLowerCase().indexOf('power slam capacitor') == -1" //TODO(v13): Do this with getFeatureChoice
            },
            "flight (prereq: level 11 artificer, incompatible with piloted golem)": {
                name : "Flight",
                description : desc([
                    "While wearing my Mechplate I have a Magical flying speed of 30 ft"
                ]),
                source : ["KT:AA", 21],
                speed : { fly : { spd : 30 }},
                prereqeval : "classes.known['alternate artificer'].level >= 11 && What('Extra.Notes').toLowerCase().indexOf('piloted golem') == -1" //TODO(v13): Do this with getFeatureChoice
            },
            "force blast": {
                name : "Force Blast",
                description : desc([
                    "My gauntlet can fire blasts of force, at Lv. 5 it gets a +1 to atk & dmg, +2 at Lv. 14",
                    "I am proficient in this weapon. Counts as a ranged spell attack"
                ]),
                source : ["KT:AA", 21],
                eval : "AddWeapon('force blast');",
                removeeval : "RemoveWeapon('force blast');",
                calcChanges : {
                    atkCalc : [
                        "if (WeaponName == 'force blast' && classes.known['alternate artificer'].level >= 5 && classes.known['alternate artificer'].level < 14) {output.extraDmg += 1; output.extraHit += 1;} else if (WeaponName == 'force blast' && classes.known['alternate artificer'].level >= 14) {output.extraDmg += 2; output.extraHit += 2;};",
                        "Force Blast gains a +1 to Attack and Damage at level 5, a +2 at level 14"
                    ]
                }
            },
            "grappling reel": {
                name : "Grappling Reel",
                description : desc([
                    "As 1 attack, I may target a surface, object or creature within 40 ft. If Large or smaller,",
                    "I can make a Grapple check to pull it and Grapple it, If Large or larger, I can pull to it"
                ]),
                source : ["KT:AA", 22],
                action : ["action", " (attack/action)"]
            },
            //! A lot of this upgrade can't be automated with the sheet (Well it can be but I'd have to write a whole function for only it and thats not worth it)
            //TODO: Maybe automate this when I'm done with everything else & if I feel like a challenge (Not likely)
            "integrated attack (prereq: level 11 artificer)": {
                name : "Integrated Attack",
                description : "",
                source : ["KT:AA", 22],
                additional : "See Notes sheet",
                noteDesc : desc([
                    "I Integrate a weapon into my mechplate, it can't be Heavy, I am proficient with it",
                    "I can activate it with a bonus action and immediately attack with it. Can't be disarmed",
                    "I can attack with it as a bonus action. It is treated as if wielding it 1 handed",
                    "I can attack as normal, but doesn't take the use of my hand or mechplate gauntlet",
                    "This upgrade can be taken multiple times, adding a new weapon each time"
                    //! I can't add any way to account for this without adding 5 more of the same upgrade and I'm not doing that
                ]),
                eval : "AddAction('bonus action', 'Integrated Attack (attack)', 'Artificer (Warsmith)'); notesPage('Integrated Attack', ['Upgrade-Integrated Attack', 'KT:AA', 22], ClassSubList['alternate artificer-warsmith'].features['subclassfeature3.1']['integrated attack (prereq: level 11 artificer)'].noteDesc);",
                removeeval : "RemoveAction('bonus action', 'Integrated Attack (attack)'); notesPage('Integrated Attack', ['Upgrade-Integrated Attack', 'KT:AA', 22], ClassSubList['alternate artificer-warsmith'].features['subclassfeature3.1']['integrated attack (prereq: level 11 artificer)'].noteDesc, true);",
                action : ["bonus action", " (activate)"], //TODO(v13): Add another bonus action to this to replace the stuff above
                prereqeval : "classes.known['alternate artificer'].level >= 11"
            },
            "lightning projector (prereq: level 9 artificer, incompatible with flame projector)": {
                name : "Lightning Projector",
                description : desc([
                    "The Projector has 6 Charges. As an action, I can use 1 or more charges to cast the spells:",
                    "Thunderwave (1)/Lightning Bolt (3)/Storm Sphere (4); it regains all charges on a LR"
                ]),
                source : ["KT:AA", 22],
                recovery : "long rest",
                usages : 6,
                action : ["action", ""],
                spellcastingBonus : {
                    name : "Lightning Projector",
                    spells : ["thunderwave", "lightning bolt", "storm sphere"],
                    selection : ["thunderwave", "lightning bolt", "storm sphere"],
                    firstCol : "LP",
                    times : 3
                },
                prereqeval : "classes.known['alternate artificer'].level >= 9 && What('Extra.Notes').toLowerCase().indexOf('flame projector') == -1" //TODO(v13): Do this with getFeatureChoice
            },
            "mechsuit (incompatible with piloted golem and sealed suit)": {
                name : "Mechsuit",
                description : desc([
                    "I retain all benefits and upgrades of my Mechplate, but now counts as Medium armor",
                    "Providing a base of 15 + Dex Mod AC, and its weight is reduced to 40 lbs"
                ]),
                source : ["KT:AA", 22],
                eval : "RemoveArmor('MechPlate'); AddArmor('Mechsuit');",
                removeeval : "RemoveArmor('Mechsuit'); AddArmor('Mechplate');",
                prereqeval : "What('Extra.Notes').toLowerCase().indexOf('piloted golem') == -1 && What('Extra.Notes').toLowerCase().indexOf('sealed suit') == -1" //TODO(v13): Do this with getFeatureChoice
            },
            "piloted golem (prereq: powered limbs lv2, incompatible with collapsible)": {
                name : "Piloted Golem",
                description : desc([
                    "My size increases by 1 when wearing my armor, and I have adv on Str checks/saves"
                ]),
                source : ["KT:AA", 22],
                savetxt : {
                    text : ["Adv. on Str. checks and saves when wearing my armor"]
                },
                prereqeval : "What('Extra.Notes').toLowerCase().indexOf('powered limbs lv2') != -1 && What('Extra.Notes').toLowerCase().indexOf('collapsible') == -1" //TODO(v13): Do this with getFeatureChoice
            },
            "powered limbs (prereq: level 5 artificer)": {
                name : "Powered Limbs",
                description : desc([
                    "While wearing my Mechplate My Str and max Str increase by 1 more", //TODO(v13): add automation for this
                    "I can apply this upgrade 1 time"
                ]),
                source : ["KT:AA", 22],
                prereqeval : "classes.known['alternate artificer'].level >= 5"
            },
            "powered limbs lv2 (prereq: powered limbs)": {
                name : "Powered Limbs Lv2",
                description : desc([
                    "While wearing my Mechplate My Str and max Str increase by 1 more" //TODO(v13): add automation for this
                ]),
                prereqeval : "What('Extra.Notes').toLowerCase().indexOf('powered limbs') != -1" //TODO(v13): Do this with getFeatureChoice
            },
            "power slam capacitor (prereq: level 11 artificer, incompatible with flash freeze capacitor)": {
                name : "Power Slam Capacitor",
                description : desc([
                    "As an Action, I can leap my MS, casting Destructive Wave upon landing",
                    "I cannot use it again until I complete a LR"
                ]),
                source : ["KT:AA", 22],
                usages : 1,
                recovery : "long rest",
                action : ["action", " (Jump my MS)"],
                spellcastingBonus : {
                    name : "Power Slam Capacitor",
                    spells : ["destructive wave"],
                    selection : ["destructive wave"],
                    oncelr : true
                },
                prereqeval : "classes.known['alternate artificer'].level >= 11 && What('Extra.Notes').toLowerCase().indexOf('flash freeze capacitor') == -1"
            },
            "power fist": {
                name : "Power Fist",
                description : desc([
                    "I upgrade my gauntlet, at Lv. 5 it gets a +1 to atk & dmg, +2 at Lv. 14; Special:",
                    "Before I attack, I can forgo my Prof mod for the attack, but If it hits I get double"
                ]),
                source : ["KT:AA", 22],
                eval : "RemoveWeapon('Mechplate Gauntlet'); AddWeapon('Power Gauntlet');",
                removeeval : "RemoveWeapon('Power Gauntlet'); AddWeapon('Mechplate Gauntlet');",
                calcChanges : {
                    atkCalc : [
                        "if (WeaponName == 'power gauntlet' && classes.known['alternate artificer'].level >= 5 && classes.known['alternate artificer'].level < 14) {output.extraDmg += 1; output.extraHit += 1;} else if (WeaponName == 'power gauntlet' && classes.known['alternate artificer'].level >= 14) {output.extraDmg += 2; output.extraHit += 2;};",
                        "The Power Gauntlet gains a +1 to Attack and Damage at level 5, a +2 at level 14"
                    ]
                }
            },
            "power fist no.2 (prereq: power fist)": {
                name : "Power Fist No.2",
                description : desc([
                    "I create another power gauntlet, letting me dual weld them"
                ]),
                source : ["KT:AA", 22],
                prereqeval : "What('Extra.Notes').toLowerCase().indexOf('power fist') != -1" //TODO(v13): Do this with getFeatureChoice
            },
            "reactive plating (prereq: level 15 artificer)": {
                name : "Reactive Plating",
                description : desc([
                    "While waring, I get resistance to: bludgeoning, piercing, and slashing damage (non-magical)",
                    "As a reaction when hit, I can reduce the damage by my proficiency bonus"
                ]),
                source : ["KT:AA", 22],
                dmgres : [["Bludgeoning", "Bludg. (nonmagical)"], ["Piercing", "Pierc. (nonmagical)"], ["Slashing", "Slash. (nonmagical)"]],
                action : ["reaction", " (If hit)"],
                prereqeval : "classes.known['alternate artificer'].level >= 15"
            },
            "recall (prereq: level 15 artificer)": {
                name : "Recall",
                description : desc([
                    "As a bonus action, I can send my Mechplate to a pocket dimension. While in it, it can't",
                    "Be Interacted with in any way, and as an action, I can summon my Mechplate and don it"
                ]),
                source : ["KT:AA", 23],
                eval : "AddAction('bonus action', 'Recall (doff Mechplate)', 'Artificer (Warsmith)');",
                removeeval : "RemoveAction('bonus action', 'Recall (doff Mechplate)');",
                action : ["action", " (don Mechplate)"],
                prereqeval : "classes.known['alternate artificer'].level >= 15"
            },
            "resistance": {
                name : "Resistance",
                description : desc([
                    "Choose acid/cold/fire/force/lightning/necrotic/radiant/thunder, I have resistance to it",
                    "While wearing my Mechplate. I can take this upgrade more than once"
                    //! I can't add any way to automate any of this without 7 more of the same upgrade and I'm not doing that
                ]),
                source : ["KT:AA", 23]
            },
            "relocation matrix (prereq: level 11 artificer)": {
                name : "Relocation Matrix",
                description : desc([
                    "As an action, I can cast Dimension Door without using a spell slot",
                    "I cannot use it again until I complete a LR"
                ]),
                source : ["KT:AA", 23],
                usages : 1,
                recovery : "long rest",
                action : ["action", ""],
                spellcastingBonus : {
                    name : "Relocation Matrix",
                    spells : ["dimension door"],
                    selection : ["dimension door"],
                    oncelr : true
                },
                prereqeval : "classes.known['alternate artificer'].level >= 11"
            },
            "sealed suit (prereq: level 5 artificer)": {
                name : "Sealed Suit",
                description : desc([
                    "As a bonus action, I get an air supply for 1 hr and I'm immune to (not cured of) poison",
                    "I get 1 min of air for every min that I'm not submerged and the armor is not sealed",
                    "While in my armor, I am adapted to cold/hot climates, and acclimated to high altitude"
                ]),
                source : ["KT:AA", 23],
                action : ["bonus action", " (air 1 hr, poison immune)"],
                vision : [["Adapted to cold/hot", 0], ["Acclimated to high altitude", 0]],
                savetxt : {
                    immune : ["poison (in Mechplate)"]
                },
                prereqeval : "classes.known['alternate artificer'].level >= 5"
            },
            "sentient armor": {
                name : "Sentient Armor",
                description : desc([
                    "My Mechplate is a sentient item. My Int and max Int increase by 1 while wearing it", //TODO(v13): add automation for this
                    "I can take this upgrade 1 more time"
                ]),
                source : ["KT:AA", 23]
            },
            "sentient armor lv2 (prereq: sentient armor)": {
                name : "Sentient Armor Lv2",
                description : desc([
                    "My Mechplate is a sentient item. My Int and max Int increase by 1 more while wearing it", //TODO(v13): add automation for this
                    "I cannot be surprised while wearing my Mechplate"
                ]),
                vision : ["Can't be surprised", 0],
                source : ["KT:AA", 23],
                prereqeval : "What('Extra.Notes').toLowerCase().indexOf('sentient armor') != -1" //TODO(v13): Do this with getFeatureChoice
            },
            "sun cannon (prereq: level 15 artificer)": {
                name : "Sun Cannon",
                description : desc([
                    "As an action, I can cast Sunbeam without using a spell slot",
                    "I cannot use it again until I complete a LR"
                ]),
                source : ["KT:AA", 23],
                spellcastingBonus : {
                    name : "Sun Cannon",
                    spells : ["sunbeam"],
                    selection : ["sunbeam"],
                    oncelr : true
                },
                prereqeval : "classes.known['alternate artificer'].level >= 15"
            },
            "virtual wizard (prereq: level 15 artificer, sentient armor lv2)": {
                name : "Virtual Wizard",
                description : desc([
                    "While wearing my Mechplate, my spell save DC and spell attack are increased by 2" //TODO(v13): Add automation with spellCalc attribute
                ]),
                source : ["KT:AA", 23],
                prereqeval : "classes.known['alternate artificer'].level >= 15 && What('Extra.Notes').toLowerCase().indexOf('sentient armor lv2') != -1"
            }
        },
        "subclassfeature5" : {
            name : "Extra Attack",
            minlevel : 5,
            description : desc([
                "I can attack twice whenever I take the Attack action on my turn"
            ]),
            source : ["KT:AA", 20],
        },
        "subclassfeature14" : {
            name : "Fully Customized Gear",
            minlevel : 14,
            description : desc([
                "I get 2 extra upgrades, and during a LR, I can swap any upgrade for another"
            ]),
            source : ["KT:AA", 21],
        }
    }
};
*/
//#endregion
//***********************************************-Extra Class/Subclass Stuff-***********************************************\\

//* 1st Level Spells
SpellsList["arcane ablation"] = {
    name : "Arcane Ablation",
	source : ["KT:AA", 36],
	classes : ["alternate artificer"],
    level : 1,
    school : "Trans",
	time : "1 a",
    range : "Touch",
	components : "V,S",
	duration : "1 h",
	description : "Imbue armor/clothing, crea wearing n(4+1/SL) temp hp, after exhausted +(n-1) temp hp, repeat",
	descriptionFull : "You touch a piece of worn armor or clothing and imbue it with magic. The creature wearing this the imbued item gains 4 temporary hit points for the duration. When these temporary hit points are exhausted, at the start of the creatures next turn it will gain 3 temporary hit points. This repeats when those temporary hit points are exhausted as the previous total minus one, until no temporary hit points would be gained and the spell ends." + "\n   " + "At Higher Levels: The initial temporary hit points increases by 1 for each slot level above 1st."
};
SpellsList["arcane weapon"] = {
    name : "Arcane Weapon",
	source : ["KT:AA", 36],
	classes : ["alternate artificer"],
    level : 1,
    school : "Trans",
	time : "1 a",
    range : "Touch",
	components : "V,S",
	duration : "Conc, 1 h",
	description : "Imbue weapon, counts as magical, deals Force dmg",
	descriptionFull : "You touch a weapon and imbue it with magic. For the duration the weapon counts as a magical weapon, any damage dealt by it is Force damage."
};
SpellsList["bond item"] = {
    name : "Bond Item",
	source : ["KT:AA", 36],
	classes : ["alternate artificer"],
    level : 1,
    school : "Conj",
	time : "1 min",
    range : "Touch",
	components : "V,S",
    duration : "8 h",
    save : "Cha",
	description : "Link a up to 100 lb item, recall as bns; If crea hold/wear save, adv. if greater then 1 min",
	descriptionFull : "You touch a item weighing no more than 100 pounds and form a link between you and it. Until the spell ends, you can recall it to your hand as a bonus action." + "\n   " + "If another creature is holding or wearing the item when you try to recall it, they make a Charisma saving throw, and if they succeed, the spell fails. They make this save with Advantage if they have had possession of the item for more than 1 minute."
};
SpellsList["fall"] = {
    name : "Fall",
	source : ["KT:AA", 36],
	classes : ["alternate artificer","sorcerer","wizard"],
    level : 1,
    school : "Trans",
	time : "1 a",
    range : "Self",
	components : "V,S",
    duration : "Instantaneous",
	description : "Change which way is down for you, fall up to 500 ft, all normal effects apply",
	descriptionFull : "You alter gravity for yourself, causing you to reorient which way is down for you until the end of your turn. You can pick any direction to fall as if under the effect of gravity, falling up to 500 feet before the spell ends." + "\n   " + "If you collide with something during this time, you take falling damage as normal, but you can control your fall as you could under normal conditions by holding onto objects or move along a surface according to your new orientation as normal until your turn ends and gravity returns to normal."
};
SpellsList["seeking projectile"] = {
    name : "Seeking Projectile",
	source : ["KT:AA", 36],
	classes : ["alternate artificer"],
    level : 1,
    school : "Trans",
	time : "1 a",
    range : "Touch",
	components : "V,S",
    duration : "Conc, 10 min",
	description : "1 ammo/thrown, add spell mod to atk roll, if >= 20 crit",
	descriptionFull : "You touch a piece of ammunition or weapon with the thrown property imbuing it with the property of seeking its target. When an ranged attack roll is made with that weapon, the attack roll can add your spell casting modifier to the value on the dice. If that makes the value on the die a 20 or more, the attack is a critical hit as if a 20 was rolled. After making the attack roll, the spell ends."
};
SpellsList["unburden"] = {
    name : "Unburden",
	source : ["KT:AA", 36],
	classes : ["alternate artificer"],
    level : 1,
    school : "Trans",
	time : "1 a",
    range : "Touch",
	components : "V,S",
    duration : "1 h",
	description : "No penalties to MS or Dex(Stealth) in heavy armor, carry up to double weight",
	descriptionFull : "A creature you touch no longer suffers the penalties to movement speed or to their Dexterity (Stealth) check while wearing heavy armor, and is no long encumbered from carry weight unless they are carrying more than twice the weight that would encumber them."
};
//* 2nd Level Spells
SpellsList["imbue luck"] = {
    name : "Imbue Luck",
	source : ["KT:AA", 36],
	classes : ["alternate artificer"],
    level : 2,
    school : "Abjur",
	time : "1 a",
    range : "Touch",
	components : "V,S",
    duration : "1 h",
	description : "1 weapon/armor, if weapon on atk extra d20, if armor on atk against",
	descriptionFull : "You touch a weapon and worn item and imbue luck into it. If imbued on a weapon, for the duration, on an attack roll, the wielder can roll an additional d20 (they can choose to this after they roll, but before the outcome is determined). The creature can choose which of the d20s is used for the attack roll." + "\n   " + "If imbued into a worn item, they can roll a d20 when attacked, then choose whether the attack uses the attacker's roll or theirs." + "\n   " + "With either use, the spell immediately ends upon rolling the extra d20."
};
SpellsList["lightning charged"] = {
    name : "Lightning Charged",
	source : ["KT:AA", 37],
	classes : ["alternate artificer"],
    level : 2,
    school : "Evoc",
	time : "1 a",
    range : "Touch",
    components : "V,S,M",
    compMaterial : "a piece of used lightning rod",
    duration : "10 min",
	description : "The crea deals 1d6 lightning damage to any other crea it touches; ends after 6 times",
	descriptionFull : "You channel lightning energy into a creature. The energy is harmless to the creature, but escapes the creature with dangerous bursts to other creatures. Every time that creature strikes another creature with a melee attack, a spell with a range of touch, is struck by another creature with melee attack, or ends their turn while grappling or being grappled by another creature, they deal 1d6 Lightning damage to that creature." + "\n   " + "Once this spell has discharged 6 times (dealing up to 6d6 damage), the spell ends"
};
SpellsList["thunderburst mine"] = {
    name : "Thunderburst Mine",
	source : ["KT:AA", 37],
	classes : ["alternate artificer"],
    level : 2,
    school : "Abjur",
	time : "1 min",
    range : "Touch",
    components : "V,S,M",
    duration : "8 h",
    save : "Con",
	description : "Set trap 5 ft/1 rea(1 or more mines), crea in 10 ft save 3d8 thunder dmg, half on success",
	descriptionFull : "You can set a magical trap by infusing explosive magic into an item. You can set this item to detonate when someone comes within 5 feet of it, or by a verbal command using your reaction (one or more mines can be detonated)." + "\n   " + "When the magic trap detonates, Each creature in a 10-foot-radius Sphere centered on item must make a Constitution saving throw. A creature takes 3d8 thunder damage on a failed save, or half as much damage on a successful one. If a creature is in the area of effect of more than one thunderburst mine during a turn, they take half damage from any subsequent effects of the mines." + "\n   " + "A magical mine must be set 5 feet or more from another mine, and cannot be moved once placed; any attempt to move it results it in detonating unless the Artificer that set it disarms it with an action."
};
//* 3rd Level Spells
SpellsList["dispel construct"] = {
    name : "Dispel Construct",
	source : ["KT:AA", 37],
	classes : ["alternate artificer"],
    level : 3,
    school : "Abjur",
	time : "1 a",
    range : "60 ft",
    components : "V,S",
    duration : "Instantaneous",
    save : "Con",
	description : "1 construct save or zero hp, if >100 hp Adv on save",
	descriptionFull : "You can attempt to purge the magic animating a construct within range, rendering it inert. The target must succeed on a Constitution saving throw, or be reduced to zero hit points. If the target has more than 100 hit points remaining, it makes this roll with advantage."
};
SpellsList["fireburst mine"] = {
    name : "Fireburst Mine",
	source : ["KT:AA", 37],
	classes : ["alternate artificer"],
    level : 3,
    school : "Abjur",
	time : "1 min",
    range : "Touch",
    components : "V,S,M",
    duration : "8 h",
    save : "Con",
	description : "Set trap 5 ft/1 rea(1 or more mines), crea in 20 ft save 5d8 fire dmg, half on success",
	descriptionFull : "You can set a magical trap by infusing explosive magic into an item. You can set this item to detonate when someone comes within 5 feet of it, or by a verbal command using your reaction (one or more mines can be detonated)." + "\n   " + "When the magic trap detonates, Each creature in a 20-foot-radius Sphere centered on item must make a Dexterity saving throw. A creature takes 5d8 fire damage on a failed save, or half as much damage on a successful one. If a creature is in the area of effect of more than one fireburst mine during a turn, they take half damage from any subsequent effects of the mines." + "\n   " + "A magical mine must be set 5 feet or more from another mine, and cannot be moved once placed; any attempt to move it results it in detonating unless the Artificer that set it disarms it with an action."
};
//* 4th Level Spells
SpellsList["repair"] = {
    name : "Repair",
	source : ["KT:AA", 37],
	classes : ["alternate artificer"],
    level : 4,
    school : "Trans",
	time : "1 a",
    range : "Touch",
    components : "V,S",
    duration : "Instantaneous",
	description : "Restore 10d6+2d6/SL hp or years ago to an construct/obj",
	descriptionFull : "You touch a construct or inanimate object, causing it regain 10d6 hit points. This causes any parts or material that has broken away from the construct or object to reattach, repairing it to the condition it when before losing those hit points." + "\n   " + "If the construct or object damaged state is the result of age, you can instead repair to the condition it was in 10d6 years ago, if it was previously in a better condition during that time (the condition can only improve or not change)." + "\n   " + "At Higher Levels: The hit points restored increases by 2d6 (or the years restored) for each slot above 4th."
};
//* 5th Level Spells
SpellsList["vorpal weapon"] = {
    name : "Vorpal Weapon",
	source : ["KT:AA", 37],
	classes : ["alternate artificer"],
    level : 5,
    school : "Trans",
	time : "1 a",
    range : "Touch",
    components : "V,S",
    duration : "Conc, 1 h",
	description : "Ignore slashing dmg resistance, double dmg to obj, +3 to atk & dmg if less; crit kills if less then 50 hp",
	descriptionFull : "Until the spell ends, a weapon touch becomes indescribably sharp, ignoring resistance to slashing damage, and gains the Siege property, dealing double damage to inanimate objects such as structures. The weapon has a modifier of less than +3 to attack and damage rolls, its modifier becomes +3 to attack and damage rolls for the duration of the spell." + "\n   " + "Additionally, if a critical strike of this weapon would leave a creature with less than 50 hit points, the target creature is killed."
};


// /**
//  * changeSpellsOnMagicItem
//  * @param {boolean} AddRemove true to add, false to remove
//  * @param {String} item the name of the item to add/remove from
//  * @param {String} upgrade the name of the upgrade that adds the spells
//  * @param {String[]} spells the names of the spells to add
//  * @param {String[]} fCol the String you want in the first colum of each spell
//  * @param {Object[]} changes the Object of what you want changed for each spell if any
//  */
// changeSpellsOnMagicItem = function(AddRemove, item, upgrade, spells, fCol, changes) {
//     var theItemBonus = MagicItemsList[item].spellcastingBonus;
//     var theItemChanges = MagicItemsList[item].spellChanges;
//     for (var i = 0; i < spells.length; i++) {
//         var theSpellObj = {
//             name : upgrade,
//             spells : [spells[i]],
//             selection : [spells[i]],
//             firstCol : fCol[i]
//         };
//         if (AddRemove && theItemBonus.indexOf(theSpellObj) === -1) {
//             theItemBonus.push(theSpellObj);
//             if (changes) {theItemChanges[spells[i]] = changes[i];}
//         } else {
//             theItemBonus.splice(theItemBonus.indexOf(theSpellObj), 1);
//             delete theItemChanges[spells[i]];
//         }
//     }
//     //Force apply updates to the magic Item(need to get the spellChanges to work)
//     RemoveMagicItem(item);
//     AddMagicItem(item);
// };

//*****************************************************\\
//*                  -Thundersmith-                   *\\
//*****************************************************\\

MagicItemsList["stormforged weapon"] = {
    name : "Stormforged Weapon",
    source : ["KT:AA", 22],
    type : "wondrous item",
    rarity : "very rare",
    extraTooltip : "Attunement (creator only)",
    attunement : true,
    prerequisite : "Only for a Thundersmith Artificer or if you take the Stormforged Weapon as a Cross Disciplinary Knowledge feature as an Artificer",
    prereqeval : function(v) {
        return classes.known["alternate artificer"].subclass == "alternate artificer-thundersmith" || GetFeatureChoice("class", "alternate artificer", "cross disciplinary knowledge", true).indexOf("stormforged weapon") != -1;
    },
    allowDuplicates : true,
    description : "While attuned to this weapon you have proficiency with it, You can only be attuned to one of these weapons at a time, which can be changed over a long rest,if lost it can be remade over 3 days (8h each) + 200 gp. It can be augmented with Thundersmith upgrades, each one can have different or the same upgrades.",
    descriptionFull : "This weapon requires attunement and you proficient with it while attuned. and you can only be attuned to one Stormforged Weapon at a time. If you have multiple Stormforged Weapons, you can change which one you are attuned to during a long rest." + "\n   " + "If you lose your Stormforged Weapon or wish to create additional ones, you can do so over the course of three days (eight hours each day) by expending 200 gold pieces worth of metal and other raw materials. When you make a new Stormforged Weapon, you can make the same or different type, and select the same or different upgrades.",
    choices : ["Thunder Cannon", "Hand Cannon", "Kinetic Hammer", "Charged Blade", "Lightning Pike"],
    "thunder cannon" : {
        name : "Thunder Cannon",
        source : ["KT:AA", 22],
        description : "This powerful two-handed cannon does 1d12 piercing damage, has a range of 60/180 ft, requires attunement for proficiency, it can be augmented with Thundersmith upgrades, and has the Loud and Stormcharged properties.",
		descriptionLong : "This weapon requires attunement and you proficient with it while attuned. and you can only be attuned to one Stormforged Weapon at a time. If you have multiple Stormforged Weapons, you can change which one you are attuned to during a long rest." + "\n   " + "If you lose your Stormforged Weapon or wish to create additional ones, you can do so over the course of three days (eight hours each day) by expending 200 gold pieces worth of metal and other raw materials. When you make a new Stormforged Weapon, you can make the same or different type, and select the same or different upgrades." + "\n   " + "Stormcharged. When you use an action, bonus action, or reaction to attack with a Stormcharged Weapon, you can make only one Attack regardless of the number of attacks you can normally make. If you could otherwise make additional attacks with that action, the weapon deals an additional 3d6 lightning or thunder damage per attack that was foregone." + "\n   " + "Loud: Your weapon rings with thunder that is audible within 300 feet of you whenever it makes an attack.",
		weight : 15,
        weaponAdd : "Thunder Cannon",
        weaponOptions : {
            regExpSearch : /^(?=.*thunder)(?=.*cannon).*$/i,
            name : "Thunder Cannon",
            source : ["KT:AA", 22],
            ability : 2,
            type : "Artificer Weapon",
            damage : [1, 12, "piercing"],
            range : "60/180 ft",
            weight : 15,
            description : "Ammunition, Two-handed, Loud, Stormcharged",
            abilitytodamage : true,
            ammo : "storm rounds",
            artThundercannon : true
        }
    },
    "hand cannon" : {
        name : "Hand Cannon",
        source : ["KT:AA", 22],
        description : "This powerful but light cannon does 1d10 piercing damage, has a range of 30/90 ft, requires attunement for proficiency, it can be augmented with Thundersmith upgrades, and has the Loud and Stormcharged properties.",
		descriptionLong : "This weapon requires attunement and you proficient with it while attuned. and you can only be attuned to one Stormforged Weapon at a time. If you have multiple Stormforged Weapons, you can change which one you are attuned to during a long rest." + "\n   " + "If you lose your Stormforged Weapon or wish to create additional ones, you can do so over the course of three days (eight hours each day) by expending 200 gold pieces worth of metal and other raw materials. When you make a new Stormforged Weapon, you can make the same or different type, and select the same or different upgrades." + "\n   " + "Stormcharged. When you use an action, bonus action, or reaction to attack with a Stormcharged Weapon, you can make only one Attack regardless of the number of attacks you can normally make. If you could otherwise make additional attacks with that action, the weapon deals an additional 3d6 lightning or thunder damage per attack that was foregone." + "\n   " + "Loud: Your weapon rings with thunder that is audible within 300 feet of you whenever it makes an attack.",
		weight : 5,
        weaponAdd : "Hand Cannon",
        weaponOptions : {
            regExpSearch : /^(?=.*Hand)(?=.*cannon).*$/i,
            name : "Hand Cannon",
            source : ["KT:AA", 22],
            ability : 2,
            type : "Artificer Weapon",
            damage : [1, 10, "piercing"],
            range : "30/90 ft",
            weight : 5,
            description : "Ammunition, Light, Loud, Stormcharged",
            abilitytodamage : true,
            ammo : "storm rounds",
            artHandcannon : true
        }
    },
    "kinetic hammer" : {},
    "charged blade" : {},
    "lightning pike" : {},
    weaponOptions : [{
        regExpSearch : /^(?=.*Hand)(?=.*cannon).*$/i,
        name : "Hand Cannon",
        source : ["KT:AA", 22],
        ability : 2,
        type : "Artificer Weapon",
        damage : [1, 10, "piercing"],
        range : "30/90 ft",
        weight : 5,
        description : "Ammunition, Light, Loud, Stormcharged",
        abilitytodamage : true,
        ammo : "storm rounds",
        artHandcannon : true
    },{
        regExpSearch : /^(?=.*kinetic)(?=.*hammer).*$/i,
        name : "Kinetic Hammer",
        source : ["KT:AA", 22],
        ability : 1,
        type : "Artificer Weapon",
        damage : [1, 10, "bludgeoning"],
        range : "Melee",
        weight : 10,
        description : "+1d4 Thunder Dmg, Two-Handed, Heavy, Loud",
        abilitytodamage : true,
        artKineticHammer : true
    },{
        regExpSearch : /^(?=.*charged)(?=.*blade).*$/i,
        name : "Charged Blade",
        source : ["KT:AA", 22],
        ability : 1,
        type : "Artificer Weapon",
        damage : [1, 6, "slashing"],
        range : "Melee",
        weight : 3,
        description : "+1d4 Lightning Dmg, Finesse, Loud",
        abilitytodamage : true,
        artChargedBlade : true
    },{
        regExpSearch : /^(?=.*lightning)(?=.*pike).*$/i,
        name : "Lightning Pike",
        source : ["KT:AA", 22],
        ability : 1,
        type : "Artificer Weapon",
        damage : [1, 8, "piercing"],
        range : "Melee",
        weight : 10,
        description : "+1d4 Lightning Dmg, Reach, Two-Handed, Loud",
        abilitytodamage : true,
        artLightningPike : true
    }],
    calcChanges : {
        atkAdd : [
            function (fields, v) {
                if (v.theWea.artThundercannon) fields.Proficiency = true;
                if (v.theWea.artHandcannon) fields.Proficiency = true;
                if (v.theWea.artKineticHammer) fields.Proficiency = true;
                if (v.theWea.artChargedBlade) fields.Proficiency = true;
                if (v.theWea.artLightningPike) fields.Proficiency = true;
            },
            ""
        ]
    }
};

AmmoList["storm rounds"] = {
    name : "Storm Rounds",
    source : ["KT:AA", 5],
    weight : 0.2, // based on the weight of renaissance bullets from the DMG
    icon : "Bullets",
    checks : [".Bullet"],
    display : 50,
    invName : "Storm Rounds",
    alternatives : [/^((?=.*storm)|(?=.*rounds?)).*$/i]
};

//*****************************************************\\
//*                   -Gadgetsmith-                   *\\
//*****************************************************\\

// MagicItemsList["gadgetsmith's gadgets"] = {
//     name : "Gadgetsmith's Gadgets",
//     source : ["KT:AA", 5],
//     type : "wondrous item",
//     rarity : "artifact",
//     extraTooltip : "Attunement (creator only)",
//     attunement : true,
//     prerequisite : "Only for a Gadgetsmith Artificer",
//     prereqeval : function(v) {
//         return classes.known["alternate artificer"].subclass == "alternate artificer-gadgetsmith";
//     },
//     allowDuplicates : true,
//     description : "A bunch of gadgets and tools that you have that have all kinds of functions. I can get get new gadgets and tools from my Specialization Upgrade feature. (This is just a item I added to hold the spells from the upgrades)",
//     descriptionFull : "A bunch of gadgets and tools that you have that have all kinds of functions. I can get get new gadgets and tools from my Specialization Upgrade feature. (This is just a item I added to hold the spells from the upgrades)",
//     spellcastingBonus : [],
//     spellFirstColTitle : "Rs",
//     spellChanges : {}
// };

// WeaponsList["boomerang of hitting"] = {
//     regExpSearch : /^(?=.*boomerang)(?=.*hitting).*$/i,
//     name : "Boomerang of Hitting",
//     source : ["KT:AA", 8],
//     list : "alternate artificer",
//     ability : 2,
//     type : "Artificer Weapon",
//     damage : [1, 4, "bludgeoning"],
//     range : "Melee, 30/90 ft",
//     description : "Finesse; Thrown, Returns; Special",
//     abilitytodamage : true,
//     artBoomerang : true
// };
// WeaponsList["impact gauntlet"] = {
//     regExpSearch : /^(?=.*impact)(?=.*gauntlet).*$/i,
//     name : "Impact Gauntlet",
//     source : ["KT:AA", 9],
//     list : "alternate artificer",
//     ability : 2,
//     type : "Artificer Weapon",
//     damage : [1, 8, "bludgeoning"],
//     range : "Melee",
//     description : "Finesse, Light, Special",
//     abilitytodamage : true,
//     artGauntlet : true
// };
// WeaponsList["repeating hand crossbow"] = {
//     regExpSearch : /^(?=.*repeating)(?=.*crossbow).*$/i,
//     name : "Repeating Hand Crossbow",
//     source : ["KT:AA", 9],
//     list : "alternate artificer",
//     ability : 2,
//     type : "Artificer Weapon",
//     damage : [1, 6, "piercing"],
//     range : "30/120 ft",
//     description : "Ammunition, Light, Special, Auto-loading",
//     abilitytodamage : true,
//     ammo : "Bolts",
//     artRepeatCrossbow : true
// };
// WeaponsList["lightning baton"] = {
//     regExpSearch : /^(?=.*lightning)(?=.*baton).*$/i,
//     name : "Lightning Baton",
//     source : ["KT:AA", 9],
//     list : "alternate artificer",
//     ability : 2,
//     type : "Artificer Weapon",
//     damage : ["1d4/1d4", "", "bludgeoning"],
//     range : "30/120 ft",
//     description : "Finesse, Light, 1d4 is lightning, Con save vs. spell save DC on crit; fail - is stunned until my next turn",
//     abilitytodamage : true,
//     artBaton : true
// };

//*****************************************************\\
//*                    -Golemsmith-                   *\\
//*****************************************************\\

//*****************************************************\\
//*                  -Infusionsmith-                  *\\
//*****************************************************\\

//*****************************************************\\
//*                   -Potionsmith-                   *\\
//*****************************************************\\



//Did this as a feat to separate the reactions from normal spells
// FeatsList["instant reactions"] = {
//     name : "Instant Reactions",
// 	source : ["KT:AA", 16],
// 	prerequisite : "Being a Potionsmith",
// 	prereqeval : "classes.known['alternate artificer'].subclass == 'alternate artificer-potionsmith'",
// 	description : "I know how to get instant reactions to occur without the niceties for more refined concoctions. I know the instant reactions Alchemical Fire, Poisonous Gas, and Healing Draught now. I can learn additional reactions through my upgrades",
// 	spellcastingBonus : [{
// 		name : "Starting Instant Reactions",
// 		spellcastingAbility : 4,
// 		spells : ["alchemical fire", "poisonous gas", "healing draught"],
// 		selection : ["alchemical fire", "poisonous gas", "healing draught"],
//         firstCol : "St",
//         times : 3
// 	}, {
//         name : "Upgrade Instant Reactions",
// 		spells : ["alchemical acid", "explosive reaction", "fortifying fumes reaction", "frostbloom reaction"],
// 		selection : ["alchemical acid", "explosive reaction", "fortifying fumes reaction", "frostbloom reaction"],
//         firstCol : "Up",
//         times : 4
//     }]
// };

// //Add Instant Reactions
// SpellsList["alchemical fire"] = {
//     name : "Alchemical Fire",
// 	classes : [],
// 	source : ["KT:AA", 16],
//     level : 0,
//     school : "Trans",
// 	time : "1 a",
//     range : "15 ft",
// 	components : "S,M",
// 	duration : "Instantaneous",
// 	save : "Dex",
// 	description : "5-ft rad all save or 1d8 Fire dmg; +1d8 at CL 5/11/17",
// 	descriptionFull : "As an action you can produce a reaction causing a searing flame. At a point within 15 feet, you can a toss quick combination of reagents that will cause searing fire to flare up in a 5 foot radius. Creatures in that area have to make a dexterity saving throw, or take 1d8 fire damage." + "\n   " + "The damage damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8)."
// };
// SpellsList["poisonous gas"] = {
//     name : "Poisonous Gas",
//     classes : [],
//     source : ["KT:AA", 16],
//     level : 0,
//     school : "Trans",
//     time : "1 a",
//     range : "15 ft",
//     components : "S,M",
//     duration : "Instantaneous",
//     save : "Con",
//     description : "5-ft rad all save or 1d4 Poison dmg and poisoned until end of next turn; +1d4 at CL 5/11/17",
//     descriptionFull : "As an action you can produce a reaction causing noxious fumes. At a point within 15 feet, you can toss a quick combination of reagents that will cause a whiff of poisonous gas to erupt spreading to a radius of 5 feet. Creatures in that area have to make a constitution saving throw, or take 1d4 poison damage and become poisoned until the end of their next turn." + "\n   " + "The damage damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8)."
// };
// SpellsList["healing draught"] = {
//     name : "Healing Draught",
//     classes : [],
//     source : ["KT:AA", 17],
//     level : 0,
//     school : "Trans",
//     time : "1 bns",
//     range : "Touch",
//     components : "S,M",
//     duration : "Instantaneous",
//     description : "Crate draught; 1 a administer; Heals 1d8 hp; Only works per Con mod per LR; +1d8 at CL 5/11/17",
//     descriptionFull : "As a bonus action, you can produce a combination that will provide potent magical healing. Immediately after creating the draught, you can use your action to consume it or administer it to a creature within 5 feet. A creature who drinks this draught regains 1d8 health. A creature can benefit from a number of these healing draughts equal to their constitution modifier (minimum 1), after which they provide no additional benefit until they complete a long rest. A Healing Draught that is not consumed by the end of your turn loses its potency." + "\n   " + "The healing increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8)."
// };
// SpellsList["alchemical acid"] = {
//     name : "Alchemical Acid",
//     classes : [],
//     source : ["KT:AA", 17],
//     level : 0,
//     school : "Trans",
//     time : "1 a",
//     range : "15 ft",
//     components : "S,M",
//     duration : "Instantaneous",
//     save : "Dex",
//     description : "5-ft rad all save or 2d4 Acid dmg; Double dmg to obj; +2d4 at CL 5/11/17",
//     descriptionFull : "As an action you can produce a reaction causing a caustic acid to form. At a creature within 15 feet, you can a toss quick combination of reagents that will cause a splatter of acid in a 5 foot radius. Creatures in that area have to make a dexterity saving throw, or take 2d4 acid damage. Deals double damage against structures." + "\n   " + "The damage damage increases by 2d4 when you reach 5th level (4d4), 11th level (6d4), and 17th level (8d4)."
// };
// SpellsList["explosive reaction"] = {
//     name : "Explosive Reaction",
//     classes : [],
//     source : ["KT:AA", 18],
//     level : 0,
//     school : "Trans",
//     time : "1 a",
//     range : "15 ft",
//     components : "S,M",
//     duration : "Instantaneous",
//     save : "Con",
//     description : "10-ft rad all save or 1d10 Thunder dmg; +1d10 at CL 5/11/17",
//     descriptionFull : "Targeting a point within 15 feet, as an action, you cause an explosion. Creatures within 10 feet of the target point must make a constitution saving throw, or take 1d10 thunder damage from the shockwave of the explosion." + "\n   " + "The damage damage increases by 1d10 when you reach 5th level (2d10), 11th level (3d10), and 17th level (4d10)."
// };
// SpellsList["fortifying fumes reaction"] = {
//     name : "Fortifying Fumes Reaction",
//     classes : [],
//     source : ["KT:AA", 18],
//     level : 0,
//     school : "Trans",
//     time : "1 a",
//     range : "15 ft",
//     components : "S,M",
//     duration : "Instantaneous",
//     description : "10-ft rad all 1d4 temp hp, next atk does +1d4, and adv. on next Con save; +1d4 at CL 5/11/17",
//     descriptionFull : "Targeting a point within 15 feet, as an action, you cause fumes to erupt. Creatures within 10 feet of the target point can choose to hold their breath and not inhale, but creatures that inhale the fumes gain 1d4 temporary hit points, deal 1d4 additional damage on their next melee weapon attack, and have advantage on their next Constitution saving throw. Any remaining benefits fade at the end of your next turn." + "\n   " + "Both the temporary hit points and damage bonus increase by 1d4 when you reach 5th level (2d4), 11th level (3d4), and 17th level (4d4)"
// };
// SpellsList["frostbloom reaction"] = {
//     name : "Frostbloom Reaction",
//     classes : [],
//     source : ["KT:AA", 18],
//     level : 0,
//     school : "Trans",
//     time : "1 a",
//     range : "15 ft",
//     components : "S,M",
//     duration : "Instantaneous",
//     save : "Dex",
//     description : "5-ft rad all save or 1d6 Cold dmg and restrained; dif. ter. end of next turn; +1d6 at CL 5/11/17",
//     descriptionFull : "Targeting a point within 15 feet, as an action, you cause an the area to erupt in frost. The area within 5 feet of the target point becomes difficult terrain until the end of your next turn, and any creature in the area must make a dexterity saving throw, or be caught by the ice taking 1d6 cold damage; a creature entirely in the area of effect that fails also becoming restrained until the end of their next turn. They can use their action to make a Strength saving throw to break free of the ice early." + "\n   " + "The damage damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6)."
// };

// //Add Weapons for Instant Reactions
// WeaponsList["alchemical fire"] = {
// 	regExpSearch : /^(?=.*alchemical)(?=.*fire).*$/i,
// 	name : "Alchemical Fire",
// 	source : ["KT:AA", 16],
// 	list : "instant reactions",
// 	ability : 2,
// 	type : "Cantrip",
// 	damage : ["C", 8, "fire"],
// 	range : "15 ft",
// 	description : "5-ft rad; Dex save, success - no damage;",
// 	abilitytodamage : false,
//     dc : true
// };
// WeaponsList["poisonous gas"] = {
// 	regExpSearch : /^(?=.*poisonous)(?=.*gas).*$/i,
// 	name : "Poisonous Gas",
// 	source : ["KT:AA", 16],
// 	list : "instant reactions",
// 	ability : 3,
// 	type : "Cantrip",
// 	damage : ["C", 4, "poison"],
// 	range : "15 ft",
// 	description : "5-ft rad; Con save, success - no damage, fail - also poisoned till end of their next turn;",
// 	abilitytodamage : false,
// 	dc : true
// };
// WeaponsList["alchemical acid"] = {
// 	regExpSearch : /^(?=.*alchemical)(?=.*acid).*$/i,
// 	name : "Alchemical Acid",
// 	source : ["KT:AA", 17],
// 	list : "instant reactions",
// 	ability : 2,
// 	type : "Cantrip",
// 	damage : ["=C+C", 4, "acid"],
// 	range : "15 ft",
// 	description : "5-ft rad; Dex save, success - no damage; double dmg to structures;",
// 	abilitytodamage : false,
// 	dc : true
// };
// WeaponsList["explosive reaction"] = {
// 	regExpSearch : /^(?=.*explosive)(?=.*reaction).*$/i,
// 	name : "Explosive Reaction",
// 	source : ["KT:AA", 18],
// 	list : "instant reactions",
// 	ability : 3,
// 	type : "Cantrip",
// 	damage : ["C", 10, "thunder"],
// 	range : "15 ft",
// 	description : "10-ft rad; Con save, success - no damage;",
// 	abilitytodamage : false,
// 	dc : true
// };
// WeaponsList["fortifying fumes reaction"] = {
// 	regExpSearch : /^(?=.*fortifying)(?=.*fumes)(?=.*reaction).*$/i,
// 	name : "Fortifying Fumes Reaction",
// 	source : ["KT:AA", 18],
// 	list : "instant reactions",
// 	ability : 3,
// 	type : "Cantrip",
// 	damage : ["Cd4/Cd4", "", "Same"],
// 	range : "15 ft",
// 	description : "10-ft rad all; First is temp Hp added; second is dmg added to next wea atk; adv. on next Con save",
// 	abilitytodamage : false
// };
// WeaponsList["frostbloom reaction"] = {
// 	regExpSearch : /^(?=.*frostbloom)(?=.*reaction).*$/i,
// 	name : "Frostbloom Reaction",
// 	source : ["KT:AA", 18],
// 	list : "instant reactions",
// 	ability : 2,
// 	type : "Cantrip",
// 	damage : ["C", 6, "cold"],
// 	range : "15 ft",
// 	description : "5-ft rad; Dex save, success - no damage. fail - also restrained; area becomes difficult terrain",
// 	abilitytodamage : false,
// 	dc : true
// };

//*****************************************************\\
//*                     -Warsmith-                    *\\
//*****************************************************\\

// WeaponsList["mechplate gauntlet"] = {
//     regExpSearch : /^(?=.*mechplate)(?=.*gauntlet).*$/i,
//     name : "Mechplate Gauntlet",
//     source : ["KT:AA", 20],
//     weight : 2,
//     list : "alternate artificer",
//     ability : 1,
//     type : "Artificer Weapon",
//     damage : [1, 6, "Bludgeoning"],
//     range : "Melee",
//     description : "Prof in Martial Weapons, Shocking Grasp",
//     abilitytodamage : true
// };
// WeaponsList["force blast"] = {
//     regExpSearch : /^(?=.*force)(?=.*blast).*$/i,
//     name : "Force Blast",
//     source : ["KT:AA", 21],
//     list : "alternate artificer",
//     ability : 4,
//     type : "Artificer Weapon",
//     damage : [1, 8, "Force"],
//     range : "30 ft",
//     description : "Ranged spell attack",
//     abilitytodamage : true
// };
// WeaponsList["power gauntlet"] = {
//     regExpSearch :/^(?=.*power)(?=.*gauntlet).*$/i,
//     name : "Power Gauntlet",
//     source : ["KT:AA", 22],
//     weight : 2,
//     list : "alternate artificer",
//     ability : 1,
//     type : "Artificer Weapon",
//     damage : [1, 8, "Bludgeoning"],
//     range : "Melee",
//     description : "Light, Magical, Special, Prof in Martial Weapons, Shocking Grasp",
//     abilitytodamage : true
// };
// ArmourList["mechplate"] = {
//     regExpSearch : /^(?=.*mechplate).*$/i,
//     name : "Mechplate",
//     source : ["KT:AA", 20],
//     list : "alternate artificer",
//     type : "heavy",
//     ac : 18,
//     stealthdis : true,
//     weight : 105
// };
// ArmourList["mechsuit"] = {
//     regExpSearch : /^(?=.*mechsuit).*$/i,
//     name : "Mechsuit",
//     source : ["KT:AA", 22],
//     list : "alternate artificer",
//     type : "medium",
//     ac : 15,
//     stealthdis : false,
//     weight : 40
// };

//*****************************************************\\
//*                    -Wandsmith-                    *\\
//*****************************************************\\