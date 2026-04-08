"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { buildAuthLoginHref } from "@/lib/auth-routing";
import { calculateCheckoutPricing, formatMoney, SHIPPING_METHODS } from "@/lib/commerce/pricing";
import { usePolling } from "@/hooks/use-polling";
import type { CartSummary, CheckoutCustomerInput, ShippingMethodCode } from "@/types/commerce";

import { MaterialIcon } from "./material-icon";

type CheckoutExperienceProps = {
  initialCart: CartSummary;
  initialCustomer: CheckoutCustomerInput;
  isAuthenticated: boolean;
  isAuthConfigured: boolean;
  qPayLogo: string;
};

type InvoiceState = {
  invoiceId: string;
  qrText: string;
  qrImage: string;
  urls: Array<{
    name?: string;
    description?: string;
    link?: string;
  }>;
  order: {
    orderNumber: string;
    status: string;
  };
};

type PaymentState = {
  paid: boolean;
  paymentId: string | null;
  paidAmount: number;
  latestStatus: string | null;
  latestDescription: string | null;
  orderNumber: string;
};

async function readResponseBody<T>(response: Response) {
  const raw = await response.text();

  if (!raw) {
    return {} as T;
  }

  return JSON.parse(raw) as T;
}

export function CheckoutExperience({
  initialCart,
  initialCustomer,
  isAuthenticated,
  isAuthConfigured,
  qPayLogo,
}: CheckoutExperienceProps) {
  const [shippingMethod, setShippingMethod] =
    useState<ShippingMethodCode>("standard");
  const [customer, setCustomer] = useState(initialCustomer);
  const [invoice, setInvoice] = useState<InvoiceState | null>(null);
  const [paymentState, setPaymentState] = useState<PaymentState | null>(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const pricing = calculateCheckoutPricing(initialCart.subtotal, shippingMethod);
  const loginHref = buildAuthLoginHref("/checkout");

  usePolling({
    enabled: Boolean(invoice?.invoiceId && !paymentState?.paid),
    onTick: () => {
      void checkPaymentStatus(false);
    },
  });

  function updateCustomer<Key extends keyof CheckoutCustomerInput>(
    key: Key,
    value: CheckoutCustomerInput[Key],
  ) {
    setCustomer((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function checkPaymentStatus(manual = true) {
    if (!invoice?.invoiceId) {
      return;
    }

    if (manual) {
      setIsChecking(true);
      setStatus("Төлбөр шалгаж байна...");
    }

    try {
      const response = await fetch(
        `/api/checkout/invoice/${invoice.invoiceId}/status`,
        {
          cache: "no-store",
        },
      );
      const data = await readResponseBody<{
        message?: string;
        paid: boolean;
        paymentId: string | null;
        paidAmount: number;
        latestStatus: string | null;
        latestDescription: string | null;
        orderNumber: string;
      }>(response);

      if (!response.ok) {
        throw new Error(data.message || "Төлбөрийн төлөв шалгаж чадсангүй.");
      }

      setPaymentState({
        paid: Boolean(data.paid),
        paymentId: data.paymentId,
        paidAmount: Number(data.paidAmount || 0),
        latestStatus: data.latestStatus,
        latestDescription: data.latestDescription,
        orderNumber: data.orderNumber,
      });
      setError("");
      setStatus(
        data.paid
          ? data.latestDescription || "Төлбөр амжилттай баталгаажлаа."
          : manual
            ? "Төлбөр хараахан орж ирээгүй байна."
            : "Төлбөр хүлээж байна...",
      );
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Төлбөр шалгах үед алдаа гарлаа.",
      );
      setStatus("");
    } finally {
      if (manual) {
        setIsChecking(false);
      }
    }
  }

  async function handleCreateInvoice() {
    if (!initialCart.items.length) {
      setError("Эхлээд сагсандаа бараа нэмнэ үү.");
      return;
    }

    if (!isAuthenticated) {
      setError("QPay төлбөр үүсгэхийн тулд эхлээд нэвтэрнэ үү.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setStatus("QPay нэхэмжлэл үүсгэж байна...");

    try {
      const response = await fetch("/api/checkout/invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shippingMethod,
          customer,
        }),
      });
      const data = await readResponseBody<{
        message?: string;
        invoiceId: string;
        qrText: string;
        qrImage: string;
        urls?: InvoiceState["urls"];
        order?: {
          orderNumber: string;
          status: string;
        };
      }>(response);

      if (!response.ok) {
        throw new Error(data.message || "QPay нэхэмжлэл үүсгэхэд алдаа гарлаа.");
      }

      if (!data.invoiceId) {
        throw new Error("QPay нэхэмжлэлийн дугаар буцаасангүй.");
      }

      setInvoice({
        invoiceId: data.invoiceId,
        qrText: data.qrText || "",
        qrImage: data.qrImage || "",
        urls: Array.isArray(data.urls) ? data.urls : [],
        order: {
          orderNumber: data.order?.orderNumber || "",
          status: data.order?.status || "pending_payment",
        },
      });
      setPaymentState(null);
      setStatus("QR код үүслээ. Аппаараа уншуулж төлнө үү.");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Нэхэмжлэл үүсгэх үед алдаа гарлаа.",
      );
      setStatus("");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!initialCart.items.length) {
    return (
      <div className="rounded-[2rem] bg-surface-container-low p-10 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-surface-container-lowest text-primary shadow-sm">
          <MaterialIcon className="text-3xl" name="shopping_cart" />
        </div>
        <h2 className="text-2xl font-bold text-on-surface">
          Сагс хоосон байна
        </h2>
        <p className="mx-auto mt-3 max-w-md text-text-soft">
          Бүтээгдэхүүний дэлгэрэнгүй хуудсаас бараагаа сагсанд нэмээд төлбөрийн
          хэсэг рүү дахин орж ирээрэй.
        </p>
        <Link
          className="mt-8 inline-flex rounded-full bg-primary px-8 py-4 font-bold text-white transition-all hover:opacity-90"
          href="/products"
        >
          Бүтээгдэхүүн үзэх
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
      <div className="space-y-12 lg:col-span-7">
        <section className="rounded-[2rem] bg-surface-container-low p-8">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-on-primary">
              1
            </div>
            <h2 className="text-2xl font-bold">Хүргэлтийн мэдээлэл</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="block font-label text-sm font-medium text-on-surface-variant">
                Нэр
              </label>
              <input
                className="w-full rounded-[1rem] border-none bg-surface-container-lowest px-4 py-3 text-slate-900 transition-all placeholder:text-text-muted focus:ring-2 focus:ring-primary/20"
                onChange={(event) => updateCustomer("firstName", event.target.value)}
                placeholder="Нэрээ оруулна уу"
                type="text"
                value={customer.firstName}
              />
            </div>
            <div className="space-y-2">
              <label className="block font-label text-sm font-medium text-on-surface-variant">
                Овог
              </label>
              <input
                className="w-full rounded-[1rem] border-none bg-surface-container-lowest px-4 py-3 text-slate-900 transition-all placeholder:text-text-muted focus:ring-2 focus:ring-primary/20"
                onChange={(event) => updateCustomer("lastName", event.target.value)}
                placeholder="Овгоо оруулна уу"
                type="text"
                value={customer.lastName}
              />
            </div>
            <div className="space-y-2">
              <label className="block font-label text-sm font-medium text-on-surface-variant">
                Имэйл
              </label>
              <input
                className="w-full rounded-[1rem] border-none bg-surface-container-lowest px-4 py-3 text-slate-900 transition-all placeholder:text-text-muted focus:ring-2 focus:ring-primary/20"
                onChange={(event) => updateCustomer("email", event.target.value)}
                placeholder="name@example.com"
                type="email"
                value={customer.email}
              />
            </div>
            <div className="space-y-2">
              <label className="block font-label text-sm font-medium text-on-surface-variant">
                Утас
              </label>
              <input
                className="w-full rounded-[1rem] border-none bg-surface-container-lowest px-4 py-3 text-slate-900 transition-all placeholder:text-text-muted focus:ring-2 focus:ring-primary/20"
                onChange={(event) => updateCustomer("phone", event.target.value)}
                placeholder="99112233"
                type="tel"
                value={customer.phone}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="block font-label text-sm font-medium text-on-surface-variant">
                Хаяг
              </label>
              <input
                className="w-full rounded-[1rem] border-none bg-surface-container-lowest px-4 py-3 text-slate-900 transition-all placeholder:text-text-muted focus:ring-2 focus:ring-primary/20"
                onChange={(event) =>
                  updateCustomer("addressLine1", event.target.value)
                }
                placeholder="Гудамж, байр, тоот"
                type="text"
                value={customer.addressLine1}
              />
            </div>
            <div className="space-y-2">
              <label className="block font-label text-sm font-medium text-on-surface-variant">
                Хот
              </label>
              <input
                className="w-full rounded-[1rem] border-none bg-surface-container-lowest px-4 py-3 text-slate-900 transition-all placeholder:text-text-muted focus:ring-2 focus:ring-primary/20"
                onChange={(event) => updateCustomer("city", event.target.value)}
                placeholder="Улаанбаатар"
                type="text"
                value={customer.city}
              />
            </div>
            <div className="space-y-2">
              <label className="block font-label text-sm font-medium text-on-surface-variant">
                Дүүрэг
              </label>
              <input
                className="w-full rounded-[1rem] border-none bg-surface-container-lowest px-4 py-3 text-slate-900 transition-all placeholder:text-text-muted focus:ring-2 focus:ring-primary/20"
                onChange={(event) =>
                  updateCustomer("district", event.target.value)
                }
                placeholder="Сүхбаатар"
                type="text"
                value={customer.district}
              />
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] bg-surface-container-low p-8">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-on-primary">
              2
            </div>
            <h2 className="text-2xl font-bold">Хүргэлтийн хэлбэр</h2>
          </div>

          <div className="space-y-4">
            {Object.values(SHIPPING_METHODS).map((method) => (
              <button
                key={method.code}
                className={`relative flex w-full items-center justify-between rounded-[1.5rem] bg-surface-container-lowest p-4 text-left transition-all ${
                  shippingMethod === method.code
                    ? "ring-2 ring-primary"
                    : "hover:ring-2 hover:ring-primary/20"
                }`}
                onClick={() => setShippingMethod(method.code)}
                type="button"
              >
                <div className="flex items-center gap-4">
                  <MaterialIcon
                    className="text-primary"
                    name={method.code === "standard" ? "local_shipping" : "bolt"}
                  />
                  <div>
                    <p className="font-bold text-on-surface">{method.label}</p>
                    <p className="text-sm text-on-surface-variant">
                      {method.description}
                    </p>
                  </div>
                </div>
                <span className="font-bold text-on-surface">
                  {formatMoney(method.fee)}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border-2 border-primary-container/20 bg-surface-container-low p-8">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-on-primary">
              3
            </div>
            <h2 className="text-2xl font-bold">Төлбөрийн хэлбэр</h2>
          </div>

          <div className="space-y-6 rounded-[2rem] bg-surface-container-lowest p-8">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-12 w-24 items-center justify-center overflow-hidden rounded bg-white shadow-sm">
                <Image
                  alt="QPay"
                  className="h-8 w-auto"
                  height={32}
                  src={qPayLogo}
                  width={96}
                />
              </div>
              <div>
                <h3 className="text-lg font-bold">QPay-ээр төлөх</h3>
                <p className="mx-auto max-w-xs text-sm leading-6 text-text-soft">
                  Монголын бүх банкны аппликейшн ашиглан шуурхай төлөх. QR код
                  үүссэний дараа апп-аараа уншуулна уу.
                </p>
              </div>
            </div>

            {!isAuthenticated ? (
              <div className="rounded-[1.5rem] border border-outline-variant/30 bg-surface-container-low p-6 text-center">
                <p className="text-sm leading-6 text-text-soft">
                  QPay төлбөр үүсгэхийн өмнө хэрэглэгчийн бүртгэлээрээ нэвтэрнэ үү.
                </p>
                {isAuthConfigured ? (
                  <a
                    className="mt-4 inline-flex rounded-full bg-primary px-6 py-3 font-bold text-on-primary transition-all hover:opacity-90"
                    href={loginHref}
                  >
                    Нэвтэрч үргэлжлүүлэх
                  </a>
                ) : (
                  <p className="mt-4 text-sm font-semibold text-primary">
                    Auth0 тохируулагдаагүй байна.
                  </p>
                )}
              </div>
            ) : (
              <button
                className="flex w-full items-center justify-center gap-3 rounded-[1.5rem] bg-primary py-4 text-lg font-bold text-on-primary shadow-lg shadow-primary/20 transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={isSubmitting}
                onClick={handleCreateInvoice}
                type="button"
              >
                <MaterialIcon filled name="qr_code_2" />
                {isSubmitting ? "Үүсгэж байна..." : "QPay-ээр төлөх"}
              </button>
            )}

            {error ? (
              <div className="rounded-[1rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            {status ? (
              <div className="rounded-[1rem] border border-primary/20 bg-primary/10 px-4 py-3 text-sm font-medium text-on-surface">
                {status}
              </div>
            ) : null}

            {invoice ? (
              <div className="space-y-5 rounded-[1.5rem] border border-outline-variant/20 bg-white p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-text-soft">Нэхэмжлэл</p>
                    <p className="font-bold text-on-surface">{invoice.invoiceId}</p>
                  </div>
                  {invoice.order.orderNumber ? (
                    <div className="text-right">
                      <p className="text-sm text-text-soft">Захиалга</p>
                      <p className="font-bold text-on-surface">
                        {invoice.order.orderNumber}
                      </p>
                    </div>
                  ) : null}
                </div>

                {paymentState?.paid ? (
                  <div className="rounded-[1rem] bg-green-50 px-4 py-4 text-green-700">
                    <div className="flex items-center gap-3">
                      <MaterialIcon className="text-green-600" name="check_circle" />
                      <div>
                        <p className="font-bold">Төлбөр баталгаажлаа</p>
                        <p className="text-sm">
                          {paymentState.latestDescription ||
                            "Таны захиалга амжилттай бүртгэгдлээ."}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {invoice.qrImage ? (
                      <div className="flex justify-center rounded-[1.5rem] bg-surface-container-low p-6">
                        <Image
                          alt="QPay QR код"
                          className="h-auto w-full max-w-[260px]"
                          height={260}
                          src={invoice.qrImage}
                          width={260}
                        />
                      </div>
                    ) : null}

                    <button
                      className="flex w-full items-center justify-center gap-3 rounded-[1rem] bg-surface-container-low px-4 py-3 font-semibold text-on-surface transition-all hover:bg-surface-container-high disabled:cursor-not-allowed disabled:opacity-70"
                      disabled={isChecking}
                      onClick={() => void checkPaymentStatus(true)}
                      type="button"
                    >
                      <MaterialIcon name="refresh" />
                      {isChecking ? "Шалгаж байна..." : "Төлбөр шалгах"}
                    </button>

                    {invoice.urls.length ? (
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-on-surface">
                          Шууд нээх холбоосууд
                        </p>
                      <div className="flex flex-wrap gap-3">
                          {invoice.urls
                            .filter((item) => item.link)
                            .map((item) => (
                              <a
                                key={`${item.name}-${item.link}`}
                                className="rounded-full bg-surface-container-low px-4 py-2 text-sm font-semibold text-primary transition-all hover:bg-surface-container-high"
                                href={item.link}
                                rel="noreferrer"
                                target="_blank"
                              >
                                {item.name || item.description || "QPay апп"}
                              </a>
                            ))}
                        </div>
                      </div>
                    ) : null}
                    <p className="text-center text-sm text-on-surface-variant">
                      Төлбөр хийсний дараа систем 5 секунд тутам автоматаар шалгана.
                    </p>
                  </>
                )}
              </div>
            ) : null}
          </div>
        </section>
      </div>

      <div className="lg:col-span-5">
        <div className="sticky top-28 space-y-6">
          <div className="rounded-[2rem] bg-surface-container-low p-8">
            <h3 className="mb-6 text-xl font-bold">Захиалгын хураангуй</h3>
            <div className="mb-8 space-y-6">
              {initialCart.items.map((item) => (
                <div key={`${item.productId}-${item.selectedSize}`} className="flex gap-4">
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-[1rem] bg-white">
                    <Image
                      fill
                      alt={item.name}
                      className="object-cover"
                      sizes="80px"
                      src={item.image}
                    />
                  </div>
                  <div className="flex flex-col justify-between py-1">
                    <div>
                      <p className="font-bold text-on-surface">{item.name}</p>
                      <p className="text-sm text-on-surface-variant">
                        Хэмжээ: {item.selectedSize} • Тоо: {item.quantity}
                      </p>
                    </div>
                    <p className="font-bold text-primary">{formatMoney(item.subtotal)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t border-outline-variant/20 pt-6">
              <div className="flex justify-between text-on-surface-variant">
                <span>Нийт дүн</span>
                <span>{formatMoney(pricing.subtotal)}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Хүргэлт</span>
                <span>{formatMoney(pricing.shipping)}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Татвар (НӨАТ)</span>
                <span>{formatMoney(pricing.vat)}</span>
              </div>
              <div className="flex justify-between pt-4 text-xl font-bold text-on-surface">
                <span>Нийт төлөх</span>
                <span>{formatMoney(pricing.total)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-[1.5rem] border border-outline-variant/30 bg-surface-container-lowest p-4 shadow-sm">
            <MaterialIcon className="text-green-600" name="verified_user" />
            <div className="text-xs text-on-surface-variant">
              <p className="font-bold text-on-surface">Аюулгүй тооцоо</p>
              <p>Таны гүйлгээ банкны нууцлалын протоколоор хамгаалагдсан.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
