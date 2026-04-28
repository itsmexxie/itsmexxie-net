import type { CollectionEntry } from "astro:content";

interface PostData {
  layout: string;
  title: string;
  description?: string;
  dates?: {
    publish: Date;
    edited?: Date;
  };
  tags?: string[];
}

type PublishedPost = CollectionEntry<"blog"> & {
  data: { dates: { edited?: Date; publish: Date } };
};

type PublishedNote = CollectionEntry<"notes"> & {
  data: { dates: { edited?: Date; publish: Date } };
};

interface PageMeta {
  id: string;
  title: string;
}

export type { PostData, PublishedPost, PublishedNote, PageMeta };
