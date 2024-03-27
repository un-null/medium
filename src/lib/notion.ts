import { Client } from "@notionhq/client";

type FilterdArticlesData = {
  id: string;
  title: string[];
  name: string;
  avatar: string;
}[];

export const notion = new Client({
  auth: import.meta.env.NOTION_KEY,
});

export const getArticles = async () => {
  const db = import.meta.env.NOTION_ARTICLE_DATABASE_ID;

  const results = (await notion.databases.query({ database_id: db })).results;

  // Fix using reduce ???
  let filterdArticleData: FilterdArticlesData = [];

  results.map((d) => {
    if ("properties" in d) {
      const id = d.id;
      const title =
        d.properties["タイトル"]?.type === "title"
          ? d.properties["タイトル"].title.map((t) => t.plain_text)
          : [""];
      if (
        d.properties["編纂員"]?.type === "created_by" &&
        "name" in d.properties["編纂員"].created_by
      ) {
        const user = {
          name: d.properties["編纂員"].created_by.name || "",
          avatar: d.properties["編纂員"].created_by.avatar_url || "",
        };
        filterdArticleData.push({ id, title, ...user });
      }
    }
    return [];
  });

  return filterdArticleData;
};

export const getWorks = async () => {
  const db = import.meta.env.NOTION_WORK_DATABASE_ID;

  const results = (await notion.databases.query({ database_id: db })).results;

  // Fix using reduce ???
  let filterdArticleData: FilterdArticlesData = [];

  results.map((d) => {
    if ("properties" in d) {
      const id = d.id;
      const title =
        d.properties["タイトル"]?.type === "title"
          ? d.properties["タイトル"].title.map((t) => t.plain_text)
          : [""];
      if (
        d.properties["編纂員"]?.type === "created_by" &&
        "name" in d.properties["編纂員"].created_by
      ) {
        const user = {
          name: d.properties["編纂員"].created_by.name || "",
          avatar: d.properties["編纂員"].created_by.avatar_url || "",
        };
        filterdArticleData.push({ id, title, ...user });
      }
    }
    return [];
  });

  return filterdArticleData;
};
