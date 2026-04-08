import { listProducts, listProductsByCategory } from "@/lib/services/product.service";
import { apiSuccess } from "@/lib/server/response";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  return apiSuccess({
    products: category ? listProductsByCategory(category) : listProducts(),
  });
}
