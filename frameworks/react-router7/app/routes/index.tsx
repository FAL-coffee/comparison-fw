import { redirect } from "react-router";

export function clientLoader() {
  return redirect("/orders");
}

export default function Index() {
  return null;
}
