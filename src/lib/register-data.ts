import {
  Users, UserCheck, Heart, Briefcase, Award, Handshake,
  Store, Megaphone, GraduationCap, Lightbulb, Mic, Brain, type LucideIcon,
} from "lucide-react";

export const REG_COLORS = {
  purple: "#41065F",
  red: "#E40066",
  yellow: "#FEA82F",
  green: "#9DC42B",
};

export type FieldType =
  | "text" | "email" | "tel" | "number" | "url"
  | "textarea" | "select" | "checkbox";

export interface RegField {
  id: string;
  label: string;
  type: FieldType, radio?: boolean;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  helper?: string;
}

export interface RegStep {
  title: string;
  description: string;
  fields: RegField[];
}

export interface RegCategory {
  slug: string;
  group: "Attend" | "Compete" | "Join Us" | "Partner";
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  color: string;
  image: string;
  steps: RegStep[];
  /** When true, category renders a bespoke dynamic multi-step flow instead of the generic step engine. */
  dynamicFlow?: "team-compete";
}

const personalStep: RegStep = {
  title: "About You",
  description: "Tell us who you are so we can prepare your pass.",
  fields: [
    { id: "firstName", label: "First Name", type: "text", required: true, placeholder: "Jane" },
    { id: "lastName", label: "Last Name", type: "text", required: true, placeholder: "Doe" },
    { id: "email", label: "Email Address", type: "email", required: true, placeholder: "jane@example.com" },
    { id: "country", label: "Country", type: "text", required: true, placeholder: "Nigeria" },
    { id: "phone", label: "Phone (WhatsApp preferred)", type: "tel", required: true, placeholder: "+234…", helper: "Include country code, e.g. +234 803 000 0000" },
    { id: "city", label: "City", type: "text", placeholder: "Port Harcourt" },
  ],
};

