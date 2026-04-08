import type { AuthenticatedUser } from "@/lib/auth";
import type { OrderSummaryCard } from "@/types/commerce";

import { ProfilePage as StorefrontProfilePage } from "@/components/storefront/profile-page";

type AccountProfilePageProps = {
  user: AuthenticatedUser;
  orders: OrderSummaryCard[];
  latestPhone?: string;
  latestAddress?: string[];
};

export function AccountProfilePage(props: AccountProfilePageProps) {
  return <StorefrontProfilePage {...props} />;
}
