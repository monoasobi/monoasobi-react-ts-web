export interface MusicBase {
  id: number;
  korTitle: string;
  enTitle: string;
  title: string;
  novelTitle: string;
  novelWriter: string;
  translated: boolean;
  isPublished: boolean;
  originalNovelUrl?: string;
}

export type Music =
  | (MusicBase & { translated: true; translator: string })
  | (MusicBase & { translated: false });
