"use server"

import { SLemonSqueezyRequest, TLemonSqueezyRequest } from "./zod-lemon-squeezy";

const lemonSqueezyBaseUrl = 'https://api.lemonsqueezy.com/v1';
const lemonSqueezyApiKey = process.env.LEMON_SQUEEZY_API_KEY;

if (!lemonSqueezyApiKey) throw new Error("No LEMON_SQUEEZY_API_KEY environment variable set");

function createHeaders() {
  const headers = new Headers();
  headers.append('Accept', 'application/vnd.api+json');
  headers.append('Content-Type', 'application/vnd.api+json');
  headers.append('Authorization', `Bearer ${lemonSqueezyApiKey}`);
  return headers;
}

function createRequestOptions(method: string, headers: Headers): RequestInit {
  return {
    method,
    headers,
    redirect: 'follow',
    cache: "no-store"
  };
}

export async function getProductVariants(productId: string): Promise<TLemonSqueezyRequest> {
  const url = `${lemonSqueezyBaseUrl}/variants?filter[product_id]=${productId}`;
  const headers = createHeaders();
  const requestOptions = createRequestOptions('GET', headers);

  const response: Response = await fetch(url, requestOptions);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  const data = await response.json();

  const parsedData = SLemonSqueezyRequest.parse(data);

  return parsedData;
}

export async function getProducts(): Promise<TLemonSqueezyRequest> {
  const url = `${lemonSqueezyBaseUrl}/products`;
  const headers = createHeaders();
  const requestOptions = createRequestOptions('GET', headers);

  const response: Response = await fetch(url, requestOptions);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  const data = await response.json();

  const parsedData = SLemonSqueezyRequest.parse(data);

  return parsedData;
}