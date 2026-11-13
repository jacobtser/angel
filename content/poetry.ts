import type { LiteratureText } from '@/lib/types';

/**
 * Poetry bank for the Ghana core English literature section.
 *
 * These ten poems appear in the 2023 paper's poetry alternatives (five African,
 * five non-African) in this repository. Analyses are original; quotations are
 * short and used for teaching.
 */

export const poetryTexts: LiteratureText[] = [
  {
    id: 'once-upon-a-time',
    title: 'Once Upon a Time',
    author: 'Gabriel Okara',
    genre: 'poetry',
    origin: 'African',
    year: '1964',
    cycle: 'WAEC Ghana Core English: 2022–2026',
    setting: 'A father speaking to his son about the difference between childhood sincerity and adult performance.',
    blurb:
      'An adult remembers how people used to laugh “with their hearts”, then admits he has learned to wear faces like dresses — and asks his son to teach him how to be sincere again.',
    whyItMatters:
      'It turns ordinary social politeness into a loss. The poem is not against manners; it is against the moment manners replace truth.',
    structureLabel: 'Movements',
    structure: [
      { label: 'Stanza 1–2', title: 'Then and now', summary: 'The speaker recalls a time when laughter and handshakes came from the heart. Now people laugh “with their teeth” and shake hands while their eyes search for advantage.' },
      { label: 'Stanza 3–4', title: 'The masks', summary: 'He lists the faces he has learned to wear — home, office, street, host, cocktail — each with a fixed smile. The masks are useful, and that is the problem.' },
      { label: 'Stanza 5–6', title: 'The request', summary: 'He turns to his son, who still knows the old sincerity, and asks to be taught how to laugh and smile “once upon a time” again.' },
    ],
    characters: [],
    themes: [
      { title: 'Lost sincerity', body: 'Adult social life is shown as a performance. The poem mourns the gap between what people feel and what their faces do.', evidence: '“They used to laugh with their hearts” contrasted with laughter “with their teeth”.' },
      { title: 'Social masks and survival', body: 'The masks are not simply hypocrisy; they are how the speaker has learned to survive in offices, streets and parties. The poem holds pity and judgement together.', evidence: 'The list of faces — “home face, office face, street face, host face, cocktail face”.' },
      { title: 'Hope through the child', body: 'The son represents a sincerity the father has lost but still believes can be relearned.', evidence: 'The final request: “show me how to laugh”.' },
    ],
    symbols: [
      { name: 'The mirror', meaning: 'Self-confrontation; the speaker sees only teeth, “like a snake’s bare fangs”.' },
      { name: 'Masks / dresses', meaning: 'Social roles worn and removed; identity as costume.' },
      { name: 'The child', meaning: 'Unlearned sincerity and the possibility of return.' },
    ],
    quotes: [
      { text: 'They used to laugh with their hearts', who: 'The speaker', context: 'The opening memory of genuine feeling.', use: 'Theme of lost sincerity; contrast.' },
      { text: 'I have learned to wear many faces like dresses', who: 'The speaker', context: 'The central metaphor of social performance.', use: 'Metaphor, persona, adult hypocrisy.' },
    ],
    essayPrompts: [
      'Discuss the theme of hypocrisy in “Once Upon a Time”.',
      'How does Okara use the image of masks to develop the poem’s meaning?',
    ],
    examFocus: [
      'Identify the speaker as an adult addressing his son, not the poet himself.',
      'Expect questions on the mask metaphor and the contrast between past and present.',
      'Link the poem’s ending to hope, not just complaint.',
    ],
    sourceNote: 'Appears in the 2023 paper’s African poetry alternatives. Quotations are short and for teaching.',
  },

  {
    id: 'the-weaver-bird',
    title: 'The Weaver Bird',
    author: 'Kofi Awoonor',
    genre: 'poetry',
    origin: 'African',
    year: '1970s',
    cycle: 'WAEC Ghana Core English: 2022–2026',
    setting: 'A village community invaded by a bird that builds its nest in the people’s house.',
    blurb:
      'The weaver bird moves into a community’s home, lays its eggs in their only tree, and slowly replaces their way of life. The poem is an extended image of colonisation.',
    whyItMatters:
      'It shows how invasion can look like ordinary nesting. The bird does not announce itself as an enemy; it builds, breeds and settles.',
    structureLabel: 'Movements',
    structure: [
      { label: 'Stanza 1–2', title: 'The arrival', summary: 'The weaver bird builds in the people’s house and lays eggs on their only tree. The community watches, perhaps without understanding the scale of the change.' },
      { label: 'Stanza 3–4', title: 'The new song', summary: 'The bird’s song becomes the sound of the house. The people begin to imitate or accommodate it; the old life is displaced.' },
      { label: 'Stanza 5', title: 'The loss', summary: 'The poem ends with a sense of cultural dispossession: the nest is built, the eggs are hatched, and the original inhabitants are left with a borrowed home.' },
    ],
    characters: [],
    themes: [
      { title: 'Colonialism as invasion', body: 'The bird’s nesting is a gradual occupation. Colonisation is presented not only as violence but as settlement, reproduction and cultural replacement.', evidence: 'The weaver bird building “in our house” and laying eggs “on our only tree”.' },
      { title: 'Cultural loss', body: 'The poem mourns a way of life that is being replaced by the intruder’s song and habits.', evidence: 'The community’s home becomes the bird’s home.' },
      { title: 'Complicity and passivity', body: 'The people do not drive the bird out. Their failure to act is part of the tragedy.', evidence: 'The quiet, accepting tone of the community’s observations.' },
    ],
    symbols: [
      { name: 'The weaver bird', meaning: 'The coloniser — industrious, prolific and impossible to ignore.' },
      { name: 'The nest in the house', meaning: 'Cultural occupation; the intruder makes itself at home.' },
      { name: 'The only tree', meaning: 'A precious, limited cultural inheritance.' },
    ],
    quotes: [
      { text: 'The weaver bird built in our house', who: 'The speaker', context: 'The opening image of occupation.', use: 'Colonialism, invasion, the extended metaphor.' },
      { text: 'And laid its eggs on our only tree', who: 'The speaker', context: 'The bird reproduces on the community’s most valuable resource.', use: 'Symbolism, cultural replacement.' },
    ],
    essayPrompts: [
      'Discuss “The Weaver Bird” as a poem about colonisation.',
      'How does Awoonor use the extended metaphor of the bird to explore cultural loss?',
    ],
    examFocus: [
      'Do not treat the bird literally; it is an extended metaphor for colonial settlement.',
      'Link each stanza to a stage of invasion: arrival, reproduction, replacement.',
      'Use “our house” and “our only tree” to discuss the communal voice.',
    ],
    sourceNote: 'Appears in the 2023 paper’s African poetry alternatives. Quotations are short and for teaching.',
  },

  {
    id: 'night-rain',
    title: 'Night Rain',
    author: 'John Pepper Clark',
    genre: 'poetry',
    origin: 'African',
    year: '1965',
    cycle: 'WAEC Ghana Core English: 2022–2026',
    setting: 'A poor household at night during heavy rain.',
    blurb:
      'Rain beats on a leaking roof while a mother and children huddle inside. The poem makes weather into a measure of poverty.',
    whyItMatters:
      'It is not a poem about scenery. The rain is an antagonist because the house cannot keep it out. Weather becomes a social fact.',
    structureLabel: 'Movements',
    structure: [
      { label: 'Stanza 1', title: 'The rain arrives', summary: 'The speaker is unsure of the time; the rain is already falling. The sound dominates the dark.' },
      { label: 'Stanza 2', title: 'The household', summary: 'The family is exposed inside their own home. The mother and children are vulnerable, and the rain finds every gap.' },
      { label: 'Stanza 3', title: 'The morning after', summary: 'The storm passes, leaving the household to face the damage and the ordinary work of survival.' },
    ],
    characters: [],
    themes: [
      { title: 'Poverty and exposure', body: 'The house should be shelter, but it fails. Poverty is shown as the inability to keep bad weather outside.', evidence: 'The rain entering the home and the family’s helplessness.' },
      { title: 'The power of nature', body: 'The rain is indifferent to human need. It is not cruel; it simply falls.', evidence: 'The relentless sound and the darkness.' },
      { title: 'Family endurance', body: 'The mother and children endure together. The poem’s tenderness lies in their closeness, not in rescue.', evidence: 'The image of the family huddled through the night.' },
    ],
    symbols: [
      { name: 'The rain', meaning: 'Nature’s power and the pressure of poverty.' },
      { name: 'The leaking roof', meaning: 'A failed shelter; the thin line between home and exposure.' },
      { name: 'Night', meaning: 'Fear, uncertainty and the length of endurance.' },
    ],
    quotes: [
      { text: 'What time of night it is / I do not know', who: 'The speaker', context: 'The disorientation of the storm.', use: 'Uncertainty, atmosphere, the dominance of the rain.' },
      { text: 'The rain is falling', who: 'The speaker', context: 'The simple, repeated fact at the centre of the poem.', use: 'Repetition, inevitability.' },
    ],
    essayPrompts: [
      'How does Clark use the rain to explore poverty in “Night Rain”?',
      'Discuss the theme of vulnerability in the poem.',
    ],
    examFocus: [
      'Read the rain as both weather and social pressure.',
      'The setting is rural and poor; mention the failure of shelter.',
      'Avoid calling the poem simply “sad”; talk about endurance and exposure.',
    ],
    sourceNote: 'Appears in the 2023 paper’s African poetry alternatives. Quotations are short and for teaching.',
  },

  {
    id: 'african-thunderstorm',
    title: 'An African Thunderstorm',
    author: 'David Rubadiri',
    genre: 'poetry',
    origin: 'African',
    year: '1960s',
    cycle: 'WAEC Ghana Core English: 2022–2026',
    setting: 'A village landscape just before and during a violent storm.',
    blurb:
      'A storm advances across the sky like an army, sending women and children running and bending the landscape. The poem is an exercise in awe and motion.',
    whyItMatters:
      'It captures the moment before rain when the wind changes and everyone knows something large is arriving. The poem is less about damage than about power.',
    structureLabel: 'Movements',
    structure: [
      { label: 'Stanza 1', title: 'The approach', summary: 'Clouds hurry in from the west with the wind. The storm is personified as a madman or a marching force.' },
      { label: 'Stanza 2', title: 'The human response', summary: 'Women and children run for shelter; the village is turned into a scene of urgent movement.' },
      { label: 'Stanza 3', title: 'The storm breaks', summary: 'The rain arrives with noise and force, bending trees and overwhelming the landscape.' },
    ],
    characters: [],
    themes: [
      { title: 'The power of nature', body: 'The storm is the dominant force; human beings are small and fast-moving in its path.', evidence: 'The wind, clouds and rain overwhelming the village.' },
      { title: 'Fear and awe', body: 'The poem does not simply condemn the storm. It is frightening and magnificent at once.', evidence: 'The personification of the storm and the energy of the verbs.' },
      { title: 'Human vulnerability', body: 'Women and children run; shelter is urgent. The storm exposes how little control people have over their environment.', evidence: 'The image of people fleeing before the rain.' },
    ],
    symbols: [
      { name: 'The storm', meaning: 'Nature’s uncontrollable power.' },
      { name: 'The west', meaning: 'The direction of arrival; change coming from outside.' },
      { name: 'Running women and children', meaning: 'Vulnerability and the human cost of natural force.' },
    ],
    quotes: [
      { text: 'From the west / Clouds come hurrying with the wind', who: 'The speaker', context: 'The opening movement of the storm.', use: 'Setting, personification, atmosphere.' },
      { text: 'The wind whistles by', who: 'The speaker', context: 'The storm’s sound and force.', use: 'Sound imagery, personification.' },
    ],
    essayPrompts: [
      'Discuss the power of nature in “An African Thunderstorm”.',
      'How does Rubadiri create a sense of movement in the poem?',
    ],
    examFocus: [
      'Expect questions on personification and the atmosphere of confusion.',
      'Track the storm’s progression: approach → human reaction → downpour.',
      'Mention both fear and admiration; the poem is not a simple warning.',
    ],
    sourceNote: 'Appears in the 2023 paper’s African poetry alternatives. Quotations are short and for teaching.',
  },

  {
    id: 'nightfall-in-soweto',
    title: 'Nightfall in Soweto',
    author: 'Oswald Mbuyiseni Mtshali',
    genre: 'poetry',
    origin: 'African',
    year: '1970s',
    cycle: 'WAEC Ghana Core English: 2022–2026',
    setting: 'Soweto, South Africa, under apartheid. Nightfall brings violence rather than rest.',
    blurb:
      'Darkness spreads like disease through a township, and the night is not a time of peace but of fear, raids and death.',
    whyItMatters:
      'It reverses the usual meaning of night. For the speaker, darkness is not sleep; it is exposure. The poem turns a natural cycle into a political condition.',
    structureLabel: 'Movements',
    structure: [
      { label: 'Stanza 1–2', title: 'Darkness as disease', summary: 'Nightfall creeps through the township like an illness. The metaphor makes darkness contagious and bodily.' },
      { label: 'Stanza 3–4', title: 'The terror of the night', summary: 'The speaker describes the fear that comes with darkness: violence, pursuit, the vulnerability of people in their homes.' },
      { label: 'Stanza 5', title: 'Survival', summary: 'The poem ends without rescue. The night must be endured, and the speaker’s voice is a form of witness.' },
    ],
    characters: [],
    themes: [
      { title: 'Apartheid violence', body: 'The poem is rooted in the political terror of Soweto. Night is when the state’s violence feels most intimate.', evidence: 'The atmosphere of fear and the township setting.' },
      { title: 'Fear as a daily condition', body: 'Fear is not an event but a climate. The poem shows how political violence enters ordinary bodily experience.', evidence: 'The disease metaphor and the images of pursuit.' },
      { title: 'Witness and protest', body: 'The speaker names the terror rather than accepting it. The poem itself is an act of bearing witness.', evidence: 'The direct address and the unrelieved tone.' },
    ],
    symbols: [
      { name: 'Nightfall', meaning: 'Political terror disguised as a natural cycle.' },
      { name: 'Disease', meaning: 'Violence that spreads through the whole community.' },
      { name: 'Soweto', meaning: 'A specific place of resistance and suffering, not a generic city.' },
    ],
    quotes: [
      { text: 'Nightfall comes like / a dreaded disease', who: 'The speaker', context: 'The opening simile of the poem.', use: 'Personification/simile, atmosphere, political fear.' },
      { text: 'seeping through the pores / of a healthy body', who: 'The speaker', context: 'The disease metaphor continues into the township’s body.', use: 'Extended metaphor, vulnerability.' },
    ],
    essayPrompts: [
      'Discuss the theme of fear in “Nightfall in Soweto”.',
      'How does Mtshali use imagery of disease to explore apartheid?',
    ],
    examFocus: [
      'Name the setting and its political context: Soweto under apartheid.',
      'The dominant device is personification/simile; explain the effect, not just the label.',
      'Avoid treating the poem as being about ordinary night-time; it is about political terror.',
    ],
    sourceNote: 'Appears in the 2023 paper’s African poetry alternatives. Quotations are short and for teaching.',
  },

  {
    id: 'anthem-for-doomed-youth',
    title: 'Anthem for Doomed Youth',
    author: 'Wilfred Owen',
    genre: 'poetry',
    origin: 'Non-African',
    year: '1917',
    cycle: 'WAEC Ghana Core English: 2022–2026',
    setting: 'The battlefields of the First World War, and the homes where the dead are mourned.',
    blurb:
      'A sonnet that asks what funeral rites the young soldiers receive. The answer is not bells and choirs but rifles, shells and the silence of grieving families.',
    whyItMatters:
      'It uses the shape of a funeral service to expose the absence of one. The poem’s anger is controlled by form, which makes it harder and more moving.',
    structureLabel: 'Movements',
    structure: [
      { label: 'Octave', title: 'The battlefield funeral', summary: 'The speaker asks what passing-bells the soldiers will have. Instead of church bells, they have the “stuttering rifles’ rapid rattle” and the wailing of shells.' },
      { label: 'Sestet', title: 'The home-front grief', summary: 'The poem turns to the families: candles, curtains, flowers, the tenderness of patient minds. The mourning is real but silent and incomplete.' },
      { label: 'Final line', title: 'The closing dusk', summary: 'The last line draws a “drawing-down of blinds”, a domestic gesture that becomes a final, quiet burial.' },
    ],
    characters: [],
    themes: [
      { title: 'The waste of war', body: 'Young men die like cattle, without the dignity of ordinary funeral rites. The poem measures the cost in rituals that cannot take place.', evidence: '“What passing-bells for these who die as cattle?”' },
      { title: 'Mourning and absence', body: 'The home front mourns, but the forms of mourning are inadequate. The poem is as much about the living as the dead.', evidence: 'The sestet’s candles, curtains and patient minds.' },
      { title: 'Religion and irony', body: 'The language of the church is applied to weapons. The “anthem” is not sacred music but gunfire.', evidence: 'The substitution of rifles for bells and choirs.' },
    ],
    symbols: [
      { name: 'Passing-bells', meaning: 'The funeral rites the soldiers are denied.' },
      { name: 'Rifles’ rattle', meaning: 'War’s parody of a church choir.' },
      { name: 'Drawing-down of blinds', meaning: 'Domestic mourning; the quiet closing of a life.' },
    ],
    quotes: [
      { text: 'What passing-bells for these who die as cattle?', who: 'The speaker', context: 'The opening question of the sonnet.', use: 'Rhetorical question, indignation, the waste of war.' },
      { text: 'Only the stuttering rifles’ rapid rattle', who: 'The speaker', context: 'The battlefield’s substitute for a funeral bell.', use: 'Alliteration, onomatopoeia, irony.' },
    ],
    essayPrompts: [
      'Discuss the theme of the waste of war in “Anthem for Doomed Youth”.',
      'How does Owen use religious imagery and irony to criticise war?',
    ],
    examFocus: [
      'Identify the form as a sonnet and explain how the octave/sestet turn shapes the argument.',
      'Name the devices precisely: alliteration, onomatopoeia, personification, rhetorical question.',
      'The title’s “anthem” is ironic; explain the gap between sacred music and gunfire.',
    ],
    sourceNote: 'Appears in the 2023 paper’s non-African poetry alternatives. Quotations are short and for teaching.',
  },

  {
    id: 'batter-my-heart',
    title: 'Batter My Heart',
    author: 'John Donne',
    genre: 'poetry',
    origin: 'Non-African',
    year: '1615 (published)',
    cycle: 'WAEC Ghana Core English: 2022–2026',
    setting: 'A speaker alone with God, using the language of siege and marriage.',
    blurb:
      'A Holy Sonnet in which the speaker asks God to break into him violently, because gentleness has failed to make him faithful.',
    whyItMatters:
      'It is a prayer that sounds like a battle. The paradox is the point: to be free, the speaker must be captured; to be pure, he must be ravished.',
    structureLabel: 'Movements',
    structure: [
      { label: 'Lines 1–4', title: 'The siege', summary: 'The speaker asks the “three-personed God” to batter his heart, as if God were an army attacking a town.' },
      { label: 'Lines 5–8', title: 'The failed defences', summary: 'He describes himself as a town that has been captured and must be retaken; reason, the “viceroy” in him, is weak.' },
      { label: 'Lines 9–14', title: 'The paradoxes', summary: 'He asks God to imprison him in order to free him, and to ravish him in order to make him chaste. The sonnet ends in a knot of impossible but sincere desire.' },
    ],
    characters: [],
    themes: [
      { title: 'Faith as struggle', body: 'Belief is not calm certainty. The speaker experiences it as a violent conflict between desire and resistance.', evidence: 'The military language of battering, siege and capture.' },
      { title: 'Sin and salvation', body: 'The speaker feels owned by sin and asks God to take him back by force.', evidence: 'The image of the captured town and the request to “enthrall” him.' },
      { title: 'Paradox', body: 'The poem’s central truths are expressed as contradictions: freedom through imprisonment, chastity through ravishment.', evidence: 'The final two lines.' },
    ],
    symbols: [
      { name: 'The besieged town', meaning: 'The speaker’s soul, captured by sin and needing recapture.' },
      { name: 'Marriage', meaning: 'The desired union with God, described in bodily and intimate terms.' },
      { name: 'The “three-personed God”', meaning: 'The Trinity; the speaker addresses the whole Godhead.' },
    ],
    quotes: [
      { text: 'Batter my heart, three-personed God; for you', who: 'The speaker', context: 'The violent opening address.', use: 'Direct address, paradox, religious language.' },
      { text: 'Except you enthrall me, never shall be free', who: 'The speaker', context: 'The central paradox of the final lines.', use: 'Paradox, faith, salvation.' },
    ],
    essayPrompts: [
      'Discuss the theme of faith in “Batter my Heart”.',
      'How does Donne use paradox and violent imagery in the sonnet?',
    ],
    examFocus: [
      'Expect a question on paradox; define it and quote the final lines.',
      'The violence is spiritual, not literal. Explain the metaphor of the soul as a captured town.',
      'Identify the form as a Holy Sonnet and the address to the Trinity.',
    ],
    sourceNote: 'Appears in the 2023 paper’s non-African poetry alternatives. Quotations are short and for teaching.',
  },

  {
    id: 'piano',
    title: 'Piano',
    author: 'D. H. Lawrence',
    genre: 'poetry',
    origin: 'Non-African',
    year: '1918',
    cycle: 'WAEC Ghana Core English: 2022–2026',
    setting: 'A winter evening in a warm room, and the speaker’s remembered childhood home.',
    blurb:
      'A woman sings at a piano, and the speaker is pulled back into a childhood memory of Sunday evenings with his mother. He resists the nostalgia, then surrenders to it.',
    whyItMatters:
      'It captures the ambivalence of memory: the past is warm and beautiful, and also a place you cannot return to. The poem’s longing is inseparable from loss.',
    structureLabel: 'Movements',
    structure: [
      { label: 'Stanza 1', title: 'The present song', summary: 'A woman sings softly in the dusk. The music reaches the speaker and begins to pull him backwards.' },
      { label: 'Stanza 2', title: 'The childhood room', summary: 'He remembers Sunday evenings at home, his mother playing the piano, the cosy domestic scene.' },
      { label: 'Stanza 3', title: 'The surrender', summary: 'He tries to resist the pull of memory but weeps “like a child for the past”. The poem ends in emotional defeat.' },
    ],
    characters: [],
    themes: [
      { title: 'Nostalgia and loss', body: 'The past is vivid and warm, but it is gone. The speaker’s weeping is for the past itself, not only for his mother.', evidence: '“I weep like a child for the past.”' },
      { title: 'Memory and music', body: 'Music triggers involuntary memory. The song bypasses the speaker’s adult defences.', evidence: 'The piano and the woman’s singing.' },
      { title: 'Childhood and vulnerability', body: 'The adult is reduced to a child by the memory. The poem treats that regression as both painful and precious.', evidence: 'The image of the child sitting under the piano.' },
    ],
    symbols: [
      { name: 'The piano', meaning: 'The doorway to childhood; the instrument of memory.' },
      { name: 'The singing woman', meaning: 'A present trigger that becomes the mother in memory.' },
      { name: 'Winter', meaning: 'The cold present outside the warm remembered room.' },
    ],
    quotes: [
      { text: 'Softly, in the dusk, a woman is singing to me', who: 'The speaker', context: 'The opening scene that triggers the memory.', use: 'Setting, music, memory.' },
      { text: 'I weep like a child for the past', who: 'The speaker', context: 'The final line of the poem.', use: 'Nostalgia, vulnerability, loss.' },
    ],
    essayPrompts: [
      'Discuss the theme of nostalgia in “Piano”.',
      'How does Lawrence use music to explore memory?',
    ],
    examFocus: [
      'The setting moves between the present room and the remembered childhood home.',
      'The final line is the key: the speaker weeps for the past, not just for a person.',
      'Mention the adult’s resistance to memory and his eventual surrender.',
    ],
    sourceNote: 'Appears in the 2023 paper’s non-African poetry alternatives. Quotations are short and for teaching.',
  },

  {
    id: 'if-we-must-die',
    title: 'If We Must Die',
    author: 'Claude McKay',
    genre: 'poetry',
    origin: 'Non-African',
    year: '1919',
    cycle: 'WAEC Ghana Core English: 2022–2026',
    setting: 'A community under attack, facing death with defiance.',
    blurb:
      'A sonnet of resistance: if death is unavoidable, let it be dignified, together and fighting back.',
    whyItMatters:
      'It turns a threat into a rallying call. The poem is often read in the context of racial violence, but its language of courage has travelled widely.',
    structureLabel: 'Movements',
    structure: [
      { label: 'Octave', title: 'Not like hogs', summary: 'The speaker rejects a passive, hunted death. The community should die nobly, with its blood respected.' },
      { label: 'Sestet', title: 'Fighting back', summary: 'He calls on the group to meet the enemy with courage, to strike back even when outnumbered and pressed to the wall.' },
      { label: 'Final line', title: 'The defiance', summary: '“Pressed to the wall, dying, but fighting back!” The poem ends at the point of death, not after it.' },
    ],
    characters: [],
    themes: [
      { title: 'Resistance and dignity', body: 'The poem insists that how a people dies matters. Dignity is not a reward for survival; it is a choice in the face of death.', evidence: 'The contrast between dying “like hogs” and dying “like men”.' },
      { title: 'Oppression and courage', body: 'The enemy is powerful and cowardly; the speaker’s group is outnumbered but not without agency.', evidence: '“the murderous, cowardly pack” and the call to fight.' },
      { title: 'Collective action', body: 'The speaker says “we”, not “I”. The resistance is communal.', evidence: 'The repeated first-person plural.' },
    ],
    symbols: [
      { name: 'The wall', meaning: 'The limit of endurance; the place where resistance becomes inevitable.' },
      { name: 'Hogs', meaning: 'Dehumanisation and a passive death.' },
      { name: 'The pack', meaning: 'The enemy as a cowardly, collective predator.' },
    ],
    quotes: [
      { text: 'If we must die, let it not be like hogs', who: 'The speaker', context: 'The opening declaration of the sonnet.', use: 'Dignity, resistance, simile.' },
      { text: 'Pressed to the wall, dying, but fighting back!', who: 'The speaker', context: 'The final line.', use: 'Defiance, climax, collective courage.' },
    ],
    essayPrompts: [
      'Discuss the theme of resistance in “If We Must Die”.',
      'How does McKay use the sonnet form to convey courage?',
    ],
    examFocus: [
      'Identify the form as a sonnet and note the turn between octave and sestet.',
      'The poem is about dignity under threat, not a celebration of violence for its own sake.',
      'Explain the “hogs” and “pack” imagery precisely.',
    ],
    sourceNote: 'Appears in the 2023 paper’s non-African poetry alternatives. Quotations are short and for teaching.',
  },

  {
    id: 'i-sit-and-look-out',
    title: 'I Sit and Look Out',
    author: 'Walt Whitman',
    genre: 'poetry',
    origin: 'Non-African',
    year: '1860',
    cycle: 'WAEC Ghana Core English: 2022–2026',
    setting: 'A speaker observing the suffering of the world from a distance.',
    blurb:
      'The speaker catalogues the sorrows of the world — oppression, war, poverty, family cruelty — and ends by admitting that he looks, hears and is silent.',
    whyItMatters:
      'It implicates the observer. The poem is not only a list of injustices; it is a confession about the comfort of watching.',
    structureLabel: 'Movements',
    structure: [
      { label: 'Opening', title: 'The observer', summary: 'The speaker sits and looks out on “all the sorrows of the world”. The posture is calm, almost detached.' },
      { label: 'Catalogue', title: 'The suffering', summary: 'A series of images: the oppressed, the dying, the poor, the abused. The list accumulates without explanation.' },
      { label: 'Closing', title: 'Silence', summary: 'The speaker ends by saying he sees, hears and is silent. The silence is the poem’s most disturbing statement.' },
    ],
    characters: [],
    themes: [
      { title: 'Suffering and injustice', body: 'The poem gathers many forms of pain into one field of vision, refusing to rank them.', evidence: 'The catalogue of oppressions and sorrows.' },
      { title: 'Detachment and complicity', body: 'The observer is safe while others suffer. His silence is not peace; it is a form of participation.', evidence: '“See, hear, and am silent.”' },
      { title: 'The limits of sympathy', body: 'Watching is not the same as helping. The poem asks what good observation is without action.', evidence: 'The gap between the speaker’s posture and the suffering he describes.' },
    ],
    symbols: [
      { name: 'The act of looking out', meaning: 'Detached observation; the safety of the witness.' },
      { name: 'Silence', meaning: 'Complicity, helplessness or both.' },
      { name: 'The catalogue', meaning: 'The overwhelming scale of human suffering.' },
    ],
    quotes: [
      { text: 'I sit and look out upon all the sorrows of the world', who: 'The speaker', context: 'The opening line.', use: 'Detachment, witness, the poem’s structure.' },
      { text: 'See, hear, and am silent', who: 'The speaker', context: 'The final line.', use: 'Complicity, silence, the poem’s challenge.' },
    ],
    essayPrompts: [
      'Discuss the theme of suffering in “I Sit and Look Out”.',
      'How does Whitman use the speaker’s detachment to challenge the reader?',
    ],
    examFocus: [
      'The speaker is detached, not necessarily the poet; discuss the persona.',
      'The final line is the key to the poem’s meaning. Do not ignore it.',
      'Expect questions on the catalogue technique and its cumulative effect.',
    ],
    sourceNote: 'Appears in the 2023 paper’s non-African poetry alternatives. Quotations are short and for teaching.',
  },
];
