import { redirect } from "react-router";

export function loader() {
  return redirect("/orders");
}

export default function Index() {
  return null;
}
