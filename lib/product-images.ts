export interface ProductGalleryImage {
  url: string;
  alt: string;
  viewType: string;
}

const vestGallery: ProductGalleryImage[] = [
  {
    url: "/images/branding/vesto-trio.webp",
    alt: "VESTO cotton vests in black, heather grey, and optic white",
    viewType: "VESTO color range",
  },
  {
    url: "/images/fabrics/cotton-weave-macro.jpg",
    alt: "Close-up of cotton textile weave",
    viewType: "Fabric detail",
  },
  {
    url: "/images/manufacturing/overlock-stitching.jpg",
    alt: "Textile stitching on an industrial overlock machine",
    viewType: "Stitching process",
  },
];

const beddingImages: Record<string, ProductGalleryImage> = {
  "classic-white-cotton-bed-sheet-set": {
    url: "/images/bedsheets/white-cotton/front.jpg",
    alt: "White cotton bed sheets styled on a bed",
    viewType: "White cotton bedding",
  },
  "royal-blue-percale-bedding-set": {
    url: "/images/bedsheets/royal-blue/front.jpg",
    alt: "Royal blue cotton bedding styled in a bedroom",
    viewType: "Royal blue bedding",
  },
  "slate-grey-sateen-bedding-set": {
    url: "/images/bedsheets/slate-grey/front.jpg",
    alt: "Slate grey cotton bedding styled in a bedroom",
    viewType: "Slate grey bedding",
  },
};

const fabricDetail: ProductGalleryImage = {
  url: "/images/bedsheets/fabric-texture.jpg",
  alt: "Close-up of woven cotton fabric",
  viewType: "Fabric detail",
};

export function getProductGallery(
  slug: string,
  categorySlug?: string | null
): ProductGalleryImage[] {
  if (categorySlug === "bed-sheets-bedding" || slug.includes("bedding") || slug.includes("bed-sheet")) {
    return [beddingImages[slug] ?? {
      url: "/images/bedsheets/hotel-white.jpg",
      alt: "Cotton bedding styled in a hotel room",
      viewType: "Cotton bedding",
    }, fabricDetail];
  }

  if (slug.startsWith("vesto-") || categorySlug === "mens-cotton-vest") {
    return vestGallery;
  }

  return [{
    url: "/images/fabrics/cotton-weave-macro.jpg",
    alt: "Close-up of cotton textile weave",
    viewType: "Textile detail",
  }];
}
