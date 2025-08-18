import React, { useState, useEffect } from 'react';
import { X, Download, FileText, Folder, Loader2, AlertCircle } from 'lucide-react';

interface AnexosSectionProps {
  onClose: () => void;
}

interface FileItem {
  name: string;
  path: string;
  size?: number;
}

interface CategoryData {
  [key: string]: FileItem[];
}

const AnexosSection: React.FC<AnexosSectionProps> = ({ onClose }) => {
  const [anexos, setAnexos] = useState<CategoryData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [downloadingFile, setDownloadingFile] = useState<string | null>(null);

  const categories = {
    'Calculos_Memorial': {
      title: 'Cálculos e Memorial',
      description: 'Documentos técnicos com cálculos e memoriais descritivos',
      color: 'blue'
    },
    'Portais': {
      title: 'Documentação dos Portais',
      description: 'Documentos específicos dos portais do sistema',
      color: 'green'
    },
    'Relatorios_Exemplos': {
      title: 'Relatórios e Exemplos',
      description: 'Exemplos de relatórios e documentação de referência',
      color: 'purple'
    },
    'SIGERH_Supervisorio_Referencias': {
      title: 'SIGERH e Referências',
      description: 'Documentação do SIGERH e materiais de referência',
      color: 'orange'
    }
  };

  useEffect(() => {
    const fetchAnexos = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch('/api/anexos');
        if (!response.ok) {
          throw new Error(`Erro ao carregar anexos: ${response.statusText}`);
        }
        
        const data = await response.json();
        setAnexos(data);
        
        // Set first category with files as active
        const firstCategoryWithFiles = Object.keys(data).find(cat => data[cat].length > 0);
        if (firstCategoryWithFiles) {
          setActiveCategory(firstCategoryWithFiles);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchAnexos();
  }, []);

  const handleDownload = async (file: FileItem) => {
    setDownloadingFile(file.name);
    
    try {
      // file.path já vem no formato "categoria/filename"
      const response = await fetch(`/api/download/${file.path}`);
      if (!response.ok) {
        throw new Error('Erro ao baixar arquivo');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      alert('Erro ao baixar arquivo: ' + (err instanceof Error ? err.message : 'Erro desconhecido'));
    } finally {
      setDownloadingFile(null);
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-800',
        button: 'bg-blue-600 hover:bg-blue-700',
        active: 'bg-blue-100 border-blue-400'
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-800',
        button: 'bg-green-600 hover:bg-green-700',
        active: 'bg-green-100 border-green-400'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        text: 'text-purple-800',
        button: 'bg-purple-600 hover:bg-purple-700',
        active: 'bg-purple-100 border-purple-400'
      },
      orange: {
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        text: 'text-orange-800',
        button: 'bg-orange-600 hover:bg-orange-700',
        active: 'bg-orange-100 border-orange-400'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl w-full h-full max-w-7xl max-h-[95vh] flex flex-col border border-blue-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-blue-200 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-t-xl">
          <h2 className="text-2xl font-bold text-white drop-shadow-lg">Anexos da Documentação</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-110"
            aria-label="Fechar seção"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar - Categories */}
          <div className="w-1/3 border-r border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-4 overflow-y-auto">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Categorias</h3>
            
            {loading && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              </div>
            )}

            {!loading && !error && (
              <div className="space-y-3">
                {Object.entries(categories).map(([key, category]) => {
                  const fileCount = anexos[key]?.length || 0;
                  const colors = getColorClasses(category.color);
                  const isActive = activeCategory === key;
                  
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveCategory(key)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                        isActive 
                          ? `${colors.active} ${colors.text}` 
                          : `${colors.bg} ${colors.border} ${colors.text} hover:${colors.active}`
                      }`}
                    >
                      <div className="flex items-start">
                        <Folder className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm mb-1">{category.title}</h4>
                          <p className="text-xs opacity-80 mb-2">{category.description}</p>
                          <span className="text-xs font-medium">
                            {fileCount} arquivo{fileCount !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Main Content - Files */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeCategory && (
              <>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {categories[activeCategory as keyof typeof categories].title}
                  </h3>
                  <p className="text-gray-600">
                    {categories[activeCategory as keyof typeof categories].description}
                  </p>
                </div>

                {anexos[activeCategory] && anexos[activeCategory].length > 0 ? (
                  <div className="space-y-3">
                    {anexos[activeCategory].map((file, index) => (
                      <div
                        key={index}
                        className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-lg p-4 hover:shadow-lg hover:bg-white transition-all duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center flex-1">
                            <FileText className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-800 mb-1">{file.name}</h4>
                              {file.size && (
                                <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => handleDownload(file)}
                            disabled={downloadingFile === file.name}
                            className="ml-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-blue-400 disabled:to-blue-400 text-white rounded-lg transition-all duration-200 flex items-center shadow-md hover:shadow-lg"
                          >
                            {downloadingFile === file.name ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                Baixando...
                              </>
                            ) : (
                              <>
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Folder className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-500 mb-2">Nenhum arquivo encontrado</h4>
                    <p className="text-gray-400">Esta categoria não possui arquivos anexos no momento.</p>
                  </div>
                )}
              </>
            )}

            {!activeCategory && !loading && (
              <div className="text-center py-12">
                <Folder className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-500 mb-2">Selecione uma categoria</h4>
                <p className="text-gray-400">Escolha uma categoria na barra lateral para visualizar os arquivos.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-blue-200 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-b-xl">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Voltar ao Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnexosSection;