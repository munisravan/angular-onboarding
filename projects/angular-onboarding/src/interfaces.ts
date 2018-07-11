export interface Step {
  id: number;
  text: string;
  path?: string;
}

export interface Config {
  steps: Step[];
  padding?: number;
}

export interface AOStorage {
  step: number;
  enabled: boolean;
}
