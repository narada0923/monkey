import { PageIntro } from "@/components/layout/page-intro";

type InventoryRow = {
  productId: string;
  productName: string;
  sku: string;
  stockOnHand: number;
  status: string;
};

type AdminInventoryPageProps = {
  inventory: InventoryRow[];
};

export function AdminInventoryPage({
  inventory,
}: AdminInventoryPageProps) {
  return (
    <div className="space-y-8">
      <PageIntro
        description="Энэ хэсэг нь бараа бүрийн SKU, тооллого, бэлэн байгаа төлөвийг харуулна."
        eyebrow="Admin · Inventory"
        title="Нөөцийн удирдлага"
      />

      <div className="grid gap-4">
        {inventory.map((item) => (
          <div
            key={item.productId}
            className="flex flex-col gap-4 rounded-[2rem] bg-surface-container-low p-5 shadow-sm md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h2 className="text-lg font-bold text-on-surface">{item.productName}</h2>
              <p className="mt-1 text-sm text-on-surface-variant">{item.sku}</p>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-sm text-on-surface-variant">Үлдэгдэл</p>
                <p className="text-xl font-bold text-on-surface">{item.stockOnHand}</p>
              </div>
              <span className="rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                {item.status === "low_stock" ? "Бага үлдэгдэл" : "Бэлэн"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
