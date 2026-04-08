import { PageIntro } from "@/components/layout/page-intro";
import { EmptyState } from "@/components/layout/empty-state";

export function AdminCouponsPage() {
  return (
    <div className="space-y-8">
      <PageIntro
        description="Купон, хөнгөлөлтийн урсгалд зориулсан удирдлагын бэлтгэл хэсэг."
        eyebrow="Admin · Coupons"
        title="Купон ба хямдрал"
      />

      <EmptyState
        description="Купоны модель хараахан холбогдоогүй байна. Дараагийн алхамд MongoDB collection болон admin mutation API нэмэхэд энэ хэсэг бодит өгөгдлөөр ажиллана."
        icon="sell"
        title="Купон хараахан бүртгэгдээгүй байна"
      />
    </div>
  );
}
