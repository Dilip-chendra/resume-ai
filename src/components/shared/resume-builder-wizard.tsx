﻿"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Mail, Phone, Link2, GitBranch, MapPin,
  Briefcase, GraduationCap, FolderGit2, Wrench,
  Award, ChevronRight, ChevronLeft, Plus, Trash2,
  Sparkles, Loader2, CheckCircle2, AlertCircle, ArrowLeft,
  FileText, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createStructuredResumeAction } from "@/core/use-cases/resume.actions";

// â"€â"€â"€ Types â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€

type PersonalInfo = {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  location: string;
};

type ExperienceEntry = {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  location: string;
  description: string;
};

type EducationEntry = {
  id: string;
  degree: string;
  institution: string;
  startYear: string;
  endYear: string;
  gpa: string;
  location: string;
};

type ProjectEntry = {
  id: string;
  name: string;
  technologies: string;
  description: string;
};

type CertEntry = {
  id: string;
  name: string;
  issuer: string;
  year: string;
};

type Skills = {
  programming: string;
  frameworks: string;
  tools: string;
  technologies: string;
  generativeAI: string;
};

// â"€â"€â"€ Helper â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€

const uid = () => Math.random().toString(36).slice(2, 9);

const STEPS = [
  { id: 1, label: "Personal Info",  icon: User },
  { id: 2, label: "Experience",     icon: Briefcase },
  { id: 3, label: "Education",      icon: GraduationCap },
  { id: 4, label: "Projects",       icon: FolderGit2 },
  { id: 5, label: "Skills",         icon: Wrench },
  { id: 6, label: "Certifications", icon: Award },
  { id: 7, label: "Generate",       icon: Sparkles },
];

// â"€â"€â"€ Sub-components â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€

