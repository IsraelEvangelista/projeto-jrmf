import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

// Rota para servir arquivos markdown dos PRDs
app.get('/api/prd/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, '..', '.trae', 'documents', filename);
  
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Arquivo não encontrado' });
  }
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    res.json({ content, filename });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao ler arquivo' });
  }
});

// Rotas específicas para os documentos conforme esperado pelo frontend
app.get('/api/documents/prd-hidrologico', (req, res) => {
  const filePath = path.join(__dirname, '..', '.trae', 'documents', 'PRD_Portal_Hidrologico_Consolidado.md');
  
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Arquivo PRD Hidrológico não encontrado' });
  }
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    res.json({ content, filename: 'PRD_Portal_Hidrologico_Consolidado.md' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao ler arquivo PRD Hidrológico' });
  }
});

app.get('/api/documents/prd-vazoes', (req, res) => {
  const filePath = path.join(__dirname, '..', '.trae', 'documents', 'PRD_Portal_Vazoes_JRMF_Consolidado.md');
  
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Arquivo PRD Vazões não encontrado' });
  }
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    res.json({ content, filename: 'PRD_Portal_Vazoes_JRMF_Consolidado.md' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao ler arquivo PRD Vazões' });
  }
});

app.get('/api/documents/requisitos', (req, res) => {
  const filePath = path.join(__dirname, '..', 'Requisitos', 'Requisitos_Projeto_COGERH.md');
  
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Arquivo de requisitos não encontrado' });
  }
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    res.json({ content, filename: 'Requisitos_Projeto_COGERH.md' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao ler arquivo de requisitos' });
  }
});

// Rota para servir arquivo de requisitos
app.get('/api/requisitos', (req, res) => {
  const filePath = path.join(__dirname, '..', 'Requisitos', 'Requisitos_Projeto_COGERH.md');
  
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Arquivo de requisitos não encontrado' });
  }
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    res.json({ content, filename: 'Requisitos_Projeto_COGERH.md' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao ler arquivo de requisitos' });
  }
});

// Rota para listar todos os anexos por categoria
app.get('/api/anexos', (req, res) => {
  const anexosBasePath = path.join(__dirname, '..', 'Anexos', 'Anexos_Documentacao');
  const categories = ['Calculos_Memorial', 'Portais', 'Relatorios_Exemplos', 'SIGERH_Supervisorio_Referencias'];
  
  const result = {};
  
  try {
    categories.forEach(categoria => {
      const categoryPath = path.join(anexosBasePath, categoria);
      
      if (fs.existsSync(categoryPath)) {
        const files = fs.readdirSync(categoryPath)
          .filter(file => !fs.statSync(path.join(categoryPath, file)).isDirectory())
          .map(file => {
            const filePath = path.join(categoryPath, file);
            const stats = fs.statSync(filePath);
            return {
              name: file,
              path: `${categoria}/${file}`,
              size: stats.size
            };
          });
        result[categoria] = files;
      } else {
        result[categoria] = [];
      }
    });
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar anexos' });
  }
});

// Rota para listar anexos por categoria
app.get('/api/anexos/:categoria', (req, res) => {
  const { categoria } = req.params;
  const anexosPath = path.join(__dirname, '..', 'Anexos', 'Anexos_Documentacao', categoria);
  
  if (!fs.existsSync(anexosPath)) {
    return res.status(404).json({ error: 'Categoria não encontrada' });
  }
  
  try {
    const files = fs.readdirSync(anexosPath)
      .filter(file => !fs.statSync(path.join(anexosPath, file)).isDirectory())
      .map(file => ({
        name: file,
        path: `/api/download/${categoria}/${encodeURIComponent(file)}`
      }));
    
    res.json({ categoria, files });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar arquivos' });
  }
});

// Rota para download de arquivos anexos
app.get('/api/download/:categoria/:filename', (req, res) => {
  const { categoria, filename } = req.params;
  const filePath = path.join(__dirname, '..', 'Anexos', 'Anexos_Documentacao', categoria, decodeURIComponent(filename));
  
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Arquivo não encontrado' });
  }
  
  try {
    res.download(filePath, filename);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer download do arquivo' });
  }
});

// Rota de teste para verificar se o servidor está funcionando
app.get('/', (req, res) => {
  res.json({ message: 'Servidor backend funcionando!', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});