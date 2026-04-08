export type NavKey = "boys" | "girls" | "new";

export type NavItem = {
  key: NavKey;
  label: string;
  href: string;
};

export type HomeCategory = {
  title: string;
  href: string;
  image: string;
  lifted?: boolean;
};

export type ProductCard = {
  category: string;
  title: string;
  price: string;
  image: string;
  href: string;
};

export type BentoTile = {
  layout: "wide" | "accent" | "portrait" | "wideBottom";
  title: string;
  description?: string;
  image?: string;
  href: string;
};

export type ProductGalleryItem = {
  title: string;
  image: string;
  interactive?: boolean;
};

export type OrderItem = {
  title: string;
  description: string;
  price: string;
  image: string;
};

export type ProfileOrder = {
  id: string;
  date: string;
  total: string;
  status: string;
  delivered?: boolean;
};

export const brandName = "Monkey Closet";

export const navItems: NavItem[] = [
  { key: "boys", label: "Хөвгүүд", href: "/#boys" },
  { key: "girls", label: "Охид", href: "/#girls" },
  { key: "new", label: "Шинээр ирсэн", href: "/#new-arrivals" },
];

export const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1AEbHse7y2/?mibextid=wwXIfr",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/monkey_closet_newtrend?igsh=ZDQ2ODU5ZWZrZDZ0",
  },
];

export const homeHero = {
  title: "Хаврын тоглоомын цаг.",
  description:
    "Орчин үеийн аялагчдад зориулсан манай шинэ редакцын цуглуулгыг сонирхоорой.",
  image:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCOcc-GopkAUeFljlHi1-WCYssAdSZ2hg1n6pTw1E1y3ZNKd1ADP5QLWdDq6gp0AnWQthNreQ2U7jpHrrx9FOYED3Eetcx3ET03FKP9t7frK2Mq03tG2gBIH-VFz7lRbovzl52U2QyHOcyZbZ4LydihmWbRPNf_xu-i5HP0LqmdWfU8c8MzvQkSJ5jscJm6f_i-ZgA22H1ccUGF4D_Ztc9J_FKGUW3QQ27ZvzWXuHgnLgJZ4huoo0_p696dW28IjLQjpw3rgnZp8Q",
};

export const homeCategories: HomeCategory[] = [
  {
    title: "Охид",
    href: "/categories/girls",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCVBj0HqB8-LdRqo2cdl6I3an_ylA6kA7Qf8BAsC0SJO8ORvCx507czZitwGI32-7vl5SHJ8CEydKsaFJ6RXOjW2Nu4UwAEtuOdC8LOtK7B-j4jpzlFR8bkJCc2pQcrEWXUej6UknxUJJkvC6WCK4lJFp-_8PV_eOI9x2js_X3crvomOa2IaUYQvOQJdpEUae1TpimHNj9jQlgwB0BfqfVqamBD-7qL20SIU-Bi0aD1c9EpNz2wT863fMnFtFq7b9JRG-ZstrtMLg",
  },
  {
    title: "Хөвгүүд",
    href: "/categories/boys",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCJPWIfrGsUZ5Optn4o067jpvY8iDdRDxSIQQSYIRxx16EOC-RAe3teDh0ojvsU_-lT2NLHAk6t1RPf_gkXynQDx54SeyJbAlMglwnHUHm2KwzyyTTuFFJYRGtXD3HliOzTj4QEV5cZombO6D9-EYOltOw-Owb0m5MRaiGjnhJzJRNqxdv4KZvio4kh1zWwLWcrYQP2izmo-ZbGo7yn8Z7hkfoW4F8izQr8NPflXvWKlr6FIS3LQTvaqv53QXDWrwAxxfElqsJ1CQ",
    lifted: true,
  },
  {
    title: "Гоёл чимэглэл",
    href: "/categories/accessories",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAxDiM02hbgrN21FHQmQkcrzg6fhpk_fboFbzAUJoSHyX5fsOAhnThzDzy0JyjtoRuKoLMxbmrGbX6Uvo0FPJ1ECLm6SHuZBUU1mpnxfpmL4S0gH6t3L9eFWEF1RJqzwi460xUKc5xFzJwYRb8Uh7-EuUBeQE-Opy3_VZKCw6udaNr6c6xsJgI-9gD50AmawCFf5dKEo2-o58f4hquBbsYFh4hM7OhB_65RH3cqJr4edblwpIAMdPPSBjaw0YWFB5-fAtZBnIAhJA",
  },
];

