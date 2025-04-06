interface BorderLineProps {
    color: string; // Tailwind color class, e.g., "border-pinkKonkon"
    marginBottom?: string; // Tailwind margin class, e.g., "mb-1"
  }
  
  export default function BorderLine({ color, marginBottom = "" }: BorderLineProps) {
    return (
      <div className={`border-t ${color} ${marginBottom}`}></div>
    );
  }