# Requisitos e Documentação do Projeto COGERH

## Modelo ER Inicial
- Gerado em `../Portal Hidrológico/Modelo_ER_Portal_Hidrologico.sql`: Tabelas para categorias, pontos de monitoramento, dados de coleta e usuários. Inclui função de cálculo exemplo e política RLS para segurança/LGPD.

## Introdução
Sistema para gestão de recursos hídricos da COGERH, com dois portais: Portal de Vazões Jaguaribe RMF e Portal Hidrológico COGERH. Inclui app mobile para coleta de dados em campo, validação e integração com portais. Interface exemplo: Filtros por período/categoria, gráfico temporal (vazão/volume, default 7 dias), tabela de dados (recente a antigo), com acessórios opcionais.

## Participantes
- **GEMON (Gerência de Monitoramento)** e **GEOPE (Gerência de Operação)**: Áreas requisitantes do sistema. Responsáveis por validação final, definição de parâmetros, memórias de cálculo e metodologias. Visualizam pendências mesmo sem validação regional.

> Nota (Governança/Taxonomia): "Chegada em Pacajus" foi definida como pertencente à GR METROPOLITANA (vigente até revisão em governança GEOPE).
- Gerências Regionais: Coleta de dados via app mobile por colaboradores de campo (Usuário Operacional). Validação inicial por analista regional em interface stage area. Lista: GRSALGADO, GRMBJAGUARIBE, GRMETROPOLITANA, GRLITORAL, GRBANABUIU, GRCURU, GRALTJAGUARIBE, GRCACARAU, GRCRATEUS, GRIBIAPABA. Visibilidade no mobile limitada às estruturas atribuídas ao perfil da sua gerência regional, conforme governança GEOPE.
- TI COGERH: Desenvolvimento e manutenção das integrações internas.
- Comunicação/Transparência: Publicação externa de boletins e relatórios.
- Jurídico/LGPD: Orientação sobre anonimização, retenção e políticas de acesso.

## Observações sobre App Mobile

### Para Portal de Vazões Jaguaribe RMF:
- Coleta com múltiplas prioridades: Totalizador Acumulado (Prioridade 1), Vazão Diária (Prioridade 2), Hora Bombeada (Prioridade 3), Nível (Prioridade 4)
- **Registro fotográfico OBRIGATÓRIO para prioridades 1, 3 e 4** (não aplicável para prioridade 2)
- Restrições de visualização: Cada gerência regional enxerga apenas categorias e subcategorias relevantes
- Inserções customizadas via interface dos portais para regras de variação específicas
- **PENDÊNCIA CRÍTICA**: Validação formal de parâmetros e fórmulas por ponto/trecho com GEMON/GEOPE

### Para Portal Hidrológico COGERH:
- Coleta simplificada: **APENAS cota e régua** (diferente do Portal de Vazões)
- Registro fotográfico obrigatório para todas as coletas
- **Periodicidade sazonal CONFIRMADA**: Janeiro-Junho (todos os dias), Julho-Dezembro (segunda a sexta em dias úteis sem feriados)
- **Validação obrigatória no sistema gestor**: Todos os dados coletados SEMPRE passam por validação regional antes do subfluxo SIGERH
- Restrições de visualização: Cada gerência regional enxerga apenas categorias e subcategorias relevantes
- **PENDÊNCIA CRÍTICA**: Memorial de cálculo Cota/Régua → Volume/Vazão deve ser investigado com GEMON/GEOPE

### Nota Informativa para Desenvolvedores
Para fins de documentação técnica e compreensão do contexto de coleta, pode-se referenciar que as informações do portal hidrológico são coletadas por **AGIRs** (Agentes de Informações de Recursos Hídricos). Esta terminologia é **exclusivamente informativa** e não deve ser incluída na modelagem de dados nem no fluxo operacional do sistema. A coleta efetiva é realizada por equipes de campo vinculadas aos perfis de gerência regional através do aplicativo mobile unificado.

## Categorias por Portal

### Portal de Vazões Jaguaribe RMF