export const homeArrivals: ProductCard[] = [
  {
    category: "Гадуур хувцас",
    title: "Шар борооны цув",
    price: "$68.00",
    href: "/products/merino-knit-sweater",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDjN9SJkO_voCO9h0K1wFALO5y5lfn-esr39MUgMc_-_NNSEHKgKNb2OiiJpEE7bZmva6yU5ZztMhn4nVafMRsvAZ6NTASK0_7mftFvfkGGDrd8WzbLudHVHVAj1IkQz7aIN6PnVAWP0EgFgBKluvH-nMDU92Ll76XWPVaJO8Ur_k7T-cugoJ6CHHimQWrw-5CzmwxQB5T3EyWwkUFn5Y4vgC8VZ7ebCknzTH4fis4iH4Graa9gLcnPZqIaVwfqORTXKk-Avy2IHg",
  },
  {
    category: "Сүлжмэл хувцас",
    title: "Ногоон даавуун цамц",
    price: "$54.00",
    href: "/products/merino-knit-sweater",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDXhGvJW4DzhzuFmi_M4PQPZZGDoxKjwlEI3rPDdoasrW5TEscsyLAkgexelc03yq9Lwq05MVZ2vkGBIa5Nu3Nmz6TIcMvT6cMMo6YiW6zXPUmEA4fh6GPiVyqFKMHfk2hWFkBLDfQvM_eU2AIbH5EEZ1QwZjtY1AEmN8uaxDSq0P5yscLHJ0dxTjRZusmdM4LCPIFVkTQJ5K2aedtwMecB4M-6BXEyiqYBO3nzQujtND3wlYR6QG23PuBFkNRnXO27OChkSGl2VQ",
  },
  {
    category: "Гутлын төрөл",
    title: "Уламжлалт арьсан гутал",
    price: "$82.00",
    href: "/products/sheepskin-boots",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD3BKPivfuNuKRLR0V61ed7jY73jRO3gDRrFlbx8K2tPy1RYHNgAaybYuyOSk3LwKHoLffQ7SSrzO69XWJYfFubQN4IL1-oC21xTpk9aqZc4wKawBe38oDo3JiSVqEJae7b_yNrcdea9yg8M_IkV1y9SG9bYcD34t3tpwcMCOKf-Xz2NEg0YXSH0nREJjh1D0PQD9jcT6hxf66Gl7MhOpyIK2O5JfRAQ_YAZHIe9xwSPz_WQtzFGWALen4cuHjyD4lhdfpNMPljIw",
  },
  {
    category: "Үндсэн загвар",
    title: "Органик хөвөн футболк",
    price: "$28.00",
    href: "/products/nordic-wooden-toy",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAqceUNV9GBVjD4SDqmny_PSrtZCJkApRzJKDxfn8BpfFIB03WNb2nxMn7Cmbz9X4g2hI-YxJq4l91quufLdWFVdDIht5js42wGGm-P241LQg-m4OYCkT5layjbMDF8XnIy0Gf6HWOX6YBKptafo0Pxz5__kuy42F1nQf87edk7VIZrsXUoKR86DeL2z9vk1nqpjsZcLS0_BrB6lgInOntCRrX_7Sq4spouEoERHNGMLiAZbE4mUnhMOXvErCI6gy72iT_JMhReoA",
  },
];

