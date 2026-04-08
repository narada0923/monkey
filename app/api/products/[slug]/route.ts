import { getShopProductBySlug, listRelatedShopProducts } from "@/lib/services/product.service";
import { apiSuccess } from "@/lib/server/response";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const product = getShopProductBySlug(slug);

  if (!product) {
    return apiSuccess(
      {
        message: "Бүтээгдэхүүн олдсонгүй.",
      },
      { status: 404 },
    );
  }

  return apiSuccess({
    product,
    relatedProducts: listRelatedShopProducts(product.id),
  });
}
