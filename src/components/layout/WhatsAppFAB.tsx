import { site } from "@/lib/site";

export function WhatsAppFAB() {
  return (
    <a
      href={site.contact.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل معنا عبر واتساب"
      className="fixed bottom-6 left-6 z-40 group"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-pulse-ring" />
      <span className="relative inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_40px_-12px_rgba(37,211,102,0.6)] transition-transform group-hover:scale-105">
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-7">
          <path d="M.057 24l1.687-6.163A11.864 11.864 0 0 1 .002 11.92C0 5.336 5.335 0 11.92 0c3.18 0 6.167 1.24 8.413 3.488A11.82 11.82 0 0 1 23.94 11.93c0 6.585-5.335 11.92-11.92 11.92h-.005a11.9 11.9 0 0 1-5.7-1.452L.057 24z" />
        </svg>
      </span>
    </a>
  );
}
