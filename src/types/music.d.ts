export interface Music {
  id: number;
  korTitle: string;
  enTitle: string;
  title: string;
  CustomComponent?: () => JSX.Element;
}
