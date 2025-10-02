import TermTooltip from "@/components/TermTooltip";

// Dictionary of technical terms with definitions
const termDefinitions: Record<string, string> = {
  chlorophyll: "A green pigment found in plants that absorbs sunlight to help plants make their own food. It's what makes leaves green!",
  photosynthesis: "The process by which plants use sunlight to make food from carbon dioxide and water.",
  stomata: "Tiny pores (openings) on the surface of leaves that allow gases like CO₂ and O₂ to enter and exit.",
  glucose: "A simple sugar (C₆H₁₂O₆) that plants produce during photosynthesis. It's their food/energy source.",
  chloroplasts: "Tiny structures inside plant cells where photosynthesis takes place. Think of them as the plant's 'kitchen'.",
  "carbon dioxide": "A gas (CO₂) that plants absorb from the air through stomata to use in photosynthesis.",
  oxygen: "A gas (O₂) released by plants during photosynthesis. Humans and animals need it to breathe!",
  xylem: "Tube-like structures in plants that transport water and minerals from roots to leaves.",
  "light energy": "Energy from the sun that plants capture and convert into chemical energy (food) during photosynthesis.",
  starch: "A complex carbohydrate that plants use to store glucose for later use.",
};

// Function to highlight and wrap terms with tooltip
export function highlightTerms(text: string): React.ReactNode {
  // Create a regex pattern from all terms (case-insensitive)
  const terms = Object.keys(termDefinitions);
  const pattern = new RegExp(`\\b(${terms.join("|")})\\b`, "gi");
  
  const parts = text.split(pattern);
  
  return parts.map((part, index) => {
    const lowerPart = part.toLowerCase();
    const definition = termDefinitions[lowerPart];
    
    if (definition) {
      return (
        <TermTooltip key={index} term={part} definition={definition}>
          {part}
        </TermTooltip>
      );
    }
    
    return <span key={index}>{part}</span>;
  });
}

