import dp1Header from '../assets/dp1_header_1778554024032.png';
import dp2Header from '../assets/dp2_header_1778553822812.png';
import dp2Implant from '../assets/dp2_implant_1778553836616.png';
import dp2Cad from '../assets/dp2_cad_1778553981932.png';
import dp3Header from '../assets/dp3_header_1778553994693.png';
import dp4Header from '../assets/dp4_header_1778554131208.png';

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
  headerImage?: string;
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
      }
    ]
  },
  projects: [
    {
      id: "dp1",
      path: "/projects/ostomy-appliance",
      title: "Design Project 1: Modifying an Ostomy Appliance",
      icon: "⭕",
      headerImage: dp1Header,
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
              title: "Background Info, if needed:",
              icon: "🧠",
              color: "brown",
              width: "half",
              listItems: [
                "<strong>Ostomy:</strong> Surgery that creates opening in abdomen, waste is rerouted out the body.",
                "<strong>Ostomy appliance:</strong> removable pouch that collects waste"
              ]
            },
            {
              type: 'text',
              title: "Patient Summary:",
              icon: "👤",
              color: "brown",
              width: "half",
              listItems: [
                "<strong>Concerns of seal integrity:</strong> Constantly removing and resealing the appliance because of fear it is improperly attached and would leak. This eventually wears down the seal before it is time to replace.",
                "<strong>Arthritis:</strong> Hard to generate force and operate small mechanisms with fine motor skills"
              ]
            }
          ]
        },
        {
          title: "Design Process",
          cards: [
            {
              type: 'text',
              title: "Design Process",
              icon: "📈",
              color: "blue",
              width: "full",
              content: [
                "<strong>Identifying Goals: the problem to solve</strong>",
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
              color: "brown",
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
              color: "blue",
              width: "full",
              listItems: [
                "<strong>Visual</strong> indicators of lock",
                "contrasting colors between connection pieces",
                "plastic pop up tabs to indicate lock",
                "<strong>Physical</strong> reinforcement",
                "twist or rigid ring hinge lock",
                "elastic or tape seal",
                "magnetic seal"
              ]
            },
            {
              type: 'text',
              title: "Reviewing my ideas in hindsight:",
              color: "purple",
              icon: "🤔",
              width: "full",
              listItems: [
                "many were too outlandish and would require a large <strong>redesign</strong>, such as the air pressure idea",
                "Some would be hard to manufacture to too <strong>expensive</strong>, such as the magnets or plastic tabs",
                "Some may not provide <strong>complete security</strong>, such as the various <strong>indicators</strong>"
              ]
            },
            {
              type: 'text',
              title: "Brainstorm and discussion with group:",
              icon: "💬",
              color: "blue",
              width: "full",
              listItems: [
                "We realized we should <strong>combine</strong> ideas",
                "This would only provide more assurance",
                "We narrowed down to a few major ideas:",
                "An <strong>outer ring</strong> around the inside one",
                "A clip style connection",
                "A twist cap style connection",
                "A <strong>visual indicator</strong> of lock integrity",
                "plastic tabs to pop up when secure",
                "pH indicator around the connection ring"
              ]
            },
            {
              type: 'text',
              title: "First Major Prototype:",
              icon: "🛠️",
              color: "blue",
              width: "full",
              content: [
                "We decided to do the clip ring and plastic flaps. I created the cad model for the clip ring prototype. I tried to contribute to the design of the pop-up caps."
              ],
              listItems: [
                "ultimately we did not end up making a feasible prototype for this"
              ]
            },
            {
              type: 'text',
              title: "Review thoughts:",
              color: "brown",
              icon: "📉",
              width: "half",
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
              content: [
                "We decided to switch to a <strong>twist ring</strong>, like a bottle cap. I <strong>began to make</strong> the CAD model, modifying my original design and learning how to use coil. We also decided the <strong>pH strip</strong> circle as a better indicator."
              ]
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
              ]
            }
          ]
        },
        {
          title: "Conclusion + Reflection",
          cards: [
            {
              type: 'text',
              title: "Conclusion + Reflection",
              icon: "🌟",
              color: "green",
              width: "full",
              content: [
                "<strong>My Overall Contributions:</strong>"
              ],
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
      headerImage: dp2Header,
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
              color: "brown",
              width: "two-thirds",
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
              type: 'image',
              width: 'third',
              image: {
                src: dp2Implant,
                alt: "3D Printed Hip Implants"
              }
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
              width: "full",
              listItems: [
                "<strong>not</strong> contain any <strong>metallic</strong> products",
                "adhere to health and safety <strong>standards</strong>",
                "bear body <strong>weight</strong> and <strong>bodily functions</strong> of the patient",
                "make an <strong>implant</strong> to help remove the impact of rheumatoid arthritis"
              ]
            },
            {
              type: 'text',
              title: "My Initial Ideas:",
              icon: "💡",
              color: "brown",
              width: "full",
              listItems: [
                "<strong>Full replacement screw design</strong>",
                "<strong>Both</strong> socket and head and <strong>replaced</strong>",
                "The acetabular cup and stem has a <strong>screw</strong> shape for hold",
                "<strong>Liners:</strong> place liners on the head and socket without removing bone"
              ]
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
                "the joint lining idea would wear and not fix bone complications",
                "(also not allowed in project constraints)"
              ]
            },
            {
              type: 'text',
              title: "Brainstorm and discussion with group:",
              icon: "💬",
              color: "blue",
              width: "full",
              listItems: [
                "We decided on another group members idea of a curved tapered stem for a firmer hold that minimizes bone loss",
                "Discussed incorporating sensors, but decided it cost too much, and beyond feasibility"
              ]
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
                src: dp2Cad,
                alt: "CAD render of hip stem",
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
                "Novel <strong>non-metallic</strong> material: PEEK plastic that has similar properties in strength as metal",
                "PEEK is completely metal free, so the <strong>leeching</strong> is no longer an issue",
                "<strong>Texture</strong> of slots and slight screw ridges to promote <strong>osteointegration</strong>"
              ]
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
                "Poster board presentation, I <strong>improved</strong> from last time, gained experience in how to quickly inform someone of your ideas while holding their <strong>attention</strong> and answering scrutinizing <strong>questions</strong>."
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
      id: "dp3",
      path: "/projects/pill-bottle-opener",
      title: "Design Project 3: Pill Bottle Opener",
      icon: "💊",
      headerImage: dp3Header,
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
              title: "Background Info:",
              icon: "🧠",
              color: "brown",
              width: "half",
              listItems: [
                "<strong>The child proof cap dilemma:</strong> Must prevent children from opening bottles, while somehow allowing seniors with limited hand dexterity to as well.",
                "this is often an impossible task because senior hand dexterity can be <strong>similar</strong> to that of children"
              ]
            },
            {
              type: 'text',
              title: "Our idea for a solution:",
              icon: "💡",
              color: "brown",
              width: "half",
              listItems: [
                "Create a machine that can <strong>automatically</strong> open bottles with very <strong>limited input</strong>",
                "will <strong>push down, twist</strong> and <strong>lift</strong> the lid off a pill bottle",
                "pills can then be taken out <strong>without struggle</strong> with lid"
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
              width: "full",
              listItems: [
                "Age related conditions like arthritis are associated with <strong>reduced grip strength</strong> and <strong>impaired fine motor control</strong>, making repetitive hand tasks more difficult",
                "<strong>44%</strong> of <strong>over 81 year old’s</strong> were unable to open a screw cap bottle",
                "Child resistant bottles are used to prevent children from <strong>accidental</strong> exposure or ingestion of medication",
                "Anything that is harmful when ingested is <strong>required</strong> to have a <strong>child-resistant</strong> cap by <strong>law</strong>"
              ]
            },
            {
              type: 'text',
              title: "Identifying Goals: the problem to solve",
              icon: "🎯",
              color: "brown",
              width: "full",
              content: [
                "<strong>Objectives:</strong>"
              ],
              listItems: [
                "Should be <strong>conveniently fast</strong>",
                "Should be <strong>easy</strong> to use <strong>without much dexterity</strong> required",
                "Should require <strong>minimal</strong> manual effort from consumer"
              ]
            },
            {
              type: 'text',
              title: "Constraints:",
              icon: "🛑",
              color: "purple",
              width: "full",
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
              color: "blue",
              width: "full",
              listItems: [
                "<strong>Device:</strong>",
                "an box style case",
                "4 <strong>linear actuators</strong> in the poles to raise an lower the platform",
                "A rotating base on the top platform that can rotate with a <strong>gear</strong> mechanism",
                "On the base will be a cylinder containing a “<strong>gripper</strong>” mechanism to grasp a lid, this would be a <strong>rack and pinion</strong> mechanism",
                "The rotating base would <strong>twist</strong> the lid after the platform lower <strong>squeezes</strong> it down",
                "A “cup holder” to <strong>grip</strong> and fix the bottle in place",
                "LEDs to signal status of the device: <strong>red, yellow and green</strong>",
                "Force sensitive resistors (FSRs) to detect the <strong>presence</strong> of the cup, that the lid is sufficiently <strong>pressed</strong> and the lid is <strong>untwisted</strong>"
              ]
            },
            {
              type: 'text',
              title: "Code:",
              icon: "💻",
              color: "blue",
              width: "full",
              listItems: [
                "A giant while loop",
                "takes in FSR outputs",
                "calculates <strong>rolling average</strong> for each: for loop, 5 times, that appends to a list then finds average",
                "<strong>conditions</strong> to check if each of the motors should be <strong>activated</strong>",
                "Turn on <strong>LEDs</strong> to show <strong>status</strong>"
              ]
            },
            {
              type: 'text',
              title: "Final Result:",
              icon: "✅",
              color: "green",
              width: "full",
              listItems: [
                "we were only able to complete the <strong>lifting and twisting</strong> mechanism as a <strong>lower fidelity</strong> prototype. It worked through <strong>sequential</strong> steps of the motors, we were able to open a pill bottle lid in our <strong>demonstration</strong>."
              ]
            }
          ]
        },
        {
          title: "Conclusion + Reflection",
          cards: [
            {
              type: 'text',
              title: "Conclusion + Reflection",
              icon: "🌟",
              color: "green",
              width: "full",
              listItems: [
                "<strong>My Overall Contributions:</strong>",
                "Brainstorming, ideation, design",
                "Created the CAD models"
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
      headerImage: dp4Header,
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
              width: "two-thirds",
              listItems: [
                "We were introduced to <strong>real patients</strong> and challenged to identify and try to improve one of their challenges.",
                "<strong>Jany</strong> has MS, and mentioned having trouble putting on stud earrings because of limited dexterity, so she now wears hoops instead. We hoped to create device that allowed her to independently put studs on again."
              ]
            },
            {
              type: 'text',
              title: "Background Info, if needed:",
              icon: "🧠",
              color: "brown",
              width: "third",
              listItems: [
                "<strong>Stud Earrings:</strong> Smaller, harder to handle",
                "<strong>MS:</strong> Multiple Sclerosis, a chronic autoimmune disease where the immune system attacks myelin sheaths of nerves. Symptoms include fatigue, numbness, tingling, walking difficulty, and <strong>impaired dexterity</strong>."
              ]
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
              width: "full",
              content: [
                "<strong>Objectives:</strong>"
              ],
              listItems: [
                "Should be <strong>comfortable</strong> to use",
                "Should be <strong>efficient</strong> to use",
                "Should be <strong>portable</strong> and not bulky",
                "Should improve <strong>independence</strong>"
              ]
            },
            {
              type: 'text',
              title: "Constraints:",
              icon: "🛑",
              color: "brown",
              width: "full",
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
              color: "purple",
              width: "full",
              listItems: [
                "<strong>Scissor</strong> mechanism: simple, adaptable to multiple functions",
                "<strong>Motorized closing possibilities:</strong> wind up string, cam and linkage, linear actuator pushing it down",
                "<strong>Materials:</strong> Plastic: cheap and usable"
              ]
            },
            {
              type: 'text',
              title: "Brainstorm and discussion with group:",
              icon: "💬",
              color: "blue",
              width: "full",
              listItems: [
                "We decided to <strong>focus</strong> on the earing applying function first",
                "We divided the work, someone else will do the earing holder and backing holder",
                "I will CAD the scissor mechanism in a <strong>basic</strong> form",
                "We need further thought one the specifics for loading the earing pieces, how can it be <strong>easier</strong> than just using <strong>hands</strong>?"
              ]
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
                "Easily <strong>slide</strong> the earing into the slot on the earing holder",
                "Magnetic backing <strong>sticks</strong> to backing holder easily",
                "<strong>Place</strong> both pieces on the “gun”",
                "<strong>Squeeze</strong> the intuitive an ergonomic handle",
                "The rack and pinion will <strong>reverse</strong> and <strong>scales</strong> down the motion, bringing the backing into the earing that's already on your ear"
              ]
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
    }
  ]
};
