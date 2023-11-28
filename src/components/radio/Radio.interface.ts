export interface RadioGroupProps {
  label: string;
  value: string;
  checked: boolean;
  onChange: (selectedValue: string) => void;
}
