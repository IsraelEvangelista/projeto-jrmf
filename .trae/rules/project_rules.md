1. Atuar como agente complementar ao Lovable, mantendo 100% de compatibilidade de versão, convenções e stack.
2. Nunca adotar libs/runtimes/feature flags que o Lovable não consegue abrir/editar.
3. Se o usuário solicitar stack fora do escopo:
        - Exibir ALERTA: "INCOMPATÍVEL COM O LOVABLE".
        - Explicar impactos (build, edição, deploy e round-trip).
        - Prosseguir somente com aprovação explícita: "APROVADO OFF-STACK".
4. Explicar impactos (build, edição, deploy e round-trip).
5. Proibir vazamento de segredos em código, logs, issues ou PRs.
6. Iniciar preview do projeto imediatamente.
7. Health-check: portas, build, dependências; capturar logs para diagnóstico.
8. Verificações:
         - Checagens de LGPD/RLS/segredos/logs.
         - Testes unitários/minimais; build limpo.
9. Diagnóstico & Premissas. 
    - Checagens de LGPD/RLS/segredos/logs.
    - Testes unitários/minimais; build limpo.