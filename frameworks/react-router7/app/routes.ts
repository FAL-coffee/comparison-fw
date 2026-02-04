import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("orders", "routes/orders.tsx"),
  route("orders/:orderId", "routes/orderDetail.tsx"),
  route("orders/:orderId/status", "routes/orderEdit.tsx"),
] satisfies RouteConfig;