export const homeBentoTiles: BentoTile[] = [
  {
    layout: "wide",
    title: "Байгалийн өнгөт багц",
    description:
      "Мэдрэмтгий арьсанд зориулсан GOTS сертификаттай органик хөвөн даавуу.",
    href: "/products/merino-knit-sweater",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAWA8XLLY_nrzCVmmAgUoki6quWaGiMVx-MudFldBLsQNEaAkdPUb1AhXBznmlDCf0BOT4Mn67piWpFTyQrAHf7wIiDTmO9Sp6yjV1bUHqlmY-Wh_LG05JQLXjhit97H9bapCGMlGbFA0aSEI58Vl1EPMLxAJ8BHMR3PrFCKNvGZCGTcUAc6f3QVbAxUIO6Q8Tycaav6J20SePULR_g2t3-TxULyap8ZAYTi7nV1-LcYOnfO2E-LwlXK1Tzkbbo3Hlgenf6BjWW5Q",
  },
  {
    layout: "accent",
    title: "Бэлэг дурсгал",
    description: "Тэмдэглэлт баяр болгонд зориулсан бэлгийн багцууд.",
    href: "/categories/accessories",
  },
  {
    layout: "portrait",
    title: "Зөөлөн ноолуур",
    href: "/products/merino-wool-hat",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAiGvmQzGuDlXv8EqGDK9AGTYdOFtRNLGySTmAACSsBt7k8PwfnKAMxhMR8mbyWtV5SYGvFyvqRdAdjsSTqRfALP27_dPPeR2DWm6qmi4V_e1LHRgheurymFuaYR8N_ojZCFm5r-LISQiRVtTZwPRenQAgoBEFO32ffZ4FcFDvKXubA5VjVR8QpOTzH7vUx5RzCz7-Aq_cm2AKSAhmLuMuu5oCRH53dt-hwZMB6tOcq9ZKy7302sUtUoU6OKTVAcBCa4IbEqpoIRA",
  },
  {
    layout: "wideBottom",
    title: "Баярын шидэт агшин",
    description: "Тав тухыг алдагдуулаагүй онцгой тохиолдлын гоёл.",
    href: "/products/sheepskin-boots",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAUf8DfI4HSvoIIH0TMmYO-BUDVtDcOVGA_Bb36pnLyKdQsi-IlSe_txkFAfi3FphlXpZLh6xQj6mBS8j2wDWtfGaIJzbzcvnG7sODKZl41FMwuIXVdJGjQJNl6AXdIidYEvuooDn5TKN9BlM8ZeA5TiUJrCBaBEcIqHfTYMEITGEWcH-Ijd9mdhU-s9j9EMZ-SRv-gvd7GdOuuwQ8fJmLsFrVfFjCa6Ybo5C5Z1wJU-XY1ZyHHoo1xJfKa49PFhZwNmxE7xafsDQ",
  },
];

export const parentsPocketItems = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDdjc8N5FOuW3Bb2pJ6LA4PgmKv0QGLJo2LhN2d5NMD04LuNpZmomrxioCnS6tcBKWt2yaiK0g0VQO5PsGK2FzpgJ-RSiJvuNOIUfRWVLbUYX4QMbUFQsFoMftKXaEdF5a2Ty06pHqkwEhfXRKPxFahHckuYwS9gOlml__BNxeohKAwACcf96H3dpzzkcb8eSwj_0iyeydme2OFST98WcQ0QwS9zUrQ2RQuzlIAE1WwQ8f1VYmuxg-p54GFBja42LGim_SNq642ig",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBKb8hRs76YeYEhxI2hHCZG0MNwJw1wW-WQkYbyfIengwZ5OEOovu3078Y3BfnXAD7PUtbL6GpHuu2W9GTXpFcTPnY4BYAg1pjJ1qWe89yONZ_knuMDqqSwg7CWNnuS1SBspcUA-RDrQaDzKc1P_dcEj60KdxuJChIR5CVA4TAa-mlL9Z-0QOIyi0h65eWpA0Olk2nEIV3kvTGe9RzKOMRTz_FCn1_FFrR9crPEjLQHVWQsDCUUCujJzaBKN1Y4PDK7PshmuJ2NHg",
];

export const productPageData = {
  label: "Намрын Чухал Загвар",
  title: "Уламжлалт сүлжмэл цамц",
  price: "$84.00",
  rating: "4.9 (128 сэтгэгдэл)",
  description:
    "Цэвэр баяр баясгалан, удаан хугацааны дулаан мэдрэмж өгөхөөр бүтээгдсэн. Манай нэрийн хуудас болсон энэхүү уламжлалт сүлжмэлийг ёс зүйтэй бэлтгэсэн мерино ноосоор урласан бөгөөд хүүхдийн өсөлтөд тохируулан арай сул загвартай хийсэн. Ойн адал явдал болон тухтай үдшүүдэд төгс тохирно.",
  highlights: ["Дулаан Зохицуулалт", "100% Органик"],
  sizes: ["12-18с", "2-3н", "3-4н", "4-5н", "5-6н"],
  galleryMain:
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
  ] satisfies ProductGalleryItem[],
};

