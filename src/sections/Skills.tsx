import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { skillCategories } from '../data/skills';
import type { Skill } from '../types';

// ── Tech brand colors ─────────────────────────────────────────────────────
const TECH_COLORS: Record<string, { bg: string; text: string }> = {
  'React':        { bg: 'rgba(97,218,251,0.12)',  text: '#61DAFB' },
  'TypeScript':   { bg: 'rgba(49,120,198,0.12)',  text: '#3178C6' },
  'JavaScript':   { bg: 'rgba(247,223,30,0.10)',  text: '#F7DF1E' },
  'Node.js':      { bg: 'rgba(104,159,56,0.12)',  text: '#689F38' },
  'NestJS':       { bg: 'rgba(234,0,102,0.10)',   text: '#EA0066' },
  'MongoDB':      { bg: 'rgba(71,162,72,0.12)',   text: '#47A248' },
  'MySQL':        { bg: 'rgba(0,117,143,0.12)',   text: '#00758F' },
  'PostgreSQL':   { bg: 'rgba(51,103,145,0.12)',  text: '#336791' },
  'Tailwind CSS': { bg: 'rgba(6,182,212,0.10)',   text: '#06B6D4' },
  'HTML5':        { bg: 'rgba(228,77,38,0.10)',   text: '#E44D26' },
  'CSS3':         { bg: 'rgba(38,77,228,0.10)',   text: '#264DE4' },
  'PHP':          { bg: 'rgba(119,123,180,0.12)', text: '#777BB4' },
  'Express.js':   { bg: 'rgba(148,163,184,0.08)', text: '#94A3B8' },
  'Git':          { bg: 'rgba(240,80,50,0.10)',   text: '#F05032' },
  'GitHub':       { bg: 'rgba(148,163,184,0.08)', text: '#c9d1d9' },
  'Bootstrap':    { bg: 'rgba(121,82,179,0.10)',  text: '#7952B3' },
  'REST APIs':    { bg: 'rgba(0,200,250,0.10)',   text: '#00C8FA' },
  'Postman':      { bg: 'rgba(255,111,0,0.10)',   text: '#FF6F00' },
  'VS Code':      { bg: 'rgba(0,122,204,0.10)',   text: '#007ACC' },
  'npm':          { bg: 'rgba(204,0,0,0.10)',     text: '#CC0000' },
};
const DEFAULT_COLOR = { bg: 'rgba(16,185,129,0.08)', text: 'var(--color-emerald)' };

// ── Category accent colors ────────────────────────────────────────────────
const CAT_ACCENT: Record<string, { line: string; dot: string; glow: string }> = {
  frontend: { line: '#7F81FF', dot: '#7F81FF', glow: 'rgba(127,129,255,0.35)' },
  backend:  { line: '#00C8FA', dot: '#00C8FA', glow: 'rgba(0,200,250,0.35)'   },
  database: { line: '#22D3EE', dot: '#22D3EE', glow: 'rgba(34,211,238,0.35)'  },
  tools:    { line: '#818CF8', dot: '#818CF8', glow: 'rgba(129,140,248,0.35)' },
};

// ── Category section icons ────────────────────────────────────────────────
const CAT_ICONS: Record<string, React.ReactNode> = {
  frontend: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  backend: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
    </svg>
  ),
  database: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
    </svg>
  ),
  tools: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
};

