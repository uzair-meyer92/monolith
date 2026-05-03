/* Token shortcuts mirrored from src/styles/global.css for inline-style usage. */
export const T = {
  black:     '#0A0A0A',
  paper:     '#F4F1EC',
  label:     '#5A544E',
  labelDark: '#B8B1A9',
  gd:        '#5C5751',
  border:    '#D6D2CB',
  accent:    '#8C3A2B',
  d: "'Fraunces',Georgia,serif",
  s: "'Inter',Helvetica,sans-serif",
  m: "'DM Mono',monospace",
};

export const ENQ_EMAIL = 'enquiries@monolith.gallery';

/* Image paths — public/images/ served at /images/ by Vite. */
export const SRCS = {
  hero:        '/images/hero-landscape.jpg',
  visit:       '/images/gallery-interior.jpg',
  work1:       '/images/work-01-oxidised-steel.jpg',
  work2:       '/images/work-02-ground-study.jpg',
  work3:       '/images/work-03-structural-fragment.jpg',
  work1Detail: '/images/work-01-detail.jpg',
  work2Detail: '/images/work-02-detail.jpg',
  work3Detail: '/images/work-03-detail.jpg',
  portrait:    '/images/artist-portrait.jpg',
  install:     '/images/exhibition-install.jpg',
  admirer:     '/images/admirer.jpg',
  archway:     '/images/visitors-archway.jpg',
  installView: '/images/visitors-installation.jpg',
  exterior:    '/images/outside-building-shot.jpg',
  entrance:    '/images/front-main-entrance.jpg',
};

/* Gallery contact — surfaced in the Footer with location/phone/mail icons. */
export const CONTACT = {
  address: '14 Sir Lowry Road, Woodstock, Cape Town',
  phone:   '+27 21 447 1857',
  email:   'enquiries@monolith.gallery',
};

export const ARTIST = {
  name: 'Thandiwe Mokoena',
  portrait: SRCS.portrait,
  portraitPh: 'ph-port',
  bio: "Thandiwe Mokoena (b. 1989, Cape Town) works in sculpture, installation, and site-responsive intervention. Her practice engages with landscape, extraction, and the material residue of spatial policy in post-apartheid South Africa. She studied Fine Art at the Michaelis School of Fine Art, University of Cape Town, and completed her MFA at the Wits School of Arts. She lives and works in Cape Town.",
  cv: {
    education: [
      'MFA, Michaelis School of Fine Art, University of Cape Town, 2014',
      'BA Fine Art (Honours), Rhodes University, Grahamstown, 2009',
    ],
    exhibitions: [
      '2026 — Ground Truth (solo, debut), MONOLITH, Cape Town',
      '2023 — Hold the Line (group), MONOLITH, Cape Town',
      '2022 — Karoo Survey (two-person, with Nobesuthu Shabalala), Stevenson, Cape Town',
      '2021 — Extraction / Repair (group), Iziko South African National Gallery, Cape Town',
      '2019 — New Signatures, Pretoria Art Museum (Sasol Award winner)',
    ],
    collections: [
      'Iziko South African National Gallery, Cape Town',
      'Javett-UP Art Centre, University of Pretoria',
      'Private collections (South Africa, United Kingdom, United States)',
    ],
    residencies: [
      "2023 — Sasol New Signatures Award",
      "2022–2024 — Bag Factory Artists' Studios, Johannesburg",
      "2021 — Nirox Foundation Sculpture Residency, Cradle of Humankind",
    ],
  },
};

