import React from "react";
import { GetServerSideProps } from "next";
import { AxiosResponse } from "axios";
import { IArticle, ICollectionResponse } from "@/types";
import { fetchArticleBySlug } from "@/http";
import Head from "next/head";
import Image from "next/image";
import { formatDate, serializeMarkdown } from "@/utils";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
let qs = require("qs");

interface IPropType {
  article: IArticle;
  notFound?: boolean;
}

const slug = ({ article, notFound = false }: IPropType) => {
  return (
    <>
      <Head>
        <title>{article.attributes.Title}</title>
        <meta
          name="description"
          content={`learn ${article.attributes.Title}`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="my-12 grid lg:grid-cols-3 gap-12 single-article">
        <div className="col-span-2">
          <h1 className="text-3xl font-bold py-2">
            {article.attributes.Title}
          </h1>
          <div className="flex items-center my-4">
            <div className="rounded-lg overflow-hidden flex items-center justify-center mr-2">
              <Image
                alt="image of avatar"
                src={`${article.attributes.author.data.attributes.avatar.data.attributes.formats.thumbnail.url}`}
                height={40}
                width={40}
              />
            </div>
            <span className="text-sm font-bold text-gray-600">
              {article.attributes.author.data.attributes.firstname}{" "}
              {article.attributes.author.data.attributes.lastname} on &nbsp;
              <span className="text-gray-400">
                {formatDate(article.attributes.createdAt)}
              </span>
            </span>
          </div>
          <div className="text-lg text-gray-600 leading-8">
            <Image
              alt="image of article"
              className="w-full my-12 mb-6"
              src={`${article.attributes.Image.data.attributes.url}`}
              width={500}
              height={500}
            />
            <MDXRemote
              {...(article.attributes.body as MDXRemoteSerializeResult)}
            />
          </div>
        </div>
        <div className="sticky top-0">
          <h2 className="font-bold text-gray-600 text-lg">
            Signup to our newsletter
          </h2>
          <p className="mt-4 text-gray-500">
            Get the latest article on all things data delivered straight to your
            inbox
          </p>
          <input
            className="border w-full p-2 pl-3 my-6 outline-primary"
            type="email"
            placeholder="Your work email"
          />
          <button className="border-2 border-primary rounded py-1 px-6 text-primary font-bold">
            Subscribe
          </button>
          <hr className="my-6 border-gray-100" />
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <span className="text-gray-500 mr-2">Share</span>
            <a className="text-gray-500">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                ></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
          <hr className="my-6 border-gray-100" />
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const queryString = qs.stringify({
    populate: ["Image", "author.avatar"],
    filters: {
      Slug: {
        $eq: query.slug,
      },
    },
  });

  const { data: articles } = await fetchArticleBySlug(queryString);

  if (articles.data.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      article: await serializeMarkdown(articles.data[0]),
    },
  };
};

export default slug;
