function rows(topic, items) {
  return items.map(([prompt, options, answer, why]) => ({
    type: "choice",
    topic,
    prompt,
    options,
    answer,
    why,
  }));
}

const adjektive = rows("adjektive", [
  ["mit ___ Wein (no article, masculine)", ["rotem", "roter", "roten", "rotes"], 0, "No article, dative masculine: strong -em."],
  ["ein ___ Tag (nominative masculine)", ["schöner", "schönen", "schönes", "schönem"], 0, "After ein, masculine nominative takes -er."],
  ["das ___ Glas (accusative neuter, definite)", ["leere", "leeren", "leeres", "leerem"], 0, "After das, accusative neuter is weak -e."],
  ["Ich schlafe in einem ___ Zimmer.", ["ruhigen", "ruhigem", "ruhiges", "ruhiger"], 0, "einem already marks dative neuter, so the adjective is weak -en."],
  ["___ Leute warten draußen. No article, nominative plural.", ["Freundliche", "Freundlichen", "Freundlicher", "Freundliches"], 0, "No article, nominative plural: strong -e. Freundliche Leute."],
  ["Das ist die ___ Idee des Tages.", ["beste", "besten", "am besten", "bester"], 0, "Attributive superlative after die: -e."],
  ["Dieser Weg ist ___ als der andere.", ["kürzer", "kürzest", "am kürzesten", "kurz"], 0, "Comparison of two things uses the comparative + als."],
  ["Von allen Texten ist dieser ___.", ["am klarsten", "am klarstensten", "der klar", "klaren"], 0, "Predicate superlative: am + sten."],
  ["für ___ Freundin (possessive, accusative feminine)", ["meine alte", "meiner alten", "meinem alten", "meinen alten"], 0, "Accusative feminine after meine: weak -e on the adjective. meine alte Freundin."],
  ["trotz ___ Wetters", ["des schlechten", "dem schlechten", "des schlechtem", "der schlechten"], 0, "Genitive neuter: des schlechten Wetters. Weak -en after des."],
  ["zwei ___ Kinder (no article, accusative)", ["müde", "müden", "müdes", "müdem"], 0, "No article, accusative plural: strong -e."],
  ["Sie sucht einen ___ Job.", ["interessanten", "interessante", "interessanter", "interessantem"], 0, "einen marks accusative masculine, adjective weak -en."],
]);

const kasus = rows("kasus", [
  ["Der Koffer ___ meinem Bruder.", ["gehört", "sieht", "kauft", "braucht"], 0, "gehören takes the dative."],
  ["Kannst du ___ bitte helfen? (ich)", ["mir", "mich", "ich", "mein"], 0, "helfen + dative: mir."],
  ["Wir danken ___ für die Einladung. (ihr, plural)", ["ihnen", "sie", "ihr", "ihren"], 0, "danken + dative plural: ihnen."],
  ["Das Buch gefällt ___. (die Studentin)", ["der Studentin", "die Studentin", "den Studentin", "der Student"], 0, "gefallen + dative feminine: der Studentin."],
  ["Sie erklärt ___ den Plan. (die Gäste)", ["den Gästen", "die Gäste", "den Gäste", "der Gäste"], 0, "Person is dative plural: den Gästen. den Plan is accusative."],
  ["Pronoun order.", ["Ich gebe es dir.", "Ich gebe dir es.", "Ich gebe dich es.", "Ich gebe dem es."], 0, "Two pronouns: accusative before dative."],
  ["Neutral order of two nouns.", ["Er schenkt seiner Mutter Blumen.", "Er seiner Mutter schenkt Blumen.", "Er schenkt Blumen dem Mutter.", "Er schenkt sie ihrer Mutter."], 0, "Dative noun before accusative noun is the neutral order."],
  ["Ich begegne heute ___.", ["einem alten Freund", "einen alten Freund", "ein alter Freund", "einem alten Freundem"], 0, "begegnen takes the dative."],
  ["Vertrauen takes…", ["the dative", "the accusative", "the genitive only", "no object"], 0, "Ich vertraue dir."],
  ["für takes…", ["the accusative", "the dative", "the genitive", "either, like in"], 0, "für, durch, gegen, ohne, um are accusative."],
  ["seit takes…", ["the dative", "the accusative", "the genitive", "no case"], 0, "aus, bei, mit, nach, seit, von, zu are dative."],
  ["Replace both: Nora zeigt dem Kind das Foto.", ["Nora zeigt es ihm.", "Nora zeigt ihm es.", "Nora zeigt ihn ihm.", "Nora zeigt es er."], 0, "das Foto → es, dem Kind → ihm. Accusative pronoun first."],
]);

const futur = rows("futur", [
  ["A promise.", ["Ich werde dich heute Abend anrufen.", "Ich werde dich heute Abend angerufen.", "Ich werde dich anrufen werden.", "Ich anrufen werde dich."], 0, "Futur I: werden + infinitive."],
  ["A guess about now.", ["Er wird noch im Büro sein.", "Er wird noch im Büro gewesen.", "Er wird noch im Büro ist.", "Er sein wird noch im Büro haben."], 0, "Inference about the present uses werden + infinitive."],
  ["Futur II, finished before Friday.", ["Bis Freitag werde ich das Kapitel gelesen haben.", "Bis Freitag werde ich das Kapitel lesen haben.", "Bis Freitag habe ich das Kapitel werden gelesen.", "Bis Freitag werde ich das Kapitel gelesen worden."], 0, "werden + participle + haben/sein."],
  ["ankommen in Futur II.", ["Sie wird schon angekommen sein.", "Sie wird schon angekommen haben.", "Sie wird schon ankommen gewesen.", "Sie ist schon ankommen werden."], 0, "ankommen takes sein."],
  ["A softened order.", ["Du wirst das heute noch erledigen.", "Du wirst das heute noch erledigt.", "Du erledigen wirst das.", "Du hast das werden erledigen."], 0, "Futur I can sound like an instruction."],
  ["Ordinary plan, most natural in speech.", ["Morgen fahre ich nach Ulm.", "Morgen werde gefahren ich.", "Morgen ich werde fahren.", "Morgen fahren werde ich gehabt."], 0, "A time word plus the present is the everyday future. The verb stays second."],
  ["Guess about the past.", ["Er wird den Bus verpasst haben.", "Er wird den Bus verpassen haben.", "Er hat den Bus werden verpasst.", "Er wird den Bus verpasst worden."], 0, "Futur II for a past inference."],
  ["Separable verb in Futur I.", ["Wir werden um sieben aufstehen.", "Wir werden um sieben aufgestanden.", "Wir aufstehen werden um sieben.", "Wir werden um sieben zu aufstehen."], 0, "The infinitive stays whole at the end. No zu."],
  ["worden belongs to…", ["the perfect passive, not Futur I", "Futur I", "every future sentence", "Konjunktiv II"], 0, "Futur I uses the infinitive. worden is the passive auxiliary’s participle."],
  ["Which sentence is Futur II?", ["Bis acht werden wir gegessen haben.", "Wir werden um acht essen.", "Wir essen um acht.", "Wir würden um acht essen."], 0, "Participle + haben after werden marks Futur II."],
  ["Position of werden.", ["In position 2 of a main clause", "Always at the end", "Always first", "After the infinitive"], 0, "Werden is the finite verb, so it stands in second position."],
  ["Sie ___ das schon schaffen. (encouragement)", ["wird", "wurde", "worden", "wärest"], 0, "Futur I, sie-form: wird."],
]);

