import type { APIRoute } from "astro";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export const GET = (async (context) => {
  const notes = (await getCollection("notes")).sort((a, b) => {
    const getLastDate = (note: {
      data: { dates: { edited?: Date; publish: Date } };
    }) => {
      return (note.data.dates.edited ?? note.data.dates.publish).getTime();
    };

    return getLastDate(b) - getLastDate(a);
  });

  return rss({
    title: "itsmexxie's school notes",
    description: "Pokud v poznámkách narazíte na jakékoliv nesrovnalosti, napište prosím na site+notes@itsmexxie.net",
    site: context.site ?? "https://itsmexxie.net",
    items: notes.map((n) => ({
      title: n.data.title,
      description: n.data.description ?? "No description provided",
      pubDate: new Date(n.data.dates.publish),
      link: `/notes/note/${n.id}/`,
    })),
  });
}) satisfies APIRoute;
