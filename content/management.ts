import type { SubjectMeta } from '@/lib/types';

/**
 * Management in Living.
 *
 * There is no MIL past paper in the source folder, only the WAEC Home
 * Economics timetable. So this subject is honest about its evidence: lessons
 * and practice questions are original, built from the WAEC MIL syllabus
 * areas, and grounded in Ghanaian household contexts. Nothing here is
 * presented as a past paper.
 */

export const management: SubjectMeta = {
  id: 'management',
  name: 'Management in Living',
  shortName: 'MIL',
  priority: 2,
  accent: 'gold',
  tagline: 'The subject that makes daily life make sense.',
  description:
    'Family living, money, food, clothing and consumer choices — taught through real Ghanaian households, budgets and decisions rather than definitions to memorise.',
  examShape: [
    'Typically an objective paper plus structured/essay questions',
    'Questions ask you to apply knowledge to a family situation, not just name a nutrient',
    'Paper structure can vary by entry — confirm with your WAEC timetable',
  ],
  passNote:
    'You already manage a household in your head every day. This subject gives that instinct a vocabulary and a structure.',
  paperUrl: '/papers/management/waec-2026-timetable.pdf',
  paperLabel: 'WAEC 2026 Home Economics timetable (not a question paper)',
  paperSource: 'Management in Living/WASSCE/Home_Economics_WAEC_2026_Timetable.pdf',
  topics: [
    /* ------------------------------------------------------------------ */
    {
      id: 'management:family',
      subject: 'management',
      title: 'Family & family living',
      summary:
        'Family types, functions, the life cycle, changing roles and the everyday work of keeping a household emotionally steady.',
      readMinutes: 12,
      difficulty: 'foundation',
      examWeight: 'Core — family questions appear in every section',
      lesson: {
        bigIdea:
          'A family is not just a list of relatives. It is a small system that meets needs: shelter, food, belonging, safety, identity and care across generations.',
        analogy: {
          title: 'A football team',
          body:
            'A team has a formation, but the formation changes when a player is injured or a new one joins. The family is the same: the nuclear family, the extended family and the single-parent family are different formations for the same job — helping members survive and belong. No formation is automatically better; what matters is whether the needs are being met.',
        },
        example: {
          title: 'Support with boundaries',
          body:
            'An extended family may pay a child’s school fees, which is a genuine strength. But if every decision about the child is made by relatives without the parent, support becomes interference. The skill is not choosing between “extended” and “nuclear”; it is agreeing who decides what.',
        },
        worked: [
          {
            question:
              'A household consists of a mother, her two children, and her sister’s daughter who lives with them. Identify the family type and explain one strength and one challenge.',
            steps: [
              { label: 'Count the structure, not the love', detail: 'There is one parent in the household, plus children and a niece. This is a single-parent household with extended-family members.' },
              { label: 'Name a strength', detail: 'Shared care: the cousin can help with younger children, and the aunt has another adult presence in the home.' },
              { label: 'Name a challenge', detail: 'Resources and authority may be unclear — who pays for the niece’s needs, and who disciplines whom?' },
            ],
            answer:
              'Single-parent, extended household. Strength: shared care and companionship. Challenge: unclear roles and extra financial pressure.',
            why: 'MIL marks reward specific application, not a label alone. Always attach the strength or challenge to the actual household.',
          },
          {
            question:
              'A couple both work long hours and argue about housework. Suggest two practical ways to manage the conflict.',
            steps: [
              { label: 'Separate the problem from the person', detail: 'The issue is the distribution of tasks and time, not who is “lazy” or “selfish”.' },
              { label: 'Make the invisible work visible', detail: 'List every task — cooking, laundry, school runs, bill payments, caring for an elderly parent — and mark who does it and how long it takes.' },
              { label: 'Agree a fair rule, then review it', detail: 'For example, whoever cooks does not wash; or hire help for one task if the budget allows. Review after two weeks.' },
            ],
            answer:
              'List and share tasks openly, then agree a fair division and review it. Address the system, not each other’s character.',
            why: 'Conflict resolution in MIL is practical: identify the need, communicate, negotiate, and check whether the agreement actually works.',
          },
        ],
        deeper: [
          {
            title: 'The family life cycle',
            body:
              'Beginning (new couple), expanding (children arrive), contracting (children leave), and ageing (retirement, dependence). Each stage changes the budget, the time available and the care needed. A question may ask why a family’s needs change over time — the life cycle is your framework.',
          },
          {
            title: 'Changing roles are not a crisis',
            body:
              'More women earn income and more men take part in childcare than in the past. MIL does not ask you to approve or disapprove; it asks you to analyse the effects on time, money, decision-making and relationships. Use neutral, specific language.',
          },
        ],
        pitfalls: [
          'Defining a family only as a married couple with children — the syllabus includes single-parent, extended, childless and blended families.',
          'Listing functions of the family without linking them to an example.',
          'Treating “extended family” as automatically good or automatically interfering.',
        ],
        examTip:
          'For any family question, use the formula: name it → explain the need it meets → give one strength → give one challenge → suggest a practical action. That is a complete answer.',
      },
      quiz: [
        {
          id: 'management:family:q1',
          prompt: 'Which of these is a function of the family?',
          options: ['Socialising children', 'Manufacturing cement', 'Running a national election', 'Fixing market prices'],
          answer: 0,
          explanation: 'The family teaches norms, language and values — socialisation. The other options belong to industry or government.',
        },
        {
          id: 'management:family:q2',
          prompt: 'A household made up of a mother, her children, and her mother living together is best described as',
          options: ['an extended family', 'a nuclear family', 'a childless family', 'a blended family'],
          answer: 0,
          explanation: 'More than two generations or additional relatives living together indicates an extended family household.',
        },
        {
          id: 'management:family:q3',
          prompt: 'During the contracting stage of the family life cycle,',
          options: ['children begin to leave home', 'the couple first marries', 'the first child is born', 'all children are under five'],
          answer: 0,
          explanation: 'The contracting stage is when children grow up and leave to start their own households.',
        },
        {
          id: 'management:family:q4',
          prompt: 'The best first step in resolving a family disagreement is to',
          options: ['listen to each person’s concern', 'decide who is right', 'avoid the topic', 'involve as many relatives as possible'],
          answer: 0,
          explanation: 'Communication starts with listening. Deciding who is right before understanding the need escalates conflict.',
        },
        {
          id: 'management:family:q5',
          prompt: 'Which is an economic function of the family?',
          options: ['Providing food and shelter', 'Teaching a child to read', 'Celebrating a naming ceremony', 'Passing on religious beliefs'],
          answer: 0,
          explanation: 'The family’s economic function covers meeting material needs such as food, shelter and clothing.',
        },
        {
          id: 'management:family:q6',
          prompt: 'Responsible parenthood primarily means',
          options: [
            'meeting a child’s physical, emotional and educational needs',
            'buying every item a child asks for',
            'leaving discipline to the school',
            'having as many children as possible',
          ],
          answer: 0,
          explanation: 'Responsible parenthood is holistic: food, safety, love, guidance, education and health.',
        },
      ],
      flashcards: [
        { id: 'management:family:c1', subject: 'management', topicId: 'management:family', front: 'Nuclear family', back: 'Two parents (or one) and their dependent children in one household.', hint: 'The basic formation.' },
        { id: 'management:family:c2', subject: 'management', topicId: 'management:family', front: 'Extended family', back: 'Relatives beyond the nuclear unit living together or sharing responsibility.', hint: 'More than two generations.' },
        { id: 'management:family:c3', subject: 'management', topicId: 'management:family', front: 'Family functions', back: 'Reproduction, socialisation, economic support, emotional security, protection.', hint: 'Five jobs.' },
        { id: 'management:family:c4', subject: 'management', topicId: 'management:family', front: 'Life cycle stages', back: 'Beginning → expanding → contracting → ageing.', hint: 'The household changes shape.' },
        { id: 'management:family:c5', subject: 'management', topicId: 'management:family', front: 'Blended family', back: 'A household formed when parents remarry and bring children from earlier relationships.', hint: 'Two families, one home.' },
        { id: 'management:family:c6', subject: 'management', topicId: 'management:family', front: 'Responsible parenthood', back: 'Meeting physical, emotional, educational and health needs — not just providing money.', hint: 'Care, not only cash.' },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'management:resources',
      subject: 'management',
      title: 'Resources, decisions & budgeting',
      summary:
        'Needs versus wants, the management process, time as a resource, and a household budget that survives the month.',
      readMinutes: 14,
      difficulty: 'core',
      examWeight: 'Very high — budgeting scenarios are a favourite',
      lesson: {
        bigIdea:
          'Management is choosing well with limited resources. Every choice costs something you could have done instead — that is opportunity cost, and it is the quiet engine of the whole subject.',
        analogy: {
          title: 'A suitcase for a journey',
          body:
            'You cannot pack the whole wardrobe. You choose what the journey actually needs, leave space for essentials, and accept that the shoes you leave behind are the cost of the coat you take. A family budget is a suitcase: income is the size, needs are the essentials, and savings are the space you protect for emergencies.',
        },
        example: {
          title: 'Needs and wants are not moral labels',
          body:
            'A phone can be a want for entertainment or a need for work and school. The category depends on the household’s situation, not the object. What matters is that the family names the reason and agrees on priorities before the money is spent.',
        },
        worked: [
          {
            question:
              'A family earns GHS 1,800 a month. Rent is GHS 500, food GHS 600, transport GHS 180, utilities GHS 150, school costs GHS 200, savings GHS 100 and other expenses GHS 70. Check the budget and comment on it.',
            steps: [
              { label: 'Add the expenditure', detail: '500 + 600 + 180 + 150 + 200 + 100 + 70 = 1,800.' },
              { label: 'Check the balance', detail: 'Income − expenditure = 1,800 − 1,800 = 0. The budget is balanced but has no unallocated margin.' },
              { label: 'Calculate the savings rate', detail: '100 ÷ 1,800 × 100 ≈ 5.6%. That is thin for emergencies.' },
              { label: 'Suggest one adjustment', detail: 'Reduce “other expenses” to 40 and move GHS 30 to savings, or negotiate one utility. Protect the savings before spending.' },
            ],
            answer:
              'A balanced budget with about 5.6% savings. It works, but it is fragile; build a larger emergency buffer.',
            why: 'A budget that adds up is not automatically a good budget. Examine savings, flexibility and the risk of one unexpected cost.',
          },
          {
            question:
              'A student has GHS 50 and two options: buy a data bundle for online lessons or buy a new phone case. Explain the opportunity cost of buying the case.',
            steps: [
              { label: 'Define opportunity cost', detail: 'The value of the next best alternative you give up.' },
              { label: 'Identify the next best alternative', detail: 'The data bundle and the lessons it makes possible.' },
              { label: 'State the cost', detail: 'The cost is not only GHS 50; it is the lessons she cannot access this week.' },
            ],
            answer:
              'The opportunity cost is the online lessons she loses by spending the money on the case.',
            why: 'Opportunity cost is about what is sacrificed, not just the money spent.',
          },
          {
            question:
              'A learner studies for six hours but spends two of them switching between WhatsApp and her notes. Suggest a time-management plan.',
            steps: [
              { label: 'Measure the real time', detail: 'Four focused hours, not six. The phone is costing 33% of her study time.' },
              { label: 'Use a simple structure', detail: '25 minutes of study, 5 minutes of break; phone in another room or on airplane mode.' },
              { label: 'Protect the hardest task', detail: 'Put maths practice in the first block, when attention is freshest; leave revision for later.' },
            ],
            answer:
              'Use timed study blocks, remove the phone from reach, and schedule the hardest subject first.',
            why: 'Time management is not about finding more hours; it is about reducing the cost of interruption.',
          },
        ],
        deeper: [
          {
            title: 'The management process',
            body:
              'Planning (what needs to be done), organising (who and what is needed), implementing (doing it), and evaluating (did it work?). Most exam scenarios can be answered by walking through these four steps. “We planned, but did not evaluate” is itself a useful diagnosis.',
          },
          {
            title: 'Human resources are resources too',
            body:
              'Time, energy, skills, health and cooperation are human resources. A family with little money may still have strong skills: a grandmother who cooks, a brother who repairs phones, a neighbour who shares transport. Good management uses what exists before complaining about what is missing.',
          },
        ],
        pitfalls: [
          'Calling every want a need, or shaming every want as wasteful.',
          'Making a budget that does not add up, or forgetting irregular costs such as school fees and repairs.',
          'Confusing opportunity cost with the price paid.',
          'Suggesting “spend less” without naming the specific item and the consequence.',
        ],
        examTip:
          'For budgeting questions, show three lines: total income, total expenditure, and the balance. Then add one sentence of judgement. The arithmetic earns method marks; the judgement earns the application marks.',
      },
      quiz: [
        {
          id: 'management:resources:q1',
          prompt: 'Which of these is a human resource in the family?',
          options: ['A person’s skill in baking', 'A cooking pot', 'A bank account', 'A piece of land'],
          answer: 0,
          explanation: 'Human resources are the abilities, time, energy and skills of people. Pots, money and land are non-human resources.',
        },
        {
          id: 'management:resources:q2',
          prompt: 'Opportunity cost is best defined as',
          options: [
            'the value of the next best alternative given up',
            'the total amount of money spent',
            'the price of the most expensive item',
            'the amount saved each month',
          ],
          answer: 0,
          explanation: 'Every choice sacrifices an alternative; opportunity cost measures that sacrifice.',
        },
        {
          id: 'management:resources:q3',
          prompt: 'A family’s income is GHS 2,000 and expenditure is GHS 2,150. The family has',
          options: ['a deficit of GHS 150', 'a surplus of GHS 150', 'a balanced budget', 'saved GHS 150'],
          answer: 0,
          explanation: 'Expenditure exceeds income by 150, so the budget is in deficit.',
        },
        {
          id: 'management:resources:q4',
          prompt: 'Which step comes immediately after choosing between alternatives in decision making?',
          options: ['Implementing the choice', 'Ignoring the outcome', 'Listing every want', 'Borrowing money'],
          answer: 0,
          explanation: 'The decision cycle is: identify the problem, list alternatives, weigh consequences, choose, implement, evaluate.',
        },
        {
          id: 'management:resources:q5',
          prompt: 'The best way to protect savings in a tight budget is to',
          options: [
            'set aside savings before discretionary spending',
            'save whatever is left at the end of the month',
            'borrow to save',
            'spend first and record later',
          ],
          answer: 0,
          explanation: 'Paying savings first treats it as a priority. “Whatever is left” is usually nothing.',
        },
        {
          id: 'management:resources:q6',
          prompt: 'A timetable mainly helps a student to',
          options: [
            'allocate limited time to tasks by priority',
            'avoid all housework',
            'study only when motivated',
            'finish everything at once',
          ],
          answer: 0,
          explanation: 'A timetable is a planning tool: it matches fixed time to competing tasks and makes trade-offs visible.',
        },
      ],
      flashcards: [
        { id: 'management:resources:c1', subject: 'management', topicId: 'management:resources', front: 'Opportunity cost', back: 'The value of the next best alternative you give up.', hint: 'What the choice costs, beyond money.' },
        { id: 'management:resources:c2', subject: 'management', topicId: 'management:resources', front: 'Management process', back: 'Plan → organise → implement → evaluate.', hint: 'Four verbs.' },
        { id: 'management:resources:c3', subject: 'management', topicId: 'management:resources', front: 'Balanced budget', back: 'Income equals expenditure; no deficit and no surplus.', hint: 'Zero at the bottom.' },
        { id: 'management:resources:c4', subject: 'management', topicId: 'management:resources', front: 'Human resources', back: 'Time, energy, skills, health and cooperation of people.', hint: 'What people bring.' },
        { id: 'management:resources:c5', subject: 'management', topicId: 'management:resources', front: 'Savings rate', back: '(Savings ÷ income) × 100.', hint: 'A percentage, not a cedi amount.' },
        { id: 'management:resources:c6', subject: 'management', topicId: 'management:resources', front: 'Priority setting', back: 'Ranking needs by urgency and importance before spending.', hint: 'Needs before wants.' },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'management:nutrition',
      subject: 'management',
      title: 'Food & nutrition',
      summary:
        'The six nutrient groups, what they do, where to find them locally, and how to plan a balanced day on a real budget.',
      readMinutes: 15,
      difficulty: 'core',
      examWeight: 'High — nutrients, deficiencies and meal planning',
      lesson: {
        bigIdea:
          'Food is not just “something that fills the stomach”. It is a delivery system for nutrients the body cannot make for itself, in the amounts it needs.',
        analogy: {
          title: 'Building a house',
          body:
            'Carbohydrates and fats are the fuel that keeps the builders working. Proteins are the bricks and labour that build and repair. Vitamins and minerals are the supervisors and tools — needed in tiny amounts, but without them the building develops faults. Water is the cement mixer and transport system. Fibre is the scaffolding that keeps everything moving.',
        },
        example: {
          title: 'A local balanced plate',
          body:
            'Banku or rice for energy, grilled tilapia or beans for protein, kontomire or okro for vitamins and minerals, a little palm oil for fat, and an orange for vitamin C. Nothing imported is required. Balance is about variety and proportion, not expense.',
        },
        worked: [
          {
            question:
              'A child is tired, has swollen ankles and a distended abdomen, and eats mostly starchy foods with very little protein. Identify the likely deficiency and suggest two local improvements.',
            steps: [
              { label: 'Read the signs', detail: 'Oedema (swelling), a distended abdomen and poor growth are classic signs of kwashiorkor — protein-energy malnutrition with enough energy but too little protein.' },
              { label: 'Name the nutrient gap', detail: 'Protein, especially the essential amino acids needed for growth and repair.' },
              { label: 'Suggest affordable local protein', detail: 'Beans, groundnuts, eggs, small fish, soya, milk or powdered milk. Add one protein food to each main meal rather than only at dinner.' },
            ],
            answer:
              'Likely kwashiorkor. Add affordable protein such as beans, eggs, small fish or groundnuts to daily meals, and seek health-worker advice.',
            why: 'MIL expects the nutrient, the deficiency and a practical food solution — not a medical diagnosis.',
          },
          {
            question:
              'Plan a day’s meals for a teenage girl using local foods, with at least one source of iron and one of vitamin C.',
            steps: [
              { label: 'Breakfast', detail: 'Koko (millet porridge) with groundnut paste and a banana; water.' },
              { label: 'Lunch', detail: 'Waakye with beans, a boiled egg and a small serving of kontomire; an orange.' },
              { label: 'Supper', detail: 'Banku with grilled tilapia and okro stew; pawpaw.' },
              { label: 'Check the nutrients', detail: 'Iron from beans, egg and kontomire; vitamin C from the orange and pawpaw, which also helps iron absorption.' },
            ],
            answer:
              'Koko + groundnut + banana; waakye + egg + kontomire + orange; banku + tilapia + okro + pawpaw.',
            why: 'A meal plan is marked on variety, local availability, balance and a clear link between foods and nutrients.',
          },
          {
            question:
              'Why is vitamin C important at the same meal as iron-rich foods?',
            steps: [
              { label: 'Know the role of vitamin C', detail: 'It supports immunity, skin and wound healing, and helps the body absorb non-haem iron from plant foods.' },
              { label: 'Apply it', detail: 'Beans and kontomire contain iron; an orange or tomato at the same meal improves absorption.' },
              { label: 'Avoid the blocker', detail: 'Tea and coffee contain tannins that reduce iron absorption, so avoid them immediately with meals.' },
            ],
            answer:
              'Vitamin C improves absorption of plant iron, so pairing beans or kontomire with orange or tomato is smart.',
            why: 'This is the kind of applied link that turns a list of nutrients into a real answer.',
          },
        ],
        deeper: [
          {
            title: 'Deficiency names worth knowing',
            body:
              'Kwashiorkor — protein deficiency with oedema. Marasmus — severe energy and protein deficiency with wasting. Anaemia — iron deficiency, causing tiredness and pallor. Rickets — vitamin D/calcium, causing soft bones. Scurvy — vitamin C, causing bleeding gums. Beri-beri — vitamin B1 (thiamine), affecting nerves. Night blindness — vitamin A.',
          },
          {
            title: 'Needs change across life',
            body:
              'A pregnant woman needs more iron, folate and calcium. A growing adolescent needs protein and iron. An older person may need fewer calories but more calcium and vitamin D. “Balanced diet” is not one plate for every person at every stage.',
          },
        ],
        pitfalls: [
          'Saying “vitamins give energy” — energy comes mainly from carbohydrates and fats.',
          'Confusing kwashiorkor (oedema) with marasmus (wasting).',
          'Planning expensive imported meals when local foods would meet the same need.',
          'Listing nutrients without naming a local source.',
        ],
        examTip:
          'Use the chain: nutrient → function → local source → deficiency. Four links, one mark each. It works for almost every nutrition question.',
      },
      quiz: [
        {
          id: 'management:nutrition:q1',
          prompt: 'Which nutrient is the body’s main source of quick energy?',
          options: ['Carbohydrates', 'Proteins', 'Vitamins', 'Minerals'],
          answer: 0,
          explanation: 'Carbohydrates are broken down into glucose, the body’s preferred quick fuel.',
        },
        {
          id: 'management:nutrition:q2',
          prompt: 'Kwashiorkor is mainly caused by a deficiency of',
          options: ['protein', 'vitamin C', 'iron', 'calcium'],
          answer: 0,
          explanation: 'Kwashiorkor is protein-energy malnutrition marked by oedema and a distended abdomen.',
        },
        {
          id: 'management:nutrition:q3',
          prompt: 'Which local food is the richest source of iron?',
          options: ['Kontomire (dark green leaves)', 'White rice', 'Cassava', 'Pawpaw'],
          answer: 0,
          explanation: 'Dark green leafy vegetables such as kontomire are good plant sources of iron.',
        },
        {
          id: 'management:nutrition:q4',
          prompt: 'Scurvy is caused by a lack of',
          options: ['vitamin C', 'vitamin A', 'protein', 'fibre'],
          answer: 0,
          explanation: 'Vitamin C deficiency causes scurvy — bleeding gums, poor wound healing and tiredness.',
        },
        {
          id: 'management:nutrition:q5',
          prompt: 'Which meal combination best improves iron absorption?',
          options: [
            'Beans with tomatoes and orange',
            'Beans with strong tea',
            'Rice with white bread',
            'Cassava with coffee',
          ],
          answer: 0,
          explanation: 'Vitamin C (tomato, orange) improves absorption of plant iron; tannins in tea and coffee reduce it.',
        },
        {
          id: 'management:nutrition:q6',
          prompt: 'The main function of dietary fibre is to',
          options: [
            'help food move through the digestive system',
            'build muscle',
            'supply most of the body’s energy',
            'replace vitamin C',
          ],
          answer: 0,
          explanation: 'Fibre adds bulk, prevents constipation and supports gut health. It is not a major energy source.',
        },
      ],
      flashcards: [
        { id: 'management:nutrition:c1', subject: 'management', topicId: 'management:nutrition', front: 'Carbohydrates', back: 'Main energy source. Sources: rice, banku, yam, plantain.', hint: 'Fuel.' },
        { id: 'management:nutrition:c2', subject: 'management', topicId: 'management:nutrition', front: 'Proteins', back: 'Growth and repair. Sources: beans, fish, eggs, milk, groundnuts.', hint: 'Bricks.' },
        { id: 'management:nutrition:c3', subject: 'management', topicId: 'management:nutrition', front: 'Kwashiorkor', back: 'Protein deficiency with oedema and a distended abdomen.', hint: 'Swelling, not just thinness.' },
        { id: 'management:nutrition:c4', subject: 'management', topicId: 'management:nutrition', front: 'Marasmus', back: 'Severe deficiency of energy and protein, with wasting.', hint: 'The body eats itself.' },
        { id: 'management:nutrition:c5', subject: 'management', topicId: 'management:nutrition', front: 'Vitamin C', back: 'Immunity, wound healing, iron absorption. Sources: citrus, pawpaw, tomato.', hint: 'Pairs with iron.' },
        { id: 'management:nutrition:c6', subject: 'management', topicId: 'management:nutrition', front: 'Balanced diet', back: 'The right proportions of all nutrients for a person’s age, stage and activity.', hint: 'Variety and proportion.' },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'management:foodprep',
      subject: 'management',
      title: 'Food preparation, safety & preservation',
      summary:
        'Cooking methods that keep nutrients, storage that prevents illness, and preservation that stretches a household’s money.',
      readMinutes: 13,
      difficulty: 'core',
      examWeight: 'Regular structured questions on methods and hygiene',
      lesson: {
        bigIdea:
          'How you cook can matter as much as what you cook. Heat makes food safe and digestible, but it can also destroy the nutrients you paid for.',
        analogy: {
          title: 'A leaking bucket',
          body:
            'You can fill a bucket with clean water, but if it leaks, you carry less to the house. Vitamin C is a leaky nutrient: it dissolves in water and is destroyed by heat and air. Boiling kontomire in a large pot of water and throwing the water away is like carrying it in a bucket full of holes.',
        },
        example: {
          title: 'Steam versus long boiling',
          body:
            'Steaming or stir-frying with a little water keeps vegetables in contact with heat for less time and loses fewer water-soluble vitamins. If you must boil, use only the water the food will absorb, add the vegetable when the water is already hot, and do not throw the cooking water away if it can go into a stew.',
        },
        worked: [
          {
            question:
              'A mother boils vegetables for 30 minutes in a large pot of water, then discards the water. Explain two nutrient losses and suggest improvements.',
            steps: [
              { label: 'Identify the losses', detail: 'Vitamin C and B vitamins are water-soluble and heat-sensitive. Long boiling leaches them into the water; discarding the water throws them away.' },
              { label: 'Suggest a method change', detail: 'Steam or stir-fry briefly, or add vegetables to an already-hot stew near the end of cooking.' },
              { label: 'Suggest a water change', detail: 'Use only enough water to cook, and keep the water for soup or gravy rather than pouring it away.' },
            ],
            answer:
              'Loss of vitamin C and B vitamins through leaching and heat. Steam briefly, use less water, and reuse cooking liquid.',
            why: 'The exam wants the nutrient, the mechanism (leaching/heat) and a practical change — not just “cook well”.',
          },
          {
            question:
              'Cooked rice is left on the kitchen table overnight and eaten the next morning. Explain the risk and the correct storage.',
            steps: [
              { label: 'Name the risk', detail: 'Cooked rice can support Bacillus cereus, which produces toxins and causes vomiting or diarrhoea. Warm, moist food is a breeding ground.' },
              { label: 'Cool and refrigerate quickly', detail: 'Cool within about an hour, then refrigerate. Do not leave it at room temperature overnight.' },
              { label: 'Reheat thoroughly', detail: 'Reheat until steaming hot all through, and do not reheat more than once.' },
            ],
            answer:
              'Risk of food poisoning from Bacillus cereus. Refrigerate promptly, reheat thoroughly, and never leave cooked rice out overnight.',
            why: 'Food safety answers need a named hazard, a temperature/time reason and a corrective action.',
          },
          {
            question:
              'A family has a glut of tomatoes. Suggest two preservation methods and one advantage of each.',
            steps: [
              { label: 'Drying', detail: 'Sun-dry or oven-dry into tomato leather/powder. Advantage: no electricity needed and very light to store.' },
              { label: 'Bottling/canning', detail: 'Cook, bottle and seal in sterilised jars. Advantage: retains a sauce-like texture and saves time later.' },
              { label: 'Freezing (if available)', detail: 'Blend and freeze portions. Advantage: retains fresh flavour, but depends on reliable power.' },
            ],
            answer:
              'Drying (cheap, shelf-stable) and bottling (keeps sauce texture). Choose according to climate, cost and power supply.',
            why: 'Preservation answers should match the method to the household’s actual resources, not just list methods.',
          },
        ],
        deeper: [
          {
            title: 'The danger zone',
            body:
              'Bacteria multiply fastest between about 5°C and 60°C. Keep hot food hot, cold food cold, and minimise the time food spends in between. This one principle explains most food-safety rules, including why leftovers should be cooled quickly and reheated thoroughly.',
          },
          {
            title: 'Preservation is also resource management',
            body:
              'Buying tomatoes cheaply in season and drying or bottling them reduces the family’s food bill later. Preservation is not only about avoiding waste; it is a budgeting strategy. Link it to the resource-management topic in longer answers.',
          },
        ],
        pitfalls: [
          'Saying “washing removes bacteria” without mentioning clean water, soap or cross-contamination.',
          'Listing cooking methods without saying what each does to nutrients.',
          'Thinking freezing kills all bacteria — it mostly pauses their growth.',
          'Storing raw meat above cooked food in a fridge, allowing juices to drip.',
        ],
        examTip:
          'For any food-safety scenario, use the four C’s: clean (hands, surfaces, water), cook (thoroughly), chill (quickly), cross-contamination (separate raw and cooked).',
      },
      quiz: [
        {
          id: 'management:foodprep:q1',
          prompt: 'Which cooking method best preserves water-soluble vitamins in vegetables?',
          options: ['Steaming briefly', 'Boiling for 30 minutes', 'Soaking overnight before boiling', 'Frying in deep oil for a long time'],
          answer: 0,
          explanation: 'Steaming minimises contact with water and cooking time, so fewer vitamins leach out or are destroyed.',
        },
        {
          id: 'management:foodprep:q2',
          prompt: 'The “danger zone” for bacterial growth in food is approximately',
          options: ['5°C to 60°C', '−18°C to 0°C', '60°C to 100°C', '0°C to 5°C'],
          answer: 0,
          explanation: 'Bacteria multiply fastest in the warm range between refrigeration and hot holding.',
        },
        {
          id: 'management:foodprep:q3',
          prompt: 'Which practice best prevents cross-contamination?',
          options: [
            'Using separate boards for raw meat and vegetables',
            'Washing raw chicken in the sink',
            'Storing cooked food under raw meat',
            'Tasting food with the cooking spoon',
          ],
          answer: 0,
          explanation: 'Separate equipment stops bacteria from raw meat reaching ready-to-eat food.',
        },
        {
          id: 'management:foodprep:q4',
          prompt: 'Drying is a preservation method because it',
          options: [
            'removes water that micro-organisms need',
            'adds nutrients to the food',
            'kills all bacteria instantly',
            'makes food permanently sterile',
          ],
          answer: 0,
          explanation: 'Drying reduces water activity, which slows or stops microbial growth.',
        },
        {
          id: 'management:foodprep:q5',
          prompt: 'A safe way to cool a large pot of soup quickly is to',
          options: [
            'divide it into shallow containers and refrigerate',
            'leave it covered on the stove overnight',
            'put the hot pot directly into the fridge uncovered',
            'add ice to the whole pot and leave it out',
          ],
          answer: 0,
          explanation: 'Smaller, shallower portions cool faster through the danger zone. The other options either cool too slowly or risk contamination.',
        },
        {
          id: 'management:foodprep:q6',
          prompt: 'The main advantage of bottling tomatoes is that it',
          options: [
            'extends shelf life while keeping a sauce texture',
            'removes the need for hygiene',
            'increases vitamin C',
            'makes the tomatoes raw again',
          ],
          answer: 0,
          explanation: 'Heat processing in sealed jars preserves the tomatoes and keeps a usable sauce texture.',
        },
      ],
      flashcards: [
        { id: 'management:foodprep:c1', subject: 'management', topicId: 'management:foodprep', front: 'Water-soluble vitamins', back: 'B vitamins and vitamin C — easily lost in cooking water and heat.', hint: 'They leak.' },
        { id: 'management:foodprep:c2', subject: 'management', topicId: 'management:foodprep', front: 'Danger zone', back: 'About 5°C–60°C, where bacteria multiply fastest.', hint: 'Keep hot hot, cold cold.' },
        { id: 'management:foodprep:c3', subject: 'management', topicId: 'management:foodprep', front: 'Cross-contamination', back: 'Harmful microbes moving from raw food or surfaces to ready-to-eat food.', hint: 'Separate boards.' },
        { id: 'management:foodprep:c4', subject: 'management', topicId: 'management:foodprep', front: 'Preservation methods', back: 'Drying, salting, smoking, freezing, canning/bottling, pickling.', hint: 'Remove water, heat, cold or acid.' },
        { id: 'management:foodprep:c5', subject: 'management', topicId: 'management:foodprep', front: 'Reheating leftovers', back: 'Reheat to steaming hot all through; reheat only once.', hint: 'Hot all the way through.' },
        { id: 'management:foodprep:c6', subject: 'management', topicId: 'management:foodprep', front: 'Food hygiene', back: 'Clean hands/surfaces, cook thoroughly, chill quickly, separate raw and cooked.', hint: 'The four C’s.' },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'management:textiles',
      subject: 'management',
      title: 'Clothing & textiles',
      summary:
        'Fibres, fabric choice, care labels, stain removal and the Ghanaian textiles that carry identity as well as warmth.',
      readMinutes: 12,
      difficulty: 'core',
      examWeight: 'Regular questions on fibres, selection and care',
      lesson: {
        bigIdea:
          'Clothing is technology for the body. The fibre decides how it behaves in heat, water and wear; the care label is the maker’s attempt to keep that behaviour from ruining the garment.',
        analogy: {
          title: 'Different tools for different jobs',
          body:
            'You would not use a spoon to dig a foundation. Cotton is absorbent and breathable, which is why it works in Accra’s heat; polyester dries quickly and resists creasing, which is why it travels well. Neither fabric is “better”. The job decides.',
        },
        example: {
          title: 'Reading a care label',
          body:
            'A basin with a hand means hand-wash. A triangle means bleach is allowed (crossed out means it is not). A square with a circle is tumble drying. An iron with one dot is low heat. Learn the symbols, and you stop shrinking your favourite cloth.',
        },
        worked: [
          {
            question:
              'A learner is choosing fabric for a school uniform in a hot, humid town. Compare cotton and polyester, and recommend one with a reason.',
            steps: [
              { label: 'Cotton', detail: 'Absorbs sweat, allows air through, feels comfortable in heat, but creases and dries slowly.' },
              { label: 'Polyester', detail: 'Light, strong, dries quickly and resists creasing, but traps heat and does not absorb sweat well.' },
              { label: 'Match to the climate and use', detail: 'For daily wear in humid heat, a cotton or cotton-blend uniform is more comfortable; a polyester blend may be more durable and easier to wash.' },
            ],
            answer:
              'Recommend cotton or a cotton-rich blend for breathability, with a polyester blend if durability and quick drying matter more.',
            why: 'Textile questions reward trade-offs. State the property, then the consequence for the wearer.',
          },
          {
            question: 'Remove a fresh oil stain from a cotton shirt. Describe the steps.',
            steps: [
              { label: 'Act before washing', detail: 'Do not iron or machine-dry; heat sets the stain.' },
              { label: 'Blot, do not rub', detail: 'Blot excess oil with a clean cloth or paper. Rubbing spreads it.' },
              { label: 'Apply a suitable treatment', detail: 'Sprinkle absorbent powder (cornflour/talc) to lift the oil, brush off, then apply a small amount of liquid detergent and wash in warm water.' },
              { label: 'Check before drying', detail: 'Air-dry and inspect. If the stain remains, repeat before tumble drying.' },
            ],
            answer:
              'Blot, absorb with powder, treat with detergent, wash warm, and air-dry before checking.',
            why: 'The sequence matters: heat sets stains, and rubbing damages fibres or spreads the oil.',
          },
          {
            question: 'Name two Ghanaian textiles and one cultural or economic point about each.',
            steps: [
              { label: 'Kente', detail: 'Woven in strips and sewn together, associated with Ashanti and Ewe traditions, worn for ceremonies and increasingly sold internationally.' },
              { label: 'Batik/atampa', detail: 'Wax-resist dyed cloth with patterns; affordable, locally produced, and a major source of income for artisans.' },
              { label: 'Add another', detail: 'Fugu (smock) from the north, or adinkra cloth stamped with symbols, each carrying meaning.' },
            ],
            answer:
              'Kente — ceremonial identity and export value; batik/atampa — everyday wear and artisan income.',
            why: 'The examiner wants more than a name: connect the textile to culture, use or livelihood.',
          },
        ],
        deeper: [
          {
            title: 'Fibres: natural and manufactured',
            body:
              'Natural fibres come from plants (cotton, linen), animals (wool, silk) or minerals. Manufactured fibres include regenerated cellulose (viscose/rayon) and synthetic polymers (polyester, nylon, acrylic). Blends combine properties — cotton for comfort, polyester for strength and quick drying.',
          },
          {
            title: 'Durability is a consumer decision',
            body:
              'A cheap garment that loses shape after three washes is not cheaper than a better-made one worn for two years. Cost per wear — price divided by number of wears — is a more honest measure. This links clothing to consumer education.',
          },
        ],
        pitfalls: [
          'Saying cotton is “stronger when wet” — that is linen’s property; cotton loses some strength when wet.',
          'Using hot water or a hot iron on a stain before treating it.',
          'Treating “dry clean only” as a suggestion and machine-washing a delicate garment.',
          'Listing textiles without linking them to culture, use or economy.',
        ],
        examTip:
          'For fabric-choice questions, always name two properties, then apply them to the climate or occasion. “Cotton is absorbent, so it keeps the wearer cooler in humid heat” is a full mark; “cotton is nice” is not.',
      },
      quiz: [
        {
          id: 'management:textiles:q1',
          prompt: 'Which fibre is most absorbent and breathable for hot weather?',
          options: ['Cotton', 'Polyester', 'Nylon', 'Acrylic'],
          answer: 0,
          explanation: 'Cotton absorbs moisture and allows air movement, making it comfortable in heat.',
        },
        {
          id: 'management:textiles:q2',
          prompt: 'A care label showing a basin with a hand means the garment should be',
          options: ['hand-washed', 'bleached', 'tumble-dried', 'ironed at high heat'],
          answer: 0,
          explanation: 'The hand in a basin is the international symbol for hand washing.',
        },
        {
          id: 'management:textiles:q3',
          prompt: 'The first thing to do with a fresh oil stain is to',
          options: ['blot the excess without rubbing', 'iron the area', 'rub vigorously with soap', 'wash in very hot water'],
          answer: 0,
          explanation: 'Blotting lifts oil; rubbing spreads it, and heat can set it permanently.',
        },
        {
          id: 'management:textiles:q4',
          prompt: 'Kente is traditionally woven',
          options: ['in narrow strips that are sewn together', 'as a single wide sheet on a machine', 'by knitting wool in a round', 'by printing with wax resist'],
          answer: 0,
          explanation: 'Kente is woven on a narrow loom in strips, which are then joined into a larger cloth.',
        },
        {
          id: 'management:textiles:q5',
          prompt: 'Which property makes polyester useful for travel clothing?',
          options: ['It dries quickly and resists creasing', 'It absorbs large amounts of water', 'It feeds bacteria', 'It shrinks easily'],
          answer: 0,
          explanation: 'Polyester is quick-drying and crease-resistant, though it is less breathable than cotton.',
        },
        {
          id: 'management:textiles:q6',
          prompt: '“Cost per wear” is calculated by',
          options: [
            'dividing the price by the number of times the item is worn',
            'adding the price to the washing cost',
            'dividing the number of wears by the price',
            'multiplying the price by the number of colours',
          ],
          answer: 0,
          explanation: 'Cost per wear shows the real value of a garment over time: price ÷ wears.',
        },
      ],
      flashcards: [
        { id: 'management:textiles:c1', subject: 'management', topicId: 'management:textiles', front: 'Cotton', back: 'Absorbent, breathable, comfortable; creases and dries slowly.', hint: 'Plant fibre.' },
        { id: 'management:textiles:c2', subject: 'management', topicId: 'management:textiles', front: 'Polyester', back: 'Strong, quick-drying, crease-resistant; traps heat.', hint: 'Synthetic.' },
        { id: 'management:textiles:c3', subject: 'management', topicId: 'management:textiles', front: 'Care label symbols', back: 'Basin = wash; triangle = bleach; square/circle = tumble dry; iron dots = heat.', hint: 'Read before washing.' },
        { id: 'management:textiles:c4', subject: 'management', topicId: 'management:textiles', front: 'Kente', back: 'Hand-woven strip cloth associated with Ashanti and Ewe traditions.', hint: 'Ceremonial and export value.' },
        { id: 'management:textiles:c5', subject: 'management', topicId: 'management:textiles', front: 'Batik / atampa', back: 'Wax-resist patterned cloth; everyday wear and artisan income.', hint: 'Wax resists dye.' },
        { id: 'management:textiles:c6', subject: 'management', topicId: 'management:textiles', front: 'Cost per wear', back: 'Price ÷ number of wears.', hint: 'The honest price.' },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'management:consumer',
      subject: 'management',
      title: 'Consumer choices, health & hygiene',
      summary:
        'Rights and responsibilities, advertising tricks, unit pricing, mobile money safety, and the hygiene that protects a household.',
      readMinutes: 13,
      difficulty: 'core',
      examWeight: 'Applied questions on buying decisions and health practices',
      lesson: {
        bigIdea:
          'A consumer is not a passive receiver of products. You are a decision-maker with rights, responsibilities and limited money — and advertising is designed to make you forget the last part.',
        analogy: {
          title: 'The market trader’s scale',
          body:
            'Two stalls sell the same rice. One charges GHS 12 for 500 g; the other GHS 22 for 1 kg. The second looks more expensive, but it is cheaper per gram. Advertising works like a tilted scale: it makes one option feel bigger, brighter or more urgent. Unit price is the level scale underneath.',
        },
        example: {
          title: 'A “50% off” label',
          body:
            'A shirt priced at GHS 120 is marked “50% off — now GHS 80”. The maths does not match the claim. The real question is not the size of the discount but whether GHS 80 is a fair price for that shirt and whether you needed it. A discount on something you did not need is still spending.',
        },
        worked: [
          {
            question:
              'Compare two brands of cooking oil: Brand A, 1 litre for GHS 28; Brand B, 1.5 litres for GHS 39. Which is better value?',
            steps: [
              { label: 'Find the unit price', detail: 'Brand A: 28 ÷ 1 = GHS 28 per litre. Brand B: 39 ÷ 1.5 = GHS 26 per litre.' },
              { label: 'Compare', detail: 'Brand B is GHS 2 cheaper per litre.' },
              { label: 'Check the whole decision', detail: 'Does the family use 1.5 litres before it goes rancid? Is storage available? The cheaper unit is not automatically the better purchase.' },
            ],
            answer:
              'Brand B is better value per litre (GHS 26 vs GHS 28), provided the family will use it before it spoils.',
            why: 'Unit price is the comparison tool; consumption and storage decide whether the saving is real.',
          },
          {
            question:
              'A message says: “You have won GHS 5,000. Send GHS 50 airtime to claim.” Identify the warning signs and the correct action.',
            steps: [
              { label: 'Unexpected winnings', detail: 'A genuine prize does not require an upfront payment. This is a classic advance-fee scam.' },
              { label: 'Pressure and secrecy', detail: 'Urgency (“claim now”) and a request to send airtime are designed to stop you thinking.' },
              { label: 'Correct action', detail: 'Do not send money or share a PIN/OTP. Verify through the official provider, report the message, and warn family members.' },
            ],
            answer:
              'It is a scam. Do not pay, do not share codes, verify with the official provider and report it.',
            why: 'Consumer protection includes digital literacy. The same caution applies to mobile money and online shopping.',
          },
          {
            question:
              'Outline a simple weekly hygiene plan for a household of five.',
            steps: [
              { label: 'Water and hands', detail: 'Keep a covered water container and soap at the wash area; wash hands before eating and after the toilet.' },
              { label: 'Food areas', detail: 'Clean the cooking surface daily, cover food, and separate raw meat from cooked food.' },
              { label: 'Waste and surroundings', detail: 'Use covered bins, empty them daily, clear stagnant water to reduce mosquitoes, and ventilate rooms.' },
              { label: 'Personal care', detail: 'Daily bathing, clean clothing, oral care, and regular washing of bedding.' },
            ],
            answer:
              'Hand hygiene, safe food handling, covered waste, stagnant-water control, ventilation and personal care.',
            why: 'Health questions reward a plan with named actions and a reason, not a slogan about cleanliness.',
          },
        ],
        deeper: [
          {
            title: 'Consumer rights and responsibilities',
            body:
              'Rights include safety, accurate information, choice, being heard, redress and environmental health. Responsibilities include reading labels, keeping receipts, using products correctly, complaining fairly and considering the impact of your choices. A right without a responsibility is only half the relationship.',
          },
          {
            title: 'Needs, wants and advertising',
            body:
              'Advertising often sells identity rather than function: the phone promises status, the cream promises belonging. A useful test is to wait 24 hours before an unplanned purchase and ask, “Would I still want this if nobody could see it?”',
          },
        ],
        pitfalls: [
          'Comparing pack prices without comparing quantity.',
          'Believing a discount is a saving even when the item was not needed.',
          'Sharing a mobile money PIN or one-time code with a caller.',
          'Listing consumer rights without any responsibilities.',
        ],
        examTip:
          'For consumer scenarios, calculate the unit price, state the cheaper option, then add one non-price factor (quality, storage, need). That final sentence is what separates a good answer from a calculation.',
      },
      quiz: [
        {
          id: 'management:consumer:q1',
          prompt: 'Which is the better value: 500 g of rice for GHS 12, or 1 kg for GHS 22?',
          options: ['1 kg for GHS 22', '500 g for GHS 12', 'They are equal', 'Cannot be determined'],
          answer: 0,
          explanation: '500 g at GHS 12 is GHS 24 per kg; 1 kg at GHS 22 is cheaper per kilogram.',
        },
        {
          id: 'management:consumer:q2',
          prompt: 'Which is a consumer responsibility rather than a right?',
          options: [
            'Reading the label before use',
            'Receiving safe products',
            'Being protected from false advertising',
            'Having a choice of goods',
          ],
          answer: 0,
          explanation: 'Reading and following product information is a responsibility; the others are consumer rights.',
        },
        {
          id: 'management:consumer:q3',
          prompt: 'A caller asks for your mobile money PIN to “reverse a wrong transfer”. You should',
          options: [
            'refuse and verify through the official provider',
            'share the PIN because the caller sounds official',
            'send a small amount first to test',
            'reply with your ID number',
          ],
          answer: 0,
          explanation: 'No legitimate provider asks for your PIN. Refuse, end the call and verify independently.',
        },
        {
          id: 'management:consumer:q4',
          prompt: 'A “50% off” label is most useful when',
          options: [
            'you already needed the item and the final price is fair',
            'the original price was inflated',
            'you buy it only because it is discounted',
            'the item is the wrong size',
          ],
          answer: 0,
          explanation: 'A discount only saves money on something you would have bought anyway at a fair price.',
        },
        {
          id: 'management:consumer:q5',
          prompt: 'Which practice best reduces mosquito breeding around a home?',
          options: [
            'Emptying stagnant water from containers',
            'Leaving water in open barrels',
            'Blocking all ventilation',
            'Burning plastic waste indoors',
          ],
          answer: 0,
          explanation: 'Mosquitoes breed in standing water. Emptying containers breaks the breeding cycle.',
        },
        {
          id: 'management:consumer:q6',
          prompt: 'The main purpose of a receipt is to',
          options: [
            'provide proof of purchase for returns or complaints',
            'make the shop look professional',
            'increase the price',
            'replace the product label',
          ],
          answer: 0,
          explanation: 'A receipt is evidence of the transaction and is essential when seeking redress.',
        },
      ],
      flashcards: [
        { id: 'management:consumer:c1', subject: 'management', topicId: 'management:consumer', front: 'Unit price', back: 'Price ÷ quantity; the fair way to compare pack sizes.', hint: 'Price per gram/litre.' },
        { id: 'management:consumer:c2', subject: 'management', topicId: 'management:consumer', front: 'Consumer rights', back: 'Safety, information, choice, being heard, redress, environmental health.', hint: 'What you are owed.' },
        { id: 'management:consumer:c3', subject: 'management', topicId: 'management:consumer', front: 'Consumer responsibilities', back: 'Read labels, keep receipts, use products correctly, complain fairly.', hint: 'What you owe.' },
        { id: 'management:consumer:c4', subject: 'management', topicId: 'management:consumer', front: 'Advance-fee scam', back: 'You are asked to pay or send airtime to receive a prize or transfer.', hint: 'No real prize charges you first.' },
        { id: 'management:consumer:c5', subject: 'management', topicId: 'management:consumer', front: 'Mobile money safety', back: 'Never share your PIN or OTP; verify through the official provider.', hint: 'Your PIN is yours alone.' },
        { id: 'management:consumer:c6', subject: 'management', topicId: 'management:consumer', front: 'Waste management', back: 'Covered bins, regular collection, separation, no stagnant water.', hint: 'Protect health and surroundings.' },
      ],
    },
  ],
};
