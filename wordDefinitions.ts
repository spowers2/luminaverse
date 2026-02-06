// Key Biblical Terms with Hebrew/Greek Definitions
// Data sourced from Strong's Concordance (Public Domain)

export interface WordDefinition {
  word: string
  original: string
  transliteration: string
  strongsNumber: string
  definition: string
  etymology?: string
}

export const wordDefinitions: WordDefinition[] = [
  // God/Deity Terms
  {
    word: "God",
    original: "אֱלֹהִים / Θεός",
    transliteration: "Elohim / Theos",
    strongsNumber: "H430 / G2316",
    definition: "Supreme Being, the Creator. Hebrew 'Elohim' is plural, showing majesty. Greek 'Theos' refers to divine nature.",
    etymology: "From 'el' (mighty, strong)"
  },
  {
    word: "Lord",
    original: "יְהוָה / Κύριος",
    transliteration: "YHWH / Kyrios",
    strongsNumber: "H3068 / G2962",
    definition: "The personal name of God (Yahweh/Jehovah). Kyrios means master, supreme authority.",
    etymology: "From 'hayah' (to be, to exist)"
  },

  // Love Terms
  {
    word: "love",
    original: "אַהֲבָה / ἀγάπη",
    transliteration: "ahavah / agapē",
    strongsNumber: "H160 / G26",
    definition: "Divine, unconditional love. Agapē is the highest form of love - selfless, sacrificial, chosen.",
    etymology: "Hebrew root 'ahav' (to love). Greek agapē (divine love)"
  },
  {
    word: "loved",
    original: "אָהַב / ἠγάπησεν",
    transliteration: "ahav / ēgapēsen",
    strongsNumber: "H157 / G25",
    definition: "To love deeply, to have affection. Past tense of divine love.",
    etymology: "From ahavah (love)"
  },

  // Faith Terms
  {
    word: "faith",
    original: "אֱמוּנָה / πίστις",
    transliteration: "emunah / pistis",
    strongsNumber: "H530 / G4102",
    definition: "Trust, belief, faithfulness. Firm conviction and complete trust in God.",
    etymology: "From 'aman' (to be firm, steadfast)"
  },
  {
    word: "believe",
    original: "אָמַן / πιστεύω",
    transliteration: "aman / pisteuō",
    strongsNumber: "H539 / G4100",
    definition: "To trust, have confidence in. To place faith and reliance upon.",
    etymology: "Root meaning 'to be firm, reliable'"
  },

  // Grace/Mercy
  {
    word: "grace",
    original: "חֵן / χάρις",
    transliteration: "chen / charis",
    strongsNumber: "H2580 / G5485",
    definition: "Unmerited favor, divine blessing. God's kindness and goodwill toward humanity.",
    etymology: "From 'chanan' (to be gracious)"
  },
  {
    word: "mercy",
    original: "חֶסֶד / ἔλεος",
    transliteration: "chesed / eleos",
    strongsNumber: "H2617 / G1656",
    definition: "Loving-kindness, covenant love. Compassion and steadfast love.",
    etymology: "Loyal love, faithfulness"
  },

  // Hope/Peace
  {
    word: "hope",
    original: "תִּקְוָה / ἐλπίς",
    transliteration: "tiqvah / elpis",
    strongsNumber: "H8615 / G1680",
    definition: "Confident expectation, trust in God's promises. Assurance of future good.",
    etymology: "From 'qavah' (to wait, expect)"
  },
  {
    word: "peace",
    original: "שָׁלוֹם / εἰρήνη",
    transliteration: "shalom / eirēnē",
    strongsNumber: "H7965 / G1515",
    definition: "Completeness, wholeness, harmony. Not just absence of conflict but total well-being.",
    etymology: "From 'shalam' (to be complete)"
  },

  // Life/Spirit
  {
    word: "life",
    original: "חַיִּים / ζωή",
    transliteration: "chayyim / zōē",
    strongsNumber: "H2416 / G2222",
    definition: "Living, alive. Greek zōē refers to divine life, eternal life.",
    etymology: "From 'chayah' (to live, revive)"
  },
  {
    word: "spirit",
    original: "רוּחַ / πνεῦμα",
    transliteration: "ruach / pneuma",
    strongsNumber: "H7307 / G4151",
    definition: "Breath, wind, spirit. The immaterial, intelligent part of humans; the Spirit of God.",
    etymology: "Literally 'breath' or 'wind'"
  },

  // Salvation Terms
  {
    word: "salvation",
    original: "יְשׁוּעָה / σωτηρία",
    transliteration: "yeshuah / sōtēria",
    strongsNumber: "H3444 / G4991",
    definition: "Deliverance, rescue, safety. God's saving work and eternal redemption.",
    etymology: "From 'yasha' (to save, deliver)"
  },
  {
    word: "save",
    original: "יָשַׁע / σῴζω",
    transliteration: "yasha / sōzō",
    strongsNumber: "H3467 / G4982",
    definition: "To deliver, rescue, bring to safety. To preserve from destruction.",
    etymology: "To be open, wide, free"
  },

  // Truth/Righteousness
  {
    word: "truth",
    original: "אֱמֶת / ἀλήθεια",
    transliteration: "emet / alētheia",
    strongsNumber: "H571 / G225",
    definition: "Reliability, faithfulness, reality. That which corresponds to fact and reality.",
    etymology: "From 'aman' (to be firm, sure)"
  },
  {
    word: "righteousness",
    original: "צְדָקָה / δικαιοσύνη",
    transliteration: "tsedaqah / dikaiosynē",
    strongsNumber: "H6666 / G1343",
    definition: "Justice, rightness, moral virtue. Right standing before God.",
    etymology: "From 'tsadaq' (to be just, righteous)"
  },

  // Kingdom/Glory
  {
    word: "kingdom",
    original: "מַלְכוּת / βασιλεία",
    transliteration: "malkuth / basileia",
    strongsNumber: "H4438 / G932",
    definition: "Royal power, realm, reign. The sovereign rule and domain of God.",
    etymology: "From 'melek' (king)"
  },
  {
    word: "glory",
    original: "כָּבוֹד / δόξα",
    transliteration: "kavod / doxa",
    strongsNumber: "H3519 / G1391",
    definition: "Honor, splendor, brightness. The visible manifestation of God's presence.",
    etymology: "From 'kaved' (to be heavy, weighty)"
  },

  // Covenant/Promise
  {
    word: "covenant",
    original: "בְּרִית / διαθήκη",
    transliteration: "berith / diathēkē",
    strongsNumber: "H1285 / G1242",
    definition: "A solemn agreement, treaty. A binding promise between God and His people.",
    etymology: "From 'barah' (to cut)"
  },
  {
    word: "promise",
    original: "דָּבָר / ἐπαγγελία",
    transliteration: "davar / epangelia",
    strongsNumber: "H1697 / G1860",
    definition: "A word given, pledge. God's declared intention to bless.",
    etymology: "From 'dabar' (to speak)"
  },

  // Worship/Praise
  {
    word: "worship",
    original: "שָׁחָה / προσκυνέω",
    transliteration: "shachah / proskyneō",
    strongsNumber: "H7812 / G4352",
    definition: "To bow down, prostrate oneself. To give reverence and honor to God.",
    etymology: "To depress, bow down"
  },
  {
    word: "praise",
    original: "תְּהִלָּה / αἶνος",
    transliteration: "tehillah / ainos",
    strongsNumber: "H8416 / G136",
    definition: "Song of praise, commendation. To celebrate and glorify God.",
    etymology: "From 'halal' (to shine, boast)"
  },

  // Sin/Forgiveness
  {
    word: "sin",
    original: "חַטָּאָה / ἁμαρτία",
    transliteration: "chatta'ah / hamartia",
    strongsNumber: "H2403 / G266",
    definition: "Missing the mark, offense, wrongdoing. Rebellion against God's law.",
    etymology: "To miss, fail"
  },
  {
    word: "forgive",
    original: "סָלַח / ἀφίημι",
    transliteration: "salach / aphiēmi",
    strongsNumber: "H5545 / G863",
    definition: "To pardon, let go. To release from guilt and penalty.",
    etymology: "To send away, release"
  },

  // Strength/Power
  {
    word: "strength",
    original: "עֹז / δύναμις",
    transliteration: "oz / dynamis",
    strongsNumber: "H5797 / G1411",
    definition: "Might, power, force. God's enabling power.",
    etymology: "To be strong, mighty"
  },
  {
    word: "power",
    original: "כֹּחַ / ἐξουσία",
    transliteration: "koach / exousia",
    strongsNumber: "H3581 / G1849",
    definition: "Ability, capacity. Authority and right to exercise power.",
    etymology: "Vigor, strength"
  },

  // Heart/Soul
  {
    word: "heart",
    original: "לֵב / καρδία",
    transliteration: "lev / kardia",
    strongsNumber: "H3820 / G2588",
    definition: "Inner person, mind, will, emotions. The center of one's being.",
    etymology: "The inner self"
  },
  {
    word: "soul",
    original: "נֶפֶשׁ / ψυχή",
    transliteration: "nephesh / psychē",
    strongsNumber: "H5315 / G5590",
    definition: "Life, self, person. The immaterial essence that animates the body.",
    etymology: "Breathing creature"
  },

  // Joy/Blessing
  {
    word: "joy",
    original: "שִׂמְחָה / χαρά",
    transliteration: "simchah / chara",
    strongsNumber: "H8057 / G5479",
    definition: "Gladness, delight, celebration. Deep spiritual happiness.",
    etymology: "From 'samach' (to rejoice)"
  },
  {
    word: "blessed",
    original: "בָּרוּךְ / μακάριος",
    transliteration: "baruch / makarios",
    strongsNumber: "H1288 / G3107",
    definition: "Happy, fortunate, favored by God. Supremely blessed.",
    etymology: "To kneel, bless"
  },

  // Holy/Clean
  {
    word: "holy",
    original: "קָדוֹשׁ / ἅγιος",
    transliteration: "qadosh / hagios",
    strongsNumber: "H6918 / G40",
    definition: "Set apart, sacred, consecrated. Morally and spiritually pure.",
    etymology: "To be separate, sacred"
  },
  {
    word: "pure",
    original: "טָהוֹר / καθαρός",
    transliteration: "tahor / katharos",
    strongsNumber: "H2889 / G2513",
    definition: "Clean, undefiled. Free from moral impurity.",
    etymology: "To be clean, pure"
  }
]

// Helper function to find definition for a word
export function getWordDefinition(word: string): WordDefinition | undefined {
  const normalized = word.toLowerCase().replace(/[.,;:!?"']/g, "")
  return wordDefinitions.find(def => def.word.toLowerCase() === normalized)
}
