import { AccountShell } from "@/components/layout/account-shell";
import { EmptyState } from "@/components/layout/empty-state";

type AddressesPageProps = {
  latestAddress?: string[];
  latestPhone?: string;
};

export async function AddressesPage({
  latestAddress,
  latestPhone,
}: AddressesPageProps) {
  return (
    <AccountShell
      activeHref="/addresses"
      description="Сүүлийн захиалгад ашигласан хүргэлтийн мэдээлэл болон холбоо барих дугаар."
      title="Хаягийн бүртгэл"
    >
      {latestAddress?.length ? (
        <div className="rounded-[2rem] bg-surface-container-low p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-on-surface">Сүүлийн хаяг</h2>
          <div className="mt-6 space-y-2 text-base leading-7 text-on-surface-variant">
            {latestAddress.map((line) => (
              <p key={line}>{line}</p>
            ))}
            {latestPhone ? <p>Утас: {latestPhone}</p> : null}
          </div>
          <p className="mt-6 text-sm text-on-surface-variant">
            Одоогоор хаяг нь тусдаа профайл хэлбэрээр засварлагдахгүй. Дараагийн
            захиалга хийхэд шинэ мэдээлэл автоматаар энд шинэчлэгдэнэ.
          </p>
        </div>
      ) : (
        <EmptyState
          actionHref="/checkout"
          actionLabel="Анхны захиалга хийх"
          description="Та одоогоор хадгалагдсан хүргэлтийн мэдээлэлгүй байна."
          icon="home_pin"
          title="Хаяг хадгалагдаагүй байна"
        />
      )}
    </AccountShell>
  );
}
