import { Mail } from "lucide-react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

export const socialConfig = {
  github: {
    name: "GitHub",
    url: "https://github.com/Dilip-chendra/resume-ai",
    icon: FaGithub,
  },
  twitter: {
    name: "Twitter / X",
    url: "https://twitter.com/resumeai", // Replace with real X URL when available
    icon: FaTwitter,
  },
  linkedin: {
    name: "LinkedIn",
    url: "https://linkedin.com/company/resumeai", // Replace with real LinkedIn URL
    icon: FaLinkedin,
  },
  email: {
    name: "Email",
    url: "mailto:soultech351@gmail.com",
    icon: Mail,
  },
};
