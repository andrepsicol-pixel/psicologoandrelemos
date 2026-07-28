import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, MapPin, Phone, X, Sparkles } from 'lucide-react';
import { drAndreProfile } from '../../data/authorData';

export const FloatingContactMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const whatsappMessageEncoded = encodeURIComponent(
    drAndreProfile.whatsappMessageDefault || 'Olá, Dr. André Lemos! Gostaria de agendar uma consulta psicológica.'
  );
  const whatsappUrl = `https://wa.me/${drAndreProfile.whatsappNumber}?text=${whatsappMessageEncoded}`;
  const instagramUrl = drAndreProfile.instagramUrl || 'https://www.instagram.com/psicologoandrelemos/';
  const mapsUrl = drAndreProfile.locations[0]?.googleMapsLink || 'https://www.google.com/maps/search/?api=1&query=Sudoeste+Ceilandia+Brasilia+DF';
  const phoneUrl = `tel:+${drAndreProfile.whatsappNumber}`;

  return (
    <div
      ref={menuRef}
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-auto select-none pb-[env(safe-area-inset-bottom)] pr-[env(safe-area-inset-right)]"
    >
      {/* Expanded Vertical Action Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="floating-contact-options"
            role="menu"
            aria-label="Canais de Atendimento Rápido"
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="mb-3 w-[260px] sm:w-[280px] bg-white/95 backdrop-blur-xl border border-[#E8E2D9] rounded-2xl p-3 shadow-2xl flex flex-col gap-2.5 overflow-hidden"
          >
            {/* Menu Header */}
            <div className="px-2 pt-1 pb-2 border-b border-[#E8E2D9] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A68A6B] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#A68A6B]"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                  Canais de Atendimento
                </span>
              </div>
              <span className="text-[10px] text-[#A68A6B] font-bold bg-[#A68A6B]/10 px-2 py-0.5 rounded-full border border-[#A68A6B]/20">
                Dr. André Lemos
              </span>
            </div>

            {/* Action Item 1: WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              onClick={() => setIsOpen(false)}
              className="group flex items-center gap-3 p-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#F5F2EC] border border-[#E8E2D9] hover:border-[#25D366] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#25D366]"
              title="Agende sua consulta"
            >
              <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.299.423 2.502 1.154 3.475l-.758 2.766 2.839-.745c.937.608 2.052.96 3.251.96 3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.586-5.756-5.768-5.756zm0 10.373c-1.026 0-1.983-.308-2.784-.838l-.2.13-1.637.43.437-1.595-.138-.22c-.615-.98-1.042-2.128-1.041-3.328 0-3.111 2.531-5.642 5.642-5.642 3.111 0 5.642 2.531 5.642 5.642 0 3.111-2.531 5.642-5.642 5.642zm3.102-4.228c-.17-.085-1.008-.497-1.164-.554-.156-.057-.27-.085-.383.085-.113.17-.439.554-.539.667-.099.113-.198.128-.368.043-.17-.085-.718-.265-1.368-.844-.506-.451-.848-1.008-.947-1.178-.099-.17-.011-.262.074-.347.077-.077.17-.198.255-.298.085-.099.113-.17.17-.283.057-.113.028-.213-.014-.298-.043-.085-.383-.922-.525-1.262-.138-.331-.279-.286-.383-.291l-.326-.006c-.113 0-.298.043-.454.213-.156.17-.596.582-.596 1.42 0 .837.61 1.646.695 1.759.085.113 1.2 1.833 2.908 2.571 1.708.738 1.708.492 2.02.464.312-.028 1.008-.412 1.15-.811.141-.397.141-.738.141-.837-.028-.099-.17-.085-.17-.255z" />
                </svg>
              </div>
              <div className="flex flex-col text-left overflow-hidden">
                <span className="text-xs font-bold text-[#1A1A1A] group-hover:text-[#A68A6B] transition-colors">
                  Agendar pelo WhatsApp
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  Agende sua consulta
                </span>
              </div>
            </a>

            {/* Action Item 2: Instagram */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              onClick={() => setIsOpen(false)}
              className="group flex items-center gap-3 p-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#F5F2EC] border border-[#E8E2D9] hover:border-pink-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
              title="Siga no Instagram"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <div className="flex flex-col text-left overflow-hidden">
                <span className="text-xs font-bold text-[#1A1A1A] group-hover:text-[#A68A6B] transition-colors">
                  Instagram
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  Siga no Instagram
                </span>
              </div>
            </a>

            {/* Action Item 3: Localização */}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              onClick={() => setIsOpen(false)}
              className="group flex items-center gap-3 p-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#F5F2EC] border border-[#E8E2D9] hover:border-[#A68A6B] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#A68A6B]"
              title="Como chegar"
            >
              <div className="w-10 h-10 rounded-xl bg-[#A68A6B]/10 border border-[#A68A6B]/20 text-[#A68A6B] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-left overflow-hidden">
                <span className="text-xs font-bold text-[#1A1A1A] group-hover:text-[#A68A6B] transition-colors">
                  Localização do Consultório
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  Como chegar
                </span>
              </div>
            </a>

            {/* Action Item 4: Telefone */}
            <a
              href={phoneUrl}
              role="menuitem"
              onClick={() => setIsOpen(false)}
              className="group flex items-center gap-3 p-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#F5F2EC] border border-[#E8E2D9] hover:border-[#A68A6B] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#A68A6B]"
              title="Ligar"
            >
              <div className="w-10 h-10 rounded-xl bg-[#A68A6B]/10 border border-[#A68A6B]/20 text-[#A68A6B] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-left overflow-hidden">
                <span className="text-xs font-bold text-[#1A1A1A] group-hover:text-[#A68A6B] transition-colors">
                  Ligar para Consultório
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  Ligar
                </span>
              </div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="floating-contact-options"
        aria-label={isOpen ? 'Fechar menu de contato' : 'Abrir menu de contato rápido'}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative w-14 h-14 rounded-full bg-[#A68A6B] text-white shadow-xl hover:bg-[#8F7356] border border-[#A68A6B] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-[#A68A6B] focus:ring-offset-2"
      >
        {/* Subtle Ambient Pulse Ring when closed */}
        {!isOpen && (
          <span className="absolute -inset-1 rounded-full bg-[#A68A6B]/30 animate-ping pointer-events-none opacity-50"></span>
        )}

        {/* Dynamic Icon */}
        {isOpen ? (
          <X className="w-6 h-6 text-white transition-transform duration-300 rotate-90" />
        ) : (
          <div className="relative flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" />
            <Sparkles className="w-3 h-3 text-white absolute -top-1.5 -right-1.5 animate-pulse" />
          </div>
        )}

        {/* Desktop Hover Tooltip */}
        <span className="hidden md:block absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#1A1A1A] text-white text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-800 shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200">
          {isOpen ? 'Fechar menu' : 'Falar com Dr. André'}
        </span>
      </motion.button>
    </div>
  );
};
