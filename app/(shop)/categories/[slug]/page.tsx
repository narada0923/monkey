import type { Metadata } from "next";

import { CategoryPage } from "@/components/shop/category-page";
import { listProductsByCategory } from "@/lib/services/product.service";

const categoryCopy: Record<string, { title: string; description: string }> = {
  girls: {
    title: "Охидын сонголтууд",
    description:
      "Зөөлөн өнгө, эвтэйхэн эсгүүр, өдөр тутмын болон бэлгийн сонголтууд.",
  },
  boys: {
    title: "Хөвгүүдийн сонголтууд",
    description:
      "Гадаа, дотор аль ч орчинд эвтэйхэн өмсөх бат бөх, дулаахан төрлүүд.",
  },
  accessories: {
    title: "Дагалдах хэрэгсэл",
    description:
      "Малгай, тоглоом, жижиг бэлгийн сонголтуудыг нэг дороос үзээрэй.",
  },
};

type CategoryRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: CategoryRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const copy = categoryCopy[slug] ?? {
    title: "Ангилал",
    description: "Monkey Closet бүтээгдэхүүний ангилал.",
  };

  return {
    title: `Monkey Closet | ${copy.title}`,
    description: copy.description,
  };
}

export default async function CategoryRoute({ params }: CategoryRouteProps) {
  const { slug } = await params;
  const copy = categoryCopy[slug] ?? {
    title: slug,
    description: "Сонгосон ангиллын бүтээгдэхүүнүүд.",
  };

  return (
    <CategoryPage
      description={copy.description}
      products={listProductsByCategory(slug)}
      slug={slug}
      title={copy.title}
    />
  );
}