export const relatedProducts: ProductCard[] = [
  {
    category: "Дагалдах хэрэгсэл",
    title: "Мерино Ноосон Малгай",
    price: "$28.00",
    href: "/products/merino-wool-hat",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBrY4iY7FSmXikTV3tjK8FyxJztaOl02sVngkLE3OLLySbG9wYbJpHIHPOWXBwbW9oC7786CtLtHLSMi_BdjM0ea5br401_Uc0xSCPdRTu9xU8w933H2J0EhIW0-OuwkRVptxXrqo5_wEB8msGhcSN61x30PNEI7VOwNpHTc8xXICViepHj9R-FBgK7xNkRql3wPYNjprpqArZZSlmj2DFAqcO_ByOG6w8hwuyYcqYsiTk6p9mi22hxGvMNsAtScocbQrb0cWgd6Q",
  },
  {
    category: "Доод хувцас",
    title: "Зөөлөн Хилэн Өмд",
    price: "$45.00",
    href: "/products/soft-velvet-pants",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDYlGL25xrVeCM-J3uKTec5qNNqyMpiU3sqdRJ_p9noQ7bvwou6wyfPpuFXCvfpWsvu0X4c9ZqTaYq0MgUs-mRuKTE5pwR2NmiJiCYK3a_KKvBHJEVdurOnxVmg_OVds0c3LwNN8bgE4Twg-R8KTTflCQTnkzrvBeM6T5XgAEXR7c0Kq8ertnjrVSp3dyoE5KNMJwhYn-84yTeW59I6ByiAzPtIpd645h5dYbGIEcql5WoYK6nvlhiq_KeOEC2rr1TZkkBbncrVoA",
  },
  {
    category: "Тоглоом",
    title: "Нордик Модон Тоглоом",
    price: "$32.00",
    href: "/products/nordic-wooden-toy",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAWAyeCRyzXOiAwKw-MIw4KHWow07yII-2c7uDdK5mV2xGYIK2PRXct3rZurFshETF5att4PUKjtTvylQP6DjQp0Dak2Rinpm937BC2MAh7Vaj8snGkjWsQ4P7I3Z-gVhrVD4K-HclNP0bGUW328B8BZBStmCa0rr_bbBJrcr_6B_7LJ5hTXe_mf1Q0TRIyAx0W9533ob1UtUZzVQ7MGUnfvBDm2qRuT3Tl3eat7QLkAuSswdBI3scsglcbzOMF9DcK89tXfEBIrQ",
  },
  {
    category: "Гутал",
    title: "Нэхий Дотортой Гутал",
    price: "$58.00",
    href: "/products/sheepskin-boots",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBqJyT8Qm2oasOjoS95tvqfY1R8X8rmkBh4vryTo6z0kgvLlpdWcbfIg6v7Y-coTeHrvntbaf7PzynnN80VcJha8uHyiYMJc_58fHTBs-XPHOSZHyvLAYUEiNEinF8aR_4M3Y5VFXo0NM2TAtG1zyDN2PlA5WaELpko66LbPWZGTrkuCKuVWnKsfvbb-h9PlfOcPsRY2R7IpJEGf7naTsE_kWknEEc_3Iq0ex3pzGQaA7_V6es-Aetv02Xh1dO6SWApA7VPP0soyw",
  },
];

export const profileSidebar = [
  { label: "Миний мэдээлэл", icon: "person", active: true },
  { label: "Захиалгын түүх", icon: "history" },
  { label: "Хадгалсан бараа", icon: "favorite" },
  { label: "Тохиргоо", icon: "settings" },
];

export const profileData = {
  name: "Александра Чен",
  memberSince: "2023 оны 3-р сараас гишүүнээр бүртгүүлсэн",
  email: "alexandra.c@example.com",
  phone: "+1 (555) 012-3456",
  address: ["Александра Чен", "Мэйплвүүд Грөүв гудамж 1245", "4B тоот", "Остин, Техас 78701"],
  avatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDxvtWiJI_F5xV-EeQtIPJrc4S6TK5MTZQZLe4C_DdzPwsstQQ6BFNoSaAFzM3tSDKMNLZWbP0htS5twseBNl0CssONyfs8fARuznDSBXwI0lnB-_jAuYc-GhhZ8-uCBdZeBZaTDudQ7tAmsFLB0hmcwgY1Tt-TUgADjIooZCN9xP87w8HgEME_-lmtXoEKbAazeeDwdmDO73oUD5Lw7WlesJW22HRgNO6mvtSIcOziRRMqF_wFQfIeakUOG7_43sHzypO7gAw_hg",
};

