import { Button } from "../ui/button";

function ButtonClient({
  click,
  className,
  children,
  size,
  variant,
}: {
  click: () => void;
  className: string;
  children: React.ReactNode;
  size: "lg" | "sm" | "icon" | "default" | null | undefined;
  variant:
    | "default"
    | "secondary"
    | "ghost"
    | "destructive"
    | "outline"
    | "link"
    | null
    | undefined;
}) {
  return (
    <Button size={size} variant={variant} onClick={click} className={className}>
      {children}
    </Button>
  );
}
export default ButtonClient;
