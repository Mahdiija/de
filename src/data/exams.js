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
  ["mit ___ Wein (ohne Artikel, maskulin)", ["rotem", "roter", "roten", "rotes"], 0, "Ohne Artikel ist die Endung stark. Der Dativ maskulin lautet -em: rotem Wein."],
  ["ein ___ Tag (Nominativ maskulin)", ["schöner", "schönen", "schönes", "schönem"], 0, "ein markiert den Nominativ maskulin nicht. Die Adjektivendung lautet deshalb -er: schöner."],
  ["das ___ Glas (Akkusativ neutrum, bestimmt)", ["leere", "leeren", "leeres", "leerem"], 0, "Nach das ist die Endung schwach. Der Akkusativ neutrum lautet -e: leere."],
  ["Ich schlafe in einem ___ Zimmer.", ["ruhigen", "ruhigem", "ruhiges", "ruhiger"], 0, "einem markiert den Dativ neutrum schon. Die Adjektivendung ist deshalb schwach -en: ruhigen."],
  ["___ Leute warten draußen. Ohne Artikel, Nominativ Plural.", ["Freundliche", "Freundlichen", "Freundlicher", "Freundliches"], 0, "Ohne Artikel lautet der Nominativ Plural stark -e: Freundliche Leute."],
  ["Das ist die ___ Idee des Tages.", ["beste", "besten", "am besten", "bester"], 0, "Der attributive Superlativ nach die nimmt die schwache Endung -e: die beste Idee."],
  ["Dieser Weg ist ___ als der andere.", ["kürzer", "kürzest", "am kürzesten", "kurz"], 0, "Der Vergleich zweier Größen verlangt den Komparativ plus als: kürzer als."],
  ["Von allen Texten ist dieser ___.", ["am klarsten", "am klarstensten", "der klar", "klaren"], 0, "Der prädikative Superlativ lautet am plus -sten: am klarsten."],
  ["für ___ Freundin (Possessiv, Akkusativ feminin)", ["meine alte", "meiner alten", "meinem alten", "meinen alten"], 0, "für regiert den Akkusativ. Nach meine ist die Adjektivendung schwach -e: meine alte Freundin."],
  ["trotz ___ Wetters", ["des schlechten", "dem schlechten", "des schlechtem", "der schlechten"], 0, "trotz regiert den Genitiv. Wetter ist neutrum: des schlechten Wetters. Nach des folgt schwaches -en."],
  ["zwei ___ Kinder (ohne Artikel, Akkusativ)", ["müde", "müden", "müdes", "müdem"], 0, "Ohne Artikel lautet der Akkusativ Plural stark -e: müde Kinder."],
  ["Sie sucht einen ___ Job.", ["interessanten", "interessante", "interessanter", "interessantem"], 0, "einen markiert den Akkusativ maskulin. Die Adjektivendung ist schwach -en: interessanten."],
]);

const kasus = rows("kasus", [
  ["Der Koffer ___ meinem Bruder.", ["gehört", "sieht", "kauft", "braucht"], 0, "gehören regiert den Dativ: meinem Bruder. sehen, kaufen und brauchen regieren den Akkusativ."],
  ["Kannst du ___ bitte helfen? (ich)", ["mir", "mich", "ich", "mein"], 0, "helfen regiert den Dativ. Die Dativform von ich lautet mir, nicht mich."],
  ["Wir danken ___ für die Einladung. (ihr, Plural)", ["ihnen", "sie", "ihr", "ihren"], 0, "danken regiert den Dativ. Der Dativ Plural von sie lautet ihnen."],
  ["Das Buch gefällt ___. (die Studentin)", ["der Studentin", "die Studentin", "den Studentin", "der Student"], 0, "gefallen regiert den Dativ. Studentin ist feminin: der Studentin."],
  ["Sie erklärt ___ den Plan. (die Gäste)", ["den Gästen", "die Gäste", "den Gäste", "der Gäste"], 0, "Die Person steht im Dativ Plural: den Gästen. den Plan bleibt Akkusativ."],
  ["Pronomenfolge.", ["Ich gebe es dir.", "Ich gebe dir es.", "Ich gebe dich es.", "Ich gebe dem es."], 0, "Bei zwei Pronomen steht der Akkusativ es vor dem Dativ dir."],
  ["Neutrale Folge zweier Nomen.", ["Er schenkt seiner Mutter Blumen.", "Er seiner Mutter schenkt Blumen.", "Er schenkt Blumen dem Mutter.", "Er schenkt sie ihrer Mutter."], 0, "Bei zwei Nomen steht das Dativnomen seiner Mutter vor dem Akkusativnomen Blumen."],
  ["Ich begegne heute ___.", ["einem alten Freund", "einen alten Freund", "ein alter Freund", "einem alten Freundem"], 0, "begegnen regiert den Dativ. Die maskuline Form nach ein lautet einem alten Freund."],
  ["vertrauen regiert …", ["den Dativ", "den Akkusativ", "nur den Genitiv", "kein Objekt"], 0, "vertrauen regiert den Dativ: Ich vertraue dir."],
  ["für regiert …", ["den Akkusativ", "den Dativ", "den Genitiv", "beides, wie bei in"], 0, "für, durch, gegen, ohne und um regieren den Akkusativ."],
  ["seit regiert …", ["den Dativ", "den Akkusativ", "den Genitiv", "keinen Kasus"], 0, "aus, bei, mit, nach, seit, von und zu regieren den Dativ."],
  ["Ersetzen Sie beides: Nora zeigt dem Kind das Foto.", ["Nora zeigt es ihm.", "Nora zeigt ihm es.", "Nora zeigt ihn ihm.", "Nora zeigt es er."], 0, "das Foto wird zum Akkusativ es, dem Kind zum Dativ ihm. Bei zwei Pronomen steht der Akkusativ vorn."],
]);

const futur = rows("futur", [
  ["Ein Versprechen.", ["Ich werde dich heute Abend anrufen.", "Ich werde dich heute Abend angerufen.", "Ich werde dich anrufen werden.", "Ich anrufen werde dich."], 0, "Futur I lautet werden in Position 2 plus Infinitiv am Ende: anrufen."],
  ["Eine Vermutung über die Gegenwart.", ["Er wird noch im Büro sein.", "Er wird noch im Büro gewesen.", "Er wird noch im Büro ist.", "Er sein wird noch im Büro haben."], 0, "Eine Vermutung über die Gegenwart verlangt werden plus Infinitiv: sein."],
  ["Futur II, abgeschlossen vor Freitag.", ["Bis Freitag werde ich das Kapitel gelesen haben.", "Bis Freitag werde ich das Kapitel lesen haben.", "Bis Freitag habe ich das Kapitel werden gelesen.", "Bis Freitag werde ich das Kapitel gelesen worden."], 0, "Futur II lautet werden plus Partizip plus haben oder sein. lesen verlangt haben: gelesen haben."],
  ["ankommen im Futur II.", ["Sie wird schon angekommen sein.", "Sie wird schon angekommen haben.", "Sie wird schon ankommen gewesen.", "Sie ist schon ankommen werden."], 0, "ankommen bildet das Perfekt mit sein. Im Futur II steht angekommen sein."],
  ["Eine abgeschwächte Anweisung.", ["Du wirst das heute noch erledigen.", "Du wirst das heute noch erledigt.", "Du erledigen wirst das.", "Du hast das werden erledigen."], 0, "Futur I kann wie eine Anweisung klingen: wirst in Position 2, Infinitiv erledigen am Ende."],
  ["Ein gewöhnlicher Plan, in der gesprochenen Sprache am natürlichsten.", ["Morgen fahre ich nach Ulm.", "Morgen werde gefahren ich.", "Morgen ich werde fahren.", "Morgen fahren werde ich gehabt."], 0, "Ein Zeitwort plus Präsens ist das alltägliche Futur. Das Verb fahre bleibt in Position 2."],
  ["Vermutung über die Vergangenheit.", ["Er wird den Bus verpasst haben.", "Er wird den Bus verpassen haben.", "Er hat den Bus werden verpasst.", "Er wird den Bus verpasst worden."], 0, "Eine Vermutung über die Vergangenheit steht im Futur II: Partizip verpasst plus haben."],
  ["Trennbare Verben im Futur I.", ["Wir werden um sieben aufstehen.", "Wir werden um sieben aufgestanden.", "Wir aufstehen werden um sieben.", "Wir werden um sieben zu aufstehen."], 0, "Der Infinitiv aufstehen bleibt ein Wort am Ende. zu steht beim Futur I nicht."],
  ["worden gehört zu …", ["dem Perfekt des Vorgangspassivs, nicht Futur I", "Futur I", "jedem Futursatz", "dem Konjunktiv II"], 0, "Futur I verwendet den Infinitiv. worden ist das Partizip von werden im Vorgangspassiv."],
  ["Welcher Satz steht im Futur II?", ["Bis acht werden wir gegessen haben.", "Wir werden um acht essen.", "Wir essen um acht.", "Wir würden um acht essen."], 0, "Partizip plus haben nach werden markiert Futur II: gegessen haben."],
  ["Stellung von werden.", ["in Position 2 im Hauptsatz", "immer am Ende", "immer an erster Stelle", "nach dem Infinitiv"], 0, "werden ist das finite Verb und steht deshalb in Position 2."],
  ["Sie ___ das schon schaffen. (Ermutigung)", ["wird", "wurde", "worden", "wärest"], 0, "Futur I, sie-Form: wird. Der Infinitiv schaffen folgt am Ende."],
]);