/* Curator's Foreword — surfaced on the About page. */
export const CURATOR_FOREWORD = {
  attribution: 'Dr. Lesego Khoza, Curator',
  paragraphs: [
    "Thandiwe Mokoena's work refuses the consolations of metaphor. The sculptures assembled in Ground Truth do not represent landscape — they are landscape, transposed. Each piece carries the residue of the Karoo's slow transformations: rust blooms marking decades of oxidation, fracture lines revealing internal logics of collapse, surfaces scored by wind and geological time. This is not romantic pastoralism. It is material testimony.",
    "Over three years, Mokoena documented sites of extraction, abandoned infrastructure, and ecological shifts driven by climate change across South Africa's interior. Her method is forensic. She sources steel from decommissioned mining equipment, concrete from colonial-era rail foundations, earth pigments from eroded topsoil. The sculptures do not mourn these materials — they activate them, insisting that every surface holds a record, every fracture a history.",
    "The exhibition's title borrows from remote sensing, where \"ground truth\" refers to data verified through direct observation rather than aerial interpretation. Mokoena's sculptures demand proximity. To stand before them is to confront the weight of extraction, the slow violence of erasure, and the stubborn persistence of earth. This is sculpture as witness, as archive, as ground truth.",
  ],
};

/* Past exhibitions at MONOLITH — surfaced on the /exhibition archive. */
export const PAST_EXHIBITIONS = [
  {
    slug: 'soft-country',
    title: 'Soft Country',
    artist: 'Sipho Mathebula',
    kind: 'Solo Exhibition',
    dates: '15 September – 28 October 2023',
    image: '/images/soft-country.jpg',
    imagePh: 'ph-mid',
    text: "Sipho Mathebula's first major show with the gallery — a sequence of pastel-toned mixed-media panels and low concrete reliefs that reread the South African landscape through the language of textile pattern and quilted memory. The exhibition was accompanied by a printed essay by Dr. Lesego Khoza on softness as a counter-archive.",
  },
  {
    slug: 'hold-the-line',
    title: 'Hold the Line',
    artist: 'Curated by Dr. Lesego Khoza',
    kind: 'Group Exhibition',
    dates: '3 March – 14 May 2023',
    image: '/images/hold-the-line.jpg',
    imagePh: 'ph-warm',
    text: "A three-artist exhibition examining infrastructure, borders, and ecological thresholds. Alongside painters Luyanda Zindela and Nobesuthu Shabalala, Mokoena presented Erosion Calendar (2023), a monumental weathered-steel installation mapping climate-driven soil loss across the Northern Cape.",
  },
  {
    slug: 'inaugural',
    title: 'Inaugural',
    artist: 'Group Show',
    kind: 'Opening Exhibition',
    dates: '12 August – 30 September 2023',
    image: '/images/inaugural.jpg',
    imagePh: 'ph-dark',
    text: "MONOLITH's founding exhibition brought together emerging and mid-career South African sculptors working at the intersection of material research and social critique. Featured artists included Thandiwe Mokoena, Sello Pesa, Ayanda Mabulu, and Zanele Situ.",
  },
];

export const EXHIBITION = {
  title: 'Ground Truth',
  titleLead: 'Ground',
  titleAccent: 'Truth',
  dates: '6 February – 28 June 2026',
  venue: 'Main Hall & Annex',
  statement: [
    "Ground Truth marks Thandiwe Mokoena's first solo exhibition with MONOLITH. The exhibition brings together seven wall-based and freestanding sculptural works built from material drawn directly from the Karoo — pigmented soil, salt crust, rusted rebar salvaged from decommissioned infrastructure, and sections of chain-link fence. Mokoena treats these materials as documents: traces of land use, extraction, and the slow administrative violence of border-making.",
    "The exhibition takes its title from the surveyor's term — the physical reference point a satellite image must be anchored to — and asks what it means to ground an image in soil that is itself in the process of being measured, claimed, and moved. Across the seven works, Mokoena refuses the distinction between landscape and monument. The ground is not a backdrop. It is the record.",
    "Ground Truth is accompanied by a new essay by Dr. Lesego Khoza, available in the Journal.",
  ],
  programme: [
    {
      kind: 'Opening Reception',
      date: 'Thursday 6 February 2026',
      time: '18:00 – 21:00',
      detail: 'In the presence of the artist. Free admission, no booking required.',
    },
    {
      kind: "Curator's Walkthrough",
      date: 'Saturday 8 March 2026',
      time: '11:00',
      detail: 'A walkthrough of the exhibition with curator Dr. Lesego Khoza. Limited to 20 visitors — booking required.',
    },
    {
      kind: 'In Conversation',
      date: 'Wednesday 9 April 2026',
      time: '18:30',
      detail: 'Thandiwe Mokoena × Dr. Lesego Khoza. A conversation on material, archive, and the surveyed image.',
    },
    {
      kind: 'Closing',
      date: 'Saturday 28 June 2026',
      time: '16:00',
      detail: 'Final day of the exhibition.',
    },
  ],
  pressRelease: '/press-release',
};

