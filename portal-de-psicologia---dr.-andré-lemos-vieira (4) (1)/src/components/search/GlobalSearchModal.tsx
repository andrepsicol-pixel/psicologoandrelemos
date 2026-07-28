import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  Mic,
  MicOff,
  FileText,
  BookOpen,
  HelpCircle,
  Stethoscope,
  Wrench,
  ChevronRight,
  ArrowRight,
  Tag,
  Sparkles,
  Clock,
  History,
  Check
} from 'lucide-react';
import {
  executeUnifiedSearch,
  getSearchAutocompleteSuggestions,
  SearchResultItem,
  SearchFilters
} from '../../lib/searchEngine';
import { ViewMode } from '../../types/portal';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: ViewMode, param?: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<SearchFilters['type']>('all');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([
    'Ansiedade de desempenho sexual',
    'TCC para TAG',
    'Teste GAD-7',
    'Reestruturação cognitiva',
  ]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length >= 2) {
      const res = executeUnifiedSearch(query, { type: filterType });
      setResults(res);
      const sug = getSearchAutocompleteSuggestions(query);
      setSuggestions(sug);
    } else {
      setResults([]);
      setSuggestions([]);
    }
  }, [query, filterType]);

  const handleSelectResult = (item: SearchResultItem) => {
    if (query.trim() && !searchHistory.includes(query.trim())) {
      setSearchHistory((prev) => [query.trim(), ...prev.slice(0, 4)]);
    }
    onClose();
    onNavigate(item.targetView as ViewMode, item.urlParam);
  };

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Seu navegador não possui suporte para busca por voz ativado.');
      return;
    }

    try {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'pt-BR';
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 md:pt-20 px-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] animate-scaleUp">
        
        {/* Top Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50/80">
          <Search className="w-5 h-5 text-emerald-700 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquise por artigos, sintomas, testes (GAD-7), termos do glossário, FAQs ou casos clínicos..."
            className="w-full bg-transparent text-sm md:text-base font-medium text-slate-900 focus:outline-none placeholder:text-slate-400"
          />

          {/* Voice Microphone Toggle */}
          <button
            onClick={handleVoiceSearch}
            title="Busca por voz"
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              isListening
                ? 'bg-rose-500 text-white animate-pulse'
                : 'text-slate-500 hover:text-emerald-800 hover:bg-slate-200/60'
            }`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Close Modal Button */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-200/60 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Type Pills */}
        <div className="px-4 py-2 bg-white border-b border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {[
            { id: 'all', label: 'Todos os Módulos' },
            { id: 'article', label: 'Artigos' },
            { id: 'glossary', label: 'Glossário' },
            { id: 'faq', label: 'Perguntas (FAQ)' },
            { id: 'case', label: 'Casos Clínicos' },
            { id: 'tool', label: 'Testes & Ferramentas' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id as any)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                filterType === tab.id
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Main Content Container */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {/* Default Empty State with Recent Search History */}
          {!query.trim() && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5" /> Pesquisas Recentes
                </div>
                <div className="flex flex-wrap gap-2">
                  {searchHistory.map((h, i) => (
                    <button
                      key={i}
                      onClick={() => setQuery(h)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-medium hover:bg-emerald-50 hover:text-emerald-900 border border-slate-200/60 cursor-pointer transition-colors"
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
                <div className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-700" /> Tópicos Mais Acessados no Portal
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <button onClick={() => setQuery('Ansiedade Generalizada')} className="text-left p-2 rounded-lg bg-white hover:bg-emerald-100/50 font-medium text-slate-800 cursor-pointer">
                    &bull; Guia do Transtorno de Ansiedade (TAG)
                  </button>
                  <button onClick={() => setQuery('Terapia Sexual')} className="text-left p-2 rounded-lg bg-white hover:bg-emerald-100/50 font-medium text-slate-800 cursor-pointer">
                    &bull; Terapia Sexual & Ansiedade de Desempenho
                  </button>
                  <button onClick={() => setQuery('Teste GAD-7')} className="text-left p-2 rounded-lg bg-white hover:bg-emerald-100/50 font-medium text-slate-800 cursor-pointer">
                    &bull; Fazer Teste GAD-7 de Ansiedade
                  </button>
                  <button onClick={() => setQuery('Esquema Cognitivo')} className="text-left p-2 rounded-lg bg-white hover:bg-emerald-100/50 font-medium text-slate-800 cursor-pointer">
                    &bull; O que são Esquemas Cognitivos na TCC?
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Autocomplete Suggestions */}
          {suggestions.length > 0 && query.trim() && (
            <div className="space-y-1 pb-2 border-b border-slate-100">
              <div className="text-[11px] font-bold text-slate-400 uppercase">Sugestões de Termos</div>
              {suggestions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuery(s.replace('O que é ', ''))}
                  className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-slate-100 font-medium cursor-pointer flex items-center justify-between"
                >
                  <span>{s}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              ))}
            </div>
          )}

          {/* Search Results List */}
          {results.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {results.length} resultado(s) encontrado(s)
              </div>

              {results.map((res) => (
                <div
                  key={`${res.type}-${res.id}`}
                  onClick={() => handleSelectResult(res)}
                  className="p-3.5 rounded-2xl bg-slate-50/80 hover:bg-emerald-50/70 border border-slate-200/80 hover:border-emerald-300 transition-all cursor-pointer space-y-1 group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {res.type === 'article' && <FileText className="w-4 h-4 text-emerald-700" />}
                      {res.type === 'glossary' && <BookOpen className="w-4 h-4 text-purple-700" />}
                      {res.type === 'faq' && <HelpCircle className="w-4 h-4 text-amber-700" />}
                      {res.type === 'case' && <Stethoscope className="w-4 h-4 text-sky-700" />}
                      {res.type === 'tool' && <Wrench className="w-4 h-4 text-emerald-800" />}

                      <span className="font-bold text-slate-900 group-hover:text-emerald-950 text-sm">
                        {res.title}
                      </span>
                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </div>

                  {res.subtitle && (
                    <div className="text-[11px] font-semibold text-emerald-800">
                      {res.subtitle}
                    </div>
                  )}

                  <p className="text-xs text-slate-600 line-clamp-2">
                    {res.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* No Results Found */}
          {query.trim() && results.length === 0 && (
            <div className="p-8 text-center space-y-2">
              <HelpCircle className="w-8 h-8 text-slate-300 mx-auto" />
              <div className="text-sm font-bold text-slate-700">Nenhum resultado direto para "{query}"</div>
              <p className="text-xs text-slate-500">Tente buscar por termos mais genéricos como "ansiedade", "TCC", "sono" ou "autoestima".</p>
            </div>
          )}
        </div>

        {/* Modal Footer Bar */}
        <div className="p-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span>Pressione <kbd className="px-1.5 py-0.5 bg-white border rounded text-[10px] font-mono">Esc</kbd> para fechar</span>
          </div>
          <span className="font-semibold text-emerald-800">Motor de Busca MenteClínica v2.0</span>
        </div>
      </div>
    </div>
  );
};