const rede = rows("rede", [
  ["„Ich bin krank.“ Formeller Bericht.", ["Er sagt, er sei krank.", "Er sagt, er ist krank.", "Er sagt, er wäre krank gewesen.", "Er sagt, dass er sei krank ist."], 0, "Der Konjunktiv I von sein lautet sei. Der Indikativ ist gehört zur Alltagssprache, der formelle Bericht verlangt den Konjunktiv."],
  ["„Ich habe die Mail gelesen.“", ["Sie sagt, sie habe die Mail gelesen.", "Sie sagt, sie las die Mail.", "Sie sagt, sie hätte die Mail gelesen werden.", "Sie sagt, sie lese die Mail gehabt."], 0, "Eine vergangene Aussage wird zu habe plus Partizip gelesen. habe ist der Konjunktiv I von haben."],
  ["Mehrdeutige wir-Form.", ["Sie sagen, sie kämen später.", "Sie sagen, sie kommen später.", "Sie sagen, sie kommt später.", "Sie sagen, sie sei kommen."], 0, "kommen im Plural sieht aus wie der Indikativ. Der eindeutige Konjunktiv II lautet kämen."],
  ["Konjunktiv I von haben, er.", ["habe", "hätte", "hat", "hatte"], 0, "Die er-Form des Konjunktivs I von haben lautet habe. hätte ist Konjunktiv II."],
  ["Wiedergegebene Ja-Nein-Frage.", ["Sie fragt, ob er mitkomme.", "Sie fragt, ob kommt er mit.", "Sie fragt, kommt ob er mit.", "Sie fragt, dass er mitkomme."], 0, "Eine Ja-Nein-Frage wird mit ob eingeleitet. Der Konjunktiv I mitkomme steht am Ende."],
  ["„Wo wohnst du?“, an ihn gerichtet.", ["Sie fragt, wo er wohne.", "Sie fragt, wo wohnt er.", "Sie fragt, wo er wohnt hin.", "Sie fragt, wohin er sei wohnen."], 0, "Das Fragewort wo bleibt. Der Konjunktiv I von wohnen lautet wohne und steht am Ende."],
  ["Wiedergegebene Aufforderung.", ["Er sagte, wir sollten warten.", "Er sagte, wir warten sollen dass.", "Er sagte, ob wir warten.", "Er sagte, wir würden zu warten."], 0, "Eine Aufforderung wird mit sollen wiedergegeben: sollten plus Infinitiv warten, ohne zu."],
  ["„Wir sind fertig.“ Vermeiden Sie die mehrdeutige Form.", ["Sie sagen, sie seien fertig.", "Sie sagen, sie sind fertig.", "Sie sagen, sie seid fertig.", "Sie sagen, sie bist fertig."], 0, "sie seien ist eindeutig Konjunktiv I. sie sind ist zugleich Indikativ, deshalb meidet ihn die formelle Wiedergabe."],
  ["Ein Konjunktiv deckt ab …", ["Präsens und Futur der ursprünglichen Aussage", "nur die Vergangenheit", "nur Aufforderungen", "nur Fragen"], 0, "Ein Konjunktiv I gilt für Präsens und Futur der Aussage. Die Vergangenheit verlangt habe oder sei plus Partizip."],
  ["„Er kommt morgen.“", ["Man sagt, er komme morgen.", "Man sagt, er kam morgen.", "Man sagt, er komme morgen gewesen.", "Man sagt, kommt er morgen."], 0, "Die er-Form des Konjunktivs I von kommen lautet komme. morgen kann bleiben."],
  ["dass-Satz, Verbstellung.", ["Er behauptet, dass er nichts gewusst habe.", "Er behauptet, dass er habe nichts gewusst.", "Er behauptet, dass habe er nichts gewusst.", "Er behauptet, dass er nichts habe gewusst werden sei."], 0, "Im dass-Satz schließt das finite Verb habe den Satz. Das Partizip gewusst steht vor habe."],
  ["Die Alltagssprache nutzt oft den Indikativ. Prüfungen verlangen …", ["den Konjunktiv I, bei mehrdeutiger Form den Konjunktiv II", "nur das Präteritum", "nur Futur II", "ein Fragezeichen"], 0, "Die geschriebene Norm der indirekten Rede ist der Konjunktiv I, bei einer Form, die wie der Indikativ aussieht, der Konjunktiv II."],
]);

const kausalFinal = rows("kausal-final", [
  ["weil und Wortstellung.", ["Ich bleibe hier, weil ich müde bin.", "Ich bleibe hier, weil ich bin müde.", "Ich bleibe hier, denn ich müde bin.", "Weil ich bin müde, bleibe ich hier."], 0, "weil leitet einen Nebensatz ein. Das finite Verb bin steht am Ende."],
  ["denn.", ["Ich bleibe hier, denn ich bin müde.", "Ich bleibe hier, denn ich müde bin.", "Denn ich bin müde, bleibe ich hier.", "Ich denn bleibe, weil müde."], 0, "denn behält die Verbzweitstellung: bin nach ich. denn kann den Satz nicht eröffnen."],
  ["deshalb.", ["Ich bin müde. Deshalb bleibe ich hier.", "Ich bin müde. Deshalb ich bleibe hier.", "Deshalb ich bin müde bleibe.", "Ich bin müde, deshalb ich hier bleibe."], 0, "deshalb steht in Position 1. Das finite Verb bleibe folgt in Position 2."],
  ["da.", ["Da der Saal voll ist, warten wir.", "Da der Saal ist voll, warten wir.", "Da der Saal voll ist, wir warten.", "Da ist der Saal voll, warten wir."], 0, "da ist unterordnend wie weil und verlangt Verbletztstellung: ist. Der da-Satz steht gern in Position 1."],
  ["wegen.", ["Wegen des Nebels fällt der Flug aus.", "Wegen dem Nebel fällt der Flug aus.", "Wegen den Nebel fällt der Flug aus.", "Wegen der Nebels fällt der Flug aus."], 0, "In der geschriebenen Sprache regiert wegen den Genitiv. Nebel ist maskulin: des Nebels."],
  ["nämlich steht …", ["im Satz nach dem Verb", "nur am Anfang mit Verbletztstellung", "anstelle eines Nomens", "vor weil"], 0, "nämlich kann den Satz nicht eröffnen. Es steht nach dem finiten Verb: Ich habe nämlich noch einen Termin."],
  ["Dasselbe Subjekt, Zweck.", ["Sie lernt viel, um die Prüfung zu bestehen.", "Sie lernt viel, damit die Prüfung zu bestehen.", "Sie lernt viel, um die Prüfung besteht.", "Sie lernt viel, um zu die Prüfung bestehen."], 0, "Dasselbe Subjekt verlangt um … zu. Die Infinitivgruppe schließt mit zu bestehen."],
  ["Verschiedene Subjekte.", ["Ich schreibe laut, damit du es hörst.", "Ich schreibe laut, um du es zu hören.", "Ich schreibe laut, damit du es hörst zu.", "Ich schreibe laut, um dass du hörst."], 0, "Zwei Subjekte verlangen damit. Das finite Verb hörst steht am Ende."],
  ["zu in einem trennbaren Verb.", ["um pünktlich aufzustehen", "um auf zu stehen pünktlich", "um zu aufstehen pünktlich", "um aufstehen zu"], 0, "Bei einem trennbaren Verb steht zu zwischen Präfix und Stamm, in einem Wort: aufzustehen."],
  ["Welcher Satz nennt den Grund nur einmal?", ["Weil es regnet, bleiben wir zu Hause.", "Weil es regnet, deshalb bleiben wir zu Hause.", "Es regnet, weil deshalb wir bleiben.", "Deshalb weil es regnet, bleiben wir."], 0, "weil genügt. deshalb würde einen eigenen Hauptsatz eröffnen und steht nicht im weil-Satz."],
  ["Ausgangssatz: Weil sie übt, wird sie sicherer. Welche Fassung nennt den Zweck?", ["Sie übt, um sicherer zu werden.", "Sie wird sicherer, weil sie übt.", "Deshalb übt sie.", "Denn sie übt, wird sie sicherer."], 0, "um … zu antwortet auf Wozu?, nicht auf Warum?. Das Subjekt bleibt sie."],
  ["Verb nach einem vorangestellten weil-Satz.", ["Weil es spät ist, nehmen wir ein Taxi.", "Weil es spät ist, wir nehmen ein Taxi.", "Weil ist es spät, nehmen wir ein Taxi.", "Weil es spät ist, nehmen ein Taxi wir."], 0, "Der Nebensatz füllt Position 1. Das finite Verb nehmen folgt sofort."],
]);

