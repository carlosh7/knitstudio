import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const titles = {
  en: { gettingStarted: "Getting Started Guide", features: "Features Reference", comparison: "Competitive Comparison", tutorials: "Tutorials" },
  es: { gettingStarted: "Guía de Inicio", features: "Referencia de Funciones", comparison: "Comparativa con la Competencia", tutorials: "Tutoriales" },
  fr: { gettingStarted: "Guide de Démarrage", features: "Référence des Fonctions", comparison: "Comparaison Concurrentielle", tutorials: "Tutoriels" },
  de: { gettingStarted: "Erste Schritte", features: "Funktionsreferenz", comparison: "Vergleich mit Wettbewerbern", tutorials: "Tutorials" },
  it: { gettingStarted: "Guida Introduttiva", features: "Riferimento Funzioni", comparison: "Confronto con la Concorrenza", tutorials: "Tutorial" },
  pt: { gettingStarted: "Guia de Início", features: "Referência de Funções", comparison: "Comparação com Concorrentes", tutorials: "Tutoriais" },
  zh: { gettingStarted: "入门指南", features: "功能参考", comparison: "竞品对比", tutorials: "教程" },
  ja: { gettingStarted: "はじめに", features: "機能リファレンス", comparison: "競合比較", tutorials: "チュートリアル" },
  ko: { gettingStarted: "시작 가이드", features: "기능 참조", comparison: "경쟁사 비교", tutorials: "튜토리얼" },
};

const welcomes = {
  en: "Welcome to knitstudio! This guide helps you get started quickly.",
  es: "¡Bienvenido a knitstudio! Esta guía te ayudará a empezar rápidamente.",
  fr: "Bienvenue sur knitstudio! Ce guide vous aide à démarrer rapidement.",
  de: "Willkommen bei knitstudio! Diese Anleitung hilft Ihnen beim schnellen Einstieg.",
  it: "Benvenuto in knitstudio! Questa guida ti aiuta a iniziare rapidamente.",
  pt: "Bem-vindo ao knitstudio! Este guia ajuda você a começar rapidamente.",
  zh: "欢迎使用 knitstudio！本指南将帮助您快速上手。",
  ja: "knitstudioへようこそ！このガイドですぐに始められます。",
  ko: "knitstudio에 오신 것을 환영합니다! 이 가이드로 빠르게 시작하세요.",
};

const steps = {
  en: ["Create a project", "Open the builder", "Add components", "Connect data", "Publish", "Export code"],
  es: ["Crear un proyecto", "Abrir el builder", "Agregar componentes", "Conectar datos", "Publicar", "Exportar código"],
  fr: ["Créer un projet", "Ouvrir le builder", "Ajouter des composants", "Connecter des données", "Publier", "Exporter le code"],
  de: ["Projekt erstellen", "Builder öffnen", "Komponenten hinzufügen", "Daten verbinden", "Veröffentlichen", "Code exportieren"],
  it: ["Creare un progetto", "Aprire il builder", "Aggiungere componenti", "Connettere dati", "Pubblicare", "Esportare codice"],
  pt: ["Criar um projeto", "Abrir o builder", "Adicionar componentes", "Conectar dados", "Publicar", "Exportar código"],
  zh: ["创建项目", "打开构建器", "添加组件", "连接数据", "发布", "导出代码"],
  ja: ["プロジェクト作成", "ビルダーを開く", "コンポーネント追加", "データ接続", "公開", "コード出力"],
  ko: ["프로젝트 만들기", "빌더 열기", "컴포넌트 추가", "데이터 연결", "게시", "코드 내보내기"],
};