/* Press release content — rendered on /press-release with the hero image
   as a subtle background. Mirrors the canonical press release PDF. */
export const PRESS_RELEASE = {
  statement: [
    "Ground Truth brings together seven monumental sculptures by Thandiwe Mokoena, each bearing witness to the slow transformation of South Africa's interior landscapes. Working primarily with oxidised steel, reclaimed concrete, and earth pigments sourced from the Karoo, Mokoena's practice is rooted in material investigation — testing the tensile strength of memory, the weight of inherited land, and the archaeology of belonging.",
    "The works in this exhibition emerged from a three-year residency in the Northern Cape, where Mokoena spent extended periods documenting sites of industrial extraction, colonial infrastructure, and ecological shifts driven by climate change. Each sculpture holds the residue of place: rust blooms marking decades of exposure, fracture lines revealing the internal logic of collapse, surfaces scored by wind and time.",
    "The title Ground Truth is borrowed from remote sensing — a term for data verified through direct observation rather than aerial interpretation. Mokoena's sculptures insist on proximity: to stand before them is to feel the weight of extraction, the slow violence of erasure, and the stubborn persistence of earth.",
  ],
  works: [
    { title: 'Oxidised Plateau I',         year: 2025, materials: 'Steel, rust, Karoo clay',         dim: '240 × 180 × 45 cm' },
    { title: 'Ground Study (Fractured)',   year: 2025, materials: 'Reclaimed concrete, iron oxide', dim: '195 × 120 × 30 cm' },
    { title: 'Structural Fragment (Hold)', year: 2025, materials: 'Steel rebar, earth pigment',     dim: '210 × 150 × 50 cm' },
    { title: 'Weight of Witness',          year: 2024, materials: 'Oxidised steel, sandstone',      dim: '185 × 165 × 40 cm' },
    { title: 'Erosion Calendar',           year: 2025, materials: 'Weathered steel, quartz',        dim: '220 × 140 × 35 cm' },
    { title: 'Bearing Load',               year: 2024, materials: 'Concrete, rust patina',          dim: '200 × 175 × 48 cm' },
    { title: 'Karoo Survey III',           year: 2025, materials: 'Steel, iron oxide, ash',         dim: '230 × 190 × 42 cm' },
  ],
  artistPara: "Thandiwe Mokoena (b. 1989, Cape Town) is a South African sculptor whose practice centres on landscape, material memory, and the legacies of extraction. She studied Fine Art at Rhodes University (2009) and completed her MFA at the Michaelis School of Fine Art, University of Cape Town (2014). Her work has been exhibited at the Iziko South African National Gallery, Zeitz MOCAA, and the Goodman Gallery, Johannesburg. Recent residencies include the Nirox Foundation (2021) and the Bag Factory Artists' Studios (2022–2024). Mokoena is the recipient of the 2023 Sasol New Signatures Award.",
  press: 'For high-resolution images and further press enquiries, please contact the gallery.',
};