// ── Brand SVG icons (Simple Icons paths) ─────────────────────────────────
const TechIcon: React.FC<{ name: string; color: string }> = ({ name, color }) => {
  switch (name) {
    case 'HTML5':
      return <svg viewBox="0 0 24 24" fill={color} className="w-4 h-4" aria-hidden="true"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/></svg>;
    case 'CSS3':
      return <svg viewBox="0 0 24 24" fill={color} className="w-4 h-4" aria-hidden="true"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.413z"/></svg>;
    case 'JavaScript':
      return <svg viewBox="0 0 24 24" fill={color} className="w-4 h-4" aria-hidden="true"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855l-.127-.196-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179z"/></svg>;
    case 'TypeScript':
      return <svg viewBox="0 0 24 24" fill={color} className="w-4 h-4" aria-hidden="true"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/></svg>;
    case 'React':
      return <svg viewBox="0 0 24 24" fill={color} className="w-4 h-4" aria-hidden="true"><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38a2.37 2.37 0 0 0-1.092-.278z"/></svg>;
    case 'Tailwind CSS':
      return <svg viewBox="0 0 24 24" fill={color} className="w-4 h-4" aria-hidden="true"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/></svg>;
    case 'Bootstrap':
      return <svg viewBox="0 0 24 24" fill={color} className="w-4 h-4" aria-hidden="true"><path d="M11.77 11.24H9.956V8.202h2.152c1.17 0 1.834.522 1.834 1.466 0 1.008-.773 1.572-2.174 1.572zm.324 1.206H9.956v3.348h2.231c1.459 0 2.232-.585 2.232-1.685s-.795-1.663-2.326-1.663zM14.268 0H3.109C1.391 0 0 1.391 0 3.109v17.782C0 22.609 1.391 24 3.109 24h17.782C22.609 24 24 22.609 24 20.891V8.558zM13.066 14.927c-.646.647-1.588.976-2.811.976H7.37V6.327h2.885c1.17 0 2.08.317 2.694.943.614.625.92 1.488.92 2.555 0 .73-.234 1.389-.703 1.935-.135.16-.281.305-.438.43.198.144.38.305.544.479.505.54.758 1.221.758 2.04.001 1.073-.321 1.901-.964 2.218z"/></svg>;
    case 'Node.js':
      return <svg viewBox="0 0 24 24" fill={color} className="w-4 h-4" aria-hidden="true"><path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339c.082.045.198.045.275 0l8.795-5.076c.082-.047.134-.141.134-.238V6.921c0-.099-.052-.19-.137-.241l-8.791-5.073c-.081-.047-.189-.047-.271 0L3.075 6.68c-.085.05-.139.143-.139.241v10.15c0 .097.054.189.139.235l2.409 1.392c1.307.654 2.108-.116 2.108-.891V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.111.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675c-.57-.329-.922-.942-.922-1.596V6.921c0-.658.352-1.269.922-1.597l8.795-5.082c.557-.315 1.296-.315 1.848 0l8.794 5.082c.57.329.924.939.924 1.597v10.158c0 .657-.354 1.267-.924 1.596l-8.794 5.078c-.282.16-.602.247-.925.247z"/></svg>;
    case 'Express.js':
      return <svg viewBox="0 0 24 24" fill={color} className="w-4 h-4" aria-hidden="true"><path d="M24 18.588a1.529 1.529 0 0 1-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 0 1-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 0 1 1.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 0 1 1.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 0 0 0 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 0 0 2.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 0 1-2.589 3.957 6.272 6.272 0 0 1-7.306-.933 6.575 6.575 0 0 1-1.64-3.858c0-.118-.053-.235-.08-.352v-.47zm1.64-.422c-.029 1.149.477 2.246 1.364 2.973.887.728 2.057 1.046 3.211.882a4.516 4.516 0 0 0 3.58-3.855H1.642z"/></svg>;
    case 'NestJS':
      return <svg viewBox="0 0 24 24" fill={color} className="w-4 h-4" aria-hidden="true"><path d="M14.131.047c-.173 0-.334.037-.483.087.316.21.49.49.576.806a1.327 1.327 0 0 1 .013.195c0 .55-.168 1.055-.447 1.477.363-.611.578-1.394.578-2.218A3.74 3.74 0 0 0 14.131.047zM7.3 9.8c2.098 0 3.8-1.7 3.8-3.8S9.398 2.2 7.3 2.2c-2.1 0-3.8 1.7-3.8 3.8S5.2 9.8 7.3 9.8zm0 1.2c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5zm9.4-1.2c2.098 0 3.8-1.7 3.8-3.8S18.798 2.2 16.7 2.2c-2.1 0-3.8 1.7-3.8 3.8S14.6 9.8 16.7 9.8zm0 1.2c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5z"/></svg>;
    case 'PHP':
      return <svg viewBox="0 0 24 24" fill={color} className="w-4 h-4" aria-hidden="true"><path d="M12 18.08c-6.63 0-12-2.72-12-6.08s5.37-6.08 12-6.08S24 8.64 24 12s-5.37 6.08-12 6.08zM6.81 10.13c-.46 0-.79.05-1 .1v3.15c.2.05.45.06.79.06.8 0 1.49-.27 1.93-.74.37-.41.54-.96.54-1.65 0-.56-.16-1.04-.48-1.38-.36-.37-.87-.54-1.78-.54zm-.3 2.85v-2.5c.17-.03.36-.04.58-.04.83 0 1.33.42 1.33 1.23 0 .9-.54 1.39-1.46 1.39-.17 0-.32-.01-.45-.08zm6.55-2.55c-.42 0-.65.03-.82.05v1.16h.76c.47 0 .75-.23.75-.63 0-.36-.22-.58-.69-.58zm-.07 1.67h-.75v1.66h-.72V10.21h1.6c.88 0 1.36.42 1.36 1.1 0 .51-.28.92-.74 1.14l1.01 1.7h-.83zm4.55-1.67c-.43 0-.7.03-.87.05v1.16h.79c.47 0 .75-.23.75-.63 0-.37-.22-.58-.67-.58zm-.08 1.67h-.79v1.66h-.73V10.21h1.61c.88 0 1.37.42 1.37 1.1 0 .51-.29.92-.75 1.14l1.01 1.7h-.84z"/></svg>;
    case 'MongoDB':
      return <svg viewBox="0 0 24 24" fill={color} className="w-4 h-4" aria-hidden="true"><path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0 1 11.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 0 0 3.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/></svg>;
    case 'MySQL':
      return <svg viewBox="0 0 24 24" fill={color} className="w-4 h-4" aria-hidden="true"><path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.151zM5.77 18.695h-.927a50.854 50.854 0 0 0-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 0 0-.195 4.41H0c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.064h1.095c.242 2.015.384 3.86.428 5.53zm4.017-4.08c-.56 1.683-1.39 2.484-2.476 2.484-.527 0-.897-.19-1.107-.572h-.014v2.152H5.23v-5.607h.96v.54h.013c.215-.395.6-.59 1.162-.59 1.075 0 1.61.75 1.61 2.25v.343zm-.99-.46c0-.87-.285-1.305-.856-1.305-.31 0-.55.106-.72.32-.17.214-.257.504-.257.87v.347c0 .39.09.688.27.896.18.208.43.312.75.312.56 0 .812-.415.812-1.44zm6.952 4.54h-.878v-3.218c0-.798-.294-1.196-.88-1.196-.545 0-.817.37-.817 1.11v3.304h-.878v-3.218c0-.798-.294-1.196-.88-1.196-.545 0-.817.37-.817 1.11v3.304h-.878v-5.003h.878v.616h.013c.245-.476.644-.714 1.195-.714.56 0 .938.27 1.13.808.27-.54.7-.808 1.284-.808.858 0 1.287.52 1.287 1.562v3.539zm4.078 0h-.93v-.577h-.013c-.26.443-.67.665-1.225.665-.424 0-.758-.12-.998-.36-.24-.24-.36-.57-.36-.987 0-.876.507-1.378 1.52-1.506l1.076-.148c0-.58-.245-.87-.737-.87-.45 0-.882.178-1.295.535v-.826c.43-.27.918-.404 1.465-.404 1.016 0 1.524.52 1.524 1.566v2.912zm-.93-2.028l-.804.11c-.247.034-.435.1-.563.2-.128.1-.192.267-.192.5 0 .174.062.32.187.43.125.11.298.165.52.165.296 0 .532-.11.71-.32.177-.21.267-.48.267-.817v-.268zm4.378 2.028h-.877v-3.254c0-.77-.293-1.156-.878-1.156-.56 0-.84.387-.84 1.16v3.25h-.877v-5.003h.877v.6h.014c.275-.458.694-.687 1.254-.687.86 0 1.29.52 1.29 1.562v3.528z"/></svg>;
    case 'PostgreSQL':
      return <svg viewBox="0 0 24 24" fill={color} className="w-4 h-4" aria-hidden="true"><path d="M17.128 0a10.134 10.134 0 0 0-2.755.403c-.613.18-1.297.51-1.953.903a7.077 7.077 0 0 0-1.012-.654A6.62 6.62 0 0 0 8.354.42C6.527.868 5.114 1.842 4.058 3.236c-.545.715-.924 1.502-1.175 2.305C2.5 6.7 2.424 7.908 2.504 9.21l.002.075c-.01.312-.028.626-.028.94 0 1.395.114 2.75.33 4.027.28 1.722.747 3.19 1.366 4.33.619 1.14 1.37 1.935 2.214 2.334a3.5 3.5 0 0 0 1.48.327c.45 0 .9-.086 1.318-.257a5.1 5.1 0 0 0 1.023-.238l.18-.07.37.34.51.485c.802.756 1.677 1.285 2.72 1.352 1.03.065 2.028-.39 2.842-1.354.73-.867 1.216-2.173 1.336-3.673.117-1.437.057-2.845-.07-4.126.054-.082.105-.165.156-.25.352-.591.595-1.342.696-2.223.097-.86.056-1.832-.126-2.862-.07-.392-.29-.727-.594-.96a3.75 3.75 0 0 0-.232-.22c.24-.298.42-.666.51-1.075.063-.285.085-.58.065-.873-.04-.573-.218-1.14-.512-1.616A3.413 3.413 0 0 0 17.956.3 3.46 3.46 0 0 0 17.128 0z"/></svg>;
    case 'Git':
      return <svg viewBox="0 0 24 24" fill={color} className="w-4 h-4" aria-hidden="true"><path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.609-.405-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/></svg>;
    case 'GitHub':
      return <svg viewBox="0 0 24 24" fill={color} className="w-4 h-4" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>;
    case 'REST APIs':
      return <svg viewBox="0 0 24 24" fill={color} className="w-4 h-4" aria-hidden="true"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm1 16.057v-3H8.97a2.01 2.01 0 0 0-1.627.857L6.2 15.4A9.154 9.154 0 0 1 5.091 12H7a2 2 0 0 0 2-2V7h2a1 1 0 0 1 1 1v1.057A4.002 4.002 0 0 1 16 13h-1.942l-1.06 1.06A3.98 3.98 0 0 1 13 16.057z"/></svg>;
    case 'Postman':
      return <svg viewBox="0 0 24 24" fill={color} className="w-4 h-4" aria-hidden="true"><path d="M13.527.099C6.955-.744.942 3.9.099 10.473c-.843 6.572 3.8 12.584 10.373 13.428 6.573.843 12.587-3.801 13.428-10.374C24.744 6.955 20.101.943 13.527.099zm2.471 7.485a.855.855 0 0 0-.593.25l-4.453 4.453-.307-.307-.643-.643 4.453-4.453a.86.86 0 1 0-1.2-1.232l-4.45 4.45-.208-.207a.855.855 0 0 0-1.208 1.208l5 5a.855.855 0 0 0 1.208-1.208l-.24-.24 4.453-4.453a.858.858 0 0 0-.612-1.618z"/></svg>;
    case 'VS Code':
      return <svg viewBox="0 0 24 24" fill={color} className="w-4 h-4" aria-hidden="true"><path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/></svg>;
    case 'npm':
      return <svg viewBox="0 0 24 24" fill={color} className="w-4 h-4" aria-hidden="true"><path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z"/></svg>;
    default:
      return <span className="text-[10px] font-black leading-none">{name.slice(0, 2)}</span>;
  }
};

