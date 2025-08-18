import { useState } from 'react';
import { FileText, Download, Monitor, Smartphone, BookOpen, FolderOpen } from 'lucide-react';
import MarkdownModal from './components/MarkdownModal';
import AnexosSection from './components/AnexosSection';
import MockupsSection from './components/MockupsSection';

function App() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const openModal = (modalType: string) => {
    setActiveModal(modalType);
    setActiveSection(null);
  };

  const openSection = (sectionType: string) => {
    setActiveSection(sectionType);
    setActiveModal(null);
  };

  const closeAll = () => {
    setActiveModal(null);
    setActiveSection(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
              Projeto COGERH - Sistema de Gestão de Recursos Hídricos
            </h1>
            <p className="text-lg text-blue-100 mb-4 drop-shadow">
              Portais de Monitoramento Hidrológico e Vazões Jaguaribe RMF
            </p>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-lg inline-block">
              <p className="text-white">
                <strong>Apresentação preparada por:</strong> Israel Evangelista<br/>
                <strong>Função:</strong> Analista de Levantamento de Requisitos
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Project Summary */}
        <section className="mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border border-blue-200 p-8 hover:shadow-2xl transition-all duration-300">
            <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
              <BookOpen className="mr-3 text-blue-600" />
              Resumo do Projeto
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Sistema integrado para gestão de recursos hídricos da COGERH, contemplando dois portais principais: 
              <strong className="text-blue-800">Portal de Vazões Jaguaribe RMF</strong> e 
              <strong className="text-blue-800"> Portal Hidrológico COGERH</strong>. 
              O sistema inclui aplicativo mobile para coleta de dados em campo, validação regional e integração 
              com o SIGERH. Desenvolvido para atender às necessidades das gerências GEMON, GEOPE e regionais, 
              com foco em transparência, segurança e conformidade com LGPD.
            </p>
          </div>
        </section>

        {/* Interactive Menu */}
        <section>
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
            Menu Interativo de Documentação
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* PRDs dos Portais */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-blue-200 p-6 hover:shadow-2xl hover:border-blue-400 transition-all duration-300 hover:scale-105 hover:bg-gradient-to-br hover:from-blue-50 hover:to-white group flex flex-col h-full">
              <div className="text-center flex-1 flex flex-col">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300">
                  <FileText className="text-blue-600 w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">PRDs dos Portais</h3>
                <p className="text-gray-600 mb-4 text-sm flex-1">
                  Documentação completa dos Product Requirements Documents com diagramas Mermaid
                </p>
                <div className="space-y-2 mt-auto">
                  <button
                    onClick={() => openModal('prd-hidrologico')}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 px-4 rounded-lg transition-all duration-200 text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Portal Hidrológico
                  </button>
                  <button
                    onClick={() => openModal('prd-vazoes')}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 px-4 rounded-lg transition-all duration-200 text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Portal Vazões JRMF
                  </button>
                </div>
              </div>
            </div>

            {/* Requisitos */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-blue-200 p-6 hover:shadow-2xl hover:border-green-400 transition-all duration-300 hover:scale-105 hover:bg-gradient-to-br hover:from-green-50 hover:to-white group flex flex-col h-full">
              <div className="text-center flex-1 flex flex-col">
                <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:from-green-200 group-hover:to-green-300 transition-all duration-300">
                  <BookOpen className="text-green-600 w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">Requisitos</h3>
                <p className="text-gray-600 mb-4 text-sm flex-1">
                  Documentação detalhada dos requisitos funcionais e não funcionais do projeto
                </p>
                <button
                  onClick={() => openModal('requisitos')}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-2 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 mt-auto"
                >
                  Visualizar Requisitos
                </button>
              </div>
            </div>

            {/* Anexos */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-blue-200 p-6 hover:shadow-2xl hover:border-purple-400 transition-all duration-300 hover:scale-105 hover:bg-gradient-to-br hover:from-purple-50 hover:to-white group flex flex-col h-full">
              <div className="text-center flex-1 flex flex-col">
                <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:from-purple-200 group-hover:to-purple-300 transition-all duration-300">
                  <FolderOpen className="text-purple-600 w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">Anexos</h3>
                <p className="text-gray-600 mb-4 text-sm flex-1">
                  Documentos complementares organizados por categoria com opção de download
                </p>
                <button
                  onClick={() => openSection('anexos')}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-2 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 mt-auto"
                >
                  Explorar Anexos
                </button>
              </div>
            </div>

            {/* Mockups */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-blue-200 p-6 hover:shadow-2xl hover:border-orange-400 transition-all duration-300 hover:scale-105 hover:bg-gradient-to-br hover:from-orange-50 hover:to-white group flex flex-col h-full">
              <div className="text-center flex-1 flex flex-col">
                <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:from-orange-200 group-hover:to-orange-300 transition-all duration-300">
                  <Monitor className="text-orange-600 w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">Mockups</h3>
                <p className="text-gray-600 mb-4 text-sm flex-1">
                  Protótipos funcionais dos sistemas de portais e aplicativo mobile
                </p>
                <button
                  onClick={() => openSection('mockups')}
                  className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white py-2 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 mt-auto"
                >
                  Acessar Mockups
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Modals and Sections */}
      {activeModal && (
        <MarkdownModal
          isOpen={true}
          type={activeModal as 'prd-hidrologico' | 'prd-vazoes' | 'requisitos'}
          onClose={closeAll}
        />
      )}

      {activeSection === 'anexos' && (
        <AnexosSection onClose={closeAll} />
      )}

      {activeSection === 'mockups' && (
        <MockupsSection onClose={closeAll} />
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-8 mt-16 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-blue-100 drop-shadow">
            © 2025 COGERH - Companhia de Gestão dos Recursos Hídricos do Ceará
          </p>
          <p className="text-blue-200 text-sm mt-2 drop-shadow">
            Sistema desenvolvido para modernização da gestão de recursos hídricos
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
