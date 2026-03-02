/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronRight, User, Play, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for merging tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const MiraLogo = ({ className }: { className?: string }) => (
  <img 
    src="https://entornodev.com/descargas/Logo-Mira-Header.webp" 
    alt="MIRA Intelligence" 
    className={cn("object-contain", className)} 
  />
);

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' | 'ghost', size?: 'sm' | 'md' | 'lg' }>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-mira-primary text-white hover:bg-mira-secondary shadow-lg shadow-mira-primary/20 hover:shadow-mira-secondary/30 rounded-lg',
      secondary: 'bg-gradient-to-r from-mira-secondary to-mira-accent text-white hover:opacity-90 shadow-md rounded-lg',
      outline: 'border border-slate-300 bg-white/50 backdrop-blur-sm hover:bg-white text-slate-900 rounded-lg',
      ghost: 'bg-transparent hover:bg-slate-100/50 text-slate-600 hover:text-mira-primary rounded-lg',
    };
    const sizes = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-5 text-sm',
      lg: 'h-12 px-8 text-base',
    };
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-bold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mira-primary disabled:pointer-events-none disabled:opacity-50 active:scale-95',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 py-3 shadow-sm' : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <MiraLogo className="w-10 h-10" />
          <span className="text-2xl font-display font-bold tracking-tight text-mira-primary">mira</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {['Mercados', 'Soluciones', 'Insights', 'Precios'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-body font-semibold text-slate-600 hover:text-mira-primary transition-colors relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-mira-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <a href="#" className="text-sm font-body font-semibold text-slate-600 hover:text-mira-primary transition-colors">
            Iniciar sesión
          </a>
          <Button variant="primary" size="sm">
            Empezar prueba gratuita
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-slate-600 hover:text-mira-primary transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-slate-200 p-4 shadow-lg md:hidden overflow-hidden"
          >
            <nav className="flex flex-col gap-4">
              {['Mercados', 'Soluciones', 'Insights', 'Precios'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-lg font-display font-bold text-slate-800 hover:text-mira-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <hr className="border-slate-100" />
              <a href="#" className="text-base font-body font-semibold text-slate-600 hover:text-mira-primary">
                Iniciar sesión
              </a>
              <Button className="w-full">Empezar prueba gratuita</Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-20 pb-10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-mesh-gradient opacity-30 pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <MiraLogo className="h-8 w-auto" />
              <span className="text-2xl font-display font-bold text-slate-900">mira</span>
            </div>
            <p className="text-slate-600 text-sm font-body leading-relaxed max-w-xs mb-8">
              Plataforma de inteligencia de mercado para optimizar decisiones de compra con datos oficiales y predictivos.
            </p>
            <div className="flex gap-4">
              {/* Social Placeholders */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-10 h-10 bg-white rounded-full shadow-sm hover:shadow-md hover:scale-110 transition-all duration-300 flex items-center justify-center cursor-pointer border border-slate-100">
                  <div className="w-4 h-4 bg-slate-300 rounded-sm" />
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-slate-900 mb-6">Producto</h4>
            <ul className="space-y-3 text-sm font-body text-slate-600">
              <li><a href="#" className="hover:text-mira-primary transition-colors">Mercados</a></li>
              <li><a href="#" className="hover:text-mira-primary transition-colors">Alertas</a></li>
              <li><a href="#" className="hover:text-mira-primary transition-colors">IA Predictiva</a></li>
              <li><a href="#" className="hover:text-mira-primary transition-colors">API</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-slate-900 mb-6">Recursos</h4>
            <ul className="space-y-3 text-sm font-body text-slate-600">
              <li><a href="#" className="hover:text-mira-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-mira-primary transition-colors">Guías</a></li>
              <li><a href="#" className="hover:text-mira-primary transition-colors">Soporte</a></li>
              <li><a href="#" className="hover:text-mira-primary transition-colors">Estado</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-slate-900 mb-6">Legal</h4>
            <ul className="space-y-3 text-sm font-body text-slate-600">
              <li><a href="#" className="hover:text-mira-primary transition-colors">Privacidad</a></li>
              <li><a href="#" className="hover:text-mira-primary transition-colors">Términos</a></li>
              <li><a href="#" className="hover:text-mira-primary transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-200/60 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-body text-slate-500">
          <p>&copy; {new Date().getFullYear()} MIRA Intelligence. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <span>Hecho en Europa</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- New Components for Hero ---

const DataAnchor = () => {
  const { scrollY } = useScroll();
  const [isAnchored, setIsAnchored] = useState(false);
  
  // Transform values based on scroll position
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);
  const opacity = useTransform(scrollY, [0, 100], [1, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setIsAnchored(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      style={{ scale, opacity }}
      className={cn(
        'bg-white rounded-xl overflow-hidden w-full max-w-sm transition-all duration-500 ease-spring z-40 border border-slate-200 shadow-2xl',
        isAnchored 
          ? 'fixed bottom-6 right-6 w-80 ring-1 ring-slate-900/5' 
          : 'relative hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] hover:scale-[1.01]'
      )}
    >
      {/* Terminal Header */}
      <div className="bg-slate-900 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
           <div className="flex gap-1.5">
             <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
             <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
             <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
           </div>
           <span className="text-[10px] font-mono text-slate-400 ml-2">MIRA_TERMINAL_V2.0</span>
        </div>
        <div className="flex items-center gap-1.5">
           <span className="text-[10px] font-mono text-slate-500 mr-2">02 MAR 2026</span>
           <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
           <span className="text-[10px] font-bold text-green-500 uppercase">LIVE</span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
            <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Commodity</span>
                <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    Aceite de Oliva
                    <span className="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] text-slate-500 font-mono">VIRGEN EXTRA</span>
                </span>
            </div>
            <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Fuente</span>
                <span className="text-xs font-bold text-slate-600 bg-slate-50 px-2 py-1 rounded border border-slate-100">POOLRED</span>
            </div>
        </div>
        
        <div className="flex items-baseline gap-3 mb-4">
            <span className="text-4xl font-mono font-bold text-slate-900 tracking-tighter">8.450 €</span>
            <div className="flex flex-col items-start">
                <span className="text-xs font-bold text-green-600 flex items-center">
                <TrendingUp size={12} className="mr-1" /> +2.4%
                </span>
                <span className="text-[10px] text-slate-400">vs semana ant.</span>
            </div>
        </div>
        
        {/* Mini Chart Visualization (SVG Line) */}
        <div className="h-16 w-full relative mb-4 border-b border-slate-100">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
            <defs>
                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#8F2E6D" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#8F2E6D" stopOpacity="0" />
                </linearGradient>
            </defs>
            <path 
                d="M0,50 C20,45 40,55 60,40 C80,25 100,35 120,30 C140,20 160,35 180,15 C200,10 220,12 240,5" 
                fill="none" 
                stroke="#8F2E6D" 
                strokeWidth="1.5" 
                strokeLinecap="round"
            />
            <circle cx="240" cy="5" r="2.5" fill="#8F2E6D" stroke="white" strokeWidth="1.5" />
            </svg>
            
            {/* Grid lines */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                <div className="border-b border-slate-50 w-full absolute top-1/4" />
                <div className="border-b border-slate-50 w-full absolute top-2/4" />
                <div className="border-b border-slate-50 w-full absolute top-3/4" />
            </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
            <div className="bg-slate-50 p-2 rounded border border-slate-100">
                <span className="text-[9px] font-bold text-slate-400 uppercase block">Vol. Semanal</span>
                <span className="text-xs font-mono font-bold text-slate-700">1.240 T</span>
            </div>
            <div className="bg-slate-50 p-2 rounded border border-slate-100">
                <span className="text-[9px] font-bold text-slate-400 uppercase block">Tendencia</span>
                <span className="text-xs font-mono font-bold text-green-600">ALCISTA</span>
            </div>
        </div>

        {isAnchored && (
            <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="pt-3 mt-3 border-t border-slate-100"
            >
            <button className="text-[10px] font-bold text-slate-500 hover:text-mira-primary flex items-center justify-between w-full group transition-colors uppercase tracking-wide">
                Ver análisis completo
                <ChevronRight size={12} />
            </button>
            </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const TrustedSources = () => {
  return (
    <div className="w-full bg-white border-y border-slate-100 py-10 overflow-hidden relative">
      <div className="absolute inset-0 bg-noise opacity-50 mix-blend-multiply pointer-events-none" />
      <div className="container mx-auto px-4 mb-8 text-center relative z-10">
        <p className="text-sm font-display font-bold text-slate-400 uppercase tracking-widest">Datos agregados de fuentes oficiales y operadores</p>
      </div>
      
      {/* Marquee Effect */}
      <div className="relative flex overflow-x-hidden group mask-gradient-x">
         {/* Gradient Masks for Fade Effect */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-20" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-20" />

        <div className="animate-marquee whitespace-nowrap flex items-center gap-24 px-8">
          {/* Placeholders for logos */}
          {['EUROSTAT', 'MERCASA', 'POOLRED', 'MAPA', 'MINISTERIO', 'LONJAS LOCALES'].map((logo, i) => (
            <span key={i} className="text-xl font-display font-bold text-slate-300 uppercase tracking-widest hover:text-mira-primary transition-colors cursor-default select-none">
              {logo}
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {['EUROSTAT', 'MERCASA', 'POOLRED', 'MAPA', 'MINISTERIO', 'LONJAS LOCALES'].map((logo, i) => (
            <span key={`dup-${i}`} className="text-xl font-display font-bold text-slate-300 uppercase tracking-widest hover:text-mira-primary transition-colors cursor-default select-none">
              {logo}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 overflow-hidden bg-slate-50">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-60 pointer-events-none" />
      <div className="absolute inset-0 bg-noise opacity-40 mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-agri-pattern pointer-events-none" />
      
      {/* Market Curve Background - Organic & Elegant */}
      <svg className="absolute bottom-0 left-0 w-full h-[85%] pointer-events-none opacity-[0.06]" preserveAspectRatio="none" viewBox="0 0 1440 600">
        <path d="M0,600 C320,400 480,550 720,350 C960,150 1100,300 1440,100 V600 H0 Z" fill="url(#heroCurveGradient)" />
        <path d="M0,600 C280,500 520,580 760,400 C1000,220 1240,320 1440,180 V600 H0 Z" fill="url(#heroCurveGradient)" opacity="0.4" />
        <defs>
          <linearGradient id="heroCurveGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#8F2E6D" stopOpacity="1" />
            <stop offset="100%" stopColor="#8F2E6D" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-6 space-y-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 text-mira-primary text-xs font-display font-bold tracking-wide uppercase mb-8 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-mira-primary animate-pulse" />
                Inteligencia de Mercado Alimentario
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-slate-900 tracking-tight leading-[1.1] mb-8">
                Detecta discrepancias entre el mercado y <span className="text-transparent bg-clip-text bg-gradient-to-r from-mira-primary to-mira-secondary">
                  tu precio real
                </span>.
              </h1>
              <p className="text-lg md:text-xl font-body text-slate-600 leading-relaxed max-w-xl">
                Monitorea tendencias en mercados <strong>agrícolas, ganaderos e industriales</strong>. Compara tus precios de adquisición con fuentes oficiales y optimiza tu estrategia de compras.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-5"
            >
              <Button size="lg" className="w-full sm:w-auto px-10 text-lg shadow-xl shadow-mira-primary/20">
                Empezar prueba gratuita
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto gap-3 group border-slate-300 hover:border-mira-primary/30">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-mira-primary group-hover:text-white transition-colors">
                  <Play size={12} className="fill-current ml-0.5" />
                </div>
                <span className="font-bold">Ver demo interactiva</span>
              </Button>
            </motion.div>

            <div className="pt-8 border-t border-slate-200/60 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500 shadow-sm">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-sm font-body text-slate-500">
                <p className="font-bold text-slate-700">Confianza de líderes del sector</p>
                <p>Más de 200 empresas alimentarias</p>
              </div>
            </div>
          </div>

          {/* Dynamic Data Visualization */}
          <div className="lg:col-span-6 relative h-[600px] hidden lg:block">
             {/* Abstract decorative elements behind the card */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-mira-secondary/10 to-mira-cyan/10 rounded-full blur-3xl -z-10" />
             
             <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.8, delay: 0.3 }}
               className="absolute top-10 right-0 z-20 w-full flex justify-end"
             >
               <DataAnchor />
             </motion.div>
             
             {/* Floating Elements simulating market data */}
             <motion.div 
               animate={{ y: [0, -15, 0] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-40 left-10 glass-card p-5 rounded-xl border border-slate-200 shadow-lg max-w-[220px] z-10"
             >
               <div className="flex items-center gap-3 mb-3">
                 <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                    <TrendingUp size={16} />
                 </div>
                 <div>
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Trigo Blando</span>
                   <span className="text-sm font-bold text-slate-800">245 €/Ton</span>
                 </div>
               </div>
               <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full bg-orange-400 w-[70%]" />
               </div>
             </motion.div>

             <motion.div 
               animate={{ y: [0, 20, 0] }}
               transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute bottom-20 right-20 glass-card p-5 rounded-xl border border-slate-200 shadow-lg max-w-[200px] z-10"
             >
               <div className="flex items-center gap-3 mb-3">
                 <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                    <TrendingDown size={16} />
                 </div>
                 <div>
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Maíz Forrajero</span>
                   <span className="text-sm font-bold text-slate-800">215 €/Ton</span>
                 </div>
               </div>
               <div className="flex items-center gap-2 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded w-fit">
                 <ArrowRight size={12} className="rotate-45" />
                 Oportunidad
               </div>
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ... (previous code remains the same)

const MarketIntelligence = () => {
  const [activeTab, setActiveTab] = useState('Agrícola');
  
  const tabs = [
    { id: 'Agrícola', icon: '🌾', label: 'Cereales, Aceite, Frutas' },
    { id: 'Ganadero', icon: '🐄', label: 'Porcino, Avícola, Lácteo' },
    { id: 'Industrial', icon: '🏭', label: 'Cartón, Plástico, Transporte' },
    { id: 'Económico', icon: '📈', label: 'IPC, Tipos de Interés' },
  ];

  return (
    <section id="mercados" className="py-32 bg-white relative overflow-hidden border-t border-slate-100">
       {/* Subtle Grid Background */}
       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-multiply pointer-events-none" />
       {/* Continuity Curve */}
       <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]" preserveAspectRatio="none" viewBox="0 0 1440 800">
          <path d="M-100,600 C200,500 400,700 800,400 C1100,100 1300,200 1540,100" fill="none" stroke="#8F2E6D" strokeWidth="2" />
       </svg>
       
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-mira-primary font-bold tracking-wider uppercase text-xs mb-4 block">Cobertura Integral</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6">Tu sector, monitorizado en <span className="text-transparent bg-clip-text bg-gradient-to-r from-mira-primary to-mira-secondary">tiempo real</span>.</h2>
          <p className="text-xl font-body text-slate-600">Centralizamos datos de lonjas, boletines oficiales y mercados de futuros en un único dashboard.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Tabs Sidebar */}
          <div className="lg:col-span-4 space-y-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'w-full text-left px-6 py-4 rounded-xl transition-all duration-200 flex items-center gap-4 group border',
                  activeTab === tab.id 
                    ? 'bg-slate-50 border-mira-primary/30 shadow-sm' 
                    : 'bg-white border-transparent hover:bg-slate-50 hover:border-slate-200'
                )}
              >
                <span className="text-2xl filter drop-shadow-sm group-hover:scale-110 transition-transform">{tab.icon}</span>
                <div>
                  <span className={cn(
                    'font-display font-bold text-lg block',
                    activeTab === tab.id ? 'text-mira-primary' : 'text-slate-700'
                  )}>
                    {tab.id}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{tab.label || 'Monitorización'}</span>
                </div>
                {activeTab === tab.id && (
                  <div className="ml-auto text-mira-primary">
                     <ChevronRight size={20} />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Dynamic Content Area */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl border border-slate-200 shadow-xl shadow-slate-200/40 p-8 h-full min-h-[500px] flex flex-col relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-8 relative z-10 border-b border-slate-100 pb-6">
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-slate-900 mb-1">{activeTab} Market Overview</h3>
                    <p className="text-slate-500 text-xs font-body font-bold uppercase tracking-wider flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      Datos oficiales actualizados
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {['Semana', 'Mes', 'Año'].map((filter, i) => (
                      <button key={filter} className={cn(
                        "px-4 py-1.5 text-xs font-bold rounded border transition-colors",
                        i === 1 ? "bg-slate-800 text-white border-slate-800" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                      )}>
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Microcopy for comparison */}
                <div className="mb-8 p-4 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-4">
                  <div className="p-2 bg-white rounded border border-slate-200 text-mira-primary shadow-sm">
                    <TrendingUp size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 mb-1">Análisis de Discrepancias</p>
                    <p className="text-xs text-slate-600 leading-relaxed max-w-lg">
                      La línea sólida representa el precio medio de mercado (Poolred/Lonja). La línea punteada es tu precio medio de adquisición. <span className="font-bold text-slate-800">Detecta sobrecostes al instante.</span>
                    </p>
                  </div>
                </div>

                {/* Realistic Chart Visualization */}
                <div className="flex-1 w-full relative mb-6 min-h-[250px] bg-slate-50/50 rounded-lg border border-slate-100 p-4">
                  {/* Grid Lines */}
                  <div className="absolute inset-4 grid grid-cols-6 grid-rows-5 border-l border-b border-slate-200">
                    {[...Array(30)].map((_, i) => (
                      <div key={i} className="border-t border-r border-slate-100" />
                    ))}
                  </div>
                  
                  {/* Chart SVG */}
                  <svg className="absolute inset-4 w-[calc(100%-32px)] h-[calc(100%-32px)] overflow-visible" preserveAspectRatio="none" viewBox="0 0 600 250">
                    <defs>
                      <linearGradient id="marketGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#8F2E6D" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#8F2E6D" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    
                    {/* Market Price Line (Solid) */}
                    <path
                      d="M0,200 C50,190 100,210 150,150 C200,90 250,130 300,110 C350,90 400,60 450,80 C500,100 550,40 600,50"
                      fill="url(#marketGradient)"
                      stroke="#8F2E6D"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    
                    {/* User Price Line (Dashed) */}
                    <path
                      d="M0,210 C50,200 100,220 150,170 C200,110 250,150 300,130 C350,110 400,80 450,100 C500,120 550,60 600,70"
                      fill="none"
                      stroke="#64748b"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    
                    {/* Data Points */}
                    <circle cx="300" cy="110" r="3" fill="#8F2E6D" stroke="white" strokeWidth="1.5" />
                    <circle cx="450" cy="80" r="3" fill="#8F2E6D" stroke="white" strokeWidth="1.5" />
                    <circle cx="600" cy="50" r="4" fill="#8F2E6D" stroke="white" strokeWidth="2" />
                    
                    {/* Tooltip Simulation */}
                    <g transform="translate(420, 20)">
                      <rect x="0" y="0" width="110" height="46" rx="4" fill="#0f172a" className="shadow-xl" />
                      <text x="55" y="16" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="bold" letterSpacing="0.5">PRECIO MERCADO</text>
                      <text x="55" y="34" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="monospace">3.45 €/kg</text>
                      <path d="M55,46 L50,51 L60,51 Z" fill="#0f172a" />
                    </g>
                  </svg>
                  
                  {/* Axis Labels */}
                  <div className="absolute left-0 bottom-0 w-full flex justify-between px-4 pb-1 text-[10px] text-slate-400 font-mono">
                    <span>ENE</span>
                    <span>FEB</span>
                    <span>MAR</span>
                    <span>ABR</span>
                    <span>MAY</span>
                    <span>JUN</span>
                    <span>JUL</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-6">
                  {[
                    { label: 'Precio Mercado', value: '3.45 €', change: '+1.2%', positive: false },
                    { label: 'Tu Precio', value: '3.52 €', change: '+2.1%', positive: false },
                    { label: 'Diferencial', value: '-0.07 €', change: 'Alerta', positive: false, alert: true },
                  ].map((stat, i) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">{stat.label}</p>
                      <div className="flex items-end gap-2">
                        <span className="text-xl font-display font-bold text-slate-900">{stat.value}</span>
                        <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded", stat.alert ? "text-rose-600 bg-rose-100" : "text-slate-500 bg-slate-200")}>
                          {stat.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const SolutionsByRole = () => {
  const roles = [
    {
      title: 'Compras',
      desc: 'Optimiza el momento de compra y negocia mejor con proveedores.',
      icon: '🛒',
    },
    {
      title: 'Finanzas / CEO',
      desc: 'Anticipa el impacto en márgenes y ajusta presupuestos con precisión.',
      icon: '💼',
    },
    {
      title: 'Auditoría',
      desc: 'Justifica precios de transferencia con datos de mercado oficiales.',
      icon: '📊',
    },
  ];

  return (
    <section id="soluciones" className="py-28 bg-white border-y border-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-agri-pattern pointer-events-none" />
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {roles.map((role, i) => (
            <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-mira-primary/20 transition-all duration-300 group">
              <div className="w-14 h-14 bg-slate-50 rounded-lg flex items-center justify-center text-2xl mb-6 group-hover:scale-105 transition-transform border border-slate-100 group-hover:bg-white group-hover:shadow-md">
                {role.icon}
              </div>
              <h3 className="text-xl font-heading font-bold text-slate-900 mb-3 group-hover:text-mira-primary transition-colors">{role.title}</h3>
              <p className="text-slate-600 font-body text-sm leading-relaxed">{role.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AIPrediction = () => {
  return (
    <section className="py-32 bg-[#050608] text-white overflow-hidden relative border-t border-white/5">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(143,46,109,0.12),transparent_60%)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         {/* Tech Curve */}
         <svg className="absolute top-1/2 left-0 w-full h-[500px] -translate-y-1/2 opacity-20 mix-blend-screen" viewBox="0 0 1440 500" preserveAspectRatio="none">
            <path d="M0,250 C300,200 600,300 900,100 C1200,-100 1300,100 1440,50" fill="none" stroke="url(#techGradient)" strokeWidth="2" />
            <defs>
              <linearGradient id="techGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#8F2E6D" stopOpacity="0" />
                <stop offset="50%" stopColor="#CB6CE6" stopOpacity="1" />
                <stop offset="100%" stopColor="#5CE1E6" stopOpacity="0" />
              </linearGradient>
            </defs>
         </svg>
         <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-mira-primary/10 rounded-full blur-[120px] mix-blend-screen" />
         <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-mira-secondary/10 rounded-full blur-[120px] mix-blend-screen" />
      </div>
      
      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-mira-accent text-[10px] font-bold tracking-widest uppercase mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(203,108,230,0.15)]">
              <span className="w-2 h-2 rounded-full bg-mira-accent animate-pulse shadow-[0_0_10px_currentColor]" />
              MIRA AI Engine
            </div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              No reacciones al mercado. <span className="text-transparent bg-clip-text bg-gradient-to-r from-mira-accent to-mira-cyan">Anticípate.</span>
            </h2>
            <p className="text-slate-400 text-lg font-body leading-relaxed mb-10 max-w-lg">
              Nuestros algoritmos analizan <strong>+20 variables</strong> históricas, estacionales y macroeconómicas para proyectar tendencias de precios a 6 y 12 meses con intervalos de confianza.
            </p>
            
            <ul className="space-y-6 mb-12">
              {[
                { text: 'Forecasting a 12 meses vista', icon: '📅' },
                { text: 'Detección de anomalías en tiempo real', icon: '⚡' },
                { text: 'Correlación con variables macroeconómicas', icon: '🌍' }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-slate-300 font-body group">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-mira-accent/50 group-hover:bg-mira-accent/10 transition-all duration-300">
                    <span className="text-lg">{item.icon}</span>
                  </div>
                  <span className="font-medium group-hover:text-white transition-colors">{item.text}</span>
                </li>
              ))}
            </ul>

            <Button variant="secondary" size="lg" className="shadow-lg shadow-mira-secondary/20 hover:shadow-mira-secondary/40 border border-white/10">
              Ver cómo funciona la IA
            </Button>
          </div>

          {/* AI Chart Visualization */}
          <div className="relative">
            <div className="glass-card-dark rounded-xl p-1 shadow-2xl border-white/10 relative overflow-hidden group hover:border-white/20 transition-colors duration-500">
              <div className="bg-[#13151A] rounded-lg p-8 relative overflow-hidden">
                {/* Glow effect on hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-mira-accent to-mira-cyan opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500 -z-10" />

                <div className="flex justify-between items-center mb-10">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-mira-accent" />
                        <h4 className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Proyección Trigo Duro</h4>
                    </div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-mono font-bold text-white tracking-tighter">320.50 €</span>
                      <span className="text-mira-mint text-xs font-bold bg-mira-mint/10 px-2 py-0.5 rounded border border-mira-mint/20">+5.2% (Est.)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="px-3 py-1 rounded bg-slate-800/50 border border-white/10 text-slate-300 text-[10px] font-bold mb-1 inline-block">
                        CONFIDENCE SCORE
                    </div>
                    <div className="text-mira-accent font-mono font-bold text-xl">92.4%</div>
                  </div>
                </div>

                {/* Chart Area */}
                <div className="h-64 w-full relative">
                  {/* Grid */}
                  <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 border-l border-b border-white/5">
                    {[...Array(24)].map((_, i) => (
                      <div key={i} className="border-t border-r border-white/5" />
                    ))}
                  </div>

                  <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 400 200">
                    <defs>
                      <linearGradient id="predictionGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#CB6CE6" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#CB6CE6" stopOpacity="0" />
                      </linearGradient>
                      <mask id="confidenceMask">
                        <path d="M0,100 C50,90 100,110 150,80 C200,60 250,70 300,50 C350,30 400,20 V180 C350,160 300,140 250,150 C200,160 150,140 100,150 C50,160 0,140 Z" fill="white" />
                      </mask>
                    </defs>
                    
                    {/* Historical Line */}
                    <path
                      d="M0,120 C40,115 80,125 120,100 C160,75 200,90 240,80"
                      fill="none"
                      stroke="#5CE1E6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="drop-shadow-[0_0_8px_rgba(92,225,230,0.5)]"
                    />
                    
                    {/* Prediction Line (Dashed) */}
                    <path
                      d="M240,80 C280,70 320,50 360,40 C380,35 400,30 400,30"
                      fill="none"
                      stroke="#CB6CE6"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      strokeLinecap="round"
                      className="drop-shadow-[0_0_8px_rgba(203,108,230,0.5)]"
                    />
                    
                    {/* Confidence Interval Area */}
                    <path
                      d="M240,80 C280,60 320,30 360,20 C380,15 400,10 400,10 V60 C380,65 360,70 320,90 C280,110 240,80 240,80 Z"
                      fill="url(#predictionGradient)"
                      opacity="0.5"
                    />

                    {/* Current Point */}
                    <circle cx="240" cy="80" r="4" fill="#1A1A2E" stroke="#5CE1E6" strokeWidth="2" />
                    <circle cx="240" cy="80" r="8" fill="#5CE1E6" opacity="0.2" className="animate-pulse" />
                  </svg>
                  
                  {/* Floating Badge */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-10 right-10 bg-mira-charcoal/90 backdrop-blur border border-white/10 p-3 rounded-lg shadow-xl"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-mira-accent" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Oportunidad de compra</span>
                    </div>
                    <p className="text-sm font-bold text-white">Q3 2026</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ... (previous code remains the same)

const NewsInsights = () => {
  const articles = [
    {
      category: 'Agrícola',
      title: 'Previsión de cosecha de aceituna para la campaña 2026/27',
      date: 'Hace 2 días',
      image: 'bg-gradient-to-br from-lime-100 to-green-100', 
    },
    {
      category: 'Ganadero',
      title: 'Evolución del precio del porcino en lonjas nacionales',
      date: 'Hace 5 días',
      image: 'bg-gradient-to-br from-rose-100 to-pink-100',
    },
    {
      category: 'Industrial',
      title: 'Impacto de los costes energéticos en la industria láctea',
      date: 'Hace 1 semana',
      image: 'bg-gradient-to-br from-blue-100 to-indigo-100',
    },
  ];

  return (
    <section id="insights" className="py-32 bg-white relative">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-slate-50 to-white pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl font-heading font-bold text-slate-900 mb-4">Análisis de mercado y tendencias.</h2>
            <p className="text-lg text-slate-600 font-body">Informes semanales curados por nuestros analistas.</p>
          </div>
          <Button variant="ghost" className="hidden md:flex gap-2 text-mira-primary font-bold">
            Leer todos los insights <ArrowRight size={18} />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {articles.map((article, i) => (
            <div key={i} className="group cursor-pointer">
              <div className={cn("aspect-video rounded-2xl mb-6 transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-xl overflow-hidden relative", article.image)}>
                 <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
              </div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs font-bold text-mira-primary uppercase tracking-wider bg-mira-primary/5 px-2 py-1 rounded-md">{article.category}</span>
                <span className="text-xs text-slate-400 font-medium">{article.date}</span>
              </div>
              <h3 className="text-xl font-heading font-bold text-slate-900 leading-snug group-hover:text-mira-primary transition-colors duration-300">
                {article.title}
              </h3>
            </div>
          ))}
        </div>
        
        <Button variant="outline" className="w-full mt-12 md:hidden">
          Leer todos los insights
        </Button>
      </div>
    </section>
  );
};

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="precios" className="py-32 bg-slate-50 border-y border-slate-200 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-mira-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-mira-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6">Inteligencia de mercado accesible.</h2>
          <p className="text-xl text-slate-600 font-body mb-10">Sin costes de implementación. Sin consultoría opaca. Acceso inmediato.</p>
          
          {/* Toggle */}
          <div className="inline-flex items-center p-1.5 bg-white border border-slate-200 rounded-full shadow-sm">
            <button
              onClick={() => setIsAnnual(false)}
              className={cn(
                'px-8 py-3 rounded-full text-sm font-bold transition-all duration-300',
                !isAnnual ? 'bg-mira-primary text-white shadow-md' : 'text-slate-500 hover:text-slate-900'
              )}
            >
              Mensual
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={cn(
                'px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2',
                isAnnual ? 'bg-mira-primary text-white shadow-md' : 'text-slate-500 hover:text-slate-900'
              )}
            >
              Anual <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-bold", isAnnual ? "bg-white/20 text-white" : "bg-mira-mint text-emerald-800")}>-20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
          {/* Free Plan */}
          <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-heading font-bold text-slate-900 mb-2">Starter</h3>
            <p className="text-sm text-slate-500 mb-8 font-medium">Para exploradores</p>
            <div className="mb-8">
              <span className="text-5xl font-display font-bold text-slate-900">0€</span>
            </div>
            <Button variant="outline" className="w-full mb-10 border-slate-300">Crear cuenta gratis</Button>
            <ul className="space-y-4 text-sm text-slate-600 font-body">
              <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-slate-300" /> Histórico 30 días</li>
              <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-slate-300" /> 1 Alerta de mercado</li>
              <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-slate-300" /> Resumen semanal</li>
            </ul>
          </div>

          {/* Business Plan (Highlighted) */}
          <div className="bg-white p-10 rounded-3xl border-2 border-mira-primary shadow-2xl shadow-mira-primary/10 relative transform md:-translate-y-6 z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-mira-primary text-white px-6 py-2 rounded-full text-xs font-bold tracking-wide uppercase shadow-lg">
              Mejor Valor
            </div>
            <h3 className="text-2xl font-heading font-bold text-slate-900 mb-2">Business</h3>
            <p className="text-sm text-slate-500 mb-8 font-medium">Para profesionales de compras y PYMES</p>
            <div className="mb-8 flex items-baseline gap-1">
              <span className="text-6xl font-display font-bold text-slate-900">{isAnnual ? '60€' : '75€'}</span>
              <span className="text-slate-500 font-medium">/mes</span>
            </div>
            <p className="text-xs text-slate-400 mb-8 font-medium">+IVA. Facturación {isAnnual ? 'anual' : 'mensual'}.</p>
            <Button variant="primary" size="lg" className="w-full mb-10 shadow-xl shadow-mira-primary/30">Empezar prueba gratuita</Button>
            <ul className="space-y-5 text-sm text-slate-700 font-body font-medium">
              <li className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-mira-primary/10 text-mira-primary flex items-center justify-center text-xs font-bold">✓</div> <strong>Todo lo de Starter</strong></li>
              <li className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-mira-primary/10 text-mira-primary flex items-center justify-center text-xs font-bold">✓</div> Histórico ilimitado</li>
              <li className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-mira-primary/10 text-mira-primary flex items-center justify-center text-xs font-bold">✓</div> <strong>Predicciones de IA</strong></li>
              <li className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-mira-primary/10 text-mira-primary flex items-center justify-center text-xs font-bold">✓</div> Alertas ilimitadas</li>
              <li className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-mira-primary/10 text-mira-primary flex items-center justify-center text-xs font-bold">✓</div> Exportación Excel/CSV</li>
            </ul>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-heading font-bold text-slate-900 mb-2">Enterprise</h3>
            <p className="text-sm text-slate-500 mb-8 font-medium">Para grandes corporaciones</p>
            <div className="mb-8">
              <span className="text-4xl font-display font-bold text-slate-900">A medida</span>
            </div>
            <Button variant="ghost" className="w-full mb-10 border border-slate-200 hover:border-mira-primary hover:bg-white">Contactar Ventas</Button>
            <ul className="space-y-4 text-sm text-slate-600 font-body">
              <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-slate-300" /> Todo lo de Business</li>
              <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-slate-300" /> API Access</li>
              <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-slate-300" /> Multi-usuario</li>
              <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-slate-300" /> Informes personalizados</li>
              <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-slate-300" /> Account Manager dedicado</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQContact = () => {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-heading font-bold text-slate-900 mb-6">¿Tienes dudas sobre la cobertura?</h2>
          <p className="text-xl text-slate-600 font-body">Resolvemos las preguntas más frecuentes.</p>
        </div>

        <div className="space-y-6 mb-20">
          {[
            { q: '¿Qué fuentes de datos utilizáis?', a: 'Agregamos datos de fuentes oficiales públicas (Eurostat, Ministerios), mercados de referencia (Poolred, Mercolleida) y lonjas locales.' },
            { q: '¿Puedo probar la plataforma antes de pagar?', a: 'Sí, ofrecemos una prueba gratuita de 14 días con acceso completo al plan Business.' },
            { q: '¿La predicción de IA está garantizada?', a: 'Nuestros modelos ofrecen un intervalo de confianza del 85%, basado en datos históricos y variables macroeconómicas.' },
          ].map((faq, i) => (
            <div key={i} className="border border-slate-200 rounded-2xl p-8 hover:border-mira-primary/30 hover:shadow-lg transition-all duration-300 bg-slate-50/50">
              <h4 className="font-heading font-bold text-slate-900 mb-3 text-lg">{faq.q}</h4>
              <p className="text-slate-600 font-body leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-slate-50 to-indigo-50/50 rounded-3xl p-10 md:p-16 text-center border border-slate-100 shadow-inner">
          <h3 className="text-3xl font-heading font-bold text-slate-900 mb-6">¿Prefieres hablar con un humano?</h3>
          <p className="text-slate-600 font-body mb-10 text-lg max-w-xl mx-auto">Nuestro equipo de soporte está disponible para resolver tus dudas específicas.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button className="bg-[#25D366] hover:bg-[#128C7E] text-white gap-3 w-full sm:w-auto px-8 py-4 shadow-lg shadow-green-200">
              {/* WhatsApp Icon */}
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Escríbenos por WhatsApp
            </Button>
            <span className="text-slate-400 text-sm">o envía un email a [EMAIL DE SOPORTE]</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// ... (App component update)

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-mira-primary/20 selection:text-mira-primary">
      <Navbar />
      <main>
        <Hero />
        <TrustedSources />
        <MarketIntelligence />
        <SolutionsByRole />
        <AIPrediction />
        <NewsInsights />
        <Pricing />
        <FAQContact />
      </main>
      <Footer />
    </div>
  );
}




