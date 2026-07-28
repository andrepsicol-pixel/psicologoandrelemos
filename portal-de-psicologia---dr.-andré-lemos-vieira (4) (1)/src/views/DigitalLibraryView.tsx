import React, { useState } from 'react';
import {
  FolderDown,
  FileText,
  Video,
  Headphones,
  Image as ImageIcon,
  BookOpen,
  Download,
  ExternalLink,
  Search,
  CheckCircle2,
  Lock,
  Sparkles,
  ShieldCheck,
  Filter
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export interface LibraryItem {
  id: string;
  type: 'pdf' | 'video' | 'audio' | 'infographic' | 'book';
  title: string;
  category: string;
  description: string;
  fileSizeOrDuration: string;
  downloadUrl?: string;
  externalUrl?: string;
  isFree: boolean;
  author: string;
}

export const digitalLibraryItems: LibraryItem[] = [
  {
    id: '1',
    type: 'pdf',
    title: 'Guia Prático de Reestruturação Cognitiva e RPD (PDF)',
    category: 'Ansiedade & TCC',
    description: 'Manual de psicoeducação com folhas de trabalho práticas para identificação de distorções cognitivas e registros diários de pensamentos.',
    fileSizeOrDuration: '2.4 MB (PDF A4)',
    isFree: true,
    author: 'Dr. André Lemos Vieira',
  },
  {
    id: '2',
    type: 'audio',
    title: 'Exercício Guiado: Respiração Diafragmática & Relaxamento Progressivo',
    category: 'Regulação Emocional',
    description: 'Áudio em alta fidelidade com condução passo a passo para redução do arousal simpático durante crises de ansiedade e ataques de pânico.',
    fileSizeOrDuration: '14 min (MP3 320kbps)',
    isFree: true,
    author: 'Dr. André Lemos Vieira',
  },
  {
    id: '3',
    type: 'video',
    title: 'AULA MAGNA: O Ciclo da Esquiva e da Fobia Sexual na Ansiedade',
    category: 'Terapia Sexual',
    description: 'Vídeo aula detalhando os mecanismos neurológicos e comportamentais da ansiedade de desempenho sexual e dessensibilização sistemática.',
    fileSizeOrDuration: '38 min (HD 1080p)',
    isFree: true,
    author: 'Dr. André Lemos Vieira',
  },
  {
    id: '4',
    type: 'infographic',
    title: 'Infográfico: Os 10 Tipos de Distorções Cognitivas mais Comuns',
    category: 'TCC',
    description: 'Diagrama visual de alta resolução resumindo catastrofização, pensamento 8 ou 80, leitura mental e personalização.',
    fileSizeOrDuration: '4.8 MB (PNG Ultra HD)',
    isFree: true,
    author: 'Equipe MenteClínica',
  },
  {
    id: '5',
    type: 'book',
    title: 'Livro Recomendado: Aprendendo a Terapia Cognitivo-Comportamental (Wright et al.)',
    category: 'Literatura Científica',
    description: 'Obra de referência clínica internacional para compreensão aprofundada da conceitualização cognitiva.',
    fileSizeOrDuration: 'Livro Impresso / e-Pub',
    isFree: false,
    author: 'Jesse H. Wright, Monica R. Basco, Michael E. Thase',
  },
];

export const DigitalLibraryView: React.FC<{ onNavigate: (view: any, param?: string) => void }> = ({ onNavigate }) => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const filteredItems = digitalLibraryItems.filter((item) => {
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleDownload = (item: LibraryItem) => {
    setDownloadToast(`Download iniciado: "${item.title}"`);
    setTimeout(() => setDownloadToast(null), 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-8 animate-fadeIn">
      {/* Toast Notification */}
      {downloadToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-slate-950 text-white shadow-2xl border border-emerald-500/50 flex items-center gap-3 animate-slideUp">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{downloadToast}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white rounded-3xl p-6 md:p-10 shadow-xl border border-emerald-800 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 text-emerald-300 border border-emerald-700/60 text-xs font-bold">
          <FolderDown className="w-4 h-4 text-emerald-400" />
          <span>Biblioteca Digital de Saúde Mental Baseada em Evidências</span>
        </div>

        <h1 className="text-2xl md:text-4xl font-extrabold text-white">
          Materiais Gratuitos, Infográficos & Mídia Terapêutica
        </h1>

        <p className="text-emerald-100/90 text-sm md:text-base max-w-3xl">
          Acesse guias práticos em PDF, exercícios em áudio para respiração diafragmática, videoaulas psicoeducativas e recomendações de literatura científica validadas pelo Psicólogo André Lemos Vieira.
        </p>

        {/* Search & Filter Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por PDF, áudio, infográfico, ansiedade..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/10 border border-emerald-700/80 text-xs md:text-sm text-white placeholder-emerald-200/60 focus:outline-none focus:bg-white/20"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none">
            {[
              { id: 'all', label: 'Todos', icon: <Filter className="w-3.5 h-3.5" /> },
              { id: 'pdf', label: 'PDFs / Guias', icon: <FileText className="w-3.5 h-3.5" /> },
              { id: 'audio', label: 'Áudios', icon: <Headphones className="w-3.5 h-3.5" /> },
              { id: 'video', label: 'Vídeos', icon: <Video className="w-3.5 h-3.5" /> },
              { id: 'infographic', label: 'Infográficos', icon: <ImageIcon className="w-3.5 h-3.5" /> },
              { id: 'book', label: 'Livros', icon: <BookOpen className="w-3.5 h-3.5" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedType(tab.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  selectedType === tab.id
                    ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-md'
                    : 'bg-emerald-900/60 text-emerald-200 hover:bg-emerald-800 border border-emerald-700/50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Library Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="space-y-4 hover:border-emerald-300 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant={item.type === 'pdf' ? 'emerald' : item.type === 'audio' ? 'sky' : 'amber'}>
                  {item.category}
                </Badge>
                <span className="text-[11px] font-semibold text-slate-500">{item.fileSizeOrDuration}</span>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-800 shrink-0">
                  {item.type === 'pdf' && <FileText className="w-5 h-5" />}
                  {item.type === 'audio' && <Headphones className="w-5 h-5" />}
                  {item.type === 'video' && <Video className="w-5 h-5" />}
                  {item.type === 'infographic' && <ImageIcon className="w-5 h-5" />}
                  {item.type === 'book' && <BookOpen className="w-5 h-5" />}
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 text-sm leading-snug">{item.title}</h3>
                  <p className="text-xs text-slate-500">Por {item.author}</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              {item.isFree ? (
                <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Acesso Gratuito
                </span>
              ) : (
                <span className="text-[11px] font-bold text-slate-500">Recomendação Editorial</span>
              )}

              <Button
                variant={item.isFree ? 'cta' : 'outline'}
                size="sm"
                onClick={() => handleDownload(item)}
              >
                {item.isFree ? (
                  <>
                    <Download className="w-4 h-4 mr-1.5" /> Baixar Agora
                  </>
                ) : (
                  <>
                    <ExternalLink className="w-4 h-4 mr-1.5" /> Ver Detalhes
                  </>
                )}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
