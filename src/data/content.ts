import dp1BoardAllIdeas from '../assets/dp1_board_all_ideas.png';
import dp1BoardIdeas12 from '../assets/dp1_board_ideas12.png';
import dp1CadClipRing from '../assets/dp1_cad_clip_ring.png';
import dp1CadTwistRing from '../assets/dp1_cad_twist_ring.png';
import dp1Poster from '../assets/dp1_poster.png';
import dp1FinalPrototype from '../assets/dp1_final_prototype.png';
import dp2PrintedPrototypes from '../assets/dp2_printed_prototypes.png';
import dp2PosterDisplay from '../assets/dp2_poster_display.png';
import dp2ScrewSketches from '../assets/dp2_screw_sketches.png';
import dp2InitialIdeas from '../assets/dp2_initial_ideas.png';
import dp2CadIterations from '../assets/dp2_cad_iteration_all.png';
import dp2FinalCad from '../assets/dp2_final_cad.png';
import dp2ExplodedAssembly from '../assets/dp2_exploded_assembly.png';
import dp2TeamSymposium from '../assets/dp2_team_symposium.png';

/** Placeholder graphics until project-specific assets exist */
function placeholderImage(width: number, height: number, label: string): string {
  return `https://via.placeholder.com/${width}x${height}/222/aaa?text=${encodeURIComponent(label)}`;
}

export type CalloutColor = 'green' | 'brown' | 'blue' | 'purple' | 'red';

export interface CalloutCard {
  type: 'text' | 'image';
  title?: string;
  icon?: string;
  color?: CalloutColor;
  width: 'full' | 'half' | 'third' | 'two-thirds';
  content?: string[];
  listItems?: string[];
  twoColumnList?: boolean;
  image?: {
    src: string;
    alt: string;
    position?: 'right' | 'bottom';
    /** 'contain' avoids cropping portrait / labeled photos */
    fit?: 'contain' | 'cover';
  };
}

export interface Section {
  title: string;
  cards: CalloutCard[];
}

export interface Project {
  id: string;
  title: string;
  icon: string;
  path: string;
  description?: string;
  sections: Section[];
}

export interface HomeData {
  title: string;
  subtitle: string;
  intro: string[];
  projects: { id: string; title: string; icon: string; path: string; description: string; }[];
}

