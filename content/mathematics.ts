import type { SubjectMeta } from '@/lib/types';

/**
 * Core Mathematics.
 *
 * Every worked example is solved from first principles and checked twice.
 * The chief examiner's report in the vault (KUULCHAT 2021) is the source for
 * the exam notes about showing method and writing answers as sets.
 */

export const mathematics: SubjectMeta = {
  id: 'mathematics',
  name: 'Core Mathematics',
  shortName: 'Maths',
  priority: 3,
  accent: 'sky',
  tagline: 'Not a talent. A set of moves you can practise.',
  description:
    'Number, algebra, geometry, trigonometry and statistics — each one broken into small, reversible steps, with the “why” shown before the formula.',
  examShape: [
    'Paper 1 — objective questions, usually 1 hour',
    'Paper 2 — structured questions with compulsory sections, usually 2 hours',
    'Marks are awarded for method, not only for the final answer',
  ],
  passNote:
    'You do not need to be fast at everything. You need reliable methods for the questions that repeat, and the courage to show your working.',
  paperUrl: '/papers/mathematics/chief-examiner-2021.pdf',
  paperLabel: 'WAEC Chief Examiner’s report 2021 (worked Paper 2)',
  paperSource: 'Core Mathematics/WASSCE/KUULCHAT_2021 Mathematics.pdf',
  topics: [
    /* ------------------------------------------------------------------ */
    {
      id: 'mathematics:number',
      subject: 'mathematics',
      title: 'Number & numeration',
      summary:
        'Indices, number bases, standard form and modular arithmetic — the arithmetic that holds every other topic together.',
      readMinutes: 14,
      difficulty: 'foundation',
      examWeight: 'Paper 1 regularly; Paper 2 number section',
      lesson: {
        bigIdea:
          'Numbers are a language with short cuts. Indices compress repeated multiplication, bases record place value, and modulo keeps only the remainder.',
        analogy: {
          title: 'Crates and coins',
          body:
            '2⁵ means five crates, each holding a 2: 2 × 2 × 2 × 2 × 2. A number base is a currency system: in base 5, the columns are 25s, 5s and 1s, not hundreds, tens and ones. Once you see the columns, conversion is just shopping.',
        },
        example: {
          title: 'One law, three disguises',
          body:
            'When you multiply powers with the same base, add the indices: 2³ × 2⁴ = 2⁷. When you divide, subtract: 2⁷ ÷ 2⁴ = 2³. A negative index is a reciprocal: 2⁻³ = 1/2³. These are not three separate rules to memorise; they all come from counting factors.',
        },
        worked: [
          {
            question: 'Simplify (3⁴ × 3⁻²) ÷ 3³, leaving your answer as a fraction.',
            steps: [
              { label: 'Collect the indices', detail: '3⁴ × 3⁻² = 3^(4 + (−2)) = 3².' },
              { label: 'Divide', detail: '3² ÷ 3³ = 3^(2 − 3) = 3⁻¹.' },
              { label: 'Write without a negative index', detail: '3⁻¹ = 1/3.' },
            ],
            answer: '1/3',
            why: 'A negative index does not make the number negative; it moves the power under a fraction bar.',
          },
          {
            question: 'Convert 234₅ to base ten.',
            steps: [
              { label: 'Write the place values', detail: 'In base 5 the columns are 5² = 25, 5¹ = 5, 5⁰ = 1.' },
              { label: 'Multiply each digit', detail: '2 × 25 = 50; 3 × 5 = 15; 4 × 1 = 4.' },
              { label: 'Add', detail: '50 + 15 + 4 = 69.' },
              { label: 'Check', detail: '69 ÷ 5 = 13 remainder 4; 13 ÷ 5 = 2 remainder 3; 2 ÷ 5 = 0 remainder 2 → 234₅. ✔' },
            ],
            answer: '69₁₀',
            why: 'Always label the base. An unlabelled “69” could be read in any base and loses clarity marks.',
          },
          {
            question: 'Solve 2^(x+1) = 32.',
            steps: [
              { label: 'Make the bases the same', detail: '32 = 2⁵, so the equation is 2^(x+1) = 2⁵.' },
              { label: 'Equate the indices', detail: 'x + 1 = 5.' },
              { label: 'Solve', detail: 'x = 4.' },
            ],
            answer: 'x = 4',
            why: 'The index law only lets you compare powers when the bases match. Rewriting 32 as a power of 2 is the whole trick.',
          },
          {
            question: 'Solve 3x ≡ 4 (mod 5), where 0 ≤ x < 5.',
            steps: [
              { label: 'Understand the statement', detail: '3x leaves remainder 4 when divided by 5.' },
              { label: 'Test the allowed values', detail: 'x = 0 → 0; x = 1 → 3; x = 2 → 6 ≡ 1; x = 3 → 9 ≡ 4; x = 4 → 12 ≡ 2.' },
              { label: 'State the solution set', detail: 'x = 3 is the only value in the range that works.' },
            ],
            answer: 'x = 3',
            why: 'A modular answer is a set of values, not a single number in general. Write “x ≡ 3 (mod 5)” or the truth set {3} when the range is restricted.',
          },
        ],
        deeper: [
          {
            title: 'Why 5⁻² is 1/25',
            body:
              'Continue the division pattern: 5³ = 125, 5² = 25, 5¹ = 5. Each step divides by 5, so 5⁰ = 1 and 5⁻¹ = 1/5. The rule is not arbitrary; it is what keeps the pattern consistent.',
          },
          {
            title: 'Rationalising a surd',
            body:
              'Multiply the top and bottom by the conjugate: 1/(√3 + 1) × (√3 − 1)/(√3 − 1) = (√3 − 1)/(3 − 1) = (√3 − 1)/2. You are using the difference of two squares to remove the surd from the denominator.',
          },
        ],
        pitfalls: [
          'Adding indices when the bases are different — 2³ × 3² is not 6⁵.',
          'Writing 3⁻² as −9 instead of 1/9.',
          'Converting a base number from the wrong end — the rightmost digit is always the units column.',
        ],
        examTip:
          'For number-base questions, write the place-value columns above the digits before you calculate. It is slower for ten seconds and faster for the next five minutes.',
      },
      quiz: [
        {
          id: 'mathematics:number:q1',
          prompt: 'Simplify 2⁵ ÷ 2².',
          options: ['8', '4', '16', '32'],
          answer: 0,
          explanation: 'Subtract the indices: 5 − 2 = 3, so 2³ = 8.',
        },
        {
          id: 'mathematics:number:q2',
          prompt: 'Convert 123₄ to base ten.',
          options: ['27', '39', '23', '31'],
          answer: 0,
          explanation: '1 × 4² + 2 × 4 + 3 = 16 + 8 + 3 = 27.',
        },
        {
          id: 'mathematics:number:q3',
          prompt: 'If 2^x = 64, what is x?',
          options: ['6', '5', '7', '8'],
          answer: 0,
          explanation: '64 = 2⁶, so x = 6.',
        },
        {
          id: 'mathematics:number:q4',
          prompt: 'Evaluate 5⁰ + 5⁻¹.',
          options: ['6/5', '1/5', '1', '5/6'],
          answer: 0,
          explanation: '5⁰ = 1 and 5⁻¹ = 1/5, so the sum is 1 + 1/5 = 6/5.',
        },
        {
          id: 'mathematics:number:q5',
          prompt: 'Which value of x satisfies 3x ≡ 4 (mod 5) for 0 ≤ x < 5?',
          options: ['3', '2', '4', '1'],
          answer: 0,
          explanation: '3 × 3 = 9, and 9 leaves remainder 4 when divided by 5.',
        },
        {
          id: 'mathematics:number:q6',
          prompt: 'Write 0.00042 in standard form.',
          options: ['4.2 × 10⁻⁴', '4.2 × 10⁻³', '42 × 10⁻⁵', '4.2 × 10⁴'],
          answer: 0,
          explanation: 'Move the decimal four places right to get 4.2, so the power is 10⁻⁴.',
        },
      ],
      flashcards: [
        { id: 'mathematics:number:c1', subject: 'mathematics', topicId: 'mathematics:number', front: 'aᵐ × aⁿ', back: 'a^(m+n)', hint: 'Multiply → add indices.' },
        { id: 'mathematics:number:c2', subject: 'mathematics', topicId: 'mathematics:number', front: 'a⁻ⁿ', back: '1/aⁿ', hint: 'Reciprocal, not negative.' },
        { id: 'mathematics:number:c3', subject: 'mathematics', topicId: 'mathematics:number', front: 'Base conversion', back: 'Multiply each digit by its place value and add.', hint: 'Rightmost column is units.' },
        { id: 'mathematics:number:c4', subject: 'mathematics', topicId: 'mathematics:number', front: 'a ≡ b (mod n)', back: 'a and b leave the same remainder when divided by n.', hint: 'Clock arithmetic.' },
        { id: 'mathematics:number:c5', subject: 'mathematics', topicId: 'mathematics:number', front: 'Standard form', back: 'A × 10ⁿ where 1 ≤ A < 10.', hint: 'One non-zero digit before the point.' },
        { id: 'mathematics:number:c6', subject: 'mathematics', topicId: 'mathematics:number', front: 'Rationalise 1/(√a + √b)', back: 'Multiply by (√a − √b)/(√a − √b).', hint: 'Difference of two squares.' },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'mathematics:algebra',
      subject: 'mathematics',
      title: 'Algebra: balance and patterns',
      summary:
        'Linear equations, simultaneous equations, quadratics, variation and sequences — with every sign change accounted for.',
      readMinutes: 15,
      difficulty: 'core',
      examWeight: 'Very high — appears in both papers every year',
      lesson: {
        bigIdea:
          'An equation is a balance. Whatever you do to one side, you must do to the other. Letters are simply numbers whose value you have not met yet.',
        analogy: {
          title: 'A shared bill',
          body:
            'Two friends buy drinks. Kojo buys 2 juices and 3 waters for GHS 12; Ama buys 1 juice and 1 water for GHS 5. Neither receipt tells you the price of a juice alone. Together, they do. That is a pair of simultaneous equations: two pieces of information, two unknowns.',
        },
        example: {
          title: 'The sign is part of the number',
          body:
            'In 5x − 7 = 18, add 7 to both sides to get 5x = 25. Then divide by 5: x = 5. The most common error is subtracting 7 instead of adding it. Ask: what is being done to x, and how do I undo it in reverse order?',
        },
        worked: [
          {
            question: 'Solve the simultaneous equations 2x + 3y = 12 and x − y = 1.',
            steps: [
              { label: 'Make one variable easy', detail: 'From x − y = 1, add y: x = y + 1.' },
              { label: 'Substitute', detail: '2(y + 1) + 3y = 12 → 2y + 2 + 3y = 12.' },
              { label: 'Collect like terms', detail: '5y + 2 = 12 → 5y = 10 → y = 2.' },
              { label: 'Find the other variable', detail: 'x = y + 1 = 3.' },
              { label: 'Check in both equations', detail: '2(3) + 3(2) = 12 ✔ and 3 − 2 = 1 ✔.' },
            ],
            answer: 'x = 3, y = 2',
            why: 'Substitution works because the second equation gives you a true description of x. Replacing x with that description keeps the first equation balanced.',
          },
          {
            question: 'Factorise x² − 5x + 6.',
            steps: [
              { label: 'Find two numbers', detail: 'They must multiply to +6 and add to −5.' },
              { label: 'Test candidates', detail: '(−2) × (−3) = 6 and (−2) + (−3) = −5. ✔' },
              { label: 'Write the brackets', detail: '(x − 2)(x − 3).' },
              { label: 'Expand to check', detail: 'x² − 3x − 2x + 6 = x² − 5x + 6 ✔' },
            ],
            answer: '(x − 2)(x − 3)',
            why: 'The signs matter: two negatives multiply to a positive and add to a negative. Always expand mentally to check.',
          },
          {
            question: 'The 3rd term of an arithmetic sequence is 11 and the 7th term is 27. Find the first term and common difference.',
            steps: [
              { label: 'Write the general term', detail: 'Tₙ = a + (n − 1)d.' },
              { label: 'Form two equations', detail: 'a + 2d = 11 and a + 6d = 27.' },
              { label: 'Subtract', detail: '4d = 16 → d = 4.' },
              { label: 'Substitute back', detail: 'a + 8 = 11 → a = 3.' },
              { label: 'Check', detail: '3, 7, 11, 15, 19, 23, 27 ✔' },
            ],
            answer: 'a = 3, d = 4',
            why: 'Every arithmetic sequence is a straight line in disguise: start at a, add d each time.',
          },
          {
            question: 'Make x the subject of y = 3x − 2.',
            steps: [
              { label: 'Undo the subtraction', detail: 'Add 2 to both sides: y + 2 = 3x.' },
              { label: 'Undo the multiplication', detail: 'Divide by 3: x = (y + 2)/3.' },
            ],
            answer: 'x = (y + 2)/3',
            why: 'Work backwards through the operations in reverse order: subtract 2, then divide by 3.',
          },
        ],
        deeper: [
          {
            title: 'The quadratic formula is a completed square',
            body:
              'For ax² + bx + c = 0, x = [−b ± √(b² − 4ac)] / 2a. The discriminant b² − 4ac tells you how many real roots exist: positive gives two, zero gives one repeated root, negative gives none in the real numbers. It is not magic; it is what remains after completing the square.',
          },
          {
            title: 'Direct and inverse variation',
            body:
              'Direct: y = kx, so y/x is constant. Inverse: y = k/x, so xy is constant. In an exam, write the equation with k first, substitute the given pair to find k, then answer the question. Never assume the constant is 1.',
          },
        ],
        pitfalls: [
          'Changing one side of an equation without changing the other.',
          'Losing a negative sign when substituting.',
          'Dividing both sides by a variable that could be zero — you silently lose a solution.',
          'Forgetting to state the answer in the form the question asked for (“in terms of y”).',
        ],
        examTip:
          'Show the substitution or the factor pair. In structured questions, method marks survive an arithmetic slip. A bare answer does not.',
      },
      quiz: [
        {
          id: 'mathematics:algebra:q1',
          prompt: 'Solve 5x − 7 = 18.',
          options: ['5', '3', '7', '2'],
          answer: 0,
          explanation: 'Add 7: 5x = 25, then divide by 5: x = 5.',
        },
        {
          id: 'mathematics:algebra:q2',
          prompt: 'Factorise x² + 7x + 12.',
          options: ['(x + 3)(x + 4)', '(x + 2)(x + 6)', '(x − 3)(x − 4)', '(x + 1)(x + 12)'],
          answer: 0,
          explanation: '3 × 4 = 12 and 3 + 4 = 7, so the factors are (x + 3)(x + 4).',
        },
        {
          id: 'mathematics:algebra:q3',
          prompt: 'If 2x + 3y = 16 and x = 2, what is y?',
          options: ['4', '3', '5', '2'],
          answer: 0,
          explanation: 'Substitute: 4 + 3y = 16 → 3y = 12 → y = 4.',
        },
        {
          id: 'mathematics:algebra:q4',
          prompt: 'What is the nth term of the sequence 3, 7, 11, 15 …?',
          options: ['4n − 1', '4n + 1', '3n + 1', 'n + 4'],
          answer: 0,
          explanation: 'The first term is 3 and the common difference is 4. a + (n − 1)d = 3 + 4(n − 1) = 4n − 1.',
        },
        {
          id: 'mathematics:algebra:q5',
          prompt: 'Make x the subject of y = 3x − 2.',
          options: ['x = (y + 2)/3', 'x = (y − 2)/3', 'x = 3(y + 2)', 'x = y/3 + 2'],
          answer: 0,
          explanation: 'Add 2 to both sides, then divide by 3: x = (y + 2)/3.',
        },
        {
          id: 'mathematics:algebra:q6',
          prompt: 'Solve x² − 4 = 0.',
          options: ['x = ±2', 'x = 2 only', 'x = 4', 'x = ±4'],
          answer: 0,
          explanation: 'x² = 4, so x = 2 or x = −2. Both square to 4.',
        },
      ],
      flashcards: [
        { id: 'mathematics:algebra:c1', subject: 'mathematics', topicId: 'mathematics:algebra', front: 'Quadratic formula', back: 'x = [−b ± √(b² − 4ac)] / 2a.', hint: 'Sing it once; then derive it.' },
        { id: 'mathematics:algebra:c2', subject: 'mathematics', topicId: 'mathematics:algebra', front: 'Discriminant', back: 'b² − 4ac: >0 two roots, =0 one repeated root, <0 no real roots.', hint: 'It sits under the square root.' },
        { id: 'mathematics:algebra:c3', subject: 'mathematics', topicId: 'mathematics:algebra', front: 'Arithmetic sequence', back: 'Tₙ = a + (n − 1)d.', hint: 'Add the same amount each time.' },
        { id: 'mathematics:algebra:c4', subject: 'mathematics', topicId: 'mathematics:algebra', front: 'Direct variation', back: 'y = kx; y/x is constant.', hint: 'Both grow together.' },
        { id: 'mathematics:algebra:c5', subject: 'mathematics', topicId: 'mathematics:algebra', front: 'Inverse variation', back: 'y = k/x; xy is constant.', hint: 'One grows, the other shrinks.' },
        { id: 'mathematics:algebra:c6', subject: 'mathematics', topicId: 'mathematics:algebra', front: 'Difference of two squares', back: 'a² − b² = (a − b)(a + b).', hint: 'No middle term.' },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'mathematics:geometry',
      subject: 'mathematics',
      title: 'Geometry & mensuration',
      summary:
        'Angle rules, circle theorems, and the area and volume formulas rebuilt from shapes you already understand.',
      readMinutes: 15,
      difficulty: 'core',
      examWeight: 'High — one structured geometry question is almost guaranteed',
      lesson: {
        bigIdea:
          'A formula is a compressed picture. Once you can see where it comes from, you can rebuild it in the exam hall instead of hoping to remember it.',
        analogy: {
          title: 'Tiling a floor',
          body:
            'A rectangle’s area is the number of unit tiles that fit inside. A triangle is half a rectangle — copy it, rotate it, and the two pieces make a rectangle. A circle’s area is a triangle with base equal to the circumference and height equal to the radius: ½ × 2πr × r = πr².',
        },
        example: {
          title: 'Angles in a polygon',
          body:
            'Any polygon can be cut into triangles from one vertex. A pentagon makes three triangles, so its interior angles sum to 3 × 180° = 540°. For an n-sided polygon: (n − 2) × 180°. A regular polygon then divides that total equally.',
        },
        worked: [
          {
            question: 'Find the size of each interior angle of a regular hexagon.',
            steps: [
              { label: 'Use the polygon sum', detail: '(6 − 2) × 180° = 4 × 180° = 720°.' },
              { label: 'Divide equally', detail: '720° ÷ 6 = 120°.' },
              { label: 'Check with the exterior angle', detail: 'Exterior angle = 360° ÷ 6 = 60°, and interior + exterior = 180°. ✔' },
            ],
            answer: '120°',
            why: 'The exterior angles of any convex polygon always add to 360°, which gives a fast check.',
          },
          {
            question: 'Find the area of a sector of radius 7 cm and angle 90°. Take π = 22/7.',
            steps: [
              { label: 'Write the fraction of the circle', detail: '90° is 90/360 = 1/4 of the circle.' },
              { label: 'Area of the whole circle', detail: 'πr² = (22/7) × 7 × 7 = 154 cm².' },
              { label: 'Take the fraction', detail: '1/4 × 154 = 38.5 cm².' },
            ],
            answer: '38.5 cm²',
            why: 'A sector is a fraction of a circle. The angle tells you the fraction; the radius gives the whole.',
          },
          {
            question: 'A cylinder has radius 7 cm and height 10 cm. Find its volume, using π = 22/7.',
            steps: [
              { label: 'Base area', detail: 'πr² = (22/7) × 49 = 154 cm².' },
              { label: 'Multiply by height', detail: '154 × 10 = 1540 cm³.' },
              { label: 'Check units', detail: 'Volume is always cubic: cm³, not cm².' },
            ],
            answer: '1540 cm³',
            why: 'A prism’s volume is base area × height. A cylinder is a circular prism.',
          },
          {
            question:
              'A, B and C lie on a circle with AB as a diameter. What is the size of angle ACB?',
            steps: [
              { label: 'Recall the theorem', detail: 'The angle in a semicircle is a right angle.' },
              { label: 'Identify the diameter', detail: 'AB passes through the centre, so it subtends a semicircle at C.' },
              { label: 'State the angle', detail: 'Angle ACB = 90°.' },
            ],
            answer: '90°',
            why: 'The diameter is the widest chord; any point on the circumference sees it at exactly 90°.',
          },
        ],
        deeper: [
          {
            title: 'Why πr² works',
            body:
              'Cut a circle into many thin slices and rearrange them into a rough rectangle. The width becomes half the circumference (πr) and the height becomes r. Area = πr × r = πr². The more slices, the closer the shape comes to a true rectangle.',
          },
          {
            title: 'Similar shapes: square the ratio',
            body:
              'If two similar figures have lengths in the ratio k, their areas are in the ratio k² and their volumes in k³. Double the radius of a cylinder and its volume becomes eight times larger, not twice. This is a favourite trick in Paper 2.',
          },
        ],
        pitfalls: [
          'Using the diameter where the radius is needed.',
          'Mixing units — 1 m² is 10,000 cm², not 100 cm².',
          'Assuming a polygon is regular when only some sides are equal.',
          'Forgetting the curved surface area when asked for total surface area of a cylinder.',
        ],
        examTip:
          'Draw the diagram larger and mark every known angle or length. Write the theorem name beside each step (“angles in the same segment”). The name earns method marks and keeps your reasoning honest.',
      },
      quiz: [
        {
          id: 'mathematics:geometry:q1',
          prompt: 'What is the sum of the interior angles of an octagon?',
          options: ['1080°', '900°', '1260°', '720°'],
          answer: 0,
          explanation: '(8 − 2) × 180° = 6 × 180° = 1080°.',
        },
        {
          id: 'mathematics:geometry:q2',
          prompt: 'A sector has radius 6 cm and angle 60°. What is its area, in terms of π?',
          options: ['6π cm²', '12π cm²', '36π cm²', '3π cm²'],
          answer: 0,
          explanation: 'The fraction is 60/360 = 1/6. The full circle is 36π, so the sector is 6π cm².',
        },
        {
          id: 'mathematics:geometry:q3',
          prompt: 'A cylinder has radius 3 cm and height 7 cm. What is its volume in terms of π?',
          options: ['63π cm³', '21π cm³', '42π cm³', '9π cm³'],
          answer: 0,
          explanation: 'V = πr²h = π × 9 × 7 = 63π cm³.',
        },
        {
          id: 'mathematics:geometry:q4',
          prompt: 'The angle in a semicircle is',
          options: ['90°', '45°', '180°', '60°'],
          answer: 0,
          explanation: 'An angle subtended by a diameter at the circumference is a right angle.',
        },
        {
          id: 'mathematics:geometry:q5',
          prompt: 'A triangle has base 12 cm and perpendicular height 5 cm. What is its area?',
          options: ['30 cm²', '60 cm²', '17 cm²', '25 cm²'],
          answer: 0,
          explanation: 'Area = ½ × base × height = ½ × 12 × 5 = 30 cm².',
        },
        {
          id: 'mathematics:geometry:q6',
          prompt: 'A regular polygon has an exterior angle of 45°. How many sides does it have?',
          options: ['8', '6', '9', '4'],
          answer: 0,
          explanation: 'Exterior angles sum to 360°, so the number of sides is 360 ÷ 45 = 8.',
        },
      ],
      flashcards: [
        { id: 'mathematics:geometry:c1', subject: 'mathematics', topicId: 'mathematics:geometry', front: 'Interior angle sum', back: '(n − 2) × 180°', hint: 'Cut into triangles.' },
        { id: 'mathematics:geometry:c2', subject: 'mathematics', topicId: 'mathematics:geometry', front: 'Exterior angle sum', back: '360° for any convex polygon.', hint: 'One full turn.' },
        { id: 'mathematics:geometry:c3', subject: 'mathematics', topicId: 'mathematics:geometry', front: 'Sector area', back: '(θ/360) × πr²', hint: 'A fraction of the circle.' },
        { id: 'mathematics:geometry:c4', subject: 'mathematics', topicId: 'mathematics:geometry', front: 'Cylinder volume', back: 'πr²h', hint: 'Base area × height.' },
        { id: 'mathematics:geometry:c5', subject: 'mathematics', topicId: 'mathematics:geometry', front: 'Angle in a semicircle', back: '90°', hint: 'The diameter is the widest chord.' },
        { id: 'mathematics:geometry:c6', subject: 'mathematics', topicId: 'mathematics:geometry', front: 'Similar shapes', back: 'Length ratio k → area ratio k² → volume ratio k³.', hint: 'Square the sides for area.' },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'mathematics:trigonometry',
      subject: 'mathematics',
      title: 'Trigonometry & bearings',
      summary:
        'SOHCAHTOA, the sine and cosine rules, and how to turn a bearing word problem into a triangle you can solve.',
      readMinutes: 13,
      difficulty: 'stretch',
      examWeight: 'One structured question on triangles or bearings',
      lesson: {
        bigIdea:
          'Trigonometry is the study of ratios inside triangles. Because the ratios stay the same when a triangle is enlarged, they let you measure distances you cannot reach.',
        analogy: {
          title: 'A ladder against a wall',
          body:
            'A 5 m ladder leaning at 60° to the ground always reaches the same height, no matter who climbs it. The ratio of height to ladder length is fixed by the angle. That fixed ratio is sin 60°. The triangle can be tiny on paper or huge in real life; the ratio is the same.',
        },
        example: {
          title: 'SOHCAHTOA',
          body:
            'sin θ = opposite/hypotenuse; cos θ = adjacent/hypotenuse; tan θ = opposite/adjacent. Label the sides relative to the angle you are using, not relative to the page. The “opposite” side is the one across from the angle.',
        },
        worked: [
          {
            question:
              'A right-angled triangle has hypotenuse 10 cm and an angle of 30°. Find the side opposite the angle.',
            steps: [
              { label: 'Choose the ratio', detail: 'We know the hypotenuse and want the opposite side: use sin.' },
              { label: 'Write the equation', detail: 'sin 30° = opposite/10.' },
              { label: 'Substitute the exact value', detail: 'sin 30° = 1/2, so opposite = 10 × 1/2 = 5 cm.' },
            ],
            answer: '5 cm',
            why: 'Choose the ratio by listing what you know and what you want. Only one ratio connects all three.',
          },
          {
            question:
              'In triangle ABC, A = 30°, B = 45° and a = 8 cm. Find b, correct to 2 decimal places.',
            steps: [
              { label: 'Recognise the pattern', detail: 'Two angles and a side opposite one of them: use the sine rule.' },
              { label: 'Write it', detail: 'a/sin A = b/sin B.' },
              { label: 'Substitute', detail: '8/sin 30° = b/sin 45°.' },
              { label: 'Solve', detail: 'b = 8 × sin 45° / sin 30° = 8 × 0.7071 / 0.5 ≈ 11.31 cm.' },
            ],
            answer: '≈ 11.31 cm',
            why: 'The sine rule pairs each side with the angle opposite it. Do not pair a side with an adjacent angle.',
          },
          {
            question:
              'A boat sails 10 km on a bearing of 060°. How far east of its starting point is it?',
            steps: [
              { label: 'Draw north and the bearing', detail: 'A bearing is measured clockwise from north. 060° is 60° east of north.' },
              { label: 'Make the triangle', detail: 'The eastward distance is the side opposite the 60° angle at the start; the 10 km path is the hypotenuse.' },
              { label: 'Use sine', detail: 'east = 10 sin 60° = 10 × (√3/2) ≈ 8.66 km.' },
            ],
            answer: '≈ 8.66 km east',
            why: 'Bearings are always clockwise from north. Sketching the north line first prevents the classic sine/cosine mix-up.',
          },
        ],
        deeper: [
          {
            title: 'The cosine rule is Pythagoras with a correction',
            body:
              'a² = b² + c² − 2bc cos A. When A = 90°, cos A = 0 and it becomes Pythagoras. When the angle is obtuse, cos A is negative, so the correction adds length. The rule works for any triangle, which is why it is the general case.',
          },
          {
            title: 'Exact values worth knowing',
            body:
              'sin 30° = 1/2, cos 30° = √3/2, tan 30° = 1/√3; sin 45° = cos 45° = 1/√2, tan 45° = 1; sin 60° = √3/2, cos 60° = 1/2, tan 60° = √3. These come from the 30-60-90 and 45-45-90 triangles, not from a calculator.',
          },
        ],
        pitfalls: [
          'Using the wrong side as “opposite” after rotating the triangle.',
          'Forgetting to switch the calculator to degree mode.',
          'Measuring a bearing anticlockwise or from the south line.',
          'Using the sine rule when you have two sides and the included angle — that is the cosine rule.',
        ],
        examTip:
          'For any triangle question, write “right-angled?” If yes, SOHCAHTOA. If no, ask: do I have a matching side-and-opposite-angle pair? Sine rule. Two sides and the included angle? Cosine rule.',
      },
      quiz: [
        {
          id: 'mathematics:trigonometry:q1',
          prompt: 'What is the exact value of sin 30°?',
          options: ['1/2', '√3/2', '1/√2', '1'],
          answer: 0,
          explanation: 'In a 30-60-90 triangle, the side opposite 30° is half the hypotenuse.',
        },
        {
          id: 'mathematics:trigonometry:q2',
          prompt: 'In a right-angled triangle, the side opposite an angle is 3 cm and the hypotenuse is 5 cm. What is sin θ?',
          options: ['3/5', '4/5', '5/3', '3/4'],
          answer: 0,
          explanation: 'sin θ = opposite/hypotenuse = 3/5.',
        },
        {
          id: 'mathematics:trigonometry:q3',
          prompt: 'What is the value of tan 45°?',
          options: ['1', '0', '√3', '1/2'],
          answer: 0,
          explanation: 'A 45-45-90 triangle has equal opposite and adjacent sides, so the ratio is 1.',
        },
        {
          id: 'mathematics:trigonometry:q4',
          prompt: 'A bearing of 135° points',
          options: ['south-east', 'south-west', 'north-east', 'due east'],
          answer: 0,
          explanation: 'Bearings are clockwise from north: 90° is east, 180° is south, so 135° is exactly south-east.',
        },
        {
          id: 'mathematics:trigonometry:q5',
          prompt: 'Which rule should you use when you know two sides and the angle between them?',
          options: ['Cosine rule', 'Sine rule', 'SOHCAHTOA only', 'Pythagoras only'],
          answer: 0,
          explanation: 'Two sides plus the included angle is the cosine rule: a² = b² + c² − 2bc cos A.',
        },
        {
          id: 'mathematics:trigonometry:q6',
          prompt: 'In a right-angled triangle, the angle is 30° and the adjacent side is 6 cm. What is the opposite side, to 2 decimal places?',
          options: ['3.46 cm', '3.00 cm', '6.00 cm', '10.39 cm'],
          answer: 0,
          explanation: 'tan 30° = opposite/6, so opposite = 6 tan 30° = 6 × 0.5774 ≈ 3.46 cm.',
        },
      ],
      flashcards: [
        { id: 'mathematics:trigonometry:c1', subject: 'mathematics', topicId: 'mathematics:trigonometry', front: 'SOHCAHTOA', back: 'sin = O/H, cos = A/H, tan = O/A.', hint: 'Label from the angle.' },
        { id: 'mathematics:trigonometry:c2', subject: 'mathematics', topicId: 'mathematics:trigonometry', front: 'Sine rule', back: 'a/sin A = b/sin B = c/sin C.', hint: 'Side with its opposite angle.' },
        { id: 'mathematics:trigonometry:c3', subject: 'mathematics', topicId: 'mathematics:trigonometry', front: 'Cosine rule', back: 'a² = b² + c² − 2bc cos A.', hint: 'Pythagoras with a correction.' },
        { id: 'mathematics:trigonometry:c4', subject: 'mathematics', topicId: 'mathematics:trigonometry', front: 'Bearing', back: 'Clockwise angle from north, written with three digits (060°).', hint: 'North is 000°.' },
        { id: 'mathematics:trigonometry:c5', subject: 'mathematics', topicId: 'mathematics:trigonometry', front: 'sin 60°', back: '√3/2', hint: 'The taller acute angle has the larger sine.' },
        { id: 'mathematics:trigonometry:c6', subject: 'mathematics', topicId: 'mathematics:trigonometry', front: 'Angle of elevation', back: 'Measured upward from the horizontal to an object above.', hint: 'Looking up.' },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      id: 'mathematics:statistics',
      subject: 'mathematics',
      title: 'Statistics & probability',
      summary:
        'Averages that tell the truth, frequency tables that stay organised, and probability trees that count without guessing.',
      readMinutes: 13,
      difficulty: 'core',
      examWeight: 'One data question and several objective items',
      lesson: {
        bigIdea:
          'An average is a summary, and every summary hides something. Probability is a way of being honest about uncertainty: a number between 0 and 1, not a feeling.',
        analogy: {
          title: 'The height of a doorway',
          body:
            'If ten people walk through a door, the average height tells you whether the door is comfortable. But if nine are children and one is a giant, the average describes nobody. Mean, median and mode are three different summaries; the shape of the data decides which one tells the truth.',
        },
        example: {
          title: 'Mean from a frequency table',
          body:
            'Values 1, 2, 3 with frequencies 2, 3, 5. Multiply each value by its frequency: 2 + 6 + 15 = 23. Divide by the total frequency 10: mean = 2.3. The frequency is how many times each value appears, so it carries weight.',
        },
        worked: [
          {
            question: 'Find the mean of 4, 7, 9, 12, 18.',
            steps: [
              { label: 'Add', detail: '4 + 7 + 9 + 12 + 18 = 50.' },
              { label: 'Count', detail: 'There are 5 values.' },
              { label: 'Divide', detail: '50 ÷ 5 = 10.' },
            ],
            answer: '10',
            why: 'The mean is the total shared equally. It is sensitive to extreme values, which is why the median is often used for incomes and house prices.',
          },
          {
            question: 'Find the median of 3, 8, 5, 12, 9, 7.',
            steps: [
              { label: 'Sort first', detail: '3, 5, 7, 8, 9, 12.' },
              { label: 'Find the middle', detail: 'There are 6 values, so the median is the mean of the 3rd and 4th: (7 + 8)/2.' },
              { label: 'Calculate', detail: '15/2 = 7.5.' },
            ],
            answer: '7.5',
            why: 'With an even number of values there is no single middle item, so average the two central values.',
          },
          {
            question:
              'A bag contains 3 red and 5 blue balls. Two balls are drawn without replacement. Find the probability that both are red.',
            steps: [
              { label: 'First draw', detail: 'P(red) = 3/8.' },
              { label: 'Second draw after a red is removed', detail: '2 red remain out of 7: P(red) = 2/7.' },
              { label: 'Multiply along the branch', detail: '3/8 × 2/7 = 6/56 = 3/28.' },
            ],
            answer: '3/28',
            why: 'Without replacement, both the numerator and denominator change. A tree diagram makes the two stages visible.',
          },
          {
            question: 'In a pie chart, a sector represents 25% of the data. What angle does it subtend?',
            steps: [
              { label: 'A full pie is 360°', detail: '25% is one quarter of the data.' },
              { label: 'Take one quarter of 360°', detail: '360° ÷ 4 = 90°.' },
            ],
            answer: '90°',
            why: 'Pie chart angles are fractions of 360°. Always check that the angles add to 360°.',
          },
        ],
        deeper: [
          {
            title: 'Independent vs mutually exclusive',
            body:
              'Mutually exclusive events cannot both happen: P(A or B) = P(A) + P(B). Independent events do not affect each other: P(A and B) = P(A) × P(B). Drawing a card and drawing another without replacement is not independent — the first draw changes the second.',
          },
          {
            title: 'Why the mean can mislead',
            body:
              'If nine students score 40 and one scores 100, the mean is 46, but nobody scored near 46. The median (40) is a more honest summary. In Paper 2, a question may ask you to compare the mean and median; the answer is often about skew and outliers.',
          },
        ],
        pitfalls: [
          'Finding the median without sorting the data first.',
          'Using the total number of values instead of total frequency in a frequency table.',
          'Forgetting to subtract one item on the second draw without replacement.',
          'Giving a probability greater than 1 or less than 0.',
        ],
        examTip:
          'For probability, write the sample space or draw the tree. For statistics, show the sum and the count separately. Even when the final answer is wrong, the method is visible and earns marks.',
      },
      quiz: [
        {
          id: 'mathematics:statistics:q1',
          prompt: 'Find the mean of 4, 6, 8, 10, 12.',
          options: ['8', '10', '6', '9'],
          answer: 0,
          explanation: 'The sum is 40 and there are 5 values, so the mean is 40 ÷ 5 = 8.',
        },
        {
          id: 'mathematics:statistics:q2',
          prompt: 'Find the median of 2, 5, 5, 7, 10.',
          options: ['5', '6', '7', '5.5'],
          answer: 0,
          explanation: 'The values are already ordered. The middle (third) value is 5.',
        },
        {
          id: 'mathematics:statistics:q3',
          prompt: 'A fair die is rolled once. What is the probability of getting a prime number?',
          options: ['1/2', '1/3', '1/6', '2/3'],
          answer: 0,
          explanation: 'The primes on a die are 2, 3 and 5 — three outcomes out of six, so 3/6 = 1/2.',
        },
        {
          id: 'mathematics:statistics:q4',
          prompt: 'Two fair coins are tossed. What is the probability of getting two heads?',
          options: ['1/4', '1/2', '1/3', '3/4'],
          answer: 0,
          explanation: 'The sample space is HH, HT, TH, TT. Only one of four outcomes is HH.',
        },
        {
          id: 'mathematics:statistics:q5',
          prompt: 'If P(A) = 0.35, what is P(not A)?',
          options: ['0.65', '0.35', '1.35', '0.5'],
          answer: 0,
          explanation: 'The probabilities of an event and its complement add to 1: 1 − 0.35 = 0.65.',
        },
        {
          id: 'mathematics:statistics:q6',
          prompt: 'Which average is most affected by one extremely large value?',
          options: ['The mean', 'The median', 'The mode', 'The range'],
          answer: 0,
          explanation: 'The mean uses every value, so a single outlier pulls it. The median depends only on position.',
        },
      ],
      flashcards: [
        { id: 'mathematics:statistics:c1', subject: 'mathematics', topicId: 'mathematics:statistics', front: 'Mean', back: 'Sum of values ÷ number of values.', hint: 'Share the total equally.' },
        { id: 'mathematics:statistics:c2', subject: 'mathematics', topicId: 'mathematics:statistics', front: 'Median', back: 'The middle value after sorting; average the two middle values if n is even.', hint: 'Sort first.' },
        { id: 'mathematics:statistics:c3', subject: 'mathematics', topicId: 'mathematics:statistics', front: 'Mode', back: 'The value that appears most often.', hint: 'The popular one.' },
        { id: 'mathematics:statistics:c4', subject: 'mathematics', topicId: 'mathematics:statistics', front: 'P(not A)', back: '1 − P(A).', hint: 'Certainty is 1.' },
        { id: 'mathematics:statistics:c5', subject: 'mathematics', topicId: 'mathematics:statistics', front: 'Independent events', back: 'P(A and B) = P(A) × P(B).', hint: 'One does not change the other.' },
        { id: 'mathematics:statistics:c6', subject: 'mathematics', topicId: 'mathematics:statistics', front: 'Pie chart angle', back: '(frequency ÷ total) × 360°.', hint: 'A full turn.' },
      ],
    },
  ],
};
