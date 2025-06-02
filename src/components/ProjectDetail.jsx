import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import {
  ArrowLeft, ExternalLink, Github, Code2, Star,
  ChevronRight, Layers, Layout, Globe, Package, Cpu, Code,
} from "lucide-react";
import Swal from 'sweetalert2';

const TECH_ICONS = {
  React: Globe,
  Tailwind: Layout,
  Express: Cpu,
  Python: Code,
  Javascript: Code,
  HTML: Code,
  CSS: Code,
  default: Package,
};

const TechBadge = ({ tech }) => {
  const Icon = TECH_ICONS[tech] || TECH_ICONS["default"];
  
  return (
    <div className="group relative overflow-hidden px-3 py-2 md:px-4 md:py-2.5 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 cursor-default">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500" />
      <div className="relative flex items-center gap-1.5 md:gap-2">
        <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
        <span className="text-xs md:text-sm font-medium text-blue-300/90 group-hover:text-blue-200 transition-colors">
          {tech}
        </span>
      </div>
    </div>
  );
};

const FeatureItem = ({ feature }) => {
  return (
    <li className="group flex items-start space-x-3 p-2.5 md:p-3.5 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10">
      <div className="relative mt-2">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
        <div className="relative w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 group-hover:scale-125 transition-transform duration-300" />
      </div>
      <span className="text-sm md:text-base text-gray-300 group-hover:text-white transition-colors">
        {feature}
      </span>
    </li>
  );
};

const ProjectStats = ({ project }) => {
  const techStackCount = project?.technologies?.length || 0;
  const featuresCount = project?.Features?.length || 0;

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 p-3 md:p-4 bg-[#0a0a1a] rounded-xl overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 opacity-50 blur-2xl z-0" />

      <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white/5 p-2 md:p-3 rounded-lg border border-blue-500/20 transition-all duration-300 hover:scale-105 hover:border-blue-500/50 hover:shadow-lg">
        <div className="bg-blue-500/20 p-1.5 md:p-2 rounded-full">
          <Code2 className="text-blue-300 w-4 h-4 md:w-6 md:h-6" strokeWidth={1.5} />
        </div>
        <div className="flex-grow">
          <div className="text-lg md:text-xl font-semibold text-blue-200">{techStackCount}</div>
          <div className="text-[10px] md:text-xs text-gray-400">Total Technology</div>
        </div>
      </div>

      <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white/5 p-2 md:p-3 rounded-lg border border-purple-500/20 transition-all duration-300 hover:scale-105 hover:border-purple-500/50 hover:shadow-lg">
        <div className="bg-purple-500/20 p-1.5 md:p-2 rounded-full">
          <Layers className="text-purple-300 w-4 h-4 md:w-6 md:h-6" strokeWidth={1.5} />
        </div>
        <div className="flex-grow">
          <div className="text-lg md:text-xl font-semibold text-purple-200">{featuresCount}</div>
          <div className="text-[10px] md:text-xs text-gray-400">Key Features</div>
        </div>
      </div>
    </div>
  );
};