export const portfolioData: { home: HomeData, projects: Project[] } = {
  home: {
    title: "Hello!",
    subtitle: "David Wang - Learning and Project Portfolio",
    intro: [
      "I'm David, an integrated biomedical engineering and health sciences student at McMaster University who is enthusiastic about the intersection of biology, technology, and medicine. This page contains the projects from I have completed. This portfolio documents how, through these projects I have gained and applied both hard and soft skills. I collaborated with teams of newly met people in a professional manner, organizing and managing project timelines. I have practiced and learned CAD, design and computing skills, applying math and biology knowledge."
    ],
    projects: [
      {
        id: "dp1",
        title: "Design Project 1: Modifying an Ostomy Appliance",
        icon: "⭕",
        path: "/projects/ostomy-appliance",
        description: "Modifying an Ostomy Appliance"
      },
      {
        id: "dp2",
        title: "Design Project 2: Designing a Hip Implant",
        icon: "🦴",
        path: "/projects/hip-implant",
        description: "Designing a Hip Implant"
      },
      {
        id: "dp3",
        title: "Design Project 3: Pill Bottle Opener",
        icon: "💊",
        path: "/projects/pill-bottle-opener",
        description: "Pill Bottle Opener"
      },
      {
        id: "dp4",
        title: "Design Project 4: Earring application gun",
        icon: "🔫",
        path: "/projects/dp4",
        description: "Earring application gun"
      },
      {
        id: "medimonitor",
        title: "MediMonitor: Smart Pill Dispenser",
        icon: "🩺",
        path: "/projects/medimonitor",
        description: "IoT-enabled medication management system"
      },
      {
        id: "fan-of-exercise",
        title: "Fan of Exercise: Muscular Dystrophy Therapy",
        icon: "🪭",
        path: "/projects/fan-of-exercise",
        description: "Custom exercise machine for neuromuscular rehabilitation"
      }
    ]
  },
  projects: [
    {
      id: "dp1",
      path: "/projects/ostomy-appliance",
      title: "Design Project 1: Modifying an Ostomy Appliance",
      icon: "⭕",
      sections: [
        {
          title: "Overview",
          cards: [
            {
              type: 'text',
              title: "Skills / Tech learned",
              icon: "🛠️",
              color: "green",
              width: "full",
              twoColumnList: true,
              listItems: [
                "Autodesk Inventor and CAD",
                "3D Printing",
                "Time Management: Making and using a GANTT Chart",
                "Collaboration/Interpersonal skills",
                "Communication: Oral and Written",
                "Technical research",
                "Pitching and Presentation skills"
              ]
            },
            {
              type: 'text',
              title: "Patient Summary:",
              icon: "👤",
              color: "red",
              width: "half",
              listItems: [
                "<strong>Concerns of seal integrity:</strong> Constantly removing and resealing the appliance because of fear it is improperly attached and would leak. This eventually wears down the seal before it is time to replace.",
                "<strong>Arthritis:</strong> Hard to generate force and operate small mechanisms with fine motor skills"
              ]
            },
            {
              type: 'image',
              width: 'half',
              image: {
                src: dp1FinalPrototype,
                alt: "Final prototype of modified ostomy appliance showing twist ring and pH indicator"
              }
            }
          ]
        },
        {
          title: "Design Process",
          cards: [
            {
              type: 'text',
              title: "Identifying Goals: the problem to solve",
              icon: "🎯",
              color: "blue",
              width: "half",
              content: [
                "<strong>Objectives:</strong>"
              ],
              listItems: [
                "<strong>comfortable</strong> to wear",
                "<strong>easy to operate</strong>",
                "<strong>lightweight</strong>",
                "<strong>durable</strong>"
              ]
            },
            {
              type: 'text',
              title: "Constraints:",
              color: "blue",
              icon: "🛑",
              width: "half",
              listItems: [
                "patient must be <strong>confident</strong> of the device's <strong>security:</strong> the connection",
                "must <strong>not leak or tear</strong>",
                "conform to health <strong>standards</strong> and regulations",
                "still provide the <strong>functions to manage ostomy</strong> after modification: store waste from the digestive tract",
                "Use <strong>existing</strong> Ostomy appliance in design"
              ]
            },
            {
              type: 'text',
              title: "My Initial Ideas:",
              icon: "💡",
              color: "brown",
              width: "full",
              listItems: [
                "<strong>Visual indicators of lock</strong><ul style='margin-top:0.2rem; margin-bottom:0'><li>contrasting colors between connection pieces</li><li>plastic pop up tabs to indicate lock</li></ul>",
                "<strong>Physical reinforcement</strong><ul style='margin-top:0.2rem; margin-bottom:0'><li>twist or rigid ring hinge lock</li><li>elastic or tape seal</li><li>magnetic seal</li></ul>"
              ],
              image: {
                src: dp1BoardAllIdeas,
                alt: "Whiteboard brainstorm session with all ideas",
                position: 'right'
              }
            },
            {
              type: 'text',
              title: "Brainstorm and discussion with group:",
              icon: "💬",
              color: "purple",
              width: "full",
              listItems: [
                "We realized we should <strong>combine</strong> ideas",
                "This would only provide more assurance",
                "We narrowed down to a few major ideas:<ul style='margin-top:0.2rem; margin-bottom:0'><li>An <strong>outer ring</strong> around the inside one</li><li>A clip style connection</li><li>A twist cap style connection</li><li>A <strong>visual indicator</strong> of lock integrity<ul style='margin-top:0.2rem; margin-bottom:0'><li>plastic tabs to pop up when secure</li><li>pH indicator around the connection ring</li></ul></li></ul>"
              ],
              image: {
                src: dp1BoardIdeas12,
                alt: "Whiteboard showing Idea 1 (visual cue for leaks) and Idea 2 (extra ring with snap clip)",
                position: 'right'
              }
            },
            {
              type: 'text',
              title: "First Major Prototype:",
              icon: "🛠️",
              color: "blue",
              width: "full",
              listItems: [
                "We decided to do the clip ring and plastic flaps. I created the cad model for the clip ring prototype. I tried to contribute to the design of the pop-up caps.",
                "ultimately we did not end up making a feasible prototype for this"
              ],
              image: {
                src: dp1CadClipRing,
                alt: "CAD model of the clip ring prototype",
                position: 'right'
              }
            },
            {
              type: 'text',
              title: "Review thoughts:",
              color: "brown",
              icon: "📉",
              width: "full",
              listItems: [
                "the clip ring was too <strong>weak</strong> and would likely <strong>wear</strong> out easily",
                "The plastics tabs were hard to make, and would also wear out very quickly"
              ]
            },
            {
              type: 'text',
              title: "Next steps:",
              color: "blue",
              icon: "➡️",
              width: "full",
              listItems: [
                "We decided to switch to a <strong>twist ring</strong>, like a bottle cap. I <strong>began to make</strong> the CAD model, modifying my original design and learning how to use coil. We also decided the <strong>pH strip</strong> circle as a better indicator."
              ],
              image: {
                src: dp1CadTwistRing,
                alt: "CAD model of the toothed twist ring design",
                position: 'right'
              }
            },
            {
              type: 'text',
              title: "The final Product",
              color: "green",
              icon: "✅",
              width: "full",
              content: [
                "<strong>Features:</strong>"
              ],
              listItems: [
                "Twist ring around original connection to physically reinforce seal",
                "Rubber seal in ring",
                "pH paper ring to show leakage, quick check for leakage, providing mental reassurance, easily replaceable as a sticker"
              ],
              image: {
                src: dp1Poster,
                alt: "Twist N' Tell® marketing poster — leakproof, arthritis-friendly ostomy appliance with screw mechanism and pH leakage indicator",
                position: 'right'
              }
            }
          ]
        },
        {
          title: "Conclusion + Reflection",
          cards: [
            {
              type: 'text',
              title: "My Overall Contributions:",
              icon: "🌟",
              color: "green",
              width: "full",
              listItems: [
                "Brainstorming, ideation, design",
                "Created the CAD models of ring protypes",
                "Created the CAD model of final screw ring design",
                "Evaluated project timeline after completion, drafted sections of final abstract"
              ]
            },
            {
              type: 'text',
              title: "What Went Well",
              icon: "👍",
              color: "brown",
              width: "half",
              content: [
                "<strong>Communication:</strong>",
                "I communicated well with the team, replying to ideas, and they replied to mine. We were almost always on the same page."
              ]
            },
            {
              type: 'text',
              title: "Challenges and Lessons",
              icon: "🚧",
              color: "purple",
              width: "half",
              content: [
                "<strong>Consensus:</strong>",
                "It was initial hard to agree on an idea the entire team wanted to move forward with, I could improve in the communication and decision making process in the group."
              ]
            }
          ]
        }
      ]
    },
    {
      id: "dp2",
      path: "/projects/hip-implant",
      title: "Design Project 2: Designing a Hip Implant",
      icon: "🦴",
      sections: [
        {
          title: "Overview",
          cards: [
            {
              type: 'image',
              width: 'full',
              image: {
                src: dp2PrintedPrototypes,
                alt: "3D-printed hip implant models: fully assembled at 75% scale (pink) and femoral stem at 100% scale (white)",
                fit: 'contain'
              }
            },
            {
              type: 'text',
              title: "Skills / Tech learned",
              icon: "🛠️",
              color: "green",
              width: "full",
              twoColumnList: true,
              listItems: [
                "CAD with more complex geometry and assembly",
                "3D Printing",
                "Time Management",
                "Interpersonal skills",
                "Collaboration: Splitting work",
                "Communication: Oral and Written",
                "Research",
                "Presentation Skills"
              ]
            },
            {
              type: 'text',
              title: "Identifying Goals: the problem to solve",
              icon: "🎯",
              color: "red",
              width: "third",
              content: [
                "<strong>Objectives:</strong>"
              ],
              listItems: [
                "<strong>custom</strong> to patient’s anatomy",
                "reduce <strong>pain</strong> in hip and feet",
                "reduce <strong>stiffness</strong> in the thigh and groin area",
                "<strong>comfortable</strong>",
                "<strong>restore motion</strong> lost due to rheumatoid arthritis",
                "<strong>reduce</strong> bone <strong>erosion</strong> on the pelvis",
                "<strong>mimic</strong> a healthy hip joint"
              ]
            },
            {
              type: 'text',
              title: "Patient Summary:",
              icon: "👤",
              color: "brown",
              width: "third",
              listItems: [
                "<strong>56-year-old female:</strong> Rheumatoid Arthritis -> Needs Hip Replacement.",
                "<strong>Complication:</strong> Highly allergic to almost all metals (titanium, cobalt-chromium, nickel, etc.).",
                "<strong>Bone Erosion:</strong> Rheumatoid arthritis has eroded her bone, requiring an implant that preserves as much bone as possible."
              ]
            },
            {
              type: 'image',
              width: 'third',
              image: {
                src: dp2PosterDisplay,
                alt: "Smooth Operator poster with 3D-printed hip implant prototypes on the table",
                fit: 'contain'
              }
            }
          ]
        },
        {
          title: "Design Process",
          cards: [
            {
              type: 'text',
              title: "Ideation / Brainstorming",
              icon: "💡",
              color: "blue",
              width: "full",
              content: [
                "<div style='display:grid; grid-template-columns: 1fr 1fr; gap: 2rem;'><div><strong>Objectives</strong><ul style='margin-top:0.5rem'><li>custom to patient's anatomy</li><li>reduce pain in hip and feet</li><li>reduce stiffness in the thigh and groin area</li><li>comfortable</li><li>restore motion lost due to rheumatoid arthritis</li><li>reduce bone erosion on the pelvis</li><li>mimic a healthy hip joint</li></ul></div><div><strong>Constraints</strong><ul style='margin-top:0.5rem'><li>not contain any metallic products</li><li>adhere to health and safety standards</li><li>bear body weight and bodily functions of the patient</li><li>make an implant to help remove the impact of rheumatoid arthritis</li></ul></div></div>"
              ]
            },
            {
              type: 'text',
              title: "My Initial Ideas:",
              icon: "🧠",
              color: "brown",
              width: "full",
              listItems: [
                "<strong>Full replacement screw design</strong><ul style='margin-top:0.2rem; margin-bottom:0'><li>Both socket and head and replaced</li><li>The acetabular cup and stem has a screw shape for hold</li></ul>",
                "<strong>Liners:</strong> place liners on the head and socket without removing bone"
              ],
              image: {
                src: dp2ScrewSketches,
                alt: "Initial notebook sketches of full joint replacement with screw fixation and liner concepts",
                position: 'right',
                fit: 'contain'
              }
            },
            {
              type: 'text',
              title: "Reviewing my ideas in hindsight:",
              icon: "🤔",
              color: "purple",
              width: "full",
              listItems: [
                "My sketches weren't great can could be improved",
                "The screw acetabular cup would remove too much bone, a conventional design is better",
                "The screw would make a harder surgical procedure",
                "the joint lining idea would wear and not fix bone complications<ul style='margin-top:0.2rem; margin-bottom:0'><li>(also not allowed in project constraints)</li></ul>"
              ],
              image: {
                src: dp2InitialIdeas,
                alt: "Whiteboard brainstorm: hip implant ideas, materials, Team 28 notes, and total hip replacement diagram",
                position: 'right',
                fit: 'contain'
              }
            },
            {
              type: 'text',
              title: "Prototyping:",
              icon: "🛠️",
              color: "blue",
              width: "full",
              content: [
                "In the CAD sub-team I began to <strong>create a model</strong> for the stem, neck and head."
              ],
              listItems: [
                "1. My first prototype had a very <strong>pronounced</strong> curve. But it curved beyond patients bone <strong>measurements</strong> and research showed it may not handle the <strong>stresses</strong> well.",
                "2. My second prototype had a a straighter stem that now <strong>fit</strong> the patient’s <strong>femur</strong>. But it still may not handle the <strong>stresses</strong> well, we eventually decided the curve would be so small it shouldn’t be needed."
              ],
              image: {
                src: dp2CadIterations,
                alt: "Early CAD concept for femoral stem and head showing pronounced curvature before geometry refinement",
                position: 'right',
                fit: 'contain'
              }
            },
            {
              type: 'text',
              title: "Final CAD Models and Assembly:",
              icon: "💻",
              color: "blue",
              width: "full",
              listItems: [
                "The assembly has two main components: the acetabular cup (the socket) and the femoral stem (the ball and stem).",
                "A polyethylene liner would act as the cartilage between the head and the socket, reducing friction.",
                "The head of the stem is removable, allowing the doctor to attach the correct size head based on the patient's exact measurements.",
                "Four pegs on the acetabular cup grip into the pelvis for a secure hold."
              ],
              image: {
                src: dp2FinalCad,
                alt: "CAD render of femoral stem with head: final implant geometry before printing",
                position: 'right',
                fit: 'contain'
              }
            },
            {
              type: 'text',
              title: "The final Product",
              icon: "✅",
              color: "green",
              width: "full",
              content: [
                "<strong>Features:</strong>"
              ],
              listItems: [
                "Novel <strong>non-metallic</strong> material: PEEK plastic that has similar properties in strength as metal",
                "PEEK is completely metal free, so the <strong>leeching</strong> is no longer an issue",
                "<strong>Texture</strong> of slots and slight screw ridges to promote <strong>osteointegration</strong>"
              ]
            },
            {
              type: 'image',
              width: 'full',
              image: {
                src: dp2ExplodedAssembly,
                alt: "Figure 3: exploded view of Nyota's hip implant — acetabular cup, liner, femoral head, and femoral stem",
                fit: 'contain'
              }
            },
            {
              type: 'image',
              width: 'half',
              image: {
                src: dp2PosterDisplay,
                alt: "Smooth Operator tri-fold poster with figures, X-rays, and implant justification",
                fit: 'contain'
              }
            },
            {
              type: 'image',
              width: 'half',
              image: {
                src: dp2TeamSymposium,
                alt: "Design team with display board and printed hip implant prototypes at the showcase",
                fit: 'contain'
              }
            }
          ]
        },
        {
          title: "Conclusion + Reflection",
          cards: [
            {
              type: 'text',
              title: "My Overall Contributions:",
              icon: "🌟",
              color: "green",
              width: "full",
              twoColumnList: true,
              listItems: [
                "Created CAD model of the femoral stem",
                "Created final assembly of CAD model",
                "Created and 3D printed the acetabular cup and femoral stem (1/2 scale)",
                "Contributed content to the final poster"
              ]
            },
            {
              type: 'text',
              title: "What Went Well",
              icon: "👍",
              color: "brown",
              width: "half",
              content: [
                "<strong>Communication:</strong>",
                "I communicated well with the team, replying to ideas, and they replied to mine. We were almost always on the same page.",
                "<strong>Overall Team Dynamic:</strong>",
                "We all had great team dynamic, and I made friends with people in the group that I still keep in contact with now. We shared similar work ethics and goals, which meant everyone put in effort."
              ]
            },
            {
              type: 'text',
              title: "Challenges and Lessons",
              icon: "🚧",
              color: "purple",
              width: "half",
              content: [
                "<strong>Scope:</strong>",
                "While deciding on our initial idea, we had trouble deciding between multiple good ideas to determine which one fit best into the time frame we had. We got a better idea of how complex of a project we were able to complete in a certain amount of time.",
                "<strong>Material Properties:</strong>",
                "Discovering that non-metallic implants are incredibly rare, we had to heavily research PEEK to ensure it met the standards."
              ]
            }
          ]
        }
      ]
    },
    {
      id: "dp3",
      path: "/projects/pill-bottle-opener",
      title: "Design Project 3: Pill Bottle Opener",
      icon: "💊",
      sections: [
        {
          title: "Overview",
          cards: [
            {
              type: 'text',
              title: "Skills / Tech learned",
              icon: "🛠️",
              color: "green",
              width: "full",
              twoColumnList: true,
              listItems: [
                "Improved Python skills",
                "Interpersonal skills",
                "GPIOZero Library + Raspberry Pi",
                "Communication: Oral and Written",
                "Wiring and soldering",
                "Collaboration: Working in sub teams",
                "Breadboard",
                "Time Management"
              ]
            },
            {
              type: 'text',
              title: "Identifying Goals:",
              icon: "🎯",
              color: "red",
              width: "half",
              listItems: [
                "Should be <strong>conveniently fast</strong>",
                "Should be <strong>easy</strong> to use <strong>without much dexterity</strong> required",
                "Should require <strong>minimal</strong> manual effort from consumer"
              ]
            },
            {
              type: 'text',
              title: "Patient Summary:",
              icon: "👤",
              color: "brown",
              width: "half",
              listItems: [
                "A senior patient needs a device to open child-proof medicine bottles. They have <strong>reduced grip strength</strong> and <strong>limited fine motor skills</strong>."
              ]
            }
          ]
        },
        {
          title: "Design Process",
          cards: [
            {
              type: 'text',
              title: "Insights + Research:",
              icon: "📈",
              color: "blue",
              width: "half",
              listItems: [
                "Age related conditions like arthritis are associated with <strong>reduced grip strength</strong> and <strong>impaired fine motor control</strong>, making repetitive hand tasks more difficult",
                "<strong>44%</strong> of <strong>over 81 year old’s</strong> were unable to open a screw cap bottle",
                "Child resistant bottles are used to prevent children from <strong>accidental</strong> exposure or ingestion of medication",
                "Anything that is harmful when ingested is <strong>required</strong> to have a <strong>child-resistant</strong> cap by <strong>law</strong>"
              ]
            },
            {
              type: 'text',
              title: "Constraints:",
              icon: "🛑",
              color: "blue",
              width: "half",
              listItems: [
                "Must <strong>secure</strong> medicine bottle while in use",
                "Must <strong>open</strong> bottle",
                "Must conform to <strong>health and safety standards</strong>",
                "Must <strong>close</strong> bottle"
              ]
            },
            {
              type: 'text',
              title: "My Initial Ideas:",
              icon: "💡",
              color: "brown",
              width: "full",
              listItems: [
                "<strong>Device:</strong><ul style='margin-top:0.2rem; margin-bottom:0'><li>an box style case</li><li>4 <strong>linear actuators</strong> in the poles to raise an lower the platform</li><li>A rotating base on the top platform that can rotate with a <strong>gear</strong> mechanism</li><li>On the base will be a cylinder containing a “<strong>gripper</strong>” mechanism to grasp a lid, this would be a <strong>rack and pinion</strong> mechanism</li><li>The rotating base would <strong>twist</strong> the lid after the platform lower <strong>squeezes</strong> it down</li><li>A “cup holder” to <strong>grip</strong> and fix the bottle in place</li><li>LEDs to signal status of the device: <strong>red, yellow and green</strong></li><li>Force sensitive resistors (FSRs) to detect the <strong>presence</strong> of the cup, that the lid is sufficiently <strong>pressed</strong> and the lid is <strong>untwisted</strong></li></ul>",
                "<strong>Code:</strong><ul style='margin-top:0.2rem; margin-bottom:0'><li>A giant while loop</li><li>takes in FSR outputs</li><li>calculates <strong>rolling average</strong> for each: for loop, 5 times, that appends to a list then finds average</li><li><strong>conditions</strong> to check if each of the motors should be <strong>activated</strong></li><li>Turn on <strong>LEDs</strong> to show <strong>status</strong></li></ul>"
              ],
              image: {
                src: placeholderImage(300, 400, 'Initial Prototype'),
                alt: "Initial Prototype",
                position: 'right'
              }
            },
            {
              type: 'text',
              title: "Final Result:",
              icon: "🏁",
              color: "purple",
              width: "full",
              listItems: [
                "<strong>Result:</strong><ul style='margin-top:0.2rem; margin-bottom:0'><li>we were only able to complete the <strong>lifting and twisting</strong> mechanism as a <strong>lower fidelity</strong> prototype. It worked through <strong>sequential</strong> steps of the motors, we were able to open a pill bottle lid in our <strong>demonstration</strong>.</li></ul>",
                "<strong>Our YouTube video:</strong>"
              ],
              image: {
                src: placeholderImage(400, 300, 'CAD Base'),
                alt: "CAD Base",
                position: 'right'
              }
            },
            {
              type: 'text',
              title: "Prototyping",
              icon: "⚙️",
              color: "blue",
              width: "full",
              content: [
                "To fix these issues, we used a gear box and smaller motors, so that we could place them in the correct spots for proper alignment and required leverage."
              ],
              listItems: [
                "<strong>1. Block Logic Diagram</strong><br/>Mapped inputs, states, and outputs.",
                "<strong>2. Hardware details</strong><ul style='margin-top:0.2rem; margin-bottom:0'><li>Linear actuator (NEMA 14 stepper motor) moves the platform.</li><li>DC motor (with gearbox) turns the bottle lid.</li><li>FSR (Force Sensitive Resistor) detects if the pill bottle is present.</li></ul>",
                "<strong>3. Code Logic diagram</strong><br/>Visualized the polling loop.",
                "<strong>4. Materials needed</strong><ul style='margin-top:0.2rem; margin-bottom:0'><li>NEMA 14 stepper motor</li><li>DC motor with gearbox</li><li>L298N motor driver</li><li>FSRs</li><li>LEDs (Red, Green)</li></ul>",
                "<strong>5. Final System diagram</strong><ul style='margin-top:0.2rem; margin-bottom:0'><li>Raspberry Pi Pico reads sensors and controls motors through the L298N driver.</li><li>12V Power supply powers the motors, 5V steps down to power the Pi.</li></ul>"
              ]
            },
            {
              type: 'text',
              title: "The final Product",
              icon: "✅",
              color: "green",
              width: "full",
              content: [
                "<strong>Features:</strong>"
              ],
              listItems: [
                "Insert the pill bottle into the base holder",
                "Platform lowers to engage the bottle lid",
                "DC motor twists to unscrew the lid",
                "LEDs display status (Red = processing, Green = open)"
              ],
              image: {
                src: placeholderImage(400, 300, 'Video Thumbnail'),
                alt: "Video Thumbnail",
                position: 'right'
              }
            }
          ]
        },
        {
          title: "Conclusion + Reflection",
          cards: [
            {
              type: 'text',
              title: "My Overall Contributions:",
              icon: "🌟",
              color: "green",
              width: "full",
              listItems: [
                "Created the code logic for motor sequence",
                "Wired the breadboard and sensor inputs",
                "Helped assemble the structural housing"
              ]
            },
            {
              type: 'text',
              title: "What Went Well",
              icon: "👍",
              color: "brown",
              width: "half",
              content: [
                "<strong>Communication:</strong>",
                "I communicated well with the team, replying to ideas, and they replied to mine. We were almost always on the same page."
              ]
            },
            {
              type: 'text',
              title: "Challenges and Lessons",
              icon: "🚧",
              color: "purple",
              width: "half",
              content: [
                "<strong>Consensus:</strong>",
                "It was initial hard to agree on an idea the entire team wanted to move forward with, I could improve in the communication and decision making process in the group."
              ]
            }
          ]
        }
      ]
    },
    {
      id: "dp4",
      path: "/projects/dp4",
      title: "Design Project 4: Earring application gun",
      icon: "🔫",
      sections: [
        {
          title: "Overview",
          cards: [
            {
              type: 'text',
              title: "Skills / Tech learned",
              icon: "🛠️",
              color: "green",
              width: "full",
              twoColumnList: true,
              listItems: [
                "CAD with more complex geometry, freeform modelling",
                "Assembly: making and constraining gears + rack and pinion",
                "3D Printing",
                "Time Management",
                "Collaboration & Coordination: Splitting work",
                "Communication: Oral and Written",
                "Presentation Skills"
              ]
            },
            {
              type: 'text',
              title: "Patient Summary:",
              icon: "👤",
              color: "red",
              width: "half",
              listItems: [
                "We were introduced to <strong>real patients</strong> and challenged to identify and try to improve one of their challenges.",
                "<strong>Jany</strong> has MS, and mentioned having trouble putting on stud earrings because of limited dexterity, so she now wears hoops instead. We hoped to create device that allowed her to independently put studs on again."
              ]
            },
            {
              type: 'text',
              title: "Identifying Goals: the problem to solve",
              icon: "🎯",
              color: "brown",
              width: "half",
              listItems: [
                "Should be <strong>comfortable</strong> to use",
                "Should be <strong>efficient</strong> to use",
                "Should be <strong>portable</strong> and not bulky",
                "Should improve <strong>independence</strong>"
              ]
            }
          ]
        },
        {
          title: "Design Process",
          cards: [
            {
              type: 'text',
              title: "Constraints:",
              icon: "🛑",
              color: "blue",
              width: "half",
              listItems: [
                "adhere to health and safety <strong>standards</strong>",
                "Must be usable with Jany’s current <strong>finger dexterity</strong>",
                "Must be <strong>safe</strong> to use",
                "Must not <strong>worsen her condition</strong>"
              ]
            },
            {
              type: 'text',
              title: "Initial Thoughts:",
              icon: "💡",
              color: "blue",
              width: "half",
              listItems: [
                "<strong>Scissor</strong> mechanism: simple, adaptable to multiple functions",
                "<strong>Motorized closing possibilities:</strong><ul style='margin-top:0.2rem; margin-bottom:0'><li>wind up string</li><li>cam and linkage</li><li>linear actuator pushing it down</li></ul>",
                "<strong>Materials:</strong> Plastic: cheap and usable"
              ]
            },
            {
              type: 'text',
              title: "Brainstorm and discussion with group:",
              icon: "💬",
              color: "purple",
              width: "full",
              listItems: [
                "We decided to <strong>focus</strong> on the earing applying function first",
                "We divided the work, someone else will do the earing holder and backing holder",
                "I will CAD the scissor mechanism in a <strong>basic</strong> form",
                "We need further thought one the specifics for loading the earing pieces, how can it be <strong>easier</strong> than just using <strong>hands</strong>?"
              ],
              image: {
                src: placeholderImage(300, 400, 'Earring Holder Prototype'),
                alt: "Prototype",
                position: 'right'
              }
            },
            {
              type: 'text',
              title: "Prototyping:",
              icon: "🛠️",
              color: "blue",
              width: "full",
              content: [
                "I created the CAD models for the “gun” portion of the design."
              ],
              listItems: [
                "1. The <strong>initial idea</strong> was to use a scissor mechanism. We liked how slim it was at first. However, it would have to be much bigger, too big, to create <strong>good alignment</strong> and the required <strong>leverage</strong>. We eventually decided to abandon the scissor idea. Before finishing we also abandoned the <strong>multi tool idea</strong>, without the scissor, we would focus on a mechanism <strong>solely suited</strong> to the earring.",
                "2. <strong>Starting on a new prototype, we decided to move away from the scissor mechanism.</strong> I began to work on measurements and sketches for a <strong>rack and pinion/gun design</strong>. I created a version with a rack and pinion mechanism. An intuitive <strong>squeezing</strong> motion to use it. This linear motion more accurately and <strong>easily aligned</strong> the pieces. It was purposely <strong>bare bones</strong>, very <strong>unaesthetically</strong> pleasing and not designed for assembly. An assembly file with proper <strong>constraints</strong> showed that the concept would work. We printed an made a mock up to test it <strong>physically</strong> too.",
                "3. Starting on a new prototype, we decided to keep the same <strong>general</strong> concept, but now focus on <strong>efficient</strong> material use, <strong>ergonomics</strong> and <strong>aesthetics</strong>. The case would be fully <strong>enclosed</strong> to protect the mechanism. parts would be <strong>thinner</strong> where they did not need to be so thick, like the <strong>gears and racks</strong>.",
                "4. I started from scratch, creating <strong>thinner</strong> gears and racks. The case was split in <strong>two parts</strong> that would connect in the middle with pegs. A wavy texture was added to the <strong>exterior</strong> of the case for <strong>grip</strong> with <strong>freeform</strong> modelling. made ergonomic handles that would be comfortable and <strong>easy</strong> to grip.",
                "5. Adjusted the locations of a few of the pegs and shifted the gaps for the handle and holders to slide because my measurements were slightly off. Created an assembly and constrained the parts to test virtual. Then we began printing."
              ],
              image: {
                src: placeholderImage(300, 400, 'CAD Earring Gun'),
                alt: "CAD Gun",
                position: 'right'
              }
            },
            {
              type: 'text',
              title: "The final Product",
              icon: "✅",
              color: "green",
              width: "full",
              content: [
                "<strong>Features:</strong>"
              ],
              listItems: [
                "Easily <strong>slide</strong> the earing into the slot on the earing holder",
                "Magnetic backing <strong>sticks</strong> to backing holder easily",
                "<strong>Place</strong> both pieces on the “gun”",
                "<strong>Squeeze</strong> the intuitive an ergonomic handle",
                "The rack and pinion will <strong>reverse</strong> and <strong>scales</strong> down the motion, bringing the backing into the earing that's already on your ear"
              ],
              image: {
                src: placeholderImage(400, 200, 'JANEASY Pro Pierce'),
                alt: "JANEASY Pro Pierce",
                position: 'right'
              }
            }
          ]
        },
        {
          title: "Conclusion + Reflection",
          cards: [
            {
              type: 'text',
              title: "My Overall Contributions:",
              icon: "🌟",
              color: "green",
              width: "full",
              listItems: [
                "Created CAD model of the <strong>body, handle and gear mechanism</strong>",
                "Created <strong>final assembly</strong> of CAD model",
                "Coordinated <strong>3D printing</strong> of the model",
                "Contributes slides to the slideshow for presentation",
                "Appeared and create few scenes in our video",
                "Helped <strong>physically</strong> assemble the final prototype"
              ]
            },
            {
              type: 'text',
              title: "What Went Well",
              icon: "👍",
              color: "brown",
              width: "half",
              content: [
                "<strong>Communication:</strong>",
                "Our team communicated <strong>well</strong>. We focused on making a solely mechanical project this time which made it easier to cooperate as we were all focused on the <strong>same thing</strong>.",
                "<strong>Overall Team Dynamic:</strong>",
                "We all had <strong>great</strong> team dynamic, and I made <strong>friends</strong> with people in the group that I still <strong>keep in contact</strong> with now. We shared similar <strong>work ethics</strong> and goals, which meant everyone put in <strong>effort</strong>."
              ]
            },
            {
              type: 'text',
              title: "Challenges and Lessons",
              icon: "🚧",
              color: "purple",
              width: "half",
              content: [
                "<strong>Scope:</strong>",
                "While deciding on our initial idea, we had trouble deciding between <strong>multiple</strong> good ideas to determine which one fit best into the time frame we had. We got a better idea of how <strong>complex</strong> of a project we were able to complete in a <strong>certain amount of time</strong>."
              ]
            }
          ]
        }
      ]
    },
    {
      id: "medimonitor",
      path: "/projects/medimonitor",
      title: "MediMonitor: Smart Pill Dispenser",
      icon: "🩺",
      sections: [
        {
          title: "Overview",
          cards: [
            {
              type: 'text',
              title: "Problem Statement",
              icon: "❓",
              color: "red",
              width: "half",
              content: [
                "Medication non-adherence is a critical issue for patients with complex regimens, leading to poor health outcomes and increased hospitalizations."
              ]
            },
            {
              type: 'text',
              title: "Technical Stack",
              icon: "💻",
              color: "blue",
              width: "half",
              listItems: [
                "Arduino/ESP32 Microcontrollers",
                "Load Cells for Weight Sensing",
                "WiFi Connectivity",
                "Mobile Notification System"
              ]
            }
          ]
        },
        {
          title: "Design Philosophy",
          cards: [
            {
              type: 'text',
              title: "User Experience",
              icon: "🎨",
              color: "purple",
              width: "full",
              content: [
                "The interface was designed to be <strong>accessible</strong> for elderly users, featuring large text, high-contrast visual cues, and intuitive physical feedback."
              ],
              image: {
                src: placeholderImage(600, 300, 'MediMonitor Interface'),
                alt: "UI Mockup",
                position: 'bottom'
              }
            }
          ]
        }
      ]
    },
    {
      id: "fan-of-exercise",
      path: "/projects/fan-of-exercise",
      title: "Fan of Exercise: Muscular Dystrophy Therapy",
      icon: "🪭",
      sections: [
        {
          title: "The Challenge",
          cards: [
            {
              type: 'text',
              title: "Patient Needs",
              icon: "👤",
              color: "brown",
              width: "full",
              content: [
                "Patients with Muscular Dystrophy require <strong>consistent, low-impact exercise</strong> to maintain muscle tone without causing fatigue or injury."
              ]
            }
          ]
        },
        {
          title: "The Solution",
          cards: [
            {
              type: 'text',
              title: "Mechanical Design",
              icon: "⚙️",
              color: "green",
              width: "two-thirds",
              listItems: [
                "Variable resistance fan mechanism",
                "Adjustable ergonomic handles",
                "Lightweight, portable frame",
                "Force-sensing data logging"
              ]
            },
            {
              type: 'image',
              width: 'third',
              image: {
                src: placeholderImage(300, 400, 'Exercise Machine CAD'),
                alt: "CAD model of Fan of Exercise"
              }
            }
          ]
        }
      ]
    }
  ]
};
