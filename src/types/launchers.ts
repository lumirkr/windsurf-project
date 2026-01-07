export interface ResourceItem {
  id: number;
  titulo: string;
  icono: string;
  color: string;
  link: string;
}

export interface LauncherProps {
  recursos: ResourceItem[];
}