/* Visitor FAQ — surfaced on /visit. Edit the answer text freely. */
export const VISIT_FAQ = [
  {
    q: 'Do I need to book a visit?',
    a: 'Walk-ins are welcome during opening hours for individuals and pairs. Bookings are required for groups of eight or more, and for school and university visits — please write to the gallery at least two weeks in advance.',
  },
  {
    q: 'Is there an admission fee?',
    a: 'Yes — see the rates listed above. Children under six enter free, and South African citizens enter free every Wednesday from 16:00 to 18:00.',
  },
  {
    q: 'Is the gallery wheelchair accessible?',
    a: 'The gallery is on the ground floor with a step-free entrance and one accessible bathroom. Quiet visits outside opening hours can be arranged on request — please write in advance.',
  },
  {
    q: 'Can I take photographs?',
    a: 'Personal photography is permitted in all exhibitions, without flash and without tripods, unless otherwise indicated. Commercial photography requires written permission from the gallery.',
  },
  {
    q: 'Is parking available nearby?',
    a: 'There is limited street parking on Sir Lowry Road. Secure parking is available at the Old Biscuit Mill, a five-minute walk from the gallery.',
  },
  {
    q: 'Can I bring children?',
    a: 'Children are warmly welcome. We ask that under-12s remain in the company of an adult at all times, particularly near freestanding sculptural works.',
  },
  {
    q: 'Are guided tours available?',
    a: "Yes — curator's walkthroughs are scheduled during each exhibition. See the Programme on the home page for upcoming dates. Private tours can be arranged for groups on request.",
  },
  {
    q: 'How do I purchase a work?',
    a: 'All available works can be enquired about directly through the gallery. Open the work in the exhibition page and use the Enquire button, or write to enquiries@monolith.gallery.',
  },
];

/* Social handles — used in the Footer Follow column. */
export const SOCIALS = [
  { name: 'Instagram', handle: '@monolithcapetown', href: 'https://instagram.com/monolithcapetown' },
  { name: 'Facebook',  handle: 'MonolithGallery',   href: 'https://facebook.com/MonolithGallery' },
  { name: 'TikTok',    handle: '@monolithcapetown', href: 'https://tiktok.com/@monolithcapetown' },
  { name: 'X',         handle: '@monolithct',       href: 'https://x.com/monolithct' },
];

/* All works render at 4:5 portrait in both grid and overlay (object-fit:cover). */
export const WORKS = [
  {
    id: 1,
    slug: 'ground-study-i',
    title: 'Ground study (i)',
    year: 2025,
    metadata: 'Wall-based sculpture. Oxidised steel, corrugated zinc. 210 × 340 cm.',
    dim: '210 × 340 cm',
    series: 'From the Ground Truth series, 2024–25',
    edition: 'Unique work',
    availability: 'Price on request',
    desc: "This work documents the surface condition of a decommissioned boundary fence in the Tankwa Karoo. The oxidation was arrested at a specific stage — the artist's intervention is the moment of stopping, not the rust itself.",
    src: SRCS.work1, detail: SRCS.work1Detail, detailMono: false,
    ph: 'ph-dark', aspect: '4/5', w: 800, h: 1000,
  },
  {
    id: 2,
    slug: 'ground-study-ii',
    title: 'Ground study (ii)',
    year: 2025,
    metadata: 'Mixed media on board. Pigmented earth, salt, binder. 180 × 240 cm.',
    dim: '180 × 240 cm',
    series: null,
    edition: 'Edition of 3 + 1 AP',
    availability: 'Price on request',
    desc: "The pigment is ground from soil collected at a single site in the Hantam Karoo over six visits between 2023 and 2025. The pale striations are salt efflorescence — a chemical process the work invites rather than conceals.",
    src: SRCS.work2, detail: SRCS.work2Detail, detailMono: true,
    ph: 'ph-warm', aspect: '4/5', w: 800, h: 1000,
  },
  {
    id: 3,
    slug: 'structural-fragment',
    title: 'Structural fragment',
    year: 2025,
    metadata: 'Freestanding sculpture. Reinforced concrete, rebar, chain-link. 190 × 90 × 65 cm.',
    dim: '190 × 90 × 65 cm',
    series: null,
    edition: 'Unique work',
    availability: 'Sold — private collection, Cape Town',
    desc: "Cast from a section of informal boundary wall outside Upington. The rebar is recovered from the original structure; only the concrete is new.",
    src: SRCS.work3, detail: SRCS.work3Detail, detailMono: true,
    ph: 'ph-mid', aspect: '4/5', w: 800, h: 1000,
  },
];