**Abastecimento Público**
   - ETA-Gavião
   - ETA-Oeste
   - Morada Nova
   - Lima Campos
   - ETA-Catuana

**Sistema da Adutora do Acarape**
   - Adutora do Acarape (Saída)
   - EB Gavião DI-Maracanaú
   - EB Gavião ETA Maranguape
   - EB DI-Maracanaú

**Canal do Trabalhador**
   - Barragem de Itaiçaba
   - EB Itaiçaba
   - EB Piranji
   - EB Umburamas
   - Chegada em Pacajus
   - EB 01
   - EB 02
   - EB Pacoti Auxiliar

**Eixão das Águas** 
   - EB Castanhão
   - UTR-25
   - EB Banabuiú
   - Trecho II
   - Trecho III
   - Derivação Canal do Trabalhador
   - Trecho IV
   - EB DI Pacajus / DI Horizonte
   - Entrada do RAP-Pecém

**Cinturão das Águas**
   - Seção CAC-01

**Indústrias**
   - ArcelorMittal
   - Energia do Pecém - EDP
   - ENEVA
   - Petrobras (Antiga Termoceará)

**Sistemas Auxiliares do Pecém - SAP**
   - EB - Cauhipe
   - EB - Poços da Taíba
   - EB 2 - Poços do Pecém

**Irrigação**
   - Boa Esperança
   - DISTAR
   - FAPIJA
   - Perímetro Irrigado Icó-Lima Campos
   - PROMOVALE
   - Tijuca/ Rudolf
   - Mandacarú
   - Perímetro Irrigado de Morada Nova

**Orós-Feiticeiro e Orós-Lima Campos**
   - Válvula de Saída do Orós
   - EB Orós Feiticeiro
   - EB Orós Lima Campos
   - Saída do Túnel Orós Lima Campos
   - Chegada do Túnel Orós Lima Campos

**Sítios Novos Pecém**
   - Canal Sítios Novos - Pecém
   - EB Pecém

### Portal Hidrológico

#### Iteração BMAD 1 - Mapeamento Detalhado de Coleta de Dados

**Business (Negócio)**:
- **FLUXO ESPECÍFICO DO PORTAL HIDROLÓGICO CONFIRMADO**: Todas as categorias e subcategorias (açudes monitorados e perenização/seções de rio) têm dados coletados em campo pelo mobile. Os dados **SEMPRE** passam por uma interface no sistema gestor para validação pelas gerências regionais **ANTES** de serem enviados para o SIGERH. No SIGERH ocorre compilação e validação (regras já implementadas no SIGERH). **Após esse subfluxo**, os dados retornam para serem persistidos no Portal Hidrológico.
- Fluxo detalhado: Equipes de campo (mobile) → Sistema gestor (validação regional obrigatória) → SIGERH (compilação/validação) → Retorno ao Portal Hidrológico → Publicação
- Relatórios gerados: Boletim informativo, Resenha, Situação dos Açudes Federais, Apostes (dia/mês/ano), Relatório RMF, Mapa RMF
- Periodicidade sazonal CONFIRMADA: Janeiro-Junho (todos os dias), Julho-Dezembro (segunda a sexta em dias úteis sem feriados)

**Metrics (Métricas)**:
- Dados de entrada: **APENAS Cota e Régua** (Leitura do Barrote) - diferente do Portal de Vazões
- Dados resultado: Volume (m³) e Vazão (m³/s ou L/s)
- DIFERENCIAL CRÍTICO: Volume acumulado NÃO se aplica (inferência mensura volume do reservatório diariamente)
- Princípio de inferência: Cota/Régua → Cálculo → Volume/Vazão

**Actions (Ações)**:
- Coleta via mobile por equipes de campo vinculadas a perfis de gerência regional (APENAS cota e régua)
- Validação obrigatória no sistema gestor por analista regional antes do envio ao SIGERH
- Integração ao SIGERH → Compilação/Validação → Retorno → Persistência no Portal
- Geração automatizada de relatórios múltiplos
- Interface para persistência de regras de variação (similar ao Portal Vazões)

