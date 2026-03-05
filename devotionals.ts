export interface Devotional {
  title: string
  verseRef: string
  verseText: string
  reflection: string
}

export function getTodaysDevotional(): Devotional {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const diff = now.getTime() - start.getTime()
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24))
  return devotionals[(dayOfYear - 1 + devotionals.length) % devotionals.length]
}

export const devotionals: Devotional[] = [
  // --- January: New Beginnings & Trust ---
  {
    title: "A Fresh Start",
    verseRef: "Lamentations 3:22-23",
    verseText: "It is of the LORD's mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.",
    reflection: "Every sunrise is God's personal reminder that His mercy is not exhausted. He does not carry yesterday's failures into your today. Begin this day receiving His compassion as the gift it truly is."
  },
  {
    title: "He Plans Good for You",
    verseRef: "Jeremiah 29:11",
    verseText: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.",
    reflection: "God's plans for you are not vague—they are deliberate, purposeful, and good. When the road ahead is unclear, rest in the fact that He who knows the end from the beginning holds every step of your journey."
  },
  {
    title: "Strength for Today",
    verseRef: "Isaiah 40:31",
    verseText: "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.",
    reflection: "Waiting on God is not passive—it is the active posture of trust. As you lean into His presence, He replaces your weary efforts with His limitless energy. Let His strength carry you where yours runs out."
  },
  {
    title: "Walking in the Light",
    verseRef: "Psalms 119:105",
    verseText: "Thy word is a lamp unto my feet, and a light unto my path.",
    reflection: "God's Word doesn't always illuminate the entire road—just enough for the next step. That is all you need. Trust the lamp He has given, and take the next step in confidence."
  },
  {
    title: "Cast Your Anxiety",
    verseRef: "1 Peter 5:7",
    verseText: "Casting all your care upon him; for he careth for you.",
    reflection: "Every worry you carry is an invitation to trust that God does not accept. He cares about the details of your life with a tenderness that surpasses any human love. Hand Him your burdens today—He is strong enough to carry them."
  },
  {
    title: "Be Still and Know",
    verseRef: "Psalms 46:10",
    verseText: "Be still, and know that I am God: I will be exalted among the heathen, I will be exalted in the earth.",
    reflection: "In a world of constant noise and motion, God calls you to stillness. It is in the quiet that we hear Him most clearly. Pause today, release your striving, and remember who He is."
  },
  {
    title: "Seek First",
    verseRef: "Matthew 6:33",
    verseText: "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.",
    reflection: "When we chase provision before we chase God, we find neither. But when we place His kingdom first, we discover that He is the provider of everything else we need. Reorder your priorities today."
  },
  {
    title: "His Faithfulness Endures",
    verseRef: "Psalms 100:5",
    verseText: "For the LORD is good; his mercy is everlasting; and his truth endureth to all generations.",
    reflection: "God's goodness is not seasonal—it is eternal. When circumstances feel uncertain, anchor yourself to what is unchanging: His mercy, His truth, His unwavering love for you."
  },
  {
    title: "Transformed by Renewal",
    verseRef: "Romans 12:2",
    verseText: "And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God.",
    reflection: "Growth begins in the mind. As Scripture reshapes how you think, it reshapes how you live. Invite God into your thought life today and watch transformation follow."
  },
  {
    title: "Perfected in Weakness",
    verseRef: "2 Corinthians 12:9",
    verseText: "And he said unto me, My grace is sufficient for thee: for my strength is made perfect in weakness.",
    reflection: "Your limitations are not obstacles to God's work—they are opportunities for His power to shine. When you reach the end of yourself, you arrive at the beginning of grace."
  },
  {
    title: "A Heart at Peace",
    verseRef: "Philippians 4:7",
    verseText: "And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.",
    reflection: "God's peace is not the absence of trouble—it is the presence of God in the middle of it. His peace defies logic, guards your heart, and holds your mind steady regardless of circumstances."
  },
  {
    title: "Delight in the Lord",
    verseRef: "Psalms 37:4",
    verseText: "Delight thyself also in the LORD; and he shall give thee the desires of thine heart.",
    reflection: "When God is your greatest delight, your desires begin to align with His will. He doesn't merely answer your prayers—He slowly shapes them into prayers that He is delighted to answer."
  },
  {
    title: "He Goes Before You",
    verseRef: "Deuteronomy 31:8",
    verseText: "And the LORD, he it is that doth go before thee; he will be with thee, he will not fail thee, neither forsake thee: fear not, neither be dismayed.",
    reflection: "You never arrive at a situation that God has not already prepared. He walks ahead, then turns to strengthen you as you cross the threshold. Face today knowing the path is already known to Him."
  },
  {
    title: "Abide and Bear Fruit",
    verseRef: "John 15:5",
    verseText: "I am the vine, ye are the branches: He that abideth in me, and I in him, the same bringeth forth much fruit: for without me ye can do nothing.",
    reflection: "Fruitfulness flows from connection, not effort. A branch does not strain to produce—it simply stays attached to the vine. Stay close to Christ today and trust the fruit will follow."
  },
  {
    title: "God is Our Refuge",
    verseRef: "Psalms 91:2",
    verseText: "I will say of the LORD, He is my refuge and my fortress: my God; in him will I trust.",
    reflection: "A refuge is only useful if you run to it. God's protection is available in every storm, but it requires an act of trust—a deliberate turning toward Him rather than away. He is your safe place."
  },
  {
    title: "Love One Another",
    verseRef: "John 13:34",
    verseText: "A new commandment I give unto you, That ye love one another; as I have loved you, that ye also love one another.",
    reflection: "Jesus doesn't just command love—He demonstrated it first. His love for us becomes both the reason and the standard for how we love others. Let His love flow through you today."
  },
  {
    title: "Ask and Receive",
    verseRef: "Matthew 7:7",
    verseText: "Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you.",
    reflection: "God invites persistent prayer—not because He is reluctant, but because communion is the point. He desires relationship with you more than He desires to simply dispense answers."
  },
  {
    title: "Forgiven and Free",
    verseRef: "1 John 1:9",
    verseText: "If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.",
    reflection: "Confession is not about earning forgiveness—it is about receiving what Christ already purchased. When you come with an honest heart, He meets you with complete cleansing. Nothing is held back."
  },
  {
    title: "The Lord is My Shepherd",
    verseRef: "Psalms 23:1",
    verseText: "The LORD is my shepherd; I shall not want.",
    reflection: "A shepherd provides, protects, and guides. If the Lord shepherds your life, what can truly be lacking? Let this simple declaration become your declaration against anxiety today."
  },
  {
    title: "Made New in Christ",
    verseRef: "2 Corinthians 5:17",
    verseText: "Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new.",
    reflection: "Your identity in Christ is not a renovation of the old self—it is a resurrection into the new. The person you were before Christ does not define the person you are becoming. Walk in your newness today."
  },
  {
    title: "He Hears Your Prayers",
    verseRef: "Jeremiah 33:3",
    verseText: "Call unto me, and I will answer thee, and shew thee great and mighty things, which thou knowest not.",
    reflection: "God does not just listen to prayers—He responds to them with revelation. When you call on Him, He answers with things beyond what you could imagine or plan on your own."
  },
  {
    title: "Trust with All Your Heart",
    verseRef: "Proverbs 3:5-6",
    verseText: "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.",
    reflection: "The invitation to trust God with all your heart leaves no room for a backup plan. It is a whole-hearted surrender that opens the door for His whole-hearted direction. Let Him lead."
  },
  {
    title: "Fearfully and Wonderfully Made",
    verseRef: "Psalms 139:14",
    verseText: "I will praise thee; for I am fearfully and wonderfully made: marvellous are thy works; and that my soul knoweth right well.",
    reflection: "God crafted every detail of you with intention, creativity, and care. Your value is not measured by the world's standards—it is declared by the One who made you. You are His marvelous work."
  },
  {
    title: "His Joy Is Your Strength",
    verseRef: "Nehemiah 8:10",
    verseText: "The joy of the LORD is your strength.",
    reflection: "Joy is not a reward for good circumstances—it is a resource for hard ones. When you find your delight in God Himself, you draw on a strength that circumstances cannot diminish."
  },
  {
    title: "Come to Me",
    verseRef: "Matthew 11:28",
    verseText: "Come unto me, all ye that labour and are heavy laden, and I will give you rest.",
    reflection: "Jesus does not tell the weary to try harder—He invites them to come closer. Whatever burden you have been carrying, bring it to Him now. His rest is not earned; it is received."
  },
  {
    title: "Nothing Can Separate You",
    verseRef: "Romans 8:38-39",
    verseText: "For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come, nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord.",
    reflection: "God's love for you is not fragile—it is indestructible. No failure, no distance, no darkness can cut you off from Him. You are held by a love that nothing in all creation can break."
  },
  {
    title: "Guard Your Heart",
    verseRef: "Proverbs 4:23",
    verseText: "Keep thy heart with all diligence; for out of it are the issues of life.",
    reflection: "What we allow into our hearts shapes the whole direction of our lives. Guarding your heart is not fearfulness—it is wisdom. Fill it with what is true, good, and of God."
  },
  {
    title: "He Restores My Soul",
    verseRef: "Psalms 23:3",
    verseText: "He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake.",
    reflection: "Restoration is God's specialty. He takes what is broken, weary, and depleted and brings it back to life. Offer Him your worn-out soul today and trust His gentle, thorough work."
  },
  {
    title: "Clothed in Strength",
    verseRef: "Proverbs 31:25",
    verseText: "Strength and honour are her clothing; and she shall rejoice in time to come.",
    reflection: "God desires to dress you in strength—not just outward ability, but inward dignity and honor. When you are rooted in Him, you can face the future with a smile rather than anxiety."
  },
  {
    title: "Greater is He",
    verseRef: "1 John 4:4",
    verseText: "Ye are of God, little children, and have overcome them: because greater is he that is in you, than he that is in the world.",
    reflection: "The power living inside you through the Holy Spirit is greater than any opposition you face. You are not fighting for victory—you are fighting from it. Remind yourself whose you are today."
  },
  {
    title: "Run with Endurance",
    verseRef: "Hebrews 12:1",
    verseText: "Wherefore seeing we also are compassed about with so great a cloud of witnesses, let us lay aside every weight, and the sin which doth so easily beset us, and let us run with patience the race that is set before us.",
    reflection: "You are not running alone. Generations of faithful men and women cheer you on, and Christ stands at the finish line. Drop what slows you down and keep running—the race is worth finishing."
  },
  // --- February: Love, Grace & Relationship with God ---
  {
    title: "Love Is Patient",
    verseRef: "1 Corinthians 13:4",
    verseText: "Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up.",
    reflection: "True love is not a feeling—it is a decision lived out through patience and kindness. As God has loved you with enduring patience, ask Him to grow that same love in you toward those around you."
  },
  {
    title: "God So Loved",
    verseRef: "John 3:16",
    verseText: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
    reflection: "The measure of God's love is not words—it is the cross. He gave what was most precious so that you could receive what you needed most. Never take lightly the love that drove Him there."
  },
  {
    title: "Loved Before You Loved Him",
    verseRef: "1 John 4:19",
    verseText: "We love him, because he first loved us.",
    reflection: "Your love for God is always a response, never an initiation. He reached out first, sacrificed first, chose first. Everything you offer back to Him flows from what He has already poured into you."
  },
  {
    title: "Rooted and Grounded in Love",
    verseRef: "Ephesians 3:17-18",
    verseText: "That Christ may dwell in your hearts by faith; that ye, being rooted and grounded in love, may be able to comprehend with all saints what is the breadth, and length, and depth, and height.",
    reflection: "The love of Christ is too vast for one sitting, one season, or one lifetime to fully grasp. Yet it is the foundation beneath all of life. Spend your days exploring its depths—there is always more."
  },
  {
    title: "His Unfailing Kindness",
    verseRef: "Psalms 136:1",
    verseText: "O give thanks unto the LORD; for he is good: for his mercy endureth for ever.",
    reflection: "Twenty-six times in Psalm 136, the refrain repeats: His mercy endures forever. The repetition is not accidental—God wants this truth so rooted in you that trouble cannot shake it loose."
  },
  {
    title: "Draw Near to God",
    verseRef: "James 4:8",
    verseText: "Draw nigh to God, and he will draw nigh to you.",
    reflection: "God does not stand at a distance waiting to be impressed. He leans toward every soul that turns toward Him. Take one step in His direction today—He will close the rest of the gap."
  },
  {
    title: "Nothing Too Hard",
    verseRef: "Jeremiah 32:17",
    verseText: "Ah Lord GOD! behold, thou hast made the heaven and the earth by thy great power and stretched out arm, and there is nothing too hard for thee.",
    reflection: "The God who shaped galaxies and parted seas is the same God you bring your problems to today. Nothing in your life is too complex, too broken, or too far gone for His power."
  },
  {
    title: "Satisfied in Him",
    verseRef: "Psalms 34:8",
    verseText: "O taste and see that the LORD is good: blessed is the man that trusteth in him.",
    reflection: "Faith begins with a taste. God invites you not to analyze Him from a distance but to experience Him up close. Those who really taste His goodness find that nothing else satisfies like He does."
  },
  {
    title: "You Are His Beloved",
    verseRef: "Song of Solomon 2:16",
    verseText: "My beloved is mine, and I am his.",
    reflection: "Before you carry any title, you carry this one: beloved of God. You belong to Him and He belongs to you—a bond not built on your merit but on His everlasting love."
  },
  {
    title: "Perfect Love Casts Out Fear",
    verseRef: "1 John 4:18",
    verseText: "There is no fear in love; but perfect love casteth out fear: because fear hath torment. He that feareth is not made perfect in love.",
    reflection: "Fear shrinks in the presence of love. As you grow in your understanding of how perfectly God loves you, anxiety loses its grip. Let His love be the atmosphere you breathe today."
  },
  {
    title: "Goodness and Mercy Follow Me",
    verseRef: "Psalms 23:6",
    verseText: "Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever.",
    reflection: "Goodness and mercy are not occasional visitors in the life of the believer—they are constant companions. Look back and you will see them in every chapter of your story."
  },
  {
    title: "Abounding in Love",
    verseRef: "1 Thessalonians 3:12",
    verseText: "And the Lord make you to increase and abound in love one toward another, and toward all men, even as we do toward you.",
    reflection: "Paul prayed for love that overflows—a love that is not rationed but abundant. Ask God today to expand your capacity to love so that it extends past your comfort zone to everyone around you."
  },
  {
    title: "Channels of His Grace",
    verseRef: "Ephesians 2:8",
    verseText: "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God.",
    reflection: "Salvation is a gift you cannot earn, cannot deserve, and cannot repay. It is the most extravagant grace ever given. Receive it again today with wonder, and let that wonder overflow into how you treat others."
  },
  {
    title: "He Delights in You",
    verseRef: "Zephaniah 3:17",
    verseText: "The LORD thy God in the midst of thee is mighty; he will save, he will rejoice over thee with joy; he will rest in his love, he will joy over thee with singing.",
    reflection: "God sings over you. Let that land. The Creator of the universe rejoices over His relationship with you—not grudgingly but with joy. You bring delight to your Father's heart."
  },
  {
    title: "Forgiving as We Are Forgiven",
    verseRef: "Colossians 3:13",
    verseText: "Forbearing one another, and forgiving one another, if any man have a quarrel against any: even as Christ forgave you, so also do ye.",
    reflection: "We forgive not because we feel like it, but because we have been forgiven more than we could ever repay. The grace shown to you on the cross is the measure of grace to extend to others."
  },
  {
    title: "He Chose You",
    verseRef: "Ephesians 1:4",
    verseText: "According as he hath chosen us in him before the foundation of the world, that we should be holy and without blame before him in love.",
    reflection: "Before the universe existed, God already had you in mind. You were chosen—not as an afterthought, but as the very purpose behind creation. Walk today as someone who has been specifically, intentionally chosen."
  },
  {
    title: "Love Your Neighbor",
    verseRef: "Matthew 22:39",
    verseText: "And the second is like unto it, Thou shalt love thy neighbour as thyself.",
    reflection: "The test of our love for God shows up in how we treat people. The person in front of you today—whether easy or difficult—is your neighbor and your opportunity to embody the love of Christ."
  },
  {
    title: "He Knows You Fully",
    verseRef: "Psalms 139:1-2",
    verseText: "O LORD, thou hast searched me, and known me. Thou knowest my downsitting and mine uprising, thou understandest my thought afar off.",
    reflection: "There is nothing about you that surprises God—not your worst thought, your deepest wound, or your secret fear. He knows you completely and loves you without condition. That is the most freeing truth there is."
  },
  {
    title: "Secure in His Hand",
    verseRef: "John 10:29",
    verseText: "My Father, which gave them me, is greater than all; and no man is able to pluck them out of my Father's hand.",
    reflection: "You are held by the hand of the almighty Father. No storm, no enemy, no failure can remove you from that grip. Your security does not rest on your hold of Him but on His hold of you."
  },
  {
    title: "Grace Upon Grace",
    verseRef: "John 1:16",
    verseText: "And of his fulness have all we received, and grace for grace.",
    reflection: "God's grace is not a finite resource that runs low. It is renewed continually—grace on top of grace, wave after wave. You cannot exhaust it. Return to it as often as you need."
  },
  {
    title: "Merciful and Gracious",
    verseRef: "Psalms 103:8",
    verseText: "The LORD is merciful and gracious, slow to anger, and plenteous in mercy.",
    reflection: "God is not quick to anger with you. He is patient, abounding in kindness, and slow to write you off. Approach Him today not with dread but with the confidence that He receives you with open arms."
  },
  {
    title: "United in Love",
    verseRef: "Romans 5:5",
    verseText: "And hope maketh not ashamed; because the love of God is shed abroad in our hearts by the Holy Ghost which is given unto us.",
    reflection: "The love you feel for God is not manufactured by willpower—it is poured into you by His own Spirit. Ask the Holy Spirit to fill you afresh today so that His love might overflow from your life to others."
  },
  {
    title: "Steadfast Love",
    verseRef: "Psalms 103:17",
    verseText: "But the mercy of the LORD is from everlasting to everlasting upon them that fear him, and his righteousness unto children's children.",
    reflection: "God's love reaches back before your birth and stretches forward past your last breath. It is not conditional on your performance—it is anchored in His very nature. Rest in love that never ends."
  },
  {
    title: "He Is Gentle",
    verseRef: "Matthew 11:29",
    verseText: "Take my yoke upon you, and learn of me; for I am meek and lowly in heart: and ye shall find rest unto your souls.",
    reflection: "Jesus does not drive you—He walks beside you. His yoke is designed to share the weight and to teach you His pace. Come under His gentle leadership and find the rest your soul has been longing for."
  },
  {
    title: "Blameless Before Him",
    verseRef: "Jude 1:24",
    verseText: "Now unto him that is able to keep you from falling, and to present you faultless before the presence of his glory with exceeding joy.",
    reflection: "You will not stand before God one day ashamed—you will stand there faultless, presented with joy by the One who purchased your purity. That is not your achievement; it is His grace. Live in light of it."
  },
  {
    title: "Do Everything in Love",
    verseRef: "1 Corinthians 16:14",
    verseText: "Let all your things be done with charity.",
    reflection: "Love is not just a topic for devotion—it is meant to flavour every action. Every word, errand, meeting, and meal can be done with love. Let that be today's simple, transformative practice."
  },
  {
    title: "Tender Mercies",
    verseRef: "Psalms 145:9",
    verseText: "The LORD is good to all: and his tender mercies are over all his works.",
    reflection: "God's goodness is not reserved for the especially devout—it extends over all He has made. Open your eyes today to see the small ways His mercy has quietly shown up in your ordinary life."
  },
  {
    title: "Clothed with Compassion",
    verseRef: "Colossians 3:12",
    verseText: "Put on therefore, as the elect of God, holy and beloved, bowels of mercies, kindness, humbleness of mind, meekness, longsuffering.",
    reflection: "Character is something you put on—a choice made each morning. Who will you choose to be today? Let compassion, kindness, and humility be the clothes you dress yourself in before you face the world."
  },
  // --- March: Prayer & Seeking God ---
  {
    title: "Pray Without Ceasing",
    verseRef: "1 Thessalonians 5:17",
    verseText: "Pray without ceasing.",
    reflection: "Unceasing prayer is not hours on your knees—it is an ongoing conversation with God throughout the day. Every thought turned toward Him, every whispered 'help me,' every moment of gratitude—these are prayers."
  },
  {
    title: "When Two Agree",
    verseRef: "Matthew 18:20",
    verseText: "For where two or three are gathered together in my name, there am I in the midst of them.",
    reflection: "Jesus promises His presence wherever believers gather in His name. Do not neglect the power of praying together. There is something unique that happens when believers agree and invite God into their midst."
  },
  {
    title: "Your Father Already Knows",
    verseRef: "Matthew 6:8",
    verseText: "Be not ye therefore like unto them: for your Father knoweth what things ye have need of, before ye ask him.",
    reflection: "You do not pray to inform God—you pray to commune with Him. He already knows your need. Prayer is the act of bringing yourself into alignment with the One who provides, not alerting Him to something He missed."
  },
  {
    title: "Search Me, O God",
    verseRef: "Psalms 139:23-24",
    verseText: "Search me, O God, and know my heart: try me, and know my thoughts: And see if there be any wicked way in me, and lead me in the way everlasting.",
    reflection: "Inviting God to search your heart is one of the bravest prayers you can pray. It is an act of humility that says, 'I want to be known more than I want to be comfortable.' God honors that kind of openness."
  },
  {
    title: "The Spirit Intercedes",
    verseRef: "Romans 8:26",
    verseText: "Likewise the Spirit also helpeth our infirmities: for we know not what we should pray for as we ought: but the Spirit itself maketh intercession for us with groanings which cannot be uttered.",
    reflection: "On the days when you do not know how to pray, you are not alone—the Holy Spirit is praying for you. Even when your words fail, intercession continues. The conversation with God never stops on His end."
  },
  {
    title: "Seek and You Will Find",
    verseRef: "Matthew 7:7-8",
    verseText: "Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you: For every one that asketh receiveth; and he that seeketh findeth.",
    reflection: "God responds to those who seek. The seeking is not groveling—it is the confidence of a child who knows their Father will answer. Come with expectation. He has promised to respond to every knock."
  },
  {
    title: "With Thanksgiving",
    verseRef: "Philippians 4:6",
    verseText: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.",
    reflection: "Gratitude and petition belong together. When you bring your requests wrapped in thanksgiving, you remind yourself of all God has already done—and faith rises to trust Him with what you are still waiting for."
  },
  {
    title: "The Lord's Prayer",
    verseRef: "Matthew 6:9-10",
    verseText: "After this manner therefore pray ye: Our Father which art in heaven, Hallowed be thy name. Thy kingdom come. Thy will be done in earth, as it is in heaven.",
    reflection: "Jesus began prayer by directing attention to the Father, not to the request. Reverence before petition—acknowledging who He is before asking what you need. Let this order shape your prayer life today."
  },
  {
    title: "Ask in His Name",
    verseRef: "John 14:13",
    verseText: "And whatsoever ye shall ask in my name, that will I do, that the Father may be glorified in the Son.",
    reflection: "Praying in Jesus' name is not a magic formula—it means praying in alignment with His character and will. It is asking for what He would ask for, for the same reasons He would ask for them."
  },
  {
    title: "Waiting in Hope",
    verseRef: "Psalms 27:14",
    verseText: "Wait on the LORD: be of good courage, and he shall strengthen thine heart: wait, I say, on the LORD.",
    reflection: "Waiting on God is one of the hardest disciplines and one of the most rewarding. Courage is required—not because waiting is easy, but because the One you wait for is trustworthy. He comes through for those who wait."
  },
  {
    title: "Earnest Prayer",
    verseRef: "James 5:16",
    verseText: "The effectual fervent prayer of a righteous man availeth much.",
    reflection: "Earnest prayer—not polished, not perfect, but heartfelt and persistent—moves mountains. God is not drawn to eloquence; He is drawn to sincerity. Come as you are and pray with your whole heart."
  },
  // --- April: Resurrection & New Life ---
  {
    title: "The Resurrection Promise",
    verseRef: "Revelation 1:18",
    verseText: "I am he that liveth, and was dead; and, behold, I am alive for evermore, Amen; and have the keys of hell and death.",
    reflection: "Christ conquered death and holds the keys. This is not mythology—it is the axis around which all of history turns. Because He lives, the grave has no final say over your life either."
  },
  {
    title: "Buried and Raised",
    verseRef: "Romans 6:4",
    verseText: "Therefore we are buried with him by baptism into death: that like as Christ was raised up from the dead by the glory of the Father, even so we also should walk in newness of life.",
    reflection: "Your spiritual life mirrors the resurrection story. What was buried in Christ is raised into new life. You no longer have to walk in the old patterns—you have been raised into something entirely new."
  },
  {
    title: "Death Has No Sting",
    verseRef: "1 Corinthians 15:55",
    verseText: "O death, where is thy sting? O grave, where is thy victory?",
    reflection: "Paul speaks to death with defiance, not fear. Because of the resurrection, death has been disarmed—it is still a doorway, but it opens to life, not darkness. Christ has gone through it first and left the light on."
  },
  {
    title: "He Is Risen",
    verseRef: "Matthew 28:6",
    verseText: "He is not here: for he is risen, as he said. Come, see the place where the Lord lay.",
    reflection: "The empty tomb is not just a historical fact—it is a present-tense reality. Jesus is alive right now, interceding for you, dwelling within you, and preparing a place for you. He said He would rise—and He did."
  },
  {
    title: "Life Through His Name",
    verseRef: "John 20:31",
    verseText: "But these are written, that ye might believe that Jesus is the Christ, the Son of God; and that believing ye might have life through his name.",
    reflection: "The whole sweep of Scripture exists to bring you to faith in Jesus. Not just intellectual agreement, but life-giving belief. Have you received the life He came to give? It is offered again today."
  },
  {
    title: "From Death to Life",
    verseRef: "John 5:24",
    verseText: "Verily, verily, I say unto you, He that heareth my word, and believeth on him that sent me, hath everlasting life, and shall not come into condemnation; but is passed from death unto life.",
    reflection: "The transition from death to life happens the moment you believe. It is past tense—already accomplished. You are not waiting to see if you will make it; you have already passed through the gate."
  },
  {
    title: "The Lord Lives",
    verseRef: "Psalms 18:46",
    verseText: "The LORD liveth; and blessed be my rock; and let the God of my salvation be exalted.",
    reflection: "The God you serve is not a relic of history—He is alive and active today. He is your rock in shifting ground, your salvation in every season. Let this living God be exalted in your life today."
  },
  {
    title: "More Than Conquerors",
    verseRef: "Romans 8:37",
    verseText: "Nay, in all these things we are more than conquerors through him that loved us.",
    reflection: "You are not just surviving—you are conquering, and more than that. The victory is not earned through grit; it is received through love. In every difficult thing you face, His love makes you the overcomer."
  },
  {
    title: "Because He Lives",
    verseRef: "John 14:19",
    verseText: "Yet a little while, and the world seeth me no more; but ye see me: because I live, ye shall live also.",
    reflection: "Your life is tied to His. Because Christ is alive, your spiritual life is secured. Death could not hold Him—and it cannot hold the life He breathed into you. Live today from that certainty."
  },
  {
    title: "Alive to God",
    verseRef: "Romans 6:11",
    verseText: "Likewise reckon ye also yourselves to be dead indeed unto sin, but alive unto God through Jesus Christ our Lord.",
    reflection: "Consider yourself dead to sin—it has no authority over the resurrected life within you. And consider yourself alive to God—fully awake, responsive, and connected to the very source of life. Walk in that today."
  },
  // --- May: Joy & Gratitude ---
  {
    title: "Shout for Joy",
    verseRef: "Psalms 98:4",
    verseText: "Make a joyful noise unto the LORD, all the earth: make a loud noise, and rejoice, and sing praise.",
    reflection: "Joy in the Lord is not always quiet or dignified. Sometimes it bursts out—a shout, a song, a noise that doesn't entirely make sense to a watching world. Let it out. He is worthy of your unrestrained praise."
  },
  {
    title: "Count It All Joy",
    verseRef: "James 1:2-3",
    verseText: "My brethren, count it all joy when ye fall into divers temptations; Knowing this, that the trying of your faith worketh patience.",
    reflection: "James doesn't say feel joy—he says count it as joy. It is a decision of perspective, to see what trials are producing rather than just what they are costing. God is working even in the hard places."
  },
  {
    title: "Fullness of Joy",
    verseRef: "Psalms 16:11",
    verseText: "Thou wilt shew me the path of life: in thy presence is fulness of joy; at thy right hand there are pleasures for evermore.",
    reflection: "Full joy is not found in achievement or comfort—it is found in His presence. Everything else offers moments of happiness; God offers fullness. Come into His presence today and let joy fill the empty spaces."
  },
  {
    title: "Rejoice Always",
    verseRef: "Philippians 4:4",
    verseText: "Rejoice in the Lord alway: and again I say, Rejoice.",
    reflection: "Paul wrote 'rejoice always' from a prison cell. Joy rooted in God is not dependent on circumstances—it is the overflow of a soul anchored to something more stable than situations. Rejoice today, whatever the situation."
  },
  {
    title: "Enter with Thanksgiving",
    verseRef: "Psalms 100:4",
    verseText: "Enter into his gates with thanksgiving, and into his courts with praise: be thankful unto him, and bless his name.",
    reflection: "Thanksgiving is the key that opens your heart to encounter God. When you approach Him with gratitude, you arrive already aware of His goodness—and that awareness makes everything more alive."
  },
  {
    title: "Gratitude in All Things",
    verseRef: "1 Thessalonians 5:18",
    verseText: "In every thing give thanks: for this is the will of God in Christ Jesus concerning you.",
    reflection: "Gratitude in everything does not mean pretending everything is good. It means recognizing that God is working in everything—and that is always something to be thankful for."
  },
  {
    title: "Joy Set Before Him",
    verseRef: "Hebrews 12:2",
    verseText: "Looking unto Jesus the author and finisher of our faith; who for the joy that was set before him endured the cross, despising the shame, and is set down at the right hand of the throne of God.",
    reflection: "Jesus endured the cross because He could see the joy beyond it. Follow His example—look beyond the present difficulty to the future glory, and let that vision give you strength to endure today."
  },
  {
    title: "A Joyful Heart",
    verseRef: "Proverbs 17:22",
    verseText: "A merry heart doeth good like a medicine: but a broken spirit drieth the bones.",
    reflection: "Joy has practical effects on your whole person—spiritually, emotionally, even physically. Protect your joy. Refuse bitterness and offense. Choose the lightness that comes from dwelling on what is good and true."
  },
  {
    title: "Everlasting Joy",
    verseRef: "Isaiah 61:7",
    verseText: "For your shame ye shall have double; and for confusion they shall rejoice in their portion: therefore in their land they shall possess the double: everlasting joy shall be unto them.",
    reflection: "God promises to replace shame with double honor and confusion with everlasting joy. His redemption is not just adequate—it is abundant. Nothing you have lost to sin is beyond His ability to restore and exceed."
  },
  {
    title: "I Will Praise You",
    verseRef: "Psalms 63:3",
    verseText: "Because thy lovingkindness is better than life, my lips shall praise thee.",
    reflection: "God's loving-kindness is better than life itself. When you truly grasp that, praise becomes the natural response—not a duty but an overflow. Let your lips carry that declaration today."
  },
  // --- June: Strength & Perseverance ---
  {
    title: "I Can Do All Things",
    verseRef: "Philippians 4:13",
    verseText: "I can do all things through Christ which strengtheneth me.",
    reflection: "This is not a promise of unlimited personal achievement—it is a declaration of Christ-supplied sufficiency. In every situation, whether plenty or lack, Christ's strength is enough for what He has called you to do."
  },
  {
    title: "He Gives Power to the Faint",
    verseRef: "Isaiah 40:29",
    verseText: "He giveth power to the faint; and to them that have no might he increaseth strength.",
    reflection: "God's strength is most available when yours is most depleted. He doesn't strengthen the strong—He empowers the faint. If you are running on empty today, you are perfectly positioned for His power to show up."
  },
  {
    title: "Patient in Tribulation",
    verseRef: "Romans 5:3-4",
    verseText: "And not only so, but we glory in tribulations also: knowing that tribulation worketh patience; And patience, experience; and experience, hope.",
    reflection: "Trials have a production line: tribulation → patience → experience → hope. Nothing in this chain is wasted. The hardship you are walking through right now is producing something in you that cannot come any other way."
  },
  {
    title: "Endure to the End",
    verseRef: "Matthew 24:13",
    verseText: "But he that shall endure unto the end, the same shall be saved.",
    reflection: "The Christian life is a marathon, not a sprint. What God desires is not a flashy start but a faithful finish. Each day of perseverance is a declaration that what holds you is greater than what is pushing against you."
  },
  {
    title: "The Lord Is My Strength",
    verseRef: "Exodus 15:2",
    verseText: "The LORD is my strength and song, and he is become my salvation: he is my God, and I will prepare him an habitation; my father's God, and I will exalt him.",
    reflection: "Notice that God is both strength and song—He supplies what we need and is worthy of our celebration. The one who helps you through the battle is also the one you celebrate when the battle is won."
  },
  {
    title: "Be Strong in the Lord",
    verseRef: "Ephesians 6:10",
    verseText: "Finally, my brethren, be strong in the Lord, and in the power of his might.",
    reflection: "You are not told to be strong in your own resolve—you are told to be strong in the Lord. The strength available to you is His, not yours. Access it through prayer, Scripture, and dependence on His Spirit."
  },
  {
    title: "He Trains My Hands",
    verseRef: "Psalms 18:34",
    verseText: "He teacheth my hands to war, so that a bow of steel is broken by mine arms.",
    reflection: "God is your trainer. The challenges you face are not random—He uses them to develop in you skills and strength you did not have before. Trust His methods. He knows exactly what you need to become."
  },
  {
    title: "Stand Firm",
    verseRef: "1 Corinthians 16:13",
    verseText: "Watch ye, stand fast in the faith, quit you like men, be strong.",
    reflection: "Alertness, steadfastness, courage, strength—four commands in one verse. The Christian life is not passive. Be awake, be rooted, be courageous, and draw on the strength that God supplies."
  },
  {
    title: "Press Toward the Goal",
    verseRef: "Philippians 3:14",
    verseText: "I press toward the mark for the prize of the high calling of God in Christ Jesus.",
    reflection: "Paul had a spiritual posture of forward motion—not resting on past victories, not dwelling on past failures, but pressing on. Keep your eyes on where you are going, not where you have been."
  },
  {
    title: "He Will Not Let You Fall",
    verseRef: "Psalms 121:3",
    verseText: "He will not suffer thy foot to be moved: he that keepeth thee will not slumber.",
    reflection: "Your protector does not sleep. While you rest, He watches. While you worry, He works. You are under constant, attentive care. Nothing catches Him off guard—and that means nothing slips past His watchful eye."
  },
  // --- July: Freedom & Rest ---
  {
    title: "Free Indeed",
    verseRef: "John 8:36",
    verseText: "If the Son therefore shall make you free, ye shall be free indeed.",
    reflection: "The freedom Jesus gives is not partial or temporary—it is complete and enduring. Whatever has held you captive—guilt, fear, addiction, shame—Christ's power is greater. Walk in the fullness of the freedom He purchased."
  },
  {
    title: "Where the Spirit Is",
    verseRef: "2 Corinthians 3:17",
    verseText: "Now the Lord is that Spirit: and where the Spirit of the Lord is, there is liberty.",
    reflection: "The presence of the Holy Spirit and the experience of freedom go together. The more you open your life to the Spirit, the more the constrictions of the old life loosen. Invite Him in fully today."
  },
  {
    title: "Sabbath Rest",
    verseRef: "Matthew 11:28",
    verseText: "Come unto me, all ye that labour and are heavy laden, and I will give you rest.",
    reflection: "Rest is not laziness—it is the rhythm God built into creation. When you pause and come to Jesus fully, you receive something you cannot manufacture on your own. Accept His invitation to rest today."
  },
  {
    title: "My Yoke Is Easy",
    verseRef: "Matthew 11:30",
    verseText: "For my yoke is easy, and my burden is light.",
    reflection: "Whatever is weighing you down right now is probably not Jesus' yoke—it may be expectations, striving, or burdens you picked up without His instruction. His burden is light. Ask Him what He is actually asking of you."
  },
  {
    title: "Peace Like a River",
    verseRef: "Isaiah 66:12",
    verseText: "For thus saith the LORD, Behold, I will extend peace to her like a river, and the glory of the Gentiles like a flowing stream.",
    reflection: "God's peace flows like a river—constant, sufficient, and powerful. It does not trickle or run dry. Open the channels of your heart to receive this peace, and let it carry you through whatever rapids lie ahead."
  },
  {
    title: "Not a Spirit of Fear",
    verseRef: "2 Timothy 1:7",
    verseText: "For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.",
    reflection: "Fear is not from God. If you are gripped by fear, you can reject it with authority—it is not your portion. God has given you power for action, love for connection, and a sound mind for clear thinking."
  },
  {
    title: "Set Free from the Law",
    verseRef: "Galatians 5:1",
    verseText: "Stand fast therefore in the liberty wherewith Christ hath made us free, and be not entangled again with the yoke of bondage.",
    reflection: "Freedom in Christ is worth protecting. The pull back toward performance, rule-keeping, and earning love is real—but Christ has freed you from that exhausting cycle. Stand firmly in the grace that sets you free."
  },
  {
    title: "Rest for Your Soul",
    verseRef: "Matthew 11:29",
    verseText: "Take my yoke upon you, and learn of me; for I am meek and lowly in heart: and ye shall find rest unto your souls.",
    reflection: "The soul-rest Jesus offers is different from the rest sleep brings—it is a deep settling of the inner life. Learning His gentleness and humility quiets the frantic pace and brings a peace that penetrates every layer."
  },
  {
    title: "He Makes Me to Lie Down",
    verseRef: "Psalms 23:2",
    verseText: "He maketh me to lie down in green pastures: he leadeth me beside the still waters.",
    reflection: "Sometimes God makes you slow down because stillness is what you most need. The green pastures and still waters are not a reward for productivity—they are a gift of care from a shepherd who knows His flock."
  },
  {
    title: "I Will Give You Rest",
    verseRef: "Exodus 33:14",
    verseText: "And he said, My presence shall go with thee, and I will give thee rest.",
    reflection: "God's gift of rest is tied directly to His presence. Where He is, there is peace. Wherever you go today, you carry that peace with you—because wherever you go, He goes. Let His presence be your rest."
  },
  // --- August: Wisdom & Understanding ---
  {
    title: "Ask for Wisdom",
    verseRef: "James 1:5",
    verseText: "If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him.",
    reflection: "God is not stingy with wisdom—He gives it generously and without making you feel foolish for asking. Whatever decision or situation has you confused today, bring it to Him. He will not withhold the light you need."
  },
  {
    title: "Wisdom's Beginning",
    verseRef: "Proverbs 9:10",
    verseText: "The fear of the LORD is the beginning of wisdom: and the knowledge of the holy is understanding.",
    reflection: "True wisdom starts with a right view of God—not terror, but reverent awe. When you see Him rightly, you begin to see everything else rightly too. Worship is the foundation of a clear-sighted life."
  },
  {
    title: "Treasure His Commandments",
    verseRef: "Proverbs 2:1-2",
    verseText: "My son, if thou wilt receive my words, and hide my commandments with thee; So that thou incline thine ear unto wisdom, and apply thine heart to understanding.",
    reflection: "Wisdom doesn't just fall on you—it is received. It requires inclining your ear, applying your heart, and hiding God's words in you like treasure. Invest in knowing God's Word and wisdom will follow."
  },
  {
    title: "He Gives Understanding",
    verseRef: "Daniel 2:22",
    verseText: "He revealeth the deep and secret things: he knoweth what is in the darkness, and the light dwelleth with him.",
    reflection: "When you are standing in the dark—confused, uncertain, without answers—the light is still with God. He sees everything clearly. Bring your questions to the One who holds all understanding, and trust Him to reveal what you need when you need it."
  },
  {
    title: "Heart of Wisdom",
    verseRef: "Psalms 90:12",
    verseText: "So teach us to number our days, that we may apply our hearts unto wisdom.",
    reflection: "A wise person understands that time is finite and therefore precious. Numbering your days is not about morbidity—it is about intentionality. Live today as if it matters, because it does."
  },
  {
    title: "Do Not Lean on Your Own Understanding",
    verseRef: "Proverbs 3:7",
    verseText: "Be not wise in thine own eyes: fear the LORD, and depart from evil.",
    reflection: "Our own understanding is limited by our perspective, our assumptions, and our biases. Humility means acknowledging that God sees what we don't. His wisdom is always the better guide."
  },
  {
    title: "A Mind at Peace",
    verseRef: "Isaiah 26:3",
    verseText: "Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee.",
    reflection: "The secret to sustained peace is a sustained focus. When your mind stays fixed on God rather than circling your problems, peace guards your inner world. Train your thoughts today to return to Him."
  },
  {
    title: "Hidden Wisdom",
    verseRef: "1 Corinthians 2:7",
    verseText: "But we speak the wisdom of God in a mystery, even the hidden wisdom, which God ordained before the world unto our glory.",
    reflection: "God's wisdom operates on a plane that human intelligence cannot reach on its own. The wisdom He offers through His Spirit reveals things that logic alone would never find. Seek His wisdom above the world's cleverness."
  },
  {
    title: "The Way of Understanding",
    verseRef: "Proverbs 4:7",
    verseText: "Wisdom is the principal thing; therefore get wisdom: and with all thy getting get understanding.",
    reflection: "Above everything else you might pursue in life, Solomon says to pursue wisdom. It is the foundation that makes all other pursuits valuable. Ask for it, seek it in Scripture, and apply it daily."
  },
  {
    title: "Treasure Hidden in Christ",
    verseRef: "Colossians 2:3",
    verseText: "In whom are hid all the treasures of wisdom and knowledge.",
    reflection: "All wisdom—every insight, every truth, every solution to every question—is hidden in Christ. Knowing Him is not just spiritually valuable; it is the key to understanding everything else. Pursue His person and wisdom follows."
  },
  // --- September: Faithfulness & Harvest ---
  {
    title: "Sow Abundantly",
    verseRef: "2 Corinthians 9:6",
    verseText: "But this I say, He which soweth sparingly shall reap also sparingly; and he which soweth bountifully shall reap also bountifully.",
    reflection: "Generous living is not a risk—it is a seed. Every act of generosity, every investment in what matters to God, returns a harvest far greater than the seed. Do not hold back when God prompts you to give."
  },
  {
    title: "Faithful with Little",
    verseRef: "Luke 16:10",
    verseText: "He that is faithful in that which is least is faithful also in much: and he that is unjust in the least is unjust also in much.",
    reflection: "Fidelity in small things is the training ground for greater trust. How you handle what seems insignificant today reveals the character you will carry into seasons of greater responsibility. Be faithful in this."
  },
  {
    title: "Do Not Grow Weary",
    verseRef: "Galatians 6:9",
    verseText: "And let us not be weary in well doing: for in due season we shall reap, if we faint not.",
    reflection: "The harvest follows the faithful, persistent farmer—not the one who gives up between planting and reaping. Your season is coming. Do not let fatigue cause you to abandon the field just before the harvest arrives."
  },
  {
    title: "Bearing Much Fruit",
    verseRef: "John 15:8",
    verseText: "Herein is my Father glorified, that ye bear much fruit; so shall ye be my disciples.",
    reflection: "Fruitfulness glorifies God. It is not just about personal blessing—it is a testimony to the world that the vine is alive and nourishing. Stay connected to Christ and trust Him to produce a great harvest through your life."
  },
  {
    title: "Whatever You Do",
    verseRef: "Colossians 3:23",
    verseText: "And whatsoever ye do, do it heartily, as to the Lord, and not unto men.",
    reflection: "There is no work too ordinary to do for God. When you frame your daily responsibilities as service to Him rather than performance for others, everything you do takes on dignity and purpose. Work with your whole heart today."
  },
  {
    title: "Well Done, Good Servant",
    verseRef: "Matthew 25:21",
    verseText: "His lord said unto him, Well done, thou good and faithful servant: thou hast been faithful over a few things, I will make thee ruler over many things: enter thou into the joy of thy lord.",
    reflection: "The reward for faithfulness is more trust—and ultimately, joy. Let every task you complete today, no matter how small, be done with the aim of hearing those words: Well done. Faithful. Enter in."
  },
  {
    title: "Steadfast and Immovable",
    verseRef: "1 Corinthians 15:58",
    verseText: "Therefore, my beloved brethren, be ye stedfast, unmoveable, always abounding in the work of the Lord, forasmuch as ye know that your labour is not in vain in the Lord.",
    reflection: "Your work for God is never wasted, even when you cannot see the results. Steadfastness is the posture of someone who believes the harvest is coming—even when the field still looks bare."
  },
  {
    title: "His Mercies Renewed",
    verseRef: "Lamentations 3:23",
    verseText: "They are new every morning: great is thy faithfulness.",
    reflection: "God's faithfulness is not occasional—it is as regular as the sunrise. Every morning is a fresh chapter, a new portion of His mercy waiting for you. Great is His faithfulness to you, today and every day."
  },
  {
    title: "The Lord Reigns",
    verseRef: "Psalms 97:1",
    verseText: "The LORD reigneth; let the earth rejoice; let the multitude of isles be glad thereof.",
    reflection: "In the midst of all the uncertainty in the world, this truth holds: the Lord reigns. He is on the throne, nothing is out of control, and everything is subject to His sovereign hand. That is cause for joy."
  },
  {
    title: "Overflow of Good Things",
    verseRef: "Luke 6:38",
    verseText: "Give, and it shall be given unto you; good measure, pressed down, and shaken together, and running over, shall men give into your bosom.",
    reflection: "The generosity you extend comes back to you overflowing. God's economy is not scarcity—it is abundance. Those who give freely discover that God consistently refills what they pour out, and then some."
  },
  // --- October: Endurance & Trust ---
  {
    title: "This Is the Day",
    verseRef: "Psalms 118:24",
    verseText: "This is the day which the LORD hath made; we will rejoice and be glad in it.",
    reflection: "Today—with all its challenges and all its gifts—was made by God. He did not accidentally assemble this day. He crafted it for you and placed you in it on purpose. Choose to rejoice in what He has given."
  },
  {
    title: "Though He Slay Me",
    verseRef: "Job 13:15",
    verseText: "Though he slay me, yet will I trust in him.",
    reflection: "Job's faith was not built on favorable circumstances—it was built on the character of God. When everything was stripped away, his trust remained. This is the kind of faith that nothing can break."
  },
  {
    title: "Tried and Found Faithful",
    verseRef: "Job 23:10",
    verseText: "But he knoweth the way that I take: when he hath tried me, I shall come forth as gold.",
    reflection: "The refining process is not pleasant, but the outcome is pure gold—a character and faith that is stronger, cleaner, and more valuable because of what it went through. Trust the process. He knows the way you take."
  },
  {
    title: "Rock of Ages",
    verseRef: "Isaiah 26:4",
    verseText: "Trust ye in the LORD for ever: for in the LORD JEHOVAH is everlasting strength.",
    reflection: "The LORD is not a temporary refuge or a seasonal strength—He is everlasting. Every other source of security you have will eventually shift. But God remains when everything else has changed. Place your trust there."
  },
  {
    title: "He Will Sustain You",
    verseRef: "Psalms 55:22",
    verseText: "Cast thy burden upon the LORD, and he shall sustain thee: he shall never suffer the righteous to be moved.",
    reflection: "You were not designed to carry your own burdens indefinitely. Cast them on the Lord—not once, but as often as they pile back up. He will sustain you, and He will hold you steady regardless of what presses against you."
  },
  {
    title: "Do Not Be Troubled",
    verseRef: "John 14:1",
    verseText: "Let not your heart be troubled: ye believe in God, believe also in me.",
    reflection: "Jesus speaks directly to the troubled heart. He does not minimize the trouble—He offers Himself as the answer to it. Belief in Him is the antidote to a heart that has been shaken. Keep believing."
  },
  {
    title: "Courage in the Storm",
    verseRef: "Isaiah 41:10",
    verseText: "Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.",
    reflection: "In one breath, God makes five promises: His presence, His identity, His strength, His help, and His upholding hand. When fear comes, return to this verse and count what He has promised. You are not alone."
  },
  {
    title: "The God of All Comfort",
    verseRef: "2 Corinthians 1:3-4",
    verseText: "Blessed be God, even the Father of our Lord Jesus Christ, the Father of mercies, and the God of all comfort; Who comforteth us in all our tribulation.",
    reflection: "God is not unfamiliar with your suffering—He is the God who comforts in every tribulation. More than that, He comforts you so that you can comfort others with the same comfort you have received. Pain becomes purpose."
  },
  {
    title: "He Will See You Through",
    verseRef: "Psalms 138:8",
    verseText: "The LORD will perfect that which concerneth me: thy mercy, O LORD, endureth for ever: forsake not the works of thine own hands.",
    reflection: "God finishes what He starts. Whatever He has begun in your life—your faith, your growth, your calling—He will see it through to completion. You are His work, and He does not abandon unfinished masterpieces."
  },
  {
    title: "Anchor of the Soul",
    verseRef: "Hebrews 6:19",
    verseText: "Which hope we have as an anchor of the soul, both sure and stedfast, and which entereth into that within the veil.",
    reflection: "Hope in God is not wishful thinking—it is an anchor. Anchors don't stop the storm; they hold you steady through it. Let your hope in Christ hold you today, even when the waves rise around you."
  },
  // --- November: Thanksgiving & Contentment ---
  {
    title: "I Have Learned Contentment",
    verseRef: "Philippians 4:11",
    verseText: "Not that I speak in respect of want: for I have learned, in whatsoever state I am, therewith to be content.",
    reflection: "Contentment is learned—it does not come naturally. Paul discovered through experience, not theory, how to be at rest in any situation. Ask God to teach you this same quiet, powerful peace regardless of your circumstances."
  },
  {
    title: "Godliness with Contentment",
    verseRef: "1 Timothy 6:6",
    verseText: "But godliness with contentment is great gain.",
    reflection: "The world chases gain through achievement and accumulation. But the true great gain is a soul at peace with God and satisfied in Him. This is a wealth that nothing can take from you."
  },
  {
    title: "Overflowing Thanksgiving",
    verseRef: "Colossians 2:7",
    verseText: "Rooted and built up in him, and stablished in the faith, as ye have been taught, abounding therein with thanksgiving.",
    reflection: "Thanksgiving is the mark of a rooted life. When you are established in Christ, gratitude becomes the natural overflow—not just in good times but as a settled orientation of the heart toward God's goodness."
  },
  {
    title: "Give Thanks to the Lord",
    verseRef: "Psalms 107:1",
    verseText: "O give thanks unto the LORD, for he is good: for his mercy endureth for ever.",
    reflection: "Two reasons for thanksgiving that never go out of date: He is good, and His mercy endures. These are realities independent of your current situation. Begin every day with these truths and let gratitude follow."
  },
  {
    title: "Bless the Lord at All Times",
    verseRef: "Psalms 34:1",
    verseText: "I will bless the LORD at all times: his praise shall continually be in my mouth.",
    reflection: "At all times—not just the good ones. David made this declaration from a desperate place, which makes it all the more powerful. Praise at all times is the act of a soul that has found something stronger than its circumstances."
  },
  {
    title: "He Has Given Us All Things",
    verseRef: "2 Peter 1:3",
    verseText: "According as his divine power hath given unto us all things that pertain unto life and godliness, through the knowledge of him that hath called us to glory and virtue.",
    reflection: "You have already been given everything you need for life and godliness. You are not waiting for more resources—you are learning to access what has already been supplied in Christ. Today, give thanks for what you already have."
  },
  {
    title: "Every Good Gift",
    verseRef: "James 1:17",
    verseText: "Every good gift and every perfect gift is from above, and cometh down from the Father of lights, with whom is no variableness, neither shadow of turning.",
    reflection: "Look around your life and trace every good thing back to its source. Every gift, every relationship, every capacity you have came from the Father of lights. Let that awareness turn your whole day into a prayer of gratitude."
  },
  {
    title: "He Satisfies the Longing Soul",
    verseRef: "Psalms 107:9",
    verseText: "For he satisfieth the longing soul, and filleth the hungry soul with goodness.",
    reflection: "God doesn't just tolerate your deepest longings—He satisfies them. Every hunger of the soul was created to be filled by Him. Bring your deep hunger to the table today; He has prepared a feast."
  },
  {
    title: "Praise Him in the Morning",
    verseRef: "Psalms 90:14",
    verseText: "O satisfy us early with thy mercy; that we may rejoice and be glad all our days.",
    reflection: "Beginning your day with God's mercy sets the tone for everything that follows. When gratitude is your first posture, the rest of the day is experienced through the lens of His goodness. Start here."
  },
  {
    title: "Overflow with Hope",
    verseRef: "Romans 15:13",
    verseText: "Now the God of hope fill you with all joy and peace in believing, that ye may abound in hope, through the power of the Holy Ghost.",
    reflection: "Hope is not something you manufacture—it is something God fills you with. As you believe, the Holy Spirit activates joy, peace, and overflowing hope in you. Ask Him to fill you to overflowing today."
  },
  // --- December: Hope, Light & Wonder ---
  {
    title: "The Light of the World",
    verseRef: "John 8:12",
    verseText: "Then spake Jesus again unto them, saying, I am the light of the world: he that followeth me shall not walk in darkness, but shall have the light of life.",
    reflection: "Jesus does not just show you the way—He is the light by which the way becomes visible. When you walk close to Him, the darkness around you does not define your path. His light leads you in every direction."
  },
  {
    title: "God's Indescribable Gift",
    verseRef: "2 Corinthians 9:15",
    verseText: "Thanks be unto God for his unspeakable gift.",
    reflection: "At its heart, Christmas is about a gift so great that words run out. Paul does not explain it—he just gives thanks. Let today be a day when you simply stop and say thank you for what God has given in His Son."
  },
  {
    title: "Emmanuel, God with Us",
    verseRef: "Matthew 1:23",
    verseText: "Behold, a virgin shall be with child, and shall bring forth a son, and they shall call his name Emmanuel, which being interpreted is, God with us.",
    reflection: "The most staggering claim of Christianity is not miracles or morality—it is proximity. God chose to be with us. Not from a distance, not through a system, but in person. That closeness is what He still offers today."
  },
  {
    title: "A Savior Is Born",
    verseRef: "Luke 2:11",
    verseText: "For unto you is born this day in the city of David a Saviour, which is Christ the Lord.",
    reflection: "Those words—'unto you'—make it personal. This is not a savior for the spiritually well-adjusted. He was born for you, in all your need. Receive Him again today as if hearing the announcement for the very first time."
  },
  {
    title: "The Hope We Have",
    verseRef: "Romans 8:24-25",
    verseText: "For we are saved by hope: but hope that is seen is not hope: for what a man seeth, why doth he yet hope for? But if we hope for that we see not, then do we with patience wait for it.",
    reflection: "Hope directed toward what you cannot yet see requires patience. But it is not wishful thinking—it is grounded in the character of the One who made the promise. His track record gives your hope a firm foundation."
  },
  {
    title: "A Bright Light Dawns",
    verseRef: "Isaiah 9:2",
    verseText: "The people that walked in darkness have seen a great light: they that dwell in the land of the shadow of death, upon them hath the light shined.",
    reflection: "The darkest places are where light is most dramatic. When Christ came, He did not come to those who had it together—He came to those in darkness. He still shines brightest in the deepest darkness of your life."
  },
  {
    title: "Peace Among Men",
    verseRef: "Luke 2:14",
    verseText: "Glory to God in the highest, and on earth peace, good will toward men.",
    reflection: "The angels announced peace as the fruit of Christ's coming. Not just personal peace, but a divine goodwill toward humanity that Heaven itself could not contain the joy of. You are the recipient of that goodwill."
  },
  {
    title: "The Word Became Flesh",
    verseRef: "John 1:14",
    verseText: "And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth.",
    reflection: "Grace and truth in perfect balance—that was Jesus. He did not trade one for the other. He was unflinchingly honest and overflowingly gracious at the same time. Ask Him to form that same character in you."
  },
  {
    title: "The Star That Guides",
    verseRef: "Matthew 2:10",
    verseText: "They rejoiced with exceeding great joy.",
    reflection: "The wise men had traveled far, followed a star, and searched with purpose—and when they found Jesus, their joy exceeded everything they had felt before. Seeking Jesus is always rewarded. Keep following the light."
  },
  {
    title: "The Prince of Peace",
    verseRef: "Isaiah 9:6",
    verseText: "For unto us a child is born, unto us a son is given: and the government shall be upon his shoulder: and his name shall be called Wonderful, Counsellor, The mighty God, The everlasting Father, The Prince of Peace.",
    reflection: "Every name given to Jesus in this verse is a promise for your life: He is your Wonderful Counsellor when you are lost, your Mighty God when you are weak, your Everlasting Father when you are alone, and your Prince of Peace when you are troubled. He is all of this. He is enough."
  },
  {
    title: "His Star Still Rises",
    verseRef: "2 Peter 1:19",
    verseText: "We have also a more sure word of prophecy; whereunto ye do well that ye take heed, as unto a light that shineth in a dark place, until the day dawn, and the day star arise in your hearts.",
    reflection: "Scripture is a light in a dark place—reliable, sufficient, and pointing toward the dawning of a greater light. Let God's Word continue to illuminate your path until the full day of His glory arrives."
  },
  {
    title: "Hope Does Not Disappoint",
    verseRef: "Romans 5:5",
    verseText: "And hope maketh not ashamed; because the love of God is shed abroad in our hearts by the Holy Ghost which is given unto us.",
    reflection: "Every hope placed in God will ultimately be vindicated—not ashamed, not disappointed. The love of God poured into your heart is the guarantee that the hope He has given you will one day be fully realized."
  },
  {
    title: "All Things New",
    verseRef: "Revelation 21:5",
    verseText: "And he that sat upon the throne said, Behold, I make all things new. And he said unto me, Write: for these words are true and faithful.",
    reflection: "The story does not end in brokenness—it ends with God making all things new. Whatever in your life feels irredeemably broken, hear His voice: I make all things new. And He means it. These words are true and faithful."
  },
  {
    title: "Come, Lord Jesus",
    verseRef: "Revelation 22:20",
    verseText: "He which testifieth these things saith, Surely I come quickly. Amen. Even so, come, Lord Jesus.",
    reflection: "The Bible's final prayer is a longing for His return. End this year where all of Scripture points—to Jesus, to His coming, and to the hope that the best is still ahead. Come, Lord Jesus. We are waiting for You."
  }
]
