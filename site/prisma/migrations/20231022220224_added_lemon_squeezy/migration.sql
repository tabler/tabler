-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ON_TRIAL', 'ACTIVE', 'PAUSED', 'PAST_DUE', 'UNPAID', 'CANCELLED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "PauseMode" AS ENUM ('VOID', 'FREE');

-- CreateEnum
CREATE TYPE "CardBrand" AS ENUM ('VISA', 'MASTERCARD', 'AMERICAN_EXPRESS', 'DISCOVER', 'JCB', 'DINERS_CLUB');

-- CreateEnum
CREATE TYPE "BillingReason" AS ENUM ('INITIAL', 'RENEWAL', 'UPDATED');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('PAID', 'OPEN', 'VOID', 'UNCOLLECTIBLE', 'DRAFT');

-- CreateEnum
CREATE TYPE "StorePlan" AS ENUM ('FRESH', 'SWEET', 'FREE');

-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "VariantStatus" AS ENUM ('PENDING', 'DRAFT', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "VariantInterval" AS ENUM ('DAY', 'WEEK', 'MONTH', 'YEAR');

-- CreateEnum
CREATE TYPE "LicenseLengthUnit" AS ENUM ('DAYS', 'MONTHS', 'YEARS');

-- CreateTable
CREATE TABLE "Subscription" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "store_id" INTEGER,
    "customer_id" INTEGER,
    "order_id" INTEGER,
    "order_item_id" INTEGER,
    "product_id" INTEGER,
    "variant_id" INTEGER,
    "product_name" TEXT,
    "variant_name" TEXT,
    "user_name" TEXT,
    "user_email" TEXT,
    "status" "SubscriptionStatus" NOT NULL,
    "status_formatted" TEXT,
    "card_brand" "CardBrand" NOT NULL,
    "card_last_four" TEXT NOT NULL,
    "pause" JSONB,
    "cancelled" TIMESTAMP(3),

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriptionInvoice" (
    "id" SERIAL NOT NULL,
    "store_id" INTEGER,
    "subscription_id" INTEGER,
    "billing_reason" "BillingReason" NOT NULL,
    "card_brand" "CardBrand" NOT NULL,
    "card_last_four" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "currency_rate" DECIMAL(65,30) NOT NULL,
    "subtotal" INTEGER NOT NULL,
    "discount_total" INTEGER NOT NULL,
    "tax" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "subtotal_usd" INTEGER NOT NULL,
    "discount_total_usd" INTEGER NOT NULL,
    "tax_usd" INTEGER NOT NULL,
    "total_usd" INTEGER NOT NULL,
    "status" "InvoiceStatus" NOT NULL,
    "status_formatted" TEXT,
    "refunded" BOOLEAN NOT NULL,
    "refunded_at" TIMESTAMP(3),
    "urls" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "test_mode" BOOLEAN NOT NULL,

    CONSTRAINT "SubscriptionInvoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Store" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "plan" "StorePlan" NOT NULL,
    "country" TEXT NOT NULL,
    "country_nicename" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "total_sales" INTEGER NOT NULL,
    "total_revenue" INTEGER NOT NULL,
    "thirty_day_sales" INTEGER NOT NULL,
    "thirty_day_revenue" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "store_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "ProductStatus" NOT NULL,
    "status_formatted" TEXT NOT NULL,
    "thumb_url" TEXT,
    "large_thumb_url" TEXT,
    "price" INTEGER NOT NULL,
    "pay_what_you_want" BOOLEAN NOT NULL,
    "from_price" INTEGER,
    "to_price" INTEGER,
    "buy_now_url" TEXT NOT NULL,
    "price_formatted" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "test_mode" BOOLEAN NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductVariant" (
    "id" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "is_subscription" BOOLEAN NOT NULL,
    "interval" "VariantInterval",
    "interval_count" INTEGER,
    "has_free_trial" BOOLEAN NOT NULL,
    "trial_interval" "VariantInterval" NOT NULL,
    "trial_interval_count" INTEGER NOT NULL,
    "pay_what_you_want" BOOLEAN NOT NULL,
    "min_price" INTEGER,
    "suggested_price" INTEGER,
    "has_license_keys" BOOLEAN NOT NULL,
    "license_activation_limit" INTEGER,
    "is_license_limit_unlimited" BOOLEAN NOT NULL,
    "license_length_value" INTEGER,
    "license_length_unit" "LicenseLengthUnit" NOT NULL,
    "is_license_length_unlimited" BOOLEAN NOT NULL,
    "sort" INTEGER NOT NULL,
    "status" "VariantStatus" NOT NULL,
    "status_formatted" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductVariant_pkey" PRIMARY KEY ("id")
);
