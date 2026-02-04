import { redirect } from "@remix-run/react";
import type { ClientLoaderFunctionArgs } from "@remix-run/react";

export const clientLoader = async (_args: ClientLoaderFunctionArgs) => {
  return redirect("/orders");
};

export default function Index() {
  return null;
}
