# Highlight Plugin for Contentstack RTE

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.7.4-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-16.11.0-blue.svg)](https://reactjs.org/)

A modern, accessible highlight text plugin for Contentstack's JSON Rich Text Editor that allows you to highlight important content with customizable styling.

## ✨ Features

- ⚡ **Easy Integration**: Simple setup with Contentstack's JSON Rich Text Editor.
- 🎯 **Accessible**: Designed with accessibility in mind.
- 📱 **Responsive**: Works seamlessly across all devices.
- 🔧 **Customizable**: Easily modify the highlight styles to match your brand.

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)
- A Contentstack account

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/contentstack/marketplace-highlight-app.git
cd marketplace-highlight-app

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm start
```

### Building for Production

```bash
# Build the application for production
npm run build

# The bundled plugin will be in the `dist` directory
```

## 🏗️ Project Structure

```bash
rte-highlight-plugin/
├── src/              # Source code
│   ├── components/   # React components (if any)     # Styles for the plugin
│   ├── styles/styles.css    # Styles for the plugin
│   └── plugin.tsx    # Main plugin entry point
├── dist/             # Production build output
└── config files...   # package.json, webpack.config.js, etc.
```

### Code Quality

- **TSLint** for code linting.
- **Prettier** for code formatting (via tslint-config-prettier).

## 🛠️ Development Workflow

### Adding New Features

1.  Create a feature branch from `main`.
2.  Implement your changes in the `src` directory.
3.  Add or update tests for the new functionality.
4.  Update the documentation (`README.md`) if necessary.
5.  Submit a pull request for review.

### Code Style

This project uses TSLint with the Standard and Prettier configurations to enforce a consistent code style.

### Commit Convention

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification.

## 📦 Deployment

This is a **JSON RTE plugin**, not a Custom Field or an iframe app: there is no router, manifest or SDK init. The bundle `dist/highlight.js` is a SystemJS module whose default export is built with `@contentstack/app-sdk` `PluginBuilder` (id `highlight`, title "Highlight", element type `text`, shown in the toolbar and hovering toolbar). It wraps the selected text in `<span class="highlight">` (pale yellow background).

### Build

```bash
npm ci
npm run build   # writes dist/highlight.js (dist/ is git-ignored)
npm test        # unit tests; npm run test:coverage enforces 90%
```

### Add it to a JSON RTE field

1.  Make the built `highlight.js` reachable over HTTPS. For local development, `npm start` serves it at `https://localhost:1268/highlight.js`.
2.  In Contentstack, add the plugin to the JSON Rich Text Editor field's plugin list, pointing it at that bundle URL (Developer Hub RTE plugin, or the field's **Plugins** setting in the content type).
3.  Open an entry with that JSON RTE field, select text and click **Highlight**.

### Where the production bundle is served

unknown — MKT-19749

## 🤝 Contributing

We welcome contributions! Please see the following guide for details.

### How to Contribute

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'feat: add amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Contentstack](https://www.contentstack.com/) for the amazing CMS platform.

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/contentstack/marketplace-highlight-app/issues)
- **Documentation**: [Contentstack Developer Hub](https://www.contentstack.com/docs/developers/developer-hub)
- **Marketplace**: [Contentstack Marketplace App Guide](https://www.contentstack.com/docs/developers/marketplace-apps/highlight)
- **Community**: [Contentstack Community](https://community.contentstack.com/)

---

Made with ❤️ by the Contentstack team