const rede = rows("rede", [
  ["„Ich bin krank.“ Formal report.", ["Er sagt, er sei krank.", "Er sagt, er ist krank.", "Er sagt, er wäre krank gewesen.", "Er sagt, dass er sei krank ist."], 0, "Konjunktiv I of sein is sei. The indicative is everyday speech; formal writing uses the Konjunktiv."],
  ["„Ich habe die Mail gelesen.“", ["Sie sagt, sie habe die Mail gelesen.", "Sie sagt, sie las die Mail im Konjunktiv I.", "Sie sagt, sie hätte die Mail gelesen werden.", "Sie sagt, sie lese die Mail gehabt."], 0, "A past statement becomes habe + participle."],
  ["Ambiguous wir-form.", ["Sie sagen, sie kämen später.", "Sie sagen, sie kommen später, in formal writing.", "Sie sagen, sie kommt später.", "Sie sagen, sie sei kommen."], 0, "kommen in the plural looks like the indicative, so use kämen."],
  ["Konjunktiv I of haben, er.", ["habe", "hätte", "hat", "hatte"], 0, "er habe is Konjunktiv I. hätte is Konjunktiv II."],
  ["Reported yes/no question.", ["Sie fragt, ob er mitkomme.", "Sie fragt, ob kommt er mit.", "Sie fragt, kommt ob er mit.", "Sie fragt, dass er mitkomme."], 0, "ob, then verb at the end."],
  ["„Wo wohnst du?“ addressed to him.", ["Sie fragt, wo er wohne.", "Sie fragt, wo wohnt er.", "Sie fragt, wo er wohnt hin.", "Sie fragt, wohin er sei wohnen."], 0, "Question word stays. Konjunktiv I: wohne."],
  ["Reported command.", ["Er sagte, wir sollten warten.", "Er sagte, wir warten sollen dass.", "Er sagte, ob wir warten.", "Er sagte, wir würden zu warten."], 0, "Commands are reported with sollen."],
  ["„Wir sind fertig.“ Avoid the ambiguous form.", ["Sie sagen, sie seien fertig.", "Sie sagen, sie sind fertig.", "Sie sagen, sie seid fertig.", "Sie sagen, sie bist fertig."], 0, "sie seien is clearly Konjunktiv. sie sind is also the indicative, so formal writing avoids it."],
  ["One Konjunktiv covers…", ["present and future of the original statement", "only the past", "only commands", "only questions"], 0, "The past needs the perfect infinitive pattern instead."],
  ["„Er kommt morgen.“", ["Man sagt, er komme morgen.", "Man sagt, er kam morgen.", "Man sagt, er komme morgen gewesen.", "Man sagt, kommt er morgen."], 0, "er-form Konjunktiv I: komme. morgen can stay."],
  ["dass-clause, verb position.", ["Er behauptet, dass er nichts gewusst habe.", "Er behauptet, dass er habe nichts gewusst.", "Er behauptet, dass habe er nichts gewusst.", "Er behauptet, dass er nichts habe gewusst werden sei."], 0, "In the dass-clause the finite verb habe closes it. The participle stands before habe."],
  ["Everyday speech often uses the indicative. Exams want…", ["Konjunktiv I, or Konjunktiv II if that form is ambiguous", "only Präteritum", "only Futur II", "a question mark"], 0, "That is the written standard for indirect speech."],
]);

const kausalFinal = rows("kausal-final", [
  ["weil and word order.", ["Ich bleibe hier, weil ich müde bin.", "Ich bleibe hier, weil ich bin müde.", "Ich bleibe hier, denn ich müde bin.", "Weil ich bin müde, bleibe ich hier."], 0, "weil sends the verb to the end."],
  ["denn.", ["Ich bleibe hier, denn ich bin müde.", "Ich bleibe hier, denn ich müde bin.", "Denn ich bin müde, bleibe ich hier.", "Ich denn bleibe, weil müde."], 0, "denn keeps verb-second and cannot start the sentence."],
  ["deshalb.", ["Ich bin müde. Deshalb bleibe ich hier.", "Ich bin müde. Deshalb ich bleibe hier.", "Deshalb ich bin müde bleibe.", "Ich bin müde, deshalb ich hier bleibe."], 0, "deshalb takes first position; the verb follows."],
  ["da.", ["Da der Saal voll ist, warten wir.", "Da der Saal ist voll, warten wir.", "Da der Saal voll ist, wir warten.", "Da ist der Saal voll, warten wir."], 0, "da is subordinating, like weil, and likes the first position."],
  ["wegen.", ["Wegen des Nebels fällt der Flug aus.", "Wegen dem Nebel fällt der Flug aus, in the exam norm.", "Wegen den Nebel fällt der Flug aus.", "Wegen der Nebels fällt der Flug aus."], 0, "Written wegen takes the genitive: des Nebels."],
  ["nämlich sits…", ["inside the clause, after the verb", "only at the start, with verb-final", "instead of a noun", "before weil"], 0, "Ich komme später. Ich habe nämlich noch einen Termin."],
  ["Same subject, purpose.", ["Sie lernt viel, um die Prüfung zu bestehen.", "Sie lernt viel, damit die Prüfung zu bestehen.", "Sie lernt viel, um die Prüfung besteht.", "Sie lernt viel, um zu die Prüfung bestehen."], 0, "Same subject → um … zu."],
  ["Different subjects.", ["Ich schreibe laut, damit du es hörst.", "Ich schreibe laut, um du es zu hören.", "Ich schreibe laut, damit du es hörst zu.", "Ich schreibe laut, um dass du hörst."], 0, "Two subjects → damit, verb at the end."],
  ["zu in a separable verb.", ["um pünktlich aufzustehen", "um auf zu stehen pünktlich", "um zu aufstehen pünktlich", "um aufstehen zu"], 0, "zu splits the prefix: aufzustehen."],
  ["Which sentence marks the cause only once?", ["Weil es regnet, bleiben wir zu Hause.", "Weil es regnet, deshalb bleiben wir zu Hause.", "Es regnet, weil deshalb wir bleiben.", "Deshalb weil es regnet, bleiben wir."], 0, "weil is enough. deshalb would open its own main clause, not sit inside the weil-clause."],
  ["Rewrite target: Weil sie übt, wird sie sicherer. A purpose version would be different. Which is purpose?", ["Sie übt, um sicherer zu werden.", "Sie wird sicherer, weil sie übt.", "Deshalb übt sie.", "Denn sie übt, wird sie sicherer."], 0, "um … zu answers Wozu?, not Warum?"],
  ["Verb after a fronted weil-clause.", ["Weil es spät ist, nehmen wir ein Taxi.", "Weil es spät ist, wir nehmen ein Taxi.", "Weil ist es spät, nehmen wir ein Taxi.", "Weil es spät ist, nehmen ein Taxi wir."], 0, "The subordinate clause fills position 1, so nehmen is next."],
]);

