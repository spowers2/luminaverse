// Curated Bible verses organized by topic
// All verses are from public domain translations

export interface TopicalVerse {
  text: string
  reference: string
  topics: string[] // Can belong to multiple topics
}

export interface Topic {
  id: string
  name: string
  icon: string // Feather icon name
  description: string
  color: string
}

export const topics: Topic[] = [
  {
    id: "faith",
    name: "Faith",
    icon: "shield",
    description: "Trust and belief in God",
    color: "#4a7c7e"
  },
  {
    id: "love",
    name: "Love",
    icon: "heart",
    description: "God's love and loving others",
    color: "#e74c3c"
  },
  {
    id: "peace",
    name: "Peace",
    icon: "sunset",
    description: "Inner peace and harmony",
    color: "#3498db"
  },
  {
    id: "hope",
    name: "Hope",
    icon: "sunrise",
    description: "Trust in God's promises",
    color: "#f39c12"
  },
  {
    id: "courage",
    name: "Courage",
    icon: "award",
    description: "Strength and bravery",
    color: "#9b59b6"
  },
  {
    id: "wisdom",
    name: "Wisdom",
    icon: "book-open",
    description: "Understanding and discernment",
    color: "#16a085"
  },
  {
    id: "joy",
    name: "Joy",
    icon: "sun",
    description: "Rejoicing and gladness",
    color: "#f1c40f"
  },
  {
    id: "forgiveness",
    name: "Forgiveness",
    icon: "check-circle",
    description: "Grace and mercy",
    color: "#27ae60"
  },
  {
    id: "kindness",
    name: "Kindness",
    icon: "gift",
    description: "Compassion and generosity",
    color: "#e67e22"
  },
  {
    id: "patience",
    name: "Patience",
    icon: "clock",
    description: "Endurance and self-control",
    color: "#95a5a6"
  }
]