for (const [lang, title] of Object.entries(titles)) {
  const dir = join(ROOT, "docs", "guide", lang);
  mkdirSync(dir, { recursive: true });

  const content = `# ${title.gettingStarted}

${welcomes[lang]}

## ${lang === "en" ? "Quick Start" : lang === "es" ? "Inicio Rápido" : lang === "fr" ? "Démarrage Rapide" : lang === "de" ? "Schnellstart" : lang === "it" ? "Avvio Rapido" : lang === "pt" ? "Início Rápido" : lang === "zh" ? "快速开始" : lang === "ja" ? "クイックスタート" : "빠른 시작"}

1. **${steps[lang][0]}** — ${lang === "en" ? "Click 'New Project' on the dashboard" : lang === "es" ? "Haz clic en 'Nuevo Proyecto' en el panel" : lang === "fr" ? "Cliquez sur 'Nouveau Projet' dans le tableau de bord" : lang === "de" ? "Klicken Sie auf 'Neues Projekt' im Dashboard" : lang === "it" ? "Clicca 'Nuovo Progetto' sul dashboard" : lang === "pt" ? "Clique em 'Novo Projeto' no painel" : lang === "zh" ? "在仪表板上点击'新建项目'" : lang === "ja" ? "ダッシュボードで「新規プロジェクト」をクリック" : "대시보드에서 '새 프로젝트'를 클릭하세요"}
2. **${steps[lang][1]}** — ${lang === "en" ? "Click your project name to enter the visual builder" : lang === "es" ? "Haz clic en tu proyecto para entrar al builder visual" : lang === "fr" ? "Cliquez sur votre projet pour entrer dans le builder visuel" : lang === "de" ? "Klicken Sie auf Ihren Projektnamen, um den visuellen Builder zu öffnen" : lang === "it" ? "Clicca sul nome del progetto per entrare nel builder visuale" : lang === "pt" ? "Clique no nome do projeto para entrar no builder visual" : lang === "zh" ? "点击项目名称进入可视化构建器" : lang === "ja" ? "プロジェクト名をクリックしてビジュアルビルダーを開く" : "프로젝트 이름을 클릭하여 비주얼 빌더에 입장하세요"}
3. **${steps[lang][3]}** — ${lang === "en" ? "Use the Components panel to drag items onto the canvas" : lang === "es" ? "Usa el panel de Componentes para arrastrar elementos al canvas" : lang === "fr" ? "Utilisez le panneau Composants pour glisser des éléments sur le canvas" : lang === "de" ? "Verwenden Sie das Komponenten-Panel, um Elemente auf die Leinwand zu ziehen" : lang === "it" ? "Usa il pannello Componenti per trascinare elementi sul canvas" : lang === "pt" ? "Use o painel de Componentes para arrastrar itens para o canvas" : lang === "zh" ? "使用组件面板将项目拖到画布上" : lang === "ja" ? "コンポーネントパネルを使ってアイテムをキャンバスにドラッグ" : "컴포넌트 패널을 사용하여 항목을 캔버스로 드래그하세요"}

## ${lang === "en" ? "Tutorials" : lang === "es" ? "Tutoriales" : lang === "fr" ? "Tutoriels" : lang === "de" ? "Tutorials" : lang === "it" ? "Tutorial" : lang === "pt" ? "Tutoriais" : lang === "zh" ? "教程" : lang === "ja" ? "チュートリアル" : "튜토리얼"}

${lang === "en" ? "Check the tutorials directory for step-by-step guides:" : lang === "es" ? "Revisa el directorio de tutoriales para guías paso a paso:" : lang === "fr" ? "Consulte le répertoire des tutoriels pour des guides étape par étape:" : lang === "de" ? "Im Tutorials-Verzeichnis finden Sie Schritt-für-Schritt-Anleitungen:" : lang === "it" ? "Consulta la directory dei tutorial per guide passo passo:" : lang === "pt" ? "Confira o diretório de tutoriais para guias passo a passo:" : lang === "zh" ? "查看教程目录以获取分步指南：" : lang === "ja" ? "ステップバイステップのガイドはチュートリアルディレクトリをご覧ください:" : "단계별 가이드는 튜토리얼 디렉토리를 확인하세요:"}

- [${lang === "en" ? "Tutorials" : lang === "es" ? "Tutoriales" : lang === "fr" ? "Tutoriels" : lang === "de" ? "Tutorials" : lang === "it" ? "Tutorial" : lang === "pt" ? "Tutoriais" : lang === "zh" ? "教程" : lang === "ja" ? "チュートリアル" : "튜토리얼"}](../tutorials/${lang}/index.md)
- [${title.features}](FEATURES.md)
- [${title.comparison}](../COMPARISON.md)

---

*knitstudio v1.0.0 — ${lang === "en" ? "Documentation" : lang === "es" ? "Documentación" : lang === "fr" ? "Documentation" : lang === "de" ? "Dokumentation" : lang === "it" ? "Documentazione" : lang === "pt" ? "Documentação" : lang === "zh" ? "文档" : lang === "ja" ? "ドキュメント" : "문서"}*
`;

  writeFileSync(join(dir, "index.md"), content);
  console.log(`✅ docs/guide/${lang}/index.md`);
}

echo("Docs generated successfully");
function echo(m) { console.log(m); }
