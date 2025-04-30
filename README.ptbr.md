# tiptap-ui

🎨 Componentes de UI e estilos para criar editores de texto bonitos com [Tiptap](https://tiptap.dev), usando [shadcn/ui](https://ui.shadcn.com) e [TailwindCSS](https://tailwindcss.com).

## Funcionalidades

- ✅ Componentes prontos para Tiptap (botões, menus, toolbars)
- 🎨 Estilizados com Shadcn/ui e Tailwind
- ⚙️ Fácil de estender e personalizar
- 💡 Compatível com React & Tiptap

## Primeiros Passos - Instalação

### 1. Instale o shadcn/ui

> Veja [Instalação Shadcn](#-início-rápido) para mais detalhes

### 2. Instale o tiptap-ui

```bash
npm install tiptap-ui
# ou
yarn add tiptap-ui
```

### 3. Configuração

Inicialize o `editor` passando as seguintes configurações:

```ts
const editor = useEditor({
  extensions: [
    StarterKit.configure({
      blockquote: false,
    }),
    // STARTERKIT:
    // BLOCKQUOTE, BULLETLIST, ORDEREDLIST, CODEBLOCK PARAGRAPHY,
    // HEADING, BOLD, CODE, ITALIC, STRIKE, LISTITEM, HORIZONTALRULE
    // DROPCURSOR, GAPCURSOR & HISTORY
    Underline,
    TextAlign.configure({ types: ["paragraph", "heading"] }),
    TextStyle,
    FontSize,
    TaskList,
    TaskItem.configure({
      nested: true,
    }),
  ],
  content: "<p>Hello World! 🌎️</p>",
  autofocus: true,
  editable: true,
  editorProps: {
    attributes: {
      class: "h-full", // 100% CUSTOMIZAVEL
    },
  },
});
```

> Para mais opções veja: [Configurações Adicionais](#-configuracoes-adicionais)

---

## 🚀 Início Rápido

### 1. Instale o `shadcn/ui`

[👉 Guia de Instalação](https://ui.shadcn.com/docs/installation)

Durante a instalação, você poderá configurar:

- O caminho dos componentes (ex: `@/components`)
- A cor base do design system (ex: `neutral`, `zinc`, `slate`)
- O framework utilizado (ex: React)

> ⚠️ Certifique-se de que o Tailwind está configurado corretamente no seu projeto React (seja Vite, Next.js, CRA etc).

### 2. Pronto Shadcn Instalado!

> Próximos passos [Instalar Tiptap-ui](#2-instale-o-tiptap-ui).

---

## Configurações Adicionais

## 1. Extensões

### 📊 Textos com Links

Adicione ao array `extensions`:

```ts
    // ... outras extensões
    Link.configure({
      openOnClick: false,
      autolink: true,
      defaultProtocol: "https",
      protocols: ["http", "https"],
      isAllowedUri: (url, ctx) => {
        try {
          // construct URL
          const parsedUrl = url.includes(":")
            ? new URL(url)
            : new URL(`${ctx.defaultProtocol}://${url}`);

          // use default validation
          if (
            "defaultValidate" in ctx &&
            typeof ctx.defaultValidate === "function" &&
            !ctx.defaultValidate(parsedUrl.href)
          ) {
            return false;
          }

          // disallowed protocols
          const disallowedProtocols = ["ftp", "file", "mailto"];
          const protocol = parsedUrl.protocol.replace(":", "");

          if (disallowedProtocols.includes(protocol)) {
            return false;
          }

          // only allow protocols specified in ctx.protocols
          if (
            !ctx.protocols ||
            typeof ctx.protocols !== "object" ||
            !Array.isArray(ctx.protocols)
          ) {
            return false;
          }

          const allowedProtocols = ctx.protocols.map((p) =>
            typeof p === "string" ? p : p.scheme
          );

          if (!allowedProtocols.includes(protocol)) {
            return false;
          }

          // disallowed domains
          const disallowedDomains = [
            "example-phishing.com",
            "malicious-site.net",
          ];
          const domain = parsedUrl.hostname;

          if (disallowedDomains.includes(domain)) {
            return false;
          }

          // all checks have passed
          return true;
        } catch {
          return false;
        }
      },
      shouldAutoLink: (url) => {
        try {
          // construct URL
          const parsedUrl = url.includes(":")
            ? new URL(url)
            : new URL(`https://${url}`);

          // only auto-link if the domain is not in the disallowed list
          const disallowedDomains = [
            "example-no-autolink.com",
            "=disallowedDomain.com",
          ];
          const domain = parsedUrl.hostname;

          return !disallowedDomains.includes(domain);
        } catch {
          return false;
        }
      },
    }),
```

### 📊 Tabelas

Adicione ao array `extensions`:

```ts
    // ... outras extensões
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TableCell,
    TableHeader,
```

---

## 2. Permissões — Leitor / Editor

Adicione as configurações em `useEditor({ configs...})`:

```ts
      editable: true, // Leitor, editor
      editable: false, // Apenas leitura
```
