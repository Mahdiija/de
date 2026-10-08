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
    workshop("du", "Du-commands", "A2", "Drop du. Stem-changing verbs change only here, and a separable prefix goes to the end.", [
      arrange("Mach", ["bitte", "das Licht", "aus."], "aus closes the command."),
      arrange("Lies", ["den Text", "noch einmal", "laut."], "lesen → lies in the du-command."),
      arrange("Nimm", ["dir", "noch", "Kuchen."], "nehmen → nimm."),
      arrange("Sei", ["morgen", "pünktlich."], "sein → sei. No du."),
      arrange("Ruf", ["mich", "heute Abend", "an."], "an goes to the end."),
      arrange("Sprich", ["bitte", "etwas", "lauter."], "sprechen → sprich."),
    ]),
    workshop("sie", "Polite commands", "A2", "The verb comes first. Sie stays immediately after it.", [
      arrange("Machen Sie", ["bitte", "das Licht", "aus."], "Sie sits in second position."),
      arrange("Seien Sie", ["so gut", "und warten", "Sie kurz."], "Polite sein is seien Sie."),
      arrange("Nehmen Sie", ["doch", "Platz."], "The stem does not change in the Sie-form."),
      arrange("Rufen Sie", ["mich", "morgen", "an."], "The prefix still closes the sentence."),
      arrange("Geben Sie", ["mir", "bitte", "den Schlüssel."], "geben stays geben before Sie."),
      arrange("Essen Sie", ["nicht", "so", "schnell."], "nicht stands before what it negates."),
    ]),
  ],
  "indirekte-fragen": [
    workshop("ob", "Yes/no questions with ob", "A2", "ob replaces the verb-first question, and the conjugated verb ends the clause.", [
      arrange("Ich weiß nicht,", ["ob", "Lea", "heute", "kommt."], "kommt closes the ob-clause."),
      arrange("Sie fragt,", ["ob", "wir", "noch Brot", "brauchen."], "brauchen is last."),
      arrange("Sag mir,", ["ob", "der Laden", "um acht", "aufmacht."], "The separable verb reunites at the end."),
      arrange("Können Sie mir sagen,", ["ob", "hier", "ein Geldautomat", "ist?"], "The polite frame is a main clause. The real question ends with ist."),
      arrange("Er will wissen,", ["ob", "du", "den Schlüssel", "hast."], "hast is the finite verb of the subordinate clause."),
      arrange("Ich frage mich,", ["ob", "das", "überhaupt", "stimmt."], "stimmt ends the clause."),
    ]),
    workshop("w", "Questions with a question word", "A2", "Keep the question word. Send the verb to the end.", [
      arrange("Weißt du,", ["wann", "der Zug", "fährt?"], "wann stays, fährt ends."),
      arrange("Sag mir,", ["wo", "Yusuf", "wohnt."], "wohnt is last."),
      arrange("Sie fragt,", ["warum", "du", "zu spät", "bist."], "bist closes the clause."),
      arrange("Erklären Sie mir,", ["wie", "das Gerät", "funktioniert."], "funktioniert is last."),
      arrange("Ich weiß nicht,", ["wen", "sie", "gesucht", "hat."], "In the perfect, hat is the finite verb and comes last."),
      arrange("Kannst du mir sagen,", ["worauf", "wir", "warten?"], "worauf is the question form of warten auf."),
    ]),
  ],
  modalverben: [
    workshop("ordnen", "Modal plus infinitive", "A2", "The modal is in second position. The bare infinitive closes the sentence.", [
      arrange("Lea muss", ["heute", "länger", "arbeiten."], "arbeiten is the infinitive at the end."),
      arrange("Wir möchten", ["am Fenster", "sitzen."], "No zu after möchten."),
      arrange("Du sollst", ["den Arzt", "anrufen."], "The separable infinitive stays in one piece."),
      arrange("Samir kann", ["sehr gut", "kochen."], "können marks ability here."),
      arrange("Ihr dürft", ["hier", "nicht", "rauchen."], "nicht dürfen is a ban. nicht stands before the infinitive."),
      arrange("Ich muss", ["morgen früh", "aufstehen."], "aufstehen stays together at the end."),
    ]),
    workshop("nicht", "nicht dürfen or nicht müssen", "A2", "A ban is nicht dürfen. Freedom from an obligation is nicht müssen.", [
      choice("Smoking is forbidden.", ["Man darf hier nicht rauchen.", "Man muss hier nicht rauchen.", "Man will hier nicht rauchen.", "Man soll hier nicht rauchen müssen."], 0, "Forbidden = nicht dürfen."),
      choice("There is no obligation to come.", ["Du musst nicht kommen.", "Du darfst nicht kommen.", "Du kannst nicht kommen.", "Du sollst nicht kommen."], 0, "No obligation = nicht müssen."),
      cloze("A polite wish.", "Ich {möchte} bitte ein stilles Wasser.", "ich möchte."),
      cloze("An outside instruction.", "Du {sollst} die Unterlagen heute abschicken.", "sollen reports someone else’s order."),
      transform("Use dürfen as a ban.", "Rauchen ist hier verboten.", ["Man darf hier nicht rauchen.", "Du darfst hier nicht rauchen."], "nicht dürfen."),
      transform("Remove the obligation with müssen.", "Bleiben ist nicht nötig.", ["Du musst nicht bleiben."], "nicht müssen means you may leave."),
    ]),
  ],
  perfekt: [
    workshop("ordnen", "Auxiliary second, participle last", "A2", "haben or sein stands in second position. The participle closes the sentence.", [
      arrange("Ich habe", ["den Film", "gesehen."], "lesen and sehen take haben."),
      arrange("Wir sind", ["nach Hause", "gegangen."], "Movement from A to B takes sein."),
      arrange("Hast du", ["die Rechnung", "ausgedruckt?"], "aus + ge + druckt."),
      arrange("Mina ist", ["um acht", "losgefahren."], "losfahren takes sein."),
      arrange("Sie hat", ["in Bonn", "studiert."], "Verbs in -ieren take no ge-."),
      arrange("Das Kind ist", ["früh", "eingeschlafen."], "A change of state takes sein."),
    ]),
    workshop("haben-sein", "haben or sein", "A2", "Most verbs take haben. Movement from place to place, and a change of state, take sein.", [
      sort("Which auxiliary does the verb take?", ["haben", "sein"], [
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
    workshop("ordnen", "war and hatte in second position", "A2", "These are the spoken past of sein and haben. The verb stays in position two.", [
      arrange("Gestern war", ["ich", "den ganzen Tag", "krank."], "A state takes war, not hatte."),
      arrange("Wo warst", ["du", "am Sonntag?"], "du warst."),
      arrange("Wir hatten", ["kein Bargeld", "dabei."], "wir hatten."),
      arrange("Früher hatte", ["das Café", "sonntags", "zu."], "hatte is position 2."),
      arrange("Es war", ["schon", "dunkel."], "sein → war."),
      arrange("Du hattest", ["völlig", "recht."], "du hattest."),
    ]),
  ],
  wechselpraepositionen: [
    workshop("wo", "Where it already is", "A2", "Wo? takes the dative. The thing is not moving toward a goal.", [
      arrange("Die Katze sitzt", ["auf", "dem", "Stuhl."], "Location, masculine dative: dem Stuhl."),
      arrange("Die Lampe steht", ["hinter", "dem", "Regal."], "Wo? → dative."),
      arrange("Sie wartet", ["vor", "dem", "Kino."], "warten is not movement into the cinema."),
      arrange("Das Bild hängt", ["über", "dem", "Sofa."], "It is already hanging."),
      arrange("Der Mantel hängt", ["an", "der", "Tür."], "Feminine dative: der Tür."),
      arrange("Wir sitzen", ["neben", "unseren", "Freunden."], "Location, dative plural."),
    ]),
    workshop("wohin", "Where it is going", "A2", "Wohin? takes the accusative.", [
      arrange("Ich lege", ["das Buch", "auf", "den Tisch."], "legen is movement toward a surface."),
      arrange("Wir gehen", ["jetzt", "in", "die Bibliothek."], "Feminine accusative: die Bibliothek."),
      arrange("Stell", ["die Tasche", "unter", "den Tisch."], "stellen + destination."),
      arrange("Sie hängt", ["den Mantel", "an", "die Tür."], "The action of hanging something up takes the accusative."),
      arrange("Er setzt", ["das Kind", "neben", "seine Schwester."], "setzen is the action, so accusative."),
      arrange("Leg", ["den Schlüssel", "in", "die Schublade."], "in + feminine accusative."),
    ]),
  ],
  pronomen: [
    workshop("ordnen", "Pronoun order", "A2/B1", "When both objects are pronouns, the accusative pronoun comes before the dative pronoun.", [
      arrange("Kannst du", ["sie", "mir", "vorstellen?"], "sie before mir."),
      arrange("Ich gebe", ["es", "dir", "morgen."], "es before dir."),
      arrange("Er erklärt", ["ihn", "ihr."], "Accusative ihn, then dative ihr."),
      arrange("Nora schickt", ["sie", "ihm", "heute."], "die Karte → sie, dem Bruder → ihm."),
      arrange("Wir zeigen", ["es", "ihnen", "gleich."], "es before ihnen."),
      arrange("Kann ich", ["ihn", "Ihnen", "leihen?"], "Formal dative is Ihnen."),
    ]),
    workshop("formen", "The right case form", "A2/B1", "The pronoun keeps the case of the noun it replaces.", [
      cloze("danken takes the dative.", "Ich danke {dir} für die Hilfe.", "dir, not dich."),
      cloze("Neuter dative.", "Die Lehrerin hilft {ihm}.", "dem Kind → ihm."),
      cloze("Possessive, dative masculine.", "Ich fahre mit {meinem} Bruder.", "mit + dative -em."),
      cloze("Formal dative.", "Ich schicke {Ihnen} die Datei.", "Ihnen is capitalized."),
      choice("Replace die Lehrerin as a dative object.", ["Ich vertraue ihr.", "Ich vertraue sie.", "Ich vertraue ihn.", "Ich vertraue es."], 0, "Feminine dative is ihr."),
      choice("Accusative of ich.", ["Sie ruft mich an.", "Sie ruft mir an.", "Sie ruft mein an.", "Sie ruft ich an."], 0, "anrufen takes the accusative: mich."),
    ]),
  ],
  praepositionen: [
    workshop("ordnen", "Preposition and noun", "A2/B1", "The preposition decides the case. Keep that phrase together.", [
      arrange("Wir fahren", ["mit", "dem", "Zug."], "mit + dative."),
      arrange("Das Geschenk ist", ["für", "meinen", "Vater."], "für + accusative."),
      arrange("Wegen", ["des starken", "Regens", "bleiben wir hier."], "wegen + genitive. The whole phrase can stand first, so the verb follows."),
      arrange("Seit", ["einem Monat", "wohnt sie", "bei Freunden."], "seit + dative, and the verb is second."),
      arrange("Ohne", ["meinen Ausweis", "komme ich", "nicht rein."], "ohne + accusative. The phrase is in first position."),
      arrange("Während", ["der Sitzung", "klingelt", "kein Telefon."], "während + genitive."),
    ]),
    workshop("fall", "Which case?", "A2/B1", "Learn the fixed lists. Two-way prepositions are a separate chapter.", [
      sort("Sort the preposition.", ["Dative", "Accusative", "Genitive"], [
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
    workshop("damit", "damit, different subjects", "B1", "Two different subjects force damit. The verb of the damit-clause goes to the end.", [
      arrange("Ich schreibe es auf,", ["damit", "ich", "es", "nicht vergesse."], "vergesse ends the clause."),
      arrange("Lea spricht laut,", ["damit", "die Oma", "sie", "hört."], "Lea speaks, the grandmother hears."),
      arrange("Wir wiederholen die Regel,", ["damit", "alle", "sie", "verstehen."], "verstehen is last."),
      arrange("Er gibt ihr Geld,", ["damit", "sie", "ein Ticket", "kauft."], "Different subjects, so not um … zu."),
      arrange("Sprich langsam,", ["damit", "ich", "alles", "mitbekomme."], "mitbekomme closes the clause."),
      arrange("Sie bleibt hier,", ["damit", "das Kind", "nicht", "aufwacht."], "aufwacht is one word at the end of a subordinate clause."),
    ]),
    workshop("um-zu", "um … zu, same subject", "B1", "Same subject: um … zu. zu splits a separable verb.", [
      arrange("Sie lernt Deutsch,", ["um", "in München", "zu arbeiten."], "Same subject sie."),
      arrange("Er spart,", ["um", "sich ein Fahrrad", "zu kaufen."], "zu kaufen at the end."),
      arrange("Nora bleibt,", ["um", "den Anfang", "nicht zu verpassen."], "nicht stands before zu + infinitive."),
      arrange("Ich stehe früh auf,", ["um", "den Zug", "nicht zu verpassen."], "verpassen is not separable, so zu stays in front."),
      arrange("Wir treffen uns,", ["um", "den Plan", "zu besprechen."], "besprechen takes no zu inside the verb."),
      arrange("Vergiss nicht anzurufen,", ["um", "den Termin", "zu bestätigen."], "zu bestätigen closes the purpose phrase."),
    ]),
  ],
  "je-desto": [
    workshop("ordnen", "je … desto", "B1", "The je-clause ends with its verb. After desto and the comparative, the finite verb is next.", [
      arrange("Je kälter es wird,", ["desto früher", "gehen", "wir rein."], "gehen follows the comparative phrase."),
      arrange("Je mehr du liest,", ["umso sicherer", "schreibst", "du."], "umso works like desto."),
      arrange("Je älter der Wein wird,", ["desto teurer", "wird", "er."], "wird is second in the main clause."),
      arrange("Je schneller du sprichst,", ["desto weniger", "verstehe", "ich."], "verstehe follows weniger."),
      arrange("Je ruhiger das Büro ist,", ["desto besser", "kann", "ich denken."], "kann is the finite verb."),
      arrange("Je länger wir warten,", ["desto ungeduldiger", "werden", "die Kinder."], "werden is in second position."),
    ]),
  ],
  konditional: [
    workshop("ordnen", "wenn, falls, and verb-first", "B1", "A fronted condition counts as position one, so the main clause begins with its verb.", [
      arrange("Wenn du anrufst,", ["bin", "ich", "zu Hause."], "bin follows the wenn-clause."),
      arrange("Falls das Wetter umschlägt,", ["grillen", "wir", "nicht."], "falls marks a less certain condition."),
      arrange("Kommt der Bus nicht,", ["nehmen", "wir", "ein Taxi."], "Verb-first replaces wenn."),
      arrange("Ruft Mina an,", ["sage", "ich", "Bescheid."], "The separable verb opens the condition."),
      arrange("Wenn es regnet,", ["bleiben", "wir", "im Atelier."], "bleiben is the next verb."),
      arrange("Hätte ich das gewusst,", ["wäre", "ich", "geblieben."], "An unreal condition can also open with the verb."),
    ]),
  ],
  konzessiv: [
    workshop("ordnen", "obwohl and trotzdem", "B1", "obwohl sends the verb to the end. trotzdem is an adverb: verb second. Do not use both.", [
      arrange("Obwohl es schneit,", ["fährt", "der Bus."], "The obwohl-clause is position 1."),
      arrange("Obwohl ich wenig geschlafen habe,", ["bin", "ich", "wach."], "bin follows the clause."),
      arrange("Es ist teuer.", ["Trotzdem", "kaufe", "ich es."], "Trotzdem, then the verb."),
      arrange("Obwohl der Saal voll war,", ["haben", "wir Plätze", "gefunden."], "haben is the finite verb of the main clause."),
      arrange("Auch wenn du müde bist,", ["ist", "der Text", "kurz."], "auch wenn works like obwohl."),
      arrange("Es regnet.", ["Trotzdem", "gehen", "wir los."], "One connector is enough."),
    ]),
  ],
  infinitiv: [
    workshop("zu", "Where zu goes", "B1", "zu stands before the infinitive, and inside a separable verb. Modals, lassen, and werden take no zu.", [
      arrange("Wir haben vor,", ["uns um acht", "zu treffen."], "vorhaben takes zu."),
      arrange("Vergiss nicht,", ["die Rechnung", "abzuschicken."], "zu splits abschicken."),
      arrange("Elena nimmt sich vor,", ["heute", "anzurufen."], "anzurufen is one word."),
      arrange("Du brauchst", ["heute", "nicht", "zu kochen."], "nicht before zu + infinitive."),
      arrange("Es ist schwer,", ["das", "leise", "zu sagen."], "The infinitive clause follows the comma."),
      arrange("Sie scheint", ["den Termin", "vergessen", "zu haben."], "A perfect infinitive ends in zu haben or zu sein."),
    ]),
    workshop("dass", "zu or dass", "B1", "Same subject prefers zu. A different subject needs dass, or a verb like bitten that passes the subject to its object.", [
      transform("Same subject. Use zu.", "Elena nimmt sich vor: Sie ruft heute an.", ["Elena nimmt sich vor, heute anzurufen."], "anrufen → anzurufen."),
      transform("bitten allows an infinitive whose subject is the object.", "Jonas bittet Samir. Samir soll früher kommen.", ["Jonas bittet Samir, früher zu kommen."], "Samir is understood as the subject of kommen."),
      choice("Which verb takes zu?", ["Wir versuchen, pünktlich zu sein.", "Wir müssen pünktlich zu sein.", "Wir lassen ihn zu gehen.", "Wir werden pünktlich zu sein."], 0, "versuchen takes zu. müssen, lassen, and werden do not."),
      cloze("Separable verb.", "Vergiss nicht, die Tür {abzuschließen}.", "zu sits between ab and schließen."),
      sort("Does the second verb take zu?", ["with zu", "without zu"], [
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
    workshop("ordnen", "weder … noch", "B1", "The pair already means not A and not B. Do not add nicht.", [
      arrange("Ich trinke", ["weder", "Tee", "noch Kaffee."], "weder before the first item, noch before the second."),
      arrange("Wir haben", ["weder", "Zeit", "noch Geld."], "haben stays in position 2."),
      arrange("Sie hat", ["weder angerufen", "noch", "geschrieben."], "The two participles are the parallel items."),
      arrange("Das Gerät ist", ["weder", "schnell", "noch leise."], "Two adjectives, same pattern."),
      arrange("Er isst", ["weder", "Fleisch", "noch Fisch."], "kein disappears inside the pair."),
      arrange("Weder Mina noch ihre Eltern", ["waren", "gestern", "da."], "The verb agrees with the nearer subject, ihre Eltern."),
    ]),
  ],
  korrelat: [
    workshop("ordnen", "nicht nur … sondern auch and sowohl … als auch", "B1", "The two slots must hold the same kind of phrase.", [
      arrange("Sie spricht", ["nicht nur Deutsch,", "sondern auch", "Türkisch."], "Two nouns, parallel."),
      arrange("Wir checken", ["sowohl", "die Quellen", "als auch die Zahlen."], "sowohl … als auch wraps the two objects."),
      arrange("Der Kurs ist", ["nicht nur günstig,", "sondern auch", "gut betreut."], "Two descriptions."),
      arrange("Nicht nur Yusuf, sondern auch Lea", ["kommt", "zur Probe."], "The verb follows the whole first bracket."),
      arrange("Mina schreibt nicht nur die Mail,", ["sondern", "ruft", "auch an."], "The second verb continues the clause."),
      arrange("Der Test prüft", ["sowohl die Grammatik", "als auch", "den Wortschatz."], "Both objects stay accusative."),
    ]),
  ],
  adjektive: [
    workshop("enden", "Choose the ending", "B1/B2", "After der, the ending is weak. After ein, it is mixed. With no article, it is strong.", [
      choice("Dative, definite, masculine.", ["mit dem roten Mantel", "mit dem rotem Mantel", "mit dem roter Mantel", "mit dem rotes Mantel"], 0, "After dem the adjective takes -en."),
      choice("No article, dative neuter.", ["mit kaltem Wasser", "mit kalten Wasser", "mit kalte Wasser", "mit kaltem dem Wasser"], 0, "Strong dative neuter is -em."),
      cloze("Mixed, nominative masculine.", "Das ist ein {neuer} Kollege.", "ein does not mark masculine nominative, so the adjective takes -er."),
      cloze("Attributive superlative.", "Sie sucht die {schnellste} Verbindung.", "schnell + ste, then -e after die."),
      cloze("Predicate superlative.", "Dieses Brot schmeckt am {besten}.", "am + sten."),
      cloze("Comparative with umlaut.", "Nora ist {älter} als ihre Schwester.", "alt → älter."),
    ]),
    workshop("ordnen", "Adjective inside the noun phrase", "B1/B2", "Keep the article, the adjective, and the noun together.", [
      arrange("Sie kommt", ["mit dem roten", "Mantel."], "Weak ending after dem."),
      arrange("Das ist", ["ein neuer", "Kollege."], "Mixed ending -er."),
      arrange("Wir rechnen", ["mit kaltem", "Wasser."], "Strong ending, no article."),
      arrange("Er sucht", ["einen interessanten", "Job."], "Weak -en after einen."),
      arrange("Trotz", ["des schlechten", "Wetters", "bleiben wir."], "Genitive: des schlechten Wetters. The phrase is first, so the verb follows."),
      arrange("Sie nimmt", ["die schnellste", "Verbindung."], "Superlative plus weak ending."),
    ]),
  ],
  kasus: [
    workshop("objekte", "Dative noun before accusative noun", "B1/B2", "Person in the dative, thing in the accusative. With two pronouns, reverse that: accusative then dative.", [
      arrange("Die Ärztin gibt", ["dem Patienten", "das Rezept."], "Dative noun, then accusative noun."),
      arrange("Er schenkt", ["seiner Mutter", "Blumen."], "seiner Mutter is dative."),
      arrange("Sie erklärt", ["den Gästen", "den Weg."], "den Gästen is dative plural."),
      arrange("Ich schicke", ["es", "dir", "heute."], "Two pronouns: es before dir."),
      arrange("Lea zeigt", ["ihn", "ihm."], "den Film → ihn, dem Kind → ihm."),
      arrange("Wir leihen", ["unserer Nachbarin", "das Werkzeug."], "Person first when both are nouns."),
    ]),
    workshop("verben", "Verbs that take the dative", "B1/B2", "helfen, danken, gefallen, gehören, vertrauen, begegnen, and zuhören take a dative object.", [
      cloze("helfen.", "Kannst du {mir} bitte helfen?", "mir, not mich."),
      cloze("gefallen.", "Der Film gefällt {mir} sehr.", "gefallen + dative."),
      cloze("gehören.", "Die Tasche gehört {der} Nachbarin.", "dative feminine der."),
      choice("begegnen.", ["Ich begegne einem alten Freund.", "Ich begegne einen alten Freund.", "Ich begegne ein alter Freund.", "Ich begegne einem alten Freundem."], 0, "begegnen takes the dative."),
      choice("danken and für.", ["Ich danke dir für deinen Brief.", "Ich danke dich für deinen Brief.", "Ich danke dir für deinem Brief.", "Ich danke dich für deinem Brief."], 0, "dir because of danken, deinen because of für."),
      sort("Which object case does the verb take?", ["Dative", "Accusative"], [
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
    workshop("futur-1", "Futur I", "B1/B2", "werden is in second position. The infinitive closes the sentence.", [
      arrange("Ich werde", ["dich", "heute Abend", "anrufen."], "A promise: werden + infinitive."),
      arrange("Er wird", ["noch", "im Büro", "sein."], "A guess about now."),
      arrange("Wir werden", ["das Fenster", "nicht", "aufmachen."], "The separable infinitive stays whole."),
      arrange("Du wirst", ["das", "heute noch", "erledigen."], "Futur I can sound like an order."),
      arrange("Sie werden", ["müde", "sein."], "werden agrees with sie."),
      arrange("Es wird", ["gleich", "regnen."], "regnen is the infinitive."),
    ]),
    workshop("futur-2", "Futur II", "B1/B2", "werden + participle + haben or sein. The auxiliary infinitive is last.", [
      arrange("Bis Freitag werde ich", ["das Kapitel", "gelesen", "haben."], "lesen takes haben."),
      arrange("Sie wird", ["den Zug", "verpasst", "haben."], "A guess about the past."),
      arrange("Bis acht werden wir", ["angekommen", "sein."], "ankommen takes sein."),
      arrange("Er wird", ["schon", "losgefahren", "sein."], "losfahren takes sein."),
      arrange("Vor Montag werde ich", ["den Bericht", "abgeschickt", "haben."], "abschicken takes haben."),
      arrange("Sie werden", ["das", "vergessen", "haben."], "Participle, then haben."),
    ]),
  ],
  kausal: [
    workshop("weil-denn", "weil, denn, deshalb", "B1/B2", "weil ends with the verb. denn keeps verb-second. deshalb takes first position.", [
      arrange("Ich bleibe zu Hause,", ["weil", "ich", "Fieber", "habe."], "habe ends the weil-clause."),
      arrange("Ich bleibe zu Hause,", ["denn", "ich habe", "Fieber."], "After denn the verb is second in its own clause."),
      arrange("Ich habe Fieber.", ["Deshalb", "bleibe", "ich zu Hause."], "Deshalb, then the verb."),
      arrange("Da der Saal voll ist,", ["warten", "wir", "draußen."], "da works like weil and likes the front."),
      arrange("Wegen des Fiebers", ["bleibe", "ich", "zu Hause."], "wegen + genitive can occupy first position."),
      arrange("Ich komme später.", ["Ich habe", "nämlich", "noch einen Termin."], "nämlich sits after the verb."),
    ]),
    workshop("final-mix", "Cause or purpose", "B1/B2", "weil and wegen answer Warum? damit and um … zu answer Wozu?", [
      choice("A cause, verb-final.", ["Sie kommt später, weil sie den Bus verpasst.", "Sie kommt später, weil sie verpasst den Bus.", "Sie kommt später, denn sie den Bus verpasst.", "Weil sie verpasst den Bus, kommt sie später."], 0, "weil: verb at the end."),
      choice("A purpose, same subject.", ["Sie lernt, um die Prüfung zu bestehen.", "Sie lernt, damit die Prüfung zu bestehen.", "Sie lernt, um die Prüfung besteht.", "Sie lernt, weil die Prüfung zu bestehen."], 0, "um … zu answers Wozu?"),
      transform("Use wegen + genitive.", "Das Spiel fällt aus, weil es stark regnet.", ["Wegen des starken Regens fällt das Spiel aus."], "der Regen → des Regens."),
      transform("Use damit.", "Ich schreibe laut. Du sollst es hören.", ["Ich schreibe laut, damit du es hörst."], "Different subjects."),
      cloze("The connector that cannot start a sentence.", "Ich nehme den früheren Zug, {denn} der spätere ist voll.", "denn keeps verb-second."),
      cloze("Purpose, separable verb.", "Sie steht früh auf, um den Zug nicht {zu verpassen}.", "zu before a non-separable infinitive."),
    ]),
  ],
  konjunktiv2: [
    workshop("ordnen", "Unreal and polite", "B1/B2", "würde or the one-word Konjunktiv II is in second position. The infinitive, if there is one, is last.", [
      arrange("Könnten Sie", ["das", "bitte", "einpacken?"], "Polite request. No zu."),
      arrange("Wenn wir ein Auto hätten,", ["wären", "wir", "flexibler."], "Both halves are unreal. The main clause begins with the verb."),
      arrange("Ich würde", ["an deiner Stelle", "früher", "schlafen."], "würde second, infinitive last."),
      arrange("Wenn Mina Zeit hätte,", ["würde", "sie", "mitkommen."], "hätte in the condition, würde in the result."),
      arrange("Wenn du gelernt hättest,", ["hättest", "du", "bestanden."], "Past unreal: hätte + participle."),
      arrange("Du hättest", ["früher", "anrufen", "sollen."], "The modal infinitive is last."),
    ]),
    workshop("formen", "Pick the unreal form", "B1/B2", "hätte, wäre, würde, and the modals könnte, müsste, dürfte, sollte.", [
      cloze("Unreal haben.", "Wenn wir mehr Zeit {hätten}, wären wir flexibler.", "hätten, not haben."),
      cloze("Unreal sein.", "Wenn ich du {wäre}, würde ich zusagen.", "wäre."),
      choice("Polite shop request.", ["Könnten Sie das bitte zeigen?", "Könntet Sie das bitte zeigen?", "Würden Sie das bitte zu zeigen?", "Können Sie das bitte zu zeigen?"], 0, "Könnten Sie. No zu."),
      choice("A regret with a modal.", ["Du hättest anrufen sollen.", "Du solltest anrufen haben.", "Du hättest sollen anrufen.", "Du würdest anrufen gesollt."], 0, "hättest + infinitive + sollen."),
      transform("Make it unreal.", "Wenn Mina Zeit hat, kommt sie mit.", ["Wenn Mina Zeit hätte, würde sie mitkommen.", "Wenn Mina Zeit hätte, käme sie mit."], "hat → hätte, kommt → würde mitkommen or käme."),
      transform("Unreal past.", "Du hast nicht geschrieben. Ich habe nicht geantwortet.", ["Wenn du geschrieben hättest, hätte ich geantwortet."], "hätte + participle in both halves."),
    ]),
  ],
  passiv: [
    workshop("praesens", "Active to present passive", "B1", "The accusative object becomes the subject. wird agrees with that new subject. The participle is last.", [
      transform("You may leave the agent out.", "Die Technikerin repariert den Drucker.", ["Der Drucker wird repariert.", "Der Drucker wird von der Technikerin repariert."], "den Drucker → der Drucker."),
      transform("Present passive.", "Man druckt den Brief.", ["Der Brief wird gedruckt."], "wird + participle."),
      transform("A plural object.", "Die Stadt finanziert die Öffnungszeiten.", ["Die Öffnungszeiten werden finanziert.", "Die Öffnungszeiten werden von der Stadt finanziert."], "werden agrees with the plural."),
      arrange("Der Brief wird", ["heute", "geschrieben."], "Time before the participle."),
      arrange("Das Dach wird", ["von der Firma", "repariert."], "von + dative for a person or institution."),
      arrange("Die Tür wird", ["durch einen Sensor", "geöffnet."], "durch + accusative for a means."),
    ]),
    workshop("modal", "Passive with a modal", "B1/B2", "modal + participle + werden. werden is the last word.", [
      transform("Present.", "Man muss die Tür schließen.", ["Die Tür muss geschlossen werden."], "muss + participle + werden."),
      transform("können.", "Man kann den Deckel abnehmen.", ["Der Deckel kann abgenommen werden."], "Or: Der Deckel lässt sich abnehmen."),
      arrange("Die Rechnung muss", ["heute", "bezahlt", "werden."], "werden closes the sentence."),
      arrange("Das Formular kann", ["online", "ausgefüllt", "werden."], "Same pattern with kann."),
      arrange("Der Fehler sollte", ["sofort", "korrigiert", "werden."], "sollte is Konjunktiv II of sollen, still followed by werden."),
      cloze("The last word.", "Das Fenster muss geöffnet {werden}.", "werden, not worden, in the present modal passive."),
    ]),
    workshop("zeiten", "Präteritum, perfect, and state", "B1/B2", "The tense sits on werden. The perfect uses worden, never geworden. A result uses sein without worden.", [
      choice("A result, not a process.", ["Die Tür ist geöffnet.", "Die Tür wird geöffnet.", "Die Tür ist geöffnet worden.", "Die Tür wurde geöffnet."], 0, "sein + participle is the state."),
      choice("Perfect process.", ["Der Brief ist geschrieben worden.", "Der Brief ist geschrieben geworden.", "Der Brief hat geschrieben worden.", "Der Brief wird geschrieben worden."], 0, "worden, not geworden."),
      transform("Simple past.", "Man reparierte das Dach.", ["Das Dach wurde repariert."], "wurde + participle."),
      transform("Perfect.", "Man hat den Fehler korrigiert.", ["Der Fehler ist korrigiert worden."], "ist + participle + worden."),
      cloze("Perfect passive.", "Der Fehler ist gestern korrigiert {worden}.", "worden is the participle of werden in the passive."),
      arrange("Das Haus ist", ["gebaut", "worden."], "Participle, then worden."),
    ]),
    workshop("subjektlos", "Subjectless passive", "B2", "Intransitive verbs can form a passive with no real subject. es disappears when something else stands first.", [
      transform("No subject.", "Man tanzt hier.", ["Hier wird getanzt."], "Front the place, drop es."),
      transform("A ban.", "Man raucht hier nicht.", ["Hier wird nicht geraucht."], "nicht before the participle."),
      cloze("essen, intransitive use.", "In diesem Raum wird nicht {gegessen}.", "gegessen, not geessen."),
      arrange("Sonntags wird", ["nicht", "gearbeitet."], "The time is already first, so no es."),
      arrange("Es wird", ["hier", "nicht", "geraucht."], "es holds first position only when nothing else does."),
      choice("Which sentence has no real subject?", ["Hier wird getanzt.", "Der Brief wird geschrieben.", "Die Tür ist geöffnet.", "Man tanzt gern."], 0, "tanzen has no accusative object, so the passive has no subject."),
    ]),
    workshop("ersatz", "Substitutes for the passive", "B2", "sich lassen + infinitive, sein + zu + infinitive, and adjectives in -bar.", [
      transform("Use sich lassen.", "Man kann den Deckel abnehmen.", ["Der Deckel lässt sich abnehmen."], "kann + passive ↔ sich lassen + infinitive."),
      transform("Use sein + zu.", "Man kann die Datei nicht öffnen.", ["Die Datei ist nicht zu öffnen."], "nicht before zu + infinitive."),
      cloze("Reflexive lassen.", "Der Knoten lässt {sich} leicht lösen.", "sich lassen + infinitive."),
      choice("A -bar adjective.", ["Der Text ist schwer lesbar.", "Der Text ist schwer gelesen.", "Der Text lässt schwer lesen.", "Der Text ist zu lesbar nicht."], 0, "lesbar ≈ kann gelesen werden."),
      arrange("Das Fenster lässt", ["sich", "nicht", "öffnen."], "No zu, no participle."),
      arrange("Die Datei ist", ["nicht", "zu", "öffnen."], "sein + zu + infinitive."),
    ]),
  ],
  relativ: [
    workshop("ordnen", "Build the relative clause", "B1/B2", "The pronoun takes its gender from the noun and its case from its own clause. The verb ends the clause.", [
      arrange("Das ist der Roman,", ["den", "ich", "gekauft habe."], "kaufen → accusative den."),
      arrange("Das ist die Frau,", ["die", "nebenan", "wohnt."], "She is the subject: die."),
      arrange("Das sind die Leute,", ["denen", "ich", "vertraue."], "vertrauen → dative denen."),
      arrange("Der Autor,", ["dessen Roman", "du liest,", "ist morgen da."], "Genitive dessen. The main verb ist comes after the clause."),
      arrange("Die Kollegin,", ["der", "ich danke,", "heißt Elena."], "danken → dative der."),
      arrange("Der Kurs,", ["für den", "ich zahle,", "ist voll."], "für chooses the accusative."),
    ]),
    workshop("fall", "Gender from the noun, case from the clause", "B1/B2", "Do not copy the case of the noun in the main clause.", [
      choice("Accusative masculine.", ["der Roman, den ich meine", "der Roman, der ich meine", "der Roman, dem ich meine", "der Roman, dessen ich meine"], 0, "meinen takes the accusative."),
      choice("Dative because of helfen.", ["der Mann, dem ich helfe", "der Mann, den ich helfe", "der Mann, der ich helfe", "der Mann, dessen ich helfe"], 0, "helfen decides the case."),
      cloze("Genitive masculine.", "Der Regisseur, {dessen} Film wir sehen, sitzt im Saal.", "dessen + Film."),
      cloze("für + accusative.", "Der Preis, für {den} er nominiert ist, wird morgen vergeben.", "für → den."),
      cloze("A whole clause.", "Er hat abgesagt, {was} mich ärgert.", "was refers to the clause."),
      cloze("etwas + über.", "Es gibt etwas, {worüber} ich mit dir sprechen muss.", "worüber, with r before the vowel."),
    ]),
    workshop("schreiben", "Combine two sentences", "B1/B2", "One noun becomes the head. The other sentence becomes the relative clause.", [
      transform("The city is the head. Place.", "Die Stadtbibliothek hat sonntags auf. Wir treffen uns dort.", ["Die Stadtbibliothek, in der wir uns treffen, hat sonntags auf."], "in + dative der for a location."),
      transform("The book is the object.", "Der Roman ist lang. Ich habe ihn gekauft.", ["Der Roman, den ich gekauft habe, ist lang."], "den, because kaufen takes the accusative."),
      transform("Dative plural.", "Die Nachbarn sind ruhig. Wir vertrauen ihnen.", ["Die Nachbarn, denen wir vertrauen, sind ruhig."], "denen."),
      transform("Genitive.", "Der Autor ist morgen da. Du liest seinen Roman.", ["Der Autor, dessen Roman du liest, ist morgen da."], "dessen Roman."),
    ]),
  ],
  satzbau: [
    workshop("praep-objekt", "Sätze mit Präpositionalobjekten ordnen", "B1", poNote, [
      arrange("Die Nachbarin erinnert sich", "noch genau an das Gespräch von gestern.", "erinnern an. Time and manner come first. The whole an-phrase, including von gestern, closes the sentence."),
      arrange("Wir beschäftigen uns", "seit dem letzten Semester intensiv mit der Frage der Wohnungsnot.", "beschäftigen mit. The seit-phrase is time, intensiv is manner, and the mit-phrase is the prepositional object."),
      arrange("Die Kommission entscheidet", "erst nächste Woche über den umstrittenen Antrag.", "entscheiden über. The time phrase precedes the prepositional object."),
      arrange("Keiner von uns glaubt", "nach diesem Bericht noch an eine schnelle Lösung.", "glauben an. nach diesem Bericht is the time, noch is the particle, an eine schnelle Lösung is last."),
      arrange("Die Eltern bestehen", "trotz aller Bedenken auf einer schriftlichen Entschuldigung.", "bestehen auf takes the dative. trotz aller Bedenken is a concession and comes before the prepositional object."),
      arrange("Im Seminar sprechen wir", "heute zum ersten Mal über die Folgen des Klimawandels.", "sprechen über. The given start already holds the verb, so heute and zum ersten Mal precede the über-phrase."),
      arrange("Die Mieterin beschwert sich", "schon seit Monaten beim Vermieter über den Lärm aus der Nachbarwohnung.", "bei a person, über a thing. The über-phrase is the last prepositional object."),
      arrange("Viele Bewerber interessieren sich", "vor allem wegen des Gehalts für die ausgeschriebene Stelle.", "interessieren für. wegen des Gehalts gives the cause and stands before the für-phrase."),
      arrange("Der Autor weist", "in seinem neuen Essay auf einen alten Denkfehler hin.", "hinweisen auf. The prepositional object comes before the separable prefix hin."),
      arrange("Kannst du dich", "bitte noch einmal um die fehlenden Unterlagen kümmern?", "sich kümmern um. The infinitive kümmern stands after the prepositional object."),
    ]),
    workshop("dativ-akk", "Sentences with a dative and an accusative object", "B2", "Two nouns: dative before accusative. Two pronouns: accusative before dative.", [
      arrange("Die Ärztin gibt", ["dem Patienten", "das Rezept."], "Person, then thing."),
      arrange("Ich schenke", ["meiner Schwester", "zum Geburtstag", "Blumen."], "The dative noun precedes the accusative noun. The time phrase can sit between them."),
      arrange("Er erklärt", ["den neuen Kollegen", "den Plan."], "den Kollegen is dative plural."),
      arrange("Sie schickt", ["ihrem Bruder", "die Karte."], "ihrem Bruder before die Karte."),
      arrange("Kannst du", ["sie", "mir", "geben?"], "Pronouns reverse the noun order."),
      arrange("Ich leihe", ["es", "dir", "ungern."], "es before dir."),
      arrange("Nora zeigt", ["dem Gast", "das Zimmer."], "Dative noun, accusative noun."),
      arrange("Wir erzählen", ["den Kindern", "eine Geschichte."], "den Kindern is dative."),
    ]),
    workshop("nebensaetze", "Subordinate clauses", "B1", "The subordinating conjunction sends the finite verb to the end. If that clause is first, the main-clause verb is next.", [
      arrange("Ich bleibe hier,", ["weil", "ich", "müde bin."], "bin ends the weil-clause."),
      arrange("Weil es spät ist,", ["nehmen", "wir", "ein Taxi."], "The whole weil-clause is position 1."),
      arrange("Sag mir,", ["wo", "der Eingang", "ist."], "ist ends the indirect question."),
      arrange("Obwohl es regnet,", ["gehen", "wir", "zu Fuß."], "gehen follows the obwohl-clause."),
      arrange("Wenn du fertig bist,", ["ruf", "mich", "an."], "The command’s verb is first in the main clause."),
      arrange("Ich weiß,", ["dass", "der Zug", "pünktlich ist."], "ist is last."),
      arrange("Nachdem wir gegessen hatten,", ["gingen", "wir", "los."], "hatten ends the nachdem-clause."),
      arrange("Sie bleibt,", ["damit", "du", "alles verstehst."], "verstehst ends the purpose clause."),
    ]),
    workshop("tekamolo", "TEKAMOLO", "B1/B2", "Time, then cause, then manner, then place.", [
      arrange("Sie fährt", ["morgen", "wegen des Termins", "mit dem Zug", "nach Erfurt."], "temporal, kausal, modal, lokal."),
      arrange("Ich fahre", ["heute", "wegen des Streiks", "mit dem Rad", "ins Büro."], "Same order."),
      arrange("Wir treffen uns", ["um acht", "wegen des Lärms", "leise", "im Hof."], "Clock time, cause, manner, place."),
      arrange("Er fliegt", ["nächste Woche", "wegen einer Konferenz", "allein", "nach Lissabon."], "Place is last."),
      arrange("Lena kommt", ["am Freitag", "wegen des Wetters", "mit dem ICE", "nach Köln."], "am Freitag is one time phrase."),
      arrange("Heute Abend kommt", ["Yusuf", "wegen der Probe", "mit Mina", "ins Theater."], "The time is already in first position, so the verb kommt is second and Yusuf follows it."),
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
    workshop("bauen", "Build the sentence", "B2", "Use neutral order: verb second, dative before accusative, then TEKAMOLO.", [
      transform("Build one sentence.", "Lena / fahren / morgen / nach Köln / wegen eines Termins / mit dem ICE", ["Lena fährt morgen wegen eines Termins mit dem ICE nach Köln."], "Time, cause, manner, place."),
      transform("Two objects.", "die Ärztin / geben / das Rezept / der Patient", ["Die Ärztin gibt dem Patienten das Rezept."], "Dative before accusative."),
      transform("Front the time.", "wir / beginnen / der Kurs / morgen", ["Morgen beginnt der Kurs.", "Morgen beginnen wir den Kurs."], "Either the time or a corrected subject can be first. The verb stays second."),
      transform("Negate only the place.", "ich / fliegen / nach Wien / nicht, sondern nach Graz", ["Ich fliege nicht nach Wien, sondern nach Graz."], "nicht stands directly before the contrasted phrase."),
    ]),
    workshop("luecke", "The missing piece", "B2", "One slot is empty. The rest of the order is already right.", [
      choice("We are waiting for the train.", ["Wir warten auf den Zug.", "Wir warten für den Zug.", "Wir warten mit dem Zug.", "Wir warten zu den Zug."], 0, "warten auf."),
      cloze("Dative person.", "Sie gibt {dem} Kunden die Quittung.", "dem Kunden."),
      cloze("Verb second after a fronted object.", "Den Bericht {schicke} ich heute.", "schicke is position 2."),
      cloze("Subordinate verb.", "Ich weiß, dass du heute {anrufst}.", "The finite verb ends the dass-clause."),
      cloze("nicht before the prefix.", "Ich rufe dich nicht {an}.", "Sentence negation sits before the separable prefix."),
      choice("Only one constituent before the verb.", ["Heute Abend kommt Mina.", "Heute Mina kommt Abend.", "Kommt heute Abend Mina.", "Mina heute kommt."], 0, "Heute Abend is a single time phrase. The verb-first line is a question."),
    ]),
  ],
  temporal: [
    workshop("ordnen", "als, wenn, nachdem, bevor, bis", "B1/B2", "These conjunctions send the verb to the end. nachdem wants a completed tense.", [
      arrange("Als ich ankam,", ["regnete", "es."], "One past event: als. The main clause begins with the verb."),
      arrange("Wenn der Wecker klingelt,", ["stehe", "ich", "auf."], "A repeated time is wenn."),
      arrange("Nachdem sie gegessen hatten,", ["gingen", "sie", "los."], "hatten ends the nachdem-clause."),
      arrange("Bevor sie unterschreibt,", ["liest", "sie", "den Vertrag."], "bevor introduces the later action."),
      arrange("Warte hier,", ["bis", "ich", "zurückkomme."], "zurückkomme is one word at the end."),
      arrange("Während du telefonierst,", ["suche", "ich", "die Adresse."], "während + clause, verb last."),
    ]),
    workshop("umformen", "Clause or preposition", "B1/B2", "bevor ↔ vor + dative. nachdem ↔ nach + dative.", [
      transform("Use bevor.", "Zuerst liest sie den Vertrag. Dann unterschreibt sie.", ["Bevor sie unterschreibt, liest sie den Vertrag.", "Sie liest den Vertrag, bevor sie unterschreibt."], "bevor + the later action."),
      transform("Use vor + noun.", "Bevor die Gäste ankommen, lüfte ich.", ["Vor der Ankunft der Gäste lüfte ich.", "Ich lüfte vor der Ankunft der Gäste."], "ankommen → die Ankunft, dative der Ankunft."),
      choice("A single visit in 2019.", ["Als ich 2019 in Köln war, lernte ich Elena kennen.", "Wenn ich 2019 in Köln war, lernte ich Elena kennen.", "Nachdem ich 2019 in Köln bin, lernte ich sie kennen.", "Bis ich 2019 in Köln war, lernte ich sie kennen."], 0, "One completed past event → als."),
      choice("nachdem and tense.", ["Nachdem er das Buch gelesen hat, gibt er es zurück.", "Nachdem er das Buch liest, gibt er es zurück.", "Nachdem liest er das Buch, gibt er es zurück.", "Nachdem er das Buch gelesen, gibt er es zurück."], 0, "The nachdem-clause is already complete."),
      cloze("Simultaneous conjunction.", "{Während} du telefonierst, suche ich die Adresse.", "während + clause."),
      sort("Which connector fits?", ["als", "wenn", "nachdem", "bis"], [
        { text: "one evening in 2014", bucket: 0 },
        { text: "every evening", bucket: 1 },
        { text: "only once the work is finished", bucket: 2 },
        { text: "up to an endpoint", bucket: 3 },
      ]),
    ]),
  ],
  trennbar: [
    workshop("ordnen", "Prefix at the end, or back with the verb", "B1/B2", "In a main clause the prefix closes the sentence. In a subordinate clause, the perfect, and a zu-infinitive, it rejoins the verb.", [
      arrange("Ich stehe", ["um sechs", "auf."], "auf is last."),
      arrange("Hast du", ["schon", "eingekauft?"], "ge sits inside the participle."),
      arrange("Vergiss nicht,", ["die Tür", "abzuschließen."], "zu splits the separable verb."),
      arrange("Nora hat", ["das Meeting", "vorbereitet."], "vorbereitet is one word."),
      arrange("Weil er um sechs", ["aufsteht,", "verpasst er", "nie den Bus."], "In the weil-clause the prefix rejoins the verb, and that whole clause is first."),
      arrange("Ruf", ["mich", "später", "an."], "Imperative: prefix at the end."),
    ]),
    workshop("sortieren", "Separable or inseparable", "B1/B2", "A stressed prefix separates. be-, emp-, ent-, er-, ver-, zer- do not.", [
      sort("Separable or not?", ["Separable", "Inseparable"], [
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
    workshop("ordnen", "Verb and its prepositional object", "B1/B2", poNote, [
      arrange("Wir warten", ["schon lange", "auf den Bus."], "warten auf + accusative, last."),
      arrange("Ich freue mich", ["sehr", "auf das Wochenende."], "Future-facing joy uses auf."),
      arrange("Sie freut sich", ["wirklich", "über das Geschenk."], "A fact that is already true uses über."),
      arrange("Er beschwert sich", ["bei der Leitung", "über die Frist."], "bei a person, über a thing."),
      arrange("Wir rechnen", ["fest", "damit,", "dass der Zug pünktlich ist."], "damit announces the dass-clause and stays at the end of the main clause."),
      arrange("Denkst du", ["noch", "daran?"], "A thing already mentioned: daran, not an es."),
      arrange("Sie träumt", ["seit Jahren", "davon,", "in Lissabon zu leben."], "davon points forward to the infinitive clause."),
      arrange("Worauf", ["wartet", "ihr", "eigentlich?"], "The question word Worauf can stand first. The verb is second."),
    ]),
    workshop("paare", "The fixed preposition", "B1/B2", "Learn the pair. People stay as personal pronouns. Things become da- or wo- words.", [
      choice("A person.", ["Ich denke an sie.", "Ich denke daran.", "Ich denke über sie.", "Ich denke mit sie."], 0, "denken an + a personal pronoun for a person."),
      choice("The preferred question.", ["Worauf wartest du?", "Woauf wartest du?", "Anwas wartest du?", "Wartest auf du?"], 0, "wo- + auf = Worauf."),
      cloze("A thing.", "Die Frist ist kurz. Denkst du {daran}?", "an + vowel → daran."),
      cloze("Looking ahead, then a clause.", "Ich freue mich {darauf}, euch zu sehen.", "auf → darauf."),
      transform("Replace the thing.", "Sie beschwert sich über den Lärm.", ["Sie beschwert sich darüber."], "darüber."),
      sort("Which preposition belongs to the verb?", ["auf", "über", "mit", "für"], [
        { text: "warten", bucket: 0 },
        { text: "sich beschweren about a thing", bucket: 1 },
        { text: "aufhören", bucket: 2 },
        { text: "sich interessieren", bucket: 3 },
        { text: "sich freuen, looking ahead", bucket: 0 },
        { text: "sprechen about a topic", bucket: 1 },
      ]),
    ]),
  ],
  vergangenheit: [
    workshop("ordnen", "Präteritum and Plusquamperfekt", "B1/B2", "The simple past is the story tense. The past before that past uses hatte or war plus the participle.", [
      arrange("Er öffnete", ["die Tür", "und sah", "niemanden."], "Two simple-past verbs in a narrative."),
      arrange("Nachdem er gegessen hatte,", ["ging", "er", "nach Hause."], "hatte ends the nachdem-clause."),
      arrange("Sie musste", ["gehen,", "obwohl sie", "bleiben wollte."], "Modals drop the umlaut: musste, wollte."),
      arrange("Ich sah", ["das Schild", "zu spät."], "sehen → sah."),
      arrange("Wir kamen", ["erst", "an,", "als der Film schon begonnen hatte."], "The later event is kamen an. The earlier one is Plusquamperfekt."),
      arrange("Nachdem sie den Schlüssel verloren hatte,", ["rief", "sie", "an."], "verlieren takes hatte."),
    ]),
    workshop("wahl", "Which past?", "B1/B2", "Speech prefers the Perfekt for ordinary verbs, and war or hatte for sein and haben. Narration prefers the Präteritum.", [
      choice("Telling a friend about yesterday.", ["Ich habe eingekauft.", "Ich einkaufte gestern.", "Ich war eingekauft.", "Ich habe einkaufen gehabt."], 0, "Everyday verbs prefer the Perfekt in speech."),
      choice("A description with sein.", ["Gestern war ich krank.", "Gestern bin ich krank gewesen.", "Gestern hatte ich krank.", "Gestern warst ich krank."], 0, "war is the spoken past of sein. ist gewesen is possible and uncommon."),
      cloze("Regular past.", "Er {arbeitete} bis spät.", "arbeiten inserts e: arbeitete."),
      cloze("Modal without umlaut.", "Wir {mussten} den Termin verschieben.", "müssen → musste."),
      transform("Make the earlier event Plusquamperfekt.", "Zuerst verlor sie den Schlüssel. Dann rief sie an.", ["Nachdem sie den Schlüssel verloren hatte, rief sie an."], "hatte verloren, then rief an."),
      sort("Spoken default?", ["Usually Präteritum", "Usually Perfekt"], [
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
    workshop("ordnen", "lassen and a bare infinitive", "B2", "No zu. In the perfect, a dependent infinitive keeps lassen as an infinitive.", [
      arrange("Ich lasse", ["das Fahrrad", "reparieren."], "Someone else does the work."),
      arrange("Wir lassen", ["die Fotos", "noch heute", "abziehen."], "The infinitive closes the sentence."),
      arrange("Der Deckel lässt", ["sich", "leicht", "abnehmen."], "sich lassen = can be done."),
      arrange("Nora hat", ["die Rechnung", "prüfen", "lassen."], "Double infinitive in the perfect."),
      arrange("Sie hat", ["die Tasche", "zu Hause", "gelassen."], "No second verb, so the participle is gelassen."),
      arrange("Seine Eltern lassen", ["ihn", "allein", "verreisen."], "Permission: lassen + infinitive."),
    ]),
  ],
  rede: [
    workshop("ordnen", "Reported statements, questions, and commands", "B2", "Konjunktiv I for the quote. ob or the question word stays, and the verb ends the clause.", [
      arrange("Er sagt,", ["er", "sei", "krank."], "sei is Konjunktiv I of sein."),
      arrange("Sie sagt,", ["sie", "habe", "den Schlüssel verloren."], "A past quote: habe + participle."),
      arrange("Sie sagen,", ["sie", "kämen", "später."], "kämen replaces an ambiguous kommen."),
      arrange("Sie fragt,", ["ob", "er", "mitkomme."], "ob, verb last."),
      arrange("Er fragt,", ["wo", "sie", "wohne."], "wohne is Konjunktiv I."),
      arrange("Der Arzt sagt,", ["der Patient", "solle", "liegen bleiben."], "A command becomes solle + infinitive."),
    ]),
    workshop("formen", "sei, habe, or Konjunktiv II", "B2", "Use Konjunktiv II only when Konjunktiv I would look like the indicative.", [
      choice("Formal report of „Ich bin krank.“", ["Er sagt, er sei krank.", "Er sagt, er ist krank.", "Er sagt, er wäre krank gewesen.", "Er sagt, dass er sei krank ist."], 0, "sei is Konjunktiv I."),
      choice("Konjunktiv I of haben, er.", ["habe", "hätte", "hat", "hatte"], 0, "habe, not hätte."),
      transform("Report the past statement. Start with Er sagt,", "„Ich habe den Schlüssel verloren.“", ["Er sagt, er habe den Schlüssel verloren.", "Er sagt, dass er den Schlüssel verloren habe."], "habe + participle."),
      transform("Avoid the ambiguous plural.", "„Wir kommen später.“", ["Sie sagen, sie kämen später."], "kämen is unmistakably reported."),
      cloze("A reported command.", "Der Arzt sagt, der Patient {solle} liegen bleiben.", "solle + infinitive."),
      cloze("Konjunktiv I of sein.", "Lea sagt, sie {sei} fertig.", "sei."),
    ]),
  ],
  negation: [
    workshop("ordnen", "Where nicht stands", "B2", "nicht sits immediately before the piece it cancels. Before a separable prefix, that place is just in front of the prefix.", [
      arrange("Sie kommt", ["heute", "nicht", "mit."], "nicht before the prefix."),
      arrange("Ich fliege", ["nicht nach Wien,", "sondern", "nach Graz."], "nicht before the contrasted destination."),
      arrange("Wir haben", ["heute", "keine", "Sitzung."], "A bare noun takes kein, not nicht."),
      arrange("Das ist", ["nicht", "das", "Problem."], "A definite noun takes nicht."),
      arrange("Mach", ["das Licht", "nicht", "aus."], "nicht before the prefix in a command."),
      arrange("Nicht Jonas", ["hat angerufen,", "sondern", "Mina."], "The contrasted subject can stand first, nicht included."),
    ]),
    workshop("kein", "kein or nicht", "B2", "kein replaces ein or a missing article. nicht negates everything else.", [
      choice("Indefinite noun.", ["Wir haben heute keine Sitzung.", "Wir haben heute nicht Sitzung.", "Wir haben heute nichts Sitzung.", "Wir haben heute nicht keine Sitzung."], 0, "keine."),
      choice("Definite noun.", ["Das ist nicht das Problem.", "Das ist kein das Problem.", "Das ist keine das Problem.", "Das ist nicht kein Problem."], 0, "nicht, because das is already there."),
      cloze("Accusative masculine.", "Er hat {keinen} Ausweis dabei.", "einen → keinen."),
      transform("Negate the indefinite object.", "Lea hat einen Hund.", ["Lea hat keinen Hund."], "ein → kein."),
      transform("Negate only the time.", "Wir reisen am Montag ab.", ["Wir reisen nicht am Montag ab."], "nicht before am Montag. The prefix still closes the sentence."),
      sort("kein or nicht?", ["kein", "nicht"], [
        { text: "Ich trinke ___ Kaffee.", bucket: 0 },
        { text: "Ich trinke ___ den Kaffee.", bucket: 1 },
        { text: "Das war ___ freundlich.", bucket: 1 },
        { text: "Wir haben ___ Glück.", bucket: 0 },
        { text: "Sie ist ___ meine Schwester.", bucket: 1 },
      ]),
    ]),
  ],
  "modal-satz": [
    workshop("indem", "indem and dadurch, dass", "B2", "indem answers Wie? The verb ends the clause. dadurch, dass does the same job.", [
      arrange("Sie bleibt fit,", ["indem", "sie", "täglich", "läuft."], "läuft ends the method clause."),
      arrange("Du öffnest die Datei,", ["indem", "du", "doppelt", "klickst."], "klickst is last."),
      arrange("Man spart Strom,", ["indem", "man das Licht", "ausmacht."], "ausmacht reunites at the end."),
      arrange("Sie überzeugt ihn dadurch,", ["dass", "sie", "Zahlen", "zeigt."], "dass-clause, verb last."),
      arrange("Er geht,", ["ohne", "sich", "zu verabschieden."], "Same subject: ohne … zu. ohne already negates."),
      arrange("Sie half mir,", ["ohne dass", "ich", "gefragt hatte."], "Different subject: ohne dass."),
    ]),
    workshop("durch", "Clause or durch + noun", "B2", "indem + clause ↔ durch + noun.", [
      transform("Use durch + noun.", "Er löst das Problem, indem er den Kontext erklärt.", ["Er löst das Problem durch die Erklärung des Kontexts."], "erklären → die Erklärung. durch takes the accusative."),
      transform("Use ohne … zu.", "Sie unterbricht. Sie entschuldigt sich nicht.", ["Sie unterbricht, ohne sich zu entschuldigen."], "ohne carries the negation."),
      choice("The clause answers Wie?", ["Sie bleibt fit, indem sie täglich läuft.", "Sie bleibt fit, damit sie täglich läuft.", "Sie bleibt fit, indem läuft sie täglich.", "Sie bleibt fit, seitdem sie täglich läuft."], 0, "indem + verb at the end. seitdem would be time, and its verb would also be final."),
      cloze("The announcing adverb.", "Man erkennt den Akzent {dadurch}, dass die Vokale länger sind.", "dadurch, dass."),
      sort("Method, purpose, or time?", ["Method", "Purpose", "Time"], [
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
    workshop("ordnen", "The chunk is one predicate", "B2", "The noun carries the meaning. The little verb is in second position, and the rest of the chunk closes the sentence.", [
      arrange("Er bringt", ["den Vorschlag", "zur Sprache."], "zur Sprache bringen."),
      arrange("Wir nehmen", ["die höheren Kosten", "in Kauf."], "in Kauf nehmen."),
      arrange("Die Daten stehen", ["Ihnen", "online", "zur Verfügung."], "zur Verfügung stehen."),
      arrange("Das kommt", ["nicht", "in Frage."], "in Frage kommen."),
      arrange("Die Opposition übt", ["Kritik", "am Plan."], "Kritik üben an + dative."),
      arrange("Sag", ["mir", "bitte", "Bescheid."], "Bescheid sagen."),
    ]),
    workshop("verbal", "Back to a simple verb", "B2", "The light verb disappears. The noun becomes the verb. Keep the objects.", [
      transform("Verbalize.", "Das Komitee trifft eine Entscheidung über den Etat.", ["Das Komitee entscheidet über den Etat."], "eine Entscheidung treffen → entscheiden."),
      transform("Use the chunk for kritisieren.", "Die Opposition kritisiert den Plan.", ["Die Opposition übt Kritik am Plan.", "Die Opposition übt Kritik an dem Plan."], "Kritik üben an + dative."),
      choice("Raise a topic.", ["Er bringt den Vorschlag zur Sprache.", "Er bringt den Vorschlag zur sprechen.", "Er spricht den Vorschlag zur Sprache bringen.", "Er nimmt den Vorschlag zur Sprache."], 0, "zur Sprache bringen."),
      cloze("in Kauf nehmen.", "Wir nehmen die höheren Kosten in {Kauf}.", "Kauf is a bare noun in this chunk."),
      sort("Match the chunk to the simple verb.", ["entscheiden", "verfügbar sein", "erwähnen", "akzeptieren"], [
        { text: "eine Entscheidung treffen", bucket: 0 },
        { text: "zur Verfügung stehen", bucket: 1 },
        { text: "zur Sprache bringen", bucket: 2 },
        { text: "in Kauf nehmen", bucket: 3 },
      ]),
    ]),
  ],
  partizip: [
    workshop("bilden", "Partizip I or Partizip II", "B2", "Partizip I: the noun does the action, at the same time. Transitive Partizip II: the noun receives the action.", [
      choice("The child is laughing.", ["das lachende Kind", "das gelachte Kind", "das lachen Kind", "das gelachende Kind"], 0, "Partizip I + ending."),
      choice("The book receives the action.", ["das gelesene Buch", "das lesende Buch", "das gelesen Buch", "das lesenes Buch"], 0, "Weak ending after das: gelesene."),
      cloze("Partizip I after dem.", "Ich danke dem {zuhörenden} Publikum.", "zuhörend + -en."),
      cloze("Extended Partizip I.", "Die am Nebentisch {sitzende} Frau liest.", "sitzend + -e after die."),
      sort("Active and simultaneous, or passive and finished?", ["Partizip I", "Partizip II"], [
        { text: "der schlafende Hund", bucket: 0 },
        { text: "der gefütterte Hund", bucket: 1 },
        { text: "eine überraschende Nachricht", bucket: 0 },
        { text: "eine gedruckte Nachricht", bucket: 1 },
      ]),
    ]),
    workshop("relativ", "Participle to relative clause, and back", "B2", "Partizip I becomes an active clause. Transitive Partizip II becomes a passive clause.", [
      transform("Present, active.", "Der an der Tür wartende Mann heißt Samir.", ["Der Mann, der an der Tür wartet, heißt Samir."], "wartend → wartet."),
      transform("Passive relative.", "Die von Elena korrigierte Fassung ist kürzer.", ["Die Fassung, die von Elena korrigiert wurde, ist kürzer."], "korrigiert → die korrigiert wurde."),
      transform("Compress to a participle.", "Die Frau, die am Nebentisch sitzt, liest.", ["Die am Nebentisch sitzende Frau liest."], "sitzt → sitzende."),
      transform("Compress a passive relative.", "Der Text, den Mina geschrieben hat, ist kurz.", ["Der von Mina geschriebene Text ist kurz."], "geschrieben carries the passive. von Mina stays in front."),
      arrange("Der am Fenster", ["lesende", "Junge", "heißt Jonas."], "The extra information stands in front of the participle."),
      arrange("Die in Bonn", ["gedruckte", "Ausgabe", "ist teurer."], "Partizip II plus the weak ending."),
    ]),
  ],
  genitiv: [
    workshop("ordnen", "The genitive phrase", "B2/C1", "des or der, and -s or -es on masculine and neuter nouns. The phrase usually follows the noun it describes.", [
      arrange("das Dach", ["des", "Hauses"], "des + Haus + es."),
      arrange("die Adresse", ["der", "Kollegin"], "Feminine genitive: der, no extra -s."),
      arrange("Minas", ["Entwurf", "hat gewonnen."], "A name can stand first, with -s and no article."),
      arrange("Wegen", ["des Lärms", "schließen wir", "das Fenster."], "wegen + genitive. The phrase is first, so the verb follows."),
      arrange("Während", ["der Sitzung", "klingelt", "kein Telefon."], "während + feminine genitive."),
      arrange("die Entscheidung", ["des", "Komitees"], "des Komitees, not von dem Komitee, in writing."),
    ]),
    workshop("formen", "Articles and endings", "B2/C1", "Masculine and neuter take des plus -s/-es. Feminine and plural take der and no ending on a regular noun.", [
      choice("One-syllable neuter.", ["das Dach des Hauses", "das Dach des Haus", "das Dach der Hauses", "das Dach des Hauseses"], 0, "des Hauses."),
      cloze("Feminine.", "Die Adresse {der} Kollegin steht unten.", "der, no -s on Kollegin."),
      cloze("A name.", "{Minas} Entwurf hat gewonnen.", "Name + s."),
      transform("Replace von.", "Die Entscheidung von dem Komitee überrascht mich.", ["Die Entscheidung des Komitees überrascht mich."], "des Komitees."),
      choice("trotz in writing.", ["trotz des Lärms", "trotz dem Lärm", "trotz den Lärm", "trotz der Lärm"], 0, "trotz + genitive. Lärm is masculine."),
      sort("des or der?", ["des", "der"], [
        { text: "___ Kindes", bucket: 0 },
        { text: "___ Mutter", bucket: 1 },
        { text: "___ Buches", bucket: 0 },
        { text: "___ Städte", bucket: 1 },
        { text: "___ Autors", bucket: 0 },
      ]),
    ]),
  ],
  nominal: [
    workshop("umformen", "Clause to noun, and back", "B2/C1", "The preposition carries the relation. The new noun still takes that preposition’s case.", [
      transform("Cause, with wegen.", "Weil der Flug verspätet ist, verpassen wir den Anschluss.", ["Wegen der Verspätung des Fluges verpassen wir den Anschluss.", "Wegen der Verspätung des Flugs verpassen wir den Anschluss."], "Feminine genitive der Verspätung."),
      transform("Expand aufgrund.", "Aufgrund des Streiks fällt das Seminar aus.", ["Weil gestreikt wird, fällt das Seminar aus.", "Das Seminar fällt aus, weil gestreikt wird."], "aufgrund returns to weil."),
      transform("Purpose as a noun.", "Man sperrt die Straße, damit man sie reparieren kann.", ["Man sperrt die Straße zur Reparatur.", "Die Straße wird zur Reparatur gesperrt."], "zur Reparatur."),
      choice("An -ung noun.", ["die Erklärung", "die Erklären", "das Erklärung", "der Erklären"], 0, "-ung nouns are feminine."),
      cloze("Nominalized infinitive.", "Langes {Warten} macht ungeduldig.", "das Warten, capitalized."),
      sort("Which preposition replaces the conjunction?", ["wegen", "trotz", "nach", "bei"], [
        { text: "weil", bucket: 0 },
        { text: "obwohl", bucket: 1 },
        { text: "nachdem", bucket: 2 },
        { text: "wenn", bucket: 3 },
      ]),
    ]),
  ],
  substantive: [
    workshop("n", "n-declension", "B2/C1", "Masculine people in this group add -n or -en in every case except the nominative singular.", [
      arrange("Wir suchen", ["den neuen", "Kollegen."], "der Kollege → den Kollegen."),
      arrange("Ich helfe", ["dem", "Studenten."], "helfen + dative, n-declension."),
      arrange("Das Büro", ["des", "Präsidenten", "ist im ersten Stock."], "des Präsidenten, not des Präsidentens."),
      arrange("Haben Sie", ["den", "Herrn", "gesehen?"], "der Herr → den Herrn."),
      arrange("Sie dankt", ["dem", "Kunden."], "dem Kunden."),
      arrange("Die Frage", ["des", "Menschen", "bleibt offen."], "des Menschen."),
    ]),
    workshop("plural", "Dative plural -n", "B2/C1", "Add -n in the dative plural unless the plural already ends in -n or -s.", [
      choice("Kinder.", ["mit den Kindern", "mit den Kinder", "mit den Kinders", "mit den Kinden"], 0, "Kindern."),
      cloze("Accusative singular, n-declension.", "Wir suchen {den} neuen Kollegen.", "den Kollegen."),
      cloze("Genitive singular.", "Das Büro des {Präsidenten} ist oben.", "-en, not -ens."),
      transform("Dative singular.", "Der Student hilft mir.", ["Ich helfe dem Studenten."], "dem Studenten."),
      choice("Which noun is not n-declension?", ["der Tisch", "der Mensch", "der Kunde", "der Herr"], 0, "den Tisch, not den Tischen, in the singular."),
      sort("Does the dative plural add -n?", ["Adds -n", "Already complete"], [
        { text: "die Tische", bucket: 0 },
        { text: "die Frauen", bucket: 1 },
        { text: "die Autos", bucket: 1 },
        { text: "die Bücher", bucket: 0 },
      ]),
    ]),
  ],
  es: [
    workshop("ordnen", "The es that must stay, and the es that only holds the first place", "C1", "Weather, es gibt, and es handelt sich um never drop es. An introductory es disappears when something else is fronted.", [
      arrange("Heute", ["regnet", "es."], "Weather es moves behind the verb. It does not disappear."),
      arrange("In Hamburg gibt", ["es", "zwei", "Bibliotheken."], "es gibt never drops es."),
      arrange("Morgen handelt", ["es sich", "um denselben Fall."], "sich handeln um keeps es."),
      arrange("Im Flur warten", ["drei", "Gäste."], "The introductory es is gone once the place is first. The real subject is drei Gäste."),
      arrange("Ich finde", ["es gut,", "dass du", "ehrlich bist."], "es points forward to the dass-clause."),
      arrange("Es kommen", ["heute", "drei", "Bands."], "This es only fills position 1. Heute kommen drei Bands drops it."),
    ]),
    workshop("pflicht", "Must it stay?", "C1", "If you can front another element and the sentence still has its real subject, the es was only introductory.", [
      transform("Front the place and drop es.", "Es warten drei Gäste im Flur.", ["Im Flur warten drei Gäste."], "drei Gäste is the real subject."),
      transform("Keep es. Front morgen.", "Es handelt sich morgen um denselben Fall.", ["Morgen handelt es sich um denselben Fall."], "This es is obligatory."),
      choice("Front a time word with weather.", ["Heute regnet es.", "Heute regnet.", "Heute es regnet.", "Es heute regnet."], 0, "regnet es."),
      cloze("es gibt.", "Bei uns {gibt} es keinen Aufzug.", "gibt es."),
      sort("Can this es disappear when another element is fronted?", ["Must stay", "Introductory, can go"], [
        { text: "Es schneit.", bucket: 0 },
        { text: "Es gibt ein Problem.", bucket: 0 },
        { text: "Es sitzen zwei Katzen auf dem Dach.", bucket: 1 },
        { text: "Es kommt auf die Formulierung an.", bucket: 0 },
        { text: "Es stand ein Koffer im Gang.", bucket: 1 },
      ]),
    ]),
  ],
  subjektiv: [
    workshop("ordnen", "Guess, rumor, or claim", "C1", "The modal is in second position. A past guess ends with the participle plus haben or sein.", [
      arrange("Sie muss", ["die Mail", "schon", "gelesen haben."], "Strong inference about the past."),
      arrange("Er soll", ["der neue", "Chef", "sein."], "sollen = other people say so."),
      arrange("Er will", ["schon zweimal", "gewonnen", "haben."], "His own claim about the past."),
      arrange("Der Zug dürfte", ["gleich", "kommen."], "dürfte is a careful probably."),
      arrange("Das kann", ["auch", "Zufall", "sein."], "können marks an open possibility."),
      arrange("Sie soll", ["den Vertrag", "schon", "unterschrieben haben."], "Hearsay about the past: soll + participle + haben."),
    ]),
    workshop("lesen", "What the modal signals", "C1", "müssen is your conclusion. sollen is a rumor. wollen is the subject’s own claim. dürfte is softer than müssen.", [
      choice("You are sure from the evidence.", ["Sie muss die Mail schon gelesen haben.", "Sie soll die Mail schon gelesen haben.", "Sie will die Mail schon gelesen haben.", "Sie möchte die Mail schon gelesen haben."], 0, "müssen + perfect infinitive."),
      choice("You are repeating a rumor.", ["Er soll der neue Chef sein.", "Er muss der neue Chef sein.", "Er will der neue Chef sein.", "Er dürfte der neue Chef werden müssen."], 0, "sollen = hearsay."),
      choice("He claims this about himself.", ["Er will schon zweimal gewonnen haben.", "Er soll schon zweimal gewonnen haben.", "Er muss schon zweimal gewonnen haben.", "Er darf schon zweimal gewonnen haben."], 0, "wollen."),
      cloze("A cautious probably.", "Der Zug {dürfte} gleich kommen.", "dürfte."),
      transform("Mark a strong conclusion.", "Elena ist schon weg. Ich bin mir sehr sicher.", ["Elena muss schon weg sein.", "Elena muss schon gegangen sein."], "müssen + infinitive."),
      sort("What does the modal signal?", ["Strong inference", "Hearsay", "Own claim", "Possibility"], [
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
