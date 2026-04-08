import { AccountShell } from "@/components/layout/account-shell";
import { EmptyState } from "@/components/layout/empty-state";

export async function WishlistPage() {
  return (
    <AccountShell
      activeHref="/wishlist"
      description="Хадгалсан бүтээгдэхүүний жагсаалт энэ хэсэгт гарч ирнэ."
      title="Хадгалсан бараа"
    >
      <EmptyState
        actionHref="/products"
        actionLabel="Дуртай бүтээгдэхүүн сонгох"
        description="Wishlist урсгал дараагийн алхамд холбогдоно. Одоогоор бүтээгдэхүүний дэлгэрэнгүй хуудаснаас хэрэглэгчийн сонголтыг нэмэх суурь бэлэн байна."
        icon="favorite"
        title="Хадгалсан бараа алга"
      />
    </AccountShell>
  );
}