**Data (Dados)**:

**Açudes Monitorados**

   - Acarape do Meio
   - Aracoiaba
   - Banabuiú
   - Castanhão
   - Curral Velho
   - Gavião
   - Joaquim Távora
   - Lima Campos
   - Maranguapinho
   - Orós
   - Pacajus
   - Pacoti
   - Riachão
   - Sítios Novos

**Perenização e Seções de Rio**
   - Liberação do Aracoiaba
   - Liberação do Banabuiú
   - Liberação do Castanhão
   - Liberação do Lima Campos
   - Liberação Orós

**PENDÊNCIAS CRÍTICAS ATUALIZADAS**:

**Memorial de cálculo**: Conversão Cota/Régua → Volume/Vazão não documentada (consultar GEMON/GEOPE)

✅ **Relatórios múltiplos**: Concluído - 11 exemplares recebidos e analisados na pasta Relatorios_Exemplos

✅ **Periodicidade sazonal**: Confirmada - Janeiro-Junho (diário), Julho-Dezembro (dias úteis sem feriados)

✅ **Integrações**: Resolvido - Desenvolvimento interno pela TI da COGERH (hooks, APIs, webservices internos)

**Dados acessórios**: Marcar necessidade de conversas complementares com áreas envolvidas para elucidação de dados acessórios usados nos cálculos (ex.: parâmetros de curva chave, fatores de correção, unidades)

## Dados Principais

   - Vazão de Entrada
   - Vazão de Saída
   - Nível do Reservatório
   - Volume do Reservatório
   - Percentual de Volume
   - Cota de Sangria
   - Cota de Volume Morto
   - Capacidade Máxima
   - Precipitação
   - Evaporação
   - Vazão Vertida
   - Vazão Turbinada
   - Vazão Ecológica
   - Vazão de Retirada

## Dados Acessórios

   - Área do Espelho d'Água
   - Área da Bacia Hidrográfica
   - Coordenadas Geográficas
   - Município
   - Bacia Hidrográfica
   - Sub-bacia
   - Rio Principal
   - Uso Múltiplo
   - Finalidade
   - Situação Operacional
   - Ano de Conclusão
   - Altura da Barragem
   - Comprimento da Barragem
   - Tipo de Barragem

## Metodologias de Cálculo
Priorização de métodos para vazão diária (base para outros resultados):

**Prioridade 1 - Totalizador Acumulado**: Volume totalizado acumulado coletado de medidor de vazão (unidade padrão m³, mas flexível). Gera volume diário baseado no dia anterior (24h), último dado do banco dividido pelo período, ou dado anterior manual com data. Calcula vazão diária média (m³/s ou l/s).

**Prioridade 2 - Vazão Diária (Entrada Direta)**: Inserção manual da vazão média diária (m³/s ou l/s). Calcula volume diário e acumulado. Cálculo por meios próprios.

**Prioridade 3 - Hora Bombeada**: Para cada motor bomba (MB) em Estações de Bombeamento (EB), inserir horas e minutos (HH:MM). Converter para horas decimais: HD = H + (M/60). Tempo em segundos: HD × 3600. Volume total = V (vazão L/s) × Tempo_segundos. Vazão média diária = V × (HD/24). Somar para múltiplas bombas/estações.

**Prioridade 4 - Nível (m)**: Inserido manualmente. Vazão via equação de curva chave cadastrada (validade determinada ou datas). Equação de potência: y = a * (x - h0)^b, onde y = vazão, x = nível, h0 = nível mínimo (vazão 0), a e b constantes. Nem todos os pontos geram vazão (ex.: EB Cauhipe e Itaiçaba).

**Observações**:

   - Severidade: Prioridade 1 é real; 2 sutil erro; 3 e 4 podem distorcer (inferência).

   - Sem novo dado, repetir anterior (tipo: "inserido" ou "repetido"), comum em perenizações.

   - Dados calculados: Vazão média diária (m³/s ou l/s, 1000 l = 1 m³), Volume total diário (m³), Volume/tempo (24h ou 86400s) = Vazão × Tempo.

   - Inserções via app mobile por gerências regionais, com severidade exibida.