const konjunktiv2 = rows("konjunktiv2", [
  ["Polite shop request.", ["Könnten Sie das bitte einpacken?", "Können Sie das bitte zu einpacken?", "Würden Sie das bitte zu einpacken?", "Könntet Sie das bitte einpacken?"], 0, "Könnten Sie… is the polite form. No zu."],
  ["Unreal present of haben.", ["Wenn wir mehr Zeit hätten, …", "Wenn wir mehr Zeit haben würden gehabt, …", "Wenn wir mehr Zeit gehabt, …", "Wenn wir mehr Zeit sind, …"], 0, "hätten is the form to use."],
  ["Unreal present of sein.", ["Wenn ich du wäre, würde ich zusagen.", "Wenn ich du bin, würde ich zusagen.", "Wenn ich du gewesen, zusagen ich.", "Wenn ich du würde, wäre ich zusagen."], 0, "wäre, and würde + infinitive in the main clause."],
  ["Both halves unreal.", ["Wenn er anrufen würde, würde ich rangehen.", "Wenn er anruft, gehe ich ran.", "Wenn er angerufen, ich rangehe.", "Wenn würde er anruft, ich gehen."], 0, "An unreal condition wants Konjunktiv II on both sides."],
  ["Past unreal.", ["Wenn du geschrieben hättest, hätte ich geantwortet.", "Wenn du geschrieben hast, antworte ich.", "Wenn du hättest geschrieben würden.", "Wenn du schriebst, habe ich geantwortet."], 0, "hätte + participle in both halves."],
  ["Modal in the unreal past.", ["Du hättest früher anrufen sollen.", "Du solltest früher anrufen haben.", "Du hättest sollen früher anrufen.", "Du würdest früher gesollt anrufen."], 0, "hätte + infinitive + modal infinitive at the end."],
  ["Advice.", ["An deiner Stelle würde ich pausieren.", "An deiner Stelle ich würde pausieren.", "An deiner Stelle würde ich zu pausieren.", "An deiner Stelle pausieren ich."], 0, "würde in second position, infinitive at the end."],
  ["A wish.", ["Wenn ich doch singen könnte!", "Wenn ich doch singen kann!", "Wenn ich doch singen konnte!", "Können ich doch singen!"], 0, "könnte is Konjunktiv II of können."],
  ["käme is…", ["Konjunktiv II of kommen", "Präteritum of kommen", "Konjunktiv I of kommen", "a passive"], 0, "The simple past is kam. käme is the unreal form."],
  ["Main clause after a fronted wenn.", ["Wenn es ginge, käme ich mit.", "Wenn es ginge, ich käme mit.", "Wenn ginge es, käme ich mit.", "Wenn es ginge, käme mit ich."], 0, "The wenn-clause is position 1, so käme follows."],
  ["Prefer würde when…", ["the one-word Konjunktiv II sounds like the past or is unclear", "you are writing a real past event", "the sentence is a command", "you need Futur II"], 0, "brauchte can be unclear; würde brauchen is transparent."],
  ["Polite dürfen.", ["Dürfte ich das Fenster öffnen?", "Darf ich das Fenster zu öffnen?", "Dürftet ich das Fenster öffnen?", "Würde ich dürfen das Fenster öffnen?"], 0, "Dürfte ich… is a soft request."],
]);

const modalverben = rows("modalverben", [
  ["Forbidden.", ["Hier darf man nicht rauchen.", "Hier muss man nicht rauchen.", "Hier will man nicht rauchen.", "Hier soll man nicht rauchen müssen."], 0, "A ban is nicht dürfen."],
  ["There is no obligation to stay.", ["Du musst nicht bleiben.", "Du darfst nicht bleiben.", "Du kannst nicht bleiben.", "Du sollst nicht bleiben."], 0, "nicht müssen means it is not necessary. nicht dürfen would forbid staying."],
  ["The instruction comes from someone else.", ["Du sollst den Arzt anrufen.", "Du willst den Arzt anrufen.", "Du darfst den Arzt anrufen.", "Du möchtest den Arzt anrufen."], 0, "sollen reports an obligation that comes from outside."],
  ["A polite wish, ich-form.", ["Ich möchte ein Wasser.", "Ich möcht ein Wasser.", "Ich möchten ein Wasser.", "Ich möge ein Wasser."], 0, "ich möchte, du möchtest, er möchte."],
  ["Infinitive position.", ["Sie kann heute nicht kommen.", "Sie kann heute nicht zu kommen.", "Sie kann heute nicht gekommen.", "Sie kommen kann heute nicht."], 0, "Bare infinitive at the end. No zu."],
  ["A skill he actually has.", ["Samir kann sehr gut kochen.", "Samir darf sehr gut kochen.", "Samir soll sehr gut kochen.", "Samir muss sehr gut kochen."], 0, "können is ability. The others are permission, outside instruction, or necessity."],
  ["Asking permission.", ["Darf ich kurz stören?", "Muss ich kurz stören?", "Soll ich kurz zu stören?", "Mag ich kurz stören?"], 0, "dürfen asks for permission. muss would ask whether it is necessary."],
  ["wir-form of müssen.", ["müssen", "müsst", "musst", "muss"], 0, "wir müssen, ihr müsst, du musst."],
  ["The house rules forbid it.", ["Elena darf heute nicht raus.", "Elena muss heute nicht raus.", "Elena möchte heute nicht raus.", "Elena will heute nicht raus."], 0, "A ban is nicht dürfen. nicht müssen only means she is not obliged to go out."],
  ["Separable verb with a modal.", ["Ich muss morgen früh aufstehen.", "Ich muss morgen früh auf zu stehen.", "Ich aufstehen muss morgen.", "Ich muss morgen früh aufgestanden."], 0, "The infinitive stays together at the end."],
  ["möchten, er-form.", ["Er möchte zahlen.", "Er möchtest zahlen.", "Er möchten zahlen.", "Er mögen zahlen."], 0, "er möchte, du möchtest, wir möchten."],
  ["Objective können in the past spoken form is usually konnte. The present pattern is…", ["modal in position 2, infinitive last", "infinitive in position 2", "zu before every infinitive", "participle in position 2"], 0, "That is the present-tense frame."],
]);

