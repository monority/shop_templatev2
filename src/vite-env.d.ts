/// <reference types="vite/client" />

declare interface ImportMetaEnv {
    readonly DEV: boolean;
    // Ajoute d'autres variables d'environnement ici si besoin
}

declare interface ImportMeta {
    readonly env: ImportMetaEnv;
}
