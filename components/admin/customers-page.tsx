import { PageIntro } from "@/components/layout/page-intro";

type CustomerRow = {
  email: string;
  name: string;
  phone: string;
  orderCount: number;
};

type AdminCustomersPageProps = {
  customers: CustomerRow[];
};

export function AdminCustomersPage({
  customers,
}: AdminCustomersPageProps) {
  return (
    <div className="space-y-8">
      <PageIntro
        description="Захиалгын мэдээллээс үүсгэсэн давтагдашгүй хэрэглэгчийн товч мэдээлэл."
        eyebrow="Admin · Customers"
        title="Хэрэглэгчид"
      />

      <div className="overflow-hidden rounded-[2rem] bg-surface-container-low shadow-sm">
        <table className="min-w-full divide-y divide-outline-variant/20 text-left text-sm">
          <thead className="bg-surface-container-high">
            <tr>
              <th className="px-6 py-4 font-bold text-on-surface">Нэр</th>
              <th className="px-6 py-4 font-bold text-on-surface">Имэйл</th>
              <th className="px-6 py-4 font-bold text-on-surface">Утас</th>
              <th className="px-6 py-4 font-bold text-on-surface">Захиалга</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {customers.map((customer) => (
              <tr key={customer.email}>
                <td className="px-6 py-4 font-medium text-on-surface">{customer.name}</td>
                <td className="px-6 py-4 text-on-surface-variant">{customer.email}</td>
                <td className="px-6 py-4 text-on-surface-variant">{customer.phone}</td>
                <td className="px-6 py-4 text-on-surface-variant">{customer.orderCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
