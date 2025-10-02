// Demo response data for prototype
export const DEMO_RESPONSE = {
  question: "What is photosynthesis?",
  
  flowchart: {
    definition: "Photosynthesis is the process by which green plants prepare their own food using carbon dioxide and water in the presence of sunlight and chlorophyll. It is the most important biological process on Earth as it provides food and oxygen to all living organisms.",
    
    steps: [
      {
        title: "Sunlight Absorption",
        text: "Chlorophyll present in the chloroplasts of plant cells absorbs sunlight energy. This light energy is converted into chemical energy.",
        color: "blue",
        icon: "☀️"
      },
      {
        title: "Carbon Dioxide Intake",
        text: "Carbon dioxide (CO₂) from the atmosphere enters the plant through tiny pores called stomata present on the surface of leaves.",
        color: "green",
        icon: "🌬️"
      },
      {
        title: "Water Absorption",
        text: "Roots absorb water (H₂O) from the soil along with minerals. This water is transported to leaves through xylem vessels.",
        color: "green",
        icon: "💧"
      },
      {
        title: "Chemical Reaction",
        text: "Inside the chloroplasts, CO₂ and H₂O combine using the absorbed light energy to produce glucose through a series of chemical reactions.",
        color: "yellow",
        icon: "⚡"
      },
      {
        title: "Glucose Production",
        text: "Glucose (C₆H₁₂O₆) is produced and stored as starch in leaves. This glucose is used by the plant as food for growth and energy.",
        color: "orange",
        icon: "🍬"
      },
      {
        title: "Oxygen Release",
        text: "Oxygen (O₂) is produced as a byproduct and released into the atmosphere through stomata. This oxygen is essential for all aerobic organisms.",
        color: "green",
        icon: "🌿"
      }
    ],
    
    formula: "6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂",
    
    example: "A plant kept in sunlight with adequate water performs photosynthesis actively and shows healthy growth with green leaves. However, a plant kept in complete darkness cannot produce food and eventually wilts and turns yellow."
  },
  
  references: {
    ncert: [
      {
        type: "ncert",
        bookName: "NCERT Science Class 10",
        pageNumber: 95,
        lineRange: "12-18",
        excerpt: "Photosynthesis is the process by which autotrophs take in substances from the outside and convert them into stored forms of energy. This material is taken in the form of carbon dioxide and water which is converted into carbohydrates in the presence of sunlight and chlorophyll...",
        imageUrl: "/demo-ncert-page.jpg"
      }
    ],
    
    books: [
      {
        type: "reference",
        bookName: "S. Chand Biology Class 10",
        pageNumber: 145,
        excerpt: "The light-dependent reactions occur in the thylakoid membranes where chlorophyll absorbs light energy and converts it to ATP and NADPH. The light-independent reactions (Calvin cycle) use these products to convert CO₂ into glucose...",
        imageUrl: "/demo-book-page.jpg"
      }
    ],
    
    youtube: [
      {
        type: "youtube",
        title: "Photosynthesis Explained - Complete Process in Hindi",
        url: "https://youtube.com/watch?v=demo123",
        thumbnail: "https://img.youtube.com/vi/demo123/mqdefault.jpg",
        channel: "Khan Academy India",
        duration: "12:45"
      },
      {
        type: "youtube",
        title: "Life Processes - Photosynthesis (CBSE Class 10)",
        url: "https://youtube.com/watch?v=demo456",
        thumbnail: "https://img.youtube.com/vi/demo456/mqdefault.jpg",
        channel: "Vedantu",
        duration: "18:30"
      }
    ],
    
    websites: [
      {
        type: "website",
        title: "Photosynthesis - Process and Importance | Byju's",
        url: "https://byjus.com/biology/photosynthesis/",
        snippet: "Photosynthesis is a process used by plants and other organisms to convert light energy into chemical energy that can later be released to fuel the organism's activities...",
        domain: "byjus.com"
      },
      {
        type: "website",
        title: "What is Photosynthesis? - Definition and Steps",
        url: "https://toppr.com/guides/biology/photosynthesis/",
        snippet: "Learn about the photosynthesis process, its stages, importance, and the factors affecting it. Complete guide with diagrams and examples...",
        domain: "toppr.com"
      }
    ]
  }
};

