interface BaseOnTheStage {
  id: number;
  title: string;
  korTitle: string;
  contentTitle: string;
  contentWriter: string;
  translator: string;
  translatorUrl: string;
  originalUrl: string;
}

type OnTheStage =
  | ({ type: "comic"; length: number; contentId: number } & BaseOnTheStage)
  | ({ type: "novel"; contentId: string } & BaseOnTheStage);
