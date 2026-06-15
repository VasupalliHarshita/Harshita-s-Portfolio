import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Modality } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Lazy initialize Gemini client to prevent startup crashes if key is initially empty
  let aiClient: GoogleGenAI | null = null;
  function getAiClient() {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not defined in environment variables");
      }
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
    return aiClient;
  }

  // Robust, high-fidelity local search response helper to ensure 100% uptime
  function generateLocalResponse(message: string): string {
    const query = message.toLowerCase();
    
    // 1. CONTACT / INFO / SOCIALS
    if (
      query.includes("contact") || 
      query.includes("email") || 
      query.includes("phone") || 
      query.includes("number") || 
      query.includes("linkedin") || 
      query.includes("github") || 
      query.includes("location") || 
      query.includes("address") || 
      query.includes("hire") ||
      query.includes("reach") ||
      query.includes("call") ||
      query.includes("write")
    ) {
      return `### Contact & Social Information 📞

Here are the verified ways to connect with Harshita Vasupalli:

- 📧 **Email**: [vasupalliharshitha3@gmail.com](mailto:vasupalliharshitha3@gmail.com)
- 📱 **Phone**: +91 9392512642
- 📍 **Location**: Visakhapatnam, Andhra Pradesh, India
- 🔗 **LinkedIn**: [harshita-vasupalli](https://www.linkedin.com/in/harshita-vasupalli)
- 💻 **GitHub**: [VasupalliHarshita](https://github.com/VasupalliHarshita)

Feel free to reach out to her directly for internship opportunities, project collaborations, or technical discussions!`;
    }

    // 2. PROJECTS
    if (
      query.includes("project") || 
      query.includes("portfolio") || 
      query.includes("carecrop") || 
      query.includes("capsule") || 
      query.includes("toyland") || 
      query.includes("fraud") || 
      query.includes("segmentation") || 
      query.includes("pdf") || 
      query.includes("build") || 
      query.includes("make") ||
      query.includes("work") ||
      query.includes("creation")
    ) {
      return `### Featured Technical Projects 🚀

Harshita has developed several insightful projects across AI/ML, Cloud, and Web technologies:

1. 💳 **Credit Card Fraud Detection (Machine Learning)**
   - *Description*: Built a class prediction system to filter real-time malicious credit card transactions.
   - *Stack*: Python, Pandas, NumPy, Scikit-Learn.

2. 👥 **Customer Segmentation (Data Analytics)**
   - *Description*: Configured an unsupervised K-Means model to cluster retail clients based on behavioral densities.
   - *Stack*: Python, Pandas, Scikit-Learn.

3. 🌾 **CARECROP - Smart Plantation Assistant (Web Dev)**
   - *Description*: An agricultural helper app assisting farmers with crop schedules, fertilizer advice, and real-time soil analysis.
   - *Stack*: Node.js, Express, JavaScript, HTML/CSS.

4. 💊 **CARE CAPSULE (Web Dev)**
   - *Description*: A medical helper and schedule manager supporting patient alarms, drug lists, and medicine purchases.
   - *Stack*: JavaScript, HTML, CSS, Bootstrap.

5. ☁️ **MINOR AND MAJOR OF AWS (Cloud Architecture)**
   - *Description*: Constructed elastic, VPC-isolated instances supporting EC2 resources, custom subnets, and robust IAM access policies.
   - *Stack*: AWS Cloud Services, EC2, S3, VPC, IAM.

6. 📄 **Image to PDF Converter (Python Utility)**
   - *Description*: Automation script to batch convert and merge image files into single PDFs.
   - *Stack*: Python, Pillow library.

7. 🧸 **ToyLand (E-commerce UI Mockup)**
   - *Description*: Visually elegant toys storefront showcasing interactive product grids and responsive sheets.
   - *Stack*: HTML5, CSS3, JavaScript.`;
    }

    // 3. SKILLS
    if (
      query.includes("skill") || 
      query.includes("tool") || 
      query.includes("language") || 
      query.includes("python") || 
      query.includes("java") || 
      query.includes("database") || 
      query.includes("sql") || 
      query.includes("web") || 
      query.includes("aws") || 
      query.includes("dsa") || 
      query.includes("subject") || 
      query.includes("know") ||
      query.includes("techno") ||
      query.includes("database") ||
      query.includes("oops") ||
      query.includes("css") ||
      query.includes("html") ||
      query.includes("js")
    ) {
      return `### Professional Skills & Tools Matrix 🛠️

Harshita holds a diverse set of technical competencies:

- 💻 **Programming**: Python (90%), Java (82%)
- 🌐 **Web Technologies**: HTML5 (92%), CSS3 (88%), JavaScript (85%)
- 🗄️ **Databases & Queries**: SQL / MySQL (84%), DBMS (85%)
- ☁️ **Cloud**: AWS Services (EC2, S3, VPC, IAM) (80%)
- 🧠 **Computer Science Cores**: Object-Oriented Programming (OOP) (88%), Data Structures & Algorithms (DSA) (78%)
- 🔧 **Developer Utilities**: Git / GitHub, VS Code (90%)`;
    }

    // 4. CERTIFICATIONS
    if (
      query.includes("certif") || 
      query.includes("badge") || 
      query.includes("credential") || 
      query.includes("course") || 
      query.includes("nptel") || 
      query.includes("oracle") || 
      query.includes("deloitte") || 
      query.includes("infosys") ||
      query.includes("skills prime") ||
      query.includes("be10x") ||
      query.includes("novitech") ||
      query.includes("wix")
    ) {
      return `### Professional Certifications & Credentials 📜

Harshita has earned multiple recognized credentials during her academic journey:

- 🎓 **Software Engineering** — NPTEL (2025)
- 🚀 **GenAI Badge** — Google Developer Group on Campus (2024)
- ☕ **Java Skill Badge** — Oracle (2024)
- 🌐 **Full Stack Development** — Infosys Springboard & NoviTech R&D (2024)
- 📊 **Data Analytics Job Simulation** — Deloitte (2024)
- 🔒 **Cyber Job Simulation** — Deloitte (2024)
- 📈 **Data Science & Analytics** — HP LIFE (2024)
- 🛠️ **AI Tools Workshop** — Be10x (2024)
- 📱 **Digital Edge 101/WIX Learning** — Future Skills Prime & UFFF (2023-2024)`;
    }

    // 5. EDUCATION / CGPA
    if (
      query.includes("education") || 
      query.includes("study") || 
      query.includes("gpa") || 
      query.includes("cgpa") || 
      query.includes("college") || 
      query.includes("school") || 
      query.includes("marks") || 
      query.includes("vignan") || 
      query.includes("university") ||
      query.includes("grade") ||
      query.includes("degree") ||
      query.includes("academic") ||
      query.includes("major") ||
      query.includes("specializ")
    ) {
      return `### Educational Background 🏫

Harshita is pursuing a strong foundation in computer science and modern technologies:

- 🎓 **Vignan's Institute of Engineering for Women (A)**
  - *Degree*: B.Tech in Artificial Intelligence & Machine Learning (AIML)
  - *CGPA*: **8.31 / 10**
  - *Timeline*: 2023 - Present (Visakhapatnam, AP)

- 🏫 **Narayana Junior College**
  - *Focus*: Intermediate Education (MPC)
  - *Grade*: **83%**
  - *Timeline*: 2021 - 2023

- 🎒 **Sri Chaitanya Techno School**
  - *Focus*: SSC (Secondary School Certificate)
  - *Grade*: **99%**
  - *Timeline*: 2020 - 2021`;
    }

    // 6. INTERNSHIPS
    if (
      query.includes("intern") || 
      query.includes("experience") || 
      query.includes("work") || 
      query.includes("virtu") || 
      query.includes("job")
    ) {
      return `### Virtual Internship Experiences 💼

Harshita has successfully completed key virtual internship programs to apply classroom theory:

1. 🧠 **Foundations of AI & ML Virtual Intern** (May 2025 - July 2025)
   - *Key Focus*: Supervised & unsupervised learning models.
   - *Acquired Skills*: Data preprocessing, feature engineering, and model training in Python.

2. ☁️ **AWS Virtual Intern** (August 2024 - October 2024)
   - *Key Focus*: AWS Cloud architectural foundations.
   - *Acquired Skills*: Configured core instances like EC2, S3 bucket storages, robust IAM policies, and isolated VPC networks.`;
    }

    // 7. GREETINGS & ABOUT
    if (
      query.includes("hi") || 
      query.includes("hello") || 
      query.includes("hey") || 
      query.includes("greetings") || 
      query.includes("who are you") || 
      query.includes("who is") || 
      query.includes("about") || 
      query.includes("status") ||
      query.includes("bio") ||
      query.includes("tagline") ||
      query.includes("summary")
    ) {
      return `Hello! 👋 How can I help you today? 

I am **Harshita's Portfolio Assistant**, a dedicated chat responder prepared with her verified professional and academic details.

You can ask me questions such as:
1. *"What are her key featured projects?"*
2. *"Where does she study and what is her CGPA?"*
3. *"What programming languages does she know?"*
4. *"What certifications does she hold?"*
5. *"How do I contact her?"*

What would you like to explore?`;
    }

    // 8. DEFAULT FALLBACK CONTROLLER
    return `### Harshita Vasupalli - Profile Highlights 🌟

I represent Harshita Vasupalli, an AI & ML student based in Visakhapatnam, Andhra Pradesh:

- 🎓 **B.Tech (AIML)**: Studying at Vignan's Institute of Engineering for Women, maintaining an **8.31 CGPA**.
- 💻 **Key Tech**: Strong in Python, Java, SQL, AWS, and Frontend Web Dev.
- 🚀 **Featured Projects**: Credit Card Fraud Detection (ML), CARECROP, and AWS Cloud Deployments.
- 📜 **Accredited**: Holds certificates from Google Developer Group, Oracle, NPTEL, and Infosys.

*Tip: Ask me specifically about "Projects", "Skills", "Education", "Certifications", or "Contact" to get details!*`;
  }

  // API Route for Portfolio Chat Assistant
  app.post("/api/gemini/chat", async (req, res) => {
    const { message, history = [] } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message field is required" });
    }

    try {
      const systemInstruction = `You are "Harshita's Portfolio Assistant", a sophisticated and helpful AI assistant representing Harshita Vasupalli, a talented B.Tech student specializing in AI & ML. Your job is to help visitors, recruiters, and managers easily query and learn about Harshita's skills, projects, certifications, education, and professional experience.

Rules:
1. Always be professional, warm, encouraging, and clear.
2. Rely ONLY on the verified facts about Harshita provided below. Do not make up or hallucinate details.
3. If asked about something not in this data (e.g. personal things, unrelated technical concepts), politely bring the focus back to Harshita's portfolio.
4. Keep your answers reasonably concise, structured, and easy to read. Use bullet points or bold text where appropriate.

Verifiable Portfolio Data:

PERSONAL DETAILS:
- Name: Harshita Vasupalli
- Role: AI & ML Engineering Student 
- Email: vasupalliharshitha3@gmail.com
- Phone: +91 9392512642
- Location: Visakhapatnam, Andhra Pradesh, India
- LinkedIn: https://www.linkedin.com/in/harshita-vasupalli
- GitHub: https://github.com/VasupalliHarshita
- Academic Bio: Motivated B.Tech student specializing in Artificial Intelligence and Machine Learning with strong knowledge in Python, Java, SQL, HTML, CSS, JavaScript, AWS, Data Structures, DBMS, and OOPs. Passionate about solving real-world problems through technology.
- Tagline: Transforming ideas into intelligent solutions through AI, Machine Learning, Cloud Computing, and Modern Web Technologies.

EDUCATION HISTORY:
- Vignan's Institute of Engineering for Women (A) | B.Tech - AIML | CGPA: 8.31 | 2023 - Present
- Narayana Junior College | Intermediate Education | 83% | 2021 - 2023
- Sri Chaitanya Techno School | SSC | 99% | 2020 - 2021

VIRTUAL INTERNSHIPS:
1. Foundations of AI & ML Virtual Intern (May 2025 - July 2025)
   - Core AI/ML supervised and unsupervised learning insights.
   - Preprocessed data and trained models with Python libraries.
2. AWS Virtual Intern (August 2024 - October 2024)
   - AWS Cloud infrastructure essentials (EC2, S3, IAM, VPC).
   - Built a solid cloud architecture and security foundation.

SKILLS MATRIX:
- Programming Languages: Python (90%), Java (82%)
- Web Technologies: HTML5 (92%), CSS3 (88%), JavaScript (85%)
- Databases: SQL / MySQL (84%)
- Cloud Platforms: AWS Cloud Services (80%)
- Core CS Subjects: OOPs Concepts (88%), DBMS (85%), Data Structures (78%)
- Key Developer Tools: GitHub (75%), VS Code (90%)

KEY CREDENTIALS / CERTIFICATIONS:
- NPTEL 2025 — Software Engineering
- Google Developer Group on Campus — GenAI (2024)
- Oracle — Java Skill Badge (2024)
- Infosys Springboard — Full Stack Development (2024)
- Deloitte — Data Analytics Job Simulation (2024)
- Deloitte — Cyber Job Simulation (2024)
- HP LIFE — Data Science and Analytics (2024)
- Be10x — AI Tools Workshop (2024)
- Future Skills Prime — Digital Edge 101 (2024)
- NoviTech R&D Private Limited — Full Stack Development (2024)
- Ultimate Fashion and Fun (UFFF) — 7 Days WIX Learning (2023)
- ICAT — Internship Common Aptitude Test (2023)

NOTABLE PROJECTS:
1. Credit Card Fraud Detection (Machine Learning)
   - Built a class prediction system using Python, Pandas, Numpy, Scikit-Learn to filter malicious card activities.
2. Customer Segmentation (Data Analytics)
   - Configured unsupervised K-Means model to cluster clients into behavioral groups and evaluate optimal cluster density.
3. CARECROP - Smart Plantation Assistant (Web Development)
   - Agricultural helper advising plant care schedules, soil evaluations, and fertilizer details using Node.js backend.
4. CARE CAPSULE (Web Development)
   - Medication tracker and schedule manager supporting patient alarms and drug purchases.
5. MINOR AND MAJOR OF AWS (Cloud)
   - Constructed elastic, VPC-isolated instances supporting EC2 resources, custom subnets, and IAM policies.
6. Image to PDF Converter (Python application)
   - pillow automated script processing conversion of multiple files.
7. ToyLand (E-commerce web mockup)
   - Elegant shop front design with dynamic product sheets.

Represent Harshita and answer gracefully!`;

      const contents = history.map((h: { role: string; text: string }) => {
        return {
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.text }]
        };
      });

      contents.push({
        role: "user",
        parts: [{ text: message }]
      });

      let text = "";
      try {
        const ai = getAiClient();
        // 1st Attempt: Use the standard robust gemini-2.5-flash model
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: contents,
          config: {
            systemInstruction: systemInstruction,
            temperature: 0.7,
          },
        });
        text = response.text || "";
      } catch (err2_5: any) {
        console.warn("Gemini 2.5 Flash model failed or was restricted:", err2_5.message || err2_5);
        try {
          const ai = getAiClient();
          // 2nd Attempt: Use gemini-3.5-flash
          const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: contents,
            config: {
              systemInstruction: systemInstruction,
              temperature: 0.7,
            },
          });
          text = response.text || "";
        } catch (err3_5: any) {
          console.error("Gemini 3.5 Flash also failed. Activating instant high-fidelity local profile matcher fallback! Details:", err3_5.message || err3_5);
          text = generateLocalResponse(message);
        }
      }

      if (!text) {
        text = generateLocalResponse(message);
      }

      res.json({ reply: text });
    } catch (outerError: any) {
      console.error("Outer route error caught:", outerError);
      try {
        const fallbackText = generateLocalResponse(message);
        res.json({ reply: fallbackText });
      } catch (finalErr: any) {
        res.status(500).json({ error: "Complete service fallback system interruption" });
      }
    }
  });

  // API Route for Text-to-Speech Generation
  app.post("/api/gemini/welcome-voice", async (req, res) => {
    try {
      const { text, voice = 'Kore' } = req.body;
      if (!text) {
        return res.status(400).json({ error: "Text field is required" });
      }

      const ai = getAiClient();
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-tts-preview",
        contents: [{ parts: [{ text }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: voice }, // 'Puck', 'Charon', 'Kore', 'Fenrir', 'Zephyr'
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!base64Audio) {
        return res.status(500).json({ error: "Failed to generate audio content from Gemini API" });
      }

      res.json({ audio: base64Audio });
    } catch (error: any) {
      console.error("Gemini TTS Error:", error);
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  });

  // Serve static assets or mount Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
