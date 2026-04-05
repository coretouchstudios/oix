type Plugin = {
  name: string;
  run: (input: string) => Promise<string>;
};

const plugins: Plugin[] = [];

export function registerPlugin(plugin: Plugin) {
  plugins.push(plugin);
}

export function getPlugins() {
  return plugins;
}