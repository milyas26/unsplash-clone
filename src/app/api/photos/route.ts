import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // get params
  const params = new URL(request.url).searchParams;

  // get id
  const page = params.get("page");
  const per_page = params.get("per_page");
  const query = params.get("query");

  const res = await axios.get(
    `https://api.unsplash.com/search/photos?page=${page}&per_page=${per_page}&query=${query}`,
    {
      headers: {
        Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
      },
      
    }
  );

  return NextResponse.json(res.data);
}
