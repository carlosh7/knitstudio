#!/usr/bin/env node
// Generate complete documentation in 9 languages

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const langs = ["en", "es", "fr", "de", "it", "pt", "zh", "ja", "ko"];

const langNames = {
  en: "English", es: "Español", fr: "Français", de: "Deutsch",
  it: "Italiano", pt: "Português", zh: "中文", ja: "日本語", ko: "한국어"
};

const headers = {
  en: { title: "Getting Started Guide", subtitle: "Welcome to knitstudio!", desc: "This guide helps you get started quickly.", features: "Key Features", tutorials: "Tutorials", comparison: "Comparison" },
  es: { title: "Guía de Inicio", subtitle: "¡Bienvenido a knitstudio!", desc: "Esta guía te ayuda a empezar rápidamente.", features: "Características Clave", tutorials: "Tutoriales", comparison: "Comparativa" },
  fr: { title: "Guide de Démarrage", subtitle: "Bienvenue sur knitstudio!", desc: "Ce guide vous aide à démarrer rapidement.", features: "Fonctionnalités Clés", tutorials: "Tutoriels", comparison: "Comparaison" },
  de: { title: "Erste Schritte", subtitle: "Willkommen bei knitstudio!", desc: "Diese Anleitung hilft Ihnen beim schnellen Einstieg.", features: "Hauptfunktionen", tutorials: "Tutorials", comparison: "Vergleich" },
  it: { title: "Guida Introduttiva", subtitle: "Benvenuto in knitstudio!", desc: "Questa guida ti aiuta a iniziare rapidamente.", features: "Caratteristiche Principali", tutorials: "Tutorial", comparison: "Confronto" },
  pt: { title: "Guia de Início", subtitle: "Bem-vindo ao knitstudio!", desc: "Este guia ajuda você a começar rapidamente.", features: "Recursos Principais", tutorials: "Tutoriais", comparison: "Comparação" },
  zh: { title: "入门指南", subtitle: "欢迎使用 knitstudio！", desc: "本指南将帮助您快速上手。", features: "主要功能", tutorials: "教程", comparison: "对比" },
  ja: { title: "はじめに", subtitle: "knitstudioへようこそ！", desc: "このガイドですぐに始められます。", features: "主な機能", tutorials: "チュートリアル", comparison: "比較" },
  ko: { title: "시작 가이드", subtitle: "knitstudio에 오신 것을 환영합니다!", desc: "이 가이드로 빠르게 시작하세요.", features: "주요 기능", tutorials: "튜토리얼", comparison: "비교" },
};

const steps = {
  en: ["Create a Project", "Open the Builder", "Add Components", "Connect Data", "Publish", "Export Code"],
  es: ["Crear un Proyecto", "Abrir el Builder", "Agregar Componentes", "Conectar Datos", "Publicar", "Exportar Código"],
  fr: ["Créer un Projet", "Ouvrir le Builder", "Ajouter des Composants", "Connecter des Données", "Publier", "Exporter le Code"],
  de: ["Projekt erstellen", "Builder öffnen", "Komponenten hinzufügen", "Daten verbinden", "Veröffentlichen", "Code exportieren"],
  it: ["Creare un Progetto", "Aprire il Builder", "Aggiungere Componenti", "Connettere Dati", "Pubblicare", "Esportare Codice"],
  pt: ["Criar um Projeto", "Abrir o Builder", "Adicionar Componentes", "Conectar Dados", "Publicar", "Exportar Código"],
  zh: ["创建项目", "打开构建器", "添加组件", "连接数据", "发布", "导出代码"],
  ja: ["プロジェクト作成", "ビルダーを開く", "コンポーネント追加", "データ接続", "公開", "コード出力"],
  ko: ["프로젝트 만들기", "빌더 열기", "컴포넌트 추가", "데이터 연결", "게시", "코드 내보내기"],
};