const nomenVerb = rows("nomen-verb", [
  ["Raise a topic.", ["einen Punkt zur Sprache bringen", "einen Punkt zur Sprache sprechen", "einen Punkt in Sprache nehmen", "einen Punkt zur Verfügung bringen"], 0, "zur Sprache bringen is the fixed chunk."],
  ["Accept a disadvantage.", ["die Kosten in Kauf nehmen", "die Kosten in Kauf bringen", "die Kosten zur Kauf stellen", "die Kosten im Kauf treffen"], 0, "in Kauf nehmen."],
  ["To be available.", ["zur Verfügung stehen", "zur Verfügung bringen", "in Verfügung kaufen", "zur Sprache stehen"], 0, "stehen means it is available. bringen means someone makes it available."],
  ["Verbalize eine Entscheidung treffen.", ["entscheiden", "enthalten", "erwähnen", "erwarten"], 0, "The light verb treffen disappears."],
  ["Kritik üben an + …", ["dative", "accusative", "no case", "genitive only in this chunk"], 0, "Kritik an dem Plan / am Plan."],
  ["Play a role.", ["eine Rolle spielen", "eine Rolle treffen", "eine Rolle nehmen", "zur Rolle bringen"], 0, "eine Rolle spielen."],
  ["in Betracht ziehen means…", ["to consider", "to reject", "to postpone only", "to sign"], 0, "Something is taken into consideration."],
  ["Bescheid sagen.", ["to let someone know", "to refuse", "to nominalize", "to compare"], 0, "Sag mir Bescheid."],
  ["Which verb is light, not the meaning?", ["treffen in eine Entscheidung treffen", "entscheiden", "kritisieren", "erwähnen"], 0, "treffen carries little meaning; Entscheidung carries it."],
  ["Word order in a main clause.", ["Die Daten stehen online zur Verfügung.", "Die Daten zur Verfügung stehen online.", "Die Daten stehen zur Verfügung online.", "Zur stehen Daten Verfügung."], 0, "Finite stehen is in position 2. zur Verfügung completes the predicate."],
  ["in Frage kommen.", ["Das kommt nicht in Frage.", "Das nimmt nicht in Frage.", "Das spielt nicht in Frage.", "Das bringt nicht in Frage kommen."], 0, "in Frage kommen = to be an option."],
  ["Verbalize: Der Text bringt mehrere Thesen zur Sprache.", ["Der Text spricht mehrere Thesen an. / erwähnt sie.", "Der Text kauft mehrere Thesen.", "Der Text steht mehrere Thesen.", "Der Text trifft mehrere Thesen zur Verfügung."], 0, "zur Sprache bringen ≈ ansprechen or erwähnen."],
]);

const nominal = rows("nominal", [
  ["-ung nouns are…", ["feminine", "neuter", "masculine", "plural only"], 0, "die Entscheidung, die Erklärung, die Verspätung."],
  ["Nominalized infinitive.", ["das Warten", "die Warten", "der Warten", "das Wartung"], 0, "Infinitives used as nouns are neuter. die Wartung is a different noun, from warten via -ung."],
  ["weil →", ["wegen or aufgrund", "trotz", "während", "um"], 0, "Cause becomes a genitive preposition."],
  ["obwohl →", ["trotz", "wegen", "nach", "durch"], 0, "Concession becomes trotz + genitive."],
  ["nachdem →", ["nach + dative", "vor + dative", "wegen + genitive", "ohne + accusative"], 0, "nach der Prüfung."],
  ["Correct genitive after nominalizing.", ["wegen der Verspätung", "wegen die Verspätung", "wegen der Verspätungs", "wegen des Verspätung"], 0, "die Verspätung → der Verspätung."],
  ["Which conjunction does bei replace in nominal style?", ["wenn", "weil", "obwohl", "nachdem"], 0, "Bei Regen bleiben wir hier stands in for wenn es regnet."],
  ["Expand: Aufgrund des Streiks fällt der Zug aus.", ["Weil gestreikt wird, fällt der Zug aus.", "Obwohl gestreikt wird, fällt der Zug aus.", "Damit gestreikt wird, fällt der Zug aus.", "Nachdem der Zug streikt, fällt er."], 0, "aufgrund returns to a cause clause."],
  ["zu / für can replace…", ["a purpose clause", "a concessive clause", "a relative clause", "Futur II"], 0, "zur Reparatur ≈ damit etwas repariert wird."],
  ["etwas Neues is…", ["a nominalized adjective", "a verb", "a preposition", "Konjunktiv I"], 0, "Adjectives can become nouns: das Gute, etwas Neues."],
  ["Verbal style is preferable when…", ["the nominal chain is hard to read", "you are writing a telegram only", "a preposition is involved", "the noun is feminine"], 0, "Expand dense noun stacks back into clauses."],
  ["durch die Kürzung des Textes ≈", ["weil der Text gekürzt wird / wurde", "obwohl der Text lang ist", "damit der Text beginnt", "bevor der Text existiert"], 0, "durch + noun often compresses a cause or a method."],
]);

