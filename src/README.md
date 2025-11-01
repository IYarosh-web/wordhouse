# Feature Sliced Design Architecture

This project follows the Feature Sliced Design (FSD) methodology for organizing React applications.

## Architecture Layers

### 🏗️ **App Layer** (`src/app/`)
- **Purpose**: Application initialization, providers, routing
- **Contains**: App component, providers, router configuration
- **Dependencies**: Can import from all other layers

### 📄 **Pages Layer** (`src/pages/`)
- **Purpose**: Route components that represent full pages
- **Contains**: Page components (HomePage, AboutPage, etc.)
- **Dependencies**: Can import from widgets, features, entities, shared

### 🧩 **Widgets Layer** (`src/widgets/`)
- **Purpose**: Complex UI blocks that combine multiple features
- **Contains**: Header, Footer, Sidebar, etc.
- **Dependencies**: Can import from features, entities, shared

### ⚡ **Features Layer** (`src/features/`)
- **Purpose**: Business logic and user interactions
- **Contains**: AuthForm, ProductCard, SearchBar, etc.
- **Dependencies**: Can import from entities, shared

### 🏢 **Entities Layer** (`src/entities/`)
- **Purpose**: Business entities and their logic
- **Contains**: User, Product, Order, etc.
- **Dependencies**: Can import from shared

### 🔧 **Shared Layer** (`src/shared/`)
- **Purpose**: Reusable code across the application
- **Contains**: UI components, utilities, API, config
- **Dependencies**: Cannot import from other layers

## Folder Structure

```
src/
├── app/           # App layer
│   ├── providers/ # Context providers
│   ├── router/    # Routing configuration
│   ├── App.jsx    # Main App component
│   └── index.js   # Public API
├── pages/         # Pages layer
│   └── index.js   # Public API
├── widgets/       # Widgets layer
│   └── index.js   # Public API
├── features/      # Features layer
│   └── index.js   # Public API
├── entities/      # Entities layer
│   └── index.js   # Public API
└── shared/        # Shared layer
    ├── ui/        # Reusable UI components
    ├── lib/       # Utility functions
    ├── api/       # API layer
    ├── config/    # Configuration
    ├── assets/    # Static assets
    └── index.js   # Public API
```

## Import Rules

1. **Higher layers can import from lower layers**
2. **Same layer imports are allowed**
3. **Lower layers cannot import from higher layers**
4. **Always use public API (index.js files)**

## Example Usage

```jsx
// ✅ Correct - importing from lower layer
import { Button } from 'shared/ui';
import { User } from 'entities/user';
import { AuthForm } from 'features/auth';

// ❌ Incorrect - importing from higher layer
import { HomePage } from 'pages'; // from entities layer
```

## Getting Started

1. Create your components in the appropriate layer
2. Export them through the layer's `index.js` file
3. Import using the public API
4. Follow the dependency rules strictly
