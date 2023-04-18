import Head from "next/head";
import { GetServerSideProps, NextPage } from "next";
import { fetchArticles, fetchCategories } from "@/http";
import {
  ICollectionResponse,
  ICategory,
  IArticle,
  IPagination,
  IQueryOptions,
} from "@/types";
import { AxiosResponse } from "axios";
import Tabs from "@/components/Tabs";
import ArticleList from "@/components/ArticleList";
import Pagination from "@/components/Pagination";
import { useRouter } from "next/router";
let _ = require('lodash')

let qs = require("qs");

interface IPropTypes {
  categories: {
    items: ICategory[];
  };
  articles: {
    items: IArticle[];
    pagination: IPagination;
  };
}

const Home: NextPage<IPropTypes> = ({ categories, articles }) => {
  const router = useRouter();
  const { page, pageCount } = articles.pagination;

  const handleSearch = (query: string) => {
    router.push(`/?search=${query}`);
  };

  return (
    <>
      <Head>
        <title>CodeCrush</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Tabs
        categories={categories.items}
        handleOnSearch={_.debounce(handleSearch, 500)}
      />

      {/* Articles */}
      <ArticleList articles={articles.items} />
      <Pagination page={page} pageCount={pageCount} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  console.log("running")
  // articles
  const options: Partial<IQueryOptions> = {
    populate: ["author.avatar"],
    sort: ["id:desc"],
    pagination: {
      page: query.page ? +query.page : 1,
      pageSize: 24,
    },
  };

  if (query.search) {
    options.filters = {
      Title: {
        $containsi: query.search,
      },
    };
  }

  const queryString = qs.stringify(options);

  const { data: articles }: AxiosResponse<ICollectionResponse<IArticle[]>> =
    await fetchArticles(queryString);

  // categories
  const { data: categories }: AxiosResponse<ICollectionResponse<ICategory[]>> =
    await fetchCategories();

  return {
    props: {
      categories: {
        items: categories.data,
      },
      articles: {
        items: articles.data,
        pagination: articles.meta.pagination ?? null,
      },
    },
  };
};

export default Home;