export const REG_CATEGORIES: RegCategory[] = [
    {
    slug: "team",
    group: "Compete",
    title: "Compete as a Team",
    tagline: "3 innovators. One world-changing build.",
    description: "Register your team to compete across AI & Robotics, Software Development, IoT & Electronics, Animation & Game Development, Drone Technology, and Blockchain categories.",
    icon: Users,
    color: REG_COLORS.red,
    image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=1200&q=80",
    dynamicFlow: "team-compete",
    steps: [
      {
        title: "Team Identity",
        description: "Name your team and pick a category.",
        fields: [
          { id: "teamName", label: "Team Name", type: "text", required: true, placeholder: "The Innovators" },
          { id: "category", label: "Competition Category", type: "select", required: true, options: ["AI & Robotics", "Software Dev", "IoT & Electronics", "Animation & Game Development","Drone Technology", "Blockchain"] },
          { id: "ageBracket", label: "Age Category", type: "select", required: true, options: ["8-12", "11-15", "14-19", "18-25", "25-35", "35+"] },
          { id: "school", label: "School / Organization (if any)", type: "text" },
        ],
      },
      {
        title: "Team Captain",
        description: "Primary contact for your team.",
        fields: [
          { id: "firstName", label: "Captain First Name", type: "text", required: true },
          { id: "lastName", label: "Captain Last Name", type: "text", required: true },
          { id: "email", label: "Email", type: "email", required: true },
          { id: "country", label: "Country", type: "text", required: true },
          { id: "phone", label: "Phone", type: "tel", required: true, helper: "Include country code" },
        ],
      },
      {
        title: "Your Build",
        description: "What problem are you solving?",
        fields: [
          { id: "projectName", label: "Project Name", type: "text", required: true },
          { id: "problem", label: "Problem You're Solving", type: "textarea", required: true },
          { id: "stack", label: "Tech Stack / Tools", type: "text", placeholder: "Arduino, Python, TensorFlow…" },
        ],
      },
    ],
  },
  {
    slug: "attendee",
    group: "Attend",
    title: "Attend as a Guest",
    tagline: "Secure your spot at Africa's biggest STEM celebration.",
    description: "Coming to the festival? Register as an individual attendee and witness four days of high-velocity invention.",
    icon: UserCheck,
    color: REG_COLORS.yellow,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
    steps: [
      personalStep,
      {
        title: "Your Interests",
        description: "Help us tailor your festival experience.",
        fields: [
          { id: "ageBracket", label: "Age Category", type: "select", required: true, options: ["8-12", "11-15", "14-19", "18-25", "25-35", "35+"] },
          { id: "focus", label: "Primary Interest", type: "select", required: true, options: ["AI & Robotics", "Software Dev", "IoT & Electronics", "Animation & Game Development","Drone Technology", "Blockchain"] },
          { id: "days", label: "Days You Plan to Attend", type: "select", options: ["All 4 Days", "Day 1", "Day 2", "Day 3", "Day 4"] },
        ],
      },
      {
        title: "Confirm & Finish",
        description: "Review your details, then submit.",
        fields: [
          { id: "notes", label: "Anything we should know? (optional)", type: "textarea", placeholder: "Accessibility needs, dietary preferences…" },
          { id: "newsletter", label: "Send me festival updates by email", type: "checkbox" },
        ],
      },
    ],
  },
  {
    slug: "school",
    group: "Attend",
    title: "School Participation",
    tagline: "Lead a delegation of young innovators.",
    description: "Register your school's facilitators to bring students learn.",
    icon: GraduationCap,
    color: REG_COLORS.green,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80",
    steps: [
      {
        title: "School Details",
        description: "Tell us about your institution.",
        fields: [
          { id: "schoolName", label: "School Name", type: "text", required: true },
          { id: "schoolType", label: "School Type", type: "select", required: true, options: ["Primary", "Junior Secondary", "Senior Secondary", "University / College", "Tech Hub"] },
          { id: "country", label: "Country", type: "text", required: true },
          { id: "city", label: "City", type: "text", required: true },
        ],
      },
      {
        title: "Lead Facilitator",
        description: "Who is leading your delegation?",
        fields: [
          { id: "firstName", label: "First Name", type: "text", required: true },
          { id: "lastName", label: "Last Name", type: "text", required: true },
          { id: "role", label: "Role / Title", type: "text", required: true, placeholder: "STEM Coordinator" },
          { id: "email", label: "Email", type: "email", required: true },
          { id: "phone", label: "Phone", type: "tel", required: true, helper: "Include country code" },
        ],
      },
      {
        title: "Delegation Size",
        description: "Estimate is fine — you can refine later.",
        fields: [
          { id: "students", label: "Number of Students", type: "number", required: true, placeholder: "4" },
          { id: "teachers", label: "Number of Teachers / Chaperones", type: "number", required: true, placeholder: "3" },
          { id: "notes", label: "Additional Notes", type: "textarea" },
        ],
      },
    ],
  },
  {
    slug: "speaker",
    group: "Join Us",
    title: "Speaker / Facilitator / Panelist",
    tagline: "Share your voice on Africa's biggest STEM stage.",
    description: "Apply to speak, facilitate a workshop, or join a panel at STEM Festival 2026.",
    icon: Mic,
    color: REG_COLORS.purple,
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&q=80",
    steps: [
      personalStep,
      {
        title: "Your Role",
        description: "How would you like to contribute?",
        fields: [
          { id: "role", label: "Preferred Role", type: "select", required: true, options: ["Keynote Speaker", "Session Facilitator", "Workshop Host", "Panelist"] },
          { id: "topic", label: "Proposed Topic / Session Title", type: "text", required: true, placeholder: "e.g. Building AI for Africa" },
          { id: "abstract", label: "Session Abstract", type: "textarea", required: true, placeholder: "1–2 short paragraphs about what you'll cover." },
          { id: "affiliation", label: "Company / Affiliation", type: "text", required: true },
          { id: "linkedin", label: "LinkedIn URL", type: "url" },
        ],
      },
      {
        title: "Speaker Bio",
        description: "Tell us about your background.",
        fields: [
          { id: "bio", label: "Short Bio", type: "textarea", required: true },
          { id: "prevTalks", label: "Notable previous talks (optional)", type: "textarea" },
        ],
      },
    ],
  },
  {
    slug: "mentor",
    group: "Join Us",
    title: "Mentor",
    tagline: "Guide the next generation of African innovators.",
    description: "Support competing teams and young innovators with your expertise before and during the festival.",
    icon: Brain,
    color: REG_COLORS.yellow,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
    steps: [
      personalStep,
      {
        title: "Mentorship Focus",
        description: "Where can you add the most value?",
        fields: [
          { id: "expertise", label: "Domain of Expertise", type: "select", required: true, options: ["Robotics", "AI / ML", "IoT & Electronics", "Software Dev", "Product / Design", "Entrepreneurship", "Research", "Other"] },
          { id: "ageGroups", label: "Preferred Age Groups", type: "select", required: true, options: ["Elementary (8–12)", "Junior (11–15)", "Senior (14–19)", "Advanced (18–25)", "Expert (25–35)", "Pro (35+)"] },
          { id: "commitment", label: "Weekly Commitment", type: "select", required: true, options: ["1–3 hours", "3–6 hours", "6+ hours"] },
          { id: "company", label: "Company / Affiliation", type: "text", required: true },
          { id: "bio", label: "Short Bio", type: "textarea", required: true },
        ],
      },
    ],
  },
  {
    slug: "pitch",
    group: "Compete",
    title: "Pitch Your Idea",
    tagline: "Solo innovator? Submit your idea for the open category.",
    description: "Pitch a solution and present it live at the festival's open innovation track.",
    icon: Lightbulb,
    color: REG_COLORS.yellow,
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=80",
    steps: [
      personalStep,
      {
        title: "Your Idea",
        description: "Give us the elevator pitch.",
        fields: [
          { id: "ideaTitle", label: "Idea Title", type: "text", required: true },
          { id: "ideaSummary", label: "One-Sentence Pitch", type: "text", required: true, placeholder: "We help X do Y by Z." },
          { id: "ideaDetail", label: "Detailed Description", type: "textarea", required: true },
          { id: "track", label: "Track", type: "select", required: true, options: ["Agriculture", "Education", "Health", "Climate", "Other"] },
        ],
      },
      {
        title: "Supporting Material",
        description: "Share any links that strengthen your pitch (optional).",
        fields: [
          { id: "demoUrl", label: "Demo / Video URL", type: "url" },
          { id: "deckUrl", label: "Pitch Deck URL", type: "url" },
        ],
      },
    ],
  },
  {
    slug: "volunteer",
    group: "Join Us",
    title: "Volunteer",
    tagline: "Power the festival from behind the scenes.",
    description: "Join the volunteer crew and help deliver an unforgettable experience.",
    icon: Heart,
    color: REG_COLORS.green,
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&q=80",
    steps: [
      personalStep,
      {
        title: "Where You Fit",
        description: "Pick the area you'd love to support.",
        fields: [
          { id: "team", label: "Preferred Team", type: "select", required: true, options: ["Coach","Judge","Event Setup","Event Coordination","Workshop Facilitation","Technical Support","Marketing and Promotion","Guest Services","Photography/Videography","Participant Support and Guidance","Workshop Assistance and Support","Speaker Liaison and Support","Competition Assistance (e.g., timing, scoring, logistics)", "Exhibit Management and Assistance","Venue Logistics and Support", "Social Media Management and Content Creation", "Marketing and Promotions (e.g., distributing flyers, posters)", "Hospitality and Catering Support", "Volunteer Coordination and Management", "Translation and Interpretation Services",
                "First Aid and Medical Assistance", "Technology Support and Assistance","Guest Relations and VIP Support", "Transportation and Logistics Support", "Accessibility Support (e.g., assisting participants with disabilities)", "Environmental Sustainability and Green Initiatives"] },
          { id: "availability", label: "Availability", type: "select", required: true, options: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] },
          { id: "timeSlot", label: "Preferred Time Slot", type: "select", required: true, options: ["Morning", "Afternoon", "Evening"] },
          { id: "training", label: "Availability for Training", type: "select", required: true, options: ["Yes", "No"] },
          { id: "experience", label: "Relevant Experience (optional)", type: "textarea" },
        ],
      },
    ],
  },
  {
    slug: "exhibitor",
    group: "Partner",
    title: "Exhibit Your Work",
    tagline: "Reserve a booth and showcase your products.",
    description: "Showcase products, demos, or research to thousands of festival attendees.",
    icon: Briefcase,
    color: REG_COLORS.purple,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
    steps: [
      {
        title: "Exhibitor Information",
        description: "Tell us about the company exhibiting and the primary contact.",
        fields: [
          { id: "company", label: "Company / Organization", type: "text", required: true },
          { id: "website", label: "Website", type: "url" },
          { id: "firstName", label: "Contact First Name", type: "text", required: true },
          { id: "lastName", label: "Contact Last Name", type: "text", required: true },
          { id: "email", label: "Email", type: "email", required: true },
          { id: "country", label: "Country", type: "text", required: true },
          { id: "phone", label: "Phone", type: "tel", required: true, helper: "Include country code" },
          { id: "exhibitDetail", label: "Company Description (Max 200 words)", type: "textarea", required: true },
        ],
      },
      {
        title: "Booth Preference",
        description: "Pick a size and location that fits your activation.",
        fields: [
          { id: "boothSize", label: "Preferred Booth Size", type: "select", required: true, options: ["Standard (6ft x 6ft)", "Large (10ft x 10ft)", "Custom"] },
          { id: "boothRequest", label: "Special Request", type: "select", options: ["Chairs", "Tables", "Power", "Other", "No Preference"] },
          { id: "boothSanitation", label: "Sanitation Measures", type: "textarea", required: true, helper: "Briefly describe your sanition practices" },
        ],
      },
      {
        title: "Exhibition Description",
        description: "Tell us more about your exhibit.",
        fields: [
          { id: "exhibitTitle", label: "Exhibit Title", type: "text", required: true },
          { id: "audience", label: "Target Audience", type: "select", options: ["Students", "Professionals", "Investors", "General Public", "All"] },
          { id: "exhibitSafety", label: "Health and Safety Compliance", type: "select", required: true, options: ["Yes", "No", "Not Applicable"], helper: "Food Handling Certification" },
          { id: "exhibitDetail", label: "Exhibit Description", type: "textarea", required: true, helper: "List of Products/Services to be showcased"},
        ],
      },
      {
        title: "Payment Details",
        description: "Choose how you'd like to complete payment.",
        fields: [
          { id: "paymentMethod", label: "Payment Method", type: "select", required: true, options: ["Pay Now — Online", "Pay Now — Direct Bank Transfer", "Pay Later — Invoice Me"] },
          { id: "billingContact", label: "Billing Contact (if different)", type: "text" },
        ],
      },
      {
        title: "Confirmation",
        description: "Review and submit your booth reservation.",
        fields: [
          { id: "notes", label: "Anything else we should know?", type: "textarea" },
          { id: "agree", label: "I agree to the exhibitor terms & conditions", type: "checkbox", required: true },
        ],
      },
    ],
  },
  {
    slug: "judge",
    group: "Join Us",
    title: "Become a Judge",
    tagline: "Evaluate the next breakthrough.",
    description: "Lend your expertise to evaluate competing teams and pitches.",
    icon: Award,
    color: REG_COLORS.red,
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80",
    steps: [
      {
        title: "About You",
        description: "Basic contact details.",
        fields: [
          { id: "firstName", label: "First Name", type: "text", required: true },
          { id: "lastName", label: "Last Name", type: "text", required: true },
          { id: "email", label: "Email", type: "email", required: true },
          { id: "country", label: "Country", type: "text", required: true },
          { id: "phone", label: "Phone", type: "tel", required: true, helper: "Include country code" },
          { id: "role", label: "Role / Title", type: "text", required: true, placeholder: "e.g. Senior Robotics Engineer" },
        ],
      },
      {
        title: "Your Expertise",
        description: "Where can you add the most value?",
        fields: [
          { id: "expertise", label: "Domain of Expertise", type: "select", required: true, options: ["Robotics", "AI / ML", "IoT", "Software", "Hardware", "Product / Design", "Investment", "Other"] },
          { id: "experience", label: "Experience & Qualifications", type: "textarea", required: true, placeholder: "Years of experience, notable projects, certifications…" },
          { id: "preferredAge", label: "Preferred Age Category", type: "select", required: true, options: ["Early (8–12)", "Junior (11–15)", "Senior (14–19)", "Advanced (18–25)", "Expert (25–35)", "Pro (35+)", "Open — Any"] },
          { id: "company", label: "Company / Affiliation", type: "text", required: true },
          { id: "linkedin", label: "LinkedIn URL", type: "url" },
          { id: "socials", label: "Other Social Media Handles", type: "text", placeholder: "@twitter, @instagram, …" },
          { id: "bio", label: "Short Bio", type: "textarea", required: true },
        ],
      },
    ],
  },
  {
    slug: "sponsor",
    group: "Partner",
    title: "Become a Sponsor",
    tagline: "Partner with the movement shaping Africa's STEM future.",
    description: "Align your brand with Africa's premier STEM innovation platform.",
    icon: Handshake,
    color: REG_COLORS.green,
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=80",
    steps: [
      {
        title: "Organization",
        description: "Tell us about your company.",
        fields: [
          { id: "company", label: "Company / Organization", type: "text", required: true },
          { id: "website", label: "Website", type: "url" },
          { id: "industry", label: "Industry", type: "text" },
        ],
      },
      personalStep,
      {
        title: "Partnership Interest",
        description: "What level of partnership are you exploring?",
        fields: [
          { id: "tier", label: "Sponsorship Tier", type: "select", required: true, options: ["Title Sponsor", "Platinum", "Gold", "Silver", "In-Kind / Other"] },
          { id: "goals", label: "What outcomes matter most to you?", type: "textarea", required: true },
        ],
      },
    ],
  },
  {
    slug: "vendor",
    group: "Partner",
    title: "Become a Vendor",
    tagline: "Sell to thousands of attendees on-site.",
    description: "Run a food, merch, or service stall during the festival.",
    icon: Store,
    color: REG_COLORS.yellow,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80",
    steps: [
      {
        title: "Your Business",
        description: "What will you sell?",
        fields: [
          { id: "business", label: "Business Name", type: "text", required: true },
          { id: "vendorType", label: "Vendor Type", type: "select", required: true, options: ["Food & Beverage", "Merchandise", "Technology", "Other"] },
          { id: "website", label: "Website / Social Handle", type: "text" },
        ],
      },
      personalStep,
      {
        title: "Logistics",
        description: "Help us plan your space.",
        fields: [
          { id: "stallSize", label: "Preferred Stall Size", type: "select", options: ["Standard (6ft x 6ft)", "Large (10ft x 10ft)", "Custom"] },
          { id: "notes", label: "Anything else we should know?", type: "textarea" },
        ],
      },
      {
        title: "Payment",
        description: "Pricing: ₦20,000 per day · ₦80,000 for all 4 days. Your total updates automatically.",
        fields: [
          { id: "days", label: "Days You'll Trade", type: "select", required: true, options: ["1 day — ₦20,000", "2 days — ₦40,000", "3 days — ₦60,000", "All 4 days — ₦80,000"] },
          { id: "paymentMethod", label: "Payment Method", type: "select", required: true, options: ["Pay Now — Online", "Pay Now — Direct Bank Transfer", "Pay Later — Invoice Me"] },
          { id: "agree", label: "I confirm the total above and agree to vendor terms", type: "checkbox", required: true },
        ],
      },
    ],
  },
  {
    slug: "advertiser",
    group: "Partner",
    title: "Advertise With Us",
    tagline: "Reach Africa's most engaged STEM audience.",
    description: "Tap into our digital, on-site, and broadcast inventory.",
    icon: Megaphone,
    color: REG_COLORS.purple,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    steps: [
      {
        title: "Your Brand",
        description: "Tell us who you're representing.",
        fields: [
          { id: "company", label: "Brand / Company", type: "text", required: true },
          { id: "website", label: "Website", type: "url" },
        ],
      },
      personalStep,
      {
        title: "Campaign Goals",
        description: "What are you hoping to achieve?",
        fields: [
          { id: "formats", label: "Preferred Formats", type: "select", required: true, options: ["On-site Branding", "Digital / Social", "Broadcast", "Bundle / Custom"] },
          { id: "budget", label: "Indicative Budget (USD)", type: "select", options: ["< $1k", "$1k – $5k", "$5k – $25k", "$25k+"] },
          { id: "goals", label: "Campaign Goals", type: "textarea", required: true },
        ],
      },
    ],
  },
  {
    slug: "coach",
    group: "Join Us",
    title: "Become a Coach",
    tagline: "Lead a school team through the competition journey.",
    description: "Register as a coach to guide a school team from training through the final showcase.",
    icon: GraduationCap,
    color: REG_COLORS.yellow,
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80",
    steps: [
      {
        title: "About You",
        description: "Basic contact details.",
        fields: [
          { id: "firstName", label: "First Name", type: "text", required: true },
          { id: "lastName", label: "Last Name", type: "text", required: true },
          { id: "email", label: "Email", type: "email", required: true },
          { id: "country", label: "Country", type: "text", required: true },
          { id: "phone", label: "Phone", type: "tel", required: true, helper: "Include country code" },
          { id: "organization", label: "Organization / School", type: "text", required: true },
          { id: "role", label: "Role / Title", type: "text", required: true, placeholder: "e.g. STEM Coordinator" },
        ],
      },
      {
        title: "Coaching Profile",
        description: "Tell us what and who you'd like to coach.",
        fields: [
          { id: "experience", label: "Experience & Qualifications", type: "textarea", required: true, placeholder: "Years coaching, past competitions, certifications…" },
          { id: "areas", label: "Competition Area(s) to Coach", type: "select", required: true, options: ["AI & Robotics", "Software Development", "IoT & Electronics", "Animation & Game Development", "Drone Technology", "Blockchain", "Multiple Areas"] },
          { id: "preferredAge", label: "Preferred Age Category", type: "select", required: true, options: ["Early (8–12)", "Junior (11–15)", "Senior (14–19)", "Advanced (18–25)", "Expert (25–35)", "Pro (35+)", "Open — Any"] },
          { id: "training", label: "Availability During Training Period", type: "select", required: true, options: ["Weekdays", "Weekends", "Evenings", "Full Availability", "Limited — will confirm"] },
          { id: "bio", label: "Short Bio", type: "textarea", required: true },
        ],
      },
    ],
  },
];

export const REG_GROUPS: RegCategory["group"][] = ["Attend", "Compete", "Join Us", "Partner"];

export function getCategory(slug: string): RegCategory | undefined {
  return REG_CATEGORIES.find((c) => c.slug === slug);
}