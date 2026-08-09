import type {SiteContent} from './types';
import id from './id';
import en from './en';

const contentByLocale: Record<string, SiteContent> = {id, en};

export function getContent(locale: string): SiteContent {
  return contentByLocale[locale] ?? contentByLocale.id;
}
