declare module "*.vue" {
  import type { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '*.json' {
	const value: Record<string, any>;
	export default value;
}

declare module '*.yaml' {
  const json: Record<string, string>;
  export default json;
}