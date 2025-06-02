import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, ExternalLink, Award, Calendar, School,
  ChevronRight, BookOpen, CheckCircle, Globe
} from "lucide-react";
import SEO from './SEO';
import { generateCertificateKeywords, optimizeDescription, generateCertificateStructuredData } from '../utils/seo';

const SkillBadge = ({ skill }) => {
  return (
    <div className="group relative overflow-hidden px-3 py-2 md:px-4 md:py-2.5 bg-gradient-to-r from-green-600/10 to-blue-600/10 rounded-xl border border-green-500/10 hover:border-green-500/30 transition-all duration-300 cursor-default">
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 to-blue-500/0 group-hover:from-green-500/10 group-hover:to-blue-500/10 transition-all duration-500" />
      <div className="relative flex items-center gap-1.5 md:gap-2">
        <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-400 group-hover:text-green-300 transition-colors" />
        <span className="text-xs md:text-sm font-medium text-green-300/90 group-hover:text-green-200 transition-colors">
          {skill}
        </span>
      </div>
    </div>
  );
};

const CertificateDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [certificate, setCertificate] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const certificates = [
      {
        id: "cert-journalism-2023",
        title: "English for Journalism",
        institution: "University of Pennsylvania",
        description: "Comprehensive journalism training focusing on English language proficiency, writing techniques, and media ethics for modern journalism practices. This certificate program covers essential skills for modern journalists including writing clarity, ethical reporting standards, and effective communication in the digital age.",
        image: "https://zkayfzujzxogoaiafixg.supabase.co/storage/v1/object/public/projects//Journlism2023.png",
        year: "2023",
        skills: ["Journalism Writing", "Media Ethics", "English Proficiency", "Editorial Standards", "Digital Reporting", "Fact-Checking"],
        credentialUrl: "https://www.coursera.org/account/accomplishments/certificate/3JEVAZUU5HD8",
        duration: "4 months",
        level: "Intermediate",
        topics: [
          "English Language for Journalism",
          "Writing Techniques and Style",
          "Media Ethics and Standards",
          "Digital Journalism Practices",
          "Editorial Decision Making",
          "Fact-Checking and Verification"
        ]
      },
      {
        id: "cert-afp-2024",
        title: "Learn methods for dealing with online harassment and for staying safe online",
        institution: "Agence France-Presse",
        description: "Professional training on digital safety, online harassment prevention, and protective measures for media professionals in the digital age. This comprehensive course covers essential security protocols, harassment mitigation strategies, and digital safety best practices for journalists and media professionals operating in challenging online environments.",
        image: "https://zkayfzujzxogoaiafixg.supabase.co/storage/v1/object/public/projects//AFP.jpg",
        year: "2023",
        skills: ["Digital Safety", "Online Security", "Harassment Prevention", "Media Protection", "Crisis Management", "Digital Forensics"],
        credentialUrl: "https://digitalcourses.afp.com/certificates/45t3mb7zsa",
        duration: "6 weeks",
        level: "Advanced",
        topics: [
          "Online Harassment Recognition",
          "Digital Security Protocols",
          "Privacy Protection Measures",
          "Crisis Response Strategies",
          "Legal Framework Understanding",
          "Support System Development"
        ]
      },
      {
        id: "cert-media-ethics-2024",
        title: "Media Ethics and Governance",
        institution: "University of Amsterdam",
        description: "Advanced course covering media ethics, governance frameworks, and responsible journalism practices in the digital era. This program explores contemporary challenges in media governance, ethical decision-making frameworks, and the evolving landscape of digital journalism responsibility.",
        image: "https://zkayfzujzxogoaiafixg.supabase.co/storage/v1/object/public/projects//media-amstra.png",
        year: "2025",
        skills: ["Data Ethics", "Advertising", "Business Ethics", "Media and Communications", "Research", "Journalism", "Governance", "Ethical Standards And Conduct"],
        credentialUrl: "https://coursera.org/verify/G7H7A5JOU2YW",
        duration: "8 hours",
        level: "Advanced",
        topics: [
          "Media Ethics Frameworks",
          "Governance and Regulation",
          "Digital Media Responsibility",
          "Global Media Standards",
          "Ethical Decision Making",
          "Policy Development and Analysis"
        ]
      }
    ];

    // Store in localStorage
    localStorage.setItem("certificates", JSON.stringify(certificates));

    // Find the certificate by ID
    const selectedCertificate = certificates.find(cert => cert.id === id);
    if (selectedCertificate) {
      setCertificate(selectedCertificate);
    }

    window.scrollTo(0, 0);
  }, [id]);

  // Generate SEO data for the certificate
  const generateCertificateSEOData = (certificate) => {
    if (!certificate) return {};
    
    return {
      title: `${certificate.title} | ${certificate.institution} | Wenslauce Chengo`,
      description: optimizeDescription(certificate.description),
      image: certificate.image,
      url: `https://wenslauce.com/certificate/${certificate.id}`,
      keywords: generateCertificateKeywords(certificate),
      type: "article",
      structuredData: generateCertificateStructuredData(certificate)
    };
  };

  const seoData = generateCertificateSEOData(certificate);

  if (!certificate) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 md:w-24 md:h-24 mx-auto border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin" />
          <h2 className="text-xl md:text-3xl font-bold text-white">Loading Certificate...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030014] px-[2%] sm:px-0 relative overflow-hidden">
      {/* SEO Meta Tags */}
      <SEO {...seoData} />

      {/* Background animations */}
      <div className="fixed inset-0">
        <div className="absolute -inset-[10px] opacity-20">
          <div className="absolute top-0 -left-4 w-72 md:w-96 h-72 md:h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-0 -right-4 w-72 md:w-96 h-72 md:h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 md:w-96 h-72 md:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
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
              <span>Certificates</span>
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
              <span className="text-white/90 truncate">{certificate.title}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-16">
            <div className="space-y-6 md:space-y-10 animate-slideInLeft">
              <div className="space-y-4 md:space-y-6">
                <h1 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight">
                  {certificate.title}
                </h1>
                <div className="relative h-1 w-16 md:w-24">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-full animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-full blur-sm" />
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-base md:text-lg text-gray-300/90 leading-relaxed">
                  {certificate.description}
                </p>
              </div>

              {/* Certificate Info */}
              <div className="grid grid-cols-2 gap-3 md:gap-4 p-3 md:p-4 bg-[#0a0a1a] rounded-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-blue-900/20 opacity-50 blur-2xl z-0" />

                <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white/5 p-2 md:p-3 rounded-lg border border-green-500/20 transition-all duration-300 hover:scale-105 hover:border-green-500/50">
                  <div className="bg-green-500/20 p-1.5 md:p-2 rounded-full">
                    <School className="text-green-300 w-4 h-4 md:w-6 md:h-6" strokeWidth={1.5} />
                  </div>
                  <div className="flex-grow">
                    <div className="text-sm md:text-base font-semibold text-green-200">{certificate.institution}</div>
                    <div className="text-[10px] md:text-xs text-gray-400">Institution</div>
                  </div>
                </div>

                <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white/5 p-2 md:p-3 rounded-lg border border-blue-500/20 transition-all duration-300 hover:scale-105 hover:border-blue-500/50">
                  <div className="bg-blue-500/20 p-1.5 md:p-2 rounded-full">
                    <Calendar className="text-blue-300 w-4 h-4 md:w-6 md:h-6" strokeWidth={1.5} />
                  </div>
                  <div className="flex-grow">
                    <div className="text-sm md:text-base font-semibold text-blue-200">{certificate.year}</div>
                    <div className="text-[10px] md:text-xs text-gray-400">Year Completed</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 md:gap-4">
                <a
                  href={certificate.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-8 py-2.5 md:py-4 bg-gradient-to-r from-green-600/10 to-blue-600/10 hover:from-green-600/20 hover:to-blue-600/20 text-green-300 rounded-xl transition-all duration-300 border border-green-500/20 hover:border-green-500/40 backdrop-blur-xl overflow-hidden text-sm md:text-base"
                >
                  <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-green-600/10 to-blue-600/10 transition-transform duration-300 group-hover:translate-y-[0%]" />
                  <ExternalLink className="relative w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                  <span className="relative font-medium">View Credential</span>
                </a>
              </div>

              <div className="space-y-4 md:space-y-6">
                <h3 className="text-lg md:text-xl font-semibold text-white/90 mt-[3rem] md:mt-0 flex items-center gap-2 md:gap-3">
                  <Award className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
                  Skills Acquired
                </h3>
                {certificate.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {certificate.skills.map((skill, index) => (
                      <SkillBadge key={index} skill={skill} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm md:text-base text-gray-400 opacity-50">No skills listed.</p>
                )}
              </div>
            </div>

            <div className="space-y-6 md:space-y-10 animate-slideInRight">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={certificate.image}
                  alt={certificate.title}
                  className="w-full object-cover transform transition-transform duration-700 will-change-transform group-hover:scale-105"
                  onLoad={() => setIsImageLoaded(true)}
                />
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/10 transition-colors duration-300 rounded-2xl" />
              </div>

              {/* Certificate Topics */}
              {certificate.topics && (
                <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl p-8 border border-white/10 space-y-6 hover:border-white/20 transition-colors duration-300 group">
                  <h3 className="text-xl font-semibold text-white/90 flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-yellow-400 group-hover:rotate-[20deg] transition-transform duration-300" />
                    Course Topics
                  </h3>
                  <ul className="list-none space-y-2">
                    {certificate.topics.map((topic, index) => (
                      <li key={index} className="group flex items-start space-x-3 p-2.5 md:p-3.5 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10">
                        <div className="relative mt-2">
                          <div className="absolute -inset-1 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-full blur group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
                          <div className="relative w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-green-400 to-blue-400 group-hover:scale-125 transition-transform duration-300" />
                        </div>
                        <span className="text-sm md:text-base text-gray-300 group-hover:text-white transition-colors">
                          {topic}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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

export default CertificateDetail; 