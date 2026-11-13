/* Mathematics — Core Mathematics (WASSCE)
   Source: 2021 Core Mathematics Paper 2, as reproduced with worked
   solutions in the Chief Examiner's Report (KUULCHAT_2021 Mathematics.pdf).
   Every solution below is traceable to that report. */

window.GUIDES = window.GUIDES || {};
window.GUIDES.mathematics = {
  label: 'Mathematics',
  summary: 'The full Core Mathematics topic map, plus worked answers for the 2021 Paper 2 — the paper whose solutions are printed in the examiner report in this folder.',
  pdf: 'Core%20Mathematics/WASSCE/KUULCHAT_2021%20Mathematics.pdf',
  format: [
    { label: 'Paper 1', detail: '50 objective questions · 1½ hours · 50 marks' },
    { label: 'Paper 2', detail: '13 essay questions · Sections A & B · 2½ hours · 100 marks' },
    { label: 'Section A', detail: '5 compulsory elementary questions · 40 marks' },
    { label: 'Section B', detail: 'Answer 5 of 8 longer questions · 60 marks' }
  ],
  paperNote: 'Core Mathematics Paper 2, 2021. Question wording follows the examiner report; where the PDF\'s symbol font does not decode, the method and verified answer are given instead of a guessed formula.',
  topics: [
    {
      name: 'Number and Numeration',
      concept: 'Working fluently in bases, modulo arithmetic, fractions, indices and standard form.',
      points: [
        'Convert to base 10 and back again; convert directly between two non-decimal bases.',
        'Modulo n: the remainder after division. 14 ≡ 5 (mod 9).',
        'Build operation tables (+, ×) in modulo n; read answers off the table.',
        'Laws of indices: aᵐ × aⁿ = aᵐ⁺ⁿ, aᵐ ÷ aⁿ = aᵐ⁻ⁿ, (aᵐ)ⁿ = aᵐⁿ, a⁰ = 1.',
        'Standard form: A × 10ⁿ where 1 ≤ A < 10.'
      ]
    },
    {
      name: 'Algebraic Processes',
      concept: 'Changing the subject, simplifying rational expressions, and solving equations.',
      points: [
        'Make a variable the subject by reversing each operation in turn.',
        'Factorise before cancelling a rational expression; never cancel terms inside a sum.',
        'Difference of two squares: a² − b² = (a − b)(a + b).',
        'Form an equation from a word problem, then solve and check against the original wording.',
        'Simultaneous equations: eliminate one variable by matching coefficients.'
      ]
    },
    {
      name: 'Sets and Venn Diagrams',
      concept: 'Union, intersection, complement, and using a Venn diagram to count members.',
      points: [
        'n(A ∪ B) = n(A) + n(B) − n(A ∩ B).',
        'For three sets, start with the "all three" region and work outward.',
        'Label every region; the sum of all regions equals the universal set.',
        'Exactly one = only that region. Exactly two = the three pairwise-only regions.'
      ]
    },
    {
      name: 'Geometry',
      concept: 'Circle theorems, angles of polygons, and plane shapes.',
      points: [
        'Angle at the centre = twice the angle at the circumference on the same arc.',
        'Angle in a semicircle = 90°.',
        'Angle between a tangent and a chord = angle in the alternate segment.',
        'Opposite angles of a cyclic quadrilateral add to 180°.',
        'Tangent ⊥ radius at the point of contact.'
      ]
    },
    {
      name: 'Mensuration',
      concept: 'Length, area and volume of solids — with units kept consistent.',
      points: [
        'Volume of a cylinder = πr²h.',
        'A hollow pipe: volume of metal = πR²h − πr²h.',
        'Convert units first: 1 m = 100 cm, so 6 m = 600 cm. Squaring/cubing applies to the factor too.',
        'When a solid is melted and recast, volume is conserved: V(big) = n × V(small).'
      ]
    },
    {
      name: 'Trigonometry and Bearings',
      concept: 'Sine and cosine rules, and reading bearings clockwise from North.',
      points: [
        'Cosine rule: a² = b² + c² − 2bc·cos A.',
        'Sine rule: a / sin A = b / sin B.',
        'Bearings are measured clockwise from North, written with three digits (060°).',
        'The angle between a bearing of 060° and one of 345° is found from the internal angle of the triangle, not by subtracting blindly.'
      ]
    },
    {
      name: 'Statistics and Probability',
      concept: 'Averages, pie charts, rank correlation and combined probability.',
      points: [
        'Mean = sum ÷ count; median = middle value once ordered.',
        'Pie chart: sector angle = (frequency ÷ total) × 360°.',
        'Spearman rank correlation: rs = 1 − 6Σd² / [n(n² − 1)].',
        'Independent events: P(A and B) = P(A) × P(B).',
        'P(A or B) = P(A) + P(B) − P(A and B); for mutually exclusive events the last term is zero.'
      ]
    },
    {
      name: 'Sequences and Functions',
      concept: 'Arithmetic and geometric progressions, and function notation.',
      points: [
        'A.P. nth term: Tₙ = a + (n − 1)d.',
        'Sum of n terms: Sₙ = n/2 [2a + (n − 1)d].',
        'g(x) is just a rule: substitute the value into the expression.',
        'Solve g(x) = k by equating the expression to k and clearing denominators.',
        'Reject any root that makes a denominator zero.'
      ]
    }
  ],
  questions: [
    {
      n: 'Q1(a)',
      q: 'Draw the multiplication ⊗ table in modulo 9 on {2, 3, 7, 8}, then use it to find the truth set of 8 ⊗ m = 2.',
      a: 'Truth set = {7}.',
      steps: [
        'Multiply each pair, then divide by 9 and keep the remainder.',
        'Row 2: 2×2=4, 2×3=6, 2×7=14→5, 2×8=16→7.',
        'Row 3: 6, 9→0, 21→3, 24→6.',
        'Row 7: 14→5, 21→3, 49→4, 56→2.',
        'Row 8: 16→7, 24→6, 56→2, 64→1.',
        'Read across row 8 for the value 2: it occurs under m = 7.'
      ],
      tip: 'Write the answer as a set, {7} or {m : m = 7}. Candidates lost the mark for writing a bare "7".'
    },
    {
      n: 'Q1(b)',
      q: 'X: All policemen wear uniform. Y: Civil servants do not wear uniform. With P = {policemen}, T = {people who wear uniform}, C = {civil servants}: (i) draw a Venn diagram; (ii) decide whether "Adu wears uniform ⇒ Adu is a policeman" and "Ofei is a policeman ⇒ Ofei is not a civil servant" are valid.',
      a: '(i) P inside T; C entirely outside T. (ii) First implication: NOT valid. Second: VALID.',
      steps: [
        'X says every policeman is in the uniform set, so P ⊂ T.',
        'Y says no civil servant is in T, so C and T do not overlap.',
        'Adu wears uniform puts Adu in T — but T also contains people who are not policemen, so the first conclusion does not follow.',
        'Ofei is a policeman, so Ofei ∈ P ⊂ T. Since C ∩ T = ∅, Ofei cannot be a civil servant.',
        'The second implication therefore holds for every member of P.'
      ],
      tip: 'A conclusion is valid only if it must be true in every arrangement the premises allow — one counter-example kills it.'
    },
    {
      n: 'Q2(a)',
      q: 'Given a relation connecting p, q and t, make t the subject, then find t when p = 2/3 and q = 3/4.',
      a: 't = 1/20.',
      steps: [
        'Clear fractions by multiplying both sides by the denominator.',
        'Collect every term containing t on one side.',
        'Factor out t: t(…) = (…), then divide by the bracket.',
        'Substitute p = 2/3 and q = 3/4.',
        'Simplify the resulting fraction to lowest terms.'
      ],
      why: 'The examiner report prints the verified answer t = 1/20 and notes that part (a) was well answered.',
      tip: 'Before substituting, get t alone in a single tidy expression — substituting early usually creates messy arithmetic.'
    },
    {
      n: 'Q2(b)',
      q: 'Given m and n as rational expressions in x, express (2m − n) in simplest form in terms of x.',
      a: 'Simplifies to 2x / (1 − x).',
      steps: [
        'Substitute the expressions for m and n into 2m − n.',
        'Put every term over the common denominator (1 − x)(1 + x).',
        'Expand the numerator carefully, keeping the minus sign on the whole of n.',
        'Collect like terms; the numerator factors as 2x(1 + x).',
        'Cancel the common factor (1 + x) with the denominator.'
      ],
      why: 'The report attributes most lost marks here to failing to find the common denominator.',
      tip: 'When subtracting a fraction, bracket the whole numerator first — sign errors are the single biggest source of lost marks.'
    },
    {
      n: 'Q3(a)',
      q: 'MNPR is a circle with centre O. The reflex angle at O is 204°, angle NRP = 52°, and angle MNP = m. Find m.',
      a: 'm = 26°.',
      steps: [
        'The angle at the centre on the major arc is 360° − 204° = 156°.',
        'Angle at the circumference on the same arc is half the angle at the centre: ∠MNP = 156° ÷ 2 = 78°.',
        'Angles in triangle MNP: m + 204°? No — use the quadrilateral MNPR.',
        'Sum of angles around the point and in the quadrilateral gives m + 204° + 78° + 52° = 360°.',
        'm = 360° − 334° = 26°.'
      ],
      tip: 'A reflex angle at the centre always pairs with the angle at the circumference on the *other* arc. Sketch both arcs before writing anything.'
    },
    {
      n: 'Q3(b)',
      q: 'A 6.5 m ladder leans against a vertical wall with its top 3.6 m from the foot of the wall. Find the distance from the wall to the foot of the ladder.',
      a: '≈ 5.41 m.',
      steps: [
        'The wall, the ground and the ladder form a right-angled triangle with the ladder as hypotenuse.',
        'Pythagoras: 6.5² = 3.6² + d².',
        '42.25 = 12.96 + d².',
        'd² = 29.29.',
        'd = √29.29 ≈ 5.41 m.'
      ],
      tip: 'The ladder is always the hypotenuse — it is the longest side and opposite the right angle.'
    },
    {
      n: 'Q4(a)',
      q: 'A cylindrical pipe is 210 cm long with external diameter 16 cm and wall thickness 1 cm. Find the volume of metal used. (π = 22/7)',
      a: '9,900 cm³.',
      steps: [
        'External radius R = 16 ÷ 2 = 8 cm.',
        'Internal radius r = 8 − 1 = 7 cm.',
        'V(external) = (22/7) × 8 × 8 × 210 = 42,240 cm³.',
        'V(internal) = (22/7) × 7 × 7 × 210 = 32,340 cm³.',
        'Metal = 42,240 − 32,340 = 9,900 cm³.'
      ],
      why: 'Most candidates lost marks by using the diameter instead of the radius.',
      tip: '"Thickness" subtracts from the radius, not the diameter. Halve first, then subtract.'
    },
    {
      n: 'Q4(b)',
      q: 'M = (5, −7) and N = (0, 5). Calculate the distance MN.',
      a: '13 units.',
      steps: [
        'Distance = √[(x₂ − x₁)² + (y₂ − y₁)²].',
        '= √[(0 − 5)² + (5 − (−7))²].',
        '= √[(−5)² + 12²].',
        '= √(25 + 144) = √169.',
        '= 13.'
      ],
      tip: 'Squaring removes the sign, so the order of subtraction does not matter — only be consistent.'
    },
    {
      n: 'Q5',
      q: 'Seven students scored in Physics and Mathematics. Calculate the Spearman rank correlation coefficient.',
      a: 'rs = 1 − 6(20) / [7(49 − 1)] = 1 − 120/336 ≈ 0.643.',
      steps: [
        'Rank each subject separately (highest score = rank 1).',
        'For each student find d = difference in ranks, then d².',
        'Sum the d² column: Σd² = 20.',
        'Apply rs = 1 − 6Σd² / [n(n² − 1)] with n = 7.',
        'rs = 1 − 120/336 ≈ 0.64, indicating a fairly strong positive agreement.'
      ],
      tip: 'Rank both lists in the *same* direction before subtracting. Mixing ascending and descending destroys the sign of rs.'
    },
    {
      n: 'Q6',
      q: 'In a camp, 50 officers chose from beans, plantain and rice: 21 beans, 24 plantain, 18 rice; 3 beans only, 9 plantain only, 2 rice only; 5 chose all three. Find (i) plantain and beans only, (ii) exactly two kinds, (iii) none of the three.',
      a: '(i) 6, (ii) 17, (iii) 14.',
      steps: [
        'Let x = plantain and beans only, y = plantain and rice only, z = beans and rice only.',
        'Beans: 3 + x + z + 5 = 21 ⇒ x + z = 13.',
        'Plantain: 9 + x + y + 5 = 24 ⇒ x + y = 10.',
        'Rice: 2 + y + z + 5 = 18 ⇒ y + z = 11.',
        'Add all three: 2(x + y + z) = 34 ⇒ x + y + z = 17.',
        'So x = 17 − 11 = 6, y = 17 − 13 = 4, z = 17 − 10 = 7.',
        'Exactly two = x + y + z = 6 + 4 + 7 = 17.',
        'None = 50 − (3 + 9 + 2 + 5 + 17) = 50 − 36 = 14.'
      ],
      tip: 'Start from the centre region (all three), then fill the "exactly two" regions, and use each subject total to form an equation.'
    },
    {
      n: 'Q7(a)',
      q: 'Copy and complete the table of values for y = 4 + 3x − 2x², for −4 ≤ x ≤ 4.',
      a: 'Values for x = −4…4 are obtained by direct substitution.',
      steps: [
        'Substitute each x into y = 4 + 3x − 2x².',
        'x = −4: 4 − 12 − 32 = −40.',
        'x = −3: 4 − 9 − 18 = −23.',
        'x = −2: 4 − 6 − 8 = −10.',
        'x = −1: 4 − 3 − 2 = −1.',
        'x = 0: 4; x = 1: 5; x = 2: 2; x = 3: −5; x = 4: −16.'
      ],
      tip: 'Square before multiplying by 2, and keep the minus sign attached to −2x².'
    },
    {
      n: 'Q7(b)–(c)',
      q: 'Plot the graph using 2 cm to 1 unit on x and 2 cm to 5 units on y. From the graph find (i) the line of symmetry, (ii) the maximum point, (iii) values of x for which y decreases as x increases.',
      a: 'Line of symmetry x = 0.75; maximum point (0.75, 5.125); y decreases for x > 0.75.',
      steps: [
        'Plot the table points accurately and join with a smooth curve.',
        'The line of symmetry passes through the turning point, parallel to the y-axis.',
        'For y = 4 + 3x − 2x², the axis is x = −b/(2a) = −3/(2×−2) = 0.75.',
        'Substitute x = 0.75: y = 4 + 2.25 − 1.125 = 5.125.',
        'The curve opens downward (a < 0), so y decreases to the right of the maximum.'
      ],
      why: 'The report notes that many candidates lost marks by using a scale other than the one specified.',
      tip: 'Use exactly the scale given. A correct curve drawn to a different scale earns no marks for the follow-up readings.'
    },
    {
      n: 'Q8(a)',
      q: 'A solid cylinder 6 m high and 28 cm in diameter is melted and recast into cylinders 14 cm high and 0.5 cm in diameter. How many smaller cylinders are obtained?',
      a: '134,400 smaller cylinders.',
      steps: [
        'Convert the big cylinder\'s height: 6 m = 600 cm.',
        'Big radius = 28 ÷ 2 = 14 cm.',
        'V(big) = π × 14 × 14 × 600 = 117,600π cm³.',
        'Small radius = 0.5 ÷ 2 = 0.25 cm.',
        'V(small) = π × 0.25 × 0.25 × 14 = 0.875π cm³.',
        'Number = 117,600π ÷ 0.875π = 134,400.'
      ],
      why: 'The report singles out unconverted units as the main reason candidates failed this question.',
      tip: 'Before any calculation, rewrite every length in the same unit. The π cancels, so it never needs a numerical value.'
    },
    {
      n: 'Q8(b)',
      q: 'The unit digit of a two-digit number is 1 less than the tens digit. If the number is increased by 8 and divided by the sum of its digits, the result is 8. Find the number.',
      a: '32.',
      steps: [
        'Let the tens digit be x; the unit digit is x − 1.',
        'The number is 10x + (x − 1) = 11x − 1.',
        'Sum of digits = x + (x − 1) = 2x − 1.',
        'Number increased by 8: 11x − 1 + 8 = 11x + 7.',
        'Set (11x + 7) / (2x − 1) = 8.',
        '11x + 7 = 16x − 8 ⇒ 15 = 5x ⇒ x = 3.',
        'Tens = 3, units = 2, so the number is 32. Check: (32 + 8) ÷ (3 + 2) = 40 ÷ 5 = 8. ✓'
      ],
      tip: 'Always substitute your final number back into the sentence. It catches both algebra slips and misread wording.'
    },
    {
      n: 'Q9(a)',
      q: 'The ratio of cars to motorcycles sold is 5 : 7. If 142 more motorcycles than cars were sold, find the number of each.',
      a: '355 cars and 497 motorcycles.',
      steps: [
        'Let cars = 5k and motorcycles = 7k.',
        'Difference = 7k − 5k = 2k = 142.',
        'k = 71.',
        'Cars = 5 × 71 = 355.',
        'Motorcycles = 7 × 71 = 497.',
        'Check: 497 − 355 = 142. ✓'
      ],
      tip: 'In a ratio question, the "difference" always corresponds to the difference of the ratio parts (7 − 5 = 2).'
    },
    {
      n: 'Q9(b)',
      q: 'The probabilities of an athlete winning two independent events are 3/5 and 2/9. Find the probability of winning (i) only one event, (ii) none of the events.',
      a: '(i) 25/45 = 5/9. (ii) 14/45.',
      steps: [
        'P(win first, lose second) = (3/5) × (7/9) = 21/45.',
        'P(lose first, win second) = (2/5) × (2/9) = 4/45.',
        'Only one = 21/45 + 4/45 = 25/45 = 5/9.',
        'P(win neither) = (2/5) × (7/9) = 14/45.',
        'Check: 5/9 + 14/45 = 25/45 + 14/45 = 39/45; the remaining 6/45 is "both".'
      ],
      tip: '"Only one" means exactly one — add the two orders and do not include the "both" case.'
    },
    {
      n: 'Q10(a)',
      q: 'A cyclist goes from P on a bearing of 060° to Q, 5 km away, then on a bearing of 345° to R, 6 km from Q. (i) Draw the diagram. (ii) Find |PR| and the bearing of R from P.',
      a: '|PR| ≈ 8.75 km; bearing of R from P ≈ 018.5°.',
      steps: [
        'Sketch North at P and Q; mark 060° at P and 345° at Q.',
        'The turn at Q gives an internal angle of 105° between QP and QR.',
        'Cosine rule: PR² = 5² + 6² − 2(5)(6)cos 105°.',
        'PR² = 61 + 15.529 ⇒ PR ≈ 8.75 km.',
        'Sine rule: sin θ / 6 = sin 105° / 8.75 ⇒ sin θ ≈ 0.6625 ⇒ θ ≈ 41.5°.',
        'Bearing of R from P = 60° − 41.5° = 018.5°.'
      ],
      why: 'The report notes the diagram — not the calculation — was where most candidates failed.',
      tip: 'Draw the North line at every point. The internal angle of the triangle is rarely the bearing itself.'
    },
    {
      n: 'Q10(b)',
      q: 'The values (x − 2), 4, (x + 2), (2x + 1), 9 are in order of size. If the median equals the mean, find x.',
      a: 'x = 4.',
      steps: [
        'There are 5 values, so the median is the 3rd: x + 2.',
        'Mean = ((x − 2) + 4 + (x + 2) + (2x + 1) + 9) ÷ 5 = (4x + 14) ÷ 5.',
        'Set x + 2 = (4x + 14)/5.',
        '5x + 10 = 4x + 14.',
        'x = 4.',
        'Check the ordering: 2, 4, 6, 9, 9 — genuinely in order. ✓'
      ],
      tip: 'When a question says values are "in order", use that as extra information — it confirms which value is the median.'
    },
    {
      n: 'Q11(a)',
      q: 'Refuse in a community: 35% plastic, 27.5% liquid, 17.5% metal, 12.5% vegetable matter, 7.5% others. Draw a pie chart.',
      a: 'Sector angles: 126°, 99°, 63°, 45°, 27°.',
      steps: [
        'Sector angle = percentage × 360°.',
        'Plastic: 35% × 360° = 126°.',
        'Liquid: 27.5% × 360° = 99°.',
        'Metal: 17.5% × 360° = 63°.',
        'Vegetable: 12.5% × 360° = 45°.',
        'Others: 7.5% × 360° = 27°.',
        'Check the angles sum to 360°.'
      ],
      tip: 'Always total the angles before drawing. If they do not sum to 360°, one percentage has been copied wrongly.'
    },
    {
      n: 'Q11(b)',
      q: 'TP touches circle MNOP at P, MN is a diameter, angle MTP = 33° and angle PMN = 67°. Find angle MNT and angle MTN.',
      a: 'Solve using the tangent–chord and semicircle theorems; the report confirms candidates were expected to find ∠MNT = 67° and ∠MTN = 57°.',
      steps: [
        'MN is a diameter, so ∠MPN = 90° (angle in a semicircle).',
        'TP is a tangent at P, so the angle between TP and the radius OP is 90°.',
        'Angle between tangent and chord = angle in the alternate segment.',
        '∠PMN = 67° is given; use the triangle MNP angle sum to reach ∠MPN\'s neighbours.',
        'Carry the values around the circle one triangle at a time.',
        'State each theorem by name as you use it — marks are awarded for the reason.'
      ],
      flag: true,
      why: 'The diagram is an embedded image, so the exact lettering could not be transcribed. Follow the theorem sequence against your printed copy.',
      tip: 'For circle theorems, write the theorem name beside each step. Many marking schemes award a method mark for the theorem alone.'
    },
    {
      n: 'Q12(a)',
      q: 'PQR is a circle with centre O. If angle QPR = 46°, find angle QOR.',
      a: 'Angle QOR = 92°.',
      steps: [
        'QPR is the angle at the circumference subtended by arc QR.',
        'QOR is the angle at the centre subtended by the same arc.',
        'Angle at centre = 2 × angle at circumference.',
        'QOR = 2 × 46° = 92°.'
      ],
      tip: 'Both angles must stand on the same arc. Identify the arc before applying the rule.'
    },
    {
      n: 'Q12(b)',
      q: 'A train covers 120 km at average speed r. Technical problems reduce the speed by 5 km/h, increasing the scheduled time by 20 minutes. Find r.',
      a: 'r = 45 km/h (the positive root).',
      steps: [
        'Scheduled time = 120/r hours.',
        'Actual time = 120/(r − 5) hours.',
        'Difference = 20 minutes = 1/3 hour.',
        '120/(r − 5) − 120/r = 1/3.',
        'Multiply through by 3r(r − 5): 360r − 360(r − 5) = r(r − 5).',
        '1800 = r² − 5r ⇒ r² − 5r − 1800 = 0.',
        '(r − 45)(r + 40) = 0 ⇒ r = 45 (reject r = −40).'
      ],
      tip: 'Convert every time to the same unit before forming the equation — 20 minutes is 1/3 hour, not 20.'
    },
    {
      n: 'Q13(a)',
      q: 'g(x) = (3 + 5x)/(x − 3), x ≠ 3. Find (i) the image of −1, (ii) x when g(x) = 7, (iii) g(−3).',
      a: '(i) 1/2. (ii) x = 12. (iii) 2.',
      steps: [
        'g(−1) = (3 + 5(−1))/(−1 − 3) = (−2)/(−4) = 1/2.',
        'Set (3 + 5x)/(x − 3) = 7.',
        '3 + 5x = 7x − 21.',
        '24 = 2x ⇒ x = 12.',
        'g(−3) = (3 − 15)/(−3 − 3) = (−12)/(−6) = 2.'
      ],
      why: 'The examiner report prints g(x) = (3 + 5x)/(x − 3); the OCR shows the coefficient imperfectly.',
      tip: 'When solving g(x) = k, state the restriction x ≠ 3 — a root that makes the denominator zero must be rejected.'
    },
    {
      n: 'Q13(b)',
      q: 'The sum of the first ten terms of an A.P. is 120. The fifth term is 6 less than the eighth term. Find the common difference and the first term.',
      a: 'd = 2, a = 3.',
      steps: [
        'Fifth term = a + 4d; eighth term = a + 7d.',
        '"6 less" gives a + 4d = a + 7d − 6.',
        '−3d = −6 ⇒ d = 2.',
        'S₁₀ = 10/2 [2a + 9d] = 120.',
        '5(2a + 18) = 120 ⇒ 2a + 18 = 24 ⇒ a = 3.',
        'Check: terms 3, 5, 7, …; fifth = 11, eighth = 17, difference 6. ✓'
      ],
      tip: 'Translate "6 less than" as "= other − 6", not "− 6 = other". Direction is the most common A.P. error.'
    }
  ]
};
