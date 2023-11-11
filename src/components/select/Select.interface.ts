export interface SelectProps {
  label: string;
  options: string[];
  onSelect: (selectedOption: string) => void;
}
