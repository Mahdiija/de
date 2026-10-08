export const structures = [
  {
    id: "bibliothek",
    title: "The night library",
    de: "Die Nachtbibliothek",
    level: "C1",
    intro:
      "A short report, then the kind of rewrite the DSH asks for in wissenschaftssprachliche Strukturen. Several wordings can be right. Punctuation and word order count; a missing comma in the middle of a clause does not.",
    tasks: [
      {
        instruction: "Turn the relative clause into a participle phrase.",
        source: "Die Bibliothek, die bis Mitternacht geöffnet ist, liegt am Fluss.",
        answers: ["Die bis Mitternacht geöffnete Bibliothek liegt am Fluss."],
        why: "geöffnet ist becomes the Partizip II geöffnet, with the time phrase in front and a weak ending after die.",
      },
      {
        instruction: "Active to present passive. You may leave the agent out.",
        source: "Die Stadt finanziert die langen Öffnungszeiten.",
        answers: [
          "Die langen Öffnungszeiten werden finanziert.",
          "Die langen Öffnungszeiten werden von der Stadt finanziert.",
        ],
        why: "The accusative object becomes the subject. werden agrees with the plural.",
      },
      {
        instruction: "Replace weil with wegen and a genitive noun.",
        source: "Weil die Nachfrage steigt, stellt die Bibliothek mehr Personal ein.",
        answers: [
          "Wegen der steigenden Nachfrage stellt die Bibliothek mehr Personal ein.",
          "Die Bibliothek stellt wegen der steigenden Nachfrage mehr Personal ein.",
        ],
        why: "die Nachfrage, feminine genitive der Nachfrage. The participle steigend takes a weak ending.",
      },
      {
        instruction: "Same subject. Use um … zu.",
        source: "Studierende bleiben länger. Sie wollen die Ruhe nutzen.",
        answers: ["Studierende bleiben länger, um die Ruhe zu nutzen."],
        why: "One subject group, so um … zu replaces wollen.",
      },
      {
        instruction: "Turn the participle phrase back into a relative clause.",
        source: "Die am Nebentisch lesenden Gäste flüstern kaum.",
        answers: ["Die Gäste, die am Nebentisch lesen, flüstern kaum."],
        why: "Partizip I lesend is active and simultaneous, so the relative clause uses the present.",
      },
    ],
  },
  {
    id: "linie",
    title: "The new tram line",
    de: "Die neue Linie",
    level: "C1",
    intro:
      "Same workshop, second text. Methods, time, and the passive perfect are the points.",
    tasks: [
      {
        instruction: "Express the method with indem.",
        source: "Die Stadt verkürzt den Weg. Sie legt die Schienen durch den Park.",
        answers: [
          "Die Stadt verkürzt den Weg, indem sie die Schienen durch den Park legt.",
        ],
        why: "indem introduces how. The finite verb legt closes the clause.",
      },
      {
        instruction: "Compress the method into durch + noun.",
        source: "Man gewinnt Zeit, indem man umsteigt.",
        answers: ["Man gewinnt Zeit durch das Umsteigen.", "Durch das Umsteigen gewinnt man Zeit."],
        why: "The nominalized infinitive is neuter: das Umsteigen. durch takes the accusative.",
      },
      {
        instruction: "Perfect passive. The work is already finished.",
        source: "Die Firma hat die Haltestellen renoviert.",
        answers: [
          "Die Haltestellen sind renoviert worden.",
          "Die Haltestellen sind von der Firma renoviert worden.",
        ],
        why: "Perfekt Vorgangspassiv: sind + Partizip II + worden.",
      },
      {
        instruction: "Use bevor. The renovation happens first.",
        source: "Zuerst renoviert die Firma die Haltestellen. Dann fährt die Linie.",
        answers: [
          "Bevor die Linie fährt, renoviert die Firma die Haltestellen.",
          "Die Firma renoviert die Haltestellen, bevor die Linie fährt.",
        ],
        why: "bevor introduces the later event, and its verb goes to the end.",
      },
      {
        instruction: "Replace the time clause with vor + noun.",
        source: "Bevor die Linie eröffnet wird, testet man die Wagen.",
        answers: [
          "Vor der Eröffnung der Linie testet man die Wagen.",
          "Man testet die Wagen vor der Eröffnung der Linie.",
        ],
        why: "eröffnet werden becomes die Eröffnung. vor takes the dative: der Eröffnung.",
      },
    ],
  },
];
