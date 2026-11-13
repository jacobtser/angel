import type { SubjectMeta } from '@/lib/types';

/**
 * English Language — the priority subject.
 *
 * Exam shape comes from the WAEC English Language syllabus in
 * `public/papers/english/syllabus.pdf` and the Ghana core English papers
 * (2020, 2023) in the vault. Explanations and practice items are original.
 */

export const english: SubjectMeta = {
  id: 'english',
  name: 'English Language',
  shortName: 'English',
  priority: 1,
  accent: 'rose',
  tagline: 'The paper that opens every other door.',
  description:
    'Lexis, structure, comprehension, summary, essay craft and literature — taught in the order the paper tests them, with the reading load broken into small pieces.',
  examShape: [
    'Paper 1 — 80 objective questions in 1 hour (lexis, structure and literature)',
    'Paper 2 — one essay from five, plus comprehension and summary, in 2 hours',
    'Paper 3 — oral English / listening, 45 minutes (check your entry)',
  ],
  passNote:
    'A pass here is not about sounding fancy. It is about being precise, organised and calm under time.',
  paperUrl: '/papers/english/wassce-2023.pdf',
  paperLabel: 'WASSCE 2023 English Language Paper 1',
  paperSource: 'English Language/WASSCE/wassce 2023 english.pdf',
  hasLiterature: true,
  hasOrals: true,
  topics: [
    /* ------------------------------------------------------------------ */
    {
      id: 'english:lexis',
      subject: 'english',
      title: 'Lexis: words in context',
      summary:
        'How to choose the closest meaning, the true opposite, and the idiom that the examiner actually intended.',
      readMinutes: 12,
      difficulty: 'foundation',
      examWeight: 'Large — roughly half of Paper 1 Part A',
      lesson: {
        bigIdea:
          'A word is not a dictionary entry floating alone. It is a guest in a sentence, and the exam asks which guest fits this particular room.',
        analogy: {
          title: 'The cloth and the occasion',
          body:
            'A beautiful cloth can still be wrong for a funeral. The fabric did not change; the occasion did. Words work the same way. “Cheap” can mean affordable or badly made, depending on the sentence around it. Read the whole sentence before you look at the options — the occasion decides.',
        },
        example: {
          title: 'One word, two moods',
          body:
            '“Her remark was caustic.” Caustic literally describes something that burns. Here it means bitterly critical. If the options are bitter, humorous, lengthy and kind, only “bitter” keeps the burn. Substituting each option back into the sentence is the fastest test.',
        },
        worked: [
          {
            question:
              'Unlike his taciturn brother, Kojo is ______. Choose the word that best completes the sentence.',
            steps: [
              {
                label: 'Spot the signal',
                detail:
                  '“Unlike” sets up a contrast. Whatever Kojo is, it must be the opposite of his brother.',
              },
              {
                label: 'Define the key word',
                detail: 'Taciturn means saying very little — a quiet, reserved person.',
              },
              {
                label: 'Choose the true opposite',
                detail:
                  'Talkative is the direct opposite. “Rude” and “proud” are negative but do not contrast with silence.',
              },
            ],
            answer: 'Talkative.',
            why: 'The contrast word “unlike” is the clue. Most wrong options are simply unpleasant traits, not opposites.',
          },
          {
            question: 'The new coach wants to carry the day. What does the underlined expression mean?',
            steps: [
              {
                label: 'Do not translate literally',
                detail:
                  'Nobody is physically carrying a day. Idioms are pictures whose meaning is fixed by usage.',
              },
              {
                label: 'Recall the image',
                detail:
                  'To “carry the day” comes from winning a contest — your side takes the day’s honour.',
              },
              {
                label: 'Match to the situation',
                detail: 'A coach wants the team to win, so the phrase means to be successful.',
              },
            ],
            answer: 'To win or be successful.',
            why: 'Idiom questions punish literal reading. Learn idioms in a sentence, not as isolated definitions.',
          },
          {
            question:
              'Choose the option that is nearest in meaning to the underlined word: The auditor described the accounts as dubious.',
            steps: [
              {
                label: 'Use the subject',
                detail:
                  'An auditor examines accounts for accuracy. That context points to suspicion, not excitement.',
              },
              {
                label: 'Test the options',
                detail:
                  'Dubious = doubtful or not to be trusted. “Suspicious” fits. “Detailed” and “balanced” describe good accounts, not doubtful ones.',
              },
              {
                label: 'Check the part of speech',
                detail:
                  'The blank needs an adjective. All options are adjectives, so meaning decides it.',
              },
            ],
            answer: 'Suspicious.',
            why: 'Context plus word class narrows four options to one almost every time.',
          },
        ],
        deeper: [
          {
            title: 'Denotation and connotation',
            body:
              'Denotation is the flat dictionary meaning; connotation is the feeling attached to it. “Childlike” and “childish” both relate to children, but one is admiring and the other is critical. WAEC loves questions where two options are factually close but only one carries the right feeling.',
          },
          {
            title: 'Collocation: words that keep company',
            body:
              'English does not only ask whether a word is true; it asks whether it is natural. We “make a decision”, not “do a decision”; we “take an exam”, not “write an exam” in standard British usage. When two options mean the same thing, choose the one that collocates with the surrounding words.',
          },
        ],
        pitfalls: [
          'Choosing a word because it sounds advanced, without substituting it into the sentence.',
          'Treating an idiom as a literal instruction — “a snake in the grass” is a deceitful person, not a reptile.',
          'Missing a contrast signal such as “although”, “unlike”, “whereas” or “on the contrary”.',
        ],
        examTip:
          'Cover the options, predict a word, then uncover. You will be less tempted by a familiar distractor. If two options survive, test register: which one would a careful writer actually use here?',
      },
      quiz: [
        {
          id: 'english:lexis:q1',
          prompt: 'Choose the word nearest in meaning to the underlined word: The chairman’s speech was succinct.',
          options: ['Brief and clear', 'Rude and hostile', 'Long and boring', 'Quiet and uncertain'],
          answer: 0,
          explanation: 'Succinct means expressed briefly and clearly. Length is not the point; economy is.',
        },
        {
          id: 'english:lexis:q2',
          prompt: 'Choose the word most nearly opposite in meaning to the underlined word: Ama was reluctant to lend her notes.',
          options: ['Eager', 'Hesitant', 'Careful', 'Angry'],
          answer: 0,
          explanation: 'Reluctant means unwilling; its opposite is eager. “Hesitant” is a synonym, not an antonym.',
        },
        {
          id: 'english:lexis:q3',
          prompt: 'The two brothers were at loggerheads over the family land. This means they were',
          options: ['in disagreement', 'working together', 'confused about the land', 'travelling abroad'],
          answer: 0,
          explanation: '“At loggerheads” means in strong disagreement. The literal image of two loggerheads facing each other supports the meaning.',
        },
        {
          id: 'english:lexis:q4',
          prompt: 'Choose the word nearest in meaning to the underlined word: Profits plummeted after the new tax.',
          options: ['Fell sharply', 'Rose steadily', 'Stayed the same', 'Doubled suddenly'],
          answer: 0,
          explanation: 'To plummet is to fall very quickly. The tax explains the direction; “plummet” supplies the speed.',
        },
        {
          id: 'english:lexis:q5',
          prompt: 'The witness gave a credible account of the accident. “Credible” means',
          options: ['believable', 'false', 'secret', 'detailed'],
          answer: 0,
          explanation: 'Credible means able to be believed. Do not confuse it with “credulous”, which describes a person who believes too easily.',
        },
        {
          id: 'english:lexis:q6',
          prompt: 'Mr Mensah is known for his frugal habits. This means his habits are',
          options: ['thrifty', 'wasteful', 'generous', 'wealthy'],
          answer: 0,
          explanation: 'Frugal means careful with money and resources — thrifty. It is a mild compliment, not a synonym for poor.',
        },
      ],
      flashcards: [
        { id: 'english:lexis:c1', subject: 'english', topicId: 'english:lexis', front: 'succinct', back: 'Brief, clear and to the point.', hint: 'Think of a clean, short sentence.' },
        { id: 'english:lexis:c2', subject: 'english', topicId: 'english:lexis', front: 'reluctant', back: 'Unwilling; slow to agree.', hint: 'The opposite is eager.' },
        { id: 'english:lexis:c3', subject: 'english', topicId: 'english:lexis', front: 'at loggerheads', back: 'In strong disagreement.', hint: 'Two people facing each other over an argument.' },
        { id: 'english:lexis:c4', subject: 'english', topicId: 'english:lexis', front: 'plummet', back: 'To fall or drop very sharply.', hint: 'A stone dropping.' },
        { id: 'english:lexis:c5', subject: 'english', topicId: 'english:lexis', front: 'credible / credulous', back: 'Credible = believable. Credulous = too ready to believe.', hint: 'One describes a story; the other describes a person.' },
        { id: 'english:lexis:c6', subject: 'english', topicId: 'english:lexis', front: 'frugal', back: 'Careful and economical with money or food.', hint: 'Not the same as stingy.' },
        { id: 'english:lexis:c7', subject: 'english', topicId: 'english:lexis', front: 'taciturn', back: 'Habitually quiet; saying very little.', hint: 'The opposite is talkative.' },
        { id: 'english:lexis:c8', subject: 'english', topicId: 'english:lexis', front: 'caustic', back: 'Bitterly critical; able to burn.', hint: 'A caustic remark leaves a sting.' },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'english:structure',
      subject: 'english',
      title: 'Structure: grammar with intent',
      summary:
        'Concord, tense, conditionals, connectors and prepositions — the rules that keep a sentence from crashing.',
      readMinutes: 14,
      difficulty: 'core',
      examWeight: 'Large — roughly half of Paper 1 Part A',
      lesson: {
        bigIdea:
          'Grammar is not decoration. It is the traffic system of a sentence: once the signals disagree, meaning crashes.',
        analogy: {
          title: 'The football team',
          body:
            'A sentence has a subject (the player) and a verb (the action). Concord means the player and the action agree on who is playing. “The girls plays” is like one player wearing two different jerseys — the grammar tells you something is wrong before you can explain why.',
        },
        example: {
          title: 'The nearest subject rule',
          body:
            'In “Neither the teacher nor the students ___ ready”, the verb agrees with “students”, the subject nearest to it, so we write “were”. But in “Each of the girls ___ a book”, “each” is the real subject and it is singular, so we write “has”. Find the true subject, then match it.',
        },
        worked: [
          {
            question: 'Choose the correct option: If she ______ harder, she would have passed the exam.',
            steps: [
              { label: 'Name the conditional', detail: '“Would have passed” signals the third conditional — an imagined past that did not happen.' },
              { label: 'Recall the pattern', detail: 'Third conditional: If + had + past participle, would have + past participle.' },
              { label: 'Apply it', detail: 'If she had studied harder, she would have passed. “Studied” alone is the second conditional.' },
            ],
            answer: 'had studied',
            why: 'The result clause is already past unreal, so the if-clause must use “had + past participle”.',
          },
          {
            question: 'Choose the correct option: She is used to ______ up early.',
            steps: [
              { label: 'Spot the pattern', detail: '“Be used to” means be accustomed to. Here “to” is a preposition, not part of an infinitive.' },
              { label: 'What follows a preposition?', detail: 'A noun or an -ing form. “I am used to noise” and “I am used to waking early” are both correct.' },
              { label: 'Compare with “used to”', detail: '“I used to wake early” describes a past habit. Do not mix the two patterns.' },
            ],
            answer: 'waking',
            why: '“Be used to” takes an -ing form. “Used to + base verb” is the past-habit pattern.',
          },
          {
            question: 'Choose the correct connective: The rain was heavy; ______, the match continued.',
            steps: [
              { label: 'Find the relationship', detail: 'Heavy rain would normally stop a match, but the match continued. That is contrast.' },
              { label: 'Test contrast words', detail: '“Nevertheless”, “however” and “even so” fit. “Therefore” would mean the match stopped.' },
              { label: 'Check punctuation', detail: 'A semicolon before “nevertheless” and a comma after it is standard.' },
            ],
            answer: 'nevertheless',
            why: 'The two facts pull in opposite directions, so a concessive connector is needed.',
          },
        ],
        deeper: [
          {
            title: 'The number of vs a number of',
            body:
              '“The number of candidates is rising” — “the number” is singular. “A number of candidates are absent” — “a number of” means several, so the verb is plural. One small article changes the grammar underneath.',
          },
          {
            title: 'Dangling modifiers',
            body:
              '“Walking to school, the rain started” suggests the rain was walking. The person doing the action must be the subject of the main clause: “Walking to school, I was caught in the rain.” Examiners test this quietly in sentence-improvement items.',
          },
        ],
        pitfalls: [
          'Matching the verb to the noun nearest the verb instead of to the real subject.',
          'Using the second conditional pattern after “would have” — mixing “if she studied” with “would have passed”.',
          'Putting a plural verb after “the number of”, or a singular verb after “a number of”.',
        ],
        examTip:
          'For any gap, first identify what the gap is doing: a verb, a connector, a preposition or a pronoun. That single step removes half the wrong options before you think about meaning.',
      },
      quiz: [
        {
          id: 'english:structure:q1',
          prompt: 'Neither the teacher nor the students ______ ready for the assembly.',
          options: ['were', 'was', 'is', 'has'],
          answer: 0,
          explanation: 'With “neither … nor”, the verb agrees with the nearer subject. “Students” is plural, so “were” is correct.',
        },
        {
          id: 'english:structure:q2',
          prompt: 'Each of the girls ______ a new exercise book.',
          options: ['has', 'have', 'were given', 'are having'],
          answer: 0,
          explanation: '“Each” is singular, even when followed by “of the girls”. The verb must be “has”.',
        },
        {
          id: 'english:structure:q3',
          prompt: 'The news ______ surprising to everyone in the hall.',
          options: ['was', 'were', 'are', 'have been'],
          answer: 0,
          explanation: '“News” looks plural but is an uncountable singular noun: the news was. Similar nouns: mathematics, measles, furniture.',
        },
        {
          id: 'english:structure:q4',
          prompt: 'Hardly had he sat down ______ the bell rang.',
          options: ['when', 'than', 'then', 'that'],
          answer: 0,
          explanation: '“Hardly … when” is the fixed pair. “No sooner … than” is the other common pattern.',
        },
        {
          id: 'english:structure:q5',
          prompt: 'Choose the correct sentence.',
          options: [
            'Between you and me, the plan needs work.',
            'Between you and I, the plan needs work.',
            'Between yourself and I, the plan needs work.',
            'Between you and myself, the plan needs work.',
          ],
          answer: 0,
          explanation: 'A preposition takes the object form: between you and me. “I” cannot follow a preposition.',
        },
        {
          id: 'english:structure:q6',
          prompt: 'By the time we arrived, the ceremony ______.',
          options: ['had ended', 'has ended', 'was ending', 'ends'],
          answer: 0,
          explanation: 'The past perfect (“had ended”) marks an action completed before another past action.',
        },
      ],
      flashcards: [
        { id: 'english:structure:c1', subject: 'english', topicId: 'english:structure', front: 'Third conditional', back: 'If + had + past participle … would have + past participle.', hint: 'An imagined past that did not happen.' },
        { id: 'english:structure:c2', subject: 'english', topicId: 'english:structure', front: 'Neither … nor', back: 'The verb agrees with the subject nearer to it.', hint: 'Look at the second subject.' },
        { id: 'english:structure:c3', subject: 'english', topicId: 'english:structure', front: 'Be used to', back: 'Be accustomed to + noun/-ing. (“She is used to waking early.”)', hint: 'The “to” is a preposition.' },
        { id: 'english:structure:c4', subject: 'english', topicId: 'english:structure', front: 'The number of / a number of', back: 'The number = singular. A number of = plural.', hint: 'Watch the article.' },
        { id: 'english:structure:c5', subject: 'english', topicId: 'english:structure', front: 'Hardly … when', back: 'Fixed pair: “Hardly had he left when it rained.”', hint: 'Not “than”.' },
        { id: 'english:structure:c6', subject: 'english', topicId: 'english:structure', front: 'Past perfect', back: 'Had + past participle, for the earlier of two past actions.', hint: 'By the time … had …' },
        { id: 'english:structure:c7', subject: 'english', topicId: 'english:structure', front: 'Dangling modifier', back: 'The doer of the opening action must be the subject of the main clause.', hint: '“Walking home, the rain …” is wrong.' },
        { id: 'english:structure:c8', subject: 'english', topicId: 'english:structure', front: 'Uncountable singulars', back: 'News, mathematics, furniture, advice, information take singular verbs.', hint: 'They look plural but are not.' },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'english:comprehension',
      subject: 'english',
      title: 'Comprehension & summary',
      summary:
        'Read with a purpose, answer in your own words, and reduce a passage without losing its meaning.',
      readMinutes: 15,
      difficulty: 'core',
      examWeight: 'Paper 2 — usually 20 comprehension marks + 20 summary marks',
      lesson: {
        bigIdea:
          'Comprehension is not a memory test. It is a search-and-prove task: every answer must be anchored to words in the passage, then restated in your own words.',
        analogy: {
          title: 'Reducing a stew',
          body:
            'A good cook simmers a stew until the water leaves and the flavour stays. A summary does the same: remove examples, repetitions and decoration, but keep every distinct point. If you remove the flavour too, you have written a different dish.',
        },
        example: {
          title: 'From sentence to summary point',
          body:
            'Original: “Because the road was flooded, the traders could not bring their goods to the market, and prices rose sharply.” Summary point: “Flooding prevented supplies, so prices increased.” Same facts, fewer words, no copied phrase.',
        },
        worked: [
          {
            question:
              'Passage: “Ama rises at four each morning to buy tomatoes at the wholesale market. By the time the sun is hot, she has already arranged her stall. She says the early start is not a sacrifice; it is the only way to get the best produce before the big buyers arrive.” Why does Ama start so early?',
            steps: [
              { label: 'Find the exact sentence', detail: 'The reason is in the last sentence: “to get the best produce before the big buyers arrive”.' },
              { label: 'Answer the question asked', detail: 'The question asks why, not what time. Do not waste marks retelling her morning.' },
              { label: 'Restate in your own words', detail: '“So that she can buy the best vegetables before wealthier traders take them.”' },
            ],
            answer:
              'She starts early so she can secure the best produce before the larger buyers reach the market.',
            why: 'A direct quotation can earn the point, but a paraphrased answer shows comprehension and protects you when the wording is awkward.',
          },
          {
            question:
              'Write one summary point for: “Some parents buy expensive phones for children who have no books. Others pay for private lessons but never ask whether the child attends. In both cases, money is spent, but attention is missing.”',
            steps: [
              { label: 'Identify the repeated idea', detail: 'Both examples describe spending without supervision or attention.' },
              { label: 'Drop the examples', detail: 'Phones and private lessons are illustrations, not the point.' },
              { label: 'Compress', detail: '“Parents sometimes spend on children without giving them attention.”' },
            ],
            answer: 'Parents may spend money on their children without giving them attention.',
            why: 'A summary point carries the general truth, not the illustrations used to prove it.',
          },
        ],
        deeper: [
          {
            title: 'Inference is still evidence',
            body:
              'When the question asks what the writer “suggests” or “implies”, the answer is not printed word-for-word. But it must be the only reasonable conclusion from the evidence. If your inference needs outside knowledge the passage did not supply, it is too far away.',
          },
          {
            title: 'The summary word limit is a budget',
            body:
              'If the instruction says “in not more than 60 words”, spend the budget on distinct points, not on introductions. Do not write “The writer says that …”. Start with the point. Join related points with a semicolon or a simple connector.',
          },
        ],
        pitfalls: [
          'Lifting whole sentences instead of compressing them.',
          'Answering with a quotation when the question asks you to explain in your own words.',
          'Repeating the same summary point in different words — examiners count points once.',
        ],
        examTip:
          'Read the questions before the passage. Underline the question words (why, how, what does … suggest). Then read once for the whole meaning, and return to the passage only to prove each answer.',
      },
      quiz: [
        {
          id: 'english:comprehension:q1',
          passage:
            'Ama rises at four each morning to buy tomatoes at the wholesale market. By the time the sun is hot, she has already arranged her stall. She says the early start is not a sacrifice; it is the only way to get the best produce before the big buyers arrive.',
          prompt: 'Why does Ama begin her day so early?',
          options: [
            'To buy the best produce before larger buyers arrive',
            'Because she cannot sleep at night',
            'To avoid paying market tolls',
            'Because her stall opens at four',
          ],
          answer: 0,
          explanation: 'The passage states the reason directly: she wants the best produce before the big buyers.',
        },
        {
          id: 'english:comprehension:q2',
          passage:
            'Ama rises at four each morning to buy tomatoes at the wholesale market. By the time the sun is hot, she has already arranged her stall. She says the early start is not a sacrifice; it is the only way to get the best produce before the big buyers arrive.',
          prompt: 'The phrase “not a sacrifice” suggests that Ama',
          options: [
            'accepts the early start as worthwhile',
            'wishes she could sleep longer',
            'thinks the market is unfair',
            'has no other work to do',
          ],
          answer: 0,
          explanation: 'She reframes the early start as the necessary route to a good outcome, not a loss.',
        },
        {
          id: 'english:comprehension:q3',
          passage:
            'Some parents buy expensive phones for children who have no books. Others pay for private lessons but never ask whether the child attends. In both cases, money is spent, but attention is missing.',
          prompt: 'Which sentence best summarises the writer’s point?',
          options: [
            'Parents sometimes spend money without giving their children attention.',
            'Phones are more useful to children than books.',
            'Private lessons are a waste of money.',
            'Children should not be given expensive gifts.',
          ],
          answer: 0,
          explanation: 'The phones and lessons are examples; the general claim is about spending without attention.',
        },
        {
          id: 'english:comprehension:q4',
          prompt: 'Which of these is the best summary of “The road was flooded, so traders could not bring goods, and prices rose”?',
          options: [
            'Flooding cut off supplies and pushed prices up.',
            'The road was flooded and the traders were unhappy.',
            'Traders could not bring their goods to the market because of the flooded road, and so prices rose sharply.',
            'Prices always rise when it rains heavily in the market.',
          ],
          answer: 0,
          explanation: 'Option A keeps both causal links in far fewer words. Option C is lifted and too close to the original.',
        },
        {
          id: 'english:comprehension:q5',
          prompt: 'In a summary question, which detail should normally be left out?',
          options: [
            'A vivid example used to illustrate the main point',
            'A cause of the main problem',
            'A number of people affected',
            'A consequence of the problem',
          ],
          answer: 0,
          explanation: 'Examples support a point; the point itself earns the summary mark.',
        },
        {
          id: 'english:comprehension:q6',
          prompt: 'The instruction says “in not more than 50 words”. The safest approach is to',
          options: [
            'count your words and cover the required points directly',
            'write as much as possible and cross out later',
            'include an introduction and conclusion',
            'copy the longest sentence from the passage',
          ],
          answer: 0,
          explanation: 'A word limit is a budget. Plan the points first, then count the final answer.',
        },
      ],
      flashcards: [
        { id: 'english:comprehension:c1', subject: 'english', topicId: 'english:comprehension', front: 'Skimming', back: 'Reading quickly for the gist and structure.', hint: 'The whole forest from above.' },
        { id: 'english:comprehension:c2', subject: 'english', topicId: 'english:comprehension', front: 'Scanning', back: 'Moving your eyes to find a specific fact or word.', hint: 'Looking for one tree.' },
        { id: 'english:comprehension:c3', subject: 'english', topicId: 'english:comprehension', front: 'Inference', back: 'A conclusion that follows from evidence but is not stated directly.', hint: 'Evidence first, then the step.' },
        { id: 'english:comprehension:c4', subject: 'english', topicId: 'english:comprehension', front: 'Paraphrase', back: 'Restating the same meaning in different words.', hint: 'Change the clothes, keep the body.' },
        { id: 'english:comprehension:c5', subject: 'english', topicId: 'english:comprehension', front: 'Topic sentence', back: 'The sentence that states a paragraph’s main point.', hint: 'Usually first, sometimes last.' },
        { id: 'english:comprehension:c6', subject: 'english', topicId: 'english:comprehension', front: 'Précis', back: 'A concise, connected summary that keeps the essential meaning.', hint: 'A reduced stew.' },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'english:essay',
      subject: 'english',
      title: 'Essay craft under time',
      summary:
        'Five reliable essay shapes, a five-minute planning method, and paragraphs that earn marks instead of filling pages.',
      readMinutes: 16,
      difficulty: 'core',
      examWeight: 'Paper 2 — one essay, usually 50 of the 100 marks',
      lesson: {
        bigIdea:
          'An essay is an argument with a shape. The examiner is not counting adjectives; they are checking whether your idea develops, your paragraphs hold together, and your register fits the task.',
        analogy: {
          title: 'Building a room',
          body:
            'You cannot start plastering before you know where the door and windows go. Five minutes of planning is the doorway: it stops you from wandering and gives you somewhere to return when you get lost mid-paragraph.',
        },
        example: {
          title: 'A thesis that can carry an essay',
          body:
            'Topic: “The youth have a role in national development.” A weak opening says “Youth are important.” A working thesis says: “Young people contribute to national development not only through labour, but through civic honesty and the pressure they place on institutions to improve.” That sentence gives you three body paragraphs before you write them.',
        },
        worked: [
          {
            question:
              'Plan an argumentative essay: “The use of mobile phones by students does more harm than good.”',
            steps: [
              { label: 'Take a position, not a shrug', detail: 'Decide clearly: agree, disagree, or qualify. “I partly disagree: phones harm when they replace sleep and study, but they help when schools teach disciplined use.”' },
              { label: 'Give each paragraph a job', detail: 'Paragraph 1: the real harm — distraction and sleep. Paragraph 2: the hidden benefit — access to past papers and explanations. Paragraph 3: the deciding condition — rules and self-discipline. Conclusion: harm is not in the phone but in unmanaged use.' },
              { label: 'Choose evidence you can actually write', detail: 'Use a school rule, a personal observation, a familiar Ghanaian example. Do not invent statistics.' },
            ],
            answer:
              'A qualified position with three body paragraphs: harm, benefit, and the condition that decides which wins.',
            why: 'A qualified thesis is often stronger than a blunt one because it shows judgement. It also gives you more to say without repeating yourself.',
          },
          {
            question: 'Write the opening and closing moves for a formal letter to the District Chief Executive about poor drainage.',
            steps: [
              { label: 'Use the correct frame', detail: 'Formal letter: your address, date, recipient’s address, salutation “Dear Sir/Madam”, heading, body, “Yours faithfully”, full name.' },
              { label: 'Open with purpose, not weather', detail: '“I write to bring to your attention the condition of the drainage system in Kabete, and to suggest three practical remedies.”' },
              { label: 'Close with a specific request', detail: '“I would be grateful for the opportunity to meet your works department on site. Thank you.”' },
            ],
            answer:
              'A purpose-led opening, three developed body paragraphs (problem, cause, solution), and a courteous, specific request to act.',
            why: 'Formal letters earn marks for format, but the content marks come from developed points and a clear request.',
          },
        ],
        deeper: [
          {
            title: 'PEEL is a floor, not a ceiling',
            body:
              'Point, Evidence, Explanation, Link. It keeps a paragraph honest. Stronger paragraphs add a small complication: “This is true for urban students; in rural areas, where coverage is poor, the problem is access rather than distraction.” That sentence shows you can see past your own first answer.',
          },
          {
            title: 'Show, do not announce',
            body:
              'Instead of “I was very nervous”, write “My thumb left a smudge on the admission letter before I could read my own name.” One concrete detail does more work than three adjectives. Use this sparingly in narrative essays; it also strengthens examples in argumentative ones.',
          },
        ],
        pitfalls: [
          'Writing an introduction that fills half a page and says nothing.',
          'Using a narrative when the question asks for an argument (or the reverse).',
          'Starting every paragraph with the same word — “Also … Also … Also …”.',
          'Forgetting the format marks on letters, speeches and articles.',
        ],
        examTip:
          'Spend five minutes planning, twenty-five minutes writing, five minutes checking. Leave the hardest body paragraph for second, not last, so your energy is still fresh. If you run out of time, finish the paragraph you are in — an unfinished essay loses more than a short one.',
      },
      quiz: [
        {
          id: 'english:essay:q1',
          prompt: 'What is the main job of a thesis statement?',
          options: [
            'To state the central claim the essay will develop',
            'To announce that you are going to write an essay',
            'To provide a dictionary definition of the topic',
            'To summarise every paragraph before writing',
          ],
          answer: 0,
          explanation: 'A thesis is the controlling claim. It should be specific enough to shape the body paragraphs.',
        },
        {
          id: 'english:essay:q2',
          prompt: 'Which opening best fits a formal letter to a headmaster?',
          options: [
            'I write to bring to your attention the condition of the school library.',
            'How are you, sir? Hope all is well with you and your family.',
            'It is with great pleasure that I take my pen in hand today.',
            'You will not believe what happened at school last week.',
          ],
          answer: 0,
          explanation: 'Formal letters go straight to purpose. The other openings are conversational, padded or informal.',
        },
        {
          id: 'english:essay:q3',
          prompt: 'A body paragraph is strongest when it',
          options: [
            'makes one point and supports it with evidence and explanation',
            'lists as many ideas as possible',
            'repeats the introduction in different words',
            'ends with a quotation regardless of relevance',
          ],
          answer: 0,
          explanation: 'One clear point, support, explanation and a link back to the argument. Unity earns marks.',
        },
        {
          id: 'english:essay:q4',
          prompt: 'For a speech to fellow students, the most appropriate register is',
          options: [
            'direct, energetic and respectful',
            'heavily legal and impersonal',
            'full of slang and insults',
            'archaic and ceremonial',
          ],
          answer: 0,
          explanation: 'Register is the match between language and audience. Peers call for energy, but the school setting still calls for respect.',
        },
        {
          id: 'english:essay:q5',
          prompt: 'Why is a five-minute plan worth the exam time?',
          options: [
            'It gives the essay a structure and reduces mid-essay wandering',
            'It is required by the examiner',
            'It allows you to write less content',
            'It guarantees a high mark',
          ],
          answer: 0,
          explanation: 'Planning protects coherence. It does not guarantee marks, but it prevents the most common self-inflicted damage.',
        },
        {
          id: 'english:essay:q6',
          prompt: 'Which ending is most effective for an argumentative essay?',
          options: [
            'A return to the thesis with the strongest consequence stated plainly',
            'A completely new argument that surprises the reader',
            'An apology for not having enough time',
            'A long quotation with no explanation',
          ],
          answer: 0,
          explanation: 'A conclusion should close the argument, not open a new one. Return to the claim and show why it matters.',
        },
      ],
      flashcards: [
        { id: 'english:essay:c1', subject: 'english', topicId: 'english:essay', front: 'Thesis', back: 'The central, arguable claim that controls the whole essay.', hint: 'Not a topic; a position.' },
        { id: 'english:essay:c2', subject: 'english', topicId: 'english:essay', front: 'PEEL', back: 'Point, Evidence, Explanation, Link.', hint: 'A paragraph checklist.' },
        { id: 'english:essay:c3', subject: 'english', topicId: 'english:essay', front: 'Register', back: 'The level of language that suits the audience and occasion.', hint: 'A speech to peers is not a legal contract.' },
        { id: 'english:essay:c4', subject: 'english', topicId: 'english:essay', front: 'Topic sentence', back: 'The sentence that announces a paragraph’s single point.', hint: 'The paragraph’s roof.' },
        { id: 'english:essay:c5', subject: 'english', topicId: 'english:essay', front: 'Qualified thesis', back: 'A claim that accepts a limited exception while still taking a side.', hint: '“Yes, but only when …”' },
        { id: 'english:essay:c6', subject: 'english', topicId: 'english:essay', front: 'Formal letter close', back: '“Yours faithfully” + full name (when salutation is “Dear Sir/Madam”).', hint: 'Faithfully pairs with no name.' },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'english:orals',
      subject: 'english',
      title: 'Oral English: sound and stress',
      summary:
        'Minimal pairs, vowel sounds, word stress and intonation — the listening paper, made visible.',
      readMinutes: 11,
      difficulty: 'foundation',
      examWeight: 'Paper 3 — 60 items, 45 minutes (where entered)',
      lesson: {
        bigIdea:
          'English spelling is a poor map of English sound. Oral questions test whether you can hear the difference, not whether you can spell the word.',
        analogy: {
          title: 'Two doors, one corridor',
          body:
            '“Ship” and “sheep” look almost the same on paper, but they open different doors in the ear. A short /ɪ/ versus a long /iː/ changes the word completely. The oral paper is a corridor of near-identical doors, and the examiner asks which one you actually heard.',
        },
        example: {
          title: 'Stress changes the word',
          body:
            'PHO-to-graph, pho-TO-gra-pher, pho-TO-gra-phy. The stress moves and the vowels change with it. If you learn the stress pattern of a word family, you unlock four pronunciations at once.',
        },
        worked: [
          {
            question: 'Which word contains the same vowel sound as “seat”?',
            steps: [
              { label: 'Say the target aloud', detail: '“Seat” has a long /iː/ — the tongue is high and forward, and the sound stretches.' },
              { label: 'Test each option', detail: 'Sit = short /ɪ/; set = /e/; sat = /æ/; seat = /iː/.' },
              { label: 'Match length and tongue position', detail: 'Only “seat” has the long, tense vowel.' },
            ],
            answer: 'seat',
            why: 'Minimal pairs differ in one sound. Slow down and compare the length and jaw position, not the spelling.',
          },
          {
            question: 'Where is the main stress in “education”?',
            steps: [
              { label: 'Say it naturally', detail: 'e-du-CA-tion. The voice lifts on the third syllable.' },
              { label: 'Count the syllables', detail: 'Four: e / du / ca / tion. The third is strongest.' },
              { label: 'Check the family', detail: 'ED-u-cate, ed-u-CA-tion. The stress shifts in the longer word.' },
            ],
            answer: 'Third syllable.',
            why: 'Suffixes often pull stress forward. Learn the word family, not the single word.',
          },
        ],
        deeper: [
          {
            title: 'Falling and rising tunes',
            body:
              'Wh-questions usually fall at the end (“Where are you going?”). Yes/no questions usually rise (“Are you coming?”). Lists rise on each item and fall on the last. Intonation questions ask you to hear the speaker’s purpose, not just the words.',
          },
          {
            title: 'Ghanaian English is not “wrong English”',
            body:
              'The oral paper tests a standard accent for examination purposes. That does not make your everyday pronunciation a personal failure. Learn the contrast the paper asks for, then keep your own voice. Exam accuracy and identity are not opposites.',
          },
        ],
        pitfalls: [
          'Judging sound from spelling — “colonel”, “choir” and “queue” all disobey the letters.',
          'Mixing /ɪ/ and /iː/ in pairs such as sit/seat and live/leave.',
          'Putting stress on the first syllable of every long word.',
        ],
        examTip:
          'If you cannot hear a contrast, exaggerate it once, slowly, then return to normal speed. In a listening paper, read the options before the recording so your ear knows what it is hunting for.',
      },
      quiz: [
        {
          id: 'english:orals:q1',
          prompt: 'Which word contains the same vowel sound as “seat”?',
          options: ['sit', 'set', 'sat', 'seat'],
          answer: 3,
          explanation: '“Seat” has the long /iː/. “Sit” is the short /ɪ/; the others are different vowels entirely.',
        },
        {
          id: 'english:orals:q2',
          prompt: 'Which pair differs only in the initial consonant sound?',
          options: ['think / tink', 'seat / seed', 'cat / dog', 'book / look'],
          answer: 0,
          explanation: '“Think” begins with /θ/ and “tink” with /t/. The other pairs differ in more than one sound or are not minimal pairs.',
        },
        {
          id: 'english:orals:q3',
          prompt: 'Where is the main stress in “photography”?',
          options: ['First syllable', 'Second syllable', 'Third syllable', 'Fourth syllable'],
          answer: 1,
          explanation: 'pho-TOG-ra-phy — the stress falls on the second syllable. Compare PHO-to-graph.',
        },
        {
          id: 'english:orals:q4',
          prompt: 'Which sentence normally ends with a rising intonation?',
          options: ['Are you coming with us?', 'Where are you going?', 'Sit down.', 'What a beautiful day!'],
          answer: 0,
          explanation: 'Yes/no questions typically rise. Wh-questions and statements typically fall.',
        },
        {
          id: 'english:orals:q5',
          prompt: 'Which word has the same vowel sound as “cup”?',
          options: ['cap', 'cop', 'luck', 'keep'],
          answer: 2,
          explanation: '“Cup” and “luck” share the short /ʌ/ vowel. “Cap” is /æ/, “cop” is /ɒ/, “keep” is /iː/.',
        },
        {
          id: 'english:orals:q6',
          prompt: 'The main stress in “record” as a noun is on the',
          options: ['first syllable', 'second syllable', 'last syllable', 'no fixed syllable'],
          answer: 0,
          explanation: 'Noun RE-cord; verb re-CORD. Several two-syllable words shift stress between noun and verb.',
        },
      ],
      flashcards: [
        { id: 'english:orals:c1', subject: 'english', topicId: 'english:orals', front: '/iː/ vs /ɪ/', back: 'Long tense “seat” vs short relaxed “sit”.', hint: 'Length and tension.' },
        { id: 'english:orals:c2', subject: 'english', topicId: 'english:orals', front: 'Minimal pair', back: 'Two words that differ by one sound, e.g. ship/sheep.', hint: 'One door changes.' },
        { id: 'english:orals:c3', subject: 'english', topicId: 'english:orals', front: 'Rising intonation', back: 'Usually yes/no questions and unfinished lists.', hint: 'The voice climbs.' },
        { id: 'english:orals:c4', subject: 'english', topicId: 'english:orals', front: 'Falling intonation', back: 'Usually statements, commands and wh-questions.', hint: 'The voice settles.' },
        { id: 'english:orals:c5', subject: 'english', topicId: 'english:orals', front: 'Word stress', back: 'The syllable said with the most force and clearest vowel.', hint: 'PHO-to-graph.' },
        { id: 'english:orals:c6', subject: 'english', topicId: 'english:orals', front: '/θ/', back: 'The voiceless “th” in think, bath, author.', hint: 'Tongue between the teeth, no buzz.' },
      ],
    },
  ],
};
