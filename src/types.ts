interface PostData {
  layout: string;
  title: string;
  description?: string;
  dates: {
    publish: Date;
    edited?: Date;
  };
  tags?: string[];
}

interface PageMeta {
  id: string,
  title: string
}

export type { PostData, PageMeta };