const konjunktiv2 = rows("konjunktiv2", [
  ["Höfliche Bitte im Geschäft.", ["Könnten Sie das bitte einpacken?", "Können Sie das bitte zu einpacken?", "Würden Sie das bitte zu einpacken?", "Könntet Sie das bitte einpacken?"], 0, "Die höfliche Sie-Form lautet könnten Sie. einpacken bleibt reiner Infinitiv, ohne zu."],
  ["Irreales Präsens von haben.", ["Wenn wir mehr Zeit hätten, …", "Wenn wir mehr Zeit haben würden gehabt, …", "Wenn wir mehr Zeit gehabt, …", "Wenn wir mehr Zeit sind, …"], 0, "Der Konjunktiv II von haben lautet hätten, nicht haben und nicht eine doppelte Umschreibung."],
  ["Irreales Präsens von sein.", ["Wenn ich du wäre, würde ich zusagen.", "Wenn ich du bin, würde ich zusagen.", "Wenn ich du gewesen, zusagen ich.", "Wenn ich du würde, wäre ich zusagen."], 0, "Der Konjunktiv II von sein lautet wäre. Im Hauptsatz steht würde plus Infinitiv zusagen."],
  ["Beide Hälften irreal.", ["Wenn er anrufen würde, würde ich rangehen.", "Wenn er anruft, gehe ich ran.", "Wenn er angerufen, ich rangehe.", "Wenn würde er anruft, ich gehen."], 0, "Eine irreale Bedingung verlangt den Konjunktiv II in beiden Hälften: würde anrufen und würde rangehen."],
  ["Irreale Vergangenheit.", ["Wenn du geschrieben hättest, hätte ich geantwortet.", "Wenn du geschrieben hast, antworte ich.", "Wenn du hättest geschrieben würden.", "Wenn du schriebst, habe ich geantwortet."], 0, "Die irreale Vergangenheit lautet hätte plus Partizip in beiden Hälften: hättest geschrieben, hätte geantwortet."],
  ["Modalverb in der irrealen Vergangenheit.", ["Du hättest früher anrufen sollen.", "Du solltest früher anrufen haben.", "Du hättest sollen früher anrufen.", "Du würdest früher gesollt anrufen."], 0, "Das Muster lautet hätte plus Infinitiv plus Modalinfinitiv. sollen steht am Ende."],
  ["Rat.", ["An deiner Stelle würde ich pausieren.", "An deiner Stelle ich würde pausieren.", "An deiner Stelle würde ich zu pausieren.", "An deiner Stelle pausieren ich."], 0, "würde steht in Position 2. Der Infinitiv pausieren steht am Ende, ohne zu."],
  ["Ein Wunsch.", ["Wenn ich doch singen könnte!", "Wenn ich doch singen kann!", "Wenn ich doch singen konnte!", "Können ich doch singen!"], 0, "könnte ist der Konjunktiv II von können. kann wäre Indikativ, konnte Präteritum."],
  ["käme ist …", ["der Konjunktiv II von kommen", "das Präteritum von kommen", "der Konjunktiv I von kommen", "ein Passiv"], 0, "Das Präteritum lautet kam. käme ist die irreale Form, der Konjunktiv II."],
  ["Hauptsatz nach vorangestelltem wenn.", ["Wenn es ginge, käme ich mit.", "Wenn es ginge, ich käme mit.", "Wenn ginge es, käme ich mit.", "Wenn es ginge, käme mit ich."], 0, "Der wenn-Satz füllt Position 1. Das finite Verb käme folgt sofort."],
  ["würde ist vorzuziehen, wenn …", ["der einwortige Konjunktiv II wie das Präteritum klingt oder unklar ist", "ein reales Ereignis in der Vergangenheit steht", "der Satz ein Befehl ist", "Futur II nötig ist"], 0, "brauchte kann unklar sein. würde brauchen ist eindeutig Konjunktiv II."],
  ["Höfliches dürfen.", ["Dürfte ich das Fenster öffnen?", "Darf ich das Fenster zu öffnen?", "Dürftet ich das Fenster öffnen?", "Würde ich dürfen das Fenster öffnen?"], 0, "Eine vorsichtige Bitte lautet dürfte ich. öffnen bleibt reiner Infinitiv, ohne zu."],
]);

