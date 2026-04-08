import type { CatalogProduct } from "@/types/commerce";

const products: CatalogProduct[] = [
  {
    id: "merino-knit-sweater",
    slug: "merino-knit-sweater",
    category: "Сүлжмэл хувцас",
    name: "Уламжлалт сүлжмэл цамц",
    subtitle: "Органик мерино ноосон коллекц",
    description:
      "Цэвэр баяр баясгалан, удаан хугацааны дулаан мэдрэмж өгөхөөр бүтээгдсэн. Энэхүү сүлжмэл цамц нь хүүхдийн хөдөлгөөнд саад болгохгүй, өдөр тутмын хэрэглээнд удаан эдэлгээтэйгээр бүтээгдсэн.",
    price: 84_000,
    rating: "4.9 (128 сэтгэгдэл)",
    sizes: ["12-18с", "2-3н", "3-4н", "4-5н", "5-6н"],
    highlights: ["Дулаан зохицуулалт", "100% органик"],
    primaryImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA_4cnixLuQvOYriKfTsoGv0HuoGFsHhAGsGeaPxNaVhJ8yGs1eQ7tLZ732spDF9H9sMZKg5bXqmpXB2EyuV0LeXfG2NqcZNSPQzklQ_31Yjho8EKO5nUx2iFAJYfnD46oeuxVrquRhWVeKYZmYUY704-Ru1QSPEYeS5F6_dXpF6gjgW3tqYSrBa3uktBsIuizGn7_MKK2UZOQ0Qg4omd6pCIFN6B9yibZp2ljyToEF1lfUg-0fpZgGxEEU0LmdZ41H1WDCyDGB0w",
    gallery: [
      {
        title: "View 1",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDsdv_HvmQwpr24ZdgjIHPawPCuH_kXV2Tbrvi6MrPXa6dJe9837VOfs2Jj0nUE8lZfNZUA9kRpMzFVPjY7HV2WCyZdvviMFt7D8bbex4lsw-QDZRGnaoaEjz6EIT7B8XAv8HGclQKhV96cFMoyPVXu7m6e1KzmzJb9KXEReahJksiSG1Dy50ECTpOia4aNJ_bfxH7jRAJN_SXfeiO_C0_xdeZEWXtNww5lh4LDkB7JSaiYRCGwA1pa5Pj0smkob2Cj7OpqSAbTNA",
      },
      {
        title: "View 2",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAvbsyx5xEMnj5qGQ7xoY7gIKevkFP2pwSYnox-RWT0L8S0AzoIjmjkWp7xgkaejh0Iuewl7L0aymjUL4gvkPljuhvNzHULLd2gfZQB3_W6gDM7TfXL1WcF2ihPmuoUiI391rqHblF_mnwGeY5-l2Xaq55-hftUYL1eIai68VacFqTF4gMMoJ3DAPcasYpjdfre6Ua6rpKLp8yt5FdmzXNzK44LjH53qbZDTBwuxrHzA3kV69DEfKUHkUlAHPLdqskrow_8p63BUQ",
      },
      {
        title: "View 3",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDpwWxxLJ92mv2tdAXlOIfmeTum3DIJqCXNkXT7PZAwBVCH4FwmbpMJGfIlBYn0Vpz6RS4vr0Zl_adKB7yfZZfnBwShfbqB_cHh-q9AettfkoLfKhrMa2SS9jDvj5HfshE6ttS_accd6A0fJYglyAwHjlaeIaxadmxf0hMKsgndczxCnIIQhq8dUCYNSJu_21V-VJSi0eJia8meg0gcJttb5OWn23woJWYYQyh40xmeNllNcobbL3pTTImM9YGhaK0HyclH0QYRVA",
      },
      {
        title: "View 4",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuC4CWrNEeS4FtDMvMtM1MKN97mIxvHYRow5GRyeyu600QWQxDrgzzY1NhxneI8a8VsfgHgVfAYLViq3lNgfeqR-_P3F9iOxGobAlxSjlIdKLYT1KPLvXFJ-SB99pCWkxDgOQaMkWLPwmgRpA5AaUtmsr9zMUcCb86bGR7j-M-mW0R8TMivm_aXlMd3XPecwMIfpE_nNvth9aHU9P8r3dFVqgVTf4ziwBOQQNK4JV_NwLuSpN1eK1XLiSzHmNg72tPKVzFB01C2K2w",
        interactive: true,
      },
    ],
  },
  {
    id: "merino-wool-hat",
    slug: "merino-wool-hat",
    category: "Дагалдах хэрэгсэл",
    name: "Мерино ноосон малгай",
    subtitle: "Хүйтэн өдрийн дулаан хамтрагч",
    description:
      "Зөөлөн бүтэцтэй, толгой дарж хавчихааргүй тухтай малгай.",
    price: 28_000,
    rating: "4.8 (62 сэтгэгдэл)",
    sizes: ["S", "M", "L"],
    highlights: ["Зөөлөн бүтэц", "Амьсгалдаг материал"],
    primaryImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBrY4iY7FSmXikTV3tjK8FyxJztaOl02sVngkLE3OLLySbG9wYbJpHIHPOWXBwbW9oC7786CtLtHLSMi_BdjM0ea5br401_Uc0xSCPdRTu9xU8w933H2J0EhIW0-OuwkRVptxXrqo5_wEB8msGhcSN61x30PNEI7VOwNpHTc8xXICViepHj9R-FBgK7xNkRql3wPYNjprpqArZZSlmj2DFAqcO_ByOG6w8hwuyYcqYsiTk6p9mi22hxGvMNsAtScocbQrb0cWgd6Q",
    gallery: [],
  },
  {
    id: "soft-velvet-pants",
    slug: "soft-velvet-pants",
    category: "Доод хувцас",
    name: "Зөөлөн хилэн өмд",
    subtitle: "Өдөр тутмын тав тухын сонголт",
    description: "Суналттай бүс, хүүхдийн хөдөлгөөнд тохирсон тайралттай өмд.",
    price: 45_000,
    rating: "4.7 (54 сэтгэгдэл)",
    sizes: ["2-3н", "3-4н", "4-5н"],
    highlights: ["Хилэн мэдрэмж", "Хөнгөн"],
    primaryImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDYlGL25xrVeCM-J3uKTec5qNNqyMpiU3sqdRJ_p9noQ7bvwou6wyfPpuFXCvfpWsvu0X4c9ZqTaYq0MgUs-mRuKTE5pwR2NmiJiCYK3a_KKvBHJEVdurOnxVmg_OVds0c3LwNN8bgE4Twg-R8KTTflCQTnkzrvBeM6T5XgAEXR7c0Kq8ertnjrVSp3dyoE5KNMJwhYn-84yTeW59I6ByiAzPtIpd645h5dYbGIEcql5WoYK6nvlhiq_KeOEC2rr1TZkkBbncrVoA",
    gallery: [],
  },
  {
    id: "nordic-wooden-toy",
    slug: "nordic-wooden-toy",
    category: "Тоглоом",
    name: "Нордик модон тоглоом",
    subtitle: "Гэрийн орчинд аюулгүй тоглоом",
    description:
      "Хүүхдийн гарын жижиг хөдөлгөөнийг хөгжүүлэх зориулалттай байгалийн модон тоглоом.",
    price: 68_000,
    rating: "4.9 (87 сэтгэгдэл)",
    sizes: ["Нэг хэмжээ"],
    highlights: ["Байгалийн мод", "Аюулгүй будаг"],
    primaryImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAWAyeCRyzXOiAwKw-MIw4KHWow07yII-2c7uDdK5mV2xGYIK2PRXct3rZurFshETF5att4PUKjtTvylQP6DjQp0Dak2Rinpm937BC2MAh7Vaj8snGkjWsQ4P7I3Z-gVhrVD4K-HclNP0bGUW328B8BZBStmCa0rr_bbBJrcr_6B_7LJ5hTXe_mf1Q0TRIyAx0W9533ob1UtUZzVQ7MGUnfvBDm2qRuT3Tl3eat7QLkAuSswdBI3scsglcbzOMF9DcK89tXfEBIrQ",
    gallery: [],
  },
  {
    id: "sheepskin-boots",
    slug: "sheepskin-boots",
    category: "Гутал",
    name: "Нэхий дотортой гутал",
    subtitle: "Өвлийн дулаан алхам",
    description: "Гулсахаас хамгаалсан ултай, дулаан нэхий дотортой гутал.",
    price: 58_000,
    rating: "4.8 (41 сэтгэгдэл)",
    sizes: ["22", "23", "24", "25"],
    highlights: ["Дулаан дотор", "Гулсалт багатай"],
    primaryImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBqJyT8Qm2oasOjoS95tvqfY1R8X8rmkBh4vryTo6z0kgvLlpdWcbfIg6v7Y-coTeHrvntbaf7PzynnN80VcJha8uHyiYMJc_58fHTBs-XPHOSZHyvLAYUEiNEinF8aR_4M3Y5VFXo0NM2TAtG1zyDN2PlA5WaELpko66LbPWZGTrkuCKuVWnKsfvbb-h9PlfOcPsRY2R7IpJEGf7naTsE_kWknEEc_3Iq0ex3pzGQaA7_V6es-Aetv02Xh1dO6SWApA7VPP0soyw",
    gallery: [],
  },
];

export const featuredProductId = "merino-knit-sweater";

export function listCatalogProducts() {
  return products;
}

export function getFeaturedProduct() {
  return products.find((product) => product.id === featuredProductId) ?? products[0];
}

export function getProductById(productId: string) {
  return products.find((product) => product.id === productId) ?? null;
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug) ?? null;
}

export function listRelatedProducts(productId: string) {
  return products.filter((product) => product.id !== productId).slice(0, 4);
}
