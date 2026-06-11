import React from 'react';
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaBootstrap, 
  FaNodeJs, FaPhp, FaLaravel, FaPython, FaDocker,
  FaGithub, FaGitAlt, FaFigma, FaVuejs,
  FaServer, FaKey, FaNetworkWired, FaCamera, FaDraftingCompass, FaGlobe, FaDatabase
} from 'react-icons/fa';
import { SiTailwindcss, SiNextdotjs, SiTypescript, SiMysql, SiMongodb, SiPostgresql, SiFirebase } from 'react-icons/si';

export const getSkillIcon = (skillName) => {
  const name = skillName.toLowerCase();
  
  if (name.includes('html')) return <FaHtml5 color="#E34F26" />;
  if (name.includes('css')) return <FaCss3Alt color="#1572B6" />;
  if (name.includes('javascript') || name === 'js') return <FaJs color="#F7DF1E" />;
  if (name.includes('typescript') || name === 'ts') return <SiTypescript color="#3178C6" />;
  if (name.includes('react')) return <FaReact color="#61DAFB" />;
  if (name.includes('next')) return <SiNextdotjs color="#000000" />;
  if (name.includes('vue')) return <FaVuejs color="#4FC08D" />;
  if (name.includes('bootstrap')) return <FaBootstrap color="#7952B3" />;
  if (name.includes('tailwind')) return <SiTailwindcss color="#06B6D4" />;
  
  if (name.includes('node')) return <FaNodeJs color="#339933" />;
  if (name.includes('express')) return <FaNodeJs color="#000000" />; // using Node icon for Express
  if (name.includes('php')) return <FaPhp color="#777BB4" />;
  if (name.includes('laravel')) return <FaLaravel color="#FF2D20" />;
  if (name.includes('python')) return <FaPython color="#3776AB" />;
  
  if (name.includes('mysql')) return <SiMysql color="#4479A1" />;
  if (name.includes('mongodb') || name.includes('mongo')) return <SiMongodb color="#47A248" />;
  if (name.includes('postgres') || name.includes('postgresql')) return <SiPostgresql color="#4169E1" />;
  if (name.includes('firebase')) return <SiFirebase color="#FFCA28" />;
  if (name.includes('database') || name.includes('sql')) return <FaDatabase color="#6c757d" />;
  
  if (name.includes('git') && !name.includes('github')) return <FaGitAlt color="#F05032" />;
  if (name.includes('github')) return <FaGithub color="#181717" />;
  if (name.includes('docker')) return <FaDocker color="#2496ED" />;
  
  if (name.includes('figma')) return <FaFigma color="#F24E1E" />;
  if (name.includes('seo') || name.includes('globe') || name.includes('web')) return <FaGlobe color="#2563eb" />;
  if (name.includes('api') || name.includes('rest')) return <FaServer color="#10b981" />;
  if (name.includes('auth') || name.includes('jwt') || name.includes('security')) return <FaKey color="#f59e0b" />;
  if (name.includes('network') || name.includes('jaringan')) return <FaNetworkWired color="#6366f1" />;
  if (name.includes('cctv') || name.includes('camera')) return <FaCamera color="#4b5563" />;
  if (name.includes('autocad') || name.includes('revit') || name.includes('drafting')) return <FaDraftingCompass color="#dc2626" />;
  
  // Default icon if not matched
  return null;
};
