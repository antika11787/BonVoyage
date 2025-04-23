import { DynamicIcon } from "lucide-react/dynamic";

interface Props {
  name: any;
  color?: string;
  size?: number;
  className?: string;
}

const Icon = ({ name, color , size , className }: Props) => {
  return <DynamicIcon name={name} color={color} size={size} className={className} />;
};

export default Icon;
