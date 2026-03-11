export interface Project {
  id: string;
  title: string;
  icon: string;
  path: string;
  overview: string;
  description?: string; // Add description property
  skills: { title: string; desc: string }[];
  sections: Section[];
}

export interface Section {
  title: string;
  content: string[]; // Array of paragraphs
  listItems?: string[]; // Bullet points
  imagePlaceholder?: string; // Description for the placeholder
  subSections?: Section[];
}

export const portfolioData = {
  home: {
    title: "Hello!",
    subtitle: "David Wang - Learning and Project Portfolio",
    intro: [
      "I am an Integrated Biomedical Engineering and Health Sciences student at McMaster University (iBioMed).",
      "Throughout my time in the program, I have gained hard and soft skills, collaborating with peers on various projects, managing timelines, and learning CAD and design principles."
    ],
    projects: [
      {
        id: "dp1",
        title: "Modifying an Ostomy Appliance",
        icon: "⭕",
        path: "/projects/ostomy-appliance",
        description: "Improving seal integrity and usability of ostomy bags."
      },
      {
        id: "dp2",
        title: "Designing a Hip Implant",
        icon: "🦴",
        path: "/projects/hip-implant",
        description: "Custom hip implant design for a specific patient profile."
      },
      {
        id: "dp3",
        title: "Automatic Pill Bottle Opener",
        icon: "💊",
        path: "/projects/pill-bottle-opener",
        description: "Automated pill extraction device with smart sealing."
      }
    ]
  },
  projects: [
    {
      id: "dp1",
      path: "/projects/ostomy-appliance",
      title: "Modifying an Ostomy Appliance",
      icon: "⭕",
      overview: "A modification of existing medical appliances to improve the patient experience, focusing on seal integrity and ease of use.",
      skills: [
        { title: "Autodesk Inventor and CAD", desc: "" },
        { title: "Collaboration/Interpersonal skills", desc: "" },
        { title: "3D Printing", desc: "" },
        { title: "Communication: Oral and Written", desc: "" },
        { title: "Time Management: Making and using a GANTT Chart", desc: "" },
        { title: "Technical research", desc: "" },
        { title: "Pitching and Presentation skills", desc: "" }
      ],
      sections: [
        {
          title: "Design Process",
          content: [
            "We identified patient concerns regarding seal integrity and motor skill limitations (e.g., arthritis).",
            "Our objectives were to create a device that is comfortable, easy to operate, lightweight, and durable."
          ],
          subSections: [
            {
              title: "Constraints",
              content: ["Materials must be medical-grade and cost-effective."],
              listItems: ["Must be waterproof", "Must be easy to clean"]
            },
            {
              title: "My Initial Ideas",
              content: ["Visual indicators (colors/tabs) and physical reinforcement (magnets/adhesives)."],
              imagePlaceholder: "Sketches and handwritten notes of initial concepts"
            },
            {
              title: "Prototypes",
              content: ["The 'First Major Prototype' involved a clip ring and plastic flaps to secure the bag."],
              imagePlaceholder: "CAD model screenshot of the clip ring"
            }
          ]
        },
        {
          title: "Conclusion + Reflection",
          content: [
            "My overall contributions included brainstorming, ideation, and CAD modeling.",
            "Future steps would involve testing with actual patients and refining the materials."
          ]
        }
      ]
    },
    {
      id: "dp2",
      path: "/projects/hip-implant",
      title: "Designing a Hip Implant",
      icon: "🦴",
      overview: "Focused on designing a custom hip implant for a specific patient case involving metal allergy and arthritis.",
      skills: [
        { title: "CAD", desc: "Handling complex geometry and assemblies." },
        { title: "3D Printing", desc: "Prototyping physical models." },
        { title: "Communication", desc: "Oral and written reporting." }
      ],
      sections: [
        {
          title: "Patient Summary",
          content: ["Patient has metal allergy, Rheumatoid arthritis, and requires specific bone measurements."]
        },
        {
          title: "Design Process",
          content: [
            "Objectives: Custom-fit, reducing pain/stiffness.",
            "Constraints: Non-metallic material, meeting safety standards, weight-bearing capacity."
          ],
          imagePlaceholder: "Photo of whiteboard sketches and group notes"
        },
        {
          title: "The Final Product",
          content: [
            "Features: Novel non-metallic material (PEEK plastic), texturing for osteointegration.",
            "Presentation: Improvement in public speaking and answering technical questions."
          ],
          imagePlaceholder: "Exploded view diagram of the hip implant assembly"
        }
      ]
    },
    {
      id: "dp3",
      path: "/projects/pill-bottle-opener",
      title: "Automatic Pill Bottle Opener",
      icon: "💊",
      overview: "An automated pill dispensing device for people with fine motor challenges.",
      skills: [
        { title: "Autodesk Inventor", desc: "Creating 3D models for parts." },
        { title: "Collaboration", desc: "Managing timelines and interpersonal communication." }
      ],
      sections: [
        {
          title: "Design Process",
          content: [
            "We identified patient concerns regarding seal integrity and motor skill limitations (e.g., arthritis).",
            "Our objectives were to create a device that is comfortable, easy to operate, lightweight, and durable."
          ],
          subSections: [
            {
              title: "Constraints",
              content: ["Materials must be medical-grade and cost-effective."],
              listItems: ["Must be waterproof", "Must be easy to clean"]
            },
            {
              title: "My Initial Ideas",
              content: ["Visual indicators (colors/tabs) and physical reinforcement (magnets/adhesives)."],
              imagePlaceholder: "Sketches and handwritten notes of initial concepts"
            },
            {
              title: "Prototypes",
              content: ["The 'First Major Prototype' involved a clip ring and plastic flaps to secure the bag."],
              imagePlaceholder: "CAD model screenshot of the clip ring"
            }
          ]
        },
        {
          title: "Conclusion + Reflection",
          content: [
            "My overall contributions included brainstorming, ideation, and CAD modeling.",
            "Future steps would involve testing with actual patients and refining the materials."
          ]
        }
      ]
    }
  ]
};
