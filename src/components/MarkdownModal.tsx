import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import mermaid from 'mermaid';

interface MarkdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'prd-hidrologico' | 'prd-vazoes' | 'requisitos';
}

// Componente para renderizar diagramas Mermaid
const MermaidDiagram: React.FC<{ chart: string }> = ({ chart }) => {
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const renderDiagram = async () => {
      try {
        mermaid.initialize({ 
          startOnLoad: false,
          theme: 'default',
          securityLevel: 'loose'
        });
        
        const { svg } = await mermaid.render(`mermaid-${Date.now()}`, chart);
        setSvg(svg);
      } catch (err) {
        console.error('Erro ao renderizar Mermaid:', err);
        setError('Erro ao renderizar diagrama');
      }
    };

    if (chart) {
      renderDiagram();
    }
  }, [chart]);

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-4">
        {error}
      </div>
    );
  }

  return (
    <div 
      className="mermaid-diagram my-6 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg overflow-auto border border-blue-200 shadow-sm"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

const MarkdownModal: React.FC<MarkdownModalProps> = ({ isOpen, onClose, type }) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchContent = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/documents/${type}`);
      if (!response.ok) {
        throw new Error('Erro ao carregar documento');
      }
      const data = await response.json();
      setContent(data.content);
    } catch (err) {
      setError('Erro ao carregar o documento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchContent();
    }
  }, [isOpen, type]);

  const getTitle = () => {
    switch (type) {
      case 'prd-hidrologico':
        return 'PRD - Portal Hidrológico';
      case 'prd-vazoes':
        return 'PRD - Portal Vazões JRMF';
      case 'requisitos':
        return 'Requisitos do Projeto';
      default:
        return 'Documento';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/95 backdrop-blur-md rounded-xl w-full h-full max-w-7xl max-h-screen m-4 flex flex-col shadow-2xl border border-blue-200">
        <div className="flex items-center justify-between p-6 border-b border-blue-200 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600">
          <h2 className="text-2xl font-bold text-white drop-shadow-lg">{getTitle()}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-110"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>
        
        <div className="flex-1 overflow-auto p-6 bg-gradient-to-br from-white via-blue-50/30 to-white">
          {loading && (
            <div className="flex items-center justify-center h-64">
              <div className="text-blue-600 text-lg animate-pulse">Carregando documento...</div>
            </div>
          )}
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          {content && !loading && (
            <div className="prose prose-lg prose-blue max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '');
                    const language = match ? match[1] : '';
                    
                    // Detectar blocos Mermaid
                    if (language === 'mermaid') {
                      return <MermaidDiagram chart={String(children).replace(/\n$/, '')} />;
                    }
                    
                    return !inline && match ? (
                      <SyntaxHighlighter
                        language={language}
                        PreTag="div"
                        className="rounded-lg bg-gray-100 p-4"
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold text-blue-900 mb-6 pb-2 border-b-2 border-blue-200">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-semibold text-blue-800 mb-4 mt-8">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-semibold text-blue-700 mb-3 mt-6">
                      {children}
                    </h3>
                  ),
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-6">
                      <table className="min-w-full border-collapse border border-blue-300">
                        {children}
                      </table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="border border-blue-300 bg-blue-100 px-4 py-2 text-left font-semibold text-blue-900">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="border border-blue-300 px-4 py-2">
                      {children}
                    </td>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-blue-400 bg-blue-50 pl-4 py-2 my-4 italic">
                      {children}
                    </blockquote>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside space-y-1 my-4">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside space-y-1 my-4">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-gray-700">
                      {children}
                    </li>
                  ),
                  p: ({ children }) => (
                    <p className="mb-4 text-gray-700 leading-relaxed">
                      {children}
                    </p>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-blue-900">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-blue-800">
                      {children}
                    </em>
                  )
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default MarkdownModal;