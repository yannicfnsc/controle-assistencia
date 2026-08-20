import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell, LabelList,
} from "recharts";
import {
  ClipboardList, PlusCircle, ListChecks, BarChart3, ChevronLeft, ChevronRight,
  Search, X, Check, Clock, CircleDot, FileStack, Wrench, Loader2, AlertTriangle,
  CalendarDays, Copy, ClipboardCheck,
} from "lucide-react";

/* ============================================================
   SEED DATA — imported once from the user's original spreadsheet
   ============================================================ */
const SEED_DATA = [{"id": "r0", "numero": "64713", "entrada": "2026-06-26", "cliente": "R T C Engenharia Ltda", "endereco": "TANQUE", "produto": "ESCORAMENTO", "vendedor": "ROBERTA", "tecnico": "PEDRO", "previsaoVisita": "2026-07-16", "dataVisita": "2026-07-16", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": "ORÇAMENTO DE ESCORAMENTO"}, {"id": "r1", "numero": "64775", "entrada": "2026-07-02", "cliente": "A.yoshii General Construction Ltda", "endereco": "Cachoeiras de Macacu", "produto": "PROTEÇÃO DE PERIFERIA", "vendedor": "GILBERTO", "tecnico": "YANNIC", "previsaoVisita": "2026-07-16", "dataVisita": "2026-07-16", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": "NOSSO MATERIAL NÃO ATENDIA O CLIENTE"}, {"id": "r2", "numero": "64788", "entrada": "2026-07-02", "cliente": "Stewart Engenharia E Participacoes Ltda", "endereco": "Leblon", "produto": "ESCORAMENTO", "vendedor": "ROBERTA", "tecnico": "PEDRO", "previsaoVisita": "2026-07-16", "dataVisita": "2026-07-17", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r3", "numero": "64797", "entrada": "2026-07-02", "cliente": "Horizon 04 Ltda", "endereco": "Copacabana", "produto": "aparalixo", "vendedor": "ANDRÉ MARQUES", "tecnico": "JEFFERSON", "previsaoVisita": "2026-07-20", "dataVisita": "2026-07-20", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r4", "numero": "64779", "entrada": "2026-07-02", "cliente": "Rio Mais Verde Empreendimentos S.a.a", "endereco": "Leblon", "produto": "ANDAIME. TUBULAR", "vendedor": "ANDRÉ MARQUES", "tecnico": "YANNIC", "previsaoVisita": "2026-07-08", "dataVisita": "2026-07-08", "status": "✅ Concluído", "servicos": null, "observacoes": null}, {"id": "r5", "numero": "64803", "entrada": "2026-07-03", "cliente": "J2-r Demolicoes e Terraplanagens Ltda", "endereco": "Ipanema", "produto": "aparalixo", "vendedor": "ANDRÉ MARQUES", "tecnico": "JEFFERSON", "previsaoVisita": "2026-07-20", "dataVisita": "2026-07-20", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r6", "numero": "64859", "entrada": "2026-07-03", "cliente": "Esc Empreendimentos Imobiliarios Ltda", "endereco": "Gávea", "produto": "aparalixo / fachadeiro", "vendedor": "BIRA", "tecnico": "YANNIC", "previsaoVisita": "2026-07-10", "dataVisita": "2026-07-17", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r7", "numero": "64885", "entrada": "2026-07-03", "cliente": "Consorcio Rua Gago Coutinho, 53 a 6", "endereco": "Laranjeiras", "produto": "fachadeiro/suspenso/", "vendedor": "ROBERTA", "tecnico": "DIMAS", "previsaoVisita": "2026-07-24", "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": null}, {"id": "r8", "numero": "64891", "entrada": "2026-07-03", "cliente": "Br Construcoes & Manutencoes Ltda", "endereco": "Pechincha", "produto": "escoramento", "vendedor": "ANDRÉ MARQUES", "tecnico": "FELIPE", "previsaoVisita": "2026-07-22", "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": null}, {"id": "r9", "numero": "64931", "entrada": "2026-07-03", "cliente": "Teresopolis Shopping Center Empreendimentos Ltda", "endereco": "Teresópolis", "produto": "fachadeiro / andaime tubular", "vendedor": "ROBERTA", "tecnico": "CLAUDIO", "previsaoVisita": "2026-07-24", "dataVisita": "2026-07-24", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r10", "numero": "64938", "entrada": "2026-07-03", "cliente": "Condominio do Edificio Casa Alta", "endereco": "Botafogo", "produto": "andaime tubular", "vendedor": "BIRA", "tecnico": "ENILSON", "previsaoVisita": "2026-07-22", "dataVisita": "2026-07-22", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r11", "numero": "64939", "entrada": "2026-07-03", "cliente": "M C a 2030 Construcoes Cce Ltda", "endereco": "Recreio dos Bandeirantes", "produto": "escoramento", "vendedor": "ANDRÉ MARQUES", "tecnico": "PEDRO", "previsaoVisita": "2026-07-15", "dataVisita": "2026-07-22", "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": null}, {"id": "r12", "numero": "64794", "entrada": "2026-07-03", "cliente": "Reunidas Sudeste Engenharia Ltda", "endereco": "ANDARAÍ", "produto": "AND. SUPENSO", "vendedor": "DORALICE", "tecnico": "MOISES", "previsaoVisita": "2026-07-03", "dataVisita": "2026-07-03", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r13", "numero": "64801", "entrada": "2026-07-03", "cliente": "Braco Fort Engenharia e Construcao Ltda", "endereco": "Jacarepaguá", "produto": "AND. SUPENSO", "vendedor": "DORALICE", "tecnico": "FELIPE CORREA", "previsaoVisita": "2026-07-09", "dataVisita": "2026-07-09", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r14", "numero": "64793", "entrada": "2026-07-03", "cliente": "Ga Comercio e Servicos Automotivos Ltda", "endereco": "Centro", "produto": "AND. SUPENSO", "vendedor": "GILBERTO", "tecnico": "MOISES", "previsaoVisita": "2026-07-03", "dataVisita": "2026-07-03", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r15", "numero": "64943", "entrada": "2026-07-07", "cliente": "Condominio do Edificio Mare Nostrum", "endereco": "Copacabana", "produto": "fachadeiro / aparalixo", "vendedor": "ROBERTA", "tecnico": "DIMAS", "previsaoVisita": "2026-07-21", "dataVisita": "2026-07-21", "status": "✅ Concluído", "servicos": null, "observacoes": null}, {"id": "r16", "numero": "64486", "entrada": "2026-07-07", "cliente": "Construtrora Sdk Ltda", "endereco": "Flamengo", "produto": "jirau passante", "vendedor": "ROBERTA", "tecnico": "MOISES", "previsaoVisita": "2026-07-17", "dataVisita": "2026-07-17", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r17", "numero": "64951", "entrada": "2026-07-08", "cliente": "Concrejato Servicos Tecnicos de Engenharia S/a", "endereco": "Centro", "produto": "fachadeiro", "vendedor": "ANDRÉ MARQUES", "tecnico": "YANNIC", "previsaoVisita": "2026-07-15", "dataVisita": "2026-07-15", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": "LEVANTAMENTO FEITO PELO PROMOTOR"}, {"id": "r18", "numero": "64966", "entrada": "2026-07-08", "cliente": "Alex Lopes Pereira Arca Construcoes - Me", "endereco": "taquara", "produto": "fachadeiro", "vendedor": "DORALICE", "tecnico": "DIMAS", "previsaoVisita": "2026-07-20", "dataVisita": "2026-07-20", "status": "✅ Concluído", "servicos": null, "observacoes": null}, {"id": "r19", "numero": "64971", "entrada": "2026-07-09", "cliente": "Spe Sot Ix Bco Incorporacoes Spe Ltda", "endereco": "Niterói", "produto": "jirau passante", "vendedor": "DORALICE", "tecnico": "ENILSON", "previsaoVisita": "2026-07-20", "dataVisita": "2026-07-20", "status": "✅ Concluído", "servicos": null, "observacoes": null}, {"id": "r20", "numero": "64973", "entrada": "2026-07-09", "cliente": "Armatis Solucoes em Engenharia Ltda", "endereco": "Flamengo", "produto": "manuntenção andaime suspenso", "vendedor": "ROBERTA", "tecnico": "MOISES", "previsaoVisita": "2026-07-16", "dataVisita": "2026-07-16", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r21", "numero": "64870", "entrada": "2026-07-09", "cliente": "Condominio do Edificio Rosa da Barra", "endereco": "Barra da Tijuca", "produto": "AND. SUPENSO", "vendedor": null, "tecnico": "FELIPE CORREA", "previsaoVisita": "2026-07-27", "dataVisita": "2026-07-27", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r22", "numero": "64979", "entrada": "2026-07-10", "cliente": "Stewart Engenharia E Participacoes Ltda", "endereco": "Leblon", "produto": "fachadeiro / aparalixo / escoramento", "vendedor": "ROBERTA", "tecnico": "PEDRO", "previsaoVisita": "2026-07-21", "dataVisita": "2026-07-21", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": "SEM VISITA , ORÇAMENTO DE ESCORAMENTO"}, {"id": "r23", "numero": "65000", "entrada": "2026-07-10", "cliente": "C M N Engenharia Ltda", "endereco": "Jardim Botânico", "produto": "FACHADEIRO", "vendedor": null, "tecnico": "ENILSON", "previsaoVisita": "2026-07-22", "dataVisita": "2026-07-22", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r24", "numero": "64842", "entrada": "2026-07-10", "cliente": "Super California Jv Empreendimento Imobiliario Spe Ltda", "endereco": "Nova Iguaçu", "produto": "aparalixo", "vendedor": "ANDRÉ MARQUES", "tecnico": "JEFFERSON", "previsaoVisita": "2026-07-10", "dataVisita": "2026-07-17", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r25", "numero": "64897", "entrada": "2026-07-10", "cliente": "Escola Concept Ltda", "endereco": "Ipanema", "produto": "aparalixo / fachadeiro / suspenso", "vendedor": "BIRA", "tecnico": "JEFFERSON", "previsaoVisita": "2026-07-13", "dataVisita": "2026-07-20", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r26", "numero": "64999", "entrada": "2026-07-10", "cliente": "Consorcio Mar Caramujo", "endereco": "NITEROI", "produto": "FACHADEIRO", "vendedor": "ANDRÉ MARQUES", "tecnico": "YANNIC", "previsaoVisita": "2026-07-17", "dataVisita": "2026-07-17", "status": "✅ Concluído", "servicos": null, "observacoes": null}, {"id": "r27", "numero": "64887", "entrada": "2026-07-10", "cliente": "Eolica Engenharia Ltda", "endereco": "MANGUEIRA", "produto": "AND. SUPENSO", "vendedor": "BIRA", "tecnico": "MOISES", "previsaoVisita": "2026-07-10", "dataVisita": "2026-07-10", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r28", "numero": "64888", "entrada": "2026-07-10", "cliente": "Cyrela Lotus Empreendimentos Imobiliarios Ltda", "endereco": "Estrada dos Bandeirantes", "produto": "AND. SUPENSO", "vendedor": "BIRA", "tecnico": "MOISES", "previsaoVisita": null, "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": "CANCELADO"}, {"id": "r29", "numero": "65029", "entrada": "2026-07-13", "cliente": "Spe Mozak Engenharia Marias Ltda", "endereco": "Ipanema", "produto": "AND. SUPENSO", "vendedor": "TADEU", "tecnico": "JEFFERSON", "previsaoVisita": "2026-07-20", "dataVisita": "2026-07-20", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r30", "numero": "64904", "entrada": "2026-07-13", "cliente": "Spe Rio 2 Ltda", "endereco": "Jacarepaguá", "produto": "AND. SUPENSO", "vendedor": "ROBERTA", "tecnico": "FELIPE", "previsaoVisita": null, "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": "CANCELADO"}, {"id": "r31", "numero": "65032", "entrada": "2026-07-14", "cliente": "L Cardoso da Silva", "endereco": "São Conrado'", "produto": "APARALIXO", "vendedor": "ROBERTA", "tecnico": "CLAUDIO", "previsaoVisita": "2026-07-20", "dataVisita": "2026-07-21", "status": "✅ Concluído", "servicos": "ENTREGA", "observacoes": "ENTREGA DE PRANCHAS"}, {"id": "r32", "numero": "65012", "entrada": "2026-07-14", "cliente": "Tangran Engenharia Ltda", "endereco": "Copacabana", "produto": "AND. SUPENSO", "vendedor": "ROBERTA", "tecnico": "CLAUDIO", "previsaoVisita": "2026-07-20", "dataVisita": "2026-07-21", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r33", "numero": "65044", "entrada": "2026-07-14", "cliente": "BRAÇO FORT", "endereco": "RECREio dos Bandeirantes", "produto": "AND. SUPENSO", "vendedor": "DORALICE", "tecnico": "FELIPE", "previsaoVisita": "2026-07-23", "dataVisita": "2026-07-23", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": "CABO PARTIDO E TROCA PAINEL ELÉTRICO"}, {"id": "r34", "numero": "65046", "entrada": "2026-07-14", "cliente": "CYRELA JACARÉPAGUA", "endereco": "BARRA", "produto": "AND. SUPENSO", "vendedor": "BIRA", "tecnico": "DIMAS", "previsaoVisita": "2026-07-23", "dataVisita": "2026-07-23", "status": "✅ Concluído", "servicos": "SUPERVISÃO", "observacoes": "SUPERVISÃO AMARRAÇÃO ANDAIME SUSPENSO E LIBERAÇÃO PARA USO"}, {"id": "r35", "numero": "65036", "entrada": "2026-07-14", "cliente": "GRAFO ENGENHARIA", "endereco": "LAGOA", "produto": "APARALIXO", "vendedor": "ROBERTA", "tecnico": "CLAUDIO", "previsaoVisita": "2026-07-17", "dataVisita": "2026-07-17", "status": "✅ Concluído", "servicos": "SUPERVISÃO", "observacoes": null}, {"id": "r36", "numero": "65025", "entrada": "2026-07-14", "cliente": "Cyrela Lotus Empreendimentos Imobiliarios Ltda", "endereco": "Curicica", "produto": "AND. SUPENSO", "vendedor": "BIRA", "tecnico": "MOISES", "previsaoVisita": "2026-07-20", "dataVisita": "2026-07-21", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": "Solicita pela obra"}, {"id": "r37", "numero": "65047", "entrada": "2026-07-14", "cliente": "START INFRA", "endereco": "Freguesia", "produto": "AND. SUPENSO", "vendedor": "ANDRÉ MARQUES", "tecnico": "MOISES", "previsaoVisita": "2026-07-21", "dataVisita": "2026-07-21", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": "CABO PARTIDO"}, {"id": "r38", "numero": "65024", "entrada": "2026-07-14", "cliente": "Domma Sao Goncalo Empreendimento Imobiliario Spe Ltda", "endereco": "São Gonçalo", "produto": "ESCORAMENTO", "vendedor": "GILBERTO", "tecnico": "ENILSON", "previsaoVisita": "2026-07-20", "dataVisita": "2026-07-20", "status": "✅ Concluído", "servicos": "SUPERVISÃO", "observacoes": null}, {"id": "r39", "numero": "65014", "entrada": "2026-07-14", "cliente": "Prourb Engenharia Eireli", "endereco": "São Gonçalo", "produto": "FACHADEIRO", "vendedor": "BIRA", "tecnico": "ENILSON", "previsaoVisita": "2026-07-20", "dataVisita": "2026-07-20", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r40", "numero": "64930", "entrada": "2026-07-14", "cliente": "Grumey Sa Armazens Gerais Guardatudo", "endereco": "SÃO CRISTOVÃO", "produto": "ANDAIME. TUBULAR", "vendedor": null, "tecnico": "YANNIC", "previsaoVisita": "2026-07-14", "dataVisita": "2026-07-14", "status": "✅ Concluído", "servicos": "SUPERVISÃO", "observacoes": "VERIFICAR SE TINHA MATERIAL EM OBRA."}, {"id": "r41", "numero": "64928", "entrada": "2026-07-14", "cliente": "Azenha Engenharia Civil e Ambiental Ltda", "endereco": "Copacabana", "produto": "AND. SUPENSO", "vendedor": "GILBERTO", "tecnico": "FELIPE CORREA", "previsaoVisita": "2026-07-14", "dataVisita": "2026-07-14", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r42", "numero": "65006", "entrada": "2026-07-15", "cliente": "Itauba Arquitetura E Construcoes Ltda", "endereco": "Niterói", "produto": "ESCADA DE PATAMAR", "vendedor": "TADEU", "tecnico": "ENILSON", "previsaoVisita": "2026-07-23", "dataVisita": "2026-07-23", "status": "✅ Concluído", "servicos": "SUPERVISÃO", "observacoes": null}, {"id": "r43", "numero": "64883", "entrada": "2026-07-15", "cliente": "Crescer Incorporadora e Construtora Spe 03 Ltda", "endereco": "Niterói", "produto": "PROTEÇÃO DE PERIFERIA", "vendedor": "GILBERTO", "tecnico": "ENILSON", "previsaoVisita": "2026-07-20", "dataVisita": "2026-07-20", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r44", "numero": "64865", "entrada": "2026-07-15", "cliente": "Odeteck Engenharia e Instalacoes Ltda", "endereco": "Higienópolis", "produto": "FACHADEIRO", "vendedor": "ROBERTA", "tecnico": "ENILSON", "previsaoVisita": "2026-07-12", "dataVisita": "2026-07-17", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": "VER SE VAI REALIZAR ORÇAMENTO"}, {"id": "r45", "numero": "64632", "entrada": "2026-07-16", "cliente": "Administradora de Bens Proprios Simpatia Ltda", "endereco": "Barra Olímpica", "produto": "APARALIXO / AND. SUSPENSO", "vendedor": "ANDRÉ MARQUES", "tecnico": "FELIPE", "previsaoVisita": "2026-07-23", "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": null}, {"id": "r46", "numero": "65030", "entrada": "2026-07-16", "cliente": "Gomes Xavier Engenharia Ltda", "endereco": "Duque de Caxias", "produto": "FACHADEIRO", "vendedor": "BIRA", "tecnico": "CLAUDIO", "previsaoVisita": "2026-07-17", "dataVisita": "2026-07-17", "status": "✅ Concluído", "servicos": "SUPERVISÃO", "observacoes": null}, {"id": "r47", "numero": "65023", "entrada": "2026-07-16", "cliente": "Browne Construtora Eireli", "endereco": "Barra da Tijuca", "produto": "APARALIXO / AND. SUSPENSO", "vendedor": "ANDRÉ MARQUES", "tecnico": "YANNIC", "previsaoVisita": "2026-07-20", "dataVisita": "2026-07-17", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r48", "numero": "65017", "entrada": "2026-07-16", "cliente": "Hmelo Engenharia, Consultoria e Construcao Civil Ltda", "endereco": "LAGOA", "produto": "ANDAIME. TUBULAR", "vendedor": "BIRA", "tecnico": "YANNIC", "previsaoVisita": "2026-07-17", "dataVisita": "2026-07-17", "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": null}, {"id": "r49", "numero": "65008", "entrada": "2026-07-16", "cliente": "Cyrela Monza Empreendimentos Imobiliarios Ltda", "endereco": "Jacarepaguá", "produto": "ANDAIME. TUBULAR", "vendedor": "BIRA", "tecnico": "YANNIC", "previsaoVisita": "2026-07-22", "dataVisita": "2026-07-22", "status": "✅ Concluído", "servicos": null, "observacoes": null}, {"id": "r50", "numero": "65003", "entrada": "2026-07-16", "cliente": "Rba 1486 Manutencao e Reformas de Obras Ltda-me", "endereco": "Flamengo", "produto": "FACHADEIRO", "vendedor": "ROBERTA", "tecnico": "JEFFERSON", "previsaoVisita": "2026-07-29", "dataVisita": "2026-07-29", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r51", "numero": "64995", "entrada": "2026-07-16", "cliente": "Spe Residentiel Jardin Di Grazielle. Ltda", "endereco": "Niterói", "produto": "FACHADEIRO", "vendedor": "BIRA", "tecnico": "ENILSON", "previsaoVisita": "2026-07-17", "dataVisita": "2026-07-17", "status": "✅ Concluído", "servicos": null, "observacoes": null}, {"id": "r52", "numero": "65011", "entrada": "2026-07-16", "cliente": "Retoq Construtora Rio Grande Ltda", "endereco": "Méier", "produto": "AND. SUPENSO", "vendedor": "GILBERTO", "tecnico": "MOISES", "previsaoVisita": "2026-07-17", "dataVisita": "2026-07-17", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": "TROCA PAINEL"}, {"id": "r53", "numero": "64987", "entrada": "2026-07-16", "cliente": "Consorcio de Construcao Be In Rio Arpoador", "endereco": "Copacabana", "produto": "AND. SUPENSO", "vendedor": null, "tecnico": "MOISES", "previsaoVisita": "2026-07-16", "dataVisita": "2026-07-16", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r54", "numero": "64954", "entrada": "2026-07-16", "cliente": "Braco Fort Engenharia e Construcao Ltda", "endereco": "RECREio dos Bandeirantes", "produto": "AND. SUPENSO", "vendedor": "DORALICE", "tecnico": "MOISES", "previsaoVisita": "2026-07-16", "dataVisita": "2026-07-16", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r55", "numero": "65013", "entrada": "2026-07-16", "cliente": "Gvm Engenharia e Construcoes Ltda", "endereco": "Niterói", "produto": "AND. SUPENSO", "vendedor": "ROBERTA", "tecnico": "FELIPE CORREA", "previsaoVisita": "2026-07-17", "dataVisita": "2026-07-17", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r56", "numero": "64985", "entrada": "2026-07-16", "cliente": "Spe Rio 2 Ltda", "endereco": "Jacarepaguá", "produto": "AND. SUPENSO", "vendedor": "ROBERTA", "tecnico": "FELIPE CORREA", "previsaoVisita": "2026-07-16", "dataVisita": "2026-07-16", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r57", "numero": "65019", "entrada": "2026-07-17", "cliente": "Armatis Solucoes em Engenharia Ltda", "endereco": "Flamengo", "produto": "AND. SUPENSO", "vendedor": "ROBERTA", "tecnico": "FELIPE CORREA", "previsaoVisita": "2026-07-17", "dataVisita": "2026-07-17", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r58", "numero": "65020", "entrada": "2026-07-17", "cliente": "Oito Comercio e Servicos de Engenharia, Arquitetura, Urbanismo e Paisagismo Ltda", "endereco": "Maracanã", "produto": "AND. SUPENSO", "vendedor": "TADEU", "tecnico": "FELIPE CORREA", "previsaoVisita": "2026-07-17", "dataVisita": "2026-07-17", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": "REGULAGEM FREIO"}, {"id": "r59", "numero": "64988", "entrada": "2026-07-17", "cliente": "Cyrela Jacarepagua Empreendimentos Imobiliarios Ltda", "endereco": "Jacarepaguá", "produto": "AND. SUPENSO", "vendedor": "BIRA", "tecnico": "FELIPE CORREA", "previsaoVisita": "2026-07-16", "dataVisita": "2026-07-16", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": "ENTREGA DE CABO E MANUTENÇÃO"}, {"id": "r60", "numero": "65038", "entrada": "2026-07-17", "cliente": "Grand Quartier 2 Empreendimentos Imobiliarios Spe Ltda", "endereco": "Jacarepaguá", "produto": "AND. SUPENSO", "vendedor": "ROBERTA", "tecnico": "DIMAS", "previsaoVisita": "2026-07-21", "dataVisita": "2026-07-21", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r61", "numero": "65048", "entrada": "2026-07-17", "cliente": "Retoq Construtora Rio Grande Ltda", "endereco": "MEIER", "produto": "AND. SUPENSO", "vendedor": "GILBERTO", "tecnico": "MOISES", "previsaoVisita": "2026-07-22", "dataVisita": "2026-07-22", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r62", "numero": "65051", "entrada": "2026-07-17", "cliente": "Br Solar Engenharia Ltda", "endereco": "Itaboraí", "produto": "FACHADEIRO", "vendedor": "ROBERTA", "tecnico": "ENILSON", "previsaoVisita": "2026-07-21", "dataVisita": "2026-07-21", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r63", "numero": "65067", "entrada": "2026-07-17", "cliente": "Domma Sao Goncalo Empreendimento Imobiliario Spe Ltda", "endereco": "SÃO GONÇALO", "produto": "ESCORAMENTO", "vendedor": "GILBERTO", "tecnico": "ENILSON", "previsaoVisita": "2026-07-21", "dataVisita": "2026-07-21", "status": "✅ Concluído", "servicos": "SUPERVISÃO", "observacoes": null}, {"id": "r64", "numero": "65063", "entrada": "2026-07-17", "cliente": "Consorcio Rua Gago Coutinho, 53 a 61", "endereco": "Laranjeiras", "produto": "FACHADEIRO", "vendedor": "ANDRÉ MARQUES", "tecnico": null, "previsaoVisita": "2026-07-21", "dataVisita": "2026-07-21", "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": "VISITA FEITA PLEO PROMOTOR"}, {"id": "r65", "numero": "65058", "entrada": "2026-07-20", "cliente": "Tangran Engenharia Ltda", "endereco": "COPAcabana", "produto": "AND. SUPENSO", "vendedor": "GILBERTO", "tecnico": "CLAUDIO", "previsaoVisita": "2026-07-21", "dataVisita": "2026-07-24", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r66", "numero": null, "entrada": "2026-07-20", "cliente": "JIRAU", "endereco": "PAVUNA", "produto": null, "vendedor": null, "tecnico": "MOISES", "previsaoVisita": "2026-07-21", "dataVisita": "2026-07-21", "status": "✅ Concluído", "servicos": "APOIO OPERACIONAL", "observacoes": "LEVAR MOTOR PARA ENROLAR"}, {"id": "r67", "numero": null, "entrada": "2026-07-20", "cliente": "JIRAU", "endereco": "PENHA", "produto": null, "vendedor": null, "tecnico": "MOISES", "previsaoVisita": "2026-07-21", "dataVisita": "2026-07-21", "status": "✅ Concluído", "servicos": "APOIO OPERACIONAL", "observacoes": "BUSCAR MATERIAL PARA O SETOR DE COMPRAS"}, {"id": "r68", "numero": "65053", "entrada": "2026-07-20", "cliente": "Spe Rio 2 Ltda", "endereco": "Jacarepaguá", "produto": "AND. SUPENSO", "vendedor": "ROBERTA", "tecnico": "FELIPE CORREA", "previsaoVisita": "2026-07-21", "dataVisita": "2026-07-21", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r69", "numero": "65075", "entrada": "2026-07-20", "cliente": "L Cardoso da Silva", "endereco": "São Conrado", "produto": "APARALIXO", "vendedor": "ROBERTA", "tecnico": "MOISES", "previsaoVisita": "2026-07-22", "dataVisita": "2026-07-22", "status": "✅ Concluído", "servicos": "RETIRADA", "observacoes": "RETIRADA DE PRANCHAS"}, {"id": "r70", "numero": "65074", "entrada": "2026-07-20", "cliente": "L Cardoso da Silva", "endereco": "São Conrado", "produto": "APARALIXO", "vendedor": "ROBERTA", "tecnico": "CLAUDIO", "previsaoVisita": "2026-07-22", "dataVisita": "2026-07-22", "status": "✅ Concluído", "servicos": "RETIRADA", "observacoes": "RETIRADA DE PRANCHAS"}, {"id": "r71", "numero": "65073", "entrada": "2026-07-20", "cliente": "Cores da Tijuca Spe Ltda", "endereco": "Tijuca", "produto": "AND. SUPENSO", "vendedor": "ROBERTA", "tecnico": "FELIPE CORREA", "previsaoVisita": "2026-07-22", "dataVisita": "2026-07-23", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r72", "numero": "65072", "entrada": "2026-07-20", "cliente": "Vitale V16 Empreendimentos Imobiliarios Ltda", "endereco": "Freguesia (Jacarepaguá)", "produto": "AND. SUPENSO", "vendedor": "GILBERTO", "tecnico": "MOISES", "previsaoVisita": "2026-07-22", "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": "CANCELADO"}, {"id": "r73", "numero": "65071", "entrada": "2026-07-20", "cliente": "Lifat Servicos de Reformas em Engenharia Ltda", "endereco": "Jardim Botânico", "produto": "FACHADEIRO", "vendedor": "ANDRÉ MARQUES", "tecnico": "JEFFERSON", "previsaoVisita": "2026-07-24", "dataVisita": "2026-07-24", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r74", "numero": "65070", "entrada": "2026-07-20", "cliente": "Ccisa131 Incorporadora Ltda.", "endereco": "Santo Cristo", "produto": "AND. SUPENSO", "vendedor": "ANDRÉ MARQUES", "tecnico": "FELIPE CORREA", "previsaoVisita": "2026-07-22", "dataVisita": "2026-07-22", "status": "✅ Concluído", "servicos": null, "observacoes": null}, {"id": "r75", "numero": "65069", "entrada": "2026-07-20", "cliente": "Cdi Empreendimento Imobiliario Ltda", "endereco": "Botafogo", "produto": "ESCORAMENTO", "vendedor": "ROBERTA", "tecnico": "YANNIC", "previsaoVisita": "2026-07-22", "dataVisita": "2026-07-22", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r76", "numero": "65065", "entrada": "2026-07-20", "cliente": "Spe Residentiel Jardin Di Grazielle. Ltda", "endereco": "niterói", "produto": "FACHADEIRO", "vendedor": "TADEU", "tecnico": "ENILSON", "previsaoVisita": "2026-07-20", "dataVisita": "2026-07-20", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r77", "numero": "65061", "entrada": "2026-07-20", "cliente": "Acqua Total Projetos de Engenharia Ltda - Epp", "endereco": "São Cristóvão", "produto": "FACHADEIRO", "vendedor": "BIRA", "tecnico": "YANNIC", "previsaoVisita": "2026-07-21", "dataVisita": "2026-07-21", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r78", "numero": "65098", "entrada": "2026-07-20", "cliente": "Igreja Batista Atitude Nova Iguacu", "endereco": "Nova Iguaçu", "produto": "FACHADEIRO", "vendedor": "GILBERTO", "tecnico": "CLAUDIO", "previsaoVisita": "2026-07-23", "dataVisita": "2026-07-23", "status": "✅ Concluído", "servicos": "ENTREGA", "observacoes": "ENTREGA DE ESCADA DE ALÇAPÃO, PISO, BRAÇADEIRA"}, {"id": "r79", "numero": "65099", "entrada": "2026-07-20", "cliente": "Domma Sao Goncalo Empreendimento Imobiliario Spe Ltda", "endereco": "SÃO GONÇALO", "produto": "ESCORAMENTO", "vendedor": "GILBERTO", "tecnico": "ENILSON", "previsaoVisita": "2026-07-23", "dataVisita": "2026-07-23", "status": "✅ Concluído", "servicos": "SUPERVISÃO", "observacoes": null}, {"id": "r80", "numero": "65100", "entrada": "2026-07-21", "cliente": "Spe Residentiel Jardin Di Grazielle. Ltda", "endereco": "Niterói", "produto": "ESCORAMENTO", "vendedor": "TADEU", "tecnico": "ENILSON", "previsaoVisita": "2026-07-23", "dataVisita": "2026-07-23", "status": "✅ Concluído", "servicos": "SUPERVISÃO", "observacoes": null}, {"id": "r81", "numero": "65101", "entrada": "2026-07-21", "cliente": "Refit Engenharia Ltda - Epp", "endereco": "Flamengo", "produto": "APARALIXO", "vendedor": "ROBERTA", "tecnico": "MOISES", "previsaoVisita": "2026-07-23", "dataVisita": "2026-07-23", "status": "✅ Concluído", "servicos": "RETIRADA", "observacoes": null}, {"id": "r82", "numero": "65105", "entrada": "2026-07-21", "cliente": "Spe Rio 2 Ltda", "endereco": "Jacarepaguá", "produto": "AND. SUPENSO", "vendedor": "ROBERTA", "tecnico": "FELIPE CORREA", "previsaoVisita": "2026-07-23", "dataVisita": "2026-07-28", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r83", "numero": "65103", "entrada": "2026-07-21", "cliente": "Condominio Downtown", "endereco": "Barra da Tijuca", "produto": "ANDAIME. TUBULAR", "vendedor": null, "tecnico": "JEFFERSON", "previsaoVisita": "2026-07-24", "dataVisita": "2026-07-24", "status": "✅ Concluído", "servicos": "RETIRADA", "observacoes": null}, {"id": "r84", "numero": "64852", "entrada": "2026-07-21", "cliente": "Borges & Gomes Engenharia, Consultoria e Solucoes Tecnicas Ltda", "endereco": "Centro", "produto": "APARALIXO", "vendedor": "DORALICE", "tecnico": "CLAUDIO", "previsaoVisita": "2026-07-21", "dataVisita": "2026-07-21", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r85", "numero": "65121", "entrada": "2026-07-21", "cliente": "Mta Engenharia Ltda", "endereco": "Volta Redonda", "produto": "FACHADEIRO", "vendedor": "ROBERTA", "tecnico": "CLAUDIO", "previsaoVisita": "2026-07-23", "dataVisita": "2026-07-27", "status": "✅ Concluído", "servicos": "SUPERVISÃO", "observacoes": null}, {"id": "r86", "numero": "65119", "entrada": "2026-07-21", "cliente": "Midas Engenharia Ltda", "endereco": "Lagoa", "produto": "FACHADEIRO", "vendedor": "BIRA", "tecnico": "YANNIC", "previsaoVisita": "2026-07-24", "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": null}, {"id": "r87", "numero": "65115", "entrada": "2026-07-21", "cliente": "Targa Engenharia Ltda", "endereco": "Mangaratiba", "produto": "ESCORAMENTO", "vendedor": "DORALICE", "tecnico": null, "previsaoVisita": "2026-07-23", "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": null}, {"id": "r88", "numero": "65113", "entrada": "2026-07-21", "cliente": "Sao Sebastiao do Rio de Janeiro Administracao de Restaurantes S/a", "endereco": "Copacabana", "produto": "FACHADEIRO", "vendedor": "TADEU", "tecnico": "JEFFERSON", "previsaoVisita": "2026-07-29", "dataVisita": "2026-07-29", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r89", "numero": "65112", "entrada": "2026-07-21", "cliente": "Armatis Solucoes em Engenharia Ltda", "endereco": "Flamengo", "produto": "AND. SUPENSO", "vendedor": "ROBERTA", "tecnico": "JEFFERSON", "previsaoVisita": "2026-07-23", "dataVisita": "2026-07-23", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r90", "numero": "65111", "entrada": "2026-07-21", "cliente": "Conjunto Arquitetonico Aventura Center", "endereco": "Barra da Tijuca", "produto": "fachadeiro / aparalixo", "vendedor": "TADEU", "tecnico": "CLAUDIO", "previsaoVisita": "2026-07-29", "dataVisita": "2026-07-29", "status": "✅ Concluído", "servicos": null, "observacoes": null}, {"id": "r91", "numero": "65109", "entrada": "2026-07-23", "cliente": "Crescer Incorporadora e Construtora Spe 03 Ltda", "endereco": "Niterói", "produto": "ESCORAMENTO", "vendedor": "TADEU", "tecnico": null, "previsaoVisita": null, "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": null}, {"id": "r92", "numero": "65104", "entrada": "2026-07-23", "cliente": "Gomes Xavier Engenharia Ltda", "endereco": "Duque de Caxias", "produto": "FACHADEIRO", "vendedor": "BIRA", "tecnico": "DIMAS", "previsaoVisita": "2026-07-31", "dataVisita": "2026-08-05", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r93", "numero": "65120", "entrada": "2026-07-22", "cliente": "Agabo Comercio e Servicos Ltda", "endereco": "Belford Roxo", "produto": "CADEIRINHA", "vendedor": "BIRA", "tecnico": "YANNIC", "previsaoVisita": "2026-07-24", "dataVisita": "2026-07-24", "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": null}, {"id": "r94", "numero": "65028", "entrada": "2026-07-22", "cliente": "Condominio do Edificio Barata Ribeiro", "endereco": "Copacabana", "produto": "APARALIXO", "vendedor": "ROBERTA", "tecnico": "ENILSON", "previsaoVisita": "2026-07-23", "dataVisita": "2026-07-23", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r95", "numero": "p", "entrada": "2026-07-23", "cliente": "Visulog Logistica e Servicos Ltda", "endereco": "Copacabana", "produto": "AND. SUPENSO", "vendedor": "ROBERTA", "tecnico": "JEFFERSON", "previsaoVisita": "2026-07-30", "dataVisita": "2026-07-30", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r96", "numero": "62729", "entrada": "2026-07-22", "cliente": "Primus Construtora Nf Ltda", "endereco": "Nova Friburgo", "produto": "AND. SUPENSO", "vendedor": "TADEU", "tecnico": "CLAUDIO", "previsaoVisita": "2026-07-24", "dataVisita": "2026-07-27", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r97", "numero": "65132", "entrada": "2026-07-24", "cliente": "Comendador Pinto Empreendimento Imobiliario Spe Ltda", "endereco": "Freguesia", "produto": "AND. SUPENSO", "vendedor": "BIRA", "tecnico": "MOISES", "previsaoVisita": "2026-08-03", "dataVisita": "2026-08-03", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": "CLIENTE PEDE TROCA DE 7 GUINCHOS COM DEFEITO."}, {"id": "r98", "numero": "65131", "entrada": "2026-07-24", "cliente": "Eolica Engenharia Ltda", "endereco": "Mangueira", "produto": "AND. SUPENSO", "vendedor": "BIRA", "tecnico": "YANNIC", "previsaoVisita": "2026-07-24", "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": null}, {"id": "r99", "numero": "65130", "entrada": "2026-07-22", "cliente": "Eolica Engenharia Ltda", "endereco": "Mangueira", "produto": "AND. SUPENSO", "vendedor": "BIRA", "tecnico": "FELIPE CORREA", "previsaoVisita": "2026-07-30", "dataVisita": "2026-07-30", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": "CLIENTE PEDE A TROCA URGENTE DE 7 GUINCHO MANUAL ( ESTÁ DESLIZANDO, DESCENDO SEM COMANDO )"}, {"id": "r100", "numero": "65135", "entrada": "2026-07-24", "cliente": "L Cardoso da Silva", "endereco": "São Conrado", "produto": "APARALIXO", "vendedor": "ROBERTA", "tecnico": "MOISES", "previsaoVisita": "2026-07-24", "dataVisita": "2026-07-24", "status": "✅ Concluído", "servicos": "RETIRADA", "observacoes": null}, {"id": "r101", "numero": "65129", "entrada": "2026-07-24", "cliente": "Fgl Engenharia Ltda", "endereco": "Niterói", "produto": "APARALIXO", "vendedor": "ROBERTA", "tecnico": "ENILSON", "previsaoVisita": "2026-07-24", "dataVisita": "2026-07-24", "status": "✅ Concluído", "servicos": "SUPERVISÃO", "observacoes": null}, {"id": "r102", "numero": "65128", "entrada": "2026-07-24", "cliente": "Fgl Engenharia Ltda", "endereco": "Niterói", "produto": "APARALIXO", "vendedor": "ROBERTA", "tecnico": "ENILSON", "previsaoVisita": "2026-07-24", "dataVisita": "2026-07-24", "status": "✅ Concluído", "servicos": "SUPERVISÃO", "observacoes": null}, {"id": "r103", "numero": "65127", "entrada": "2026-07-24", "cliente": "Kea Engenharia e Arquitetura Ltda", "endereco": "Niterói", "produto": "APARALIXO", "vendedor": "ROBERTA", "tecnico": "ENILSON", "previsaoVisita": "2026-07-24", "dataVisita": "2026-07-24", "status": "✅ Concluído", "servicos": null, "observacoes": null}, {"id": "r104", "numero": "65126", "entrada": "2026-07-24", "cliente": "Planoenge Engenharia Ltda", "endereco": "Duque de Caxias", "produto": "AND. SUPENSO", "vendedor": "DORALICE", "tecnico": "MOISES", "previsaoVisita": "2026-07-24", "dataVisita": "2026-07-24", "status": "✅ Concluído", "servicos": "RETIRADA", "observacoes": "RETIRADA  ANDAIME SUSPENSO"}, {"id": "r105", "numero": null, "entrada": "2026-07-24", "cliente": "OBRAMAX", "endereco": "BENFICA", "produto": null, "vendedor": null, "tecnico": "JEFFERSON", "previsaoVisita": "2026-07-24", "dataVisita": "2026-07-24", "status": "✅ Concluído", "servicos": "APOIO OPERACIONAL", "observacoes": "PESQUISA DE PREÇO COM RONALDO"}, {"id": "r106", "numero": null, "entrada": "2026-07-24", "cliente": "MERCADO ASSAI", "endereco": "SÃO CRISTOVÃO", "produto": null, "vendedor": null, "tecnico": "JEFFERSON", "previsaoVisita": "2026-07-24", "dataVisita": "2026-07-24", "status": "✅ Concluído", "servicos": "APOIO OPERACIONAL", "observacoes": "PESQUISA DE PREÇO COM RONALDO"}, {"id": "r107", "numero": "65108", "entrada": "2026-07-24", "cliente": "Dibrama - Administracao de Bens e Participacoes Ltda", "endereco": "Centro", "produto": "APARALIXO", "vendedor": "ROBERTA", "tecnico": "ENILSON", "previsaoVisita": "2026-07-27", "dataVisita": "2026-07-27", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r108", "numero": "65118", "entrada": "2026-07-23", "cliente": "Cdi Empreendimento Imobiliario Ltda", "endereco": "Botafogo", "produto": "ESCORAMENTO", "vendedor": "ROBERTA", "tecnico": "PEDRO", "previsaoVisita": "2026-07-24", "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": null}, {"id": "r109", "numero": "65125", "entrada": "2026-07-24", "cliente": "Ccisa131 Incorporadora Ltda.", "endereco": "Centro", "produto": "AND. SUPENSO", "vendedor": "ANDRÉ MARQUES", "tecnico": "FELIPE CORREA", "previsaoVisita": "2026-07-24", "dataVisita": "2026-07-24", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r110", "numero": "65076", "entrada": "2026-07-23", "cliente": "Construtora Fernandes Maciel Ltda", "endereco": "Niterói", "produto": "ESCORAMENTO", "vendedor": "BIRA", "tecnico": "FELIPE", "previsaoVisita": "2026-07-24", "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": null}, {"id": "r111", "numero": "65078", "entrada": "2026-07-23", "cliente": "Acqua Total Projetos de Engenharia Ltda - Epp", "endereco": "Tijuca", "produto": "FACHADEIRO", "vendedor": "DORALICE", "tecnico": "ENILSON", "previsaoVisita": "2026-07-27", "dataVisita": "2026-07-27", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r112", "numero": "65084", "entrada": "2026-07-23", "cliente": "Sig Engenharia E Construcao Ltda", "endereco": "Copacabana", "produto": "ESCORAMENTO", "vendedor": "BIRA", "tecnico": "FELIPE", "previsaoVisita": "2026-07-24", "dataVisita": "2026-07-24", "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": null}, {"id": "r113", "numero": "65092", "entrada": "2026-07-23", "cliente": "Solartec Energia Sustentavel Ltda", "endereco": "Realengo", "produto": "ESCADA DE PATAMAR", "vendedor": "DORALICE", "tecnico": "CLAUDIO", "previsaoVisita": "2026-07-31", "dataVisita": "2026-08-03", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r114", "numero": "65094", "entrada": "2026-07-23", "cliente": "Clube Naval", "endereco": "lagoa", "produto": "ANDAIME. TUBULAR", "vendedor": "ROBERTA", "tecnico": "JEFFERSON", "previsaoVisita": "2026-07-27", "dataVisita": "2026-07-30", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r115", "numero": "65096", "entrada": "2026-07-23", "cliente": "Antunes e Freitas Engenharia, Reformas & Manutencao - ME", "endereco": "Copacabana", "produto": "AND. SUPENSO", "vendedor": "ROBERTA", "tecnico": "JEFFERSON", "previsaoVisita": "2026-07-28", "dataVisita": "2026-07-28", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r116", "numero": "64932", "entrada": "2026-07-23", "cliente": "Dimensional Engenharia Ltda", "endereco": "Centro", "produto": "FACHADEIRO", "vendedor": "BIRA", "tecnico": "YANNIC", "previsaoVisita": "2026-07-24", "dataVisita": "2026-07-24", "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": "acerto de fatura"}, {"id": "r117", "numero": "65039", "entrada": "2026-07-23", "cliente": "Vitale V16 Empreendimentos Imobiliarios Ltda", "endereco": "freguesia", "produto": "CADEIRINHA", "vendedor": "GILBERTO", "tecnico": "FELIPE", "previsaoVisita": "2026-07-23", "dataVisita": "2026-07-23", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r118", "numero": "65043", "entrada": "2026-07-23", "cliente": "Retoq Construtora Rio Grande Ltda", "endereco": "MEIER", "produto": "AND. SUPENSO", "vendedor": "GILBERTO", "tecnico": null, "previsaoVisita": null, "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": "CANCELADA"}, {"id": "r119", "numero": "65049", "entrada": "2026-07-23", "cliente": "Fercon Engenharia e Comercio Ltda", "endereco": "Copacabana", "produto": "APARALIXO", "vendedor": "GILBERTO", "tecnico": "JEFFERSON", "previsaoVisita": "2026-07-28", "dataVisita": "2026-07-28", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r120", "numero": "65139", "entrada": "2026-07-24", "cliente": "Associacao Patio do Lido", "endereco": "Copacabana", "produto": "ESCORAMENTO", "vendedor": "BIRA", "tecnico": null, "previsaoVisita": "2026-07-24", "dataVisita": "2026-07-24", "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": "nosso material não atendia"}, {"id": "r121", "numero": "65141", "entrada": "2026-07-24", "cliente": "Reunidas Sudeste Engenharia Ltda", "endereco": "Andaraí", "produto": "FACHADEIRO", "vendedor": "DORALICE", "tecnico": "ENILSON", "previsaoVisita": "2026-07-27", "dataVisita": "2026-07-27", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r122", "numero": "65154", "entrada": "2026-07-27", "cliente": "Condominio do Edificio Ana Angelica", "endereco": "Vila Isabel", "produto": "FACHADEIRO / APARALIXO", "vendedor": "DORALICE", "tecnico": "ENILSON", "previsaoVisita": "2026-07-27", "dataVisita": "2026-07-27", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r123", "numero": "65151", "entrada": "2026-07-27", "cliente": "Tangran Engenharia Ltda", "endereco": "Copacabana", "produto": "AND. SUPENSO", "vendedor": "GILBERTO", "tecnico": "MOISES", "previsaoVisita": "2026-07-27", "dataVisita": "2026-07-27", "status": "✅ Concluído", "servicos": "ENTREGA", "observacoes": "LEVAR CAVALETE "}, {"id": "r124", "numero": "65150", "entrada": "2026-07-27", "cliente": "F Mac Engenharia Ltda", "endereco": "Copacabana", "produto": "AND. SUPENSO", "vendedor": "ROBERTA", "tecnico": "MOISES", "previsaoVisita": "2026-07-28", "dataVisita": "2026-07-29", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r125", "numero": "65146", "entrada": "2026-07-27", "cliente": "Azenha Engenharia Civil e Ambiental Ltda", "endereco": "Copacabana", "produto": "AND. SUPENSO", "vendedor": "ROBERTA", "tecnico": "MOISES", "previsaoVisita": "2026-07-27", "dataVisita": "2026-07-27", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r126", "numero": "65145", "entrada": "2026-07-27", "cliente": "Cejota Reformas E Revestimentos Ltda - Me", "endereco": "Tijuca", "produto": "AND. SUPENSO", "vendedor": "TADEU", "tecnico": "MOISES", "previsaoVisita": "2026-07-28", "dataVisita": "2026-07-28", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r127", "numero": "65144", "entrada": "2026-07-27", "cliente": "Wpx Empreendimentos Imobiliarios Ltda", "endereco": "Ipanema", "produto": "APARALIXO", "vendedor": "ROBERTA", "tecnico": "JEFFERSON", "previsaoVisita": "2026-07-28", "dataVisita": "2026-07-28", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r128", "numero": "65148", "entrada": "2026-07-27", "cliente": "Retoq Construtora Rio Grande Ltda", "endereco": "Barra da Tijuca", "produto": "AND. SUPENSO", "vendedor": "GILBERTO", "tecnico": "FELIPE CORREA", "previsaoVisita": "2026-07-27", "dataVisita": "2026-07-27", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r129", "numero": "65147", "entrada": "2026-07-27", "cliente": "Retoq Construtora Rio Grande Ltda", "endereco": "Méier", "produto": "AND. SUPENSO", "vendedor": "GILBERTO", "tecnico": "FELIPE CORREA", "previsaoVisita": "2026-07-27", "dataVisita": "2026-07-27", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r130", "numero": "65168", "entrada": "2026-07-28", "cliente": "Cores da Tijuca Spe Ltda", "endereco": "Tijuca", "produto": "AND. SUPENSO", "vendedor": "ROBERTA", "tecnico": "FELIPE", "previsaoVisita": "2026-07-28", "dataVisita": "2026-07-28", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r131", "numero": "65167", "entrada": "2026-07-28", "cliente": "Realiza Reformas e Edificacoes Ltda", "endereco": "Santo Cristo", "produto": "AND. SUPENSO", "vendedor": "ANDRÉ MARQUES", "tecnico": "FELIPE", "previsaoVisita": "2026-07-28", "dataVisita": "2026-07-28", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r132", "numero": "65166", "entrada": "2026-07-28", "cliente": "Fgl Engenharia Ltda", "endereco": "Niterói", "produto": "APARALIXO", "vendedor": "ROBERTA", "tecnico": "ENILSON", "previsaoVisita": "2026-07-28", "dataVisita": "2026-07-28", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": "DESMONTAGEM APARALIXO"}, {"id": "r133", "numero": "65165", "entrada": "2026-07-28", "cliente": "Prourb Engenharia Eireli", "endereco": "São Gonçalo", "produto": "AND. SUPENSO", "vendedor": "BIRA", "tecnico": "ENILSON", "previsaoVisita": "2026-07-28", "dataVisita": "2026-07-28", "status": "✅ Concluído", "servicos": "ENTREGA", "observacoes": null}, {"id": "r134", "numero": "65163", "entrada": "2026-07-28", "cliente": "Itauba Arquitetura E Construcoes Ltda", "endereco": "Niterói", "produto": "ESCADA DE PATAMAR", "vendedor": "TADEU", "tecnico": "ENILSON", "previsaoVisita": "2026-07-28", "dataVisita": "2026-07-28", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r135", "numero": "65162", "entrada": "2026-07-28", "cliente": "QUALIFORMAS CONSTRUCOES E REFORMAS LTDA", "endereco": "Niterói", "produto": "ESCORAMENTO", "vendedor": "TADEU", "tecnico": "ENILSON", "previsaoVisita": "2026-07-28", "dataVisita": "2026-07-28", "status": "✅ Concluído", "servicos": "SUPERVISÃO", "observacoes": null}, {"id": "r136", "numero": null, "entrada": "2026-07-28", "cliente": null, "endereco": "Irajá", "produto": null, "vendedor": null, "tecnico": "DIMAS", "previsaoVisita": "2026-07-28", "dataVisita": "2026-07-28", "status": "✅ Concluído", "servicos": "APOIO OPERACIONAL", "observacoes": "VER JANELA"}, {"id": "r137", "numero": null, "entrada": "2026-07-28", "cliente": "OBRAMAX", "endereco": "BENFICA", "produto": null, "vendedor": null, "tecnico": "DIMAS", "previsaoVisita": "2026-07-28", "dataVisita": "2026-07-28", "status": "✅ Concluído", "servicos": "APOIO OPERACIONAL", "observacoes": null}, {"id": "r138", "numero": "65170", "entrada": "2026-07-28", "cliente": "Ccisa35 Incorporadora Ltda", "endereco": "São Cristóvão", "produto": "ESCORAMENTO", "vendedor": "ANDRÉ MARQUES", "tecnico": "FELIPE", "previsaoVisita": "2026-07-28", "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": null}, {"id": "r139", "numero": "65161", "entrada": "2026-07-28", "cliente": "Cf Construcao Arquitetura e Engenharia Ltda", "endereco": "Leblon", "produto": "FACHADEIRO", "vendedor": "ROBERTA", "tecnico": "JEFFERSON", "previsaoVisita": "2026-07-28", "dataVisita": "2026-07-29", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r140", "numero": "65178", "entrada": "2026-06-24", "cliente": "Cyrela Lotus Empreendimentos Imobiliarios Ltda", "endereco": "Curicica", "produto": "AND. SUPENSO", "vendedor": "BIRA", "tecnico": "FELIPE", "previsaoVisita": "2026-07-24", "dataVisita": "2026-07-24", "status": "✅ Concluído", "servicos": "SUPERVISÃO", "observacoes": null}, {"id": "r141", "numero": "65207", "entrada": "2026-07-30", "cliente": "Reunidas Sudeste Engenharia Ltda", "endereco": "Andaraí", "produto": "FACHADEIRO", "vendedor": "DORALICE", "tecnico": "YANNIC", "previsaoVisita": "2026-07-30", "dataVisita": "2026-07-31", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r142", "numero": "65206", "entrada": "2026-07-30", "cliente": "Grafo Engenharia Ltda - Epp", "endereco": "Lagoa", "produto": "APARALIXO", "vendedor": "ROBERTA", "tecnico": "CLAUDIO", "previsaoVisita": "2026-07-30", "dataVisita": "2026-07-30", "status": "✅ Concluído", "servicos": "SUPERVISÃO", "observacoes": null}, {"id": "r143", "numero": "65204", "entrada": "2026-07-30", "cliente": "Cyrela Lotus Empreendimentos Imobiliarios Ltda", "endereco": "Curicica", "produto": "AND. SUPENSO", "vendedor": "BIRA", "tecnico": "MOISES", "previsaoVisita": "2026-07-30", "dataVisita": "2026-07-30", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r144", "numero": "65199", "entrada": "2026-07-29", "cliente": "Vivacom Comercio e Servicos Ltda", "endereco": "Saúde", "produto": "FACHADEIRO", "vendedor": "BIRA", "tecnico": "YANNIC", "previsaoVisita": "2026-07-30", "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": "Levatamento feito pelo promotor"}, {"id": "r145", "numero": "65196", "entrada": "2026-07-29", "cliente": "Condominio Barra Mais", "endereco": "Barra Olímpica", "produto": "FACHADEIRO", "vendedor": "ANDRÉ MARQUES", "tecnico": "DIMAS", "previsaoVisita": "2026-07-31", "dataVisita": "2026-07-31", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r146", "numero": "65195", "entrada": "2026-07-30", "cliente": "Big Gas Transportes e Distribuidora de Gas Sa", "endereco": "Duque de Caxias", "produto": "FACHADEIRO", "vendedor": "ROBERTA", "tecnico": "JEFFERSON", "previsaoVisita": "2026-07-31", "dataVisita": "2026-07-31", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r147", "numero": "65194", "entrada": "2026-07-29", "cliente": "Construpower Engenharia Ltda", "endereco": "Jardim Botânico", "produto": "FACHADEIRO", "vendedor": "ROBERTA", "tecnico": "DIMAS", "previsaoVisita": "2026-07-31", "dataVisita": "2026-07-31", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r148", "numero": "65215", "entrada": "2026-07-30", "cliente": "Refit Engenharia Ltda - Epp", "endereco": "Flamengo", "produto": "APARALIXO", "vendedor": "ROBERTA", "tecnico": "MOISES", "previsaoVisita": "2026-07-29", "dataVisita": "2026-07-29", "status": "✅ Concluído", "servicos": "RETIRADA", "observacoes": null}, {"id": "r149", "numero": "65190", "entrada": "2026-07-29", "cliente": "Spe Rio 2 Ltda", "endereco": "Jacarepaguá", "produto": "AND. SUPENSO", "vendedor": "ROBERTA", "tecnico": "FELIPE CORREA", "previsaoVisita": "2026-07-29", "dataVisita": "2026-07-29", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r150", "numero": "65189", "entrada": "2026-07-29", "cliente": "Armatis Solucoes em Engenharia Ltda", "endereco": "Flamengo", "produto": "AND. SUPENSO", "vendedor": "ROBERTA", "tecnico": "MOISES", "previsaoVisita": "2026-07-29", "dataVisita": "2026-07-29", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": "TROCAR 3 ROLDANAS"}, {"id": "r151", "numero": "65188", "entrada": "2026-07-29", "cliente": "Ritz Administracao Hoteleira Ltda", "endereco": "Copacabana", "produto": "AND. SUPENSO", "vendedor": "TADEU", "tecnico": "MOISES", "previsaoVisita": "2026-07-29", "dataVisita": "2026-07-29", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r152", "numero": "65157", "entrada": "2026-07-29", "cliente": "Dm Rio Construcoes Eireli", "endereco": "Barra da Tijuca", "produto": "ESCORAMENTO", "vendedor": "DORALICE", "tecnico": "FELIPE", "previsaoVisita": "2026-07-31", "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": null}, {"id": "r153", "numero": "65158", "entrada": "2026-07-27", "cliente": "Engedaquer Engenharia, Consultoria e Construcao Civil Ltda", "endereco": "Copacabana", "produto": "FACHADEIRO", "vendedor": "BIRA", "tecnico": "JEFFERSON", "previsaoVisita": "2026-07-29", "dataVisita": "2026-07-30", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r154", "numero": "65172", "entrada": "2026-07-28", "cliente": "Artpolo Prestadora de Servicos Ltda", "endereco": "Leme", "produto": "FACHADEIRO", "vendedor": "GILBERTO", "tecnico": "JEFFERSON", "previsaoVisita": "2026-07-29", "dataVisita": "2026-07-29", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r155", "numero": "65184", "entrada": "2026-07-29", "cliente": "I2mbr Consultoria Ltda", "endereco": "Niterói", "produto": "ESCORAMENTO", "vendedor": "DORALICE", "tecnico": "ENILSON", "previsaoVisita": "2026-08-03", "dataVisita": "2026-08-04", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r156", "numero": "65185", "entrada": "2026-07-29", "cliente": "Tecbra Construcoes e Servicos Ltda", "endereco": "Barra da Tijuca", "produto": "AND. SUPENSO", "vendedor": "TADEU", "tecnico": "DIMAS", "previsaoVisita": "2026-07-30", "dataVisita": "2026-07-31", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r157", "numero": "65187", "entrada": "2026-07-29", "cliente": "Construpower Engenharia Ltda", "endereco": "São Caetano do Sul / SP", "produto": "ANDAIME. TUBULAR", "vendedor": "ANDRÉ MARQUES", "tecnico": "YANNIC", "previsaoVisita": "2026-07-29", "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": "LEVANTAMENTO FEITO PELO PROMOTOR"}, {"id": "r158", "numero": "65177", "entrada": "2026-07-28", "cliente": "Retrofit Engenharia de Servicos Ltda", "endereco": "Centro", "produto": "FACHADEIRO", "vendedor": "ANDRÉ MARQUES", "tecnico": "ENILSON", "previsaoVisita": "2026-07-29", "dataVisita": "2026-07-29", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r159", "numero": "65035", "entrada": "2026-07-24", "cliente": "Estado do Rio de Janeiro", "endereco": "Centro", "produto": "ANDAIME. TUBULAR", "vendedor": "ROBERTA", "tecnico": "ENILSON", "previsaoVisita": "2026-07-29", "dataVisita": "2026-07-29", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r160", "numero": null, "entrada": "2026-07-29", "cliente": null, "endereco": "BONSUCESSO", "produto": null, "vendedor": null, "tecnico": "ENILSON", "previsaoVisita": "2026-07-29", "dataVisita": "2026-07-29", "status": "✅ Concluído", "servicos": "APOIO OPERACIONAL", "observacoes": "BUSCAR PARAFUSO"}, {"id": "r161", "numero": "65202", "entrada": "2026-07-29", "cliente": "V & T Investimentos e Participacoes S/a", "endereco": "Barra da Tijuca", "produto": "APARALIXO", "vendedor": "TADEU", "tecnico": "CLAUDIO", "previsaoVisita": "2026-07-29", "dataVisita": "2026-07-29", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r162", "numero": "65227", "entrada": "2026-07-30", "cliente": "Crescer Incorporadora e Construtora Spe 03 Ltda", "endereco": "Niterói", "produto": "ESCORAMENTO", "vendedor": "TADEU", "tecnico": "ENILSON", "previsaoVisita": "2026-07-30", "dataVisita": "2026-07-30", "status": "✅ Concluído", "servicos": "SUPERVISÃO", "observacoes": null}, {"id": "r163", "numero": "65226", "entrada": "2026-07-30", "cliente": "Feliciano Sodre Empreendimento Imobiliario Spe Ltda. (rj0009)", "endereco": "Niterói", "produto": "ESCORAMENTO", "vendedor": "TADEU", "tecnico": "ENILSON", "previsaoVisita": "2026-07-30", "dataVisita": "2026-07-30", "status": "✅ Concluído", "servicos": "SUPERVISÃO", "observacoes": null}, {"id": "r164", "numero": "65213", "entrada": "2026-07-30", "cliente": "G5 Empreendimentos Imobiliarios Ltda", "endereco": "Rio das Ostras", "produto": "ESCORAMENTO", "vendedor": "BIRA", "tecnico": "FELIPE", "previsaoVisita": "2026-07-30", "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": null}, {"id": "r165", "numero": "65212", "entrada": "2026-07-30", "cliente": "Pentagono Engenharia Ltda", "endereco": "Barra da Tijuca", "produto": "ESCORAMENTO", "vendedor": "ANDRÉ MARQUES", "tecnico": "PEDRO", "previsaoVisita": "2026-07-30", "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": null}, {"id": "r166", "numero": "65228", "entrada": "2026-07-30", "cliente": "Azenha Engenharia Civil e Ambiental Ltda", "endereco": "Copacabana", "produto": "AND. SUPENSO", "vendedor": "GILBERTO", "tecnico": "FELIPE CORREA", "previsaoVisita": "2026-07-30", "dataVisita": "2026-07-30", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r167", "numero": "65230", "entrada": "2026-07-31", "cliente": "Planoenge Engenharia Ltda", "endereco": "Duque de Caxias", "produto": "AND. SUPENSO", "vendedor": "DORALICE", "tecnico": "JEFFERSON", "previsaoVisita": "2026-07-31", "dataVisita": "2026-07-31", "status": "✅ Concluído", "servicos": "RETIRADA", "observacoes": null}, {"id": "r168", "numero": "65231", "entrada": "2026-07-31", "cliente": "Spe Rio 2 Ltda", "endereco": "Jacarepaguá", "produto": "AND. SUPENSO", "vendedor": "ROBERTA", "tecnico": "FELIPE", "previsaoVisita": "2026-07-31", "dataVisita": "2026-07-31", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r169", "numero": "65232", "entrada": "2026-07-31", "cliente": "Fgl Engenharia Ltda", "endereco": "niterói", "produto": "APARALIXO", "vendedor": "ROBERTA", "tecnico": "ENILSON", "previsaoVisita": "2026-07-31", "dataVisita": "2026-08-10", "status": "✅ Concluído", "servicos": "RETIRADA", "observacoes": null}, {"id": "r170", "numero": null, "entrada": "2026-07-31", "cliente": null, "endereco": "SÃO CRISTOVÃO", "produto": null, "vendedor": null, "tecnico": "MOISES", "previsaoVisita": "2026-07-31", "dataVisita": "2026-07-31", "status": "✅ Concluído", "servicos": "APOIO OPERACIONAL", "observacoes": "Levar basculante para o Ronaldo"}, {"id": "r171", "numero": null, "entrada": "2026-07-31", "cliente": null, "endereco": "Acari", "produto": null, "vendedor": null, "tecnico": "MOISES", "previsaoVisita": "2026-07-31", "dataVisita": "2026-07-31", "status": "✅ Concluído", "servicos": "APOIO OPERACIONAL", "observacoes": "Pegar motor"}, {"id": "r172", "numero": "65239", "entrada": "2026-07-31", "cliente": "Construtora Ramos Oliveira Ltda - Epp", "endereco": "Deodoro", "produto": "FACHADEIRO", "vendedor": "GILBERTO", "tecnico": "CLAUDIO", "previsaoVisita": "2026-07-31", "dataVisita": "2026-07-31", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r173", "numero": "65237", "entrada": "2026-07-31", "cliente": "QUALIFORMAS CONSTRUCOES E REFORMAS LTDA", "endereco": "Ipanema", "produto": "ESCORAMENTO", "vendedor": "DORALICE", "tecnico": "ENILSON", "previsaoVisita": "2026-08-05", "dataVisita": "2026-08-05", "status": "✅ Concluído", "servicos": "SUPERVISÃO", "observacoes": null}, {"id": "r174", "numero": "65244", "entrada": "2026-07-31", "cliente": "Reco Incorporacoes Ltda", "endereco": "Saúde", "produto": "APARALIXO", "vendedor": "DORALICE", "tecnico": "JEFFERSON", "previsaoVisita": "2026-08-04", "dataVisita": null, "status": "🔵 Agendado", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r175", "numero": "65250", "entrada": "2026-07-31", "cliente": "Cyrela Jacarepagua Empreendimentos Imobiliarios Ltda", "endereco": "Jacarepaguá", "produto": "AND. SUPENSO", "vendedor": "BIRA", "tecnico": "FELIPE", "previsaoVisita": "2026-07-31", "dataVisita": "2026-07-31", "status": "✅ Concluído", "servicos": "SUPERVISÃO", "observacoes": null}, {"id": "r176", "numero": "65256", "entrada": "2026-08-03", "cliente": "Cyrela Jacarepagua Empreendimentos Imobiliarios Ltda", "endereco": "Jacarepaguá", "produto": "AND. SUPENSO", "vendedor": "BIRA", "tecnico": "MOISES", "previsaoVisita": "2026-08-03", "dataVisita": "2026-08-03", "status": "✅ Concluído", "servicos": "SUPERVISÃO", "observacoes": null}, {"id": "r177", "numero": "65253", "entrada": "2026-08-03", "cliente": "Gvm Engenharia e Construcoes Ltda", "endereco": "Niterói", "produto": "AND. SUPENSO", "vendedor": "ROBERTA", "tecnico": "FELIPE CORREA", "previsaoVisita": "2026-08-05", "dataVisita": "2026-08-05", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r178", "numero": "65257", "entrada": "2026-08-03", "cliente": "Ritz Administracao Hoteleira Ltda", "endereco": "Copacabana", "produto": "AND. SUPENSO", "vendedor": "TADEU", "tecnico": "FELIPE CORREA", "previsaoVisita": "2026-08-03", "dataVisita": "2026-08-03", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r179", "numero": "65255", "entrada": "2026-08-03", "cliente": "Consorcio de Construcao Be In Rio Arpoador", "endereco": "Copacabana", "produto": "AND. SUPENSO", "vendedor": "BIRA", "tecnico": "MOISES", "previsaoVisita": "2026-08-04", "dataVisita": "2026-08-04", "status": "✅ Concluído", "servicos": "ENTREGA", "observacoes": "ENTREGA DE CABO ELÉTRICO"}, {"id": "r180", "numero": "65252", "entrada": "2026-08-03", "cliente": "Consorcio de Construcao Be In Rio Arpoador", "endereco": "Copacabana", "produto": "AND. SUPENSO", "vendedor": "BIRA", "tecnico": "MOISES", "previsaoVisita": "2026-08-04", "dataVisita": "2026-08-04", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r181", "numero": "65251", "entrada": "2026-08-03", "cliente": "Azenha Engenharia Civil e Ambiental Ltda", "endereco": "Copacabana", "produto": "AND. SUPENSO", "vendedor": "GILBERTO", "tecnico": "FELIPE CORREA", "previsaoVisita": "2026-08-03", "dataVisita": "2026-08-03", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r182", "numero": "65247", "entrada": "2026-07-31", "cliente": "Tangran Engenharia Ltda", "endereco": "Copacabana", "produto": "AND. SUPENSO", "vendedor": "GILBERTO", "tecnico": "FELIPE CORREA", "previsaoVisita": "2026-08-03", "dataVisita": "2026-08-03", "status": "✅ Concluído", "servicos": "SUPERVISÃO", "observacoes": null}, {"id": "r183", "numero": "65243", "entrada": "2026-07-31", "cliente": "Jea Servicos Gerais Ltda - Me", "endereco": "Ipanema", "produto": "AND. SUPENSO", "vendedor": "TADEU", "tecnico": "MOISES", "previsaoVisita": "2026-08-04", "dataVisita": "2026-08-04", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r184", "numero": "65233", "entrada": "2026-07-31", "cliente": "Cbr 049 Empreendimentos Imobiliarios Ltda.", "endereco": "Centro", "produto": "FACHADEIRO", "vendedor": "BIRA", "tecnico": "ENILSON", "previsaoVisita": "2026-08-03", "dataVisita": "2026-08-04", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r185", "numero": "65240", "entrada": "2026-07-31", "cliente": "Pro-obras Engenharia Ltda", "endereco": "Botafogo", "produto": "FACHADEIRO / APARALIXO", "vendedor": "GILBERTO", "tecnico": "JEFFERSON", "previsaoVisita": "2026-08-03", "dataVisita": "2026-08-04", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r186", "numero": "65235", "entrada": "2026-07-31", "cliente": "Condominio Edificio Augustus", "endereco": "Barra da Tijuca", "produto": "FACHADEIRO", "vendedor": "GILBERTO", "tecnico": "CLAUDIO", "previsaoVisita": "2026-08-03", "dataVisita": "2026-08-03", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r187", "numero": "65260", "entrada": "2026-08-03", "cliente": "Crescer Incorporadora e Construtora Spe 03 Ltda", "endereco": "Niterói", "produto": "ESCORAMENTO", "vendedor": "TADEU", "tecnico": "FELIPE", "previsaoVisita": "2026-08-03", "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": null}, {"id": "r188", "numero": "65259", "entrada": "2026-08-03", "cliente": "Construtora Ramos Oliveira Ltda - Epp", "endereco": "Deodoro", "produto": "ESCORAMENTO", "vendedor": "GILBERTO", "tecnico": "FELIPE", "previsaoVisita": "2026-08-03", "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": null}, {"id": "r189", "numero": "65236", "entrada": "2026-08-03", "cliente": "Solucao Estrutura Metalica Ltda", "endereco": "Manacapuru / Amazonas", "produto": "APARALIXO", "vendedor": "ANDRÉ MARQUES", "tecnico": "YANNIC", "previsaoVisita": "2026-08-03", "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": null}, {"id": "r190", "numero": "65238", "entrada": "2026-08-03", "cliente": "Borany Engenharia Ltda", "endereco": "São Paulo", "produto": "APARALIXO", "vendedor": "GILBERTO", "tecnico": "YANNIC", "previsaoVisita": "2026-08-06", "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": null}, {"id": "r191", "numero": "65246", "entrada": "2026-08-03", "cliente": "Armatis Solucoes em Engenharia Ltda", "endereco": "Jardim Guanabara", "produto": "AND. SUPENSO", "vendedor": "ROBERTA", "tecnico": "MOISES", "previsaoVisita": "2026-08-04", "dataVisita": "2026-08-04", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r192", "numero": "65249", "entrada": "2026-08-03", "cliente": "Ccisa35 Incorporadora Ltda", "endereco": "São Cristóvão", "produto": "ESCORAMENTO", "vendedor": "ANDRÉ MARQUES", "tecnico": "FELIPE", "previsaoVisita": "2026-08-03", "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": null}, {"id": "r193", "numero": "65224", "entrada": "2026-07-31", "cliente": "Oito Comercio e Servicos de Engenharia, Arquitetura, Urbanismo e Paisagismo Ltda", "endereco": "Barra da Tijuca", "produto": "AND. SUPENSO", "vendedor": "TADEU", "tecnico": "MOISES", "previsaoVisita": "2026-07-31", "dataVisita": "2026-07-31", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r194", "numero": null, "entrada": "2026-08-03", "cliente": null, "endereco": "SÃO CRISTOVÃO", "produto": null, "vendedor": null, "tecnico": "JEFFERSON", "previsaoVisita": "2026-08-03", "dataVisita": "2026-08-03", "status": "✅ Concluído", "servicos": "APOIO OPERACIONAL", "observacoes": "BUSCAR TINTAS"}, {"id": "r195", "numero": "65303", "entrada": "2026-08-05", "cliente": "Refit Engenharia Ltda - Epp", "endereco": "Flamengo", "produto": "APARALIXO", "vendedor": "ROBERTA", "tecnico": "CLAUDIO", "previsaoVisita": "2026-08-05", "dataVisita": "2026-08-05", "status": "✅ Concluído", "servicos": "RETIRADA", "observacoes": null}, {"id": "r196", "numero": "65301", "entrada": "2026-08-05", "cliente": "Concrejato Servicos Tecnicos de Engenharia S/a", "endereco": "Maracanã", "produto": "FACHADEIRO", "vendedor": "ANDRÉ MARQUES", "tecnico": "DIMAS", "previsaoVisita": "2026-08-05", "dataVisita": "2026-08-05", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r197", "numero": "65279", "entrada": "2026-08-04", "cliente": "Spe Rio 2 Ltda", "endereco": "Jacarepaguá", "produto": "AND. SUPENSO", "vendedor": "ANDRÉ MARQUES", "tecnico": "FELIPE CORREA", "previsaoVisita": "2026-08-04", "dataVisita": "2026-08-04", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r198", "numero": "65280", "entrada": "2026-08-03", "cliente": "Ga Comercio e Servicos Automotivos Ltda", "endereco": "Centro", "produto": "AND. SUPENSO", "vendedor": "GILBERTO", "tecnico": "FELIPE CORREA", "previsaoVisita": "2026-08-04", "dataVisita": "2026-08-04", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r199", "numero": "65282", "entrada": "2026-08-03", "cliente": "Oito Comercio e Servicos de Engenharia, Arquitetura, Urbanismo e Paisagismo Ltda", "endereco": "Barra da Tijuca", "produto": "AND. SUPENSO", "vendedor": "TADEU", "tecnico": "FELIPE CORREA", "previsaoVisita": "2026-08-03", "dataVisita": "2026-08-03", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r200", "numero": "65283", "entrada": "2026-08-04", "cliente": "Ccisa136 Incorporadora Ltda", "endereco": "São Cristóvão", "produto": "ESCORAMENTO", "vendedor": "ANDRÉ MARQUES", "tecnico": null, "previsaoVisita": "2026-08-05", "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": null}, {"id": "r201", "numero": "65284", "entrada": "2026-08-04", "cliente": "Mrc Engenharia e Construcoes Ltda", "endereco": "Niterói", "produto": "ESCORAMENTO", "vendedor": "TADEU", "tecnico": null, "previsaoVisita": "2026-08-05", "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": null}, {"id": "r202", "numero": "65285", "entrada": "2026-08-04", "cliente": "Retrofit Engenharia de Servicos Ltda", "endereco": "Centro", "produto": "FACHADEIRO", "vendedor": "ANDRÉ MARQUES", "tecnico": "DIMAS", "previsaoVisita": "2026-08-04", "dataVisita": "2026-08-04", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r203", "numero": "65289", "entrada": "2026-08-04", "cliente": "Leoc Santos Engenharia", "endereco": "Tijuca", "produto": "AND. SUPENSO", "vendedor": "GILBERTO", "tecnico": "FELIPE CORREA", "previsaoVisita": "2026-08-05", "dataVisita": "2026-08-05", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r204", "numero": "65293", "entrada": "2026-08-05", "cliente": "Prourb Engenharia Eireli", "endereco": "São Gonçalo", "produto": "AND. SUPENSO", "vendedor": "BIRA", "tecnico": "FELIPE CORREA", "previsaoVisita": "2026-08-05", "dataVisita": "2026-08-05", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r205", "numero": "65294", "entrada": "2026-08-05", "cliente": "Startinfra Construcoes Ltda", "endereco": "Freguesia (Jacarepaguá)", "produto": "AND. SUPENSO", "vendedor": "ANDRÉ MARQUES", "tecnico": "MOISES", "previsaoVisita": "2026-08-05", "dataVisita": "2026-08-05", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r206", "numero": "65295", "entrada": "2026-08-05", "cliente": "Consorcio de Construcao Be In Rio Prudente 589", "endereco": "Ipanema", "produto": "ESCORAMENTO", "vendedor": "DORALICE", "tecnico": "ENILSON", "previsaoVisita": "2026-08-05", "dataVisita": null, "status": "🔵 Agendado", "servicos": "SUPERVISÃO", "observacoes": null}, {"id": "r207", "numero": "65299", "entrada": "2026-08-05", "cliente": "55.637.997 Alessandra Araujo Rodrigues", "endereco": "Barra da Tijuca", "produto": "ESCADA DE PATAMAR", "vendedor": "ROBERTA", "tecnico": "YANNIC", "previsaoVisita": "2026-08-05", "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": null}, {"id": "r208", "numero": "65300", "entrada": "2026-08-05", "cliente": "Construtora Biapo Ltda", "endereco": "Mangueira", "produto": "ESCORAMENTO", "vendedor": "ANDRÉ MARQUES", "tecnico": "YANNIC", "previsaoVisita": "2026-08-13", "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": null}, {"id": "r209", "numero": "65264", "entrada": "2026-08-05", "cliente": "Associacao Religiosa Israelita Chevra Kadisha do Rio de Janeiro", "endereco": "São João de Meriti", "produto": "FACHADEIRO", "vendedor": "TADEU", "tecnico": "CLAUDIO", "previsaoVisita": "2026-08-05", "dataVisita": "2026-08-05", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r210", "numero": "65265", "entrada": "2026-08-03", "cliente": "Associacao de Governanca dos Adquirentes do Edificio Urbano", "endereco": "Urca", "produto": "FACHADEIRO", "vendedor": "BIRA", "tecnico": "JEFFERSON", "previsaoVisita": "2026-08-04", "dataVisita": "2026-08-04", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r211", "numero": "65266", "entrada": "2026-08-03", "cliente": "Empresa Municipal de Urbanizacao Rio Urbe", "endereco": "Gávea", "produto": "ANDAIME. TUBULAR", "vendedor": "DORALICE", "tecnico": "JEFFERSON", "previsaoVisita": "2026-08-04", "dataVisita": null, "status": "🔵 Agendado", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r212", "numero": "65021", "entrada": "2026-08-05", "cliente": "Bastec Engenharia Eireli", "endereco": "Copacabana", "produto": "APARALIXO", "vendedor": "GILBERTO", "tecnico": "ENILSON", "previsaoVisita": "2026-08-05", "dataVisita": null, "status": "🔵 Agendado", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r213", "numero": "65354", "entrada": "2026-08-10", "cliente": "Retrofit Engenharia de Servicos Ltda", "endereco": "Centro", "produto": "FACHADEIRO", "vendedor": "ANDRÉ MARQUES", "tecnico": "DIMAS", "previsaoVisita": "2026-08-10", "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": null}, {"id": "r214", "numero": "65365", "entrada": "2026-08-10", "cliente": "Condominio do Edificio Ana Angelica", "endereco": "Vila Isabel", "produto": "APARALIXO", "vendedor": "DORALICE", "tecnico": "DIMAS", "previsaoVisita": "2026-08-10", "dataVisita": "2026-08-10", "status": "✅ Concluído", "servicos": "SUPERVISÃO", "observacoes": null}, {"id": "r215", "numero": "65363", "entrada": "2026-08-10", "cliente": "Kadosh Empreendimentos e Participacoes Ltda", "endereco": "Duque de Caxias", "produto": "AND. SUPENSO", "vendedor": "BIRA", "tecnico": "FELIPE CORREA", "previsaoVisita": "2026-08-10", "dataVisita": "2026-08-10", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r216", "numero": "65341", "entrada": "2026-08-07", "cliente": "Grafo Engenharia Ltda - Epp", "endereco": "Lagoa", "produto": "APARALIXO", "vendedor": "ROBERTA", "tecnico": "FELIPE CORREA", "previsaoVisita": "2026-08-07", "dataVisita": "2026-08-07", "status": "✅ Concluído", "servicos": "ENTREGA", "observacoes": null}, {"id": "r217", "numero": "65342", "entrada": "2026-08-07", "cliente": "Consorcio de Construcao Be In Rio Arpoador", "endereco": "Copacabana", "produto": "AND. SUPENSO", "vendedor": "BIRA", "tecnico": "FELIPE CORREA", "previsaoVisita": "2026-08-11", "dataVisita": "2026-08-11", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r218", "numero": "65343", "entrada": "2026-08-07", "cliente": "Tangran Engenharia Ltda", "endereco": "Copacabana", "produto": "AND. SUPENSO", "vendedor": "GILBERTO", "tecnico": "FELIPE CORREA", "previsaoVisita": "2026-08-11", "dataVisita": "2026-08-11", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r219", "numero": "65345", "entrada": "2026-08-07", "cliente": "Nj Empreiteira de Construcao Ltda", "endereco": "Niterói", "produto": "ESCORAMENTO", "vendedor": "TADEU", "tecnico": "FELIPE", "previsaoVisita": "2026-08-13", "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": "12/8/2026 CHEGADA DOS PROJETOS "}, {"id": "r220", "numero": "65349", "entrada": "2026-08-07", "cliente": "Fundacao Getulio Vargas", "endereco": "Botafogo", "produto": "ANDAIME. TUBULAR", "vendedor": "ROBERTA", "tecnico": "JEFFERSON", "previsaoVisita": "2026-08-13", "dataVisita": "2026-08-13", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": "REMARCADA PARA 13/8"}, {"id": "r221", "numero": "65350", "entrada": "2026-08-07", "cliente": "Chami Empreendimentos Sa", "endereco": "Ipanema", "produto": "FACHADEIRO", "vendedor": "GILBERTO", "tecnico": null, "previsaoVisita": null, "dataVisita": null, "status": "⚪ Aberto", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r222", "numero": "65352", "entrada": "2026-08-07", "cliente": "Condominio do Edificio Casa Alta", "endereco": "Botafogo", "produto": "APARALIXO", "vendedor": "BIRA", "tecnico": "JEFFERSON", "previsaoVisita": "2026-08-11", "dataVisita": "2026-08-11", "status": "✅ Concluído", "servicos": "SUPERVISÃO", "observacoes": null}, {"id": "r223", "numero": "65356", "entrada": "2026-08-10", "cliente": "Proart Spe Obra 35 Empreendimento Imobiliario Ltda", "endereco": "Niterói", "produto": "APARALIXO", "vendedor": "TADEU", "tecnico": "JEFFERSON", "previsaoVisita": "2026-08-10", "dataVisita": "2026-08-10", "status": "✅ Concluído", "servicos": "SUPERVISÃO", "observacoes": null}, {"id": "r224", "numero": "65357", "entrada": "2026-08-10", "cliente": "Kea Engenharia e Arquitetura Ltda", "endereco": "Niterói", "produto": "APARALIXO", "vendedor": "ROBERTA", "tecnico": "ENILSON", "previsaoVisita": "2026-08-10", "dataVisita": "2026-08-10", "status": "✅ Concluído", "servicos": "RETIRADA", "observacoes": null}, {"id": "r225", "numero": "65359", "entrada": "2026-08-10", "cliente": "L Cardoso da Silva", "endereco": "São Conrado", "produto": "APARALIXO", "vendedor": "ROBERTA", "tecnico": "CLAUDIO", "previsaoVisita": "2026-08-10", "dataVisita": "2026-08-10", "status": "✅ Concluído", "servicos": "SUPERVISÃO", "observacoes": null}, {"id": "r226", "numero": "65361", "entrada": "2026-08-10", "cliente": "Rego Pazos Engenharia Construcao E Comercio Ltda", "endereco": "Caju", "produto": "ANDAIME. TUBULAR", "vendedor": "GILBERTO", "tecnico": "CLAUDIO", "previsaoVisita": "2026-08-12", "dataVisita": "2026-08-12", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r227", "numero": "65316", "entrada": "2026-08-06", "cliente": "Condominio do Edificio Cidade do Leblon", "endereco": "Leblon", "produto": "AND. SUPENSO", "vendedor": "GILBERTO", "tecnico": "FELIPE CORREA", "previsaoVisita": "2026-08-06", "dataVisita": "2026-08-06", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r228", "numero": "65319", "entrada": "2026-08-06", "cliente": "Apa 88 Empreendimentos Imobiliarios Spe Ltda", "endereco": "Niterói", "produto": "AND. SUPENSO", "vendedor": "TADEU", "tecnico": "FELIPE CORREA", "previsaoVisita": "2026-08-06", "dataVisita": "2026-08-06", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r229", "numero": "65320", "entrada": "2026-08-06", "cliente": "Incorvest Servicos Tecnicos de Engenharia Ltda", "endereco": "Leblon", "produto": "AND. SUPENSO", "vendedor": "GILBERTO", "tecnico": "FELIPE CORREA", "previsaoVisita": "2026-08-06", "dataVisita": "2026-08-06", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r230", "numero": "65322", "entrada": "2026-08-06", "cliente": "M J Alves de Almeida Construcao e Reformas em Geral Ltda", "endereco": "Recreio dos Bandeirantes", "produto": "AND. SUPENSO", "vendedor": "ROBERTA", "tecnico": "DIMAS", "previsaoVisita": "2026-08-07", "dataVisita": "2026-08-07", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r231", "numero": "65327", "entrada": "2026-08-06", "cliente": "Ramabe Empreendimentos Imobiliarios Eireli", "endereco": "Niterói", "produto": "AND. SUPENSO", "vendedor": "DORALICE", "tecnico": "MARIO", "previsaoVisita": "2026-08-10", "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": null}, {"id": "r232", "numero": "65328", "entrada": "2026-08-06", "cliente": "Tivo Roph Ltda", "endereco": "ipanema", "produto": "APARALIXO", "vendedor": "ANDRÉ MARQUES", "tecnico": "CLAUDIO", "previsaoVisita": "2026-08-10", "dataVisita": "2026-08-10", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r233", "numero": "65329", "entrada": "2026-08-06", "cliente": "Acqua Total Projetos de Engenharia Ltda - Epp", "endereco": "Praça da Bandeira", "produto": "FACHADEIRO", "vendedor": "DORALICE", "tecnico": "DIMAS", "previsaoVisita": "2026-08-12", "dataVisita": "2026-08-12", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r234", "numero": "65333", "entrada": "2026-08-06", "cliente": "Lrm - Projetos E Construcoes Limitada", "endereco": "Santa Rosa", "produto": "AND. SUPENSO", "vendedor": "BIRA", "tecnico": "YANNIC", "previsaoVisita": "2026-08-13", "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": "LEVANTAMENTO FEITO PELO PROMOTOR"}, {"id": "r235", "numero": "65334", "entrada": "2026-08-06", "cliente": "Loop Gestao e Projetos em Engenharia Ltda", "endereco": "Jardim Botânico", "produto": "APARALIXO", "vendedor": "DORALICE", "tecnico": "ENILSON", "previsaoVisita": "2026-08-10", "dataVisita": "2026-08-10", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r236", "numero": "65336", "entrada": "2026-08-06", "cliente": "Construpower Engenharia Ltda", "endereco": "Centro", "produto": "ANDAIME. TUBULAR", "vendedor": "ANDRÉ MARQUES", "tecnico": "YANNIC", "previsaoVisita": "2026-08-10", "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": null}, {"id": "r237", "numero": "65338", "entrada": "2026-08-07", "cliente": "Associacao Nobrega de Educacao E Assistencia Social - Aneas", "endereco": "Botafogo", "produto": "FACHADEIRO", "vendedor": "ROBERTA", "tecnico": "JEFFERSON", "previsaoVisita": "2026-08-13", "dataVisita": "2026-08-13", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": "REMARCADA PARA  13/8"}, {"id": "r238", "numero": "65340", "entrada": "2026-08-07", "cliente": "Acqua Total Projetos de Engenharia Ltda - Epp", "endereco": "Rocha", "produto": "FACHADEIRO", "vendedor": "DORALICE", "tecnico": "CLAUDIO", "previsaoVisita": "2026-08-07", "dataVisita": "2026-08-07", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r239", "numero": "65369", "entrada": "2026-08-10", "cliente": "Tgrj-31 Empreendimentos Imobiliarios Ltda", "endereco": "Barra da Tijuca", "produto": "ESCORAMENTO", "vendedor": "TADEU", "tecnico": "FELIPE", "previsaoVisita": "2026-08-13", "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": null}, {"id": "r240", "numero": "65372", "entrada": "2026-08-10", "cliente": "Felcpint Empresa de Pinturas e Reformas Ltda - Epp", "endereco": "Teresópolis", "produto": "APARALIXO", "vendedor": "TADEU", "tecnico": "ENILSON", "previsaoVisita": "2026-08-13", "dataVisita": "2026-08-13", "status": "✅ Concluído", "servicos": null, "observacoes": null}, {"id": "r241", "numero": "65310", "entrada": "2026-08-06", "cliente": "W S Construcao e Incorporacao Eireli", "endereco": "Barra da Tijuca", "produto": "FACHADEIRO", "vendedor": "ROBERTA", "tecnico": "CLAUDIO", "previsaoVisita": "2026-08-10", "dataVisita": "2026-08-10", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r242", "numero": "65373", "entrada": "2026-08-10", "cliente": "Dp Eletricas e Reformas Ltda", "endereco": "Copacabana", "produto": "ANDAIME. TUBULAR", "vendedor": "GILBERTO", "tecnico": null, "previsaoVisita": null, "dataVisita": null, "status": "⚪ Aberto", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r243", "numero": "65380", "entrada": "2026-08-10", "cliente": "Proart Spe Obra 35 Empreendimento Imobiliario Ltda", "endereco": "Niterói", "produto": "APARALIXO", "vendedor": "TADEU", "tecnico": "JEFFERSON", "previsaoVisita": "2026-08-10", "dataVisita": "2026-08-10", "status": "✅ Concluído", "servicos": "ENTREGA", "observacoes": null}, {"id": "r244", "numero": "65381", "entrada": "2026-08-11", "cliente": "Nbc Sistemas de Energia Ltda", "endereco": "Caju", "produto": "ESCORAMENTO", "vendedor": "BIRA", "tecnico": "FELIPE", "previsaoVisita": "2026-08-11", "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": null}, {"id": "r245", "numero": "65382", "entrada": "2026-08-11", "cliente": "On House Construtora Ltda", "endereco": "Santo Antônio de Pádua", "produto": "AND. SUPENSO", "vendedor": "ROBERTA", "tecnico": "MOISES", "previsaoVisita": "2026-08-11", "dataVisita": "2026-08-11", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r246", "numero": "65384", "entrada": "2026-08-11", "cliente": "Sociedade Amante da Instrucao", "endereco": "Laranjeiras", "produto": "FACHADEIRO", "vendedor": "TADEU", "tecnico": "JEFFERSON", "previsaoVisita": "2026-08-11", "dataVisita": "2026-08-11", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r247", "numero": "65385", "entrada": "2026-08-11", "cliente": "Spe Rio 2 Ltda", "endereco": "Jacarepaguá", "produto": "AND. SUPENSO", "vendedor": "ROBERTA", "tecnico": "FELIPE CORREA", "previsaoVisita": "2026-08-12", "dataVisita": "2026-08-12", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r248", "numero": "65386", "entrada": "2026-08-11", "cliente": "Elcitel Engenharia Ltda - Epp", "endereco": "Duque de Caxias", "produto": "FACHADEIRO", "vendedor": "BIRA", "tecnico": null, "previsaoVisita": null, "dataVisita": null, "status": "⚪ Aberto", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r249", "numero": "65387", "entrada": "2026-08-11", "cliente": "Condominio do Edificio Froes da Cruz", "endereco": "Niterói", "produto": "APARALIXO", "vendedor": "GILBERTO", "tecnico": null, "previsaoVisita": null, "dataVisita": null, "status": "⚪ Aberto", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r250", "numero": "65305", "entrada": "2026-08-07", "cliente": "Dk Administradora de Bens Ltda", "endereco": "Barra da Tijuca", "produto": "ESCORAMENTO", "vendedor": "ROBERTA", "tecnico": "FELIPE", "previsaoVisita": "2026-08-11", "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": null}, {"id": "r251", "numero": "65315", "entrada": "2026-08-06", "cliente": "Cyrela Lotus Empreendimentos Imobiliarios Ltda", "endereco": "Curicica", "produto": "AND. SUPENSO", "vendedor": "BIRA", "tecnico": "MOISES", "previsaoVisita": "2026-08-06", "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": "VISITA CANCELADA"}, {"id": "r252", "numero": "65348", "entrada": "2026-08-07", "cliente": "Kadosh Empreendimentos e Participacoes Ltda", "endereco": "Duque de Caxias", "produto": "AND. SUPENSO", "vendedor": "BIRA", "tecnico": "YANNIC", "previsaoVisita": "2026-08-13", "dataVisita": "2026-08-10", "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": "VISITA FEITA PELO PROMOTOR"}, {"id": "r253", "numero": "65362", "entrada": "2026-08-10", "cliente": "Cdi Empreendimento Imobiliario Ltda", "endereco": "Botafogo", "produto": "ESCORAMENTO", "vendedor": "ROBERTA", "tecnico": "FELIPE", "previsaoVisita": "2026-08-13", "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": null}, {"id": "r254", "numero": "65388", "entrada": "2026-08-11", "cliente": "Perfil X Construtora S.a.", "endereco": "Niterói", "produto": "ESCORAMENTO", "vendedor": "ROBERTA", "tecnico": "FELIPE", "previsaoVisita": "2026-08-13", "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": null}, {"id": "r255", "numero": "65398", "entrada": "2026-08-11", "cliente": "Construtora Biapo Ltda", "endereco": "Mangueira", "produto": "ESCORAMENTO", "vendedor": "ANDRÉ MARQUES", "tecnico": "YANNIC", "previsaoVisita": "2026-08-11", "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": null}, {"id": "r256", "numero": "65415", "entrada": "2026-08-12", "cliente": "Acqua Total Projetos de Engenharia Ltda - Epp", "endereco": "Tijuca", "produto": "FACHADEIRO", "vendedor": "DORALICE", "tecnico": "DIMAS", "previsaoVisita": "2026-08-12", "dataVisita": "2026-08-12", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r257", "numero": "65414", "entrada": "2026-08-12", "cliente": "Ccisa141 Incorporadora Ltda", "endereco": "Santo Cristo", "produto": "ANDAIME. TUBULAR", "vendedor": "ANDRÉ MARQUES", "tecnico": "MOISES", "previsaoVisita": "2026-08-12", "dataVisita": "2026-08-12", "status": "✅ Concluído", "servicos": "ENTREGA", "observacoes": null}, {"id": "r258", "numero": "65412", "entrada": "2026-08-12", "cliente": "Ccisa131 Incorporadora Ltda.", "endereco": "Santo Cristo", "produto": "ANDAIME. TUBULAR", "vendedor": "ANDRÉ MARQUES", "tecnico": "CLAUDIO", "previsaoVisita": "2026-08-12", "dataVisita": "2026-08-12", "status": "✅ Concluído", "servicos": "ENTREGA", "observacoes": "TROCA DE PISO METÁLICO"}, {"id": "r259", "numero": "65409", "entrada": "2026-08-12", "cliente": "Browne Construtora Eireli", "endereco": "Barra da Tijuca", "produto": "AND. SUPENSO", "vendedor": "ANDRÉ MARQUES", "tecnico": "ENILSON", "previsaoVisita": "2026-08-12", "dataVisita": "2026-08-12", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r260", "numero": "65408", "entrada": "2026-08-12", "cliente": "Condominio do Edificio Barata Ribeiro", "endereco": "Copacabana", "produto": "APARALIXO", "vendedor": "ROBERTA", "tecnico": "ENILSON", "previsaoVisita": "2026-08-12", "dataVisita": "2026-08-12", "status": "✅ Concluído", "servicos": "SUPERVISÃO", "observacoes": null}, {"id": "r261", "numero": "65407", "entrada": "2026-08-12", "cliente": "Jea Servicos Gerais Ltda - Me", "endereco": "ipanema", "produto": "AND. SUPENSO", "vendedor": "TADEU", "tecnico": "FELIPE CORREA", "previsaoVisita": "2026-08-12", "dataVisita": "2026-08-12", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r262", "numero": "65405", "entrada": "2026-08-12", "cliente": "Cyrela Lotus Empreendimentos Imobiliarios Ltda", "endereco": "Curicica", "produto": "AND. SUPENSO", "vendedor": "BIRA", "tecnico": "MOISES", "previsaoVisita": "2026-08-12", "dataVisita": "2026-08-12", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r263", "numero": "65403", "entrada": "2026-08-12", "cliente": "Empresa Municipal de Urbanizacao Rio Urbe", "endereco": "Gávea", "produto": "FACHADEIRO", "vendedor": "DORALICE", "tecnico": "ENILSON", "previsaoVisita": "2026-08-12", "dataVisita": "2026-08-12", "status": "✅ Concluído", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r264", "numero": "65399", "entrada": "2026-08-12", "cliente": "Condominio do Edificio Ana Luiza", "endereco": "Niterói", "produto": "ANDAIME. TUBULAR", "vendedor": "ROBERTA", "tecnico": null, "previsaoVisita": null, "dataVisita": null, "status": "⚪ Aberto", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r265", "numero": "65395", "entrada": "2026-08-11", "cliente": "Zommer Administracao de Bens Proprios Ltda", "endereco": "Barra da Tijuca", "produto": "ESCORAMENTO", "vendedor": "DORALICE", "tecnico": null, "previsaoVisita": "2026-08-12", "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": "TROCA DE RAZÃO SOCIAL"}, {"id": "r266", "numero": "65394", "entrada": "2026-08-11", "cliente": "Cib Construcoes e Montagens Industriais Eireli", "endereco": "São Cristóvão", "produto": "FACHADEIRO", "vendedor": "BIRA", "tecnico": "YANNIC", "previsaoVisita": "2026-08-13", "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": null}, {"id": "r267", "numero": "65392", "entrada": "2026-08-11", "cliente": "Sevilha Empreendimentos Imobiliarios Ltda", "endereco": "Barra da Tijuca", "produto": "ANDAIME. TUBULAR", "vendedor": "BIRA", "tecnico": "YANNIC", "previsaoVisita": "2026-08-13", "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": null}, {"id": "r268", "numero": "65389", "entrada": "2026-08-11", "cliente": "Imuni Pratic Dedetizacoes e Higienizacao Ltda", "endereco": "Taquara", "produto": "ANDAIME. TUBULAR", "vendedor": "ROBERTA", "tecnico": "YANNIC", "previsaoVisita": "2026-08-13", "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": null}, {"id": "r269", "numero": "65366", "entrada": "2026-08-12", "cliente": "Vitale V15 Empreendimentos Imobiliarios Ltda", "endereco": "Irajá", "produto": "AND. SUPENSO", "vendedor": "GILBERTO", "tecnico": null, "previsaoVisita": null, "dataVisita": null, "status": "⚪ Aberto", "servicos": "LEVANTAMENTO", "observacoes": null}, {"id": "r270", "numero": "65432", "entrada": "2026-08-12", "cliente": "Ccisa131 Incorporadora Ltda.", "endereco": "Santo Cristo", "produto": "AND. SUPENSO", "vendedor": "ANDRÉ MARQUES", "tecnico": "MOISES", "previsaoVisita": "2026-08-13", "dataVisita": "2026-08-13", "status": "✅ Concluído", "servicos": "ENTREGA", "observacoes": null}, {"id": "r271", "numero": "65429", "entrada": "2026-08-12", "cliente": "Igreja Batista Atitude Nova Iguacu", "endereco": "Nova Iguaçu", "produto": "FACHADEIRO", "vendedor": "GILBERTO", "tecnico": "JEFFERSON", "previsaoVisita": "2026-08-12", "dataVisita": "2026-08-12", "status": "✅ Concluído", "servicos": "SUPERVISÃO", "observacoes": null}, {"id": "r272", "numero": "65428", "entrada": "2026-08-12", "cliente": "Riley & Co Projetos e Gerenciamento Ltda", "endereco": "Flamengo", "produto": "AND. SUPENSO", "vendedor": "GILBERTO", "tecnico": "JEFFERSON", "previsaoVisita": "2026-08-13", "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": null}, {"id": "r273", "numero": "65427", "entrada": "2026-08-12", "cliente": "Cores da Tijuca Spe Ltda", "endereco": "Tijuca", "produto": "AND. SUPENSO", "vendedor": "DORALICE", "tecnico": "FELIPE CORREA", "previsaoVisita": "2026-08-13", "dataVisita": "2026-08-13", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": "SOLICITADO DIA 10/8"}, {"id": "r274", "numero": "65425", "entrada": "2026-08-12", "cliente": "Spe Euzebio 21 Empreendimentos Imobiliarios Ltda", "endereco": "Flamengo", "produto": "PROTEÇÃO DE PERIFERIA", "vendedor": "BIRA", "tecnico": "YANNIC", "previsaoVisita": "2026-08-12", "dataVisita": null, "status": "📋 Concluído sem Visita", "servicos": "LEVANTAMENTO DESIGNADO", "observacoes": "LEVANTAMENTO FEITO COM O PROMOTOR"}, {"id": "r275", "numero": "64523", "entrada": "2026-08-12", "cliente": "Dibrama - Administracao de Bens e Participacoes Ltda", "endereco": "Centro", "produto": "APARALIXO", "vendedor": "GILBERTO", "tecnico": "CLAUDIO", "previsaoVisita": "2026-08-12", "dataVisita": "2026-08-12", "status": "✅ Concluído", "servicos": "SUPERVISÃO", "observacoes": null}, {"id": "r276", "numero": "65435", "entrada": "2026-08-12", "cliente": "Domma Sao Goncalo Empreendimento Imobiliario Spe Ltda", "endereco": "São Gonçalo", "produto": "ESCORAMENTO", "vendedor": "GILBERTO", "tecnico": "ENILSON", "previsaoVisita": "2026-08-13", "dataVisita": "2026-08-13", "status": "✅ Concluído", "servicos": "SUPERVISÃO", "observacoes": null}, {"id": "r277", "numero": "65438", "entrada": "2026-08-13", "cliente": "Krone Incorporacoes e Empreendimentos Ltda", "endereco": "Duque de Caxias", "produto": "AND. SUPENSO", "vendedor": "DORALICE", "tecnico": "MOISES", "previsaoVisita": "2026-08-13", "dataVisita": "2026-08-13", "status": "✅ Concluído", "servicos": "MANUTENÇÃO", "observacoes": null}, {"id": "r278", "numero": "65437", "entrada": "2026-08-13", "cliente": "Consorcio Mar Caramujo", "endereco": "Niterói", "produto": "FACHADEIRO", "vendedor": "ANDRÉ MARQUES", "tecnico": "ENILSON", "previsaoVisita": "2026-08-14", "dataVisita": null, "status": "🔵 Agendado", "servicos": null, "observacoes": null}, {"id": "r279", "numero": "65433", "entrada": "2026-08-13", "cliente": "Borges & Gomes Engenharia, Consultoria e Solucoes Tecnicas Ltda", "endereco": "Centro", "produto": "FACHADEIRO", "vendedor": "DORALICE", "tecnico": null, "previsaoVisita": null, "dataVisita": null, "status": "⚪ Aberto", "servicos": null, "observacoes": null}, {"id": "r280", "numero": "65440", "entrada": "2026-08-14", "cliente": "M Sepeda Reformas e Construcoes Eireli - Me", "endereco": "Jardim Botânico", "produto": "ESCORAMENTO", "vendedor": "ROBERTA", "tecnico": null, "previsaoVisita": null, "dataVisita": null, "status": "⚪ Aberto", "servicos": null, "observacoes": null}, {"id": "r281", "numero": "65442", "entrada": "2026-08-14", "cliente": "Plenar Manutencoes e Obras Ltda", "endereco": "São Gonçalo", "produto": "FACHADEIRO", "vendedor": "TADEU", "tecnico": "ENILSON", "previsaoVisita": "2026-08-14", "dataVisita": null, "status": "🔵 Agendado", "servicos": null, "observacoes": null}, {"id": "r282", "numero": "65446", "entrada": "2026-08-14", "cliente": "QUALIFORMAS CONSTRUCOES E REFORMAS LTDA", "endereco": "Nova Iguaçu", "produto": "ESCORAMENTO", "vendedor": "GILBERTO", "tecnico": null, "previsaoVisita": null, "dataVisita": null, "status": "⚪ Aberto", "servicos": null, "observacoes": null}, {"id": "r283", "numero": "65448", "entrada": "2026-08-14", "cliente": "Habitare Empreendimentos e Participacoes S.a.", "endereco": "Niterói", "produto": "AND. SUPENSO", "vendedor": "BIRA", "tecnico": null, "previsaoVisita": null, "dataVisita": null, "status": "⚪ Aberto", "servicos": null, "observacoes": null}, {"id": "r284", "numero": "65453", "entrada": "2026-08-14", "cliente": "Spe Nossa Senhora de Copacabana 813 Empreendimentos Imobiliarios Ltda", "endereco": "Copacabana", "produto": "AND. SUPENSO", "vendedor": "ANDRÉ MARQUES", "tecnico": null, "previsaoVisita": null, "dataVisita": null, "status": "⚪ Aberto", "servicos": null, "observacoes": null}, {"id": "r285", "numero": "65455", "entrada": "2026-08-14", "cliente": "Condominio do Edificio Rosa da Barra", "endereco": "Barra da Tijuca", "produto": "AND. SUPENSO", "vendedor": null, "tecnico": null, "previsaoVisita": null, "dataVisita": null, "status": "⚪ Aberto", "servicos": null, "observacoes": null}, {"id": "r286", "numero": "65456", "entrada": "2026-08-14", "cliente": "Jea Servicos Gerais Ltda - Me", "endereco": "Ipanema", "produto": "AND. SUPENSO", "vendedor": "TADEU", "tecnico": "FELIPE", "previsaoVisita": "2026-08-14", "dataVisita": null, "status": "🔵 Agendado", "servicos": null, "observacoes": null}, {"id": "r287", "numero": "65457", "entrada": "2026-08-14", "cliente": "Ga Comercio e Servicos Automotivos Ltda", "endereco": "Centro", "produto": "AND. SUPENSO", "vendedor": "GILBERTO", "tecnico": "FELIPE", "previsaoVisita": "2026-08-14", "dataVisita": null, "status": "🔵 Agendado", "servicos": null, "observacoes": null}, {"id": "r288", "numero": "65461", "entrada": "2026-08-14", "cliente": "Mrv Mrl Rj e Grande Rio Incorporacoes Ltda", "endereco": "Jacarepaguá", "produto": "ANDAIME. TUBULAR", "vendedor": null, "tecnico": null, "previsaoVisita": null, "dataVisita": null, "status": "⚪ Aberto", "servicos": null, "observacoes": null}, {"id": "r289", "numero": "65463", "entrada": "2026-08-14", "cliente": "Mrv Mrl Rj e Grande Rio Incorporacoes Ltda", "endereco": "Jacarepaguá", "produto": "ANDAIME. TUBULAR", "vendedor": "TADEU", "tecnico": null, "previsaoVisita": null, "dataVisita": null, "status": "⚪ Aberto", "servicos": null, "observacoes": null}, {"id": "r290", "numero": "65465", "entrada": "2026-08-14", "cliente": "Bhz Construtora Eireli", "endereco": "Vassouras", "produto": "FACHADEIRO", "vendedor": "ROBERTA", "tecnico": null, "previsaoVisita": null, "dataVisita": null, "status": "⚪ Aberto", "servicos": null, "observacoes": null}, {"id": "r291", "numero": "65462", "entrada": "2026-08-14", "cliente": "Mrv Mrl Rj e Grande Rio Incorporacoes Ltda", "endereco": "Barra da Tijuca", "produto": "ANDAIME. TUBULAR", "vendedor": "TADEU", "tecnico": "DIMAS", "previsaoVisita": "2026-08-14", "dataVisita": null, "status": "🔵 Agendado", "servicos": null, "observacoes": null}, {"id": "r292", "numero": "65464", "entrada": "2026-08-14", "cliente": "Spe Residentiel Jardin Di Grazielle. Ltda", "endereco": "Niterói", "produto": "ESCORAMENTO", "vendedor": "TADEU", "tecnico": "MOISES", "previsaoVisita": "2026-08-14", "dataVisita": null, "status": "🔵 Agendado", "servicos": null, "observacoes": null}, {"id": "r293", "numero": "65466", "entrada": "2026-08-14", "cliente": "Mrv Mrl Rj e Grande Rio Incorporacoes Ltda", "endereco": "Barra da Tijuca", "produto": "ANDAIME. TUBULAR", "vendedor": "TADEU", "tecnico": "DIMAS", "previsaoVisita": "2026-08-14", "dataVisita": null, "status": "🔵 Agendado", "servicos": null, "observacoes": null}, {"id": "r294", "numero": "65467", "entrada": "2026-08-14", "cliente": "Oito Comercio e Servicos de Engenharia, Arquitetura, Urbanismo e Paisagismo Ltda", "endereco": "Barra da Tijuca", "produto": "AND. SUPENSO", "vendedor": "TADEU", "tecnico": "FELIPE", "previsaoVisita": "2026-08-14", "dataVisita": null, "status": "🔵 Agendado", "servicos": null, "observacoes": null}];

/* ============================================================
   DESIGN TOKENS
   ============================================================ */
const COLORS = {
  bg: "#F4F2EC",
  surface: "#FFFFFF",
  ink: "#1B2430",
  inkSoft: "#5B6472",
  steel: "#C62828",
  steelDark: "#8E1B1B",
  line: "#E1B5B5",
  lineSoft: "#F3DDDD",
  amber: "#C8842A",
  amberSoft: "#F3E2C4",
  green: "#2E7A52",
  greenSoft: "#DCEEE2",
  blueMid: "#5A76A0",
  blueMidSoft: "#E1E7F0",
  steelSoft: "#F3D6D6",
  red: "#B24B44",
  redSoft: "#FCE8E8",
  redLine: "#E7AAAA",
};

const STATUS_META = {
  concluido: { label: "Concluído", short: "Concluído", color: COLORS.green, soft: COLORS.greenSoft },
  designado: { label: "Designado (sem visita)", short: "Designado", color: COLORS.blueMid, soft: COLORS.blueMidSoft },
  agendado: { label: "Agendado", short: "Agendado", color: COLORS.steel, soft: COLORS.steelSoft },
  aberto: { label: "Aberto", short: "Aberto", color: COLORS.amber, soft: COLORS.amberSoft },
  atrasado: { label: "Atrasado", short: "Atrasado", color: COLORS.red, soft: "#F3DEDC" },
};

const STATUS_ORDER = ["aberto", "agendado", "atrasado", "designado", "concluido"];

function normalizeStatus(raw) {
  if (!raw) return "aberto";
  const s = raw.toString();
  if (s.includes("Concluído sem Visita")) return "designado";
  if (s.includes("Concluído")) return "concluido";
  if (s.includes("Atrasado")) return "atrasado";
  if (s.includes("Agendado")) return "agendado";
  if (s.includes("Aberto")) return "aberto";
  return "aberto";
}

// Status efetivo exibido no app.
// Um chamado vira Atrasado automaticamente quando a previsão já passou,
// ainda não houve visita e ele não é um levantamento designado.
function effectiveStatus(record) {
  if (!record) return "aberto";
  const normalized = normalizeStatus(record.status);
  const isDesignado = normalized === "designado" ||
    String(record.servicos || "").toUpperCase().includes("DESIGNADO");

  if (isDesignado) return "designado";
  if (record.dataVisita) return "concluido";

  const todayISO = toISO(new Date());
  if (record.previsaoVisita && record.previsaoVisita < todayISO) return "atrasado";

  return normalized;
}

/* ============================================================
   SLA — prazo de atendimento (dias entre Entrada e Data da Visita)
   ============================================================ */
const SLA_TIERS = [
  { key: "otimo", label: "Ótimo", emoji: "🟢", max: 1, color: "#2E7A52" },
  { key: "bom", label: "Bom", emoji: "🔵", max: 2, color: "#5A76A0" },
  { key: "regular", label: "Regular", emoji: "🟡", max: 4, color: "#C8842A" },
  { key: "ruim", label: "Ruim", emoji: "🔴", max: Infinity, color: "#B24B44" },
];
function daysBetween(isoA, isoB) {
  const a = parseISO(isoA), b = parseISO(isoB);
  if (!a || !b) return null;
  return Math.round((b - a) / 86400000);
}
function getSLA(entrada, dataVisita) {
  const days = daysBetween(entrada, dataVisita);
  if (days === null || days < 0) return null;
  const tier = SLA_TIERS.find((t) => days <= t.max);
  return { ...tier, days };
}

/* ============================================================
   DATE HELPERS
   ============================================================ */
function parseISO(d) {
  if (!d) return null;
  const dt = new Date(d + "T00:00:00");
  return isNaN(dt.getTime()) ? null : dt;
}
function toISO(dt) {
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, "0");
  const d = String(dt.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
function formatBR(iso) {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}
function startOfWeek(dt) {
  const d = new Date(dt);
  const day = d.getDay(); // 0 = Sunday
  const diff = day === 0 ? -6 : 1 - day; // move to Monday
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}
function endOfWeek(dt) {
  const s = startOfWeek(dt);
  const e = new Date(s);
  e.setDate(e.getDate() + 6);
  e.setHours(23, 59, 59, 999);
  return e;
}
function addDays(dt, n) {
  const d = new Date(dt);
  d.setDate(d.getDate() + n);
  return d;
}
function addMonths(dt, n) {
  const d = new Date(dt);
  d.setMonth(d.getMonth() + n);
  return d;
}
function startOfMonth(dt) {
  return new Date(dt.getFullYear(), dt.getMonth(), 1);
}
function endOfMonth(dt) {
  return new Date(dt.getFullYear(), dt.getMonth() + 1, 0, 23, 59, 59, 999);
}
const WEEKDAY_ABBR = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
const MONTH_NAMES = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];


/* ============================================================
   EXPORTAÇÃO PDF — abre uma versão pronta para impressão/PDF
   ============================================================ */
function escapeReportHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function exportPrintableReport({ title, subtitle, metrics = [], columns = [], rows = [], notes = [], groupBy = null }) {
  const popup = window.open("", "_blank", "width=1100,height=800");
  if (!popup) {
    alert("O navegador bloqueou a janela do relatório. Libere pop-ups para exportar em PDF.");
    return;
  }

  const metricHtml = metrics.map((m) => `
    <div class="metric">
      <div class="metric-label">${escapeReportHtml(m.label)}</div>
      <div class="metric-value">${escapeReportHtml(m.value)}</div>
    </div>
  `).join("");

  const headerHtml = columns.map((c) => `<th>${escapeReportHtml(c.label)}</th>`).join("");

  let bodyHtml = "";
  if (!rows.length) {
    bodyHtml = `<tr><td colspan="${Math.max(columns.length, 1)}" class="empty">Nenhum registro no período.</td></tr>`;
  } else if (groupBy?.key) {
    const groups = {};
    rows.forEach((row) => {
      const groupName = String(row[groupBy.key] || groupBy.fallback || "Não atribuído").trim();
      (groups[groupName] = groups[groupName] || []).push(row);
    });

    bodyHtml = Object.entries(groups)
      .sort((a, b) => a[0].localeCompare(b[0], "pt-BR"))
      .map(([groupName, groupRows]) => `
        <tr class="group-row">
          <td colspan="${Math.max(columns.length, 1)}">
            ${escapeReportHtml(groupBy.label || "Técnico")}: ${escapeReportHtml(groupName)}
            <span class="group-count">${groupRows.length} visita(s)</span>
          </td>
        </tr>
        ${groupRows.map((row) => `
          <tr>
            ${columns.map((c) => `<td>${escapeReportHtml(row[c.key] || "—")}</td>`).join("")}
          </tr>
        `).join("")}
      `).join("");
  } else {
    bodyHtml = rows.map((row) => `
      <tr>
        ${columns.map((c) => `<td>${escapeReportHtml(row[c.key] || "—")}</td>`).join("")}
      </tr>
    `).join("");
  }

  const notesHtml = notes.filter(Boolean).length
    ? `<div class="notes">${notes.filter(Boolean).map((n) => `<div>${escapeReportHtml(n)}</div>`).join("")}</div>`
    : "";

  popup.document.write(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>${escapeReportHtml(title)}</title>
        <style>
          @page { size: A4 landscape; margin: 11mm; }
          * { box-sizing: border-box; }
          body { font-family: Arial, sans-serif; color: #222; margin: 0; font-size: 11px; }
          .top { border-bottom: 4px solid #C62828; padding-bottom: 9px; margin-bottom: 12px; }
          h1 { color: #8E1B1B; margin: 0 0 4px; font-size: 21px; }
          .subtitle { color: #666; font-size: 12px; }
          .metrics { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin: 12px 0; }
          .metric { border: 1px solid #E1B5B5; border-top: 4px solid #C62828; border-radius: 6px; padding: 8px 10px; }
          .metric-label { color: #666; text-transform: uppercase; font-size: 9px; font-weight: bold; }
          .metric-value { font-size: 22px; font-weight: bold; margin-top: 4px; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th { background: #8E1B1B; color: white; text-align: left; padding: 6px; font-size: 9px; text-transform: uppercase; }
          td { border-bottom: 1px solid #e7d3d3; padding: 5px 6px; vertical-align: top; }
          tr:nth-child(even) td { background: #fff7f7; }
          .group-row td {
            background: #F8E3E3 !important;
            color: #8E1B1B;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: .04em;
            border-top: 2px solid #C62828;
            border-bottom: 1px solid #E1B5B5;
            padding: 7px 8px;
          }
          .group-count {
            float: right;
            color: #7A4D4D;
            font-size: 9px;
            font-weight: 700;
            text-transform: none;
            letter-spacing: 0;
          }
          .empty { text-align: center; padding: 24px; color: #777; }
          .notes { margin: 10px 0; padding: 8px 10px; background: #fff7f7; border-left: 4px solid #C62828; color: #555; }
          .footer { margin-top: 12px; font-size: 9px; color: #888; text-align: right; }
          @media print {
            .no-print { display: none !important; }
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          }
        </style>
      </head>
      <body>
        <div class="top">
          <h1>${escapeReportHtml(title)}</h1>
          <div class="subtitle">${escapeReportHtml(subtitle)}</div>
        </div>
        <div class="metrics">${metricHtml}</div>
        ${notesHtml}
        <table>
          <thead><tr>${headerHtml}</tr></thead>
          <tbody>${bodyHtml}</tbody>
        </table>
        <div class="footer">Controle de Assistência Técnica • gerado em ${new Date().toLocaleString("pt-BR")}</div>
        <script>
          window.onload = () => {
            setTimeout(() => {
              window.focus();
              window.print();
            }, 250);
          };
        <\/script>
      </body>
    </html>
  `);
  popup.document.close();
}

/* ============================================================
   GOOGLE SHEETS API — leitura em tempo real via Apps Script
   ============================================================ */
const SHEETS_API_URL = "https://script.google.com/macros/s/AKfycbxCCw7WTQIqim0yiY8-9RV90t1sTSm5vgkump7_kO9dxg60ot8f1XoD67dNlY54DLcs/exec";

function sheetDateToISO(value) {
  if (!value) return "";
  const s = String(value).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return "";
  return `${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}`;
}

function sheetRowsToRecords(rows) {
  if (!Array.isArray(rows)) return [];

  // A aba possui uma linha de título (ex.: "CONTROLE ASSISTÊNCIA TÉCNICA")
  // antes do cabeçalho real. Por isso não basta procurar a palavra "ASSISTÊNCIA".
  // Consideramos cabeçalho somente uma linha que contenha vários campos estruturais.
  const headerIndex = rows.findIndex((row) => {
    if (!Array.isArray(row)) return false;
    const cells = row.map((cell) => String(cell || "").trim().toUpperCase());
    const has = (name) => cells.some((cell) => cell === name || cell.includes(name));
    return has("ENTRADA") && has("CLIENTE") && has("STATUS") &&
      (has("ASSISTÊNCIA") || has("ASSISTENCIA"));
  });
  if (headerIndex < 0) throw new Error('Cabeçalho da aba "Registros" não encontrado.');

  const headers = rows[headerIndex].map((h) => String(h || "").trim().toUpperCase());
  const col = (...names) => {
    for (const name of names) {
      const idx = headers.findIndex((h) => h === name || h.includes(name));
      if (idx >= 0) return idx;
    }
    return -1;
  };

  const idx = {
    numero: col("Nº ASSISTÊNCIA", "NO ASSISTÊNCIA", "ASSISTÊNCIA"),
    entrada: col("ENTRADA"),
    cliente: col("CLIENTE"),
    endereco: col("ENDEREÇO", "ENDERECO"),
    produto: col("PRODUTO"),
    vendedor: col("VENDEDOR"),
    tecnico: col("ASSISTENTE TÉCNICO", "ASSISTENTE TECNICO", "TÉCNICO", "TECNICO"),
    previsaoVisita: col("PREVISÃO VISITA", "PREVISAO VISITA"),
    dataVisita: col("DATA DA VISITA", "DATA VISITA", "DATA DA VISTA", "DATA VISTA"),
    status: col("STATUS"),
    servicos: col("SERVIÇOS", "SERVICOS", "SERVIÇO", "SERVICO"),
    observacoes: col("OBSERVAÇÕES", "OBSERVACOES"),
  };

  const get = (row, i) => i >= 0 ? String(row[i] ?? "").trim() : "";
  return rows.slice(headerIndex + 1)
    .filter((row) => Array.isArray(row) && row.some((cell) => String(cell || "").trim() !== ""))
    .map((row, i) => ({
      id: `sheet_${headerIndex + 2 + i}`,
      numero: get(row, idx.numero),
      entrada: sheetDateToISO(get(row, idx.entrada)),
      cliente: get(row, idx.cliente),
      endereco: get(row, idx.endereco),
      produto: get(row, idx.produto),
      vendedor: get(row, idx.vendedor),
      tecnico: get(row, idx.tecnico),
      previsaoVisita: sheetDateToISO(get(row, idx.previsaoVisita)),
      dataVisita: sheetDateToISO(get(row, idx.dataVisita)),
      status: get(row, idx.status),
      servicos: get(row, idx.servicos),
      observacoes: get(row, idx.observacoes),
    }))
    .filter((r) => {
      const numero = String(r.numero || "").trim().toUpperCase();
      const cliente = String(r.cliente || "").trim().toUpperCase();
      if (numero.includes("ASSISTÊNCIA") || numero.includes("ASSISTENCIA")) return false;
      if (cliente === "CLIENTE") return false;
      return r.numero || r.cliente || r.endereco || r.entrada;
    });
}

/* ============================================================
   SMALL UI PRIMITIVES
   ============================================================ */
function Chip({ children, tone = "steel", size = "md" }) {
  const bg = {
    steel: COLORS.steelSoft, amber: COLORS.amberSoft, green: COLORS.greenSoft,
    blueMid: COLORS.blueMidSoft, ink: COLORS.lineSoft,
  }[tone] || COLORS.steelSoft;
  const fg = {
    steel: COLORS.steelDark, amber: "#8A5A18", green: "#1E5C3B",
    blueMid: "#334E70", ink: COLORS.ink,
  }[tone] || COLORS.steelDark;
  return (
    <span
      style={{
        background: bg, color: fg, fontFamily: "'IBM Plex Mono', monospace",
        fontSize: size === "sm" ? 10.5 : 11.5, fontWeight: 600, letterSpacing: "0.03em",
        padding: size === "sm" ? "2px 7px" : "3px 9px", borderRadius: 4,
        textTransform: "uppercase", whiteSpace: "nowrap", display: "inline-block",
      }}
    >
      {children}
    </span>
  );
}

function StatusDot({ status }) {
  const meta = STATUS_META[status];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: meta.color, flexShrink: 0 }} />
      <span style={{ fontSize: 12.5, fontWeight: 600, color: COLORS.ink }}>{meta.short}</span>
    </span>
  );
}

function SLABadge({ entrada, dataVisita }) {
  const sla = getSLA(entrada, dataVisita);
  if (!sla) return null;
  return (
    <span
      title={`Atendido em ${sla.days} dia(s)`}
      style={{
        fontSize: 10.5, fontWeight: 700, color: sla.color, background: `${sla.color}18`,
        borderRadius: 4, padding: "2px 6px", display: "inline-flex", alignItems: "center", gap: 3,
        fontFamily: "'IBM Plex Mono', monospace",
      }}
    >
      {sla.emoji} {sla.label}
    </span>
  );
}

function Card({ children, style, ...rest }) {
  return (
    <div
      style={{
        background: COLORS.surface, border: `1px solid ${COLORS.line}`,
        borderRadius: 10, ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

/* ============================================================
   TICKET-STYLE METRIC CARD (signature element)
   ============================================================ */
function TicketMetric({ label, value, tone, icon: Icon, sub }) {
  const meta = { steel: COLORS.steel, amber: COLORS.amber, green: COLORS.green, blueMid: COLORS.blueMid, red: COLORS.red }[tone] || COLORS.steel;
  return (
    <div
      style={{
        position: "relative", background: COLORS.surface, border: `1px solid ${COLORS.line}`,
        borderRadius: 10, overflow: "hidden", minWidth: 0,
      }}
    >
      <div style={{ height: 4, background: meta }} />
      <div style={{ padding: "12px 14px 14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <Icon size={13} color={meta} strokeWidth={2.4} />
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11.5, fontWeight: 700,
              letterSpacing: "0.08em", textTransform: "uppercase", color: COLORS.inkSoft,
            }}
          >
            {label}
          </span>
        </div>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 30, fontWeight: 700, color: COLORS.ink, lineHeight: 1 }}>
          {value}
        </div>
        {sub && <div style={{ fontSize: 11, color: COLORS.inkSoft, marginTop: 4 }}>{sub}</div>}
      </div>
    </div>
  );
}

/* ============================================================
   MAIN APP
   ============================================================ */
export default function App() {
  const [records, setRecords] = useState(null); // null = loading
  const [tab, setTab] = useState("painel");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  // ---- carrega registros diretamente do Google Sheets ----
  const loadFromSheets = useCallback(async () => {
    setSaving(true);
    try {
      const res = await fetch(`${SHEETS_API_URL}?t=${Date.now()}`, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const payload = await res.json();
      if (!payload?.sucesso || !Array.isArray(payload.dados)) {
        throw new Error(payload?.erro || "Resposta inválida da API.");
      }
      const next = sheetRowsToRecords(payload.dados);
      setRecords(next);
      return next;
    } catch (e) {
      console.error("Erro ao carregar Google Sheets:", e);
      setRecords((current) => current ?? SEED_DATA);
      setToast("Não foi possível ler o Google Sheets. Exibindo a base de segurança.");
      return null;
    } finally {
      setSaving(false);
    }
  }, []);

  useEffect(() => {
    loadFromSheets();

    // Mantém o app sincronizado com alterações feitas diretamente na planilha.
    const refreshTimer = setInterval(() => {
      loadFromSheets();
    }, 30000);

    return () => clearInterval(refreshTimer);
  }, [loadFromSheets]);

  // A planilha é a fonte oficial. O cadastro de novos chamados grava direto no Apps Script.
  const persist = useCallback(async (next) => {
    setRecords(next);
    setToast("Edição rápida ainda não grava no Google Sheets. Vamos ligar essa etapa depois.");
  }, []);

  const addRecord = useCallback(async (rec) => {
    try {
      setSaving(true);

      const payload = {
        numero: rec.numero || "",
        entrada: rec.entrada || "",
        cliente: rec.cliente || "",
        endereco: rec.endereco || "",
        produto: rec.produto || "",
        vendedor: rec.vendedor || "",
        tecnico: rec.tecnico || "",
        previsao: rec.previsaoVisita || "",
        dataVisita: rec.dataVisita || "",
        servico: rec.servicos || "",
        observacoes: rec.observacoes || "",
      };

      const res = await fetch(SHEETS_API_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });

      let resposta = null;
      try {
        resposta = await res.json();
      } catch (_) {
        // Em alguns navegadores o Apps Script pode não expor o corpo da resposta,
        // então confirmamos o cadastro recarregando a planilha logo abaixo.
      }

      if (resposta && resposta.sucesso === false) {
        throw new Error(resposta.erro || "O Google Sheets recusou o cadastro.");
      }

      const atualizados = await loadFromSheets();
      if (!atualizados) {
        throw new Error("O cadastro foi enviado, mas não foi possível atualizar a lista.");
      }

      setToast("Chamado registrado no Google Sheets.");
      return { sucesso: true };
    } catch (e) {
      console.error("Erro ao registrar chamado:", e);
      const mensagem = e?.message || "Não foi possível registrar o chamado.";
      setToast(`Erro ao registrar: ${mensagem}`);
      return { sucesso: false, erro: mensagem };
    } finally {
      setSaving(false);
    }
  }, [loadFromSheets]);

  const updateRecord = useCallback(async (id, patch) => {
    const atual = (records || []).find((r) => r.id === id);

    if (!atual) {
      const mensagem = "Chamado não encontrado no aplicativo.";
      setToast(mensagem);
      return { sucesso: false, erro: mensagem };
    }

    if (!atual.numero) {
      const mensagem = "Este chamado não possui Nº de assistência e não pode ser localizado na planilha.";
      setToast(mensagem);
      return { sucesso: false, erro: mensagem };
    }

    try {
      setSaving(true);

      const previsaoFinal = patch.previsaoVisita ?? atual.previsaoVisita ?? "";
      const servicoFinal = patch.servicos ?? atual.servicos ?? "";

      const payload = {
        acao: "editar",
        numero: atual.numero,
        produto: patch.produto ?? atual.produto ?? "",
        vendedor: patch.vendedor ?? atual.vendedor ?? "",
        tecnico: patch.tecnico ?? atual.tecnico ?? "",

        // Envia os dois nomes para ficar compatível com as versões do Apps Script
        // usadas no cadastro e na edição.
        previsaoVisita: previsaoFinal,
        previsao: previsaoFinal,

        dataVisita: patch.dataVisita ?? atual.dataVisita ?? "",

        servicos: servicoFinal,
        servico: servicoFinal,

        observacoes: patch.observacoes ?? atual.observacoes ?? "",
      };

      const res = await fetch(SHEETS_API_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });

      let resposta = null;
      try {
        resposta = await res.json();
      } catch (_) {
        // O Apps Script pode ocultar o corpo em alguns navegadores;
        // a confirmação final é feita recarregando a planilha.
      }

      if (resposta && resposta.sucesso === false) {
        throw new Error(resposta.erro || "O Google Sheets recusou a alteração.");
      }

      const atualizados = await loadFromSheets();
      if (!atualizados) {
        throw new Error("A alteração foi enviada, mas não foi possível atualizar a lista.");
      }

      setToast("Alterações salvas no Google Sheets.");
      return { sucesso: true };
    } catch (e) {
      console.error("Erro ao editar chamado:", e);
      const mensagem = e?.message || "Não foi possível salvar as alterações.";
      setToast(`Erro ao salvar: ${mensagem}`);
      return { sucesso: false, erro: mensagem };
    } finally {
      setSaving(false);
    }
  }, [records, loadFromSheets]);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3200);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const fontImport = `
    @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600;700&display=swap');
  `;

  if (records === null) {
    return (
      <div style={{ minHeight: 420, display: "flex", alignItems: "center", justifyContent: "center", background: COLORS.bg, fontFamily: "Inter, sans-serif" }}>
        <style>{fontImport}</style>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, color: COLORS.inkSoft }}>
          <Loader2 size={22} className="spin" style={{ animation: "spin 1s linear infinite" }} />
          <span style={{ fontSize: 13 }}>Carregando chamados…</span>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const TABS = [
    { id: "painel", label: "Painel", icon: ClipboardList },
    { id: "hoje", label: "Hoje", icon: CalendarDays },
    { id: "novo", label: "Novo", icon: PlusCircle },
    { id: "chamados", label: "Chamados", icon: ListChecks },
    { id: "relatorio", label: "Relatório", icon: BarChart3 },
  ];

  return (
    <div style={{ background: COLORS.bg, minHeight: 480, fontFamily: "Inter, sans-serif", color: COLORS.ink }}>
      <style>{fontImport}</style>

      {/* HEADER */}
      <div style={{ background: COLORS.steelDark, padding: "16px 16px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <Wrench size={17} color="#F4F2EC" strokeWidth={2.2} />
          <div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: "0.03em", color: "#F4F2EC", lineHeight: 1.1 }}>
              CONTROLE DE ASSISTÊNCIA TÉCNICA
            </div>
            <div style={{ fontSize: 11, color: "#9FB0C2", marginTop: 1 }}>
              {records.length} chamados registrados{saving ? " · salvando…" : ""}
            </div>
          </div>
        </div>
        {/* TAB NAV */}
        <div style={{ display: "flex", gap: 2 }}>
          {TABS.map((t) => {
            const active = tab === t.id;
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                style={{
                  flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                  padding: "8px 4px 10px", background: "transparent", border: "none", cursor: "pointer",
                  borderBottom: active ? `2.5px solid ${COLORS.amber}` : "2.5px solid transparent",
                  color: active ? "#F4F2EC" : "#7C8CA0",
                }}
              >
                <Icon size={16} strokeWidth={2.2} />
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11.5, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  {t.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* BODY */}
      <div style={{ padding: 14, maxWidth: 720, margin: "0 auto" }}>
        {tab === "painel" && <Painel records={records} onGoRelatorio={() => setTab("relatorio")} onGoChamados={() => setTab("chamados")} />}
        {tab === "hoje" && <ProgramacaoDia records={records} onToast={setToast} />}
        {tab === "novo" && <NovoChamado onAdd={async (r) => { const resultado = await addRecord(r); if (resultado?.sucesso) setTab("chamados"); return resultado; }} />}
        {tab === "chamados" && <Chamados records={records} onUpdate={updateRecord} />}
        {tab === "relatorio" && <Relatorio records={records} />}
      </div>

      {toast && (
        <div style={{
          position: "fixed", bottom: 18, left: "50%", transform: "translateX(-50%)",
          background: COLORS.steelDark, color: "#F4F2EC", padding: "9px 16px", borderRadius: 8,
          fontSize: 12.5, display: "flex", alignItems: "center", gap: 8, boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
        }}>
          <Check size={14} /> {toast}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   PAINEL (overview)
   ============================================================ */
function Painel({ records, onGoRelatorio, onGoChamados }) {
  const now = new Date();
  const wStart = startOfWeek(now), wEnd = endOfWeek(now);

  const withStatus = useMemo(() => records.map((r) => ({ ...r, _status: effectiveStatus(r) })), [records]);

  const thisWeek = useMemo(
    () => withStatus.filter((r) => { const d = parseISO(r.entrada); return d && d >= wStart && d <= wEnd; }),
    [withStatus]
  );

  const counts = { concluido: 0, designado: 0, agendado: 0, aberto: 0 };
  thisWeek.forEach((r) => counts[r._status]++);
  const abertosPendentes = counts.aberto + counts.agendado;

  const semAtribuicao = useMemo(
    () => withStatus.filter((r) => r._status === "aberto" && !r.tecnico),
    [withStatus]
  );

  const todayISO = toISO(now);
  const atrasados = useMemo(
    () => withStatus.filter((r) => {
      if (r._status === "concluido" || r._status === "designado") return false;
      return r.previsaoVisita && r.previsaoVisita < todayISO;
    }),
    [withStatus, todayISO]
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <SectionLabel>Esta semana ({formatBR(toISO(wStart))} – {formatBR(toISO(wEnd))})</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <TicketMetric label="Pedidos" value={thisWeek.length} tone="steel" icon={FileStack} />
        <TicketMetric label="Concluídos" value={counts.concluido} tone="green" icon={Check} />
        <TicketMetric label="Designados" value={counts.designado} tone="blueMid" icon={CircleDot} />
        <TicketMetric label="Abertos/Pend." value={abertosPendentes} tone="amber" icon={Clock} />
      </div>

      <button onClick={onGoRelatorio} style={ghostButtonStyle}>
        Ver relatório completo <ChevronRight size={14} />
      </button>

      {atrasados.length > 0 && (
        <Card style={{ padding: 12, borderColor: COLORS.red, background: "#F9EBEA" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
            <AlertTriangle size={15} color="#8A2E28" />
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13.5, textTransform: "uppercase", letterSpacing: "0.03em", color: "#7A2620" }}>
              {atrasados.length} chamado{atrasados.length > 1 ? "s" : ""} com previsão vencida
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {atrasados.slice(0, 5).map((r) => (
              <div key={r.id} style={{ fontSize: 12.5, color: "#7A2620", display: "flex", justifyContent: "space-between", gap: 8 }}>
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.cliente || r.endereco || "Sem cliente"}</span>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", flexShrink: 0 }}>prev. {formatBR(r.previsaoVisita)}</span>
              </div>
            ))}
          </div>
          {atrasados.length > 5 && <div style={{ fontSize: 11.5, color: "#8A2E28", marginTop: 6 }}>+{atrasados.length - 5} outro(s).</div>}
          <button onClick={onGoChamados} style={{ ...ghostButtonStyle, marginTop: 8, borderColor: COLORS.red, color: "#7A2620" }}>
            Ver na lista de chamados
          </button>
        </Card>
      )}

      {semAtribuicao.length > 0 && (
        <Card style={{ padding: 12, borderColor: COLORS.amber, background: "#FBF3E4" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
            <AlertTriangle size={15} color="#8A5A18" />
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13.5, textTransform: "uppercase", letterSpacing: "0.03em", color: "#5C3B10" }}>
              {semAtribuicao.length} chamado{semAtribuicao.length > 1 ? "s" : ""} aberto{semAtribuicao.length > 1 ? "s" : ""} sem técnico
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {semAtribuicao.slice(0, 5).map((r) => (
              <div key={r.id} style={{ fontSize: 12.5, color: "#5C3B10", display: "flex", justifyContent: "space-between", gap: 8 }}>
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.cliente || r.endereco || "Sem cliente"}</span>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", flexShrink: 0 }}>{r.numero ? `#${r.numero}` : ""}</span>
              </div>
            ))}
          </div>
          {semAtribuicao.length > 5 && (
            <div style={{ fontSize: 11.5, color: "#8A5A18", marginTop: 6 }}>+{semAtribuicao.length - 5} outro(s). </div>
          )}
          <button onClick={onGoChamados} style={{ ...ghostButtonStyle, marginTop: 8, borderColor: "#C8842A", color: "#5C3B10" }}>
            Ver na lista de chamados
          </button>
        </Card>
      )}

      <SectionLabel>Carga por técnico (histórico completo)</SectionLabel>
      <MiniBreakdown records={withStatus} field="tecnico" />

      <SectionLabel>Carga por vendedor (histórico completo)</SectionLabel>
      <MiniBreakdown records={withStatus} field="vendedor" />
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{
      fontFamily: "'Barlow Condensed', sans-serif", fontSize: 12.5, fontWeight: 700,
      letterSpacing: "0.07em", textTransform: "uppercase", color: COLORS.inkSoft,
      borderBottom: `1px solid ${COLORS.line}`, paddingBottom: 5, marginTop: 4,
    }}>
      {children}
    </div>
  );
}

const ghostButtonStyle = {
  display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
  background: "transparent", border: `1px solid ${COLORS.steel}`, color: COLORS.steel,
  borderRadius: 8, padding: "9px 12px", fontSize: 12.5, fontWeight: 600, cursor: "pointer",
  width: "100%", fontFamily: "Inter, sans-serif",
};

function MiniBreakdown({ records, field }) {
  const counts = useMemo(() => {
    const m = {};
    records.forEach((r) => {
      const key = r[field] || "Não atribuído";
      m[key] = (m[key] || 0) + 1;
    });
    return Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, [records, field]);
  const max = counts.length ? counts[0][1] : 1;
  return (
    <Card style={{ padding: 12 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {counts.map(([name, n]) => (
          <div key={name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12, width: 108, flexShrink: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: COLORS.ink }}>{name}</span>
            <div style={{ flex: 1, background: COLORS.lineSoft, borderRadius: 4, height: 8, overflow: "hidden" }}>
              <div style={{ width: `${(n / max) * 100}%`, height: "100%", background: COLORS.steel, borderRadius: 4 }} />
            </div>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, width: 22, textAlign: "right", color: COLORS.inkSoft }}>{n}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ============================================================
   NOVO CHAMADO (form)
   ============================================================ */
const SERVICO_OPTS = ["LEVANTAMENTO", "LEVANTAMENTO DESIGNADO", "MANUTENÇÃO", "SUPERVISÃO", "ENTREGA", "RETIRADA", "APOIO OPERACIONAL"];

const PRODUTO_OPTS = [
  "FACHADEIRO",
  "APARALIXO",
  "AND. SUPENSO",
  "ESCORAMENTO",
  "ESCADA DE PATAMAR",
  "ANDAIME. TUBULAR",
  "PROTEÇÃO DE PERIFERIA",
  "CADEIRINHA",
];

const VENDEDOR_OPTS = [
  "ANDRÉ MARQUES",
  "BIRA",
  "DORALICE",
  "GILBERTO",
  "ROBERTA",
  "TADEU",
];

const TECNICO_OPTS = [
  "CLAUDIO",
  "DIMAS",
  "ENILSON",
  "FELIPE",
  "FELIPE CORREA",
  "JEFFERSON",
  "MARIO",
  "MOISES",
  "YANNIC",
];
const STATUS_OPTS = [
  { value: "⚪ Aberto", key: "aberto" },
  { value: "🔵 Agendado", key: "agendado" },
  { value: "🔴 Atrasado", key: "atrasado" },
  { value: "📋 Concluído sem Visita", key: "designado" },
  { value: "✅ Concluído", key: "concluido" },
];

function inputStyle() {
  return {
    width: "100%", padding: "9px 10px", border: `1px solid ${COLORS.line}`, borderRadius: 7,
    fontSize: 13.5, fontFamily: "Inter, sans-serif", background: COLORS.surface, color: COLORS.ink,
    outline: "none", boxSizing: "border-box",
  };
}
function labelStyle() {
  return {
    fontSize: 11.5, fontWeight: 600, color: COLORS.inkSoft, marginBottom: 4, display: "block",
    textTransform: "uppercase", letterSpacing: "0.04em", fontFamily: "'Barlow Condensed', sans-serif",
  };
}
function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={labelStyle()}>{label}</label>
      {children}
    </div>
  );
}

function NovoChamado({ onAdd }) {
  const todayISO = toISO(new Date());
  const [form, setForm] = useState({
    numero: "", entrada: todayISO, cliente: "", endereco: "", produto: "",
    vendedor: "", tecnico: "", previsaoVisita: "", dataVisita: "",
    status: "⚪ Aberto", servicos: "", observacoes: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async () => {
    if (!form.cliente.trim() && !form.endereco.trim()) {
      setError("Informe pelo menos o cliente ou o endereço.");
      return;
    }
    if (!form.numero.trim()) {
      setError("Informe o nº da assistência.");
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      const resultado = await onAdd({ ...form });
      if (!resultado?.sucesso) {
        setError(resultado?.erro || "Não foi possível registrar o chamado.");
        return;
      }

      setForm({
        numero: "", entrada: todayISO, cliente: "", endereco: "", produto: "",
        vendedor: "", tecnico: "", previsaoVisita: "", dataVisita: "",
        status: "⚪ Aberto", servicos: "", observacoes: "",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <SectionLabel>Registrar novo chamado</SectionLabel>
      <Card style={{ padding: 14, marginTop: 10 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <Field label="Nº assistência">
            <input style={inputStyle()} value={form.numero} onChange={set("numero")} placeholder="65123" />
          </Field>
          <Field label="Entrada">
            <input type="date" style={inputStyle()} value={form.entrada} onChange={set("entrada")} />
          </Field>
        </div>

        <Field label="Cliente">
          <input style={inputStyle()} value={form.cliente} onChange={set("cliente")} placeholder="Nome do cliente" />
        </Field>
        <Field label="Endereço / bairro">
          <input style={inputStyle()} value={form.endereco} onChange={set("endereco")} placeholder="Bairro ou cidade" />
        </Field>
        <Field label="Produto">
          <select style={inputStyle()} value={form.produto} onChange={set("produto")}>
            <option value="">— selecionar —</option>
            {PRODUTO_OPTS.map((produto) => (
              <option key={produto} value={produto}>{produto}</option>
            ))}
          </select>
        </Field>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <Field label="Vendedor">
            <select style={inputStyle()} value={form.vendedor} onChange={set("vendedor")}>
              <option value="">— selecionar —</option>
              {VENDEDOR_OPTS.map((vendedor) => (
                <option key={vendedor} value={vendedor}>{vendedor}</option>
              ))}
            </select>
          </Field>
          <Field label="Assistente técnico">
            <select style={inputStyle()} value={form.tecnico} onChange={set("tecnico")}>
              <option value="">— selecionar —</option>
              {TECNICO_OPTS.map((tecnico) => (
                <option key={tecnico} value={tecnico}>{tecnico}</option>
              ))}
            </select>
          </Field>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <Field label="Previsão de visita">
            <input type="date" style={inputStyle()} value={form.previsaoVisita} onChange={set("previsaoVisita")} />
          </Field>
          <Field label="Data da visita">
            <input
              type="date"
              style={inputStyle()}
              value={form.dataVisita}
              onChange={(e) => {
                const v = e.target.value;
                setForm((f) => ({ ...f, dataVisita: v, status: v ? "✅ Concluído" : f.status }));
              }}
            />
          </Field>
        </div>

        <Field label="Status">
          <select style={inputStyle()} value={form.status} onChange={set("status")}>
            {STATUS_OPTS.map((s) => <option key={s.key} value={s.value}>{STATUS_META[s.key].label}</option>)}
          </select>
        </Field>

        <Field label="Serviço">
          <select style={inputStyle()} value={form.servicos} onChange={set("servicos")}>
            <option value="">— selecionar —</option>
            {SERVICO_OPTS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>

        <Field label="Observações">
          <textarea style={{ ...inputStyle(), minHeight: 60, resize: "vertical" }} value={form.observacoes} onChange={set("observacoes")} />
        </Field>

        {error && (
          <div style={{ color: COLORS.red, fontSize: 12, marginBottom: 10, display: "flex", alignItems: "center", gap: 5 }}>
            <AlertTriangle size={13} /> {error}
          </div>
        )}

        <button
          onClick={submit}
          disabled={submitting}
          style={{
            width: "100%", background: COLORS.steel, color: "#fff", border: "none", borderRadius: 8,
            padding: "11px", fontSize: 13.5, fontWeight: 700, cursor: submitting ? "wait" : "pointer", display: "flex",
            alignItems: "center", justifyContent: "center", gap: 6, fontFamily: "'Barlow Condensed', sans-serif",
            letterSpacing: "0.03em", textTransform: "uppercase", opacity: submitting ? 0.72 : 1,
          }}
        >
          {submitting ? <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> : <PlusCircle size={16} />}
          {submitting ? "Registrando..." : "Registrar chamado"}
        </button>
      </Card>
    </div>
  );
}

/* ============================================================
   CHAMADOS (list + quick edit)
   ============================================================ */
function Chamados({ records, onUpdate }) {
  const [query, setQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("todos");
  const [editing, setEditing] = useState(null);

  const filtered = useMemo(() => {
    return records
      .map((r) => ({ ...r, _status: normalizeStatus(r.status) }))
      .filter((r) => (filterStatus === "todos" ? true : r._status === filterStatus))
      .filter((r) => {
        if (!query.trim()) return true;
        const q = query.toLowerCase();
        return [r.cliente, r.endereco, r.numero, r.tecnico, r.vendedor, r.produto]
          .filter(Boolean).some((v) => v.toString().toLowerCase().includes(q));
      })
      .sort((a, b) => (b.entrada || "").localeCompare(a.entrada || ""));
  }, [records, query, filterStatus]);

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <div style={{ position: "relative", flex: 1 }}>
          <Search size={14} color={COLORS.inkSoft} style={{ position: "absolute", left: 9, top: 10 }} />
          <input
            style={{ ...inputStyle(), paddingLeft: 30 }}
            placeholder="Buscar cliente, técnico, nº..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 8, marginBottom: 4 }}>
        {["todos", ...STATUS_ORDER].map((s) => {
          const active = filterStatus === s;
          const meta = s === "todos" ? null : STATUS_META[s];
          return (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              style={{
                flexShrink: 0, padding: "6px 11px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                border: `1px solid ${active ? COLORS.steel : COLORS.line}`,
                background: active ? COLORS.steel : COLORS.surface,
                color: active ? "#fff" : COLORS.ink, cursor: "pointer",
                fontFamily: "Inter, sans-serif",
              }}
            >
              {s === "todos" ? "Todos" : meta.short}
            </button>
          );
        })}
      </div>

      <div style={{ fontSize: 11.5, color: COLORS.inkSoft, marginBottom: 8 }}>{filtered.length} chamado(s)</div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.map((r) => (
          <Card key={r.id} style={{ padding: 11, cursor: "pointer" }} onClick={() => setEditing(r)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: COLORS.ink, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {r.cliente || "Sem cliente"}
                </div>
                <div style={{ fontSize: 11.5, color: COLORS.inkSoft, marginTop: 1 }}>
                  {r.endereco || "—"} {r.produto ? `· ${r.produto}` : ""}
                </div>
              </div>
              {r.numero && (
                <span style={{
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: 11.5, fontWeight: 800,
                  color: COLORS.steelDark, background: COLORS.steelSoft, border: `1px solid ${COLORS.line}`,
                  borderRadius: 6, padding: "3px 7px", flexShrink: 0,
                }}>
                  #{r.numero}
                </span>
              )}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <StatusDot status={r._status} />
                <SLABadge entrada={r.entrada} dataVisita={r.dataVisita} />
              </div>
              <div style={{ fontSize: 11, color: COLORS.inkSoft, display: "flex", gap: 10 }}>
                {r.tecnico && <span>{r.tecnico}</span>}
                <span>{formatBR(r.entrada)}</span>
              </div>
            </div>
          </Card>
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "30px 10px", color: COLORS.inkSoft, fontSize: 13 }}>
            Nenhum chamado encontrado.
          </div>
        )}
      </div>

      {editing && (
        <EditModal
          record={editing}
          onClose={() => setEditing(null)}
          onSave={async (patch) => {
            const resultado = await onUpdate(editing.id, patch);
            if (resultado?.sucesso) setEditing(null);
            return resultado;
          }}
        />
      )}
    </div>
  );
}

function EditModal({ record, onClose, onSave }) {
  const [produto, setProduto] = useState(record.produto || "");
  const [vendedor, setVendedor] = useState(record.vendedor || "");
  const [tecnico, setTecnico] = useState(record.tecnico || "");
  const [previsaoVisita, setPrevisaoVisita] = useState(record.previsaoVisita || "");
  const [dataVisita, setDataVisita] = useState(record.dataVisita || "");
  const [servicos, setServicos] = useState(record.servicos || "");
  const [observacoes, setObservacoes] = useState(record.observacoes || "");
  const [savingEdit, setSavingEdit] = useState(false);
  const [saveError, setSaveError] = useState("");

  const salvar = async () => {
    setSaveError("");
    setSavingEdit(true);
    const resultado = await onSave({ produto, vendedor, tecnico, previsaoVisita, dataVisita, servicos, observacoes });
    if (!resultado?.sucesso) {
      setSaveError(resultado?.erro || "Não foi possível salvar as alterações.");
      setSavingEdit(false);
    }
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(20,26,34,0.55)", display: "flex",
      alignItems: "flex-end", justifyContent: "center", zIndex: 50,
    }} onClick={onClose}>
      <div
        style={{ background: COLORS.surface, borderRadius: "14px 14px 0 0", width: "100%", maxWidth: 520, padding: 16, maxHeight: "85vh", overflowY: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, textTransform: "uppercase" }}>
              {record.cliente || "Chamado"}
            </div>
            <div style={{ fontSize: 11.5, color: COLORS.inkSoft }}>{record.numero ? `#${record.numero}` : ""} · {record.endereco}</div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
            <X size={18} color={COLORS.inkSoft} />
          </button>
        </div>

        <Field label="Status atual">
          <div style={{ ...inputStyle(), background: COLORS.lineSoft, fontWeight: 600 }}>
            {STATUS_META[effectiveStatus({ ...record, produto, vendedor, tecnico, previsaoVisita, dataVisita, servicos })]?.label || record.status || "Aberto"}
          </div>
        </Field>
        <Field label="Produto">
          <select style={inputStyle()} value={produto} onChange={(e) => setProduto(e.target.value)}>
            <option value="">— selecionar —</option>
            {PRODUTO_OPTS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </Field>
        <Field label="Vendedor">
          <select style={inputStyle()} value={vendedor} onChange={(e) => setVendedor(e.target.value)}>
            <option value="">— selecionar —</option>
            {VENDEDOR_OPTS.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </Field>
        <Field label="Assistente técnico">
          <select style={inputStyle()} value={tecnico} onChange={(e) => setTecnico(e.target.value)}>
            <option value="">— selecionar —</option>
            {TECNICO_OPTS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>
        <Field label="Previsão de visita">
          <input type="date" style={inputStyle()} value={previsaoVisita} onChange={(e) => setPrevisaoVisita(e.target.value)} />
        </Field>
        <Field label="Data da visita">
          <input
            type="date"
            style={inputStyle()}
            value={dataVisita}
            onChange={(e) => setDataVisita(e.target.value)}
          />
        </Field>
        {getSLA(record.entrada, dataVisita) && (
          <div style={{ marginBottom: 12, marginTop: -6 }}>
            <SLABadge entrada={record.entrada} dataVisita={dataVisita} />
          </div>
        )}
        <Field label="Serviço">
          <select style={inputStyle()} value={servicos} onChange={(e) => setServicos(e.target.value)}>
            <option value="">— selecionar —</option>
            {SERVICO_OPTS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="Observações">
          <textarea style={{ ...inputStyle(), minHeight: 60 }} value={observacoes} onChange={(e) => setObservacoes(e.target.value)} />
        </Field>

        {saveError && (
          <div style={{ fontSize: 12, color: COLORS.red, marginBottom: 10 }}>
            {saveError}
          </div>
        )}

        <button
          onClick={salvar}
          disabled={savingEdit}
          style={{
            width: "100%", background: COLORS.steel, color: "#fff", border: "none", borderRadius: 8,
            padding: "11px", fontSize: 13.5, fontWeight: 700, cursor: savingEdit ? "default" : "pointer", marginTop: 4,
            opacity: savingEdit ? 0.7 : 1,
            fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.03em", textTransform: "uppercase",
          }}
        >
          {savingEdit ? "Salvando no Google Sheets..." : "Salvar alterações"}
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   RELATÓRIO (weekly / monthly)
   ============================================================ */
function Relatorio({ records }) {
  const [mode, setMode] = useState("semanal"); // semanal | mensal
  const [refDate, setRefDate] = useState(new Date());

  const withStatus = useMemo(() => records.map((r) => ({ ...r, _status: effectiveStatus(r) })), [records]);

  const periodStart = mode === "semanal" ? startOfWeek(refDate) : startOfMonth(refDate);
  const periodEnd = mode === "semanal" ? endOfWeek(refDate) : endOfMonth(refDate);

  const periodRecords = useMemo(
    () => withStatus.filter((r) => { const d = parseISO(r.entrada); return d && d >= periodStart && d <= periodEnd; }),
    [withStatus, periodStart, periodEnd]
  );

  const reportGroup = (r) => {
    if (r._status === "concluido") return "concluido";
    if (r._status === "designado" || String(r.servicos || "").trim().toUpperCase() === "LEVANTAMENTO DESIGNADO") return "designado";
    if (r._status === "aberto") return "aberto";
    return "pendente"; // Agendado ou Atrasado
  };

  const counts = { concluido: 0, designado: 0, aberto: 0, pendente: 0 };
  periodRecords.forEach((r) => counts[reportGroup(r)]++);
  const abertosPendentes = counts.aberto + counts.pendente;

  // trend: last 8 periods
  const trend = useMemo(() => {
    const arr = [];
    for (let i = 7; i >= 0; i--) {
      const ref = mode === "semanal" ? addDays(refDate, -7 * i) : addMonths(refDate, -i);
      const s = mode === "semanal" ? startOfWeek(ref) : startOfMonth(ref);
      const e = mode === "semanal" ? endOfWeek(ref) : endOfMonth(ref);
      const recs = withStatus.filter((r) => { const d = parseISO(r.entrada); return d && d >= s && d <= e; });
      const c = { concluido: 0, designado: 0, aberto: 0, pendente: 0 };
      recs.forEach((r) => c[reportGroup(r)]++);
      arr.push({
        label: mode === "semanal" ? `${s.getDate()}/${s.getMonth() + 1}` : `${MONTH_NAMES[s.getMonth()].slice(0, 3)}`,
        Concluídos: c.concluido, Designados: c.designado, Abertos: c.aberto, Pendentes: c.pendente,
      });
    }
    return arr;
  }, [withStatus, mode, refDate]);

  const periodLabel = mode === "semanal"
    ? `${formatBR(toISO(periodStart))} – ${formatBR(toISO(periodEnd))}`
    : `${MONTH_NAMES[periodStart.getMonth()]} de ${periodStart.getFullYear()}`;

  const navigate = (dir) => {
    setRefDate((d) => mode === "semanal" ? addDays(d, dir * 7) : addMonths(d, dir));
  };

  // SLA summary for the period (only records with entrada + dataVisita, i.e. actually attended)
  const slaSummary = useMemo(() => {
    const m = { otimo: 0, bom: 0, regular: 0, ruim: 0 };
    let total = 0;
    periodRecords.forEach((r) => {
      const sla = getSLA(r.entrada, r.dataVisita);
      if (sla) { m[sla.key]++; total++; }
    });
    return { counts: m, total };
  }, [periodRecords]);

  // status composition donut for the period
  const statusDonut = useMemo(() => ([
    { name: "Aberto", value: counts.aberto || 0, color: COLORS.amber },
    { name: "Pendente", value: counts.pendente || 0, color: COLORS.red },
    { name: "Designado", value: counts.designado || 0, color: COLORS.blueMid },
    { name: "Concluído", value: counts.concluido || 0, color: COLORS.green },
  ]).filter((d) => d.value > 0), [counts]);

  // serviços ranking for the period
  const servicosBreakdown = useMemo(() => {
    const m = {};
    periodRecords.forEach((r) => {
      const key = r.servicos || "Não informado";
      m[key] = (m[key] || 0) + 1;
    });
    return Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, 7);
  }, [periodRecords]);

  const exportPeriodPdf = () => {
    const popup = window.open("", "_blank", "width=1100,height=820");
    if (!popup) {
      alert("O navegador bloqueou a janela do relatório. Libere pop-ups para exportar em PDF.");
      return;
    }

    const titulo = mode === "semanal" ? "Relatório Semanal" : "Relatório Mensal";
    const totalStatus = Math.max(1, statusDonut.reduce((sum, item) => sum + Number(item.value || 0), 0));
    const maxServico = Math.max(1, ...servicosBreakdown.map(([, qtd]) => Number(qtd || 0)));
    const emittedAt = new Date().toLocaleString("pt-BR");

    // Donut igual ao visual da tela, feito em SVG para imprimir nítido no PDF.
    const radius = 42;
    const circumference = 2 * Math.PI * radius;
    let donutOffset = 0;
    let donutAngle = -90;
    const donutLabels = [];
    const donutSegments = statusDonut.map((item) => {
      const value = Number(item.value || 0);
      const pct = value / totalStatus;
      const dash = pct * circumference;
      const segment = `<circle cx="58" cy="58" r="${radius}" fill="none" stroke="${item.color}" stroke-width="16" stroke-dasharray="${dash} ${circumference - dash}" stroke-dashoffset="${-donutOffset}" transform="rotate(-90 58 58)" />`;

      // Mostra o número dentro da fatia quando ela tiver espaço suficiente.
      if (value > 0 && pct >= 0.07) {
        const midAngle = donutAngle + (pct * 360) / 2;
        const labelRadius = 42;
        const rad = (midAngle * Math.PI) / 180;
        const lx = 58 + Math.cos(rad) * labelRadius;
        const ly = 58 + Math.sin(rad) * labelRadius;
        donutLabels.push(
          `<text x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="middle" font-size="8" font-weight="800" fill="#fff" stroke="rgba(0,0,0,.22)" stroke-width=".7" paint-order="stroke">${value}</text>`
        );
      }

      donutOffset += dash;
      donutAngle += pct * 360;
      return segment;
    }).join("");

    const donutLegend = statusDonut.map((item) => {
      const pct = Math.round((Number(item.value || 0) / totalStatus) * 100);
      return `<div class="donut-legend-row"><span class="dot" style="background:${item.color}"></span><span>${escapeReportHtml(item.name)}</span><strong>${item.value} (${pct}%)</strong></div>`;
    }).join("");

    // Linha de tendência igual ao gráfico da tela.
    const chartW = 620, chartH = 205, padL = 34, padR = 14, padT = 12, padB = 30;
    const plotW = chartW - padL - padR, plotH = chartH - padT - padB;
    const maxTrend = Math.max(1, ...trend.flatMap((x) => [
      Number(x["Concluídos"] || 0), Number(x["Designados"] || 0), Number(x["Abertos"] || 0), Number(x["Pendentes"] || 0)
    ]));
    const niceMax = Math.max(10, Math.ceil(maxTrend / 10) * 10);
    const xAt = (i) => padL + (trend.length <= 1 ? plotW / 2 : (i * plotW) / (trend.length - 1));
    const yAt = (v) => padT + plotH - (Number(v || 0) / niceMax) * plotH;
    const pointsFor = (key) => trend.map((x, i) => `${xAt(i)},${yAt(x[key])}`).join(" ");
    const gridLines = [0, .25, .5, .75, 1].map((f) => {
      const y = padT + plotH - f * plotH;
      const value = Math.round(niceMax * f);
      return `<line x1="${padL}" y1="${y}" x2="${chartW-padR}" y2="${y}" stroke="#E8DADA" stroke-dasharray="3 3"/><text x="${padL-7}" y="${y+3}" text-anchor="end" font-size="8" fill="#777">${value}</text>`;
    }).join("");
    const xLabels = trend.map((x, i) => `<text x="${xAt(i)}" y="${chartH-8}" text-anchor="middle" font-size="8" fill="#666">${escapeReportHtml(x.label)}</text>`).join("");
    const pointDots = (key, color) => trend.map((x, i) => `<circle cx="${xAt(i)}" cy="${yAt(x[key])}" r="2.4" fill="#fff" stroke="${color}" stroke-width="1.6"/>`).join("");
    const pointLabels = (key, color, offsetY = -7) => trend.map((x, i) => {
      const value = Number(x[key] || 0);
      if (!value) return "";
      return `<text x="${xAt(i)}" y="${Math.max(9, yAt(value) + offsetY)}" text-anchor="middle" font-size="8" font-weight="800" fill="${color}" stroke="#fff" stroke-width="2.4" paint-order="stroke">${value}</text>`;
    }).join("");

    const slaTotal = Math.max(1, slaSummary.total);
    const slaSegments = SLA_TIERS.map((tier) => {
      const value = slaSummary.counts[tier.key] || 0;
      return value ? `<span style="width:${(value / slaTotal) * 100}%;background:${tier.color}"></span>` : "";
    }).join("");
    const slaLegend = SLA_TIERS.map((tier) => {
      const value = slaSummary.counts[tier.key] || 0;
      return `<div class="sla-item"><span class="dot" style="background:${tier.color}"></span><span>${escapeReportHtml(tier.label)}</span><strong>${value}</strong></div>`;
    }).join("");

    const serviceRows = servicosBreakdown.map(([nome, qtd]) => `
      <div class="service-row">
        <div class="service-name">${escapeReportHtml(nome)}</div>
        <div class="service-track"><div class="service-fill" style="width:${(Number(qtd || 0) / maxServico) * 100}%"></div></div>
        <strong>${qtd}</strong>
      </div>
    `).join("");

    popup.document.write(`
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>${escapeReportHtml(titulo)}</title>
          <style>
            @page { size: A4 portrait; margin: 8mm; }
            * { box-sizing: border-box; }
            body { font-family: Arial, sans-serif; color:#182430; margin:0; font-size:10px; background:#fff; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
            .page { max-width: 760px; margin: 0 auto; }
            .top { border:1px solid #E7AAAA; border-top:8px solid #8E1B1B; border-radius:8px; overflow:hidden; margin-bottom:9px; }
            .top-title { background:#8E1B1B; color:#fff; text-align:center; padding:7px 10px 8px; }
            .top-title h1 { margin:0; font-size:17px; text-transform:uppercase; letter-spacing:.04em; }
            .top-title div { margin-top:2px; font-size:10px; opacity:.92; }
            .metrics { display:grid; grid-template-columns:1fr 1fr; gap:7px; padding:9px; background:#FBF9F5; }
            .metric { background:#fff; border:1px solid #E7AAAA; border-top:4px solid #C62828; border-radius:7px; padding:7px 9px; min-height:52px; }
            .metric:nth-child(2) { border-top-color:${COLORS.green}; }
            .metric:nth-child(3) { border-top-color:${COLORS.blueMid}; }
            .metric:nth-child(4) { border-top-color:${COLORS.amber}; }
            .metric-label { font-size:8px; color:#526071; font-weight:800; text-transform:uppercase; letter-spacing:.05em; }
            .metric-value { font-size:22px; line-height:1; font-weight:800; margin-top:6px; color:#101C29; }
            .section-title { margin:8px 0 5px; padding-bottom:4px; border-bottom:1px solid #E7AAAA; color:#8E1B1B; font-size:9px; font-weight:800; text-transform:uppercase; letter-spacing:.05em; }
            .panel { border:1px solid #E7AAAA; border-radius:7px; padding:8px 10px; break-inside:avoid; background:#fff; }
            .composition { display:grid; grid-template-columns:150px 1fr; align-items:center; gap:12px; min-height:125px; }
            .donut-wrap { display:flex; justify-content:center; }
            .donut-legend-row { display:grid; grid-template-columns:12px 1fr auto; gap:6px; align-items:center; margin:6px 0; font-size:9px; }
            .dot { width:7px; height:7px; border-radius:50%; display:inline-block; }
            .trend-svg { width:100%; height:auto; display:block; }
            .trend-legend { display:flex; gap:16px; justify-content:center; margin-top:2px; font-size:8px; color:#666; }
            .trend-legend span::before { content:""; width:14px; height:2px; display:inline-block; margin-right:4px; vertical-align:middle; }
            .trend-green::before { background:${COLORS.green}; } .trend-blue::before { background:${COLORS.blueMid}; } .trend-open::before { background:${COLORS.amber}; } .trend-pending::before { background:${COLORS.red}; }
            .sla-bar { height:12px; border-radius:7px; overflow:hidden; display:flex; background:#F4ECEC; margin:2px 0 8px; }
            .sla-bar span { height:100%; display:block; }
            .sla-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:6px 12px; }
            .sla-item { display:grid; grid-template-columns:10px 1fr auto; gap:4px; align-items:center; font-size:8px; }
            .service-row { display:grid; grid-template-columns:125px 1fr 24px; gap:7px; align-items:center; margin:5px 0; }
            .service-name { font-size:8px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
            .service-track { height:7px; border-radius:5px; overflow:hidden; background:#F3DDDD; }
            .service-fill { height:100%; background:#C62828; border-radius:5px; }
            .service-row strong { text-align:right; font-size:8px; color:#8E1B1B; }
            .footer { margin-top:8px; border-top:1px solid #E7AAAA; padding-top:5px; font-size:8px; color:#777; text-align:right; }
            @media print { body { background:#fff; } }
          </style>
        </head>
        <body>
          <div class="page">
            <div class="top">
              <div class="top-title"><h1>${escapeReportHtml(titulo)}</h1><div>${escapeReportHtml(periodLabel)}</div></div>
              <div class="metrics">
                <div class="metric"><div class="metric-label">Pedidos no período</div><div class="metric-value">${periodRecords.length}</div></div>
                <div class="metric"><div class="metric-label">Concluídos</div><div class="metric-value">${counts.concluido}</div></div>
                <div class="metric"><div class="metric-label">Designados</div><div class="metric-value">${counts.designado}</div></div>
                <div class="metric"><div class="metric-label">Abertos ou pendentes</div><div class="metric-value">${abertosPendentes}</div></div>
              </div>
            </div>

            <div class="section-title">Composição do período</div>
            <div class="panel composition">
              <div class="donut-wrap"><svg width="116" height="116" viewBox="0 0 116 116"><circle cx="58" cy="58" r="42" fill="none" stroke="#F3DDDD" stroke-width="16"/>${donutSegments}${donutLabels.join("")}<circle cx="58" cy="58" r="31" fill="#fff"/></svg></div>
              <div>${donutLegend || '<span style="color:#777">Sem dados no período.</span>'}</div>
            </div>

            <div class="section-title">Últimos 8 ${mode === "semanal" ? "semanas" : "meses"}</div>
            <div class="panel">
              <svg class="trend-svg" viewBox="0 0 ${chartW} ${chartH}">${gridLines}${xLabels}
                <polyline points="${pointsFor("Abertos")}" fill="none" stroke="${COLORS.amber}" stroke-width="2"/>${pointDots("Abertos", COLORS.amber)}${pointLabels("Abertos", COLORS.amber, -7)}
                <polyline points="${pointsFor("Pendentes")}" fill="none" stroke="${COLORS.red}" stroke-width="2"/>${pointDots("Pendentes", COLORS.red)}${pointLabels("Pendentes", COLORS.red, 12)}
                <polyline points="${pointsFor("Concluídos")}" fill="none" stroke="${COLORS.green}" stroke-width="2.2"/>${pointDots("Concluídos", COLORS.green)}${pointLabels("Concluídos", COLORS.green, -9)}
                <polyline points="${pointsFor("Designados")}" fill="none" stroke="${COLORS.blueMid}" stroke-width="2"/>${pointDots("Designados", COLORS.blueMid)}${pointLabels("Designados", COLORS.blueMid, 12)}
              </svg>
              <div class="trend-legend"><span class="trend-open">Abertos</span><span class="trend-pending">Pendentes</span><span class="trend-green">Concluídos</span><span class="trend-blue">Designados</span></div>
            </div>

            <div class="section-title">Prazo de atendimento (SLA) no período</div>
            <div class="panel">
              ${slaSummary.total ? `<div class="sla-bar">${slaSegments}</div><div class="sla-grid">${slaLegend}</div>` : '<div style="color:#777;padding:7px 0">Nenhum chamado com data de visita disponível neste período.</div>'}
            </div>

            <div class="section-title">Serviços mais solicitados</div>
            <div class="panel">${serviceRows || '<div style="color:#777;padding:7px 0">Sem dados de serviços.</div>'}</div>

            <div class="footer">Controle de Assistência Técnica • gerado em ${escapeReportHtml(emittedAt)}</div>
          </div>
          <script>window.onload = () => setTimeout(() => { window.focus(); window.print(); }, 300);<\/script>
        </body>
      </html>
    `);
    popup.document.close();
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        {["semanal", "mensal"].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              flex: 1, padding: "8px", borderRadius: 8, fontSize: 12.5, fontWeight: 700,
              border: `1px solid ${mode === m ? COLORS.steel : COLORS.line}`,
              background: mode === m ? COLORS.steel : COLORS.surface,
              color: mode === m ? "#fff" : COLORS.ink, cursor: "pointer",
              fontFamily: "'Barlow Condensed', sans-serif", textTransform: "uppercase", letterSpacing: "0.04em",
            }}
          >
            {m === "semanal" ? "Relatório semanal" : "Relatório mensal"}
          </button>
        ))}
      </div>

      {/* TICKET-STYLE REPORT HEADER (signature element) */}
      <button
        onClick={exportPeriodPdf}
        style={{
          width: "100%", marginBottom: 12, background: COLORS.steel, color: "#fff",
          border: "none", borderRadius: 8, padding: "11px", fontSize: 13.5, fontWeight: 700,
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          fontFamily: "'Barlow Condensed', sans-serif", textTransform: "uppercase", letterSpacing: "0.04em",
        }}
      >
        <FileStack size={16} />
        Exportar {mode === "semanal" ? "semana" : "mês"} em PDF
      </button>

      <div style={{
        background: COLORS.steelDark, borderRadius: "10px 10px 0 0", padding: "12px 14px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <button onClick={() => navigate(-1)} style={navBtnStyle}><ChevronLeft size={16} color="#F4F2EC" /></button>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 10, color: "#9FB0C2", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Barlow Condensed', sans-serif" }}>
            {mode === "semanal" ? "Semana de" : "Mês de"}
          </div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#F4F2EC", fontSize: 14, fontWeight: 600 }}>{periodLabel}</div>
        </div>
        <button onClick={() => navigate(1)} style={navBtnStyle}><ChevronRight size={16} color="#F4F2EC" /></button>
      </div>
      <div style={{
        background: COLORS.surface, border: `1px solid ${COLORS.line}`, borderTop: "none",
        borderRadius: "0 0 10px 10px", padding: 14,
        backgroundImage: `radial-gradient(circle, ${COLORS.bg} 3px, transparent 3px)`,
        backgroundSize: "14px 1px", backgroundPosition: "0 0", backgroundRepeat: "repeat-x",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <TicketMetric label="Pedidos no período" value={periodRecords.length} tone="steel" icon={FileStack} />
          <TicketMetric label="Concluídos" value={counts.concluido} tone="green" icon={Check} />
          <TicketMetric label="Designados" value={counts.designado} tone="blueMid" icon={CircleDot} />
          <TicketMetric label="Abertos ou pendentes" value={abertosPendentes} tone="amber" icon={Clock} sub={`${counts.aberto} aberto(s) · ${counts.pendente} pendente(s)`} />
        </div>
      </div>

      {statusDonut.length > 0 && (
        <div style={{ marginTop: 18 }}>
          <SectionLabel>Composição do período</SectionLabel>
          <Card style={{ padding: 12, marginTop: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <ResponsiveContainer width={130} height={130}>
                <PieChart>
                  <Pie data={statusDonut} dataKey="value" nameKey="name" innerRadius={38} outerRadius={58} paddingAngle={2} strokeWidth={0}>
                    {statusDonut.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: `1px solid ${COLORS.line}` }} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
                {statusDonut.map((d) => (
                  <div key={d.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12.5 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: d.color, display: "inline-block" }} />
                      {d.name}
                    </span>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, color: COLORS.ink }}>
                      {d.value} <span style={{ color: COLORS.inkSoft, fontWeight: 500 }}>({Math.round((d.value / periodRecords.length) * 100)}%)</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}

      <div style={{ marginTop: 18 }}>
        <SectionLabel>Últimos 8 {mode === "semanal" ? "semanas" : "meses"}</SectionLabel>
        <Card style={{ padding: "12px 8px 6px", marginTop: 8 }}>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={trend} margin={{ top: 18, right: 8, left: -22, bottom: 12 }}>
              <CartesianGrid strokeDasharray="2 4" stroke={COLORS.lineSoft} vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 10.5, fill: COLORS.inkSoft }} axisLine={{ stroke: COLORS.line }} tickLine={false} />
              <YAxis tick={{ fontSize: 10.5, fill: COLORS.inkSoft }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: `1px solid ${COLORS.line}` }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="Concluídos" stroke={COLORS.green} strokeWidth={2.2} dot={{ r: 3 }} activeDot={{ r: 5 }}><LabelList dataKey="Concluídos" position="top" formatter={(v) => v ? v : ""} style={{ fontSize: 10, fontWeight: 700, fill: COLORS.green }} /></Line>
              <Line type="monotone" dataKey="Designados" stroke={COLORS.blueMid} strokeWidth={2.2} dot={{ r: 3 }} activeDot={{ r: 5 }}><LabelList dataKey="Designados" position="bottom" formatter={(v) => v ? v : ""} style={{ fontSize: 10, fontWeight: 700, fill: COLORS.blueMid }} /></Line>
              <Line type="monotone" dataKey="Abertos" stroke={COLORS.amber} strokeWidth={2.2} dot={{ r: 3 }} activeDot={{ r: 5 }}><LabelList dataKey="Abertos" position="top" formatter={(v) => v ? v : ""} style={{ fontSize: 10, fontWeight: 700, fill: COLORS.amber }} /></Line>
              <Line type="monotone" dataKey="Pendentes" stroke={COLORS.red} strokeWidth={2.2} dot={{ r: 3 }} activeDot={{ r: 5 }}><LabelList dataKey="Pendentes" position="bottom" formatter={(v) => v ? v : ""} style={{ fontSize: 10, fontWeight: 700, fill: COLORS.red }} /></Line>
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div style={{ marginTop: 18 }}>
        <SectionLabel>Prazo de atendimento (SLA) no período</SectionLabel>
        <Card style={{ padding: 12, marginTop: 8 }}>
          {slaSummary.total === 0 ? (
            <div style={{ fontSize: 12.5, color: COLORS.inkSoft }}>Nenhum chamado com visita realizada neste período.</div>
          ) : (
            <>
              <div style={{ display: "flex", height: 10, borderRadius: 5, overflow: "hidden", marginBottom: 10 }}>
                {SLA_TIERS.map((t) => {
                  const n = slaSummary.counts[t.key];
                  if (!n) return null;
                  return <div key={t.key} style={{ width: `${(n / slaSummary.total) * 100}%`, background: t.color }} title={`${t.label}: ${n}`} />;
                })}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {SLA_TIERS.map((t) => (
                  <div key={t.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12.5 }}>
                    <span>{t.emoji} {t.label}</span>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, color: COLORS.ink }}>{slaSummary.counts[t.key]}</span>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 10.5, color: COLORS.inkSoft, marginTop: 8 }}>
                🟢 até 1 dia · 🔵 até 2 dias · 🟡 3–4 dias · 🔴 5+ dias
              </div>
            </>
          )}
        </Card>
      </div>

      <div style={{ marginTop: 18 }}>
        <SectionLabel>Serviços mais solicitados</SectionLabel>
        <Card style={{ padding: 12, marginTop: 8 }}>
          {servicosBreakdown.length === 0 ? (
            <div style={{ fontSize: 12.5, color: COLORS.inkSoft }}>Sem chamados no período.</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {servicosBreakdown.map(([name, n]) => {
                const max = servicosBreakdown[0][1];
                return (
                  <div key={name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 12, width: 120, flexShrink: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</span>
                    <div style={{ flex: 1, background: COLORS.lineSoft, borderRadius: 4, height: 8, overflow: "hidden" }}>
                      <div style={{ width: `${(n / max) * 100}%`, height: "100%", background: COLORS.steel, borderRadius: 4 }} />
                    </div>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, width: 20, textAlign: "right", color: COLORS.inkSoft }}>{n}</span>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

const navBtnStyle = {
  background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 6, width: 28, height: 28,
  display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0,
};

/* ============================================================
   ABA "HOJE" — um único painel, na ordem da rotina real:
   1) Em cima: cards de "Operação do Dia" (Entradas/Programadas/Concluídas/Designados)
      — copiados na manhã seguinte, como relatório do que foi feito
   2) Embaixo: lista do que está previsto (Previsão Visita = data)
      — copiada de manhã, antes de sair a equipe
   Navegação por data compartilhada entre as duas partes.
   ============================================================ */
function ProgramacaoDia({ records, onToast }) {
  const [dateISO, setDateISO] = useState(toISO(new Date()));
  const [copiedAll, setCopiedAll] = useState(false);
  const [showTextModal, setShowTextModal] = useState(false);

  const dateObj = parseISO(dateISO);
  const weekdayLabel = dateObj ? WEEKDAY_ABBR[dateObj.getDay()] : "";
  const isToday = dateISO === toISO(new Date());
  const shiftDate = (n) => setDateISO(toISO(addDays(parseISO(dateISO), n)));

  useEffect(() => { setCopiedAll(false); }, [dateISO]);

  const withStatus = useMemo(() => records.map((r) => ({ ...r, _status: normalizeStatus(r.status) })), [records]);

  const stats = useMemo(() => {
    const entradas = records.filter((r) => r.entrada === dateISO);
    const designados = records.filter((r) => r.previsaoVisita === dateISO && r.servicos === "LEVANTAMENTO DESIGNADO");
    const programadas = records.filter((r) => r.previsaoVisita === dateISO).length - designados.length;
    const concluidas = records.filter(
      (r) => r.previsaoVisita === dateISO && normalizeStatus(r.status) === "concluido"
    );

    const pendentes = records.filter((r) => {
      const status = normalizeStatus(r.status);
      const servico = String(r.servicos || "").trim().toUpperCase();

      return (
        r.previsaoVisita === dateISO &&
        status !== "concluido" &&
        status !== "designado" &&
        servico !== "LEVANTAMENTO DESIGNADO"
      );
    });

    return {
      entradas: entradas.length,
      programadas: Math.max(programadas, 0),
      concluidas: concluidas.length,
      designados: designados.length,
      pendentes: pendentes.length,
    };
  }, [records, dateISO]);
  const diff = stats.programadas - stats.concluidas;

  const dayRecords = useMemo(() => {
    return withStatus
      .filter((r) => r.previsaoVisita === dateISO)
      .sort((a, b) => (a.tecnico || "").localeCompare(b.tecnico || ""));
  }, [withStatus, dateISO]);

  const pendentesDoDia = useMemo(
    () => dayRecords.filter((r) => {
      const servico = String(r.servicos || "").trim().toUpperCase();

      return (
        r.previsaoVisita === dateISO &&
        r._status !== "concluido" &&
        r._status !== "designado" &&
        servico !== "LEVANTAMENTO DESIGNADO"
      );
    }),
    [dayRecords, dateISO]
  );

  const pendentesPorTecnico = useMemo(() => {
    const grupos = {};
    pendentesDoDia.forEach((r) => {
      const tecnico = r.tecnico || "Não atribuído";
      (grupos[tecnico] = grupos[tecnico] || []).push(r);
    });
    return Object.entries(grupos).sort((a, b) => a[0].localeCompare(b[0], "pt-BR"));
  }, [pendentesDoDia]);

  const byTecnico = useMemo(() => {
    const m = {};
    dayRecords.forEach((r) => {
      const key = r.tecnico || "Não atribuído";
      (m[key] = m[key] || []).push(r);
    });
    return Object.entries(m).sort((a, b) => a[0].localeCompare(b[0]));
  }, [dayRecords]);

  const exportDailyPdf = () => {
    const popup = window.open("", "_blank", "width=1100,height=820");

    if (!popup) {
      alert("O navegador bloqueou a janela do relatório. Libere pop-ups para exportar em PDF.");
      return;
    }

    const programacaoPorTecnico = (() => {
      const grupos = {};
      dayRecords.forEach((r) => {
        const tecnico = r.tecnico || "Não atribuído";
        (grupos[tecnico] = grupos[tecnico] || []).push(r);
      });
      return Object.entries(grupos).sort((a, b) => a[0].localeCompare(b[0], "pt-BR"));
    })();

    const pendenciasPorTecnicoPdf = (() => {
      const grupos = {};
      pendentesDoDia.forEach((r) => {
        const tecnico = r.tecnico || "Não atribuído";
        (grupos[tecnico] = grupos[tecnico] || []).push(r);
      });
      return Object.entries(grupos).sort((a, b) => a[0].localeCompare(b[0], "pt-BR"));
    })();

    const statusLabel = (r) =>
      STATUS_META[r._status]?.label || r.status || "—";

    const pendenciasHtml = pendenciasPorTecnicoPdf.length
      ? pendenciasPorTecnicoPdf.map(([tecnico, itens]) => `
          <section class="tech-section">
            <div class="tech-title">
              <span>${escapeReportHtml(tecnico)}</span>
              <span>${itens.length}</span>
            </div>

            ${itens.map((r) => `
              <div class="visit-card pending">
                <div class="visit-main">
                  <div class="visit-title">
                    ${r.numero ? `<span class="number">#${escapeReportHtml(r.numero)}</span>` : ""}
                    ${escapeReportHtml(r.cliente || "Cliente não informado")}
                  </div>
                  <div class="visit-sub">
                    ${escapeReportHtml([r.produto, r.servicos].filter(Boolean).join(" • ") || "—")}
                  </div>
                </div>
                <div class="status pending-status">${escapeReportHtml(statusLabel(r))}</div>
              </div>
            `).join("")}
          </section>
        `).join("")
      : `<div class="empty">Nenhuma pendência para o dia.</div>`;

    const programacaoHtml = programacaoPorTecnico.length
      ? programacaoPorTecnico.map(([tecnico, itens]) => `
          <section class="tech-section">
            <div class="tech-title neutral">
              <span>${escapeReportHtml(tecnico)}</span>
              <span>${itens.length}</span>
            </div>

            ${itens.map((r) => `
              <div class="visit-card">
                <div class="visit-main">
                  <div class="visit-title">
                    ${r.numero ? `<span class="number">#${escapeReportHtml(r.numero)}</span>` : ""}
                    ${escapeReportHtml(r.cliente || "Cliente não informado")}
                  </div>
                  <div class="visit-sub">
                    ${escapeReportHtml([r.endereco, r.produto, r.servicos].filter(Boolean).join(" • ") || "—")}
                  </div>
                </div>
                <div class="status">${escapeReportHtml(statusLabel(r))}</div>
              </div>
            `).join("")}
          </section>
        `).join("")
      : `<div class="empty">Nenhuma visita prevista para esta data.</div>`;

    const diffText =
      diff === 0
        ? stats.programadas > 0
          ? "Todas as visitas programadas foram concluídas."
          : "Nenhuma visita programada para este dia."
        : diff > 0
          ? `${diff} visita(s) programada(s) não foram concluídas no dia.`
          : `${Math.abs(diff)} conclusão(ões) acima do total programado.`;

    popup.document.write(`
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Relatório Diário de Assistência Técnica</title>
          <style>
            @page { size: A4 portrait; margin: 10mm; }

            * { box-sizing: border-box; }

            body {
              margin: 0;
              font-family: Arial, sans-serif;
              color: #182430;
              background: #fff;
              font-size: 11px;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }

            .header {
              text-align: center;
              padding-bottom: 10px;
              border-bottom: 1px solid #E7C7C7;
              margin-bottom: 12px;
            }

            .header .eyebrow {
              font-size: 9px;
              color: #A33A3A;
              font-weight: 700;
              letter-spacing: .08em;
              text-transform: uppercase;
            }

            .header h1 {
              margin: 3px 0 2px;
              font-size: 20px;
              color: #1F2A35;
            }

            .header .date {
              font-size: 12px;
              color: #A02020;
              font-weight: 700;
            }

            .section-label {
              margin: 14px 0 7px;
              font-size: 10px;
              color: #A02020;
              text-transform: uppercase;
              letter-spacing: .07em;
              font-weight: 800;
              border-bottom: 1px solid #E8CACA;
              padding-bottom: 5px;
            }

            .metrics {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 8px;
            }

            .metric {
              border: 1px solid #E6BABA;
              border-radius: 9px;
              padding: 9px 11px;
              background: #fff;
              break-inside: avoid;
            }

            .metric:nth-child(1) { border-top: 3px solid #C62828; }
            .metric:nth-child(2) { border-top: 3px solid #6E88AF; }
            .metric:nth-child(3) { border-top: 3px solid #2F7D4B; }
            .metric:nth-child(4) { border-top: 3px solid #C98222; }
            .metric:nth-child(5) { border-top: 3px solid #B94A48; }

            .metric-label {
              font-size: 9px;
              color: #596673;
              font-weight: 800;
              text-transform: uppercase;
              letter-spacing: .05em;
            }

            .metric-value {
              margin-top: 3px;
              font-size: 24px;
              font-weight: 800;
              color: #162330;
            }

            .alert {
              margin-top: 9px;
              border: 1px solid #D49A3B;
              background: #FFF9EF;
              color: #815C22;
              border-radius: 8px;
              padding: 8px 10px;
            }

            .tech-section {
              margin-bottom: 10px;
              break-inside: avoid;
            }

            .tech-title {
              display: flex;
              justify-content: space-between;
              gap: 10px;
              margin-bottom: 5px;
              color: #B33434;
              font-size: 9px;
              font-weight: 800;
              text-transform: uppercase;
              letter-spacing: .04em;
            }

            .tech-title.neutral {
              color: #4E6174;
            }

            .visit-card {
              display: flex;
              justify-content: space-between;
              align-items: center;
              gap: 10px;
              border: 1px solid #E7D0D0;
              border-radius: 8px;
              padding: 8px 9px;
              margin-bottom: 5px;
              background: #fff;
              break-inside: avoid;
            }

            .visit-card.pending {
              border-color: #E6A8A8;
            }

            .visit-main {
              min-width: 0;
              flex: 1;
            }

            .visit-title {
              font-size: 10px;
              font-weight: 700;
              color: #182430;
            }

            .number {
              color: #C33E3E;
              font-weight: 800;
              margin-right: 5px;
            }

            .visit-sub {
              margin-top: 2px;
              font-size: 9px;
              color: #607080;
            }

            .status {
              flex-shrink: 0;
              font-size: 9px;
              font-weight: 700;
              color: #4E6174;
              text-align: right;
            }

            .pending-status {
              color: #B33434;
            }

            .empty {
              padding: 10px;
              color: #7A8793;
              border: 1px dashed #D9CACA;
              border-radius: 8px;
            }

            .footer {
              margin-top: 14px;
              text-align: right;
              color: #8A939C;
              font-size: 8px;
            }

            @media print {
              body { background: #fff; }
            }
          </style>
        </head>

        <body>
          <div class="header">
            <div class="eyebrow">Controle de Assistência Técnica</div>
            <h1>Relatório Diário</h1>
            <div class="date">${escapeReportHtml(formatBR(dateISO))}</div>
          </div>

          <div class="section-label">Operação do dia</div>

          <div class="metrics">
            <div class="metric">
              <div class="metric-label">Entradas</div>
              <div class="metric-value">${stats.entradas}</div>
            </div>

            <div class="metric">
              <div class="metric-label">Programadas</div>
              <div class="metric-value">${stats.programadas}</div>
            </div>

            <div class="metric">
              <div class="metric-label">Concluídas</div>
              <div class="metric-value">${stats.concluidas}</div>
            </div>

            <div class="metric">
              <div class="metric-label">Designados</div>
              <div class="metric-value">${stats.designados}</div>
            </div>

            <div class="metric">
              <div class="metric-label">Pendentes</div>
              <div class="metric-value">${stats.pendentes}</div>
            </div>
          </div>

          <div class="alert">${escapeReportHtml(diffText)}</div>

          <div class="section-label">Pendências do dia</div>
          ${pendenciasHtml}

          <div class="section-label">Programação prevista</div>
          ${programacaoHtml}

          <div class="footer">
            Gerado em ${new Date().toLocaleString("pt-BR")}
          </div>

          <script>
            window.onload = () => {
              setTimeout(() => {
                window.focus();
                window.print();
              }, 250);
            };
          <\/script>
        </body>
      </html>
    `);

    popup.document.close();
  };

  const buildFullText = () => {
    const [y, m, d] = dateISO.split("-");
    const lines = [
      `RELATÓRIO DO DIA — ${d}/${m}/${y}`,
      ``,
      `— OPERAÇÃO DO DIA —`,
      `Entradas: ${stats.entradas}`,
      `Programadas: ${stats.programadas}`,
      `Concluídas: ${stats.concluidas}`,
      `Levantamentos designados: ${stats.designados}`,
      diff === 0
        ? (stats.programadas > 0 ? `Todas as visitas programadas foram concluídas.` : `Nenhuma visita programada para este dia.`)
        : diff > 0
          ? `${diff} visita(s) programada(s) não concluída(s) no dia.`
          : `${Math.abs(diff)} visita(s) concluída(s) além do programado.`,
      ``,
      `— PROGRAMAÇÃO PREVISTA —`,
    ];
    if (dayRecords.length === 0) {
      lines.push(`Nenhuma visita prevista para esta data.`);
    } else {
      dayRecords.forEach((r, i) => {
        const parts = [r.cliente || r.endereco || "Sem cliente"];
        if (r.endereco && r.cliente) parts.push(r.endereco);
        if (r.produto) parts.push(r.produto);
        const tec = r.tecnico ? `Téc: ${r.tecnico}` : "Téc: não atribuído";
        lines.push(`${i + 1}. ${parts.join(" — ")} — ${tec}`);
      });
    }
    return lines.join("\n");
  };

  const copyAll = async () => {
    const text = buildFullText();
    // 1) tenta a API moderna de clipboard
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        setCopiedAll(true);
        onToast && onToast("Relatório do dia copiado.");
        return;
      }
    } catch (e) { /* cai pro fallback abaixo */ }

    // 2) fallback: campo de texto temporário + execCommand
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      if (ok) {
        setCopiedAll(true);
        onToast && onToast("Relatório do dia copiado.");
        return;
      }
    } catch (e) { /* cai pro fallback manual */ }

    // 3) último recurso: mostra o texto pra copiar manualmente
    setShowTextModal(true);
  };

  return (
    <div>
      {/* shared date navigator — ticket header style */}
      <div style={{
        background: COLORS.steelDark, borderRadius: "10px 10px 0 0", padding: "12px 14px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <button onClick={() => shiftDate(-1)} style={navBtnStyle}><ChevronLeft size={16} color="#F4F2EC" /></button>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 10, color: "#9FB0C2", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Barlow Condensed', sans-serif" }}>
            {isToday ? "Hoje" : weekdayLabel}
          </div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#F4F2EC", fontSize: 14, fontWeight: 600 }}>{formatBR(dateISO)}</div>
        </div>
        <button onClick={() => shiftDate(1)} style={navBtnStyle}><ChevronRight size={16} color="#F4F2EC" /></button>
      </div>
      <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.line}`, borderTop: "none", borderRadius: "0 0 10px 10px", padding: 14 }}>
        <input type="date" value={dateISO} onChange={(e) => setDateISO(e.target.value)} style={inputStyle()} />
      </div>

      <button
        onClick={exportDailyPdf}
        style={{
          width: "100%", marginTop: 12, background: COLORS.surface, color: COLORS.steel,
          border: `1px solid ${COLORS.steel}`, borderRadius: 8, padding: "12px", fontSize: 13.5, fontWeight: 700, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.03em", textTransform: "uppercase",
        }}
      >
        <FileStack size={16} />
        Exportar relatório em PDF
      </button>

      <SectionLabel>Operação do dia</SectionLabel>
      <div style={{ marginTop: 8 }}>
        <OperacaoDoDiaView stats={stats} diff={diff} />
      </div>

      {pendentesDoDia.length > 0 && (
        <div style={{ marginTop: 20, marginBottom: 20 }}>
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 12,
            fontWeight: 800,
            color: COLORS.red,
            textTransform: "uppercase",
            letterSpacing: ".07em",
            borderBottom: `1px solid ${COLORS.line}`,
            paddingBottom: 7,
            marginBottom: 10
          }}>
            Pendências do dia
          </div>

          {pendentesPorTecnico.map(([tecnico, itens]) => (
            <div key={tecnico} style={{ marginBottom: 14 }}>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontSize: 12,
                color: COLORS.red,
                textTransform: "uppercase",
                marginBottom: 6
              }}>
                {tecnico} ({itens.length})
              </div>

              {itens.map((r) => (
                <div key={r.id} style={{
                  background: COLORS.surface,
                  border: `1px solid ${COLORS.redLine || COLORS.line}`,
                  borderRadius: 9,
                  padding: "10px 12px",
                  marginBottom: 7,
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  alignItems: "center"
                }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 800, fontSize: 13, color: COLORS.ink }}>
                      {r.numero && (
                        <span style={{ color: COLORS.red, marginRight: 7 }}>
                          #{r.numero}
                        </span>
                      )}
                      {r.cliente || "Cliente não informado"}
                    </div>

                    <div style={{ fontSize: 11, color: COLORS.inkSoft, marginTop: 2 }}>
                      {[r.produto, r.servicos].filter(Boolean).join(" • ")}
                    </div>
                  </div>

                  <div style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: COLORS.red,
                    flexShrink: 0
                  }}>
                    {STATUS_META[r._status]?.label || r.status || "Pendente"}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 22 }}>
        <SectionLabel>Programação prevista</SectionLabel>
      </div>
      <div style={{ marginTop: 8 }}>
        <ProgramacaoView dayRecords={dayRecords} byTecnico={byTecnico} />
      </div>
    </div>
  );
}

function TextShareModal({ text, onClose }) {
  const taRef = React.useRef(null);
  useEffect(() => {
    if (taRef.current) {
      taRef.current.focus();
      taRef.current.select();
    }
  }, []);
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(20,26,34,0.55)", display: "flex",
      alignItems: "flex-end", justifyContent: "center", zIndex: 60,
    }} onClick={onClose}>
      <div
        style={{ background: COLORS.surface, borderRadius: "14px 14px 0 0", width: "100%", maxWidth: 520, padding: 16, maxHeight: "85vh", overflowY: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 15, textTransform: "uppercase" }}>
            Texto do relatório
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
            <X size={18} color={COLORS.inkSoft} />
          </button>
        </div>
        <div style={{ fontSize: 11.5, color: COLORS.inkSoft, marginBottom: 8 }}>
          O texto já está selecionado — toque e segure e escolha "Copiar", ou use o menu do seu navegador.
        </div>
        <textarea
          ref={taRef}
          readOnly
          value={text}
          style={{
            width: "100%", minHeight: 260, padding: 10, border: `1px solid ${COLORS.line}`, borderRadius: 8,
            fontSize: 12.5, fontFamily: "'IBM Plex Mono', monospace", color: COLORS.ink, boxSizing: "border-box",
            resize: "vertical",
          }}
        />
      </div>
    </div>
  );
}

function ProgramacaoView({ dayRecords, byTecnico }) {
  return (
    <div>
      <div style={{ fontSize: 12.5, color: COLORS.inkSoft, margin: "2px 0 10px" }}>
        <strong style={{ color: COLORS.ink, fontFamily: "'IBM Plex Mono', monospace" }}>{dayRecords.length}</strong> visita(s) prevista(s)
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {byTecnico.length === 0 && (
          <div style={{ textAlign: "center", padding: "30px 10px", color: COLORS.inkSoft, fontSize: 13 }}>
            Nenhuma visita com previsão para esta data.
          </div>
        )}
        {byTecnico.map(([tecnico, recs]) => (
          <div key={tecnico}>
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.05em",
              textTransform: "uppercase", color: COLORS.steel, marginBottom: 6,
            }}>
              {tecnico} <span style={{ color: COLORS.inkSoft, fontWeight: 500 }}>({recs.length})</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {recs.map((r) => (
                <Card key={r.id} style={{ padding: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                    <div style={{ minWidth: 0 }}>
                      {r.numero && (
                        <div style={{
                          display: "inline-block", marginBottom: 4, padding: "2px 7px", borderRadius: 6,
                          background: COLORS.redSoft, color: COLORS.red, border: `1px solid ${COLORS.redLine}`,
                          fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, fontWeight: 800,
                        }}>
                          #{r.numero}
                        </div>
                      )}
                      <div style={{ fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {r.cliente || "Sem cliente"}
                      </div>
                      <div style={{ fontSize: 11.5, color: COLORS.inkSoft }}>{r.endereco} {r.produto ? `· ${r.produto}` : ""}</div>
                    </div>
                    <StatusDot status={r._status} />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Operação do Dia — replica a aba "Dashboard" (bloco "Operação do Dia") da planilha:
   Entradas Hoje, Programadas Hoje, Concluídas Hoje, Designados Hoje — para uma data específica,
   normalmente enviada no dia SEGUINTE para comparar planejado x realizado. */
function OperacaoDoDiaView({ stats, diff }) {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <TicketMetric label="Entradas" value={stats.entradas} tone="steel" icon={FileStack} />
        <TicketMetric label="Programadas" value={stats.programadas} tone="blueMid" icon={CalendarDays} />
        <TicketMetric label="Concluídas" value={stats.concluidas} tone="green" icon={Check} />
        <TicketMetric label="Designados" value={stats.designados} tone="amber" icon={CircleDot} />
        <TicketMetric label="Pendentes" value={stats.pendentes} tone="red" icon={AlertTriangle} />
      </div>

      <Card style={{ padding: 12, marginTop: 12, borderColor: diff > 0 ? COLORS.amber : COLORS.line, background: diff > 0 ? "#FBF3E4" : COLORS.surface }}>
        <div style={{ fontSize: 12.5, color: diff > 0 ? "#5C3B10" : COLORS.inkSoft }}>
          {diff === 0 && stats.programadas > 0 && "✓ Todas as visitas programadas foram concluídas."}
          {diff === 0 && stats.programadas === 0 && "Nenhuma visita programada para este dia."}
          {diff > 0 && `⚠ ${diff} visita(s) programada(s) não foram concluídas no dia.`}
          {diff < 0 && `${Math.abs(diff)} visita(s) concluída(s) além do que estava programado.`}
        </div>
      </Card>
    </div>
  );
}