const modalverben = rows("modalverben", [
  ["Verboten.", ["Hier darf man nicht rauchen.", "Hier muss man nicht rauchen.", "Hier will man nicht rauchen.", "Hier soll man nicht rauchen müssen."], 0, "Ein Verbot verlangt nicht dürfen: darf nicht. nicht müssen würde nur die Pflicht aufheben."],
  ["Es besteht keine Pflicht zu bleiben.", ["Du musst nicht bleiben.", "Du darfst nicht bleiben.", "Du kannst nicht bleiben.", "Du sollst nicht bleiben."], 0, "Keine Pflicht verlangt nicht müssen. nicht dürfen würde das Bleiben verbieten."],
  ["Der Auftrag kommt von jemand anderem.", ["Du sollst den Arzt anrufen.", "Du willst den Arzt anrufen.", "Du darfst den Arzt anrufen.", "Du möchtest den Arzt anrufen."], 0, "sollen gibt eine Pflicht wieder, die von außen kommt. Der Infinitiv anrufen steht ohne zu am Ende."],
  ["Ein höflicher Wunsch, ich-Form.", ["Ich möchte ein Wasser.", "Ich möcht ein Wasser.", "Ich möchten ein Wasser.", "Ich möge ein Wasser."], 0, "Die Formen lauten ich möchte, du möchtest, er möchte."],
  ["Stellung des Infinitivs.", ["Sie kann heute nicht kommen.", "Sie kann heute nicht zu kommen.", "Sie kann heute nicht gekommen.", "Sie kommen kann heute nicht."], 0, "Das Modalverb steht in Position 2. Der reine Infinitiv kommen steht am Ende, ohne zu."],
  ["Eine Fähigkeit, die er wirklich hat.", ["Samir kann sehr gut kochen.", "Samir darf sehr gut kochen.", "Samir soll sehr gut kochen.", "Samir muss sehr gut kochen."], 0, "können nennt die Fähigkeit. dürfen wäre Erlaubnis, sollen ein Auftrag von außen, müssen eine Notwendigkeit."],
  ["Um Erlaubnis bitten.", ["Darf ich kurz stören?", "Muss ich kurz stören?", "Soll ich kurz zu stören?", "Mag ich kurz stören?"], 0, "dürfen fragt nach Erlaubnis. müssen würde fragen, ob es nötig ist. Der Infinitiv steht ohne zu."],
  ["wir-Form von müssen.", ["müssen", "müsst", "musst", "muss"], 0, "Die Formen lauten wir müssen, ihr müsst, du musst, er muss."],
  ["Die Hausordnung verbietet es.", ["Elena darf heute nicht raus.", "Elena muss heute nicht raus.", "Elena möchte heute nicht raus.", "Elena will heute nicht raus."], 0, "Ein Verbot verlangt nicht dürfen. nicht müssen hieße nur, dass sie nicht hinausgehen muss."],
  ["Trennbare Verben mit Modalverb.", ["Ich muss morgen früh aufstehen.", "Ich muss morgen früh auf zu stehen.", "Ich aufstehen muss morgen.", "Ich muss morgen früh aufgestanden."], 0, "Der trennbare Infinitiv aufstehen bleibt ein Wort am Ende. Das Modalverb muss steht in Position 2."],
  ["möchten, er-Form.", ["Er möchte zahlen.", "Er möchtest zahlen.", "Er möchten zahlen.", "Er mögen zahlen."], 0, "Die Formen lauten er möchte, du möchtest, wir möchten."],
  ["Objektives können lautet in der gesprochenen Vergangenheit meist konnte. Das Muster im Präsens ist …", ["Modalverb in Position 2, Infinitiv am Ende", "Infinitiv in Position 2", "zu vor jedem Infinitiv", "Partizip in Position 2"], 0, "Im Präsens steht das Modalverb in Position 2, der reine Infinitiv am Ende, ohne zu."],
]);

const nomenVerb = rows("nomen-verb", [
  ["Ein Thema aufbringen.", ["einen Punkt zur Sprache bringen", "einen Punkt zur Sprache sprechen", "einen Punkt in Sprache nehmen", "einen Punkt zur Verfügung bringen"], 0, "Die feste Fügung lautet zur Sprache bringen. Das Nomen trägt die Bedeutung, bringen ist das Funktionsverb."],
  ["Einen Nachteil hinnehmen.", ["die Kosten in Kauf nehmen", "die Kosten in Kauf bringen", "die Kosten zur Kauf stellen", "die Kosten im Kauf treffen"], 0, "Die feste Fügung lautet in Kauf nehmen. Kauf steht ohne Artikel."],
  ["Verfügbar sein.", ["zur Verfügung stehen", "zur Verfügung bringen", "in Verfügung kaufen", "zur Sprache stehen"], 0, "stehen bedeutet, dass etwas verfügbar ist. bringen bedeutet, dass jemand es verfügbar macht."],
  ["Formulieren Sie eine Entscheidung treffen verbal.", ["entscheiden", "enthalten", "erwähnen", "erwarten"], 0, "Das Funktionsverb treffen entfällt. eine Entscheidung treffen wird zu entscheiden."],
  ["Kritik üben an verlangt …", ["den Dativ", "den Akkusativ", "keinen Kasus", "nur den Genitiv"], 0, "an in Kritik üben an regiert den Dativ: Kritik an dem Plan, am Plan."],
  ["Eine Rolle spielen.", ["eine Rolle spielen", "eine Rolle treffen", "eine Rolle nehmen", "zur Rolle bringen"], 0, "Die feste Fügung lautet eine Rolle spielen."],
  ["in Betracht ziehen bedeutet …", ["etwas erwägen", "etwas ablehnen", "etwas nur verschieben", "etwas unterschreiben"], 0, "Die Fügung bedeutet, dass etwas in die Überlegung einbezogen wird."],
  ["Bescheid sagen.", ["jemanden informieren", "etwas ablehnen", "etwas nominalisieren", "etwas vergleichen"], 0, "Bescheid sagen bedeutet, dass man jemanden informiert: Sag mir Bescheid."],
  ["Welches Verb ist das Funktionsverb und trägt die Bedeutung nicht?", ["treffen in eine Entscheidung treffen", "entscheiden", "kritisieren", "erwähnen"], 0, "treffen trägt wenig Bedeutung. Entscheidung trägt sie."],
  ["Wortstellung im Hauptsatz.", ["Die Daten stehen online zur Verfügung.", "Die Daten zur Verfügung stehen online.", "Die Daten stehen zur Verfügung online.", "Zur stehen Daten Verfügung."], 0, "Das finite Verb stehen steht in Position 2. zur Verfügung schließt das Prädikat."],
  ["in Frage kommen.", ["Das kommt nicht in Frage.", "Das nimmt nicht in Frage.", "Das spielt nicht in Frage.", "Das bringt nicht in Frage kommen."], 0, "Die feste Fügung lautet in Frage kommen und bedeutet, dass etwas eine Option ist."],
  ["Formulieren Sie verbal: Der Text bringt mehrere Thesen zur Sprache.", ["Der Text spricht mehrere Thesen an. / erwähnt sie.", "Der Text kauft mehrere Thesen.", "Der Text steht mehrere Thesen.", "Der Text trifft mehrere Thesen zur Verfügung."], 0, "zur Sprache bringen entspricht ansprechen oder erwähnen. Das Funktionsverb bringen entfällt."],
]);

const nominal = rows("nominal", [
  ["Nomen auf -ung sind …", ["feminin", "neutrum", "maskulin", "nur Plural"], 0, "Nomen auf -ung sind feminin: die Entscheidung, die Erklärung, die Verspätung."],
  ["Substantivierter Infinitiv.", ["das Warten", "die Warten", "der Warten", "das Wartung"], 0, "Als Nomen gebrauchte Infinitive sind neutrum: das Warten. die Wartung ist ein anderes Nomen, von warten über -ung."],
  ["weil wird zu", ["wegen oder aufgrund", "trotz", "während", "um"], 0, "Ein Grund wird zu einer Präposition mit Genitiv: wegen oder aufgrund."],
  ["obwohl wird zu", ["trotz", "wegen", "nach", "durch"], 0, "Ein Gegengrund wird zu trotz plus Genitiv."],
  ["nachdem wird zu", ["nach plus Dativ", "vor plus Dativ", "wegen plus Genitiv", "ohne plus Akkusativ"], 0, "nachdem wird zu nach plus Dativ: nach der Prüfung."],
  ["Richtiger Genitiv nach der Nominalisierung.", ["wegen der Verspätung", "wegen die Verspätung", "wegen der Verspätungs", "wegen des Verspätung"], 0, "die Verspätung ist feminin. Der Genitiv lautet der Verspätung, ohne -s am Nomen."],
  ["Welche Konjunktion ersetzt bei im Nominalstil?", ["wenn", "weil", "obwohl", "nachdem"], 0, "Bei Regen bleiben wir hier steht für wenn es regnet."],
  ["Lösen Sie auf: Aufgrund des Streiks fällt der Zug aus.", ["Weil gestreikt wird, fällt der Zug aus.", "Obwohl gestreikt wird, fällt der Zug aus.", "Damit gestreikt wird, fällt der Zug aus.", "Nachdem der Zug streikt, fällt er."], 0, "aufgrund plus Genitiv wird wieder zu einem weil-Satz. Das finite Verb wird steht am Ende."],
  ["zu oder für kann ersetzen …", ["einen Finalsatz", "einen Konzessivsatz", "einen Relativsatz", "Futur II"], 0, "zur Reparatur entspricht damit etwas repariert wird. zu und für tragen den Zweck."],
  ["etwas Neues ist …", ["ein substantiviertes Adjektiv", "ein Verb", "eine Präposition", "der Konjunktiv I"], 0, "Adjektive können zu Nomen werden: das Gute, etwas Neues."],
  ["Der Verbalstil ist vorzuziehen, wenn …", ["die Nominalkette schwer lesbar ist", "nur ein Telegramm geschrieben wird", "eine Präposition vorkommt", "das Nomen feminin ist"], 0, "Dichte Nomenketten löst man wieder in Sätze auf."],
  ["durch die Kürzung des Textes entspricht", ["weil der Text gekürzt wird oder wurde", "obwohl der Text lang ist", "damit der Text beginnt", "bevor der Text existiert"], 0, "durch plus Nomen verdichtet oft einen Grund oder eine Art und Weise."],
]);