const partizip = rows("partizip", [
  ["Active, simultaneous.", ["das lesende Kind", "das gelesene Kind", "das gelesen Kind", "das lesenes Kind"], 0, "Partizip I: the noun does the action."],
  ["Passive.", ["das gelesene Buch", "das lesende Buch", "das lesen Buch", "das gelesenes Buch"], 0, "Transitive Partizip II: the noun receives the action."],
  ["Ending after dem.", ["dem wartenden Gast", "dem wartende Gast", "dem wartendem Gast", "dem gewartet Gast"], 0, "Weak -en after dem."],
  ["Partizip I, expanded.", ["Der Mann, der an der Tür wartet, …", "Der Mann, der an der Tür gewartet wurde, …", "Der an der Tür gewartete Mann …", "Der Mann, den an der Tür wartet, …"], 0, "Partizip I expands to an active clause in the same tense."],
  ["die gedruckte Ausgabe ≈", ["die Ausgabe, die gedruckt wurde", "die Ausgabe, die druckt", "die Ausgabe, deren druckt", "die Ausgabe, die zu drucken wartet"], 0, "Transitive Partizip II expands to a passive."],
  ["Compress: die Frau, die neben mir sitzt.", ["die neben mir sitzende Frau", "die neben mir gesessene Frau", "die neben mir sitzend Frau", "die sitzt neben mir Frau"], 0, "sitzend + adjective ending."],
  ["Partizip I formation.", ["infinitive + d", "ge- + stem + t", "stem + te", "zu + infinitive"], 0, "lachen → lachend."],
  ["angekommen as an adjective.", ["der angekommene Zug (finished change)", "der ankommende Zug is simultaneous instead", "der angekommene Zug means the train is arriving right now", "der gekommene an Zug"], 0, "Intransitive change-of-state participles can be active and finished."],
  ["Extended participle.", ["der im Garten spielende Hund", "der spielende im Garten Hund", "der im Garten gespielt Hund aktiv", "der Hund, im Garten spielende"], 0, "Extra information stands in front of the participle."],
  ["Don’t confuse them.", ["der singende Chor does the singing", "der gesungene Chor does the singing", "der singt Chor", "der sungene Chor"], 0, "The choir is the agent, so Partizip I."],
  ["From relative to participle, passive.", ["der von Mina geschriebene Text", "der von Mina schreibende Text", "der von Mina schreibt Text", "der geschriebene von Mina Text"], 0, "geschrieben carries the passive. The agent stays in a von-phrase in front of the participle."],
  ["Endings are…", ["the same as adjective endings", "always -en", "always -e", "never required"], 0, "Participles in front of nouns decline."],
]);

const passiv = rows("passiv", [
  ["Present process passive.", ["Der Brief wird geschrieben.", "Der Brief ist geschrieben.", "Der Brief wird schreiben.", "Der Brief hat geschrieben worden."], 0, "wird + participle is the present Vorgangspassiv. ist + participle is a result."],
  ["A finished result, not the process.", ["Der Brief ist geschrieben.", "Der Brief wird geschrieben.", "Der Brief ist geschrieben worden.", "Der Brief schreibt sich."], 0, "sein + participle is the state. worden marks the perfect process passive."],
  ["Perfect process.", ["Der Brief ist geschrieben worden.", "Der Brief ist geschrieben geworden.", "Der Brief hat geschrieben worden.", "Der Brief wird geschrieben worden."], 0, "The participle of werden in the passive perfect is worden."],
  ["Modal.", ["Der Brief muss heute geschrieben werden.", "Der Brief muss heute geschrieben worden.", "Der Brief muss heute zu schreiben werden.", "Der Brief wird heute müssen geschrieben."], 0, "modal + participle + werden."],
  ["Agent, a person.", ["von der Autorin", "durch der Autorin", "von die Autorin", "durch der Autor"], 0, "People and institutions take von + dative."],
  ["An instrument or a cause.", ["durch einen Kurzschluss", "von einem Kurzschluss", "durch einem Kurzschluss", "wegen einen Kurzschluss"], 0, "Causes and instruments take durch + accusative."],
  ["Subjectless.", ["Hier wird nicht geraucht.", "Hier wird nicht rauchen.", "Hier ist nicht raucht.", "Hier raucht nicht werden."], 0, "Intransitive verbs can form a passive without a subject."],
  ["A passive substitute with lassen.", ["Das Fenster lässt sich nicht öffnen.", "Das Fenster lässt sich nicht geöffnet.", "Das Fenster lässt sich nicht zu öffnen.", "Das Fenster wird sich nicht öffnen."], 0, "sich lassen + bare infinitive means it can be done."],
  ["sein + zu.", ["Die Datei ist nicht zu öffnen.", "Die Datei ist nicht öffnen zu.", "Die Datei wird nicht zu öffnen.", "Die Datei ist nicht zu geöffnet."], 0, "sein + zu + infinitive = can or must be done."],
  ["Active to present passive. Man repariert das Dach.", ["Das Dach wird repariert.", "Das Dach wird reparieren.", "Das Dach repariert wird man.", "Das Dach ist repariert worden."], 0, "The accusative object becomes the subject. Present process: wird + participle."],
  ["Simple-past process passive.", ["Das Dach wurde repariert.", "Das Dach wird repariert.", "Das Dach war repariert worden.", "Das Dach wurde reparieren."], 0, "wurde + participle is the Präteritum. war … worden is the Plusquamperfekt."],
  ["-bar.", ["lesbar ≈ kann gelesen werden", "lesbar ≈ wird gerade gelesen", "lesbar ≈ soll nicht gelesen werden", "lesbar ≈ ist schon gelesen worden"], 0, "Adjectives in -bar are a passive substitute of possibility."],
]);

