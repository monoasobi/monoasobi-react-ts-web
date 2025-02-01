export interface Music {
  id: number;
  korTitle: string;
  enTitle: string;
  title: string;
  novelTitle: string;
  novelWriter: string;
  translated: boolean;
  isPublished: boolean;
  originalNovelUrl?: string;
  bookId?: number;
  translator?: string;
  translatorUrl?: string;
  CustomComponent?: () => JSX.Element;
}