// ── Skill pill ────────────────────────────────────────────────────────────
const SkillPill: React.FC<{ skill: Skill }> = ({ skill }) => {
  const { t } = useLanguage();
  const colors = TECH_COLORS[skill.name] ?? DEFAULT_COLOR;
  return (
    <div
      className="flex items-center gap-2.5 px-3 py-2 rounded-xl border transition-all duration-200 cursor-default select-none"
      style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border)' }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = colors.text + '55';
        el.style.transform = 'translateY(-2px)';
        el.style.boxShadow = `0 6px 20px ${colors.text}22`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = 'var(--color-border)';
        el.style.transform = 'translateY(0)';
        el.style.boxShadow = 'none';
      }}
    >
      <span
        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: colors.bg, color: colors.text }}
      >
        <TechIcon name={skill.name} color={colors.text} />
      </span>
      <span className="text-xs font-medium leading-tight flex-1" style={{ color: 'var(--color-text-primary)' }}>
        {skill.name}
      </span>
      {skill.level === 'learning' && (
        <span
          className="ml-auto text-xs px-1.5 py-0.5 rounded-full font-semibold flex-shrink-0"
          style={{ backgroundColor: 'rgba(45,212,191,0.12)', color: 'var(--color-teal)' }}
        >
          {t.skills_learning}
        </span>
      )}
    </div>
  );
};

