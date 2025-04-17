interface BorderLineProps {
    color: string; // Tailwind color class, e.g., "border-pinkKonkon"
    marginBottom?: string; // Tailwind margin class, e.g., "mb-1"
    borderThickness?: string;  // Tailwind class, increments of 2/4/8 only (optional)
  }
  
  export default function BorderLine({ color, marginBottom = "", borderThickness = "" }: BorderLineProps) {
    return (
      <div className={`border-t ${color} ${marginBottom} ${borderThickness}`}></div>
    );
  }