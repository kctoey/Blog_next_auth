import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Post from "@/models/Post";
export const GET = async (req) => {
  const url = new URL(req.url);
  const username = url.searchParams.get("username");
  try {
    await connect();
    const posts = await Post.find().limit(10);
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new NextResponse("Database error", { status: 500 });
  }
  //fetch
};
