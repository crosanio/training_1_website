# SCAFFOLDING

## LEGEND

- folder            │   📁 folder_name/                 Folders
- file (generic)    │   📄 [file]                       Generic file format
- frontend element  │   🔷 [element]                    Any element that is part of the visual interface
- file (.css)       │   🔹 [.css]                       Stylesheets
- logic and data    │   ⚙️ [function/logic/data]        Data management and logic
- mandatory         │   ❌ <mandatory>                  Necessary for the architecture to work properly
- media             │   🔻[media]                       Any media file in any media format
- utility           │   ➜ [utility]                     E.g.: buttons [.svg], others.


-----------------------------------------------------------------


## SCAFFOLDING STRUCTURE

### NOTE
Some system's necessary files and folders are not mentioned in the diagram.
E.g. : node_modules/.


📁 root/
│
├──📁 global_assets/
│   │
│   ├──📁 data/
│   │   │
│   │   └──📄 [files]
│   │
│   └──📁 functions/
│       │
│       └──⚙️ [singleFunction]
│    
├──📁 components/
│   │
│   ├──📁 componentTemplate/
│   │   │
│   │   ├──🔷 [componentTemplate.jsx]
│   │   ├──🔹 [componentTemplate.module.css]
│   │   │
│   │   └──📁 functions/
│   │       │
│   │       └──⚙️ [singleFunction]       
│   │
│   └──📁 componentName/
│       │
│       ├──🔷 [componentName.jsx]
│       ├──🔹 [componentName.module.css]
│       │
│       ├──📁 functions/
│       │   │
│       │   └──⚙️ [singleFunction]
│       │
│       └──📁 utility/
│           │
│           ├──📄 [file]
│           ├──🔻 [media]
│           └──➜ [utility]
│
├──📁 contexts/
│   │
│   └──⚙️ [contextName.jsx] 
│
├──📁 notes/
│   │
│   ├──📄 [scaffolding.md]
│   ├──📄 [setup.md]
│   └──📄 [sitemap.md]
│
├──📁 public/
│   │
│   ├──📁 media/
│   │   │
│   │   ├──📁 default/
│   │   │   │
│   │   │   └──⚙️ [singleFunction]
│   │   │
│   │   └──📁 components/
│   │       │
│   │       └──📁 componentName/
│   │           │
│   │           └──🔻[media]
│   │
│   └──📄 [file]
│
├──📁 src/
│   │
│   └──📁 app/
│       │
│       ├──📁 route/
│       │   │
│       │   ├──🔷 [page.jsx]
│       │   ├──🔹 [page.module.css]
│       │   │
│       │   ├──📁 functions/
│       │   │   │
│       │   │   └──⚙️ [singleFunction]
│       │   │
│       │   ├──📁 utility/
│       │   │   │
│       │   │   ├──📄 [file]
│       │   │   ├──🔻 [media]
│       │   │   └──➜ [utility]
│       │   │   
│       │   └──📁 sub-route/
│       │       │
│       │       ├──🔷 [page.jsx]
│       │       ├──🔹 [page.module.css]
│       │       │
│       │       ├──📁 functions/
│       │       │   │
│       │       │   └──⚙️ [singleFunction]
│       │       │
│       │       └──📁 utility/
│       │           │
│       │           ├──📄 [file]
│       │           ├──🔻 [media]
│       │           └──➜ [utility]
│       │
│       ├──❌🔹 [globals.css]
│       ├──❌🔷 [layout.jsx]
│       ├──❌🔷 [page.jsx]
│       ├──🔹 [page.module.css]
│       ├──🔷 [not-found.jsx]
│       └──🔹 [not-found.module.css]
│
├──📄 [.env]
├──📄 [.gitignore]
└──❌ <configuration-files>