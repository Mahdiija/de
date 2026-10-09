function workshop(id, title, level, note, drills) {
  return { id, title, level, note, drills };
}

function arrange(stem, answer, why) {
  const parts = (Array.isArray(answer) ? answer : [answer]).flatMap((part) => String(part).split(/\s+/)).filter(Boolean);
  return {
    type: "arrange",
    prompt: "Bringen Sie die Wörter in die richtige Reihenfolge.",
    stem,
    answer: parts,
    why,
  };
}

function choice(prompt, options, answer, why) {
  return { type: "choice", prompt, options, answer, why };
}

function cloze(prompt, text, why) {
  return { type: "cloze", prompt, text, why };
}

function transform(prompt, source, answers, why) {
  return { type: "transform", prompt, source, answers, why };
}

function sort(prompt, buckets, cards) {
  return { type: "sort", prompt, buckets, cards };
}

const poNote = "Der Anfang des Satzes ist vorgegeben. Ein Präpositionalobjekt steht in der Regel ganz am Ende. Bei einem trennbaren Verb oder einem Infinitiv steht dieses Verb noch hinter dem Präpositionalobjekt.";

export const workshops = {
  imperativ: [
    workshop("du", "Befehle an du", "A2", "du fällt weg. Ein Stammwechsel gilt nur in dieser Form, und ein trennbares Präfix steht am Ende.", [
      arrange("Mach", ["bitte", "das Licht", "aus."], "Beim trennbaren Verb ausmachen steht das Präfix aus am Ende des Imperativs."),
      arrange("Lies", ["den Text", "noch einmal", "laut."], "Der Imperativ Singular von lesen lautet lies, weil der Stammvokal e zu ie wechselt. du steht nicht dabei."),
      arrange("Nimm", ["dir", "noch", "Kuchen."], "Der Imperativ Singular von nehmen lautet nimm, weil der Stammvokal e zu i wechselt. du steht nicht dabei."),
      arrange("Sei", ["morgen", "pünktlich."], "Der Imperativ Singular von sein lautet sei. Das Pronomen du fällt weg."),
      arrange("Ruf", ["mich", "heute Abend", "an."], "Beim trennbaren Verb anrufen steht das Präfix an am Ende des Imperativs."),
      arrange("Sprich", ["bitte", "etwas", "lauter."], "Der Imperativ Singular von sprechen lautet sprich, weil der Stammvokal e zu i wechselt."),
    ]),
    workshop("sie", "Höfliche Befehle an Sie", "A2", "Das Verb steht an erster Stelle. Sie folgt unmittelbar danach.", [
      arrange("Machen Sie", ["bitte", "das Licht", "aus."], "Im Sie-Imperativ steht das Verb zuerst, Sie direkt dahinter. Das Präfix aus schließt den Satz."),
      arrange("Seien Sie", ["so gut", "und warten", "Sie kurz."], "Der Sie-Imperativ von sein lautet seien Sie. Sie steht unmittelbar nach dem Verb."),
      arrange("Nehmen Sie", ["doch", "Platz."], "Im Sie-Imperativ wechselt der Stamm nicht: nehmen Sie, nicht nimm Sie."),
      arrange("Rufen Sie", ["mich", "morgen", "an."], "Auch im Sie-Imperativ steht das trennbare Präfix an am Satzende."),
      arrange("Geben Sie", ["mir", "bitte", "den Schlüssel."], "Im Sie-Imperativ steht die Grundform geben vor Sie. Der Stamm wechselt nicht."),
      arrange("Essen Sie", ["nicht", "so", "schnell."], "nicht steht unmittelbar vor dem Teil, den es verneint: hier vor so schnell."),
    ]),
  ],
  "indirekte-fragen": [
    workshop("ob", "Ja-Nein-Fragen mit ob", "A2", "ob ersetzt die Frage mit Verb an erster Stelle. Das finite Verb schließt den Nebensatz.", [
      arrange("Ich weiß nicht,", ["ob", "Lea", "heute", "kommt."], "ob leitet den Nebensatz ein. Das finite Verb kommt steht deshalb am Ende."),
      arrange("Sie fragt,", ["ob", "wir", "noch Brot", "brauchen."], "Im ob-Satz gilt Verbletztstellung: brauchen ist das finite Verb und steht am Ende."),
      arrange("Sag mir,", ["ob", "der Laden", "um acht", "aufmacht."], "Im Nebensatz bleibt das trennbare Verb zusammen: aufmacht steht als ein Wort am Ende."),
      arrange("Können Sie mir sagen,", ["ob", "hier", "ein Geldautomat", "ist?"], "Können Sie mir sagen ist der Hauptsatz mit Verbzweitstellung. Die eigentliche Frage ist der ob-Satz und endet mit ist."),
      arrange("Er will wissen,", ["ob", "du", "den Schlüssel", "hast."], "hast ist das finite Verb des ob-Satzes und steht deshalb am Ende."),
      arrange("Ich frage mich,", ["ob", "das", "überhaupt", "stimmt."], "ob verlangt Verbletztstellung. Das finite Verb stimmt schließt den Nebensatz."),
    ]),
    workshop("w", "Fragen mit Fragewort", "A2", "Das Fragewort bleibt. Das finite Verb rückt an das Ende des Nebensatzes.", [
      arrange("Weißt du,", ["wann", "der Zug", "fährt?"], "Das Fragewort wann leitet den Nebensatz ein. Das finite Verb fährt steht am Ende."),
      arrange("Sag mir,", ["wo", "Yusuf", "wohnt."], "wo leitet den indirekten Fragesatz ein. Das finite Verb wohnt steht am Ende."),
      arrange("Sie fragt,", ["warum", "du", "zu spät", "bist."], "warum leitet den Nebensatz ein. Das finite Verb bist schließt ihn."),
      arrange("Erklären Sie mir,", ["wie", "das Gerät", "funktioniert."], "wie leitet den indirekten Fragesatz ein. Das finite Verb funktioniert steht am Ende."),
      arrange("Ich weiß nicht,", ["wen", "sie", "gesucht", "hat."], "Im Perfekt ist hat das finite Verb und steht am Ende des Nebensatzes. Das Partizip gesucht steht davor."),
      arrange("Kannst du mir sagen,", ["worauf", "wir", "warten?"], "warten regiert auf. Die Frageform dazu lautet worauf. Das finite Verb warten steht am Ende des Nebensatzes."),
    ]),
  ],
  modalverben: [
    workshop("ordnen", "Modalverb plus Infinitiv", "A2", "Das Modalverb steht in Position 2. Der reine Infinitiv schließt den Satz.", [
      arrange("Lea muss", ["heute", "länger", "arbeiten."], "muss ist das finite Verb in Position 2. Der reine Infinitiv arbeiten steht am Ende, ohne zu."),
      arrange("Wir möchten", ["am Fenster", "sitzen."], "Nach möchten steht der reine Infinitiv sitzen am Satzende. zu steht nicht davor."),
      arrange("Du sollst", ["den Arzt", "anrufen."], "Das Modalverb sollst steht in Position 2. Der trennbare Infinitiv anrufen bleibt ein Wort am Ende."),
      arrange("Samir kann", ["sehr gut", "kochen."], "können drückt hier die Fähigkeit aus. Der reine Infinitiv kochen steht am Ende, ohne zu."),
      arrange("Ihr dürft", ["hier", "nicht", "rauchen."], "Ein Verbot lautet nicht dürfen. nicht steht unmittelbar vor dem Infinitiv rauchen."),
      arrange("Ich muss", ["morgen früh", "aufstehen."], "muss steht in Position 2. Der trennbare Infinitiv aufstehen bleibt zusammen am Satzende."),
    ]),
    workshop("nicht", "nicht dürfen oder nicht müssen", "A2", "Ein Verbot heißt nicht dürfen. Keine Pflicht heißt nicht müssen.", [
      choice("Rauchen ist verboten.", ["Man darf hier nicht rauchen.", "Man muss hier nicht rauchen.", "Man will hier nicht rauchen.", "Man soll hier nicht rauchen müssen."], 0, "Ein Verbot verlangt nicht dürfen: darf nicht. nicht müssen würde nur die Pflicht aufheben."),
      choice("Es besteht keine Pflicht zu kommen.", ["Du musst nicht kommen.", "Du darfst nicht kommen.", "Du kannst nicht kommen.", "Du sollst nicht kommen."], 0, "Keine Pflicht verlangt nicht müssen: musst nicht. nicht dürfen wäre ein Verbot."),
      cloze("Ein höflicher Wunsch.", "Ich {möchte} bitte ein stilles Wasser.", "Die Form der 1. Person Singular von möchten lautet möchte."),
      cloze("Ein Auftrag von außen.", "Du {sollst} die Unterlagen heute abschicken.", "sollen gibt einen Auftrag wieder, der von einer anderen Person kommt. Die du-Form lautet sollst."),
      transform("Formulieren Sie das Verbot mit dürfen.", "Rauchen ist hier verboten.", ["Man darf hier nicht rauchen.", "Du darfst hier nicht rauchen."], "Ein Verbot verlangt nicht dürfen. darf steht in Position 2, der Infinitiv rauchen am Ende."),
      transform("Heben Sie die Pflicht mit müssen auf.", "Bleiben ist nicht nötig.", ["Du musst nicht bleiben."], "Keine Pflicht verlangt nicht müssen: musst nicht. Der Infinitiv bleiben steht am Ende."),
    ]),
  ],
  perfekt: [
    workshop("ordnen", "Hilfsverb in Position 2, Partizip am Ende", "A2", "haben oder sein steht in Position 2. Das Partizip II schließt den Satz.", [
      arrange("Ich habe", ["den Film", "gesehen."], "sehen bildet das Perfekt mit haben. habe steht in Position 2, das Partizip gesehen am Ende."),
      arrange("Wir sind", ["nach Hause", "gegangen."], "Eine Bewegung von einem Ort zum anderen, hier gehen, bildet das Perfekt mit sein. Das Partizip gegangen steht am Ende."),
      arrange("Hast du", ["die Rechnung", "ausgedruckt?"], "Beim trennbaren Verb steht ge zwischen Präfix und Stamm: ausgedruckt. Das Hilfsverb hast steht in Position 2."),
      arrange("Mina ist", ["um acht", "losgefahren."], "losfahren ist eine Ortsveränderung und bildet das Perfekt mit sein. Das Partizip lautet losgefahren."),
      arrange("Sie hat", ["in Bonn", "studiert."], "Verben auf -ieren bilden das Partizip II ohne ge-: studiert. Das Hilfsverb hat steht in Position 2."),
      arrange("Das Kind ist", ["früh", "eingeschlafen."], "Ein Zustandswechsel, hier einschlafen, bildet das Perfekt mit sein. Das Partizip eingeschlafen steht am Ende."),
    ]),
    workshop("haben-sein", "haben oder sein", "A2", "Die meisten Verben bilden das Perfekt mit haben. Eine Ortsveränderung und ein Zustandswechsel verlangen sein.", [
      sort("Welches Hilfsverb verlangt das Verb im Perfekt?", ["haben", "sein"], [
        { text: "essen", bucket: 0 },
        { text: "aufstehen", bucket: 1 },
        { text: "bleiben", bucket: 1 },
        { text: "kaufen", bucket: 0 },
        { text: "einschlafen", bucket: 1 },
        { text: "arbeiten", bucket: 0 },
        { text: "ankommen", bucket: 1 },
        { text: "lesen", bucket: 0 },
      ]),
    ]),
  ],
  "war-hatte": [
    workshop("ordnen", "war und hatte in Position 2", "A2", "Das sind die gesprochenen Vergangenheitsformen von sein und haben. Das Verb bleibt in Position 2.", [
      arrange("Gestern war", ["ich", "den ganzen Tag", "krank."], "Ein Zustand mit sein verlangt im Präteritum war. hatte wäre die Form von haben."),
      arrange("Wo warst", ["du", "am Sonntag?"], "Die du-Form von sein im Präteritum lautet warst. Das Verb steht in Position 2."),
      arrange("Wir hatten", ["kein Bargeld", "dabei."], "Die wir-Form von haben im Präteritum lautet hatten. Das Verb steht in Position 2."),
      arrange("Früher hatte", ["das Café", "sonntags", "zu."], "hatte ist die er-Form von haben im Präteritum und steht in Position 2."),
      arrange("Es war", ["schon", "dunkel."], "Das Präteritum von sein lautet in der es-Form war und steht in Position 2."),
      arrange("Du hattest", ["völlig", "recht."], "Die du-Form von haben im Präteritum lautet hattest und steht in Position 2."),
    ]),
  ],
  wechselpraepositionen: [
    workshop("wo", "Wo etwas schon ist", "A2", "Die Frage Wo? verlangt den Dativ. Die Sache bewegt sich nicht auf ein Ziel zu.", [
      arrange("Die Katze sitzt", ["auf", "dem", "Stuhl."], "sitzen nennt einen Ort, keine Richtung. Auf die Frage Wo? steht der maskuline Dativ dem Stuhl."),
      arrange("Die Lampe steht", ["hinter", "dem", "Regal."], "stehen nennt einen Ort. Auf die Frage Wo? verlangt hinter den Dativ: dem Regal."),
      arrange("Sie wartet", ["vor", "dem", "Kino."], "warten ist hier keine Bewegung in das Kino hinein. Auf die Frage Wo? steht der Dativ dem Kino."),
      arrange("Das Bild hängt", ["über", "dem", "Sofa."], "Das Bild hängt schon. Auf die Frage Wo? verlangt über den Dativ: dem Sofa."),
      arrange("Der Mantel hängt", ["an", "der", "Tür."], "Der Mantel hängt schon. Tür ist feminin, der Dativ lautet der Tür."),
      arrange("Wir sitzen", ["neben", "unseren", "Freunden."], "sitzen nennt einen Ort. Im Dativ Plural lautet die Form unseren Freunden."),
    ]),
    workshop("wohin", "Wohin etwas gelangt", "A2", "Die Frage Wohin? verlangt den Akkusativ.", [
      arrange("Ich lege", ["das Buch", "auf", "den Tisch."], "legen ist eine Bewegung auf eine Fläche. Auf die Frage Wohin? steht der Akkusativ den Tisch."),
      arrange("Wir gehen", ["jetzt", "in", "die Bibliothek."], "gehen nennt hier ein Ziel. Bibliothek ist feminin, der Akkusativ lautet die Bibliothek."),
      arrange("Stell", ["die Tasche", "unter", "den Tisch."], "stellen nennt eine Bewegung an ein Ziel. Auf die Frage Wohin? steht der Akkusativ den Tisch."),
      arrange("Sie hängt", ["den Mantel", "an", "die Tür."], "Etwas hängen ist eine Bewegung an ein Ziel. Auf die Frage Wohin? steht der Akkusativ die Tür."),
      arrange("Er setzt", ["das Kind", "neben", "seine Schwester."], "setzen ist die Handlung der Bewegung. Auf die Frage Wohin? steht der Akkusativ seine Schwester."),
      arrange("Leg", ["den Schlüssel", "in", "die Schublade."], "legen nennt ein Ziel. Schublade ist feminin, der Akkusativ lautet die Schublade."),
    ]),
  ],
  pronomen: [
    workshop("ordnen", "Reihenfolge der Pronomen", "A2/B1", "Sind beide Objekte Pronomen, steht das Akkusativpronomen vor dem Dativpronomen.", [
      arrange("Kannst du", ["sie", "mir", "vorstellen?"], "Bei zwei Pronomen steht der Akkusativ sie vor dem Dativ mir."),
      arrange("Ich gebe", ["es", "dir", "morgen."], "Bei zwei Pronomen steht der Akkusativ es vor dem Dativ dir."),
      arrange("Er erklärt", ["ihn", "ihr."], "Bei zwei Pronomen steht der Akkusativ ihn vor dem Dativ ihr."),
      arrange("Nora schickt", ["sie", "ihm", "heute."], "die Karte wird zum Akkusativ sie, dem Bruder zum Dativ ihm. Der Akkusativ steht vorn."),
      arrange("Wir zeigen", ["es", "ihnen", "gleich."], "Bei zwei Pronomen steht der Akkusativ es vor dem Dativ ihnen."),
      arrange("Kann ich", ["ihn", "Ihnen", "leihen?"], "Bei zwei Pronomen steht der Akkusativ ihn vor dem Dativ. Die höfliche Dativform lautet Ihnen und wird großgeschrieben."),
    ]),
    workshop("formen", "Die richtige Kasusform", "A2/B1", "Das Pronomen übernimmt den Kasus des Nomens, das es ersetzt.", [
      cloze("danken regiert den Dativ.", "Ich danke {dir} für die Hilfe.", "danken regiert den Dativ. Die Dativform von du lautet dir, nicht dich."),
      cloze("Neutrum im Dativ.", "Die Lehrerin hilft {ihm}.", "helfen regiert den Dativ. dem Kind wird zu ihm."),
      cloze("Possessiv, Dativ maskulin.", "Ich fahre mit {meinem} Bruder.", "mit regiert den Dativ. Die maskuline Dativendung von mein lautet -em: meinem."),
      cloze("Höflicher Dativ.", "Ich schicke {Ihnen} die Datei.", "Die höfliche Dativform lautet Ihnen und wird großgeschrieben."),
      choice("Ersetzen Sie die Lehrerin als Dativobjekt.", ["Ich vertraue ihr.", "Ich vertraue sie.", "Ich vertraue ihn.", "Ich vertraue es."], 0, "vertrauen regiert den Dativ. Die feminine Dativform lautet ihr, nicht sie."),
      choice("Akkusativ von ich.", ["Sie ruft mich an.", "Sie ruft mir an.", "Sie ruft mein an.", "Sie ruft ich an."], 0, "anrufen regiert den Akkusativ. Die Akkusativform von ich lautet mich, nicht mir."),
    ]),
  ],
  praepositionen: [
    workshop("ordnen", "Präposition und Nomen", "A2/B1", "Die Präposition bestimmt den Kasus. Die Phrase bleibt zusammen.", [
      arrange("Wir fahren", ["mit", "dem", "Zug."], "mit regiert den Dativ. Die maskuline Form lautet dem Zug."),
      arrange("Das Geschenk ist", ["für", "meinen", "Vater."], "für regiert den Akkusativ. Die maskuline Form lautet meinen Vater."),
      arrange("Wegen", ["des starken", "Regens", "bleiben wir hier."], "wegen regiert den Genitiv: des starken Regens. Die ganze Phrase steht vorn, deshalb folgt das Verb bleiben."),
      arrange("Seit", ["einem Monat", "wohnt sie", "bei Freunden."], "seit regiert den Dativ: einem Monat. Die Phrase steht in Position 1, das Verb wohnt in Position 2."),
      arrange("Ohne", ["meinen Ausweis", "komme ich", "nicht rein."], "ohne regiert den Akkusativ: meinen Ausweis. Die Phrase steht in Position 1, das Verb komme in Position 2."),
      arrange("Während", ["der Sitzung", "klingelt", "kein Telefon."], "während regiert den Genitiv. Sitzung ist feminin, der Genitiv lautet der Sitzung."),
    ]),
    workshop("fall", "Welcher Kasus?", "A2/B1", "Lernen Sie die festen Listen. Wechselpräpositionen sind ein eigenes Kapitel.", [
      sort("Ordnen Sie die Präposition dem Kasus zu.", ["Dativ", "Akkusativ", "Genitiv"], [
        { text: "mit", bucket: 0 },
        { text: "für", bucket: 1 },
        { text: "wegen", bucket: 2 },
        { text: "seit", bucket: 0 },
        { text: "durch", bucket: 1 },
        { text: "während", bucket: 2 },
        { text: "zu", bucket: 0 },
        { text: "gegen", bucket: 1 },
        { text: "trotz", bucket: 2 },
        { text: "aus", bucket: 0 },
      ]),
    ]),
  ],
  final: [
    workshop("damit", "damit bei verschiedenen Subjekten", "B1", "Zwei verschiedene Subjekte verlangen damit. Das Verb des damit-Satzes steht am Ende.", [
      arrange("Ich schreibe es auf,", ["damit", "ich", "es", "nicht vergesse."], "damit leitet einen Finalsatz ein. Das finite Verb vergesse steht am Ende."),
      arrange("Lea spricht laut,", ["damit", "die Oma", "sie", "hört."], "Lea und die Oma sind zwei Subjekte. Deshalb steht damit, und das finite Verb hört schließt den Nebensatz."),
      arrange("Wir wiederholen die Regel,", ["damit", "alle", "sie", "verstehen."], "damit verlangt Verbletztstellung. Das finite Verb verstehen steht am Ende."),
      arrange("Er gibt ihr Geld,", ["damit", "sie", "ein Ticket", "kauft."], "Er und sie sind verschiedene Subjekte. Deshalb steht damit, nicht um … zu. kauft schließt den Nebensatz."),
      arrange("Sprich langsam,", ["damit", "ich", "alles", "mitbekomme."], "damit verlangt Verbletztstellung. Das trennbare Verb bleibt zusammen: mitbekomme."),
      arrange("Sie bleibt hier,", ["damit", "das Kind", "nicht", "aufwacht."], "Sie und das Kind sind verschiedene Subjekte. Im damit-Satz steht das trennbare Verb als ein Wort am Ende: aufwacht."),
    ]),
    workshop("um-zu", "um … zu beim selben Subjekt", "B1", "Dasselbe Subjekt verlangt um … zu. zu steht in einem trennbaren Verb.", [
      arrange("Sie lernt Deutsch,", ["um", "in München", "zu arbeiten."], "Das Subjekt bleibt sie. Deshalb steht um … zu. Der Infinitiv zu arbeiten schließt die Infinitivgruppe."),
      arrange("Er spart,", ["um", "sich ein Fahrrad", "zu kaufen."], "Das Subjekt bleibt er. zu kaufen steht am Ende der Infinitivgruppe."),
      arrange("Nora bleibt,", ["um", "den Anfang", "nicht zu verpassen."], "Das Subjekt bleibt Nora. nicht steht unmittelbar vor zu plus Infinitiv: nicht zu verpassen."),
      arrange("Ich stehe früh auf,", ["um", "den Zug", "nicht zu verpassen."], "verpassen ist nicht trennbar. zu steht deshalb vor dem Infinitiv, nicht darin: nicht zu verpassen."),
      arrange("Wir treffen uns,", ["um", "den Plan", "zu besprechen."], "Das Subjekt bleibt wir. besprechen ist nicht trennbar, deshalb steht zu davor: zu besprechen."),
      arrange("Vergiss nicht anzurufen,", ["um", "den Termin", "zu bestätigen."], "Die Infinitivgruppe des Zwecks schließt mit zu bestätigen. bestätigen ist nicht trennbar, zu steht davor."),
    ]),
  ],
  "je-desto": [
    workshop("ordnen", "je … desto", "B1", "Der je-Satz endet mit seinem Verb. Nach desto und dem Komparativ folgt sofort das finite Verb.", [
      arrange("Je kälter es wird,", ["desto früher", "gehen", "wir rein."], "Der je-Satz endet mit wird. Nach desto früher steht das finite Verb gehen direkt dahinter."),
      arrange("Je mehr du liest,", ["umso sicherer", "schreibst", "du."], "umso funktioniert wie desto. Nach umso sicherer folgt sofort das finite Verb schreibst."),
      arrange("Je älter der Wein wird,", ["desto teurer", "wird", "er."], "Nach desto teurer steht das finite Verb wird in Position 2 des Hauptsatzes."),
      arrange("Je schneller du sprichst,", ["desto weniger", "verstehe", "ich."], "Nach desto weniger folgt sofort das finite Verb verstehe."),
      arrange("Je ruhiger das Büro ist,", ["desto besser", "kann", "ich denken."], "Nach desto besser steht das finite Verb kann. Der Infinitiv denken folgt am Ende."),
      arrange("Je länger wir warten,", ["desto ungeduldiger", "werden", "die Kinder."], "Nach desto ungeduldiger steht das finite Verb werden in Position 2."),
    ]),
  ],
  konditional: [
    workshop("ordnen", "wenn, falls und Verb an erster Stelle", "B1", "Eine vorangestellte Bedingung gilt als Position 1. Der Hauptsatz beginnt deshalb mit seinem Verb.", [
      arrange("Wenn du anrufst,", ["bin", "ich", "zu Hause."], "Der wenn-Satz füllt Position 1. Das finite Verb bin des Hauptsatzes folgt sofort."),
      arrange("Falls das Wetter umschlägt,", ["grillen", "wir", "nicht."], "falls nennt eine weniger sichere Bedingung. Der falls-Satz ist Position 1, deshalb folgt grillen sofort."),
      arrange("Kommt der Bus nicht,", ["nehmen", "wir", "ein Taxi."], "Die Verbspitze ersetzt wenn. Die Bedingung ist Position 1, das finite Verb nehmen folgt sofort."),
      arrange("Ruft Mina an,", ["sage", "ich", "Bescheid."], "Beim trennbaren Verb eröffnet das finite Verb die Bedingung, das Präfix an steht am Ende dieses Satzes. sage folgt als Verb des Hauptsatzes."),
      arrange("Wenn es regnet,", ["bleiben", "wir", "im Atelier."], "Der wenn-Satz ist Position 1. Das finite Verb bleiben des Hauptsatzes folgt sofort."),
      arrange("Hätte ich das gewusst,", ["wäre", "ich", "geblieben."], "Eine irreale Bedingung kann ebenfalls mit dem Verb beginnen. Sie ist Position 1, deshalb folgt wäre sofort."),
    ]),
  ],
  konzessiv: [
    workshop("ordnen", "obwohl und trotzdem", "B1", "obwohl schickt das Verb an das Ende. trotzdem ist ein Adverb: Das Verb bleibt in Position 2. Nicht beides zugleich.", [
      arrange("Obwohl es schneit,", ["fährt", "der Bus."], "Der obwohl-Satz füllt Position 1 und endet mit schneit. Das finite Verb fährt des Hauptsatzes folgt sofort."),
      arrange("Obwohl ich wenig geschlafen habe,", ["bin", "ich", "wach."], "Der obwohl-Satz endet mit dem finiten Verb habe. Er ist Position 1, deshalb folgt bin sofort."),
      arrange("Es ist teuer.", ["Trotzdem", "kaufe", "ich es."], "trotzdem ist ein Adverb in Position 1. Das finite Verb kaufe steht deshalb in Position 2."),
      arrange("Obwohl der Saal voll war,", ["haben", "wir Plätze", "gefunden."], "Der obwohl-Satz ist Position 1. haben ist das finite Verb des Hauptsatzes und folgt sofort. Das Partizip gefunden steht am Ende."),
      arrange("Auch wenn du müde bist,", ["ist", "der Text", "kurz."], "auch wenn funktioniert wie obwohl und verlangt Verbletztstellung: bist. Der Nebensatz ist Position 1, deshalb folgt ist."),
      arrange("Es regnet.", ["Trotzdem", "gehen", "wir los."], "Ein Anschluss genügt. trotzdem steht in Position 1, das finite Verb gehen in Position 2. obwohl steht hier nicht zusätzlich."),
    ]),
  ],
  infinitiv: [
    workshop("zu", "Wo zu steht", "B1", "zu steht vor dem Infinitiv und in einem trennbaren Verb. Modalverben, lassen und werden verlangen kein zu.", [
      arrange("Wir haben vor,", ["uns um acht", "zu treffen."], "vorhaben verlangt eine Infinitivgruppe mit zu. zu treffen steht am Ende."),
      arrange("Vergiss nicht,", ["die Rechnung", "abzuschicken."], "Bei einem trennbaren Verb steht zu zwischen Präfix und Stamm: abzuschicken."),
      arrange("Elena nimmt sich vor,", ["heute", "anzurufen."], "Bei einem trennbaren Verb steht zu im Verb. anzurufen ist ein Wort."),
      arrange("Du brauchst", ["heute", "nicht", "zu kochen."], "nicht steht unmittelbar vor zu plus Infinitiv: nicht zu kochen."),
      arrange("Es ist schwer,", ["das", "leise", "zu sagen."], "Die Infinitivgruppe folgt nach dem Komma und schließt mit zu sagen."),
      arrange("Sie scheint", ["den Termin", "vergessen", "zu haben."], "Der Infinitiv Perfekt endet mit zu haben oder zu sein. Hier steht zu haben am Ende."),
    ]),
    workshop("dass", "zu oder dass", "B1", "Dasselbe Subjekt bevorzugt zu. Ein anderes Subjekt verlangt dass, oder ein Verb wie bitten, das das Subjekt an sein Objekt weitergibt.", [
      transform("Dasselbe Subjekt. Verwenden Sie zu.", "Elena nimmt sich vor: Sie ruft heute an.", ["Elena nimmt sich vor, heute anzurufen."], "Das Subjekt bleibt Elena. anrufen ist trennbar, deshalb steht zu im Verb: anzurufen."),
      transform("bitten erlaubt einen Infinitiv, dessen Subjekt das Objekt ist.", "Jonas bittet Samir. Samir soll früher kommen.", ["Jonas bittet Samir, früher zu kommen."], "Samir ist das Objekt von bitten und gilt als Subjekt von kommen. Deshalb steht zu kommen, nicht dass."),
      choice("Welches Verb verlangt zu?", ["Wir versuchen, pünktlich zu sein.", "Wir müssen pünktlich zu sein.", "Wir lassen ihn zu gehen.", "Wir werden pünktlich zu sein."], 0, "versuchen regiert eine Infinitivgruppe mit zu. müssen, lassen und werden verlangen den reinen Infinitiv ohne zu."),
      cloze("Trennbare Verben.", "Vergiss nicht, die Tür {abzuschließen}.", "Bei einem trennbaren Verb steht zu zwischen Präfix und Stamm: abzuschließen."),
      sort("Verlangt das zweite Verb zu?", ["mit zu", "ohne zu"], [
        { text: "versuchen", bucket: 0 },
        { text: "können", bucket: 1 },
        { text: "anfangen", bucket: 0 },
        { text: "lassen", bucket: 1 },
        { text: "vergessen", bucket: 0 },
        { text: "werden", bucket: 1 },
      ]),
    ]),
  ],
  "weder-noch": [
    workshop("ordnen", "weder … noch", "B1", "Das Paar bedeutet schon, dass beides nicht gilt. Ein zusätzliches nicht steht nicht.", [
      arrange("Ich trinke", ["weder", "Tee", "noch Kaffee."], "weder steht vor dem ersten Glied, noch vor dem zweiten. Ein zusätzliches nicht wäre doppelt."),
      arrange("Wir haben", ["weder", "Zeit", "noch Geld."], "haben bleibt in Position 2. weder … noch verbindet die beiden Akkusativobjekte und enthält die Verneinung schon."),
      arrange("Sie hat", ["weder angerufen", "noch", "geschrieben."], "Die beiden Partizipien sind die parallelen Glieder. hat bleibt in Position 2."),
      arrange("Das Gerät ist", ["weder", "schnell", "noch leise."], "Zwei Adjektive folgen demselben Muster: weder vor dem ersten, noch vor dem zweiten."),
      arrange("Er isst", ["weder", "Fleisch", "noch Fisch."], "Innerhalb von weder … noch steht kein. Die Verneinung liegt schon im Paar."),
      arrange("Weder Mina noch ihre Eltern", ["waren", "gestern", "da."], "Das Verb richtet sich nach dem näheren Subjekt ihre Eltern. Die Pluralform lautet waren."),
    ]),
  ],
  korrelat: [
    workshop("ordnen", "nicht nur … sondern auch und sowohl … als auch", "B1", "Die beiden Stellen müssen dieselbe Art von Phrase enthalten.", [
      arrange("Sie spricht", ["nicht nur Deutsch,", "sondern auch", "Türkisch."], "Die beiden Glieder sind Nomen und stehen parallel: nicht nur Deutsch, sondern auch Türkisch."),
      arrange("Wir checken", ["sowohl", "die Quellen", "als auch die Zahlen."], "sowohl … als auch umschließt die beiden Akkusativobjekte. checken bleibt in Position 2."),
      arrange("Der Kurs ist", ["nicht nur günstig,", "sondern auch", "gut betreut."], "Die beiden Glieder sind Beschreibungen und stehen parallel nach ist."),
      arrange("Nicht nur Yusuf, sondern auch Lea", ["kommt", "zur Probe."], "Die ganze Klammer ist Position 1. Das finite Verb kommt folgt in Position 2 und richtet sich nach Lea."),
      arrange("Mina schreibt nicht nur die Mail,", ["sondern", "ruft", "auch an."], "Das zweite finite Verb ruft setzt den Satz fort. Das Präfix an steht am Ende."),
      arrange("Der Test prüft", ["sowohl die Grammatik", "als auch", "den Wortschatz."], "Beide Objekte bleiben im Akkusativ: die Grammatik und den Wortschatz."),
    ]),
  ],
  adjektive: [
    workshop("enden", "Die richtige Endung", "B1/B2", "Nach der ist die Endung schwach. Nach ein ist sie gemischt. Ohne Artikel ist sie stark.", [
      choice("Dativ, bestimmt, maskulin.", ["mit dem roten Mantel", "mit dem rotem Mantel", "mit dem roter Mantel", "mit dem rotes Mantel"], 0, "Nach dem ist die Adjektivendung schwach. Im Dativ maskulin lautet sie -en: roten."),
      choice("Ohne Artikel, Dativ neutrum.", ["mit kaltem Wasser", "mit kalten Wasser", "mit kalte Wasser", "mit kaltem dem Wasser"], 0, "Ohne Artikel ist die Endung stark. Der Dativ neutrum lautet -em: kaltem Wasser."),
      cloze("Gemischt, Nominativ maskulin.", "Das ist ein {neuer} Kollege.", "ein markiert den Nominativ maskulin nicht. Die Adjektivendung ist deshalb stark -er: neuer."),
      cloze("Superlativ vor dem Nomen.", "Sie sucht die {schnellste} Verbindung.", "Der Superlativ von schnell lautet schnellste. Nach die folgt die schwache Endung -e."),
      cloze("Superlativ als Prädikat.", "Dieses Brot schmeckt am {besten}.", "Der prädikative Superlativ lautet am plus -sten: am besten."),
      cloze("Komparativ mit Umlaut.", "Nora ist {älter} als ihre Schwester.", "Der Komparativ von alt lautet älter, mit Umlaut. Der Vergleich zweier Größen verlangt als."),
    ]),
    workshop("ordnen", "Adjektiv in der Nominalphrase", "B1/B2", "Artikel, Adjektiv und Nomen bleiben zusammen.", [
      arrange("Sie kommt", ["mit dem roten", "Mantel."], "Nach dem ist die Adjektivendung schwach. Im Dativ maskulin lautet sie -en: roten."),
      arrange("Das ist", ["ein neuer", "Kollege."], "ein markiert den Nominativ maskulin nicht. Die gemischte Endung lautet -er: neuer."),
      arrange("Wir rechnen", ["mit kaltem", "Wasser."], "Ohne Artikel ist die Endung stark. Der Dativ neutrum lautet -em: kaltem."),
      arrange("Er sucht", ["einen interessanten", "Job."], "Nach einen ist die Endung schwach. Im Akkusativ maskulin lautet sie -en: interessanten."),
      arrange("Trotz", ["des schlechten", "Wetters", "bleiben wir."], "Der Genitiv neutrum lautet des schlechten Wetters, mit schwachem -en. Die Phrase steht vorn, deshalb folgt das Verb bleiben."),
      arrange("Sie nimmt", ["die schnellste", "Verbindung."], "Der attributive Superlativ schnellste nimmt nach die die schwache Endung -e."),
    ]),
  ],
  kasus: [
    workshop("objekte", "Dativnomen vor Akkusativnomen", "B1/B2", "Die Person steht im Dativ, die Sache im Akkusativ. Bei zwei Pronomen gilt die umgekehrte Folge: erst Akkusativ, dann Dativ.", [
      arrange("Die Ärztin gibt", ["dem Patienten", "das Rezept."], "Bei zwei Nomen steht das Dativobjekt dem Patienten vor dem Akkusativobjekt das Rezept."),
      arrange("Er schenkt", ["seiner Mutter", "Blumen."], "Bei zwei Nomen steht das Dativnomen seiner Mutter vor dem Akkusativ Blumen."),
      arrange("Sie erklärt", ["den Gästen", "den Weg."], "den Gästen ist Dativ Plural und steht vor dem Akkusativ den Weg."),
      arrange("Ich schicke", ["es", "dir", "heute."], "Bei zwei Pronomen steht der Akkusativ es vor dem Dativ dir."),
      arrange("Lea zeigt", ["ihn", "ihm."], "den Film wird zum Akkusativ ihn, dem Kind zum Dativ ihm. Der Akkusativ steht vorn."),
      arrange("Wir leihen", ["unserer Nachbarin", "das Werkzeug."], "Sind beide Objekte Nomen, steht die Person im Dativ vorn: unserer Nachbarin."),
    ]),
    workshop("verben", "Verben mit Dativ", "B1/B2", "helfen, danken, gefallen, gehören, vertrauen, begegnen und zuhören regieren ein Dativobjekt.", [
      cloze("helfen.", "Kannst du {mir} bitte helfen?", "helfen regiert den Dativ. Die Dativform von ich lautet mir, nicht mich."),
      cloze("gefallen.", "Der Film gefällt {mir} sehr.", "gefallen regiert den Dativ. Die Dativform von ich lautet mir."),
      cloze("gehören.", "Die Tasche gehört {der} Nachbarin.", "gehören regiert den Dativ. Der feminine Dativ des bestimmten Artikels lautet der."),
      choice("begegnen.", ["Ich begegne einem alten Freund.", "Ich begegne einen alten Freund.", "Ich begegne ein alter Freund.", "Ich begegne einem alten Freundem."], 0, "begegnen regiert den Dativ. Die maskuline Form nach ein lautet einem alten Freund."),
      choice("danken und für.", ["Ich danke dir für deinen Brief.", "Ich danke dich für deinen Brief.", "Ich danke dir für deinem Brief.", "Ich danke dich für deinem Brief."], 0, "danken regiert den Dativ: dir. für regiert den Akkusativ: deinen Brief."),
      sort("Welchen Objektkasus verlangt das Verb?", ["Dativ", "Akkusativ"], [
        { text: "danken", bucket: 0 },
        { text: "lesen", bucket: 1 },
        { text: "zuhören", bucket: 0 },
        { text: "kaufen", bucket: 1 },
        { text: "vertrauen", bucket: 0 },
        { text: "sehen", bucket: 1 },
      ]),
    ]),
  ],
  futur: [
    workshop("futur-1", "Futur I", "B1/B2", "werden steht in Position 2. Der Infinitiv schließt den Satz.", [
      arrange("Ich werde", ["dich", "heute Abend", "anrufen."], "Ein Versprechen steht im Futur I: werden in Position 2, der Infinitiv anrufen am Ende."),
      arrange("Er wird", ["noch", "im Büro", "sein."], "Eine Vermutung über die Gegenwart verlangt werden plus Infinitiv. sein steht am Ende."),
      arrange("Wir werden", ["das Fenster", "nicht", "aufmachen."], "werden steht in Position 2. Der trennbare Infinitiv aufmachen bleibt ein Wort am Ende."),
      arrange("Du wirst", ["das", "heute noch", "erledigen."], "Futur I kann wie eine Anweisung klingen. werden steht in Position 2, der Infinitiv erledigen am Ende."),
      arrange("Sie werden", ["müde", "sein."], "werden richtet sich nach sie: werden. Der Infinitiv sein steht am Ende."),
      arrange("Es wird", ["gleich", "regnen."], "wird steht in Position 2. Der Infinitiv regnen schließt den Satz."),
    ]),
    workshop("futur-2", "Futur II", "B1/B2", "werden plus Partizip II plus haben oder sein. Der Infinitiv des Hilfsverbs steht zuletzt.", [
      arrange("Bis Freitag werde ich", ["das Kapitel", "gelesen", "haben."], "lesen bildet das Perfekt mit haben. Im Futur II steht das Partizip gelesen vor dem Infinitiv haben."),
      arrange("Sie wird", ["den Zug", "verpasst", "haben."], "Eine Vermutung über die Vergangenheit steht im Futur II: Partizip verpasst plus haben."),
      arrange("Bis acht werden wir", ["angekommen", "sein."], "ankommen bildet das Perfekt mit sein. Im Futur II steht das Partizip angekommen vor sein."),
      arrange("Er wird", ["schon", "losgefahren", "sein."], "losfahren bildet das Perfekt mit sein. Das Partizip losgefahren steht vor dem Infinitiv sein."),
      arrange("Vor Montag werde ich", ["den Bericht", "abgeschickt", "haben."], "abschicken bildet das Perfekt mit haben. Das Partizip abgeschickt steht vor haben."),
      arrange("Sie werden", ["das", "vergessen", "haben."], "Im Futur II steht das Partizip vergessen vor dem Infinitiv haben."),
    ]),
  ],
  kausal: [
    workshop("weil-denn", "weil, denn, deshalb", "B1/B2", "weil endet mit dem Verb. denn behält die Verbzweitstellung. deshalb steht in Position 1.", [
      arrange("Ich bleibe zu Hause,", ["weil", "ich", "Fieber", "habe."], "weil leitet einen Nebensatz ein. Das finite Verb habe steht am Ende."),
      arrange("Ich bleibe zu Hause,", ["denn", "ich habe", "Fieber."], "denn behält die Verbzweitstellung im eigenen Satz: habe steht nach ich. denn kann den Satz nicht eröffnen."),
      arrange("Ich habe Fieber.", ["Deshalb", "bleibe", "ich zu Hause."], "deshalb steht als Adverb in Position 1. Das finite Verb bleibe folgt in Position 2."),
      arrange("Da der Saal voll ist,", ["warten", "wir", "draußen."], "da funktioniert wie weil und verlangt Verbletztstellung: ist. Der da-Satz steht gern vorn, das Verb warten folgt."),
      arrange("Wegen des Fiebers", ["bleibe", "ich", "zu Hause."], "wegen regiert den Genitiv: des Fiebers. Die Phrase füllt Position 1, das Verb bleibe steht in Position 2."),
      arrange("Ich komme später.", ["Ich habe", "nämlich", "noch einen Termin."], "nämlich kann den Satz nicht eröffnen. Es steht nach dem finiten Verb habe."),
    ]),
    workshop("final-mix", "Grund oder Zweck", "B1/B2", "weil und wegen antworten auf Warum? damit und um … zu antworten auf Wozu?", [
      choice("Ein Grund, Verbletztstellung.", ["Sie kommt später, weil sie den Bus verpasst.", "Sie kommt später, weil sie verpasst den Bus.", "Sie kommt später, denn sie den Bus verpasst.", "Weil sie verpasst den Bus, kommt sie später."], 0, "weil leitet einen Nebensatz ein. Das finite Verb verpasst steht am Ende."),
      choice("Ein Zweck, dasselbe Subjekt.", ["Sie lernt, um die Prüfung zu bestehen.", "Sie lernt, damit die Prüfung zu bestehen.", "Sie lernt, um die Prüfung besteht.", "Sie lernt, weil die Prüfung zu bestehen."], 0, "Dasselbe Subjekt verlangt um … zu. Die Infinitivgruppe antwortet auf Wozu? und schließt mit zu bestehen."),
      transform("Verwenden Sie wegen plus Genitiv.", "Das Spiel fällt aus, weil es stark regnet.", ["Wegen des starken Regens fällt das Spiel aus."], "wegen regiert den Genitiv. der Regen wird zu des Regens, das Adjektiv stark zu starken."),
      transform("Verwenden Sie damit.", "Ich schreibe laut. Du sollst es hören.", ["Ich schreibe laut, damit du es hörst."], "Ich und du sind verschiedene Subjekte. Deshalb steht damit, und das finite Verb hörst schließt den Nebensatz."),
      cloze("Der Anschluss, der keinen Satz eröffnen kann.", "Ich nehme den früheren Zug, {denn} der spätere ist voll.", "denn behält die Verbzweitstellung: ist steht nach der spätere. denn steht nicht am Satzanfang."),
      cloze("Zweck, nicht trennbares Verb.", "Sie steht früh auf, um den Zug nicht {zu verpassen}.", "verpassen ist nicht trennbar. zu steht deshalb vor dem Infinitiv: nicht zu verpassen."),
    ]),
  ],
  konjunktiv2: [
    workshop("ordnen", "Irreal und höflich", "B1/B2", "würde oder der einwortige Konjunktiv II steht in Position 2. Ein Infinitiv, wenn vorhanden, steht am Ende.", [
      arrange("Könnten Sie", ["das", "bitte", "einpacken?"], "Eine höfliche Bitte steht im Konjunktiv II: könnten Sie. Modalverben verlangen keinen Infinitiv mit zu."),
      arrange("Wenn wir ein Auto hätten,", ["wären", "wir", "flexibler."], "Beide Hälften sind irreal. Der wenn-Satz ist Position 1, deshalb beginnt der Hauptsatz mit wären."),
      arrange("Ich würde", ["an deiner Stelle", "früher", "schlafen."], "würde steht in Position 2. Der Infinitiv schlafen schließt den Satz."),
      arrange("Wenn Mina Zeit hätte,", ["würde", "sie", "mitkommen."], "Die Bedingung steht mit hätte, die Folge mit würde. Der wenn-Satz ist Position 1, deshalb folgt würde sofort."),
      arrange("Wenn du gelernt hättest,", ["hättest", "du", "bestanden."], "Die irreale Vergangenheit lautet hätte plus Partizip. In der Bedingung steht hättest am Ende, in der Folge in Position 2."),
      arrange("Du hättest", ["früher", "anrufen", "sollen."], "Die irreale Vergangenheit mit Modalverb lautet hättest plus Infinitiv plus Modalinfinitiv. sollen steht am Ende."),
    ]),
    workshop("formen", "Die irreale Form", "B1/B2", "hätte, wäre, würde und die Modalverben könnte, müsste, dürfte, sollte.", [
      cloze("Irreales haben.", "Wenn wir mehr Zeit {hätten}, wären wir flexibler.", "Der Konjunktiv II von haben lautet hätten, nicht haben und nicht hätten würden."),
      cloze("Irreales sein.", "Wenn ich du {wäre}, würde ich zusagen.", "Der Konjunktiv II von sein lautet in der ich-Form wäre."),
      choice("Höfliche Bitte im Geschäft.", ["Könnten Sie das bitte zeigen?", "Könntet Sie das bitte zeigen?", "Würden Sie das bitte zu zeigen?", "Können Sie das bitte zu zeigen?"], 0, "Die höfliche Sie-Form lautet könnten Sie. zeigen bleibt reiner Infinitiv, ohne zu."),
      choice("Bedauern mit Modalverb.", ["Du hättest anrufen sollen.", "Du solltest anrufen haben.", "Du hättest sollen anrufen.", "Du würdest anrufen gesollt."], 0, "Die irreale Vergangenheit lautet hättest plus Infinitiv anrufen plus Modalinfinitiv sollen am Ende."),
      transform("Machen Sie den Satz irreal.", "Wenn Mina Zeit hat, kommt sie mit.", ["Wenn Mina Zeit hätte, würde sie mitkommen.", "Wenn Mina Zeit hätte, käme sie mit."], "hat wird zu hätte. kommt wird zu würde mitkommen oder zum einwortigen Konjunktiv II käme."),
      transform("Irreale Vergangenheit.", "Du hast nicht geschrieben. Ich habe nicht geantwortet.", ["Wenn du geschrieben hättest, hätte ich geantwortet."], "Beide Hälften stehen im Konjunktiv II der Vergangenheit: hätte plus Partizip."),
    ]),
  ],
  passiv: [
    workshop("praesens", "Aktiv ins Präsenspassiv", "B1", "Das Akkusativobjekt wird zum Subjekt. wird richtet sich nach diesem neuen Subjekt. Das Partizip steht am Ende.", [
      transform("Das Agens dürfen Sie weglassen.", "Die Technikerin repariert den Drucker.", ["Der Drucker wird repariert.", "Der Drucker wird von der Technikerin repariert."], "Das Akkusativobjekt den Drucker wird zum Subjekt der Drucker. Im Präsens des Vorgangspassivs steht wird plus Partizip repariert."),
      transform("Präsens des Vorgangspassivs.", "Man druckt den Brief.", ["Der Brief wird gedruckt."], "Das Akkusativobjekt wird zum Subjekt. Das Präsens des Vorgangspassivs lautet wird plus Partizip gedruckt."),
      transform("Ein Objekt im Plural.", "Die Stadt finanziert die Öffnungszeiten.", ["Die Öffnungszeiten werden finanziert.", "Die Öffnungszeiten werden von der Stadt finanziert."], "werden richtet sich nach dem neuen Subjekt im Plural: werden, nicht wird."),
      arrange("Der Brief wird", ["heute", "geschrieben."], "Im Präsens des Vorgangspassivs steht wird in Position 2. Die Zeitangabe heute steht vor dem Partizip geschrieben."),
      arrange("Das Dach wird", ["von der Firma", "repariert."], "Person oder Institution stehen mit von plus Dativ: von der Firma. Das Partizip repariert schließt den Satz."),
      arrange("Die Tür wird", ["durch einen Sensor", "geöffnet."], "Ein Mittel steht mit durch plus Akkusativ: durch einen Sensor."),
    ]),
    workshop("modal", "Passiv mit Modalverb", "B1/B2", "Modalverb plus Partizip plus werden. werden ist das letzte Wort.", [
      transform("Präsens.", "Man muss die Tür schließen.", ["Die Tür muss geschlossen werden."], "Das Modalpassiv im Präsens lautet muss plus Partizip geschlossen plus werden. werden steht am Ende."),
      transform("können.", "Man kann den Deckel abnehmen.", ["Der Deckel kann abgenommen werden."], "Das Modalpassiv lautet kann plus Partizip abgenommen plus werden. Ebenso möglich: Der Deckel lässt sich abnehmen."),
      arrange("Die Rechnung muss", ["heute", "bezahlt", "werden."], "Im Modalpassiv steht das Modalverb in Position 2. werden schließt den Satz."),
      arrange("Das Formular kann", ["online", "ausgefüllt", "werden."], "Dasselbe Muster mit kann: Partizip ausgefüllt, dann werden am Ende."),
      arrange("Der Fehler sollte", ["sofort", "korrigiert", "werden."], "sollte ist der Konjunktiv II von sollen und bleibt im Modalpassiv vor Partizip plus werden."),
      cloze("Das letzte Wort.", "Das Fenster muss geöffnet {werden}.", "Im Präsens des Modalpassivs lautet das letzte Wort werden, nicht worden."),
    ]),
    workshop("zeiten", "Präteritum, Perfekt und Zustand", "B1/B2", "Das Tempus liegt auf werden. Das Perfekt verwendet worden, nie geworden. Ein Ergebnis verwendet sein ohne worden.", [
      choice("Ein Ergebnis, kein Vorgang.", ["Die Tür ist geöffnet.", "Die Tür wird geöffnet.", "Die Tür ist geöffnet worden.", "Die Tür wurde geöffnet."], 0, "Der Zustand lautet sein plus Partizip: ist geöffnet. worden oder wurde würde einen Vorgang nennen."),
      choice("Vorgang im Perfekt.", ["Der Brief ist geschrieben worden.", "Der Brief ist geschrieben geworden.", "Der Brief hat geschrieben worden.", "Der Brief wird geschrieben worden."], 0, "Das Partizip von werden im Vorgangspassiv lautet worden, nicht geworden. Das Hilfsverb ist sein: ist worden."),
      transform("Präteritum.", "Man reparierte das Dach.", ["Das Dach wurde repariert."], "Das Präteritum des Vorgangspassivs lautet wurde plus Partizip repariert."),
      transform("Perfekt.", "Man hat den Fehler korrigiert.", ["Der Fehler ist korrigiert worden."], "Das Perfekt des Vorgangspassivs lautet ist plus Partizip korrigiert plus worden."),
      cloze("Perfekt des Vorgangspassivs.", "Der Fehler ist gestern korrigiert {worden}.", "worden ist das Partizip von werden im Vorgangspassiv. geworden wäre falsch."),
      arrange("Das Haus ist", ["gebaut", "worden."], "Im Perfekt des Vorgangspassivs steht das Partizip gebaut vor worden."),
    ]),
    workshop("subjektlos", "Subjektloses Passiv", "B2", "Intransitive Verben können ein Passiv ohne echtes Subjekt bilden. es entfällt, wenn etwas anderes vorn steht.", [
      transform("Kein Subjekt.", "Man tanzt hier.", ["Hier wird getanzt."], "tanzen hat kein Akkusativobjekt. Die Ortsangabe Hier füllt Position 1, das Platzhalter-es entfällt."),
      transform("Ein Verbot.", "Man raucht hier nicht.", ["Hier wird nicht geraucht."], "Im subjektlosen Passiv steht nicht unmittelbar vor dem Partizip: nicht geraucht."),
      cloze("essen, intransitiv gebraucht.", "In diesem Raum wird nicht {gegessen}.", "Das Partizip II von essen lautet gegessen, nicht geessen."),
      arrange("Sonntags wird", ["nicht", "gearbeitet."], "Die Zeitangabe Sonntags füllt schon Position 1. Ein Platzhalter-es steht deshalb nicht."),
      arrange("Es wird", ["hier", "nicht", "geraucht."], "es hält nur Position 1, wenn kein anderes Satzglied vorn steht."),
      choice("Welcher Satz hat kein echtes Subjekt?", ["Hier wird getanzt.", "Der Brief wird geschrieben.", "Die Tür ist geöffnet.", "Man tanzt gern."], 0, "tanzen hat kein Akkusativobjekt. Das Passiv hat deshalb kein Subjekt. Der Brief und die Tür sind echte Subjekte."),
    ]),
    workshop("ersatz", "Ersatzformen für das Passiv", "B2", "sich lassen plus Infinitiv, sein plus zu plus Infinitiv und Adjektive auf -bar.", [
      transform("Verwenden Sie sich lassen.", "Man kann den Deckel abnehmen.", ["Der Deckel lässt sich abnehmen."], "kann plus Passiv entspricht sich lassen plus reinem Infinitiv: lässt sich abnehmen. Ohne zu und ohne Partizip."),
      transform("Verwenden Sie sein plus zu.", "Man kann die Datei nicht öffnen.", ["Die Datei ist nicht zu öffnen."], "sein plus zu plus Infinitiv ersetzt können. nicht steht unmittelbar vor zu öffnen."),
      cloze("Reflexives lassen.", "Der Knoten lässt {sich} leicht lösen.", "Die Ersatzform lautet sich lassen plus reiner Infinitiv. sich steht nach lässt."),
      choice("Ein Adjektiv auf -bar.", ["Der Text ist schwer lesbar.", "Der Text ist schwer gelesen.", "Der Text lässt schwer lesen.", "Der Text ist zu lesbar nicht."], 0, "lesbar entspricht kann gelesen werden. Das Adjektiv auf -bar nennt die Möglichkeit."),
      arrange("Das Fenster lässt", ["sich", "nicht", "öffnen."], "sich lassen verlangt den reinen Infinitiv öffnen. Weder zu noch ein Partizip steht dabei."),
      arrange("Die Datei ist", ["nicht", "zu", "öffnen."], "Die Ersatzform lautet sein plus zu plus Infinitiv. nicht steht vor zu öffnen."),
    ]),
  ],
  relativ: [
    workshop("ordnen", "Den Relativsatz bilden", "B1/B2", "Das Pronomen übernimmt das Genus vom Nomen und den Kasus aus dem eigenen Satz. Das Verb schließt den Satz.", [
      arrange("Das ist der Roman,", ["den", "ich", "gekauft habe."], "kaufen regiert den Akkusativ. Roman ist maskulin, das Relativpronomen lautet den. habe steht am Ende."),
      arrange("Das ist die Frau,", ["die", "nebenan", "wohnt."], "Die Frau ist Subjekt von wohnt. Das Relativpronomen im Nominativ feminin lautet die. wohnt steht am Ende."),
      arrange("Das sind die Leute,", ["denen", "ich", "vertraue."], "vertrauen regiert den Dativ. Der Dativ Plural des Relativpronomens lautet denen."),
      arrange("Der Autor,", ["dessen Roman", "du liest,", "ist morgen da."], "Der Genitiv maskulin lautet dessen Roman. Nach dem Relativsatz folgt das finite Verb ist des Hauptsatzes."),
      arrange("Die Kollegin,", ["der", "ich danke,", "heißt Elena."], "danken regiert den Dativ. Der Dativ feminin des Relativpronomens lautet der."),
      arrange("Der Kurs,", ["für den", "ich zahle,", "ist voll."], "für regiert den Akkusativ. Das Relativpronomen lautet den: für den. zahle steht am Ende."),
    ]),
    workshop("fall", "Genus vom Nomen, Kasus vom Satz", "B1/B2", "Übernehmen Sie nicht den Kasus des Nomens im Hauptsatz.", [
      choice("Akkusativ maskulin.", ["der Roman, den ich meine", "der Roman, der ich meine", "der Roman, dem ich meine", "der Roman, dessen ich meine"], 0, "meinen regiert den Akkusativ. Roman ist maskulin, das Relativpronomen lautet den."),
      choice("Dativ wegen helfen.", ["der Mann, dem ich helfe", "der Mann, den ich helfe", "der Mann, der ich helfe", "der Mann, dessen ich helfe"], 0, "helfen regiert den Dativ. Der Kasus kommt aus dem Relativsatz: dem, nicht aus dem Nominativ der Mann."),
      cloze("Genitiv maskulin.", "Der Regisseur, {dessen} Film wir sehen, sitzt im Saal.", "Der Genitiv maskulin lautet dessen und steht vor dem Nomen Film."),
      cloze("für plus Akkusativ.", "Der Preis, für {den} er nominiert ist, wird morgen vergeben.", "für regiert den Akkusativ. Preis ist maskulin, die Form lautet den."),
      cloze("Ein ganzer Satz.", "Er hat abgesagt, {was} mich ärgert.", "Ein ganzer Satz wird mit was wieder aufgenommen, nicht mit das."),
      cloze("etwas plus über.", "Es gibt etwas, {worüber} ich mit dir sprechen muss.", "Nach einem Indefinitpronomen steht wo(r)- plus Präposition. Vor dem Vokal von über steht r: worüber."),
    ]),
    workshop("schreiben", "Zwei Sätze verbinden", "B1/B2", "Ein Nomen wird zum Bezugswort. Der andere Satz wird zum Relativsatz.", [
      transform("Die Stadt ist das Bezugswort. Ort.", "Die Stadtbibliothek hat sonntags auf. Wir treffen uns dort.", ["Die Stadtbibliothek, in der wir uns treffen, hat sonntags auf."], "treffen ist ein Ort, keine Richtung. in verlangt deshalb den Dativ. Bibliothek ist feminin: in der."),
      transform("Das Buch ist das Objekt.", "Der Roman ist lang. Ich habe ihn gekauft.", ["Der Roman, den ich gekauft habe, ist lang."], "kaufen regiert den Akkusativ. Roman ist maskulin, das Relativpronomen lautet den."),
      transform("Dativ Plural.", "Die Nachbarn sind ruhig. Wir vertrauen ihnen.", ["Die Nachbarn, denen wir vertrauen, sind ruhig."], "vertrauen regiert den Dativ. Der Dativ Plural lautet denen."),
      transform("Genitiv.", "Der Autor ist morgen da. Du liest seinen Roman.", ["Der Autor, dessen Roman du liest, ist morgen da."], "seinen Roman wird zum Genitivattribut dessen Roman. Autor ist maskulin: dessen."),
    ]),
  ],
  satzbau: [
    workshop("praep-objekt", "Sätze mit Präpositionalobjekten ordnen", "B1", poNote, [
      arrange("Die Nachbarin erinnert sich", "noch genau an das Gespräch von gestern.", "erinnern regiert an. Zeit und Art stehen vorn. Die ganze an-Phrase, einschließlich von gestern, schließt den Satz."),
      arrange("Wir beschäftigen uns", "seit dem letzten Semester intensiv mit der Frage der Wohnungsnot.", "beschäftigen regiert mit. Die seit-Phrase ist die Zeit, intensiv die Art und Weise, die mit-Phrase das Präpositionalobjekt am Ende."),
      arrange("Die Kommission entscheidet", "erst nächste Woche über den umstrittenen Antrag.", "entscheiden regiert über. Die Zeitangabe erst nächste Woche steht vor dem Präpositionalobjekt."),
      arrange("Keiner von uns glaubt", "nach diesem Bericht noch an eine schnelle Lösung.", "glauben regiert an. nach diesem Bericht ist die Zeit, noch die Partikel, an eine schnelle Lösung das Präpositionalobjekt am Ende."),
      arrange("Die Eltern bestehen", "trotz aller Bedenken auf einer schriftlichen Entschuldigung.", "bestehen auf regiert den Dativ. trotz aller Bedenken ist eine konzessive Angabe und steht vor dem Präpositionalobjekt."),
      arrange("Im Seminar sprechen wir", "heute zum ersten Mal über die Folgen des Klimawandels.", "sprechen regiert über. Der vorgegebene Anfang enthält schon das Verb, deshalb stehen heute und zum ersten Mal vor der über-Phrase."),
      arrange("Die Mieterin beschwert sich", "schon seit Monaten beim Vermieter über den Lärm aus der Nachbarwohnung.", "sich beschweren regiert bei für die Person und über für die Sache. Die über-Phrase ist das letzte Präpositionalobjekt."),
      arrange("Viele Bewerber interessieren sich", "vor allem wegen des Gehalts für die ausgeschriebene Stelle.", "interessieren regiert für. wegen des Gehalts nennt den Grund und steht vor der für-Phrase."),
      arrange("Der Autor weist", "in seinem neuen Essay auf einen alten Denkfehler hin.", "hinweisen regiert auf. Das Präpositionalobjekt steht vor dem trennbaren Präfix hin."),
      arrange("Kannst du dich", "bitte noch einmal um die fehlenden Unterlagen kümmern?", "sich kümmern regiert um. Der Infinitiv kümmern steht hinter dem Präpositionalobjekt."),
    ]),
    workshop("dativ-akk", "Sätze mit Dativ- und Akkusativobjekt", "B2", "Zwei Nomen: Dativ vor Akkusativ. Zwei Pronomen: Akkusativ vor Dativ.", [
      arrange("Die Ärztin gibt", ["dem Patienten", "das Rezept."], "Bei zwei Nomen steht die Person im Dativ vor der Sache im Akkusativ: dem Patienten, dann das Rezept."),
      arrange("Ich schenke", ["meiner Schwester", "zum Geburtstag", "Blumen."], "Das Dativnomen meiner Schwester steht vor dem Akkusativnomen Blumen. Die Zeitangabe darf dazwischen stehen."),
      arrange("Er erklärt", ["den neuen Kollegen", "den Plan."], "den neuen Kollegen ist Dativ Plural und steht vor dem Akkusativ den Plan."),
      arrange("Sie schickt", ["ihrem Bruder", "die Karte."], "Das Dativnomen ihrem Bruder steht vor dem Akkusativ die Karte."),
      arrange("Kannst du", ["sie", "mir", "geben?"], "Bei zwei Pronomen kehrt sich die Nomenfolge um: Der Akkusativ sie steht vor dem Dativ mir."),
      arrange("Ich leihe", ["es", "dir", "ungern."], "Bei zwei Pronomen steht der Akkusativ es vor dem Dativ dir."),
      arrange("Nora zeigt", ["dem Gast", "das Zimmer."], "Bei zwei Nomen steht der Dativ dem Gast vor dem Akkusativ das Zimmer."),
      arrange("Wir erzählen", ["den Kindern", "eine Geschichte."], "den Kindern ist Dativ Plural und steht vor dem Akkusativ eine Geschichte."),
    ]),
    workshop("nebensaetze", "Nebensätze", "B1", "Die unterordnende Konjunktion schickt das finite Verb an das Ende. Steht der Nebensatz vorn, folgt als Nächstes das Verb des Hauptsatzes.", [
      arrange("Ich bleibe hier,", ["weil", "ich", "müde bin."], "weil verlangt Verbletztstellung. Das finite Verb bin schließt den Nebensatz."),
      arrange("Weil es spät ist,", ["nehmen", "wir", "ein Taxi."], "Der ganze weil-Satz füllt Position 1. Das finite Verb nehmen des Hauptsatzes folgt sofort."),
      arrange("Sag mir,", ["wo", "der Eingang", "ist."], "Der indirekte Fragesatz mit wo verlangt Verbletztstellung. ist schließt ihn."),
      arrange("Obwohl es regnet,", ["gehen", "wir", "zu Fuß."], "Der obwohl-Satz ist Position 1 und endet mit regnet. Das finite Verb gehen folgt sofort."),
      arrange("Wenn du fertig bist,", ["ruf", "mich", "an."], "Der wenn-Satz ist Position 1. Im Hauptsatz steht der Imperativ ruf an erster Stelle, das Präfix an am Ende."),
      arrange("Ich weiß,", ["dass", "der Zug", "pünktlich ist."], "dass verlangt Verbletztstellung. Das finite Verb ist steht am Ende."),
      arrange("Nachdem wir gegessen hatten,", ["gingen", "wir", "los."], "nachdem verlangt Verbletztstellung. Das finite Verb hatten schließt den Nebensatz."),
      arrange("Sie bleibt,", ["damit", "du", "alles verstehst."], "damit leitet einen Finalsatz ein. Das finite Verb verstehst steht am Ende."),
    ]),
    workshop("tekamolo", "TEKAMOLO", "B1/B2", "Zuerst die Zeit, dann der Grund, dann die Art und Weise, dann der Ort.", [
      arrange("Sie fährt", ["morgen", "wegen des Termins", "mit dem Zug", "nach Erfurt."], "Die Folge lautet Zeit, Grund, Art und Weise, Ort."),
      arrange("Ich fahre", ["heute", "wegen des Streiks", "mit dem Rad", "ins Büro."], "Dieselbe Folge: Zeit heute, Grund wegen des Streiks, Art mit dem Rad, Ort ins Büro."),
      arrange("Wir treffen uns", ["um acht", "wegen des Lärms", "leise", "im Hof."], "Uhrzeit, Grund, Art und Weise, Ort: um acht, wegen des Lärms, leise, im Hof."),
      arrange("Er fliegt", ["nächste Woche", "wegen einer Konferenz", "allein", "nach Lissabon."], "Der Ort nach Lissabon steht am Ende, nach Zeit, Grund und Art."),
      arrange("Lena kommt", ["am Freitag", "wegen des Wetters", "mit dem ICE", "nach Köln."], "am Freitag ist eine einzige Zeitangabe und steht vor Grund, Art und Ort."),
      arrange("Heute Abend kommt", ["Yusuf", "wegen der Probe", "mit Mina", "ins Theater."], "Die Zeit steht schon in Position 1. Das Verb kommt steht in Position 2, Yusuf folgt als Subjekt."),
    ]),
    workshop("rollen", "Gleichsetzungsnominativ, Dativobjekt oder Akkusativobjekt", "B2", "Der markierte Teil ist ein Gleichsetzungsnominativ, wenn sein, werden, bleiben oder scheinen das Subjekt nur umbenennt. Helfen, danken, gefallen, gehören, schaden, folgen und begegnen verlangen den Dativ. Nennen und halten für setzen einen Akkusativ, keinen Nominativ.", [
      sort("Ziehen Sie den markierten Teil in den richtigen Rahmen.", ["Gleichsetzungsnominativ", "Dativobjekt", "Akkusativobjekt"], [
        { text: "Nora ist die neue Chefin.", mark: "die neue Chefin", bucket: 0, tier: "easy", why: "sein benennt das Subjekt um. Die neue Chefin steht im Nominativ." },
        { text: "Er wird Arzt.", mark: "Arzt", bucket: 0, tier: "easy", why: "werden + Gleichsetzungsnominativ, ohne Artikel." },
        { text: "Sie hilft dem Gast.", mark: "dem Gast", bucket: 1, tier: "easy", why: "helfen verlangt den Dativ." },
        { text: "Er liest den Bericht.", mark: "den Bericht", bucket: 2, tier: "easy", why: "lesen verlangt den Akkusativ." },
        { text: "Das Buch gehört meiner Schwester.", mark: "meiner Schwester", bucket: 1, tier: "easy", why: "gehören verlangt den Dativ." },
        { text: "Wir brauchen einen Schlüssel.", mark: "einen Schlüssel", bucket: 2, tier: "easy", why: "brauchen verlangt den Akkusativ." },
        { text: "Das wird ein langer Abend.", mark: "ein langer Abend", bucket: 0, tier: "medium", why: "werden benennt das Subjekt um: ein langer Abend, Nominativ." },
        { text: "Er bleibt mein wichtigster Ansprechpartner.", mark: "mein wichtigster Ansprechpartner", bucket: 0, tier: "medium", why: "bleiben hält den Nominativ, wenn es das Subjekt umbenennt." },
        { text: "Das gilt als ein Erfolg.", mark: "ein Erfolg", bucket: 0, tier: "medium", why: "gelten als + Nominativ." },
        { text: "Das Ergebnis gefällt der Kommission nicht.", mark: "der Kommission", bucket: 1, tier: "medium", why: "gefallen verlangt den Dativ. der Kommission ist feminin." },
        { text: "Wir danken der Jury für die Offenheit.", mark: "der Jury", bucket: 1, tier: "medium", why: "danken verlangt den Dativ." },
        { text: "Die Behörde prüft den Antrag.", mark: "den Antrag", bucket: 2, tier: "medium", why: "prüfen verlangt den Akkusativ." },
        { text: "Man nennt ihn einen Retter.", mark: "einen Retter", bucket: 2, tier: "hard", why: "nennen hat zwei Akkusative. einen Retter ist kein Gleichsetzungsnominativ." },
        { text: "Er scheint ein zuverlässiger Partner zu sein.", mark: "ein zuverlässiger Partner", bucket: 0, tier: "hard", why: "scheinen + zu sein: das Nomen bleibt im Nominativ." },
        { text: "Sie erklärt den neuen Kollegen den Plan.", mark: "den neuen Kollegen", bucket: 1, tier: "hard", why: "den neuen Kollegen ist Dativ Plural. den Plan wäre der Akkusativ." },
        { text: "Sie erklärt den neuen Kollegen den Plan.", mark: "den Plan", bucket: 2, tier: "hard", why: "den Plan ist das Akkusativobjekt. Die Person steht im Dativ." },
        { text: "Die Kürzung schadet dem ganzen Projekt.", mark: "dem ganzen Projekt", bucket: 1, tier: "hard", why: "schaden verlangt den Dativ." },
        { text: "Wir folgen dem ursprünglichen Plan.", mark: "dem ursprünglichen Plan", bucket: 1, tier: "hard", why: "folgen verlangt den Dativ." },
        { text: "Sie hält den Entwurf für einen Fehler.", mark: "einen Fehler", bucket: 2, tier: "hard", why: "halten für + Akkusativ. Das ist kein Gleichsetzungsnominativ." },
        { text: "Er begegnet auf dem Flur einer ehemaligen Kollegin.", mark: "einer ehemaligen Kollegin", bucket: 1, tier: "hard", why: "begegnen verlangt den Dativ, auch wenn die Phrase weit hinter dem Verb steht." },
      ]),
    ]),
    workshop("angaben", "Modale Angabe, kausale Angabe oder Präpositionalobjekt", "B2", "Eine modale Angabe sagt, wie etwas geschieht. Eine kausale Angabe sagt, warum. Ein Präpositionalobjekt verlangt das Verb: warten auf, denken an, rechnen mit, bestehen auf, sich beschweren über. Mit dem Zug ist eine Angabe. Mit einer Absage rechnen ist ein Objekt.", [
      sort("Ziehen Sie den markierten Teil in den richtigen Rahmen.", ["Modale Angabe", "Kausale Angabe", "Präpositionalobjekt"], [
        { text: "Sie fährt mit dem Zug nach Erfurt.", mark: "mit dem Zug", bucket: 0, tier: "easy", why: "fahren verlangt mit nicht. Mit dem Zug sagt nur, wie sie fährt." },
        { text: "Der Flug fällt wegen des Nebels aus.", mark: "wegen des Nebels", bucket: 1, tier: "easy", why: "wegen nennt den Grund." },
        { text: "Wir warten seit einer Stunde auf den Zug.", mark: "auf den Zug", bucket: 2, tier: "easy", why: "warten auf. Die seit-Phrase ist nur die Zeit." },
        { text: "Er spricht leise mit den Kindern.", mark: "leise", bucket: 0, tier: "easy", why: "leise sagt, wie er spricht." },
        { text: "Sie hat aus Zeitmangel abgesagt.", mark: "aus Zeitmangel", bucket: 1, tier: "easy", why: "aus Zeitmangel nennt den Grund." },
        { text: "Ich denke oft an meine Familie.", mark: "an meine Familie", bucket: 2, tier: "easy", why: "denken an. oft ist nur ein Adverb." },
        { text: "Er spricht leise mit den Kindern.", mark: "mit den Kindern", bucket: 2, tier: "medium", why: "sprechen mit jemandem. Die Phrase hängt am Verb, leise wäre die modale Angabe." },
        { text: "Wir rechnen fest mit einer Absage.", mark: "mit einer Absage", bucket: 2, tier: "medium", why: "rechnen mit. Dasselbe mit ist hier kein Verkehrsmittel." },
        { text: "Sie arbeitet mit großer Geduld.", mark: "mit großer Geduld", bucket: 0, tier: "medium", why: "arbeiten verlangt mit nicht. Mit großer Geduld sagt, wie sie arbeitet." },
        { text: "Die Sitzung entfällt aufgrund einer Beschwerde.", mark: "aufgrund einer Beschwerde", bucket: 1, tier: "medium", why: "aufgrund nennt den Grund." },
        { text: "Er freut sich schon auf das Wochenende.", mark: "auf das Wochenende", bucket: 2, tier: "medium", why: "sich freuen auf." },
        { text: "Vor Freude hat sie den Termin vergessen.", mark: "Vor Freude", bucket: 1, tier: "medium", why: "Vor Freude nennt den Grund, nicht die Art und Weise." },
        { text: "Die Eltern bestehen auf einer schriftlichen Entschuldigung.", mark: "auf einer schriftlichen Entschuldigung", bucket: 2, tier: "hard", why: "bestehen auf verlangt den Dativ und ist ein Präpositionalobjekt." },
        { text: "Sie hat sich beim Vermieter über den Lärm beschwert.", mark: "über den Lärm", bucket: 2, tier: "hard", why: "sich beschweren über. Das ist das Objekt zur Sache." },
        { text: "Sie hat sich beim Vermieter über den Lärm beschwert.", mark: "beim Vermieter", bucket: 2, tier: "hard", why: "sich beschweren bei jemandem. Auch die Person ist ein Präpositionalobjekt." },
        { text: "Wir beschäftigen uns intensiv mit der Frage der Wohnungsnot.", mark: "mit der Frage der Wohnungsnot", bucket: 2, tier: "hard", why: "sich beschäftigen mit. Das mit hängt am Verb." },
        { text: "Wir beschäftigen uns intensiv mit der Frage der Wohnungsnot.", mark: "intensiv", bucket: 0, tier: "hard", why: "intensiv sagt, wie. Das Präpositionalobjekt ist die mit-Phrase." },
        { text: "Er hat ihr aus reiner Höflichkeit geantwortet.", mark: "aus reiner Höflichkeit", bucket: 1, tier: "hard", why: "aus reiner Höflichkeit nennt den Grund." },
        { text: "Die Kommission entscheidet erst nächste Woche über den Antrag.", mark: "über den Antrag", bucket: 2, tier: "hard", why: "entscheiden über. Die Zeitphrase ist keine Angabe dieser drei Arten." },
        { text: "Sie erreicht uns am sichersten per E-Mail.", mark: "per E-Mail", bucket: 0, tier: "hard", why: "per E-Mail sagt, auf welchem Weg. Das Verb verlangt die Phrase nicht." },
        { text: "Wegen der neuen Richtlinie ändert sich der Ablauf.", mark: "Wegen der neuen Richtlinie", bucket: 1, tier: "hard", why: "wegen nennt den Grund und steht hier sogar vor dem Verb." },
      ]),
    ]),
    workshop("bauen", "Den Satz bauen", "B2", "Neutrale Folge: Verb in Position 2, Dativ vor Akkusativ, danach TEKAMOLO.", [
      transform("Bilden Sie einen Satz.", "Lena / fahren / morgen / nach Köln / wegen eines Termins / mit dem ICE", ["Lena fährt morgen wegen eines Termins mit dem ICE nach Köln."], "Die Folge lautet Zeit, Grund, Art und Weise, Ort: morgen, wegen eines Termins, mit dem ICE, nach Köln."),
      transform("Zwei Objekte.", "die Ärztin / geben / das Rezept / der Patient", ["Die Ärztin gibt dem Patienten das Rezept."], "Bei zwei Nomen steht der Dativ dem Patienten vor dem Akkusativ das Rezept."),
      transform("Stellen Sie die Zeit nach vorn.", "wir / beginnen / der Kurs / morgen", ["Morgen beginnt der Kurs.", "Morgen beginnen wir den Kurs."], "Die Zeit oder ein korrigiertes Subjekt kann Position 1 füllen. Das Verb bleibt in Position 2."),
      transform("Verneinen Sie nur den Ort.", "ich / fliegen / nach Wien / nicht, sondern nach Graz", ["Ich fliege nicht nach Wien, sondern nach Graz."], "nicht steht unmittelbar vor der kontrastierten Phrase nach Wien."),
    ]),
    workshop("luecke", "Die fehlende Stelle", "B2", "Eine Stelle ist leer. Die übrige Reihenfolge stimmt schon.", [
      choice("Wir warten auf den Zug.", ["Wir warten auf den Zug.", "Wir warten für den Zug.", "Wir warten mit dem Zug.", "Wir warten zu den Zug."], 0, "warten regiert auf plus Akkusativ: auf den Zug. für, mit und zu sind hier falsch."),
      cloze("Person im Dativ.", "Sie gibt {dem} Kunden die Quittung.", "Bei zwei Nomen steht die Person im Dativ. Kunde ist maskulin, der Dativ lautet dem Kunden."),
      cloze("Verbzweitstellung nach vorangestelltem Objekt.", "Den Bericht {schicke} ich heute.", "Den Bericht füllt Position 1. Das finite Verb schicke steht in Position 2."),
      cloze("Verb im Nebensatz.", "Ich weiß, dass du heute {anrufst}.", "dass verlangt Verbletztstellung. Das finite Verb anrufst schließt den Nebensatz, das Präfix bleibt am Verb."),
      cloze("nicht vor dem Präfix.", "Ich rufe dich nicht {an}.", "Die Satzverneinung steht unmittelbar vor dem trennbaren Präfix an."),
      choice("Nur ein Satzglied vor dem Verb.", ["Heute Abend kommt Mina.", "Heute Mina kommt Abend.", "Kommt heute Abend Mina.", "Mina heute kommt."], 0, "Heute Abend ist eine einzige Zeitangabe in Position 1. Das Verb kommt steht in Position 2. Die Verbspitze wäre eine Frage."),
    ]),
  ],
  temporal: [
    workshop("ordnen", "als, wenn, nachdem, bevor, bis", "B1/B2", "Diese Konjunktionen schicken das Verb an das Ende. nachdem verlangt ein abgeschlossenes Tempus.", [
      arrange("Als ich ankam,", ["regnete", "es."], "Ein einmaliges Ereignis in der Vergangenheit verlangt als. Der als-Satz ist Position 1, das Verb regnete folgt sofort."),
      arrange("Wenn der Wecker klingelt,", ["stehe", "ich", "auf."], "Eine wiederholte Zeit verlangt wenn, nicht als. Das finite Verb klingelt steht am Ende des Nebensatzes."),
      arrange("Nachdem sie gegessen hatten,", ["gingen", "sie", "los."], "nachdem verlangt ein abgeschlossenes Tempus. Das finite Verb hatten schließt den Nebensatz."),
      arrange("Bevor sie unterschreibt,", ["liest", "sie", "den Vertrag."], "bevor leitet die spätere Handlung ein. Das finite Verb unterschreibt steht am Ende des Nebensatzes."),
      arrange("Warte hier,", ["bis", "ich", "zurückkomme."], "bis verlangt Verbletztstellung. Das trennbare Verb bleibt zusammen: zurückkomme."),
      arrange("Während du telefonierst,", ["suche", "ich", "die Adresse."], "während als Konjunktion verlangt Verbletztstellung: telefonierst. Der Nebensatz ist Position 1, suche folgt."),
    ]),
    workshop("umformen", "Satz oder Präposition", "B1/B2", "bevor entspricht vor plus Dativ. nachdem entspricht nach plus Dativ.", [
      transform("Verwenden Sie bevor.", "Zuerst liest sie den Vertrag. Dann unterschreibt sie.", ["Bevor sie unterschreibt, liest sie den Vertrag.", "Sie liest den Vertrag, bevor sie unterschreibt."], "bevor leitet die spätere Handlung ein. Das finite Verb unterschreibt steht am Ende des Nebensatzes."),
      transform("Verwenden Sie vor plus Nomen.", "Bevor die Gäste ankommen, lüfte ich.", ["Vor der Ankunft der Gäste lüfte ich.", "Ich lüfte vor der Ankunft der Gäste."], "ankommen wird zum Nomen die Ankunft. vor regiert den Dativ: der Ankunft."),
      choice("Ein einmaliger Aufenthalt 2019.", ["Als ich 2019 in Köln war, lernte ich Elena kennen.", "Wenn ich 2019 in Köln war, lernte ich Elena kennen.", "Nachdem ich 2019 in Köln bin, lernte ich sie kennen.", "Bis ich 2019 in Köln war, lernte ich sie kennen."], 0, "Ein einmaliges, abgeschlossenes Ereignis in der Vergangenheit verlangt als, nicht wenn."),
      choice("nachdem und Tempus.", ["Nachdem er das Buch gelesen hat, gibt er es zurück.", "Nachdem er das Buch liest, gibt er es zurück.", "Nachdem liest er das Buch, gibt er es zurück.", "Nachdem er das Buch gelesen, gibt er es zurück."], 0, "nachdem verlangt ein abgeschlossenes Tempus. Das finite Verb hat steht am Ende des Nebensatzes, das Partizip gelesen davor."),
      cloze("Gleichzeitige Konjunktion.", "{Während} du telefonierst, suche ich die Adresse.", "Gleichzeitigkeit zweier Sätze verlangt die Konjunktion während. Das finite Verb telefonierst steht am Ende."),
      sort("Welcher Anschluss passt?", ["als", "wenn", "nachdem", "bis"], [
        { text: "ein Abend im Jahr 2014", bucket: 0 },
        { text: "jeden Abend", bucket: 1 },
        { text: "erst wenn die Arbeit fertig ist", bucket: 2 },
        { text: "bis zu einem Endpunkt", bucket: 3 },
      ]),
    ]),
  ],
  trennbar: [
    workshop("ordnen", "Präfix am Ende oder wieder am Verb", "B1/B2", "Im Hauptsatz schließt das Präfix den Satz. Im Nebensatz, im Perfekt und beim zu-Infinitiv verbindet es sich wieder mit dem Verb.", [
      arrange("Ich stehe", ["um sechs", "auf."], "Im Hauptsatz steht das finite Verb stehe in Position 2. Das trennbare Präfix auf schließt den Satz."),
      arrange("Hast du", ["schon", "eingekauft?"], "Im Partizip II steht ge zwischen Präfix und Stamm: eingekauft."),
      arrange("Vergiss nicht,", ["die Tür", "abzuschließen."], "Beim zu-Infinitiv steht zu zwischen Präfix und Stamm: abzuschließen."),
      arrange("Nora hat", ["das Meeting", "vorbereitet."], "Im Perfekt verbindet sich das Präfix wieder mit dem Verb. vorbereitet ist ein Wort."),
      arrange("Weil er um sechs", ["aufsteht,", "verpasst er", "nie den Bus."], "Im weil-Satz verbindet sich das Präfix wieder mit dem Verb: aufsteht. Der ganze Nebensatz ist Position 1, verpasst folgt."),
      arrange("Ruf", ["mich", "später", "an."], "Im Imperativ steht das finite Verb vorn. Das trennbare Präfix an schließt den Satz."),
    ]),
    workshop("sortieren", "Trennbar oder untrennbar", "B1/B2", "Ein betontes Präfix trennt sich ab. be-, emp-, ent-, er-, ver- und zer- tun das nicht.", [
      sort("Trennbar oder nicht?", ["trennbar", "nicht trennbar"], [
        { text: "einkaufen", bucket: 0 },
        { text: "bekommen", bucket: 1 },
        { text: "anfangen", bucket: 0 },
        { text: "erzählen", bucket: 1 },
        { text: "mitkommen", bucket: 0 },
        { text: "empfehlen", bucket: 1 },
        { text: "zuhören", bucket: 0 },
        { text: "zerstören", bucket: 1 },
      ]),
    ]),
  ],
  "verben-praep": [
    workshop("ordnen", "Verb und Präpositionalobjekt", "B1/B2", poNote, [
      arrange("Wir warten", ["schon lange", "auf den Bus."], "warten regiert auf plus Akkusativ. Das Präpositionalobjekt auf den Bus steht am Ende."),
      arrange("Ich freue mich", ["sehr", "auf das Wochenende."], "Vorfreude regiert auf plus Akkusativ: auf das Wochenende."),
      arrange("Sie freut sich", ["wirklich", "über das Geschenk."], "Freude über eine schon geltende Tatsache regiert über plus Akkusativ: über das Geschenk."),
      arrange("Er beschwert sich", ["bei der Leitung", "über die Frist."], "sich beschweren regiert bei für die Person und über für die Sache. Die über-Phrase steht am Ende."),
      arrange("Wir rechnen", ["fest", "damit,", "dass der Zug pünktlich ist."], "damit kündigt den dass-Satz an und steht am Ende des Hauptsatzes. ist schließt den Nebensatz."),
      arrange("Denkst du", ["noch", "daran?"], "Eine schon genannte Sache wird zu daran, nicht zu an es. an vor Vokal verlangt das r."),
      arrange("Sie träumt", ["seit Jahren", "davon,", "in Lissabon zu leben."], "davon verweist voraus auf die Infinitivgruppe. von vor Vokal verlangt das r."),
      arrange("Worauf", ["wartet", "ihr", "eigentlich?"], "Das Fragewort Worauf kann Position 1 füllen. Das finite Verb wartet steht in Position 2."),
    ]),
    workshop("paare", "Die feste Präposition", "B1/B2", "Lernen Sie das Paar. Personen bleiben Personalpronomen. Sachen werden zu da- oder wo-Wörtern.", [
      choice("Eine Person.", ["Ich denke an sie.", "Ich denke daran.", "Ich denke über sie.", "Ich denke mit sie."], 0, "denken regiert an. Eine Person bleibt Personalpronomen: an sie. daran steht für eine Sache."),
      choice("Die übliche Frage.", ["Worauf wartest du?", "Woauf wartest du?", "Anwas wartest du?", "Wartest auf du?"], 0, "Die Frageform ist wo- plus Präposition. auf beginnt mit einem Vokal, deshalb steht r: Worauf."),
      cloze("Eine Sache.", "Die Frist ist kurz. Denkst du {daran}?", "Eine Sache bei an vor Vokal wird zu daran, nicht zu an es."),
      cloze("Vorausblick, dann ein Satz.", "Ich freue mich {darauf}, euch zu sehen.", "Vorfreude regiert auf. Das da-Wort, das auf den Infinitivsatz vorausweist, lautet darauf."),
      transform("Ersetzen Sie die Sache.", "Sie beschwert sich über den Lärm.", ["Sie beschwert sich darüber."], "Eine Sache bei über wird zu darüber. Vor dem Vokal steht r."),
      sort("Welche Präposition gehört zum Verb?", ["auf", "über", "mit", "für"], [
        { text: "warten", bucket: 0 },
        { text: "sich beschweren über eine Sache", bucket: 1 },
        { text: "aufhören", bucket: 2 },
        { text: "sich interessieren", bucket: 3 },
        { text: "sich freuen, vorausblickend", bucket: 0 },
        { text: "sprechen über ein Thema", bucket: 1 },
      ]),
    ]),
  ],
  vergangenheit: [
    workshop("ordnen", "Präteritum und Plusquamperfekt", "B1/B2", "Das Präteritum ist das Erzähltempus. Die Vorvergangenheit verwendet hatte oder war plus Partizip.", [
      arrange("Er öffnete", ["die Tür", "und sah", "niemanden."], "In der Erzählung stehen beide Verben im Präteritum: öffnete und sah."),
      arrange("Nachdem er gegessen hatte,", ["ging", "er", "nach Hause."], "Die frühere Handlung steht im Plusquamperfekt. Das finite Verb hatte schließt den nachdem-Satz."),
      arrange("Sie musste", ["gehen,", "obwohl sie", "bleiben wollte."], "Modalverben verlieren im Präteritum den Umlaut: musste, wollte."),
      arrange("Ich sah", ["das Schild", "zu spät."], "Das Präteritum von sehen lautet sah, ohne Endung in der ich-Form."),
      arrange("Wir kamen", ["erst", "an,", "als der Film schon begonnen hatte."], "Das spätere Ereignis steht im Präteritum kamen an. Das frühere steht im Plusquamperfekt hatte begonnen."),
      arrange("Nachdem sie den Schlüssel verloren hatte,", ["rief", "sie", "an."], "verlieren bildet das Plusquamperfekt mit hatte. Das Partizip verloren steht vor hatte am Ende des Nebensatzes."),
    ]),
    workshop("wahl", "Welche Vergangenheit?", "B1/B2", "In der gesprochenen Sprache steht bei gewöhnlichen Verben das Perfekt, bei sein und haben war oder hatte. Die Erzählung bevorzugt das Präteritum.", [
      choice("Einem Freund von gestern erzählen.", ["Ich habe eingekauft.", "Ich einkaufte gestern.", "Ich war eingekauft.", "Ich habe einkaufen gehabt."], 0, "Alltagsverben stehen in der gesprochenen Sprache im Perfekt: habe plus Partizip eingekauft."),
      choice("Eine Beschreibung mit sein.", ["Gestern war ich krank.", "Gestern bin ich krank gewesen.", "Gestern hatte ich krank.", "Gestern warst ich krank."], 0, "Die gesprochene Vergangenheit von sein lautet war. Die ich-Form ist war, nicht warst. ist gewesen ist möglich und ungebräuchlich."),
      cloze("Regelmäßiges Präteritum.", "Er {arbeitete} bis spät.", "Stämme auf -t schieben ein e ein. Die er-Form lautet arbeitete."),
      cloze("Modalverb ohne Umlaut.", "Wir {mussten} den Termin verschieben.", "müssen verliert im Indikativ Präteritum den Umlaut: mussten. müssten wäre Konjunktiv II."),
      transform("Setzen Sie das frühere Ereignis ins Plusquamperfekt.", "Zuerst verlor sie den Schlüssel. Dann rief sie an.", ["Nachdem sie den Schlüssel verloren hatte, rief sie an."], "Die frühere Handlung lautet hatte plus Partizip verloren. Die spätere bleibt im Präteritum rief an."),
      sort("Übliche Form in der gesprochenen Sprache?", ["meist Präteritum", "meist Perfekt"], [
        { text: "sein", bucket: 0 },
        { text: "kochen", bucket: 1 },
        { text: "haben", bucket: 0 },
        { text: "kaufen", bucket: 1 },
        { text: "können", bucket: 0 },
        { text: "anfangen", bucket: 1 },
      ]),
    ]),
  ],
  lassen: [
    workshop("ordnen", "lassen und reiner Infinitiv", "B2", "Kein zu. Im Perfekt bleibt lassen Infinitiv, wenn ein weiterer Infinitiv davon abhängt.", [
      arrange("Ich lasse", ["das Fahrrad", "reparieren."], "lassen plus reiner Infinitiv bedeutet, dass jemand anders die Arbeit tut. reparieren steht ohne zu am Ende."),
      arrange("Wir lassen", ["die Fotos", "noch heute", "abziehen."], "lassen steht in Position 2. Der reine Infinitiv abziehen schließt den Satz."),
      arrange("Der Deckel lässt", ["sich", "leicht", "abnehmen."], "sich lassen plus reiner Infinitiv bedeutet, dass etwas machbar ist: lässt sich abnehmen."),
      arrange("Nora hat", ["die Rechnung", "prüfen", "lassen."], "Hängt ein Infinitiv von lassen ab, bleibt lassen im Perfekt Infinitiv. Der Ersatzinfinitiv lassen steht am Ende."),
      arrange("Sie hat", ["die Tasche", "zu Hause", "gelassen."], "Ohne zweiten Infinitiv steht das Partizip gelassen, nicht der Ersatzinfinitiv lassen."),
      arrange("Seine Eltern lassen", ["ihn", "allein", "verreisen."], "Erlaubnis lautet lassen plus reiner Infinitiv. verreisen steht ohne zu am Ende."),
    ]),
  ],
  rede: [
    workshop("ordnen", "Indirekte Aussagen, Fragen und Aufforderungen", "B2", "Der Konjunktiv I gibt die Rede wieder. ob oder das Fragewort bleibt, das Verb schließt den Satz.", [
      arrange("Er sagt,", ["er", "sei", "krank."], "Der Konjunktiv I von sein lautet in der er-Form sei und steht in Position 2 des Inhaltssatzes."),
      arrange("Sie sagt,", ["sie", "habe", "den Schlüssel verloren."], "Eine vergangene Aussage wird zu habe plus Partizip. habe ist der Konjunktiv I von haben, verloren steht davor."),
      arrange("Sie sagen,", ["sie", "kämen", "später."], "kommen im Plural sieht aus wie der Indikativ. Der eindeutige Konjunktiv II lautet kämen."),
      arrange("Sie fragt,", ["ob", "er", "mitkomme."], "Eine Ja-Nein-Frage wird mit ob eingeleitet. Der Konjunktiv I mitkomme steht am Ende."),
      arrange("Er fragt,", ["wo", "sie", "wohne."], "Das Fragewort wo bleibt. Der Konjunktiv I von wohnen lautet wohne und steht am Ende."),
      arrange("Der Arzt sagt,", ["der Patient", "solle", "liegen bleiben."], "Eine Aufforderung wird zu solle plus Infinitiv. Das trennbare Verb liegen bleiben bleibt am Ende zusammen."),
    ]),
    workshop("formen", "sei, habe oder Konjunktiv II", "B2", "Der Konjunktiv II steht nur, wenn der Konjunktiv I wie der Indikativ aussähe.", [
      choice("Formeller Bericht von „Ich bin krank.“", ["Er sagt, er sei krank.", "Er sagt, er ist krank.", "Er sagt, er wäre krank gewesen.", "Er sagt, dass er sei krank ist."], 0, "Der Konjunktiv I von sein lautet sei. Der Indikativ ist gehört zur Alltagssprache, der formelle Bericht verlangt den Konjunktiv."),
      choice("Konjunktiv I von haben, er.", ["habe", "hätte", "hat", "hatte"], 0, "Der Konjunktiv I von haben in der er-Form lautet habe. hätte ist Konjunktiv II."),
      transform("Geben Sie die vergangene Aussage wieder. Beginnen Sie mit Er sagt,", "„Ich habe den Schlüssel verloren.“", ["Er sagt, er habe den Schlüssel verloren.", "Er sagt, dass er den Schlüssel verloren habe."], "Eine vergangene Aussage wird zu habe plus Partizip verloren. Im dass-Satz steht habe am Ende."),
      transform("Vermeiden Sie die mehrdeutige Pluralform.", "„Wir kommen später.“", ["Sie sagen, sie kämen später."], "kommen im Plural gleicht dem Indikativ. Der eindeutige Konjunktiv II lautet kämen."),
      cloze("Eine wiedergegebene Aufforderung.", "Der Arzt sagt, der Patient {solle} liegen bleiben.", "Eine Aufforderung wird zum Konjunktiv I solle plus Infinitiv liegen bleiben."),
      cloze("Konjunktiv I von sein.", "Lea sagt, sie {sei} fertig.", "Der Konjunktiv I von sein lautet in der sie-Form sei, nicht ist."),
    ]),
  ],
  negation: [
    workshop("ordnen", "Wo nicht steht", "B2", "nicht steht unmittelbar vor dem Teil, den es aufhebt. Vor einem trennbaren Präfix ist das die Stelle direkt vor dem Präfix.", [
      arrange("Sie kommt", ["heute", "nicht", "mit."], "Die Satzverneinung steht unmittelbar vor dem trennbaren Präfix mit."),
      arrange("Ich fliege", ["nicht nach Wien,", "sondern", "nach Graz."], "nicht steht unmittelbar vor der kontrastierten Ortsangabe nach Wien."),
      arrange("Wir haben", ["heute", "keine", "Sitzung."], "Ein Nomen ohne Artikel verlangt kein, nicht nicht. Die feminine Form lautet keine Sitzung."),
      arrange("Das ist", ["nicht", "das", "Problem."], "Ein Nomen mit bestimmtem Artikel verlangt nicht, nicht kein: nicht das Problem."),
      arrange("Mach", ["das Licht", "nicht", "aus."], "Auch im Imperativ steht nicht unmittelbar vor dem trennbaren Präfix aus."),
      arrange("Nicht Jonas", ["hat angerufen,", "sondern", "Mina."], "Das kontrastierte Subjekt kann samt nicht in Position 1 stehen. Das finite Verb hat folgt in Position 2."),
    ]),
    workshop("kein", "kein oder nicht", "B2", "kein ersetzt ein oder einen fehlenden Artikel. nicht verneint alles andere.", [
      choice("Nomen ohne Artikel.", ["Wir haben heute keine Sitzung.", "Wir haben heute nicht Sitzung.", "Wir haben heute nichts Sitzung.", "Wir haben heute nicht keine Sitzung."], 0, "Ein Nomen ohne Artikel verlangt kein. Sitzung ist feminin, die Form lautet keine."),
      choice("Nomen mit bestimmtem Artikel.", ["Das ist nicht das Problem.", "Das ist kein das Problem.", "Das ist keine das Problem.", "Das ist nicht kein Problem."], 0, "Der bestimmte Artikel das ist schon da. Die Verneinung lautet nicht, nicht kein."),
      cloze("Akkusativ maskulin.", "Er hat {keinen} Ausweis dabei.", "einen wird zu keinen. Die maskuline Akkusativform von kein lautet keinen."),
      transform("Verneinen Sie das unbestimmte Objekt.", "Lea hat einen Hund.", ["Lea hat keinen Hund."], "ein wird zu kein. Im Akkusativ maskulin lautet die Form keinen Hund."),
      transform("Verneinen Sie nur die Zeit.", "Wir reisen am Montag ab.", ["Wir reisen nicht am Montag ab."], "nicht steht unmittelbar vor der Zeitangabe am Montag. Das Präfix ab schließt den Satz weiter."),
      sort("kein oder nicht?", ["kein", "nicht"], [
        { text: "Ich trinke ___ Kaffee.", bucket: 0 },
        { text: "Ich trinke ___ den Kaffee.", bucket: 1 },
        { text: "Das war ___ freundlich.", bucket: 1 },
        { text: "Wir haben ___ Glück.", bucket: 0 },
        { text: "Sie ist ___ meine Schwester.", bucket: 1 },
      ]),
    ]),
  ],
  "modal-satz": [
    workshop("indem", "indem und dadurch, dass", "B2", "indem antwortet auf Wie? Das Verb schließt den Satz. dadurch, dass leistet dasselbe.", [
      arrange("Sie bleibt fit,", ["indem", "sie", "täglich", "läuft."], "indem nennt die Art und Weise und verlangt Verbletztstellung. Das finite Verb läuft schließt den Nebensatz."),
      arrange("Du öffnest die Datei,", ["indem", "du", "doppelt", "klickst."], "indem antwortet auf Wie? Das finite Verb klickst steht am Ende."),
      arrange("Man spart Strom,", ["indem", "man das Licht", "ausmacht."], "Im indem-Satz verbindet sich das trennbare Verb am Ende: ausmacht."),
      arrange("Sie überzeugt ihn dadurch,", ["dass", "sie", "Zahlen", "zeigt."], "dadurch, dass nennt die Art und Weise. Das finite Verb zeigt schließt den dass-Satz."),
      arrange("Er geht,", ["ohne", "sich", "zu verabschieden."], "Dasselbe Subjekt verlangt ohne … zu. ohne enthält die Verneinung schon, ein weiteres nicht steht nicht."),
      arrange("Sie half mir,", ["ohne dass", "ich", "gefragt hatte."], "Ein anderes Subjekt verlangt ohne dass. Das finite Verb hatte schließt den Nebensatz."),
    ]),
    workshop("durch", "Satz oder durch plus Nomen", "B2", "indem plus Satz entspricht durch plus Nomen.", [
      transform("Verwenden Sie durch plus Nomen.", "Er löst das Problem, indem er den Kontext erklärt.", ["Er löst das Problem durch die Erklärung des Kontexts."], "erklären wird zum Nomen die Erklärung. durch regiert den Akkusativ: durch die Erklärung."),
      transform("Verwenden Sie ohne … zu.", "Sie unterbricht. Sie entschuldigt sich nicht.", ["Sie unterbricht, ohne sich zu entschuldigen."], "Dasselbe Subjekt verlangt ohne … zu. ohne trägt die Verneinung, nicht steht nicht zusätzlich."),
      choice("Der Satz antwortet auf Wie?", ["Sie bleibt fit, indem sie täglich läuft.", "Sie bleibt fit, damit sie täglich läuft.", "Sie bleibt fit, indem läuft sie täglich.", "Sie bleibt fit, seitdem sie täglich läuft."], 0, "indem nennt die Art und Weise und verlangt Verbletztstellung: läuft. seitdem wäre eine Zeitangabe, damit ein Zweck."),
      cloze("Das ankündigende Adverb.", "Man erkennt den Akzent {dadurch}, dass die Vokale länger sind.", "dadurch, dass kündigt die Art und Weise an. dass verlangt Verbletztstellung: sind."),
      sort("Art und Weise, Zweck oder Zeit?", ["Art und Weise", "Zweck", "Zeit"], [
        { text: "indem", bucket: 0 },
        { text: "damit", bucket: 1 },
        { text: "um … zu", bucket: 1 },
        { text: "während", bucket: 2 },
        { text: "dadurch, dass", bucket: 0 },
        { text: "bevor", bucket: 2 },
      ]),
    ]),
  ],
  "nomen-verb": [
    workshop("ordnen", "Die Fügung ist ein Prädikat", "B2", "Das Nomen trägt die Bedeutung. Das kleine Verb steht in Position 2, der Rest der Fügung schließt den Satz.", [
      arrange("Er bringt", ["den Vorschlag", "zur Sprache."], "Die feste Fügung lautet zur Sprache bringen. bringt steht in Position 2, zur Sprache am Ende."),
      arrange("Wir nehmen", ["die höheren Kosten", "in Kauf."], "Die feste Fügung lautet in Kauf nehmen. nehmen steht in Position 2, in Kauf am Ende."),
      arrange("Die Daten stehen", ["Ihnen", "online", "zur Verfügung."], "Die feste Fügung lautet zur Verfügung stehen. stehen steht in Position 2, zur Verfügung am Ende."),
      arrange("Das kommt", ["nicht", "in Frage."], "Die feste Fügung lautet in Frage kommen. nicht steht vor der nominalen Ergänzung in Frage."),
      arrange("Die Opposition übt", ["Kritik", "am Plan."], "Die feste Fügung lautet Kritik üben. an regiert den Dativ: am Plan."),
      arrange("Sag", ["mir", "bitte", "Bescheid."], "Die feste Fügung lautet Bescheid sagen. Im Imperativ steht Sag vorn, Bescheid am Ende."),
    ]),
    workshop("verbal", "Zurück zum einfachen Verb", "B2", "Das Funktionsverb entfällt. Das Nomen wird zum Verb. Die Objekte bleiben.", [
      transform("Formulieren Sie verbal.", "Das Komitee trifft eine Entscheidung über den Etat.", ["Das Komitee entscheidet über den Etat."], "eine Entscheidung treffen wird zum Verb entscheiden. Die Rektion über bleibt."),
      transform("Verwenden Sie die Fügung für kritisieren.", "Die Opposition kritisiert den Plan.", ["Die Opposition übt Kritik am Plan.", "Die Opposition übt Kritik an dem Plan."], "kritisieren wird zu Kritik üben. an regiert den Dativ: am Plan."),
      choice("Ein Thema aufbringen.", ["Er bringt den Vorschlag zur Sprache.", "Er bringt den Vorschlag zur sprechen.", "Er spricht den Vorschlag zur Sprache bringen.", "Er nimmt den Vorschlag zur Sprache."], 0, "Die feste Fügung lautet zur Sprache bringen. bringt steht in Position 2, zur Sprache am Ende."),
      cloze("in Kauf nehmen.", "Wir nehmen die höheren Kosten in {Kauf}.", "In der Fügung in Kauf nehmen steht Kauf als bloßes Nomen, ohne Artikel."),
      sort("Ordnen Sie die Fügung dem einfachen Verb zu.", ["entscheiden", "verfügbar sein", "erwähnen", "akzeptieren"], [
        { text: "eine Entscheidung treffen", bucket: 0 },
        { text: "zur Verfügung stehen", bucket: 1 },
        { text: "zur Sprache bringen", bucket: 2 },
        { text: "in Kauf nehmen", bucket: 3 },
      ]),
    ]),
  ],
  partizip: [
    workshop("bilden", "Partizip I oder Partizip II", "B2", "Partizip I: Das Nomen führt die Handlung aus, und zwar gleichzeitig. Transitives Partizip II: Das Nomen erleidet die Handlung.", [
      choice("Das Kind lacht.", ["das lachende Kind", "das gelachte Kind", "das lachen Kind", "das gelachende Kind"], 0, "Das Kind führt die Handlung aus. Das Partizip I lautet lachend, nach das mit der Endung -e: lachende."),
      choice("Das Buch erleidet die Handlung.", ["das gelesene Buch", "das lesende Buch", "das gelesen Buch", "das lesenes Buch"], 0, "lesen ist transitiv, das Buch erleidet die Handlung. Nach das lautet die schwache Endung -e: gelesene."),
      cloze("Partizip I nach dem.", "Ich danke dem {zuhörenden} Publikum.", "Das Partizip I lautet zuhörend. Nach dem folgt die schwache Endung -en: zuhörenden."),
      cloze("Erweitertes Partizip I.", "Die am Nebentisch {sitzende} Frau liest.", "Das Partizip I lautet sitzend. Nach die folgt die Endung -e: sitzende. Die Ergänzung am Nebentisch steht davor."),
      sort("Aktiv und gleichzeitig, oder passiv und abgeschlossen?", ["Partizip I", "Partizip II"], [
        { text: "der schlafende Hund", bucket: 0 },
        { text: "der gefütterte Hund", bucket: 1 },
        { text: "eine überraschende Nachricht", bucket: 0 },
        { text: "eine gedruckte Nachricht", bucket: 1 },
      ]),
    ]),
    workshop("relativ", "Partizip und Relativsatz", "B2", "Partizip I wird zu einem aktiven Satz. Transitives Partizip II wird zu einem passiven Satz.", [
      transform("Präsens, aktiv.", "Der an der Tür wartende Mann heißt Samir.", ["Der Mann, der an der Tür wartet, heißt Samir."], "Das Partizip I wartend ist aktiv und gleichzeitig. Der Relativsatz steht im Präsens, das finite Verb wartet am Ende."),
      transform("Passiver Relativsatz.", "Die von Elena korrigierte Fassung ist kürzer.", ["Die Fassung, die von Elena korrigiert wurde, ist kürzer."], "Das transitive Partizip II korrigiert wird zum Vorgangspassiv: die korrigiert wurde."),
      transform("Verdichten Sie zum Partizip.", "Die Frau, die am Nebentisch sitzt, liest.", ["Die am Nebentisch sitzende Frau liest."], "sitzt wird zum Partizip I sitzend. Nach die folgt -e: sitzende. Die Ergänzung steht vor dem Partizip."),
      transform("Verdichten Sie einen passiven Relativsatz.", "Der Text, den Mina geschrieben hat, ist kurz.", ["Der von Mina geschriebene Text ist kurz."], "geschrieben trägt das Passiv. von Mina steht vor dem Partizip, die Endung nach der lautet -e: geschriebene."),
      arrange("Der am Fenster", ["lesende", "Junge", "heißt Jonas."], "Die Ergänzung am Fenster steht vor dem Partizip I. Nach der folgt -e: lesende."),
      arrange("Die in Bonn", ["gedruckte", "Ausgabe", "ist teurer."], "Das Partizip II gedruckt nimmt die schwache Endung. Nach die lautet sie -e: gedruckte."),
    ]),
  ],
  genitiv: [
    workshop("ordnen", "Die Genitivphrase", "B2/C1", "des oder der, und -s oder -es an maskulinen und neutralen Nomen. Die Phrase folgt meist dem Nomen, das sie näher bestimmt.", [
      arrange("das Dach", ["des", "Hauses"], "Haus ist neutrum und einsilbig. Der Genitiv lautet des plus -es: des Hauses."),
      arrange("die Adresse", ["der", "Kollegin"], "Der feminine Genitiv lautet der. An Kollegin tritt kein zusätzliches -s."),
      arrange("Minas", ["Entwurf", "hat gewonnen."], "Ein Name kann mit -s und ohne Artikel vorn stehen: Minas. Das Verb hat folgt in Position 2."),
      arrange("Wegen", ["des Lärms", "schließen wir", "das Fenster."], "wegen regiert den Genitiv: des Lärms. Die Phrase steht in Position 1, das Verb schließen in Position 2."),
      arrange("Während", ["der Sitzung", "klingelt", "kein Telefon."], "während regiert den Genitiv. Sitzung ist feminin: der Sitzung, ohne Endung am Nomen."),
      arrange("die Entscheidung", ["des", "Komitees"], "In der geschriebenen Sprache lautet der Genitiv des Komitees, nicht von dem Komitee."),
    ]),
    workshop("formen", "Artikel und Endungen", "B2/C1", "Maskulinum und Neutrum verlangen des plus -s oder -es. Femininum und Plural verlangen der, an einem regelmäßigen Nomen ohne Endung.", [
      choice("Einsilbiges Neutrum.", ["das Dach des Hauses", "das Dach des Haus", "das Dach der Hauses", "das Dach des Hauseses"], 0, "Haus ist neutrum und einsilbig. Der Genitiv lautet des Hauses, mit -es, nicht -s und nicht -eses."),
      cloze("Femininum.", "Die Adresse {der} Kollegin steht unten.", "Der feminine Genitivartikel lautet der. An Kollegin tritt kein -s."),
      cloze("Ein Name.", "{Minas} Entwurf hat gewonnen.", "Ein Name im Genitiv erhält -s und keinen Artikel: Minas."),
      transform("Ersetzen Sie von.", "Die Entscheidung von dem Komitee überrascht mich.", ["Die Entscheidung des Komitees überrascht mich."], "In der geschriebenen Sprache steht der Genitiv des Komitees, nicht von dem Komitee."),
      choice("trotz in der geschriebenen Sprache.", ["trotz des Lärms", "trotz dem Lärm", "trotz den Lärm", "trotz der Lärm"], 0, "trotz regiert den Genitiv. Lärm ist maskulin: des Lärms."),
      sort("des oder der?", ["des", "der"], [
        { text: "___ Kindes", bucket: 0 },
        { text: "___ Mutter", bucket: 1 },
        { text: "___ Buches", bucket: 0 },
        { text: "___ Städte", bucket: 1 },
        { text: "___ Autors", bucket: 0 },
      ]),
    ]),
  ],
  nominal: [
    workshop("umformen", "Satz zum Nomen und zurück", "B2/C1", "Die Präposition trägt das Verhältnis. Das neue Nomen behält den Kasus dieser Präposition.", [
      transform("Grund, mit wegen.", "Weil der Flug verspätet ist, verpassen wir den Anschluss.", ["Wegen der Verspätung des Fluges verpassen wir den Anschluss.", "Wegen der Verspätung des Flugs verpassen wir den Anschluss."], "weil wird zu wegen plus Genitiv. Verspätung ist feminin: der Verspätung. Flug wird zu des Fluges oder des Flugs."),
      transform("Lösen Sie aufgrund auf.", "Aufgrund des Streiks fällt das Seminar aus.", ["Weil gestreikt wird, fällt das Seminar aus.", "Das Seminar fällt aus, weil gestreikt wird."], "aufgrund plus Genitiv wird wieder zu einem weil-Satz. Das finite Verb wird steht am Ende des Nebensatzes."),
      transform("Zweck als Nomen.", "Man sperrt die Straße, damit man sie reparieren kann.", ["Man sperrt die Straße zur Reparatur.", "Die Straße wird zur Reparatur gesperrt."], "Ein Finalsatz kann zu zur plus Nomen werden. Reparatur ist feminin, zu plus der ergibt zur."),
      choice("Ein Nomen auf -ung.", ["die Erklärung", "die Erklären", "das Erklärung", "der Erklären"], 0, "Nomen auf -ung sind feminin. Der Artikel lautet die: die Erklärung."),
      cloze("Substantivierter Infinitiv.", "Langes {Warten} macht ungeduldig.", "Der substantivierte Infinitiv ist neutrum und wird großgeschrieben: das Warten."),
      sort("Welche Präposition ersetzt die Konjunktion?", ["wegen", "trotz", "nach", "bei"], [
        { text: "weil", bucket: 0 },
        { text: "obwohl", bucket: 1 },
        { text: "nachdem", bucket: 2 },
        { text: "wenn", bucket: 3 },
      ]),
    ]),
  ],
  substantive: [
    workshop("n", "n-Deklination", "B2/C1", "Maskuline Personen dieser Gruppe erhalten -n oder -en in jedem Kasus außer dem Nominativ Singular.", [
      arrange("Wir suchen", ["den neuen", "Kollegen."], "der Kollege gehört zur n-Deklination. Im Akkusativ Singular lautet die Form den Kollegen."),
      arrange("Ich helfe", ["dem", "Studenten."], "helfen regiert den Dativ. der Student gehört zur n-Deklination: dem Studenten."),
      arrange("Das Büro", ["des", "Präsidenten", "ist im ersten Stock."], "Der Genitiv der n-Deklination lautet des Präsidenten, nicht des Präsidentens."),
      arrange("Haben Sie", ["den", "Herrn", "gesehen?"], "der Herr gehört zur n-Deklination. Im Akkusativ lautet die Form den Herrn."),
      arrange("Sie dankt", ["dem", "Kunden."], "danken regiert den Dativ. der Kunde gehört zur n-Deklination: dem Kunden."),
      arrange("Die Frage", ["des", "Menschen", "bleibt offen."], "Der Genitiv der n-Deklination lautet des Menschen, mit -en, ohne zusätzliches -s."),
    ]),
    workshop("plural", "Dativ Plural auf -n", "B2/C1", "Im Dativ Plural tritt -n hinzu, außer der Plural endet schon auf -n oder -s.", [
      choice("Kinder.", ["mit den Kindern", "mit den Kinder", "mit den Kinders", "mit den Kinden"], 0, "Der Plural Kinder endet nicht auf -n oder -s. Der Dativ Plural lautet Kindern."),
      cloze("Akkusativ Singular, n-Deklination.", "Wir suchen {den} neuen Kollegen.", "der Kollege gehört zur n-Deklination. Der Akkusativ lautet den Kollegen."),
      cloze("Genitiv Singular.", "Das Büro des {Präsidenten} ist oben.", "Die n-Deklination endet im Genitiv auf -en: Präsidenten, nicht Präsidentens."),
      transform("Dativ Singular.", "Der Student hilft mir.", ["Ich helfe dem Studenten."], "helfen regiert den Dativ. der Student gehört zur n-Deklination: dem Studenten."),
      choice("Welches Nomen folgt nicht der n-Deklination?", ["der Tisch", "der Mensch", "der Kunde", "der Herr"], 0, "der Tisch bleibt im Akkusativ Singular den Tisch. den Tischen wäre Dativ Plural."),
      sort("Erhält der Dativ Plural ein -n?", ["erhält -n", "schon vollständig"], [
        { text: "die Tische", bucket: 0 },
        { text: "die Frauen", bucket: 1 },
        { text: "die Autos", bucket: 1 },
        { text: "die Bücher", bucket: 0 },
      ]),
    ]),
  ],
  es: [
    workshop("ordnen", "Das es, das bleiben muss, und das es, das nur Position 1 hält", "C1", "Bei Wetter, es gibt und es handelt sich um fällt es nie weg. Ein einleitendes es entfällt, wenn etwas anderes vorn steht.", [
      arrange("Heute", ["regnet", "es."], "Beim Wetterverb rückt es hinter das Verb. Es entfällt nicht: regnet es."),
      arrange("In Hamburg gibt", ["es", "zwei", "Bibliotheken."], "es gibt behält es immer, auch wenn eine Ortsangabe Position 1 füllt."),
      arrange("Morgen handelt", ["es sich", "um denselben Fall."], "sich handeln um behält es. Die Zeit Morgen füllt Position 1, es bleibt hinter dem Verb."),
      arrange("Im Flur warten", ["drei", "Gäste."], "Steht der Ort vorn, entfällt das einleitende es. Das echte Subjekt ist drei Gäste, das Verb warten richtet sich danach."),
      arrange("Ich finde", ["es gut,", "dass du", "ehrlich bist."], "es verweist voraus auf den dass-Satz und muss bleiben. bist schließt den Nebensatz."),
      arrange("Es kommen", ["heute", "drei", "Bands."], "Dieses es füllt nur Position 1. Heute kommen drei Bands lässt es weg."),
    ]),
    workshop("pflicht", "Muss es bleiben?", "C1", "Wenn ein anderes Satzglied nach vorn rücken kann und der Satz sein echtes Subjekt behält, war es nur einleitend.", [
      transform("Stellen Sie den Ort nach vorn und lassen Sie es weg.", "Es warten drei Gäste im Flur.", ["Im Flur warten drei Gäste."], "drei Gäste ist das echte Subjekt. Das einleitende es entfällt, sobald der Ort Position 1 füllt."),
      transform("Behalten Sie es. Stellen Sie morgen nach vorn.", "Es handelt sich morgen um denselben Fall.", ["Morgen handelt es sich um denselben Fall."], "Bei sich handeln um ist es obligatorisch und bleibt hinter dem Verb."),
      choice("Stellen Sie ein Zeitwort vor ein Wetterverb.", ["Heute regnet es.", "Heute regnet.", "Heute es regnet.", "Es heute regnet."], 0, "Beim Wetterverb bleibt es hinter dem finiten Verb: regnet es. Es entfällt nicht."),
      cloze("es gibt.", "Bei uns {gibt} es keinen Aufzug.", "es gibt behält es. Das finite Verb gibt steht in Position 2, es dahinter."),
      sort("Kann dieses es entfallen, wenn ein anderes Satzglied vorn steht?", ["muss bleiben", "einleitend, kann weg"], [
        { text: "Es schneit.", bucket: 0 },
        { text: "Es gibt ein Problem.", bucket: 0 },
        { text: "Es sitzen zwei Katzen auf dem Dach.", bucket: 1 },
        { text: "Es kommt auf die Formulierung an.", bucket: 0 },
        { text: "Es stand ein Koffer im Gang.", bucket: 1 },
      ]),
    ]),
  ],
  subjektiv: [
    workshop("ordnen", "Vermutung, Gerücht oder Behauptung", "C1", "Das Modalverb steht in Position 2. Eine Vermutung über die Vergangenheit endet mit Partizip plus haben oder sein.", [
      arrange("Sie muss", ["die Mail", "schon", "gelesen haben."], "Eine sichere Schlussfolgerung über die Vergangenheit lautet müssen plus Partizip plus haben: gelesen haben."),
      arrange("Er soll", ["der neue", "Chef", "sein."], "sollen gibt wieder, was andere sagen. Der Infinitiv sein steht am Ende."),
      arrange("Er will", ["schon zweimal", "gewonnen", "haben."], "wollen ist die eigene Behauptung. Über die Vergangenheit steht das Partizip gewonnen vor haben."),
      arrange("Der Zug dürfte", ["gleich", "kommen."], "dürfte ist ein vorsichtiges wahrscheinlich. Der Infinitiv kommen steht am Ende."),
      arrange("Das kann", ["auch", "Zufall", "sein."], "können markiert eine offene Möglichkeit. Der Infinitiv sein steht am Ende."),
      arrange("Sie soll", ["den Vertrag", "schon", "unterschrieben haben."], "Ein Gerücht über die Vergangenheit lautet soll plus Partizip plus haben: unterschrieben haben."),
    ]),
    workshop("lesen", "Was das Modalverb signalisiert", "C1", "müssen ist die eigene Schlussfolgerung. sollen ist ein Gerücht. wollen ist die eigene Behauptung des Subjekts. dürfte ist schwächer als müssen.", [
      choice("Sie sind sich nach den Indizien sicher.", ["Sie muss die Mail schon gelesen haben.", "Sie soll die Mail schon gelesen haben.", "Sie will die Mail schon gelesen haben.", "Sie möchte die Mail schon gelesen haben."], 0, "Eine starke Schlussfolgerung über die Vergangenheit verlangt müssen plus Partizip plus haben."),
      choice("Sie geben ein Gerücht wieder.", ["Er soll der neue Chef sein.", "Er muss der neue Chef sein.", "Er will der neue Chef sein.", "Er dürfte der neue Chef werden müssen."], 0, "Ein Gerücht verlangt sollen plus Infinitiv: soll sein. müssen wäre die eigene Schlussfolgerung."),
      choice("Er behauptet das über sich selbst.", ["Er will schon zweimal gewonnen haben.", "Er soll schon zweimal gewonnen haben.", "Er muss schon zweimal gewonnen haben.", "Er darf schon zweimal gewonnen haben."], 0, "Die eigene Behauptung verlangt wollen. Über die Vergangenheit steht gewonnen haben am Ende."),
      cloze("Ein vorsichtiges wahrscheinlich.", "Der Zug {dürfte} gleich kommen.", "Eine vorsichtige Vermutung lautet dürfte plus Infinitiv. dürfte ist schwächer als muss."),
      transform("Markieren Sie eine starke Schlussfolgerung.", "Elena ist schon weg. Ich bin mir sehr sicher.", ["Elena muss schon weg sein.", "Elena muss schon gegangen sein."], "Eine sichere Schlussfolgerung verlangt müssen plus Infinitiv: muss weg sein oder muss gegangen sein."),
      sort("Was signalisiert das Modalverb?", ["starke Schlussfolgerung", "Gerücht", "eigene Behauptung", "Möglichkeit"], [
        { text: "Das muss ein Irrtum sein.", bucket: 0 },
        { text: "Das Festival soll ausverkauft sein.", bucket: 1 },
        { text: "Er will nichts davon gewusst haben.", bucket: 2 },
        { text: "Das kann auch Zufall sein.", bucket: 3 },
      ]),
    ]),
  ],
};

export function listWorkshops(topicId) {
  return workshops[topicId] || [];
}

export function getWorkshop(topicId, setId) {
  return listWorkshops(topicId).find((set) => set.id === setId) || null;
}

export function workshopParams() {
  return Object.entries(workshops).flatMap(([id, sets]) => sets.map((set) => ({ id, set: set.id })));
}