const praepositionen = rows("praepositionen", [
  ["ohne", ["accusative", "dative", "genitive", "two-way"], 0, "durch, für, gegen, ohne, um."],
  ["mit", ["dative", "accusative", "genitive", "two-way"], 0, "aus, bei, mit, nach, seit, von, zu."],
  ["während in careful writing", ["genitive", "accusative", "always dative", "no case"], 0, "während der Sitzung."],
  ["The picture is already hanging. No movement.", ["Das Bild hängt an der Wand.", "Das Bild hängt an die Wand.", "Das Bild hängt an dem Wand.", "Das Bild hängt an die Wande."], 0, "Wo? takes the dative. Wand is feminine: an der Wand."],
  ["Two-way, destination.", ["Ich hänge das Bild an die Wand.", "Ich hänge das Bild an der Wand.", "Ich hänge das Bild an dem Wand.", "Ich hänge das Bild an die Wands."], 0, "Wohin? → accusative. Wand is feminine: die Wand."],
  ["seit", ["a starting point that is still true", "a deadline in the future only", "a clock time", "a city"], 0, "Seit März wohne ich hier."],
  ["Country with an article, destination.", ["in die Schweiz", "nach der Schweiz", "in der Schweiz as destination", "zu die Schweiz"], 0, "nach is for article-less place names. die Schweiz takes in."],
  ["Clock time.", ["um acht", "am acht", "im acht", "seit acht"], 0, "um + clock time. seit would mean 'since eight'."],
  ["On Friday.", ["am Freitag", "im Freitag", "um Freitag", "beim Freitag"], 0, "am + weekday."],
  ["Month.", ["im Juli", "am Juli", "um Juli", "beim Juli"], 0, "im + month."],
  ["wegen des Regens is the written standard. The preposition is…", ["genitive", "accusative", "two-way", "dative in exams"], 0, "Exams expect the genitive."],
  ["gegenüber usually follows or precedes with dative. The case is…", ["dative", "accusative", "genitive", "none"], 0, "gegenüber dem Bahnhof / dem Bahnhof gegenüber."],
]);

const pronomen = rows("pronomen", [
  ["Accusative, ich.", ["mich", "mir", "mein", "ich"], 0, "Sie sieht mich."],
  ["Dative, ich.", ["mir", "mich", "mein", "meiner"], 0, "Sie hilft mir."],
  ["Dative, er.", ["ihm", "ihn", "er", "sein"], 0, "Ich danke ihm."],
  ["Dative plural, sie.", ["ihnen", "sie", "ihr", "ihren"], 0, "Ich schicke ihnen die Datei."],
  ["Formal dative.", ["Ihnen", "Sie", "euch", "ihnen without a capital, when formal"], 0, "Formal Ihnen is capitalized."],
  ["Possessive, dative masculine.", ["mit meinem Vater", "mit meinen Vater", "mit mein Vater", "mit meiner Vater"], 0, "mit + dative, mein takes -em."],
  ["Possessive, accusative feminine.", ["für meine Schwester", "für meiner Schwester", "für meinem Schwester", "für meinen Schwester"], 0, "für + accusative feminine -e."],
  ["Two pronouns.", ["Er erklärt sie mir.", "Er erklärt mir sie.", "Er erklärt ihr mich, for ‘he explains her to me’ if sie is accusative.", "Er sie erklärt mir."], 0, "Accusative pronoun before dative pronoun."],
  ["Neuter accusative.", ["Ich nehme es.", "Ich nehme ihm.", "Ich nehme er.", "Ich nehme dem."], 0, "das/es as a direct object stays es."],
  ["ihr can mean…", ["her (dative) or their (possessive)", "only formal you", "only accusative she", "the infinitive"], 0, "Context and capitals distinguish ihr, Ihr, ihrer."],
  ["Replace die Lehrerin as a dative object.", ["ich vertraue ihr", "ich vertraue sie", "ich vertraue es", "ich vertraue ihn"], 0, "Feminine dative pronoun: ihr."],
  ["ein-endings on possessives.", ["unserem, unseren, unsere — like ein", "always -en", "always -e", "no endings"], 0, "Possessives decline like the indefinite article."],
]);

const relativ = rows("relativ", [
  ["Accusative masculine.", ["der Roman, den ich meine", "der Roman, der ich meine", "der Roman, dem ich meine", "der Roman, dessen ich meine"], 0, "kaufen/meinen takes the accusative: den."],
  ["Dative masculine. helfen.", ["der Mann, dem ich helfe", "der Mann, den ich helfe", "der Mann, der ich helfe", "der Mann, dessen ich helfe"], 0, "helfen decides the case: dative dem."],
  ["Nominative feminine.", ["die Frau, die dort steht", "die Frau, der dort steht", "die Frau, den dort steht", "die Frau, deren dort steht"], 0, "She is the subject of steht: die."],
  ["Dative plural.", ["die Leute, denen ich danke", "die Leute, die ich danke", "die Leute, den ich danke", "die Leute, dessen ich danke"], 0, "Plural dative: denen. danken takes the dative."],
  ["Genitive masculine.", ["der Autor, dessen Roman erscheint", "der Autor, dem Roman erscheint", "der Autor, den Roman erscheint", "der Autor, deren Roman erscheint"], 0, "dessen + noun. Masculine antecedent."],
  ["Genitive feminine.", ["die Autorin, deren Roman erscheint", "die Autorin, dessen Roman erscheint", "die Autorin, der Roman erscheint", "die Autorin, denen Roman erscheint"], 0, "Feminine genitive: deren."],
  ["Preposition für.", ["der Kurs, für den ich zahle", "der Kurs, für dem ich zahle", "der Kurs, für der ich zahle", "der Kurs, den für ich zahle"], 0, "für + accusative den."],
  ["wohnen, a fixed place.", ["die Stadt, in der ich wohne", "die Stadt, in die ich wohne", "die Stadt, in der ich wohne hin", "die Stadt, wo der ich wohne"], 0, "wohnen is location, so in takes the dative: in der."],
  ["Whole clause.", ["Er hat abgesagt, was mich ärgert.", "Er hat abgesagt, das mich ärgert.", "Er hat abgesagt, der mich ärgert.", "Er hat abgesagt, wem mich ärgert."], 0, "A clause is picked up with was."],
  ["etwas + über.", ["etwas, worüber wir reden müssen", "etwas, über was wir müssen reden", "etwas, darüber wir reden", "etwas, wo über wir reden"], 0, "Indefinite + preposition → wo(r)-. über → worüber."],
  ["Verb position.", ["…, die du kennst", "…, die kennst du", "…, die du kennst sie", "…, kennst die du"], 0, "The relative verb goes to the end."],
  ["Neuter dative.", ["das Kind, dem ich vorlese", "das Kind, das ich vorlese, if the child is the object", "das Kind, den ich vorlese", "das Kind, dessen ich vorlese as dative"], 0, "vorlesen takes a dative listener: dem."],
]);

