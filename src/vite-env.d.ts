declare module 'react' {
  export type FormEvent<T = Element> = { preventDefault(): void; currentTarget: T };
  export type CSSProperties = Record<string, string | number>;
  export function useEffect(effect: () => void | (() => void), deps?: unknown[]): void;
  export function useMemo<T>(factory: () => T, deps: unknown[]): T;
  export function useState<T>(initial: T): [T, (value: T | ((previous: T) => T)) => void];
  export const StrictMode: (props: { children?: unknown }) => unknown;
}
declare module 'react-dom/client' {
  export default { createRoot(node: Element): { render(children: unknown): void } };
}
declare module 'react/jsx-runtime' {
  export const jsx: unknown;
  export const jsxs: unknown;
  export const Fragment: unknown;
}
declare module 'vite' { export function defineConfig(config: unknown): unknown; }
declare module '@vitejs/plugin-react' { export default function react(): unknown; }
declare namespace JSX { interface IntrinsicElements { [elementName: string]: any } }

declare module '*.css';
interface ImportMetaEnv { readonly VITE_API_BASE_URL?: string; }
interface ImportMeta { readonly env: ImportMetaEnv; }
