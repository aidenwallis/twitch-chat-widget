import {RequestError} from "./request-error";

export interface ApiClientOptions {
  baseUrl?: string;
  headers?: Record<string, string>;
}

export enum ApiClientMethod {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  PUT = "PUT",
  DELETE = "DELETE",
}

export interface ApiClientRequestConfig extends ApiClientOptions {
  query?: Record<string, string | string[]>;
  method: ApiClientMethod;
  url: string;
  body?: string | FormData;
}

export interface ApiClientResponse<T> {
  body: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

export class ApiClient {
  public headers: Record<string, string>;
  public baseUrl: string;

  public constructor(options: ApiClientOptions = {}) {
    this.baseUrl = options.baseUrl || "";
    this.headers = options.headers || {};
  }

  public request<T>(
    config: ApiClientRequestConfig,
  ): Promise<ApiClientResponse<T>> {
    return fetch(
      this.parseUrl(
        (config.baseUrl || this.baseUrl || "") + config.url,
        config.query,
      ),
      {
        method: config.method,
        body: config.body,
        headers: {
          ...this.headers,
          ...(config.headers || {}),
        },
      },
    )
      .then((response) =>
        response.json().then((body) => ({
          body: body as T,
          status: response.status,
          statusText: response.statusText,
          headers: (response.headers as unknown) as Record<
            string,
            string
          >,
        })),
      )
      .catch(this.handleError);
  }

  public get<T>(
    url: string,
    qs?: Record<string, string | string[]>,
    headers?: Record<string, string>,
  ) {
    return this.request<T>({
      url: url,
      headers: headers,
      method: ApiClientMethod.GET,
      query: qs,
    });
  }

  public post<T>(
    url: string,
    body?: Record<string, unknown> | string | FormData,
    qs?: Record<string, string | string[]>,
    headers?: Record<string, string>,
  ) {
    return this.request<T>({
      url: url,
      method: ApiClientMethod.POST,
      body: typeof body === "object" ? JSON.stringify(body) : body,
      headers: headers,
      query: qs,
    });
  }

  public put<T>(
    url: string,
    body?: Record<string, unknown> | string | FormData,
    qs?: Record<string, string | string[]>,
    headers?: Record<string, string>,
  ) {
    return this.request<T>({
      url: url,
      method: ApiClientMethod.PUT,
      body: typeof body === "object" ? JSON.stringify(body) : body,
      headers: headers,
      query: qs,
    });
  }

  public delete<T>(
    url: string,
    qs?: Record<string, string | string[]>,
    headers?: Record<string, string>,
  ) {
    return this.request<T>({
      url: url,
      headers: headers,
      method: ApiClientMethod.DELETE,
      query: qs,
    });
  }

  public patch<T>(
    url: string,
    body?: Record<string, unknown> | string | FormData,
    qs?: Record<string, string | string[]>,
    headers?: Record<string, string>,
  ) {
    return this.request<T>({
      url: url,
      method: ApiClientMethod.PATCH,
      body: typeof body === "object" ? JSON.stringify(body) : body,
      headers: headers,
      query: qs,
    });
  }

  private parseUrl(
    base: string,
    query?: Record<string, string | string[]>,
  ) {
    if (!query) {
      return base;
    }
    const params: string[] = [];
    for (const key of Object.keys(query)) {
      const value = query[key];
      if (Array.isArray(value)) {
        for (const item of value as string[]) {
          params.push(
            `${encodeURIComponent(key)}=${encodeURIComponent(item)}`,
          );
        }
      } else {
        params.push(
          `${encodeURIComponent(key)}=${
            encodeURIComponent(value) as string
          }`,
        );
      }
    }

    if (params.length) {
      base += "?" + params.join("&");
    }

    return base;
  }

  private handleError(err: RequestError) {
    return Promise.reject(
      new RequestError(err.message, err.statusCode || 500),
    );
  }
}
