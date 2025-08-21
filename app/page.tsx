"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Mail, Linkedin, Instagram, ExternalLink, Briefcase, GraduationCap, Sparkles } from "lucide-react"

export default function HomePage() {
  // Typewriter effect for hero title and intro
  const titleTextRaw = "Hi, this is Rae";
  const introTextRaw = "I graduated from Peking University in 2024 and have worked as a Growth Operations specialist at an AI startup in Haidian, Beijing, starting as an intern before becoming a full-time employee.";
  const [typedTitle, setTypedTitle] = useState("");
  const [typedText, setTypedText] = useState("");
  
  useEffect(() => {
    let i = 0;
    const typeTitle = () => {
      if (i <= titleTextRaw.length) {
        setTypedTitle(titleTextRaw.slice(0, i));
        i++;
        setTimeout(typeTitle, 60);
      }
    };
    typeTitle();
    
    // After title finishes, start intro after 3s
    setTimeout(() => {
      let j = 0;
      const typeIntro = () => {
        if (j <= introTextRaw.length) {
          setTypedText(introTextRaw.slice(0, j));
          j++;
          setTimeout(typeIntro, 30);
        }
      };
      typeIntro();
    }, titleTextRaw.length * 60 + 3000); // 3s after title
    
    return () => {};
  }, []);

  const [isLoading, setIsLoading] = useState(true)
  const [visibleSections, setVisibleSections] = useState<string[]>([])
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [loadingTexts, setLoadingTexts] = useState<{ [key: string]: string[] }>({})
  const [bioWordsVisible, setBioWordsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      const sections = ["hero", "about", "timeline"]
      sections.forEach((section, index) => {
        setTimeout(() => {
          setVisibleSections((prev) => [...prev, section])
          if (section === "about") {
            setTimeout(() => setBioWordsVisible(true), 500)
          }
        }, index * 200)
      })
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // 点击卡片时切换展开状态
  const getCompanyContent = (company: string): string => {
    switch (company) {
      case "36kr":
        return "During my internship at 36Kr, I worked as a content intern focusing on overseas business articles within a startup media team. With significant creative freedom from my supervisor, I independently completed two well-received articles, handling everything from topic planning and desk research to interviews and writing. This experience honed my market research and resource integration skills and sparked a deep interest in global business."
      case "bytedance":
        return "Curious about big tech, I joined ByteDance as a content operations intern for Toutiao's encyclopedia business. The role gave me insight into large corporations, with their robust structures, mature workflows, and vast knowledge bases. However, the intern tasks were highly fragmented, requiring strict adherence to SOPs with little room for creativity, even in planning activities. I felt like a cog in a machine, unsure of my impact, which led me to consider leaving the corporate world."
      case "rightbrain":
        return "Later, a serendipitous opportunity brought me to RightBrain AI, a startup fresh off its angel round, where I was the only intern in the operations team, reporting directly to the founder. As the team grew with like-minded colleagues, the environment buzzed with energy and creativity. I contributed to the cold launch of a million-user AIGC creation tool, managed official social media accounts on X, Instagram, TikTok, and the official Discord community, built my first data dashboard while learning SQL, connected with global users, self-taught Google Ads via YouTube to run my first ad account, wrote PRDs for growth campaigns, and even learned Vibe Coding to create event pages. This rapid growth fueled my passion for AI product growth—nothing excites me more than pushing my boundaries and embracing the possibilities of the unpredictable AI landscape."
      default:
        return ""
    }
  }

  const handleCardClick = (company: string) => {
    if (expandedCard === company) {
      // 如果点击已展开的卡片，则收起
      setExpandedCard(null)
      setLoadingTexts(prev => ({ ...prev, [company]: [] }))
    } else {
      // 如果点击新卡片，则展开新卡片并收起之前的卡片
      const prevCard = expandedCard
      setExpandedCard(company)
      
      // 清除之前展开卡片的内容
      if (prevCard) {
        setLoadingTexts(prev => ({ ...prev, [prevCard]: [] }))
      }
      
      // 为新卡片加载内容
      handleCompanyHover(company, getCompanyContent(company))
    }
  }

  const handleCompanyHover = (company: string, text: string) => {
    // 改进分词逻辑，保持短语的完整性
    const words = text.split(/(?<=[.!?;,])\s+|\s+(?=[.!?;,])|(?<!\S-)\s+(?!-\S)/g)
      .filter(word => word.length > 0)
      .map(word => word.trim())
    
    setLoadingTexts(prev => ({ ...prev, [company]: [] }))

    words.forEach((word, index) => {
      setTimeout(() => {
        setLoadingTexts(prev => {
          const newWords = [...(prev[company] || []), word]
          return {
            ...prev,
            [company]: newWords
          }
        })
      }, index * 40) // 更快的动画速度
    })
  }

  const handleCompanyLeave = (company: string) => {
    if (expandedCard !== company) { // 只有在卡片未展开时才清空文字
      setLoadingTexts(prev => ({ ...prev, [company]: [] }))
    }
  }

  const renderBioText = (text: string) => {
    const words = text.split(" ")
    return words.map((word, index) => (
      <span
        key={index}
        className={`bio-word bio-word-${Math.min(index + 1, 20)} mr-1`}
        style={{ animationDelay: bioWordsVisible ? `${index * 0.1}s` : "none" }}
      >
        {word}
      </span>
    ))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-orange-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div className="animate-pulse-glow">
            <h2 className="text-2xl font-bold text-primary">Loading...</h2>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="font-bold text-2xl text-primary">Rae</div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-foreground hover:text-primary transition-colors">
                Home
              </a>
              <a href="#timeline" className="text-foreground hover:text-primary transition-colors">
                Timeline
              </a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors">
                About Me
              </a>
            </div>
            <Button asChild variant="outline" size="sm">
              <a href="mailto:jirey3379@gmail.com" aria-label="Email Rae">
                <Mail className="w-4 h-4 mr-2" />
                Contact
              </a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div
            className={`grid lg:grid-cols-2 gap-12 items-center ${visibleSections.includes("hero") ? "animate-fade-in-up" : "opacity-0"}`}
          >
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI & Growth Operations Specialist
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  {/* Typewriter effect for title, Rae高亮 */}
                  {typedTitle.split(/(Rae)/g).map((part, idx) => {
                    if (part === "Rae") {
                      return <span key={idx} className="text-primary">{part}</span>;
                    }
                    return <span key={idx}>{part}</span>;
                  })}
                  {/* 光标已移除 */}
                </h1>
                <p className="text-xl text-gray-400 leading-relaxed">
                  {/* Typewriter effect with bold highlights */}
                  {typedText.split(/(Peking University|Growth Operations specialist)/g).map((part, idx) => {
                    if (part === "Peking University" || part === "Growth Operations specialist") {
                      return <strong key={idx} className="font-bold text-orange-500">{part}</strong>;
                    }
                    return <span key={idx}>{part}</span>;
                  })}
                  {/* 光标已移除 */}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <a href="#timeline" aria-label="Jump to career timeline">
                    <Briefcase className="w-4 h-4 mr-2" />
                    View Experience
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href="/Rae_Résumé.pdf" download aria-label="Download Rae resume PDF">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Download Resume
                  </a>
                </Button>
              </div>

              <div className="flex space-x-4 pt-4">
                <Button asChild variant="ghost" size="icon" className="hover:text-primary">
                  <a href="https://www.linkedin.com/in/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </Button>
                <Button asChild variant="ghost" size="icon" className="hover:text-primary">
                  <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <Instagram className="w-5 h-5" />
                  </a>
                </Button>
                <Button asChild variant="ghost" size="icon" className="hover:text-primary">
                  <a href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label="External profile">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative w-80 h-80 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full opacity-20 animate-pulse-glow"></div>
                <img
                  src="/headshot-1.JPG"
                  alt="Rae's Profile"
                  className="relative z-10 w-full h-full object-cover rounded-full border-4 border-background shadow-2xl object-center"
                  style={{ objectPosition: "10% center" }} 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="min-h-screen flex items-center py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div
            className={`space-y-12 ${visibleSections.includes("timeline") ? "animate-fade-in-up stagger-3" : "opacity-0"}`}
          >
            <h2 className="text-3xl font-bold text-center text-foreground">Career Timeline</h2>

            <div className="relative">
              <div className="absolute left-8 sm:left-8 lg:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent"></div>

              <div className="space-y-16 sm:space-y-20">
                <div className="relative flex items-start space-x-4 sm:space-x-8">
                  <img src="/36Kr.JPG" alt="36Kr Logo" className="company-logo flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full shadow-lg z-10 bg-white" />
                  <Card 
                    className={`timeline-content flex-1 border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer max-w-lg 
                      ${expandedCard === "36kr" ? "scale-102 shadow-2xl" : "hover:scale-101"}`}
                    onClick={() => handleCardClick("36kr")}
                    onMouseLeave={() => {
                      if (expandedCard !== "36kr") {
                        handleCompanyLeave("36kr")
                      }
                    }}
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <h3 className="font-bold text-xl text-foreground">36Kr</h3>
                        <Badge variant="secondary" style={{ backgroundColor: "#F97316", color: "white" }}>
                          2022.9-2023.1
                        </Badge>
                      </div>
                      <div className={`text-muted-foreground leading-relaxed transition-all duration-300 overflow-hidden text-content
                        ${expandedCard === "36kr" ? "min-h-[100px]" : "min-h-[60px]"}`}
                        style={{ maxWidth: "100%" }}>
                        {loadingTexts["36kr"]?.map((word, idx) => (
                          <span key={idx}>
                            {word}{' '}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="relative flex items-start space-x-4 sm:space-x-8">
                  <img src="/ByteDance.JPG" alt="ByteDance Logo" className="company-logo flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full shadow-lg z-10 bg-white" />
                  <Card 
                    className={`timeline-content flex-1 border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer max-w-lg
                      ${expandedCard === "bytedance" ? "scale-102 shadow-2xl" : "hover:scale-101"}`}
                    onClick={() => handleCardClick("bytedance")}
                    onMouseLeave={() => {
                      if (expandedCard !== "bytedance") {
                        handleCompanyLeave("bytedance")
                      }
                    }}
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <h3 className="font-bold text-xl text-foreground">ByteDance</h3>
                        <Badge variant="secondary" style={{ backgroundColor: "#3B82F6", color: "white" }}>
                          2023.3-2023.6
                        </Badge>
                      </div>
                      <div className={`text-muted-foreground leading-relaxed transition-all duration-300 overflow-hidden text-content
                        ${expandedCard === "bytedance" ? "min-h-[100px]" : "min-h-[60px]"}`}
                        style={{ maxWidth: "100%" }}>
                        {loadingTexts["bytedance"]?.map((word, idx) => (
                          <span key={idx}>
                            {word}{' '}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="relative flex items-start space-x-4 sm:space-x-8">
                  <img src="/RightBrain.JPG" alt="RightBrain Logo" className="company-logo flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full shadow-lg z-10 bg-white" />
                  <Card 
                    className={`timeline-content flex-1 border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer max-w-lg
                      ${expandedCard === "rightbrain" ? "scale-102 shadow-2xl" : "hover:scale-101"}`}
                    onClick={() => handleCardClick("rightbrain")}
                    onMouseLeave={() => {
                      if (expandedCard !== "rightbrain") {
                        handleCompanyLeave("rightbrain")
                      }
                    }}
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <h3 className="font-bold text-xl text-foreground">RightBrain AI</h3>
                        <Badge variant="secondary" style={{ backgroundColor: "#F97316", color: "white" }}>
                          2023.9-2025.8
                        </Badge>
                      </div>
                      <div className={`text-muted-foreground leading-relaxed transition-all duration-300 overflow-hidden text-content
                        ${expandedCard === "rightbrain" ? "min-h-[100px]" : "min-h-[60px]"}`}
                        style={{ maxWidth: "100%" }}>
                        {loadingTexts["rightbrain"]?.map((word, idx) => (
                          <span key={idx}>
                            {word}{' '}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center py-16 px-6 bg-card/50">
        <div className="max-w-4xl mx-auto">
          <div
            className={`space-y-8 ${visibleSections.includes("about") ? "animate-fade-in-up stagger-2" : "opacity-0"}`}
          >
            <h2 className="text-3xl font-bold text-center text-foreground">About Me</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">Professional</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {bioWordsVisible
                      ? renderBioText(
                          "I excel at uncovering growth opportunities through data and thrive in the dynamic AI landscape, finding clarity in uncertainty."
                        )
                      : "I excel at uncovering growth opportunities through data and thrive in the dynamic AI landscape, finding clarity in uncertainty."}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {bioWordsVisible
                      ? renderBioText(
                          "Most of the time, I'm calm and composed, enjoying the process of breaking down complex tasks, refining them to perfection, and questioning conventional problem-solving methods."
                        )
                      : "Most of the time, I'm calm and composed, enjoying the process of breaking down complex tasks, refining them to perfection, and questioning conventional problem-solving methods."}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="font-semibold text-lg">Personal</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {bioWordsVisible
                      ? renderBioText(
                          "Outside work, I'm passionate about photography and music, currently creating my first Indie Rock album. In my free time, I enjoy rock climbing and watching movies."
                        )
                      : "Outside work, I'm passionate about photography and music, currently creating my first Indie Rock album. In my free time, I enjoy rock climbing and watching movies."}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Let's Connect</h2>
          <p className="text-xl text-muted-foreground">Interested in collaborating or learning more about my work?</p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            <Mail className="w-5 h-5 mr-2" />
            Get In Touch
          </Button>
        </div>
      </section>

      {/* Scroll indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-primary" />
      </div>
    </div>
  )
}