const partizip = rows("partizip", [
  ["Aktiv, gleichzeitig.", ["das lesende Kind", "das gelesene Kind", "das gelesen Kind", "das lesenes Kind"], 0, "Das Kind führt die Handlung aus. Das Partizip I lautet lesend, nach das mit -e: lesende."],
  ["Passiv.", ["das gelesene Buch", "das lesende Buch", "das lesen Buch", "das gelesenes Buch"], 0, "lesen ist transitiv, das Buch erleidet die Handlung. Nach das lautet die schwache Endung -e: gelesene."],
  ["Endung nach dem.", ["dem wartenden Gast", "dem wartende Gast", "dem wartendem Gast", "dem gewartet Gast"], 0, "Nach dem ist die Endung schwach -en: wartenden."],
  ["Partizip I, aufgelöst.", ["Der Mann, der an der Tür wartet, …", "Der Mann, der an der Tür gewartet wurde, …", "Der an der Tür gewartete Mann …", "Der Mann, den an der Tür wartet, …"], 0, "Partizip I wird zu einem aktiven Satz im selben Tempus. Das finite Verb wartet steht am Ende."],
  ["die gedruckte Ausgabe entspricht", ["die Ausgabe, die gedruckt wurde", "die Ausgabe, die druckt", "die Ausgabe, deren druckt", "die Ausgabe, die zu drucken wartet"], 0, "Transitives Partizip II wird zu einem Passivsatz: die gedruckt wurde."],
  ["Verdichten Sie: die Frau, die neben mir sitzt.", ["die neben mir sitzende Frau", "die neben mir gesessene Frau", "die neben mir sitzend Frau", "die sitzt neben mir Frau"], 0, "sitzt wird zum Partizip I sitzend plus Adjektivendung -e. Die Ergänzung steht vor dem Partizip."],
  ["Bildung des Partizips I.", ["Infinitiv plus d", "ge- plus Stamm plus t", "Stamm plus te", "zu plus Infinitiv"], 0, "Das Partizip I besteht aus Infinitiv plus d: lachen wird zu lachend."],
  ["angekommen als Adjektiv.", ["der angekommene Zug", "der ankommende Zug", "der gerade ankommende Zug", "der gekommene an Zug"], 0, "ankommen ist ein Zustandswechsel. Das Partizip II angekommen kann aktiv und abgeschlossen sein: der angekommene Zug."],
  ["Erweitertes Partizip.", ["der im Garten spielende Hund", "der spielende im Garten Hund", "der im Garten gespielt Hund", "der Hund, im Garten spielende"], 0, "Die Ergänzung im Garten steht vor dem Partizip. Nach der folgt -e: spielende."],
  ["Verwechseln Sie die Formen nicht.", ["der singende Chor", "der gesungene Chor", "der singt Chor", "der sungene Chor"], 0, "Der Chor führt das Singen aus. Deshalb steht Partizip I: singende, nicht das Partizip II des Passivs."],
  ["Vom Relativsatz zum Partizip, passiv.", ["der von Mina geschriebene Text", "der von Mina schreibende Text", "der von Mina schreibt Text", "der geschriebene von Mina Text"], 0, "geschrieben trägt das Passiv. Das Agens bleibt in der von-Phrase vor dem Partizip."],
  ["Die Endungen sind …", ["dieselben Endungen wie bei Adjektiven", "immer -en", "immer -e", "nie nötig"], 0, "Partizipien vor Nomen werden dekliniert, mit denselben Endungen wie Adjektive."],
]);

const passiv = rows("passiv", [
  ["Vorgangspassiv im Präsens.", ["Der Brief wird geschrieben.", "Der Brief ist geschrieben.", "Der Brief wird schreiben.", "Der Brief hat geschrieben worden."], 0, "wird plus Partizip ist das Präsens des Vorgangspassivs. ist plus Partizip ist ein Ergebnis."],
  ["Ein abgeschlossenes Ergebnis, kein Vorgang.", ["Der Brief ist geschrieben.", "Der Brief wird geschrieben.", "Der Brief ist geschrieben worden.", "Der Brief schreibt sich."], 0, "Der Zustand lautet sein plus Partizip: ist geschrieben. worden markiert das Perfekt des Vorgangs."],
  ["Vorgang im Perfekt.", ["Der Brief ist geschrieben worden.", "Der Brief ist geschrieben geworden.", "Der Brief hat geschrieben worden.", "Der Brief wird geschrieben worden."], 0, "Das Partizip von werden im Perfekt des Vorgangspassivs lautet worden, nicht geworden."],
  ["Modalverb.", ["Der Brief muss heute geschrieben werden.", "Der Brief muss heute geschrieben worden.", "Der Brief muss heute zu schreiben werden.", "Der Brief wird heute müssen geschrieben."], 0, "Das Modalpassiv im Präsens lautet Modalverb plus Partizip plus werden. werden steht am Ende."],
  ["Agens, eine Person.", ["von der Autorin", "durch der Autorin", "von die Autorin", "durch der Autor"], 0, "Personen und Institutionen stehen mit von plus Dativ: von der Autorin."],
  ["Ein Mittel oder eine Ursache.", ["durch einen Kurzschluss", "von einem Kurzschluss", "durch einem Kurzschluss", "wegen einen Kurzschluss"], 0, "Ursachen und Mittel stehen mit durch plus Akkusativ: durch einen Kurzschluss."],
  ["Subjektlos.", ["Hier wird nicht geraucht.", "Hier wird nicht rauchen.", "Hier ist nicht raucht.", "Hier raucht nicht werden."], 0, "Intransitive Verben können ein Passiv ohne Subjekt bilden. nicht steht vor dem Partizip geraucht."],
  ["Eine Passiversatzform mit lassen.", ["Das Fenster lässt sich nicht öffnen.", "Das Fenster lässt sich nicht geöffnet.", "Das Fenster lässt sich nicht zu öffnen.", "Das Fenster wird sich nicht öffnen."], 0, "sich lassen plus reiner Infinitiv bedeutet, dass etwas machbar ist. Ohne zu und ohne Partizip."],
  ["sein plus zu.", ["Die Datei ist nicht zu öffnen.", "Die Datei ist nicht öffnen zu.", "Die Datei wird nicht zu öffnen.", "Die Datei ist nicht zu geöffnet."], 0, "sein plus zu plus Infinitiv bedeutet, dass etwas getan werden kann oder muss. nicht steht vor zu öffnen."],
  ["Aktiv ins Präsenspassiv. Man repariert das Dach.", ["Das Dach wird repariert.", "Das Dach wird reparieren.", "Das Dach repariert wird man.", "Das Dach ist repariert worden."], 0, "Das Akkusativobjekt wird zum Subjekt. Das Präsens des Vorgangs lautet wird plus Partizip repariert."],
  ["Vorgangspassiv im Präteritum.", ["Das Dach wurde repariert.", "Das Dach wird repariert.", "Das Dach war repariert worden.", "Das Dach wurde reparieren."], 0, "wurde plus Partizip ist das Präteritum. war plus Partizip plus worden ist das Plusquamperfekt."],
  ["Adjektive auf -bar.", ["lesbar entspricht kann gelesen werden", "lesbar entspricht wird gerade gelesen", "lesbar entspricht soll nicht gelesen werden", "lesbar entspricht ist schon gelesen worden"], 0, "Adjektive auf -bar sind eine Passiversatzform der Möglichkeit."],
]);

