import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes } from "lucide-react";

// Separate ShowMore/ShowLess button component
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-slate-300 
      hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-white/5 
      hover:bg-white/10
      rounded-md
      border 
      border-white/10
      hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const techStacks = [
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "vite.svg", language: "Vite" },
  { icon: "nodejs.svg", language: "Node JS" },
  { icon: "bootstrap.svg", language: "Bootstrap" },
  { icon: "firebase.svg", language: "Firebase" },
  { icon: "MUI.svg", language: "Material UI" },
  { icon: "vercel.svg", language: "Vercel" },
  { icon: "SweetAlert.svg", language: "SweetAlert2" },
];

const initialItems = 3;

const projectDetails = {
  "mukono-energies": {
    title: "Mukono Energies | Clean Energy",
    description: "Founded in 2024, Mukono Energies Uganda ltd converts Used Cooking Oil (UCO) into clean, renewable biodiesel.",
    image: "https://zkayfzujzxogoaiafixg.supabase.co/storage/v1/object/public/projects//Mukono%20Energies.png",
    demo: "https://mukonoenergies.com/",
    github: "https://github.com/wenslauce",
    technologies: ["Wordpress"],
    features: [
      "Custom WordPress Theme Development",
      "Responsive Design",
      "Performance Optimization",
      "SEO-Friendly Structure",
      "Modern UI/UX Design"
    ],
    longDescription: `Mukono Energies Uganda Ltd, established in 2024, is at the forefront of sustainable energy solutions in Uganda. The company specializes in converting Used Cooking Oil (UCO) into clean, renewable biodiesel, contributing to environmental conservation and sustainable energy practices.

    The website features a modern, responsive design optimized for performance and user experience. Built on WordPress with a custom theme, it effectively communicates the company's mission, services, and impact in the renewable energy sector.`
  },
  "identity-radio": {
    title: "Identity Radio | Identity Newsroom",
    description: "This is a custom web app for Identity Radio, able to show station metadata, music metadata and use deezer api to show cover art of the current playing music",
    image: "https://zkayfzujzxogoaiafixg.supabase.co/storage/v1/object/public/projects//Identity-Radio.png",
    demo: "https://radio.wenslauce.com//",
    github: "https://github.com/wenslauce/Identity-Radio",
    technologies: [
      "Vite",
      "TypeScript",
      "React",
      "shadcn-ui",
      "Tailwind CSS"
    ],
    features: [
      "Listen Music",
      "Users Chatbox", 
      "Song Request Section"
    ],
    longDescription: `A custom web application developed for Identity Radio that provides real-time station and music metadata integration. The app leverages the Deezer API to display current track cover art and information, enhancing the listening experience with visual elements.

    The application features a comprehensive suite of interactive features including live music streaming, a user chatbox for community engagement, and a song request system that allows listeners to participate in the station's programming.`
  },
  "ronami-international": {
    title: "Ronami International",
    description: "Ronami International, also known as Ronami Holdings Ltd, is a consultancy and supply of goods and services company that was established in 2013.",
    image: "https://zkayfzujzxogoaiafixg.supabase.co/storage/v1/object/public/projects//Ronami.png",
    demo: "https://ronamiinternational.com/",
    github: "https://github.com/wenslauce",
    technologies: ["Wordpress"],
    features: [
      "Custom WordPress Theme Development",
      "Responsive Design",
      "Performance Optimization",
      "SEO-Friendly Structure",
      "Modern UI/UX Design"
    ],
    longDescription: `Ronami International, established in 2013, is a leading consultancy and supply company specializing in goods and services. The company has built strong relationships with international private companies and organizations, facilitating successful business collaborations and partnerships.`
  },
  "ronami-online": {
    title: "Ronami Online",
    description: "Ronami Online is a Ronami International ultimate team collaboration tool, keeping all your team's tasks in one place. With real-time collaboration capabilities, you can work together seamlessly to achieve real results.",
    image: "https://zkayfzujzxogoaiafixg.supabase.co/storage/v1/object/public/projects//Ronami%20Online.png",
    demo: "https://ronami.online/",
    github: "https://github.com/wenslauce",
    technologies: ["Laravel"],
    features: [
      "Manage customers and leads",
      "Track client projects, invoices, and proposals/estimates",
      "Add company employees, track attendance and manage leaves",
      "Create contracts with clients with e-signatures",
      "Create projects, add project members, and track progress",
      "Use a Kanban taskboard to visualize work and tasks",
      "Use a project gantt chart to plan the project schedule"
    ],
    longDescription: `Ronami Online is a powerful team collaboration tool designed to streamline project management and collaboration for Ronami International. With real-time capabilities, it allows team members to work together seamlessly, ensuring efficient project execution and results.`
  },
  "othalo": {
    title: "OTHALO AS",
    description: "OTHALO™ has developed a patent technology to manufacture building systems using recycled plastic waste. The main market is the developing world where there is a massive need of affordable houses, refugee shelters, temperature controlled units for storage of food and medicines, camps for disasters and emergency situations.",
    image: "https://zkayfzujzxogoaiafixg.supabase.co/storage/v1/object/public/projects//Othalo.png",
    demo: "https://othalo.com/",
    github: "https://github.com/wenslauce",
    technologies: ["Wordpress"],
    features: [
      "Custom WordPress Theme Development",
      "Responsive Design",
      "Performance Optimization",
      "SEO-Friendly Structure",
      "Modern UI/UX Design"
    ],
    longDescription: `OTHALO™ has developed a patent technology to manufacture building systems using recycled plastic waste. The main market is the developing world where there is a massive need of affordable houses, refugee shelters, temperature controlled units for storage of food and medicines, camps for disasters and emergency situations.`
  },
  "afri-rise": {
    title: "Afri-Rise Equity Limited",
    description: "Afri-Rise is a Fund Management Consultancy firm formed to assist businesses in getting affordable financing for Private Sector African Projects that have a communal social impact. Afri-Rise has a combined management experience of over three decades, specializing in Business",
    image: "https://zkayfzujzxogoaiafixg.supabase.co/storage/v1/object/public/projects//Afri-Rise.png",
    demo: "https://afri-rise.com/",
    github: "https://github.com/wenslauce",
    technologies: ["Wordpress"],
    features: [
      "Custom WordPress Theme Development",
      "Responsive Design",
      "Performance Optimization",
      "SEO-Friendly Structure",
      "Modern UI/UX Design",
      "Payment Systems"
    ],
    longDescription: `Afri-Rise Equity Limited is a Fund Management Consultancy firm formed to assist businesses in getting affordable financing for Private Sector African Projects that have a communal social impact. With a combined management experience of over three decades, Afri-Rise specializes in providing financial solutions and consultancy services to businesses.`
  },
  "hon-peter": {
    title: "Hon. Peter Wandera Foundation",
    description: "The Hon. Peter Wandera Foundation was founded with a clear mission: to uplift and empower communities through meaningful, impactful change. Established by Hon. Peter Wandera, a former law enforcement officer turned philanthropist, the foundation is rooted in a deep sense of responsibility to serve and improve the lives of those in need.",
    image: "https://zkayfzujzxogoaiafixg.supabase.co/storage/v1/object/public/projects//Hon-Peter.png",
    demo: "https://honpeterwandera.com/",
    github: "https://github.com/wenslauce",
    technologies: ["Wordpress", "API"],
    features: [
      "Custom WordPress Theme Development",
      "Responsive Design",
      "Performance Optimization",
      "SEO-Friendly Structure",
      "Modern UI/UX Design",
      "Donation System"
    ],
    longDescription: `The Hon. Peter Wandera Foundation was founded with a clear mission: to uplift and empower communities through meaningful, impactful change. Established by Hon. Peter Wandera, a former law enforcement officer turned philanthropist, the foundation is rooted in a deep sense of responsibility to serve and improve the lives of those in need.`
  }
};