## Integrações

**Desenvolvimento interno pela TI da COGERH**: A própria equipe desenvolverá hooks, APIs e webservices internos para integração entre sistemas

**Sem integrações externas**: Não haverá integrações com MCPs ou agentes IA

**Sistemas internos**: Integração apenas entre mobile, sistema gestor, SIGERH e portais

App mobile para coleta e pré-validação regional obrigatória

## Dúvidas e Itens Pendentes

   - Fórmula para prioridade 4 (Nível): Documentar que, na etapa de desenvolvimento, deve-se procurar as áreas de negócio (GEMON e GEOPE) para embasamento da metodologia e cálculo.

   - Regras de negócio específicas para Portal Hidrológico:
   **Para Açudes Monitorados**: Aplicar prioridades 1-4 para cálculo de vazão e volume diário, com repetição de dados anteriores se não houver nova coleta.
   **Para Perenização e Seções de Rio**: Subcategorias definidas (Liberação do Aracoiaba, Banabuiú, Castanhão, Lima Campos, Orós); pendentes apenas critérios de monitoramento e alertas (consultar GEMON/GEOPE).

   - Requisitos de segurança e LGPD: Arquitetura robusta para evitar exibição de dados em logs ou download sem credenciais necessárias. Dados podem ser visualizados e enviados via rotinas CRON para pessoas específicas autorizadas pela diretoria.

   - Equações exatas para prioridades 3 e 4, se necessário refinamento.

## Próximos Passos

   - ✅ Iterações massivas BMAD para levantamento completo de dados, regras, agentes e desafios para ambos portais.

   - Criação de mockups em Lovable/TRAE para app mobile e interfaces de portais.

   - Geração de queries, funções e regras (performance/segurança) para Postgres local.

   - Desenvolvimento em Angular, com documentos modulares.

   - Backlog de produto completo com definição de pronto.

   - Documentos adicionais recomendados: Visão Arquitetural, Guia de Segurança/LGPD, Relatório de Riscos.

## Governança GEOPE (Mapeamento de Responsabilidades)

   - **Interface de Governança GEOPE**: A interface de governança permitirá mapear responsabilidade categoria/subcategoria → Gerência Regional, com vigência por período: data início obrigatória; data fim opcional (pode permanecer aberta até revogação). Todas as alterações devem registrar auditoria (quem, quando, o quê) e produzir trilha histórica para reprodução de cenários.

   - **Efeito em RLS/Visibilidade**: O mapeamento vigente controla a visibilidade das estruturas e dados por regional e determina as estruturas apresentadas ao Usuário Operacional (Técnico de Campo) no app mobile.

   - **Prioridade**: P0 (bloqueante para RLS/produção). RLS provisória somente mediante aceite formal (P1) — não recomendado.

### Notas Pendentes (Taxonomia/GR)

   - Aracoiaba (Açudes Monitorados no Portal Hidrológico): GR a definir pela GEOPE via interface de governança. Marcar como TBD pós-implementação.

   - Regras de negócio específicas para Portal Hidrológico:
   **Para Açudes Monitorados**: Aplicar prioridades 1-4 para cálculo de vazão e volume diário, com repetição de dados anteriores se não houver nova coleta.
   **Para Perenização e Seções de Rio**: Subcategorias definidas (Liberação do Aracoiaba, Banabuiú, Castanhão, Lima Campos, Orós); pendentes apenas critérios de monitoramento e alertas (consultar GEMON/GEOPE).

   - Requisitos de segurança e LGPD: Arquitetura robusta para evitar exibição de dados em logs ou download sem credenciais necessárias. Dados podem ser visualizados e enviados via rotinas CRON para pessoas específicas autorizadas pela diretoria.

   - Equações exatas para prioridades 3 e 4, se necessário refinamento.
