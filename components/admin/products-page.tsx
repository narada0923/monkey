import Link from "next/link";

import { PageIntro } from "@/components/layout/page-intro";
import type { CatalogProduct } from "@/types/commerce";
import { formatMoney } from "@/lib/commerce/pricing";

type AdminProductsPageProps = {
  products: CatalogProduct[];
};

export function AdminProductsPage({ products }: AdminProductsPageProps) {
  return (
    <div className="space-y-8">
      <PageIntro
        description="Статик каталогийг одоогийн байдлаар серверийн үйлчилгээний давхаргаас уншиж байна."
        eyebrow="Admin · Products"
        title="Бүтээгдэхүүний жагсаалт"
      />

      <div className="overflow-hidden rounded-[2rem] bg-surface-container-low shadow-sm">
        <table className="min-w-full divide-y divide-outline-variant/20 text-left text-sm">
          <thead className="bg-surface-container-high">
            <tr>
              <th className="px-6 py-4 font-bold text-on-surface">Нэр</th>
              <th className="px-6 py-4 font-bold text-on-surface">Ангилал</th>
              <th className="px-6 py-4 font-bold text-on-surface">Үнэ</th>
              <th className="px-6 py-4 font-bold text-on-surface">Slug</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 font-medium text-on-surface">
                  <Link className="hover:text-primary" href={`/products/${product.slug}`}>
                    {product.name}
                  </Link>
                </td>
                <td className="px-6 py-4 text-on-surface-variant">{product.category}</td>
                <td className="px-6 py-4 text-on-surface-variant">
                  {formatMoney(product.price)}
                </td>
                <td className="px-6 py-4 text-on-surface-variant">{product.slug}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
