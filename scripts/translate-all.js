import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const i18nDir = join(__dirname, "..", "packages", "builder", "src", "i18n");

const allKeys = {};
const enContent = readFileSync(join(i18nDir, "en.ts"), "utf-8");
const regex = /"([^"]+)":\s*"([^"]*)"/g;
let m;
while ((m = regex.exec(enContent)) !== null) {
  allKeys[m[1]] = m[2];
}

// Translation dictionaries per language
const dicts = {
  fr: {
    // Core UI
    "nav.back": "← Tableau de bord", "nav.search": "Rechercher", "nav.shortcuts": "Raccourcis",
    "mode.simple": "Simple", "mode.advanced": "Avancé",
    "panel.components": "Composants", "panel.layers": "Calques", "panel.styles": "Styles",
    "panel.actions": "Actions", "panel.data": "Données", "panel.ai": "IA",
    "panel.safety": "Sécurité", "panel.versions": "Versions", "panel.monitoring": "Surveillance",
    "panel.selfedit": "AutoÉdition", "panel.sandbox": "Bac à sable",
    "action.publish": "Publier", "action.save": "Enregistrer", "action.create": "Créer",
    "action.cancel": "Annuler", "action.delete": "Supprimer", "action.next": "Suivant",
    "action.back": "Retour", "action.finish": "Terminer", "action.close": "Fermer",
    "action.retry": "Réessayer", "action.clear": "Effacer", "action.done": "Terminé",
    "action.send": "Envoyer", "action.restore": "Restaurer", "action.import": "Importer",
    "action.generate": "Générer", "action.skip": "Passer", "action.dismiss": "Ignorer",
    "project.new": "Nouveau Projet", "project.name": "Nom du projet",
    "project.empty.title": "Bienvenue sur knitstudio",
    "project.empty.cta": "Créer votre premier projet",
    "editor.save.success": "Projet enregistré",
    "editor.save.error": "Erreur d'enregistrement",
    "editor.autosave": "Sauvegarde auto...",
    "editor.unsaved": "Non enregistré",
    "search.placeholder": "Rechercher pages, composants, actions...",
    "search.noresults": "Aucun résultat",
    "search.loading": "Chargement...",
    "shortcuts.title": "Raccourcis Clavier", "shortcuts.undo": "Annuler",
    "shortcuts.redo": "Rétablir", "shortcuts.save": "Enregistrer",
    "shortcuts.delete": "Supprimer", "shortcuts.duplicate": "Dupliquer",
    "shortcuts.deselect": "Désélectionner", "shortcuts.help": "Afficher les raccourcis",
    "select_component": "Sélectionner un composant",
    "no_props": "Aucune propriété",
    "props": "Propriétés",
    "help.steps": "Étapes",
    "help.search_placeholder": "Rechercher des sujets d'aide...",
    "help.all_topics": "Tous les Sujets",
    "help.getting_started": "Guide de Démarrage",
    "help.footer_online": "Documentation en Ligne",
    "help.footer_github": "Docs GitHub",
    "help.footer_email": "Besoin d'aide? Cliquez sur 💬 ou écrivez à support@knitstudio.io",
  },
  de: {
    "nav.back": "← Dashboard", "nav.search": "Suchen", "nav.shortcuts": "Tastenkürzel",
    "mode.simple": "Einfach", "mode.advanced": "Erweitert",
    "panel.components": "Komponenten", "panel.layers": "Ebenen", "panel.styles": "Stile",
    "panel.actions": "Aktionen", "panel.data": "Daten", "panel.ai": "KI",
    "panel.safety": "Sicherheit", "panel.versions": "Versionen", "panel.monitoring": "Überwachung",
    "panel.selfedit": "SelbstEdit", "panel.sandbox": "Sandkasten",
    "action.publish": "Veröffentlichen", "action.save": "Speichern", "action.create": "Erstellen",
    "action.cancel": "Abbrechen", "action.delete": "Löschen", "action.next": "Weiter",
    "action.back": "Zurück", "action.finish": "Fertig", "action.close": "Schließen",
    "action.retry": "Wiederholen", "action.clear": "Leeren", "action.done": "Erledigt",
    "action.send": "Senden", "action.restore": "Wiederherstellen", "action.import": "Importieren",
    "action.generate": "Generieren", "action.skip": "Überspringen", "action.dismiss": "Verwerfen",
    "project.new": "Neues Projekt", "project.name": "Projektname",
    "project.empty.title": "Willkommen bei knitstudio",
    "project.empty.cta": "Erstes Projekt erstellen",
    "editor.save.success": "Projekt gespeichert",
    "editor.save.error": "Speichern fehlgeschlagen",
    "editor.autosave": "Automatisch speichern...",
    "editor.unsaved": "Nicht gespeichert",
    "search.placeholder": "Seiten, Komponenten, Aktionen suchen...",
    "search.noresults": "Keine Ergebnisse",
    "search.loading": "Laden...",
    "shortcuts.title": "Tastenkürzel", "shortcuts.undo": "Rückgängig",
    "shortcuts.redo": "Wiederholen", "shortcuts.save": "Speichern",
    "shortcuts.delete": "Löschen", "shortcuts.duplicate": "Duplizieren",
    "shortcuts.deselect": "Abwählen", "shortcuts.help": "Kürzel anzeigen",
    "select_component": "Komponente auswählen",
    "no_props": "Keine Eigenschaften",
    "props": "Eigenschaften",
    "help.steps": "Schritte",
    "help.search_placeholder": "Hilfethemen durchsuchen...",
    "help.all_topics": "Alle Themen",
    "help.getting_started": "Erste Schritte",
    "help.footer_online": "Online-Dokumentation",
    "help.footer_github": "GitHub Docs",
    "help.footer_email": "Hilfe? Klicken Sie auf 💬 oder schreiben Sie an support@knitstudio.io",
  },
  it: {
    "nav.back": "← Dashboard", "nav.search": "Cerca", "nav.shortcuts": "Scorciatoie",
    "mode.simple": "Semplice", "mode.advanced": "Avanzato",
    "panel.components": "Componenti", "panel.layers": "Livelli", "panel.styles": "Stili",
    "panel.actions": "Azioni", "panel.data": "Dati", "panel.ai": "IA",
    "panel.safety": "Sicurezza", "panel.versions": "Versioni", "panel.monitoring": "Monitoraggio",
    "panel.selfedit": "AutoModifica", "panel.sandbox": "Sandbox",
    "action.publish": "Pubblica", "action.save": "Salva", "action.create": "Crea",
    "action.cancel": "Annulla", "action.delete": "Elimina", "action.next": "Avanti",
    "action.back": "Indietro", "action.finish": "Fine", "action.close": "Chiudi",
    "action.retry": "Riprova", "action.clear": "Pulisci", "action.done": "Fatto",
    "action.send": "Invia", "action.restore": "Ripristina", "action.import": "Importa",
    "action.generate": "Genera", "action.skip": "Salta", "action.dismiss": "Ignora",
    "project.new": "Nuovo Progetto", "project.name": "Nome progetto",
    "project.empty.title": "Benvenuto in knitstudio",
    "project.empty.cta": "Crea il tuo primo progetto",
    "editor.save.success": "Progetto salvato",
    "editor.save.error": "Salvataggio fallito",
    "editor.autosave": "Salvataggio auto...",
    "editor.unsaved": "Non salvato",
    "search.placeholder": "Cerca pagine, componenti, azioni...",
    "search.noresults": "Nessun risultato",
    "search.loading": "Caricamento...",
    "shortcuts.title": "Scorciatoie da Tastiera", "shortcuts.undo": "Annulla",
    "shortcuts.redo": "Ripeti", "shortcuts.save": "Salva",
    "shortcuts.delete": "Elimina", "shortcuts.duplicate": "Duplica",
    "shortcuts.deselect": "Deseleziona", "shortcuts.help": "Mostra scorciatoie",
    "select_component": "Seleziona un componente",
    "no_props": "Nessuna proprietà",
    "props": "Proprietà",
    "help.steps": "Passi",
    "help.search_placeholder": "Cerca argomenti di aiuto...",
    "help.all_topics": "Tutti gli Argomenti",
    "help.getting_started": "Guida Introduttiva",
    "help.footer_online": "Documentazione Online",
    "help.footer_github": "Docs GitHub",
    "help.footer_email": "Aiuto? Clicca 💬 o scrivi a support@knitstudio.io",
  },
  pt: {
    "nav.back": "← Painel", "nav.search": "Pesquisar", "nav.shortcuts": "Atalhos",
    "mode.simple": "Simples", "mode.advanced": "Avançado",
    "panel.components": "Componentes", "panel.layers": "Camadas", "panel.styles": "Estilos",
    "panel.actions": "Ações", "panel.data": "Dados", "panel.ai": "IA",
    "panel.safety": "Segurança", "panel.versions": "Versões", "panel.monitoring": "Monitoramento",
    "panel.selfedit": "AutoEditar", "panel.sandbox": "Sandbox",
    "action.publish": "Publicar", "action.save": "Salvar", "action.create": "Criar",
    "action.cancel": "Cancelar", "action.delete": "Excluir", "action.next": "Próximo",
    "action.back": "Voltar", "action.finish": "Concluir", "action.close": "Fechar",
    "action.retry": "Tentar novamente", "action.clear": "Limpar", "action.done": "Concluído",
    "action.send": "Enviar", "action.restore": "Restaurar", "action.import": "Importar",
    "action.generate": "Gerar", "action.skip": "Pular", "action.dismiss": "Dispensar",
    "project.new": "Novo Projeto", "project.name": "Nome do projeto",
    "project.empty.title": "Bem-vindo ao knitstudio",
    "project.empty.cta": "Crie seu primeiro projeto",
    "editor.save.success": "Projeto salvo",
    "editor.save.error": "Falha ao salvar",
    "editor.autosave": "Salvando auto...",
    "editor.unsaved": "Não salvo",
    "search.placeholder": "Pesquisar páginas, componentes, ações...",
    "search.noresults": "Nenhum resultado",
    "search.loading": "Carregando...",
    "shortcuts.title": "Atalhos de Teclado", "shortcuts.undo": "Desfazer",
    "shortcuts.redo": "Refazer", "shortcuts.save": "Salvar",
    "shortcuts.delete": "Excluir", "shortcuts.duplicate": "Duplicar",
    "shortcuts.deselect": "Desselecionar", "shortcuts.help": "Mostrar atalhos",
    "select_component": "Selecione um componente",
    "no_props": "Sem propriedades",
    "props": "Propriedades",
    "help.steps": "Passos",
    "help.search_placeholder": "Pesquisar tópicos de ajuda...",
    "help.all_topics": "Todos os Tópicos",
    "help.getting_started": "Guia de Início",
    "help.footer_online": "Documentação Online",
    "help.footer_github": "Docs GitHub",
    "help.footer_email": "Precisa de ajuda? Clique 💬 ou envie email para support@knitstudio.io",
  },
  zh: {
    "nav.back": "← 仪表板", "nav.search": "搜索", "nav.shortcuts": "快捷键",
    "mode.simple": "简单", "mode.advanced": "高级",
    "panel.components": "组件", "panel.layers": "图层", "panel.styles": "样式",
    "panel.actions": "动作", "panel.data": "数据", "panel.ai": "AI",
    "panel.safety": "安全", "panel.versions": "版本", "panel.monitoring": "监控",
    "panel.selfedit": "自我编辑", "panel.sandbox": "沙箱",
    "action.publish": "发布", "action.save": "保存", "action.create": "创建",
    "action.cancel": "取消", "action.delete": "删除", "action.next": "下一步",
    "action.back": "返回", "action.finish": "完成", "action.close": "关闭",
    "action.retry": "重试", "action.clear": "清除", "action.done": "完成",
    "action.send": "发送", "action.restore": "恢复", "action.import": "导入",
    "action.generate": "生成", "action.skip": "跳过", "action.dismiss": "忽略",
    "project.new": "新建项目", "project.name": "项目名称",
    "project.empty.title": "欢迎使用 knitstudio",
    "project.empty.cta": "创建您的第一个项目",
    "editor.save.success": "项目已保存",
    "editor.save.error": "保存失败",
    "editor.autosave": "自动保存中...",
    "editor.unsaved": "未保存",
    "search.placeholder": "搜索页面、组件、动作...",
    "search.noresults": "无结果",
    "search.loading": "加载中...",
    "shortcuts.title": "键盘快捷键", "shortcuts.undo": "撤销",
    "shortcuts.redo": "重做", "shortcuts.save": "保存",
    "shortcuts.delete": "删除", "shortcuts.duplicate": "复制",
    "shortcuts.deselect": "取消选择", "shortcuts.help": "显示快捷键",
    "select_component": "选择一个组件",
    "no_props": "无属性",
    "props": "属性",
    "help.steps": "步骤",
    "help.search_placeholder": "搜索帮助主题...",
    "help.all_topics": "所有主题",
    "help.getting_started": "入门指南",
    "help.footer_online": "在线文档",
    "help.footer_github": "GitHub 文档",
    "help.footer_email": "需要帮助？点击 💬 或发送邮件至 support@knitstudio.io",
  },
  ja: {
    "nav.back": "← ダッシュボード", "nav.search": "検索", "nav.shortcuts": "ショートカット",
    "mode.simple": "シンプル", "mode.advanced": "アドバンスド",
    "panel.components": "コンポーネント", "panel.layers": "レイヤー", "panel.styles": "スタイル",
    "panel.actions": "アクション", "panel.data": "データ", "panel.ai": "AI",
    "panel.safety": "セーフティ", "panel.versions": "バージョン", "panel.monitoring": "モニタリング",
    "panel.selfedit": "自己編集", "panel.sandbox": "サンドボックス",
    "action.publish": "公開", "action.save": "保存", "action.create": "作成",
    "action.cancel": "キャンセル", "action.delete": "削除", "action.next": "次へ",
    "action.back": "戻る", "action.finish": "完了", "action.close": "閉じる",
    "action.retry": "再試行", "action.clear": "クリア", "action.done": "完了",
    "action.send": "送信", "action.restore": "復元", "action.import": "インポート",
    "action.generate": "生成", "action.skip": "スキップ", "action.dismiss": "閉じる",
    "project.new": "新規プロジェクト", "project.name": "プロジェクト名",
    "project.empty.title": "knitstudioへようこそ",
    "project.empty.cta": "最初のプロジェクトを作成",
    "editor.save.success": "プロジェクトを保存しました",
    "editor.save.error": "保存に失敗しました",
    "editor.autosave": "自動保存中...",
    "editor.unsaved": "未保存",
    "search.placeholder": "ページ、コンポーネント、アクションを検索...",
    "search.noresults": "結果なし",
    "search.loading": "読み込み中...",
    "shortcuts.title": "キーボードショートカット", "shortcuts.undo": "元に戻す",
    "shortcuts.redo": "やり直す", "shortcuts.save": "保存",
    "shortcuts.delete": "削除", "shortcuts.duplicate": "複製",
    "shortcuts.deselect": "選択解除", "shortcuts.help": "ショートカット表示",
    "select_component": "コンポーネントを選択",
    "no_props": "プロパティなし",
    "props": "プロパティ",
    "help.steps": "手順",
    "help.search_placeholder": "ヘルプトピックを検索...",
    "help.all_topics": "すべてのトピック",
    "help.getting_started": "はじめに",
    "help.footer_online": "オンラインドキュメント",
    "help.footer_github": "GitHub Docs",
    "help.footer_email": "ヘルプが必要ですか？💬をクリックするか support@knitstudio.io へメール",
  },
  ko: {
    "nav.back": "← 대시보드", "nav.search": "검색", "nav.shortcuts": "단축키",
    "mode.simple": "심플", "mode.advanced": "고급",
    "panel.components": "컴포넌트", "panel.layers": "레이어", "panel.styles": "스타일",
    "panel.actions": "액션", "panel.data": "데이터", "panel.ai": "AI",
    "panel.safety": "안전", "panel.versions": "버전", "panel.monitoring": "모니터링",
    "panel.selfedit": "자체편집", "panel.sandbox": "샌드박스",
    "action.publish": "게시", "action.save": "저장", "action.create": "생성",
    "action.cancel": "취소", "action.delete": "삭제", "action.next": "다음",
    "action.back": "뒤로", "action.finish": "완료", "action.close": "닫기",
    "action.retry": "재시도", "action.clear": "지우기", "action.done": "완료",
    "action.send": "보내기", "action.restore": "복원", "action.import": "가져오기",
    "action.generate": "생성", "action.skip": "건너뛰기", "action.dismiss": "무시",
    "project.new": "새 프로젝트", "project.name": "프로젝트 이름",
    "project.empty.title": "knitstudio에 오신 것을 환영합니다",
    "project.empty.cta": "첫 번째 프로젝트 만들기",
    "editor.save.success": "프로젝트가 저장되었습니다",
    "editor.save.error": "저장 실패",
    "editor.autosave": "자동 저장 중...",
    "editor.unsaved": "저장되지 않음",
    "search.placeholder": "페이지, 컴포넌트, 액션 검색...",
    "search.noresults": "검색 결과 없음",
    "search.loading": "로딩 중...",
    "shortcuts.title": "키보드 단축키", "shortcuts.undo": "실행 취소",
    "shortcuts.redo": "다시 실행", "shortcuts.save": "저장",
    "shortcuts.delete": "삭제", "shortcuts.duplicate": "복제",
    "shortcuts.deselect": "선택 해제", "shortcuts.help": "단축키 표시",
    "select_component": "컴포넌트 선택",
    "no_props": "속성 없음",
    "props": "속성",
    "help.steps": "단계",
    "help.search_placeholder": "도움말 주제 검색...",
    "help.all_topics": "모든 주제",
    "help.getting_started": "시작 가이드",
    "help.footer_online": "온라인 문서",
    "help.footer_github": "GitHub 문서",
    "help.footer_email": "도움이 필요하신가요? 💬을 클릭하거나 support@knitstudio.io로 이메일을 보내주세요",
  },
};

// Precompute all help keys
const helpKeys = Object.keys(allKeys).filter(k => k.startsWith("help."));

for (const [lang, dict] of Object.entries(dicts)) {
  let content = readFileSync(join(i18nDir, `${lang}.ts`), "utf-8");
  let count = 0;

  for (const [key, val] of Object.entries(dict)) {
    const searchKey = `"${key}": "`;
    const startIdx = content.indexOf(searchKey);
    if (startIdx !== -1) {
      const valStart = startIdx + searchKey.length;
      const valEnd = content.indexOf('"', valStart);
      if (valEnd !== -1) {
        const escaped = val.replace(/"/g, '\\"');
        content = content.slice(0, valStart) + escaped + content.slice(valEnd);
        count++;
      }
    }
  }

  // Count how many help keys are translated vs english
  let translatedCount = 0;
  for (const key of helpKeys) {
    const searchKey = `"${key}": "`;
    const startIdx = content.indexOf(searchKey);
    if (startIdx !== -1) {
      const valStart = startIdx + searchKey.length;
      const valEnd = content.indexOf('"', valStart);
      if (valEnd !== -1) {
        const currentVal = content.slice(valStart, valEnd);
        const enVal = allKeys[key];
        if (enVal && currentVal !== enVal) {
          translatedCount++;
        }
      }
    }
  }

  writeFileSync(join(i18nDir, `${lang}.ts`), content);
  console.log(`✅ ${lang}.ts — ${count} translations applied, ${translatedCount}/${helpKeys.length} help keys translated`);
}