const stepDescs = {
  en: ["Click 'New Project' on the dashboard", "Click your project to enter the visual builder", "Use the Components panel to drag items onto the canvas", "Open the Data panel and add API sources", "Click Publish when ready", "Run 'knit export --project=ID' in the CLI"],
  es: ["Haz clic en 'Nuevo Proyecto' en el panel", "Haz clic en tu proyecto para entrar al builder", "Usa el panel de Componentes para arrastrar elementos", "Abre el panel de Datos y agrega fuentes API", "Haz clic en Publicar cuando esté listo", "Ejecuta 'knit export --project=ID' en la CLI"],
  fr: ["Cliquez sur 'Nouveau Projet' dans le tableau de bord", "Cliquez sur votre projet pour entrer dans le builder", "Utilisez le panneau Composants pour glisser des éléments", "Ouvrez le panneau Données et ajoutez des sources API", "Cliquez sur Publier quand c'est prêt", "Exécutez 'knit export --project=ID' dans la CLI"],
  de: ["Klicken Sie auf 'Neues Projekt' im Dashboard", "Klicken Sie auf Ihr Projekt, um den Builder zu öffnen", "Verwenden Sie das Komponenten-Panel zum Ziehen von Elementen", "Öffnen Sie das Daten-Panel und fügen Sie API-Quellen hinzu", "Klicken Sie auf Veröffentlichen", "Führen Sie 'knit export --project=ID' in der CLI aus"],
  it: ["Clicca su 'Nuovo Progetto' nel dashboard", "Clicca sul progetto per entrare nel builder", "Usa il pannello Componenti per trascinare elementi", "Apri il pannello Dati e aggiungi fonti API", "Clicca su Pubblica quando sei pronto", "Esegui 'knit export --project=ID' nella CLI"],
  pt: ["Clique em 'Novo Projeto' no painel", "Clique no projeto para entrar no builder", "Use o painel de Componentes para arrastar itens", "Abra o painel de Dados e adicione fontes de API", "Clique em Publicar quando estiver pronto", "Execute 'knit export --project=ID' na CLI"],
  zh: ["在仪表板上点击'新建项目'", "点击项目进入可视化构建器", "使用组件面板将项目拖到画布上", "打开数据面板并添加API源", "准备就绪后点击发布", "在CLI中运行'knit export --project=ID'"],
  ja: ["ダッシュボードで「新規プロジェクト」をクリック", "プロジェクトをクリックしてビジュアルビルダーを開く", "コンポーネントパネルを使ってアイテムをドラッグ", "データパネルを開いてAPIソースを追加", "準備ができたら「公開」をクリック", "CLIで「knit export --project=ID」を実行"],
  ko: ["대시보드에서 '새 프로젝트'를 클릭하세요", "프로젝트를 클릭하여 비주얼 빌더에 입장하세요", "컴포넌트 패널을 사용하여 항목을 캔버스로 드래그하세요", "데이터 패널을 열고 API 소스를 추가하세요", "준비가 되면 게시를 클릭하세요", "CLI에서 'knit export --project=ID'를 실행하세요"],
};

