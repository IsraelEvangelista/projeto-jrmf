-- Criar usuário de teste na tabela dim_usuarios
-- Este script cria um usuário de teste para o sistema COGERH

-- Verificar se o usuário já existe antes de inserir
DO $$
DECLARE
  test_user_id uuid := '550e8400-e29b-41d4-a716-446655440000'::uuid;
BEGIN
  -- Primeiro, criar o usuário na tabela auth.users se não existir
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = test_user_id) THEN
    INSERT INTO auth.users (
      id,
      instance_id,
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at,
      raw_app_meta_data,
      raw_user_meta_data,
      is_super_admin,
      role,
      aud
    ) VALUES (
      test_user_id,
      '00000000-0000-0000-0000-000000000000'::uuid,
      'teste@cogerh.com.br',
      crypt('teste123', gen_salt('bf')),
      now(),
      now(),
      now(),
      '{"provider": "email", "providers": ["email"]}',
      '{"name": "Usuário Teste COGERH"}',
      false,
      'authenticated',
      'authenticated'
    );
    
    RAISE NOTICE 'Usuário criado na tabela auth.users!';
  END IF;
  
  -- Depois, verificar se o usuário já existe na tabela dim_usuarios
  IF NOT EXISTS (SELECT 1 FROM public.dim_usuarios WHERE email = 'teste@cogerh.com.br') THEN
    -- Inserir o usuário na tabela dim_usuarios
    INSERT INTO public.dim_usuarios (
      user_id,
      nome,
      email,
      role,
      perfil_id
    ) VALUES (
      test_user_id,
      'Usuário Teste COGERH',
      'teste@cogerh.com.br',
      'analista',
      1
    );
    
    RAISE NOTICE 'Usuário de teste criado com sucesso na dim_usuarios!';
  ELSE
    RAISE NOTICE 'Usuário de teste já existe na dim_usuarios!';
  END IF;
END $$;

-- Verificar se o usuário foi criado corretamente
SELECT 
  du.user_id,
  du.nome,
  du.email,
  du.role,
  du.perfil_id,
  du.created_at
FROM public.dim_usuarios du
WHERE du.email = 'teste@cogerh.com.br';