const praepositionen = rows("praepositionen", [
  ["ohne", ["Akkusativ", "Dativ", "Genitiv", "Wechselpräposition"], 0, "durch, für, gegen, ohne und um regieren den Akkusativ."],
  ["mit", ["Dativ", "Akkusativ", "Genitiv", "Wechselpräposition"], 0, "aus, bei, mit, nach, seit, von und zu regieren den Dativ."],
  ["während in sorgfältiger Schrift", ["Genitiv", "Akkusativ", "immer Dativ", "kein Kasus"], 0, "während regiert den Genitiv: während der Sitzung."],
  ["Das Bild hängt schon. Keine Bewegung.", ["Das Bild hängt an der Wand.", "Das Bild hängt an die Wand.", "Das Bild hängt an dem Wand.", "Das Bild hängt an die Wande."], 0, "Die Frage Wo? verlangt den Dativ. Wand ist feminin: an der Wand."],
  ["Wechselpräposition, Ziel.", ["Ich hänge das Bild an die Wand.", "Ich hänge das Bild an der Wand.", "Ich hänge das Bild an dem Wand.", "Ich hänge das Bild an die Wands."], 0, "Die Frage Wohin? verlangt den Akkusativ. Wand ist feminin: an die Wand."],
  ["seit", ["ein Anfangspunkt, der noch gilt", "nur eine Frist in der Zukunft", "eine Uhrzeit", "eine Stadt"], 0, "seit nennt einen Anfang, der noch gilt: Seit März wohne ich hier."],
  ["Land mit Artikel, Ziel.", ["in die Schweiz", "nach der Schweiz", "in der Schweiz", "zu die Schweiz"], 0, "nach gilt für Ortsnamen ohne Artikel. die Schweiz verlangt in plus Akkusativ: in die Schweiz."],
  ["Uhrzeit.", ["um acht", "am acht", "im acht", "seit acht"], 0, "um steht bei der Uhrzeit. seit acht hieße von acht Uhr an, nicht um acht Uhr."],
  ["Am Freitag.", ["am Freitag", "im Freitag", "um Freitag", "beim Freitag"], 0, "am steht vor dem Wochentag: am Freitag."],
  ["Monat.", ["im Juli", "am Juli", "um Juli", "beim Juli"], 0, "im steht vor dem Monat: im Juli."],
  ["wegen des Regens ist die geschriebene Norm. Die Präposition verlangt …", ["Genitiv", "Akkusativ", "Wechselpräposition", "Dativ"], 0, "Prüfungen verlangen bei wegen den Genitiv: des Regens."],
  ["gegenüber steht meist vor oder nach dem Nomen. Der Kasus ist …", ["Dativ", "Akkusativ", "Genitiv", "kein Kasus"], 0, "gegenüber regiert den Dativ: gegenüber dem Bahnhof oder dem Bahnhof gegenüber."],
]);

const pronomen = rows("pronomen", [
  ["Akkusativ, ich.", ["mich", "mir", "mein", "ich"], 0, "Der Akkusativ von ich lautet mich: Sie sieht mich."],
  ["Dativ, ich.", ["mir", "mich", "mein", "meiner"], 0, "Der Dativ von ich lautet mir. helfen regiert den Dativ: Sie hilft mir."],
  ["Dativ, er.", ["ihm", "ihn", "er", "sein"], 0, "Der Dativ von er lautet ihm. danken regiert den Dativ: Ich danke ihm."],
  ["Dativ Plural, sie.", ["ihnen", "sie", "ihr", "ihren"], 0, "Der Dativ Plural von sie lautet ihnen: Ich schicke ihnen die Datei."],
  ["Höflicher Dativ.", ["Ihnen", "Sie", "euch", "ihnen"], 0, "Die höfliche Dativform lautet Ihnen und wird großgeschrieben."],
  ["Possessiv, Dativ maskulin.", ["mit meinem Vater", "mit meinen Vater", "mit mein Vater", "mit meiner Vater"], 0, "mit regiert den Dativ. mein nimmt die Endung -em: meinem Vater."],
  ["Possessiv, Akkusativ feminin.", ["für meine Schwester", "für meiner Schwester", "für meinem Schwester", "für meinen Schwester"], 0, "für regiert den Akkusativ. Die feminine Form lautet -e: meine Schwester."],
  ["Zwei Pronomen.", ["Er erklärt sie mir.", "Er erklärt mir sie.", "Er erklärt ihr mich.", "Er sie erklärt mir."], 0, "Bei zwei Pronomen steht der Akkusativ sie vor dem Dativ mir."],
  ["Akkusativ neutrum.", ["Ich nehme es.", "Ich nehme ihm.", "Ich nehme er.", "Ich nehme dem."], 0, "das oder es als direktes Objekt bleibt es. nehmen regiert den Akkusativ."],
  ["ihr kann bedeuten …", ["Dativ feminin oder Possessiv Plural", "nur das höfliche Sie", "nur sie im Akkusativ", "der Infinitiv"], 0, "Kontext und Großschreibung unterscheiden ihr, Ihr und ihrer."],
  ["Ersetzen Sie die Lehrerin als Dativobjekt.", ["ich vertraue ihr", "ich vertraue sie", "ich vertraue es", "ich vertraue ihn"], 0, "vertrauen regiert den Dativ. Das feminine Dativpronomen lautet ihr."],
  ["ein-Endungen bei Possessiven.", ["unserem, unseren, unsere, wie ein", "immer -en", "immer -e", "keine Endungen"], 0, "Possessive werden dekliniert wie der unbestimmte Artikel ein."],
]);

const relativ = rows("relativ", [
  ["Akkusativ maskulin.", ["der Roman, den ich meine", "der Roman, der ich meine", "der Roman, dem ich meine", "der Roman, dessen ich meine"], 0, "meinen regiert den Akkusativ. Roman ist maskulin, das Relativpronomen lautet den."],
  ["Dativ maskulin. helfen.", ["der Mann, dem ich helfe", "der Mann, den ich helfe", "der Mann, der ich helfe", "der Mann, dessen ich helfe"], 0, "helfen regiert den Dativ. Der Kasus kommt aus dem Relativsatz: dem."],
  ["Nominativ feminin.", ["die Frau, die dort steht", "die Frau, der dort steht", "die Frau, den dort steht", "die Frau, deren dort steht"], 0, "Die Frau ist Subjekt von steht. Das Relativpronomen im Nominativ feminin lautet die."],
  ["Dativ Plural.", ["die Leute, denen ich danke", "die Leute, die ich danke", "die Leute, den ich danke", "die Leute, dessen ich danke"], 0, "danken regiert den Dativ. Der Dativ Plural lautet denen."],
  ["Genitiv maskulin.", ["der Autor, dessen Roman erscheint", "der Autor, dem Roman erscheint", "der Autor, den Roman erscheint", "der Autor, deren Roman erscheint"], 0, "Der Genitiv maskulin lautet dessen plus Nomen. Das Bezugswort Autor ist maskulin."],
  ["Genitiv feminin.", ["die Autorin, deren Roman erscheint", "die Autorin, dessen Roman erscheint", "die Autorin, der Roman erscheint", "die Autorin, denen Roman erscheint"], 0, "Der Genitiv feminin lautet deren plus Nomen."],
  ["Präposition für.", ["der Kurs, für den ich zahle", "der Kurs, für dem ich zahle", "der Kurs, für der ich zahle", "der Kurs, den für ich zahle"], 0, "für regiert den Akkusativ. Kurs ist maskulin: für den."],
  ["wohnen, ein fester Ort.", ["die Stadt, in der ich wohne", "die Stadt, in die ich wohne", "die Stadt, in der ich wohne hin", "die Stadt, wo der ich wohne"], 0, "wohnen nennt einen Ort, keine Richtung. in verlangt den Dativ. Stadt ist feminin: in der."],
  ["Ein ganzer Satz.", ["Er hat abgesagt, was mich ärgert.", "Er hat abgesagt, das mich ärgert.", "Er hat abgesagt, der mich ärgert.", "Er hat abgesagt, wem mich ärgert."], 0, "Ein ganzer Satz wird mit was wieder aufgenommen, nicht mit das."],
  ["etwas plus über.", ["etwas, worüber wir reden müssen", "etwas, über was wir müssen reden", "etwas, darüber wir reden", "etwas, wo über wir reden"], 0, "Nach einem Indefinitpronomen steht wo(r)- plus Präposition. Vor dem Vokal von über steht r: worüber."],
  ["Verbstellung.", ["…, die du kennst", "…, die kennst du", "…, die du kennst sie", "…, kennst die du"], 0, "Das finite Verb des Relativsatzes steht am Ende: kennst."],
  ["Dativ neutrum.", ["das Kind, dem ich vorlese", "das Kind, das ich vorlese", "das Kind, den ich vorlese", "das Kind, dessen ich vorlese"], 0, "vorlesen regiert einen Hörer im Dativ. Kind ist neutrum: dem."],
]);

