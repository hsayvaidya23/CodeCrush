import { IArticle } from "@/types";
import { serialize } from "next-mdx-remote/serialize";

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }); 
  
  return date;
};

export const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const makeCategory = ( slug: string): string => {
 if(typeof slug === 'string') {
  // 'node-js' => ['node', 'js'] => 'node js'
  return slug.split('-').join(' ')
 }
 return '';
}

export const serializeMarkdown = async (item: IArticle) => {
  const body = await serialize(item.attributes.body as string);
  return {
    ...item,
    attributes: {
      ...item.attributes,
      body,
    },
  }
}
