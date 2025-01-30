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
type PublishedStatus =
  | { isPublished: true; bookId: number }
  | { isPublished: false };

export type Music =
  | (MusicBase & { translated: true; translator: string } & PublishedStatus)
  | (MusicBase & { translated: false } & PublishedStatus);