function SectionField({
  label, placeholder, value, onChange, type = "text", required = false, icon: Icon
}: {
  label: string; placeholder: string; value: string;
  onChange: (v: string) => void; type?: string; required?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-zinc-300 flex items-center gap-1.5">
        {Icon && <Icon className="w-3.5 h-3.5 text-zinc-500" />}
        {label}
        {required && <span className="text-red-400 text-xs">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-zinc-900/60 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all"
      />
    </div>
  );
}

function SectionTextarea({
  label, placeholder, value, onChange, rows = 4, hint
}: {
  label: string; placeholder: string; value: string;
  onChange: (v: string) => void; rows?: number; hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-zinc-300">{label}</label>
      {hint && <p className="text-xs text-zinc-600">{hint}</p>}
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full rounded-xl border border-white/10 bg-zinc-900/60 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all resize-none"
      />
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-zinc-900/60 p-5 space-y-4 ${className}`}>
      {children}
    </div>
  );
}

// â"€â"€â"€ STEP 1: Personal Info â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€

function Step1Personal({ data, onChange }: { data: PersonalInfo; onChange: (d: PersonalInfo) => void }) {
  const set = (key: keyof PersonalInfo) => (v: string) => onChange({ ...data, [key]: v });
  return (
    <div className="space-y-5">
      <SectionField label="Full Name" placeholder="e.g. M. Dilipchendra" value={data.fullName} onChange={set("fullName")} required icon={User} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SectionField label="Email" placeholder="you@email.com" value={data.email} onChange={set("email")} type="email" required icon={Mail} />
        <SectionField label="Phone" placeholder="+91 7075460029" value={data.phone} onChange={set("phone")} icon={Phone} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SectionField label="LinkedIn URL" placeholder="linkedin.com/in/your-profile" value={data.linkedin} onChange={set("linkedin")} icon={Link2} />
        <SectionField label="GitHub URL" placeholder="github.com/your-username" value={data.github} onChange={set("github")} icon={GitBranch} />
      </div>
      <SectionField label="Location" placeholder="Hyderabad, India" value={data.location} onChange={set("location")} icon={MapPin} />
    </div>
  );
}

// â"€â"€â"€ STEP 2: Experience â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€

function Step2Experience({
  entries, onChange
}: {
  entries: ExperienceEntry[];
  onChange: (e: ExperienceEntry[]) => void;
}) {
  function add() {
    onChange([...entries, { id: uid(), company: "", role: "", startDate: "", endDate: "", current: false, location: "", description: "" }]);
  }
  function remove(id: string) { onChange(entries.filter(e => e.id !== id)); }
  function update(id: string, key: keyof ExperienceEntry, val: any) {
    onChange(entries.map(e => e.id === id ? { ...e, [key]: val } : e));
  }

  return (
    <div className="space-y-4">
      {entries.length === 0 && (
        <div className="rounded-xl border border-dashed border-white/10 p-8 text-center">
          <Briefcase className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
          <p className="text-sm text-zinc-500">No experience added yet. Add your internships or work history below.</p>
        </div>
      )}
      {entries.map((exp, idx) => (
        <Card key={exp.id}>
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-white">Experience #{idx + 1}</p>
            <button onClick={() => remove(exp.id)} className="text-zinc-600 hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-red-500/10">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SectionField label="Company / Organization" placeholder="e.g. Infosys Springboard" value={exp.company} onChange={v => update(exp.id, "company", v)} required />
            <SectionField label="Role / Position" placeholder="e.g. AI/ML Intern" value={exp.role} onChange={v => update(exp.id, "role", v)} required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <SectionField label="Start Date" placeholder="Nov 2025" value={exp.startDate} onChange={v => update(exp.id, "startDate", v)} required />
            <SectionField label="End Date" placeholder="Jan 2026 or Present" value={exp.endDate} onChange={v => update(exp.id, "endDate", v)} />
            <SectionField label="Location (optional)" placeholder="Hyderabad / Remote" value={exp.location} onChange={v => update(exp.id, "location", v)} />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`curr-${exp.id}`}
              checked={exp.current}
              onChange={e => update(exp.id, "current", e.target.checked)}
              className="rounded border-white/20 bg-zinc-800 accent-violet-500"
            />
            <label htmlFor={`curr-${exp.id}`} className="text-sm text-zinc-400">I currently work here</label>
          </div>
          <SectionTextarea
            label="Key Achievements & Responsibilities"
            placeholder={`- Developed a Speech-to-Speech Translation System achieving 95% accuracy\n- Collaborated with team of 5 to design scalable microservices architecture\n- Reduced inference latency by 40% using model quantization techniques`}
            value={exp.description}
            onChange={v => update(exp.id, "description", v)}
            rows={5}
            hint="Write each achievement on a new line starting with -. Add numbers/percentages where possible."
          />
        </Card>
      ))}
      <Button type="button" variant="outline" onClick={add} className="w-full gap-2 border-dashed border-white/20 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white">
        <Plus className="w-4 h-4" /> Add Experience
      </Button>
    </div>
  );
}

// â"€â"€â"€ STEP 3: Education â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€

function Step3Education({ entries, onChange }: { entries: EducationEntry[]; onChange: (e: EducationEntry[]) => void }) {
  function add() {
    onChange([...entries, { id: uid(), degree: "", institution: "", startYear: "", endYear: "", gpa: "", location: "" }]);
  }
  function remove(id: string) { onChange(entries.filter(e => e.id !== id)); }
  function update(id: string, key: keyof EducationEntry, val: string) {
    onChange(entries.map(e => e.id === id ? { ...e, [key]: val } : e));
  }

  return (
    <div className="space-y-4">
      {entries.length === 0 && (
        <div className="rounded-xl border border-dashed border-white/10 p-8 text-center">
          <GraduationCap className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
          <p className="text-sm text-zinc-500">No education added yet.</p>
        </div>
      )}
      {entries.map((edu, idx) => (
        <Card key={edu.id}>
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-white">Education #{idx + 1}</p>
            <button onClick={() => remove(edu.id)} className="text-zinc-600 hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-red-500/10">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <SectionField label="Degree / Course" placeholder="B.Tech in Artificial Intelligence and Data Science" value={edu.degree} onChange={v => update(edu.id, "degree", v)} required />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SectionField label="Institution / University" placeholder="Nalla Malla Reddy Engineering College" value={edu.institution} onChange={v => update(edu.id, "institution", v)} required />
            <SectionField label="Location (optional)" placeholder="Hyderabad" value={edu.location} onChange={v => update(edu.id, "location", v)} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <SectionField label="Start Year" placeholder="2023" value={edu.startYear} onChange={v => update(edu.id, "startYear", v)} />
            <SectionField label="End Year / Expected" placeholder="2027" value={edu.endYear} onChange={v => update(edu.id, "endYear", v)} />
            <SectionField label="GPA / Percentage" placeholder="8.5 / 10" value={edu.gpa} onChange={v => update(edu.id, "gpa", v)} />
          </div>
        </Card>
      ))}
      <Button type="button" variant="outline" onClick={add} className="w-full gap-2 border-dashed border-white/20 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white">
        <Plus className="w-4 h-4" /> Add Education
      </Button>
    </div>
  );
}

// â"€â"€â"€ STEP 4: Projects â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€

function Step4Projects({ entries, onChange }: { entries: ProjectEntry[]; onChange: (e: ProjectEntry[]) => void }) {
  function add() {
    onChange([...entries, { id: uid(), name: "", technologies: "", description: "" }]);
  }
  function remove(id: string) { onChange(entries.filter(e => e.id !== id)); }
  function update(id: string, key: keyof ProjectEntry, val: string) {
    onChange(entries.map(e => e.id === id ? { ...e, [key]: val } : e));
  }

  return (
    <div className="space-y-4">
      {entries.length === 0 && (
        <div className="rounded-xl border border-dashed border-white/10 p-8 text-center">
          <FolderGit2 className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
          <p className="text-sm text-zinc-500">No projects added yet.</p>
        </div>
      )}
      {entries.map((proj, idx) => (
        <Card key={proj.id}>
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-white">Project #{idx + 1}</p>
            <button onClick={() => remove(proj.id)} className="text-zinc-600 hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-red-500/10">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <SectionField label="Project Name" placeholder="e.g. AI Agent and RAG Workflow Prototype" value={proj.name} onChange={v => update(proj.id, "name", v)} required />
          <SectionField label="Technologies Used" placeholder="e.g. Python, LangChain, FastAPI, React, PostgreSQL" value={proj.technologies} onChange={v => update(proj.id, "technologies", v)} />
          <SectionTextarea
            label="Description & Key Features"
            placeholder={`- Designed chatbot-style AI workflows using prompt engineering and task decomposition\n- Explored Retrieval-Augmented Generation pipeline design\n- Focused on real-world use cases such as document assistance and customer query handling`}
            value={proj.description}
            onChange={v => update(proj.id, "description", v)}
            rows={4}
            hint="Each bullet on a new line starting with -"
          />
        </Card>
      ))}
      <Button type="button" variant="outline" onClick={add} className="w-full gap-2 border-dashed border-white/20 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white">
        <Plus className="w-4 h-4" /> Add Project
      </Button>
    </div>
  );
}

// â"€â"€â"€ STEP 5: Skills â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€

function Step5Skills({ data, onChange }: { data: Skills; onChange: (d: Skills) => void }) {
  const set = (key: keyof Skills) => (v: string) => onChange({ ...data, [key]: v });
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-4 text-sm text-violet-300">
        <p className="font-semibold mb-1">ðŸ'¡ Tip</p>
        <p className="text-violet-300/70">Enter comma-separated values for each category. The AI will organize them beautifully. Leave blank if not applicable.</p>
      </div>
      <SectionField label="Programming Languages" placeholder="Python, JavaScript, TypeScript, SQL, Java, C++" value={data.programming} onChange={set("programming")} />
      <SectionField label="Frameworks & Libraries" placeholder="React, Next.js, FastAPI, LangChain, Node.js, Flask" value={data.frameworks} onChange={set("frameworks")} />
      <SectionField label="AI / Generative AI Tools" placeholder="LLM Workflows, RAG, Prompt Engineering, LangChain, OpenCV, PyTorch" value={data.generativeAI} onChange={set("generativeAI")} />
      <SectionField label="Tools & Platforms" placeholder="Git, GitHub, VS Code, Docker, Postman, Linux, AWS" value={data.tools} onChange={set("tools")} />
      <SectionField label="Other Technologies" placeholder="REST APIs, Data Science, Machine Learning, IoT, NLP" value={data.technologies} onChange={set("technologies")} />
    </div>
  );
}

// â"€â"€â"€ STEP 6: Certifications & Leadership â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€

function Step6Certs({
  certs, onCertsChange,
  leadership, onLeadershipChange
}: {
  certs: CertEntry[]; onCertsChange: (e: CertEntry[]) => void;
  leadership: string; onLeadershipChange: (v: string) => void;
}) {
  function addCert() {
    onCertsChange([...certs, { id: uid(), name: "", issuer: "", year: "" }]);
  }
  function removeCert(id: string) { onCertsChange(certs.filter(c => c.id !== id)); }
  function updateCert(id: string, key: keyof CertEntry, val: string) {
    onCertsChange(certs.map(c => c.id === id ? { ...c, [key]: val } : c));
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-zinc-300 mb-3 flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" /> Certifications
        </h3>
        <div className="space-y-3">
          {certs.map((cert, idx) => (
            <Card key={cert.id}>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white">Certification #{idx + 1}</p>
                <button onClick={() => removeCert(cert.id)} className="text-zinc-600 hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-red-500/10">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <SectionField label="Certification Name" placeholder="e.g. Principles of Generative AI" value={cert.name} onChange={v => updateCert(cert.id, "name", v)} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SectionField label="Issuing Organization" placeholder="e.g. Infosys Springboard / IBM" value={cert.issuer} onChange={v => updateCert(cert.id, "issuer", v)} />
                <SectionField label="Year (optional)" placeholder="2025" value={cert.year} onChange={v => updateCert(cert.id, "year", v)} />
              </div>
            </Card>
          ))}
          <Button type="button" variant="outline" onClick={addCert} className="w-full gap-2 border-dashed border-white/20 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white">
            <Plus className="w-4 h-4" /> Add Certification
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-zinc-300 mb-3 flex items-center gap-2">
          <Star className="w-4 h-4 text-violet-400" /> Leadership & Activities (optional)
        </h3>
        <SectionTextarea
          label=""
          placeholder={`- Team lead and active participant in AI, software, and innovation-focused hackathons\n- Strong interest in AI agents, RAG systems, NLP, LLM workflows, and real-world AI tools\n- Comfortable learning independently, experimenting quickly, and collaborating with teams`}
          value={leadership}
          onChange={onLeadershipChange}
          rows={4}
          hint="Each bullet on a new line starting with -"
        />
      </div>
    </div>
  );
}

// â"€â"€â"€ STEP 7: Finalize & Generate â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€

const TONES = [
  { value: "professional", label: "Professional", desc: "Polished & confident" },
  { value: "student", label: "Fresher / Student", desc: "Education & projects focus" },
  { value: "executive", label: "Executive", desc: "Leadership & strategy" },
] as const;

function Step7Generate({
  tone, setTone, targetRole, setTargetRole, jobDescription, setJobDescription, resumeTitle, setResumeTitle
}: {
  tone: string; setTone: (t: string) => void;
  targetRole: string; setTargetRole: (v: string) => void;
  jobDescription: string; setJobDescription: (v: string) => void;
  resumeTitle: string; setResumeTitle: (v: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm text-emerald-300">
        <p className="font-semibold mb-1">ðŸŽ¯ Almost there!</p>
        <p className="text-emerald-300/70">Fill in the details below and our AI will craft your perfect resume in seconds.</p>
      </div>

      <SectionField label="Resume Title (for your reference)" placeholder="e.g. Software Engineer Resume -- Google" value={resumeTitle} onChange={setResumeTitle} required icon={FileText} />
      <SectionField label="Target Job Title / Role" placeholder="e.g. AI/ML Engineer, Full Stack Developer, Data Scientist" value={targetRole} onChange={setTargetRole} required icon={Briefcase} />

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-300">Writing Tone</label>
        <div className="grid grid-cols-3 gap-3">
          {TONES.map(t => (
            <button
              key={t.value}
              type="button"
              onClick={() => setTone(t.value)}
              className={`rounded-xl border p-3 text-left transition-all duration-200 ${
                tone === t.value
                  ? "border-violet-500/50 bg-violet-500/10 text-white"
                  : "border-white/10 bg-zinc-900/40 text-zinc-400 hover:border-white/20 hover:text-zinc-300"
              }`}
            >
              <p className="text-xs font-semibold">{t.label}</p>
              <p className="text-xs text-zinc-500 mt-0.5">{t.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <SectionTextarea
        label="Job Description (optional but strongly recommended)"
        placeholder="Paste the full job description here. The AI will tailor your resume keywords specifically to match this JD, maximizing your ATS score..."
        value={jobDescription}
        onChange={setJobDescription}
        rows={6}
        hint="Adding a job description can increase your ATS score by 30-40%"
      />
    </div>
  );
}

// â"€â"€â"€ MAIN WIZARD â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€

export function ResumeBuilderWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // State for all sections
  const [personal, setPersonal] = useState<PersonalInfo>({
    fullName: "", email: "", phone: "", linkedin: "", github: "", location: ""
  });
  const [experiences, setExperiences] = useState<ExperienceEntry[]>([]);
  const [education, setEducation] = useState<EducationEntry[]>([]);
  const [projects, setProjects] = useState<ProjectEntry[]>([]);
  const [skills, setSkills] = useState<Skills>({
    programming: "", frameworks: "", generativeAI: "", tools: "", technologies: ""
  });
  const [certs, setCerts] = useState<CertEntry[]>([]);
  const [leadership, setLeadership] = useState("");

  // Step 7 state
  const [tone, setTone] = useState("professional");
  const [targetRole, setTargetRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resumeTitle, setResumeTitle] = useState("");

  const totalSteps = STEPS.length;

  function validateStep(): string | null {
    if (step === 1) {
      if (!personal.fullName.trim()) return "Full name is required.";
      if (!personal.email.trim()) return "Email is required.";
    }
    if (step === 7) {
      if (!resumeTitle.trim()) return "Please enter a resume title.";
      if (!targetRole.trim()) return "Please enter your target job title.";
    }
    return null;
  }

  function handleNext() {
    const err = validateStep();
    if (err) { setError(err); return; }
    setError("");
    if (step < totalSteps) setStep(s => s + 1);
  }

  function handleBack() {
    setError("");
    if (step > 1) setStep(s => s - 1);
  }

  function handleGenerate() {
    const err = validateStep();
    if (err) { setError(err); return; }
    setError("");

    startTransition(async () => {
      const payload = {
        resumeTitle,
        targetRole,
        tone,
        jobDescription,
        personal,
        experiences,
        education,
        projects,
        skills,
        certs,
        leadership,
      };

      const result = await createStructuredResumeAction(payload) as any;

      if (result?.error) {
        setError(result.error);
      } else if (result?.success) {
        setSuccess(true);
        if (result.guest) {
          sessionStorage.setItem("guestResume", JSON.stringify({
            title: resumeTitle,
            content: result.content,
          }));
          setTimeout(() => router.push("/dashboard/resumes/preview"), 800);
        } else if (result.resumeId) {
          setTimeout(() => router.push(`/dashboard/resumes/${result.resumeId}`), 800);
        }
      }
    });
  }

  const stepLabels = ["Personal", "Experience", "Education", "Projects", "Skills", "Certifications", "Generate"];

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      {/* Top Bar */}
      <div className="border-b border-white/10 bg-zinc-900/50 px-6 py-4 flex items-center gap-4 shrink-0">
        <Link href="/dashboard" className="text-zinc-500 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold text-white">AI Resume Builder</span>
        </div>
        <div className="ml-auto text-xs text-zinc-500">Step {step} of {totalSteps}</div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-zinc-800">
        <motion.div
          className="h-full bg-gradient-to-r from-violet-500 to-indigo-500"
          animate={{ width: `${(step / totalSteps) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left: Step Nav (desktop) */}
        <aside className="hidden md:flex flex-col w-52 border-r border-white/10 bg-zinc-900/30 p-4 shrink-0 gap-1">
          {STEPS.map(s => {
            const Icon = s.icon;
            const done = s.id < step;
            const active = s.id === step;
            return (
              <button
                key={s.id}
                onClick={() => { if (s.id < step) { setError(""); setStep(s.id); } }}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all ${
                  active ? "bg-violet-500/15 text-violet-300 border border-violet-500/20" :
                  done ? "text-emerald-400 hover:bg-white/5 cursor-pointer" :
                  "text-zinc-600 cursor-not-allowed"
                }`}
              >
                {done ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <Icon className="w-4 h-4 shrink-0" />}
                <span>{s.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-2xl mx-auto">
            {/* Step Header */}
            <div className="mb-6">
              {(() => {
                const s = STEPS[step - 1];
                const Icon = s.icon;
                return (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 border border-violet-500/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">{s.label}</h2>
                      <p className="text-sm text-zinc-500">
                        {step === 1 && "Your contact details -- these appear at the top of your resume"}
                        {step === 2 && "Add your work experience, internships, and roles"}
                        {step === 3 && "Add your academic qualifications"}
                        {step === 4 && "Showcase your personal and academic projects"}
                        {step === 5 && "List your technical skills by category"}
                        {step === 6 && "Add certifications and leadership activities"}
                        {step === 7 && "Choose tone and generate your professional resume"}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {step === 1 && <Step1Personal data={personal} onChange={setPersonal} />}
                {step === 2 && <Step2Experience entries={experiences} onChange={setExperiences} />}
                {step === 3 && <Step3Education entries={education} onChange={setEducation} />}
                {step === 4 && <Step4Projects entries={projects} onChange={setProjects} />}
                {step === 5 && <Step5Skills data={skills} onChange={setSkills} />}
                {step === 6 && (
                  <Step6Certs
                    certs={certs} onCertsChange={setCerts}
                    leadership={leadership} onLeadershipChange={setLeadership}
                  />
                )}
                {step === 7 && (
                  <Step7Generate
                    tone={tone} setTone={setTone}
                    targetRole={targetRole} setTargetRole={setTargetRole}
                    jobDescription={jobDescription} setJobDescription={setJobDescription}
                    resumeTitle={resumeTitle} setResumeTitle={setResumeTitle}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  Resume generated! Redirecting to preview...
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
              <Button
                type="button"
                variant="ghost"
                onClick={handleBack}
                disabled={step === 1}
                className="gap-2 text-zinc-400 hover:text-white"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </Button>

              {step < totalSteps ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white border-0"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleGenerate}
                  disabled={isPending || success}
                  className="gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white border-0 px-8"
                >
                  {isPending ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Generating with AI...</>
                  ) : success ? (
                    <><CheckCircle2 className="w-4 h-4" /> Done! Redirecting...</>
                  ) : (
                    <><Sparkles className="w-4 h-4" /> Generate My Resume</>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}





