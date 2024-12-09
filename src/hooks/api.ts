import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

export const useFetchGithubUser = (username: string) => {
  const { data } = useQuery({
    queryKey: ["github-user", username],
    queryFn: async () => {
      const {
        data: {
          data: { user },
        },
      } = await axios.post<
        ApiRoutes.Response<"/api/github/user">,
        AxiosResponse<ApiRoutes.Response<"/api/github/user">>,
        ApiRoutes.Request<"/api/github/user">
      >("/api/github/user", {
        username,
      });

      return user;
    },
  });

  return data;
};

export const useFetchGithubRepoReleases = (owner: string, repo: string) => {
  const { data } = useQuery({
    queryKey: ["github-repo-releases", owner, repo],
    queryFn: async () => {
      const {
        data: {
          data: { releases },
        },
      } = await axios.post<
        ApiRoutes.Response<"/api/github/releases">,
        AxiosResponse<ApiRoutes.Response<"/api/github/releases">>,
        ApiRoutes.Request<"/api/github/releases">
      >("/api/github/releases", {
        owner,
        repo,
      });

      return releases;
    },
  });

  return data;
};

export const useFetchNotionDatabasePages = (
  tags: string[],
  databaseId: string,
  tagPropertyName: string,
  hiddenChkBoxPropertyName: string
) => {
  const { data } = useQuery({
    queryKey: ["pages", ...tags],
    queryFn: async () => {
      const {
        data: {
          data: { pages },
        },
      } = await axios.post<
        ApiRoutes.Response<"/api/notion/databases">,
        AxiosResponse<ApiRoutes.Response<"/api/notion/databases">>,
        ApiRoutes.Request<"/api/notion/databases">
      >("/api/notion/databases", {
        databaseId,
        tags,
        tagPropertyName,
        hiddenChkBoxPropertyName: hiddenChkBoxPropertyName,
      });

      return pages;
    },
  });

  return data;
};

export const useFetchDatabaseTags = (
  databaseId: string,
  tagPropertyName: string,
  statusPropertyName?: string,
  statusCompleteSelectName?: string
) => {
  const { data } = useQuery({
    queryKey: ["dev-log-filter"],
    queryFn: async () => {
      const {
        data: {
          data: { tags },
        },
      } = await axios.post<
        ApiRoutes.Response<"/api/notion/databases/tags">,
        AxiosResponse<ApiRoutes.Response<"/api/notion/databases/tags">>,
        ApiRoutes.Request<"/api/notion/databases/tags">
      >("/api/notion/databases/tags", {
        databaseId,
        tagPropertyName,
        statusCompleteSelectName,
        statusPropertyName,
      });

      return tags;
    },
  });

  return data;
};
