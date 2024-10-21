"use client"
import React, { Fragment, useEffect, useCallback, useState } from "react";
import Homepage from "@/components/landing/homepage";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import WhyChouseUs from "@/components/landing/whychouseus";
import FinancialTool from "@/components/landing/financialtools";
import AboutUs from "@/components/landing/aboutus";
import OurService from "@/components/landing/ourservice";
import TopFeatures from "@/components/landing/topfeatures";
import { CarouselSpacing } from "@/components/landing/carousel";
import SubscribCard from "@/components/landing/subscribcard";
import { OurPosts } from "@/components/landing/ourposts";
import SlipcalCulator from "@/components/landing/slipcalculator";
import Tickers from "@/components/tickers";
import Link from "next/link";
import EmiCalculator from "@/components/landing/emicalculatort";
import { useTranslations } from "next-intl";

export default function Page({ children }) {
    const t = useTranslations('HomePage');
    return (
        <div className="bg-slate-50 flex flex-col items-center">
            <main>
                <h1>{t('title')}</h1>
                <Suspense fallback={<Skeleton />}>
                    <Homepage />
                </Suspense>
                <Suspense fallback={<Skeleton />}>
                    <Tickers />
                </Suspense>
                <AboutUs />
                <WhyChouseUs />
                <EmiCalculator />
                <CarouselSpacing />
                <OurPosts />
            </main>
        </div>
    );
}
