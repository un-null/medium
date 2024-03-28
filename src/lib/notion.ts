import { Client } from "@notionhq/client";
import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

type FilterdArticlesData = {
  id: string;
  title: string[];
  name: string;
  avatar: string;
}[];

type FilterdWorksData = {
  id: string;
  title: string[];
  name: string;
  avatar: string;
}[];

type FilterdVlogData = {
  id: string;
  title: string[];
  name: string;
  avatar: string;
  url: string;
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
  let filterdWorksData: FilterdWorksData = [];

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
        filterdWorksData.push({ id, title, ...user });
      }
    }
    return [];
  });

  return filterdWorksData;
};

export const getVlogs = async () => {
  const db = import.meta.env.NOTION_VLOG_DATABASE_ID;

  const results = (await notion.databases.query({ database_id: db })).results;

  // Fix using reduce ???
  let filterdVlogsData: FilterdVlogData = [];

  results.map((d) => {
    if ("properties" in d) {
      const id = d.id;
      const title =
        d.properties["タイトル"]?.type === "title"
          ? d.properties["タイトル"].title.map((t) => t.plain_text)
          : [""];

      const url = (
        d.properties["URL"]?.type === "url" ? d.properties["URL"].url : ""
      ) as string;

      if (
        d.properties["編纂員"]?.type === "created_by" &&
        "name" in d.properties["編纂員"].created_by
      ) {
        const user = {
          name: d.properties["編纂員"].created_by.name || "",
          avatar: d.properties["編纂員"].created_by.avatar_url || "",
        };
        filterdVlogsData.push({ id, url, title, ...user });
      }
    }
    return [];
  });

  return filterdVlogsData;
};

export const getHome = async () => {
  const page = import.meta.env.NOTION_HOME_PAGE_ID;

  const results = (await notion.blocks.children.list({ block_id: page }))
    .results;

  return results.filter((d) => "type" in d) as BlockObjectResponse[];
};