export const topicalVerses: TopicalVerse[] = [
  // FAITH
  {
    text: "Now faith is the substance of things hoped for, the evidence of things not seen.",
    reference: "Hebrews 11:1",
    topics: ["faith", "hope"]
  },
  {
    text: "For we walk by faith, not by sight.",
    reference: "2 Corinthians 5:7",
    topics: ["faith"]
  },
  {
    text: "And Jesus said unto them, Because of your unbelief: for verily I say unto you, If ye have faith as a grain of mustard seed, ye shall say unto this mountain, Remove hence to yonder place; and it shall remove; and nothing shall be impossible unto you.",
    reference: "Matthew 17:20",
    topics: ["faith"]
  },
  {
    text: "But without faith it is impossible to please him: for he that cometh to God must believe that he is, and that he is a rewarder of them that diligently seek him.",
    reference: "Hebrews 11:6",
    topics: ["faith"]
  },
  {
    text: "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God.",
    reference: "Ephesians 2:8",
    topics: ["faith"]
  },
  {
    text: "Trust in the Lord with all thine heart; and lean not unto thine own understanding.",
    reference: "Proverbs 3:5",
    topics: ["faith", "wisdom"]
  },
  {
    text: "So then faith cometh by hearing, and hearing by the word of God.",
    reference: "Romans 10:17",
    topics: ["faith"]
  },
  {
    text: "Jesus said unto him, If thou canst believe, all things are possible to him that believeth.",
    reference: "Mark 9:23",
    topics: ["faith"]
  },
  {
    text: "For whatsoever is born of God overcometh the world: and this is the victory that overcometh the world, even our faith.",
    reference: "1 John 5:4",
    topics: ["faith", "courage"]
  },
  {
    text: "And he said to the woman, Thy faith hath saved thee; go in peace.",
    reference: "Luke 7:50",
    topics: ["faith", "peace"]
  },

  // LOVE
  {
    text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
    reference: "John 3:16",
    topics: ["love", "faith"]
  },
  {
    text: "And now abideth faith, hope, charity, these three; but the greatest of these is charity.",
    reference: "1 Corinthians 13:13",
    topics: ["love", "faith", "hope"]
  },
  {
    text: "A new commandment I give unto you, That ye love one another; as I have loved you, that ye also love one another.",
    reference: "John 13:34",
    topics: ["love", "kindness"]
  },
  {
    text: "Beloved, let us love one another: for love is of God; and every one that loveth is born of God, and knoweth God.",
    reference: "1 John 4:7",
    topics: ["love"]
  },
  {
    text: "There is no fear in love; but perfect love casteth out fear: because fear hath torment. He that feareth is not made perfect in love.",
    reference: "1 John 4:18",
    topics: ["love", "courage"]
  },
  {
    text: "And above all things have fervent charity among yourselves: for charity shall cover the multitude of sins.",
    reference: "1 Peter 4:8",
    topics: ["love", "forgiveness"]
  },
  {
    text: "Greater love hath no man than this, that a man lay down his life for his friends.",
    reference: "John 15:13",
    topics: ["love"]
  },
  {
    text: "We love him, because he first loved us.",
    reference: "1 John 4:19",
    topics: ["love"]
  },
  {
    text: "But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us.",
    reference: "Romans 5:8",
    topics: ["love", "forgiveness"]
  },
  {
    text: "Thou shalt love thy neighbour as thyself.",
    reference: "Matthew 22:39",
    topics: ["love", "kindness"]
  },

  // PEACE
  {
    text: "Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid.",
    reference: "John 14:27",
    topics: ["peace", "courage"]
  },
  {
    text: "And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.",
    reference: "Philippians 4:7",
    topics: ["peace"]
  },
  {
    text: "Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee.",
    reference: "Isaiah 26:3",
    topics: ["peace", "faith"]
  },
  {
    text: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.",
    reference: "Philippians 4:6",
    topics: ["peace"]
  },
  {
    text: "Blessed are the peacemakers: for they shall be called the children of God.",
    reference: "Matthew 5:9",
    topics: ["peace"]
  },
  {
    text: "Let the peace of God rule in your hearts, to the which also ye are called in one body; and be ye thankful.",
    reference: "Colossians 3:15",
    topics: ["peace"]
  },
  {
    text: "Great peace have they which love thy law: and nothing shall offend them.",
    reference: "Psalm 119:165",
    topics: ["peace", "wisdom"]
  },
  {
    text: "For he is our peace, who hath made both one, and hath broken down the middle wall of partition between us.",
    reference: "Ephesians 2:14",
    topics: ["peace"]
  },
  {
    text: "Now the Lord of peace himself give you peace always by all means. The Lord be with you all.",
    reference: "2 Thessalonians 3:16",
    topics: ["peace"]
  },
  {
    text: "The Lord will give strength unto his people; the Lord will bless his people with peace.",
    reference: "Psalm 29:11",
    topics: ["peace", "courage"]
  },

  // HOPE
  {
    text: "For I know the thoughts that I think toward you, saith the Lord, thoughts of peace, and not of evil, to give you an expected end.",
    reference: "Jeremiah 29:11",
    topics: ["hope", "peace"]
  },
  {
    text: "But they that wait upon the Lord shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.",
    reference: "Isaiah 40:31",
    topics: ["hope", "courage", "patience"]
  },
  {
    text: "Now the God of hope fill you with all joy and peace in believing, that ye may abound in hope, through the power of the Holy Ghost.",
    reference: "Romans 15:13",
    topics: ["hope", "joy", "peace"]
  },
  {
    text: "Why art thou cast down, O my soul? and why art thou disquieted within me? hope thou in God: for I shall yet praise him, who is the health of my countenance, and my God.",
    reference: "Psalm 42:11",
    topics: ["hope"]
  },
  {
    text: "Blessed be the God and Father of our Lord Jesus Christ, which according to his abundant mercy hath begotten us again unto a lively hope by the resurrection of Jesus Christ from the dead.",
    reference: "1 Peter 1:3",
    topics: ["hope"]
  },
  {
    text: "Let us hold fast the profession of our faith without wavering; (for he is faithful that promised;)",
    reference: "Hebrews 10:23",
    topics: ["hope", "faith"]
  },
  {
    text: "Be of good courage, and he shall strengthen your heart, all ye that hope in the Lord.",
    reference: "Psalm 31:24",
    topics: ["hope", "courage"]
  },
  {
    text: "The Lord is good unto them that wait for him, to the soul that seeketh him.",
    reference: "Lamentations 3:25",
    topics: ["hope", "patience"]
  },
  {
    text: "Behold, the eye of the Lord is upon them that fear him, upon them that hope in his mercy.",
    reference: "Psalm 33:18",
    topics: ["hope"]
  },
  {
    text: "For we are saved by hope: but hope that is seen is not hope: for what a man seeth, why doth he yet hope for?",
    reference: "Romans 8:24",
    topics: ["hope"]
  },

  // COURAGE
  {
    text: "Be strong and of a good courage, fear not, nor be afraid of them: for the Lord thy God, he it is that doth go with thee; he will not fail thee, nor forsake thee.",
    reference: "Deuteronomy 31:6",
    topics: ["courage"]
  },
  {
    text: "I can do all things through Christ which strengtheneth me.",
    reference: "Philippians 4:13",
    topics: ["courage"]
  },
  {
    text: "For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.",
    reference: "2 Timothy 1:7",
    topics: ["courage", "love"]
  },
  {
    text: "Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the Lord thy God is with thee whithersoever thou goest.",
    reference: "Joshua 1:9",
    topics: ["courage"]
  },
  {
    text: "What shall we then say to these things? If God be for us, who can be against us?",
    reference: "Romans 8:31",
    topics: ["courage"]
  },
  {
    text: "Wait on the Lord: be of good courage, and he shall strengthen thine heart: wait, I say, on the Lord.",
    reference: "Psalm 27:14",
    topics: ["courage", "patience"]
  },
  {
    text: "Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.",
    reference: "Isaiah 41:10",
    topics: ["courage"]
  },
  {
    text: "The Lord is my light and my salvation; whom shall I fear? the Lord is the strength of my life; of whom shall I be afraid?",
    reference: "Psalm 27:1",
    topics: ["courage"]
  },
  {
    text: "Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.",
    reference: "Psalm 23:4",
    topics: ["courage", "peace"]
  },
  {
    text: "But the Lord is faithful, who shall stablish you, and keep you from evil.",
    reference: "2 Thessalonians 3:3",
    topics: ["courage", "faith"]
  },

  // WISDOM
  {
    text: "If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him.",
    reference: "James 1:5",
    topics: ["wisdom"]
  },
  {
    text: "The fear of the Lord is the beginning of wisdom: and the knowledge of the holy is understanding.",
    reference: "Proverbs 9:10",
    topics: ["wisdom"]
  },
  {
    text: "For the Lord giveth wisdom: out of his mouth cometh knowledge and understanding.",
    reference: "Proverbs 2:6",
    topics: ["wisdom"]
  },
  {
    text: "Get wisdom, get understanding: forget it not; neither decline from the words of my mouth.",
    reference: "Proverbs 4:5",
    topics: ["wisdom"]
  },
  {
    text: "A wise man will hear, and will increase learning; and a man of understanding shall attain unto wise counsels.",
    reference: "Proverbs 1:5",
    topics: ["wisdom"]
  },
  {
    text: "The wise in heart will receive commandments: but a prating fool shall fall.",
    reference: "Proverbs 10:8",
    topics: ["wisdom"]
  },
  {
    text: "He that walketh with wise men shall be wise: but a companion of fools shall be destroyed.",
    reference: "Proverbs 13:20",
    topics: ["wisdom"]
  },
  {
    text: "Happy is the man that findeth wisdom, and the man that getteth understanding.",
    reference: "Proverbs 3:13",
    topics: ["wisdom", "joy"]
  },
  {
    text: "The fear of the Lord is the beginning of knowledge: but fools despise wisdom and instruction.",
    reference: "Proverbs 1:7",
    topics: ["wisdom"]
  },
  {
    text: "But the wisdom that is from above is first pure, then peaceable, gentle, and easy to be intreated, full of mercy and good fruits, without partiality, and without hypocrisy.",
    reference: "James 3:17",
    topics: ["wisdom", "peace", "kindness"]
  },

  // JOY
  {
    text: "This is the day which the Lord hath made; we will rejoice and be glad in it.",
    reference: "Psalm 118:24",
    topics: ["joy"]
  },
  {
    text: "Rejoice in the Lord alway: and again I say, Rejoice.",
    reference: "Philippians 4:4",
    topics: ["joy"]
  },
  {
    text: "The joy of the Lord is your strength.",
    reference: "Nehemiah 8:10",
    topics: ["joy", "courage"]
  },
  {
    text: "Thou wilt shew me the path of life: in thy presence is fulness of joy; at thy right hand there are pleasures for evermore.",
    reference: "Psalm 16:11",
    topics: ["joy"]
  },
  {
    text: "A merry heart doeth good like a medicine: but a broken spirit drieth the bones.",
    reference: "Proverbs 17:22",
    topics: ["joy"]
  },
  {
    text: "Make a joyful noise unto the Lord, all ye lands.",
    reference: "Psalm 100:1",
    topics: ["joy"]
  },
  {
    text: "For his anger endureth but a moment; in his favour is life: weeping may endure for a night, but joy cometh in the morning.",
    reference: "Psalm 30:5",
    topics: ["joy", "hope"]
  },
  {
    text: "Rejoice evermore.",
    reference: "1 Thessalonians 5:16",
    topics: ["joy"]
  },
  {
    text: "These things have I spoken unto you, that my joy might remain in you, and that your joy might be full.",
    reference: "John 15:11",
    topics: ["joy"]
  },
  {
    text: "But let all those that put their trust in thee rejoice: let them ever shout for joy, because thou defendest them: let them also that love thy name be joyful in thee.",
    reference: "Psalm 5:11",
    topics: ["joy", "faith"]
  },

  // FORGIVENESS
  {
    text: "If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.",
    reference: "1 John 1:9",
    topics: ["forgiveness"]
  },
  {
    text: "For if ye forgive men their trespasses, your heavenly Father will also forgive you.",
    reference: "Matthew 6:14",
    topics: ["forgiveness"]
  },
  {
    text: "And be ye kind one to another, tenderhearted, forgiving one another, even as God for Christ's sake hath forgiven you.",
    reference: "Ephesians 4:32",
    topics: ["forgiveness", "kindness"]
  },
  {
    text: "As far as the east is from the west, so far hath he removed our transgressions from us.",
    reference: "Psalm 103:12",
    topics: ["forgiveness"]
  },
  {
    text: "I, even I, am he that blotteth out thy transgressions for mine own sake, and will not remember thy sins.",
    reference: "Isaiah 43:25",
    topics: ["forgiveness"]
  },
  {
    text: "Let the wicked forsake his way, and the unrighteous man his thoughts: and let him return unto the Lord, and he will have mercy upon him; and to our God, for he will abundantly pardon.",
    reference: "Isaiah 55:7",
    topics: ["forgiveness"]
  },
  {
    text: "In whom we have redemption through his blood, the forgiveness of sins, according to the riches of his grace.",
    reference: "Ephesians 1:7",
    topics: ["forgiveness"]
  },
  {
    text: "Then said Jesus, Father, forgive them; for they know not what they do.",
    reference: "Luke 23:34",
    topics: ["forgiveness", "love"]
  },
  {
    text: "Blessed is he whose transgression is forgiven, whose sin is covered.",
    reference: "Psalm 32:1",
    topics: ["forgiveness"]
  },
  {
    text: "To the Lord our God belong mercies and forgivenesses, though we have rebelled against him.",
    reference: "Daniel 9:9",
    topics: ["forgiveness"]
  },

  // KINDNESS
  {
    text: "But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith.",
    reference: "Galatians 5:22",
    topics: ["kindness", "love", "joy", "peace", "patience"]
  },
  {
    text: "And as ye would that men should do to you, do ye also to them likewise.",
    reference: "Luke 6:31",
    topics: ["kindness"]
  },
  {
    text: "Let all bitterness, and wrath, and anger, and clamour, and evil speaking, be put away from you, with all malice: And be ye kind one to another, tenderhearted, forgiving one another.",
    reference: "Ephesians 4:31-32",
    topics: ["kindness", "forgiveness"]
  },
  {
    text: "But love ye your enemies, and do good, and lend, hoping for nothing again; and your reward shall be great.",
    reference: "Luke 6:35",
    topics: ["kindness", "love"]
  },
  {
    text: "He hath shewed thee, O man, what is good; and what doth the Lord require of thee, but to do justly, and to love mercy, and to walk humbly with thy God?",
    reference: "Micah 6:8",
    topics: ["kindness"]
  },
  {
    text: "Therefore all things whatsoever ye would that men should do to you, do ye even so to them.",
    reference: "Matthew 7:12",
    topics: ["kindness"]
  },
  {
    text: "She openeth her mouth with wisdom; and in her tongue is the law of kindness.",
    reference: "Proverbs 31:26",
    topics: ["kindness", "wisdom"]
  },
  {
    text: "Beareth all things, believeth all things, hopeth all things, endureth all things.",
    reference: "1 Corinthians 13:7",
    topics: ["kindness", "love", "patience"]
  },
  {
    text: "Put on therefore, as the elect of God, holy and beloved, bowels of mercies, kindness, humbleness of mind, meekness, longsuffering.",
    reference: "Colossians 3:12",
    topics: ["kindness", "patience"]
  },
  {
    text: "But thou, O Lord, art a God full of compassion, and gracious, longsuffering, and plenteous in mercy and truth.",
    reference: "Psalm 86:15",
    topics: ["kindness"]
  },

  // PATIENCE
  {
    text: "Rest in the Lord, and wait patiently for him: fret not thyself because of him who prospereth in his way.",
    reference: "Psalm 37:7",
    topics: ["patience", "peace"]
  },
  {
    text: "But if we hope for that we see not, then do we with patience wait for it.",
    reference: "Romans 8:25",
    topics: ["patience", "hope"]
  },
  {
    text: "Be patient therefore, brethren, unto the coming of the Lord. Behold, the husbandman waiteth for the precious fruit of the earth, and hath long patience for it.",
    reference: "James 5:7",
    topics: ["patience"]
  },
  {
    text: "And let us not be weary in well doing: for in due season we shall reap, if we faint not.",
    reference: "Galatians 6:9",
    topics: ["patience", "courage"]
  },
  {
    text: "Better is the end of a thing than the beginning thereof: and the patient in spirit is better than the proud in spirit.",
    reference: "Ecclesiastes 7:8",
    topics: ["patience", "wisdom"]
  },
  {
    text: "In your patience possess ye your souls.",
    reference: "Luke 21:19",
    topics: ["patience"]
  },
  {
    text: "Now we exhort you, brethren, warn them that are unruly, comfort the feebleminded, support the weak, be patient toward all men.",
    reference: "1 Thessalonians 5:14",
    topics: ["patience", "kindness"]
  },
  {
    text: "For ye have need of patience, that, after ye have done the will of God, ye might receive the promise.",
    reference: "Hebrews 10:36",
    topics: ["patience"]
  },
  {
    text: "The Lord is not slack concerning his promise, as some men count slackness; but is longsuffering to us-ward.",
    reference: "2 Peter 3:9",
    topics: ["patience"]
  },
  {
    text: "And not only so, but we glory in tribulations also: knowing that tribulation worketh patience.",
    reference: "Romans 5:3",
    topics: ["patience", "courage"]
  }
]

// Helper function to get verses by topic
export function getVersesByTopic(topicId: string): TopicalVerse[] {
  return topicalVerses.filter(verse => verse.topics.includes(topicId))
}

// Helper function to get a random verse from a specific topic
export function getRandomVerseFromTopic(topicId: string): TopicalVerse | null {
  const verses = getVersesByTopic(topicId)
  if (verses.length === 0) return null
  return verses[Math.floor(Math.random() * verses.length)]
}

// Helper function to get topic by ID
export function getTopicById(topicId: string): Topic | undefined {
  return topics.find(topic => topic.id === topicId)
}