const Certifications = [
  {
    id: "cert-Journalism-2023",
    Title: "English For Journalism",
    Img: "https://zkayfzujzxogoaiafixg.supabase.co/storage/v1/object/public/projects//Journlism2023.png"
  },
  {
    id: "cert-afp-2024",
    Title: "AFP Certificate",
    Img: "https://zkayfzujzxogoaiafixg.supabase.co/storage/v1/object/public/projects//AFP.jpg"
  },
  {
    id: "cert-media-governance-2024",
    Title: "Media Governance Certificate",
    Img: "https://zkayfzujzxogoaiafixg.supabase.co/storage/v1/object/public/projects//media-amstra.png"
  }
];

export default function Portofolio() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [loading, setLoading] = useState(true);

  const defaultProjects = [
    {
      id: "9d721f4e-3a54-42c5-aea8-3f4b7c51e124",
      title: "Mukono Energies | Clean Energy",
      description: "Founded in 2024, Mukono Energies Uganda ltd converts Used Cooking Oil (UCO) into clean, renewable biodiesel.",
      image_url: "https://zkayfzujzxogoaiafixg.supabase.co/storage/v1/object/public/projects//Mukono%20Energies.png",
      demo_url: "https://mukonoenergies.com/",
      github_url: "https://github.com/wenslauce",
      technologies: ["Wordpress"],
      Features: [
        "Custom WordPress Theme Development",
        "Responsive Design",
        "Performance Optimization",
        "SEO-Friendly Structure",
        "Modern UI/UX Design"
      ]
    },
    {
      id: "6f943e2b-3a54-42c5-aea8-3f4b7c51e456",
      title: "X-Stream 1.0 | Entertainment",
      description: "X-Stream Entertainment is the ultimate destination for film and TV show lovers seeking an immersive, dynamic, and diverse streaming experience. Whether you're a fan of timeless classics, the latest blockbusters, niche indie films, or binge-worthy series, X-Stream Entertainment offers a comprehensive collection that caters to every taste and genre. With a user-friendly interface, X-Stream Entertainment makes discovering new content simple and enjoyable. Our platform is home to thousands of movies, TV series, documentaries, and exclusive content from all around the world, delivered in stunning high-definition quality.",
      image_url: "https://zkayfzujzxogoaiafixg.supabase.co/storage/v1/object/public/projects//X-Stream.png",
      demo_url: "https://x-streament.vercel.app/home",
      github_url: "https://github.com/wenslauce/X-Stream",
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind",
        "Vercel",
        "TMDb",
        "Vidsrc.to"
      ],
      Features: [
        "Browse Movies: Explore a vast collection of movies sorted by genre, release date, or popularity",
        "Search Functionality: Easily find movies by title, director, or cast",
        "Recommendation Engine: Get personalized movie recommendations based on your preferences and viewing history",
        "Responsive Design: Enjoy a seamless experience across devices with our responsive web design"
      ]
    },
    {
      id: "7b832e5d-3a54-42c5-aea8-3f4b7c51e789",
      title: "Identity Radio | Identity Newsroom",
      description: "This is a custom web app for Identity Radio, able to show station metadata, music metadata and use deezer api to show cover art of the current playing music",
      image_url: "https://zkayfzujzxogoaiafixg.supabase.co/storage/v1/object/public/projects//Identity-Radio.png",
      demo_url: "https://radio.wenslauce.com/",
      github_url: "https://github.com/wenslauce/Identity-Radio",
      technologies: [
        "Vite",
        "TypeScript",
        "React",
        "shadcn-ui",
        "Tailwind CSS"
      ],
      Features: [
        "Listen Music",
        "Users Chatbox", 
        "Song Request Section"
      ]
    },
    {
      id: "9d721f4e-3a54-42c5-aea8-3f4b7c51e123",
      title: "KenyaLaw AI",
      description: "KenyaLaw AI is an interactive platform that helps users understand and explore Kenya's Constitution using artificial intelligence. The application provides easy access to constitutional information, smart search capabilities, and AI-powered assistance for constitutional queries.",
      image_url: "https://zkayfzujzxogoaiafixg.supabase.co/storage/v1/object/public/projects//KenyaLawAI.png",
      demo_url: "https://kenya.wenslauce.com/",
      github_url: "https://github.com/wenslauce/Kenya-Law-Ai",
      technologies: [
        "React 18",
        "TypeScript",
        "Vite",
        "TailwindCSS",
        "shadcn/ui",
        "Gemini AI API",
        "React Router",
        "React Query"
      ],
      Features: [
        "Constitution Explorer: Browse through chapters of Kenya's Constitution with detailed explanations",
        "Smart Search: Search specific articles and interpretations with AI-powered results",
        "AI Assistant: Get instant, context-aware answers to your constitutional questions", 
        "Responsive Design: Fully responsive interface that works on all devices",
        "PWA Support: Install as a Progressive Web App for offline access"
      ]
    },
    {
      id: "8c110f4f-3a54-42c5-aea8-3f4b7c51e359",
      title: "W. Giertsen Energy Solutions",
      description: "This is a custom theme built exclusively for W. Giertsen Energy, designed to provide a seamless and optimized digital experience. Tailored to meet the company's specific needs, it ensures reliability, performance, and ease of use while maintaining a professional and modern design.",
      image_url: "https://zkayfzujzxogoaiafixg.supabase.co/storage/v1/object/public/projects//Energy-Solutions.png",
      demo_url: "https://giertsenenergy.com/",
      github_url: null,
      technologies: ["Wordpress", "GSAP"],
      Features: [
        "Custom WordPress Theme Development",
        "Responsive Design",
        "GSAP Animations",
        "Performance Optimization",
        "SEO-Friendly Structure",
        "Modern UI/UX Design"
      ]
    },
    {
      id: "9d721f4e-3a54-42c5-aea8-3f4b7c51e125",
      title: "Ronami International",
      description: "Ronami International, also known as Ronami Holdings Ltd, is a consultancy and supply of goods and services company that was established in 2013. The company operates with a focus on collaborating closely with international private companies and organizations.",
      image_url: "https://zkayfzujzxogoaiafixg.supabase.co/storage/v1/object/public/projects//Ronami.png",
      demo_url: "https://ronamiinternational.com/",
      github_url: "https://github.com/wenslauce",
      technologies: ["Wordpress"],
      Features: [
        "Custom WordPress Theme Development",
        "Responsive Design",
        "Performance Optimization",
        "SEO-Friendly Structure",
        "Modern UI/UX Design"
      ]
    },
    {
      id: "9d721f4e-3a54-42c5-aea8-3f4b7c51e126",
      title: "Ronami Online",
      description: "Ronami Online is a Ronami International ultimate team collaboration tool, keeping all your team's tasks in one place. With real-time collaboration capabilities, you can work together seamlessly to achieve real results.",
      image_url: "https://zkayfzujzxogoaiafixg.supabase.co/storage/v1/object/public/projects//Ronami%20Online.png",
      demo_url: "https://ronami.online/",
      github_url: "https://github.com/wenslauce",
      technologies: ["Laravel"],
      Features: [
        "Manage customers and leads",
        "Track client projects, invoices, and proposals/estimates",
        "Add company employees, track attendance and manage leaves",
        "Create contracts with clients with e-signatures",
        "Create projects, add project members, and track progress",
        "Use a Kanban taskboard to visualize work and tasks",
        "Use a project gantt chart to plan the project schedule"
      ]
    },
    {
      id: "9d721f4e-3a54-42c5-aea8-3f4b7c51e127",
      title: "Othalo AS",
      description: "OTHALO™ has developed a patent technology to manufacture building systems using recycled plastic waste. The main market is the developing world where there is a massive need of affordable houses, refugee shelters, temperature controlled units for storage of food and medicines, camps for disasters and emergency situations.",
      image_url: "https://zkayfzujzxogoaiafixg.supabase.co/storage/v1/object/public/projects//Othalo.png",
      demo_url: "https://othalo.com/",
      github_url: "https://github.com/wenslauce",
      technologies: ["Wordpress"],
      Features: [
        "Custom WordPress Theme Development",
        "Responsive Design",
        "Performance Optimization",
        "SEO-Friendly Structure",
        "Modern UI/UX Design"
      ]
    },
    {
      id: "9d721f4e-3a54-42c5-aea8-3f4b7c51e128",
      title: "Afri-Rise Equity Limited",
      description: "Afri-Rise is a Fund Management Consultancy firm formed to assist businesses in getting affordable financing for Private Sector African Projects that have a communal social impact. Afri-Rise has a combined management experience of over three decades, specializing in Business",
      image_url: "https://zkayfzujzxogoaiafixg.supabase.co/storage/v1/object/public/projects//Afri-Rise.png",
      demo_url: "https://afri-rise.com/",
      github_url: "https://github.com/wenslauce",
      technologies: ["Wordpress"],
      Features: [
        "Custom WordPress Theme Development",
        "Responsive Design",
        "Performance Optimization",
        "SEO-Friendly Structure",
        "Modern UI/UX Design",
        "Payment Systems"
      ]
    },
    {
      id: "9d721f4e-3a54-42c5-aea8-3f4b7c51e129",
      title: "Hon. Peter Wandera Foundation",
      description: "The Hon. Peter Wandera Foundation was founded with a clear mission: to uplift and empower communities through meaningful, impactful change. Established by Hon. Peter Wandera, a former law enforcement officer turned philanthropist, the foundation is rooted in a deep sense of responsibility to serve and improve the lives of those in need.",
      image_url: "https://zkayfzujzxogoaiafixg.supabase.co/storage/v1/object/public/projects//Hon-Peter.png",
      demo_url: "https://honpeterwandera.com/",
      github_url: "https://github.com/wenslauce",
      technologies: ["Wordpress", "API"],
      Features: [
        "Custom WordPress Theme Development",
        "Responsive Design",
        "Performance Optimization",
        "SEO-Friendly Structure",
        "Modern UI/UX Design",
        "Donation System"
      ]
    }
  ];

  const fetchData = useCallback(() => {
    try {
      setLoading(true);
      
      // Set projects
      localStorage.setItem("projects", JSON.stringify(defaultProjects));
      setProjects(defaultProjects);

      // Define certificates with both AFP and Google Creative certificates
      const defaultCertificates = Certifications;

      // Store certificates in localStorage
      localStorage.setItem("certificates", JSON.stringify(defaultCertificates));
      setCertificates(defaultCertificates);
      
    } catch (error) {
      console.error('Error handling data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    AOS.init({
      once: false,
    });
    fetchData();
  }, [fetchData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback((type) => {
    if (type === 'projects') {
      setShowAllProjects(prev => !prev);
    } else {
      setShowAllCertificates(prev => !prev);
    }
  }, []);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, 3);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, 3);

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Portofolio">
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span style={{
            color: '#6366f1',
            backgroundImage: 'linear-gradient(45deg, #6366f1 10%, #a855f7 93%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, certifications, and technical expertise. 
          Each section represents a milestone in my continuous learning path.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-2px)",
                  "& .lucide": {
                    transform: "scale(1.1) rotate(5deg)",
                  },
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                  "& .lucide": {
                    color: "#a78bfa",
                  },
                },
              },
              "& .MuiTabs-indicator": {
                height: 0,
              },
              "& .MuiTabs-flexContainer": {
                gap: "8px",
              },
            }}
          >
            <Tab
              icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Projects"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Award className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Certificates"
              {...a11yProps(1)}
            />
            <Tab
              icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Tech Stack"
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>

        <div className="md:px-4">
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <>
              <TabPanel value={value} index={0}>
                <div className="container mx-auto flex justify-center items-center overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                    {displayedProjects.map((project, index) => (
                      <div
                        key={project.id || index}
                        data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                        data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                      >
                        <CardProject
                          Img={project.image_url}
                          Title={project.title}
                          Description={project.description}
                          Link={project.demo_url}
                          id={project.id}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                {projects.length > initialItems && (
                  <div className="mt-6 w-full flex justify-start">
                    <ToggleButton
                      onClick={() => toggleShowMore('projects')}
                      isShowingMore={showAllProjects}
                    />
                  </div>
                )}
              </TabPanel>

              <TabPanel value={value} index={1}>
                <div className="container mx-auto flex justify-center items-center overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
                    {displayedCertificates.map((certificate, index) => (
                      <div
                        key={index}
                        data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                        data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                      >
                        <Certificate ImgSertif={certificate.Img} />
                      </div>
                    ))}
                  </div>
                </div>
                {certificates.length > initialItems && (
                  <div className="mt-6 w-full flex justify-start">
                    <ToggleButton
                      onClick={() => toggleShowMore('certificates')}
                      isShowingMore={showAllCertificates}
                    />
                  </div>
                )}
              </TabPanel>

              <TabPanel value={value} index={2}>
                <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
                    {techStacks.map((stack, index) => (
                      <div
                        key={index}
                        data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                        data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                      >
                        <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                      </div>
                    ))}
                  </div>
                </div>
              </TabPanel>
            </>
          )}
        </div>
      </Box>
    </div>
  );
}