import { getCurrentUser, isAuthConfigured } from "@/lib/auth0";
import { getCartSummary } from "@/lib/commerce/cart-service";

import { CheckoutExperience } from "./checkout-experience";
import { qPayLogo } from "./store-data";
import { CompactStoreFooter } from "./store-footer";
import { StoreNavbar } from "./store-navbar";

function splitName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  return {
    firstName: parts.slice(1).join(" ") || parts[0] || "",
    lastName: parts[0] || "",
  };
}

export async function CheckoutPage() {
  const [cart, user] = await Promise.all([getCartSummary(), getCurrentUser()]);
  const name = user ? splitName(user.name) : { firstName: "", lastName: "" };

  return (
    <>
      <StoreNavbar />
      <main className="mx-auto max-w-7xl px-6 pb-20 pt-28">
        <header className="mb-12">
          <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-on-background">
            Аюулгүй төлбөр тооцоо
          </h1>
          <p className="font-body text-text-soft">
            Захиалгаа дуусган баяр баясгаланг гэртээ авчираарай.
          </p>
        </header>

        <CheckoutExperience
          initialCart={cart}
          initialCustomer={{
            firstName: name.firstName,
            lastName: name.lastName,
            email: user?.email || "",
            phone: "",
            addressLine1: "",
            addressLine2: "",
            city: "Улаанбаатар",
            district: "",
            notes: "",
          }}
          isAuthenticated={Boolean(user)}
          isAuthConfigured={isAuthConfigured()}
          qPayLogo={qPayLogo}
        />
      </main>
      <CompactStoreFooter variant="checkout" />
    </>
  );
}