const satzbau = rows("satzbau", [
  ["A statement with time first.", ["Morgen beginnt der Kurs.", "Morgen der Kurs beginnt.", "Beginnt morgen der Kurs.", "Der Kurs morgen beginnt."], 0, "One constituent, then the verb. The verb-first version is a question."],
  ["Fronted object.", ["Den Bericht schicke ich heute.", "Den Bericht ich schicke heute.", "Den Bericht schicke heute ich.", "Ich den Bericht schicke heute."], 0, "Den Bericht is position 1. schicke is position 2."],
  ["Clause in first position.", ["Weil es regnet, bleiben wir hier.", "Weil es regnet, wir bleiben hier.", "Weil regnet es, bleiben wir hier.", "Weil es regnet, bleiben hier wir."], 0, "The whole weil-clause is one slot."],
  ["Time, cause, manner, place.", ["Ich fahre morgen wegen eines Termins mit dem Zug nach Erfurt.", "Ich fahre nach Erfurt morgen mit dem Zug wegen eines Termins.", "Ich wegen fahre morgen.", "Morgen ich fahre nach Erfurt mit."], 0, "TEKAMOLO: temporal, kausal, modal, lokal."],
  ["Two nouns, neutral order.", ["Sie gibt dem Gast den Schlüssel.", "Sie den Schlüssel gibt dem Gast.", "Sie gibt den Gast dem Schlüssel.", "Sie gibt dem Schlüssel den Gast."], 0, "Dative noun before accusative noun."],
  ["Two pronouns.", ["Sie gibt ihn ihm.", "Sie gibt ihm ihn.", "Sie gibt er ihm.", "Sie ihn gibt ihm."], 0, "Accusative pronoun before dative pronoun."],
  ["Subordinate verb.", ["…, dass du heute anrufst.", "…, dass du rufst heute an.", "…, dass rufst du heute an.", "…, dass du heute anrufst du."], 0, "Finite verb at the end. Prefix and verb unite."],
  ["nicht before the prefix.", ["Ich rufe dich nicht an.", "Ich nicht rufe dich an.", "Ich rufe nicht dich an, if the person is the contrast — the neutral sentence negation is before an.", "Ich rufe dich an nicht."], 0, "Sentence negation sits before the separable prefix."],
  ["denn vs weil.", ["denn keeps verb-second; weil sends the verb to the end", "both send the verb to the end", "both are adverbs", "denn starts subordinate clauses"], 0, "That contrast is the spine of German word order."],
  ["Only one element before the verb.", ["Heute Abend kommt Mina.", "Heute Mina kommt Abend.", "Kommt heute Abend Mina.", "Mina heute kommt Abend."], 0, "Heute Abend is a single time phrase in first position."],
  ["Not position.", ["Nicht nach Bonn fahre ich, sondern nach Mainz.", "Nicht fahre ich nach Bonn sondern.", "Nach nicht Bonn ich fahre.", "Sondern nach Mainz nicht ich fahre Bonn."], 0, "Fronted nicht + the contrasted phrase still counts as position 1, so fahre follows."],
  ["Infinitive at the end with a modal.", ["Du musst den Satz neu bauen.", "Du musst bauen den Satz neu.", "Du den Satz musst neu bauen.", "Du musst den Satz neu zu bauen."], 0, "Modal second, infinitive last, no zu."],
]);

const trennbar = rows("trennbar", [
  ["Present tense of a separable verb.", ["Ich stehe um sechs auf.", "Ich aufstehe um sechs.", "Ich stehe auf um sechs.", "Ich geaufstehe um sechs."], 0, "The prefix closes the main clause. It does not stay attached to the finite verb."],
  ["Perfect, separable.", ["Hast du eingekauft?", "Hast du gekauft ein?", "Hast du geeinkauft?", "Hast du einkaufen gehabt?"], 0, "ge sits between prefix and stem."],
  ["Perfect, inseparable.", ["Sie hat den Text verstanden.", "Sie hat den Text geverstanden.", "Sie hat den Text verstehen ge.", "Sie hat ver den Text gestanden."], 0, "ver- blocks ge-."],
  ["zu.", ["nicht zu vergessen, die Tür abzuschließen", "die Tür zu abschließen", "die Tür ab zu schließen as three words", "die Tür geabzuschließen"], 0, "anzurufen, abzuschließen: one word."],
  ["Inseparable prefixes include…", ["be-, er-, ver-, zer-, ent-, emp-", "ab-, auf-, ein-, mit-", "only ge-", "only zu-"], 0, "Those do not separate and take no ge-."],
  ["Stress.", ["A stressed prefix separates", "An unstressed prefix separates", "Stress never matters", "Only -ieren separates"], 0, "ANfangen separates. verSTEHen does not."],
  ["-ieren.", ["studiert, no ge-", "gestudiert", "studierget", "ge studiert"], 0, "Verbs in -ieren form the participle without ge-."],
  ["Imperative.", ["Ruf mich an.", "Anruf mich.", "Rufe mich anruf.", "Mir ruf an mich."], 0, "The prefix still goes to the end."],
  ["Subordinate clause.", ["…, weil er um sechs aufsteht.", "…, weil er steht um sechs auf.", "…, weil er auf um sechs steht.", "…, weil aufsteht er um sechs."], 0, "In a subordinate clause the prefix rejoins the verb at the end."],
  ["überSETzen (translate).", ["does not separate", "always separates", "takes ge- in the middle", "is only a noun"], 0, "Unstressed über- stays attached. The ferry verb is a different, separable verb."],
  ["Participle of mitkommen.", ["mitgekommen", "gekommen mit", "gemitkommen", "mitgekommt"], 0, "kommen → gekommen, with mit in front."],
  ["anfangen, du-form present.", ["du fängst an", "du anfangst", "du fängst auf", "du gefängst an"], 0, "Stem change ä, prefix at the end."],
]);