export const JOURNAL_ARTICLES = [
  {
    id: 1,
    slug: 'notes-on-ground-truth',
    type: 'Essay',
    title: 'Notes on Ground Truth',
    subtitle: 'A curatorial reading',
    author: 'Dr. Lesego Khoza',
    date: 'March 2026',
    body: [
      "To stand in the main hall of Monolith with Thandiwe Mokoena's new works is to become aware of weight in a way that precedes interpretation. The works that comprise Ground Truth are made of materials — poured concrete, oxidised rebar, chain-link fencing, pigmented earth — that belong more naturally to construction sites and remote fieldwork than to galleries, and they bring with them a density that the gallery's white walls cannot absorb.",
      "This is characteristic of Mokoena's understanding of sculpture as a temporal proposition, not merely a spatial one. The works are not finished when they enter the gallery; they continue to work on themselves and on the spaces they occupy.",
      "The exhibition title refers to a surveying term: ground truth is the real condition of a given location, as verified by direct observation on the ground, against which remote-sensed data or administrative maps must be reconciled. It is a concept with specific resonance in the South African context, where the maps of twentieth-century planning continue to structure the distribution of land and infrastructure long after the legal frameworks that produced them have been repealed.",
      "Mokoena's insistence on bringing specific, material samples into the gallery is not documentary. It is a refusal of the abstraction that maps perform. The ground she brings with her remembers, as concrete does, the shape of its formation.",
    ],
  },
  {
    id: 2,
    slug: 'material-as-document',
    type: 'Editorial',
    title: 'On Material as Document',
    subtitle: "A short editorial introducing the gallery's curatorial focus on material-led sculpture",
    author: 'Bongani Sithole',
    date: 'January 2026',
    body: [
      "MONOLITH does not show paintings. It does not, as a rule, show figurative work. The gallery was founded on the conviction that the most urgent contemporary practice in this region is sculptural and material-led — and that the institutional infrastructure for showing such work, at the scale and with the attention it requires, has been thin.",
      "The choice is curatorial, not absolute. There is extraordinary painting being made on this continent, and the galleries that show it are doing important work. But painting carries its image on its surface; the labour of the work, for the viewer, is largely a labour of looking. Sculpture, and especially the kind of installation-scale, material-bound practice we prioritise here, demands something more spatial: the viewer has to occupy a relation to it, has to walk around it, has to negotiate the room.",
      "This is also a position about evidence. Material-led work treats the substance of its making as part of its meaning. A poured-concrete piece records the shape of its formwork, the temperature on the day of its pour, the sediment of the ground it sat on while it cured. These are not metaphors; they are documents. The work is, in a literal sense, a witness to its own production. We are interested in artists who treat that documentary capacity seriously — who make work that does not require an explanatory text to explain what it is.",
      "Material as document is also a position about restraint. The gallery operates on a single-artist model, with one major exhibition at a time, because we believe sustained attention to a small number of practices produces better thinking than the constant rotation that has become the norm. Each exhibition runs for three to four months and is accompanied by an essay commissioned for the show.",
      "The Journal exists to extend that thinking. It is not a press release stream and it is not a marketing channel. It is an editorial space for the slower work of curatorial argument — for essays, conversations, and occasionally letters from the artists themselves. We publish irregularly, and only when we have something to say.",
    ],
  },
];
