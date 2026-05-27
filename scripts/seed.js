const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding bilingual Nuhro Thozhiyoor database...");

  // 1. Seed Admin User
  const existingAdmin = await prisma.user.findUnique({
    where: { username: "admin" },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("NuhroThozhiyoor2026!", 10);
    await prisma.user.create({
      data: {
        username: "admin",
        password: hashedPassword,
        name: "Archivist Admin",
        role: "admin",
      },
    });
    console.log("Admin account created successfully.");
  }

  // 2. Seed Bilingual Posts
  const posts = [
    {
      title: "Origins of the Thozhiyoor Episcopal See",
      titleMalayalam: "തൊഴിയൂർ എപ്പിസ്കോപ്പൽ സിംഹാസനത്തിന്റെ ഉത്ഭവം",
      slug: "origins-of-the-thozhiyoor-episcopal-see",
      summary: "Historical foundations of the Thozhiyoor episcopal tradition and the consecration of 1772.",
      summaryMalayalam: "1772-ലെ മെത്രാൻ സ്ഥാനാഭിഷേകവും തൊഴിയൂർ സഭയുടെ ചരിത്രപരമായ അടിത്തറയും.",
      imageUrl: "https://images.unsplash.com/photo-1548625361-155deee223d5?q=80&w=1200&auto=format&fit=crop",
      category: "History",
      tags: "history,episcopacy,syriac",
      published: true,
      publishedAt: new Date("2026-01-12T00:00:00Z"),
      content: `### Historical Beginnings

The Malabar Independent Syrian Church (Thozhiyur Church) traces its independent status back to **1772**. The establishment of the Episcopal See was a milestone in the history of the Saint Thomas Christian community in Kerala, India.

It began when **Mar Gregorios of Jerusalem**, a Metropolitan of the Syriac Orthodox Church who had arrived in Malabar, consecrated **Kattumangattu Abraham Mar Koorilose** as a Metropolitan. This event took place at Chickkara church near Kunnamkulam. 

### The Flight to Thozhiyoor

Facing severe opposition from state authorities and the contemporary Malankara Metropolitan, Abraham Mar Koorilose withdrew to **Thozhiyoor** (then an independent enclave under the British rule). 

There, in **1789**, he set up the headquarters of the church. This humble village became the sanctuary of independent liturgical traditions, preserving the ancient West Syriac rite in its purest form.

> "The see established in the wilderness of Thozhiyoor became a beacon of autonomy, surviving political tides and ecclesial disputes."`,
      contentMalayalam: `### ചരിത്രപരമായ തുടക്കം

മലബാർ സ്വതന്ത്ര സുറിയാനി സഭ (തൊഴിയൂർ സഭ) അതിന്റെ സ്വതന്ത്ര പദവി **1772** മുതൽ കണ്ടെത്തുന്നു. കേരളത്തിലെ സെന്റ് തോമസ് ക്രിസ്ത്യൻ സമൂഹത്തിന്റെ ചരിത്രത്തിലെ ഒരു സുപ്രധാന നാഴികക്കല്ലായിരുന്നു ഈ എപ്പിസ്കോപ്പൽ സിംഹാസനത്തിന്റെ സ്ഥാപനം.

മലബാറിലെത്തിയ സുറിയാനി ഓർത്തഡോക്സ് സഭയുടെ യെരൂശലേം മെത്രാപ്പോലീത്തയായിരുന്ന **മാർ ഗ്രിഗോറിയോസ്**, കുന്നംകുളത്തിനടുത്തുള്ള ചിരക്കൽ പള്ളിയിൽ വെച്ച് **കാട്ടുമങ്ങാട്ട് അബ്രഹാം റമ്പാനെ** മെത്രാനായി അഭിഷേകം ചെയ്തതോടെയാണ് സഭയുടെ ചരിത്രം ആരംഭിക്കുന്നത്.

### തൊഴിയൂരിലേക്കുള്ള പിൻവാങ്ങൽ

അന്നത്തെ മലങ്കര മെത്രാനിൽ നിന്നും കൊച്ചി രാജാവിൽ നിന്നും കടുത്ത എതിർപ്പുകൾ നേരിട്ടതിനെത്തുടർന്ന് അബ്രഹാം മാർ കൂറിലോസ് ബ്രിട്ടീഷ് ഭരണത്തിൻ കീഴിലുള്ള സ്വതന്ത്ര പ്രദേശമായ **തൊഴിയൂരിലേക്ക്** പിൻവാങ്ങി. 

അവിടെ **1789**-ൽ അദ്ദേഹം സഭയുടെ ആസ്ഥാനം സ്ഥാപിച്ചു. ഈ കൊച്ചു ഗ്രാമം സ്വതന്ത്ര ആരാധനാ പാരമ്പര്യങ്ങളുടെ സങ്കേതമായി മാറി.`,
    },
    {
      title: "Nuhro in Syriac Theology",
      titleMalayalam: "സുറിയാനി ദൈവശാസ്ത്രത്തിലെ 'നൂഹ്റോ' (വെളിച്ചം)",
      slug: "nuhro-in-syriac-theology",
      summary: "Exploring the theological and liturgical significance of Light (Nuhro) in ancient West Syriac liturgy.",
      summaryMalayalam: "പുരാതന വെസ്റ്റ് സുറിയാനി ആരാധനാക്രമത്തിലെ വെളിച്ചത്തിന്റെ ദൈവശാസ്ത്ര പ്രാധാന്യം.",
      imageUrl: "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?q=80&w=1200&auto=format&fit=crop",
      category: "Theology",
      tags: "liturgy,syriac,nuhro",
      published: true,
      publishedAt: new Date("2026-01-05T00:00:00Z"),
      content: `### The Concept of Nuhro

In the Syriac theological tradition, **Nuhro** (ܢܘܗܪܐ), meaning *Light*, is not merely a physical phenomenon, but a core divine attribute. It represents the self-revelation of God and the illumination of the human heart.

### Liturgical Integration

The West Syriac liturgy is saturated with light imagery. During the *Holy Qurbana* (liturgy), the lighting of candles and the prayers offered emphasize the transition of the soul from darkness to light:

1. **The Light of Genesis:** The primordial light spoken by God.
2. **The Light of Christ:** The light that shines in darkness.

> "Blessed is the King who has decorated the sanctuary with His light." - St. Ephrem the Syrian`,
      contentMalayalam: `### നൂഹ്റോ എന്ന സങ്കൽപം

സുറിയാനി ദൈവശാസ്ത്ര പാരമ്പര്യത്തിൽ, വെളിച്ചം എന്ന് അർത്ഥം വരുന്ന **നൂഹ്റോ (ܢܘܗܪܐ)** എന്നത് കേവലം ഭൗതിക പ്രതിഭാസമല്ല, മറിച്ച് ദൈവീക വെളിപാടിന്റെ പ്രതിരൂപമാണ്.

### ആരാധനാക്രമത്തിലെ പ്രയോഗങ്ങൾ

വെസ്റ്റ് സുറിയാനി ആരാധനാക്രമത്തിൽ വെളിച്ചത്തിന്റെ പ്രതീകാത്മകത വളരെ ശക്തമാണ്. വിശുദ്ധ കുർബാനയിൽ മെഴുകുതിരികൾ തെളിക്കുന്നത് ആത്മാവ് അന്ധകാരത്തിൽ നിന്ന് വെളിച്ചത്തിലേക്ക് നയിക്കപ്പെടുന്നതിനെ പ്രതിനിധാനം ചെയ്യുന്നു.

1. **ഉത്പത്തിയിലെ വെളിച്ചം:** ദൈവം അരുളിചെയ്ത ആദിമ വെളിച്ചം.
2. **ക്രിസ്തുവെന്ന പ്രകാശം:** അന്ധകാരത്തിൽ പ്രകാശിക്കുന്ന വെളിച്ചം.`,
    },
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }
  console.log("Seeded posts.");

  // 3. Seed Metropolitans (Configured Abraham Mar Koorilose I as today May 26 for instant testing)
  const today = new Date();
  const currentMonth = today.getMonth() + 1; // getMonth is 0-indexed
  const currentDate = today.getDate();

  const metropolitans = [
    {
      name: "Abraham Mar Koorilose I",
      nameMalayalam: "അബ്രഹാം മാർ കൂറിലോസ് I",
      slug: "abraham-mar-koorilose-i",
      title: "Founder & First Metropolitan of Thozhiyoor",
      titleMalayalam: "സ്ഥാപകനും തൊഴിയൂരിന്റെ ഒന്നാമത് മെത്രാപ്പോലീത്തയും",
      reignStart: "1772",
      reignEnd: "1802",
      bioSummary: "The founding father of the See of Thozhiyoor, who established the church as an independent diocese in 1789.",
      bioSummaryMalayalam: "തൊഴിയൂർ ഭദ്രാസനം സ്ഥാപിക്കുകയും 1789-ൽ സഭയെ സ്വതന്ത്ര പദവിയിലേക്ക് നയിക്കുകയും ചെയ്ത സ്ഥാപക പിതാവ്.",
      imageUrl: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=600&auto=format&fit=crop",
      order: 1,
      remembranceMonth: currentMonth, // Seeded dynamic today for testing remembrance banner
      remembranceDay: currentDate,
      biography: `### Early Life and Consecration

**Kattumangattu Abraham Mar Koorilose** was born into the famous Kattumangattu family in Kunnamkulam. 

In **1772**, during a time of intense administrative disputes, he was consecrated as Metropolitan by **Mar Gregorios**, the metropolitan sent from the Syriac Orthodox See of Jerusalem.

### Establishing the Independent See

Forced to flee opposition, he found refuge in **Thozhiyoor**. In **1789**, he built a small cathedral, a rectory, and established the independent See. His tomb remains a major heritage shrine at the Thozhiyoor Cathedral.`,
      biographyMalayalam: `### ആദ്യകാല ജീവിതവും മെത്രാൻ സ്ഥാനവും

കുന്നംകുളത്തെ പ്രശസ്തമായ കാട്ടുമങ്ങാട്ട് കുടുംബത്തിലാണ് **അബ്രഹാം മാർ കൂറിലോസ്** ജനിച്ചത്.

**1772**-ൽ യെരൂശലേമിലെ സുറിയാനി ഓർത്തഡോക്സ് പ്രതിനിധിയായിരുന്ന **മാർ ഗ്രിഗോറിയോസ്** മെത്രാപ്പോലീത്തയിൽ നിന്ന് അദ്ദേഹം അഭിഷേകം സ്വീകരിച്ചു.

### സ്വതന്ത്ര സിംഹാസനത്തിന്റെ സ്ഥാപനം

എതിർപ്പുകളെത്തുടർന്ന് അദ്ദേഹം **തൊഴിയൂരിലേക്ക്** മാറി താമസിക്കുകയും അവിടെ **1789**-ൽ ഒരു ചെറിയ കത്തീഡ്രൽ സ്ഥാപിക്കുകയും ചെയ്തു. അദ്ദേഹത്തിന്റെ കബറിടം കത്തീഡ്രലിൽ സ്ഥിതി ചെയ്യുന്നു.`,
    },
    {
      name: "Geevarghese Mar Koorilose II",
      nameMalayalam: "ഗീവർഗീസ് മാർ കൂറിലോസ് II",
      slug: "geevarghese-mar-koorilose-ii",
      title: "Second Metropolitan of Thozhiyoor",
      titleMalayalam: "തൊഴിയൂരിന്റെ രണ്ടാമത് മെത്രാപ്പോലീത്ത",
      reignStart: "1802",
      reignEnd: "1808",
      bioSummary: "Brother of the founder, known as the 'Younger Bava', who stabilized the fledgling independent diocese.",
      bioSummaryMalayalam: "സ്ഥാപകന്റെ സഹോദരനും സഭയുടെ ആസ്തികൾ സ്ഥിരപ്പെടുത്താൻ സഹായിച്ച രണ്ടാമത് മെത്രാപ്പോലീത്ത.",
      imageUrl: "https://images.unsplash.com/photo-1543165365-07246c723555?q=80&w=600&auto=format&fit=crop",
      order: 2,
      remembranceMonth: 3,
      remembranceDay: 22,
      biography: `### Consecration and Reign

**Geevarghese Mar Koorilose** was consecrated in **1794** by his brother to guarantee the succession. He took charge in **1802** and is referred to as the **Younger Bava** (*Eliya Bava*). He passed away in **1808**.`,
      biographyMalayalam: `### സ്ഥാനാഭിഷേകവും ഭരണവും

തൊഴിയൂർ സഭയുടെ പിന്തുടർച്ച ഉറപ്പാക്കാൻ **1794**-ൽ സഹോദരൻ അബ്രഹാം മാർ കൂറിലോസിൽ നിന്ന് അദ്ദേഹം മെത്രാൻ സ്ഥാനം സ്വീകരിച്ചു. **1802**-ൽ സഭാ ഭരണം ഏറ്റെടുത്ത അദ്ദേഹം **ഇളയ ബാവ** എന്നറിയപ്പെടുന്നു.`,
    },
  ];

  for (const metro of metropolitans) {
    await prisma.metropolitan.upsert({
      where: { slug: metro.slug },
      update: metro,
      create: metro,
    });
  }
  console.log("Seeded Metropolitans.");

  // 4. Seed Bilingual Parishes
  const parishes = [
    {
      name: "St. George's Cathedral, Thozhiyur",
      nameMalayalam: "സെന്റ് ജോർജ്ജ് കത്തീഡ്രൽ, തൊഴിയൂർ",
      established: "1789",
      vicar: "Very Rev. Fr. Mathew Thomas",
      vicarMalayalam: "വെരി. റവ. ഫാ. മാത്യു തോമസ്",
      contact: "+91 4885 222 201",
      address: "Thozhiyur P.O., Kunnamkulam, Thrissur District, Kerala - 680520",
      addressMalayalam: "തൊഴിയൂർ പി.ഒ., കുന്നംകുളം, തൃശൂർ ജില്ല, കേരളം - 680520",
      latitude: 10.463385,
      longitude: 76.015243,
      mapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.479532890538!2d76.01524317589926!3d10.463385788732644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7faf2ff3ad88f%3A0xe5a3e14562c19e5d!2sSt.%20George&#39;s%20Cathedral%2C%20Thozhiyur!5e0!3m2!1sen!2sin!4v1716768000000!5m2!1sen!2sin",
      history: "The St. George Cathedral is the spiritual and historical Mother Church of the See of Thozhiyoor. Established in 1789 by Abraham Mar Koorilose I, it has housed the graves of all successive Metropolitans of the diocese. The cathedral features antique altar carvings and historical manuscript collections.",
      historyMalayalam: "തൊഴിയൂർ ഭദ്രാസനത്തിന്റെ ആത്മീയവും ചരിത്രപരവുമായ മാതൃദേവാലയമാണ് സെന്റ് ജോർജ്ജ് കത്തീഡ്രൽ. 1789-ൽ അബ്രഹാം മാർ കൂറിലോസ് ഒന്നാമൻ സ്ഥാപിച്ച ഈ പള്ളി, തുടർന്നുവന്ന എല്ലാ മെത്രാപ്പോലീത്തമാരുടെയും കബറിടങ്ങൾ സൂക്ഷിക്കുന്നു. പുരാതനമായ അൾത്താര കൊത്തുപണികളും കത്തീഡ്രലിന്റെ സവിശേഷതകളാണ്.",
      imageUrl: "https://images.unsplash.com/photo-1548625361-155deee223d5?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "St. Thomas' Church, Kunnamkulam",
      nameMalayalam: "സെന്റ് തോമസ് ചർച്ച്, കുന്നംകുളം",
      established: "1829",
      vicar: "Rev. Fr. George Jacob",
      vicarMalayalam: "റവ. ഫാ. ജോർജ്ജ് ജേക്കബ്",
      contact: "+91 4885 224 444",
      address: "Guruvayur Road, Kunnamkulam, Thrissur District, Kerala - 680503",
      addressMalayalam: "ഗുരുവായൂർ റോഡ്, കുന്നംകുളം, തൃശൂർ ജില്ല, കേരളം - 680503",
      latitude: 10.465,
      longitude: 76.04,
      mapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.5!2d76.04!3d10.465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0",
      history: "Established during the reign of Kidangan Geevarghese Mar Philexenos, St. Thomas Church is one of the most prominent urban parishes of the church, acting as a historical link between Thozhiyoor and the merchant town of Kunnamkulam.",
      historyMalayalam: "കിടങ്ങൻ ഗീവർഗീസ് മാർ ഫിലക്സിനോസിന്റെ ഭരണകാലത്ത് സ്ഥാപിതമായ സെന്റ് തോമസ് ചർച്ച് കുന്നംകുളത്തെ പ്രമുഖ ഇടവകകളിലൊന്നാണ്. തൊഴിയൂരും വ്യാപാരി നഗരമായ കുന്നംകുളവും തമ്മിലുള്ള ചരിത്രപരമായ ബന്ധമാണ് ഈ പള്ളി പ്രതിനിധീകരിക്കുന്നത്.",
      imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
    },
  ];

  for (const parish of parishes) {
    const existing = await prisma.parish.findFirst({
      where: { name: parish.name },
    });
    if (!existing) {
      await prisma.parish.create({ data: parish });
    }
  }
  console.log("Seeded parishes.");

  // 5. Seed Gallery Items
  const gallery = [
    {
      title: "Ancient Palm Leaf Liturgy",
      titleMalayalam: "പുരാതന താലിയോല ആരാധനാക്രമം",
      description: "A 19th-century West Syriac liturgical text transcribed onto palm leaves, preserved in the cathedral chest.",
      descriptionMalayalam: "കത്തീഡ്രലിൽ സംരക്ഷിച്ചിരിക്കുന്ന താലിയോലകളിൽ എഴുതിയ 19-ാം നൂറ്റാണ്ടിലെ വെസ്റ്റ് സുറിയാനി ആരാധനാക്രമം.",
      imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=800&auto=format&fit=crop",
      category: "Manuscripts",
    },
  ];

  for (const img of gallery) {
    const existing = await prisma.galleryImage.findFirst({
      where: { title: img.title },
    });
    if (!existing) {
      await prisma.galleryImage.create({ data: img });
    }
  }
  console.log("Seeded gallery.");
  console.log("All seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
