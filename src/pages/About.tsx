import { motion } from "framer-motion";
import { ArrowLeft, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";

export default function About() {
  const navigate = useNavigate();

  const text = "About Me";

  const [displayedText, setDisplayedText] = useState("");
  const [countdown, setCountdown] = useState<number | null>(null);
  const [downloading, setDownloading] = useState(false);

  // ==========================================
  // TYPING EFFECT
  // ==========================================

  useEffect(() => {
    let index = 0;
    let interval: ReturnType<typeof setInterval>;

    const startTyping = () => {
      setDisplayedText("");

      interval = setInterval(() => {
        index++;

        setDisplayedText(text.slice(0, index));

        if (index === text.length) {
          clearInterval(interval);

          setTimeout(() => {
            index = 0;
            startTyping();
          }, 5000);
        }
      }, 120);
    };

    startTyping();

    return () => clearInterval(interval);
  }, []);


  // ==========================================
  // DOWNLOAD RESUME
  // ==========================================

  const handleDownload = () => {
    if (downloading) return;

    setDownloading(true);
    setCountdown(3);

    let time = 3;

    const timer = setInterval(() => {
      time--;

      setCountdown(time);

      if (time <= 0) {
        clearInterval(timer);

        const resumeHTML = `
<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Chinmay Pawar Resume</title>

<style>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  background: #ffffff;
  color: #111111;
  padding: 35px;
  line-height: 1.5;
}

.resume {
  max-width: 850px;
  margin: auto;
}

.header {
  border-bottom: 2px solid #111111;
  padding-bottom: 20px;
  margin-bottom: 25px;
}

.name {
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 4px;
}

.role {
  font-size: 17px;
  font-weight: 600;
  color: #444444;
  margin-bottom: 10px;
}

.contact {
  font-size: 12px;
  color: #444444;
}

.section {
  margin-bottom: 22px;
}

.section-title {
  font-size: 15px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border-bottom: 1px solid #cccccc;
  padding-bottom: 5px;
  margin-bottom: 10px;
}

.summary {
  font-size: 13px;
  color: #333333;
}

.item {
  margin-bottom: 13px;
}

.item-title {
  font-size: 14px;
  font-weight: 700;
}

.item-subtitle {
  font-size: 12px;
  color: #555555;
  margin-bottom: 3px;
}

.item p,
.item li {
  font-size: 12px;
  color: #333333;
}

ul {
  padding-left: 18px;
}

.skills {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.skill-box {
  border: 1px solid #dddddd;
  padding: 10px;
}

.skill-box h4 {
  font-size: 12px;
  margin-bottom: 5px;
}

.skill-box p {
  font-size: 11px;
  color: #444444;
}

.footer {
  margin-top: 30px;
  padding-top: 10px;
  border-top: 1px solid #cccccc;
  font-size: 10px;
  color: #777777;
  text-align: center;
}

</style>

</head>

<body>

<div class="resume">

  <div class="header">

    <div class="name">
      Chinmay Pawar
    </div>

    <div class="role">
      Java & Full Stack Developer
    </div>

    <div class="contact">
      B.E. Computer Science & Engineering |
      Sant Gadge Baba Amravati University |
      GitHub: github.com/Chinmay1-ai
    </div>

  </div>


  <div class="section">

    <div class="section-title">
      Professional Summary
    </div>

    <div class="summary">

      Computer Science Engineering graduate and Java & Full Stack Developer
      with hands-on experience in Core Java, Spring Boot, Hibernate, JPA,
      MySQL, REST APIs, React and JavaScript. Experienced in developing
      backend applications, database-driven systems and responsive web
      applications. Strong interest in writing clean, maintainable code
      and continuously improving software development skills.

    </div>

  </div>


  <div class="section">

    <div class="section-title">
      Technical Skills
    </div>

    <div class="skills">

      <div class="skill-box">
        <h4>Programming</h4>
        <p>
          Core Java, Java 8, OOP, Collections, Exception Handling,
          Multithreading, Stream API, Lambda Expressions
        </p>
      </div>

      <div class="skill-box">
        <h4>Backend</h4>
        <p>
          Spring Boot, Spring MVC, Spring Data JPA, Hibernate,
          REST APIs, JDBC
        </p>
      </div>

      <div class="skill-box">
        <h4>Frontend</h4>
        <p>
          HTML5, CSS3, JavaScript, React.js, TypeScript,
          Tailwind CSS
        </p>
      </div>

      <div class="skill-box">
        <h4>Database</h4>
        <p>
          MySQL, SQL, Joins, Subqueries, Group By, Having,
          Database Design
        </p>
      </div>

      <div class="skill-box">
        <h4>Tools</h4>
        <p>
          Git, GitHub, Postman, Swagger, Docker
        </p>
      </div>

      <div class="skill-box">
        <h4>Architecture</h4>
        <p>
          MVC Architecture, Layered Architecture,
          RESTful API Design
        </p>
      </div>

    </div>

  </div>


  <div class="section">

    <div class="section-title">
      Experience
    </div>

    <div class="item">

      <div class="item-title">
        Associate Software Developer Intern
      </div>

      <div class="item-subtitle">
        MKPITS Solutions, Nagpur
      </div>

      <ul>

        <li>
          Worked on software development tasks using Java and related technologies.
        </li>

        <li>
          Gained practical experience in application development,
          debugging and database integration.
        </li>

        <li>
          Worked with development practices and real-world project workflows.
        </li>

      </ul>

    </div>

  </div>


  <div class="section">

    <div class="section-title">
      Projects
    </div>


    <div class="item">

      <div class="item-title">
        Smart Khata
      </div>

      <div class="item-subtitle">
        Spring Boot | Hibernate | MySQL
      </div>

      <p>
        Developed a digital credit ledger system for managing customer
        credit records digitally. Implemented backend functionality
        using Spring Boot, Hibernate and MySQL.
      </p>

    </div>


    <div class="item">

      <div class="item-title">
        AI Mock Interview System
      </div>

      <div class="item-subtitle">
        React | JavaScript | AI
      </div>

      <p>
        Developed an AI-based mock interview platform designed to
        simulate interview sessions and provide an interactive
        interview experience with facial analysis.
      </p>

    </div>


    <div class="item">

      <div class="item-title">
        Shoe E-Commerce Website
      </div>

      <div class="item-subtitle">
        HTML | CSS | JavaScript
      </div>

      <p>
        Developed a responsive e-commerce website for showcasing
        and browsing footwear products with a modern user interface.
      </p>

    </div>


    <div class="item">

      <div class="item-title">
        Hospital Management System
      </div>

      <div class="item-subtitle">
        Core Java | JDBC | MySQL
      </div>

      <p>
        Developed a console-based hospital management system using
        MVC architecture with Doctor and Patient modules and
        MySQL database integration.
      </p>

    </div>

  </div>


  <div class="section">

    <div class="section-title">
      Education
    </div>

    <div class="item">

      <div class="item-title">
        Bachelor of Engineering - Computer Science & Engineering
      </div>

      <div class="item-subtitle">
        Sant Gadge Baba Amravati University | 2025
      </div>

      <p>
        CGPA: 7.42
      </p>

    </div>

  </div>


  <div class="section">

    <div class="section-title">
      Strengths
    </div>

    <div class="skills">

      <div class="skill-box">
        <h4>Problem Solving</h4>
        <p>
          Strong interest in understanding problems and building
          practical software solutions.
        </p>
      </div>

      <div class="skill-box">
        <h4>Continuous Learning</h4>
        <p>
          Consistently improving Java, Spring Boot and full-stack
          development skills.
        </p>
      </div>

      <div class="skill-box">
        <h4>Clean Code</h4>
        <p>
          Focused on readable, maintainable and structured code.
        </p>
      </div>

      <div class="skill-box">
        <h4>Team Collaboration</h4>
        <p>
          Comfortable working with teammates and adapting to
          development workflows.
        </p>
      </div>

    </div>

  </div>


  <div class="section">

    <div class="section-title">
      Career Objective
    </div>

    <div class="summary">

      To build a strong career as a Java & Full Stack Developer by
      contributing to real-world software projects while continuously
      improving my technical, problem-solving and system development skills.

    </div>

  </div>


  <div class="footer">
    Chinmay Pawar | Java & Full Stack Developer
  </div>

</div>

</body>

</html>
        `;

        const container = document.createElement("div");

        container.innerHTML = resumeHTML;

        document.body.appendChild(container);

        const options = {
          margin: 0.4,
          filename: "Chinmay_Pawar_Resume.pdf",
          image: {
            type: "jpeg",
            quality: 0.98,
          },
          html2canvas: {
            scale: 2,
            useCORS: true,
          },
          jsPDF: {
            unit: "in",
            format: "a4",
            orientation: "portrait",
          },
        };

        html2pdf()
          .set(options)
          .from(container)
          .save()
          .then(() => {
            document.body.removeChild(container);

            setDownloading(false);
            setCountdown(null);
          })
          .catch((error: unknown) => {
            console.error("Resume generation failed:", error);

            document.body.removeChild(container);

            setDownloading(false);
            setCountdown(null);
          });
      }
    }, 1000);
  };


  return (
    <div className="relative min-h-screen bg-black overflow-hidden text-white px-4 sm:px-6 py-10">

      {/* BACKGROUND EFFECTS */}

      <div className="fixed inset-0 pointer-events-none">

        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl opacity-20" />

        <div className="absolute bottom-20 right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl opacity-20" />

      </div>


      {/* BACK BUTTON */}

      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => navigate(-1)}
        className="
          fixed
          top-5
          left-5
          z-50
          flex
          items-center
          gap-2
          px-4
          py-2
          rounded-full
          border
          border-white/15
          bg-white/8
          backdrop-blur-xl
          hover:bg-white/15
          hover:border-white/30
          transition-all
          duration-300
          shadow-lg
        "
      >

        <ArrowLeft size={18} />

        <span className="hidden sm:inline">
          Back
        </span>

      </motion.button>


      {/* MAIN CONTENT */}

      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen gap-8">


        {/* PROFILE IMAGE */}

        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex flex-col items-center"
        >

          <img
            src="/assets/chinmay.png"
            alt="Chinmay Pawar"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
            className="
              w-[200px]
              sm:w-[280px]
              md:w-[320px]
              rounded-2xl
              border
              border-white/15
              object-cover
              shadow-[0_20px_60px_rgba(0,0,0,0.6)]
              hover:border-white/25
              transition-all
              duration-300
            "
          />


          <div
            className="
              mt-6
              h-[1px]
              bg-gradient-to-r
              from-transparent
              via-white/20
              to-transparent
              w-[90vw]
              sm:w-[400px]
              md:w-[500px]
            "
          />

        </motion.div>


        {/* ABOUT GLASS BOX */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            w-full
            max-w-4xl
            h-[500px]
            sm:h-[550px]
            md:h-[600px]
            rounded-3xl
            border
            border-white/10
            bg-white/5
            backdrop-blur-3xl
            overflow-hidden
            shadow-[0_20px_70px_rgba(0,0,0,0.5)]
          "
        >

          {/* GLASS EFFECT */}

          <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-transparent pointer-events-none" />

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />


          {/* HEADER */}

          <div
            className="
              relative
              z-20
              flex
              items-center
              justify-center
              px-6
              py-6
              sm:py-8
              border-b
              border-white/10
              bg-black/30
              backdrop-blur-2xl
            "
          >

            <h1
              className="
                text-3xl
                sm:text-4xl
                md:text-5xl
                font-extrabold
                tracking-tight
              "
            >

              {displayedText}

              <span className="animate-pulse ml-2">
                |
              </span>

            </h1>

          </div>


          {/* CONTENT */}

          <div
            className="
              relative
              z-10
              h-[calc(100%-80px)]
              overflow-y-auto
              px-6
              sm:px-10
              md:px-12
              py-8
              scrollbar-thin
              scrollbar-track-transparent
              scrollbar-thumb-white/10
              hover:scrollbar-thumb-white/20
            "
          >

            <div
              className="
                text-white/70
                text-sm
                sm:text-base
                leading-8
                tracking-wide
                space-y-6
              "
            >

              <p>
                I'm a Computer Science & Engineering graduate and a
                Java & Full Stack Developer with a strong interest in
                building reliable backend systems and modern web applications.
              </p>


              <p>
                My core development stack includes Java, Spring Boot,
                Hibernate, JPA, MySQL, REST APIs and React. I enjoy working
                across both backend and frontend layers to understand how
                complete applications work.
              </p>


              <p>
                During my software development internship at MKPITS,
                I gained practical exposure to software development,
                debugging, database integration and real-world development
                workflows.
              </p>


              <p>
                I have worked on projects such as Smart Khata, an AI Mock
                Interview System, a Shoe E-Commerce Website and a Hospital
                Management System. These projects helped me strengthen my
                understanding of APIs, databases, application architecture
                and user interfaces.
              </p>


              <p>
                I particularly enjoy solving programming problems,
                understanding how systems work internally and learning
                technologies that help me build better software.
              </p>


              <p>
                My current goal is to grow as a Java & Full Stack Developer,
                contribute to real-world software projects and continuously
                improve my technical and problem-solving skills.
              </p>


              <p>
                I'm always open to learning, collaborating and taking on
                challenging development opportunities.
              </p>

            </div>

          </div>

        </motion.div>


        {/* DOWNLOAD RESUME */}

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.4,
          }}
          onClick={handleDownload}
          disabled={downloading}
          className="
            group
            relative
            overflow-hidden
            flex
            items-center
            justify-center
            gap-3
            px-8
            sm:px-10
            py-3
            sm:py-4
            rounded-2xl
            border
            border-white/15
            bg-white/8
            backdrop-blur-xl
            hover:bg-white/15
            hover:border-white/30
            disabled:opacity-50
            disabled:cursor-not-allowed
            transition-all
            duration-300
            shadow-[0_10px_40px_rgba(0,0,0,0.4)]
            hover:shadow-[0_15px_50px_rgba(255,255,255,0.08)]
          "
        >

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-white/0
              via-white/10
              to-white/0
              opacity-0
              group-hover:opacity-100
              transition-all
              duration-500
            "
          />


          <div className="relative z-10 flex items-center gap-3">

            <Download
              size={20}
              className="
                group-hover:scale-110
                group-hover:-translate-y-1
                transition-all
                duration-300
              "
            />

            <span className="font-semibold tracking-wide">

              {downloading
                ? `Downloading in ${countdown}s`
                : "Download Resume"}

            </span>

          </div>

        </motion.button>

      </div>

    </div>
  );
}