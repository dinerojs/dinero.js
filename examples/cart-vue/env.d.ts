/// <reference types="vite/client" />

declare module '*.json' {
  const value: unknown;
  export default value;
}
