import Tabs from "@/components/Tabs";
import Head from "next/head";
import React from "react";
import { GetServerSideProps } from "next";
import { AxiosResponse } from "axios";
import { IArticle, ICategory, ICollectionResponse, IPagination, IQueryOptions } from "@/types";
import { fetchArticles, fetchCategories } from "@/http";
// import qs from 'qs';
let qs = require("qs");
import ArticleList from "@/components/ArticleList";
import { capitalizeFirstLetter, makeCategory } from "@/utils";
import Pagination from "@/components/Pagination";
import { useRouter } from "next/router";
let _ = require("lodash");

interface IPropType {
  categories: {
    items: ICategory[];
    pagination: IPagination;
  };
  articles: {
    items: IArticle[];
    pagination: IPagination;
  };
  slug: string;
}

const Category = ({ categories, articles, slug }: IPropType) => {
  const { page, pageCount } = articles.pagination;
  const router = useRouter();
  const { category: categorySlug } = router.query;

  const formattedCategory = () => {
    return capitalizeFirstLetter(makeCategory(slug));
  };

  const handleSearch = (query: string) => {
    router.push(`/category/${categorySlug}/?search=${query}`);
};

  return (
    <>
      <Head>
        <title>CodeCrusher - {formattedCategory()}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Tabs
        categories={categories.items}
        handleOnSearch={_.debounce(handleSearch, 500)}
      />
      <ArticleList articles={articles.items} />
      <Pagination
        page={page}
        pageCount={pageCount}
        redirectUrl={`/category/${categorySlug}`}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  console.log(query, "query");
  const options: Partial<IQueryOptions> = {
    populate: ["author.avatar"],
    sort: ["id:desc"],
    filters: {
      category: {
        slug: query.category,
      },
    },
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

  const { data: categories }: AxiosResponse<ICollectionResponse<ICategory[]>> =
    await fetchCategories();

  return {
    props: {
      categories: {
        items: categories.data,
        pagination: categories.meta.pagination ?? null,
      },
      articles: {
        items: articles.data,
        pagination: articles.meta.pagination ?? null,
      },
      slug: query.category,
    },
  };
};

export default Category;