// ── Timeline card ─────────────────────────────────────────────────────────
const TimelineCard: React.FC<{
  category: typeof skillCategories[number];
  side: 'left' | 'right';
  index: number;
}> = ({ category, side, index }) => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const accent = CAT_ACCENT[category.id] ?? CAT_ACCENT.frontend;
  const titleKey = category.titleKey as keyof ReturnType<typeof useLanguage>['t'];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) { setVisible(true); return; }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); } },
      { threshold: 0.18, rootMargin: '0px 0px -60px 0px' }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <div
      ref={ref}
      className={`relative flex w-full items-center ${side === 'left' ? 'justify-start' : 'justify-end'}`}
    >
      {/* Connector line */}
      <div
        className="absolute top-1/2 -translate-y-1/2 h-px transition-all duration-700"
        aria-hidden="true"
        style={{
          width: visible ? '10%' : '0%',
          background: `linear-gradient(${side === 'left' ? '90deg' : '270deg'}, transparent, ${accent.line})`,
          left: side === 'left' ? '45%' : undefined,
          right: side === 'right' ? '45%' : undefined,
          transitionDelay: `${index * 140 + 300}ms`,
        }}
      />
      {/* Card */}
      <div
        className="w-[44%] rounded-2xl border p-5 group"
        style={{
          backgroundColor: 'var(--color-bg-card)',
          borderColor: 'var(--color-border)',
          opacity: visible ? 1 : 0,
          transform: visible
            ? 'translateX(0) translateY(0)'
            : `translateX(${side === 'left' ? '-40px' : '40px'}) translateY(10px)`,
          transition: 'opacity 0.6s ease, transform 0.6s ease',
          transitionDelay: `${index * 140}ms`,
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = accent.line + '55';
          el.style.boxShadow = `0 8px 32px ${accent.glow}`;
          el.style.transform = 'translateY(-3px)';
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = 'var(--color-border)';
          el.style.boxShadow = 'none';
          el.style.transform = 'translateY(0)';
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: accent.line + '18', color: accent.line }}
          >
            {CAT_ICONS[category.id]}
          </div>
          <div>
            <h3 className="font-bold text-sm leading-tight" style={{ color: 'var(--color-text-primary)' }}>
              {t[titleKey] as string}
            </h3>
            <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
              {category.skills.length} technologies
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-1.5">
          {category.skills.map((skill) => (
            <SkillPill key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Spine node ────────────────────────────────────────────────────────────
const SpineNode: React.FC<{ index: number; color: string; glow: string }> = ({ index, color, glow }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) { setVisible(true); return; }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); } },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <div
      ref={ref}
      className="flex justify-center items-center h-10"
      aria-hidden="true"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.3)',
        transition: `opacity 0.45s ease ${index * 140 + 80}ms, transform 0.45s cubic-bezier(0.34,1.56,0.64,1) ${index * 140 + 80}ms`,
      }}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center"
        style={{
          backgroundColor: `${color}18`,
          border: `2px solid ${color}`,
          boxShadow: visible ? `0 0 20px ${glow}` : 'none',
          transition: 'box-shadow 0.5s ease',
        }}
      >
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
      </div>
    </div>
  );
};