const satzbau = rows("satzbau", [
  ["Aussagesatz mit Zeit vorn.", ["Morgen beginnt der Kurs.", "Morgen der Kurs beginnt.", "Beginnt morgen der Kurs.", "Der Kurs morgen beginnt."], 0, "Ein Satzglied, dann das Verb. Morgen füllt Position 1, beginnt steht in Position 2. Die Verbspitze wäre eine Frage."],
  ["Vorangestelltes Objekt.", ["Den Bericht schicke ich heute.", "Den Bericht ich schicke heute.", "Den Bericht schicke heute ich.", "Ich den Bericht schicke heute."], 0, "Den Bericht füllt Position 1. Das finite Verb schicke steht in Position 2."],
  ["Nebensatz in Position 1.", ["Weil es regnet, bleiben wir hier.", "Weil es regnet, wir bleiben hier.", "Weil regnet es, bleiben wir hier.", "Weil es regnet, bleiben hier wir."], 0, "Der ganze weil-Satz ist ein Satzglied in Position 1. bleiben folgt sofort."],
  ["Zeit, Grund, Art und Weise, Ort.", ["Ich fahre morgen wegen eines Termins mit dem Zug nach Erfurt.", "Ich fahre nach Erfurt morgen mit dem Zug wegen eines Termins.", "Ich wegen fahre morgen.", "Morgen ich fahre nach Erfurt mit."], 0, "Die Folge lautet Zeit, Grund, Art und Weise, Ort."],
  ["Zwei Nomen, neutrale Folge.", ["Sie gibt dem Gast den Schlüssel.", "Sie den Schlüssel gibt dem Gast.", "Sie gibt den Gast dem Schlüssel.", "Sie gibt dem Schlüssel den Gast."], 0, "Bei zwei Nomen steht der Dativ dem Gast vor dem Akkusativ den Schlüssel."],
  ["Zwei Pronomen.", ["Sie gibt ihn ihm.", "Sie gibt ihm ihn.", "Sie gibt er ihm.", "Sie ihn gibt ihm."], 0, "Bei zwei Pronomen steht der Akkusativ ihn vor dem Dativ ihm."],
  ["Verb im Nebensatz.", ["…, dass du heute anrufst.", "…, dass du rufst heute an.", "…, dass rufst du heute an.", "…, dass du heute anrufst du."], 0, "Das finite Verb steht am Ende. Präfix und Verb verbinden sich: anrufst."],
  ["nicht vor dem Präfix.", ["Ich rufe dich nicht an.", "Ich nicht rufe dich an.", "Ich rufe nicht dich an.", "Ich rufe dich an nicht."], 0, "Die Satzverneinung steht unmittelbar vor dem trennbaren Präfix an."],
  ["denn oder weil.", ["denn behält die Verbzweitstellung, weil schickt das Verb ans Ende", "beide schicken das Verb ans Ende", "beide sind Adverbien", "denn leitet Nebensätze ein"], 0, "denn behält im eigenen Satz die Verbzweitstellung. weil verlangt Verbletztstellung."],
  ["Nur ein Satzglied vor dem Verb.", ["Heute Abend kommt Mina.", "Heute Mina kommt Abend.", "Kommt heute Abend Mina.", "Mina heute kommt Abend."], 0, "Heute Abend ist eine einzige Zeitangabe in Position 1. kommt steht in Position 2."],
  ["Stellung von nicht.", ["Nicht nach Bonn fahre ich, sondern nach Mainz.", "Nicht fahre ich nach Bonn sondern.", "Nach nicht Bonn ich fahre.", "Sondern nach Mainz nicht ich fahre Bonn."], 0, "nicht plus die kontrastierte Phrase füllt Position 1. Das finite Verb fahre folgt in Position 2."],
  ["Infinitiv am Ende mit Modalverb.", ["Du musst den Satz neu bauen.", "Du musst bauen den Satz neu.", "Du den Satz musst neu bauen.", "Du musst den Satz neu zu bauen."], 0, "Das Modalverb steht in Position 2, der reine Infinitiv bauen am Ende, ohne zu."],
]);

const trennbar = rows("trennbar", [
  ["Präsens eines trennbaren Verbs.", ["Ich stehe um sechs auf.", "Ich aufstehe um sechs.", "Ich stehe auf um sechs.", "Ich geaufstehe um sechs."], 0, "Das Präfix schließt den Hauptsatz. Es bleibt nicht am finiten Verb."],
  ["Perfekt, trennbar.", ["Hast du eingekauft?", "Hast du gekauft ein?", "Hast du geeinkauft?", "Hast du einkaufen gehabt?"], 0, "ge steht zwischen Präfix und Stamm: eingekauft."],
  ["Perfekt, untrennbar.", ["Sie hat den Text verstanden.", "Sie hat den Text geverstanden.", "Sie hat den Text verstehen ge.", "Sie hat ver den Text gestanden."], 0, "ver- verhindert ge-. Das Partizip lautet verstanden."],
  ["zu.", ["nicht zu vergessen, die Tür abzuschließen", "die Tür zu abschließen", "die Tür ab zu schließen", "die Tür geabzuschließen"], 0, "anzurufen und abzuschließen sind je ein Wort. zu steht zwischen Präfix und Stamm."],
  ["Untrennbare Präfixe sind unter anderem …", ["be-, er-, ver-, zer-, ent-, emp-", "ab-, auf-, ein-, mit-", "nur ge-", "nur zu-"], 0, "Diese Präfixe trennen sich nicht ab und nehmen kein ge-."],
  ["Betonung.", ["Ein betontes Präfix trennt sich ab", "Ein unbetontes Präfix trennt sich ab", "Die Betonung spielt keine Rolle", "Nur -ieren trennt sich ab"], 0, "ANfangen trennt sich ab. verSTEHen bleibt zusammen."],
  ["Verben auf -ieren.", ["studiert, ohne ge-", "gestudiert", "studierget", "ge studiert"], 0, "Verben auf -ieren bilden das Partizip ohne ge-: studiert."],
  ["Imperativ.", ["Ruf mich an.", "Anruf mich.", "Rufe mich anruf.", "Mir ruf an mich."], 0, "Das Präfix geht auch im Imperativ an das Ende: an."],
  ["Nebensatz.", ["…, weil er um sechs aufsteht.", "…, weil er steht um sechs auf.", "…, weil er auf um sechs steht.", "…, weil aufsteht er um sechs."], 0, "Im Nebensatz verbindet sich das Präfix am Ende wieder mit dem Verb: aufsteht."],
  ["überSETzen.", ["trennt sich nicht", "trennt sich immer", "nimmt ge- in die Mitte", "ist nur ein Nomen"], 0, "Unbetontes über- bleibt am Verb. Das Fährverb übersetzen ist ein anderes, trennbares Verb."],
  ["Partizip von mitkommen.", ["mitgekommen", "gekommen mit", "gemitkommen", "mitgekommt"], 0, "kommen wird zu gekommen, mit steht davor: mitgekommen."],
  ["anfangen, du-Form im Präsens.", ["du fängst an", "du anfangst", "du fängst auf", "du gefängst an"], 0, "Der Stammvokal wechselt zu ä: fängst. Das Präfix an steht am Ende."],
]);

