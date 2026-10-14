export type FormValue = unknown;
export type FormValues = Record<string, FormValue>;
export interface WorkflowField {
  key: string;
  label: string;
  required?: boolean;
  /** Optional synchronous field validator. Return a user-facing error or undefined. */
  validate?: (value: unknown, values: FormValues) => string | undefined;
}
export interface WorkflowSection {
  id: string;
  title: string;
  description?: string;
  fields: WorkflowField[];
}