export const profileOrders: ProfileOrder[] = [
  {
    id: "PB-90210",
    date: "2023 оны 10-р сарын 24",
    total: "$184.50",
    status: "Хүргэлтэнд",
  },
  {
    id: "PB-88431",
    date: "2023 оны 9-р сарын 12",
    total: "$92.00",
    status: "Хүргэгдсэн",
    delivered: true,
  },
];

export const checkoutItems: OrderItem[] = [
  {
    title: "Органик даавуун боди",
    description: "Хэмжээ: 3-6 сар • Тоо: 1",
    price: "₮45,000",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD6FJJ7hmvxymG34sUB1xQUh32wB44HVrnY0dHqtjoLG1wb1BQbfqDqqNvzxT_GglJeqejF2HRQ9AERKm_M52mtbOQ-efJCNmVtuirA3je4PTTwYn1oLywMC7BlC-tp1LeX-5u4Er0tURz3f8M0SUxaUNGbTGRSZfuSY7N0NT3kNb7FNlyWYiqP0uFLHWP0Ic7gTF75f2pPaog2g4gYUm-FNuQhz1x-8AMZLwrua2Q9iw6zIVqvNq5yW7_0CSRma-HunILIN9CNZw",
  },
  {
    title: "Модон тоглоомон шоо",
    description: "Өнгө: Гэгээн манан • Тоо: 1",
    price: "₮68,000",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAEyhMd3iB9_huzwxE5Gb7uoCwh1zC-a_3e35dGYMpxzlfb9YV-HC_KzBVCKN05LZRoc5MuNbNypCU0JLg0sxg8dYO6pjJ8bCiT9trabXU1RvtAx1gVxzxQgsx47JzGdpaOk2l52zWh7dRBHBlkf8tUwgx7kj9_T2-E8OmCjR1SdT4P08nMqaLX_2K246ZsIcjkaQ5uWwMQkdsPzO1VYb2AjYP4D6T0ccNNTtwklZVKxIEfeEnDG0iV3iaEXvHo2nj0sfVd-jFFAg",
  },
];

export const qPayLogo =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBVCjUZjhfcYYo5xCexE_4884opbKBdW1urvIgH1rmHXNhpOKopWmT05fYpPhy1gnGEMTOBCYDz3wNdkC1JFUgdx1ActsM6F0UvyxKRA0DKp2F-2yFvX0gA7wZFFTmHS59Z9hbnET7kTl9PSyLLajK392iF6K2wHwV49IG-Xo-gzpLlu-MlsxwN7MsNZ7IdbYFD2EUPDLwrStxUulNQwVyEKcN8EDZr30Rnc-GBPGuShVCQrj8UaEf-d7w0Ar1PvfDXTxaPmZ2B1A";

export const loginPageData = {
  title: "Тавтай морилно уу",
  subtitle: "Өөрийн цуглуулга руу нэвтрэх",
  brandDescription:
    "Бяцхан үрсэд тань зориулсан мөнхийн гоёмсог, баяр баясгалантай агшин бүрийг танд санал болгож байна.",
  trustLabel: "Дэлхий даяар 10к+ эцэг эхчүүд итгэдэг",
  image:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCuc0kYhVA0T-2ACNuwegN6IcwT1CVilMhhRECJvv32O1njrmvXeB-3xOqJE1El6L_6QBaOdBEO7XJK01X_6B7XGQep2FvknA_orgz23wk-NcDbow8P3AuLuB042n1WPS9OJeZVlWzGBzpS7VtgpBWe235iQ8PN_ERCTcu66tv5ISTWJpPFPO-aFKuBhCAXY0HW0Zcvo3YXbannWGTszTP4_l0QcYeL_wGfWgnwa0fE06g8-CA8LIDPUwejOZ50uiArHJg2G5VazQ",
};