// ── Animated spine line ───────────────────────────────────────────────────
const AnimatedSpine: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) { setHeight(parent?.offsetHeight ?? 0); return; }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const target = parent?.offsetHeight ?? 0;
          let start: number | null = null;
          const duration = 2200;
          const animate = (ts: number) => {
            if (!start) start = ts;
            const pct = Math.min((ts - start) / duration, 1);
            setHeight((1 - Math.pow(1 - pct, 3)) * target);
            if (pct < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          observer.unobserve(el);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <div ref={ref} className="absolute inset-x-0 top-0 flex justify-center pointer-events-none" aria-hidden="true">
      <div
        className="absolute top-0 bottom-0 w-0.5"
        style={{ background: 'repeating-linear-gradient(to bottom,var(--color-border) 0px,var(--color-border) 6px,transparent 6px,transparent 14px)' }}
      />
      <div
        className="absolute top-0 w-1 rounded-full"
        style={{ height: `${height}px`, background: 'linear-gradient(to bottom,#7F81FF 0%,#00C8FA 25%,#22D3EE 50%,#818CF8 75%,#7F81FF 100%)', boxShadow: '0 0 12px rgba(127,129,255,0.4), 0 0 24px rgba(0,200,250,0.3)' }}
      />
    </div>
  );
};

