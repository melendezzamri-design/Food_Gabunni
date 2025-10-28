import { useTranslations } from "next-intl";
import { MapPin, Phone, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ContactSection() {
  const t = useTranslations("contact");

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: t("address"),
      text: t("addressText"),
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: t("phone"),
      text: t("phoneText"),
      href: "tel:555-123-4567",
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: t("hours"),
      text: t("hoursText"),
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
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="space-y-6">
          {contactInfo.map((info) => (
            <div key={info.title} className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">{info.icon}</div>
              <div>
                <h3 className="text-lg font-semibold">{info.title}</h3>
                {info.href ? (
                  <a
                    href={info.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {info.text}
                  </a>
                ) : (
                  <p className="text-muted-foreground">{info.text}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <Card className="overflow-hidden shadow-lg h-80 md:h-96">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.537225146199!2d-99.1353849247833!3d19.43260773954201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f93452643a3b%3A0x2a98f3a35e88849c!2sZ%C3%B3calo!5e0!3m2!1sen!2smx!4v1680000000000!5m2!1sen!2smx"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Gabunni Eats Location"
          ></iframe>
        </Card>
      </div>
    </div>
  );
}
