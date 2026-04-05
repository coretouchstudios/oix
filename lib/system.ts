export type OIXState = {
  workspace: string;
  activeProject: string | null;
  agentsRunning: boolean;
  notifications: string[];
};

let state: OIXState = {
  workspace: "OIX Core",
  activeProject: null,
  agentsRunning: false,
  notifications: [],
};

const listeners: Function[] = [];

export function getState() {
  return state;
}

export function setState(partial: Partial<OIXState>) {
  state = { ...state, ...partial };
  listeners.forEach((l) => l(state));
}

export function subscribe(fn: Function) {
  listeners.push(fn);
}