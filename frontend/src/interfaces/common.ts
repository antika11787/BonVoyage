export interface UserState {
  token: string;
  user: {
    _id: string;
    name: string;
    profilePic: string;
    email: string;
    role: string;
  };
}

export interface InputFieldProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
}

export interface ButtonProps {
  type: "submit" | "reset" | "button" | undefined;
  onClick?: () => void;
  children?: React.ReactNode;
  hasIcon?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  hasBackground?: boolean;
  background?: string;
  textColor?: string;
  padding?: string;
  isSmall?: boolean;
  isLarge?: boolean;
}

export interface Tabs {
  id: number;
  text: string;
  value: string;
  icon?: React.ReactNode;
}
export interface TabProps {
  items: Tabs[];
  currentTab: number;
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
  hasIcon?: boolean;
  icon?: React.ReactNode;
}

export interface PaginationProps {
  page: number;
  totalItems: number;
  itemsPerPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  maxButtonsToShow?: number;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  children?: React.ReactNode;
  zIndex?: string;
  width?: string;
  height?: string;
}

export interface UserListProps {
  _id: string;
  name: string;
  email: string;
  role: string;
  tourId: string;
  icons: React.ReactNode;
}


export interface CategoryState {
  _id: string;
  title: string;
  icon: string;
  color: string;
}