const handleGithubClick = (githubLink) => {
  if (githubLink === 'Private') {
    Swal.fire({
      icon: 'info',
      title: 'Source Code Private',
      text: 'Maaf, source code untuk proyek ini bersifat privat.',
      confirmButtonText: 'Mengerti',
      confirmButtonColor: '#3085d6',
      background: '#030014',
      color: '#ffffff'
    });
    return false;
  }
  return true;
};

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const projects = [
      {
        id: "9d721f4e-3a54-42c5-aea8-3f4b7c51e124",
        title: "Mukono Energies | Clean Energy",
        description: "Founded in 2024, Mukono Energies Uganda ltd converts Used Cooking Oil (UCO) into clean, renewable biodiesel. Our custom WordPress theme showcases their commitment to sustainable energy solutions while ensuring optimal performance and user experience.",
        image_url: "https://zkayfzujzxogoaiafixg.supabase.co/storage/v1/object/public/projects//Mukono%20Energies.png",
        demo_url: "https://mukonoenergies.com/",
        github_url: "https://github.com/wenslauce",
        technologies: [
          "Wordpress",
          "PHP",
          "JavaScript",
          "CSS",
          "MySQL"
        ],
        Features: [
          "Custom WordPress Theme Development",
          "Responsive Design",
          "Performance Optimization",
          "SEO-Friendly Structure",
          "Modern UI/UX Design",
          "Mobile-First Approach",
          "Cross-Browser Compatibility"
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
        technologies: [
          "Wordpress",
          "PHP",
          "JavaScript",
          "CSS",
          "MySQL"
        ],
        Features: [
          "Custom WordPress Theme Development",
          "Responsive Design",
          "Performance Optimization",
          "SEO-Friendly Structure",
          "Modern UI/UX Design",
          "Mobile-First Approach",
          "Cross-Browser Compatibility"
        ]
      },
      {
        id: "9d721f4e-3a54-42c5-aea8-3f4b7c51e126",
        title: "Ronami Online",
        description: "Ronami Online is a Ronami International ultimate team collaboration tool, keeping all your team's tasks in one place. With real-time collaboration capabilities, you can work together seamlessly to achieve real results.",
        image_url: "https://zkayfzujzxogoaiafixg.supabase.co/storage/v1/object/public/projects//Ronami%20Online.png",
        demo_url: "https://ronami.online/",
        github_url: "https://github.com/wenslauce",
        technologies: [
          "Laravel",
          "PHP",
          "MySQL",
          "JavaScript",
          "CSS",
          "HTML",
          "REST API"
        ],
        Features: [
          "Manage customers and leads",
          "Track client projects, invoices, and proposals/estimates",
          "Add company employees, track attendance and manage leaves",
          "Create contracts with clients with e-signatures",
          "Create projects, add project members, and track progress",
          "Use a Kanban taskboard to visualize work and tasks",
          "Use a project gantt chart to plan the project schedule",
          "Real-time collaboration features",
          "Advanced reporting and analytics"
        ]
      },
      {
        id: "9d721f4e-3a54-42c5-aea8-3f4b7c51e127",
        title: "Othalo AS",
        description: "OTHALO™ has developed a patent technology to manufacture building systems using recycled plastic waste. The main market is the developing world where there is a massive need of affordable houses, refugee shelters, temperature controlled units for storage of food and medicines, camps for disasters and emergency situations.",
        image_url: "https://zkayfzujzxogoaiafixg.supabase.co/storage/v1/object/public/projects//Othalo.png",
        demo_url: "https://othalo.com/",
        github_url: "https://github.com/wenslauce",
        technologies: [
          "Wordpress",
          "PHP",
          "JavaScript",
          "CSS",
          "MySQL",
          "GSAP Animations"
        ],
        Features: [
          "Custom WordPress Theme Development",
          "Responsive Design",
          "Performance Optimization",
          "SEO-Friendly Structure",
          "Modern UI/UX Design",
          "Interactive Animations",
          "Multi-language Support",
          "Custom Post Types",
          "Advanced Custom Fields"
        ]
      },
      {
        id: "9d721f4e-3a54-42c5-aea8-3f4b7c51e128",
        title: "Afri-Rise Equity Limited",
        description: "Afri-Rise is a Fund Management Consultancy firm formed to assist businesses in getting affordable financing for Private Sector African Projects that have a communal social impact. Afri-Rise has a combined management experience of over three decades, specializing in Business",
        image_url: "https://zkayfzujzxogoaiafixg.supabase.co/storage/v1/object/public/projects//Afri-Rise.png",
        demo_url: "https://afri-rise.com/",
        github_url: "https://github.com/wenslauce",
        technologies: [
          "Wordpress",
          "PHP",
          "JavaScript",
          "CSS",
          "MySQL",
          "Payment Gateway Integration"
        ],
        Features: [
          "Custom WordPress Theme Development",
          "Responsive Design",
          "Performance Optimization",
          "SEO-Friendly Structure",
          "Modern UI/UX Design",
          "Payment Systems",
          "Secure Transaction Processing",
          "Custom Financial Calculators",
          "Document Management System"
        ]
      },
      {
        id: "9d721f4e-3a54-42c5-aea8-3f4b7c51e129",
        title: "Hon. Peter Wandera Foundation",
        description: "The Hon. Peter Wandera Foundation was founded with a clear mission: to uplift and empower communities through meaningful, impactful change. Established by Hon. Peter Wandera, a former law enforcement officer turned philanthropist, the foundation is rooted in a deep sense of responsibility to serve and improve the lives of those in need.",
        image_url: "https://zkayfzujzxogoaiafixg.supabase.co/storage/v1/object/public/projects//Hon-Peter.png",
        demo_url: "https://honpeterwandera.com/",
        github_url: "https://github.com/wenslauce",
        technologies: [
          "Wordpress",
          "PHP",
          "JavaScript",
          "CSS",
          "MySQL",
          "Payment API",
          "Donation System"
        ],
        Features: [
          "Custom WordPress Theme Development",
          "Responsive Design",
          "Performance Optimization",
          "SEO-Friendly Structure",
          "Modern UI/UX Design",
          "Donation System",
          "Event Management",
          "Newsletter Integration",
          "Social Media Integration",
          "Impact Tracking Dashboard"
        ]
      }
    ];

    // Store in localStorage
    localStorage.setItem("projects", JSON.stringify(projects));

    // Find the project by ID
    const selectedProject = projects.find(p => p.id === id);
    if (selectedProject) {
      setProject(selectedProject);
    }

    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 md:w-24 md:h-24 mx-auto border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
          <h2 className="text-xl md:text-3xl font-bold text-white">Loading Project...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030014] px-[2%] sm:px-0 relative overflow-hidden">
      {/* Background animations remain unchanged */}
      <div className="fixed inset-0">
        <div className="absolute -inset-[10px] opacity-20">
          <div className="absolute top-0 -left-4 w-72 md:w-96 h-72 md:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-0 -right-4 w-72 md:w-96 h-72 md:h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 md:w-96 h-72 md:h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
        </div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
      </div>

      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
          <div className="flex items-center space-x-2 md:space-x-4 mb-8 md:mb-12 animate-fadeIn">
            <button
              onClick={() => navigate(-1)}
              className="group inline-flex items-center space-x-1.5 md:space-x-2 px-3 md:px-5 py-2 md:py-2.5 bg-white/5 backdrop-blur-xl rounded-xl text-white/90 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 text-sm md:text-base"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back</span>
            </button>
            <div className="flex items-center space-x-1 md:space-x-2 text-sm md:text-base text-white/50">
              <span>Projects</span>
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
              <span className="text-white/90 truncate">{project.title}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-16">
            <div className="space-y-6 md:space-y-10 animate-slideInLeft">
              <div className="space-y-4 md:space-y-6">
                <h1 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
                  {project.title}
                </h1>
                <div className="relative h-1 w-16 md:w-24">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm" />
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-base md:text-lg text-gray-300/90 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <ProjectStats project={project} />

              <div className="flex flex-wrap gap-3 md:gap-4">
                {/* Action buttons */}
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-8 py-2.5 md:py-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10 hover:from-blue-600/20 hover:to-purple-600/20 text-blue-300 rounded-xl transition-all duration-300 border border-blue-500/20 hover:border-blue-500/40 backdrop-blur-xl overflow-hidden text-sm md:text-base"
                >
                  <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-blue-600/10 to-purple-600/10 transition-transform duration-300 group-hover:translate-y-[0%]" />
                  <ExternalLink className="relative w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                  <span className="relative font-medium">Live Demo</span>
                </a>

                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-8 py-2.5 md:py-4 bg-gradient-to-r from-purple-600/10 to-pink-600/10 hover:from-purple-600/20 hover:to-pink-600/20 text-purple-300 rounded-xl transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40 backdrop-blur-xl overflow-hidden text-sm md:text-base"
                  onClick={(e) => !handleGithubClick(project.github_url) && e.preventDefault()}
                >
                  <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-purple-600/10 to-pink-600/10 transition-transform duration-300 group-hover:translate-y-[0%]" />
                  <Github className="relative w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                  <span className="relative font-medium">Github</span>
                </a>
              </div>

              <div className="space-y-4 md:space-y-6">
                <h3 className="text-lg md:text-xl font-semibold text-white/90 mt-[3rem] md:mt-0 flex items-center gap-2 md:gap-3">
                  <Code2 className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                  Technologies Used
                </h3>
                {project.technologies.length > 0 ? (
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {project.technologies.map((tech, index) => (
                      <TechBadge key={index} tech={tech} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm md:text-base text-gray-400 opacity-50">No technologies added.</p>
                )}
              </div>
            </div>

            <div className="space-y-6 md:space-y-10 animate-slideInRight">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
              
                <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full  object-cover transform transition-transform duration-700 will-change-transform group-hover:scale-105"
                  onLoad={() => setIsImageLoaded(true)}
                />
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/10 transition-colors duration-300 rounded-2xl" />
              </div>

              {/* Key Features */}
              <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl p-8 border border-white/10 space-y-6 hover:border-white/20 transition-colors duration-300 group">
                <h3 className="text-xl font-semibold text-white/90 flex items-center gap-3">
                  <Star className="w-5 h-5 text-yellow-400 group-hover:rotate-[20deg] transition-transform duration-300" />
                  Key Features
                </h3>
                {project.Features.length > 0 ? (
                  <ul className="list-none space-y-2">
                    {project.Features.map((feature, index) => (
                      <FeatureItem key={index} feature={feature} />
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 opacity-50">No features added.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fadeIn {
          animation: fadeIn 0.7s ease-out;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.7s ease-out;
        }
        .animate-slideInRight {
          animation: slideInRight 0.7s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectDetails;
