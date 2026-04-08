export const shopRoutes = [
  { label: "Нүүр", href: "/" },
  { label: "Бүтээгдэхүүн", href: "/products" },
  { label: "Сагс", href: "/cart" },
  { label: "Төлбөр", href: "/checkout" },
] as const;

export const accountRoutes = [
  { label: "Профайл", href: "/profile" },
  { label: "Захиалгууд", href: "/orders" },
  { label: "Хаягууд", href: "/addresses" },
  { label: "Хадгалсан бараа", href: "/wishlist" },
] as const;

export const adminRoutes = [
  { label: "Хянах самбар", href: "/admin" },
  { label: "Бүтээгдэхүүн", href: "/admin/products" },
  { label: "Захиалга", href: "/admin/orders" },
  { label: "Хэрэглэгч", href: "/admin/customers" },
  { label: "Нөөц", href: "/admin/inventory" },
  { label: "Купон", href: "/admin/coupons" },
] as const;