const verbenPraep = rows("verben-praep", [
  ["warten", ["auf + accusative", "auf + dative", "über + accusative", "mit + dative"], 0, "warten auf den Bus / auf ihn."],
  ["sich freuen, looking ahead.", ["auf", "über", "mit", "von"], 0, "auf is future, über is a present or past fact."],
  ["sich freuen about a gift you have.", ["über das Geschenk", "auf das Geschenk", "mit das Geschenk", "für das Geschenk"], 0, "über + accusative for the thing that is already a fact."],
  ["The object is a person.", ["Ich denke an sie.", "Ich denke daran.", "Ich denke über sie.", "Ich denke mit sie."], 0, "denken an takes a personal pronoun for a person. daran stands in for a thing."],
  ["Thing.", ["Ich denke daran.", "Ich denke an es.", "Ich denke da.", "Ich denke woran es."], 0, "an + vowel → daran."],
  ["Question.", ["Worauf wartest du?", "Auf wo wartest du?", "Wo an wartest du?", "Wartest du auf wo?"], 0, "wo- + preposition."],
  ["sich interessieren", ["für", "auf", "über", "mit"], 0, "für + accusative."],
  ["sich beschweren about a thing", ["über", "auf", "für", "an"], 0, "bei a person, über a thing."],
  ["Clause announced.", ["Ich freue mich darauf, dass du kommst.", "Ich freue mich auf, dass du kommst.", "Ich freue mich darauf dass du kommst ohne Komma ist schwach, die Form mit darauf ist richtig.", "Ich freue mich über dass du kommst."], 0, "The da-word points forward to the clause."],
  ["aufhören", ["mit + dative", "auf + accusative", "über + accusative", "für + accusative"], 0, "Hör mit dem Lärm auf. / Hör damit auf."],
  ["über + vowel", ["darüber / worüber", "daüber / woüber", "damit / womit", "daran only"], 0, "Insert r before a vowel."],
  ["teilnehmen", ["an + dative", "an + accusative", "auf + accusative", "mit + accusative"], 0, "an der Sitzung teilnehmen. daran teilnehmen."],
]);

const vergangenheit = rows("vergangenheit", [
  ["Regular Präteritum, er.", ["Er arbeitete lange.", "Er arbeite lange.", "Er gearbeitete lange.", "Er hat arbeitete lange."], 0, "Stem in -t inserts e: arbeitete."],
  ["sehen.", ["ich sah", "ich sehte", "ich gesah", "ich sieht"], 0, "Strong past, no ending in the ich/er form."],
  ["kommen, wir.", ["wir kamen", "wir kommten", "wir kamten", "wir gekommen"], 0, "kam, kamen."],
  ["Präteritum of müssen, wir.", ["wir mussten", "wir müssten", "wir gemusst", "wir mussteten"], 0, "The indicative drops the umlaut: musste. müssten is Konjunktiv II."],
  ["The normal spoken past of sein.", ["war", "ist gewesen", "hatte", "wurde"], 0, "war is the form people actually say. ist gewesen is grammatical and rare in speech."],
  ["The earlier of two past events.", ["Nachdem er gegessen hatte, ging er.", "Nachdem er aß, ging er.", "Nachdem er gegessen, ging er.", "Nachdem er essen hatte, ging er."], 0, "nachdem wants the earlier action in the Plusquamperfekt: hatte + participle."],
  ["gehen takes…", ["war in the Plusquamperfekt", "hatte", "wurde", "würde"], 0, "war gegangen."],
  ["lesen takes…", ["hatte in the Plusquamperfekt", "war", "wurde always", "ist as auxiliary in Plusquamperfekt"], 0, "hatte gelesen."],
  ["News and novels prefer…", ["Präteritum", "Futur II", "Konjunktiv I for every verb", "only Perfekt"], 0, "Narration uses the simple past."],
  ["Telling a friend about yesterday.", ["Ich habe eingekauft.", "Ich einkaufte gestern.", "Ich war eingekauft.", "Ich habe einkaufen gehabt."], 0, "Everyday verbs prefer the Perfekt in speech."],
  ["Präteritum of wollen.", ["wollte", "willte", "gewollt", "wollte ge-"], 0, "Modals drop the umlaut: wollte, konnte, musste."],
  ["Sequence.", ["Zuerst hatte sie den Schlüssel verloren. Dann rief sie an.", "Zuerst verlor sie nach dem Anruf, if the call is later.", "Dann hatte sie angerufen, bevor sie den Schlüssel verlor, for the opposite order.", "Beide Ereignisse im Plusquamperfekt, wenn eins klar früher ist, ist unnötig."], 0, "Plusquamperfekt marks the earlier of two past events."],
]);

export const exams = [
  {
    id: "1",
    title: "Exam I",
    blurb: "Endings, objects, the future, reported speech, cause and purpose, unreal forms.",
    sections: [
      { id: "adjektive", title: "Adjectives", href: "adjektive" },
      { id: "kasus", title: "Dative and accusative", href: "kasus" },
      { id: "futur", title: "Futur I and II", href: "futur" },
      { id: "rede", title: "Reported speech", href: "rede" },
      { id: "kausal-final", title: "Cause and purpose", href: "kausal" },
      { id: "konjunktiv2", title: "Konjunktiv II", href: "konjunktiv2" },
    ],
    questions: [...adjektive, ...kasus, ...futur, ...rede, ...kausalFinal, ...konjunktiv2],
  },
  {
    id: "2",
    title: "Exam II",
    blurb: "Modals, noun-verb chunks, nominal style, participles, the passive, prepositions.",
    sections: [
      { id: "modalverben", title: "Modal verbs", href: "modalverben" },
      { id: "nomen-verb", title: "Noun-verb combinations", href: "nomen-verb" },
      { id: "nominal", title: "Nominalization", href: "nominal" },
      { id: "partizip", title: "Participles", href: "partizip" },
      { id: "passiv", title: "Passive", href: "passiv" },
      { id: "praepositionen", title: "Prepositions", href: "praepositionen" },
    ],
    questions: [...modalverben, ...nomenVerb, ...nominal, ...partizip, ...passiv, ...praepositionen],
  },
  {
    id: "3",
    title: "Exam III",
    blurb: "Pronouns, relatives, word order, prefixes, verb-preposition pairs, the past.",
    sections: [
      { id: "pronomen", title: "Pronouns", href: "pronomen" },
      { id: "relativ", title: "Relative clauses", href: "relativ" },
      { id: "satzbau", title: "Word order", href: "satzbau" },
      { id: "trennbar", title: "Separable verbs", href: "trennbar" },
      { id: "verben-praep", title: "Verbs with prepositions", href: "verben-praep" },
      { id: "vergangenheit", title: "Past tenses", href: "vergangenheit" },
    ],
    questions: [...pronomen, ...relativ, ...satzbau, ...trennbar, ...verbenPraep, ...vergangenheit],
  },
];