// Generate docs
for (const lang of langs) {
  const h = headers[lang];
  const guideDir = join(ROOT, "docs", "guide", lang);
  const tutorialDir = join(ROOT, "docs", "tutorials", lang);
  mkdirSync(guideDir, { recursive: true });
  mkdirSync(tutorialDir, { recursive: true });

  // GETTING STARTED
  let content = `# ${h.title}\n\n## ${h.subtitle}\n\n${h.desc}\n\n`;
  content += `## ${lang === "en" ? "Quick Start Steps" : lang === "es" ? "Pasos Rápidos" : lang === "fr" ? "Étapes Rapides" : lang === "de" ? "Schnellstart-Schritte" : lang === "it" ? "Passi Rapidi" : lang === "pt" ? "Passos Rápidos" : lang === "zh" ? "快速开始步骤" : lang === "ja" ? "クイックスタート手順" : "빠른 시작 단계"}\n\n`;

  for (let i = 0; i < steps[lang].length; i++) {
    content += `### ${i + 1}. ${steps[lang][i]}\n${stepDescs[lang][i]}\n\n`;
  }

  content += `---\n\n## ${h.features}\n\n`;
  content += `${lang === "en" ? "knitstudio includes:" : lang === "es" ? "knitstudio incluye:" : lang === "fr" ? "knitstudio comprend:" : lang === "de" ? "knitstudio enthält:" : lang === "it" ? "knitstudio include:" : lang === "pt" ? "knitstudio inclui:" : lang === "zh" ? "knitstudio 包括：" : lang === "ja" ? "knitstudioには以下が含まれます:" : "knitstudio에는 다음이 포함됩니다:"}\n\n`;
  content += `- 🎨 **Page Designer** — ${lang === "en" ? "Visual drag & drop builder" : lang === "es" ? "Constructor visual de arrastrar y soltar" : lang === "fr" ? "Constructeur visuel glisser-déposer" : lang === "de" ? "Visueller Drag-&-Drop-Builder" : lang === "it" ? "Costruttore visivo drag & drop" : lang === "pt" ? "Construtor visual de arrastar e soltar" : lang === "zh" ? "可视化拖放构建器" : lang === "ja" ? "ビジュアルドラッグ＆ドロップビルダー" : "비주얼 드래그 앤 드롭 빌더"}\n`;
  content += `- ⚡ **Action Flows** — ${lang === "en" ? "Visual logic editor" : lang === "es" ? "Editor de lógica visual" : lang === "fr" ? "Éditeur de logique visuelle" : lang === "de" ? "Visueller Logik-Editor" : lang === "it" ? "Editor di logica visuale" : lang === "pt" ? "Editor de lógica visual" : lang === "zh" ? "可视化逻辑编辑器" : lang === "ja" ? "ビジュアルロジックエディター" : "비주얼 로직 편집기"}\n`;
  content += `- 🔗 **Data Binding** — ${lang === "en" ? "Connect UI to real APIs" : lang === "es" ? "Conecta la UI a APIs reales" : lang === "fr" ? "Connectez l'interface à des API réelles" : lang === "de" ? "Verbinden Sie die UI mit echten APIs" : lang === "it" ? "Collega l'interfaccia a API reali" : lang === "pt" ? "Conecte a interface a APIs reais" : lang === "zh" ? "将UI连接到真实API" : lang === "ja" ? "UIを実際のAPIに接続" : "UI를 실제 API에 연결"}\n`;
  content += `- 🤖 **AI Generation** — ${lang === "en" ? "Generate layouts from text prompts" : lang === "es" ? "Genera diseños desde texto" : lang === "fr" ? "Générez des mises en page à partir de texte" : lang === "de" ? "Generieren Sie Layouts aus Text" : lang === "it" ? "Genera layout da testo" : lang === "pt" ? "Gere layouts a partir de texto" : lang === "zh" ? "从文本提示生成布局" : lang === "ja" ? "テキストからレイアウトを生成" : "텍스트에서 레이아웃 생성"}\n`;
  content += `- 📦 **Multi-framework Export** — ${lang === "en" ? "HTML, React, and more" : lang === "es" ? "HTML, React y más" : lang === "fr" ? "HTML, React et plus" : lang === "de" ? "HTML, React und mehr" : lang === "it" ? "HTML, React e altro" : lang === "pt" ? "HTML, React e mais" : lang === "zh" ? "HTML、React等" : lang === "ja" ? "HTML、Reactなど" : "HTML, React 등"}\n`;

  writeFileSync(join(guideDir, "index.md"), content);
  console.log(`✅ docs/guide/${lang}/index.md`);

  // TUTORIALS INDEX
  let tutContent = `# ${h.tutorials}\n\n`;
  tutContent += `${lang === "en" ? "Step-by-step tutorials to master knitstudio:" : lang === "es" ? "Tutoriales paso a paso para dominar knitstudio:" : lang === "fr" ? "Tutoriels pas à pas pour maîtriser knitstudio:" : lang === "de" ? "Schritt-für-Schritt-Tutorials, um knitstudio zu meistern:" : lang === "it" ? "Tutorial passo passo per padroneggiare knitstudio:" : lang === "pt" ? "Tutoriais passo a passo para dominar o knitstudio:" : lang === "zh" ? "掌握knitstudio的分步教程：" : lang === "ja" ? "knitstudioをマスターするためのステップバイステップチュートリアル:" : "knitstudio를 마스터하기 위한 단계별 튜토리얼:"}\n\n`;

  const tutorials = [
    { emoji: "🌐", title: steps[lang][0], desc: stepDescs[lang][0] },
    { emoji: "🎨", title: steps[lang][2], desc: stepDescs[lang][2] },
    { emoji: "🔗", title: steps[lang][3], desc: stepDescs[lang][3] },
    { emoji: "🤖", title: lang === "en" ? "AI Generation" : lang === "es" ? "Generación con IA" : lang === "fr" ? "Génération par IA" : lang === "de" ? "KI-Generierung" : lang === "it" ? "Generazione AI" : lang === "pt" ? "Geração com IA" : lang === "zh" ? "AI生成" : lang === "ja" ? "AI生成" : "AI 생성", desc: lang === "en" ? "Create layouts by describing what you want" : lang === "es" ? "Crea diseños describiendo lo que quieres" : lang === "fr" ? "Créez des mises en page en décrivant ce que vous voulez" : lang === "de" ? "Erstellen Sie Layouts, indem Sie beschreiben, was Sie wollen" : lang === "it" ? "Crea layout descrivendo ciò che vuoi" : lang === "pt" ? "Crie layouts descrevendo o que você quer" : lang === "zh" ? "通过描述您想要的内容来创建布局" : lang === "ja" ? "欲しいものを説明してレイアウトを作成" : "원하는 것을 설명하여 레이아웃 생성" },
    { emoji: "📦", title: steps[lang][5], desc: stepDescs[lang][5] },
  ];

  for (const t of tutorials) {
    tutContent += `### ${t.emoji} ${t.title}\n${t.desc}\n\n`;
  }

  writeFileSync(join(tutorialDir, "index.md"), tutContent);
  console.log(`✅ docs/tutorials/${lang}/index.md`);
}

console.log("\n📚 Documentation generated for all 9 languages");