// ── Main export ───────────────────────────────────────────────────────────
export const Skills: React.FC = () => {
  const { t } = useLanguage();
  const sides: Array<'left' | 'right'> = ['right', 'left', 'right', 'left'];

  return (
    <section
      id="skills"
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
      aria-labelledby="skills-heading"
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div
          className="text-center mb-16"
          style={{ opacity: 0, animation: 'fadeIn 0.7s ease-out 0.1s forwards' }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--color-emerald)' }}>
            {t.skills_section_subtitle}
          </p>
          <h2 id="skills-heading" className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>
            {t.skills_section_title}
          </h2>
          <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
            A snapshot of the path I&apos;m walking as a developer.
          </p>
          <div className="mt-4 mx-auto h-1 w-16 rounded-full" style={{ background: 'linear-gradient(135deg,var(--color-emerald),var(--color-teal))' }} />
        </div>

        {/* Timeline */}
        <div className="relative">
          <AnimatedSpine />
          <div className="relative z-10 space-y-0">
            {skillCategories.map((cat, idx) => {
              const accent = CAT_ACCENT[cat.id] ?? CAT_ACCENT.frontend;
              return (
                <React.Fragment key={cat.id}>
                  <SpineNode index={idx} color={accent.dot} glow={accent.glow} />
                  <div className="py-4">
                    <TimelineCard category={cat} side={sides[idx]} index={idx} />
                  </div>
                </React.Fragment>
              );
            })}
            {/* Terminal dot */}
            <div className="flex justify-center pt-2" aria-hidden="true">
              <div
                className="w-4 h-4 rounded-full border-2"
                style={{ borderColor: 'var(--color-teal)', backgroundColor: 'var(--color-bg-primary)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
