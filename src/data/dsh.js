export const structures = [
  {
    id: "bibliothek",
    title: "Die Nachtbibliothek",
    de: "Die Nachtbibliothek",
    level: "C1",
    intro:
      "Ein kurzer Bericht, dann die Umformung, die die DSH bei wissenschaftssprachlichen Strukturen verlangt. Mehrere Formulierungen können richtig sein. Zeichensetzung und Wortstellung zählen; ein fehlendes Komma mitten im Teilsatz zählt nicht.",
    tasks: [
      {
        instruction: "Wandeln Sie den Relativsatz in eine Partizipialphrase um.",
        source: "Die Bibliothek, die bis Mitternacht geöffnet ist, liegt am Fluss.",
        answers: ["Die bis Mitternacht geöffnete Bibliothek liegt am Fluss."],
        why: "Der Relativsatz ist passiv und abgeschlossen, deshalb wird geöffnet ist zum Partizip II geöffnet. Die Zeitangabe bis Mitternacht steht vor dem Partizip. Nach die folgt die schwache Endung -e: geöffnete.",
      },
      {
        instruction: "Formen Sie ins Präsens des Vorgangspassivs um. Das Agens dürfen Sie weglassen.",
        source: "Die Stadt finanziert die langen Öffnungszeiten.",
        answers: [
          "Die langen Öffnungszeiten werden finanziert.",
          "Die langen Öffnungszeiten werden von der Stadt finanziert.",
        ],
        why: "Das Akkusativobjekt die langen Öffnungszeiten wird zum Subjekt. Im Präsens des Vorgangspassivs steht werden in Position 2 und richtet sich nach dem Plural: werden. Das Partizip finanziert steht am Ende.",
      },
      {
        instruction: "Ersetzen Sie weil durch wegen und ein Nomen im Genitiv.",
        source: "Weil die Nachfrage steigt, stellt die Bibliothek mehr Personal ein.",
        answers: [
          "Wegen der steigenden Nachfrage stellt die Bibliothek mehr Personal ein.",
          "Die Bibliothek stellt wegen der steigenden Nachfrage mehr Personal ein.",
        ],
        why: "weil wird zu wegen plus Genitiv. Nachfrage ist feminin, der Genitiv lautet der Nachfrage. Das Partizip I steigend nimmt nach der die schwache Endung -en: steigenden.",
      },
      {
        instruction: "Dasselbe Subjekt. Verwenden Sie um … zu.",
        source: "Studierende bleiben länger. Sie wollen die Ruhe nutzen.",
        answers: ["Studierende bleiben länger, um die Ruhe zu nutzen."],
        why: "Beide Sätze haben dasselbe Subjekt Studierende. Deshalb steht um … zu, nicht damit. Der Infinitiv zu nutzen schließt die Infinitivgruppe.",
      },
      {
        instruction: "Wandeln Sie die Partizipialphrase in einen Relativsatz zurück.",
        source: "Die am Nebentisch lesenden Gäste flüstern kaum.",
        answers: ["Die Gäste, die am Nebentisch lesen, flüstern kaum."],
        why: "lesend ist Partizip I, also aktiv und gleichzeitig. Der Relativsatz steht deshalb im Präsens. Das Relativpronomen die steht im Nominativ, das finite Verb lesen am Ende.",
      },
    ],
  },
  {
    id: "linie",
    title: "Die neue Straßenbahnlinie",
    de: "Die neue Linie",
    level: "C1",
    intro:
      "Dieselbe Übung, zweiter Text. Art und Weise, Zeit und das Perfekt des Vorgangspassivs stehen im Mittelpunkt.",
    tasks: [
      {
        instruction: "Drücken Sie die Art und Weise mit indem aus.",
        source: "Die Stadt verkürzt den Weg. Sie legt die Schienen durch den Park.",
        answers: [
          "Die Stadt verkürzt den Weg, indem sie die Schienen durch den Park legt.",
        ],
        why: "indem nennt die Art und Weise und verlangt Verbletztstellung. Das finite Verb legt schließt den Nebensatz.",
      },
      {
        instruction: "Verdichten Sie die Art und Weise zu durch plus Nomen.",
        source: "Man gewinnt Zeit, indem man umsteigt.",
        answers: ["Man gewinnt Zeit durch das Umsteigen.", "Durch das Umsteigen gewinnt man Zeit."],
        why: "umsteigen wird zum substantivierten Infinitiv, der neutrum ist: das Umsteigen. durch regiert den Akkusativ: durch das Umsteigen.",
      },
      {
        instruction: "Perfekt des Vorgangspassivs. Die Arbeit ist schon abgeschlossen.",
        source: "Die Firma hat die Haltestellen renoviert.",
        answers: [
          "Die Haltestellen sind renoviert worden.",
          "Die Haltestellen sind von der Firma renoviert worden.",
        ],
        why: "Das Perfekt des Vorgangspassivs lautet sind plus Partizip II renoviert plus worden. Das Hilfsverb richtet sich nach dem Plural. geworden wäre falsch.",
      },
      {
        instruction: "Verwenden Sie bevor. Die Renovierung geschieht zuerst.",
        source: "Zuerst renoviert die Firma die Haltestellen. Dann fährt die Linie.",
        answers: [
          "Bevor die Linie fährt, renoviert die Firma die Haltestellen.",
          "Die Firma renoviert die Haltestellen, bevor die Linie fährt.",
        ],
        why: "bevor leitet das spätere Ereignis ein, hier fährt die Linie. Das finite Verb fährt steht am Ende des Nebensatzes.",
      },
      {
        instruction: "Ersetzen Sie den Temporalsatz durch vor plus Nomen.",
        source: "Bevor die Linie eröffnet wird, testet man die Wagen.",
        answers: [
          "Vor der Eröffnung der Linie testet man die Wagen.",
          "Man testet die Wagen vor der Eröffnung der Linie.",
        ],
        why: "eröffnet werden wird zum Nomen die Eröffnung. vor regiert den Dativ. Eröffnung ist feminin: der Eröffnung.",
      },
    ],
  },
];
