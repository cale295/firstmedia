/**
 * Centralized Image Constants
 * 
 * Use these paths throughout the application to ensure consistency.
 * Real images should be placed in the corresponding public/images/* directories.
 */

export const IMAGES = {
  LOGOS: {
    FIRST_MEDIA: "/images/logos/firstmedia-logo.png",
    XL_SATU: "/images/logos/xl-satu-logo.png",
  },
  HERO: {
    MAIN: "/images/hero/hero.webp",
    DEVICE: "/images/hero/hero-device.png",
    BACKGROUND: "/images/hero/hero-background.jpg",
  },
  FEATURES: {
    GAMING: "/images/features/gaming.webp",
    STREAMING: "/images/features/streaming.webp",
    WFH: "/images/features/wfh.webp",
    SMART_HOME: "/images/features/smart-home.webp",
    FIBER_OPTIC: "/images/features/fiber-optic.webp",
    MULTIPLE_DEVICES: "/images/features/multiple-devices.webp",
  },
  LIFESTYLE: {
    FAMILY_TV: "/images/lifestyle/family-watching-tv.jpg",
    GAMER_SETUP: "/images/lifestyle/gamer-setup.jpg",
    MODERN_LIVING: "/images/lifestyle/modern-living-room.jpg",
  },
  COVERAGE: {
    MAP_BG: "/images/coverage/coverage-map-bg.jpg",
    FIBER_NETWORK: "/images/coverage/fiber-network.jpg",
  },
  PROMOS: {
    JABODETABEK: "/images/promos/promo-jabodetabek.jpg",
    INSTALLATION: "/images/promos/promo-installation.jpg",
  },
  PACKAGES: {
    DEFAULT_THUMBNAIL: "/images/packages/default-package.jpg",
  },
  BANNERS: {
    BANNER: "/images/banners/banner.webp",
  }
} as const;