const verbenPraep = rows("verben-praep", [
  ["warten", ["auf plus Akkusativ", "auf plus Dativ", "über plus Akkusativ", "mit plus Dativ"], 0, "warten regiert auf plus Akkusativ: auf den Bus, auf ihn."],
  ["sich freuen, vorausblickend.", ["auf", "über", "mit", "von"], 0, "auf gilt für die Zukunft, über für eine gegenwärtige oder vergangene Tatsache."],
  ["sich freuen über ein Geschenk, das man hat.", ["über das Geschenk", "auf das Geschenk", "mit das Geschenk", "für das Geschenk"], 0, "Eine schon geltende Tatsache verlangt über plus Akkusativ: über das Geschenk."],
  ["Das Objekt ist eine Person.", ["Ich denke an sie.", "Ich denke daran.", "Ich denke über sie.", "Ich denke mit sie."], 0, "denken regiert an. Eine Person bleibt Personalpronomen: an sie. daran steht für eine Sache."],
  ["Sache.", ["Ich denke daran.", "Ich denke an es.", "Ich denke da.", "Ich denke woran es."], 0, "an vor Vokal wird zu daran, nicht zu an es."],
  ["Frage.", ["Worauf wartest du?", "Auf wo wartest du?", "Wo an wartest du?", "Wartest du auf wo?"], 0, "Die Frageform ist wo- plus Präposition. Vor dem Vokal steht r: Worauf."],
  ["sich interessieren", ["für", "auf", "über", "mit"], 0, "sich interessieren regiert für plus Akkusativ."],
  ["sich beschweren über eine Sache", ["über", "auf", "für", "an"], 0, "Bei einer Person steht bei, bei einer Sache über."],
  ["Ein angekündigter Satz.", ["Ich freue mich darauf, dass du kommst.", "Ich freue mich auf, dass du kommst.", "Ich freue mich daran, dass du kommst.", "Ich freue mich über dass du kommst."], 0, "Das da-Wort darauf verweist voraus auf den dass-Satz. Das Komma steht vor dass."],
  ["aufhören", ["mit plus Dativ", "auf plus Akkusativ", "über plus Akkusativ", "für plus Akkusativ"], 0, "aufhören regiert mit plus Dativ: Hör mit dem Lärm auf. Hör damit auf."],
  ["über plus Vokal", ["darüber oder worüber", "daüber oder woüber", "damit oder womit", "nur daran"], 0, "Vor einem Vokal steht r: darüber, worüber."],
  ["teilnehmen", ["an plus Dativ", "an plus Akkusativ", "auf plus Akkusativ", "mit plus Akkusativ"], 0, "teilnehmen regiert an plus Dativ: an der Sitzung teilnehmen, daran teilnehmen."],
]);

const vergangenheit = rows("vergangenheit", [
  ["Regelmäßiges Präteritum, er.", ["Er arbeitete lange.", "Er arbeite lange.", "Er gearbeitete lange.", "Er hat arbeitete lange."], 0, "Stämme auf -t schieben ein e ein. Die er-Form lautet arbeitete."],
  ["sehen.", ["ich sah", "ich sehte", "ich gesah", "ich sieht"], 0, "Starkes Präteritum, ohne Endung in der ich- und er-Form: sah."],
  ["kommen, wir.", ["wir kamen", "wir kommten", "wir kamten", "wir gekommen"], 0, "Das Präteritum lautet kam, kamen. Die wir-Form ist kamen."],
  ["Präteritum von müssen, wir.", ["wir mussten", "wir müssten", "wir gemusst", "wir mussteten"], 0, "Der Indikativ verliert den Umlaut: musste, mussten. müssten ist Konjunktiv II."],
  ["Die übliche gesprochene Vergangenheit von sein.", ["war", "ist gewesen", "hatte", "wurde"], 0, "war ist die Form, die man wirklich sagt. ist gewesen ist grammatisch und in der gesprochenen Sprache selten."],
  ["Das frühere von zwei vergangenen Ereignissen.", ["Nachdem er gegessen hatte, ging er.", "Nachdem er aß, ging er.", "Nachdem er gegessen, ging er.", "Nachdem er essen hatte, ging er."], 0, "nachdem verlangt die frühere Handlung im Plusquamperfekt: hatte plus Partizip gegessen."],
  ["gehen verlangt …", ["war im Plusquamperfekt", "hatte", "wurde", "würde"], 0, "gehen bildet das Plusquamperfekt mit sein: war gegangen."],
  ["lesen verlangt …", ["hatte im Plusquamperfekt", "war", "immer wurde", "ist als Hilfsverb im Plusquamperfekt"], 0, "lesen bildet das Plusquamperfekt mit haben: hatte gelesen."],
  ["Nachrichten und Romane bevorzugen …", ["das Präteritum", "Futur II", "den Konjunktiv I bei jedem Verb", "nur das Perfekt"], 0, "Die Erzählung verwendet das Präteritum."],
  ["Einem Freund von gestern erzählen.", ["Ich habe eingekauft.", "Ich einkaufte gestern.", "Ich war eingekauft.", "Ich habe einkaufen gehabt."], 0, "Alltagsverben stehen in der gesprochenen Sprache im Perfekt: habe plus Partizip eingekauft."],
  ["Präteritum von wollen.", ["wollte", "willte", "gewollt", "wollte ge-"], 0, "Modalverben verlieren den Umlaut: wollte, konnte, musste."],
  ["Reihenfolge.", ["Zuerst hatte sie den Schlüssel verloren. Dann rief sie an.", "Zuerst verlor sie den Schlüssel, nachdem sie angerufen hatte.", "Dann hatte sie angerufen, bevor sie den Schlüssel verlor.", "Sie hatte den Schlüssel verloren und hatte danach angerufen."], 0, "Das Plusquamperfekt markiert das frühere von zwei vergangenen Ereignissen. Das spätere bleibt im Präteritum: rief an."],
]);

export const exams = [
  {
    id: "1",
    title: "Prüfung I",
    blurb: "Endungen, Objekte, das Futur, die indirekte Rede, Grund und Zweck, irreale Formen.",
    sections: [
      { id: "adjektive", title: "Adjektive", href: "adjektive" },
      { id: "kasus", title: "Dativ und Akkusativ", href: "kasus" },
      { id: "futur", title: "Futur I und II", href: "futur" },
      { id: "rede", title: "Indirekte Rede", href: "rede" },
      { id: "kausal-final", title: "Grund und Zweck", href: "kausal" },
      { id: "konjunktiv2", title: "Konjunktiv II", href: "konjunktiv2" },
    ],
    questions: [...adjektive, ...kasus, ...futur, ...rede, ...kausalFinal, ...konjunktiv2],
  },
  {
    id: "2",
    title: "Prüfung II",
    blurb: "Modalverben, Nomen-Verb-Fügungen, Nominalstil, Partizipien, das Passiv, Präpositionen.",
    sections: [
      { id: "modalverben", title: "Modalverben", href: "modalverben" },
      { id: "nomen-verb", title: "Nomen-Verb-Verbindungen", href: "nomen-verb" },
      { id: "nominal", title: "Nominalisierung", href: "nominal" },
      { id: "partizip", title: "Partizipien", href: "partizip" },
      { id: "passiv", title: "Passiv", href: "passiv" },
      { id: "praepositionen", title: "Präpositionen", href: "praepositionen" },
    ],
    questions: [...modalverben, ...nomenVerb, ...nominal, ...partizip, ...passiv, ...praepositionen],
  },
  {
    id: "3",
    title: "Prüfung III",
    blurb: "Pronomen, Relativsätze, Wortstellung, Präfixe, Verben mit Präposition, die Vergangenheit.",
    sections: [
      { id: "pronomen", title: "Pronomen", href: "pronomen" },
      { id: "relativ", title: "Relativsätze", href: "relativ" },
      { id: "satzbau", title: "Satzbau", href: "satzbau" },
      { id: "trennbar", title: "Trennbare Verben", href: "trennbar" },
      { id: "verben-praep", title: "Verben mit Präpositionen", href: "verben-praep" },
      { id: "vergangenheit", title: "Vergangenheitsformen", href: "vergangenheit" },
    ],
    questions: [...pronomen, ...relativ, ...satzbau, ...trennbar, ...verbenPraep, ...vergangenheit],
  },
];
