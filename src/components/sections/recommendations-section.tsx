"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Wand2, UserPlus, Sparkles, TrendingUp } from "lucide-react";

export default function RecommendationsSection() {
  const t = useTranslations("recommendations");

  const features = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: t("feature1Title"),
      description: t("feature1Description"),
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: t("feature2Title"),
      description: t("feature2Description"),
    },
    {
      icon: <Wand2 className="h-6 w-6" />,
      title: t("feature3Title"),
      description: t("feature3Description"),
    },
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold font-headline">{t("title")}</h2>
        <p className="text-muted-foreground mt-2 text-lg">
          {t("subtitle")}
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Wand2 className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-3xl font-headline">{t("loginTitle")}</CardTitle>
            <CardDescription className="text-lg mt-2">
              {t("loginSubtitle")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="text-center space-y-2">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="text-lg px-8">
                <UserPlus className="mr-2 h-5 w-5" />
                {t("createAccount")}
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                {t("signIn")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
