"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { MessageCircle, X, Send, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { sendChatMessage, type ChatMessage } from "@/app/[locale]/chatbot-actions";
import { cn } from "@/lib/utils";

export default function FloatingChatbot() {
  const t = useTranslations("chatbot");
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-abrir el chatbot en la primera visita
  useEffect(() => {
    const hasVisited = localStorage.getItem("gabunni-chatbot-visited");
    if (!hasVisited) {
      // Esperar 2 segundos antes de abrir automáticamente
      const timer = setTimeout(() => {
        setIsOpen(true);
        // Agregar mensaje de bienvenida guiado
        const welcomeMessage: ChatMessage = {
          role: "assistant",
          content: locale === "es" 
            ? "¡Hola! 👋 Soy Gabby, tu asistente virtual de Gabunni Eats.\n\n📋 Te puedo ayudar con:\n• Ver nuestro menú completo\n• Conocer nuestros precios\n• Información sobre ubicación y horarios\n• Recomendaciones personalizadas\n• Responder cualquier pregunta sobre nuestros platillos\n\n¿En qué puedo ayudarte hoy?"
            : "Hello! 👋 I'm Gabby, your Gabunni Eats virtual assistant.\n\n📋 I can help you with:\n• View our complete menu\n• Know our prices\n• Information about location and hours\n• Personalized recommendations\n• Answer any questions about our dishes\n\nHow can I help you today?"
        };
        setMessages([welcomeMessage]);
        localStorage.setItem("gabunni-chatbot-visited", "true");
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      // Si ya visitó antes, usar mensaje de bienvenida simple
      setMessages([
        {
          role: "assistant",
          content: t("welcome"),
        },
      ]);
    }
  }, [locale, t]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await sendChatMessage(
        input,
        messages,
        locale
      );

      if (response.success && response.message) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: response.message!,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: response.error || t("error"),
          },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: t("error"),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 left-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full h-16 w-16 shadow-2xl bg-primary hover:bg-primary/90 relative group"
        >
          <MessageCircle className="h-7 w-7" />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-accent rounded-full animate-pulse" />
          <span className="sr-only">Open chat</span>
        </Button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "fixed bottom-6 left-6 z-50 transition-all duration-300",
        isMinimized ? "w-80" : "w-96"
      )}
    >
      <Card
        className={cn(
          "shadow-2xl overflow-hidden transition-all duration-300",
          isMinimized ? "h-16" : "h-[600px]"
        )}
      >
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <MessageCircle className="h-6 w-6" />
              <span className="absolute -bottom-1 -right-1 h-3 w-3 bg-accent rounded-full border-2 border-primary" />
            </div>
            <div>
              <h3 className="font-bold text-sm">{t("title")}</h3>
              <p className="text-xs opacity-90">{t("subtitle")}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              <Minimize2 className="h-4 w-4" />
              <span className="sr-only">{t("minimize")}</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">{t("close")}</span>
            </Button>
          </div>
        </div>

        {/* Messages */}
        {!isMinimized && (
          <>
            <ScrollArea className="h-[480px] p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}
                    >
                      <p className="whitespace-pre-wrap break-words">
                        {message.content}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-2xl px-4 py-2 text-sm">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
                        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="border-t p-4 bg-background">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t("placeholder")}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  size="icon"
                  className="shrink-0"
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">{t("send")}</span>
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
