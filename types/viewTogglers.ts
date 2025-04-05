export type viewToggler = {
  id: number;
  label: string;
  value: string;
  handler: (value: boolean) => void;
}