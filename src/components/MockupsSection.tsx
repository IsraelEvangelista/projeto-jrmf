import React from 'react';
import { X, Monitor, Smartphone, ExternalLink, User, Lock } from 'lucide-react';

interface MockupsSectionProps {
  onClose: () => void;
}

const MockupsSection: React.FC<MockupsSectionProps> = ({ onClose }) => {
  const handleOpenMockup = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
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
      <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col border border-blue-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-blue-200 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 rounded-t-xl">
          <h2 className="text-2xl font-bold text-white drop-shadow-lg">Mockups do Sistema</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-110"
            aria-label="Fechar seção"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 overflow-y-auto bg-gradient-to-br from-white via-blue-50/30 to-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sistema Portais */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 flex flex-col justify-between">
              <div className="text-center mb-6">
                <div className="bg-blue-500 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Monitor className="text-white w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900 mb-2">Sistema Portais</h3>
                <p className="text-blue-700 text-sm mb-4">
                  Protótipo funcional dos portais de monitoramento hidrológico
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Funcionalidades Disponíveis:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Portal de Vazões Jaguaribe RMF</li>
                    <li>• Portal Hidrológico COGERH</li>
                    <li>• Dashboards interativos</li>
                    <li>• Visualização de séries históricas</li>
                    <li>• Exportação de dados</li>
                    <li>• Sistema de autenticação</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Credenciais de Teste:
                  </h4>
                  <div className="text-sm text-yellow-700 space-y-1">
                    <p><strong>Email:</strong> teste.sistema@cogerh.com.br</p>
                    <p><strong>Senha:</strong> teste123</p>
                    <p className="text-xs mt-2 text-yellow-600">
                      * Usuário criado na tabela dim_usuarios do Supabase
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleOpenMockup('https://traez60p1hve.vercel.app/auth')}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center font-medium shadow-md hover:shadow-lg"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Acessar Mockup dos Portais
              </button>
            </div>

            {/* Sistema Mobile */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200 flex flex-col justify-between">
              <div className="text-center mb-6">
                <div className="bg-green-500 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Smartphone className="text-white w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-green-900 mb-2">Sistema Mobile</h3>
                <p className="text-green-700 text-sm mb-4">
                  Aplicativo móvel para coleta de dados em campo
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">Funcionalidades Planejadas:</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Coleta de dados hidrológicos</li>
                    <li>• Registro fotográfico</li>
                    <li>• Validação regional</li>
                    <li>• Sincronização offline</li>
                    <li>• Geolocalização</li>
                    <li>• Interface otimizada para campo</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Status do Desenvolvimento:</h4>
                  <div className="text-sm text-blue-700">
                    <p className="mb-2">🚧 <strong>Em Desenvolvimento</strong></p>
                    <p className="text-xs text-blue-600">
                      O mockup do sistema mobile está sendo desenvolvido e será disponibilizado em breve. 
                      Ele complementará os portais web com funcionalidades específicas para coleta de dados em campo.
                    </p>
                  </div>
                </div>
              </div>

              <button
                disabled
                className="w-full bg-gradient-to-r from-gray-400 to-gray-500 text-white py-3 px-6 rounded-lg cursor-not-allowed flex items-center justify-center font-medium shadow-md"
              >
                <Lock className="w-5 h-5 mr-2" />
                Em Desenvolvimento
              </button>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-bold text-blue-900 mb-4">Informações Adicionais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-blue-700">
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">Tecnologias Utilizadas:</h4>
                <ul className="space-y-1">
                  <li>• React + TypeScript</li>
                  <li>• Tailwind CSS</li>
                  <li>• Supabase (Backend)</li>
                  <li>• Vercel (Deploy)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">Próximos Passos:</h4>
                <ul className="space-y-1">
                  <li>• Finalização do mockup mobile</li>
                  <li>• Integração com SIGERH</li>
                  <li>• Testes de usabilidade</li>
                  <li>• Implementação em Angular</li>
                </ul>
              </div>
            </div>
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

export default MockupsSection;