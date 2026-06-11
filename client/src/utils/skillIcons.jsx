import React from 'react';
import { 
  SiHtml5, SiCss3, SiJavascript, SiReact, SiBootstrap, 
  SiNodedotjs, SiExpress, SiPhp, SiMysql, SiMongodb, SiPostgresql,
  SiTailwindcss, SiNextdotjs, SiTypescript, SiGit, SiGithub,
  SiFigma, SiFirebase, SiVuedotjs, SiLaravel, SiPython, SiDocker
} from 'react-icons/si';
import { FaServer, FaKey, FaNetworkWired, FaCamera, FaDraftingCompass, FaGlobe, FaDatabase } from 'react-icons/fa';

export const getSkillIcon = (skillName) => {
  const name = skillName.toLowerCase();
  
  if (name.includes('html')) return <SiHtml5 color="#E34F26" />;
  if (name.includes('css')) return <SiCss3 color="#1572B6" />;
  if (name.includes('javascript') || name === 'js') return <SiJavascript color="#F7DF1E" />;
  if (name.includes('typescript') || name === 'ts') return <SiTypescript color="#3178C6" />;
  if (name.includes('react')) return <SiReact color="#61DAFB" />;
  if (name.includes('next')) return <SiNextdotjs color="#000000" />;
  if (name.includes('vue')) return <SiVuedotjs color="#4FC08D" />;
  if (name.includes('bootstrap')) return <SiBootstrap color="#7952B3" />;
  if (name.includes('tailwind')) return <SiTailwindcss color="#06B6D4" />;
  
  if (name.includes('node')) return <SiNodedotjs color="#339933" />;
  if (name.includes('express')) return <SiExpress color="#000000" />;
  if (name.includes('php')) return <SiPhp color="#777BB4" />;
  if (name.includes('laravel')) return <SiLaravel color="#FF2D20" />;
  if (name.includes('python')) return <SiPython color="#3776AB" />;
  
  if (name.includes('mysql')) return <SiMysql color="#4479A1" />;
  if (name.includes('mongodb') || name.includes('mongo')) return <SiMongodb color="#47A248" />;
  if (name.includes('postgres') || name.includes('postgresql')) return <SiPostgresql color="#4169E1" />;
  if (name.includes('firebase')) return <SiFirebase color="#FFCA28" />;
  if (name.includes('database') || name.includes('sql')) return <FaDatabase color="#6c757d" />;
  
  if (name.includes('git') && !name.includes('github')) return <SiGit color="#F05032" />;
  if (name.includes('github')) return <SiGithub color="#181717" />;
  if (name.includes('docker')) return <SiDocker color="#2496ED" />;
  
  if (name.includes('figma')) return <SiFigma color="#F24E1E" />;
  if (name.includes('seo') || name.includes('globe') || name.includes('web')) return <FaGlobe color="#2563eb" />;
  if (name.includes('api') || name.includes('rest')) return <FaServer color="#10b981" />;
  if (name.includes('auth') || name.includes('jwt') || name.includes('security')) return <FaKey color="#f59e0b" />;
  if (name.includes('network') || name.includes('jaringan')) return <FaNetworkWired color="#6366f1" />;
  if (name.includes('cctv') || name.includes('camera')) return <FaCamera color="#4b5563" />;
  if (name.includes('autocad') || name.includes('revit') || name.includes('drafting')) return <FaDraftingCompass color="#dc2626" />;
  
  // Default icon if not matched
  return null;
};
