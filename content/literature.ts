import type { LiteratureText } from '@/lib/types';

/**
 * Literature companion.
 *
 * These are the Ghana "English Language (Core)" texts for the 2022–2026
 * cycle, as confirmed by the literature sections of the 2020 and 2023 papers
 * in this repository. The Literature-in-English set-text list rotates; always
 * check the current cycle before memorising a text.
 *
 * Summaries and analysis are original. Quotations are short, attributed and
 * used for teaching purposes. Where an edition's wording/place differs, the
 * text says so.
 */

export const literatureTexts: LiteratureText[] = [
  /* ------------------------------------------------------------------ */
  {
    id: 'treasure-island',
    title: 'Treasure Island',
    author: 'Robert Louis Stevenson',
    genre: 'prose',
    origin: 'Non-African',
    year: '1883',
    cycle: 'WAEC Ghana Core English: 2022–2026',
    setting:
      'Eighteenth-century England and a remote Caribbean island. The story moves from the Admiral Benbow inn on the coast, to Bristol, then to the Hispaniola and Treasure Island itself.',
    blurb:
      'A boy finds a pirate’s map in a dead lodger’s sea chest and sails with a crew that is already plotting to take the treasure — and his life.',
    whyItMatters:
      'It is an adventure story that is secretly a novel about growing up and about how attractive evil can be. Long John Silver is one of the most memorable villains in English fiction because he is charming, useful and dangerous at the same time.',
    structureLabel: 'Parts and chapter groups',
    structure: [
      {
        label: 'Part I · Chapters 1–3',
        title: 'The old buccaneer',
        summary:
          'Jim Hawkins narrates from his father’s inn, the Admiral Benbow. A scarred sea captain, Billy Bones, takes a room and drinks too much. In Part I Jim’s father becomes ill, a menacing sailor named Black Dog appears, and the two men fight. The atmosphere is fear under a thin layer of ordinary inn life. Bones warns Jim to watch for a one-legged seafaring man.',
      },
      {
        label: 'Chapters 4–6',
        title: 'The black spot and the map',
        summary:
          'Blind Pew arrives with the black spot, the pirates’ summons; Bones collapses and dies. Jim and his mother open the sea chest to take only what is owed to them, and Jim also takes an oilskin packet. Pew’s gang ransacks the inn but is scattered by revenue officers. Jim takes the packet to Dr Livesey and Squire Trelawney: it contains a map of an island where Flint’s treasure is buried. The voyage is planned.',
      },
      {
        label: 'Part II · Chapters 7–9',
        title: 'Bristol and the Hispaniola',
        summary:
          'Trelawney buys the schooner Hispaniola and hires a crew with more enthusiasm than judgement. In Bristol, Jim meets the one-legged tavern-keeper Long John Silver and is instantly charmed. Silver joins as cook and brings his own men. Captain Smollett is uneasy about the voyage and the crew, and his suspicion proves well founded.',
      },
      {
        label: 'Chapters 10–12',
        title: 'The apple barrel',
        summary:
          'At sea, Jim befriends Silver while the captain and doctor try to keep order. Hidden in the apple barrel, Jim overhears Silver’s real plan: the crew will let the gentlemen find the treasure, then murder them. Jim tells the captain, doctor and squire. Smollett quietly changes the plan, but the ship is already outnumbered. Land is sighted.',
      },
      {
        label: 'Part III · Chapters 13–15',
        title: 'The island and Ben Gunn',
        summary:
          'Jim goes ashore with the mutineers and witnesses Silver kill a sailor who refuses to join him. Jim runs inland, hears a scream, and meets Ben Gunn, a marooned former pirate who has been alone for three years. Ben Gunn becomes a hidden ally and hints that he has already moved Flint’s treasure.',
      },
      {
        label: 'Part IV · Chapters 16–18',
        title: 'The stockade',
        summary:
          'The narration shifts to Dr Livesey. The loyal group abandons the Hispaniola, ferries supplies ashore in the jolly-boat, and occupies a stockade around a spring. Silver approaches under a flag of truce; the pirates attack. The first day of fighting ends with the garrison holding on, but casualties and fear are mounting.',
      },
      {
        label: 'Chapters 19–21',
        title: 'Silver’s parley and the attack',
        summary:
          'Jim returns to the stockade and learns how much has happened. Silver offers safe passage in exchange for the map; Smollett refuses. The pirates attack again, and Jim fights beside the others. The defenders survive, but the doctor, captain and others are wounded, and Jim’s restlessness becomes a problem for everyone.',
      },
      {
        label: 'Part V · Chapters 22–24',
        title: 'The sea adventure',
        summary:
          'Jim slips away alone, takes the coracle, and cuts the Hispaniola adrift so the pirates cannot escape with the treasure. He is carried out to sea, then uses the ebb tide to bring the little boat back toward the ship. The section is a test of nerve and practical seamanship rather than brute courage.',
      },
      {
        label: 'Chapters 25–27',
        title: 'Israel Hands and the Jolly Roger',
        summary:
          'Jim boards the Hispaniola and finds Israel Hands wounded and treacherous. Hands pretends to help, then attacks; Jim kills him in self-defence. Jim runs the ship aground in a safe cove. When he returns to the stockade, he discovers that the pirates now hold it — and he is captured.',
      },
      {
        label: 'Part VI · Chapters 28–30',
        title: 'In the enemy’s camp',
        summary:
          'Silver protects Jim, partly out of affection and partly as a bargaining chip. The pirates mutiny again; Silver is given the black spot and survives by talking. The doctor arrives to treat the wounded and privately tells Jim where to run if things go wrong. Jim is taken to look for the treasure with the pirates.',
      },
      {
        label: 'Chapters 31–34',
        title: 'The empty treasure and the escape',
        summary:
          'The pirates follow Flint’s pointer to a pit — it is empty. Ben Gunn has already moved the treasure to his cave. The loyal party ambushes the pirates; Silver changes sides again and survives. The treasure is loaded onto the Hispaniola, Silver escapes with a share, and Jim ends the narration safe but changed, still dreaming of the island.',
      },
    ],
    characters: [
      {
        name: 'Jim Hawkins',
        role: 'Narrator and protagonist',
        traits: ['curious', 'brave', 'impulsive', 'observant'],
        arc: 'Begins as an innkeeper’s son who is frightened of a drunken guest; ends as a young man who has killed, lost friends and seen how thin the line between adventure and greed can be.',
      },
      {
        name: 'Long John Silver',
        role: 'Cook, mutineer, and the novel’s great antagonist',
        traits: ['charming', 'intelligent', 'adaptable', 'ruthless'],
        arc: 'Moves from friendly father figure to chief mutineer, then survives every betrayal by reinventing himself. He is never fully punished, which is part of the book’s unsettling honesty.',
      },
      {
        name: 'Billy Bones',
        role: 'Old pirate and lodger at the inn',
        traits: ['violent', 'frightened', 'drunken'],
        arc: 'His fear of the black spot proves justified. His death sets the plot in motion.',
      },
      {
        name: 'Dr Livesey',
        role: 'Physician, magistrate and loyal ally',
        traits: ['calm', 'principled', 'practical'],
        arc: 'Provides adult judgement and medical skill; his narration in Part IV gives the reader a wider view of the island.',
      },
      {
        name: 'Squire Trelawney',
        role: 'Patron of the expedition',
        traits: ['generous', 'hot-tempered', 'impulsive'],
        arc: 'His careless hiring of the crew creates the crisis, but he fights bravely when it comes.',
      },
      {
        name: 'Captain Smollett',
        role: 'Captain of the Hispaniola',
        traits: ['disciplined', 'blunt', 'experienced'],
        arc: 'From a sour, distrustful officer to the steady commander the loyal group needs.',
      },
      {
        name: 'Ben Gunn',
        role: 'Marooned pirate',
        traits: ['eccentric', 'lonely', 'shrewd'],
        arc: 'His three years alone have made him strange, but his foresight in moving the treasure saves the expedition.',
      },
      {
        name: 'Blind Pew',
        role: 'Pirate messenger',
        traits: ['menacing', 'commanding'],
        arc: 'Delivers the black spot and is killed by mounted officers — a reminder that pirate power is fragile without a ship.',
      },
      {
        name: 'Israel Hands',
        role: 'Mutinous coxswain',
        traits: ['cunning', 'cruel', 'wounded'],
        arc: 'Pretends to help Jim, then tries to kill him. His death is Jim’s hardest moment.',
      },
    ],
    themes: [
      {
        title: 'Coming of age',
        body:
          'Jim begins as a boy watching adults and ends as a decision-maker. Stevenson does not make this a clean triumph: Jim disobeys, causes danger, and kills a man. Growing up is shown as gaining competence and losing innocence at the same time.',
        evidence:
          'Jim’s solo voyage in the coracle, his fight with Israel Hands, and his final, quieter account of the island.',
      },
      {
        title: 'Greed and the corruption of treasure',
        body:
          'Almost every character is changed by the promise of gold. The treasure does not simply reward the good; it exposes what people are willing to do. Even the “respectable” gentlemen are caught up in the hunt.',
        evidence:
          'The mutiny on the Hispaniola, the pirates’ repeated betrayals, and the empty pit that turns hope into rage.',
      },
      {
        title: 'Charm, duplicity and the ambiguity of evil',
        body:
          'Silver is not a monster with a single face. He is generous, funny and genuinely fond of Jim, and he is also prepared to murder him. The novel asks whether charm makes evil more dangerous or whether people are simply more complicated than their worst act.',
        evidence:
          'Silver’s protection of Jim in the pirates’ camp and his final escape with a bag of coins.',
      },
      {
        title: 'Loyalty and social order',
        body:
          'The Hispaniola is a small society with a captain, a squire, a doctor and a crew. Mutiny is not only a crime; it is a breakdown of the agreed order. Stevenson tests whether hierarchy deserves loyalty when the people at the top are careless.',
        evidence:
          'Smollett’s warnings, the council of war, and the stockade as a tiny fortified community.',
      },
      {
        title: 'The romance and danger of adventure',
        body:
          'The novel loves maps, ships and sea songs, but it also shows the cost: disease, fear, dead sailors and a boy forced to grow up fast. Adventure is intoxicating and expensive.',
        evidence:
          'The appeal of the treasure map versus the violence at the Admiral Benbow and on the island.',
      },
    ],
    symbols: [
      { name: 'The treasure map', meaning: 'Desire, destiny and the way a promise of wealth organises everyone around it.' },
      { name: 'The black spot', meaning: 'Judgement and approaching death; a piece of paper with the power of a death sentence.' },
      { name: 'The Hispaniola', meaning: 'Society in miniature — ordered on deck, mutinous below.' },
      { name: 'The stockade', meaning: 'Civilisation under siege; a fragile enclosure of law and cooperation.' },
      { name: 'Captain Flint the parrot', meaning: 'Violence repeated without understanding — the pirate past endlessly echoing.' },
      { name: 'The empty treasure pit', meaning: 'The hollowness of greed; the reward is a hole in the ground until someone moves it.' },
    ],
    quotes: [
      {
        text: 'Fifteen men on the dead man’s chest — / Yo-ho-ho, and a bottle of rum!',
        who: 'Billy Bones / the pirates’ song',
        context: 'The sea song that follows Bones and later the mutineers.',
        use: 'Atmosphere, foreshadowing, the pull of pirate culture.',
      },
      {
        text: 'Pieces of eight! Pieces of eight!',
        who: 'Captain Flint the parrot',
        context: 'The parrot repeats the language of treasure long after the pirates have lost it.',
        use: 'Symbolism, repetition, the emptiness of greed.',
      },
      {
        text: 'Dead men don’t bite.',
        who: 'Long John Silver',
        context: 'Silver’s practical, chilling way of dismissing fear — and conscience.',
        use: 'Characterisation of Silver; the novel’s casual attitude to death.',
      },
    ],
    essayPrompts: [
      '“Long John Silver is more dangerous because he is likeable.” Discuss this view of Treasure Island.',
      'How does Jim Hawkins change from the beginning to the end of the novel?',
      'Examine the theme of greed in Treasure Island.',
      'Discuss the role of the sea and the island as more than a setting.',
      '“The treasure is not the real reward.” What, in your view, is?',
    ],
    examFocus: [
      'Extract questions often ask who is speaking, to whom, and what has just happened.',
      'Know the order of the six parts; questions can place an extract by its narrator (Jim or Dr Livesey).',
      'For character questions, give one trait, one action and one consequence.',
      'Do not call Silver simply “evil”; discuss his charm and his moments of generosity as part of the analysis.',
    ],
    sourceNote:
      'Text: Treasure Island (1883), public domain. Chapter groupings follow the novel’s six parts. The 2023 paper in this folder tests this text in its literature section.',
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'the-kaya-girl',
    title: 'The Kaya Girl',
    author: 'Mamle Wolo',
    genre: 'prose',
    origin: 'African',
    year: '2012 (Ghana); 2022 (US edition)',
    cycle: 'WAEC Ghana Core English: 2022–2026',
    setting:
      'Present-day Accra, mainly Makola Market, with Faiza’s home region of Tolon in the Northern Region. The novel contrasts a wealthy southern household with the lives of migrant head-porters.',
    blurb:
      'Two fourteen-year-old girls — one a doctor’s daughter spending the holidays in her aunt’s fabric shop, the other a kayayoo from the north — build a friendship that crosses class, language and religion.',
    whyItMatters:
      'It is a Ghanaian novel about seeing people accurately. Its central drama is not a villain but a set of assumptions: about northerners, Muslims, market girls and wealthy families. The ending asks whether friendship can survive the structures around it.',
    structureLabel: 'Phases (the novel uses short chapters; exact numbering differs by edition)',
    structure: [
      {
        label: 'Phase 1',
        title: 'Arrival at Makola',
        summary:
          'Abena, fourteen, spends her weekdays at Auntie Lydia’s fabric shop while her mother is in London for the birth of a sibling. She is sulky, privileged and unsure how to be useful. The market is loud, demanding and full of people she has been taught to see as a category rather than as individuals.',
      },
      {
        label: 'Phase 2',
        title: 'Meeting Faiza',
        summary:
          'Abena meets Faiza, a kayayoo (head-porter) from Tolon who carries customers’ loads through the market. They have little shared language at first but an immediate, curious connection. The novel’s title gives Faiza’s work dignity: she is not “a market girl”, she is a person with a name and a history.',
      },
      {
        label: 'Phase 3',
        title: 'Exchange',
        summary:
          'The girls meet secretly for lunch. Faiza teaches Abena Dagbanli, market geography and northern food; Abena teaches Faiza to read, write and use a phone. Each gives the other a world the other could not reach alone. Their friendship is generous, but it is also unequal in resources and risk.',
      },
      {
        label: 'Phase 4',
        title: 'Asana’s story',
        summary:
          'Faiza reveals that she came south to find her cousin Asana, who fled a forced marriage to an older, wealthy man. Asana’s absence is the novel’s offstage emergency: a girl who had to disappear to keep her own future. Faiza’s search gives the friendship a purpose beyond companionship.',
      },
      {
        label: 'Phase 5',
        title: 'The rupture',
        summary:
          'Auntie Lydia disapproves of the friendship, driven by snobbery and anti-northern, anti-Muslim prejudice. A misunderstanding at the shop ends the relationship, and Faiza disappears from the market. Abena must confront the fact that her affection did not automatically give her the power to protect Faiza — and that her aunt’s prejudice was not separate from her own comfort.',
      },
      {
        label: 'Phase 6',
        title: 'Reunion',
        summary:
          'About a decade later, Abena is in labour at Korle-Bu Teaching Hospital. Dr Faiza is part of the medical team. The two women meet again as adults, their roles transformed. Abena names her daughter Faiza. The ending is hopeful, but it should be read carefully: individual success does not erase the market conditions that made the friendship hard in the first place.',
      },
    ],
    characters: [
      {
        name: 'Abena',
        role: 'Narrator; a doctor’s daughter from a wealthy Accra family',
        traits: ['observant', 'kind', 'sheltered', 'initially self-absorbed'],
        arc: 'Moves from pity to respect. She learns that privilege shapes what she notices, and that being fond of someone is not the same as understanding their life.',
      },
      {
        name: 'Faiza',
        role: 'A kayayoo from Tolon; Abena’s friend',
        traits: ['proud', 'witty', 'resilient', 'determined'],
        arc: 'Arrives in Accra to find her cousin and survives through work and wit. Her later life as a doctor is both a triumph and a narrative risk: it should not imply that everyone who works hard will escape the market.',
      },
      {
        name: 'Auntie Lydia',
        role: 'Abena’s aunt; owner of the fabric shop',
        traits: ['hard-working', 'strict', 'prejudiced', 'protective'],
        arc: 'Not a cartoon villain. Her kindness to her own family coexists with contempt for northerners and Muslims. The novel shows how ordinary warmth and structural prejudice can live in the same person.',
      },
      {
        name: 'Gifty',
        role: 'A poor relative who works in the shop',
        traits: ['quiet', 'resentful', 'watchful'],
        arc: 'Exposes the hierarchy inside the family: even the wealthy household has a girl doing invisible labour. Her treatment asks the reader to notice who is left out of the happy ending.',
      },
      {
        name: 'Asana',
        role: 'Faiza’s cousin',
        traits: ['brave', 'frightened', 'absent'],
        arc: 'Her flight from forced marriage is the novel’s strongest example of a girl choosing her own future. She is mostly offstage, which makes her story feel like a real absence rather than a plot device.',
      },
      {
        name: 'Abena’s father',
        role: 'A doctor who grew up poor',
        traits: ['gentle', 'reflective', 'moral'],
        arc: 'He supplies the novel’s clearest statement that people make assumptions about others. His own background complicates the idea that wealthy people are all the same.',
      },
      {
        name: 'Abena’s mother',
        role: 'Absent in London for the birth',
        traits: ['distant', 'organised'],
        arc: 'Her absence creates the space for Abena’s summer at the shop and forces Abena to rely on her aunt.',
      },
    ],
    themes: [
      {
        title: 'Friendship across difference',
        body:
          'The girls’ bond is real, but it is tested by class, region, religion and language. Wolo does not pretend that affection dissolves these structures; she shows two people learning to see each other inside them.',
        evidence:
          'The secret lunches, the language lessons, and the final hospital reunion.',
      },
      {
        title: 'Prejudice and the stories we inherit',
        body:
          'Auntie Lydia’s comments about northerners and Muslims are not unusual in the world of the novel; they are ordinary prejudices repeated at a shop counter. The novel asks the reader to notice how casually harm is spoken.',
        evidence:
          'Auntie Lydia’s objections to the friendship; Abena’s father’s warning about assumptions.',
      },
      {
        title: 'Education as power',
        body:
          'Literacy and schooling are not abstract goods. They change who can read a contract, use a phone, navigate a hospital, or imagine a different future. The novel treats education as both a gift and a dividing line.',
        evidence:
          'Abena teaching Faiza to read and use a phone; Faiza’s later medical career.',
      },
      {
        title: 'Poverty, migration and the kayayoo economy',
        body:
          'Faiza is not poor because she lacks effort. She is part of a labour system that brings girls from the north to carry loads in southern cities with little protection. The novel gives that system a human face without turning Faiza into a symbol.',
        evidence:
          'Faiza’s work in Makola, her search for Asana, and her pride in her own earnings.',
      },
      {
        title: 'Forced marriage and female agency',
        body:
          'Asana’s flight from an older husband is a reminder that marriage can be a site of coercion, not romance. The novel places her choice beside Faiza’s choices about work and school, showing different forms of a girl trying to control her own life.',
        evidence:
          'Asana’s story, Faiza’s decision to come south, and the final image of the next generation.',
      },
      {
        title: 'Privilege and the limits of good intentions',
        body:
          'Abena is kind, but her kindness does not automatically make her safe for Faiza. She can leave the market; Faiza cannot. The novel’s ending is hopeful, but it does not claim that one friendship repairs an unequal society.',
        evidence:
          'Abena’s return to her comfortable life; Gifty’s unfinished story; the contrast between the shop and the market.',
      },
    ],
    symbols: [
      { name: 'The head pan', meaning: 'Physical labour, survival and dignity; the weight Faiza carries literally and socially.' },
      { name: 'Makola Market', meaning: 'Ghana in miniature — a place where class, region, language and trade meet.' },
      { name: 'Language (Dagbanli, Twi, English, Pidgin)', meaning: 'Both a barrier and a bridge; who speaks whose language is a question of power.' },
      { name: 'The fabric shop', meaning: 'Commerce, respectability and the compromises that keep a family comfortable.' },
      { name: 'The hospital', meaning: 'Where the two worlds finally meet on more equal terms; care that does not depend on class.' },
      { name: 'The name “Faiza”', meaning: 'Continuity, friendship and the hope that the next generation inherits a wider world.' },
    ],
    quotes: [
      {
        text: 'We hardly needed language to communicate.',
        who: 'Abena',
        context: 'On first meeting Faiza; the connection precedes the words.',
        use: 'Friendship, nonverbal understanding, the limits of language.',
      },
      {
        text: 'I am not the only kayayoo from my village.',
        who: 'Faiza',
        context: 'On migration from the north to Accra.',
        use: 'Poverty, migration, the scale of the kayayoo economy.',
      },
      {
        text: 'How could we live in such different worlds inside the same country?',
        who: 'Abena',
        context: 'Her awakening to inequality in Ghana.',
        use: 'Class, privilege, national belonging.',
      },
      {
        text: 'I loved you as a friend and even a sister.',
        who: 'Abena to Faiza',
        context: 'The emotional centre of the friendship.',
        use: 'Love across difference; chosen family.',
      },
    ],
    essayPrompts: [
      'Discuss the theme of friendship in The Kaya Girl.',
      'How does the novel explore prejudice and stereotyping?',
      '“Education changes both Faiza and Abena.” Discuss.',
      'Examine the significance of Makola Market as a setting.',
      'Is the ending of The Kaya Girl too hopeful? Support your view with evidence.',
      'Discuss the character and role of Auntie Lydia.',
    ],
    examFocus: [
      'Use phases, not invented chapter numbers: exact chapter divisions differ between the Ghanaian and US editions.',
      'For extract questions, identify the speaker, the addressee, the situation and the tone before analysing the device.',
      'Link personal moments to social structures: a lunch scene can carry class, religion and labour.',
      'Be ready to evaluate the ending critically. “Hopeful” is not the same as “uncomplicated”.',
    ],
    sourceNote:
      'The novel was first published in Ghana in 2012 and reissued in the US in 2022. Quotations follow the US edition and may differ slightly in wording/page from the Ghanaian edition. Chapter numbering is deliberately not asserted.',
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'an-enemy-of-the-people',
    title: 'An Enemy of the People',
    author: 'Henrik Ibsen',
    genre: 'drama',
    origin: 'Non-African',
    year: '1882',
    cycle: 'WAEC Ghana Core English: 2022–2026',
    setting:
      'A small Norwegian spa town. The action moves between Dr Stockmann’s living room, the newspaper office and a public meeting hall.',
    blurb:
      'A doctor discovers that the town’s celebrated baths are polluted. When he tries to publish the truth, the town that praised him turns on him — and his own brother leads the defence of profit over health.',
    whyItMatters:
      'It is a play about what happens when truth becomes inconvenient. Every character has a plausible reason for silencing the doctor: money, reputation, family loyalty, fear of the majority. That is what makes it feel modern.',
    structureLabel: 'Five acts',
    structure: [
      {
        label: 'Act 1',
        title: 'The celebrated doctor',
        summary:
          'The town is proud of its new municipal baths and of Dr Thomas Stockmann, the medical officer who helped design them. His brother Peter, the mayor and chairman of the baths, values order and reputation. Hovstad and Billing, the liberal newspapermen, praise the doctor. The act establishes a comfortable public world just before it cracks.',
      },
      {
        label: 'Act 2',
        title: 'The letter',
        summary:
          'Stockmann receives the results of water tests: the baths are contaminated, and the source is upstream. He is elated, not worried — he believes the town will thank him for the warning. Peter arrives and insists the report must be suppressed because it will ruin the town’s economy. The brothers argue about duty, authority and who owns the truth.',
      },
      {
        label: 'Act 3',
        title: 'The newspaper office',
        summary:
          'Hovstad and Billing plan to publish the report, seeing a political opportunity. Aslaksen, the cautious printer, wants moderation and the support of property owners. Peter threatens the paper’s survival. The support around Stockmann begins to look conditional. Ibsen shows how principles bend when money and influence enter the room.',
      },
      {
        label: 'Act 4',
        title: 'The public meeting',
        summary:
          'Stockmann tries to address the town, but Aslaksen chairs the meeting and the crowd refuses to let him speak. He loses control and turns his anger on the “compact majority”, declaring that the majority is often wrong. The meeting votes him an enemy of the people. The scene is a study in how a crowd can be managed by procedure and fear.',
      },
      {
        label: 'Act 5',
        title: 'The strongest man',
        summary:
          'The family’s windows are broken; Stockmann has lost his position, Petra has lost her teaching job, and Captain Horster has lost his ship. Morten Kiil tries to use his financial stake in the baths to force a retraction. Stockmann refuses. He decides to stay in the town, teach his sons, and keep telling the truth. The play ends with his claim that the strongest man is the one who stands most alone.',
      },
    ],
    characters: [
      {
        name: 'Dr Thomas Stockmann',
        role: 'Medical officer of the baths; protagonist',
        traits: ['idealistic', 'stubborn', 'energetic', 'sometimes reckless'],
        arc: 'From a loyal civic scientist to a man isolated by his own town. His idealism is admirable, but his delight in the discovery and his contempt for the crowd expose his pride.',
      },
      {
        name: 'Peter Stockmann',
        role: 'Mayor, chairman of the baths, Thomas’s brother',
        traits: ['authoritarian', 'pragmatic', 'status-conscious'],
        arc: 'He chooses institutional stability and family reputation over public health. He is not a caricature: his fear of economic collapse is real, which makes him more troubling.',
      },
      {
        name: 'Katherine Stockmann',
        role: 'Thomas’s wife',
        traits: ['loyal', 'anxious', 'diplomatic'],
        arc: 'Tries to keep the family together while understanding the cost of her husband’s stand. She is neither a fool nor a saint.',
      },
      {
        name: 'Petra Stockmann',
        role: 'Their daughter; a teacher',
        traits: ['independent', 'principled', 'compassionate'],
        arc: 'Supports her father and loses her job. She represents the next generation’s willingness to pay for conviction.',
      },
      {
        name: 'Hovstad',
        role: 'Editor of the People’s Messenger',
        traits: ['opportunistic', 'articulate', 'cautious'],
        arc: 'Supports the doctor while it is politically useful, then retreats when the paper is threatened.',
      },
      {
        name: 'Aslaksen',
        role: 'Printer, temperance leader, chairman of the meeting',
        traits: ['moderate', 'anxious', 'procedural'],
        arc: 'Embodies the “compact majority”: he wants change without risk and uses procedure to silence the truth.',
      },
      {
        name: 'Morten Kiil',
        role: 'Katherine’s father; tanner and investor',
        traits: ['wily', 'self-interested', 'provincial'],
        arc: 'His tannery is a source of the pollution, and his money becomes a weapon to force Stockmann’s silence.',
      },
      {
        name: 'Captain Horster',
        role: 'Ship captain; the doctor’s ally',
        traits: ['quiet', 'decent', 'independent'],
        arc: 'Loses his ship for standing with the family — a reminder that conviction has material consequences.',
      },
    ],
    themes: [
      {
        title: 'Truth versus power',
        body:
          'The play’s central conflict is not between good and evil people but between evidence and the interests that cannot afford it. The doctor’s facts are correct; the town’s response is not about facts at all.',
        evidence:
          'The water report, Peter’s demand to suppress it, and the public meeting’s refusal to hear the evidence.',
      },
      {
        title: 'The majority and the “compact majority”',
        body:
          'Stockmann’s attack on the majority is provocative because democracy is supposed to protect the many. Ibsen asks whether a majority can be manufactured by money, media and fear — and what a citizen owes to truth when the crowd is wrong.',
        evidence:
          'Aslaksen’s chairing of the meeting, Hovstad’s newspaper, and Stockmann’s Act 4 speech.',
      },
      {
        title: 'Public health and economic interest',
        body:
          'The baths are both a health resource and a business. The town must choose between admitting contamination and protecting its income. The play refuses to let the reader pretend the choice is easy.',
        evidence:
          'The tannery upstream, the tourist economy, and Peter’s fear of “the whole town” being ruined.',
      },
      {
        title: 'Family loyalty under pressure',
        body:
          'The Stockmanns are divided by the crisis: brother against brother, wife against husband’s risk, daughter against employer. Ibsen shows that public courage is lived in private relationships.',
        evidence:
          'Peter’s fraternal pressure, Katherine’s fear, Petra’s dismissal, and Kiil’s threat to the inheritance.',
      },
      {
        title: 'The cost of conviction',
        body:
          'Standing alone is not a triumphant pose. The family loses income, security and reputation. The ending is defiant but materially uncertain — which is what makes it honest.',
        evidence:
          'The broken windows, Petra’s lost job, Horster’s lost ship, and Stockmann’s decision to teach his sons at home.',
      },
      {
        title: 'Media and public opinion',
        body:
          'The newspaper is not a neutral messenger. It selects, frames and abandons stories according to its own survival. Ibsen anticipates the modern relationship between media, money and public anger.',
        evidence:
          'Hovstad’s shifting position and the printed attacks on Stockmann.',
      },
    ],
    symbols: [
      { name: 'The baths', meaning: 'Civic pride and economic hope — a public good whose contamination is denied.' },
      { name: 'The polluted water', meaning: 'Truth that cannot be seen but will eventually reach everyone.' },
      { name: 'The “enemy of the people” label', meaning: 'How a community converts a truth-teller into an outsider rather than face the evidence.' },
      { name: 'The compact majority', meaning: 'Manufactured consensus; the crowd as an instrument of power.' },
      { name: 'The broken windows', meaning: 'The physical cost of social rejection; violence dressed as public opinion.' },
      { name: 'The tannery', meaning: 'Private profit producing public harm, with the cost pushed onto the community.' },
    ],
    quotes: [
      {
        text: 'The strongest man in the world is he who stands most alone.',
        who: 'Dr Thomas Stockmann',
        context: 'The play’s final declaration after his family has been ostracised.',
        use: 'Individual conviction, isolation, the ending’s ambiguity.',
      },
      {
        text: 'A community is like a ship; everyone ought to be prepared to take the helm.',
        who: 'Dr Thomas Stockmann',
        context: 'His argument about civic responsibility.',
        use: 'Democracy, duty, the metaphor of the ship.',
      },
      {
        text: 'You should never wear your best trousers when you go out to fight for freedom and truth.',
        who: 'Dr Thomas Stockmann',
        context: 'A wry comment on the material cost of principle.',
        use: 'Humour, the cost of conviction, the play’s tone.',
      },
    ],
    essayPrompts: [
      '“Dr Stockmann is a hero, but not a saint.” Discuss.',
      'Examine the conflict between truth and economic interest in An Enemy of the People.',
      'How does Ibsen use the Stockmann brothers to explore authority and family loyalty?',
      'Discuss the role of the press and public opinion in the play.',
      '“The strongest man in the world is he who stands most alone.” How far does the play support this view?',
    ],
    examFocus: [
      'Know which act each major event happens in; extract questions often ask “what has just happened?”',
      'For character questions, distinguish Thomas’s idealism from Peter’s institutional pragmatism.',
      'Use short quotations and always attach them to a point.',
      'The ending is not a simple victory: mention the lost jobs, broken windows and uncertain future.',
    ],
    sourceNote:
      'Text: An Enemy of the People (1882), public domain. The 2023 paper in this folder tests this drama in its literature section.',
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'the-son-of-umbele',
    title: 'The Son of Umbele',
    author: 'Bill Okyere Marshall',
    genre: 'drama',
    origin: 'African',
    year: '1973',
    cycle: 'WAEC Ghana Core English: 2022–2026',
    setting:
      'The yard outside Sumako’s house in a coastal fishing village in Ghana. The sea is offstage but always audible in the life of the community.',
    blurb:
      'A wealthy, educated stranger arrives in a fishing village searching for an impossible thing. His pride, the village’s superstitions and a family’s hunger for status converge in a tragedy.',
    whyItMatters:
      'It is a modern Ghanaian tragedy about inheritance — not only money, but reputation, guilt and the stories a community tells about a person before meeting him. The title tells you the trap: Joshua is judged as “the son of Umbele” before he is judged as a man.',
    structureLabel: 'Three acts',
    structure: [
      {
        label: 'Act 1',
        title: 'The stranger at the shore',
        summary:
          'Sumako, an old fisherman, mends his nets and waits for his sons to return with fish. The fishmongers flatter him to lower his price; he sees through them. His daughter Duella complains that the boys are favoured. Joshua arrives, an educated stranger, and is recognised as Madam Umbele’s son. He says he is looking for “the third end of a rope” — an impossible quest. Sumako tells him of a prince who vanished looking for it, then warns him that the curious find a dead end. Joshua and Duella leave for the beach together.',
      },
      {
        label: 'Act 2',
        title: 'The lie in the household',
        summary:
          'The family’s backstory emerges. Sumako’s wife was paralysed when Duella was born, and Duella has been kept from womanhood because she is thought to be possessed. Benko, the hot-tempered eldest son, sent Attu to a diviner. Attu drank the money and invented the prophecy that seven days of virginity would cure her. Duella has already slept with Joshua. Zekey, the gentle brother, is grieving a woman who died of a snakebite. Benko watches Duella and Joshua with resentment.',
      },
      {
        label: 'Act 3',
        title: 'The duel and the cost',
        summary:
          'Attu tries to warn Joshua and blurts out that he is Umbele’s son and that the village will kill him. He confesses that the prophecy was a lie. Insults escalate, and Sumako sanctions a gun-and-dagger duel by the sea. Joshua chooses the gun; Benko chooses the dagger. A shot is heard offstage; Benko returns saying Joshua has shot himself. Sumako tells Duella to find a man “who wouldn’t come searching for the third end of the rope”. The paralysed mother cries out as the play ends.',
      },
    ],
    characters: [
      {
        name: 'Joshua',
        role: 'Son of Madam Umbele; the stranger',
        traits: ['educated', 'proud', 'guilt-ridden', 'idealistic'],
        arc: 'He arrives seeking atonement for his mother’s exploitation and his own mismanagement of her fortune. He cannot accept smallness, charity or a borrowed place, and his pride turns the search into self-destruction.',
      },
      {
        name: 'Sumako',
        role: 'Old fisherman; head of the household',
        traits: ['proverb-loving', 'cautious', 'hospitable', 'patriarchal'],
        arc: 'He offers shelter and wisdom, then sanctions the duel when the community’s honour is threatened. His hospitality and his fatalism are two sides of the same traditional authority.',
      },
      {
        name: 'Duella',
        role: 'Sumako’s daughter',
        traits: ['yearning', 'brave', 'resentful', 'loving'],
        arc: 'Labelled possessed and denied womanhood, she falls in love with Joshua. She gains a voice through the crisis and survives him — but the play leaves her future uncertain.',
      },
      {
        name: 'Benko',
        role: 'Eldest son; fisherman',
        traits: ['aggressive', 'jealous', 'status-conscious'],
        arc: 'He resents Joshua’s education and his place in the household. His duel with Joshua is less about honour than possession and wounded pride.',
      },
      {
        name: 'Attu',
        role: 'Third son; the errand-runner',
        traits: ['comic', 'drunken', 'inventive', 'truth-telling'],
        arc: 'He invents the prophecy for money, then blurts out the truth when it matters. He functions as both comic relief and the play’s uncomfortable conscience.',
      },
      {
        name: 'Zekey',
        role: 'Second son',
        traits: ['gentle', 'grieving', 'sensitive'],
        arc: 'His grief for a woman who died of snakebite shows the ordinary sorrows the family is already carrying. He is a quieter counterpoint to Benko’s aggression.',
      },
      {
        name: 'Madam Umbele',
        role: 'Joshua’s mother (dead before the play)',
        traits: ['wealthy', 'exploitative', 'absent'],
        arc: 'Her reputation and fortune drive the plot. Joshua’s search is an attempt to atone for a legacy he did not choose but cannot escape.',
      },
      {
        name: 'Sumako’s wife',
        role: 'Mother of the household',
        traits: ['silent', 'paralysed', 'suffering'],
        arc: 'Paralysed since Duella’s birth, she is a living sign of the family’s frozen past. Her final cry releases the grief the household has been unable to speak.',
      },
    ],
    themes: [
      {
        title: 'Inherited guilt and the weight of a name',
        body:
          'Joshua is treated as the son of Umbele before he is treated as a man. The village’s memory of his mother’s exploitation becomes his inheritance. The play asks whether a person can repay a debt they did not personally create.',
        evidence:
          'The title, Attu’s revelation, and the village’s hostility to Joshua.',
      },
      {
        title: 'Fate versus personal flaw',
        body:
          'The “curse” and Joshua’s pride work together. He is not simply doomed by the gods; he chooses the gun, refuses humility and escalates the duel. Tragedy here is character and circumstance pressing on each other.',
        evidence:
          'Joshua’s impossible quest, his contempt for the village, and his choice of the gun.',
      },
      {
        title: 'Tradition versus education',
        body:
          'The village defines itself against the learned outsider: “We are not learned; we don’t kill dragons.” Education gives Joshua status but not belonging. The play does not simply celebrate tradition or modernity; it shows each failing the other.',
        evidence:
          'Sumako’s proverbs, the villagers’ suspicion, and Joshua’s inability to accept village life.',
      },
      {
        title: 'Superstition and manufactured truth',
        body:
          'The demon that possess Duella is a label, not a diagnosis. Attu’s prophecy is invented for money, then treated as sacred. The play exposes how beliefs can be manufactured and policed, especially over a girl’s body.',
        evidence:
          'Attu’s confession, the diviner, and the seven-day virginity rule.',
      },
      {
        title: 'Pride, shame and honour',
        body:
          'The duel is presented as honour, but it is driven by jealousy and wounded status. Benko cannot bear Joshua’s presence; Joshua cannot bear being small. Honour becomes a way of disguising possession.',
        evidence:
          'Benko’s resentment, the insults before the duel, and Sumako’s sanction.',
      },
      {
        title: 'Control of the female body',
        body:
          'Duella’s virginity is treated as a communal instrument to cure her mother and protect the family’s name. Her own desires are secondary. Her survival at the end is not the same as freedom.',
        evidence:
          'The prophecy, Duella’s relationship with Joshua, and her final instruction from Sumako.',
      },
      {
        title: 'Hospitality and communal judgement',
        body:
          'Sumako welcomes Joshua, but the village’s memory of Umbele slowly overwhelms the welcome. Hospitality is real, and so is the community’s power to withdraw it.',
        evidence:
          'Sumako’s initial shelter, the fishmongers’ talk, and the final duel.',
      },
    ],
    symbols: [
      { name: 'The third end of a rope', meaning: 'An impossible goal; conscience, self-knowledge or death — the play deliberately refuses one gloss.' },
      { name: 'Nets and the sea', meaning: 'Patience, livelihood and inescapable fate; the village’s horizon.' },
      { name: 'The gun versus the dagger', meaning: 'Imported modernity versus tradition; Joshua’s choice of the gun foreshadows self-destruction.' },
      { name: 'Duella’s “demon”', meaning: 'A label that imprisons more than it diagnoses.' },
      { name: 'The paralysed mother', meaning: 'A household frozen by the past; her final cry is the release of what cannot be spoken.' },
      { name: 'The hill and the village', meaning: 'Umbele’s wealth above and the fishermen’s labour below; class and inheritance.' },
    ],
    quotes: [
      {
        text: 'What about me, father? What about me?',
        who: 'Duella',
        context: 'Act 1 — her complaint that the sons are favoured.',
        use: 'Gender inequality, Duella’s voice, family favouritism.',
      },
      {
        text: 'They are my children.',
        who: 'Sumako',
        context: 'Defending his sons when they return without fish.',
        use: 'Paternal authority, family loyalty, the father’s blindness.',
      },
      {
        text: 'They have all the time in the world.',
        who: 'Duella',
        context: 'Her ironic comment on the fishermen and the sea.',
        use: 'Time, fatalism, the rhythm of village life.',
      },
    ],
    essayPrompts: [
      '“Joshua is the architect of his own downfall.” Discuss.',
      'Examine The Son of Umbele as a tragedy.',
      'Discuss the significance of the title of the play.',
      'What is the role of Attu in The Son of Umbele?',
      '“The past is the real antagonist in the play.” How far do you agree?',
      'Discuss the theme of tradition versus modernity in the play.',
    ],
    examFocus: [
      'Only three quotations here are verified verbatim from the printed text; do not invent dialogue in an exam answer.',
      'Connect Joshua’s flaw → choice → consequence for tragedy questions.',
      'For Duella, argue both victim and agent, using specific moments.',
      'The “third end of a rope” is a symbol with more than one reading; say so and support your chosen reading.',
    ],
    sourceNote:
      'Text: The Son of Umbele (1973), Ghana Publishing Corporation. Plot and act details follow the published play and standard programme notes. Quotations are limited to lines verified in the Ghana Ministry of Education textbook; other famous lines are paraphrased in analysis rather than quoted.',
  },
];
